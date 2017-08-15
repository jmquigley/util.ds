'use strict';

import test from 'ava';
import {PriorityQueue} from '../index';

test('Create an empty PriorityQueue', t => {
	const pq = new PriorityQueue<string>();

	t.truthy(pq);
});
