# 100 New JavaScript Interview Questions with Detailed Answers

## JavaScript Core Concepts

1. **What is the difference between `undefined` and `not defined` in JavaScript?**  
   **Answer**: `undefined` is a primitive value assigned to a declared variable without a value or a non-existent object property. "Not defined" results in a `ReferenceError` when accessing an undeclared variable.  
   **Example**:  
   ```javascript
   let x;
   console.log(x); // undefined
   console.log(y); // ReferenceError: y is not defined
   ```
   **Explanation**: In Node.js backend APIs, distinguishing these prevents errors when handling missing data or undefined API responses.

2. **What is the `typeof` operator, and what quirks does it have?**  
   **Answer**: The `typeof` operator returns the type of a value as a string. Quirks include `typeof null` returning `"object"` (a historical bug) and `typeof function` returning `"function"`.  
   **Example**:  
   ```javascript
   console.log(typeof null); // "object"
   console.log(typeof (() => {})); // "function"
   console.log(typeof NaN); // "number"
   ```
   **Explanation**: In backend systems, `typeof` is used for input validation but requires careful handling due to quirks.

3. **What is the `NaN` value, and how do you test for it?**  
   **Answer**: `NaN` (Not-a-Number) is a `number` type representing invalid numeric results. Test for it using `Number.isNaN()` or `isNaN()` (less strict).  
   **Example**:  
   ```javascript
   console.log(Number.isNaN(0 / 0)); // true
   console.log(Number.isNaN("text")); // false
   console.log(isNaN("text")); // true (coerces to NaN)
   ```
   **Explanation**: In backend APIs, checking for `NaN` ensures valid numeric calculations, like in financial systems.

4. **What is the `globalThis` object, and why is it useful?**  
   **Answer**: `globalThis` provides a standard way to access the global object across environments (e.g., `global` in Node.js, `window` in browsers).  
   **Example**:  
   ```javascript
   globalThis.myVar = "test";
   console.log(myVar); // test
   ```
   **Explanation**: In Node.js backends, `globalThis` ensures cross-environment compatibility for shared libraries.

5. **What is short-circuit evaluation in JavaScript?**  
   **Answer**: Short-circuit evaluation skips evaluation of expressions in logical operators (`&&`, `||`) when the result is determined. `&&` stops on `false`; `||` stops on `true`.  
   **Example**:  
   ```javascript
   let x = 0;
   console.log(x || 42); // 42
   console.log(x && "test"); // 0
   ```
   **Explanation**: In backend APIs, short-circuiting simplifies conditional logic, like default values for missing data.

## Functions and Scope

6. **What is an IIFE, and when is it used?**  
   **Answer**: An Immediately Invoked Function Expression (IIFE) is a function defined and executed immediately, used for data privacy or avoiding global scope pollution.  
   **Example**:  
   ```javascript
   (function() {
     const secret = "hidden";
     console.log(secret); // hidden
   })();
   // console.log(secret); // ReferenceError
   ```
   **Explanation**: In Node.js modules, IIFEs encapsulate logic to prevent variable leaks in shared code.

7. **What is the `arguments` object in a function?**  
   **Answer**: The `arguments` object is an array-like object containing all arguments passed to a function, useful for variable argument functions (non-arrow functions).  
   **Example**:  
   ```javascript
   function sum() {
     return Array.from(arguments).reduce((a, b) => a + b, 0);
   }
   console.log(sum(1, 2, 3)); // 6
   ```
   **Explanation**: In backend systems, `arguments` handles dynamic inputs, though rest parameters are preferred.

8. **What is a function’s `length` property?**  
   **Answer**: The `length` property of a function returns the number of expected parameters (excluding rest parameters).  
   **Example**:  
   ```javascript
   function fn(a, b, ...rest) {}
   console.log(fn.length); // 2
   ```
   **Explanation**: In backend Node.js, `length` validates function signatures in middleware or utilities.

9. **What is the difference between a function declaration and expression?**  
   **Answer**: A function declaration (`function name() {}`) is hoisted fully, while a function expression (`const name = function() {}`) hoists only the variable declaration.  
   **Example**:  
   ```javascript
   declaration(); // Works
   function declaration() { console.log("Declared"); }
   // expression(); // TypeError: expression is not a function
   const expression = function() { console.log("Expressed"); };
   ```
   **Explanation**: In Node.js, declarations are preferred for top-level utilities, expressions for callbacks.

10. **What is lexical scope in JavaScript?**  
    **Answer**: Lexical scope means a variable’s scope is determined by its location in the source code, accessible within nested functions.  
    **Example**:  
    ```javascript
    function outer() {
      const x = "outer";
      function inner() { console.log(x); }
      inner(); // outer
    }
    outer();
    ```
    **Explanation**: In backend systems, lexical scope ensures predictable variable access in closures.

## Objects and Classes

11. **What is the `Object.seal()` method?**  
    **Answer**: `Object.seal()` prevents adding or removing properties but allows modifying existing ones, unlike `Object.freeze()`.  
    **Example**:  
    ```javascript
    const obj = { a: 1 };
    Object.seal(obj);
    obj.a = 2; // Allowed
    obj.b = 3; // Ignored
    delete obj.a; // Ignored
    console.log(obj); // { a: 2 }
    ```
    **Explanation**: In Node.js APIs, `Object.seal()` protects object structures in shared data.

12. **What is a getter and setter in JavaScript?**  
    **Answer**: Getters and setters are special methods for accessing or modifying object properties, defined with `get` or `set`.  
    **Example**:  
    ```javascript
    const obj = {
      _name: "Test",
      get name() { return this._name; },
      set name(value) { this._name = value.toUpperCase(); }
    };
    obj.name = "hello";
    console.log(obj.name); // HELLO
    ```
    **Explanation**: In backend systems, getters/setters validate or transform data in API responses.

13. **What is the `instanceof` operator’s prototype chain behavior?**  
    **Answer**: `instanceof` checks if a constructor’s `prototype` exists in an object’s prototype chain, not just direct inheritance.  
    **Example**:  
    ```javascript
    class Animal {}
    class Dog extends Animal {}
    const dog = new Dog();
    console.log(dog instanceof Dog); // true
    console.log(dog instanceof Animal); // true
    console.log(dog instanceof Object); // true
    ```
    **Explanation**: In Node.js, `instanceof` validates object types in polymorphic APIs.

14. **What is the `Object.assign()` method?**  
    **Answer**: `Object.assign()` copies enumerable own properties from source objects to a target object, performing a shallow copy.  
    **Example**:  
    ```javascript
    const target = { a: 1 };
    const source = { b: 2, c: 3 };
    Object.assign(target, source);
    console.log(target); // { a: 1, b: 2, c: 3 }
    ```
    **Explanation**: In backend APIs, `Object.assign()` merges configuration objects or defaults.

15. **What is a static method in a JavaScript class?**  
    **Answer**: A static method is defined on a class itself, not instances, and is called without instantiation.  
    **Example**:  
    ```javascript
    class MathUtils {
      static add(a, b) { return a + b; }
    }
    console.log(MathUtils.add(2, 3)); // 5
    ```
    **Explanation**: In Node.js, static methods provide utility functions for modules, like data validation.

## Arrays and Iteration

16. **What is the `find()` method, and how does it differ from `filter()`?**  
    **Answer**: `find()` returns the first array element matching a condition, while `filter()` returns all matching elements.  
    **Example**:  
    ```javascript
    const arr = [1, 2, 3, 4];
    console.log(arr.find(x => x > 2)); // 3
    console.log(arr.filter(x => x > 2)); // [3, 4]
    ```
    **Explanation**: In backend APIs, `find()` retrieves a single record, `filter()` retrieves multiple.

17. **What is the `every()` method, and when is it used?**  
    **Answer**: `every()` checks if all array elements satisfy a condition, returning a boolean.  
    **Example**:  
    ```javascript
    const arr = [2, 4, 6];
    console.log(arr.every(x => x % 2 === 0)); // true
    console.log(arr.every(x => x > 5)); // false
    ```
    **Explanation**: In Node.js APIs, `every()` validates data, like checking if all inputs are valid.

18. **What is the `some()` method, and how is it different from `every()`?**  
    **Answer**: `some()` returns `true` if at least one element satisfies a condition, while `every()` requires all elements to satisfy it.  
    **Example**:  
    ```javascript
    const arr = [1, 2, 3];
    console.log(arr.some(x => x > 2)); // true
    console.log(arr.every(x => x > 2)); // false
    ```
    **Explanation**: In backend systems, `some()` checks for any matching condition, like user permissions.

19. **What is the `for...of` loop, and when is it used?**  
    **Answer**: The `for...of` loop iterates over iterable objects (e.g., arrays, strings) using their iterator protocol.  
    **Example**:  
    ```javascript
    const arr = [1, 2, 3];
    for (const x of arr) console.log(x); // 1, 2, 3
    ```
    **Explanation**: In Node.js, `for...of` processes array-like data, like database query results.

20. **What is the `Array.prototype.includes()` method?**  
    **Answer**: `includes()` checks if an array contains a specific value, returning a boolean, with optional start index.  
    **Example**:  
    ```javascript
    const arr = [1, 2, 3];
    console.log(arr.includes(2)); // true
    console.log(arr.includes(4)); // false
    ```
    **Explanation**: In backend APIs, `includes()` validates data presence, like checking allowed roles.

## Asynchronous Programming

21. **What is a callback function in JavaScript?**  
    **Answer**: A callback is a function passed as an argument to be executed later, often for async operations.  
    **Example**:  
    ```javascript
    setTimeout(() => console.log("Done"), 1000);
    ```
    **Explanation**: In Node.js, callbacks handle async I/O, though Promises or `async/await` are preferred for readability.

22. **What is callback hell, and how is it mitigated?**  
    **Answer**: Callback hell is nested callbacks making code hard to read. Mitigate with Promises, `async/await`, or modularization.  
    **Example**:  
    ```javascript
    // Callback hell
    fs.readFile("file1.txt", (err, data1) => {
      fs.readFile("file2.txt", (err, data2) => {
        console.log(data1, data2);
      });
    });
    // Mitigated with async/await
    async function readFiles() {
      const data1 = await fs.promises.readFile("file1.txt");
      const data2 = await fs.promises.readFile("file2.txt");
      console.log(data1, data2);
    }
    ```
    **Explanation**: In Node.js backends, `async/await` simplifies complex async flows.

23. **What is the `Promise.resolve()` method?**  
    **Answer**: `Promise.resolve()` creates a resolved Promise with a given value, useful for normalizing values to Promises.  
    **Example**:  
    ```javascript
    Promise.resolve(42).then(value => console.log(value)); // 42
    ```
    **Explanation**: In Node.js APIs, it ensures consistent Promise-based workflows.

24. **What is the `Promise.reject()` method?**  
    **Answer**: `Promise.reject()` creates a rejected Promise with a given reason, used for error handling.  
    **Example**:  
    ```javascript
    Promise.reject("Error").catch(err => console.log(err)); // Error
    ```
    **Explanation**: In backend systems, it signals errors in async operations, like failed API calls.

25. **What is the `finally()` method in Promises?**  
    **Answer**: `finally()` executes code after a Promise settles (resolved or rejected), useful for cleanup.  
    **Example**:  
    ```javascript
    Promise.resolve("Done")
      .finally(() => console.log("Cleanup"))
      .then(result => console.log(result)); // Cleanup, Done
    ```
    **Explanation**: In Node.js, `finally()` ensures resources (e.g., database connections) are closed.

## Error Handling

26. **What is a try-catch block’s scope in JavaScript?**  
    **Answer**: Variables declared in a `try` or `catch` block are block-scoped, inaccessible outside.  
    **Example**:  
    ```javascript
    try {
      let x = 1;
      throw "Error";
    } catch (e) {
      let y = 2;
      console.log(e); // Error
    }
    // console.log(x, y); // ReferenceError
    ```
    **Explanation**: In Node.js APIs, block-scoped error handling keeps code clean and prevents leaks.

27. **What is the `Error.captureStackTrace()` method in Node.js?**  
    **Answer**: `Error.captureStackTrace()` customizes an error’s stack trace, removing irrelevant frames for cleaner debugging.  
    **Example**:  
    ```javascript
    function MyError() {
      Error.captureStackTrace(this, MyError);
      this.name = "MyError";
      this.message = "Custom error";
    }
    throw new MyError();
    ```
    **Explanation**: In Node.js backends, it improves error traceability in complex APIs.

28. **What is the difference between synchronous and asynchronous errors?**  
    **Answer**: Synchronous errors are thrown immediately and caught with `try/catch`. Asynchronous errors (e.g., in Promises) are caught with `.catch()` or `async/await`.  
    **Example**:  
    ```javascript
    // Synchronous
    try {
      throw new Error("Sync");
    } catch (e) { console.log(e.message); } // Sync
    // Asynchronous
    Promise.reject("Async").catch(e => console.log(e)); // Async
    ```
    **Explanation**: In Node.js, handling both types ensures robust API error management.

29. **How do you propagate errors in a Promise chain?**  
    **Answer**: Errors in a Promise chain are passed to the nearest `.catch()`, allowing centralized handling.  
    **Example**:  
    ```javascript
    Promise.resolve()
      .then(() => { throw new Error("Error"); })
      .then(() => console.log("Skipped"))
      .catch(e => console.log(e.message)); // Error
    ```
    **Explanation**: In backend APIs, centralized error handling simplifies debugging.

30. **What is the `process.on('uncaughtException')` event in Node.js?**  
    **Answer**: It catches unhandled synchronous exceptions in Node.js, preventing process crashes, but should be used cautiously.  
    **Example**:  
    ```javascript
    process.on("uncaughtException", err => console.log("Caught:", err.message));
    throw new Error("Uncaught");
    ```
    **Explanation**: In Node.js backends, it’s a last resort for logging critical errors.

## Modules and Imports

31. **What is dynamic import in JavaScript?**  
    **Answer**: Dynamic `import()` loads ES Modules asynchronously, returning a Promise, useful for lazy-loading.  
    **Example**:  
    ```javascript
    import("fs").then(fs => console.log(fs.readFileSync));
    ```
    **Explanation**: In Node.js, dynamic imports optimize startup time by loading modules on demand.

32. **What is the `export default` syntax?**  
    **Answer**: `export default` exports a single value as a module’s default export, imported without curly braces.  
    **Example**:  
    ```javascript
    // module.js
    export default function greet() { return "Hello"; }
    // main.js
    import greet from "./module.js";
    console.log(greet()); // Hello
    ```
    **Explanation**: In Node.js, default exports simplify module usage in APIs.

33. **What is the `require.resolve()` method in Node.js?**  
    **Answer**: `require.resolve()` returns the resolved path of a module without loading it, useful for locating dependencies.  
    **Example**:  
    ```javascript
    console.log(require.resolve("fs")); // Path to fs module
    ```
    **Explanation**: In Node.js backends, it aids in debugging module paths.

34. **What is the difference between `module.exports` and `exports`?**  
    **Answer**: `module.exports` is the actual exported object, while `exports` is a shorthand reference. Reassigning `exports` breaks the reference.  
    **Example**:  
    ```javascript
    // Works
    module.exports = { a: 1 };
    // Breaks
    exports = { b: 2 }; // Ignored
    ```
    **Explanation**: In Node.js, use `module.exports` for reliable exports.

35. **What is a circular dependency in Node.js?**  
    **Answer**: A circular dependency occurs when two modules depend on each other, potentially causing incomplete exports.  
    **Example**:  
    ```javascript
    // a.js
    const b = require("./b");
    module.exports = { a: "A" };
    // b.js
    const a = require("./a");
    console.log(a); // {} (incomplete)
    ```
    **Explanation**: In Node.js backends, restructure code or use lazy loading to resolve circular dependencies.

## Prototypes and Inheritance

36. **What is the `__proto__` property?**  
    **Answer**: `__proto__` is a deprecated accessor to an object’s prototype, used for inheritance. Use `Object.getPrototypeOf()` instead.  
    **Example**:  
    ```javascript
    const obj = {};
    console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
    ```
    **Explanation**: In Node.js, understanding prototypes aids in custom module design.

37. **What is the `hasOwnProperty()` method?**  
    **Answer**: `hasOwnProperty()` checks if a property is an object’s own (not inherited).  
    **Example**:  
    ```javascript
    const obj = { a: 1 };
    console.log(obj.hasOwnProperty("a")); // true
    console.log(obj.hasOwnProperty("toString")); // false
    ```
    **Explanation**: In backend APIs, it ensures safe property checks in JSON responses.

38. **What is the `Object.getOwnPropertyDescriptors()` method?**  
    **Answer**: It returns all own property descriptors (value, writable, enumerable, configurable) of an object.  
    **Example**:  
    ```javascript
    const obj = { a: 1 };
    console.log(Object.getOwnPropertyDescriptors(obj));
    // { a: { value: 1, writable: true, enumerable: true, configurable: true } }
    ```
    **Explanation**: In Node.js, it’s used for precise object manipulation in utilities.

39. **What is a constructor function?**  
    **Answer**: A constructor function creates objects with shared behavior via `new`, setting up the prototype chain.  
    **Example**:  
    ```javascript
    function User(name) { this.name = name; }
    User.prototype.greet = function() { return `Hi, ${this.name}`; };
    const user = new User("Alice");
    console.log(user.greet()); // Hi, Alice
    ```
    **Explanation**: In Node.js, constructors create reusable objects for API logic.

40. **What is the `Object.setPrototypeOf()` method?**  
    **Answer**: It sets an object’s prototype, modifying its inheritance chain dynamically. Use cautiously due to performance impact.  
    **Example**:  
    ```javascript
    const obj = {};
    const proto = { greet: () => "Hello" };
    Object.setPrototypeOf(obj, proto);
    console.log(obj.greet()); // Hello
    ```
    **Explanation**: In Node.js, it’s used sparingly for dynamic prototype changes.

## Asynchronous Patterns

41. **What is the `async` keyword’s return value?**  
    **Answer**: An `async` function always returns a Promise, resolving to the function’s return value or rejecting with an error.  
    **Example**:  
    ```javascript
    async function test() { return "Done"; }
    test().then(result => console.log(result)); // Done
    ```
    **Explanation**: In Node.js APIs, `async` ensures consistent Promise-based responses.

42. **What is the `setImmediate()` function in Node.js?**  
    **Answer**: `setImmediate()` schedules a callback to run after the current event loop phase, before `setTimeout`.  
    **Example**:  
    ```javascript
    setImmediate(() => console.log("Immediate"));
    setTimeout(() => console.log("Timeout"), 0);
    // Likely output: Immediate, Timeout
    ```
    **Explanation**: In Node.js, `setImmediate` prioritizes tasks in high-performance APIs.

43. **What is the `process.nextTick()` method in Node.js?**  
    **Answer**: `process.nextTick()` schedules a callback before the next event loop iteration, with higher priority than `setImmediate`.  
    **Example**:  
    ```javascript
    process.nextTick(() => console.log("Next tick"));
    setImmediate(() => console.log("Immediate"));
    // Output: Next tick, Immediate
    ```
    **Explanation**: In Node.js backends, it ensures critical tasks execute immediately.

44. **What is a Promise chain, and why is it useful?**  
    **Answer**: A Promise chain sequences asynchronous operations using `.then()`, passing results forward.  
    **Example**:  
    ```javascript
    Promise.resolve(1)
      .then(x => x + 1)
      .then(x => x * 2)
      .then(console.log); // 4
    ```
    **Explanation**: In Node.js APIs, chains manage sequential async tasks, like database writes followed by notifications.

45. **What is the `async.each` pattern in libraries like `async`?**  
    **Answer**: The `async.each` function (from the `async` library) applies an async function to each array element concurrently, with a final callback.  
    **Example**:  
    ```javascript
    const async = require("async");
    async.each([1, 2, 3], (item, cb) => {
      setTimeout(() => { console.log(item); cb(); }, 100);
    }, () => console.log("Done"));
    ```
    **Explanation**: In Node.js, it processes multiple async tasks, like batch API calls.

## Security and Best Practices

46. **What is a JSON injection attack, and how do you prevent it?**  
    **Answer**: JSON injection occurs when untrusted data alters JSON structure. Prevent by sanitizing inputs and avoiding `eval` or unsafe parsing.  
    **Example**:  
    ```javascript
    const safeParse = (str) => JSON.parse(str.replace(/[\u0000-\u001F]/g, ""));
    console.log(safeParse('{"name":"test"}')); // { name: "test" }
    ```
    **Explanation**: In Node.js APIs, sanitization prevents malicious JSON payloads.

47. **What is the `Object.freeze()` method, and how does it enhance security?**  
    **Answer**: `Object.freeze()` makes an object immutable, preventing property changes or additions.  
    **Example**:  
    ```javascript
    const obj = Object.freeze({ a: 1 });
    obj.a = 2; // Ignored
    console.log(obj.a); // 1
    ```
    **Explanation**: In Node.js, it protects configuration objects from unintended modifications.

48. **What is the `secure` flag in cookies?**  
    **Answer**: The `secure` flag ensures cookies are only sent over HTTPS, preventing interception.  
    **Example**:  
    ```javascript
    // Express.js
    res.cookie("session", "id", { secure: true });
    ```
    **Explanation**: In Node.js APIs, `secure` cookies enhance session security.

49. **What is input sanitization in JavaScript?**  
    **Answer**: Input sanitization cleans user inputs to prevent injection attacks (e.g., XSS, SQL injection) using libraries like `sanitize-html`.  
    **Example**:  
    ```javascript
    const sanitizeHtml = require("sanitize-html");
    const dirty = "<script>alert('xss')</script>";
    console.log(sanitizeHtml(dirty)); // Escaped output
    ```
    **Explanation**: In Node.js backends, sanitization secures API endpoints.

50. **What is the `httpOnly` cookie flag?**  
    **Answer**: The `httpOnly` flag prevents client-side JavaScript from accessing cookies, mitigating XSS attacks.  
    **Example**:  
    ```javascript
    // Express.js
    res.cookie("session", "id", { httpOnly: true });
    ```
    **Explanation**: In Node.js, `httpOnly` protects session cookies in APIs.

## Node.js-Specific Features

51. **What is the `fs.promises` API in Node.js?**  
    **Answer**: The `fs.promises` API provides Promise-based file system operations, improving async code readability.  
    **Example**:  
    ```javascript
    const fs = require("fs").promises;
    async function readFile() {
      const data = await fs.readFile("file.txt", "utf8");
      console.log(data);
    }
    readFile();
    ```
    **Explanation**: In Node.js backends, `fs.promises` simplifies file operations for APIs.

52. **What is the `path` module in Node.js?**  
    **Answer**: The `path` module handles file paths, ensuring cross-platform compatibility (e.g., separators).  
    **Example**:  
    ```javascript
    const path = require("path");
    console.log(path.join("dir", "file.txt")); // dir/file.txt (Unix) or dir\file.txt (Windows)
    ```
    **Explanation**: In Node.js, `path` ensures reliable file handling in backend scripts.

53. **What is the `cluster` module in Node.js?**  
    **Answer**: The `cluster` module enables multi-process Node.js applications, utilizing multiple CPU cores.  
    **Example**:  
    ```javascript
    const cluster = require("cluster");
    if (cluster.isMaster) {
      cluster.fork();
    } else {
      console.log("Worker running");
    }
    ```
    **Explanation**: In Node.js backends, clustering improves performance for high-traffic APIs.

54. **What is the `child_process` module in Node.js?**  
    **Answer**: The `child_process` module spawns child processes to run external commands or scripts.  
    **Example**:  
    ```javascript
    const { exec } = require("child_process");
    exec("ls", (err, stdout) => console.log(stdout));
    ```
    **Explanation**: In Node.js, it’s used for tasks like running shell scripts in backend workflows.

55. **What is the `util.promisify()` function in Node.js?**  
    **Answer**: `util.promisify()` converts callback-based functions to Promise-based ones for easier async handling.  
    **Example**:  
    ```javascript
    const util = require("util");
    const fs = require("fs");
    const readFile = util.promisify(fs.readFile);
    async function read() {
      console.log(await readFile("file.txt", "utf8"));
    }
    read();
    ```
    **Explanation**: In Node.js APIs, it modernizes legacy callback APIs.

## Performance Optimization

56. **What is the `performance.now()` method?**  
    **Answer**: `performance.now()` returns a high-resolution timestamp for measuring performance.  
    **Example**:  
    ```javascript
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {}
    console.log(performance.now() - start); // e.g., 0.1ms
    ```
    **Explanation**: In Node.js, it profiles API performance for optimization.

57. **How do you avoid blocking the event loop in Node.js?**  
    **Answer**: Offload heavy computations to worker threads or break tasks into smaller async chunks.  
    **Example**:  
    ```javascript
    const { Worker, isMainThread } = require("worker_threads");
    if (isMainThread) {
      new Worker(__filename);
    } else {
      // Heavy computation
      console.log("Worker running");
    }
    ```
    **Explanation**: In Node.js backends, non-blocking ensures scalability under load.

58. **What is the `Set` object’s performance advantage?**  
    **Answer**: `Set` provides O(1) lookup and insertion for unique values, faster than arrays for membership checks.  
    **Example**:  
    ```javascript
    const set = new Set([1, 2, 3]);
    console.log(set.has(2)); // true (O(1))
    console.log([1, 2, 3].includes(2)); // true (O(n))
    ```
    **Explanation**: In Node.js APIs, `Set` optimizes lookups, like checking unique IDs.

59. **What is the `Map` object’s advantage over objects for key-value storage?**  
    **Answer**: `Map` allows any value as keys, preserves insertion order, and avoids prototype issues.  
    **Example**:  
    ```javascript
    const map = new Map([[1, "one"], ["key", "value"]]);
    console.log(map.get(1)); // one
    console.log(map.get("key")); // value
    ```
    **Explanation**: In Node.js, `Map` stores key-value data in APIs or caches.

60. **How do you optimize JSON parsing in Node.js?**  
    **Answer**: Use streams for large JSON files or `JSON.parse()` with try-catch for small ones, avoiding memory overload.  
    **Example**:  
    ```javascript
    const fs = require("fs");
    const JSONStream = require("JSONStream");
    fs.createReadStream("large.json")
      .pipe(JSONStream.parse("*"))
      .on("data", data => console.log(data));
    ```
    **Explanation**: In Node.js backends, streaming JSON optimizes memory usage.

## Testing and Debugging

61. **What is the `debugger` statement in JavaScript?**  
    **Answer**: The `debugger` statement pauses execution in a debugger, allowing inspection of variables and call stack.  
    **Example**:  
    ```javascript
    function test() {
      let x = 1;
      debugger; // Pauses here in dev tools
      console.log(x);
    }
    test();
    ```
    **Explanation**: In Node.js, `debugger` aids in debugging API logic.

62. **What is a test double in JavaScript testing?**  
    **Answer**: A test double (e.g., stub, mock, spy) simulates a dependency to isolate the unit under test.  
    **Example**:  
    ```javascript
    const mockDb = { query: jest.fn().mockReturnValue("data") };
    console.log(mockDb.query()); // data
    ```
    **Explanation**: In Node.js, test doubles test API endpoints without real database calls.

63. **What is the `jest.spyOn()` method?**  
    **Answer**: `jest.spyOn()` monitors calls to an object’s method, allowing verification of behavior.  
    **Example**:  
    ```javascript
    const obj = { fn: () => "test" };
    const spy = jest.spyOn(obj, "fn");
    obj.fn();
    expect(spy).toHaveBeenCalled();
    ```
    **Explanation**: In Node.js, spies verify middleware or service interactions.

64. **What is the `console.dir()` method?**  
    **Answer**: `console.dir()` logs an object’s properties in a structured format, useful for debugging complex objects.  
    **Example**:  
    ```javascript
    console.dir({ a: 1, b: { c: 2 } }, { depth: null });
    ```
    **Explanation**: In Node.js, it inspects API response objects during debugging.

65. **What is snapshot testing in Jest?**  
    **Answer**: Snapshot testing captures a component’s or function’s output and compares it to a stored snapshot.  
    **Example**:  
    ```javascript
    test("snapshot", () => {
      expect({ a: 1 }).toMatchSnapshot();
    });
    ```
    **Explanation**: In Node.js APIs, snapshots ensure consistent JSON responses.

## Functional Programming

66. **What is immutability in functional programming?**  
    **Answer**: Immutability ensures data cannot be changed after creation, reducing side effects.  
    **Example**:  
    ```javascript
    const arr = [1, 2, 3];
    const newArr = [...arr, 4]; // New array
    console.log(arr); // [1, 2, 3]
    console.log(newArr); // [1, 2, 3, 4]
    ```
    **Explanation**: In Node.js APIs, immutability prevents bugs in shared data.

67. **What is a transducer in JavaScript?**  
    **Answer**: A transducer combines transformation functions (e.g., `map`, `filter`) into a single pass for efficiency.  
    **Example**:  
    ```javascript
    const transducer = (mapFn, filterFn) => (reducer) => (acc, x) => filterFn(x) ? reducer(acc, mapFn(x)) : acc;
    const doubleEvens = transducer(x => x * 2, x => x % 2 === 0);
    console.log([1, 2, 3, 4].reduce(doubleEvens((a, b) => a + b), 0)); // 12 (2*2 + 4*2)
    ```
    **Explanation**: In Node.js, transducers optimize data processing pipelines.

68. **What is the `pipe` function in functional programming?**  
    **Answer**: The `pipe` function composes functions from left to right, passing each result to the next.  
    **Example**:  
    ```javascript
    const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
    const add1 = x => x + 1;
    const double = x => x * 2;
    const fn = pipe(add1, double);
    console.log(fn(5)); // 12
    ```
    **Explanation**: In Node.js APIs, `pipe` creates clean data transformation flows.

69. **What is a point-free style in JavaScript?**  
    **Answer**: Point-free style defines functions without explicitly mentioning arguments, using composition or currying.  
    **Example**:  
    ```javascript
    const add = a => b => a + b;
    const add5 = add(5);
    console.log(add5(3)); // 8
    ```
    **Explanation**: In Node.js, point-free style simplifies reusable utilities.

70. **What is a monoid in JavaScript?**  
    **Answer**: A monoid is a type with an associative operation and an identity element (e.g., 0 for addition). Arrays with `concat` are monoids.  
    **Example**:  
    ```javascript
    console.log([1, 2].concat([3, 4]).concat([])); // [1, 2, 3, 4]
    ```
    **Explanation**: In Node.js, monoids simplify data aggregation in APIs.

## Node.js Backend Scenarios

71. **How do you handle CORS in a Node.js API?**  
    **Answer**: Use the `cors` middleware in Express.js to allow cross-origin requests with specific headers or origins.  
    **Example**:  
    ```javascript
    const express = require("express");
    const cors = require("cors");
    const app = express();
    app.use(cors({ origin: "http://example.com" }));
    app.get("/", (req, res) => res.send("Hello"));
    ```
    **Explanation**: In Node.js APIs, CORS enables secure cross-domain client access.

72. **How do you implement rate limiting in a Node.js API?**  
    **Answer**: Use `express-rate-limit` to limit requests per IP, preventing abuse.  
    **Example**:  
    ```javascript
    const rateLimit = require("express-rate-limit");
    app.use(rateLimit({ windowMs: 60000, max: 100 }));
    ```
    **Explanation**: Rate limiting in Node.js APIs protects against DDoS attacks.

73. **How do you stream data in a Node.js API response?**  
    **Answer**: Use streams with `res` object to send data incrementally, reducing memory usage.  
    **Example**:  
    ```javascript
    const fs = require("fs");
    app.get("/stream", (req, res) => {
      fs.createReadStream("large.txt").pipe(res);
    });
    ```
    **Explanation**: Streaming in Node.js APIs handles large file responses efficiently.

74. **How do you implement authentication in a Node.js API?**  
    **Answer**: Use JWTs with middleware like `jsonwebtoken` to verify tokens in requests.  
    **Example**:  
    ```javascript
    const jwt = require("jsonwebtoken");
    app.use((req, res, next) => {
      const token = req.headers.authorization?.split(" ")[1];
      jwt.verify(token, "secret", (err, user) => {
        if (err) return res.status(401).send("Unauthorized");
        req.user = user;
        next();
      });
    });
    ```
    **Explanation**: JWTs secure Node.js APIs by validating user identity.

75. **How do you handle large file downloads in Node.js?**  
    **Answer**: Use streams with `Content-Range` headers for partial downloads, supporting resumable transfers.  
    **Example**:  
    ```javascript
    app.get("/download", (req, res) => {
      res.setHeader("Content-Disposition", "attachment; filename=file.txt");
      fs.createReadStream("file.txt").pipe(res);
    });
    ```
    **Explanation**: Streaming downloads in Node.js APIs optimizes bandwidth and memory.

## Advanced JavaScript Patterns

76. **What is a factory function in JavaScript?**  
    **Answer**: A factory function creates and returns objects without using `new`, offering flexible instantiation.  
    **Example**:  
    ```javascript
    function createUser(name) {
      return { name, greet: () => `Hi, ${name}` };
    }
    const user = createUser("Alice");
    console.log(user.greet()); // Hi, Alice
    ```
    **Explanation**: In Node.js, factories create reusable objects for API logic.

77. **What is the module pattern in JavaScript?**  
    **Answer**: The module pattern uses a closure to encapsulate private data and expose a public API.  
    **Example**:  
    ```javascript
    const myModule = (function() {
      const secret = "hidden";
      return { get: () => secret };
    })();
    console.log(myModule.get()); // hidden
    ```
    **Explanation**: In Node.js, it encapsulates logic in reusable modules.

78. **What is a revealing module pattern?**  
    **Answer**: A variant of the module pattern that explicitly returns public methods, keeping others private.  
    **Example**:  
    ```javascript
    const module = (function() {
      const privateFn = () => "private";
      const publicFn = () => privateFn();
      return { publicFn };
    })();
    console.log(module.publicFn()); // private
    ```
    **Explanation**: In Node.js, it organizes code for clean API exports.

79. **What is a singleton pattern in JavaScript?**  
    **Answer**: A singleton ensures a single instance of an object, often implemented with a module or IIFE.  
    **Example**:  
    ```javascript
    const singleton = (function() {
      let instance;
      function create() { return { data: "shared" }; }
      return {
        getInstance: () => instance || (instance = create())
      };
    })();
    console.log(singleton.getInstance().data); // shared
    ```
    **Explanation**: In Node.js, singletons manage shared resources like database connections.

80. **What is a decorator function in JavaScript?**  
    **Answer**: A decorator wraps a function to extend its behavior without modifying it.  
    **Example**:  
    ```javascript
    function log(fn) {
      return (...args) => {
        console.log(`Calling ${fn.name}`);
        return fn(...args);
      };
    }
    const add = log((a, b) => a + b);
    console.log(add(2, 3)); // Calling add, 5
    ```
    **Explanation**: In Node.js APIs, decorators add logging or validation to handlers.

## Practical Coding Challenges

81. **How would you reverse a string in JavaScript?**  
    **Answer**: Split the string into an array, reverse it, and join it back.  
    **Example**:  
    ```javascript
    function reverseString(str) {
      return str.split("").reverse().join("");
    }
    console.log(reverseString("hello")); // olleh
    ```
    **Explanation**: In Node.js APIs, string manipulation handles data formatting.

82. **How would you implement a queue in JavaScript?**  
    **Answer**: Use an array or class with `push` (enqueue) and `shift` (dequeue) methods.  
    **Example**:  
    ```javascript
    class Queue {
      constructor() { this.items = []; }
      enqueue(item) { this.items.push(item); }
      dequeue() { return this.items.shift(); }
    }
    const q = new Queue();
    q.enqueue(1);
    console.log(q.dequeue()); // 1
    ```
    **Explanation**: In Node.js, queues manage async task processing.

83. **How would you check for palindromes in JavaScript?**  
    **Answer**: Compare the string with its reverse, ignoring case and non-alphanumeric characters.  
    **Example**:  
    ```javascript
    function isPalindrome(str) {
      str = str.toLowerCase().replace(/[^a-z0-9]/g, "");
      return str === str.split("").reverse().join("");
    }
    console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
    ```
    **Explanation**: In Node.js APIs, palindrome checks validate user inputs.

84. **How would you merge two objects in JavaScript?**  
    **Answer**: Use `Object.assign()` or spread operator for shallow merging, or a deep merge function for nested objects.  
    **Example**:  
    ```javascript
    const obj1 = { a: 1, b: { x: 1 } };
    const obj2 = { b: { y: 2 }, c: 3 };
    const merged = { ...obj1, ...obj2 };
    console.log(merged); // { a: 1, b: { y: 2 }, c: 3 }
    ```
    **Explanation**: In Node.js APIs, merging combines configuration or response data.

85. **How would you implement a simple cache in JavaScript?**  
    **Answer**: Use a `Map` to store key-value pairs with optional expiration.  
    **Example**:  
    ```javascript
    class Cache {
      constructor() { this.store = new Map(); }
      set(key, value, ttl) {
        this.store.set(key, value);
        if (ttl) setTimeout(() => this.store.delete(key), ttl);
      }
      get(key) { return this.store.get(key); }
    }
    const cache = new Cache();
    cache.set("key", "value", 1000);
    console.log(cache.get("key")); // value
    ```
    **Explanation**: In Node.js APIs, caching improves performance for frequent queries.

## Practical Scenarios

86. **How would you handle large datasets in a Node.js API?**  
    **Answer**: Use streams or pagination to process data incrementally, avoiding memory issues.  
    **Example**:  
    ```javascript
    app.get("/data", async (req, res) => {
      const stream = db.collection("data").find().stream();
      stream.pipe(res);
    });
    ```
    **Explanation**: Streaming in Node.js APIs handles large database results efficiently.

87. **How would you implement logging in a Node.js application?**  
    **Answer**: Use libraries like `winston` for structured logging with levels and transports.  
    **Example**:  
    ```javascript
    const winston = require("winston");
    const logger = winston.createLogger({
      transports: [new winston.transports.File({ filename: "log.txt" })]
    });
    logger.info("Hello");
    ```
    **Explanation**: Logging in Node.js aids debugging and monitoring in production.

88. **How would you secure a Node.js API endpoint?**  
    **Answer**: Use middleware for authentication (e.g., JWT), input validation, and HTTPS.  
    **Example**:  
    ```javascript
    const jwt = require("jsonwebtoken");
    app.use((req, res, next) => {
      const token = req.headers.authorization?.split(" ")[1];
      if (!jwt.verify(token, "secret")) return res.status(401).send("Unauthorized");
      next();
    });
    ```
    **Explanation**: Securing endpoints in Node.js prevents unauthorized access.

89. **How would you implement a background job in Node.js?**  
    **Answer**: Use a queue like `bull` with Redis to manage async jobs.  
    **Example**:  
    ```javascript
    const Queue = require("bull");
    const queue = new Queue("jobs");
    queue.process(async job => console.log(job.data));
    queue.add({ task: "process" });
    ```
    **Explanation**: Background jobs in Node.js handle tasks like email sending asynchronously.

90. **How would you monitor a Node.js application?**  
    **Answer**: Use tools like `pm2` or `Prometheus` to monitor performance, errors, and resource usage.  
    **Example**:  
    ```javascript
    // pm2 start app.js --watch
    ```
    **Explanation**: Monitoring in Node.js ensures API reliability and performance.

## Miscellaneous

91. **What is the `Symbol.iterator` property?**  
    **Answer**: `Symbol.iterator` defines an object’s iterator, enabling `for...of` loops.  
    **Example**:  
    ```javascript
    const obj = {
      [Symbol.iterator]: () => {
        let i = 0;
        return { next: () => i < 3 ? { value: i++, done: false } : { done: true } };
      }
    };
    for (const x of obj) console.log(x); // 0, 1, 2
    ```
    **Explanation**: In Node.js, custom iterators process API data streams.

92. **What is the `Object.entries()` method?**  
    **Answer**: `Object.entries()` returns an array of an object’s enumerable key-value pairs.  
    **Example**:  
    ```javascript
    const obj = { a: 1, b: 2 };
    console.log(Object.entries(obj)); // [["a", 1], ["b", 2]]
    ```
    **Explanation**: In Node.js APIs, it transforms objects for JSON responses.

93. **What is the `global.setTimeout` vs. `setTimeout` in Node.js?**  
    **Answer**: `global.setTimeout` explicitly references the global `setTimeout`, ensuring it’s not shadowed by local variables.  
    **Example**:  
    ```javascript
    const setTimeout = () => "shadowed";
    global.setTimeout(() => console.log("global"), 1000);
    ```
    **Explanation**: In Node.js, `global` ensures correct timer usage.

94. **What is the `Intl.DateTimeFormat` API?**  
    **Answer**: `Intl.DateTimeFormat` formats dates according to locale and options.  
    **Example**:  
    ```javascript
    const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "full" });
    console.log(formatter.format(new Date())); // e.g., Monday, July 21, 2025
    ```
    **Explanation**: In Node.js APIs, it localizes date outputs for users.

95. **What is the `Object.values()` method?**  
    **Answer**: `Object.values()` returns an array of an object’s enumerable property values.  
    **Example**:  
    ```javascript
    const obj = { a: 1, b: 2 };
    console.log(Object.values(obj)); // [1, 2]
    ```
    **Explanation**: In Node.js, it extracts values for API data processing.

96. **What is the `WeakRef` object in JavaScript?**  
    **Answer**: `WeakRef` holds a weak reference to an object, allowing garbage collection if no strong references exist.  
    **Example**:  
    ```javascript
    let obj = { data: "test" };
    const ref = new WeakRef(obj);
    console.log(ref.deref().data); // test
    obj = null; // May be garbage collected
    ```
    **Explanation**: In Node.js, `WeakRef` prevents memory leaks in temporary references.

97. **What is the `FinalizationRegistry` in JavaScript?**  
    **Answer**: `FinalizationRegistry` runs a callback when an object is garbage collected, used with `WeakRef`.  
    **Example**:  
    ```javascript
    const registry = new FinalizationRegistry(value => console.log(`Cleaned: ${value}`));
    let obj = { data: "test" };
    registry.register(obj, "obj");
    obj = null; // Eventually logs: Cleaned: obj
    ```
    **Explanation**: In Node.js, it cleans up resources in long-running APIs.

98. **What is the `structuredClone()` function?**  
    **Answer**: `structuredClone()` creates a deep copy of an object, including complex types like `Map` or `Set`.  
    **Example**:  
    ```javascript
    const obj = { a: { b: 1 } };
    const clone = structuredClone(obj);
    clone.a.b = 2;
    console.log(obj.a.b); // 1
    ```
    **Explanation**: In Node.js APIs, it ensures safe data copying without mutations.

99. **What is the `ArrayBuffer` object?**  
    **Answer**: `ArrayBuffer` represents a fixed-length raw binary data buffer, used with typed arrays or `Buffer` in Node.js.  
    **Example**:  
    ```javascript
    const buffer = new ArrayBuffer(8);
    const view = new Uint8Array(buffer);
    view[0] = 255;
    console.log(view); // Uint8Array [255, 0, 0, 0, 0, 0, 0, 0]
    ```
    **Explanation**: In Node.js, it handles binary data for file or network operations.

100. **What is the importance of code linting in JavaScript?**  
     **Answer**: Linting enforces code style and catches errors using tools like ESLint, improving maintainability.  
     **Example**:  
     ```javascript
     // .eslintrc.json
     {
       "rules": { "no-unused-vars": "error" }
     }
     // Code
     let x = 1; // ESLint error: x is defined but never used
     ```
     **Explanation**: In Node.js, linting ensures consistent, error-free API codebases.