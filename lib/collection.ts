'use strict';

import {EventEmitter} from 'events';
import {Comparator, defaultComparatorFn} from './comparator';
import {Color, Node} from './node';

export abstract class Collection<T> extends EventEmitter {
	protected _cmp: Comparator<T>;
	protected _first: Node<T>;
	protected _last: Node<T>;
	protected _length: number = 0;
	protected _nil: Node<T>;
	protected _root: Node<T>;

	/**
	 * Base class constructor for all collection classes.
	 * @param cmp {Function} a comparator function used for searching within
	 * the container.
	 * @constructor
	 */
	constructor(cmp: Comparator<T> = null) {
		super();

		this._nil = new Node<T>(null, null, null, null, Color.black);
		this._first = this._last = this._root = this._nil;

		if (cmp == null) {
			// Creates a default comparator if a custom one is not
			// given.
			this._cmp = defaultComparatorFn;
		} else {
			this._cmp = cmp;
		}

		this.clear();
	}

	/**
	 * @return {T} the last (max) data element from the tree.
	 */
	get back(): T {
		return this._last.data;
	}

	/**
	 * @return {boolean} return true if the list has no nodes, otherwise false
	 */
	get empty(): boolean {
		return this._length === 0;
	}

	/**
	 * @returns {T} the first (min) data element from the tree.
	 */
	get first(): T {
		return this._first.data;
	}

	/**
	 * @returns {T} the front (min) data element from the tree.
	 */
	get front(): T {
		return this._first.data;
	}

	/**
	 * @return {T} the last (max) data element from the tree.
	 */
	get last(): T {
		return this._last.data;
	}

	/**
	 * @return {number} the number of nodes in this collection
	 */
	get length(): number {
		return this._length;
	}

	/**
	 * @return {Node<T>} the reference to the nil sentinel
	 */
	get nil(): Node<T> {
		return this._nil;
	}

	/**
	 * @return {Node<T>} the front/first node in the collection
	 */
	get root(): Node<T> {
		return this._root;
	}

	/**
	 * @return {number} the number of nodes in this collection
	 */
	get size(): number {
		return this._length;
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
	public contains(obj: T): boolean {
		if (this._root == null) {
			return false;
		}

		let next: Node<T> = this._root;
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

}
