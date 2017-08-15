'use strict';

import test from 'ava';
import {List} from '../index';

test('Create an empty List', t => {
	const list = new List<string>();

	t.truthy(list);
});
