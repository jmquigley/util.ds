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

export type WalkCallback<T> = (val: TreeNode<T>) => void;

export interface GeneralTreeOptions<T> {
	defaultTitle?: string;
	sequence?: number;
	testing?: boolean;
	treeData: Array<TreeNode<T>>;
	useindex?: boolean;
	usesanitize?: boolean;
}

const nullParent: TreeNode<any> = {
	children: []
};

export class GeneralTree<T> extends Tree<T> implements Iterable<T> {
	private _treeIndex: TreeIndex<T> = {};

	constructor(
		private _options: GeneralTreeOptions<T>,
		comparator: Comparator<T> = null
	) {
		super(comparator);

		this._nil = this._first = this._last = this._root = nullParent;
		this._options = Object.assign(
			{
				defaultTitle: "default",
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

	get defaultTitle(): string {
		return this._options.defaultTitle;
	}

	set defaultTitle(val: string) {
		this._options.defaultTitle = val;
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

	/**
	 * Performs a breadth search of the tree for a matching id value.
	 * @param id {string} the id value to search for
	 * @return {TreeItem} of the item found otherwise null
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
	 * Generates a new unique key for a node.  When the testing flag is set
	 * to true, then the id is an ordered sequence.  This is done to make
	 * the keys predictable when the code is under test.
	 * @return {string} the new key value.
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

	public remove(data: TreeNode<T>) {
		log.debug("remove: %j", data);
	}

	/**
	 * Takes an input node and ensures that it has all key fields.	 It
	 * also creates the node key value if one does not exist.
	 * @param node {TreeNode} the node to fix
	 * @return {TreeNode} a referece back of the node that was sanitized
	 */
	private sanitize(node: TreeNode<T>): TreeNode<T> {
		if (!("parent" in node)) {
			node["parent"] = nullParent;
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
	 * @param fn {WalkCallback} a callback function invoked on each
	 * node as it is encountered.
	 * @return {TreeeItem[]} a reference to the tree structure that was
	 * processed.
	 */
	public walk(fn: WalkCallback<T>): void {
		if (fn == null || typeof fn !== "function") {
			log.warn("walk() parameter must be a function");
			return null;
		}

		if (this._root == null) {
			log.warn("The root node is empty on call to walk()");
			return null;
		}

		// creates a binding to this for preorder call that will
		// have its own .this pointer not related to the class.
		const self: GeneralTree<T> = this;
		if (this.useindex) {
			this._treeIndex = {};
		}

		this._length = 0;
		let lastNodeInTree: TreeNode<T> = null;

		function preorder(children: Array<TreeNode<T>>) {
			for (let childNode of children) {
				childNode = self.usesanitize
					? self.sanitize(childNode)
					: childNode;

				if (self.useindex) {
					self._treeIndex[childNode.id] = childNode;
				}

				self._length++;
				fn(childNode);
				lastNodeInTree = childNode;

				if ("children" in childNode && childNode.children.length > 0) {
					for (const child of childNode.children) {
						child.parent = childNode;
						child.parentId = childNode.id;
					}

					preorder(childNode.children);
				}
			}
		}

		this._first = null;
		if (this._root.length > 0) {
			this._first = this.root[0];
		}

		preorder(this._root);
		this._last = lastNodeInTree;
	}
}
