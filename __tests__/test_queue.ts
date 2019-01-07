'use strict';

import {Queue} from '../index';

test('Create an empty queue', () => {
	const q = new Queue<number>();

	expect(q).toBeDefined();
	expect(q.isEmpty()).toBe(true);
	expect(q.empty).toBe(true);
	expect(q.front).toBe(null);
	expect(q).toMatchSnapshot();
});

test('Add/Remove items from the queue', () => {
	const q = new Queue<number>();
	const n: number = 50;

	expect(q).toBeDefined();
	expect(q.isEmpty()).toBe(true);
	expect(q.empty).toBe(true);

	for (let i: number = 0; i < n; i++) {
		(i % 2) ? q.enqueue(i) : q.push(i);
	}

	expect(q.size).toBe(n);

	for (let i: number = n; i > 0; i--) {
		expect(q.length === i).toBe(true);
		expect(q.front).toBe(n - i);
		expect(q.dequeue()).toBe(n - i);
	}

	expect(q.empty).toBe(true);
});

test('Test queue insert event', (done) => {
	const q = new Queue<number>();

	expect(q).toBeDefined();
	expect(q.isEmpty()).toBe(true);

	const n: number = 100;
	q.on('insert', (data: number) => {
		expect(data).toBe(n);
		done();
	});

	q.enqueue(n);
});

test('Test queue remove event', (done) => {
	const q = new Queue<number>();

	expect(q).toBeDefined();
	expect(q.empty).toBe(true);

	const n: number = 100;
	q.on('remove', (data: number) => {
		expect(data).toBe(n);
		done();
	});

	q.enqueue(n);
	q.dequeue();
});

test('Test the queue drain function', () => {
	const q = new Queue<number>();
	const n: number = 5;

	expect(q).toBeDefined();

	for (let i = 0; i < n; i++) {
		q.enqueue(i);
	}

	// Do the same thing a few times to show that once drained it still works
	// by returning an empty array.
	for (let i = 0; i < n; i++) {
		const arr = q.drain();
		arr.forEach((val: number, idx: number) => {
			expect(val === idx).toBe(true);
		});

		expect(q.isEmpty()).toBe(true);
		expect(q.length).toBe(0);
	}
});

test('Test the contains function with empty queue', () => {
	const q = new Queue<number>();

	expect(q).toBeDefined();
	expect(q.isEmpty()).toBe(true);
	expect(!q.contains(999)).toBe(true);
});

test('Test the contains function for a queue', () => {
	const q = new Queue<number>();

	expect(q).toBeDefined();
	expect(q.isEmpty()).toBe(true);

	const n: number = 100;
	for (let i = 0; i < n; i++) {
		q.enqueue(i);
	}

	expect(q.contains(1)).toBe(true);
	expect(q.contains(10)).toBe(true);
	expect(!q.contains(999)).toBe(true);
});

test('Ejects an item at the front, back, and middle of a queue', () => {
	const q = new Queue<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

	expect(q).toBeDefined();
	expect(q.isEmpty()).toBe(false);
	q.eject(999);
	expect(q.isEmpty()).toBe(false);

 	// Eject the front
 	expect(q.front).toBe(0);
 	q.eject(0);
 	expect(q.front).toBe(1);
 	expect(q.back).toBe(9);
 	expect(q.length).toBe(9);

 	// Eject the end of the queue
 	expect(q.eject(9)).toBe(9);
 	expect(q.front === 1).toBe(true);
 	expect(q.back === 8).toBe(true);
 	expect(q.length).toBe(8);

 	// Eject from the middle of the queue
 	q.eject(5);
 	expect(q.front === 1).toBe(true);
 	expect(q.back === 8).toBe(true);
 	expect(q.length).toBe(7);

 	const arr: number[] = q.drain();
 	expect(arr).toEqual([1, 2, 3, 4, 6, 7, 8]);
});
