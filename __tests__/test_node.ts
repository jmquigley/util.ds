"use strict";

import {Color, Node} from "../index";

test("Creation of an empty/null node", () => {
	const node = new Node<string>();

	expect(node).toBeDefined();
	expect(node).toMatchSnapshot();
});

test("Test creation of a simple Node", () => {
	const node = new Node<string>({data: "test"});

	expect(node).toBeDefined();
	expect(node).toMatchSnapshot();
});

test("Test creation of a Node with right/left child", () => {
	const node = new Node<string>({
		data: "inner",
		right: new Node<string>({data: "right child"}),
		left: new Node<string>({data: "left child"}),
		parent: new Node<string>({data: "parent reference"}),
		color: Color.black
	});

	expect(node).toBeDefined();
	expect(node).toMatchSnapshot();
});

test("Test clearing a Node", () => {
	const node = new Node<string>({
		id: 12345,
		parentId: 54321,
		data: "inner",
		right: new Node<string>({data: "right child"}),
		left: new Node<string>({data: "left child"}),
		parent: new Node<string>({data: "parent reference"}),
		color: Color.black
	});

	expect(node).toBeDefined();
	expect(node.id).toBeTruthy();
	expect(node.id).toBe(12345);
	expect(node.parentId).toBeTruthy();
	expect(node.parentId).toBe(54321);
	expect(node.color).toBeTruthy();
	expect(node.data).toBeTruthy();
	expect(node.data).toBe("inner");
	expect(node.parent).toBeTruthy();
	expect(node.parent.data).toBe("parent reference");
	expect(node.left).toBeTruthy();
	expect(node.left.data).toBe("left child");
	expect(node.right).toBeTruthy();
	expect(node.right.data).toBe("right child");

	node.clear();

	expect(node.color).toBe(Color.red);
	expect(node.data).toBeFalsy();
	expect(node.parent).toBeFalsy();
	expect(node.left).toBeFalsy();
	expect(node.right).toBeFalsy();
});

test("Set node elements after creation", () => {
	const node = new Node<string>({
		id: 12345,
		data: "inner",
		right: new Node<string>({data: "right child"}),
		left: new Node<string>({data: "left child"}),
		parent: new Node<string>({data: "parent reference"}),
		color: Color.black
	});

	expect(node).toBeDefined();
	expect(node).toMatchSnapshot();

	node.data = "changed inner";
	node.id = 98765;
	node.parentId = 8675309;
	node.color = Color.red;

	expect(node).toMatchSnapshot();
});
