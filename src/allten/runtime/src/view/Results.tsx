import React from "react";
import {observer} from "mobx-react-lite";
import copy from "copy-to-clipboard";
import {styled} from "../stitches.config";
import isMobile from "ismobilejs";

import AppState from "../state/AppState";
import ProgressDisplay from "./ProgressDisplay";
import SolveOrderDisplay from "./SolveOrderDisplay";
import {targetsToSolveOrderString} from "../state/AppStateUtil";

import {
	SubtleSubheading,
	Container,
	Centered,
	Space,
	Paragraph,
	Title,
} from "./util/TextContainers";

import Modal from "./Modal";
import ShareButton from "./ShareButton";
import PlayAgainTimer from "./PlayAgainTimer";
import StatsWidget from "./StatsWidget";
import {isNowSchoolTime, pstStringify} from "../util/Dates";
import {getPuzzleNumberAsString} from "../util/ProblemUtil";
import ButtonLink from "./ButtonLink";
import {CTA_LABELS} from "../../../../../shared-contracts/ctaLabels.js";

export const RESULTS_CLIPBOARD_UUID = "3834033daa48";
export const HTML_TAG_REGEX = /<[\s\S\n]*?>/;

const isPhone = isMobile(navigator.userAgent).phone;

export type Props = {
	hideResults: () => void;
	appState: AppState;
	show: boolean;
	compact?: boolean;
};

const Clipboard = styled("div", {
	display: "none",
});

const PlugWrapper = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	padding: "20px 20px 8px",
	margin: "8px 0 16px",
	backgroundColor: "$lightGray",
	borderRadius: 10,
	textDecoration: "none",
	variants: {
		hidden: {
			true: {
				display: "none",
			},
		},
	},
});

const ImageParagraph = styled("div", {
	display: "flex",
	alignItems: "center",
});

/**
 * Copies the result to the clipboard, in both rich and plaintext.
 */
const resultsToClipboard = function (
	result: {
		richStr: string;
		plainStr: string;
	},
	showResultCopiedModal: () => void
) {
	const {richStr, plainStr} = result;
	copy(richStr, {
		format: "text/html",
	});
	copy(plainStr, {
		format: "text/plain",
	});
	showResultCopiedModal();
};

/**
 * Gets the results from the element tagged with RESULTS_CLIPBOARD_UUID,
 * in both rich and plaintext.
 */

const getResultsAsStr = function (): {richStr: string; plainStr: string} {
	// fetch the text as a string with HTML markup
	const richStr =
		document.getElementById(RESULTS_CLIPBOARD_UUID)?.innerHTML || "";

	// build the plain string from the rich string by filtering out HTML tags
	let plainStr;
	let nextPlainStr = richStr; // the filtered version of the string
	do {
		plainStr = nextPlainStr;
		nextPlainStr = plainStr.replace(HTML_TAG_REGEX, "\n");
	} while (plainStr !== nextPlainStr);
	plainStr = plainStr
		.split("\n")
		.filter((s) => s.length)
		.join("\n");

	return {richStr, plainStr};
};

const Results: React.FC<Props> = function (props: Props) {
	const {hideResults, appState, show, compact} = props;
	const {targets, profile, problemDate} = appState;
	const solveOrderString = targetsToSolveOrderString(targets);
	const puzzleNumberStr = getPuzzleNumberAsString(problemDate);

	const doShare = function () {
		const results = getResultsAsStr();
		const shareData = {
			text: results.plainStr,
		};
		if (isPhone && navigator.share && navigator.canShare(shareData)) {
			navigator.share(shareData);
		} else {
			resultsToClipboard(results, () => appState.showResultCopiedModal(true));
		}
		appState.hasSharedToday = true;
	};

	const resultsForMobileSharing = (
		<Clipboard id={RESULTS_CLIPBOARD_UUID}>
			<Paragraph>All Ten #{puzzleNumberStr}</Paragraph>
			<ProgressDisplay
				style="fraction"
				targets={targets}
				bold
				excited
				problemDate={appState.problemDate}
			/>
			<Paragraph>{solveOrderString}</Paragraph>
		</Clipboard>
	);

	const isSchoolTime = isNowSchoolTime();
	const modalContent = isSchoolTime ? (
		<PlugWrapper id="allten-plug-educators">
			<Title>Are you a teacher?</Title>
			<ImageParagraph>
				<Paragraph centered>
					Check out our interactive math curriculum for Grades 1-5 designed by
					the global leaders in advanced math education.
				</Paragraph>
			</ImageParagraph>
			<ButtonLink
				href="https://beastacademy.com/educators"
				compact={compact}
				id="allten-plug-educators-button"
				newTab
			>
				Learn More
			</ButtonLink>
		</PlugWrapper>
	) : (
		<PlugWrapper id="allten-plug-online">
			<Title>More challenges ahead!</Title>
			<ImageParagraph>
				<Paragraph centered>
					Check out our interactive full math curriculum tailored to advanced
					learners ages 6-13.
				</Paragraph>
			</ImageParagraph>
			<ButtonLink
				href="https://beastacademy.com/online"
				compact={compact}
				id="allten-plug-online-button"
				newTab
			>
				Learn More
			</ButtonLink>
		</PlugWrapper>
	);

	return (
		<Modal close={hideResults} show={show} extraPad center>
			<Container>
				<Centered>
					<ProgressDisplay
						targets={targets}
						style="text"
						size="large"
						problemDate={appState.problemDate}
					/>
				</Centered>
				<Space small />
				{modalContent}
				<PlugWrapper id="allten-plug-playground" hidden>
					<Title>Enjoying All Ten? Check out Beast Academy for more!</Title>
					<ImageParagraph>
						<Paragraph centered>
							Designed by the global leaders in advanced math education, explore
							our collection of <b>free tabletop math activities</b>.
						</Paragraph>
					</ImageParagraph>
					<ButtonLink
						href="https://beastacademy.com/playground?audience=teacher"
						compact={compact}
						id="allten-plug-playground-button"
						newTab
					>
						Visit BA Playground
					</ButtonLink>
				</PlugWrapper>
				<StatsWidget profile={profile} />
				<Centered>
					<SubtleSubheading>SOLVE ORDER</SubtleSubheading>
					<SolveOrderDisplay targets={targets} />
				</Centered>
				<Space />
				<Centered>
					<ShareButton doShare={doShare} />
				</Centered>
				{(appState.hasSharedToday || appState.completed) && (
					<PlayAgainTimer today={pstStringify(appState.problemDate)} />
				)}
				<Space small />
				<Centered>
					<a
						className="btn-primary"
						href={`${import.meta.env.BASE_URL}`}
						style={{
							textAlign: "center",
							textDecoration: "none",
							display: "inline-flex",
							alignItems: "center",
							justifyContent: "center",
							padding: "12px 24px",
							marginTop: "4px",
						}}
					>
						{CTA_LABELS.ALL_PUZZLES}
					</a>
				</Centered>
				{resultsForMobileSharing}
			</Container>
		</Modal>
	);
};
export default observer(Results);
