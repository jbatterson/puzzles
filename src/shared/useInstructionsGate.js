import { useCallback, useState } from "react";

const DAILY_DATE_SEG = /^\d{4}-\d{2}-\d{2}$/;

/** True if any `prefix:YYYY-MM-DD:<idx>` key exists with completion value 1 or 2 (excludes :wip, :gameState, etc.). */
export function hasAnyDailyCompletionInPrefix(prefix) {
	const head = `${prefix}:`;
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (!key || !key.startsWith(head)) continue;
		const rest = key.slice(head.length);
		const parts = rest.split(":");
		if (parts.length !== 2) continue;
		const [datePart, idxPart] = parts;
		if (!DAILY_DATE_SEG.test(datePart) || !/^[0-9]+$/.test(idxPart)) continue;
		const v = localStorage.getItem(key);
		if (v === "1" || v === "2") return true;
	}
	return false;
}

export default function useInstructionsGate(storageKey, options = {}) {
	const { openOnMount = true, completionStoragePrefix = null } = options;
	const [hasSeenInstructions, setHasSeenInstructions] = useState(
		() => localStorage.getItem(storageKey) === "1"
	);
	const [showInstructions, setShowInstructions] = useState(() => {
		const seen = localStorage.getItem(storageKey) === "1";
		const veteran =
			completionStoragePrefix != null &&
			hasAnyDailyCompletionInPrefix(completionStoragePrefix);
		if (!openOnMount) return !seen;
		return !(seen || veteran);
	});

	const closeInstructions = useCallback(() => {
		localStorage.setItem(storageKey, "1");
		setHasSeenInstructions(true);
		setShowInstructions(false);
	}, [storageKey]);

	return {
		hasSeenInstructions,
		showInstructions,
		setShowInstructions,
		closeInstructions,
	};
}
