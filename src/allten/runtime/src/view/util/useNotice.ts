import {useCallback, useEffect, useRef, useState} from "react";

export type NoticeConfig<T, U = string> = {
	getGen: (t: T) => number;
	getDuration: (t: T) => number;
	getData: (t: T) => U;
	fadeOutDuration?: number;
};

type InternalState<U> = {
	data: U | null;
	fadingOut: boolean;
};

type TimeoutID = ReturnType<typeof setTimeout>;

export default function useNotice<T, U>(
	config: NoticeConfig<T, U>,
	notice: T | null
): [U | null, boolean] {
	const [state, setInternalState] = useState<InternalState<U>>({
		data: null,
		fadingOut: false,
	});

	const configFadeOutDurationRef = useRef<number>(0);
	const fadeTimeoutRef = useRef<TimeoutID | null>(null);
	const expireTimeoutRef = useRef<TimeoutID | null>(null);
	const genRef = useRef<number>(0);
	const upcomingDataRef = useRef<U | null>(null);
	const upcomingDurationRef = useRef<number>(0);

	configFadeOutDurationRef.current = config.fadeOutDuration || 0;

	const stopFadeOutTimeout = useCallback(() => {
		if (fadeTimeoutRef.current) {
			clearTimeout(fadeTimeoutRef.current);
			fadeTimeoutRef.current = null;
		}
	}, []);

	const stopExpireTimeout = useCallback(() => {
		if (expireTimeoutRef.current) {
			clearTimeout(expireTimeoutRef.current);
			expireTimeoutRef.current = null;
		}
	}, []);

	const showUpcomingDataNow = useCallback(() => {
		const upcomingData = upcomingDataRef.current;
		setInternalState((s) => ({
			...s,
			data: upcomingData,
			fadingOut: false,
		}));

		stopExpireTimeout();
		if (upcomingData && upcomingDurationRef.current > 0) {
			expireTimeoutRef.current = setTimeout(
				onDurationExpire,
				upcomingDurationRef.current
			);
		}
	}, []);

	const startFadeOut = useCallback(() => {
		const fadeOutDuration = configFadeOutDurationRef.current;
		if (fadeOutDuration) {
			stopExpireTimeout();
			fadeTimeoutRef.current = setTimeout(onFadeOutEnd, fadeOutDuration);
			setInternalState((s) => ({
				...s,
				fadingOut: true,
			}));
		} else {
			showUpcomingDataNow();
		}
	}, []);

	const onDurationExpire = useCallback(() => {
		upcomingDataRef.current = null;
		startFadeOut();
		expireTimeoutRef.current = null;
	}, []);

	const onFadeOutEnd = useCallback(() => {
		showUpcomingDataNow();
		fadeTimeoutRef.current = null;
	}, []);

	useEffect(() => {
		return () => {
			stopFadeOutTimeout();
			stopExpireTimeout();
		};
	}, []);

	if (!notice && state.data && !state.fadingOut) {
		upcomingDataRef.current = null;
		startFadeOut();
	} else if (notice) {
		const newGen = config.getGen(notice);
		if (newGen > genRef.current) {
			genRef.current = newGen;
			upcomingDataRef.current = config.getData(notice);
			upcomingDurationRef.current = config.getDuration(notice);
			if (!state.data) {
				showUpcomingDataNow();
			} else if (!state.fadingOut) {
				startFadeOut();
			}
		}
	}

	return [state.data, state.fadingOut];
}
