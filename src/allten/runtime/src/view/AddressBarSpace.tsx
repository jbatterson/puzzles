import * as React from "react";

import {styled} from "../stitches.config";

type Props = {};

const Space = styled("div", {
	variants: {
		isIOS: {
			true: {
				height: "60px",
			},
		},
	},
});

export const isIOS = function (): boolean {
	return (
		navigator &&
		/iPad|iPhone|iPod|Mac/.test(navigator.platform) &&
		navigator.maxTouchPoints > 1
	);
};
const AddressBarSpace: React.FC<Props> = function (props: Props) {
	return <Space isIOS={isIOS()} />;
};

export default AddressBarSpace;
