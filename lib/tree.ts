import {Iterable} from './iterable';

export interface Tree<T> extends Iterable<T> {
	breadth(): T[];
	inorder(): T[];
	postorder(): T[];
	preorder(): T[];
}
