import {Comparator} from "./comparator";
import {List} from "./list";
import {Node} from "./node";

/** Simple FIFO queue implementation */
export class Queue<T> extends List<T> {
	protected _end: Node<T> = null;

	constructor(arr: T[] = [], comparator: Comparator<T> = null) {
		super(arr, comparator);
	}

	/**
	 * Removes and returns the item at the front of the queue.
	 * @returns {T} the data at the front of the queue.
	 */
	public dequeue(): T {
		return this.remove(null, List.FRONT);
	}

	/**
	 * Removes all items from the queue in order and returns them as an
	 * array of data values.
	 * @returns {Array} a list of queue items as an array.
	 */
	public drain(): T[] {
		const arr: T[] = [];

		while (!this.isEmpty()) {
			arr.push(this.dequeue());
		}

		this._length = 0;
		this.emit("drain", arr);
		return arr;
	}

	/**
	 * Searches the queue for the requested data element and removes it
	 * from the queue.
	 * @param data {Object} the data element that should be removed from
	 * the queue.
	 */
	public eject(data: T): T {
		return this.remove(data);
	}

	/**
	 * Adds an item to the end of the queue.
	 * @param data {Object} the data to insert into the queue.
	 */
	public enqueue(data: T) {
		this.insert(data, List.BACK);
	}

	/**
	 * Override wrapper for the push function from the inherited stack.  A
	 * stack always pushes to the front.  The general queue should always push
	 * to the end of the structure.
	 * @param data {Object} the data to push on the end of the queue.
	 */
	public push = this.enqueue;
}
