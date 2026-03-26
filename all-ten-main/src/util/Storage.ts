import {TWENTY_YEARS_IN_SECONDS} from "src/view/util/Constants";

/**
 * Save a key value to a cookie for a long time.
 */
export function saveCookie(key: string, val: string | number): void {
	document.cookie = `${key}=${val}; expires=0`;
	document.cookie = `${key}=${val}; max-age=${TWENTY_YEARS_IN_SECONDS}`;
}
