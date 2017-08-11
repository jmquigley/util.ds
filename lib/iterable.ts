export interface Iterable<T> {
	insert(data: T): T;
	remove(data: T): void;
	get(data: T | number): T;
	first(): T;
	last(): T;
	next(): T;
}
