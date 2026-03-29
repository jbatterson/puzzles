/**
 * School hours: 7am–4pm on weekdays (local time). Used for Beast Academy links modal CTA.
 * ESM entry for Vite (named imports); Jest/All Ten use schoolTime.cjs — keep logic in sync.
 */
export function isNowSchoolTime() {
	const date = new Date();
	const hour = date.getHours();
	const day = date.getDay();
	return hour >= 7 && hour < 16 && day !== 0 && day !== 6;
}
