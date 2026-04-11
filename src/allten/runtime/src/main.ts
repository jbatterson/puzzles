/**
 * Legacy Webpack standalone entry point (webpack.config.js → entry: "./src/main.ts").
 *
 * This file is NOT used by the suite's Vite build. The active entry point is
 * src/allten/main.jsx, which is bundled by Vite alongside the rest of the suite.
 *
 * ReactDOM.render is the correct React 17 API here; createRoot (React 18+) is
 * used in main.jsx because that module runs under the suite's React 19 runtime.
 *
 * Webpack is not run in CI. This file is retained so the standalone Webpack
 * build remains functional for local development against the original pipeline.
 */

import ReactDOM from "react-dom";
import React from "react";
import QueryString from "query-string";
import MainContainer from "./view/Main";
import AppState from "./state/AppState";
import {ProblemProps} from "./state/Problem";
import {createProblemForDate} from "./util/ProblemUtil";

function render(container: HTMLElement, props: ProblemProps) {
	const problemDate = new Date();
	const appState = new AppState(
		createProblemForDate(problemDate, props),
		problemDate
	);
	appState.loadFromStorage();
	const mainEl = React.createElement(MainContainer, {appState});
	ReactDOM.unmountComponentAtNode(container);
	ReactDOM.render(mainEl, container);
}

function parseQS(qs: string): object {
	return QueryString.parse(qs);
}

export {render, parseQS};
