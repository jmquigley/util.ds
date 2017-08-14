'use strict';

export enum Color {
	red,
	black
}

/**
 * The data nodes used within a collection.  This generally would not be
 * used outside of these collection classes.
 */
export class Node<T> {
	private _color: Color = Color.red;
	private _data: T = null;
	private _parent: Node<T> = null;
	private _left: Node<T> = null;
	private _right: Node<T> = null;

	constructor(data: T, parent: Node<T> = null, right: Node<T> = null, left: Node<T> = null, color: Color = Color.red) {
		this._color = color;
		this._data = data;
		this._left = left;
		this._parent = parent;
		this._right = right;
	}

	get color(): Color {
		return this._color;
	}

	set color(val: Color) {
		this._color = val;
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

	get parent(): Node<T> {
		return this._parent;
	}

	set parent(val: Node<T>) {
		this._parent = val;
	}

	get right(): Node<T> {
		return this._right;
	}

	set right(val: Node<T>) {
		this._right = val;
	}
}
