'use strict';

import {Collection} from './collection';
import {Comparator} from './comparator';

export abstract class Tree<T> extends Collection<T> {
	constructor(cmp: Comparator<T> = null) {
		super(cmp);
	}
}
