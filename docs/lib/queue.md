<a name="Queue"></a>

## Queue
Simple FIFO queue implementation

**Kind**: global class  

* [Queue](#Queue)
    * [.dequeue()](#Queue+dequeue) ⇒ <code>Object</code>
    * [.drain()](#Queue+drain) ⇒ <code>Array</code>
    * [.eject(data)](#Queue+eject)
    * [.end()](#Queue+end) ⇒ <code>Object</code>
    * [.enqueue(data)](#Queue+enqueue)
    * [.front()](#Queue+front) ⇒ <code>Object</code>
    * [.push(data)](#Queue+push)

<a name="Queue+dequeue"></a>

### queue.dequeue() ⇒ <code>Object</code>
Removes and returns the item at the front of the queue.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
**Returns**: <code>Object</code> - the data at the front of the queue.  
<a name="Queue+drain"></a>

### queue.drain() ⇒ <code>Array</code>
Removes all items from the queue in order and returns them as an
array of data values.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
**Returns**: <code>Array</code> - a list of queue items as an array.  
<a name="Queue+eject"></a>

### queue.eject(data)
Searches the queue for the requested data element and removes it
from the queue.

**Kind**: instance method of [<code>Queue</code>](#Queue)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the data element that should be removed from the queue. |

<a name="Queue+end"></a>

### queue.end() ⇒ <code>Object</code>
Returns a copy of the end location within the queue

**Kind**: instance method of [<code>Queue</code>](#Queue)  
**Returns**: <code>Object</code> - the data element at the end of the queue.  
<a name="Queue+enqueue"></a>

### queue.enqueue(data)
Adds an item to the end of the queue.

**Kind**: instance method of [<code>Queue</code>](#Queue)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the data to insert into the queue. |

<a name="Queue+front"></a>

### queue.front() ⇒ <code>Object</code>
Makes a copy and returns the first item in the queue without removing it

**Kind**: instance method of [<code>Queue</code>](#Queue)  
**Returns**: <code>Object</code> - the data associated with the front of the queue.  
<a name="Queue+push"></a>

### queue.push(data)
Override wrapper for the push function from the inherited stack.  A
stack always pushes to the front.  The general queue should always push
to the end of the structure.

**Kind**: instance method of [<code>Queue</code>](#Queue)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the data to push on the end of the queue. |

