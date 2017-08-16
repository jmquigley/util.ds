'use strict';

import test from 'ava';
import {Deque} from '../index';
import {Comparator} from '../lib/comparator';

interface TestData {
	item1: string;
	item2: number;
}

test('Create an emtpy Deque', t => {
	const dq = new Deque<number>();

	t.truthy(dq);
	t.true(dq.isEmpty());
	t.true(dq.empty);
	t.true(dq.front === null);
	t.true(dq.back === null);
	t.true(dq.popFront() == null);
	t.true(dq.popBack() == null);
	t.snapshot(dq);
});

test('Add/Remove items from the front of the deque', t => {
	const dq = new Deque<number>();
	const n: number = 5;

	t.truthy(dq);
	t.true(dq.empty);

	for (let i: number = 0; i < n; i++) {
		dq.pushFront(i);
	}

	t.is(dq.size, 5);

	for (let i: number = n; i > 0; i--) {
		t.is(dq.length, i);
		t.is(dq.front, (i - 1));
		t.is(dq.popFront(), (i - 1));
	}

	t.true(dq.empty);
});

test('Add/Remove items from the back of the deque', t => {
	const dq = new Deque<number>();
	const n: number = 5;

	t.truthy(dq);
	t.true(dq.empty);

	for (let i: number = 0; i < n; i++) {
		dq.pushBack(i);
	}

	t.is(dq.size, 5);

	for (let i: number = n; i > 0; i--) {
		t.is(dq.length, i);
		t.is(dq.back, (i - 1));
		t.is(dq.popBack(), (i - 1));
	}

	t.true(dq.empty);
});

test.cb('Test deque insert event (pushFront)', t => {
	const dq = new Deque<number>();

	t.truthy(dq);
	t.true(dq.empty);

	const n: number = 100;
	dq.on('insert', (data: any) => {
		t.is(data, n);
		t.end();
	});

	dq.pushFront(n);
});

test.cb('Test deque remove event (popFront)', t => {
	const dq = new Deque<number>();

	t.truthy(dq);
	t.true(dq.empty);

	const n: number = 100;
	dq.on('remove', (data: any) => {
		t.is(data, n);
		t.end();
	});

	dq.pushFront(n);
	dq.popFront();
});

test.cb('Test deque insert event (pushBack)', t => {
	const dq = new Deque<number>();

	t.truthy(dq);
	t.true(dq.empty);

	const n: number = 100;
	dq.on('insert', (data: any) => {
		t.is(data, n);
		t.end();
	});

	dq.pushBack(n);
});

test.cb('Test deque remove event (popBack)', t => {
	const dq = new Deque<number>();

	t.truthy(dq);
	t.true(dq.empty);

	const n: number = 100;
	dq.on('remove', (data: any) => {
		t.is(data, n);
		t.end();
	});

	dq.pushBack(n);
	dq.popBack();
});

test('Test size limited Deque (front)', t => {
	const n: number = 5;
	const dq = new Deque<number>(n);

	t.truthy(dq);
	t.true(dq.empty);

	for (let i: number = 0; i < n; i++) {
		dq.enqueue(i);
	}

	t.is(dq.size, n);
	dq.pushFront(n);
	t.is(dq.size, n);

	const arr = dq.drain();
	t.is(arr[0], 5);
	t.is(arr[1], 1);
	t.is(arr[2], 2);
	t.is(arr[3], 3);
	t.is(arr[4], 4);

	t.true(dq.empty);
});

test('Test size limited Deque (back)', t => {
	const n: number = 5;
	const dq = new Deque<number>(n);

	t.truthy(dq);
	t.true(dq.empty);

	for (let i: number = 0; i < n; i++) {
		dq.enqueue(i);
	}

	t.is(dq.size, n);
	dq.enqueue(n);
	t.is(dq.size, n);

	const arr = dq.drain();
	t.is(arr[0], 1);
	t.is(arr[1], 2);
	t.is(arr[2], 3);
	t.is(arr[3], 4);
	t.is(arr[4], 5);

	t.true(dq.empty);
});

test.cb('Test size limited Deque (pushFront) event', t => {
	const n: number = 5;
	const dq = new Deque<number>(n);

	t.truthy(dq);
	t.true(dq.empty);

	for (let i: number = 0; i < n; i++) {
		dq.enqueue(i);
	}

	t.is(dq.size, n);

	dq.on('remove', (data: any) => {
		t.is(dq.size, n - 1);
		t.is(data, 0);
		t.end();
	});

	dq.pushFront(n + 1);
});

test.cb('Test size limited Deque (pushBack) event', t => {
	const n: number = 5;
	const dq = new Deque<number>(n);

	t.truthy(dq);
	t.true(dq.empty);

	for (let i: number = 0; i < n; i++) {
		dq.enqueue(i);
	}

	t.is(dq.size, n);

	dq.on('remove', (data: any) => {
		t.is(dq.size, n - 1);
		t.is(data, 0);
		t.end();
	});

	dq.pushBack(n + 1);
});

test('Test the contains function on empty deque', t => {
	const dq = new Deque<number>();

	t.truthy(dq);
	t.true(dq.empty);
	t.true(!dq.contains(999));
});

test('Test the contains function for a deque', t => {
	const dq = new Deque<number>();

	t.truthy(dq);
	t.true(dq.empty);

	const n: number = 100;
	for (let i = 0; i < n; i++) {
		dq.enqueue(i);
	}

	t.true(dq.contains(1));
	t.true(dq.contains(10));
	t.true(!dq.contains(999));
});

test('Test of the deque contains function with custom comparator', t => {
	const fn: Comparator<TestData> = (o1: TestData, o2: TestData): number => {
		if (o1.item1 === o2.item1 && o1.item2 === o2.item2) {
			return 0;
		} else if (o1.item1 > o2.item1 && o1.item2 > o2.item2) {
			return 1;
		}

		return -1;
	};

	const dq = new Deque<TestData>(10, null, fn);

	t.truthy(dq);
	t.true(dq.empty);

	dq.enqueue({item1: 'abc', item2: 0});
	dq.enqueue({item1: 'abc', item2: 1});
	dq.enqueue({item1: 'def', item2: 0});
	dq.enqueue({item1: 'ghi', item2: 0});
	dq.enqueue({item1: 'jkl', item2: 0});
	dq.enqueue({item1: 'mno', item2: 0});

	t.true(dq.contains({item1: 'abc', item2: 1}));
	t.true(dq.contains({item1: 'ghi', item2: 0}));
	t.true(dq.contains({item1: 'mno', item2: 0}));
	t.true(!dq.contains({item1: 'cat', item2: 0}));
	t.true(!dq.contains({item1: 'dog', item2: 0}));
});
