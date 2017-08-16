'use strict';

import {Collection} from './collection';
import {Comparator} from './comparator';
import {Iterable} from './iterable';
import {Node} from './node';

export class List<T> extends Collection<T> implements Iterable<T> {

	public static readonly FRONT: number = 0;
	public static readonly BACK: number = -1;

	constructor(arr: T[] = [], cmp: Comparator<T> = null) {
		super(cmp);

		for (const it of arr) {
			this.insert(it);
		}
	}

	/**
	 * Inserts a data value into a linked list.  The default operation is to
	 * insert into the end of the list.
	 * @param data {T} the data item to insert into the list
	 * @param idx {number} the index position where the item will be inserted.
	 * this number be List.FRONT, List.BACK, or any other number.
	 */
	public insert(data: T, idx: number = List.BACK) {

		if (data == null) {
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
			let tnode: Node<T> = this._root;

			for (let i = 0; i < idx; i++) {
				tnode = tnode.right;
			}

			node.right = tnode;
			node.left = tnode.left;
			tnode.left.right = node;
			tnode.left = node;
		}

		this._length++;
	}

	public remove(data: T) {
		console.log(`remove: ${data}`);
	}

	public *[Symbol.iterator]() {
		let node: Node<T> = this._root;

		while (node !== null) {
			yield node.data;
			node = node.right;
		}
	}
}
