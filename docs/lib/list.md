<a name="List"></a>

## List
A doubly linked list structure.

**Kind**: global class  

* [List](#List)
    * [.array](#List+array) ⇒ <code>Array.&lt;T&gt;</code>
    * [.reverse](#List+reverse) ⇒ <code>Array.&lt;T&gt;</code>
    * [.find(key)](#List+find) ⇒ <code>T</code>
    * [.insert(data, idx)](#List+insert)
    * [.remove(data, [idx])](#List+remove) ⇒ <code>T</code>
    * [._getNodeByValue(data)](#List+_getNodeByValue) ⇒ <code>Node.&lt;T&gt;</code>
    * [._getNodeByIndex(idx)](#List+_getNodeByIndex) ⇒ <code>Node.&lt;T&gt;</code>

<a name="List+array"></a>

### list.array ⇒ <code>Array.&lt;T&gt;</code>
**Kind**: instance property of [<code>List</code>](#List)  
**Returns**: <code>Array.&lt;T&gt;</code> - an inorder array of all elements in the list  
<a name="List+reverse"></a>

### list.reverse ⇒ <code>Array.&lt;T&gt;</code>
**Kind**: instance property of [<code>List</code>](#List)  
**Returns**: <code>Array.&lt;T&gt;</code> - a reversed array of all elements in the list  
<a name="List+find"></a>

### list.find(key) ⇒ <code>T</code>
Searches the list for an element.  If it is found, then the data element
associated with that node is returned (not the node).  When used with a
primative type this is not useful as the key and the value found would
be the same.  This is helpful when T is a complex object with a custom
Comparator.

**Kind**: instance method of [<code>List</code>](#List)  
**Returns**: <code>T</code> - the full data element within this list.  If it is not found,
then null is returned.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>T</code> | a search key to look for in the list. |

<a name="List+insert"></a>

### list.insert(data, idx)
Inserts a data value into a linked list.  The default operation is to
insert into the end of the list.

**Kind**: instance method of [<code>List</code>](#List)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>T</code> | the data item to insert into the list |
| idx | <code>number</code> | the index position where the item will be inserted. this number be List.FRONT, List.BACK, or any other number. |

<a name="List+remove"></a>

### list.remove(data, [idx]) ⇒ <code>T</code>
Removes an element from the list.

**Kind**: instance method of [<code>List</code>](#List)  
**Returns**: <code>T</code> - the data element that was deleted  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>T</code> |  | the data item removed from the list |
| [idx] | <code>number</code> | <code></code> | the position index to remove from the list |

<a name="List+_getNodeByValue"></a>

### list._getNodeByValue(data) ⇒ <code>Node.&lt;T&gt;</code>
Iterates through the list and find the node associated with a key
value T.

**Kind**: instance method of [<code>List</code>](#List)  
**Returns**: <code>Node.&lt;T&gt;</code> - a reference to the node that was found.  If a node
is not found, then null is returned.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>T</code> | the key value or index to search for in the list. |

<a name="List+_getNodeByIndex"></a>

### list._getNodeByIndex(idx) ⇒ <code>Node.&lt;T&gt;</code>
Moves to a position within the list and finds the node associated
with that index.

**Kind**: instance method of [<code>List</code>](#List)  
**Returns**: <code>Node.&lt;T&gt;</code> - a reference to a node a the given position.  If the
node is not found, then null is returned.  

| Param | Type | Description |
| --- | --- | --- |
| idx | <code>number</code> | the location within the list to find |

