<a name="GeneralTree"></a>

## GeneralTree
Implements a general tree structure

**Kind**: global class  

* [GeneralTree](#GeneralTree)
    * [.dirty](#GeneralTree+dirty) ⇒ <code>boolean</code>
    * [.first](#GeneralTree+first) ⇒ <code>TreeNode.&lt;T&gt;</code>
    * [.height](#GeneralTree+height) ⇒ <code>number</code>
    * [.last](#GeneralTree+last) ⇒ <code>TreeNode.&lt;T&gt;</code>
    * [.testing](#GeneralTree+testing) ⇒ <code>boolean</code>
    * [.treeData](#GeneralTree+treeData) ⇒ <code>Array.&lt;TreeNode.&lt;T&gt;&gt;</code>
    * [.treeData](#GeneralTree+treeData)
    * [.treeIndex](#GeneralTree+treeIndex) ⇒ <code>TreeIndex.&lt;T&gt;</code>
    * [.useindex](#GeneralTree+useindex) ⇒ <code>boolean</code>
    * [.usesanitize](#GeneralTree+usesanitize) ⇒ <code>boolean</code>
    * [.addToIndex(node)](#GeneralTree+addToIndex)
    * [.clear()](#GeneralTree+clear)
    * [.contains()](#GeneralTree+contains) ⇒ <code>boolean</code>
    * [.createNode(node)](#GeneralTree+createNode) ⇒ <code>GeneralTreeItem</code>
    * [.expand(flatNodes)](#GeneralTree+expand)
    * [.find(searchId)](#GeneralTree+find) ⇒ <code>GeneralTreeItem</code>
    * [.findByField(dataToFind)](#GeneralTree+findByField) ⇒ <code>Array.&lt;GeneralTreeItem&gt;</code>
    * [.findByParent(parentId)](#GeneralTree+findByParent) ⇒ <code>Array.&lt;GeneralTreeItem&gt;</code>
    * [.flatten()](#GeneralTree+flatten) ⇒ <code>Array.&lt;GeneralTreeFlat.&lt;T&gt;&gt;</code>
    * [.getNewKey()](#GeneralTree+getNewKey) ⇒ <code>Id</code>
    * [.isIdInChildren(searchId, children)](#GeneralTree+isIdInChildren) ⇒ <code>boolean</code>
    * [.indexInChildren(searchId, children)](#GeneralTree+indexInChildren)
    * [.insert(dataToInsert, asFirstChild, validate)](#GeneralTree+insert) ⇒ <code>GeneralTreeItem.&lt;Node.&lt;T&gt;&gt;</code>
    * [.remove(idToRemove, deleteWithChildren)](#GeneralTree+remove)
    * [.sanitize(node)](#GeneralTree+sanitize) ⇒ <code>TreeNode.&lt;T&gt;</code>
    * [.toString(dynamicDataTCallback)](#GeneralTree+toString) ⇒ <code>string</code>
    * [.walk(fn)](#GeneralTree+walk)

<a name="GeneralTree+dirty"></a>

### generalTree.dirty ⇒ <code>boolean</code>
**Kind**: instance property of [<code>GeneralTree</code>](#GeneralTree)  
**Returns**: <code>boolean</code> - true if the tree has been changed before the last walk operation  
<a name="GeneralTree+first"></a>

### generalTree.first ⇒ <code>TreeNode.&lt;T&gt;</code>
**Kind**: instance property of [<code>GeneralTree</code>](#GeneralTree)  
**Returns**: <code>TreeNode.&lt;T&gt;</code> - a reference to the first item in the tree and null if empty.  
<a name="GeneralTree+height"></a>

### generalTree.height ⇒ <code>number</code>
**Kind**: instance property of [<code>GeneralTree</code>](#GeneralTree)  
**Returns**: <code>number</code> - the depth of the tree  
<a name="GeneralTree+last"></a>

### generalTree.last ⇒ <code>TreeNode.&lt;T&gt;</code>
**Kind**: instance property of [<code>GeneralTree</code>](#GeneralTree)  
**Returns**: <code>TreeNode.&lt;T&gt;</code> - a reference to the last item in the tree and null if empty.  
<a name="GeneralTree+testing"></a>

### generalTree.testing ⇒ <code>boolean</code>
**Kind**: instance property of [<code>GeneralTree</code>](#GeneralTree)  
**Returns**: <code>boolean</code> - returns true if the module is under test, otherwise false  
<a name="GeneralTree+treeData"></a>

### generalTree.treeData ⇒ <code>Array.&lt;TreeNode.&lt;T&gt;&gt;</code>
**Kind**: instance property of [<code>GeneralTree</code>](#GeneralTree)  
**Returns**: <code>Array.&lt;TreeNode.&lt;T&gt;&gt;</code> - a reference to the current tree array structure  
<a name="GeneralTree+treeData"></a>

### generalTree.treeData
Sets the internal representation of the tree structure array to a new array.
Generally this should not be used, but this is exposed for use in another
3rd party library to allow it access to change the struccture (react treeview)

**Kind**: instance property of [<code>GeneralTree</code>](#GeneralTree)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>Array.&lt;TreeNode.&lt;T&gt;&gt;</code> | the new array of nodes to make as the new tree |

<a name="GeneralTree+treeIndex"></a>

### generalTree.treeIndex ⇒ <code>TreeIndex.&lt;T&gt;</code>
**Kind**: instance property of [<code>GeneralTree</code>](#GeneralTree)  
**Returns**: <code>TreeIndex.&lt;T&gt;</code> - a reference to the that holdes the id/node index relationship  
<a name="GeneralTree+useindex"></a>

### generalTree.useindex ⇒ <code>boolean</code>
**Kind**: instance property of [<code>GeneralTree</code>](#GeneralTree)  
**Returns**: <code>boolean</code> - if true, then the index is being used by the tree  
<a name="GeneralTree+usesanitize"></a>

### generalTree.usesanitize ⇒ <code>boolean</code>
**Kind**: instance property of [<code>GeneralTree</code>](#GeneralTree)  
**Returns**: <code>boolean</code> - if true, then nodes within the tree will be sanitized when the
walk routine is used.  This will ensure that all key fields are present within a
node.  This is important when the .treeData function can opverride the current
array.  The sanitize is used to ensure tree integrity.  
<a name="GeneralTree+addToIndex"></a>

### generalTree.addToIndex(node)
Convenience method for adding a node to the index.

**Kind**: instance method of [<code>GeneralTree</code>](#GeneralTree)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>TreeNode.&lt;T&gt;</code> | a reference to the node to insert into the index |

<a name="GeneralTree+clear"></a>

### generalTree.clear()
Resets the tree.  This will clear out the current tree arrayu and all
reference pointers to first/last and the current index.

**Kind**: instance method of [<code>GeneralTree</code>](#GeneralTree)  
<a name="GeneralTree+contains"></a>

### generalTree.contains() ⇒ <code>boolean</code>
Searches through all of the nodes to see if they contain the given
search field data.  This works like findByField.  This function
wraps that method and checks if it returned anyting.

**Kind**: instance method of [<code>GeneralTree</code>](#GeneralTree)  
**Returns**: <code>boolean</code> - true if the dat fields are found within the
tree, otherwise false.  
<a name="GeneralTree+createNode"></a>

### generalTree.createNode(node) ⇒ <code>GeneralTreeItem</code>
Creates a new node object with the given node properties as
a parameter.  The given properties are merged into the newly
created node.

**Kind**: instance method of [<code>GeneralTree</code>](#GeneralTree)  
**Returns**: <code>GeneralTreeItem</code> - a new node instance reference  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>GeneralTreeItem</code> | the node fields to assign to the new node object |

<a name="GeneralTree+expand"></a>

### generalTree.expand(flatNodes)
Takes a 1D array, created by the flatten function, and expands it into
the tree.  The current tree is replaced by this expanded tree.

**Kind**: instance method of [<code>GeneralTree</code>](#GeneralTree)  

| Param | Type | Description |
| --- | --- | --- |
| flatNodes | <code>Array.&lt;GeneralFlatTree.&lt;T&gt;&gt;</code> | the array of flattened nodes that will be used to expand the tree. |

<a name="GeneralTree+find"></a>

### generalTree.find(searchId) ⇒ <code>GeneralTreeItem</code>
Performs a breadth search of the tree for a matching id value.  If
the item has been seen before, then it is retrieved from an index (if
useindex is set to true).

**Kind**: instance method of [<code>GeneralTree</code>](#GeneralTree)  
**Returns**: <code>GeneralTreeItem</code> - of the item found otherwise null  

| Param | Type | Description |
| --- | --- | --- |
| searchId | <code>Id</code> | the id value to search for in the tree |

<a name="GeneralTree+findByField"></a>

### generalTree.findByField(dataToFind) ⇒ <code>Array.&lt;GeneralTreeItem&gt;</code>
Searches every node in the tree for data matching the given search critera
in the dataToFind parameter.  The comparator defined when the class
is instantiated is used to compare the dataToFind against each node in the
tree.  Every node that is found is placed into an array and that
array is returned to the caller.

**Kind**: instance method of [<code>GeneralTree</code>](#GeneralTree)  
**Returns**: <code>Array.&lt;GeneralTreeItem&gt;</code> - an array of tree nodes that match
the search criteria.  If no nodes are found, then an empty array is
returned.  

| Param | Type | Description |
| --- | --- | --- |
| dataToFind | <code>T</code> | the input data matching the template fields for the tree. |

<a name="GeneralTree+findByParent"></a>

### generalTree.findByParent(parentId) ⇒ <code>Array.&lt;GeneralTreeItem&gt;</code>
Retrieves the list of nodes associated with the given parent key.
This is basically get all of the children associated with the
given parent ID value.

**Kind**: instance method of [<code>GeneralTree</code>](#GeneralTree)  
**Returns**: <code>Array.&lt;GeneralTreeItem&gt;</code> - - all of the children associated with
the given parent.  If there are no children, then an empty array
is returned.  

| Param | Type | Description |
| --- | --- | --- |
| parentId | <code>Id</code> | the parent id key value field to search for. |

<a name="GeneralTree+flatten"></a>

### generalTree.flatten() ⇒ <code>Array.&lt;GeneralTreeFlat.&lt;T&gt;&gt;</code>
Walks through the tree data and flattens it into a 1D array of nodes.
This flatten can be reversed using the expand function.

**Kind**: instance method of [<code>GeneralTree</code>](#GeneralTree)  
**Returns**: <code>Array.&lt;GeneralTreeFlat.&lt;T&gt;&gt;</code> - an array of nodes representing the
tree and its parent/child key relationship.  
<a name="GeneralTree+getNewKey"></a>

### generalTree.getNewKey() ⇒ <code>Id</code>
Generates a new unique key for a node.  When the testing flag is set
to true, then the id is an ordered sequence.  This is done to make
the keys predictable when the code is under test.

**Kind**: instance method of [<code>GeneralTree</code>](#GeneralTree)  
**Returns**: <code>Id</code> - the new key value.  
<a name="GeneralTree+isIdInChildren"></a>

### generalTree.isIdInChildren(searchId, children) ⇒ <code>boolean</code>
Takes a child array and and id and searches the array for the existence
of that id within it.

**Kind**: instance method of [<code>GeneralTree</code>](#GeneralTree)  
**Returns**: <code>boolean</code> - true if the id was found in the array, otherise false.  

| Param | Type | Description |
| --- | --- | --- |
| searchId | <code>Id</code> | the id value to use in the search |
| children | <code>Array.&lt;TreeNode.&lt;T&gt;&gt;</code> | child array to search for an id |

<a name="GeneralTree+indexInChildren"></a>

### generalTree.indexInChildren(searchId, children)
Searches the current child list for an id and returns the index location
within the child list where it is at.  If it is not found, then the
index is -1.

**Kind**: instance method of [<code>GeneralTree</code>](#GeneralTree)  
**Reutrn**: <code>number</code> the index location of the child within the array. A
-1 is returned if not found.  

| Param | Type | Description |
| --- | --- | --- |
| searchId | <code>Id</code> | the id value to use in the search |
| children | <code>Array.&lt;TreeNode.&lt;T&gt;&gt;</code> | child array to search for an id |

<a name="GeneralTree+insert"></a>

### generalTree.insert(dataToInsert, asFirstChild, validate) ⇒ <code>GeneralTreeItem.&lt;Node.&lt;T&gt;&gt;</code>
Inserts a new node into the general tree.

**Kind**: instance method of [<code>GeneralTree</code>](#GeneralTree)  
**Returns**: <code>GeneralTreeItem.&lt;Node.&lt;T&gt;&gt;</code> - a reference to the new node that was
inserted into the tree.  On error this is null (with a corresponding
warning message).  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dataToInsert | <code>TreeNode.&lt;T&gt;</code> |  | the config information for the node that will be inserted (note that this is NOT the node inserted).  Generally the parentId is used to determine where it will be inserted. |
| asFirstChild | <code>boolean</code> | <code>true</code> | determines what end of the child array will be used when adding the new node to the tree.  If true, then the new node is inserted at the beginning of the array, otherise at the end.  The default behavior is the front. |
| validate | <code>boolean</code> | <code>false</code> | if true, then validate .id values on the input config data to ensure no duplidates. |

<a name="GeneralTree+remove"></a>

### generalTree.remove(idToRemove, deleteWithChildren)
Removes a node from the tree.  If the node is a parent with
children, then the `deleteWithChildren` flag can be used to
stop the delete process if children are present.  This is allowed
by default (so deleting a parent deletes its children).  When this
flag is true, then the delete would not be allowed until all of the
children are deleted first.  The delete operations are expensive
because a re-walk of the tree is required to fix indexing and
first/last pointers.

**Kind**: instance method of [<code>GeneralTree</code>](#GeneralTree)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| idToRemove | <code>Id</code> |  | the id value of the node to remove |
| deleteWithChildren | <code>boolean</code> | <code>false</code> | if true, then a parent with children cannot be deleted until all children are removed. |

<a name="GeneralTree+sanitize"></a>

### generalTree.sanitize(node) ⇒ <code>TreeNode.&lt;T&gt;</code>
Takes an input node and ensures that it has all key fields.	 It
also creates the node key value if one does not exist.

**Kind**: instance method of [<code>GeneralTree</code>](#GeneralTree)  
**Returns**: <code>TreeNode.&lt;T&gt;</code> - a referece back of the node that was sanitized  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>TreeNode.&lt;T&gt;</code> | the node to fix |

<a name="GeneralTree+toString"></a>

### generalTree.toString(dynamicDataTCallback) ⇒ <code>string</code>
Iterates through all of the nodes and concatenates them into a string.
Only prints the relevant key information from the tree.  This also
takes a callback function sent by the user to deal with the template
data that may be part of the tree nodes.  The internals of the tree
can't know the T value(s) while running.  This callback will
receive a reference to the node being printed.  The caller can then
use this to print the T values it passed into the tree.

**Kind**: instance method of [<code>GeneralTree</code>](#GeneralTree)  
**Returns**: <code>string</code> - the string representing the keys and T data in the
general tree.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dynamicDataTCallback | <code>ToStringCallback.&lt;T&gt;</code> | <code></code> | a function that can process the tempate data T and return a string representation of it. |

<a name="GeneralTree+walk"></a>

### generalTree.walk(fn)
Performs an inorder traversal of the current tree.  At each node
a callback function is executed and the node being processed
is given as a parameter.

**Kind**: instance method of [<code>GeneralTree</code>](#GeneralTree)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>WalkCallback.&lt;T&gt;</code> | a callback function invoked on each node as it is encountered. |

