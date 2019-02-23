"use strict";

import logger from "util.log";
import {getUUID, nilEvent} from "util.toolbox";
import {Comparator} from "./comparator";
import {Iterable} from "./iterable";
import {Id, Node} from "./node";
import {Queue} from "./queue";
import {Tree} from "./tree";

const log = logger.instance({
	debug: process.env.NODE_ENV !== "production",
	namespace: "GeneralTree",
	nofile: true
});

export interface GeneralTreeLinks<T> {
	children: Array<TreeNode<T>>;
}

export interface TreeIndex<T> {
	[key: string]: TreeNode<T>;
}

type TreeNode<T extends any> = Node<T> & GeneralTreeLinks<T> & T;
export type GeneralTreeItem<T> = TreeNode<T>;

export type WalkCallback<T> = (val: TreeNode<T>) => void;

export interface GeneralTreeOptions<T> {
	sequence?: number;
	testing?: boolean;
	treeData: Array<TreeNode<T>>;
	useindex?: boolean;
	usesanitize?: boolean;
}

export class GeneralTree<T> extends Tree<T> implements Iterable<T> {
	private _treeIndex: TreeIndex<T> = {};

	constructor(
		private _options: GeneralTreeOptions<T>,
		comparator: Comparator<T> = null
	) {
		super(comparator);

		this._options = Object.assign(
			{
				sequence: 0,
				testing: process.env.NODE_ENV !== "production",
				treeData: [],
				useindex: true,
				usesanitize: true
			},
			this._options || {}
		);

		this.treeData = this._options.treeData;
	}

	get height(): number {
		return this._height;
	}

	get sequence(): number {
		return this._options.sequence;
	}

	set sequence(val: number) {
		this._options.sequence = val;
	}

	get testing(): boolean {
		return this._options.testing;
	}

	get treeData(): Array<TreeNode<T>> {
		return this._root;
	}

	set treeData(val: Array<TreeNode<T>>) {
		this._root = val || [];
		this.walk(nilEvent);
	}

	get treeIndex(): TreeIndex<T> {
		return this._treeIndex;
	}

	set treeIndex(val: TreeIndex<T>) {
		this._treeIndex = val;
	}

	get useindex(): boolean {
		return this._options.useindex;
	}

	get usesanitize(): boolean {
		return this._options.usesanitize;
	}

	public clear(): void {
		super.clear();
		this.treeData = null;
	}

	/**
	 * Performs a breadth search of the tree for a matching id value.  If
	 * the item has been seen before, then it is retrieved from an index (if
	 * useindex is set to true).
	 * @param searchId {Id} the id value to search for in the tree
	 * @return {GeneralTreeItem} of the item found otherwise null
	 */
	public find(searchId: Id): TreeNode<T> {
		const q = new Queue<TreeNode<T>>();

		if (this.treeData == null || this.treeData.length < 1) {
			log.warn("treeData is empty");
			return null;
		}

		if (this.useindex && searchId in this._treeIndex) {
			return this._treeIndex[searchId];
		}

		let nodeChildren: Array<TreeNode<T>> = this.treeData;
		let nodeToSearch: TreeNode<T> = null;

		do {
			for (const child of nodeChildren) {
				// save all of this parents children into the q
				q.enqueue(child);
			}

			nodeToSearch = q.dequeue();
			if (nodeToSearch.id === searchId) {
				// If found, get rid of all remaining q items and return
				q.drain();

				if (this.useindex) {
					this._treeIndex[nodeToSearch.id] = nodeToSearch;
				}

				return nodeToSearch;
			} else {
				nodeChildren = nodeToSearch.children;
			}
		} while (q.size > 0);

		return null; // no item found
	}

	/**
	 * Searches every node in the tree for data matching the given search critera
	 * in the dataToFind parameter.  The comparator defined when the class
	 * is instantiated is used to compare the dataToFind against each node in the
	 * tree.  Every node that is found is placed into an array and that
	 * array is returned to the caller.
	 * @param dataToFind {T} - the input data matching the template fields for
	 * the tree.
	 * @returns {GeneralTreeItem[]} an array of tree nodes that match
	 * the search criteria.  If no nodes are found, then an empty array is
	 * returned.
	 */
	public findByField(dataToFind: T): Array<TreeNode<T>> {
		const foundNodes: Array<TreeNode<T>> = [];

		if (this._comparator) {
			this.walk((it: TreeNode<T>) => {
				if (this._comparator(dataToFind, it) === 0) {
					foundNodes.push(it);
				}
			});
		}

		return foundNodes;
	}

	/**
	 * Retrieves the list of nodes associated with the given parent key.
	 * This is basically get all of the children associated with the
	 * given parent ID value.
	 * @param parentId {Id} - the parent id key value field to search
	 * for.
	 * @return {GeneralTreeItem[]} - all of the children associated with
	 * the given parent.  If there are no children, then an empty array
	 * is returned.
	 */
	public findByParent(parentId: Id) {
		let foundNodes: Array<TreeNode<T>> = [];
		const parentNode = this.find(parentId);

		if (parentNode) {
			foundNodes = parentNode.children;
		}

		return foundNodes;
	}

	/**
	 * Generates a new unique key for a node.  When the testing flag is set
	 * to true, then the id is an ordered sequence.  This is done to make
	 * the keys predictable when the code is under test.
	 * @return {Id} the new key value.
	 */
	private getNewKey(): Id {
		if (this.testing) {
			return this.sequence++;
		}

		return getUUID();
	}

	// TODO: Implement insert function on generaltree
	public insert(data: TreeNode<T>) {
		log.debug("insert: %j", data);
	}

	// TODO: Implement remove function on generaltree
	public remove(data: TreeNode<T>) {
		log.debug("remove: %j", data);
	}

	/**
	 * Takes an input node and ensures that it has all key fields.	 It
	 * also creates the node key value if one does not exist.
	 * @param node {TreeNode<T>} the node to fix
	 * @return {TreeNode<T>} a referece back of the node that was sanitized
	 */
	private sanitize(node: TreeNode<T>): TreeNode<T> {
		if (!("parent" in node)) {
			node["parent"] = this._nil;
		}

		if (!("parentId" in node)) {
			node["parentId"] = null;
		}

		if (!("id" in node) || node["id"] == null) {
			node["id"] = this.getNewKey();
		}

		if (!("children" in node)) {
			node["children"] = [];
		}

		// Adds a reference to itself for the .data attribute.  This is needed
		// to reuse the first/last/end/etc attribute functions from collection
		// They all retrieve the .data element through the Node and the general
		// tree doens't use a .data element on TreeNode (it uses T on the
		// TreeNode directly).  This adds a faux reference so these functions
		// can work without modification.
		if (!("data" in node)) {
			node["data"] = node;
		}

		return node;
	}

	/**
	 * Performs an inorder traversal of the current tree.  At each node
	 * a callback function is executed and the node being processed
	 * is given as a parameter.
	 * @param fn {WalkCallback<T>} a callback function invoked on each
	 * node as it is encountered.
	 */
	public walk(fn: WalkCallback<T>): void {
		if (this._root.length < 1) {
			return;
		}

		if (fn == null || typeof fn !== "function") {
			log.warn("walk() parameter must be a function");
			return;
		}

		if (this._root == null) {
			log.warn("The root node is empty on call to walk()");
			return;
		}

		// creates a binding to this for preorder call that will
		// have its own .this pointer not related to the class.
		const self: GeneralTree<T> = this;
		if (this.useindex) {
			this._treeIndex = {};
		}

		this._length = 0;
		let currentTreeDepth: number = 0;

		function preorder(children: Array<TreeNode<T>>) {
			if (++currentTreeDepth > self._height) {
				self._height = currentTreeDepth;
			}

			for (let childNode of children) {
				childNode = self.usesanitize
					? self.sanitize(childNode)
					: childNode;

				if (self.useindex) {
					self._treeIndex[childNode.id] = childNode;
				}

				fn(childNode);
				self._last = childNode;
				self._length++;

				if ("children" in childNode && childNode.children.length > 0) {
					for (const child of childNode.children) {
						child.parent = childNode;
						child.parentId = childNode.id;
					}

					preorder(childNode.children);
					currentTreeDepth--;
				}
			}
		}

		this._height = 0;
		this._first = null;
		if (this._root.length > 0) {
			this._first = this.root[0];
		}

		preorder(this._root);
	}
}
