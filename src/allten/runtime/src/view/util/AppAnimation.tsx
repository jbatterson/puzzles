import {keyframes} from "../../stitches.config";
import {AnimControl} from "./AnimControl";

export type AppAnimation =
	| {
			name: "makeInterm";
			buttonIndex: number;
	  }
	| {
			name: "makeTarget";
			targetIndex: number;
	  }
	| {
			name: "makeExtraTarget";
			targetIndex: number;
	  };

function startMakeInterm(ctrl: AnimControl, buttonIndex: number) {
	const numberButtonName = `numberButton${buttonIndex}`;

	const translate = ctrl.getTranslation(numberButtonName, "exprDisplay");

	const exprDisplayTextVanishKF = keyframes({
		"0%": {
			opacity: 1,
			transform: "initial",
			"-webkit-transform": "initial",
			transformOrigin: "center",
			"-webkit-transform-origin": "center",
		},
		"60%": {
			opacity: 0,
			transform: "scale(0, 0)",
			"-webkit-transform": "scale(0, 0)",
			transformOrigin: "center",
			"-webkit-transform-origin": "center",
		},
		"100%": {
			opacity: 0,
			transform: "scale(0, 0)",
			"-webkit-transform": "scale(0, 0)",
			transformOrigin: "center",
			"-webkit-transform-origin": "center",
		},
	});
	const intermButtonAppearKF = keyframes({
		"0%": {
			opacity: 0,
		},
		"20%": {
			opacity: 0,
		},
		"80%": {
			opacity: 1,
		},
		"100%": {
			opacity: 1,
		},
	});
	const intermButtonMoveKF = keyframes({
		"0%": {
			transform: translate,
			"-webkit-transform": translate,
		},
		"40%": {
			transform: translate,
			"-webkit-transform": translate,
		},
		"100%": {
			transform: "translate(0, 0)",
			"-webkit-transform": "translate(0, 0)",
		},
	});

	const duration = 800;
	const durationCSS = duration + "ms";
	ctrl.startAnim({
		duration,
		els: {
			exprDisplay: {
				leavingAnim: {
					animation: `${exprDisplayTextVanishKF} ${durationCSS} linear forwards`,
				},
			},
			[numberButtonName]: {
				mainAnim: {
					animation:
						`${intermButtonAppearKF} ${durationCSS} linear, ` +
						`${intermButtonMoveKF} ${durationCSS} ease-in-out`,
				},
			},
		},
	});
}

function startMakeTarget(
	ctrl: AnimControl,
	targetIndex: number,
	extra?: boolean
) {
	const targetExprName = `targetExpr${targetIndex}`;

	const translateFrom = ctrl.getTranslation("fakeAnimButton", "exprDisplay");
	const translateTo = ctrl.getTranslation("fakeAnimButton", targetExprName);
	const translateToAbove = ctrl.getTranslation(
		"fakeAnimButton",
		targetExprName,
		"up"
	);

	const exprDisplayTextVanishKF = keyframes({
		"0%": {
			opacity: 1,
			transform: "initial",
			"-webkit-transform": "initial",
			transformOrigin: "center",
			"-webkit-transform-origin": "center",
		},
		"30%": {
			opacity: 0,
			transform: "scale(0, 0)",
			"-webkit-transform": "scale(0, 0)",
			transformOrigin: "center",
			"-webkit-transform-origin": "center",
		},
		"100%": {
			opacity: 0,
			transform: "scale(0, 0)",
			"-webkit-transform": "scale(0, 0)",
			transformOrigin: "center",
			"-webkit-transform-origin": "center",
		},
	});
	const targetExprLeavingKF = keyframes({
		"0%": {
			opacity: 1,
		},
		"50%": {
			opacity: 1,
		},
		"100%": {
			opacity: 0,
		},
	});
	const fakeButtonAppearKF = keyframes({
		"0%": {
			opacity: 0,
		},
		"10%": {
			opacity: 0,
		},
		"40%": {
			opacity: 1,
		},
		"60%": {
			opacity: 1,
		},
		"80%": {
			opacity: 0,
		},
		"100%": {
			opacity: 0,
		},
	});
	const fakeButtonMoveKF = extra
		? keyframes({
				"0%": {
					transform: translateFrom,
					"-webkit-transform": translateFrom,
				},
				"18%": {
					transform: translateFrom,
					"-webkit-transform": translateFrom,
				},
				"50%": {
					transform: translateTo,
					"-webkit-transform": translateTo,
				},
				"80%": {
					transform: translateToAbove,
					"-webkit-transform": translateToAbove,
				},
				"100%": {
					transform: translateToAbove,
					"-webkit-transform": translateToAbove,
				},
		  })
		: keyframes({
				"0%": {
					transform: translateFrom,
					"-webkit-transform": translateFrom,
				},
				"25%": {
					transform: translateFrom,
					"-webkit-transform": translateFrom,
				},
				"62.5%": {
					transform: translateTo,
					"-webkit-transform": translateTo,
				},
				"100%": {
					transform: translateTo,
					"-webkit-transform": translateTo,
				},
		  });

	const duration = extra ? 2400 : 1600;
	const durationCSS = duration + "ms";
	ctrl.startAnim({
		duration,
		els: {
			exprDisplay: {
				leavingAnim: {
					animation: `${exprDisplayTextVanishKF} ${durationCSS} linear forwards`,
				},
			},
			fakeAnimButton: {
				mainAnim: {
					animation:
						`${fakeButtonAppearKF} ${durationCSS} linear both, ` +
						`${fakeButtonMoveKF} ${durationCSS} ease-in-out both`,
				},
			},
			[targetExprName]: {
				leavingAnim: {
					animation: `${targetExprLeavingKF} ${durationCSS} ease-in-out forwards`,
				},
			},
		},
	});
}

export function startAnim(ctrl: AnimControl, anim: AppAnimation) {
	if (anim.name === "makeInterm") {
		startMakeInterm(ctrl, anim.buttonIndex);
	} else if (anim.name === "makeTarget") {
		startMakeTarget(ctrl, anim.targetIndex);
	} else if (anim.name === "makeExtraTarget") {
		startMakeTarget(ctrl, anim.targetIndex, true);
	}
}
