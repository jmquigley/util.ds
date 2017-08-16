'use strict';

import test from 'ava';
import {Color, Node} from '../index';

test('Test creation of a simple Node', t => {
	const node = new Node<string>('test');

	t.truthy(node);
	t.snapshot(node);
});

test('Test creation of a Node with right/left child', t => {
	const node = new Node<string>(
		'inner',
		new Node<string>('right child'),
		new Node<string>('left child'),
		new Node<string>('parent reference'),
		Color.black
	);

	t.truthy(node);
	t.snapshot(node);
});

test('Test clearing a Node', t => {
	const node = new Node<string>(
		'inner',
		new Node<string>('right child'),
		new Node<string>('left child'),
		new Node<string>('parent reference'),
		Color.black
	);

	t.truthy(node);
	t.truthy(node.color);
	t.truthy(node.data);
	t.truthy(node.parent);
	t.truthy(node.left);
	t.truthy(node.right);

	node.clear();

	t.falsy(node.color);
	t.falsy(node.data);
	t.falsy(node.parent);
	t.falsy(node.left);
	t.falsy(node.right);
});
