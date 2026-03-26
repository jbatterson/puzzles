import React, {DragEvent, useRef} from "react";
import {observer} from "mobx-react-lite";
import {styled, keyframes} from "../stitches.config";
import IconButton from "./IconButton";

export type Props = {
	close: () => void;
	size?: "fullscreen" | "wide";
	extraPad?: boolean;
	show?: boolean;
	center?: boolean;
	priority?: boolean; // will be shown above modals without priority
	hideClose?: boolean;
	showPrivacy?: boolean;
};

const SlideIn = keyframes({
	"0%": {
		opacity: 0,
		top: "20px",
	},
	"100%": {
		opacity: 1,
		top: "0",
	},
});

const Background = styled("div", {
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	zIndex: "50",
	margin: 0,
	backgroundColor: "$bgTransparent",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	transition: "opacity 0.3s ease-in",
	opacity: 0,
	overflow: "hidden",
	visibility: "hidden",
	display: "none",
	variants: {
		show: {
			true: {
				opacity: 1,
				visibility: "visible",
				display: "flex",
			},
		},
		priority: {
			true: {
				zIndex: 100,
			},
		},
	},
});

const Body = styled("div", {
	display: "none",
	position: "relative",
	width: "min(95%, 450px)",
	maxHeight: "min(95%, 750px)",
	borderRadius: "10px",
	backgroundColor: "$bg",
	padding: "20px 0",
	boxSizing: "border-box",
	animation: `${SlideIn} ease-in .3s`,
	boxShadow:
		"1px 2px 16px 4px rgba(15, 10, 8, .05)," /* ambient */ +
		"1px 1px 8px 1px rgba(15, 10, 8, .08)," /* penumbra */ +
		"1px 1px 4px 1px rgba(15, 10, 8, .04)" /* umbra */,
	transition: "opacity 0.3s ease-in, top 0.3s ease-in, visibility 0.3s",
	opacity: 0,
	top: "20px",
	visibility: "hidden",
	overflow: "hidden",

	variants: {
		size: {
			fullscreen: {
				width: "100%",
				height: "100%",
				maxHeight: "initial",
				borderRadius: "0",
			},
			wide: {
				width: "min(95%, 730px)",
			},
		},
		extraPad: {
			true: {
				padding: "30px 0",
			},
		},
		show: {
			true: {
				opacity: 1,
				top: 0,
				right: 0,
				display: "block",
				visibility: "visible",
			},
		},
	},
});

const ContentContainer = styled("div", {
	overflowY: "auto",
	"-ms-overflow-style": "none",
	scrollbarWidth: "none",
	padding: "0 20px",
	height: "100%",
	variants: {
		center: {
			true: {
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			},
		},
	},
});

const CloseButton = styled("div", {
	position: "absolute",
	top: "4px",
	right: "4px",
	zIndex: 10,
});

const Privacy = styled("a", {
	display: "block",
	position: "absolute",
	right: 16,
	bottom: 8,
	color: "$gray",
	fontSize: "smaller",
});

const handleDrag = (e: DragEvent): void => {
	e.stopPropagation();
};

const Modal: React.FC<Props> = function (props) {
	const {
		children,
		close,
		size,
		extraPad,
		show,
		center,
		priority,
		hideClose,
		showPrivacy,
	} = props;

	const bodyRef = useRef(null);

	const closeIfClickOutside = (e: React.MouseEvent) => {
		if (!bodyRef.current) {
			return;
		}

		const body: HTMLDivElement = bodyRef.current;

		const {x, y, width, height} = body.getBoundingClientRect();
		const {clientX, clientY} = e;
		const maxX = x + width;
		const maxY = y + height;
		const outsideBody =
			clientX < x || clientX > maxX || clientY < y || clientY > maxY;

		if (outsideBody) {
			close();
		}
	};

	return (
		<Background show={show} onClick={closeIfClickOutside} priority={priority}>
			<Body ref={bodyRef} size={size} extraPad={extraPad} show={show}>
				{hideClose ? (
					<></>
				) : (
					<CloseButton>
						<IconButton
							icon="close"
							size="small"
							noBackground
							color="mainInverted"
							onClick={close}
						/>
					</CloseButton>
				)}
				<ContentContainer center={center} onDragStart={handleDrag}>
					{children}
				</ContentContainer>
				{showPrivacy ? (
					<Privacy href="https://beastacademy.com/privacy">
						Privacy Policy
					</Privacy>
				) : null}
			</Body>
		</Background>
	);
};

export default observer(Modal);
