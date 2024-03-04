/**
 * Checks if a value is an instance of a specific class or constructor function.
 * This is a generic type-guard that can be used with any class or constructor function.
 *
 * @param value - The value to check.
 * @param constructor - The class or constructor function to check against.
 * @returns `true` if the value is an instance of the specified class or constructor function, otherwise `false`.
 *
 * @example
 * ```ts
 * class MyClass {}
 * const myInstance = new MyClass();
 * const isMyInstance = isInstanceOf(myInstance, MyClass); // true
 * ```
 *
 * @example
 * ```ts
 * isInstanceOf(new Date(), Date); // true
 * ```
 *
 * @example
 * ```ts
 * isInstanceOf({}, Object); // true
 * ```
 *
 * @example
 * ```ts
 * isInstanceOf("hello", String); // false
 * ```
 */
export function isInstanceOf<T>(
  value: unknown,
  // deno-lint-ignore no-explicit-any
  constructor: new (...args: any[]) => T,
): value is T {
  return value instanceof constructor;
}

/**
 * Checks if a value is a string.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a string, otherwise `false`.
 * @example
 * ```ts
 * isString("hello"); // true
 * isString(123); // false
 *```
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Checks if a value is a finite number. This function not only verifies that the type of the value is `number`,
 * but also ensures that it is not `Infinity`, `-Infinity`, or `NaN`, which are technically of type `number` but
 * may not be desirable as "numbers" in many use cases.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a finite number, otherwise `false`.
 * @example
 * ```ts
 * isNumber(123); // true
 * isNumber(Infinity); // false
 * isNumber(NaN); // false
 * isNumber("123"); // false
 * ```
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number" && isFinite(value);
}

/**
 * Checks if a value is a boolean.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a boolean, otherwise `false`.
 * @example
 * ```ts
 * isBoolean(true); // true
 * isBoolean(0); // false
 * ```
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

/**
 * Checks if a value is a BigInt.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a BigInt, otherwise `false`.
 * @example
 * ```ts
 * isBigInt(10n); // true
 * isBigInt(10); // false
 * ```
 */
export function isBigInt(value: unknown): value is bigint {
  return typeof value === "bigint";
}

/**
 * Checks if a value is a symbol.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a symbol, otherwise `false`.
 * @example
 * ```ts
 * isSymbol(Symbol('foo')); // true
 * isSymbol('foo'); // false
 * ```
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === "symbol";
}

/**
 * Checks if a value is an object.
 *
 * @param value - The value to check.
 * @returns `true` if the value is an object, otherwise `false`.
 * @example
 * ```ts
 * isObject({}); // true
 * isObject(null); // false
 * ```
 */
export function isObject(value: unknown): value is object {
  return typeof value === "object";
}

/**
 * Checks if a value is undefined.
 *
 * @param value - The value to check.
 * @returns `true` if the value is undefined, otherwise `false`.
 * @example
 * ```ts
 * isUndefined(undefined); // true
 * isUndefined(null); // false
 * ```
 */
export function isUndefined(value: unknown): value is undefined {
  return typeof value === "undefined";
}

/**
 * Checks if a value is null.
 *
 * @param value - The value to check.
 * @returns `true` if the value is null, otherwise `false`.
 * @example
 * ```ts
 * isNull(null); // true
 * isNull(undefined); // false
 * ```
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * Checks if a value is either null or undefined.
 *
 * @param value - The value to check.
 * @returns `true` if the value is null or undefined, otherwise `false`.
 * @example
 * ```ts
 * isNil(null); // true
 * isNil(undefined); // true
 * isNil(false); // false
 * ```
 */
export function isNil(value: unknown): value is null | undefined {
  return isNull(value) || isUndefined(value);
}

/**
 * Checks if a value is an array.
 *
 * @param value - The value to check.
 * @returns `true` if the value is an array, otherwise `false`.
 * @example
 * ```ts
 * isArray([1, 2, 3]); // true
 * isArray({}); // false
 * ```
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * Checks if a value is a plain object, not created by a custom class constructor.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a plain object, otherwise `false`.
 * @example
 * ```ts
 * isPlainObject({}); // true
 * isPlainObject(new Date()); // false
 * ```
 */
export function isPlainObject(
  value: unknown,
): value is { [key: PropertyKey]: unknown } {
  // Directly check for null or undefined
  if (value == null) {
    return false;
  }

  // Ensure the value is an object and not a function or any other type
  if (typeof value !== "object") {
    return false;
  }

  // Get the prototype of the object
  const proto = Object.getPrototypeOf(value);

  // Object with no prototype (Object.create(null)) is considered plain
  if (proto === null) {
    return true;
  }

  // If the object was constructed by the Object function, consider it plain
  const Ctor =
    Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;

  return (
    typeof Ctor === "function" &&
    Ctor instanceof Ctor &&
    Function.prototype.toString.call(Ctor) ===
      Function.prototype.toString.call(Object)
  );
}

/**
 * Checks if a value is a function.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a function, otherwise `false`.
 * @example
 * ```ts
 * isFunction(function() {}); // true
 * isFunction(async () => {}); // true
 * isFunction(123); // false
 * ```
 */
// deno-lint-ignore no-explicit-any
export function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === "function";
}

/**
 * Checks if a value is a Promise by verifying if it's an instance of Promise or
 * if it behaves like a Promise object, meaning it has `then`, `catch`, and `finally` methods.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a Promise or has Promise-like characteristics, otherwise `false`.
 *
 * @example
 * ```ts
 * // Using an actual Promise object
 * isPromise(new Promise((resolve, reject) => resolve('value'))); // true
 * ```
 *
 * @example
 * ```ts
 * // Using an object that mimics a Promise
 * isPromise({
 *   then: function(resolve, reject) {},
 *   catch: function(reject) {},
 *   finally: function() {}
 * }); // true
 * ```
 *
 * @example
 * ```ts
 * // Using a non-Promise value
 * isPromise({ then: true }); // false
 * ```
 */
export function isPromise(value: unknown): value is Promise<unknown> {
  return (
    value instanceof Promise ||
    (isObject(value) &&
      !isNull(value) &&
      "then" in value &&
      isFunction(value.then) &&
      "catch" in value &&
      isFunction(value.catch) &&
      "finally" in value &&
      isFunction(value.finally))
  );
}

/**
 * Checks if a value is a Date object and is valid (not an invalid date).
 *
 * @param value - The value to check.
 * @returns `true` if the value is a valid Date object, otherwise `false`.
 *
 * @example
 * ```ts
 * isDate(new Date()); // true
 * isDate(new Date("invalid date")); // false
 * isDate("2021-01-01"); // false
 * ```
 */
export function isDate(value: unknown): value is Date {
  return isInstanceOf(value, Date) && isFinite(value.getTime());
}

/**
 * Checks if a value is an Error object. This can include native Error types like TypeError, SyntaxError, etc.
 *
 * @param value - The value to check.
 * @returns `true` if the value is an Error object, otherwise `false`.
 *
 * @example
 * ```ts
 * isError(new Error()); // true
 * isError(new TypeError()); // true
 * isError({ message: "error" }); // false
 * ```
 */
export function isError(value: unknown): value is Error {
  return isInstanceOf(value, Error);
}

/**
 * Checks if a value is a Map object.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a Map object, otherwise `false`.
 *
 * @example
 * ```ts
 * isMap(new Map()); // true
 * isMap(new Set()); // false
 * isMap({}); // false
 * ```
 */
export function isMap(value: unknown): value is Map<unknown, unknown> {
  return isInstanceOf(value, Map);
}

/**
 * Checks if a value is a Set object.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a Set object, otherwise `false`.
 *
 * @example
 * ```ts
 * isSet(new Set()); // true
 * isSet(new Map()); // false
 * isSet([]); // false
 * ```
 */
export function isSet(value: unknown): value is Set<unknown> {
  return isInstanceOf(value, Set);
}

/**
 * Checks if the provided value is an instance of `RegExp`. This type-guard function is useful for
 * determining if a value is a regular expression object, enabling more type-safe operations with such objects.
 *
 * @param value - The value to be checked.
 * @returns `true` if `value` is an instance of `RegExp`, otherwise `false`.
 *
 * @example
 * ```ts
 * isRegExp(/abc/); // true
 * isRegExp(new RegExp('abc')); // true
 * isRegExp('abc'); // false
 * isRegExp({}); // false
 * ```
 */
export function isRegExp(value: unknown): value is RegExp {
  return isInstanceOf(value, RegExp);
}

/**
 * Checks if a value is neither `null` nor `undefined`, effectively ensuring that the value is defined.
 * This type-guard function leverages the `isNil` utility to provide a type-safe way of filtering out `null` and `undefined` values,
 * allowing TypeScript to infer a more specific type for the value within a conditional block.
 *
 * @template T - The type of the value being checked. This generic type allows the function to be used with any type.
 * @param value - The value to check for being defined (i.e., not `null` and not `undefined`).
 * @returns `true` if the value is neither `null` nor `undefined`, otherwise `false`.
 *
 * @example
 * ```ts
 * isDefined("hello"); // true
 * isDefined(0); // true
 * isDefined(null); // false
 * isDefined(undefined); // false
 * ```
 */
export function isDefined<T>(value: T): value is NonNullable<T> {
  return !isNil(value);
}

/**
 * Asserts that a condition is truthy and throws an error with a provided message and optional error options if not.
 * This function is useful for validating assumptions in code and throwing descriptive errors if those assumptions fail.
 *
 * @param condition - The condition to test. If this evaluates to a falsy value, an error is thrown.
 * @param message - Optional. The error message to throw if the assertion fails. Defaults to "Assertion failed" if not provided.
 * @param options - Optional. An object that can contain additional options for the Error constructor, such as the cause of the error, which provides a way to specify the underlying reason for the error.
 * @throws {Error} Throws an Error with the provided message and options if the condition is falsy.
 * @example
 * ```ts
 * assert(true); // Does nothing since the condition is truthy
 * assert(false, "This will throw an error with this message"); // Throws an Error with the specified message
 * assert(false, "This error has a cause", { cause: new Error("Underlying cause") }); // Throws an Error with a cause
 * ```
 */
export function assert(
  // deno-lint-ignore no-explicit-any
  condition: any,
  message = "Assertion failed",
  options?: ErrorOptions,
): asserts condition {
  condition || raise(message, options);
}

/**
 * Facilitates throwing errors in contexts where `throw` cannot be used directly as an expression.
 * This function is particularly useful in arrow functions, ternary operations, or other places
 * where an expression is expected, but you need to throw an error based on a condition.
 *
 * Since `throw` is a statement and not an expression in JavaScript, it cannot be used directly
 * in expression contexts. The `raise` function wraps the throw in a callable expression, allowing
 * for its use in these contexts.
 *
 * @param message - The error message for the thrown Error.
 * @param options - Optional. Additional options for the Error constructor, such as the cause of the error,
 *                  which can be used to provide more detailed context for error handling.
 * @returns Never returns a value as it always results in a thrown Error.
 * @throws {Error} - Always throws an Error with the provided message and optionally with additional options.
 *
 * @example
 * ```ts
 * // Using in an arrow function
 * myArray.map(item => item.isValid ? item : raise('Invalid item encountered'));
 * ```
 *
 * @example
 * ```ts
 * // Using in a ternary operation
 * const result = isValid ? computeResult() : raise('Invalid operation');
 * ```
 */
export function raise(message: string, options?: ErrorOptions): never {
  throw new Error(message, options);
}

/**
 * Returns a lowercase string representing the type of the given value, with special handling for JavaScript edge cases.
 * This function differentiates between various types, including primitives, built-in objects, and special cases like `null`, `NaN`, and `Infinity`.
 * It aims to provide a more accurate and descriptive type string than the basic `typeof` operator in JavaScript.
 *
 * @param value - The value whose type is to be determined.
 * @returns A lowercase string representing the type of `value`.
 *
 * @example
 * ```ts
 * getTypeOf(null); // 'null'
 * getTypeOf(NaN); // 'nan'
 * getTypeOf(Infinity); // 'infinity'
 * getTypeOf(-Infinity); // 'infinity'
 * getTypeOf('hello'); // 'string'
 * getTypeOf(100); // 'number'
 * getTypeOf(true); // 'boolean'
 * getTypeOf(undefined); // 'undefined'
 * getTypeOf(Symbol('sym')); // 'symbol'
 * getTypeOf(BigInt(123456)); // 'bigint'
 * getTypeOf([]); // 'array'
 * getTypeOf(new Date()); // 'date'
 * getTypeOf(/regex/); // 'regexp'
 * getTypeOf(() => {}); // 'function'
 * getTypeOf(new Map()); // 'map'
 * getTypeOf(new Set()); // 'set'
 * getTypeOf(new ArrayBuffer(10)); // 'arraybuffer'
 * getTypeOf(new Int8Array()); // 'int8array'
 * getTypeOf({}); // 'object'
 * getTypeOf(new class MyClass {}); // 'myclass' or 'object' depending on environment
 * ```
 */
export function getTypeOf(value: unknown): string {
  // Handle null explicitly
  if (value === null) {
    return "null";
  }

  // Handle NaN (Note: NaN is the only value in JavaScript which is not equal to itself)
  if (value !== value) {
    return "nan";
  }

  // Handle Infinity (both positive and negative)
  if (value === Infinity || value === -Infinity) {
    return "infinity";
  }

  // Handle primitive types (string, number, boolean, undefined, symbol, bigint)
  const type = typeof value;
  if (type !== "object" && type !== "function") {
    return type.toLowerCase();
  }

  // Handle arrays
  if (isArray(value)) {
    return "array";
  }

  // Handle dates
  if (isInstanceOf(value, Date)) {
    return "date";
  }

  // Handle regular expressions
  if (isRegExp(value)) {
    return "regexp";
  }

  // Handle functions (including async functions, generators, etc.)
  if (isFunction(value)) {
    return "function";
  }

  // Use Object.prototype.toString.call for other types (e.g., Map, Set, ArrayBuffer, etc.)
  // and extract the type from the returned string "[object Type]"
  const rawType = Object.prototype.toString.call(value);
  const typeMatch = rawType.match(/\[object (\w+)\]/);
  if (typeMatch && typeMatch.length === 2) {
    return typeMatch[1].toLowerCase();
  }

  // Fallback for any exotic or unknown types
  return "unknown";
}
