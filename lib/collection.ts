import {EventEmitter} from "events";
import {Comparator, defaultComparatorFn} from "./comparator";
import {nilNode, Node} from "./node";

export abstract class Collection<T> extends EventEmitter {
	protected _comparator: Comparator<T>;
	protected _first: any = null;
	protected _last: any = null;
	protected _length: number = 0;
	protected _nil: Node<T> = nilNode;
	protected _root: any = null;

	/**
	 * Base class constructor for all collection classes.
	 * @param comparator {Function} a comparator function used for searching within
	 * the container.
	 * @constructor
	 */
	constructor(comparator: Comparator<T> = null) {
		super();

		this._nil = nilNode;

		if (comparator) {
			this._comparator = comparator;
		} else {
			// Creates a default comparator if a custom one is not
			// given.
			this._comparator = defaultComparatorFn;
		}
	}

	/**
	 * @return {T} the last (max) data element from the tree.
	 */
	get back(): T {
		return this._last && this._last !== this._nil ? this._last.data : null;
	}

	/**
	 * @return {boolean} return true if the list has no nodes, otherwise false
	 */
	get empty(): boolean {
		return this._length === 0;
	}

	get end(): T {
		return this._last && this._last !== this._nil ? this._last.data : null;
	}

	/**
	 * @returns {T} the first (min) data element from the tree.
	 */
	get first(): T {
		return this._first && this._first !== this._nil
			? this._first.data
			: null;
	}

	/**
	 * @returns {T} the front (min) data element from the tree.
	 */
	get front(): T {
		return this._first && this._first !== this._nil
			? this._first.data
			: null;
	}

	/**
	 * @return {T} the last (max) data element from the tree.
	 */
	get last(): T {
		return this._last && this._last !== this._nil ? this._last.data : null;
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
		this._first = this._last = this._root = null;
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
			if (this._comparator(next.data, obj) === 0) {
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
