"use strict";

export enum Color {
	red,
	black
}

export type Id = string | number;

export interface NodeOptions<T> {
	color?: Color;
	data?: T;
	parent?: Node<T>;
	left?: Node<T>;
	right?: Node<T>;
	id?: Id;
	parentId?: Id;
}

/**
 * The data nodes used within a collection.  This generally would not be
 * used outside of these collection classes.
 */
export class Node<T> {
	constructor(private _options: NodeOptions<T> = null) {
		this._options = Object.assign(
			{
				data: null,
				parent: null,
				right: null,
				left: null,
				color: Color.red,
				id: null,
				parentId: null
			},
			this._options || {}
		);
	}

	get color(): Color {
		return this._options.color;
	}

	set color(val: Color) {
		this._options.color = val;
	}

	get data(): T {
		return this._options.data;
	}

	set data(val: T) {
		this._options.data = val;
	}

	get id(): Id {
		return this._options.id;
	}

	set id(val: Id) {
		this._options.id = val;
	}

	get left(): Node<T> {
		return this._options.left;
	}

	set left(val: Node<T>) {
		this._options.left = val;
	}

	get parent(): Node<T> {
		return this._options.parent;
	}

	set parent(val: Node<T>) {
		this._options.parent = val;
	}

	get parentId(): Id {
		return this._options.parentId;
	}

	set parentId(val: Id) {
		this._options.parentId = val;
	}

	get right(): Node<T> {
		return this._options.right;
	}

	set right(val: Node<T>) {
		this._options.right = val;
	}

	public clear(): void {
		this._options.color = Color.red;
		this._options.data = this._options.parent = this._options.left = this._options.right = null;
	}
}

export const nilNode: Node<any> = new Node({color: Color.black});
export default Node;
