'use strict';

import test from 'ava';
import * as fs from 'fs-extra';
import {join} from 'util.join';
import {BinaryTree, Comparator, Node} from '../index';

interface TestData {
	key?: string;
	data?: number;
}

function testNumberTree(size: number, t: any): BinaryTree<number> {
	const bt = new BinaryTree<number>();

	t.truthy(bt);
	t.is(bt.root, bt.nil);

	for (let i = 0; i < size; i++) {
		bt.insert(i);
	}

	t.is(bt.length, size);
	return bt;
}

test('Create a simple BinaryTree', t => {
	const bt = new BinaryTree<string>(['a', 'a', 'b', 'b', 'c', 'd', 'e']);

	t.truthy(bt);
	t.is(bt.size, 5);
	t.is(bt.first, 'a');
	t.is(bt._minimum().data, 'a');
	t.is(bt.last, 'e');
	t.is(bt._maximum().data, 'e');
	t.snapshot(bt);

	bt.clear();

	t.truthy(bt);
	t.is(bt.size, 0);
	t.is(bt.root, bt.nil);
	t.is(bt.height, 0);
});

test('Test BinaryTree inorder traversal', t => {
	const bt = new BinaryTree<string>(['g', 'c', 'a', 'd', 'k']);

	t.truthy(bt);
	t.is(bt.size, 5);
	t.is(bt.first, 'a');
	t.is(bt.last, 'k');

	t.deepEqual(bt.inorder, ['a', 'c', 'd', 'g', 'k']);
});

test('Test BinaryTree inorder traversal with numbers', t => {
	const bt = new BinaryTree<number>([1, 2, 3, 4, 500, 1000]);

	t.truthy(bt);
	t.is(bt.size, 6);
	t.is(bt.first, 1);
	t.is(bt.last, 1000);

	t.deepEqual(bt.inorder, [1, 2, 3, 4, 500, 1000]);
});

test('Test BinaryTree preorder traversal', t => {
	const bt = new BinaryTree<string>(['g', 'c', 'a', 'd', 'k']);

	t.truthy(bt);
	t.is(bt.size, 5);
	t.is(bt.first, 'a');
	t.is(bt.last, 'k');

	t.deepEqual(bt.preorder, ['c', 'a', 'g', 'd', 'k']);
});

test('Test BinaryTree postorder traversal', t => {
	const bt = new BinaryTree<string>(['g', 'c', 'a', 'd', 'k']);

	t.truthy(bt);
	t.is(bt.size, 5);
	t.is(bt.first, 'a');
	t.is(bt.last, 'k');

	t.deepEqual(bt.postorder, ['a', 'd', 'k', 'g', 'c']);
});

test('Test the BinaryTree breadth traversal', t => {
	const bt = new BinaryTree<string>(['g', 'c', 'a', 'd', 'k']);

	t.truthy(bt);
	t.is(bt.size, 5);
	t.is(bt.first, 'a');
	t.is(bt.last, 'k');

	t.deepEqual(bt.breadth, ['c', 'a', 'g', 'd', 'k']);
});

test.cb('Test BinaryTree insert event', t => {
	const bt = new BinaryTree<string>();

	t.truthy(bt);
	t.true(bt.empty);

	bt.on('insert', (data: string) => {
		t.is(data, 'a');
		t.is(bt.size, 1);
		t.is(bt.first, 'a');
		t.is(bt.last, 'a');
		t.end();
	});

	bt.insert('a');
});

test('Test left and right rotation', t => {
	const bt = new BinaryTree<string>();

	t.truthy(bt);

	//     C              G            C
	//    / \            / \          / \
	//   A   G    =>    C   K   =>   A   G
	//      / \        / \              / \
	//     D   K      A   D            D   K

	// rotate the typical tree to the left, and then rotate it again to
	// the right to convert it back to the original

	bt.insert('c');
	bt.insert('g');
	bt.insert('a');
	bt.insert('d');
	bt.insert('k');
	bt.insert(null);

	t.is(bt.size, 5);
	let out;

	out = bt.inorder;
	t.truthy(out);
	t.deepEqual(out, ['a', 'c', 'd', 'g', 'k']);

	t.is(bt.root.data, 'c');
	t.is(bt.root.left.data, 'a');
	t.is(bt.root.right.data, 'g');
	t.is(bt.root.right.left.data, 'd');
	t.is(bt.root.right.right.data, 'k');

	bt._leftRotate(bt.root);

	t.is(bt.root.data, 'g');
	t.is(bt.root.left.data, 'c');
	t.is(bt.root.right.data, 'k');
	t.is(bt.root.left.left.data, 'a');
	t.is(bt.root.left.right.data, 'd');

	out = bt.inorder;
	t.truthy(out);
	t.deepEqual(out, ['a', 'c', 'd', 'g', 'k']);

	t.is(bt.root.data, 'g');
	t.is(bt.root.left.data, 'c');
	t.is(bt.root.right.data, 'k');
	t.is(bt.root.left.left.data, 'a');
	t.is(bt.root.left.right.data, 'd');

	bt._rightRotate(bt.root);

	t.is(bt.root.data, 'c');
	t.is(bt.root.left.data, 'a');
	t.is(bt.root.right.data, 'g');
	t.is(bt.root.right.left.data, 'd');
	t.is(bt.root.right.right.data, 'k');

	out = bt.inorder;
	t.truthy(out);
	t.deepEqual(out, ['a', 'c', 'd', 'g', 'k']);
});

test('Create a large BinaryTree with numbers', t => {
	const size: number = 10000;
	const bt = testNumberTree(size, t);
	const out = bt.inorder;
	t.truthy(out);
	t.is(out.length, size);

	for (let i = 0; i < size; i++) {
		t.is(out[i], i);
	}
});

test('Test using the BinaryTree in as an iterator', t => {
	let idx: number = 0;
	const bt = new BinaryTree<string>(['g', 'c', 'a', 'd', 'k']);
	const results: string[] = ['a', 'c', 'd', 'g', 'k'];

	t.truthy(bt);
	t.deepEqual(bt.inorder, results);

	for (const val of bt) {
		t.is(val, results[idx++]);
	}
});

test('Test using the BinaryTree iterator with an empty tree', t => {
	const bt = new BinaryTree<string>();

	t.truthy(bt);

	for (const val of bt) {
		t.fail(`Should not have children in iterator: ${val}`);
	}
});

test('Test the contains method for the BinaryTree', t => {
	const size: number = 10000;
	const bt = testNumberTree(size, t);

	for (let i = 0; i < size; i++) {
		t.true(bt.contains(i));
		t.false(bt.contains(i + size));
	}

	t.false(bt.contains(null));
});

test('Test the breadth search for the BinaryTree', t => {
	const size: number = 100;
	const bt = testNumberTree(size, t);

	for (let i = 0; i < size; i++) {
		t.true(bt.breadthSearch(i));
		t.false(bt.breadthSearch(i + size));
	}

	t.false(bt.breadthSearch(null));
});

test('Test the minimum/maximum functions on an empty tree', t => {
	const bt = new BinaryTree<string>();

	t.truthy(bt);
	t.is(bt._maximum(), bt.nil);
	t.is(bt._minimum(), bt.nil);

	t.is(bt._maximum(null), bt.nil);
	t.is(bt._minimum(null), bt.nil);

	const node = new Node<string>('a', null, null, null);
	t.truthy(node);

	t.is(bt._maximum(node), node);
	t.is(bt._minimum(node), node);

});

test('Test with a large file word list in BinaryTree', t => {
	const bt = new BinaryTree<string>();
	const words = fs.readFileSync(join(process.cwd(), 'test', 'data', 'words.txt'), 'utf-8').split(/\r?\n/);

	t.truthy(bt);
	t.truthy(words);

	for (const word of words) {
		bt.insert(word);
	}

	t.is(bt.length, words.length);
	t.is(bt.height, 33);

	t.true(bt.contains('abattoir'));
	t.true(bt.contains('zoomimetic'));
	t.true(bt.contains('jadelike'));
	t.true(bt.contains('kingmaker'));
	t.true(bt.contains('queak'));
	t.false(bt.contains('alskdjglkajsdglkajdlkfjasldkjga'));
	t.false(bt.contains('alskdjglkajsdglkfjasldkjga'));
	t.false(bt.contains('alskdjglkajdlkfjasldkjga'));

	for (const word of words) {
		t.true(bt.contains(word));
		bt.remove(word);
	}

	t.is(bt.length, 0);
});

test('Test the BinaryTree node successor function', t => {
	const bt = new BinaryTree<string>(['c', 'g', 'a', 'd', 'k']);

	t.is(bt.size, 5);

	const out = bt.inorder;
	t.truthy(out);
	t.deepEqual(out, ['a', 'c', 'd', 'g', 'k']);

	let successor;

	// Case #1
	successor = bt._successor(bt.root.right); // 'g'
	t.is(successor.data, 'k');

	// Case #2
	successor = bt._successor(bt.root.left); // 'a'
	t.is(successor.data, 'c');

	// No successor
	successor = bt._successor(bt.root.right.right); // 'k'
	t.is(successor.data, null);
});

test('Test the node search function for BinaryTree', t => {
	const data = ['g', 'c', 'a', 'd', 'k'];
	const bt = new BinaryTree<string>(data);

	t.truthy(bt);
	t.is(bt.size, 5);
	t.is(bt.first, 'a');
	t.is(bt.last, 'k');
	t.deepEqual(bt.inorder, ['a', 'c', 'd', 'g', 'k']);

	for (const val of data) {
		const node = bt._findNode(val);
		t.is(node.data, val);
	}
});

test('Deletes a data element from the BinaryTree', t => {
	const bt = new BinaryTree<string>(['g', 'c', 'a', 'd', 'k']);

	t.truthy(bt);
	t.is(bt.size, 5);
	t.deepEqual(bt.inorder, ['a', 'c', 'd', 'g', 'k']);

	bt.remove('g');
	t.deepEqual(bt.inorder, ['a', 'c', 'd', 'k']);

	t.is(bt.root.data, 'c');
	t.is(bt.root.left.data, 'a');
	t.is(bt.root.right.data, 'k');
	t.is(bt.root.right.left.data, 'd');

	bt.remove('c');
	bt.remove(null);
	bt.remove('z');
	t.deepEqual(bt.inorder, ['a', 'd', 'k']);

	t.is(bt.root.data, 'd');
	t.is(bt.root.left.data, 'a');
	t.is(bt.root.right.data, 'k');
});

test.cb('Test remove event in BinaryTree', t => {
	const bt = new BinaryTree<string>(['a', 'b', 'c']);

	t.truthy(bt);
	t.false(bt.empty);
	t.is(bt.size, 3);

	bt.on('remove', (data: string) => {
		t.is(data, 'b');
		t.is(bt.size, 2);
		t.deepEqual(bt.inorder, ['a', 'c']);
		t.end();
	});

	bt.remove('b');
});

test('Performs a find against the BinaryTree with custom data structure', t => {
	const fn: Comparator<TestData> = (o1: TestData, o2: TestData): number => {
		if (o1.key === o2.key) {
			return 0;
		} else if (o1.key > o2.key) {
			return 1;
		}

		return -1;
	};

	const bt = new BinaryTree<TestData>(null, fn);

	t.truthy(bt);
	bt.insert({key: 'g', data: 1});
	bt.insert({key: 'c', data: 2});
	bt.insert({key: 'a', data: 3});
	bt.insert({key: 'd', data: 4});
	bt.insert({key: 'k', data: 5});

	t.deepEqual(bt.inorder, [
		{key: 'a', data: 3},
		{key: 'c', data: 2},
		{key: 'd', data: 4},
		{key: 'g', data: 1},
		{key: 'k', data: 5}
	]);
	t.is(bt.size, 5);

	t.is(bt.find({key: 'g'}).data, 1);
	t.is(bt.find({key: 'a'}).data, 3);
	t.is(bt.find({key: 'k'}).data, 5);

	t.is(bt.find(null), null);
	t.is(bt.find({key: 'alskdfalsdf'}), null);
});

test('Test the removeFirst function in BinaryTree', t => {
	const bt = new BinaryTree<string>(['g', 'c', 'a', 'd', 'k']);

	t.truthy(bt);
	t.is(bt.size, 5);
	t.is(bt.first, 'a');

	t.is(bt.removeFirst(), 'a');

	t.is(bt.first, 'c');
	t.is(bt.size, 4);
});

test('Test the removeLast function in BinaryTree', t => {
	const bt = new BinaryTree<string>(['g', 'c', 'a', 'd', 'k']);

	t.truthy(bt);
	t.is(bt.size, 5);
	t.is(bt.last, 'k');

	t.is(bt.removeLast(), 'k');

	t.is(bt.last, 'g');
	t.is(bt.size, 4);
});
