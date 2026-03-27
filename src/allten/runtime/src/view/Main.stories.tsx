import React from "react";
import {Meta} from "@storybook/react";

import AppState from "../state/AppState";
import {createProblem} from "../state/Problem";
import Main from "./Main";

const testDate = new Date("2023/05/26 12:00:00");

export const P2267 = () => {
	const problem = createProblem([2, 2, 6, 7]);
	const appState = new AppState(problem, testDate);
	return <Main appState={appState} />;
};

export const P4679ForbidOps = () => {
	const problem = createProblem([4, 6, 7, 9], {
		rules: {forbidOps: ["+", "*"]},
	});
	const appState = new AppState(problem, testDate);
	return <Main appState={appState} />;
};

export const P1234ForbidParensConcat = () => {
	const problem = createProblem([1, 2, 3, 4], {
		rules: {forbidParens: true, forbidConcat: true},
	});
	const appState = new AppState(problem, testDate);
	return <Main appState={appState} />;
};

export const P3568SingleOps = () => {
	const problem = createProblem([3, 5, 6, 8], {
		rules: {singleOps: true},
	});
	const appState = new AppState(problem, testDate);
	return <Main appState={appState} />;
};

export const P1238OpLimit = () => {
	const problem = createProblem([1, 2, 3, 8], {
		rules: {opLimit: 2},
	});
	const appState = new AppState(problem, testDate);
	return <Main appState={appState} />;
};

export const P2222Imposs = () => {
	const problem = createProblem([2, 2, 2, 2], {
		rules: {impossible: 1},
	});
	const appState = new AppState(problem, testDate);
	return <Main appState={appState} />;
};

export const P3_4_8_36SingleOps = () => {
	const problem = createProblem([3, 4, 8, 36], {
		rules: {forbidConcat: true, singleOps: true},
	});
	const appState = new AppState(problem, testDate);
	return <Main appState={appState} />;
};

export const P1258NegTargets = () => {
	const problem = createProblem([1, 2, 3, 8], {
		targets: [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10],
	});
	const appState = new AppState(problem, testDate);
	return <Main appState={appState} />;
};

export const P1468SquareTargets = () => {
	const problem = createProblem([1, 4, 6, 8], {
		targets: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100],
	});
	const appState = new AppState(problem, testDate);
	return <Main appState={appState} />;
};

export default {
	title: "Pages/Full",
	component: Main,
} as Meta;
