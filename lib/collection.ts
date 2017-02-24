'use strict';

import {EventEmitter} from 'events';
import {Node} from './node';

/**
 * A comparator function signature.  This is used to perform a comparison
 * operation between two objects.  It returns:
 *
 * 0  - if the objects are equal
 * 1  - if o1 > o2
 * -1 - if o1 < o2
 */
export interface IComparator {
	(o1: any, o2: any): number;
}

export abstract class Collection extends EventEmitter {
	protected _root: Node = null;
	protected _length: number = 0;
	protected _cmp: IComparator = null;

	/**
	 * Base class constructor for all collection classes.
	 * @param cmp {Function} a comparator function used for searching within
	 * the container.
	 * @constructor
	 */
	constructor(cmp: IComparator = null) {
		super();

		if (cmp == null) {
			// Creates a default comparator if a custom one is not
			// given.
			this._cmp = function(o1, o2) {
				if (o1 === o2) {
					return 0;
				} else if (o1 > o2) {
					return 1;
				}

				return -1;
			}
		} else {
			this._cmp = cmp;
		}

		this.clear();
	}

	/**
	 * Initializes the object to an empty state
	 */
	public clear(): void {
		this._root = null;
		this._length = 0;
	}

	/**
	 * Checks the container for the existence of a given object.  This is
	 * a simple linear search.
	 * @param obj {Object} the item to find in the container.
	 * @returns {boolean} true if the item is found, otherwise false.
	 */
	public contains(obj: any): boolean {
		if (this._root == null) {
			return false;
		}

		let next: Node = this._root;
		while (next != null) {
			if (this._cmp(next.data, obj) === 0) {
				return true;
			} else {
				next = next.right;
			}
		}

		return false;
	}

	/**
	 * Checks if the container is empty.
	 * @returns {boolean} true if the container is empty, otherwise false.
	 */
	public isEmpty(): boolean {
		return this._length === 0;
	}

	get length(): number {
		return this._length;
	}

	public size(): number {
		return this._length;
	}
}
