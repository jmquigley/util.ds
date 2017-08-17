<a name="BinaryTree"></a>

## BinaryTree
Implements a binary tree structure using a Red/Black tree algorithm.

**Kind**: global class  

* [BinaryTree](#BinaryTree)
    * [.breadth](#BinaryTree+breadth) ⇒ <code>Array.&lt;T&gt;</code>
    * [.height](#BinaryTree+height) ⇒ <code>number</code>
    * [.inorder](#BinaryTree+inorder) ⇒ <code>Array.&lt;T&gt;</code>
    * [.postorder](#BinaryTree+postorder) ⇒ <code>Array.&lt;T&gt;</code>
    * [.preorder](#BinaryTree+preorder) ⇒ <code>Array.&lt;T&gt;</code>
    * [.breadthSearch(data, node)](#BinaryTree+breadthSearch) ⇒ <code>boolean</code>
    * [.clear()](#BinaryTree+clear)
    * [.contains(data)](#BinaryTree+contains) ⇒ <code>boolean</code>
    * [.find(key)](#BinaryTree+find) ⇒ <code>T</code>
    * [.insert(data)](#BinaryTree+insert)
    * [.remove(data)](#BinaryTree+remove)
    * [.removeFirst()](#BinaryTree+removeFirst) ⇒ <code>T</code>
    * [.removeLast()](#BinaryTree+removeLast) ⇒ <code>T</code>
    * [._findNode(data)](#BinaryTree+_findNode) ⇒ <code>Node.&lt;T&gt;</code>
    * [._leftRotate()](#BinaryTree+_leftRotate)
    * [._maximum(node)](#BinaryTree+_maximum) ⇒ <code>Node.&lt;T&gt;</code>
    * [._minimum(node)](#BinaryTree+_minimum) ⇒ <code>Node.&lt;T&gt;</code>
    * [._rightRotate()](#BinaryTree+_rightRotate)
    * [._successor(node)](#BinaryTree+_successor) ⇒ <code>Node.&lt;T&gt;</code>

<a name="BinaryTree+breadth"></a>

### binaryTree.breadth ⇒ <code>Array.&lt;T&gt;</code>
Performs a breadth first traversal of the tree and saves it to an array
of T type (of the tree).  The array of data is returned.  Don't use this
with a large tree.

**Kind**: instance property of [<code>BinaryTree</code>](#BinaryTree)  
**Returns**: <code>Array.&lt;T&gt;</code> - an array of all elements in the tree in breadth order  
<a name="BinaryTree+height"></a>

### binaryTree.height ⇒ <code>number</code>
**Kind**: instance property of [<code>BinaryTree</code>](#BinaryTree)  
**Returns**: <code>number</code> - computes and returns the height of the tree.  
<a name="BinaryTree+inorder"></a>

### binaryTree.inorder ⇒ <code>Array.&lt;T&gt;</code>
**Kind**: instance property of [<code>BinaryTree</code>](#BinaryTree)  
**Returns**: <code>Array.&lt;T&gt;</code> - the results of an inorder traversal of the tree.  The
results are stored in an array and returned.  
<a name="BinaryTree+postorder"></a>

### binaryTree.postorder ⇒ <code>Array.&lt;T&gt;</code>
**Kind**: instance property of [<code>BinaryTree</code>](#BinaryTree)  
**Returns**: <code>Array.&lt;T&gt;</code> - the results of a postorder traversal of the tree.  The
results are stored in an array and returned.  
<a name="BinaryTree+preorder"></a>

### binaryTree.preorder ⇒ <code>Array.&lt;T&gt;</code>
**Kind**: instance property of [<code>BinaryTree</code>](#BinaryTree)  
**Returns**: <code>Array.&lt;T&gt;</code> - the results of a preorder traversal of the tree.  The
results are stored in an array and returned.  
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

<a name="BinaryTree+clear"></a>

### binaryTree.clear()
Initializes the object to an emtpy state.  This can be used to
quickly empty the tree and start over.

**Kind**: instance method of [<code>BinaryTree</code>](#BinaryTree)  
<a name="BinaryTree+contains"></a>

### binaryTree.contains(data) ⇒ <code>boolean</code>
Performs a typically binary search through the tree.

**Kind**: instance method of [<code>BinaryTree</code>](#BinaryTree)  
**Returns**: <code>boolean</code> - true if the item is found in the tree, otherwise
false is returned.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>T</code> | the data element to search for (based on the data type of the tree) |

<a name="BinaryTree+find"></a>

### binaryTree.find(key) ⇒ <code>T</code>
Searches the tree for an element.  If it is found, then the data element
associated with that node is returned (not the node).  When used with a
primative type this is not useful as the key and the value found would
be the same.  This is helpful when T is a complex object with a custom
Comparator.

**Kind**: instance method of [<code>BinaryTree</code>](#BinaryTree)  
**Returns**: <code>T</code> - the full data element within this tree.  If it is not found,
then null is returned.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>T</code> | a search key to look for in the tree. |

<a name="BinaryTree+insert"></a>

### binaryTree.insert(data)
Inserts a data element into the tree.

**Kind**: instance method of [<code>BinaryTree</code>](#BinaryTree)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>T</code> | the data element to insert into the tree |

<a name="BinaryTree+remove"></a>

### binaryTree.remove(data)
Removes the given data value from the tree.

**Kind**: instance method of [<code>BinaryTree</code>](#BinaryTree)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>T</code> | the data value to remove |

<a name="BinaryTree+removeFirst"></a>

### binaryTree.removeFirst() ⇒ <code>T</code>
Special case function to quickly find and remove the first item in the
tree.

**Kind**: instance method of [<code>BinaryTree</code>](#BinaryTree)  
**Returns**: <code>T</code> - the data element that was first and removed from the tree.  
<a name="BinaryTree+removeLast"></a>

### binaryTree.removeLast() ⇒ <code>T</code>
Special case function to quickly find and remove the last item in the
tree.

**Kind**: instance method of [<code>BinaryTree</code>](#BinaryTree)  
**Returns**: <code>T</code> - the data element that was last and removed from the tree.  
<a name="BinaryTree+_findNode"></a>

### binaryTree._findNode(data) ⇒ <code>Node.&lt;T&gt;</code>
Searches the tree for a specific node within the tree.

**Kind**: instance method of [<code>BinaryTree</code>](#BinaryTree)  
**Returns**: <code>Node.&lt;T&gt;</code> - if the data is found, then the node that holds it is
returned.  If it is not found, then nil is returned.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>T</code> | the data value to search for in the tree. |

<a name="BinaryTree+_leftRotate"></a>

### binaryTree._leftRotate()
Localized left rotation of nodes.  This is a public function but is private
by convention (for testing).  Generally not called as part of the api.

**Kind**: instance method of [<code>BinaryTree</code>](#BinaryTree)  
<a name="BinaryTree+_maximum"></a>

### binaryTree._maximum(node) ⇒ <code>Node.&lt;T&gt;</code>
Searches a tree from a given node for the maximum value in that
(sub)tree.  Note that the property `.largest` can be used to
quickly retrieve the largest value in the tree.  This is really used
to recompute the maximum value when it is removed from the tree.

**Kind**: instance method of [<code>BinaryTree</code>](#BinaryTree)  
**Returns**: <code>Node.&lt;T&gt;</code> - the largest node in the (sub)tree.  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Node.&lt;T&gt;</code> | the node location to start the search.  By default this is the root node if no node is given. |

<a name="BinaryTree+_minimum"></a>

### binaryTree._minimum(node) ⇒ <code>Node.&lt;T&gt;</code>
From a node, searches a tree or subtree for the minimum value in that
(sub)tree.  Note that the property `.smallest` can be used to
quickly retrieve the smallest value in the tree.  This is really used
to recompute the minimum value when it is removed from the tree.

**Kind**: instance method of [<code>BinaryTree</code>](#BinaryTree)  
**Returns**: <code>Node.&lt;T&gt;</code> - the smallest node in the (sub)tree.  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Node.&lt;T&gt;</code> | the node location to start the search.  By default this is the root node if no node is given. |

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

