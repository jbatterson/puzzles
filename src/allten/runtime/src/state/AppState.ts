/**
 * Contains the main MobX state class that backs the view layer. Used mutably,
 * per Mobx idioms.
 *
 * In general src/expr takes care of all expression logic, which are
 * independent of the view implementation. This file however intentionally
 * holds state to implement pieces of the view layer that are best not included
 * in React code.
 */

import {printf} from "fast-printf";
import {configure, makeAutoObservable, observable, runInAction} from "mobx";
import {
	ExpressionElement,
	ExpressionLine,
	ExpressionState,
	ExpressionStateFinishError,
} from "../expr/types";
import {
	isExpressionOperatorChar,
	toExpressionOperator,
} from "../expr/Operators";
import * as Unicode from "../util/Unicode";
import * as ErrorCopy from "../util/ErrorCopy";
import * as EState from "../expr/State";
import {AppAnimation} from "../view/util/AppAnimation";
import {Problem} from "./Problem";

import {strIsPositive} from "../util/Utils";
import {
	pstStringify,
	jumpDays,
	isStringifiedCookieDate,
	pstStringifyForRobots,
} from "../util/Dates";

configure({
	enforceActions: "always",
});

/**
 * Duration in milliseconds to show errors.
 */
const DEFAULT_ERROR_DURATION = 1500;

/**
 * State of each target to go for, as the view cares about it.
 */
export type TargetState = {
	/**
	 * The number being aimed for.
	 */
	number: number;
	/**
	 * Whether the interface is marking this target as impossible. Only used in
	 * problems that claim to have impossible targets as a special rule.
	 */
	impossible: boolean;
	/**
	 * The expression line to show for the solution. null represents a target that
	 * the user has not found yet.
	 */
	solution: ExpressionLine | null;
	/**
	 * The expression state used to find the solution. Stored so that the exact
	 * intermediate setup of a solution can be reconstructed by the UI. Should
	 * be null if and only if solution is null.
	 */
	solutionState: ExpressionState | null;
	/**
	 * Solve order of the target.
	 */
	solveOrder: number | null;
};

export type SavedProblem = {
	start: string[];
	solutions: string[];
};

/**
 * State of each notice to show to the user.
 */
export type NoticeState = {
	gen: number;
	message: string;
	duration: number;
};

/**
 * State of the user's stats. If the user is not logged in, this should be
 * populated by data from the user's cookies.
 */
export type ProfileState = {
	/*
	 * The number of times a user has played All Ten.
	 */
	numPlays: number;

	/*
	 * The number of times a user has consecutively played.
	 */
	numStreak: number;

	/*
	 * The date the user most recently played, in YYYY-MM-DD format.
	 */
	mostRecentPlayDate?: string;

	/*
	 * The number of times a user has achieved an All Ten.
	 */
	numAllTens: number;

	/*
	 * The date the user most recently achived an All Ten, in YYYY-MM-DD format.
	 */
	mostRecentAllTen?: string;

	/*
	 * Whether the user should be shown instructions on startup.
	 */
	showHelpOnStart: boolean;
};

/*
 * The saved profile fields that are saved.
 */
export const SAVED_COOKIE_PROFILE_FIELDS: string[] = [
	"numPlays",
	"numStreak",
	"mostRecentPlay",
	"numAllTens",
	"mostRecentAllTen",
];

/**
 * MobX class of view state. Main export.
 */
export default class AppState {
	/**
	 * Whether the help modal is currently showing.
	 */
	helpShowing: boolean;

	/**
	 * Whether the help modal was already shown at start.
	 */
	displayedHelp: boolean;

	/**
	 * Whether the links modal is currently showing.
	 */
	linksShowing: boolean;

	/**
	 * Whether the results modal is currently showing.
	 */
	resultsShowing: boolean;

	/**
	 * Whether the copy to clipboard modal is currently showing.
	 */
	resultCopiedModalShowing: boolean;

	/**
	 * Whether the stats modal is currently showing.
	 */
	statsShowing: boolean;

	/**
	 * The user's All Ten profile data state. (ex. default open, accolades, streaks)
	 */
	profile: ProfileState;

	/**
	 * The date of yesterday's problem.
	 */
	yesterdaysProblemDate: Date;

	/**
	 * Yesterday's problem.
	 */
	yesterdaysProblem?: Problem;

	/**
	 * Yesterday's target state.
	 */
	yesterdaysTargets?: TargetState[];

	/**
	 * The date of the problem.
	 */
	problemDate: Date;

	/**
	 * The date of yesterday's problem.
	 */
	// problemYesterdayDateStr: string;

	/**
	 * The problem the user is currently doing.
	 */
	problem: Problem;
	/**
	 * The targets of the problem and their current states.
	 */
	targets: TargetState[];
	/**
	 * The state of the expression the user is building now.
	 */
	exprState: ExpressionState;
	/**
	 * The state to use if the backspace button is used while the current
	 * expression is empty, if any. This implements some special backspace
	 * behaviors.
	 */
	backspaceState: ExpressionState | null;
	/**
	 * Whether the equals button should be enabled.
	 */
	equalsEnabled: boolean;
	/**
	 * Whether the expression has already been divided by zero.
	 */
	exprDividedByZero: boolean;
	/**
	 * Whether the undo functions (undo, backspace) are emphasized.
	 */
	undosHighlighted: boolean;

	/**
	 * If the user clicks a target (which tries to grab the expression) while
	 * the current expression is nonempty, the grab only goes through if this
	 * field is true.
	 */
	grabbableWhenNonempty: boolean;
	/**
	 * The next value to use for gen in notice objects.
	 */
	nextGen: number;
	/**
	 * The error to show to the user. Stays set in this class even after
	 * disappearing from the view; i.e. the view is responsible for implementing
	 * the duration logic.
	 */
	lastError: NoticeState | null;

	/**
	 * The result messgae to show the user. Stays set in this class even after
	 * disappearing from the view.
	 */
	lastResultMessage: NoticeState | null;

	/**
	 * The current generation of animation. Used to help the view detect when
	 * an animation was just started.
	 */
	currAnimGen: number;
	/**
	 * The animation object to play now. See view/util/AppAnimation for more.
	 */
	currAnim: AppAnimation | null;

	/**
	 * Whether the user's results have been shared.
	 */
	hasSharedToday: boolean;

	/**
	 * Text displayed on the fakeButton.
	 */
	buttonText?: string;

	/**
	 * Constructor. Must provide the problem that is being played. Does NOT load
	 * data from local storage.
	 *
	 * Note that the current expectation is that each instance of the view (and
	 * thus this class) deals with just one problem. External code embedding this
	 * project is where managing multiple problems is expected to belong.
	 */
	constructor(problem: Problem, problemDate?: Date) {
		if (!problemDate) {
			problemDate = new Date();
		}
		// profile and date state, which isn't problem specific
		this.profile = {
			numPlays: 0,
			numStreak: 0,
			numAllTens: 0,
			showHelpOnStart: true,
		};

		this.displayedHelp = false;
		this.helpShowing = false;
		this.linksShowing = false;
		this.resultsShowing = false;
		this.resultCopiedModalShowing = false;
		this.statsShowing = false;

		const targets = problem.targets.map((n) => ({
			number: n,
			impossible: false,
			solution: null,
			solutionState: null,
			solveOrder: null,
		}));
		this.problemDate = problemDate;
		this.yesterdaysProblemDate = jumpDays(this.problemDate, -1);

		this.problem = problem;
		this.targets = targets;
		this.exprState = {
			start: this.problem.start,
			rules: this.problem.rules,
			main: [],
			interm: [],
		};
		this.backspaceState = null;
		this.equalsEnabled = false;
		this.exprDividedByZero = false;
		this.undosHighlighted = false;
		this.grabbableWhenNonempty = false;

		this.nextGen = 1;
		this.lastError = null;
		this.lastResultMessage = null;

		this.currAnimGen = 0;
		this.currAnim = null;

		this.hasSharedToday = false;

		makeAutoObservable(this, {
			exprState: observable.ref,
			backspaceState: observable.ref,
			lastError: observable.ref,
			lastResultMessage: observable.ref,
		});
	}

	/**
	 * Whether the current problem is completed.
	 */
	get completed(): boolean {
		return this.targets.every((t) => {
			return t.impossible || t.solution;
		});
	}

	/**
	 * How many of the current targets are solved.
	 */
	get numSolved(): number {
		return this.targets
			.map((t): number => (t.solution ? 1 : 0))
			.reduce((partial, x) => x + partial, 0);
	}

	/**
	 * Action. Sets whether to show the help page.
	 */
	showHelp(value: boolean) {
		runInAction(() => (this.helpShowing = value));
	}

	/**
	 * Action. Sets whether to show the links page.
	 */
	showLinks(value: boolean) {
		this.linksShowing = value;
	}

	/**
	 * Action. Sets whether to show the results page.
	 */
	showResults(value: boolean) {
		this.resultsShowing = value;
	}

	/**
	 * Action. Sets whether to show the stats page.
	 */
	showStats(value: boolean) {
		this.statsShowing = value;
	}

	/**
	 * Action. Sets whether to show the copy to clipboard modal.
	 */
	showResultCopiedModal(value: boolean) {
		this.resultCopiedModalShowing = value;
		console.log(this.resultCopiedModalShowing);
	}

	/**
	 * Action. Sets a new error to show to the user, or deactivates the current
	 * one.
	 */
	setError(message: string | null, options: {duration?: number} = {}) {
		if (!message) {
			this.lastError = null;
			return;
		}
		const gen = this.nextGen;
		this.nextGen += 1;
		this.lastError = {
			gen,
			message,
			duration: options.duration ?? DEFAULT_ERROR_DURATION,
		};
	}

	/**
	 * Action. Sets the result message to show to the user, or deactivates the
	 * current one.
	 */
	setResultMessage(message: string | null, options: {duration?: number} = {}) {
		if (!message) {
			this.lastResultMessage = null;
			return;
		}
		const gen = this.nextGen;
		this.nextGen += 1;
		this.lastError = {
			gen,
			message,
			duration: options.duration ?? DEFAULT_ERROR_DURATION,
		};
	}

	/**
	 * Action. Adds a new element to the current expression with checks. May
	 * show an error instead of updating the state.
	 */
	pushStateElement(el: ExpressionElement) {
		const newState = EState.pushStateElement(this.exprState, el);
		const errors = EState.getErrorsForPartial(newState);
		if (errors.length) {
			const newStateAuto = this.tryAutoInterm(this.exprState, el);
			if (newStateAuto) {
				this.updateExpressionState(newStateAuto);
				this.setAnim(null);
			} else {
				this.setError(this.convertExprError(newState, errors));
			}
		} else {
			this.updateExpressionState(newState);
			this.setAnim(null);
		}
	}

	/**
	 * Action. Handles clicking the equals button. May result in a new
	 * intermediate, a new target solution, or an error.
	 */
	pushEquals() {
		if (EState.canFinishMain(this.exprState)) {
			this.tryAddTarget();
		} else if (EState.canFinishInterm(this.exprState)) {
			const newState = EState.pushStateIntermediate(this.exprState);
			const errors = EState.getErrorsForPartial(newState);
			const {evalValue: finishValue} = EState.getFinishedLine(
				this.exprState
			).value;
			if (errors.length) {
				this.setError(this.convertExprError(newState, errors));
			} else if (finishValue === null) {
				// disable equals, throw error
				this.equalsEnabled = false;
				this.undosHighlighted = true;
				this.setError(ErrorCopy.DIVIDE_BY_ZERO);
			} else {
				this.updateExpressionState(newState);
				this.setAnim(null);
				const intermIndex = newState.interm.length - 1;
				const nbsIndex = EState.getNumberButtonStates(newState).findIndex(
					(b) => {
						return b.el.type === "interm" && b.el.index === intermIndex;
					}
				);
				if (nbsIndex > -1) {
					this.setAnim({
						name: "makeInterm",
						buttonIndex: nbsIndex,
					});
				}
			}
		} else {
			const errors = EState.getFinishErrors(this.exprState);
			this.setError(this.convertExprError(this.exprState, errors));
		}

		if (EState.canFinishDivisionByZero(this.exprState)) {
			this.exprDividedByZero = true;
			this.equalsEnabled = false;
		} else {
			this.exprDividedByZero = false;
		}
	}

	/**
	 * Action. Empties the current expression.
	 */
	resetExpression() {
		this.updateExpressionState(
			{
				start: this.problem.start,
				rules: this.problem.rules,
				main: [],
				interm: [],
			},
			{
				previousIsBackspace: true,
			}
		);
		this.setAnim(null);
	}

	/**
	 * Action. Implements the backspace button behavior.
	 */
	doBackspace() {
		const tryMain = EState.backspaceStateMain(this.exprState);
		if (tryMain !== this.exprState) {
			this.updateExpressionState(tryMain);
			return;
		}

		const tryInterm = EState.undoStateIntermediate(this.exprState);
		if (tryInterm !== this.exprState) {
			this.updateExpressionState(tryInterm);
			return;
		}

		if (this.backspaceState) {
			this.updateExpressionState(this.backspaceState);
			return;
		}
	}

	/**
	 * Action. Implements clicking a target, which generally tries to grab its
	 * contents for the current expression in applicable situations.
	 */
	grabTarget(i: number) {
		if (!this.grabbableWhenNonempty && !EState.isEmpty(this.exprState)) {
			return;
		}
		const newState = this.targets[i]?.solutionState;
		if (!newState) {
			return;
		}
		this.updateExpressionState(newState, {grabbableWhenNonempty: true});
		this.setAnim(null);
	}

	/**
	 * Action. Implements typing on the keyboard. If the character is applicable,
	 * it ends by calling one of the other button-based actions above.
	 */
	handleKeyboardChar(char: string) {
		const numberPosHotkeys = ["q", "w", "a", "s"];
		const numberPos = numberPosHotkeys.indexOf(char.toLowerCase());

		if (/^[0-9]$/.test(char)) {
			const numberButtonStates = EState.getNumberButtonStates(this.exprState);
			const index = EState.getButtonIndexByChar(this.exprState, char);
			const buttonState = numberButtonStates[index];
			if (!buttonState || buttonState.state !== "available") {
				return;
			}
			return this.pushStateElement(buttonState.el);
		} else if (numberPos > -1) {
			const numberButtonStates = EState.getNumberButtonStates(this.exprState);
			const buttonState = numberButtonStates[numberPos];
			if (!buttonState || buttonState.state !== "available") {
				return;
			}
			return this.pushStateElement(buttonState.el);
		} else if (isExpressionOperatorChar(char)) {
			const op = toExpressionOperator(char);
			return op && this.pushStateElement({type: "op", op});
		} else if (char === "=") {
			return this.pushEquals();
		}
	}

	/**
	 * Validates a problem to make sure every number is used.
	 */
	areValidTargetsForProblem(problem: Problem, targets: TargetState[]): boolean {
		const {start, rules} = problem;

		for (const t of targets) {
			if (!t.solution) {
				continue;
			}

			// make a fake expression state
			const exprState: ExpressionState = {
				start,
				rules,
				interm: [],
				main: t.solution,
			};

			const evalValue = EState.getFinishedLine(exprState).value.evalValue;
			if (
				!EState.canFinishMain(exprState) || // can't finish expression
				EState.checkNumberUsage(exprState).length || // doesn't use all numbers
				!evalValue || // doesn't evaluate to anything
				evalValue[1] !== 1 || // not an integer
				evalValue[0] !== t.number // doesn't match
			) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Saves some data to storage.
	 */
	saveToStorage() {
		// problem
		localStorage.setItem(
			`${pstStringify(this.problemDate)}-problem`,
			JSON.stringify(this.problem)
		);

		// targets
		localStorage.setItem(
			`${pstStringify(this.problemDate)}-targets`,
			JSON.stringify(this.targets)
		);

		// profile
		localStorage.setItem("allten-profile", JSON.stringify(this.profile));
	}

	/**
	 * Loads AppState from all storage options.
	 */
	loadFromStorage() {
		// load from cookies
		this.loadFromCookies();

		/* load from local storage */
		let val;

		// yesterday's problem
		val = localStorage.getItem(
			`${pstStringify(this.yesterdaysProblemDate)}-problem`
		);
		if (val) {
			this.yesterdaysProblem = JSON.parse(val || "");
		}

		// yesterday's targets
		val = localStorage.getItem(
			`${pstStringify(this.yesterdaysProblemDate)}-targets`
		);
		if (val && this.yesterdaysProblem) {
			this.yesterdaysTargets = JSON.parse(val || "");

			if (this.yesterdaysTargets) {
				const targetsValid = !!this.areValidTargetsForProblem(
					this.yesterdaysProblem,
					this.yesterdaysTargets
				);
				if (!targetsValid) {
					this.yesterdaysTargets = undefined;
				}
			}
			// validate targets match the problem (replace them with nothing otherwise)
		}

		// targets
		val = localStorage.getItem(`${pstStringify(this.problemDate)}-targets`);
		if (val) {
			this.targets = JSON.parse(val || "");

			// validate targets match the problem (replace them with EMPTY TARGETS otherwise)
			const targetsValid = !!this.areValidTargetsForProblem(
				this.problem,
				this.targets
			);

			if (!targetsValid) {
				this.targets = this.problem.targets.map((n) => ({
					number: n,
					impossible: false,
					solution: null,
					solutionState: null,
					solveOrder: null,
				}));
			}
		}

		// profile
		val = localStorage.getItem("allten-profile");
		if (val) {
			this.profile = JSON.parse(val || "");
		}
		let helpOnStartSynced = false;
		if (typeof this.profile.showHelpOnStart !== "boolean") {
			this.profile.showHelpOnStart = true;
			helpOnStartSynced = true;
		}
		// Match other suite games: only auto-open instructions until at least one
		// target is solved (persisted progress implies no auto-open).
		if (this.targets.some((t) => t.solution)) {
			if (this.profile.showHelpOnStart) {
				this.profile.showHelpOnStart = false;
				helpOnStartSynced = true;
			}
		}
		if (helpOnStartSynced) {
			this.saveToStorage();
		}

		this.updateProfileStatsToToday();
		// Validate stats using last 30 days of data (must happen before cleanup)
		this.validateDaysPlayed(this.problemDate);
		this.validateNumAllTens(this.problemDate);

		// Clean up old entries after validation to prevent localStorage from filling up
		// This must run after validation functions since they need access to 30 days of data
		this.cleanupOldStorageEntries();
	}

	/**
	 * Private. Loads AppState from cookies.
	 */
	private loadFromCookies() {
		const savedCookiesStr = document.cookie;
		const yesterdaysDate = pstStringify(this.yesterdaysProblemDate);

		// search through cookie list and load relevant items
		for (const cookieArr of savedCookiesStr
			.split(";")
			.map((cookie) => cookie.split("="))) {
			// invalid cookie
			if (cookieArr.length < 2) {
				continue;
			}

			const [key, val] = cookieArr.map((v) => v.trim());
			switch (key) {
				// profile keys
				case "numPlays":
				case "numStreak":
				case "numAllTens":
					if (strIsPositive(val || "")) {
						this.profile[key] = Number(val);
					}
					break;
				case "mostRecentPlayDate":
				case "mostRecentAllTen":
					if (isStringifiedCookieDate(val || "")) {
						this.profile[key] = val;
					}
					break;
				// problem keys
				case yesterdaysDate:
					// don't do anything
					break;
				// unrecognized keys
				default:
					// do nothing
					break;
			}
		}
	}

	/**
	 * Updates profile stats, updating the most
	 *
	 * Side effects: can change this.profile.mostRecentPlay, this.profile.numStreak
	 */
	updateProfileStatsToToday(): void {
		const yesterday = pstStringifyForRobots(this.yesterdaysProblemDate);
		this.profile.mostRecentPlayDate = this.profile.mostRecentPlayDate || "";

		if (
			this.profile.mostRecentPlayDate === "" ||
			this.profile.mostRecentPlayDate < yesterday
		) {
			this.profile.numStreak = 0;
		}
	}

	/**
	 * Validates daysPlayed due to a previous bug. Looks through the last 30 days and checks the total num plays.
	 */
	validateDaysPlayed(todaysDate: Date): void {
		let calculatedNumPlays = 0;
		for (let loop = 0; loop < 30; loop++) {
			if (
				localStorage.getItem(`${pstStringify(todaysDate)}-problem`) &&
				localStorage.getItem(`${pstStringify(todaysDate)}-targets`)
			) {
				calculatedNumPlays++;
			}
			todaysDate = jumpDays(todaysDate, -1);
		}

		if (this.profile.numPlays < calculatedNumPlays) {
			this.profile.numPlays = calculatedNumPlays;
			this.saveToStorage();
		}
	}

	/**
	 * Validates numAllTen due to a previous bug. Looks through the last 30 days and checks the total num all tens.
	 */
	validateNumAllTens(todaysDate: Date): void {
		let calculatedNumAllTens = 0;
		for (let loop = 0; loop < 30; loop++) {
			const targets: TargetState[] | null = JSON.parse(
				localStorage.getItem(`${pstStringify(todaysDate)}-targets`) || "[]"
			);
			if (
				Array.isArray(targets) &&
				// 10 targets ahve solutions; locked at 10 as that was true when the bug occured
				targets.filter((target) => target?.solution).length === 10
			) {
				calculatedNumAllTens++;
			}

			todaysDate = jumpDays(todaysDate, -1);
		}

		if (this.profile.numAllTens < calculatedNumAllTens) {
			this.profile.numAllTens = calculatedNumAllTens;
			this.saveToStorage();
		}
	}

	/**
	 * Internal helper. When the current expression state should change, call
	 * this to ensure all auxiliary updates, like enabling equals, are also
	 * performed. No return; makes the updates directly.
	 */
	private updateExpressionState(
		newState: ExpressionState,
		options: {
			previousIsBackspace?: boolean;
			grabbableWhenNonempty?: boolean;
		} = {}
	) {
		this.backspaceState = options.previousIsBackspace ? this.exprState : null;
		this.exprState = newState;
		const newEqualsEnabled = EState.isEqualsEnabled(this.exprState);
		this.undosHighlighted = false;
		this.equalsEnabled =
			newEqualsEnabled === null ? this.equalsEnabled : newEqualsEnabled;
		this.grabbableWhenNonempty = !!options.grabbableWhenNonempty;
		this.lastError = null;
	}

	/**
	 * Internal helper. Sometimes if an invalid expression element is pushed,
	 * we should retry pushing it after inserting the last formed intermediate
	 * element. This implements the attempt to try it. Returns the resulting
	 * state if successful, null otherwise.
	 */
	private tryAutoInterm(
		exprState: ExpressionState,
		el: ExpressionElement
	): ExpressionState | null {
		const newState = EState.pushStateElementAsAutoInterm(exprState, el);
		if (!newState) {
			return null;
		}
		const errors = EState.getErrorsForPartial(newState);
		if (errors.length) {
			return null;
		}
		return newState;
	}

	/**
	 * Internal helper. Tries submitting the current expression as a new target
	 * solution. No return; makes updates directly.
	 */
	private tryAddTarget() {
		const finishRes = EState.getFinishedLine(this.exprState);
		const {line, evalValue} = finishRes.value;
		if (evalValue === null) {
			this.setError(ErrorCopy.DIVIDE_BY_ZERO);
			return;
		} else if (evalValue[1] !== 1) {
			const [numerator, denominator] = evalValue;
			const fraction = `${numerator}/${denominator}`;
			this.setError(ErrorCopy.FRACTION_NOT_INTEGER(fraction));
			return;
		} else if (line === null) {
			console.error(
				"Unexpected error",
				"Could not flatten expression",
				finishRes.errors
			);
			this.setError(ErrorCopy.INTERNAL);
			return;
		}

		// If this point was reached, this was a valid solution to a number.
		// This presumably means the user has learned the basics, so
		// from now on, the help screen should no longer be shown on start.
		this.profile.showHelpOnStart = false;

		const num = evalValue[0];
		const numStr = num < 0 ? Unicode.NEG + String(-num) : String(num);
		const targetIndex = this.targets.findIndex((t) => t.number === num);
		const targetState = this.targets[targetIndex];
		const firstAllTenForDay =
			this.profile.mostRecentAllTen === pstStringify(this.problemDate);
		const firstSolutionForToday =
			(this.profile.mostRecentPlayDate || "00000000") <
			pstStringifyForRobots(this.problemDate);
		if (!targetState) {
			this.undosHighlighted = true;
			this.setError(printf(ErrorCopy.NOT_TARGET, numStr));
			return;
		}

		let newTargetSolved = false;
		if (firstSolutionForToday) {
			this.profile.numStreak += 1;
			this.profile.numPlays += 1;
			this.profile.mostRecentPlayDate = pstStringifyForRobots(this.problemDate);
		}
		if (!targetState.solution) {
			targetState.solveOrder = this.numSolved + 1;
			newTargetSolved = true;
		}
		targetState.solution = line;
		targetState.solutionState = this.exprState;
		this.saveToStorage();
		if (!firstAllTenForDay && this.completed) {
			this.showResults(true);
			this.profile.numAllTens += 1;
			this.profile.mostRecentAllTen = pstStringify(this.problemDate);
			this.saveToStorage();
		}
		this.tryFillImpossible();
		this.resetExpression();
		this.setAnim({
			name: newTargetSolved ? "makeTarget" : "makeExtraTarget",
			targetIndex,
		});
		setTimeout(() => {
			this.buttonText = "+1";
		}, 1200);
		setTimeout(() => {
			this.buttonText = undefined;
		}, 2000);
	}

	/**
	 * Internal helper. Tries to detect whether enough targets have been found
	 * that the rest can be marked impossible, according to problem rules. No
	 * return; makes updates directly.
	 */
	private tryFillImpossible() {
		const impossible = this.problem.rules.impossible;
		if (impossible <= 0) {
			return;
		}
		const unsolvedCount = this.targets.filter((t) => !t.solution).length;
		if (unsolvedCount <= impossible) {
			this.targets.forEach((t) => {
				t.impossible = !t.solution;
			});
		}
	}

	/**
	 * Internal helper. Turns an expression error into a string for the user with
	 * the help of the error copy utility.
	 */
	private convertExprError(
		badState: ExpressionState,
		errors: ExpressionStateFinishError[]
	): string | null {
		if (!errors.length) {
			return null;
		}
		const usedAllNumbers = EState.hasUsedAllNumbers(badState);
		const firstErr = errors[0]!;
		const code = firstErr.code;
		if (code === "E_EMPTY_EXPRESSION" || code === "E_DANGLING_OPERATOR") {
			if (usedAllNumbers) {
				return ErrorCopy.UNNECESSARY_OPERATORS;
			} else {
				return ErrorCopy.INCOMPLETE_EXPRESSION;
			}
		} else if (code === "E_MISPLACED_OPERATOR") {
			if (usedAllNumbers) {
				return ErrorCopy.UNNECESSARY_OPERATORS;
			} else {
				return ErrorCopy.MISPLACED_OPERATOR;
			}
		} else if (code === "E_NOT_ENOUGH_FOR_INTERM") {
			return ErrorCopy.INCOMPLETE_EXPRESSION;
		} else if (code === "E_TOO_LONG") {
			return ErrorCopy.TOO_LONG;
		} else if (code === "E_UNCLOSED_PAREN" || code === "E_UNOPENED_PAREN") {
			return ErrorCopy.INVALID_PARENTHESES;
		} else if (
			code === "E_NO_IMPLICIT_MULTIPLICATION" ||
			code === "E_CONCAT_NON_DIGIT"
		) {
			return ErrorCopy.INVALID_CONCAT;
		} else if (code === "E_UNUSED_NUMBER") {
			return ErrorCopy.UNUSED_NUMBER;
		} else if (code === "E_DIVIDE_BY_ZERO") {
			return ErrorCopy.DIVIDE_BY_ZERO;
		} else if (code === "E_RULE_FORBIDDEN_OP") {
			const op = Unicode.convertOperator(firstErr.op);
			return printf(ErrorCopy.RULE_FORBIDDEN_OP, op);
		} else if (code === "E_RULE_FORBIDDEN_PARENS") {
			return ErrorCopy.RULE_FORBIDDEN_PARENS;
		} else if (code === "E_RULE_FORBIDDEN_CONCAT") {
			return ErrorCopy.RULE_FORBIDDEN_CONCAT;
		} else if (code === "E_RULE_MULTIPLE_OPS") {
			return ErrorCopy.RULE_MULTIPLE_OPS;
		} else if (code === "E_RULE_OPS_OVER_LIMIT") {
			return printf(ErrorCopy.RULE_OPS_OVER_LIMIT, firstErr.limit);
		} else {
			console.error("Unexpected error", errors);
			return ErrorCopy.INTERNAL;
		}
	}

	/**
	 * Internal helper. Begins a new animation, also cutting short any ongoing
	 * one.
	 */
	private setAnim(newAnim: AppAnimation | null) {
		if (newAnim) {
			this.currAnimGen += 1;
		}
		this.currAnim = newAnim;
	}

	/**
	 * Internal helper. Cleans up old localStorage entries to prevent storage from
	 * filling up. Only deletes keys that match the date pattern (ending with
	 * -problem or -targets and having a date-like format). Keeps the last 30 days
	 * of problem/targets (needed for validation functions), and always keeps the profile.
	 */
	private cleanupOldStorageEntries() {
		// Build set of keys to keep: last 30 days + profile
		const keysToKeep = new Set<string>(["allten-profile"]);

		// Add keys for the last 30 days (needed by validateDaysPlayed and validateNumAllTens)
		let checkDate = new Date(this.problemDate);
		for (let i = 0; i < 30; i++) {
			const dateStr = pstStringify(checkDate);
			keysToKeep.add(`${dateStr}-problem`);
			keysToKeep.add(`${dateStr}-targets`);
			checkDate = jumpDays(checkDate, -1);
		}

		// Iterate backwards through localStorage keys (so deletion doesn't affect indices)
		for (let i = localStorage.length - 1; i >= 0; i--) {
			const key = localStorage.key(i);
			if (!key) {
				continue;
			}

			// Delete if it's a problem/targets entry with date-like format and not in our keep list
			if (key.endsWith("-problem") || key.endsWith("-targets")) {
				if (keysToKeep.has(key)) {
					continue;
				}
				// Check if it has a date-like format (m/d/yyyy or mm/dd/yyyy)
				const datePart = key.replace(/-(problem|targets)$/, "");
				if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(datePart)) {
					localStorage.removeItem(key);
				}
			}
		}
	}
}
