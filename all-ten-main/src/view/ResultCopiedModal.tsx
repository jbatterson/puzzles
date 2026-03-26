import React from "react";
import {observer} from "mobx-react-lite";

import Modal from "./Modal";
import Button from "./Button";

export type Props = {
	hideModal: () => void;
	show: boolean;
	fullscreen?: boolean;
};

import {Container, Paragraph} from "./util/TextContainers";

const ResultCopiedModal: React.FC<Props> = function (props: Props) {
	const {hideModal, show} = props;

	return (
		<Modal close={hideModal} show={show} hideClose>
			<Container horizontal>
				<Paragraph>Results copied to clipboard.</Paragraph>
				<Button onClick={hideModal} text={"OK"} />
			</Container>
		</Modal>
	);
};
export default observer(ResultCopiedModal);
