'use strict';

import test from 'ava';
import {SortedList} from '../index';

test('Create an empty SortedList', t => {
	const list = new SortedList<string>();

	t.truthy(list);
});
