'use strict';

import * as assert from 'assert';
import {Deque} from '../index';
import {IComparator} from '../lib/collection';

interface ITestData {
	item1: string;
	item2: number;
}

describe('Test Deque', () => {

	it('Create an emtpy Deque', () => {
		let dq = new Deque();

		assert(dq && dq instanceof Deque);
		assert(dq.isEmpty());
		assert(dq.peekFront() === null);
		assert(dq.peekBack() === null);
		assert(dq.popFront() == null);
		assert(dq.popBack() == null);
	});

	it('Add/Remove items from the front of the deque', () => {
		let dq = new Deque();
		let n: number = 5;

		assert(dq && dq instanceof Deque);
		assert(dq.isEmpty());

		for (let i: number = 0; i < n; i++) {
			dq.pushFront(i);
		}

		assert.equal(dq.size(), 5);

		for (let i: number = n; i > 0; i--) {
			assert(dq.length === i);
			assert(dq.peekFront() === (i - 1));
			assert(dq.popFront() === (i - 1));
		}

		assert(dq.isEmpty());
	});

	it('Add/Remove items from the back of the deque', () => {
		let dq = new Deque();
		let n: number = 5;

		assert(dq && dq instanceof Deque);
		assert(dq.isEmpty());

		for (let i: number = 0; i < n; i++) {
			dq.pushBack(i);
		}

		assert.equal(dq.size(), 5);

		for (let i: number = n; i > 0; i--) {
			assert(dq.length === i);
			assert(dq.peekBack() === (i - 1));
			assert(dq.popBack() === (i - 1));
		}

		assert(dq.isEmpty());
	});

	it('Test deque add event (pushFront)', () => {
		let dq = new Deque();

		assert(dq && dq instanceof Deque);
		assert(dq.isEmpty());

		let n: number = 100;
		dq.on('add', (data: any) => {
			assert.equal(data, n);
			assert(data);
		});

		dq.pushFront(n);
	});

	it('Test deque remove event (popFront)', () => {
		let dq = new Deque();

		assert(dq && dq instanceof Deque);
		assert(dq.isEmpty());

		let n: number = 100;
		dq.on('remove', (data: any) => {
			assert.equal(data, n);
			assert(data);
		});

		dq.pushFront(n);
		dq.popFront();
	});

	it('Test deque add event (pushBack)', () => {
		let dq = new Deque();

		assert(dq && dq instanceof Deque);
		assert(dq.isEmpty());

		let n: number = 100;
		dq.on('add', (data: any) => {
			assert.equal(data, n);
			assert(data);
		});

		dq.pushBack(n);
	});

	it('Test deque remove event (popBack)', () => {
		let dq = new Deque();

		assert(dq && dq instanceof Deque);
		assert(dq.isEmpty());

		let n: number = 100;
		dq.on('remove', (data: any) => {
			assert.equal(data, n);
			assert(data);
		});

		dq.pushBack(n);
		dq.popBack();
	});

	it('Test size limited Deque (front)', () => {
		let n: number = 5;
		let dq = new Deque(n);

		assert(dq && dq instanceof Deque);
		assert(dq.isEmpty());

		for (let i: number = 0; i < n; i++) {
			dq.enqueue(i);
		}

		assert.equal(dq.size(), n);
		dq.pushFront(n);
		assert.equal(dq.size(), n);

		let arr = dq.drain();
		assert.equal(arr[0], 5);
		assert.equal(arr[1], 1);
		assert.equal(arr[2], 2);
		assert.equal(arr[3], 3);
		assert.equal(arr[4], 4);

		assert(dq.isEmpty());
	});

	it('Test size limited Deque (back)', () => {
		let n: number = 5;
		let dq = new Deque(n);

		assert(dq && dq instanceof Deque);
		assert(dq.isEmpty());

		for (let i: number = 0; i < n; i++) {
			dq.enqueue(i);
		}

		assert.equal(dq.size(), n);
		dq.enqueue(n);
		assert.equal(dq.size(), n);

		let arr = dq.drain();
		assert.equal(arr[0], 1);
		assert.equal(arr[1], 2);
		assert.equal(arr[2], 3);
		assert.equal(arr[3], 4);
		assert.equal(arr[4], 5);

		assert(dq.isEmpty());
	});

	it('Test size limited Deque (pushFront) event', (done) => {
		let n: number = 5;
		let dq = new Deque(n);

		assert(dq && dq instanceof Deque);
		assert(dq.isEmpty());

		for (let i: number = 0; i < n; i++) {
			dq.enqueue(i);
		}

		assert.equal(dq.size(), n);

		dq.on('remove', (data: any) => {
			assert.equal(dq.size(), n - 1);
			assert.equal(data, 0);
			done();
		});

		dq.pushFront(n + 1);
	});

	it('Test size limited Deque (pushBack) event', (done) => {
		let n: number = 5;
		let dq = new Deque(n);

		assert(dq && dq instanceof Deque);
		assert(dq.isEmpty());

		for (let i: number = 0; i < n; i++) {
			dq.enqueue(i);
		}

		assert.equal(dq.size(), n);

		dq.on('remove', (data: any) => {
			assert.equal(dq.size(), n - 1);
			assert.equal(data, 0);
			done();
		});

		dq.pushBack(n + 1);
	});

	it('Test the contains function on empty deque', () => {
		let dq = new Deque();

		assert(dq && dq instanceof Deque);
		assert(dq.isEmpty());
		assert(!dq.contains(999));
	});

	it('Test the contains function for a deque', () => {
		let dq = new Deque();

		assert(dq && dq instanceof Deque);
		assert(dq.isEmpty());

		let n: number = 100;
		for (let i = 0; i < n; i++) {
			dq.enqueue(i);
		}

		assert(dq.contains(1));
		assert(dq.contains(10));
		assert(!dq.contains(999));
	});

	it('Test of the deque contains function with custom comparator', () => {
		let fn: IComparator = (o1: ITestData, o2: ITestData): number => {
			if (o1.item1 === o2.item1 && o1.item2 === o2.item2) {
				return 0;
			} else if (o1.item1 > o2.item1 && o1.item2 > o2.item2) {
				return 1;
			}

			return -1;
		};

		let dq = new Deque(10, fn);

		assert(dq && dq instanceof Deque);
		assert(dq.isEmpty());

		dq.enqueue({item1: 'abc', item2: 0});
		dq.enqueue({item1: 'abc', item2: 1});
		dq.enqueue({item1: 'def', item2: 0});
		dq.enqueue({item1: 'ghi', item2: 0});
		dq.enqueue({item1: 'jkl', item2: 0});
		dq.enqueue({item1: 'mno', item2: 0});

		assert(dq.contains({item1: 'abc', item2: 1}));
		assert(dq.contains({item1: 'ghi', item2: 0}));
		assert(dq.contains({item1: 'mno', item2: 0}));
		assert(!dq.contains({item1: 'cat', item2: 0}));
		assert(!dq.contains({item1: 'dog', item2: 0}));
	});
});
