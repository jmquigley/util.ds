'use strict';

/** The data nodes used within a collection. */
export class Node {
	private _data: any = null;
	private _left: Node = null;
	private _right: Node = null;
	private _cmp: Function = null;

	constructor(data: any, cmp: Function = null) {
		this._data = data;
		this._cmp = cmp;
	}

	get cmp(): Function {
		return this._cmp;
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
