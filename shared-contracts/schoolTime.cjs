"use strict";

/**
 * School hours: 7am–4pm on weekdays (local time). Used by All Ten Dates.ts + Jest (CommonJS).
 * Keep behavior in sync with schoolTime.js (ESM, used by the Vite hub).
 */
function isNowSchoolTime() {
	const date = new Date();
	const hour = date.getHours();
	const day = date.getDay();
	return hour >= 7 && hour < 16 && day !== 0 && day !== 6;
}

module.exports = {isNowSchoolTime};
