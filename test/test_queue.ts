'use strict';

import {test} from 'ava';
import * as _ from 'lodash';
import {Queue} from '../index';

test.cb('Create an empty queue', (t: any) => {
	let q = new Queue();

	t.true(q && q instanceof Queue);
	t.true(q.isEmpty());
	t.true(q.top() === null);
	t.true(q.front() === null);
	t.true(q.pop() === null);
	t.end();
});

test.cb('Add/Remove items from the queue', (t: any) => {
	let q = new Queue();
	let n: number = 50;

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
	t.end();
});

test.cb('Test queue add event', (t: any) => {
	let q = new Queue();

	t.true(q && q instanceof Queue);
	t.true(q.isEmpty());

	let n: number = 100;
	q.on('add', (data: any) => {
		t.is(data, n);
		t.pass(data);
		t.end();
	});

	q.enqueue(n);
});

test.cb('Test queue remove event', (t: any) => {
	let q = new Queue();

	t.true(q && q instanceof Queue);
	t.true(q.isEmpty());

	let n: number = 100;
	q.on('remove', (data: any) => {
		t.is(data, n);
		t.pass(data);
		t.end();
	});

	q.enqueue(n);
	q.dequeue();
});

test.cb('Test the queue drain function', (t: any) => {
	let q = new Queue();
	let n: number = 5;

	for (let i = 0; i < n; i++) {
		q.enqueue(i);
	}

	// Do the same thing a few times to show that once drained it still works
	// by returning an empty array.
	_.times(n, () => {
		let arr = q.drain();
		arr.forEach((val: number, idx: number) => {
			t.true(val === idx);
		});

		t.true(q.isEmpty());
		t.is(q.length, 0);
	});

	t.end();
});
