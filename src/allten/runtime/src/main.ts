/**
 * Entry point for building the client code. Does not automatically start things
 * up; instead exports a render function that gets passed a DOM element and
 * parameters about the problem.
 *
 * Also exports a query-string parser just as a convenience, in case the JS
 * using this code is not being built and has no easy access to a parser.
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
