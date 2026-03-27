import React, {useContext, useEffect, useRef, useState} from "react";
import {css} from "../stitches.config";
import {AnimContext} from "./util/AnimControl";

type HookChild = React.ReactElement | null;

type InternalState = {
	mainAnim: React.CSSProperties | undefined;
	leavingChildIndex: 0 | 1;
	leavingEl: HookChild;
	leavingAnim: React.CSSProperties | undefined;
};

export type Props = {
	name: string;
	children: HookChild;
	tag?: string;
	outerClassName?: string;
	innerClassName?: string;
	innerStyle?: React.CSSProperties;
	leavingClassName?: string;
	hideIfNotAnimating?: boolean;
	leavingStyle?: React.CSSProperties;
	leavingProps?: object | ((origProps: object) => object);
};

const defaultOuterClassName = css({
	position: "relative",
	width: "100%",
	height: "100%",
});

const defaultInnerClassName = css({
	position: "relative",
	width: "100%",
	height: "100%",
});

const defaultLeavingClassName = css({
	position: "absolute",
	left: 0,
	top: 0,
	right: 0,
	bottom: 0,
});

const AnimationHook: React.FC<Props> = function (props: Props) {
	const {
		name,
		children,
		outerClassName = defaultOuterClassName(),
		innerClassName = defaultInnerClassName(),
		innerStyle = {},
		leavingClassName = defaultLeavingClassName(),
		leavingStyle = {},
		leavingProps = {},
	} = props;
	const ContainerTag: any = props.tag ?? "div";

	const mainRef = useRef(null);
	const lastChildrenRef = useRef<HookChild>(null);

	const [internalState, setInternalState] = useState<InternalState>({
		mainAnim: undefined,
		leavingChildIndex: 1,
		leavingEl: null,
		leavingAnim: undefined,
	});

	const animControl = useContext(AnimContext);

	useEffect(() => {
		if (!animControl) {
			return;
		}

		animControl.addEl(name, {
			domElement: mainRef.current,
			onStartAnim(newData) {
				if (newData.leavingAnim) {
					setInternalState((s) => ({
						...s,
						mainAnim: newData.mainAnim,
						leavingChildIndex: s.leavingChildIndex ? 0 : 1,
						leavingEl: lastChildrenRef.current,
						leavingAnim: newData.leavingAnim,
					}));
				} else {
					setInternalState((s) => ({...s, mainAnim: newData.mainAnim}));
				}
			},
			onFinishAnim() {
				setInternalState((s) => ({
					...s,
					mainAnim: undefined,
					leavingEl: null,
					leavingAnim: undefined,
				}));
			},
		});

		return () => animControl.removeEl(name);
	}, [name, animControl]);

	useEffect(() => {
		lastChildrenRef.current = children;
	}, [children]);

	let leavingContainer: React.ReactNode;
	if (internalState.leavingEl) {
		const leavingEl = internalState.leavingEl;
		const leavingElProps =
			typeof leavingProps === "function"
				? leavingProps(leavingEl.props)
				: {...leavingEl.props, ...leavingProps};
		const leavingElReal = React.cloneElement(leavingEl, leavingElProps);
		const leavingStyleReal: React.CSSProperties = {
			...innerStyle,
			...leavingStyle,
			...(internalState.leavingAnim || {}),
		};
		leavingContainer = (
			<div className={leavingClassName} style={leavingStyleReal}>
				{leavingElReal}
			</div>
		);
	}

	const innerStyleReal: React.CSSProperties = {
		...innerStyle,
		...(internalState.mainAnim || {}),
	};
	const currentContainer = (
		<div className={innerClassName} style={innerStyleReal}>
			{children}
		</div>
	);

	const child0 =
		internalState.leavingChildIndex === 1 ? currentContainer : leavingContainer;
	const child1 =
		internalState.leavingChildIndex === 0 ? currentContainer : leavingContainer;

	// render if a. shown when not animating or b. animation currently going on
	const shouldRender = true; /* !!(
		!hideIfNotAnimating ||
		internalState.mainAnim ||
		internalState.leavingAnim
	); */
	return shouldRender ? (
		<ContainerTag className={outerClassName} ref={mainRef}>
			{shouldRender ? (
				<>
					{child0} {child1}
				</>
			) : (
				<></>
			)}
		</ContainerTag>
	) : (
		<></>
	);
};
export default AnimationHook;
