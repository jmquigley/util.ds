import * as _ from 'lodash';
import {Comparator} from './collection';
import {Node} from './node';
import {Queue} from './queue';

/** A double ended Queue class */
export class Deque<T> extends Queue<T> {
	private _maxSize: number;

	/**
	 * The deque can be unlimited in size (default) or set to a maxium size
	 * when constructed.  When the max size is exceeded, then the front item is
	 * automatially removed from the queue and the new item is placed in the
	 * queue (dependin which type of insert is calld).
	 * @param [maxSize] {number} The maximum size for this queue.
	 * @param cmp {Function} a comparator function used for searching within
	 * the container.
	 * @constructor
	 */
	constructor(maxSize: number = 0, cmp: Comparator<T> = null) {
		super(cmp);
		this._maxSize = (maxSize == null || typeof maxSize !== 'number') ? 0 : Math.round(maxSize);
	}

	/**
	 * Adds an item to the end of the queue.  Checks for an overflow condition
	 * and acts if one is detected.
	 * @param data {Object} the data item to add to the queue.
	 */
	public enqueue(data: T): void {
		if (this.overflow()) {
			this.dequeue();
		}

		super.enqueue(data);
	}

	/**
	 * Inserts a data element to the front of the queue.  Checks for an
	 * overflow condition and acts if one is detected.
	 * @param data {Object} the data item to add to the queue.
	 */
	public pushFront(data: T): void {
		const node = new Node<T>(data);

		if (this.overflow()) {
			this.dequeue();
		}

		if (this._root == null) {
			this._root = node;
		} else {
			this._root.left = node;
			node.right = this._root;
			this._root = node;
		}

		this._length++;
		this.emit('add', data);
	}

	/**
	 * Adds an item to the end of the queue.  Checks for an overflow condition
	 * and acts if one is detected.
	 * @param data {Object} the data item to add to the queue.
	 */
	public pushBack(data: T): void {
		if (this.overflow()) {
			this.dequeue();
		}
		this.enqueue(data);
	}

	/**
	 * Returns the first item in the queue without removing it.
	 * @returns {Object} a copy of the first item in the list.
	 */
	public peekFront(): T {
		return this.top();
	}

	/**
	 * Returns the last item in the queue without removing it.
	 * @returns {Object} a copy of the last item in the list.
	 */
	public peekBack(): T {
		if (this._end == null) {
			return null;
		}

		return _.cloneDeep(this._end.data);
	}

	/**
	 * Returns the first item from the queue and removes it.
	 * @returns {Object} the data value on the front of the queue.
	 */
	public popFront(): T {
		return this.dequeue();
	}

	/**
	 * Retrieves the last item from the queue and removes it.
	 * @returns {Object} the data value on the back of the queue.
	 */
	public popBack(): T {
		if (this._end == null) {
			return null;
		}

		const data: any = this._end.data;
		this._end = this._end.left;
		this._length--;
		this.emit('remove', data);
		return data;
	}

	/**
	 * Checks the current internals for an overflow condition.  This occurs
	 * when the maxSize storage size will be exceeded on the next insert
	 * operation.
	 * @returns {boolean} true if in an overflow condition, otherwise false.
	 */
	private overflow(): boolean {
		return !(this._maxSize < 1 || this._length < this._maxSize);
	}
}
