"use strict";

import {nl} from "util.constants";
import logger from "util.log";
import {getUUID, nilEvent} from "util.toolbox";
import {Comparator} from "./comparator";
import {Iterable} from "./iterable";
import {AugmentedNode, Id, nilNode, Node, NodeData, NodeKeys} from "./node";
import {Queue} from "./queue";
import {Tree} from "./tree";

const log = logger.instance({
	debug: process.env.NODE_ENV !== "production",
	namespace: "GeneralTree",
	nofile: true
});

export interface TreeIndex<T> {
	[key: string]: TreeNode<T>;
}

type TreeNode<T> = AugmentedNode<T>;

export type GeneralTreeItem<T> = TreeNode<T>;

export type GeneralTreeFlat<T> = NodeKeys & NodeData<T> & T;

export type ToStringCallback<T> = (val: TreeNode<T>) => string;
export type WalkCallback<T> = (val: TreeNode<T>) => void;

export interface GeneralTreeOptions<T> {
	sequence?: number;
	testing?: boolean;
	treeData: Array<TreeNode<T>>;
	useindex?: boolean;
	usesanitize?: boolean;
}

export class GeneralTree<T> extends Tree<T> implements Iterable<T> {
	private _dirty: boolean = true;
	private _treeIndex: TreeIndex<T> = {};

	constructor(
		private _options: GeneralTreeOptions<T>,
		comparator: Comparator<T> = null
	) {
		super(comparator);
		this.clear();

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

	get dirty(): boolean {
		return this._dirty;
	}

	get first(): TreeNode<T> {
		return this._first;
	}

	set first(val: TreeNode<T>) {
		this._first = val;
	}

	get height(): number {
		this.walk(nilEvent);
		return this._height;
	}

	get last(): TreeNode<T> {
		return this._last;
	}

	set last(val: TreeNode<T>) {
		this._last = val;
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
		this._dirty = true;
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

	private addToIndex(node: TreeNode<T>) {
		if (node && this.useindex) {
			this._treeIndex[node.id] = node;
		}
	}

	public clear(): void {
		super.clear();
		this.treeData = null;
	}

	/**
	 * Searches through all of the nodes to see if they contain the given
	 * search field data.  This works like findByField.  This function
	 * wraps that method and checks if it returned anyting.
	 * @return {boolean} true if the dat fields are found within the
	 * tree, otherwise false.
	 */
	public contains(dataToFind: T): boolean {
		return this.findByField(dataToFind).length > 0;
	}

	/**
	 * Creates a new node object with the given node properties as
	 * a parameter.  The given properties are merged into the newly
	 * created node.
	 * @param node {GeneralTreeItem} - the node fields to assign to the new
	 * node object
	 * @return {GeneralTreeItem} a new node instance reference
	 */
	public createNode(
		configNode: GeneralTreeItem<T> = null
	): GeneralTreeItem<Node<T>> {
		const newNode: GeneralTreeItem<Node<T>> = Object.assign(
			new Node<T>({
				id: this.getNewKey(),
				parent: nilNode
			}),
			configNode || {}
		);
		newNode.data = newNode as any;
		return newNode;
	}

	/**
	 * Takes a 1D array, created by the flatten function, and expands it into
	 * the tree.  The current tree is replaced by this expanded tree.
	 * @param flatNodes {Array<GeneralFlatTree<T>>} - the array of flattened
	 * nodes that will be used to expand the tree.
	 */
	public expand(flatNodes: Array<GeneralTreeFlat<T>>) {
		this.clear();
		for (const node of flatNodes) {
			this.insert(node);
		}
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

				this.addToIndex(nodeToSearch);

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
	 * Walks through the tree data and flattens it into a 1D array of nodes.
	 * This flatten can be reversed using the expand function.
	 * @return {Array<GeneralTreeFlat<T>>} an array of nodes representing the
	 * tree and its parent/child key relationship.
	 */
	public flatten(): Array<GeneralTreeFlat<T>> {
		const arr: Array<GeneralTreeFlat<T>> = [];

		this.walk((node: TreeNode<T>) => {
			const {data, children, parent, ...fields} = node;
			arr.push(fields as GeneralTreeFlat<T>);
		});

		return arr;
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

	/**
	 * Takes a child array and and id and searches the array for the existence
	 * of that id within it.
	 * @param searchId {Id} - the id value to use in the search
	 * @param children {Array<TreeNode<T>>} - child array to search for an id
	 * @return {boolean} true if the id was found in the array, otherise false.
	 */
	private isIdInChildren(searchId: Id, children: Array<TreeNode<T>>) {
		return children.find((child) => child.id === searchId) != null;
	}

	/**
	 * Inserts a new node into the general tree.
	 * @param dataToInsert {TreeNode<T>} - the config information for the node
	 * that will be inserted (note that this is NOT the node inserted).  Generally
	 * the parentId is used to determine where it will be inserted.
	 * @param asFirstChild=true {boolean} - determines what end of the child
	 * array will be used when adding the new node to the tree.  If true, then
	 * the new node is inserted at the beginning of the array, otherise at the
	 * end.  The default behavior is the front.
	 * @param validate=false {boolean} - if true, then validate .id values
	 * on the input config data to ensure no duplidates.
	 * @return {GeneralTreeItem<Node<T>>} a reference to the new node that was
	 * inserted into the tree.  On error this is null (with a corresponding
	 * warning message).
	 */
	public insert(
		dataToInsert: TreeNode<T>,
		asFirstChild: boolean = true,
		validate: boolean = false
	): GeneralTreeItem<Node<T>> {
		if (!dataToInsert) {
			log.warn("Trying to insert nothing into the tree (skipping noop)");
			return null;
		}

		if (validate && "id" in dataToInsert && this.find(dataToInsert.id)) {
			log.warn(
				"Not alloed to insert duplicate id values (%s)",
				dataToInsert.id
			);
			return null;
		}

		let insertLocation: Array<Node<T>>;
		let parent: Node<T> = nilNode;

		if (dataToInsert.parentId != null) {
			// insert child into existing parent node if it can be found
			const parentNode: Node<T> = this.find(dataToInsert.parentId);
			if (!parentNode) {
				log.warn(
					"Unknown parent id field given for insert location (noop)"
				);
				return null;
			}

			insertLocation = parentNode.children;
			parent = parentNode;
		} else {
			// Insert at the root level if no parent given
			insertLocation = this.root as Array<Node<T>>;
			parent = nilNode;
		}

		const newNode = this.createNode({
			...dataToInsert,
			parent,
			parentId: parent.id
		}) as GeneralTreeItem<T>;

		if (asFirstChild) {
			insertLocation.unshift(newNode);
		} else {
			insertLocation.push(newNode);
		}

		if (
			!this._last ||
			this.isIdInChildren(this._last.id, parent.children) ||
			parent.id === this._last.id ||
			insertLocation.length <= 1
		) {
			this._last = newNode;
		}

		this._first = this.root[0];
		this._length++;
		this._dirty = true;
		this.addToIndex(newNode);

		return newNode;
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
	 * Iterates through all of the nodes and concatenates them into a string.
	 * Only prints the relevant key information from the tree.  This also
	 * takes a callback function sent by the user to deal with the template
	 * data that may be part of the tree nodes.  The internals of the tree
	 * can't know the T value(s) while running.  This callback will
	 * receive a reference to the node being printed.  The caller can then
	 * use this to print the T values it passed into the tree.
	 * @param dynamicDataTCallback {ToStringCallback<T>} - a function that can
	 * process the tempate data T and return a string representation of it.
	 * @return {string} the string representing the keys and T data in the
	 * general tree.
	 */
	public toString(dynamicDataTCallback: ToStringCallback<T> = null): string {
		let s: string = "treeData:\n";

		for (const it of this.flatten()) {
			s += `id: ${it.id}, parentId: ${it.parentId}`;

			if (dynamicDataTCallback) {
				s += `, ${dynamicDataTCallback(it)}, `;
			}

			s += nl;
		}

		return s;
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

		this._dirty = false;
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

				self.addToIndex(childNode);

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

	/**
	 * An inorder iterator through the nodes of the general tree.
	 */
	public *[Symbol.iterator]() {
		for (const it of this.flatten()) {
			yield this.find(it.id);
		}
	}
}
