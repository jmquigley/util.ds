'use strict';

import {Color, Node} from '../index';

test('Test creation of a simple Node', () => {
	const node = new Node<string>('test');

	expect(node).toBeDefined()
	expect(node).toMatchSnapshot();
});

test('Test creation of a Node with right/left child', () => {
	const node = new Node<string>(
		'inner',
		new Node<string>('right child'),
		new Node<string>('left child'),
		new Node<string>('parent reference'),
		Color.black
	);

	expect(node).toBeDefined()
	expect(node).toMatchSnapshot();
});

test('Test clearing a Node', () => {
	const node = new Node<string>(
		'inner',
		new Node<string>('right child'),
		new Node<string>('left child'),
		new Node<string>('parent reference'),
		Color.black
	);

	expect(node).toBeDefined()
	expect(node.color).toBeTruthy();
	expect(node.data).toBeTruthy();
	expect(node.parent).toBeTruthy();
	expect(node.left).toBeTruthy();
	expect(node.right).toBeTruthy();

	node.clear();

	expect(node.color).toBeFalsy();
	expect(node.data).toBeFalsy();
	expect(node.parent).toBeFalsy();
	expect(node.left).toBeFalsy();
	expect(node.right).toBeFalsy();
});
