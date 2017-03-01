'use strict';

import * as assert from 'assert';
import * as _ from 'lodash';
import {Queue} from '../index';

describe('Testing Queue', () => {

	it('Create an empty queue', () => {
		let q = new Queue();

		assert(q && q instanceof Queue);
		assert(q.isEmpty());
		assert(q.top() === null);
		assert(q.front() === null);
		assert(q.pop() === null);
	});

	it('Add/Remove items from the queue', () => {
		let q = new Queue();
		let n: number = 50;

		assert(q && q instanceof Queue);
		assert(q.isEmpty());

		for (let i: number = 0; i < n; i++) {
			(i % 2) ? q.enqueue(i) : q.push(i);
		}

		assert.equal(q.size(), n);

		for (let i: number = n; i > 0; i--) {
			assert(q.length === i);
			assert(((i % 2) ? q.front() : q.peek()) === (n - i));
			assert(((i % 2) ? q.dequeue() : q.pop()) === (n - i));
		}

		assert(q.isEmpty());
	});

	it('Test queue add event', () => {
		let q = new Queue();

		assert(q && q instanceof Queue);
		assert(q.isEmpty());

		let n: number = 100;
		q.on('add', (data: any) => {
			assert.equal(data, n);
			assert(data);
		});

		q.enqueue(n);
	});

	it('Test queue remove event', () => {
		let q = new Queue();

		assert(q && q instanceof Queue);
		assert(q.isEmpty());

		let n: number = 100;
		q.on('remove', (data: any) => {
			assert.equal(data, n);
			assert(data);
		});

		q.enqueue(n);
		q.dequeue();
	});

	it('Test the queue drain function', () => {
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
				assert(val === idx);
			});

			assert(q.isEmpty());
			assert.equal(q.length, 0);
		});
	});

	it('Test the contains function with empty queue', () => {
		let q = new Queue();

		assert(q && q instanceof Queue);
		assert(q.isEmpty());
		assert(!q.contains(999));
	});

	it('Test the contains function for a queue', () => {
		let q = new Queue();

		assert(q && q instanceof Queue);
		assert(q.isEmpty());

		let n: number = 100;
		for (let i = 0; i < n; i++) {
			q.enqueue(i);
		}

		assert(q.contains(1));
		assert(q.contains(10));
		assert(!q.contains(999));
	});

	it('Ejects an item at the front, back, and middle of a queue', () => {
		let q = new Queue();

		assert(q && q instanceof Queue);
		assert(q.isEmpty());
		q.eject(999);
		assert(q.isEmpty());

		let n: number = 10;
		for (let i = 0; i < n; i++) {
			q.enqueue(i);
		}

		// Eject the front
		assert(q.peek() === 0);
		q.eject(0);
		assert(q.peek() === 1);
		assert(q.end() === 9);
		assert.equal(q.length, 9);

		// Eject the end of the queue
		q.eject(9);
		assert(q.peek() === 1);
		assert(q.end() === 8);
		assert.equal(q.length, 8);

		// Eject from the middle of the queue
		q.eject(5);
		assert(q.peek() === 1);
		assert(q.end() === 8);
		assert.equal(q.length, 7);

		let arr: number[] = q.drain();
		assert.equal(arr.toString(), '1,2,3,4,6,7,8');
	});
});
