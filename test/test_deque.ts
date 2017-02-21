'use strict';

import {test} from 'ava';
import {Deque} from '../index';

test.cb('Create an emtpy Deque', (t: any) => {
	let dq = new Deque();

	t.true(dq && dq instanceof Deque);
	t.true(dq.isEmpty());
	t.true(dq.peekFront() === null);
	t.true(dq.peekBack() === null);
	t.true(dq.popFront() == null);
	t.true(dq.popBack() == null);
	t.end();
});

test.cb('Add/Remove items from the front of the deque', (t: any) => {
	let dq = new Deque();
	let n: number = 5;

	t.true(dq && dq instanceof Deque);
	t.true(dq.isEmpty());

	for (let i: number = 0; i < n; i++) {
		dq.pushFront(i);
	}

	t.is(dq.size(), 5);

	for (let i: number = n; i > 0; i--) {
		t.true(dq.length === i);
		t.true(dq.peekFront() === (i - 1));
		t.true(dq.popFront() === (i - 1));
	}

	t.true(dq.isEmpty());
	t.end();
});

test.cb('Add/Remove items from the back of the deque', (t: any) => {
	let dq = new Deque();
	let n: number = 5;

	t.true(dq && dq instanceof Deque);
	t.true(dq.isEmpty());

	for (let i: number = 0; i < n; i++) {
		dq.pushBack(i);
	}

	t.is(dq.size(), 5);

	for (let i: number = n; i > 0; i--) {
		t.true(dq.length === i);
		t.true(dq.peekBack() === (i - 1));
		t.true(dq.popBack() === (i - 1));
	}

	t.true(dq.isEmpty());
	t.end();
});

test.cb('Test deque add event (pushFront)', (t: any) => {
	let dq = new Deque();

	t.true(dq && dq instanceof Deque);
	t.true(dq.isEmpty());

	let n: number = 100;
	dq.on('add', (data: any) => {
		t.is(data, n);
		t.pass(data);
		t.end();
	});

	dq.pushFront(n);
});

test.cb('Test deque remove event (popFront)', (t: any) => {
	let dq = new Deque();

	t.true(dq && dq instanceof Deque);
	t.true(dq.isEmpty());

	let n: number = 100;
	dq.on('remove', (data: any) => {
		t.is(data, n);
		t.pass(data);
		t.end();
	});

	dq.pushFront(n);
	dq.popFront();
});

test.cb('Test deque add event (pushBack)', (t: any) => {
	let dq = new Deque();

	t.true(dq && dq instanceof Deque);
	t.true(dq.isEmpty());

	let n: number = 100;
	dq.on('add', (data: any) => {
		t.is(data, n);
		t.pass(data);
		t.end();
	});

	dq.pushBack(n);
});

test.cb('Test deque remove event (popBack)', (t: any) => {
	let dq = new Deque();

	t.true(dq && dq instanceof Deque);
	t.true(dq.isEmpty());

	let n: number = 100;
	dq.on('remove', (data: any) => {
		t.is(data, n);
		t.pass(data);
		t.end();
	});

	dq.pushBack(n);
	dq.popBack();
});

test.cb('Test size limited Deque', (t: any) => {
	let n: number = 5;
	let dq = new Deque(n);

	t.true(dq && dq instanceof Deque);
	t.true(dq.isEmpty());

	for (let i: number = 0; i < n; i++) {
		dq.enqueue(i);
	}

	t.is(dq.size(), n);
	dq.pushFront(n+1);
	t.is(dq.size(), n);

	let arr = dq.drain();
	t.is(arr[0], 6);
	t.is(arr[1], 1);
	t.is(arr[2], 2);
	t.is(arr[3], 3);
	t.is(arr[4], 4);

	t.true(dq.isEmpty());
	t.end();
});

test.cb('Test size limited Deque (pushFront) event', (t: any) => {
	let n: number = 5;
	let dq = new Deque(n);

	t.true(dq && dq instanceof Deque);
	t.true(dq.isEmpty());

	for (let i: number = 0; i < n; i++) {
		dq.enqueue(i);
	}

	t.is(dq.size(), n);

	dq.on('remove', (data: any) => {
		t.is(dq.size(), n-1);
		t.is(data, 0);
		t.pass(data);
		t.end();
	});

	dq.pushFront(n+1)
});

test.cb('Test size limited Deque (pushBack) event', (t: any) => {
	let n: number = 5;
	let dq = new Deque(n);

	t.true(dq && dq instanceof Deque);
	t.true(dq.isEmpty());

	for (let i: number = 0; i < n; i++) {
		dq.enqueue(i);
	}

	t.is(dq.size(), n);

	dq.on('remove', (data: any) => {
		t.is(dq.size(), n-1);
		t.is(data, 0);
		t.pass(data);
		t.end();
	});

	dq.pushBack(n+1)
});
