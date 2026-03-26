import React from "react";
import {styled} from "../stitches.config";

import {NoticeState} from "../state/AppState";
import {ColorProp, colorVariants} from "./util/Colors";
import useNotice, {NoticeConfig} from "./util/useNotice";

export type Props = {
	notice: NoticeState | null;
	background?: ColorProp;
};

const Container = styled("div", {
	transition: "opacity 0.3s",

	height: 24,
	borderRadius: 8,
	fontSize: "12pt",
	lineHeight: "24px",
	textAlign: "center",

	background: "$$color",
	color: "$$foreColor",

	variants: {
		background: colorVariants,
		hide: {
			true: {
				opacity: 0,
			},
		},
	},
	defaultVariants: {
		background: "main",
	},
});

const noticeConfig: NoticeConfig<NoticeState> = {
	getGen: (s) => s.gen,
	getDuration: (s) => s.duration,
	getData: (s) => s.message,
	fadeOutDuration: 300,
};

const NoticeDisplay: React.FC<Props> = function (props: Props) {
	const {notice, background} = props;
	const [message, fadingOut] = useNotice(noticeConfig, notice);

	if (message === null) {
		return (
			<Container background={background} hide>
				{""}
			</Container>
		);
	}

	return (
		<Container background={background} hide={fadingOut}>
			{message}
		</Container>
	);
};
export default NoticeDisplay;
