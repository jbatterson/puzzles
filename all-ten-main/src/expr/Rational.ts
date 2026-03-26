/**
 * Defines a Rational number p/q, represented as [p, q] for p an integer and
 * q a positive integer, and implements basic operations.
 *
 * Invalid rationals like those obtained via division by zero are represented
 * as null. Many functions here take Rational | null.
 */

import {assertNever} from "../util/Utils";
import {ArithmeticOperator} from "./Operators";

/**
 * The main rational type.
 */
export type Rational = [number, number];

/**
 * Returns the GCD of two integers. Returns 1 if either number is not an
 * integer.
 */
export function gcd(m: number, n: number): number {
	if (m !== Math.floor(m) || n !== Math.floor(n)) {
		return 1;
	}
	m = Math.abs(m);
	n = Math.abs(n);
	let [hi, lo] = m > n ? [m, n] : [n, m];
	while (hi > lo && lo > 0) {
		const rem = hi % lo;
		hi = lo;
		lo = rem;
	}
	return hi;
}

/**
 * Changes a number into a Rational. Assumes the number is an integer without
 * checking.
 */
export function fromNumber(n: number): Rational {
	return [n, 1];
}

/**
 * Changes a rational to standard form. Includes ensuring the denominator is
 * positive and simplifying the GCD out.
 */
export function normalize(r: Rational | null): Rational | null {
	if (!r) {
		return null;
	}
	let [p, q] = r;
	if (q === 0) {
		return null;
	}
	if (q < 0) {
		p *= -1;
		q *= -1;
	}
	const d = gcd(p, q);
	p /= d;
	q /= d;
	return [p, q];
}

/**
 * Given p/q, returns -p/q.
 */
export function negate(r: Rational | null): Rational | null {
	if (!r) {
		return null;
	}
	return normalize([-r[0], r[1]]);
}

/**
 * Given p/q, returns q/p.
 */
export function reciprocal(r: Rational | null): Rational | null {
	if (!r) {
		return null;
	}
	return normalize([r[1], r[0]]);
}

/**
 * Applies a binary arithmetic operation (+ - * /) to two rational numbers.
 */
export function doOp(
	r1: Rational | null,
	r2: Rational | null,
	op: ArithmeticOperator
): Rational | null {
	if (!r1 || !r2) {
		return null;
	}
	const [p1, q1] = r1;
	const [p2, q2] = r2;
	if (op === "+") {
		return normalize([p1 * q2 + p2 * q1, q1 * q2]);
	} else if (op === "-") {
		return normalize([p1 * q2 - p2 * q1, q1 * q2]);
	} else if (op === "*") {
		return normalize([p1 * p2, q1 * q2]);
	} else if (op === "/") {
		return normalize([p1 * q2, q1 * p2]);
	} else {
		assertNever(op);
	}
}
