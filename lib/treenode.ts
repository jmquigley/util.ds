'use strict';

export enum Color {
	red,
	black
}

import {Node} from './node';

export class TreeNode<T> extends Node<T> {
	private _parent: Node<T> = null;
	private _color: Color = Color.red;

	constructor(data: T, parent: Node<T> = null, right: Node<T> = null, left: Node<T> = null, color: Color = Color.red) {
		super(data, right, left);

		this._parent = parent;
		this._color = color;
	}

	get parent(): Node<T> {
		return this._parent;
	}

	set parent(val: Node<T>) {
		this._parent = val;
	}

	get color(): Color {
		return this._color;
	}

	set color(val: Color) {
		this._color = val;
	}
}
