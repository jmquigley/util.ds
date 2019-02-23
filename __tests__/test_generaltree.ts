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
	field1: string;
	field2: number;
}

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
	const fixture = new Fixture("basic");
	expect(fixture).toBeDefined();
	expect(fixture.obj).toBeDefined();

	const gt: GeneralTree<TestTreeData> = new GeneralTree<TestTreeData>({
		treeData: fixture.jsonObj["treeData"],
		testing: true
	});

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

test("Test the walk function on a basic TreeItem fixture object", () => {
	const fixture = new Fixture("basic");
	expect(fixture).toBeDefined();
	expect(fixture.jsonObj).toBeDefined();

	const gt: GeneralTree<TestTreeData> = new GeneralTree<TestTreeData>({
		treeData: fixture.jsonObj["treeData"],
		testing: true
	});

	expect(gt).toBeDefined();

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
	const fixture = new Fixture("basic");
	expect(fixture).toBeDefined();
	expect(fixture.jsonObj).toBeDefined();

	const gt: GeneralTree<TestTreeData> = new GeneralTree<TestTreeData>({
		treeData: fixture.jsonObj["treeData"],
		testing: true
	});
	expect(gt).toBeDefined();
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
	gt.treeIndex = {};

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
	const comparator: Comparator<TestTreeData> = (
		o1: TestData,
		o2: TestData
	): number => {
		if (o1.field1 === o2.field1) {
			return 0;
		}

		return -1;
	};

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

// test the field search by field with multiple entries, one, and none
// test the parentId search by parent with multiple children, one, and none
// Test insert in front of the tree and validate .first
// Test insert at the end of the tree and validate .last
// Test arbitrary insert into the tree, validate the length
// Iterate through each item in the tree using a predictable set of data
// Flatten the tree into an Array
// Expand a flattened tree array back into the tree
