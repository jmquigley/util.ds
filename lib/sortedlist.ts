"use strict";

import {Comparator} from "./comparator";
import {List} from "./list";
import {Node} from "./node";

/**
 * A linked list structure that sorts the data in ascending order as it is
 * added.
 *
 */
export class SortedList<T> extends List<T> {
	constructor(arr: T[] = [], cmp: Comparator<T> = null) {
		super(arr, cmp);
	}

	/**
	 * Inserts a data value into a linked list in its insertion sorted
	 * position.  The sort is in ascending order.  The `.reverse` property
	 * can be used to get the opposite sort (returned array)
	 * @param data {T} the data item to insert into the list
	 */
	public insert(data: T) {
		if (data == null) {
			return;
		}

		const node = new Node<T>(data);

		// Empty, first insert
		if (this._root === null) {
			this._root = this._first = this._last = node;
		} else {
			// Find insertion point
			let tnode: Node<T> = this._root;
			while (tnode && this._cmp(data, tnode.data) > 0) {
				tnode = tnode.right;
			}

			// Replace the root value and first
			if (tnode === this._root) {
				this._root.left = node;
				node.right = this._root;
				this._root = this._first = node;

				// Replace the last value in the list
			} else if (tnode === null) {
				this._last.right = node;
				node.left = this._last;
				this._last = node;

				// Insert in front of the first node that is larger than new
			} else {
				node.right = tnode;
				node.left = tnode.left;
				tnode.left.right = node;
				tnode.left = node;
			}
		}

		this._length++;
		this.emit("insert", node.data);
	}
}
