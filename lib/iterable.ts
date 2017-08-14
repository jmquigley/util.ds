export interface Iterable<T> {
	delete(data: T): void;
	first(): T;
	insert(data: T): T;
	last(): T;
	next(): T;
}
