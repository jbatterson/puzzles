import {
	MONTH_NAMES,
	SHORT_MONTH_NAMES,
	SHORT_WEEKDAY_NAMES,
} from "../view/util/Constants";
import {padLeftWith0s} from "./Utils";

/**
 * Converts a JS date to a string of that time at PST in mm/dd/yyyy format.
 *
 * @param {Date} d The date to convert.
 *
 * @returns {string} The date in mm/dd/yyyy format.
 */
export function pstStringify(d: Date): string {
	return (
		d
			.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
			.split(",")
			.shift() || ""
	);
}

/**
 * Converts a JS date to a string of that time at PST in yyyymmdd format.
 */
export function pstStringifyForRobots(d: Date): string {
	const [month = "", day = "", year = ""] = pstStringify(d).split("/");
	return (
		padLeftWith0s(year, 4) + padLeftWith0s(month, 2) + padLeftWith0s(day, 2)
	);
}

/**
 * Checks whether a string is a valid date returned by pstStringify.
 */
export function isPSTStringifiedDate(s: string): boolean {
	return /\d{2}\/\d{2}\/\d{4}/.test(s);
}

/**
 * Checks whether a string is a valid date as encoded by the old saved cookies function.
 */
export function isStringifiedCookieDate(s: string): boolean {
	return /\d{2}-\d{2}-\d{4}/.test(s);
}

/**
 * Converts a JS date to a human-readable string of that time at PST in
 * monthName day, fullYear format ex. July 18th, 2020.
 *
 * @param {Date} d The date to convert.
 *
 * @returns {string} The date in a human readable format.
 */
export function pstStringifyForHumans(d: Date): string {
	return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/**
 * Converts a JS date to a human-readable string of that time at PST in
 * weeknameDay shortMonth, day format ex. Tue Mar. 16
 *
 * @param {Date} d The date to convert.
 *
 * @returns {string} The date in a human readable format.
 */
export function pstShortStringifyForHumans(d: Date): string {
	return `${SHORT_WEEKDAY_NAMES[d.getDay()]} ${
		SHORT_MONTH_NAMES[d.getMonth()]
	}. ${d.getDate()}`;
}

/**
 * Return a date that's nDays forward relative to date.
 *
 * @param {Date} date The starting date.
 * @param {number} nDays The number of days to jump. Should be an integer.
 *                       Positive means jumping into the future. Negative values are allowed.
 *
 * @returns {Date} A new date that's nDays forward
 */
export function jumpDays(date: Date, nDays: number): Date {
	if (Math.floor(nDays) !== nDays) {
		throw new Error("nDays is not an integer");
	}

	const newDate = new Date(date);
	newDate.setDate(date.getDate() + nDays);
	return newDate;
}

export {isNowSchoolTime} from "@shared-contracts/schoolTime.js";
