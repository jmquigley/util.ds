'use strict';

import test from 'ava';
import * as _ from 'lodash';
import {Queue} from '../index';

test('Create an empty queue', t => {
	const q = new Queue<number>();

	t.truthy(q);
	t.true(q.isEmpty());
	t.true(q.empty);
	t.is(q.front, null);
	t.snapshot(q);
});

test('Add/Remove items from the queue', t => {
	const q = new Queue<number>();
	const n: number = 50;

	t.truthy(q);
	t.true(q.isEmpty());
	t.true(q.empty);

	for (let i: number = 0; i < n; i++) {
		(i % 2) ? q.enqueue(i) : q.push(i);
	}

	t.is(q.size, n);

	for (let i: number = n; i > 0; i--) {
		t.true(q.length === i);
		t.is(q.front, n - i);
		t.is(q.dequeue(), n - i);
	}

	t.true(q.empty);
});

test.cb('Test queue insert event', t => {
	const q = new Queue<number>();

	t.truthy(q);
	t.true(q.isEmpty());

	const n: number = 100;
	q.on('insert', (data: number) => {
		t.is(data, n);
		t.end();
	});

	q.enqueue(n);
});

test.cb('Test queue remove event', t => {
	const q = new Queue<number>();

	t.truthy(q);
	t.true(q.empty);

	const n: number = 100;
	q.on('remove', (data: number) => {
		t.is(data, n);
		t.end();
	});

	q.enqueue(n);
	q.dequeue();
});

test('Test the queue drain function', t => {
	const q = new Queue<number>();
	const n: number = 5;

	t.truthy(q);

	for (let i = 0; i < n; i++) {
		q.enqueue(i);
	}

	// Do the same thing a few times to show that once drained it still works
	// by returning an empty array.
	_.times(n, () => {
		const arr = q.drain();
		arr.forEach((val: number, idx: number) => {
			t.true(val === idx);
		});

		t.true(q.isEmpty());
		t.is(q.length, 0);
	});
});

test('Test the contains function with empty queue', t => {
	const q = new Queue<number>();

	t.truthy(q);
	t.true(q.isEmpty());
	t.true(!q.contains(999));
});

test('Test the contains function for a queue', t => {
	const q = new Queue<number>();

	t.truthy(q);
	t.true(q.isEmpty());

	const n: number = 100;
	for (let i = 0; i < n; i++) {
		q.enqueue(i);
	}

	t.true(q.contains(1));
	t.true(q.contains(10));
	t.true(!q.contains(999));
});

test('Ejects an item at the front, back, and middle of a queue', t => {
	const q = new Queue<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

	t.truthy(q);
	t.false(q.isEmpty());
	q.eject(999);
	t.false(q.isEmpty());

	// Eject the front
	t.is(q.front, 0);
	q.eject(0);
	t.is(q.front, 1);
	t.is(q.back, 9);
	t.is(q.length, 9);

	// Eject the end of the queue
	t.is(q.eject(9), 9);
	t.true(q.front === 1);
	t.true(q.back === 8);
	t.is(q.length, 8);

	// Eject from the middle of the queue
	q.eject(5);
	t.true(q.front === 1);
	t.true(q.back === 8);
	t.is(q.length, 7);

	const arr: number[] = q.drain();
	t.deepEqual(arr, [1, 2, 3, 4, 6, 7, 8]);
});
