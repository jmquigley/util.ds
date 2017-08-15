'use strict';

import {Comparator} from './comparator';
import {Queue} from './queue';

export class PriorityQueue<T> extends Queue<T> {
	constructor(cmp: Comparator<T> = null) {
		super([], cmp);
	}
}
