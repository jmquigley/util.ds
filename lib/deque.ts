import {Comparator} from "./comparator";
import {List} from "./list";
import {Queue} from "./queue";

/** A double ended Queue class */
export class Deque<T> extends Queue<T> {
	private _maxSize: number;

	/**
	 * The deque can be unlimited in size (default) or set to a maxium size
	 * when constructed.  When the max size is exceeded, then the front item is
	 * automatically removed from the queue and the new item is placed in the
	 * queue (depending on  which type of insert is calld).
	 * @param [maxSize] {number} The maximum size for this queue.
	 * @param [arr] {T[]} An array of initial input values
	 * @param cmp {Function} a comparator function used for searching within
	 * the container.
	 * @constructor
	 */
	constructor(maxSize: number = 0, arr: T[] = [], cmp: Comparator<T> = null) {
		super(arr, cmp);

		this._maxSize =
			maxSize == null || typeof maxSize !== "number"
				? 0
				: Math.round(maxSize);
	}

	/**
	 * Checks the current internals for an overflow condition.  This occurs
	 * when the maxSize storage size will be exceeded on the next insert
	 * operation.
	 * @returns {boolean} true if in an overflow condition, otherwise false.
	 */
	get overflow(): boolean {
		return !(this._maxSize < 1 || this._length < this._maxSize);
	}

	/**
	 * Adds an item to the end of the queue.  Checks for an overflow condition
	 * and acts if one is detected.
	 * @param data {Object} the data item to add to the queue.
	 */
	public enqueue(data: T): void {
		if (this.overflow) {
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
		if (this.overflow) {
			this.dequeue();
		}

		this.insert(data, List.FRONT);
	}

	/**
	 * Adds an item to the end of the queue.  Checks for an overflow condition
	 * and acts if one is detected.
	 * @param data {Object} the data item to add to the queue.
	 */
	public pushBack(data: T): void {
		if (this.overflow) {
			this.dequeue();
		}
		this.enqueue(data);
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
		return this.remove(null, List.BACK);
	}
}
