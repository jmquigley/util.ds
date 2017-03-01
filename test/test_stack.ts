'use strict';

import * as assert from 'assert';
import {Stack} from '../index';

describe('Testing Stack', () => {

	it('Create an empty stack', () => {
		let stack = new Stack();

		assert(stack && stack instanceof Stack);
		assert(stack.isEmpty());
		assert(stack.top() === null);
		assert(stack.peek() === null);
		assert(stack.pop() === null);
	});

	it('Add/Remove items from the stack', () => {
		let stack = new Stack();
		let n: number = 50;

		assert(stack && stack instanceof Stack);
		assert(stack.isEmpty());

		for (let i: number = 0; i < n; i++) {
			stack.push(i);
		}

		assert.equal(stack.size(), n);

		for (let i: number = n; i > 0; i--) {
			assert(stack.length === i);
			assert(((i % 2) ? stack.top() : stack.peek()) === (i - 1));
			assert(stack.pop() === (i - 1));
		}

		assert(stack.isEmpty());
	});

	it('Test stack add event', () => {
		let stack = new Stack();

		assert(stack && stack instanceof Stack);
		assert(stack.isEmpty());

		let n: number = 100;
		stack.on('add', (data: any) => {
			assert.equal(data, n);
			assert(data);
		});

		stack.push(n);
	});

	it('Test stack remove event', () => {
		let stack = new Stack();

		assert(stack && stack instanceof Stack);
		assert(stack.isEmpty());

		let n: number = 100;
		stack.on('remove', (data: any) => {
			assert.equal(data, n);
			assert(data);
		});

		stack.push(n);
		stack.pop();
	});

	it('Test contains function with empty stack', () => {
		let stack = new Stack();

		assert(stack && stack instanceof Stack);
		assert(stack.isEmpty());
		assert(!stack.contains(999));
	});

	it('Test the contains function for a stack', () => {
		let stack = new Stack();

		assert(stack && stack instanceof Stack);
		assert(stack.isEmpty());

		let n: number = 100;
		for (let i = 0; i < n; i++) {
			stack.push(i);
		}

		assert(stack.contains(1));
		assert(stack.contains(10));
		assert(!stack.contains(999));
	});
});
