import * as fs from "fs-extra";
import {join} from "util.join";
import {List} from "../index";

test("Create an empty List", () => {
	const list = new List<string>();

	expect(list).toBeDefined();
	expect(list.size).toBe(0);
	expect(list.length).toBe(0);
	expect(list.front).toBe(null);
	expect(list.back).toBe(null);
	expect(list).toMatchSnapshot();
});

test("Create a List using the insert method", () => {
	const data = ["a", "b", "c", "d", "e"];
	const list = new List<string>();
	let idx = 0;

	expect(list).toBeDefined();
	expect(list.size).toBe(0);

	for (const it of data) {
		list.insert(it);
	}
	list.insert(null);
	list.insert(null, null);

	expect(list.size).toBe(5);

	for (const it of list) {
		expect(data[idx++]).toBe(it);
	}

	expect(list.front).toBe("a");
	expect(list.back).toBe("e");
	expect(list.array).toEqual(data);
	expect(list.reverse).toEqual(data.reverse());
});

test("Test the List contains method", () => {
	const list = new List<string>(["a", "b", "c", "d", "e"]);

	expect(list).toBeDefined();
	expect(list.size).toBe(5);

	expect(list.contains("a")).toBe(true);
	expect(list.contains("c")).toBe(true);
	expect(list.contains("e")).toBe(true);
	expect(list.contains("abcde")).toBe(false);
	expect(list.contains(null)).toBe(false);
});

test("Test the list contains with an empty list", () => {
	const list = new List<string>();

	expect(list).toBeDefined();
	expect(list.size).toBe(0);

	expect(list.contains("a")).toBe(false);
	expect(list.contains("c")).toBe(false);
	expect(list.contains("e")).toBe(false);
	expect(list.contains("abcde")).toBe(false);
	expect(list.contains(null)).toBe(false);
});

test("Create a List inserting to the front of the list (reverse)", () => {
	const data = ["a", "b", "c", "d", "e"];
	const list = new List<string>();
	let idx = 4;

	expect(list).toBeDefined();
	expect(list.size).toBe(0);

	for (const it of data) {
		list.insert(it, List.FRONT);
	}

	expect(list.size).toBe(5);

	for (const it of list) {
		expect(data[idx--]).toBe(it);
	}

	expect(list.front).toBe("e");
	expect(list.back).toBe("a");
});

test("Test arbitrary insertion into a List", () => {
	const data = ["a", "b", "c", "d", "e", "f"];
	const list = new List<string>(["a", "c", "e"]);
	let idx = 0;

	expect(list).toBeDefined();
	expect(list.size).toBe(3);

	list.insert("b", 1);
	list.insert("d", 3);
	list.insert("f", 9999);

	expect(list.size).toBe(6);

	for (const it of list) {
		expect(data[idx++]).toBe(it);
	}

	expect(list.front).toBe("a");
	expect(list.back).toBe("f");
});

test("Test List insert event", (done) => {
	const list = new List<string>();

	expect(list).toBeDefined();
	expect(list.empty).toBe(true);

	list.on("insert", (data: string) => {
		expect(data).toBe("a");
		done();
	});

	list.insert("a");
});

test("Test the getNodeByValue/getNodeByIndex  methods in List", () => {
	const data = ["a", "b", "c", "d", "e"];
	const list = new List<string>(data);

	expect(list).toBeDefined();
	expect(list.size).toBe(5);

	expect(list._getNodeByValue("c").data).toBe("c");
	expect(list._getNodeByIndex(2).data).toBe("c");

	expect(list._getNodeByValue("a").data).toBe("a");
	expect(list._getNodeByIndex(0).data).toBe("a");

	expect(list._getNodeByValue("e").data).toBe("e");
	expect(list._getNodeByIndex(4).data).toBe("e");
});

test("Test removing values from the List", () => {
	const data = ["a", "b", "c", "d", "e"];
	const list = new List<string>(data);

	expect(list).toBeDefined();
	expect(list.size).toBe(5);
	expect(list.array).toEqual(data);
	expect(list.front).toBe("a");
	expect(list.back).toBe("e");

	expect(list.remove(null, List.FRONT)).toBe("a");
	expect(list.front).toBe("b");

	list.remove("c");

	list.remove("e");
	expect(list.end).toBe("d");

	expect(list.remove(null)).toBe(null);
	expect(list.remove(null, null)).toBe(null);

	expect(list.size).toBe(2);
	expect(list.array).toEqual(["b", "d"]);

	expect(list.front).toBe("b");
	expect(list.back).toBe("d");
});

test("Test removing all values from the front of a List", () => {
	const list = new List<string>(["a", "b", "c", "d", "e"]);

	expect(list).toBeDefined();
	expect(list.size).toBe(5);

	for (let i = 0; i < 10; i++) {
		list.remove(null, List.FRONT);
	}

	expect(list.size).toBe(0);
});

test("Test removing all values from the end of a list", () => {
	const list = new List<string>(["a", "b", "c", "d", "e"]);

	expect(list).toBeDefined();
	expect(list.size).toBe(5);

	for (let i = 0; i < 10; i++) {
		list.remove(null, List.BACK);
	}

	expect(list.size).toBe(0);
});

test("Test List remove event", (done) => {
	const list = new List<string>(["a", "b", "c"]);

	expect(list).toBeDefined();
	expect(list.size).toBe(3);

	list.on("remove", (data: string) => {
		expect(data).toBe("b");
		expect(list.array).toEqual(["a", "c"]);
		done();
	});

	list.remove("b");
});

test("Test the find method for a List", () => {
	const list = new List<string>(["a", "b", "c", "d", "e"]);

	expect(list).toBeDefined();
	expect(list.size).toBe(5);

	expect(list.find("a")).toBe("a");
	expect(list.find("e")).toBe("e");
	expect(list.find("aasldkfjsldkfj")).toBe(null);
	expect(list.find(null)).toBe(null);
});

test("Test insert/delete to List on a very large set of words", () => {
	const list = new List<string>();
	const words = fs
		.readFileSync(
			join(process.cwd(), "__tests__", "data", "words.txt"),
			"utf-8"
		)
		.split(/\r?\n/);

	expect(list).toBeDefined();
	expect(words).toBeTruthy();

	for (const word of words) {
		list.insert(word);
	}

	expect(list.length).toBe(words.length);

	for (const word of words) {
		list.remove(word);
	}

	expect(list.length).toBe(0);
});

test("Test retrieving list items at arbitrary locations with at", () => {
	const list = new List<number>([10, 20, 30]);

	expect(list).toBeDefined();

	expect(list.at(0)).toBe(10);
	expect(list.at(1)).toBe(20);
	expect(list.at(2)).toBe(30);
	expect(list.at(-1)).toBe(null);
	expect(list.at(999)).toBe(null);
});
