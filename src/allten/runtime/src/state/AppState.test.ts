/**
 * Tests for AppState, particularly the localStorage cleanup functionality.
 */

import AppState, {TargetState} from "./AppState";
import {createProblem} from "./Problem";
import {pstStringify, pstStringifyForRobots, jumpDays} from "../util/Dates";
import {runInAction} from "mobx";
import {stringToLine} from "../expr/Line";
import * as EState from "../expr/State";

// Mock localStorage
const localStorageMock = (() => {
	let store: {[key: string]: string} = {};

	return {
		getItem: (key: string) => store[key] || null,
		setItem: (key: string, value: string) => {
			store[key] = value.toString();
		},
		removeItem: (key: string) => {
			delete store[key];
		},
		clear: () => {
			store = {};
		},
		key: (index: number) => {
			const keys = Object.keys(store);
			return keys[index] || null;
		},
		get length() {
			return Object.keys(store).length;
		},
	};
})();

// Save original localStorage before mocking
const originalLocalStorage = window.localStorage;

// Replace global localStorage with mock
Object.defineProperty(window, "localStorage", {
	value: localStorageMock,
	configurable: true,
});

describe("AppState cleanup", () => {
	beforeEach(() => {
		// Clear localStorage before each test
		localStorageMock.clear();
	});

	afterAll(() => {
		// Restore original localStorage after all tests complete
		Object.defineProperty(window, "localStorage", {
			value: originalLocalStorage,
			configurable: true,
		});
	});

	describe("cleanupOldStorageEntries", () => {
		it("keeps last 30 days of entries", () => {
			const today = new Date("2024-01-15");
			const yesterday = jumpDays(today, -1);
			const problem = createProblem([1, 2, 3, 4]);
			const appState = new AppState(problem, today);

			// Add entries for various dates
			const todayStr = pstStringify(today);
			const yesterdayStr = pstStringify(yesterday);
			const oldDate1 = jumpDays(today, -5);
			const oldDate2 = jumpDays(today, -10);
			const oldDate3 = jumpDays(today, -29); // Within 30 days
			const oldDate4 = jumpDays(today, -31); // Older than 30 days
			const oldDate1Str = pstStringify(oldDate1);
			const oldDate2Str = pstStringify(oldDate2);
			const oldDate3Str = pstStringify(oldDate3);
			const oldDate4Str = pstStringify(oldDate4);

			localStorage.setItem(`${todayStr}-problem`, JSON.stringify(problem));
			localStorage.setItem(`${todayStr}-targets`, JSON.stringify([]));
			localStorage.setItem(`${yesterdayStr}-problem`, JSON.stringify(problem));
			localStorage.setItem(`${yesterdayStr}-targets`, JSON.stringify([]));
			localStorage.setItem(`${oldDate1Str}-problem`, JSON.stringify(problem));
			localStorage.setItem(`${oldDate1Str}-targets`, JSON.stringify([]));
			localStorage.setItem(`${oldDate2Str}-problem`, JSON.stringify(problem));
			localStorage.setItem(`${oldDate2Str}-targets`, JSON.stringify([]));
			localStorage.setItem(`${oldDate3Str}-problem`, JSON.stringify(problem));
			localStorage.setItem(`${oldDate3Str}-targets`, JSON.stringify([]));
			localStorage.setItem(`${oldDate4Str}-problem`, JSON.stringify(problem));
			localStorage.setItem(`${oldDate4Str}-targets`, JSON.stringify([]));
			localStorage.setItem("allten-profile", JSON.stringify({numPlays: 5}));

			// Trigger cleanup by loading (cleanup runs on loadFromStorage)
			appState.loadFromStorage();

			// Entries within last 30 days should still exist
			expect(localStorage.getItem(`${todayStr}-problem`)).toBeTruthy();
			expect(localStorage.getItem(`${todayStr}-targets`)).toBeTruthy();
			expect(localStorage.getItem(`${yesterdayStr}-problem`)).toBeTruthy();
			expect(localStorage.getItem(`${yesterdayStr}-targets`)).toBeTruthy();
			expect(localStorage.getItem(`${oldDate1Str}-problem`)).toBeTruthy();
			expect(localStorage.getItem(`${oldDate1Str}-targets`)).toBeTruthy();
			expect(localStorage.getItem(`${oldDate2Str}-problem`)).toBeTruthy();
			expect(localStorage.getItem(`${oldDate2Str}-targets`)).toBeTruthy();
			expect(localStorage.getItem(`${oldDate3Str}-problem`)).toBeTruthy();
			expect(localStorage.getItem(`${oldDate3Str}-targets`)).toBeTruthy();

			// Entries older than 30 days should be deleted
			expect(localStorage.getItem(`${oldDate4Str}-problem`)).toBeNull();
			expect(localStorage.getItem(`${oldDate4Str}-targets`)).toBeNull();

			// Profile should always be kept
			expect(localStorage.getItem("allten-profile")).toBeTruthy();
		});

		it("preserves profile data structure", () => {
			const today = new Date("2024-01-15");
			const problem = createProblem([1, 2, 3, 4]);
			const appState = new AppState(problem, today);

			// Set initial profile
			const initialProfile = {
				numPlays: 10,
				numStreak: 5,
				numAllTens: 3,
				showHelpOnStart: false,
			};

			localStorage.setItem("allten-profile", JSON.stringify(initialProfile));

			// Update appState profile to match
			runInAction(() => {
				appState.profile = initialProfile;
			});

			appState.loadFromStorage();

			// Profile should still exist (though it will be overwritten with appState.profile)
			const savedProfile = JSON.parse(
				localStorage.getItem("allten-profile") || "{}"
			);
			expect(savedProfile).toHaveProperty("numPlays");
			expect(savedProfile).toHaveProperty("numStreak");
			expect(savedProfile).toHaveProperty("numAllTens");
			expect(savedProfile).toHaveProperty("showHelpOnStart");
		});

		it("ignores non-date-based entries", () => {
			const today = new Date("2024-01-15");
			const problem = createProblem([1, 2, 3, 4]);
			const appState = new AppState(problem, today);

			// Add some unrelated localStorage entries
			localStorage.setItem("some-other-key", "some-value");
			localStorage.setItem("another-key", "another-value");
			localStorage.setItem("allten-profile", JSON.stringify({numPlays: 1}));

			// Trigger cleanup by loading (cleanup runs on loadFromStorage)
			appState.loadFromStorage();

			// Unrelated keys should still exist
			expect(localStorage.getItem("some-other-key")).toBe("some-value");
			expect(localStorage.getItem("another-key")).toBe("another-value");
			expect(localStorage.getItem("allten-profile")).toBeTruthy();
		});

		it("handles invalid date formats gracefully", () => {
			const today = new Date("2024-01-15");
			const problem = createProblem([1, 2, 3, 4]);
			const appState = new AppState(problem, today);

			// Add entries with invalid date formats
			localStorage.setItem("invalid-date-problem", JSON.stringify(problem));
			localStorage.setItem("not-a-date-targets", JSON.stringify([]));
			localStorage.setItem("12/34/5678-problem", JSON.stringify(problem));

			// Should not throw
			expect(() => appState.loadFromStorage()).not.toThrow();

			// Keys without date-like format should remain (not deleted)
			expect(localStorage.getItem("invalid-date-problem")).toBeTruthy();
			expect(localStorage.getItem("not-a-date-targets")).toBeTruthy();
			// Keys with date-like format (even if invalid date) should be deleted
			expect(localStorage.getItem("12/34/5678-problem")).toBeNull();
		});

		it("handles empty localStorage", () => {
			const today = new Date("2024-01-15");
			const problem = createProblem([1, 2, 3, 4]);
			const appState = new AppState(problem, today);

			// localStorage is already empty from beforeEach
			// Cleanup runs on loadFromStorage and should not throw
			expect(() => appState.loadFromStorage()).not.toThrow();
		});

		it("only deletes entries matching date pattern", () => {
			const today = new Date("2024-01-15");
			const problem = createProblem([1, 2, 3, 4]);
			const appState = new AppState(problem, today);

			// Add entries that look similar but don't match the pattern
			localStorage.setItem("01/15/2024-problem-extra", "value");
			localStorage.setItem("problem-01/15/2024", "value");
			localStorage.setItem("01/15/2024-problematic", "value");

			appState.loadFromStorage();

			// These should not be deleted (they don't end with -problem or -targets)
			expect(localStorage.getItem("01/15/2024-problem-extra")).toBeTruthy();
			expect(localStorage.getItem("problem-01/15/2024")).toBeTruthy();
			expect(localStorage.getItem("01/15/2024-problematic")).toBeTruthy();
		});

		it("preserves today and yesterday when cleaning up old entries", () => {
			const today = new Date("2024-01-15");
			const yesterday = jumpDays(today, -1);
			const problem = createProblem([1, 2, 3, 4]);
			const appState = new AppState(problem, today);

			const todayStr = pstStringify(today);
			const yesterdayStr = pstStringify(yesterday);

			// Add today and yesterday
			localStorage.setItem(`${todayStr}-problem`, JSON.stringify(problem));
			localStorage.setItem(`${todayStr}-targets`, JSON.stringify([]));
			localStorage.setItem(`${yesterdayStr}-problem`, JSON.stringify(problem));
			localStorage.setItem(`${yesterdayStr}-targets`, JSON.stringify([]));

			// Add many old entries (older than 30 days)
			for (let i = 31; i <= 100; i++) {
				const oldDate = jumpDays(today, -i);
				const oldStr = pstStringify(oldDate);
				localStorage.setItem(`${oldStr}-problem`, JSON.stringify(problem));
				localStorage.setItem(`${oldStr}-targets`, JSON.stringify([]));
			}

			appState.loadFromStorage();

			// Today and yesterday should still be preserved
			expect(localStorage.getItem(`${todayStr}-problem`)).toBeTruthy();
			expect(localStorage.getItem(`${todayStr}-targets`)).toBeTruthy();
			expect(localStorage.getItem(`${yesterdayStr}-problem`)).toBeTruthy();
			expect(localStorage.getItem(`${yesterdayStr}-targets`)).toBeTruthy();

			// All old entries should be deleted
			for (let i = 31; i <= 100; i++) {
				const oldDate = jumpDays(today, -i);
				const oldStr = pstStringify(oldDate);
				expect(localStorage.getItem(`${oldStr}-problem`)).toBeNull();
				expect(localStorage.getItem(`${oldStr}-targets`)).toBeNull();
			}
		});
	});
});

describe("AppState profile / streak", () => {
	beforeEach(() => {
		localStorageMock.clear();
	});

	afterAll(() => {
		Object.defineProperty(window, "localStorage", {
			value: originalLocalStorage,
			configurable: true,
		});
	});

	it("updateProfileStatsToToday clears streak when last play is before yesterday", () => {
		const today = new Date("2024-01-15");
		const problem = createProblem([1, 2, 3, 4]);
		const appState = new AppState(problem, today);
		const oldPlay = pstStringifyForRobots(jumpDays(today, -5));
		runInAction(() => {
			appState.profile.numStreak = 12;
			appState.profile.mostRecentPlayDate = oldPlay;
		});

		appState.updateProfileStatsToToday();

		expect(appState.profile.numStreak).toBe(0);
	});

	it("updateProfileStatsToToday keeps streak when last play was yesterday (robot date)", () => {
		const today = new Date("2024-01-15");
		const problem = createProblem([1, 2, 3, 4]);
		const appState = new AppState(problem, today);
		const yRobot = pstStringifyForRobots(jumpDays(today, -1));
		runInAction(() => {
			appState.profile.numStreak = 4;
			appState.profile.mostRecentPlayDate = yRobot;
		});

		appState.updateProfileStatsToToday();

		expect(appState.profile.numStreak).toBe(4);
	});

	it("updateProfileStatsToToday keeps streak when last play was today", () => {
		const today = new Date("2024-01-15");
		const problem = createProblem([1, 2, 3, 4]);
		const appState = new AppState(problem, today);
		const tRobot = pstStringifyForRobots(today);
		runInAction(() => {
			appState.profile.numStreak = 2;
			appState.profile.mostRecentPlayDate = tRobot;
		});

		appState.updateProfileStatsToToday();

		expect(appState.profile.numStreak).toBe(2);
	});

	it("first target solved today increments plays and streak once", () => {
		const today = new Date("2024-01-15");
		const problem = createProblem([1, 2, 3, 4]);
		const appState = new AppState(problem, today);
		runInAction(() => {
			appState.profile.numStreak = 2;
			appState.profile.numPlays = 5;
			appState.profile.mostRecentPlayDate = "";
		});

		const lineRes = stringToLine("(s3 - s2) / (s1 - s0)");
		expect(lineRes.errors.length).toBe(0);
		expect(lineRes.value).not.toBeNull();

		runInAction(() => {
			appState.exprState = {
				start: problem.start,
				rules: problem.rules,
				main: lineRes.value!,
				interm: [],
			};
			const eq = EState.isEqualsEnabled(appState.exprState);
			appState.equalsEnabled = eq === null ? true : eq;
		});

		appState.pushEquals();

		expect(appState.profile.numPlays).toBe(6);
		expect(appState.profile.numStreak).toBe(3);
		expect(appState.profile.mostRecentPlayDate).toBe(pstStringifyForRobots(today));
	});

	it("second target solved same day does not increment plays or streak", () => {
		const today = new Date("2024-01-15");
		const problem = createProblem([1, 2, 3, 4]);
		const appState = new AppState(problem, today);
		const tRobot = pstStringifyForRobots(today);
		runInAction(() => {
			appState.profile.numStreak = 3;
			appState.profile.numPlays = 10;
			appState.profile.mostRecentPlayDate = tRobot;
		});

		const lineRes = stringToLine("(s3 - s2) / (s1 - s0)");
		expect(lineRes.value).not.toBeNull();
		runInAction(() => {
			appState.exprState = {
				start: problem.start,
				rules: problem.rules,
				main: lineRes.value!,
				interm: [],
			};
			const eq = EState.isEqualsEnabled(appState.exprState);
			appState.equalsEnabled = eq === null ? true : eq;
		});

		appState.pushEquals();

		expect(appState.profile.numPlays).toBe(10);
		expect(appState.profile.numStreak).toBe(3);
	});

	it("validateNumAllTens raises numAllTens from recent completed targets in storage", () => {
		const today = new Date("2024-01-15");
		const problem = createProblem([1, 2, 3, 4]);
		const appState = new AppState(problem, today);
		const todayStr = pstStringify(today);
		const placeholders: TargetState[] = problem.targets.map((number) => ({
			number,
			impossible: false,
			solution: [{type: "num", index: 0}],
			solutionState: null,
			solveOrder: 1,
		}));

		localStorage.setItem(`${todayStr}-problem`, JSON.stringify(problem));
		localStorage.setItem(`${todayStr}-targets`, JSON.stringify(placeholders));

		runInAction(() => {
			appState.profile.numAllTens = 0;
		});

		appState.validateNumAllTens(appState.problemDate);

		expect(appState.profile.numAllTens).toBeGreaterThanOrEqual(1);
	});
});
