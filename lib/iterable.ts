'use strict';

export interface Iterable<T> {
	find(data: T): void;
	insert(data: T): void;
	remove(data: T): void;
}
