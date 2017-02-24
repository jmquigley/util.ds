'use strict';

import {test} from 'ava';
import {Stack} from '../index';

test.cb('Create an empty stack', (t: any) => {
	let stack = new Stack();

	t.true(stack && stack instanceof Stack);
	t.true(stack.isEmpty());
	t.true(stack.top() === null);
	t.true(stack.peek() === null);
	t.true(stack.pop() === null);
	t.end();
});

test.cb('Add/Remove items from the stack', (t: any) => {
	let stack = new Stack();
	let n: number = 50;

	t.true(stack && stack instanceof Stack);
	t.true(stack.isEmpty());

	for (let i: number = 0; i < n; i++) {
		stack.push(i);
	}

	t.is(stack.size(), n);

	for (let i: number = n; i > 0; i--) {
		t.true(stack.length === i);
		t.true(((i % 2) ? stack.top() : stack.peek()) === (i - 1));
		t.true(stack.pop() === (i - 1));
	}

	t.true(stack.isEmpty());
	t.end();
});

test.cb('Test stack add event', (t: any) => {
	let stack = new Stack();

	t.true(stack && stack instanceof Stack);
	t.true(stack.isEmpty());

	let n: number = 100;
	stack.on('add', (data: any) => {
		t.is(data, n);
		t.pass(data);
		t.end();
	});

	stack.push(n);
});

test.cb('Test stack remove event', (t: any) => {
	let stack = new Stack();

	t.true(stack && stack instanceof Stack);
	t.true(stack.isEmpty());

	let n: number = 100;
	stack.on('remove', (data: any) => {
		t.is(data, n);
		t.pass(data);
		t.end();
	});

	stack.push(n);
	stack.pop();
});

test.cb('Test contains function with empty stack', (t: any) => {
	let stack = new Stack();

	t.true(stack && stack instanceof Stack);
	t.true(stack.isEmpty());
	t.false(stack.contains(999));
	t.end();
});

test.cb('Test the contains function for a stack', (t: any) => {
	let stack = new Stack();

	t.true(stack && stack instanceof Stack);
	t.true(stack.isEmpty());

	let n: number = 100;
	for (let i = 0; i < n; i++) {
		stack.push(i);
	}

	t.true(stack.contains(1));
	t.true(stack.contains(10));
	t.false(stack.contains(999));

	t.end();
});
