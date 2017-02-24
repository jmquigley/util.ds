<a name="Stack"></a>

## Stack
Simple stack class

**Kind**: global class  

* [Stack](#Stack)
    * [.peek()](#Stack+peek) ⇒ <code>Object</code>
    * [.push(data)](#Stack+push)
    * [.pop()](#Stack+pop) ⇒ <code>Object</code>
    * [.top()](#Stack+top) ⇒ <code>Object</code>

<a name="Stack+peek"></a>

### stack.peek() ⇒ <code>Object</code>
A convenience method for calling top.

**Kind**: instance method of <code>[Stack](#Stack)</code>  
**Returns**: <code>Object</code> - the data element at the top of the stack  
<a name="Stack+push"></a>

### stack.push(data)
Puts a data element on the top of the stack

**Kind**: instance method of <code>[Stack](#Stack)</code>  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | any data element the user wants to store |

<a name="Stack+pop"></a>

### stack.pop() ⇒ <code>Object</code>
Retrieves the top item from the stack and returns it.

**Kind**: instance method of <code>[Stack](#Stack)</code>  
**Returns**: <code>Object</code> - the data element at the top of the stack.  
<a name="Stack+top"></a>

### stack.top() ⇒ <code>Object</code>
Retrieves the data element at the top of the stack without removing
it.  This clones the object so that changes will not affect what is
actually on the top of the stack.

**Kind**: instance method of <code>[Stack](#Stack)</code>  
**Returns**: <code>Object</code> - a reference to the data element at the top of the
stack.  
