"use strict";

import logger from "util.log";
import {Fixture} from "util.fixture";
import {Comparator, GeneralTree, GeneralTreeItem} from "../index";

const log = logger.instance({
	debug: process.env.NODE_ENV !== "production",
	namespace: "GeneralTree.test",
	nofile: true
});

interface TestTreeData {
	field1?: string;
	field2?: number;
}

const comparator: Comparator<TestTreeData> = (
	o1: TestData,
	o2: TestData
): number => {
	if (o1.field1 === o2.field1) {
		return 0;
	}

	return -1;
};

function getBasicTree() {
	const fixture = new Fixture("basic");
	expect(fixture).toBeDefined();
	expect(fixture.obj).toBeDefined();

	const gt: GeneralTree<TestTreeData> = new GeneralTree<TestTreeData>({
		treeData: fixture.jsonObj["treeData"],
		testing: true
	});

	expect(gt).toBeDefined();
	expect(gt.dirty).toBe(false);
	expect(gt.length).toBe(12);
	expect(gt.root).toBeDefined();
	expect(gt.root.length).toBe(3);

	return gt;
}

function testDataToString(it: GeneralTreeItem<TestTreeData>): string {
	return `field1: ${it.field1}, field2: ${it.field2}`;
}

test("Create a new, empty GeneralTreeItem node", () => {
	const gt: GeneralTree<TestTreeData> = new GeneralTree<TestTreeData>({
		testing: true
	});

	const node: GeneralTreeItem<TestTreeData> = gt.createNode({
		id: 12345,
		parentId: 98765,
		field1: "field1",
		field2: "field2"
	});

	expect(node).toBeDefined();
	expect(node).toHaveProperty("id");
	expect(node).toHaveProperty("parentId");
	expect(node).toHaveProperty("parent");
	expect(node).toHaveProperty("children");
	expect(node).toHaveProperty("field1");
	expect(node).toHaveProperty("field2");
	expect(node).toMatchSnapshot();
});

test("Create an empty tree structure", () => {
	const gt: GeneralTree<TestTreeData> = new GeneralTree<TestTreeData>({
		testing: true
	});

	expect(gt).toBeDefined();
	expect(gt.treeData).toBeDefined();
	expect(gt.root).toBeDefined();
	expect(gt.length).toBe(0);
	expect(gt.height).toBe(0);
	expect(gt.first).toBeNull();
	expect(gt.last).toBeNull();
});

test("Create a basic GeneralTree", () => {
	const gt: GeneralTree<TestTreeData> = getBasicTree();

	expect(gt).toBeDefined();
	expect(gt.treeData).toBeDefined();
	expect(gt.root).toBeDefined();
	expect(gt.length).toBe(12);
	expect(gt.height).toBe(2);
	expect(gt.first).toBeDefined();
	expect(gt.first.id).toBe(0);
	expect(gt.first.field1).toBe("1.0");
	expect(gt.last).toBeDefined();
	expect(gt.last.id).toBe(11);
	expect(gt.last.field1).toBe("3.3");

	gt.clear();

	expect(gt).toBeDefined();
	expect(gt.size).toBe(0);
	expect(gt.root instanceof Array).toBe(true);
	expect(gt.height).toBe(0);
});

test("Test the walk function on a basic GeneralTreeItem fixture object", () => {
	const gt: GeneralTree<TestTreeData> = getBasicTree();

	// Walk through the tree.  Concatenate the title values together
	// to create a string that can be compared for ordering
	let out: string = "";
	gt.walk((it: GeneralTreeItem) => {
		out += `${it.field1} `;
	}, false);
	out = out.trim();

	expect(out).toBeDefined();
	expect(out).toBe("1.0 1.1 1.2 1.3 2.0 2.1 2.2 2.3 3.0 3.1 3.2 3.3");
});

test("Call walk function with bad callback", () => {
	const gt: GeneralTree<TestTreeData> = getBasicTree();

	expect(gt.treeData).toBeDefined();
	gt.walk(null);
	expect(gt.treeData).toBeDefined();
});

test("Call walk function with null treeData", () => {
	const gt: GeneralTree<TestTreeData> = new GeneralTree<TestTreeData>({
		testing: true
	});

	expect(gt).toBeDefined();
	expect(gt.treeData).toBeDefined();
	expect(gt.treeData.length).toBe(0);

	const mock = jest.fn((it: GeneralTreeItem) => {});
	gt.walk(mock);
	expect(mock).not.toHaveBeenCalled();
});

test("Test the walk function with deep nesting", () => {
	const fixture = new Fixture("deep");
	expect(fixture).toBeDefined();
	expect(fixture.jsonObj).toBeDefined();

	const gt: GeneralTree<TestTreeData> = new GeneralTree<TestTreeData>({
		treeData: fixture.jsonObj["treeData"],
		testing: true
	});

	expect(gt).toBeDefined();
	const mockFn = jest.fn();
	gt.walk(mockFn);

	expect(mockFn).toHaveBeenCalled();
	expect(gt.length).toBe(17);
	expect(mockFn).toHaveBeenCalledTimes(17);
	expect(gt.last).toBeDefined();
	expect(gt.last.field1).toBe("1.16");
});

test("Test the walk function with a large amount of data", () => {
	const fixture = new Fixture("large");
	expect(fixture).toBeDefined();
	expect(fixture.jsonObj).toBeDefined();

	const gt: GeneralTree<TestTreeData> = new GeneralTree<TestTreeData>({
		treeData: fixture.jsonObj["treeData"],
		testing: true
	});

	expect(gt).toBeDefined();
	const mockFn = jest.fn();
	gt.walk(mockFn);

	expect(mockFn).toHaveBeenCalled();
	expect(gt.length).toBe(4320);
	expect(mockFn).toHaveBeenCalledTimes(4320);
	expect(gt.last).toBeDefined();
	expect(gt.last.field1).toBe("4320.0");
});

test("Test searching for an id within the tree", () => {
	const fixture = new Fixture("search");
	expect(fixture).toBeDefined();
	expect(fixture.jsonObj).toBeDefined();

	const gt: GeneralTree<TestTreeData> = new GeneralTree<TestTreeData>({
		treeData: fixture.jsonObj["treeData"],
		testing: true
	});
	expect(gt).toBeDefined();
	gt._treeIndex = {};

	// Parent item from tree, found
	expect("4" in gt.treeIndex).not.toBe(true);
	let it: GeneralTreeItem = gt.find(4);

	expect(it).toBeDefined();
	expect(it.field1).toBe("2.0");
	expect(it.children.length).toBe(3);
	expect(it.parent.id).toBeNull();

	// Search for child in tree, found
	it = gt.find(9);
	expect(it).toBeDefined();
	expect(it.field1).toBe("3.1");
	expect(it.children.length).toBe(0);
	expect(it.parent.id).toBe(8);

	// Item should not be found in the tree
	it = gt.find(127);
	expect(it).toBeNull();

	// Call previous id value to show that it uses the index
	expect("4" in gt.treeIndex).toBe(true);
	it = gt.find(4);
	expect(it).toBeDefined();
	expect(it.field1).toBe("2.0");
	expect(it.children.length).toBe(3);
	expect(it.parent.id).toBeNull();
});

test("Test using the current GeneralTreeData index to find values", () => {
	const fixture = new Fixture("search");
	expect(fixture).toBeDefined();
	expect(fixture.jsonObj).toBeDefined();

	const gt: GeneralTree<TestTreeData> = new GeneralTree<TestTreeData>({
		treeData: fixture.jsonObj["treeData"],
		testing: true
	});
	expect(gt).toBeDefined();
	expect(gt.treeIndex).toBeDefined();
	expect(gt.treeIndex[0].field1).toBe("1.0");
	expect(gt.treeIndex[3].field1).toBe("1.3");
	expect(gt.treeIndex[9].field1).toBe("3.1");
});

test("Test turning off GeneralTreeData index and showing a value is not in it", () => {
	const fixture = new Fixture("search");
	expect(fixture).toBeDefined();
	expect(fixture.obj).toBeDefined();

	const gt: GeneralTree<TestTreeData> = new GeneralTree<TestTreeData>({
		treeData: fixture.jsonObj["treeData"],
		testing: true,
		sequence: 0,
		useindex: false, // turn off indexing
		usesanitize: true
	});

	expect(gt).toBeDefined();
	expect(gt.treeIndex).toBeDefined();
	expect(gt.treeIndex).not.toContain(0);
	expect(gt.treeIndex).not.toContain(3);
	expect(gt.treeIndex).not.toContain(9);
});

test("Use the field search to find multiple items in the tree using a comparator", () => {
	const fixture = new Fixture("search");
	expect(fixture).toBeDefined();
	expect(fixture.obj).toBeDefined();

	const gt: GeneralTree<TestTreeData> = new GeneralTree<TestTreeData>(
		{
			treeData: fixture.jsonObj["treeData"],
			testing: true
		},
		comparator
	);

	expect(gt).toBeDefined();
	let foundItems: GeneralTreeItem[] = gt.findByField({
		field1: "3.0"
	});

	expect(foundItems).toBeDefined();
	expect(foundItems.length).toBe(2);
	expect(foundItems[0].field2).toBe(1);
	expect(foundItems[1].field2).toBe(2);

	// search for items not in the tree to show empty array
	foundItems = gt.findByField({
		field1: "foo bar"
	});

	expect(foundItems).toBeDefined();
	expect(foundItems.length).toBe(0);
});

test("Use the parent id to search for nodes", () => {
	const fixture = new Fixture("search");
	expect(fixture).toBeDefined();
	expect(fixture.obj).toBeDefined();

	const gt: GeneralTree<TestTreeData> = new GeneralTree<TestTreeData>({
		treeData: fixture.jsonObj["treeData"],
		testing: true
	});

	expect(gt).toBeDefined();

	let foundItems: GeneralTreeItem[] = gt.findByParent(4);
	expect(foundItems).toBeDefined();
	expect(foundItems.length).toBe(3);
	expect(foundItems[0].field1).toBe("2.1");
	expect(foundItems[1].field1).toBe("2.2");
	expect(foundItems[2].field1).toBe("2.3");

	// search for items not in the tree
	foundItems = gt.findByParent(9999);

	expect(foundItems).toBeDefined();
	expect(foundItems.length).toBe(0);
});

test("Check if a field is found within the tree", () => {
	const fixture = new Fixture("search");
	expect(fixture).toBeDefined();
	expect(fixture.obj).toBeDefined();

	const gt: GeneralTree<TestTreeData> = new GeneralTree<TestTreeData>(
		{
			treeData: fixture.jsonObj["treeData"],
			testing: true
		},
		comparator
	);

	expect(gt).toBeDefined();

	expect(gt.contains({field1: "3.0"})).toBe(true);
	expect(gt.contains({field1: "99.99"})).toBe(false);
});

test("Flatten a tree into a 1D array and the re-expand it", () => {
	const gt: GeneralTree<TestTreeData> = getBasicTree();
	const arr = gt.flatten();

	expect(arr).toBeDefined();
	expect(arr.length).toBe(12);
	expect(arr).toMatchSnapshot();

	gt.clear();
	expect(gt.length).toBe(0);

	gt.expand(arr);
	expect(gt.length).toBe(12);
	expect(gt).toMatchSnapshot();
});

test("Insert into an empty tree", () => {
	const gt: GeneralTree<TestTreeData> = new GeneralTree<TestTreeData>({
		testing: true
	});

	expect(gt).toBeDefined();
	expect(gt.length).toBe(0);
	expect(gt.root).toBeDefined();
	expect(gt.root.length).toBe(0);

	gt.insert({
		field1: "newNode::field1",
		field2: "newNode::field2"
	});

	// log.debug("%s", gt.toString(testDataToString));

	expect(gt.length).toBe(1);
	expect(gt.first).toBeDefined();
	expect(gt.first.id).toBe(0);
	expect(gt.last).toBeDefined();
	expect(gt.last.id).toBe(0);
});

test("Insert a new item into the root of an existing tree", () => {
	const gt: GeneralTree<TestTreeData> = getBasicTree();

	gt.insert({
		field1: "newNode::field1",
		field2: "newNode::field2"
	});

	// log.debug(gt.toString(testDataToString));

	expect(gt.first).toBe(gt.root[0]);
	expect(gt.root.length).toBe(4);
	expect(gt.length).toBe(13);
	expect(gt.first.field1).toBe("newNode::field1");
	expect(gt.first.field2).toBe("newNode::field2");
	expect(gt).toMatchSnapshot();
});

test("Insert into an arbitrary location within the tree", () => {
	const gt: GeneralTree<TestTreeData> = getBasicTree();

	// insert into the first parent in the tree
	const node = gt.insert({
		parentId: 0,
		field1: "newNode::field1",
		field2: "newNode::field2"
	});

	expect(gt.first).toBe(gt.root[0]);
	expect(gt.root.length).toBe(3);
	expect(gt.length).toBe(13);
	expect(node.parent.id).toBe(0);
	expect(node.parent.children.length).toBe(4);
	expect(node.field1).toBe("newNode::field1");
	expect(node.field2).toBe("newNode::field2");
});

test("Insert a new item as the last item in the last parent in the tree", () => {
	const gt: GeneralTree<TestTreeData> = getBasicTree();

	// insert into the first parent in the tree
	const node = gt.insert(
		{
			parentId: 8,
			field1: "newNode::field1",
			field2: "newNode::field2"
		},
		false
	);

	expect(gt.first).toBe(gt.root[0]);
	expect(gt.root.length).toBe(3);
	expect(gt.length).toBe(13);
	expect(node.parent.id).toBe(8);
	expect(gt.last).toBe(node);
	expect(node.field1).toBe("newNode::field1");
	expect(node.field2).toBe("newNode::field2");
});

test("Insert new item into the last item in the tree (make last a new parent)", () => {
	const gt: GeneralTree<TestTreeData> = getBasicTree();
	const node = gt.insert(
		{
			parentId: 11,
			field1: "newNode::field1",
			field2: "newNode::field2"
		},
		false
	);

	expect(gt.first).toBe(gt.root[0]);
	expect(gt.root.length).toBe(3);
	expect(gt.length).toBe(13);
	expect(node.parent.id).toBe(11);
	expect(gt.last).toBe(node);
	expect(node.field1).toBe("newNode::field1");
	expect(node.field2).toBe("newNode::field2");
});

test("Attempt to insert a bad node config into the tree", () => {
	const gt: GeneralTree<TestTreeData> = getBasicTree();
	const node = gt.insert(null);

	expect(node).toBeNull();
	expect(gt.length).toBe(12);
	expect(gt.root).toBeDefined();
	expect(gt.root.length).toBe(3);
});

test("Attempt to insert a duplicate id value with validation turned on", () => {
	const gt: GeneralTree<TestTreeData> = getBasicTree();
	const node = gt.insert(
		{
			id: 0,
			field1: "newNode::field1",
			field2: "newNode::field2"
		},
		false,
		true
	);

	expect(node).toBeNull();
	expect(gt.length).toBe(12);
	expect(gt.root).toBeDefined();
	expect(gt.root.length).toBe(3);
});

test("Insert into a nonexistant parent", () => {
	const gt: GeneralTree<TestTreeData> = getBasicTree();
	const node = gt.insert({
		parentId: 9999,
		field1: "newNode::field1",
		field2: "newNode::field2"
	});

	expect(node).toBeNull();
	expect(gt.length).toBe(12);
	expect(gt.root).toBeDefined();
	expect(gt.root.length).toBe(3);
});

test("Iterate through the basic tree", () => {
	const gt: GeneralTree<TestTreeData> = getBasicTree();
	let out: string = "";

	for (const node of gt) {
		expect(node).toBeDefined();
		out += `${node.field1} `;
	}
	out = out.trim();

	expect(out).toBeDefined();
	expect(out).toBe("1.0 1.1 1.2 1.3 2.0 2.1 2.2 2.3 3.0 3.1 3.2 3.3");
});

test("Delete a node from the tree", () => {
	const gt: GeneralTree<TestTreeData> = getBasicTree();

	// remove id 1, whose parent is 0
	const parent = gt.find(0);
	expect(parent.children.length).toBe(3);

	gt.remove(1);

	expect(gt.length).toBe(11);
	expect(gt.find(1)).toBeNull();
	expect(parent.children.length).toBe(2);
});

test("Delete a node from the tree where it has children", () => {
	const gt: GeneralTree<TestTreeData> = getBasicTree();

	// remove id 1, whose parent is 0
	const root = gt.root;
	expect(gt.length).toBe(12);
	expect(root.length).toBe(3);

	gt.remove(0);

	expect(root.length).toBe(2);
	expect(gt.length).toBe(8); // parent and children deleted
});

test("Delete a node form the tree whre it has children, but that delete is not allowed", () => {
	const gt: GeneralTree<TestTreeData> = getBasicTree();

	// remove id 1, whose parent is 0
	const root = gt.root;
	expect(gt.length).toBe(12);
	expect(root.length).toBe(3);

	gt.remove(0, true);

	expect(root.length).toBe(3);
	expect(gt.length).toBe(12); // parent and children preserved

	// delete all of the children, then the parent
	gt.remove(1, true);
	expect(gt.length).toBe(11);

	gt.remove(2, true);
	expect(gt.length).toBe(10);

	gt.remove(3, true);
	expect(gt.length).toBe(9);

	gt.remove(0, true);
	expect(gt.length).toBe(8);
	expect(root.length).toBe(2);
});

test("Try to delete a node from the tree with an invalid id", () => {
	const gt: GeneralTree<TestTreeData> = getBasicTree();

	log.debug("%s", gt.toString(testDataToString));

	// remove id 1, whose parent is 0
	const root = gt.root;
	expect(gt.length).toBe(12);
	expect(root.length).toBe(3);

	gt.remove(999);

	expect(root.length).toBe(3);
	expect(gt.length).toBe(12); // parent and children preserved
});
