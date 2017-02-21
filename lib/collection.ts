'use strict';

import {EventEmitter} from 'events';
import {Node} from './node';

export abstract class Collection extends EventEmitter {
	protected _root: Node = null;
	protected _length: number = 0;

	constructor() {
		super();
		this.clear();
	}

	public clear(): void {
		this._root = null;
		this._length = 0;
	}

	public isEmpty(): boolean {
		return this._length === 0;
	}

	get length(): number {
		return this._length;
	}

	public size(): number {
		return this._length;
	}
}
