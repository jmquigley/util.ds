"use strict";

import {Comparator} from "./comparator";
import {Iterable} from "./iterable";
import {Color, Node} from "./node";
import {Queue} from "./queue";
import {Tree} from "./tree";

/**
 * Implements a binary tree structure using a Red/Black tree algorithm.
 *
 */
export class BinaryTree<T> extends Tree<T> implements Iterable<T> {
	private _x: Node<T>;

	constructor(arr: T[] = [], cmp: Comparator<T> = null) {
		super(cmp);

		this._first = this._last = this._root = this._x = this._nil;

		if (arr) {
			for (const it of arr) {
				this.insert(it);
			}
		}
	}

	/**
	 * Performs a breadth first traversal of the tree and saves it to an array
	 * of T type (of the tree).  The array of data is returned.  Don't use this
	 * with a large tree.
	 * @returns {T[]} an array of all elements in the tree in breadth order
	 */
	get breadth(): T[] {
		let node = this._root;
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
	 * @return {number} computes and returns the height of the tree.
	 */
	get height(): number {
		const h = this.findHeight(this._root);
		return h <= 0 ? 0 : h;
	}

	/**
	 * @return {T[]} the results of an inorder traversal of the tree.  The
	 * results are stored in an array and returned.
	 */
	get inorder(): T[] {
		const out: T[] = [];
		this.inorderDelegate(this._root, out);
		return out;
	}

	/**
	 * @return {T[]} the results of a postorder traversal of the tree.  The
	 * results are stored in an array and returned.
	 */
	get postorder(): T[] {
		const out: T[] = [];
		this.postorderDelegate(this._root, out);
		return out;
	}

	/**
	 * @return {T[]} the results of a preorder traversal of the tree.  The
	 * results are stored in an array and returned.
	 */
	get preorder(): T[] {
		const out: T[] = [];
		this.preorderDelegate(this._root, out);
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
		if (data == null) {
			return false;
		}

		const q = new Queue<Node<T>>([node]);

		while (!q.empty) {
			node = q.dequeue();

			if (this._cmp(node.data, data) === 0) {
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

	/**
	 * Initializes the object to an emtpy state.  This can be used to
	 * quickly empty the tree and start over.
	 */
	public clear(): void {
		super.clear();
		this._first = this._last = this._root = this._x = this._nil;
	}

	/**
	 * Performs a typically binary search through the tree.
	 * @param data {T} the data element to search for (based on the data type
	 * of the tree)
	 * @return {boolean} true if the item is found in the tree, otherwise
	 * false is returned.
	 */
	public contains(data: T): boolean {
		if (data == null) {
			return false;
		}

		let node: Node<T> = this._root;

		while (node !== this._nil) {
			if (this._cmp(node.data, data) === 0) {
				return true;
			} else if (this._cmp(node.data, data) < 0) {
				node = node.right;
			} else {
				node = node.left;
			}
		}

		return false;
	}

	/**
	 * Searches the tree for an element.  If it is found, then the data element
	 * associated with that node is returned (not the node).  When used with a
	 * primative type this is not useful as the key and the value found would
	 * be the same.  This is helpful when T is a complex object with a custom
	 * Comparator.
	 * @param key {T} a search key to look for in the tree.
	 * @return {T} the full data element within this tree.  If it is not found,
	 * then null is returned.
	 */
	public find(key: T): T {
		if (key == null) {
			return null;
		}

		let node: Node<T> = this._root;

		while (node !== this._nil) {
			if (this._cmp(node.data, key) === 0) {
				return node.data;
			} else if (this._cmp(node.data, key) < 0) {
				node = node.right;
			} else {
				node = node.left;
			}
		}

		return null;
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

	private inorderDelegate(node: Node<T>, out: T[]) {
		if (node === this._nil) {
			return;
		}

		this.inorderDelegate(node.left, out);
		out.push(node.data);
		this.inorderDelegate(node.right, out);
	}

	/**
	 * Inserts a data element into the tree.
	 * @param data {T} the data element to insert into the tree
	 */
	public insert(data: T) {
		if (data == null) {
			return;
		}

		this._x = this._nil;
		this.insertDelegate(data, this._root, this._nil);

		// A duplicate value will make _x nil.  Since it already exists in the
		// tree and has been balanced, no reason to run the fix up again.
		if (this._x !== this._nil) {
			this.insertFixUp(this._x);
		}

		this.emit("insert", this._x.data);
	}

	private insertDelegate(
		data: T,
		node: Node<T> = this._root,
		parent: Node<T> = this._nil
	): Node<T> {
		if (this._root === this._nil) {
			this._x = this.newNode(data, parent);
			this._root = this._x;
			this._length++;
			this._first = this._last = this._x;

			return this._root;
		} else {
			if (node === this._nil) {
				this._length++;
				this._x = this.newNode(data, parent);

				if (this._cmp(data, this._first.data) < 0) {
					this._first = this._x;
				} else if (this._cmp(data, this._last.data) > 0) {
					this._last = this._x;
				}

				return this._x;
			}

			if (this._cmp(data, node.data) < 0) {
				node.left = this.insertDelegate(data, node.left, node);
			} else if (this._cmp(data, node.data) > 0) {
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
		return new Node<T>({
			data,
			parent,
			right: this._nil,
			left: this._nil,
			color: Color.red
		});
	}

	private postorderDelegate(node: Node<T>, out: T[]) {
		if (node === this._nil) {
			return;
		}

		this.postorderDelegate(node.left, out);
		this.postorderDelegate(node.right, out);
		out.push(node.data);
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
	 * Removes the given data value from the tree.
	 * @param data {T} the data value to remove
	 */
	public remove(data: T): T {
		if (data == null) {
			return null;
		}

		const z = this._findNode(data);

		if (z !== this._nil) {
			let x;
			let y = z;
			let yOrigColor: Color = y.color;

			if (z.left === this._nil) {
				x = z.right;
				this.transplant(z, z.right);
			} else if (z.right === this._nil) {
				x = z.left;
				this.transplant(z, z.left);
			} else {
				y = this._minimum(z.right);
				yOrigColor = y.color;
				x = y.right;

				if (y.parent === z) {
					x.parent = y;
				} else {
					this.transplant(y, y.right);
					y.right = z.right;
					y.right.parent = y;
				}

				this.transplant(z, y);
				y.left = z.left;
				y.left.parent = y;
				y.color = z.color;
			}

			if (yOrigColor === Color.black) {
				this.removeFixUp(x);
			}

			this._length--;

			if (this._length !== 0) {
				if (this._cmp(z.data, this._first.data) === 0) {
					this._first = this._minimum();
				} else if (this._cmp(z.data, this._last.data) === 0) {
					this._last = this._maximum();
				}
			} else {
				this._first = this._last = this._root = this._nil;
			}

			this.emit("remove", z.data);
			return z.data;
		}

		return null;
	}

	/**
	 * Special case function to quickly find and remove the first item in the
	 * tree.
	 * @return {T} the data element that was first and removed from the tree.
	 */
	public removeFirst(): T {
		return this.remove(this._first.data);
	}

	private removeFixUp(x: Node<T>) {
		while (x !== this._root && x.color === Color.black) {
			let w;

			if (x === x.parent.left) {
				w = x.parent.right;

				if (w.color === Color.red) {
					w.color = Color.black;
					x.parent.color = Color.red;
					this._leftRotate(x.parent);
					w = x.parent.right;
				}

				if (
					w.left.color === Color.black &&
					w.right.color === Color.black
				) {
					w.color = Color.red;
					x = x.parent;
				} else {
					if (w.right.color === Color.black) {
						w.left.color = Color.black;
						w.color = Color.red;
						this._rightRotate(w);
						w = x.parent.right;
					}

					w.color = x.parent.color;
					x.parent.color = Color.black;
					w.right.color = Color.black;
					this._leftRotate(x.parent);
					x = this._root;
				}
			} else {
				w = x.parent.left;

				if (w.color === Color.red) {
					w.color = Color.black;
					x.parent.color = Color.red;
					this._rightRotate(x.parent);
					w = x.parent.left;
				}

				if (
					w.left.color === Color.black &&
					w.right.color === Color.black
				) {
					w.color = Color.red;
					x = x.parent;
				} else {
					if (w.left.color === Color.black) {
						w.right.color = Color.black;
						w.color = Color.red;
						this._leftRotate(w);
						w = x.parent.left;
					}

					w.color = x.parent.color;
					x.parent.color = Color.black;
					w.left.color = Color.black;
					this._rightRotate(x.parent);
					x = this._root;
				}
			}
		}

		x.color = Color.black;
	}

	/**
	 * Special case function to quickly find and remove the last item in the
	 * tree.
	 * @return {T} the data element that was last and removed from the tree.
	 */
	public removeLast(): T {
		return this.remove(this._last.data);
	}

	/**
	 * Replaces one subtree as a child of its parent with another subtree
	 * @param u {Node<T>} parent subtree
	 * @param v {Node<T>} child subtree to use in replacement
	 * @private
	 */
	private transplant(u: Node<T>, v: Node<T>) {
		if (u.parent === this._nil) {
			this._root = v;
		} else if (u === u.parent.left) {
			u.parent.left = v;
		} else {
			u.parent.right = v;
		}

		v.parent = u.parent;
	}

	// The functions below are private by convention, but have a public
	// interface.  They generally wouldn't be used in the use api, but are
	// exposed for unit test confirmation.  They use the leading _ value
	// to denote them as private.

	/**
	 * Searches the tree for a specific node within the tree.
	 * @param data {T} the data value to search for in the tree.
	 * @return {Node<T>} if the data is found, then the node that holds it is
	 * returned.  If it is not found, then nil is returned.
	 */
	public _findNode(data: T): Node<T> {
		// Two special cases to quickly find the first or the last element
		if (this._cmp(data, this._first.data) === 0) {
			return this._first;
		} else if (this._cmp(data, this._last.data) === 0) {
			return this._last;
		}

		let node: Node<T> = this._root;

		while (node !== this._nil) {
			if (this._cmp(node.data, data) === 0) {
				break;
			} else if (this._cmp(node.data, data) < 0) {
				node = node.right;
			} else {
				node = node.left;
			}
		}

		return node;
	}

	/**
	 * Localized left rotation of nodes.  This is a public function but is private
	 * by convention (for testing).  Generally not called as part of the api.
	 */
	public _leftRotate(x: Node<T>) {
		const y: Node<T> = x.right;

		x.right = y.left; // turn y's left subtree into x's right subtree
		if (y.left !== this._nil) {
			// fix y's left child parent pointer
			y.left.parent = x;
		}

		y.parent = x.parent; // link x's parent to y

		if (x.parent === this._nil) {
			// special case fix when rotating root
			this._root = y;
		} else {
			if (x === x.parent.left) {
				x.parent.left = y;
			} else {
				x.parent.right = y;
			}
		}

		y.left = x; // move previous x into y's left child
		x.parent = y; // fix the parent pointer after previous move
	}

	/**
	 * Searches a tree from a given node for the maximum value in that
	 * (sub)tree.  Note that the property `.largest` can be used to
	 * quickly retrieve the largest value in the tree.  This is really used
	 * to recompute the maximum value when it is removed from the tree.
	 * @param node {Node<T>} the node location to start the search.  By
	 * default this is the root node if no node is given.
	 * @return {Node<T>} the largest node in the (sub)tree.
	 */
	public _maximum(node: Node<T> = this._root): Node<T> {
		if (node == null || node === this._nil) {
			return this._nil;
		}

		while (node.right && node.right !== this._nil) {
			node = node.right;
		}

		return node;
	}

	/**
	 * From a node, searches a tree or subtree for the minimum value in that
	 * (sub)tree.  Note that the property `.smallest` can be used to
	 * quickly retrieve the smallest value in the tree.  This is really used
	 * to recompute the minimum value when it is removed from the tree.
	 * @param node {Node<T>} the node location to start the search.  By
	 * default this is the root node if no node is given.
	 * @return {Node<T>} the smallest node in the (sub)tree.
	 */
	public _minimum(node: Node<T> = this._root): Node<T> {
		if (node == null || node === this._nil) {
			return this._nil;
		}

		while (node.left && node.left !== this._nil) {
			node = node.left;
		}

		return node;
	}

	/**
	 * Localized right rotation of nodes.  This is a public function but is private
	 * by convention (for testing).  Generally not called as part of the api.
	 */
	public _rightRotate(x: Node<T>) {
		const y: Node<T> = x.left;

		x.left = y.right; // turn y's right subtree into x's left subtree
		if (y.right !== this._nil) {
			// fix y's right child parent pointer
			y.right.parent = x;
		}

		y.parent = x.parent; // link x's parent to y

		if (x.parent === this._nil) {
			// special case fix when rotating root
			this._root = y;
		} else {
			if (x === x.parent.right) {
				x.parent.right = y;
			} else {
				x.parent.left = y;
			}
		}

		y.right = x; // move previous x into y's right child
		x.parent = y; // fix y's left child parent pointer
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
		const nil = this._nil; // nested function workaround for .this

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
