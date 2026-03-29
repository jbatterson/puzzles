"use strict";

/**
 * School hours: 7am–4pm on weekdays (local time). Used for Beast Academy links modal CTA.
 * .cjs so Jest (and Node under the repo's "type": "module") load this as CommonJS without transpiling.
 */
function isNowSchoolTime() {
	const date = new Date();
	const hour = date.getHours();
	const day = date.getDay();
	return hour >= 7 && hour < 16 && day !== 0 && day !== 6;
}

module.exports = {isNowSchoolTime};
