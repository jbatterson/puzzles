/**
 * Basic utilities, especially some Typescript-specific ones, not specific to
 * this project.
 */

/**
 * Typescript helper to enforce a check that a type is inferred never. It is
 * often used with union types to verify that all cases were handled.
 *
 * Example:
 * ```typescript
 * type StdIOFD = 0 | 1 | 2;
 * function getStreamName(fd: StdIOFD): string {
 *   if (fd === 0) return "stdin";
 *   else if (fd === 1) return "stdout";
 *   else if (fd === 2) return "stderr";
 *   // This line should typecheck until we add a new StdIOFD value.
 *   else return assertNever(fd);
 * }
 * ```
 *
 * At runtime, it throws if it is actually called.
 *
 * @param v A value that Typescript's static analysis should have refined to
 *     never.
 */
export function assertNever(v: never): never {
	throw new Error("assertNever got value: " + JSON.stringify(v));
}

/**
 * Check whether s, if interpreted as a number, is positive.
 */
export function strIsPositive(s: string): boolean {
	return Number.isFinite(s) && Number(s) > 0;
}

/**
 * Pad the string to len len with 0s.
 */
export function padLeftWith0s(str: string, len: number): string {
	if (len < str.length) {
		return str;
	}
	return "0".repeat(len - str.length) + str;
}
