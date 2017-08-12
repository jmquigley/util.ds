'use strict';

import test from 'ava';
import {BinaryTree} from '../index';

test('Create an emtpy BinaryTree', t => {
	const bt = new BinaryTree<string>();

	t.truthy(bt);
});
