import React from "react";
import {observer} from "mobx-react-lite";
import {styled} from "../stitches.config";

import Modal from "./Modal";
import ButtonLink from "./ButtonLink";

import {ImageLinkCard} from "./LinkCard";

import {Space, Paragraph} from "./util/TextContainers";
import {isNowSchoolTime} from "../util/Dates";

export type Props = {
	hideLinks: () => void;
	show: boolean;
	compact?: boolean;
};

const Container = styled("div", {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	margin: "auto",
	overflowX: "hidden",
	overflowY: "auto",
	"-ms-overflow-style": "none",
	scrollbarWidth: "none",
});

const CardText = styled("div", {
	color: "$main",
	marginTop: 0,
});

const BottomContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	alignItems: "center",
	overflowX: "hidden",
	overflowY: "auto",
	"-ms-overflow-style": "none",
	scrollbarWidth: "none",
});

const ButtonImg = styled("img", {
	maxWidth: "80%",
});

const Links: React.FC<Props> = function (props: Props) {
	const {hideLinks, show, compact} = props;

	const isSchoolTime = isNowSchoolTime();
	const modalContent = isSchoolTime ? (
		<ImageLinkCard
			type="ba"
			name="Beast Academy"
			compact={compact}
			id="allten-educators-card"
		>
			<CardText>
				<Paragraph large bold padded>
					Looking for more fun and challenging math activities for your
					classroom?
				</Paragraph>
			</CardText>
			<BottomContainer>
				<ButtonLink
					compact={compact}
					href="https://beastacademy.com/educators"
					newTab
					id="allten-educators-modal-button"
				>
					Learn More
				</ButtonLink>
				<ButtonImg
					src="https://beastacademy.com/assets/wf/images/laptop-2.png"
					alt="BA books with laptop"
				/>
			</BottomContainer>
		</ImageLinkCard>
	) : (
		<ImageLinkCard
			type="ba"
			name="Beast Academy"
			compact={compact}
			id="allten-online-card"
		>
			<CardText>
				<Paragraph large bold padded>
					Looking for more fun and challenging math activities for your student?
				</Paragraph>
			</CardText>
			<BottomContainer>
				<ButtonLink
					compact={compact}
					href="https://beastacademy.com/online"
					newTab
					id="allten-online-modal-button"
				>
					Learn More
				</ButtonLink>
				<ButtonImg
					src="https://beastacademy.com/assets/wf/images/laptop-2.png"
					alt="BA books with laptop"
				/>
			</BottomContainer>
		</ImageLinkCard>
	);

	return (
		<Modal close={hideLinks} show={show}>
			<Container>
				<Space />
				{modalContent}

				<ImageLinkCard
					type="ba"
					name="Beast Academy"
					compact={compact}
					id="allten-playground-card"
					hidden
				>
					<Paragraph large bold padded>
						Looking for more fun and challenging math activities for your
						classroom?
					</Paragraph>

					<BottomContainer id="allten-playground-card-bottom">
						<ButtonLink
							compact={compact}
							href="https://beastacademy.com/playground?audience=teacher"
							newTab
							id="allten-playground-modal-button"
						>
							Visit BA Playground
						</ButtonLink>
						<ButtonImg
							src="https://beastacademy.com/assets/wf/images/pg-logo.svg"
							alt="BA books with laptop"
						/>
					</BottomContainer>
				</ImageLinkCard>

				<Space small={compact} />
			</Container>
		</Modal>
	);
};
export default observer(Links);
