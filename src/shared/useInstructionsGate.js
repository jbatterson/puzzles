import { useCallback, useState } from "react";

export default function useInstructionsGate(storageKey, options = {}) {
	const { openOnMount = true } = options;
	const [hasSeenInstructions, setHasSeenInstructions] = useState(
		() => localStorage.getItem(storageKey) === "1"
	);
	const [showInstructions, setShowInstructions] = useState(() =>
		openOnMount ? true : !hasSeenInstructions
	);

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
