import React from "react";
import {observer} from "mobx-react-lite";

import AllTenLinksModal from "../../../../shared/AllTenLinksModal.jsx";

export type Props = {
	hideLinks: () => void;
	show: boolean;
	compact?: boolean;
};

const Links: React.FC<Props> = function (props: Props) {
	const {hideLinks, show, compact} = props;
	return (
		<AllTenLinksModal show={show} onClose={hideLinks} compact={compact} />
	);
};

export default observer(Links);
