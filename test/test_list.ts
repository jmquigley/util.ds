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
	t.snapshot(list);
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
	list.insert(null);
	list.insert(null, null);

	t.is(list.size, 5);

	for (const it of list) {
		t.is(data[idx++], it);
	}

	t.is(list.front, 'a');
	t.is(list.back, 'e');
	t.deepEqual(list.array, data);
	t.deepEqual(list.reverse, data.reverse());
});

test('Test the List contains method', t => {
	const list = new List<string>(['a', 'b', 'c', 'd', 'e']);

	t.truthy(list);
	t.is(list.size, 5);

	t.true(list.contains('a'));
	t.true(list.contains('c'));
	t.true(list.contains('e'));
	t.false(list.contains('abcde'));
	t.false(list.contains(null));
});

test('Test the list contains with an empty list', t => {
	const list = new List<string>();

	t.truthy(list);
	t.is(list.size, 0);

	t.false(list.contains('a'));
	t.false(list.contains('c'));
	t.false(list.contains('e'));
	t.false(list.contains('abcde'));
	t.false(list.contains(null));
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

test('Test the getNodeByValue/getNodeByIndex  methods in List', t => {
	const data = ['a', 'b', 'c', 'd', 'e'];
	const list = new List<string>(data);

	t.truthy(list);
	t.is(list.size, 5);

	t.is(list._getNodeByValue('c').data, 'c');
	t.is(list._getNodeByIndex(2).data, 'c');

	t.is(list._getNodeByValue('a').data, 'a');
	t.is(list._getNodeByIndex(0).data, 'a');

	t.is(list._getNodeByValue('e').data, 'e');
	t.is(list._getNodeByIndex(4).data, 'e');
});

test('Test removing values from the List', t => {
	const data = ['a', 'b', 'c', 'd', 'e'];
	const list = new List<string>(data);

	t.truthy(list);
	t.is(list.size, 5);
	t.deepEqual(list.array, data);
	t.is(list.front, 'a');
	t.is(list.back, 'e');

	t.is(list.remove(null, List.FRONT), 'a');
	t.is(list.front, 'b');

	list.remove('c');

	list.remove('e');
	t.is(list.end, 'd');

	t.is(list.remove(null), null);
	t.is(list.remove(null, null), null);

	t.is(list.size, 2);
	t.deepEqual(list.array, ['b', 'd']);

	t.is(list.front, 'b');
	t.is(list.back, 'd');
});

test('Test removing all values from the front of a List', t => {
	const list = new List<string>(['a', 'b', 'c', 'd', 'e']);

	t.truthy(list);
	t.is(list.size, 5);

	for (let i = 0; i < 10; i++) {
		list.remove(null, List.FRONT);
	}

	t.is(list.size, 0);
});

test('Test removing all values from the end of a list', t => {
	const list = new List<string>(['a', 'b', 'c', 'd', 'e']);

	t.truthy(list);
	t.is(list.size, 5);

	for (let i = 0; i < 10; i++) {
		list.remove(null, List.BACK);
	}

	t.is(list.size, 0);
});

test('Test the find method for a List', t => {
	const list = new List<string>(['a', 'b', 'c', 'd', 'e']);

	t.truthy(list);
	t.is(list.size, 5);

	t.is(list.find('a'), 'a');
	t.is(list.find('e'), 'e');
	t.is(list.find('aasldkfjsldkfj'), null);
	t.is(list.find(null), null);
});
