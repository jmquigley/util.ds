import {Id, Node} from "./node";

/**
 * An interface shared by any object that can insert or remove data.
 * @interface
 */
export interface Iterable<T> {
	find(data: T | Id): T | Node<T>;
	insert(data: T | Node<T>): void;
	remove(data: T | Node<T>): void;
}
