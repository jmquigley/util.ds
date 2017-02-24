<a name="Collection"></a>

## Collection
**Kind**: global class  

* [Collection](#Collection)
    * [new Collection(cmp)](#new_Collection_new)
    * [.clear()](#Collection+clear)
    * [.contains(obj)](#Collection+contains) ⇒ <code>boolean</code>
    * [.isEmpty()](#Collection+isEmpty) ⇒ <code>boolean</code>

<a name="new_Collection_new"></a>

### new Collection(cmp)
Base class constructor for all collection classes.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cmp | <code>function</code> | <code></code> | a comparator function used for searching within the container. |

<a name="Collection+clear"></a>

### collection.clear()
Initializes the object to an empty state

**Kind**: instance method of <code>[Collection](#Collection)</code>  
<a name="Collection+contains"></a>

### collection.contains(obj) ⇒ <code>boolean</code>
Checks the container for the existence of a given object.  This is
a simple linear search.

**Kind**: instance method of <code>[Collection](#Collection)</code>  
**Returns**: <code>boolean</code> - true if the item is found, otherwise false.  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | the item to find in the container. |

<a name="Collection+isEmpty"></a>

### collection.isEmpty() ⇒ <code>boolean</code>
Checks if the container is empty.

**Kind**: instance method of <code>[Collection](#Collection)</code>  
**Returns**: <code>boolean</code> - true if the container is empty, otherwise false.  
