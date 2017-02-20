'use strict';

import {EventEmitter} from 'events';
import {Node} from './node';

export abstract class Collection extends EventEmitter {
	protected _root: Node = null;
	protected _length: number = 0;

	public size() {
		return this._length;
	}

	public isEmpty() {
		return this._length === 0;
	}

	get length(): number {
		return this._length;
	}
}
