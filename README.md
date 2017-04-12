# util.ds [![Build Status](https://travis-ci.org/jmquigley/util.ds.svg?branch=master)](https://travis-ci.org/jmquigley/util.ds) [![tslint code style](https://img.shields.io/badge/code_style-TSlint-5ed9c7.svg)](https://palantir.github.io/tslint/) [![Test Runner](https://img.shields.io/badge/testing-ava-blue.svg)](https://github.com/avajs/ava) [![NPM](https://img.shields.io/npm/v/util.ds.svg)](https://www.npmjs.com/package/util.ds) [![Coverage Status](https://coveralls.io/repos/github/jmquigley/util.ds/badge.svg?branch=master)](https://coveralls.io/github/jmquigley/util.ds?branch=master)

> Simple data structures

This module contains my implementation of a few basic data structures using [Typescript](https://www.typescriptlang.org/).  I could have used other implementations, but what fun is that. 

It Contains the following data structures:

- [Stack](docs/stack.md)
- [Queue](docs/queue.md)
- [Deque](docs/deque.md)


## Installation

To install as an application dependency:
```
$ npm install --save util.ds
```

To build the app and run all tests:
```
$ npm run all
```


## Usage

### Stack
To create a simple stack use:

```javascript
const Stack = require('util.ds');

let stack = new Stack();

stack.push(1);
let val = stack.pop();
````

When an element is added to the stack an `add` event fires.  When an element is removed from the stack a `remove` event fires.

### Queue
To create a simple queue use:

```javascript
const Queue = require('util.ds');

let q = new Queue();

q.enqueue(1);
let val = q.dequeue();
```

When an element is added to the queue an `add` event fires.  When an element is removed from the queue a `remove` event fires.

### Deque
A deque is a double ended queue.  An element can be inserted at either end of the queue.

```javascript
const Deque = require('util.ds');

let q = new Deque();

q.enqueue(1);
let val = q.dequeue();
```

This example works like a typical queue.  However this type allows one to add items at either end.  

When an element is added to the deque an `add` event fires.  When an element is removed from the deque a `remove` event fires.

The deque can have items added to either end:

```javascript
const Deque = require('util.ds');

let q = new Deque();

q.pushFront(1);
q.pushBack(2);

let val = q.popFront();
val = q.popBack();
```

A deque can also be limited in size:

```javascript
const Deque = require('util.ds');

let q = new Deque(5);
for (let i: number = 0; i < 5; i++) {
	q.enqueue(i);
}

q.enqueue(6);
```

This will add 5 items to the queue.  The last item adds a 6th element.  That will cause the first item in the queue to be removed automatically before the new item is enqueued.  This provides a way to "age" items within the queue.  When the item is removed a `remove` event fires.  The front item in the queue is considered the oldest item.

## API

The API is generated with [JSDoc](https://www.npmjs.com/package/jsdoc).  It can be found within the `docs` directory for the project.  It can be generated with `npm run docs`.
