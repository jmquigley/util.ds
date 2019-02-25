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
		color: Color.red
	});

	expect(node).toBeDefined();
	expect(node.id).toBeDefined();
	expect(node.id).toBe(12345);
	expect(node.parentId).toBeDefined();
	expect(node.parentId).toBe(54321);
	expect(node.color).toBeDefined();
	expect(node.color).toBe(Color.red);
	expect(node.data).toBeDefined();
	expect(node.data).toBe("inner");
	expect(node.parent).toBeDefined();
	expect(node.parent.data).toBe("parent reference");
	expect(node.left).toBeDefined();
	expect(node.left.data).toBe("left child");
	expect(node.right).toBeDefined();
	expect(node.right.data).toBe("right child");

	node.clear();

	expect(node.id).toBeNull();
	expect(node.parentId).toBeNull();
	expect(node.color).toBe(Color.black);
	expect(node.data).toBeNull();
	expect(node.parent).toBeNull();
	expect(node.left).toBeNull();
	expect(node.right).toBeNull();
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
