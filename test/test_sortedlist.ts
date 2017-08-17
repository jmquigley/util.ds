'use strict';

import test from 'ava';
import {SortedList} from '../index';

test('Create an empty SortedList', t => {
	const list = new SortedList<string>();

	t.truthy(list);
	t.is(list.size, 0);

	list.insert('b');
	list.insert('a');
	list.insert('c');
	list.insert('e');
	list.insert('d');
	list.insert(null);

	t.is(list.size, 5);
	t.deepEqual(list.array, ['a', 'b', 'c', 'd', 'e']);
	t.is(list.front, 'a');
	t.is(list.back, 'e');

	list.insert('f');
	t.is(list.back, 'f');

	list.remove('f');
	t.is(list.back, 'e');

	list.remove('a');
	t.is(list.front, 'b');

	list.insert('a');
	t.is(list.front, 'a');
});

test.cb('Test SortedList insert event', t => {
	const list = new SortedList<string>();

	t.truthy(list);
	t.true(list.empty);

	list.on('insert', (data: string) => {
		t.is(data, 'a');
		t.end();
	});

	list.insert('a');
});

test.cb('Test removal from a SortedList', t => {
	const list = new SortedList<string>(['b', 'a', 'c', 'e', 'd']);

	t.truthy(list);
	t.is(list.size, 5);
	t.deepEqual(list.array, ['a', 'b', 'c', 'd', 'e']);
	t.true(list.contains('c'));

	list.on('remove', (data: string) => {
		t.is(data, 'c');
		t.is(list.size, 4);
		t.false(list.contains('c'));
		t.deepEqual(list.array, ['a', 'b', 'd', 'e']);
		t.end();
	});

	list.remove('c');
});
