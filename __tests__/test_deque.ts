'use strict';

import {Deque} from '../index';
import {Comparator} from '../lib/comparator';

interface TestData {
	item1: string;
	item2: number;
}

test('Create an emtpy Deque', () => {
	const dq = new Deque<number>();

	expect(dq).toBeDefined();
	expect(dq.isEmpty()).toBe(true);
	expect(dq.empty).toBe(true);
	expect(dq.front === null).toBe(true);
	expect(dq.back === null).toBe(true);
	expect(dq.popFront() == null).toBe(true);
	expect(dq.popBack() == null).toBe(true);
	expect(dq).toMatchSnapshot();
});

test('Add/Remove items from the front of the deque', () => {
	const dq = new Deque<number>();
	const n: number = 5;

	expect(dq).toBeDefined();
	expect(dq.empty).toBe(true);

	for (let i: number = 0; i < n; i++) {
		dq.pushFront(i);
	}

	expect(dq.size).toBe(5);

	for (let i: number = n; i > 0; i--) {
		expect(dq.length).toBe(i);
		expect(dq.front).toBe(i - 1);
		expect(dq.popFront()).toBe(i - 1);
	}

	expect(dq.empty).toBe(true);
});

test('Add/Remove items from the back of the deque', () => {
	const dq = new Deque<number>();
	const n: number = 5;

	expect(dq).toBeDefined();
	expect(dq.empty).toBe(true);

	for (let i: number = 0; i < n; i++) {
		dq.pushBack(i);
	}

	expect(dq.size).toBe(5);

	for (let i: number = n; i > 0; i--) {
		expect(dq.length).toBe(i);
		expect(dq.back).toBe(i - 1);
		expect(dq.popBack()).toBe(i - 1);
	}

	expect(dq.empty).toBe(true);
});

test('Test deque insert event (pushFront)', (done) => {
	const dq = new Deque<number>();

	expect(dq).toBeDefined();
	expect(dq.empty).toBe(true);

	const n: number = 100;
	dq.on('insert', (data: any) => {
		expect(data).toBe(n);
		done();
	});

	dq.pushFront(n);
});

test('Test deque remove event (popFront)', (done) => {
	const dq = new Deque<number>();

	expect(dq).toBeDefined();
	expect(dq.empty).toBe(true);

	const n: number = 100;
	dq.on('remove', (data: any) => {
		expect(data).toBe(n);
		done();
	});

	dq.pushFront(n);
	dq.popFront();
});

test('Test deque insert event (pushBack)', (done) => {
	const dq = new Deque<number>();

	expect(dq).toBeDefined();
	expect(dq.empty).toBe(true);

	const n: number = 100;
	dq.on('insert', (data: any) => {
		expect(data).toBe(n);
		done();
	});

	dq.pushBack(n);
});

test('Test deque remove event (popBack)', (done) => {
	const dq = new Deque<number>();

	expect(dq).toBeDefined();
	expect(dq.empty).toBe(true);

	const n: number = 100;
	dq.on('remove', (data: any) => {
		expect(data).toBe(n);
		done();
	});

	dq.pushBack(n);
	dq.popBack();
});

test('Test size limited Deque (front)', () => {
	const n: number = 5;
	const dq = new Deque<number>(n);

	expect(dq).toBeDefined();
	expect(dq.empty).toBe(true);

	for (let i: number = 0; i < n; i++) {
		dq.enqueue(i);
	}

	expect(dq.size).toBe(n);
	dq.pushFront(n);
	expect(dq.size).toBe(n);

	const arr = dq.drain();
	expect(arr[0]).toBe(5);
	expect(arr[1]).toBe(1);
	expect(arr[2]).toBe(2);
	expect(arr[3]).toBe(3);
	expect(arr[4]).toBe(4);

	expect(dq.empty).toBe(true);
});

test('Test size limited Deque (back)', () => {
	const n: number = 5;
	const dq = new Deque<number>(n);

	expect(dq).toBeDefined();
	expect(dq.empty).toBe(true);

	for (let i: number = 0; i < n; i++) {
		dq.enqueue(i);
	}

	expect(dq.size).toBe(n);
	dq.enqueue(n);
	expect(dq.size).toBe(n);

	const arr = dq.drain();
	expect(arr[0]).toBe(1);
	expect(arr[1]).toBe(2);
	expect(arr[2]).toBe(3);
	expect(arr[3]).toBe(4);
	expect(arr[4]).toBe(5);

	expect(dq.empty).toBe(true);
});

test('Test size limited Deque (pushFront) event', (done) => {
	const n: number = 5;
	const dq = new Deque<number>(n);

	expect(dq).toBeDefined();
	expect(dq.empty).toBe(true);

	for (let i: number = 0; i < n; i++) {
		dq.enqueue(i);
	}

	expect(dq.size).toBe(n);

	dq.on('remove', (data: any) => {
		expect(dq.size).toBe(n - 1);
		expect(data).toBe(0);
		done();
	});

	dq.pushFront(n + 1);
});

test('Test size limited Deque (pushBack) event', (done) => {
	const n: number = 5;
	const dq = new Deque<number>(n);

	expect(dq).toBeDefined();
	expect(dq.empty).toBe(true);

	for (let i: number = 0; i < n; i++) {
		dq.enqueue(i);
	}

	expect(dq.size).toBe(n);

	dq.on('remove', (data: any) => {
		expect(dq.size).toBe(n - 1);
		expect(data).toBe(0);
		done();
	});

	dq.pushBack(n + 1);
});

test('Test the contains function on empty deque', () => {
	const dq = new Deque<number>();

	expect(dq).toBeDefined();
	expect(dq.empty).toBe(true);
	expect(!dq.contains(999)).toBe(true);
});

test('Test the contains function for a deque', () => {
	const dq = new Deque<number>();

	expect(dq).toBeDefined();
	expect(dq.empty).toBe(true);

	const n: number = 100;
	for (let i = 0; i < n; i++) {
		dq.enqueue(i);
	}

	expect(dq.contains(1)).toBe(true);
	expect(dq.contains(10)).toBe(true);
	expect(!dq.contains(999)).toBe(true);
});

test('Test of the deque contains function with custom comparator', () => {
	const fn: Comparator<TestData> = (o1: TestData, o2: TestData): number => {
		if (o1.item1 === o2.item1 && o1.item2 === o2.item2) {
			return 0;
		} else if (o1.item1 > o2.item1 && o1.item2 > o2.item2) {
			return 1;
		}

		return -1;
	};

	const dq = new Deque<TestData>(10, null, fn);

	expect(dq).toBeDefined();
	expect(dq.empty).toBe(true);

	dq.enqueue({item1: 'abc', item2: 0});
	dq.enqueue({item1: 'abc', item2: 1});
	dq.enqueue({item1: 'def', item2: 0});
	dq.enqueue({item1: 'ghi', item2: 0});
	dq.enqueue({item1: 'jkl', item2: 0});
	dq.enqueue({item1: 'mno', item2: 0});

	expect(dq.contains({item1: 'abc', item2: 1})).toBe(true);
	expect(dq.contains({item1: 'ghi', item2: 0})).toBe(true);
	expect(dq.contains({item1: 'mno', item2: 0})).toBe(true);
	expect(!dq.contains({item1: 'cat', item2: 0})).toBe(true);
	expect(!dq.contains({item1: 'dog', item2: 0})).toBe(true);
});
