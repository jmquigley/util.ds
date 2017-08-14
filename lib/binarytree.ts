'use strict';

import {Collection} from './collection';
import {Comparator} from './comparator';
import {Color, Node} from './node';
import {Queue} from './queue';
import {Tree} from './tree';

/**
 * Implements a binary tree structure using a Red/Black tree algorithm.
 *
 * Introduction to Algorithms, Cormen 3rd ed.
 *
 */
export class BinaryTree<T> extends Collection<T> implements Tree<T> {

	private _x: Node<T>;
	private _nil: Node<T>;
	protected _root: Node<T>;
	protected _first: T;
	protected _last: T;

	constructor(arr: T[] = [], cmp: Comparator<T> = null) {
		super(cmp);

		this._nil = new Node<T>(null, null, null, null, Color.black);
		this._root = this._x = this._nil;

		for (const it of arr) {
			this.insert(it);
		}
	}

	get first(): T {
		return this._first;
	}

	get height(): number {
		return this.findHeight(this._root);
	}

	get last(): T {
		return this._last;
	}

	/**
	 * Performs a breadth first traversal of the tree and saves it to an array
	 * of T type (of the tree).  The array of data is returned.  Don't use this
	 * with a large tree.
	 * @param node {T} the starting node for the search.  This is root by
	 * default
	 * @returns {T[]} an array of all elements in the tree in breadth order
	 */
	public breadth(node: Node<T> = this._root): T[] {
		const out: T[] = [];
		const q = new Queue<Node<T>>([node]);

		while (!q.empty) {
			node = q.dequeue();

			out.push(node.data);

			if (node.left !== this._nil) {
				q.enqueue(node.left);
			}

			if (node.right !== this._nil) {
				q.enqueue(node.right);
			}
		}
		return out;
	}

	/**
	 * Peforms a breadth first search against the tree.  Generally this is not
	 * the best way to search the tree (use contains to determine if a key is
	 * in it).
	 * @param data {T} the data element to search for (based on the data type
	 * of the tree)
	 * @param node {T} the starting node for the search.  This is root by
	 * default
	 * @return {boolean} true if the item is found in the tree, otherwise
	 * false is returned.
	 */
	public breadthSearch(data: T, node: Node<T> = this._root): boolean {
		const q = new Queue<Node<T>>([node]);

		while (!q.empty) {
			node = q.dequeue();

			if (node.data === data) {
				return true;
			}

			if (node.left !== this._nil) {
				q.enqueue(node.left);
			}

			if (node.right !== this._nil) {
				q.enqueue(node.right);
			}
		}

		return false;
	}

	public delete(data: T) {
		data = null;
		this.deleteFixUp(null);
	}

	private deleteFixUp(node: Node<T>) {
		node = null;
	}

	/**
	 * Performs a typically binary search through the tree.
	 * @param data {T} the data element to search for (based on the data type
	 * of the tree)
	 * @return {boolean} true if the item is found in the tree, otherwise
	 * false is returned.
	 */
	public contains(data: T): boolean {
		let node: Node<T> = this._root;

		while (node !== this._nil) {
			if (node.data === data) {
				return true;
			} else if (node.data < data) {
				node = node.right;
			} else {
				node = node.left;
			}
		}

		return false;
	}

	/**
	 * Internal method that traverses the tree to compute the current height.
	 * This is used by the `.height` property
	 * @param node {Node<T>} the starting node position to start the height
	 * count.
	 * @private
	 */
	private findHeight(node: Node<T>): number {

		if (node === this._nil) {
			return -1;
		}

		const lefth: number = this.findHeight(node.left);
		const righth: number = this.findHeight(node.right);

		if (lefth > righth) {
			return lefth + 1;
		} else {
			return righth + 1;
		}
	}

	public inorder(node: Node<T> = this._root): T[] {
		const out: T[] = [];
		this.inorderDelegate(node, out);
		return out;
	}

	private inorderDelegate(node: Node<T>, out: T[]) {

		if (node === this._nil) {
			return;
		}

		this.inorderDelegate(node.left, out);
		out.push(node.data);
		this.inorderDelegate(node.right, out);
	}

	public insert(data: T) {
		this._x = this._nil;
		this.insertDelegate(data, this._root, this._nil);

		// A duplicate value will make _x nil.  Since it already exists in the
		// tree and has been balanced, no reason to run the fix up again.
		if (this._x !== this._nil) {
			this.insertFixUp(this._x);
		}
	}

	private insertDelegate(data: T, node: Node<T> = this._root, parent: Node<T> = this._nil): Node<T> {

		if (this._root === this._nil) {
			this._x = this.newNode(data, parent);
			this._root = this._x;
			this._length++;
			this._first = this._last = data;

			return this._root;
		} else {

			if (node === this._nil) {
				this._length++;
				this._x = this.newNode(data, parent);

				if (data < this._first) {
					this._first = data;
				} else if (data > this._last) {
					this._last = data;
				}

				return this._x;
			}

			if (data < node.data) {
				node.left = this.insertDelegate(data, node.left, node);
			} else if (data > node.data) {
				node.right = this.insertDelegate(data, node.right, node);
			}

			return node;
		}
	}

	private insertFixUp(node: Node<T>) {
		let x = node;
		let y;

		while (x !== this._root && x.parent.color === Color.red) {

			if (x.parent === x.parent.parent.left) {
				y = x.parent.parent.right;

				if (y !== this._nil && y.color === Color.red) {
					x.parent.color = Color.black;
					y.color = Color.black;
					x.parent.parent.color = Color.red;
					x = x.parent.parent;
				} else {
					if (x === x.parent.right) {
						x = x.parent;
						this._leftRotate(x);
					}

					x.parent.color = Color.black;
					x.parent.parent.color = Color.red;
					this._rightRotate(x.parent.parent);
				}
			} else {
				y = x.parent.parent.left;

				if (y !== this._nil && y.color === Color.red) {
					x.parent.color = Color.black;
					y.color = Color.black;
					x.parent.parent.color = Color.red;
					x = x.parent.parent;
				} else {
					if (x === x.parent.left) {
						x = x.parent;
						this._rightRotate(x);
					}

					x.parent.color = Color.black;
					x.parent.parent.color = Color.red;
					this._leftRotate(x.parent.parent);
				}
			}
		}

		this._root.color = Color.black;
	}

	private newNode(data: T, parent: Node<T>): Node<T> {
		return new Node<T>(data, parent, this._nil, this._nil, Color.red);
	}

	public postorder(node: Node<T> = this._root): T[] {
		const out: T[] = [];
		this.postorderDelegate(node, out);
		return out;
	}

	private postorderDelegate(node: Node<T>, out: T[]) {

		if (node === this._nil) {
			return;
		}

		this.postorderDelegate(node.left, out);
		this.postorderDelegate(node.right, out);
		out.push(node.data);
	}

	public preorder(node: Node<T> = this._root): T[] {
		const out: T[] = [];
		this.preorderDelegate(node, out);
		return out;
	}

	private preorderDelegate(node: Node<T>, out: T[]) {

		if (node === this._nil) {
			return;
		}

		out.push(node.data);
		this.preorderDelegate(node.left, out);
		this.preorderDelegate(node.right, out);
	}

	/**
	 * Searches a tree from a given node for the maximum value in that
	 * (sub)tree.  Note that the property `.largest` can be used to
	 * quickly retrieve the largest value in the tree.
	 * @param node {Node<T>} the node location to start the search.  By
	 * default this is the root node if no node is given.
	 * @return {Node<T>} the largest node in the (sub)tree.
	 */
	public _maximum(node: Node<T> = this._root): Node<T> {
		if (node === this._nil) {
			return this._nil;
		}

		while (node.left !== this._nil) {
			node = node.right;
		}

		return node;
	}

	/**
	 * From a node searches a tree or subtree for the minimum value in that
	 * (sub)tree.  Note that the property `.smallest` can be used to
	 * quickly retrieve the smallest value in the tree.
	 * @param node {Node<T>} the node location to start the search.  By
	 * default this is the root node if no node is given.
	 * @return {Node<T>} the smallest node in the (sub)tree.
	 */
	public _minimum(node: Node<T> = this._root): Node<T> {
		if (node === this._nil) {
			return this._nil;
		}

		while (node.left !== this._nil) {
			node = node.left;
		}

		return node;
	}

	/**
	 * Localized left rotation of nodes.  This is a public function but is private
	 * by convention (for testing).  Generally not called as part of the api.
	 */
	public _leftRotate(x: Node<T>) {
		const y: Node<T> = x.right;

		x.right = y.left;            // turn y's left subtree into x's right subtree
		if (y.left !== this._nil) {  // fix y's left child parent pointer
			y.left.parent = x;
		}

		y.parent = x.parent;         // link x's parent to y

		if (x.parent === this._nil) { // special case fix when rotating root
			this._root = y;
		} else {
			if (x === x.parent.left) {
				x.parent.left = y;
			} else {
				x.parent.right = y;
			}
		}

		y.left = x;                  // move previous x into y's left child
		x.parent = y;                // fix the parent pointer after previous move
	}

	/**
	 * Localized right rotation of nodes.  This is a public function but is private
	 * by convention (for testing).  Generally not called as part of the api.
	 */
	public _rightRotate(x: Node<T>) {
		const y: Node<T> = x.left;

		x.left = y.right;            // turn y's right subtree into x's left subtree
		if (y.right !== this._nil) { // fix y's right child parent pointer
			y.right.parent = x;
		}

		y.parent = x.parent;         // link x's parent to y

		if (x.parent === this._nil) { // special case fix when rotating root
			this._root = y;
		} else {
			if (x === x.parent.right) {
				x.parent.right = y;
			} else {
				x.parent.left = y;
			}
		}

		y.right = x;                // move previous x into y's right child
		x.parent = y;               // fix y's left child parent pointer
	}

	/**
	 * The successor of a node is the node with the smallest key greater than
	 * node.data.
	 * @param node {Node<T>} the node location to start the search for a
	 * successor.
	 * @return {Node<T>} a reference to the successor node.
	 */
	public _successor(node: Node<T>): Node<T> {
		if (node.right !== this._nil) {
			return this._minimum(node.right);
		}

		let y = node.parent;
		while (y !== this._nil && node === y.right) {
			node = y;
			y = y.parent;
		}

		return y;
	}

	/**
	 * Implements an inorder successor algorithm to process each node through
	 * an iterator.
	 */
	public *[Symbol.iterator]() {
		const nil = this._nil;  // nested function workaround for .this

		function getFirstNode(root: Node<T>): Node<T> {
			if (root === nil) {
				return nil;
			}

			return getLeftMost(root);
		}

		function getLeftMost(tnode: Node<T>): Node<T> {
			while (tnode.left !== nil) {
				tnode = tnode.left;
			}

			return tnode;
		}

		function getNextNode(tnode: Node<T>): Node<T> {
			if (tnode.right !== nil) {
				return getLeftMost(tnode.right);
			} else {
				while (tnode.parent !== nil && tnode === tnode.parent.right) {
					tnode = tnode.parent;
				}

				return tnode.parent;
			}
		}

		let node: Node<T> = getFirstNode(this._root);
		while (node !== nil) {
			yield node.data;
			node = getNextNode(node);
		}
	}
}
