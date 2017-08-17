'use strict';

import test from 'ava';
import {Stack} from '../index';

test('Create an empty stack', t => {
	const stack = new Stack<number>();

	t.true(stack && stack instanceof Stack);
	t.true(stack.isEmpty());
	t.true(stack.top() === null);
	t.true(stack.peek() === null);
	t.true(stack.pop() === null);
});

test('Add/Remove items from the stack', t => {
	const stack = new Stack<number>();
	const n: number = 50;

	t.true(stack && stack instanceof Stack);
	t.true(stack.isEmpty());

	for (let i: number = 0; i < n; i++) {
		stack.push(i);
	}

	t.is(stack.size, n);

	for (let i: number = n; i > 0; i--) {
		t.true(stack.length === i);
		t.true(((i % 2) ? stack.top() : stack.peek()) === (i - 1));
		t.true(stack.pop() === (i - 1));
	}

	t.true(stack.isEmpty());
});

test.cb('Test stack insert event', t => {
	const stack = new Stack<number>();

	t.true(stack && stack instanceof Stack);
	t.true(stack.isEmpty());

	const n: number = 100;
	stack.on('insert', (data: any) => {
		t.is(data, n);
		t.end();
	});

	stack.push(n);
});

test.cb('Test stack remove event', t => {
	const stack = new Stack<number>();

	t.true(stack && stack instanceof Stack);
	t.true(stack.isEmpty());

	const n: number = 100;
	stack.on('remove', (data: any) => {
		t.is(data, n);
		t.end();
	});

	stack.push(n);
	stack.pop();
});

test('Test contains function with empty stack', t => {
	const stack = new Stack<number>();

	t.true(stack && stack instanceof Stack);
	t.true(stack.isEmpty());
	t.false(stack.contains(999));
});

test('Test the contains function for a stack', t => {
	const stack = new Stack<number>();

	t.true(stack && stack instanceof Stack);
	t.true(stack.isEmpty());

	const n: number = 100;
	for (let i = 0; i < n; i++) {
		stack.push(i);
	}

	t.true(stack.contains(1));
	t.true(stack.contains(10));
	t.false(stack.contains(999));
});
