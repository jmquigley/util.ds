'use strict';

import {Comparator} from './comparator';
import {List} from './list';

export class SortedList<T> extends List<T> {
	constructor(cmp: Comparator<T> = null) {
		super(cmp);
	}
}
