'use strict';

import {Collection} from './collection';
import {Comparator} from './comparator';
import {Iterable} from './iterable';

export class List<T> extends Collection<T> implements Iterable<T> {

	public static readonly FRONT: number = 0;
	public static readonly END: number = -1;

	constructor(cmp: Comparator<T> = null) {
		super(cmp);
	}

	public delete(data: T) {
		console.log(`delete: ${data}`);
	}

	public insert(data: T, idx: number = List.END) {
		console.log(`insert(${idx}): ${data}`);
	}
}
