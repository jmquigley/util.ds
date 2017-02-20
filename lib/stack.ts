'use strict';

import * as _ from 'lodash';
import {Collection} from './collection';
import {Node} from './node';

/** Simple stack class */
export class Stack extends Collection {

	constructor() {
		super();
	}

	/**
	 * Puts a data element on the top of the stack
	 * @param data {Object} any data element the user wants to store
	 */
	public push(data: any): void {
		let node = new Node(data);

		if (this._root == null) {
			this._root = node;
		} else {
			node.right = this._root;
			this._root = node;
		}

		this._length++;
		this.emit('add', data);
	}

	/**
	 * Retrieves the top item from the stack and returns it.
	 * @returns {Object} the data element at the top of the stack.
	 */
	public pop(): any {
		let data = null;

		if (this._root != null) {
			data = this._root.data;
			this._root = this._root.right;
			this._length--;
		}

		this.emit('remove', data);
		return data;
	}

	/**
	 * Retrieves the data element at the top of the stack without removing
	 * it.  This clones the object so that changes will not affect what is
	 * actually on the top of the stack.
	 * @returns {Object} a reference to the data element at the top of the
	 * stack.
	 */
	public top(): any {
		if (this._root == null) {
			return null;
		}

		return _.cloneDeep(this._root.data);
	}
}
