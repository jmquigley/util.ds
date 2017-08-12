'use strict';

import test from 'ava';
import {Color, TreeNode} from '../index';

test('Test creation of a simple TreeNode', t => {
	const node = new TreeNode<string>('test');

	t.truthy(node);
	t.snapshot(node);
});

test('Test creation of a TreeNode with parent, right/left child', t => {
	const node = new TreeNode<string>(
		'inner',
		new TreeNode<string>('parent'),
		new TreeNode<string>('right child'),
		new TreeNode<string>('left child'),
		Color.black
	);

	t.truthy(node);
	t.snapshot(node);
});
