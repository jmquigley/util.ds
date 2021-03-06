import {Collection} from "./collection";
import {Comparator} from "./comparator";
import {nilNode, Node} from "./node";

/**
 * The abstract base class for all Tree data structures
 *
 */
export abstract class Tree<T> extends Collection<T> {
	protected _height: number = 0;
	protected _x: Node<T> = nilNode;

	constructor(comparator: Comparator<T> = null) {
		super(comparator);
	}

	/**
	 * Initializes the object to an emtpy state.  This can be used to
	 * quickly empty the tree and start over.
	 */
	public clear(): void {
		super.clear();
		this._root = this._x = this.nil;
		this._height = 0;
	}
}
