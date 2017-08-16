'use strict';

export interface Iterable<T> {
	insert(data: T): void;
	remove(data: T): void;
}
