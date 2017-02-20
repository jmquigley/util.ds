'use strict';

import {Node} from './node';
import {Stack} from './stack';

/** Simple FIFO queue implementation */
export class Queue extends Stack {
	private end: Node = null;

	constructor() {
		super();
	}

	/**
	 * Removes and returns the item at the front of the queue.
	 * @returns {Object} the data at the front of the queue.
	 */
	public dequeue(): any {
		let data: any = this.pop();

		if (this._root == null) {
			this.end = null;
		}

		return data;
	}

	/**
	 * Removes all items from the queue in order and returns them as an
	 * array of data values.
	 * @returns {Array} a list of queue items as an array.
	 */
	public drain(): Array<any> {
		let arr = [];

		while (!this.isEmpty()) {
			arr.push(this.dequeue());
		}

		this._length = 0;
		return arr;
	}

	/**
	 * Adds an item to the end of the queue.
	 * @param data {Object} the data to insert into the queue.
	 */
	public enqueue(data: any) {
		let node = new Node(data);

		if (this._root == null) {
			this._root = this.end = node;
		} else {
			this.end.right = node;
			this.end = node;
		}

		this.emit('add', data);
		this._length++;
	}

	/**
	 * Makes a copy and returns the first item in the queue without removing it
	 * @returns {Object} the data associated with the front of the queue.
	 */
	public front(): any {
		return(this.top());
	}

	/**
	 * Override wrapper for the push function from the inherited stack.  A
	 * stack always pushes to the front.  The general queue should always push
	 * to the end of the structure.
	 * @param data {Object} the data to push on the end of the queue.
	 */
	public push(data: any) {
		this.enqueue(data);
	}
}
