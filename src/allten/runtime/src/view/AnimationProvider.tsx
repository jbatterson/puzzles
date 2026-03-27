import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";

import {AnimContext, AnimControl} from "./util/AnimControl";
import {startAnim, AppAnimation} from "./util/AppAnimation";

export type Props = {
	children: React.ReactNode;
	currAnimGen: number;
	currAnim: AppAnimation | null;
};

const AnimationProvider: React.FC<Props> = function (props: Props) {
	const {children, currAnimGen, currAnim} = props;

	const [ctrl] = useState(new AnimControl());

	const lastGenRef = useRef<number | null>(null);

	useLayoutEffect(() => {
		if (currAnim && (lastGenRef.current ?? 0) < currAnimGen) {
			lastGenRef.current = currAnimGen;
			startAnim(ctrl, currAnim);
		} else if (!currAnim && lastGenRef.current !== null) {
			lastGenRef.current = null;
			ctrl.stopAnim();
		}
	}, [ctrl, currAnim]);

	useEffect(() => {
		const stopAnim = () => {
			ctrl.stopAnim();
		};
		if (typeof window !== "undefined") {
			window.addEventListener("resize", stopAnim);
		}

		return () => {
			if (typeof window !== "undefined") {
				window.removeEventListener("resize", stopAnim);
			}
		};
	}, [ctrl]);

	return <AnimContext.Provider value={ctrl}>{children}</AnimContext.Provider>;
};
export default observer(AnimationProvider);
