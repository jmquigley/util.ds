import {Node} from './node';

export interface Tree<T> {
	breadth(): T[];
	delete(data: T): void;
	inorder(node: Node<T>): T[];
	insert(data: T): void;
	postorder(): T[];
	preorder(): T[];
}
