/**
 * A comparator function signature.  This is used to perform a comparison
 * operation between two objects.
 */
export type Comparator<T> = (o1: T, o2: T) => number;

/**
 * This comparator is used to handle default comparasons for built in types
 *
 * It returns:
 *
 * 0  - if the objects are equal
 * 1  - if o1 > o2
 * -1 - if o1 < o2
 *
 * @param o1 {T} the left hand argument to compare
 * @param o2 {T} the right hand argument to compare
 * @return {number} the result of the comparison (above)
 */
export function defaultComparatorFn<T>(o1: T, o2: T): number {
	if (o1 === o2) {
		return 0;
	} else if (o1 > o2) {
		return 1;
	}

	return -1;
}
