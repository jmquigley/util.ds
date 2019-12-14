import {PriorityQueue} from "../index";

test("Create an empty PriorityQueue", () => {
	const pq = new PriorityQueue<string>();

	expect(pq).toBeDefined();

	pq.enqueue("a", 100);
	pq.enqueue("c", 100);
	pq.enqueue("b", 100);
	pq.enqueue("d", 100);

	expect(pq.size).toBe(4);
	expect(pq.array).toEqual(["a", "c", "b", "d"]);

	expect(pq.dequeue()).toBe("a");
	expect(pq.dequeue()).toBe("c");

	expect(pq.size).toBe(2);
});

test("Test PriorityQueue with different data and priorities and prove order", () => {
	const pq = new PriorityQueue<string>();

	pq.enqueue("a", 100);
	pq.enqueue("b", -20);
	pq.enqueue("c", 10);
	pq.enqueue("d", 1000);
	pq.enqueue("e", 10);

	expect(pq.first.data).toBe("b");
	expect(pq.last.data).toBe("d");
	expect(pq.size).toBe(5);
	expect(pq.array).toEqual(["b", "c", "e", "a", "d"]);

	expect(pq.dequeue()).toBe("b");
	expect(pq.dequeue()).toBe("c");
	expect(pq.dequeue()).toBe("e");

	expect(pq.first.data).toBe("a");
	expect(pq.last.data).toBe("d");
	expect(pq.size).toBe(2);

	pq.enqueue("f", 10);
	pq.enqueue("g", 2000);

	expect(pq.first.data).toBe("f");
	expect(pq.last.data).toBe("g");
	expect(pq.size).toBe(4);

	expect(pq.dequeue()).toBe("f");
	expect(pq.dequeue()).toBe("a");
	expect(pq.dequeue()).toBe("d");
	expect(pq.dequeue()).toBe("g");

	expect(pq.size).toBe(0);
	expect(pq.first).toBe(null);
	expect(pq.last).toBe(null);
	expect(pq.dequeue()).toBe(null);
});

test("Test the PriorityQueue drain method", (done) => {
	const pq = new PriorityQueue<string>();

	expect(pq).toBeDefined();

	pq.enqueue("a", 10);
	pq.enqueue("b", 20);
	pq.enqueue("c", 30);

	expect(pq.size).toBe(3);
	expect(pq.array).toEqual(["a", "b", "c"]);
	expect(pq.first.data).toBe("a");
	expect(pq.last.data).toBe("c");

	pq.on("drain", (arr: any) => {
		expect(arr.length).toBe(3);
		expect(pq.size).toBe(0);
		expect(pq.first).toBe(null);
		expect(pq.last).toBe(null);
		done();
	});

	pq.drain();
});

test("Test the PriorityQueue insert event", (done) => {
	const pq = new PriorityQueue<string>();

	expect(pq).toBeDefined();
	expect(pq.size).toBe(0);

	pq.on("insert", (val: any) => {
		expect(val.data).toBe("a");
		done();
	});

	pq.enqueue("a", 100);
});

test("Test the PriorityQueue remove event", (done) => {
	const pq = new PriorityQueue<string>();

	expect(pq).toBeDefined();
	pq.enqueue("a", 100);
	expect(pq.size).toBe(1);

	pq.on("remove", (val: any) => {
		expect(val.data).toBe("a");
		done();
	});

	expect(pq.dequeue()).toBe("a");
});
