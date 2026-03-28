import React from "react";

const NUDGE_AMOUNT = 50;

export type StartAnimElementData = {
	mainAnim?: React.CSSProperties;
	leavingAnim?: React.CSSProperties;
};

export type StartAnimData = {
	duration: number;
	els: {[name: string]: StartAnimElementData};
};

type AnimElement = {
	name: string;
	domElement: HTMLElement | null;
	activeAnim: boolean;
	onStartAnim: (data: StartAnimElementData) => void;
	onFinishAnim: () => void;
};

function getDomElPos(domEl: HTMLElement): [number, number] {
	const rect = domEl.getBoundingClientRect();
	return [rect.left + rect.width / 2, rect.top + rect.height / 2];
}

export class AnimControl {
	els: Map<string, AnimElement>;
	anyActive: boolean;
	endTimeout: ReturnType<typeof setTimeout> | null;

	constructor() {
		this.els = new Map();
		this.anyActive = false;
		this.endTimeout = null;
	}

	addEl(name: string, el: Partial<AnimElement>) {
		if (this.els.get(name)) {
			console.warn(
				"AnimControl already had an element with this name, ignoring",
				{name}
			);
			return;
		}
		this.els.set(name, {
			name,
			domElement: null,
			activeAnim: false,
			onStartAnim: () => {},
			onFinishAnim: () => {},
			...el,
		});
	}

	removeEl(name: string) {
		this.els.delete(name);
	}

	startAnim(data: StartAnimData) {
		this.stopAnim();
		Object.keys(data.els).forEach((name) => {
			const el = this.els.get(name);
			if (el) {
				el.onStartAnim(data.els[name]!);
				el.activeAnim = true;
			}
		});

		this.anyActive = true;
		this.endTimeout = setTimeout(() => this.stopAnim(), data.duration);
	}

	stopAnim() {
		if (!this.anyActive) {
			return;
		}

		this.els.forEach((el) => {
			if (el.activeAnim) {
				el.onFinishAnim();
				el.activeAnim = false;
			}
		});

		if (this.endTimeout) {
			clearTimeout(this.endTimeout);
		}
		this.anyActive = false;
		this.endTimeout = null;
	}

	getDisplacement(from: string, to: string): [number, number] | null {
		const fromEl = this.els.get(from);
		const fromDom = fromEl && fromEl.domElement;
		const toEl = this.els.get(to);
		const toDom = toEl && toEl.domElement;
		if (!fromDom || !toDom) {
			return null;
		}
		const fromP = getDomElPos(fromDom);
		const toP = getDomElPos(toDom);
		return [toP[0] - fromP[0], toP[1] - fromP[1]];
	}

	getTranslation(
		from: string,
		to: string,
		nudge?: "up" | "down" | "left" | "right"
	): string {
		const disp = this.getDisplacement(from, to);
		if (disp === null) {
			return " ";
		}
		switch (nudge) {
			case "up":
				disp[1] -= NUDGE_AMOUNT;
				break;
			case "down":
				disp[1] += NUDGE_AMOUNT;
				break;
			case "left":
				disp[0] -= NUDGE_AMOUNT;
				break;
			case "right":
				disp[0] += NUDGE_AMOUNT;
				break;
		}
		return `translate(${disp[0]}px, ${disp[1]}px) `;
	}
}

export const AnimContext = React.createContext<AnimControl | null>(null);
