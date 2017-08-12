export interface Iterable<T> {
	delete(data: T): void;
	first(): T;
	has(data: T): boolean;
	insert(data: T): T;
	last(): T;
	next(): T;
}
