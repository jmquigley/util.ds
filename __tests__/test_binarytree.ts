"use strict";

import * as fs from "fs-extra";
import {join} from "util.join";
import {BinaryTree, Comparator, Node} from "../index";

interface TestData {
	key?: string;
	data?: number;
}

function testNumberTree(size: number): BinaryTree<number> {
	const bt = new BinaryTree<number>();

	expect(bt).toBeDefined();
	expect(bt.root).toBe(bt.nil);

	for (let i = 0; i < size; i++) {
		bt.insert(i);
	}

	expect(bt.length).toBe(size);
	return bt;
}

test("Create a simple BinaryTree", () => {
	const bt = new BinaryTree<string>(["a", "a", "b", "b", "c", "d", "e"]);

	expect(bt).toBeDefined();
	expect(bt.size).toBe(5);
	expect(bt.first).toBe("a");
	expect(bt._minimum().data).toBe("a");
	expect(bt.last).toBe("e");
	expect(bt._maximum().data).toBe("e");
	expect(bt).toMatchSnapshot();

	bt.clear();

	expect(bt).toBeDefined();
	expect(bt.size).toBe(0);
	expect(bt.root).toBe(bt.nil);
	expect(bt.height).toBe(0);
	expect(bt.first).toBeNull();
	expect(bt.last).toBeNull();
});

test("Test BinaryTree inorder traversal", () => {
	const bt = new BinaryTree<string>(["g", "c", "a", "d", "k"]);

	expect(bt).toBeDefined();
	expect(bt.size).toBe(5);
	expect(bt.first).toBe("a");
	expect(bt.last).toBe("k");

	expect(bt.inorder).toEqual(["a", "c", "d", "g", "k"]);
});

test("Test BinaryTree inorder traversal with numbers", () => {
	const bt = new BinaryTree<number>([1, 2, 3, 4, 500, 1000]);

	expect(bt).toBeDefined();
	expect(bt.size).toBe(6);
	expect(bt.first).toBe(1);
	expect(bt.last).toBe(1000);

	expect(bt.inorder).toEqual([1, 2, 3, 4, 500, 1000]);
});

test("Test BinaryTree preorder traversal", () => {
	const bt = new BinaryTree<string>(["g", "c", "a", "d", "k"]);

	expect(bt).toBeDefined();
	expect(bt.size).toBe(5);
	expect(bt.first).toBe("a");
	expect(bt.last).toBe("k");

	expect(bt.preorder).toEqual(["c", "a", "g", "d", "k"]);
});

test("Test BinaryTree postorder traversal", () => {
	const bt = new BinaryTree<string>(["g", "c", "a", "d", "k"]);

	expect(bt).toBeDefined();
	expect(bt.size).toBe(5);
	expect(bt.first).toBe("a");
	expect(bt.last).toBe("k");

	expect(bt.postorder).toEqual(["a", "d", "k", "g", "c"]);
});

test("Test the BinaryTree breadth traversal", () => {
	const bt = new BinaryTree<string>(["g", "c", "a", "d", "k"]);

	expect(bt).toBeDefined();
	expect(bt.size).toBe(5);
	expect(bt.first).toBe("a");
	expect(bt.last).toBe("k");

	expect(bt.breadth).toEqual(["c", "a", "g", "d", "k"]);
});

test("Test BinaryTree insert event", (done) => {
	const bt = new BinaryTree<string>();

	expect(bt).toBeDefined();
	expect(bt.empty).toBe(true);

	bt.on("insert", (data: string) => {
		expect(data).toBe("a");
		expect(bt.size).toBe(1);
		expect(bt.first).toBe("a");
		expect(bt.last).toBe("a");
		done();
	});

	bt.insert("a");
});

test("Test left and right rotation", () => {
	const bt = new BinaryTree<string>();

	expect(bt).toBeDefined();

	//     C              G            C
	//    / \            / \          / \
	//   A   G    =>    C   K   =>   A   G
	//      / \        / \              / \
	//     D   K      A   D            D   K

	// rotate the typical tree to the left, and then rotate it again to
	// the right to convert it back to the original

	bt.insert("c");
	bt.insert("g");
	bt.insert("a");
	bt.insert("d");
	bt.insert("k");
	bt.insert(null);

	expect(bt.size).toBe(5);
	let out;

	out = bt.inorder;
	expect(out).toBeDefined();
	expect(out).toEqual(["a", "c", "d", "g", "k"]);

	expect(bt.root.data).toBe("c");
	expect(bt.root.left.data).toBe("a");
	expect(bt.root.right.data).toBe("g");
	expect(bt.root.right.left.data).toBe("d");
	expect(bt.root.right.right.data).toBe("k");

	bt._leftRotate(bt.root);

	expect(bt.root.data).toBe("g");
	expect(bt.root.left.data).toBe("c");
	expect(bt.root.right.data).toBe("k");
	expect(bt.root.left.left.data).toBe("a");
	expect(bt.root.left.right.data).toBe("d");

	out = bt.inorder;
	expect(out).toBeDefined();
	expect(out).toEqual(["a", "c", "d", "g", "k"]);

	expect(bt.root.data).toBe("g");
	expect(bt.root.left.data).toBe("c");
	expect(bt.root.right.data).toBe("k");
	expect(bt.root.left.left.data).toBe("a");
	expect(bt.root.left.right.data).toBe("d");

	bt._rightRotate(bt.root);

	expect(bt.root.data).toBe("c");
	expect(bt.root.left.data).toBe("a");
	expect(bt.root.right.data).toBe("g");
	expect(bt.root.right.left.data).toBe("d");
	expect(bt.root.right.right.data).toBe("k");

	out = bt.inorder;
	expect(out).toBeDefined();
	expect(out).toEqual(["a", "c", "d", "g", "k"]);
});

test("Create a large BinaryTree with numbers", () => {
	const size: number = 10000;
	const bt = testNumberTree(size);
	const out = bt.inorder;
	expect(out).toBeDefined();
	expect(out.length).toBe(size);

	for (let i = 0; i < size; i++) {
		expect(out[i]).toBe(i);
	}
});

test("Test using the BinaryTree in as an iterator", () => {
	let idx: number = 0;
	const bt = new BinaryTree<string>(["g", "c", "a", "d", "k"]);
	const results: string[] = ["a", "c", "d", "g", "k"];

	expect(bt).toBeDefined();
	expect(bt.inorder).toEqual(results);

	for (const val of bt) {
		expect(val).toBe(results[idx++]);
	}
});

test("Test using the BinaryTree iterator with an empty tree", () => {
	const bt = new BinaryTree<string>();

	expect(bt).toBeDefined();

	for (const val of bt) {
		throw new Error(`Should not have children in iterator: ${val}`);
	}
});

test("Test the contains method for the BinaryTree", () => {
	const size: number = 10000;
	const bt = testNumberTree(size);

	for (let i = 0; i < size; i++) {
		expect(bt.contains(i)).toBe(true);
		expect(bt.contains(i + size)).toBe(false);
	}

	expect(bt.contains(null)).toBe(false);
});

test("Test the breadth search for the BinaryTree", () => {
	const size: number = 100;
	const bt = testNumberTree(size);

	for (let i = 0; i < size; i++) {
		expect(bt.breadthSearch(i)).toBe(true);
		expect(bt.breadthSearch(i + size)).toBe(false);
	}

	expect(bt.breadthSearch(null)).toBe(false);
});

test("Test the minimum/maximum functions on an empty tree", () => {
	const bt = new BinaryTree<string>();

	expect(bt).toBeDefined();
	expect(bt._maximum()).toBe(bt.nil);
	expect(bt._minimum()).toBe(bt.nil);

	expect(bt._maximum(null)).toBe(bt.nil);
	expect(bt._minimum(null)).toBe(bt.nil);

	const node = new Node<string>("a", null, null, null);
	expect(node).toBeDefined();

	expect(bt._maximum(node)).toBe(node);
	expect(bt._minimum(node)).toBe(node);
});

test("Test with a large file word list in BinaryTree", () => {
	const bt = new BinaryTree<string>();
	const words = fs
		.readFileSync(
			join(process.cwd(), "__tests__", "data", "words.txt"),
			"utf-8"
		)
		.split(/\r?\n/);

	expect(bt).toBeDefined();
	expect(words).toBeDefined();

	for (const word of words) {
		bt.insert(word);
	}

	expect(bt.length).toBe(words.length);
	expect(bt.height).toBe(33);

	expect(bt.contains("abattoir")).toBe(true);
	expect(bt.contains("zoomimetic")).toBe(true);
	expect(bt.contains("jadelike")).toBe(true);
	expect(bt.contains("kingmaker")).toBe(true);
	expect(bt.contains("queak")).toBe(true);
	expect(bt.contains("alskdjglkajsdglkajdlkfjasldkjga")).toBe(false);
	expect(bt.contains("alskdjglkajsdglkfjasldkjga")).toBe(false);
	expect(bt.contains("alskdjglkajdlkfjasldkjga")).toBe(false);

	for (const word of words) {
		expect(bt.contains(word)).toBe(true);
		bt.remove(word);
	}

	expect(bt.length).toBe(0);
}, 30000); // 30 second timeout for test

test("Test the BinaryTree node successor function", () => {
	const bt = new BinaryTree<string>(["c", "g", "a", "d", "k"]);

	expect(bt.size).toBe(5);

	const out = bt.inorder;
	expect(out).toBeDefined();
	expect(out).toEqual(["a", "c", "d", "g", "k"]);

	let successor;

	// Case #1
	successor = bt._successor(bt.root.right); // 'g'
	expect(successor.data).toBe("k");

	// Case #2
	successor = bt._successor(bt.root.left); // 'a'
	expect(successor.data).toBe("c");

	// No successor
	successor = bt._successor(bt.root.right.right); // 'k'
	expect(successor.data).toBe(null);
});

test("Test the node search function for BinaryTree", () => {
	const data = ["g", "c", "a", "d", "k"];
	const bt = new BinaryTree<string>(data);

	expect(bt).toBeDefined();
	expect(bt.size).toBe(5);
	expect(bt.first).toBe("a");
	expect(bt.last).toBe("k");
	expect(bt.inorder).toEqual(["a", "c", "d", "g", "k"]);

	for (const val of data) {
		const node = bt._findNode(val);
		expect(node.data).toBe(val);
	}
});

test("Deletes a data element from the BinaryTree", () => {
	const bt = new BinaryTree<string>(["g", "c", "a", "d", "k"]);

	expect(bt).toBeDefined();
	expect(bt.size).toBe(5);
	expect(bt.inorder).toEqual(["a", "c", "d", "g", "k"]);

	bt.remove("g");
	expect(bt.inorder).toEqual(["a", "c", "d", "k"]);

	expect(bt.root.data).toBe("c");
	expect(bt.root.left.data).toBe("a");
	expect(bt.root.right.data).toBe("k");
	expect(bt.root.right.left.data).toBe("d");

	bt.remove("c");
	bt.remove(null);
	bt.remove("z");
	expect(bt.inorder).toEqual(["a", "d", "k"]);

	expect(bt.root.data).toBe("d");
	expect(bt.root.left.data).toBe("a");
	expect(bt.root.right.data).toBe("k");
});

test("Test remove event in BinaryTree", (done) => {
	const bt = new BinaryTree<string>(["a", "b", "c"]);

	expect(bt).toBeDefined();
	expect(bt.empty).toBe(false);
	expect(bt.size).toBe(3);

	bt.on("remove", (data: string) => {
		expect(data).toBe("b");
		expect(bt.size).toBe(2);
		expect(bt.inorder).toEqual(["a", "c"]);
		done();
	});

	bt.remove("b");
});

test("Performs a find against the BinaryTree with custom data structure", () => {
	const fn: Comparator<TestData> = (o1: TestData, o2: TestData): number => {
		if (o1.key === o2.key) {
			return 0;
		} else if (o1.key > o2.key) {
			return 1;
		}

		return -1;
	};

	const bt = new BinaryTree<TestData>(null, fn);

	expect(bt).toBeDefined();
	bt.insert({key: "g", data: 1});
	bt.insert({key: "c", data: 2});
	bt.insert({key: "a", data: 3});
	bt.insert({key: "d", data: 4});
	bt.insert({key: "k", data: 5});

	expect(bt.inorder).toEqual([
		{key: "a", data: 3},
		{key: "c", data: 2},
		{key: "d", data: 4},
		{key: "g", data: 1},
		{key: "k", data: 5}
	]);
	expect(bt.size).toBe(5);
	expect(bt.first.key).toBe("a");
	expect(bt.last.key).toBe("k");

	expect(bt.find({key: "g"}).data).toBe(1);
	expect(bt.find({key: "a"}).data).toBe(3);
	expect(bt.find({key: "k"}).data).toBe(5);

	expect(bt.find(null)).toBe(null);
	expect(bt.find({key: "alskdfalsdf"})).toBe(null);
});

test("Test the removeFirst function in BinaryTree", () => {
	const bt = new BinaryTree<string>(["g", "c", "a", "d", "k"]);

	expect(bt).toBeDefined();
	expect(bt.size).toBe(5);
	expect(bt.first).toBe("a");

	expect(bt.removeFirst()).toBe("a");

	expect(bt.first).toBe("c");
	expect(bt.size).toBe(4);
});

test("Test the removeLast function in BinaryTree", () => {
	const bt = new BinaryTree<string>(["g", "c", "a", "d", "k"]);

	expect(bt).toBeDefined();
	expect(bt.size).toBe(5);
	expect(bt.last).toBe("k");

	expect(bt.removeLast()).toBe("k");

	expect(bt.last).toBe("g");
	expect(bt.size).toBe(4);
});
