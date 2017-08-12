'use strict';

import {Collection} from './collection';
import {Comparator} from './comparator';
import {Tree} from './tree';

/**
 * Implements a Red/Black tree structure
 */
export class BinaryTree<T> extends Collection<T> implements Tree<T> {

	constructor(cmp: Comparator<T> = null) {
		super(cmp);
	}

	public breadth(): T[] {
		// TODO: implement breadth traversal
		return null;
	}

	public delete(data: T) {
		// TODO: implement delete operation
		data = null;
	}

	public first(): T {
		// TODO: implement first operation
		return null;
	}

	public has(data: T): boolean {
		// TODO: impelment has operation
		data = null;
		return false;
	}

	public inorder(): T[] {
		// TODO: implement inorder traversal
		return null;
	}

	public insert(data: T): T {
		// TODO: implement insert operation
		data = null;
		return null;
	}

	public last(): T {
		// TODO: implement last operation
		return null;
	}

	public next(): T {
		// TODO: implement next generator/iterator
		return null;
	}

	public postorder(): T[] {
		// TODO: implement postorder traversal
		return null;
	}

	public preorder(): T[] {
		// TODO: implement preorder traversal
		return null;
	}
}
