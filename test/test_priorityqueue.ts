'use strict';

import test from 'ava';
import {PriorityQueue} from '../index';

test('Create an empty PriorityQueue', t => {
	const pq = new PriorityQueue<string>();

	t.truthy(pq);

	pq.enqueue('a', 100);
	pq.enqueue('c', 100);
	pq.enqueue('b', 100);
	pq.enqueue('d', 100);

	t.is(pq.size, 4);
	t.deepEqual(pq.array, ['a', 'c', 'b', 'd']);

	t.is(pq.dequeue(), 'a');
	t.is(pq.dequeue(), 'c');

	t.is(pq.size, 2);
});

test('Test PriorityQueue with different data and priorities and prove order', t => {
	const pq = new PriorityQueue<string>();

	pq.enqueue('a', 100);
	pq.enqueue('b', -20);
	pq.enqueue('c', 10);
	pq.enqueue('d', 1000);
	pq.enqueue('e', 10);

	t.is(pq.first.data, 'b');
	t.is(pq.last.data, 'd');
	t.is(pq.size, 5);
	t.deepEqual(pq.array, ['b', 'c', 'e', 'a', 'd']);

	t.is(pq.dequeue(), 'b');
	t.is(pq.dequeue(), 'c');
	t.is(pq.dequeue(), 'e');

	t.is(pq.first.data, 'a');
	t.is(pq.last.data, 'd');
	t.is(pq.size, 2);

	pq.enqueue('f', 10);
	pq.enqueue('g', 2000);

	t.is(pq.first.data, 'f');
	t.is(pq.last.data, 'g');
	t.is(pq.size, 4);

	t.is(pq.dequeue(), 'f');
	t.is(pq.dequeue(), 'a');
	t.is(pq.dequeue(), 'd');
	t.is(pq.dequeue(), 'g');

	t.is(pq.size, 0);
	t.is(pq.first, null);
	t.is(pq.last, null);
	t.is(pq.dequeue(), null);
});

test.cb('Test the PriorityQueue drain method', t => {
	const pq = new PriorityQueue<string>();

	t.truthy(pq);

	pq.enqueue('a', 10);
	pq.enqueue('b', 20);
	pq.enqueue('c', 30);

	t.is(pq.size, 3);
	t.deepEqual(pq.array, ['a', 'b', 'c']);
	t.is(pq.first.data, 'a');
	t.is(pq.last.data, 'c');

	pq.on('drain', (arr: any) => {
		t.is(arr.length, 3);
		t.is(pq.size, 0);
		t.is(pq.first, null);
		t.is(pq.last, null);
		t.end();
	});

	pq.drain();
});

test.cb('Test the PriorityQueue insert event', t => {
	const pq = new PriorityQueue<string>();

	t.truthy(pq);
	t.is(pq.size, 0);

	pq.on('insert', (val: any) => {
		t.is(val.data, 'a');
		t.end();
	});

	pq.enqueue('a', 100);
});

test.cb('Test the PriorityQueue remove event', t => {
	const pq = new PriorityQueue<string>();

	t.truthy(pq);
	pq.enqueue('a', 100);
	t.is(pq.size, 1);

	pq.on('remove', (val: any) => {
		t.is(val.data, 'a');
		t.end();
	});

	t.is(pq.dequeue(), 'a');
});
