import {
  assert,
  assertFalse,
  assertThrows,
  assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts";
import {
  assert as customAssert,
  getTypeOf,
  isArray,
  isBigInt,
  isBoolean,
  isDate,
  isDefined,
  isError,
  isFunction,
  isInstanceOf,
  isIterable,
  isMap,
  isNil,
  isNull,
  isNumber,
  isObject,
  isPlainObject,
  isPromise,
  isRegExp,
  isSet,
  isString,
  isSymbol,
  isUndefined,
  omit,
  pick,
  raise,
} from "./mod.ts";

Deno.test("isInstanceOf with instances of the specified class", () => {
  class MyClass {}
  const myInstance = new MyClass();

  // Test with a custom class
  assert(
    isInstanceOf(myInstance, MyClass),
    "myInstance should be an instance of MyClass",
  );

  // Test with built-in objects
  const date = new Date();
  assert(isInstanceOf(date, Date), "date should be an instance of Date");

  const regExp = new RegExp("");
  assert(
    isInstanceOf(regExp, RegExp),
    "regExp should be an instance of RegExp",
  );
});

Deno.test("isInstanceOf with non-instances of the specified class", () => {
  class MyClass {}
  const notMyInstance = {}; // Not an instance of MyClass

  // Test with a custom class
  assertFalse(
    isInstanceOf(notMyInstance, MyClass),
    "notMyInstance should not be an instance of MyClass",
  );

  // Test with built-in objects
  const notADate = "2021-01-01";
  assertFalse(
    isInstanceOf(notADate, Date),
    "notADate should not be an instance of Date",
  );

  const notARegExp = "/abc/";
  assertFalse(
    isInstanceOf(notARegExp, RegExp),
    "notARegExp should not be an instance of RegExp",
  );
});

Deno.test("isString identifies strings correctly", () => {
  assert(isString("hello"), 'Expected "hello" to be recognized as a string');
  assert(isString(""), "Expected empty string to be recognized as a string");
  assertFalse(isString(123), "Expected 123 not to be recognized as a string");
  assertFalse(isString(true), "Expected true not to be recognized as a string");
  assertFalse(isString({}), "Expected object not to be recognized as a string");
  assertFalse(isString(null), "Expected null not to be recognized as a string");
  assertFalse(
    isString(undefined),
    "Expected undefined not to be recognized as a string",
  );
});

Deno.test("isNumber identifies numbers correctly", () => {
  assert(isNumber(123), "Expected 123 to be recognized as a number");
  assert(isNumber(-123.456), "Expected -123.456 to be recognized as a number");
  assert(isNumber(0), "Expected 0 to be recognized as a number");
  assertFalse(
    isNumber("123"),
    'Expected "123" not to be recognized as a number',
  );
  assertFalse(
    isNumber(NaN),
    "Expected NaN not to be recognized as a valid number",
  );
  assertFalse(
    isNumber(Infinity),
    "Expected Infinity not to be recognized as a valid number",
  );
  assertFalse(isNumber(true), "Expected true not to be recognized as a number");
});

Deno.test("isBoolean identifies booleans correctly", () => {
  assert(isBoolean(true), "Expected true to be recognized as a boolean");
  assert(isBoolean(false), "Expected false to be recognized as a boolean");
  assertFalse(
    isBoolean("false"),
    'Expected "false" not to be recognized as a boolean',
  );
  assertFalse(isBoolean(0), "Expected 0 not to be recognized as a boolean");
  assertFalse(
    isBoolean(null),
    "Expected null not to be recognized as a boolean",
  );
  assertFalse(
    isBoolean(undefined),
    "Expected undefined not to be recognized as a boolean",
  );
});

Deno.test("isBigInt identifies BigInts correctly", () => {
  assert(
    isBigInt(BigInt(123)),
    "Expected BigInt(123) to be recognized as a bigint",
  );
  assertFalse(isBigInt(123), "Expected 123 not to be recognized as a bigint");
  assertFalse(
    isBigInt("123"),
    'Expected "123" not to be recognized as a bigint',
  );
  assertFalse(
    isBigInt(Symbol("123")),
    "Expected Symbol not to be recognized as a bigint",
  );
  assertFalse(isBigInt({}), "Expected object not to be recognized as a bigint");
});

Deno.test("isSymbol identifies Symbols correctly", () => {
  assert(
    isSymbol(Symbol("test")),
    "Expected Symbol('test') to be recognized as a symbol",
  );
  assertFalse(
    isSymbol("test"),
    'Expected "test" not to be recognized as a symbol',
  );
  assertFalse(isSymbol(123), "Expected 123 not to be recognized as a symbol");
  assertFalse(isSymbol({}), "Expected object not to be recognized as a symbol");
  assertFalse(
    isSymbol(BigInt(123)),
    "Expected BigInt(123) not to be recognized as a symbol",
  );
});

Deno.test("isObject identifies Objects correctly", () => {
  assert(isObject({}), "Expected {} to be recognized as an object");
  assert(
    isObject(new Date()),
    "Expected Date instance to be recognized as an object",
  );
  assert(isObject([]), "Expected [] to be recognized as an object");
  // Explicitly test for null due to JavaScript's typeof behavior
  assert(isObject(null), "Expected null to be recognized as an object");
  assertFalse(isObject(123), "Expected 123 not to be recognized as an object");
  assertFalse(
    isObject("test"),
    'Expected "test" not to be recognized as an object',
  );
  assertFalse(
    isObject(Symbol("test")),
    "Expected Symbol not to be recognized as an object",
  );
  assertFalse(
    isObject(BigInt(123)),
    "Expected BigInt(123) not to be recognized as an object",
  );
  assertFalse(
    isObject(() => {}),
    "Expected function not to be recognized as an object",
  );
});

Deno.test("isUndefined identifies undefined values correctly", () => {
  assert(
    isUndefined(undefined),
    "Expected undefined to be recognized as undefined",
  );
  assertFalse(
    isUndefined(null),
    "Expected null not to be recognized as undefined",
  );
  assertFalse(
    isUndefined(""),
    "Expected empty string not to be recognized as undefined",
  );
  assertFalse(isUndefined(0), "Expected 0 not to be recognized as undefined");
  assertFalse(isUndefined({}), "Expected {} not to be recognized as undefined");
});

Deno.test("isNull identifies null values correctly", () => {
  assert(isNull(null), "Expected null to be recognized as null");
  assertFalse(
    isNull(undefined),
    "Expected undefined not to be recognized as null",
  );
  assertFalse(
    isNull("null"),
    'Expected string "null" not to be recognized as null',
  );
  assertFalse(isNull(0), "Expected 0 not to be recognized as null");
  assertFalse(isNull({}), "Expected {} not to be recognized as null");
});

Deno.test("isNil identifies null or undefined values correctly", () => {
  assert(isNil(null), "Expected null to be recognized as nil");
  assert(isNil(undefined), "Expected undefined to be recognized as nil");
  assertFalse(isNil(""), "Expected empty string not to be recognized as nil");
  assertFalse(isNil(0), "Expected 0 not to be recognized as nil");
  assertFalse(isNil({}), "Expected {} not to be recognized as nil");
});

Deno.test("isArray identifies arrays correctly", () => {
  assert(isArray([]), "Expected an empty array to be recognized as an array");
  assert(
    isArray([1, 2, 3]),
    "Expected a non-empty array to be recognized as an array",
  );
  assertFalse(
    isArray({}),
    "Expected an object not to be recognized as an array",
  );
  assertFalse(
    isArray("[]"),
    "Expected a string not to be recognized as an array",
  );
  assertFalse(isArray(null), "Expected null not to be recognized as an array");
  assertFalse(
    isArray(undefined),
    "Expected undefined not to be recognized as an array",
  );
});

Deno.test("isPlainObject identifies plain objects correctly", () => {
  assert(
    isPlainObject({}),
    "Expected an empty object to be recognized as a plain object",
  );
  assert(
    isPlainObject({ key: "value" }),
    "Expected a non-empty object to be recognized as a plain object",
  );
  assertFalse(
    isPlainObject(new Date()),
    "Expected a Date instance not to be recognized as a plain object",
  );
  assertFalse(
    isPlainObject([]),
    "Expected an array not to be recognized as a plain object",
  );
  assertFalse(
    isPlainObject(null),
    "Expected null not to be recognized as a plain object",
  );
  assertFalse(
    isPlainObject(() => {}),
    "Expected a function not to be recognized as a plain object",
  );
});

Deno.test("isFunction identifies functions correctly", () => {
  assert(
    isFunction(() => {}),
    "Expected a function expression to be recognized as a function",
  );
  assert(
    isFunction(function () {}),
    "Expected a function declaration to be recognized as a function",
  );
  assert(
    isFunction(async () => {}),
    "Expected an async function to be recognized as a function",
  );
  assert(
    isFunction(function* () {}),
    "Expected a generator function to be recognized as a function",
  );
  assertFalse(
    isFunction({}),
    "Expected an object not to be recognized as a function",
  );
  assertFalse(
    isFunction([]),
    "Expected an array not to be recognized as a function",
  );
  assertFalse(
    isFunction(null),
    "Expected null not to be recognized as a function",
  );
  assertFalse(
    isFunction(undefined),
    "Expected undefined not to be recognized as a function",
  );
});

Deno.test("isPromise identifies Promises correctly", () => {
  const promise = new Promise(() => {});
  assert(
    isPromise(promise),
    "Expected a new Promise to be recognized as a Promise",
  );

  const thenable = {
    then: function () {},
    catch: function () {},
    finally: function () {},
  };

  assert(
    isPromise(thenable),
    "Expected a thenable object to be recognized as a Promise",
  );

  assertFalse(
    isPromise(() => {}),
    "Expected a function not to be recognized as a Promise",
  );
  assertFalse(
    isPromise({}),
    "Expected a plain object not to be recognized as a Promise",
  );
  assertFalse(
    isPromise(null),
    "Expected null not to be recognized as a Promise",
  );
  assertFalse(
    isPromise(undefined),
    "Expected undefined not to be recognized as a Promise",
  );
});

Deno.test("isDate identifies Dates correctly", () => {
  const date = new Date();
  assert(
    isDate(date),
    "Expected a new Date instance to be recognized as a Date",
  );

  const invalidDate = new Date("invalid date");
  assertFalse(
    isDate(invalidDate),
    "Expected an invalid Date to not be recognized as a valid Date",
  );

  assertFalse(
    isDate({}),
    "Expected a plain object not to be recognized as a Date",
  );
  assertFalse(
    isDate("2021-01-01"),
    "Expected a date string not to be recognized as a Date",
  );
  assertFalse(isDate(null), "Expected null not to be recognized as a Date");
  assertFalse(
    isDate(undefined),
    "Expected undefined not to be recognized as a Date",
  );
});

Deno.test("isError identifies Errors correctly", () => {
  const error = new Error("Test error");
  assert(
    isError(error),
    "Expected a new Error instance to be recognized as an Error",
  );

  const derivedError = new TypeError("Test type error");
  assert(
    isError(derivedError),
    "Expected a derived Error (TypeError) to be recognized as an Error",
  );

  assertFalse(
    isError({ message: "Error-like object" }),
    "Expected an object with a message property not to be recognized as an Error",
  );
  assertFalse(
    isError("Error message"),
    "Expected a string not to be recognized as an Error",
  );
  assertFalse(isError(null), "Expected null not to be recognized as an Error");
  assertFalse(
    isError(undefined),
    "Expected undefined not to be recognized as an Error",
  );
});

Deno.test("isMap identifies Maps correctly", () => {
  const map = new Map();
  assert(isMap(map), "Expected a new Map instance to be recognized as a Map");

  assertFalse(isMap(new Set()), "Expected a Set not to be recognized as a Map");
  assertFalse(
    isMap({}),
    "Expected a plain object not to be recognized as a Map",
  );
  assertFalse(isMap(null), "Expected null not to be recognized as a Map");
  assertFalse(
    isMap(undefined),
    "Expected undefined not to be recognized as a Map",
  );
});

Deno.test("isSet identifies Sets correctly", () => {
  const set = new Set();
  assert(isSet(set), "Expected a new Set instance to be recognized as a Set");

  assertFalse(isSet(new Map()), "Expected a Map not to be recognized as a Set");
  assertFalse(
    isSet({}),
    "Expected a plain object not to be recognized as a Set",
  );
  assertFalse(isSet(null), "Expected null not to be recognized as a Set");
  assertFalse(
    isSet(undefined),
    "Expected undefined not to be recognized as a Set",
  );
});

Deno.test("isRegExp identifies RegExps correctly", () => {
  const regExp = new RegExp("abc");
  assert(
    isRegExp(regExp),
    "Expected a RegExp instance to be recognized as a RegExp",
  );

  const regExpLiteral = /abc/;
  assert(
    isRegExp(regExpLiteral),
    "Expected a RegExp literal to be recognized as a RegExp",
  );

  assertFalse(
    isRegExp({}),
    "Expected a plain object not to be recognized as a RegExp",
  );
  assertFalse(isRegExp(null), "Expected null not to be recognized as a RegExp");
  assertFalse(
    isRegExp(undefined),
    "Expected undefined not to be recognized as a RegExp",
  );
  assertFalse(
    isRegExp(new Map()),
    "Expected a Map not to be recognized as a RegExp",
  );
  assertFalse(
    isRegExp(new Set()),
    "Expected a Set not to be recognized as a RegExp",
  );
});

Deno.test("isIterable identifies iterables correctly", () => {
  // Iterable cases
  assert(isIterable([]), "Expected an array to be recognized as iterable");
  assert(isIterable(new Map()), "Expected a Map to be recognized as iterable");
  assert(isIterable(new Set()), "Expected a Set to be recognized as iterable");
  assert(
    isIterable("string"),
    "Expected a string to be recognized as iterable",
  );
  assert(
    isIterable((function* () {})()),
    "Expected a generator function to be recognized as iterable",
  );

  // Non-iterable cases
  assertFalse(
    isIterable({}),
    "Expected a plain object not to be recognized as iterable",
  );
  assertFalse(
    isIterable(123),
    "Expected a number not to be recognized as iterable",
  );
  assertFalse(
    isIterable(true),
    "Expected a boolean not to be recognized as iterable",
  );
  assertFalse(
    isIterable(null),
    "Expected null not to be recognized as iterable",
  );
  assertFalse(
    isIterable(undefined),
    "Expected undefined not to be recognized as iterable",
  );
  assertFalse(
    isIterable(() => {}),
    "Expected a regular function not to be recognized as iterable",
  );
});

Deno.test("isDefined identifies defined values correctly", () => {
  assert(isDefined(0), "Expected 0 to be recognized as defined");
  assert(isDefined(""), "Expected an empty string to be recognized as defined");
  assert(isDefined(false), "Expected false to be recognized as defined");
  assertFalse(isDefined(null), "Expected null not to be recognized as defined");
  assertFalse(
    isDefined(undefined),
    "Expected undefined not to be recognized as defined",
  );
});

Deno.test("assert does not throw for truthy values", () => {
  assert(true); // Should not throw
  assert(1); // Should not throw
  assert("non-empty"); // Should not throw
});

Deno.test("assert throws for falsy values", () => {
  assertThrows(
    () => {
      customAssert(false, "This should throw");
    },
    Error,
    "This should throw",
  );

  assertThrows(
    () => {
      customAssert(0, "Zero is falsy");
    },
    Error,
    "Zero is falsy",
  );

  assertThrows(
    () => {
      customAssert("", "Empty string is falsy");
    },
    Error,
    "Empty string is falsy",
  );
});

Deno.test("raise throws an error with the specified message", () => {
  assertThrows(
    () => {
      raise("Error message");
    },
    Error,
    "Error message",
  );
});

Deno.test("raise throws an error with specified options", () => {
  const cause = new Error("Underlying cause");
  assertThrows(
    () => {
      raise("Error with cause", { cause });
    },
    Error,
    "Error with cause",
  );
});

Deno.test("getTypeOf returns correct types", () => {
  // Primitive types
  assertEquals(
    getTypeOf(undefined),
    "undefined",
    'Expected "undefined" for undefined',
  );
  assertEquals(getTypeOf(null), "null", 'Expected "null" for null');
  assertEquals(getTypeOf(true), "boolean", 'Expected "boolean" for true');
  assertEquals(getTypeOf(false), "boolean", 'Expected "boolean" for false');
  assertEquals(getTypeOf(42), "number", 'Expected "number" for 42');
  assertEquals(getTypeOf(NaN), "nan", 'Expected "number" for NaN');
  assertEquals(
    getTypeOf(Infinity),
    "infinity",
    'Expected "number" for Infinity',
  );
  assertEquals(getTypeOf("string"), "string", 'Expected "string" for "string"');
  assertEquals(
    getTypeOf(Symbol("symbol")),
    "symbol",
    'Expected "symbol" for Symbol',
  );
  assertEquals(
    getTypeOf(BigInt(123)),
    "bigint",
    'Expected "bigint" for BigInt',
  );

  // Complex types
  assertEquals(getTypeOf({}), "object", 'Expected "object" for {}');
  assertEquals(getTypeOf([]), "array", 'Expected "array" for []');
  assertEquals(getTypeOf(new Date()), "date", 'Expected "date" for new Date()');
  assertEquals(getTypeOf(/regex/), "regexp", 'Expected "regexp" for /regex/');
  assertEquals(
    getTypeOf(() => {}),
    "function",
    'Expected "function" for () => {}',
  );
  assertEquals(
    getTypeOf(async () => {}),
    "function",
    'Expected "function" for async () => {}',
  );
  assertEquals(
    getTypeOf(function* () {}),
    "function",
    'Expected "function" for function* () {}',
  );
  assertEquals(getTypeOf(new Map()), "map", 'Expected "map" for new Map()');
  assertEquals(getTypeOf(new Set()), "set", 'Expected "set" for new Set()');
  assertEquals(
    getTypeOf(new Promise(() => {})),
    "promise",
    'Expected "promise" for new Promise()',
  );
  assertEquals(
    getTypeOf(new Error()),
    "error",
    'Expected "error" for new Error()',
  );
  assertEquals(
    getTypeOf(new ArrayBuffer(10)),
    "arraybuffer",
    'Expected "arraybuffer" for new ArrayBuffer()',
  );
  assertEquals(
    getTypeOf(new Int8Array()),
    "int8array",
    'Expected "int8array" for new Int8Array()',
  );

  // Special cases
  assertEquals(
    getTypeOf(new (class MyClass {})()),
    "object",
    'Expected "object" for custom class instances',
  );
});

// Test for the `pick` function
Deno.test("pick: should pick specified properties from an object", () => {
  const obj = { name: "John", age: 30, job: "Developer" };
  const result = pick(obj, ["name", "job"]);
  const expected = { name: "John", job: "Developer" };

  // Use Deno's built-in assertion functions to verify the result.
  assertEquals(result, expected);
});

// Test for the `omit` function
Deno.test("omit: should omit specified properties from an object", () => {
  const obj = { name: "Jane", age: 25, job: "Designer" };
  const result = omit(obj, ["age"]);
  const expected = { name: "Jane", job: "Designer" };

  // Use Deno's built-in assertion functions to verify the result.
  assertEquals(result, expected);
});

// Additional test to check if `pick` works with empty keys array
Deno.test(
  "pick: should return an empty object when keys array is empty",
  () => {
    const obj = { name: "Alice", age: 28, job: "Engineer" };
    const result = pick(obj, []);
    const expected = {};

    assertEquals(result, expected);
  },
);

// Additional test to check if `omit` works with empty keys array
Deno.test(
  "omit: should return the same object when keys array is empty",
  () => {
    const obj = { name: "Bob", age: 32, job: "Artist" };
    const result = omit(obj, []);
    const expected = { name: "Bob", age: 32, job: "Artist" };

    assertEquals(result, expected);
  },
);
