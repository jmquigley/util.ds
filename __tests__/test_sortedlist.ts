"use strict";

import {SortedList} from "../index";

test("Create an empty SortedList", () => {
	const list = new SortedList<string>();

	expect(list).toBeDefined();
	expect(list.size).toBe(0);

	list.insert("b");
	list.insert("a");
	list.insert("c");
	list.insert("e");
	list.insert("d");
	list.insert(null);

	expect(list.size).toBe(5);
	expect(list.array).toEqual(["a", "b", "c", "d", "e"]);
	expect(list.front).toBe("a");
	expect(list.back).toBe("e");

	list.insert("f");
	expect(list.back).toBe("f");

	list.remove("f");
	expect(list.back).toBe("e");

	list.remove("a");
	expect(list.front).toBe("b");

	list.insert("a");
	expect(list.front).toBe("a");
});

test("Test SortedList insert event", (done) => {
	const list = new SortedList<string>();

	expect(list).toBeDefined();
	expect(list.empty).toBe(true);

	list.on("insert", (data: string) => {
		expect(data).toBe("a");
		done();
	});

	list.insert("a");
});

test("Test removal from a SortedList", (done) => {
	const list = new SortedList<string>(["b", "a", "c", "e", "d"]);

	expect(list).toBeDefined();
	expect(list.size).toBe(5);
	expect(list.array).toEqual(["a", "b", "c", "d", "e"]);
	expect(list.contains("c")).toBe(true);

	list.on("remove", (data: string) => {
		expect(data).toBe("c");
		expect(list.size).toBe(4);
		expect(list.contains("c")).toBe(false);
		expect(list.array).toEqual(["a", "b", "d", "e"]);
		done();
	});

	list.remove("c");
});
