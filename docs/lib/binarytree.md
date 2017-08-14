<a name="BinaryTree"></a>

## BinaryTree
Implements a binary tree structure using a Red/Black tree algorithm.

http://staff.ustc.edu.cn/~csli/graduate/algorithms/book6/chap14.htm

**Kind**: global class  

* [BinaryTree](#BinaryTree)
    * [.breadth(node)](#BinaryTree+breadth) ⇒ <code>Array.&lt;T&gt;</code>
    * [.breadthSearch(data, node)](#BinaryTree+breadthSearch) ⇒ <code>boolean</code>
    * [.contains(data)](#BinaryTree+contains) ⇒ <code>boolean</code>
    * [._leftRotate()](#BinaryTree+_leftRotate)
    * [._rightRotate()](#BinaryTree+_rightRotate)

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
