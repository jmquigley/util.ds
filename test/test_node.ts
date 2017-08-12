'use strict';

import test from 'ava';
import {Node} from '../index';

test('Test creation of a simple Node', t => {
	const node = new Node<string>('test');

	t.truthy(node);
	t.snapshot(node);
});

test('Test creation of a Node with right/left child', t => {
	const node = new Node<string>(
		'parent',
		new Node<string>('right child'),
		new Node<string>('left child')
	);

	t.truthy(node);
	t.snapshot(node);
});
