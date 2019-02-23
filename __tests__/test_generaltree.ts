"use strict";

import logger from "util.log";
import {Fixture} from "util.fixture";
import {GeneralTree} from "../index";

const log = logger.instance({
	debug: process.env.NODE_ENV !== "production",
	namespace: "GeneralTree.test",
	nofile: true
});

interface TestTreeData {
	field1: string;
	field2: number;
}

test("Create a basic GeneralTree", () => {
	const fixture = new Fixture("basic");

	const gt: GeneralTree<TestTreeData> = new GeneralTree<TestTreeData>({
		treeData: fixture.jsonObj["treeData"],
		testing: true
	});

	expect(gt).toBeDefined();
	expect(gt.treeData).toBeDefined();
	expect(gt.length).toBe(12);
	expect(gt.first.id).toBe(0);
	expect(gt.first.field1).toBe("1.0");
	expect(gt.last.id).toBe(11);
	expect(gt.last.field1).toBe("3.3");
});

// Test the walk function
// Test for an empty tree
// test general find with element in and not in the tree
// test the field search by field with multiple entries, one, and none
// test the parentId search by parent with multiple children, one, and none
// Test insert in front of the tree and validate .first
// Test insert at the end of the tree and validate .last
// Test arbitrary insert into the tree, validate the length
// Iterate through each item in the tree using a predictable set of data
// Flatten the tree into an Array
// Expand a flattened tree array back into the tree
