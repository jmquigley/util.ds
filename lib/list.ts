"use strict";

import {Collection} from "./collection";
import {Comparator} from "./comparator";
import {Iterable} from "./iterable";
import {Node} from "./node";

/**
 * A doubly linked list structure.
 *
 */
export class List<T> extends Collection<T> implements Iterable<T> {
	public static readonly FRONT: number = 0;
	public static readonly BACK: number = -1;

	constructor(arr: T[] = [], cmp: Comparator<T> = null) {
		super(cmp);

		if (arr) {
			for (const it of arr) {
				this.insert(it);
			}
		}
	}

	/**
	 * @return {T[]} an inorder array of all elements in the list
	 */
	get array(): T[] {
		const out: T[] = [];

		if (this._root) {
			let node: Node<T> = this._root;
			do {
				out.push(node.data);
				node = node.right;
			} while (node != null);
		}

		return out;
	}

	/**
	 * @return {T[]} a reversed array of all elements in the list
	 */
	get reverse(): T[] {
		const out: T[] = [];

		if (this._last) {
			let node: Node<T> = this._last;
			do {
				out.push(node.data);
				node = node.left;
			} while (node != null);
		}

		return out;
	}

	/**
	 * Retrieves the data from the list at a given position.  If the position
	 * is outside of the list, then null is returned.  This is an O(N)
	 * operation for each call (it looks for each position from the start
	 * of th list).
	 * @param pos {number} the position to retrieve from the list
	 * @return {T} the data associated with this position within the list
	 */
	public at(pos: number): T {
		if (this._root && pos >= 0 && pos < this._length) {
			let node: Node<T> = this._root;
			for (let i = 0; i < pos; i++) {
				node = node.right;
			}

			return node.data;
		}

		return null;
	}

	/**
	 * Searches the list for an element.  If it is found, then the data element
	 * associated with that node is returned (not the node).  When used with a
	 * primative type this is not useful as the key and the value found would
	 * be the same.  This is helpful when T is a complex object with a custom
	 * Comparator.
	 * @param key {T} a search key to look for in the list.
	 * @return {T} the full data element within this list.  If it is not found,
	 * then null is returned.
	 */
	public find(key: T): T {
		const tnode: Node<T> = this._getNodeByValue(key);
		if (tnode) {
			return tnode.data;
		}

		return null;
	}

	/**
	 * Inserts a data value into a linked list.  The default operation is to
	 * insert into the end of the list.
	 * @param data {T} the data item to insert into the list
	 * @param idx {number} the index position where the item will be inserted.
	 * this number be List.FRONT, List.BACK, or any other number.
	 */
	public insert(data: T, idx: number = List.BACK) {
		if (data == null || idx === null) {
			return;
		}

		const node = new Node<T>(data);

		// If insert is request outside of the current range, insert end
		if (idx + 1 > this._length) {
			idx = List.BACK;
		}

		// Empty, first insert
		if (this._root === null) {
			this._root = this._first = this._last = node;

			// Insert into end
		} else if (idx === List.BACK) {
			node.left = this._last;
			this._last.right = node;
			this._last = node;

			// Insert to front
		} else if (idx === List.FRONT) {
			node.right = this._root;
			this._root.left = node;
			this._root = this._first = node;

			// Arbitrary insert by index
		} else {
			const tnode: Node<T> = this._getNodeByIndex(idx);
			node.right = tnode;
			node.left = tnode.left;
			tnode.left.right = node;
			tnode.left = node;
		}

		this._length++;
		this.emit("insert", node.data);
	}

	/**
	 * Removes an element from the list.
	 * @param data {T} the data item removed from the list
	 * @param [idx] {number} the position index to remove from the list
	 * @return {T} the data element that was deleted
	 */
	public remove(data: T, idx: number = null): T {
		if (data == null && idx === null) {
			return null;
		}

		let tnode;
		if (idx !== null) {
			tnode = this._getNodeByIndex(idx);
		} else {
			tnode = this._getNodeByValue(data);
		}

		if (tnode) {
			// Remove the root node
			if (tnode === this._root) {
				this._root = this.root.right;
				this._first = this._root;

				if (this._root) {
					this._root.left = null;
				}

				// Remove the last node
			} else if (tnode === this._last) {
				this._last = this._last.left;

				if (this._last) {
					this._last.right = null;
				}

				// Remove an arbitrary node
			} else {
				tnode.right.left = tnode.left;
				tnode.left.right = tnode.right;
			}

			this._length--;
			this.emit("remove", tnode.data);
			return tnode.data;
		}

		return null;
	}

	/**
	 * Iterates through the list and find the node associated with a key
	 * value T.
	 * @param data {T} the key value or index to search for in the list.
	 * @return {Node<T>} a reference to the node that was found.  If a node
	 * is not found, then null is returned.
	 */
	public _getNodeByValue(data: T): Node<T> {
		let tnode: Node<T> = this._root;
		if (tnode) {
			while (tnode && this._cmp(tnode.data, data) !== 0) {
				tnode = tnode.right;
			}
		}

		return tnode;
	}

	/**
	 * Moves to a position within the list and finds the node associated
	 * with that index.
	 * @param idx {number} the location within the list to find
	 * @return {Node<T>} a reference to a node a the given position.  If the
	 * node is not found, then null is returned.
	 */
	public _getNodeByIndex(idx: number): Node<T> {
		if (idx === List.BACK) {
			idx = this.length - 1;
		} else if (idx === List.FRONT) {
			idx = 0;
		}

		let tnode: Node<T> = this._root;
		if (tnode) {
			for (let i = 0; i < idx; i++) {
				if (tnode) {
					tnode = tnode.right;
				}
			}
		}

		return tnode;
	}

	/**
	 * An inorder iterator through the list of current values.
	 */
	public *[Symbol.iterator]() {
		let node: Node<T> = this._root;

		while (node !== null) {
			yield node.data;
			node = node.right;
		}
	}
}
