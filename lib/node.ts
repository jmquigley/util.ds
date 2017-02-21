'use strict';

/**
 * The data nodes used within a collection.  This generally would not be
 * used outside of these collection classes.
 * */
export class Node {
	private _data: any = null;
	private _left: Node = null;
	private _right: Node = null;

	constructor(data: any) {
		this._data = data;
	}

	get data(): any {
		return this._data;
	}

	get left(): Node {
		return this._left;
	}

	set left(val: Node) {
		this._left = val;
	}

	get right(): Node {
		return this._right;
	}

	set right(val: Node) {
		this._right = val;
	}
}
