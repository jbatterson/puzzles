import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import isMobile from "ismobilejs";

import AppState from "../state/AppState";
import SolveOrderDisplay from "./SolveOrderDisplay";

import FloatingModalShell from "../../../../shared/FloatingModalShell.jsx";
import SuiteCompletionTitle from "../../../../shared/SuiteCompletionTitle.jsx";
import ShareIcon from "../../../../shared/ShareIcon.jsx";
import ShareResultToast, {
	SHARE_RESULT_TOAST_MS,
} from "../../../../shared/ShareResultToast.jsx";
import {MODAL_INTENTS} from "../../../../../shared-contracts/modalIntents.js";
import {isNowSchoolTime} from "../../../../../shared-contracts/schoolTime.js";
import {buildAllTenInPuzzleStyleSharePlaintext} from "../../../../../shared-contracts/allTenSharePlaintext.js";
import {CTA_LABELS} from "../../../../../shared-contracts/ctaLabels.js";
import {
	formatSolveElapsedHms,
	readPersistedSolveElapsedMs,
} from "../util/solveTimerStorage";

export type Props = {
	hideResults: () => void;
	appState: AppState;
	show: boolean;
	compact?: boolean;
};

const isPhone = isMobile(navigator.userAgent).phone;

function pluralUnit(n: number, singular: string, plural: string) {
	return n === 1 ? singular : plural;
}

const Results: React.FC<Props> = function (props: Props) {
	const {hideResults, appState, show} = props;
	const {targets, profile, problemDate} = appState;

	const [shareUi, setShareUi] = useState<{
		preview: string;
		fadeOut: boolean;
		top?: number;
	} | null>(null);
	const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const shareAnchorRef = useRef<HTMLDivElement | null>(null);

	useEffect(
		() => () => {
			if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
		},
		[],
	);

	useEffect(() => {
		if (show) return;
		if (toastTimeoutRef.current) {
			clearTimeout(toastTimeoutRef.current);
			toastTimeoutRef.current = null;
		}
		const id = requestAnimationFrame(() => setShareUi(null));
		return () => cancelAnimationFrame(id);
	}, [show]);

	const pinShareToast = show && shareUi != null;

	useEffect(() => {
		if (!pinShareToast) return;
		const updateTop = () => {
			const n = shareAnchorRef.current;
			if (!n) return;
			const top = n.getBoundingClientRect().bottom + 6;
			setShareUi(prev => (prev ? {...prev, top} : null));
		};
		const id = requestAnimationFrame(updateTop);
		window.addEventListener("resize", updateTop);
		window.addEventListener("scroll", updateTop, true);
		return () => {
			cancelAnimationFrame(id);
			window.removeEventListener("resize", updateTop);
			window.removeEventListener("scroll", updateTop, true);
		};
	}, [pinShareToast]);

	const dismissShareToast = useCallback(() => {
		if (toastTimeoutRef.current) {
			clearTimeout(toastTimeoutRef.current);
			toastTimeoutRef.current = null;
		}
		setShareUi(null);
	}, []);

	const sharePlaintext = useMemo(() => {
		const elapsedMs = readPersistedSolveElapsedMs(problemDate);
		return buildAllTenInPuzzleStyleSharePlaintext(
			targets,
			problemDate,
			elapsedMs ?? undefined,
		);
	}, [targets, problemDate, show]);

	const timeHms = useMemo(() => {
		const ms = readPersistedSolveElapsedMs(problemDate);
		return formatSolveElapsedHms(ms ?? 0);
	}, [problemDate, show]);

	const handleShare = useCallback(() => {
		const text = sharePlaintext;
		const markShared = () => {
			appState.hasSharedToday = true;
		};
		const runClipboardToast = () => {
			if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
			const r = shareAnchorRef.current?.getBoundingClientRect();
			setShareUi({
				preview: text,
				fadeOut: false,
				top: r ? r.bottom + 6 : undefined,
			});
			toastTimeoutRef.current = setTimeout(() => {
				setShareUi(prev => (prev ? {...prev, fadeOut: true} : null));
				toastTimeoutRef.current = null;
			}, SHARE_RESULT_TOAST_MS);
		};

		if (isPhone && navigator.share) {
			const shareData = {text};
			if (navigator.canShare?.(shareData)) {
				navigator
					.share(shareData)
					.then(() => {
						markShared();
					})
					.catch(() => {
						navigator.clipboard.writeText(text).then(() => {
							runClipboardToast();
							markShared();
						});
					});
				return;
			}
		}
		navigator.clipboard.writeText(text).then(() => {
			runClipboardToast();
			markShared();
		});
	}, [sharePlaintext, appState]);

	const shareToastViewportStyle =
		shareUi != null && shareUi.top != null
			? {
					position: "fixed" as const,
					top: shareUi.top,
					left: "50%",
					right: "auto" as const,
					transform: "translateX(-50%)",
					marginTop: 0,
					zIndex: 10050,
				}
			: undefined;

	const schoolTime = isNowSchoolTime();
	const {numPlays, numStreak, numAllTens} = profile;
	const base = import.meta.env.BASE_URL;

	return (
		<>
			<FloatingModalShell
				show={show}
				onClose={hideResults}
				intent={MODAL_INTENTS.RESULTS}
				contentClassName="suite-completion-shell"
			>
				<SuiteCompletionTitle>ALL TEN!</SuiteCompletionTitle>

				{schoolTime ? (
					<div className="suite-completion-promo" id="suite-completion-plug-educators">
						<div className="suite-completion-promo-title">Are you a teacher?</div>
						<p className="suite-completion-promo-copy">
							Check out our interactive math curriculum for Grades 1-5 designed by
							the global leaders in advanced math education.
						</p>
						<a
							className="suite-completion-cta"
							id="suite-completion-educators-button"
							href="https://beastacademy.com/educators"
							target="_blank"
							rel="noreferrer"
						>
							Learn More
						</a>
					</div>
				) : (
					<div className="suite-completion-promo" id="suite-completion-plug-online">
						<div className="suite-completion-promo-title">More challenges ahead!</div>
						<p className="suite-completion-promo-copy">
							Check out our interactive full math curriculum tailored to advanced
							learners ages 6-13.
						</p>
						<a
							className="suite-completion-cta"
							id="suite-completion-online-button"
							href="https://beastacademy.com/online"
							target="_blank"
							rel="noreferrer"
						>
							Learn More
						</a>
					</div>
				)}

				<div className="simple-game-stats-row suite-completion-stats">
					<div className="simple-game-stats-col">
						<div className="simple-game-stats-label">Played</div>
						<div className="simple-game-stats-value">{numPlays}</div>
						<div className="simple-game-stats-unit">
							{pluralUnit(numPlays, "day", "days")}
						</div>
					</div>
					<div className="simple-game-stats-col">
						<div className="simple-game-stats-label">Streak</div>
						<div className="simple-game-stats-value">{numStreak}</div>
						<div className="simple-game-stats-unit">
							{pluralUnit(numStreak, "day", "days")}
						</div>
					</div>
					<div className="simple-game-stats-col">
						<div className="simple-game-stats-label">ALL TEN</div>
						<div className="simple-game-stats-value">{numAllTens}</div>
						<div className="simple-game-stats-unit">
							{pluralUnit(numAllTens, "time", "times")}
						</div>
					</div>
				</div>

				<div className="suite-completion-solve-order-block">
					<div className="simple-game-stats-label">SOLVE ORDER</div>
					<div className="suite-completion-solve-order-numbers">
						<SolveOrderDisplay targets={targets} />
					</div>
					<div
						className="suite-completion-solve-elapsed"
						aria-label={`Elapsed time ${timeHms}`}
					>
						{timeHms}
					</div>
				</div>

				<div ref={shareAnchorRef} className="suite-completion-share-block">
					<button
						type="button"
						className="suite-completion-share-btn"
						onClick={handleShare}
						aria-label="Share results"
					>
						Share
						<ShareIcon size={18} />
					</button>
				</div>

				<a
					href={base}
					className="btn-primary suite-completion-all-puzzles"
					style={{
						textAlign: "center",
						textDecoration: "none",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						width: "100%",
						boxSizing: "border-box",
					}}
				>
					{CTA_LABELS.ALL_PUZZLES}
				</a>
			</FloatingModalShell>
			{show && shareUi != null && (
				<ShareResultToast
					preview={shareUi.preview}
					fadeOut={shareUi.fadeOut}
					align="center"
					style={shareToastViewportStyle}
					onDismiss={dismissShareToast}
					onTransitionEnd={e => {
						if (e.target !== e.currentTarget || e.propertyName !== "opacity")
							return;
						setShareUi(prev => (prev?.fadeOut ? null : prev));
					}}
				/>
			)}
		</>
	);
};
export default observer(Results);
