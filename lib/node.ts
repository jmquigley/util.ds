"use strict";

export enum Color {
	red,
	black
}

export type Id = string | number;

export type AugmentedNode<T> = Node<T> & T;

export interface NodeKeys {
	id?: Id;
	parentId?: Id;
}

export interface NodeReferences<T> {
	children?: Array<AugmentedNode<T>>;
	parent?: Node<T>;
}

export interface NodeData<T> {
	data?: T;
}

export interface NodeOptions<T>
	extends NodeKeys,
		NodeReferences<T>,
		NodeData<T> {
	color?: Color;
	left?: Node<T>;
	right?: Node<T>;
}

/**
 * The data nodes used within a collection.  This generally would not be
 * used outside of these collection classes.
 */
export class Node<T> implements NodeOptions<T> {
	// This variable is "pseudo private".  It needs to be public here so that
	// the GeneralTree can remove it during the call the flatten().  The
	// underscore in front of the name means that it is private by
	// convention (like python)
	public _options?: NodeOptions<T>;

	public id?: Id;
	public parentId?: Id;
	public children?: Array<AugmentedNode<T>>;
	public parent?: Node<T>;
	public data?: T;
	public color?: Color;
	public left?: Node<T>;
	public right?: Node<T>;

	constructor(options?: NodeOptions<T>) {
		this._options = Object.assign(
			{
				data: null,
				parent: null,
				right: null,
				left: null,
				color: Color.black,
				id: null,
				parentId: null,
				children: []
			},
			options || {}
		);

		this.id = this._options.id;
		this.parentId = this._options.parentId;
		this.children = this._options.children;
		this.parent = this._options.parent;
		this.data = this._options.data;
		this.color = this._options.color;
		this.left = this._options.left;
		this.right = this._options.right;
	}

	public clear?() {
		this.color = Color.black;
		this.data = this.parent = this.left = this.right = this.id = this.parentId = null;
		this.children = [];
	}

	public toString(): string {
		let s: string = "Node -> {";

		s += `id: ${this.id}, `;
		s += `parentId: ${this.parentId}, `;

		if (this.parent && this.parent !== nilNode) {
			s += `parent: (id: ${this.parent.id} parentId: ${
				this.parent.parentId
			}), `;
		} else {
			s += "parent: nil";
		}

		s += "}";
		return s;
	}
}

export const nilNode: Node<any> = new Node({color: Color.black});
export default Node;
