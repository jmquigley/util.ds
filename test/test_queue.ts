'use strict';

import test from 'ava';
import * as _ from 'lodash';
import {Queue} from '../index';

test('Create an empty queue', t => {
	const q = new Queue();

	t.true(q && q instanceof Queue);
	t.true(q.isEmpty());
	t.true(q.top() === null);
	t.true(q.front() === null);
	t.true(q.pop() === null);
});

test('Add/Remove items from the queue', t => {
	const q = new Queue();
	const n: number = 50;

	t.true(q && q instanceof Queue);
	t.true(q.isEmpty());

	for (let i: number = 0; i < n; i++) {
		(i % 2) ? q.enqueue(i) : q.push(i);
	}

	t.is(q.size(), n);

	for (let i: number = n; i > 0; i--) {
		t.true(q.length === i);
		t.true(((i % 2) ? q.front() : q.peek()) === (n - i));
		t.true(((i % 2) ? q.dequeue() : q.pop()) === (n - i));
	}

	t.true(q.isEmpty());
});

test('Test queue add event', t => {
	const q = new Queue();

	t.true(q && q instanceof Queue);
	t.true(q.isEmpty());

	const n: number = 100;
	q.on('add', (data: any) => {
		t.is(data, n);
	});

	q.enqueue(n);
});

test('Test queue remove event', t => {
	const q = new Queue();

	t.true(q && q instanceof Queue);
	t.true(q.isEmpty());

	const n: number = 100;
	q.on('remove', (data: any) => {
		t.is(data, n);
	});

	q.enqueue(n);
	q.dequeue();
});

test('Test the queue drain function', t => {
	const q = new Queue();
	const n: number = 5;

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
	const q = new Queue();

	t.true(q && q instanceof Queue);
	t.true(q.isEmpty());
	t.true(!q.contains(999));
});

test('Test the contains function for a queue', t => {
	const q = new Queue();

	t.true(q && q instanceof Queue);
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
	const q = new Queue();

	t.true(q && q instanceof Queue);
	t.true(q.isEmpty());
	q.eject(999);
	t.true(q.isEmpty());

	const n: number = 10;
	for (let i = 0; i < n; i++) {
		q.enqueue(i);
	}

	// Eject the front
	t.true(q.peek() === 0);
	q.eject(0);
	t.true(q.peek() === 1);
	t.true(q.end() === 9);
	t.is(q.length, 9);

	// Eject the end of the queue
	q.eject(9);
	t.true(q.peek() === 1);
	t.true(q.end() === 8);
	t.is(q.length, 8);

	// Eject from the middle of the queue
	q.eject(5);
	t.true(q.peek() === 1);
	t.true(q.end() === 8);
	t.is(q.length, 7);

	const arr: number[] = q.drain();
	t.is(arr.toString(), '1,2,3,4,6,7,8');
});
