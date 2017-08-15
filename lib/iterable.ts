'use strict';

export interface Iterable<T> {
	delete(data: T): void;
	insert(data: T): void;
}
