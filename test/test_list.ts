'use strict';

import test from 'ava';
import {List} from '../index';

test('Create an empty List', t => {
	const list = new List<string>();

	t.truthy(list);
	t.is(list.size, 0);
	t.is(list.length, 0);
	t.is(list.front, null);
	t.is(list.back, null);
});

test('Create a List using the insert method', t => {
	const data = ['a', 'b', 'c', 'd', 'e'];
	const list = new List<string>();
	let idx = 0;

	t.truthy(list);
	t.is(list.size, 0);

	for (const it of data) {
		list.insert(it);
	}

	t.is(list.size, 5);

	for (const it of list) {
		t.is(data[idx++], it);
	}

	t.is(list.front, 'a');
	t.is(list.back, 'e');
});

test('Create a List inserting to the front of the list (reverse)', t => {
	const data = ['a', 'b', 'c', 'd', 'e'];
	const list = new List<string>();
	let idx = 4;

	t.truthy(list);
	t.is(list.size, 0);

	for (const it of data) {
		list.insert(it, List.FRONT);
	}

	t.is(list.size, 5);

	for (const it of list) {
		t.is(data[idx--], it);
	}

	t.is(list.front, 'e');
	t.is(list.back, 'a');
});

test('Test arbitrary insertion into a List', t => {
	const data = ['a', 'b', 'c', 'd', 'e', 'f'];
	const list = new List<string>(['a', 'c', 'e']);
	let idx = 0;

	t.truthy(list);
	t.is(list.size, 3);

	list.insert('b', 1);
	list.insert('d', 3);
	list.insert('f', 9999);

	t.is(list.size, 6);

	for (const it of list) {
		t.is(data[idx++], it);
	}

	t.is(list.front, 'a');
	t.is(list.back, 'f');
});
