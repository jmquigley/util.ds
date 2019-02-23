<a name="Deque"></a>

## Deque
A double ended Queue class

**Kind**: global class  

* [Deque](#Deque)
    * [new Deque(maxSize, arr, comparator)](#new_Deque_new)
    * [.overflow](#Deque+overflow) ⇒ <code>boolean</code>
    * [.enqueue(data)](#Deque+enqueue)
    * [.pushFront(data)](#Deque+pushFront)
    * [.pushBack(data)](#Deque+pushBack)
    * [.popFront()](#Deque+popFront) ⇒ <code>Object</code>
    * [.popBack()](#Deque+popBack) ⇒ <code>Object</code>

<a name="new_Deque_new"></a>

### new Deque(maxSize, arr, comparator)
The deque can be unlimited in size (default) or set to a maxium size
when constructed.  When the max size is exceeded, then the front item is
automatically removed from the queue and the new item is placed in the
queue (depending on  which type of insert is calld).


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| maxSize | <code>number</code> | <code>0</code> | The maximum size for this queue. |
| arr | <code>Array.&lt;T&gt;</code> | <code>[</code> | An array of initial input values |
| comparator | <code>function</code> | <code></code> | a comparator function used for searching within the container. |

<a name="Deque+overflow"></a>

### deque.overflow ⇒ <code>boolean</code>
Checks the current internals for an overflow condition.  This occurs
when the maxSize storage size will be exceeded on the next insert
operation.

**Kind**: instance property of [<code>Deque</code>](#Deque)  
**Returns**: <code>boolean</code> - true if in an overflow condition, otherwise false.  
<a name="Deque+enqueue"></a>

### deque.enqueue(data)
Adds an item to the end of the queue.  Checks for an overflow condition
and acts if one is detected.

**Kind**: instance method of [<code>Deque</code>](#Deque)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the data item to add to the queue. |

<a name="Deque+pushFront"></a>

### deque.pushFront(data)
Inserts a data element to the front of the queue.  Checks for an
overflow condition and acts if one is detected.

**Kind**: instance method of [<code>Deque</code>](#Deque)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the data item to add to the queue. |

<a name="Deque+pushBack"></a>

### deque.pushBack(data)
Adds an item to the end of the queue.  Checks for an overflow condition
and acts if one is detected.

**Kind**: instance method of [<code>Deque</code>](#Deque)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the data item to add to the queue. |

<a name="Deque+popFront"></a>

### deque.popFront() ⇒ <code>Object</code>
Returns the first item from the queue and removes it.

**Kind**: instance method of [<code>Deque</code>](#Deque)  
**Returns**: <code>Object</code> - the data value on the front of the queue.  
<a name="Deque+popBack"></a>

### deque.popBack() ⇒ <code>Object</code>
Retrieves the last item from the queue and removes it.

**Kind**: instance method of [<code>Deque</code>](#Deque)  
**Returns**: <code>Object</code> - the data value on the back of the queue.  
