<a name="PriorityQueue"></a>

## PriorityQueue
A simple priority queue.  Items are inserted into a queue structure with an
associatd priority number.  The lower the number, the higher the priority.
Items with a higher priority are chosen first in the queue.

Priority values are numbers > 0.  If a negative number is given, then it
will be given a priority of 0.

The implementation is a Red/Black tree.  That makes getting the lowest
value from a set of values an O(1) operation; we always know the smallest
value inserted into the tree.

**Kind**: global class  

* [PriorityQueue](#PriorityQueue)
    * [.array](#PriorityQueue+array) ⇒ <code>Array.&lt;T&gt;</code>
    * [.clear()](#PriorityQueue+clear)
    * [.dequeue()](#PriorityQueue+dequeue) ⇒ <code>T</code>
    * [.drain()](#PriorityQueue+drain) ⇒ <code>Array.&lt;T&gt;</code>
    * [.enqueue(data, priority)](#PriorityQueue+enqueue)

<a name="PriorityQueue+array"></a>

### priorityQueue.array ⇒ <code>Array.&lt;T&gt;</code>
**Kind**: instance property of [<code>PriorityQueue</code>](#PriorityQueue)  
**Returns**: <code>Array.&lt;T&gt;</code> - an array of values in the queue in priority order.  This
does not change the queue.  
<a name="PriorityQueue+clear"></a>

### priorityQueue.clear()
Clears the queue and resets the internals.

**Kind**: instance method of [<code>PriorityQueue</code>](#PriorityQueue)  
<a name="PriorityQueue+dequeue"></a>

### priorityQueue.dequeue() ⇒ <code>T</code>
Retrieves the highest priority item from the queue and returns it.

**Kind**: instance method of [<code>PriorityQueue</code>](#PriorityQueue)  
**Returns**: <code>T</code> - the data with the highest priority.  If no data is available
then null is returned;  
<a name="PriorityQueue+drain"></a>

### priorityQueue.drain() ⇒ <code>Array.&lt;T&gt;</code>
Removes all items from the queue in order and returns them as an
array of data values.

**Kind**: instance method of [<code>PriorityQueue</code>](#PriorityQueue)  
**Returns**: <code>Array.&lt;T&gt;</code> - a list of queue items as an array.  
<a name="PriorityQueue+enqueue"></a>

### priorityQueue.enqueue(data, priority)
Adds an item to the queue in priority order.  Items of the same priority
are sorted by insertion order.  The lower number represents higher
priority.

**Kind**: instance method of [<code>PriorityQueue</code>](#PriorityQueue)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>T</code> | the data element to add to the queue |
| priority | <code>number</code> | a number >= 0 that sets the priority of the item in the queue. |

