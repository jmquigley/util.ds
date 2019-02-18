"use strict";

import {Collection} from "./collection";
import {Comparator} from "./comparator";

/**
 * The abstract base class for all Tree data structures
 *
 */
export abstract class Tree<T> extends Collection<T> {
	constructor(cmp: Comparator<T> = null) {
		super(cmp);
	}
}
