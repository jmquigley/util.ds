<a name="Collection"></a>

## Collection
**Kind**: global class  

* [Collection](#Collection)
    * [new Collection(comparator)](#new_Collection_new)
    * [.back](#Collection+back) ⇒ <code>T</code>
    * [.empty](#Collection+empty) ⇒ <code>boolean</code>
    * [.first](#Collection+first) ⇒ <code>T</code>
    * [.front](#Collection+front) ⇒ <code>T</code>
    * [.last](#Collection+last) ⇒ <code>T</code>
    * [.length](#Collection+length) ⇒ <code>number</code>
    * [.nil](#Collection+nil) ⇒ <code>Node.&lt;T&gt;</code>
    * [.root](#Collection+root) ⇒ <code>Node.&lt;T&gt;</code>
    * [.size](#Collection+size) ⇒ <code>number</code>
    * [.clear()](#Collection+clear)
    * [.contains(obj)](#Collection+contains) ⇒ <code>boolean</code>
    * [.isEmpty()](#Collection+isEmpty) ⇒ <code>boolean</code>

<a name="new_Collection_new"></a>

### new Collection(comparator)
Base class constructor for all collection classes.

**Params**

- comparator <code>function</code> <code> = </code> - a comparator function used for searching within
the container.

<a name="Collection+back"></a>

### collection.back ⇒ <code>T</code>
**Kind**: instance property of [<code>Collection</code>](#Collection)  
**Returns**: <code>T</code> - the last (max) data element from the tree.  
<a name="Collection+empty"></a>

### collection.empty ⇒ <code>boolean</code>
**Kind**: instance property of [<code>Collection</code>](#Collection)  
**Returns**: <code>boolean</code> - return true if the list has no nodes, otherwise false  
<a name="Collection+first"></a>

### collection.first ⇒ <code>T</code>
**Kind**: instance property of [<code>Collection</code>](#Collection)  
**Returns**: <code>T</code> - the first (min) data element from the tree.  
<a name="Collection+front"></a>

### collection.front ⇒ <code>T</code>
**Kind**: instance property of [<code>Collection</code>](#Collection)  
**Returns**: <code>T</code> - the front (min) data element from the tree.  
<a name="Collection+last"></a>

### collection.last ⇒ <code>T</code>
**Kind**: instance property of [<code>Collection</code>](#Collection)  
**Returns**: <code>T</code> - the last (max) data element from the tree.  
<a name="Collection+length"></a>

### collection.length ⇒ <code>number</code>
**Kind**: instance property of [<code>Collection</code>](#Collection)  
**Returns**: <code>number</code> - the number of nodes in this collection  
<a name="Collection+nil"></a>

### collection.nil ⇒ <code>Node.&lt;T&gt;</code>
**Kind**: instance property of [<code>Collection</code>](#Collection)  
**Returns**: <code>Node.&lt;T&gt;</code> - the reference to the nil sentinel  
<a name="Collection+root"></a>

### collection.root ⇒ <code>Node.&lt;T&gt;</code>
**Kind**: instance property of [<code>Collection</code>](#Collection)  
**Returns**: <code>Node.&lt;T&gt;</code> - the front/first node in the collection  
<a name="Collection+size"></a>

### collection.size ⇒ <code>number</code>
**Kind**: instance property of [<code>Collection</code>](#Collection)  
**Returns**: <code>number</code> - the number of nodes in this collection  
<a name="Collection+clear"></a>

### collection.clear()
Initializes the object to an empty state

**Kind**: instance method of [<code>Collection</code>](#Collection)  
<a name="Collection+contains"></a>

### collection.contains(obj) ⇒ <code>boolean</code>
Checks the container for the existence of a given object.  This is
a simple linear search.

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>boolean</code> - true if the item is found, otherwise false.  
**Params**

- obj <code>Object</code> - the item to find in the container.

<a name="Collection+isEmpty"></a>

### collection.isEmpty() ⇒ <code>boolean</code>
Checks if the container is empty.

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>boolean</code> - true if the container is empty, otherwise false.  
