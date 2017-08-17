'use strict';

import {sprintf} from 'sprintf-js';
import {BinaryTree} from './binarytree';
import {Collection} from './collection';

export interface Offset {
	[key: number]: number;
}

export interface Priority<T> {
	key: string;
	data?: T;
}

function comparator<T>(o1: Priority<T>, o2: Priority<T>): number {
	if (o1.key === o2.key) {
		return 0;
	} else if (o1.key > o2.key) {
		return 1;
	}

	return -1;
}

/**
 * A simple priority queue.  Items are inserted into a queue structure with an
 * associatd priority number.  The lower the number, the higher the priority.
 * Items with a higher priority are chosen first in the queue.
 *
 */
export class PriorityQueue<T> extends Collection<T> {

	private _bt: BinaryTree<Priority<T>>;
	private _offsets: Offset = {};

	constructor() {
		super();
		this._bt = new BinaryTree<Priority<T>>([], comparator);
	}

	get array() {
		return this._bt.inorder;
	}

	public clear() {
		if (this._bt) {
			this._bt.clear();
		}

		this._offsets = {};
	}

	public dequeue(): T {
		return this._bt.removeFirst().data;
	}

	public drain(): T[] {
		// TODO: implement the drain function for PriorityQueue
		return null;
	}

	public enqueue(data: T, priority: number) {

		if (!(priority in this._offsets)) {
			this._offsets[priority] = 0;
		}

		const offset = ++this._offsets[priority];
		const key = sprintf(`%09d:%09d`, priority, offset);

		this._bt.insert({key: key, data: data});
		console.log(`key: ${key}, data: ${data}`);
	}
}
