'use strict';

/**
 * The data nodes used within a collection.  This generally would not be
 * used outside of these collection classes.
 */
export class Node<T> {
	private _data: T = null;
	private _left: Node<T> = null;
	private _right: Node<T> = null;

	constructor(data: T, right: Node<T> = null, left: Node<T> = null) {
		this._data = data;
		this._right = right;
		this._left = left;
	}

	get data(): T {
		return this._data;
	}

	get left(): Node<T> {
		return this._left;
	}

	set left(val: Node<T>) {
		this._left = val;
	}

	get right(): Node<T> {
		return this._right;
	}

	set right(val: Node<T>) {
		this._right = val;
	}
}
