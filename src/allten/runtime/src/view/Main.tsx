import React, {useState, useEffect, useRef} from "react";
import {observer} from "mobx-react-lite";
import {styled, css} from "../stitches.config";

import {ExpressionElement} from "../expr/types";
import AppState from "../state/AppState";

import AnimationProvider from "./AnimationProvider";
import AnimationHook from "./AnimationHook";
import Instructions from "./Instructions";
import ResultCopiedModal from "./ResultCopiedModal";
import Links from "./Links";
import Results from "./Results";
import IconButton from "./IconButton";
import NoticeDisplay from "./NoticeDisplay";
import TargetDisplay from "./TargetDisplay";
import ExpressionDisplay from "./ExpressionDisplay";
import ButtonGrid, {Sizes as ButtonGridSize} from "./ButtonGrid";
import ProgressDisplay from "./ProgressDisplay";
import ImageButton from "./ImageButton";

import {
	MAX_GAME_WIDTH,
	PADDING_UNIT,
	HALF_PADDING_UNIT,
	TITLEBAR_HEIGHT,
	TARGET_DISPLAY_HEIGHT,
	TALL_TARGET_DISPLAY_HEIGHT,
	COMPACT_LINKS_BREAKPOINT,
	COMPACT_LAYOUT_BREAKPOINT,
	SHORT_TARGET_DISPLAY_BREAKPOINT,
	QUARTER_PADDING_UNIT,
	SHORT_TARGET_DISPLAY_HEIGHT,
	SMALL_KEYBOARD_BREAKPOINT,
	MEDIUM_KEYBOARD_BREAKPOINT,
} from "./util/Constants";
import StatsPage from "./StatsPage";
import {CTA_LABELS} from "../../../../../shared-contracts/ctaLabels.js";

export type Props = {
	appState: AppState;
	/**
	 * When true, the native title bar is omitted so a suite-level header (e.g. shared TopBar) can render above the game.
	 */
	hideNativeTitleBar?: boolean;
};

const ScreenContainer = styled("div", {
	position: "relative",
	width: "100vw",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	alignItems: "center",
	color: "$main",
	fontFamily: "Roboto, sans-serif",
	variants: {
		/**
		 * When the suite header renders above Main, the game must flex within the remaining height
		 * instead of height:100% of the full shell (which would overflow and hide the keyboard).
		 */
		fillBelowSuiteChrome: {
			true: {
				flex: 1,
				minHeight: 0,
				height: "auto",
				overflow: "hidden",
				/* Match .level-nav margin-top below TopBar in other suite games */
				paddingTop: "0.5rem",
				boxSizing: "border-box",
			},
		},
	},
});

const TitleRow = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	margin: 0,
	padding: `${HALF_PADDING_UNIT}px`,
	height: `${TITLEBAR_HEIGHT}px`, // calculated
	boxSizing: "border-box",
	color: "$main",
	width: "100%",
	boxShadow:
		"1px 2px 16px 4px rgba(15, 10, 8, .05)," /* ambient */ +
		"1px 1px 8px 1px rgba(15, 10, 8, .08)," /* penumbra */ +
		"1px 1px 4px 1px rgba(15, 10, 8, .04)" /* umbra */,
	variants: {
		compactLayout: {
			true: {
				padding: `${QUARTER_PADDING_UNIT}px`,
			},
		},
	},
});

const TitleRowContent = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
	margin: 0,
	boxSizing: "border-box",
	width: `min(95vw, ${MAX_GAME_WIDTH}px)`,
});

const SubheadingRow = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	fontSize: "20px",
	height: "40px",
	padding: `${HALF_PADDING_UNIT}px 0px`,
	color: "$main",
	variants: {
		compactLayout: {
			true: {
				fontSize: "16px",
				height: "28px",
			},
		},
	},
});

// the entire target display area + whitespace
const TargetDisplayArea = styled("div", {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	width: "100%",
	height: "100%",
});

// immediately wraps the target display
const TargetDisplayContainer = styled("div", {
	height: TARGET_DISPLAY_HEIGHT,
	width: "100%",
	margin: `${HALF_PADDING_UNIT}px 0`,

	variants: {
		size: {
			small: {
				height: SHORT_TARGET_DISPLAY_HEIGHT,
				margin: `${QUARTER_PADDING_UNIT}px 0`,
			},
			tall: {
				height: `${TALL_TARGET_DISPLAY_HEIGHT}px`,
			},
			compact: {
				margin: `${QUARTER_PADDING_UNIT}px 0`,
			},
		},
		compact: {},
	},
});

const Title = styled("h1", {
	margin: 0,
	paddingTop: "0",
	paddingLeft: "5px",
	fontSize: "21px",
	display: "inline-block",
	"@bpXSmall": {
		fontSize: "26px",
	},
	cursor: "pointer",
});

const LogoContainer = styled("div", {
	borderRight: "2px solid $main",
	paddingTop: "0.4em",
	paddingBottom: "0.4em",
	paddingRight: "5px",
	width: "auto",
});

const TitleDiv = styled("div", {
	display: "flex",
	margin: 0,
	padding: 0,
	alignItems: "center",
});

const TitleRowSide = styled("div", {
	display: "flex",
	alignItems: "center",
	width: "auto",
	height: "auto",

	variants: {
		side: {
			left: {
				justifyContent: "flex-start",
				flex: "0 0 auto",
				alignSelf: "stretch",
			},
			right: {
				justifyContent: "flex-end",
				flex: "0 1 auto",
				alignSelf: "unset",
			},
		},
	},
});

const RowSide = styled("div", {
	alignSelf: "stretch",
	display: "flex",
	flex: "1 1 0",
	alignItems: "center",
	width: "100%",
	height: "100%",

	variants: {
		side: {
			left: {
				justifyContent: "flex-start",
			},
			right: {
				justifyContent: "flex-end",
			},
		},
	},
});

const NoticeContainer = styled("div", {
	position: "absolute",
	top: -40,
	width: "100%",

	zIndex: 1,
});

const ExpressionContainer = styled("div", {
	position: "relative",
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",

	padding: 8,
	margin: `0 0 ${PADDING_UNIT}px 0`,
	backgroundColor: "$disabled",
	borderRadius: 8,

	variants: {
		compactLayout: {
			true: {
				margin: `0 0 ${HALF_PADDING_UNIT}px 0`,
			},
		},
	},
});

const BodyContainer = styled("div", {
	height: "100%",
	width: `min(95vw, ${MAX_GAME_WIDTH}px)`,
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	boxSizing: "border-box",
	paddingBottom: HALF_PADDING_UNIT,
	margin: "0 auto",
});

// used just to keep the keyboard together (width matches BodyContainer)
const KeyboardContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "stretch",
	padding: `0 0 ${HALF_PADDING_UNIT}px 0`,
	boxSizing: "border-box",
	width: `min(95vw, ${MAX_GAME_WIDTH}px)`,
	margin: "0 auto",
});

const fakeAnimButtonClassName = css({
	position: "absolute",
	zIndex: 1,
	pointerEvents: "none",
});

const fakeAnimButtonInnerClassName = css({
	opacity: 0,
});

const Main: React.FC<Props> = function (props: Props) {
	const {appState, hideNativeTitleBar = false} = props;

	/* rect setup */

	const [height, setHeight] = useState(0);
	const gameElRef = useRef<any>(null);

	const grabRectDimensions = () => {
		const element = gameElRef?.current;
		setHeight(element?.clientHeight);
	};

	useEffect(() => {
		if (appState.profile.showHelpOnStart && !appState.displayedHelp) {
			appState.showHelp(true);
		}
	}, [appState]);

	useEffect(() => {
		window.addEventListener("resize", grabRectDimensions);
		document.addEventListener("keydown", onKeyDown);
		grabRectDimensions();
		return () => {
			document.removeEventListener("keydown", onKeyDown);
		};
	}, []);

	/* helper functions */

	const onKeyDown = (evt: KeyboardEvent) => {
		if (evt.metaKey || evt.altKey || evt.ctrlKey) {
			// Don't prevent or stop
			return;
		}
		if (appState.helpShowing) {
			if (evt.key === "Enter") {
				evt.preventDefault();
				evt.stopPropagation();
				appState.showHelp(false);
			}
		} else if (evt.key === "Backspace" || evt.key === "Delete") {
			evt.preventDefault();
			evt.stopPropagation();
			appState.doBackspace();
		} else if (evt.key === "Enter") {
			evt.preventDefault();
			evt.stopPropagation();
			appState.pushEquals();
		} else if (evt.key.length === 1) {
			evt.preventDefault();
			evt.stopPropagation();
			appState.handleKeyboardChar(evt.key);
		}
	};

	const onInsertElement = (el: ExpressionElement) => {
		appState.pushStateElement(el);
	};

	const onEquals = () => {
		appState.pushEquals();
	};

	const onReset = () => {
		appState.resetExpression();
	};

	const onBackspace = () => {
		appState.doBackspace();
	};

	const onTargetGrab = (i: number) => {
		appState.grabTarget(i);
	};

	/* rendering the Main element */

	const subheadingColor = appState.numSolved ? "done" : undefined;
	const useCompactLinks = height
		? height < COMPACT_LINKS_BREAKPOINT
		: undefined;
	const useCompactLayout = height
		? height < COMPACT_LAYOUT_BREAKPOINT
		: undefined;
	const useCompactTargetDisplay = height
		? height < SHORT_TARGET_DISPLAY_BREAKPOINT
		: undefined;

	// calculate what the size of the keyboard should be
	// calculate the ratios of what things should be
	// load it up in JS

	let keyboardSize: ButtonGridSize;
	if (!useCompactLayout) {
		keyboardSize = "large";
	} else if (height > MEDIUM_KEYBOARD_BREAKPOINT) {
		keyboardSize = "mediumLarge";
	} else if (height > SMALL_KEYBOARD_BREAKPOINT) {
		keyboardSize = "medium";
	} else {
		keyboardSize = "small";
	}

	let targetDisplayContainerSize: "small" | "compact" | undefined;
	if (useCompactTargetDisplay) {
		targetDisplayContainerSize = "small";
	} else if (useCompactLayout) {
		targetDisplayContainerSize = "compact";
	}

	let fakeButton: React.ReactElement | null = null;
	if (appState.currAnim) {
		if (appState.currAnim.name === "makeTarget") {
			const index = appState.currAnim.targetIndex;
			const target = appState.targets[index];
			if (target) {
				fakeButton = (
					<IconButton
						number={target.number}
						size="large"
						color="done"
						disabled={true}
					/>
				);
			}
		} else if (appState.currAnim.name === "makeExtraTarget") {
			fakeButton = (
				<IconButton text={"+1"} size="large" color="done" disabled={true} />
			);
		}
	}

	const modals = (
		<>
			<Instructions
				hideHelp={() => {
					appState.showHelp(false);
					appState.displayedHelp = true;
					appState.saveToStorage();
				}}
				show={appState.helpShowing}
			/>
			<Links
				hideLinks={() => appState.showLinks(false)}
				show={appState.linksShowing}
				compact={useCompactLinks}
			/>
			<Results
				hideResults={() => appState.showResults(false)}
				appState={appState}
				show={appState.resultsShowing}
				compact={useCompactLinks}
			/>
			<ResultCopiedModal
				hideModal={() => {
					appState.showResultCopiedModal(false);
				}}
				show={appState.resultCopiedModalShowing}
			/>
			<StatsPage
				hideStats={() => appState.showStats(false)}
				show={appState.statsShowing}
				profile={appState.profile}
				yesterdaysDate={appState.yesterdaysProblemDate}
				yesterdaysProblem={appState.yesterdaysProblem}
				yesterdaysTargets={appState.yesterdaysTargets}
			/>
		</>
	);

	const titleLogo = (
		<LogoContainer>
			<ImageButton
				type="beastacademy-logo"
				alt="Beast Academy full logo"
				size="titleLogo"
			/>
		</LogoContainer>
	);

	const title = (
		<TitleRow compactLayout={useCompactLayout}>
			<TitleRowContent>
				<TitleRowSide side="left">
					<IconButton
						icon="home"
						size="small"
						onClick={() => {
							window.location.href = "/puzzles/";
						}}
						color="mainInverted"
					/>
					<ImageButton
						type="ba-boxes-logo"
						alt="Beast Academy boxes logo."
						size="medium"
						onClick={() => appState.showLinks(true)}
					/>
				</TitleRowSide>
				<TitleDiv onClick={() => appState.showLinks(true)}>
					{titleLogo}
					<Title>All Ten</Title>
				</TitleDiv>
				<TitleRowSide side="right">
					<IconButton
						icon="chart"
						size="small"
						onClick={() => appState.showStats(true)}
					/>
					<IconButton
						icon="help"
						size="small"
						onClick={() => appState.showHelp(true)}
					/>
				</TitleRowSide>
			</TitleRowContent>
		</TitleRow>
	);

	const body = (
		<BodyContainer className="pullToRefresh">
			<SubheadingRow compactLayout={useCompactLayout}>
				<RowSide side="left">
					<ProgressDisplay
						style="fraction"
						targets={appState.targets}
						hideIfEmpty
						color={subheadingColor}
						problemDate={appState.problemDate}
					/>
				</RowSide>
				<ProgressDisplay
					style="text"
					targets={appState.targets}
					size="large"
					color={subheadingColor}
					margin="small"
					problemDate={appState.problemDate}
				/>
				<RowSide side="right">
					<IconButton
						icon="share-mobile"
						size="small"
						color={subheadingColor}
						onClick={() => appState.showResults(true)}
					/>
				</RowSide>
			</SubheadingRow>
			<TargetDisplayArea>
				<TargetDisplayContainer size={targetDisplayContainerSize}>
					<TargetDisplay
						problem={appState.problem}
						targets={appState.targets}
						onClick={onTargetGrab}
						compact={useCompactTargetDisplay}
						animated
					/>
				</TargetDisplayContainer>
			</TargetDisplayArea>
		</BodyContainer>
	);

	const keyboard = (
		<KeyboardContainer>
			<ExpressionContainer compactLayout={useCompactLayout}>
				<NoticeContainer>
					<NoticeDisplay notice={appState.lastError} />
				</NoticeContainer>
				<AnimationHook name="exprDisplay">
					<ExpressionDisplay
						state={appState.exprState}
						evalInterm
						size={useCompactLayout ? "medium" : "large"}
					/>
				</AnimationHook>
			</ExpressionContainer>
			<ButtonGrid
				state={appState.exprState}
				equalsEnabled={appState.equalsEnabled}
				undosHighlighted={appState.undosHighlighted}
				onInsertElement={onInsertElement}
				onEquals={onEquals}
				onReset={onReset}
				onBackspace={onBackspace}
				size={keyboardSize}
			/>
			{appState.completed && (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						alignSelf: "stretch",
						width: "100%",
						padding: `${HALF_PADDING_UNIT}px 0 ${PADDING_UNIT}px`,
						boxSizing: "border-box",
					}}
				>
					<a
						className="btn-primary"
						href={`${import.meta.env.BASE_URL}`}
						style={{
							textAlign: "center",
							textDecoration: "none",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "100%",
							padding: "12px 20px",
							boxSizing: "border-box",
						}}
					>
						{CTA_LABELS.ALL_PUZZLES}
					</a>
				</div>
			)}
		</KeyboardContainer>
	);

	return (
		<AnimationProvider
			currAnimGen={appState.currAnimGen}
			currAnim={appState.currAnim}
		>
			<ScreenContainer
				ref={gameElRef}
				fillBelowSuiteChrome={!!hideNativeTitleBar}
			>
				<AnimationHook
					name="fakeAnimButton"
					outerClassName={fakeAnimButtonClassName()}
					innerClassName={fakeAnimButtonInnerClassName()}
					hideIfNotAnimating
				>
					{fakeButton}
				</AnimationHook>
				{modals}
				{!hideNativeTitleBar && title}
				{body}
				{keyboard}
			</ScreenContainer>
		</AnimationProvider>
	);
};
export default observer(Main);
