import {Iterable} from './iterable';

export interface Tree<T> extends Iterable<T> {
	inorder(): T[];
	postorder(): T[];
	preorder(): T[];
}
