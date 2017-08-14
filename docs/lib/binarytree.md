<a name="BinaryTree"></a>

## BinaryTree
Implements a binary tree structure using a Red/Black tree algorithm.

http://staff.ustc.edu.cn/~csli/graduate/algorithms/book6/chap14.htm

**Kind**: global class  

* [BinaryTree](#BinaryTree)
    * [.breadth(node)](#BinaryTree+breadth) ⇒ <code>Array.&lt;T&gt;</code>
    * [.breadthSearch(data, node)](#BinaryTree+breadthSearch) ⇒ <code>boolean</code>
    * [.contains(data)](#BinaryTree+contains) ⇒ <code>boolean</code>
    * [._maximum(node)](#BinaryTree+_maximum) ⇒ <code>Node.&lt;T&gt;</code>
    * [._minimum(node)](#BinaryTree+_minimum) ⇒ <code>Node.&lt;T&gt;</code>
    * [._leftRotate()](#BinaryTree+_leftRotate)
    * [._rightRotate()](#BinaryTree+_rightRotate)
    * [._successor(node)](#BinaryTree+_successor) ⇒ <code>Node.&lt;T&gt;</code>

<a name="BinaryTree+breadth"></a>

### binaryTree.breadth(node) ⇒ <code>Array.&lt;T&gt;</code>
Performs a breadth first traversal of the tree and saves it to an array
of T type (of the tree).  The array of data is returned.  Don't use this
with a large tree.

**Kind**: instance method of [<code>BinaryTree</code>](#BinaryTree)  
**Returns**: <code>Array.&lt;T&gt;</code> - an array of all elements in the tree in breadth order  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>T</code> | the starting node for the search.  This is root by default |

<a name="BinaryTree+breadthSearch"></a>

### binaryTree.breadthSearch(data, node) ⇒ <code>boolean</code>
Peforms a breadth first search against the tree.  Generally this is not
the best way to search the tree (use contains to determine if a key is
in it).

**Kind**: instance method of [<code>BinaryTree</code>](#BinaryTree)  
**Returns**: <code>boolean</code> - true if the item is found in the tree, otherwise
false is returned.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>T</code> | the data element to search for (based on the data type of the tree) |
| node | <code>T</code> | the starting node for the search.  This is root by default |

<a name="BinaryTree+contains"></a>

### binaryTree.contains(data) ⇒ <code>boolean</code>
Performs a typically binary search through the tree.

**Kind**: instance method of [<code>BinaryTree</code>](#BinaryTree)  
**Returns**: <code>boolean</code> - true if the item is found in the tree, otherwise
false is returned.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>T</code> | the data element to search for (based on the data type of the tree) |

<a name="BinaryTree+_maximum"></a>

### binaryTree._maximum(node) ⇒ <code>Node.&lt;T&gt;</code>
Searches a tree from a given node for the maximum value in that
(sub)tree.  Note that the property `.largest` can be used to
quickly retrieve the largest value in the tree.

**Kind**: instance method of [<code>BinaryTree</code>](#BinaryTree)  
**Returns**: <code>Node.&lt;T&gt;</code> - the largest node in the (sub)tree.  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Node.&lt;T&gt;</code> | the node location to start the search.  By default this is the root node if no node is given. |

<a name="BinaryTree+_minimum"></a>

### binaryTree._minimum(node) ⇒ <code>Node.&lt;T&gt;</code>
From a node searches a tree or subtree for the minimum value in that
(sub)tree.  Note that the property `.smallest` can be used to
quickly retrieve the smallest value in the tree.

**Kind**: instance method of [<code>BinaryTree</code>](#BinaryTree)  
**Returns**: <code>Node.&lt;T&gt;</code> - the smallest node in the (sub)tree.  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Node.&lt;T&gt;</code> | the node location to start the search.  By default this is the root node if no node is given. |

<a name="BinaryTree+_leftRotate"></a>

### binaryTree._leftRotate()
Localized left rotation of nodes.  This is a public function but is private
by convention (for testing).  Generally not called as part of the api.

**Kind**: instance method of [<code>BinaryTree</code>](#BinaryTree)  
<a name="BinaryTree+_rightRotate"></a>

### binaryTree._rightRotate()
Localized right rotation of nodes.  This is a public function but is private
by convention (for testing).  Generally not called as part of the api.

**Kind**: instance method of [<code>BinaryTree</code>](#BinaryTree)  
<a name="BinaryTree+_successor"></a>

### binaryTree._successor(node) ⇒ <code>Node.&lt;T&gt;</code>
The successor of a node is the node with the smallest key greater than
node.data.

**Kind**: instance method of [<code>BinaryTree</code>](#BinaryTree)  
**Returns**: <code>Node.&lt;T&gt;</code> - a reference to the successor node.  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Node.&lt;T&gt;</code> | the node location to start the search for a successor. |

