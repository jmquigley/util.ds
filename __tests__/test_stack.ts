"use strict";

import "@babel/polyfill";

import {Stack} from "../index";

test("Create an empty stack", () => {
	const stack = new Stack<number>();

	expect(stack).toBeDefined();

	expect(stack.isEmpty()).toBe(true);
	expect(stack.top() === null).toBe(true);
	expect(stack.peek() === null).toBe(true);
	expect(stack.pop() === null).toBe(true);
});

test("Add/Remove items from the stack", () => {
	const stack = new Stack<number>();
	const n: number = 50;

	expect(stack).toBeDefined();
	expect(stack.isEmpty()).toBe(true);

	for (let i: number = 0; i < n; i++) {
		stack.push(i);
	}

	expect(stack.size).toBe(n);

	for (let i: number = n; i > 0; i--) {
		expect(stack.length === i).toBe(true);
		expect((i % 2 ? stack.top() : stack.peek()) === i - 1).toBe(true);
		expect(stack.pop() === i - 1).toBe(true);
	}

	expect(stack.isEmpty()).toBe(true);
});

test("Test stack insert event", (done) => {
	const stack = new Stack<number>();

	expect(stack).toBeDefined();
	expect(stack.isEmpty()).toBe(true);

	const n: number = 100;
	stack.on("insert", (data: any) => {
		expect(data).toBe(n);
		done();
	});

	stack.push(n);
});

test("Test stack remove event", (done) => {
	const stack = new Stack<number>();

	expect(stack).toBeDefined();
	expect(stack.isEmpty()).toBe(true);

	const n: number = 100;
	stack.on("remove", (data: any) => {
		expect(data).toBe(n);
		done();
	});

	stack.push(n);
	stack.pop();
});

test("Test contains function with empty stack", () => {
	const stack = new Stack<number>();

	expect(stack).toBeDefined();
	expect(stack.isEmpty()).toBe(true);
	expect(stack.contains(999)).toBe(false);
});

test("Test the contains function for a stack", () => {
	const stack = new Stack<number>();

	expect(stack).toBeDefined();
	expect(stack.isEmpty()).toBe(true);

	const n: number = 100;
	for (let i = 0; i < n; i++) {
		stack.push(i);
	}

	expect(stack.contains(1)).toBe(true);
	expect(stack.contains(10)).toBe(true);
	expect(stack.contains(999)).toBe(false);
});
