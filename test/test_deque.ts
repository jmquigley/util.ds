'use strict';

import {test} from 'ava';
import {Deque} from '../index';
import {IComparator} from '../lib/collection';

interface ITestData {
	item1: string;
	item2: number;
}

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

test.cb('Test size limited Deque (front)', (t: any) => {
	let n: number = 5;
	let dq = new Deque(n);

	t.true(dq && dq instanceof Deque);
	t.true(dq.isEmpty());

	for (let i: number = 0; i < n; i++) {
		dq.enqueue(i);
	}

	t.is(dq.size(), n);
	dq.pushFront(n);
	t.is(dq.size(), n);

	let arr = dq.drain();
	t.is(arr[0], 5);
	t.is(arr[1], 1);
	t.is(arr[2], 2);
	t.is(arr[3], 3);
	t.is(arr[4], 4);

	t.true(dq.isEmpty());
	t.end();
});

test.cb('Test size limited Deque (back)', (t: any) => {
	let n: number = 5;
	let dq = new Deque(n);

	t.true(dq && dq instanceof Deque);
	t.true(dq.isEmpty());

	for (let i: number = 0; i < n; i++) {
		dq.enqueue(i);
	}

	t.is(dq.size(), n);
	dq.enqueue(n);
	t.is(dq.size(), n);

	let arr = dq.drain();
	t.is(arr[0], 1);
	t.is(arr[1], 2);
	t.is(arr[2], 3);
	t.is(arr[3], 4);
	t.is(arr[4], 5);

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

test.cb('Test the contains function on empty deque', (t: any) => {
	let dq = new Deque();

	t.true(dq && dq instanceof Deque);
	t.true(dq.isEmpty());
	t.false(dq.contains(999));
	t.end();
});

test.cb('Test the contains function for a deque', (t: any) => {
	let dq = new Deque();

	t.true(dq && dq instanceof Deque);
	t.true(dq.isEmpty());

	let n: number = 100;
	for (let i = 0; i < n; i++) {
		dq.enqueue(i);
	}

	t.true(dq.contains(1));
	t.true(dq.contains(10));
	t.false(dq.contains(999));

	t.end();
});

test.cb('Test of the deque contains function with custom comparator', (t: any) => {
	let fn: IComparator = function(o1: ITestData, o2: ITestData): number {
		if (o1.item1 === o2.item1 && o1.item2 === o2.item2) {
			return 0;
		} else if (o1.item1 > o2.item1 && o1.item2 > o2.item2) {
			return 1;
		}

		return -1;
	};

	let dq = new Deque(10, fn);

	t.true(dq && dq instanceof Deque);
	t.true(dq.isEmpty());

	dq.enqueue({item1: 'abc', item2: 0});
	dq.enqueue({item1: 'abc', item2: 1});
	dq.enqueue({item1: 'def', item2: 0});
	dq.enqueue({item1: 'ghi', item2: 0});
	dq.enqueue({item1: 'jkl', item2: 0});
	dq.enqueue({item1: 'mno', item2: 0});

	t.true(dq.contains({item1: 'abc', item2: 1}));
	t.true(dq.contains({item1: 'ghi', item2: 0}));
	t.true(dq.contains({item1: 'mno', item2: 0}));
	t.false(dq.contains({item1: 'cat', item2: 0}));
	t.false(dq.contains({item1: 'dog', item2: 0}));

	t.end();
});
