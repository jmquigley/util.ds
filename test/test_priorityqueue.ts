'use strict';

import test from 'ava';
import {PriorityQueue} from '../index';

test('Create an empty PriorityQueue', t => {
	const pq = new PriorityQueue<string>();

	t.truthy(pq);

	pq.enqueue('a', 100);
	pq.enqueue('b', 100);
	pq.enqueue('c', 100);
	pq.enqueue('d', 100);

	console.log(`output: ${JSON.stringify(pq.array)}`);

	console.log(`deq: ${pq.dequeue()}`);
	console.log(`output: ${JSON.stringify(pq.array)}`);

});
