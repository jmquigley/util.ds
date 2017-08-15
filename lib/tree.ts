export interface Tree<T> {
	delete(data: T): void;
	insert(data: T): void;
}
