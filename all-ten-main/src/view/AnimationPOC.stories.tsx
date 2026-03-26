import React, {useState, useRef} from "react";
import {Meta} from "@storybook/react";
import {styled, keyframes} from "../stitches.config";

type Rect = [number, number, number, number];

function rectToStyle(r: Rect): React.CSSProperties {
	return {
		left: r[0],
		top: r[1],
		width: r[2],
		height: r[3],
	};
}

function randRange(min: number, max: number): number {
	return min + Math.floor((max - min) * Math.random());
}

const GrayBox = styled("div", {
	position: "relative",
	display: "inline-block",
	width: 300,
	height: 300,
	margin: 20,
	background: "#EEE",
});

const ColoredBox = styled("div", {
	position: "absolute",
	border: "black solid 2px",

	display: "flex",
	justifyContent: "center",
	alignItems: "center",

	variants: {
		color: {
			red: {
				borderColor: "red",
			},
			blue: {
				borderColor: "blue",
			},
		},
	},
});

const SmallDot = styled("div", {
	width: 10,
	height: 10,
	borderRadius: 5,
	background: "black",
});

const BigDot = styled("div", {
	width: 100,
	height: 100,
	minWidth: 100,
	minHeight: 100,
	borderRadius: 50,
	background: "purple",
	zIndex: 1,
});

const CenterStackContainer = styled("div", {
	position: "relative",
	width: "100%",
	height: "100%",
});

const CenterLayer = styled("div", {
	position: "absolute",
	left: 0,
	top: 0,
	width: "100%",
	height: "100%",

	display: "flex",
	justifyContent: "center",
	alignItems: "center",
});

type CenterStackProps = {
	children: React.ReactNode;
};
const CenterStack = (props: CenterStackProps) => {
	const items = React.Children.map(props.children, (el, i) => {
		return <CenterLayer key={i}>{el}</CenterLayer>;
	});
	return <CenterStackContainer>{items}</CenterStackContainer>;
};

export const Main = () => {
	const [r1, setR1] = useState<Rect>([5, 5, 100, 100]);
	const [r2, setR2] = useState<Rect>([5, 5, 100, 100]);
	const [flipColors, setFlipColors] = useState<boolean>(false);
	const [dotPos, setDotPos] = useState<1 | 2>(1);
	const [animating, setAnimating] = useState<boolean>(false);

	const dot1 = useRef<HTMLDivElement>(null);
	const dot2 = useRef<HTMLDivElement>(null);
	const moveAnim = useRef<any>(null);

	function onRandomize() {
		const w1 = randRange(50, 150);
		const h1 = randRange(50, 150);
		const w2 = randRange(50, 150);
		const h2 = randRange(50, 150);
		const x1 = randRange(0, 300 - w1);
		const y1 = randRange(0, 300 - h1);
		const x2 = randRange(0, 300 - w2);
		const y2 = randRange(0, 300 - h2);
		setR1([x1, y1, w1, h1]);
		setR2([x2, y2, w2, h2]);
		setAnimating(false);
	}

	function onFlipColors() {
		setFlipColors(!flipColors);
	}

	function onStartAnimation() {
		const dot1El = dot1.current;
		const dot2El = dot2.current;
		if (!dot1El || !dot2El) {
			return;
		}
		const elRect1 = dot1El.getBoundingClientRect();
		const elRect2 = dot2El.getBoundingClientRect();
		const elRectFrom = dotPos === 1 ? elRect1 : elRect2;
		const elRectTo = dotPos === 1 ? elRect2 : elRect1;
		const dx =
			elRectFrom.left +
			elRectFrom.width / 2 -
			elRectTo.left -
			elRectTo.width / 2;
		const dy =
			elRectFrom.top +
			elRectFrom.height / 2 -
			elRectTo.top -
			elRectTo.height / 2;
		moveAnim.current = keyframes({
			"0%": {
				transform: `translate(${dx}px, ${dy}px)`,
			},
			"100%": {
				transform: "translate(0)",
			},
		});
		setDotPos(dotPos === 1 ? 2 : 1);
		setAnimating(true);
	}

	function onStopAnimation() {
		setAnimating(false);
	}

	const color1 = flipColors ? "blue" : "red";
	const color2 = flipColors ? "red" : "blue";

	const bigDotStyle =
		animating && moveAnim.current
			? {animation: `${moveAnim.current} 2000ms`}
			: {};
	const bigDot = <BigDot style={bigDotStyle} />;
	return (
		<div>
			<GrayBox>
				<ColoredBox color={color1} style={rectToStyle(r1)}>
					<CenterStack>
						<SmallDot ref={dot1} />
						{dotPos === 1 ? bigDot : null}
					</CenterStack>
				</ColoredBox>
			</GrayBox>
			<GrayBox>
				<ColoredBox color={color2} style={rectToStyle(r2)}>
					<CenterStack>
						<SmallDot ref={dot2} />
						{dotPos === 2 ? bigDot : null}
					</CenterStack>
				</ColoredBox>
			</GrayBox>
			<div>
				<button onClick={onRandomize}>Randomize</button>
				<button onClick={onStartAnimation}>Start</button>
				<button onClick={onStopAnimation}>Stop</button>
				<button onClick={onFlipColors}>Flip Colors</button>
			</div>
		</div>
	);
};

export default {
	title: "Pages/AnimationProofOfConcept",
} as Meta;
