'use strict';

import {sprintf} from 'sprintf-js';
import {BinaryTree} from './binarytree';

export interface Offset {
	[key: number]: number;
}

export interface Priority<T> {
	priority: string;
	data?: T;
}

function comparator<T>(o1: Priority<T>, o2: Priority<T>): number {
	if (o1.priority === o2.priority) {
		return 0;
	} else if (o1.priority > o2.priority) {
		return 1;
	}

	return -1;
}

/**
 * A simple priority queue.  Items are inserted into a queue structure with an
 * associatd priority number.  The lower the number, the higher the priority.
 * Items with a higher priority are chosen first in the queue.
 *
 * Priority values are numbers > 0.  If a negative number is given, then it
 * will be given a priority of 0.
 *
 * The implementation is a Red/Black tree.  That makes getting the lowest
 * value from a set of values an O(1) operation; we always know the smallest
 * value inserted into the tree.
 *
 */
export class PriorityQueue<T> extends BinaryTree<Priority<T>> {

	private _offsets: Offset = {};

	constructor() {
		super([], comparator);
	}

	/**
	 * @return {T[]} an array of values in the queue in priority order.  This
	 * does not change the queue.
	 */
	get array(): T[] {
		const out: T[] = [];
		const arr = this.inorder;

		for (const it of arr) {
			out.push(it.data);
		}

		return out;
	}

	/**
	 * Clears the queue and resets the internals.
	 */
	public clear() {
		super.clear();
		this._offsets = {};
	}

	/**
	 * Retrieves the highest priority item from the queue and returns it.
	 * @return {T} the data with the highest priority.  If no data is available
	 * then null is returned;
	 */
	public dequeue(): T {
		const val = this.removeFirst();

		if (val) {
			return val.data;
		}

		return null;
	}

	/**
	 * Removes all items from the queue in order and returns them as an
	 * array of data values.
	 * @returns {T[]} a list of queue items as an array.
	 */
	public drain(): T[] {
		const arr: T[] = [];

		while (!this.empty) {

			const val = this.dequeue();
			if (val) {
				arr.push(val);
			}
		}

		this._length = 0;
		this.emit('drain', arr);
		return arr;
	}

	/**
	 * Adds an item to the queue in priority order.  Items of the same priority
	 * are sorted by insertion order.  The lower number represents higher
	 * priority.
	 * @param data {T} the data element to add to the queue
	 * @param priority {number} a number >= 0 that sets the priority of the
	 * item in the queue.
	 */
	public enqueue(data: T, priority: number) {

		// No negative priorities
		if (priority < 0) {
			priority = 0;
		}

		// Set an initial counter to 0 if one doesn't exist for a priority
		if (!(priority in this._offsets)) {
			this._offsets[priority] = 0;
		}

		// Data can be given the same priority level.  Since the tree is sorted
		// by priority level this can't be used directly (must be unique).
		// An offset value is created for each priority in the form of a
		// counter.  This counter is appended to the priority value to make
		// it unique.
		const offset = ++this._offsets[priority];
		const val = sprintf(`%09d:%09d`, priority, offset);

		this.insert({priority: val, data: data});
	}
}
