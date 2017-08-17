'use strict';

/**
 * An interface shared by any object that can insert or remove data.
 * @interface
 */
export interface Iterable<T> {
	find(data: T): void;
	insert(data: T): void;
	remove(data: T): void;
}
