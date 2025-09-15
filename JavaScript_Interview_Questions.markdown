# 100 JavaScript Interview Questions with Detailed Answers

## JavaScript Fundamentals

1. **What is the difference between `var`, `let`, and `const` in JavaScript?**  
   **Answer**:  
   - `var` is function-scoped, hoisted with `undefined`, and allows redeclaration and reassignment. It’s legacy and error-prone due to scope leakage.  
   - `let` is block-scoped, hoisted without initialization (causing ReferenceError in TDZ), and allows reassignment but not redeclaration.  
   - `const` is block-scoped, requires initialization at declaration, and prevents reassignment (though object properties can change).  
   **Example**:  
   ```javascript
   var x = 1;
   let y = 2;
   const z = 3;
   if (true) {
     var x = 10; // Affects outer x
     let y = 20; // Block-scoped
     const z = 30; // Block-scoped
     console.log(x, y, z); // 10, 20, 30
   }
   console.log(x, y, z); // 10, 2, 3
   ```
   **Explanation**: Use `let` and `const` in modern JavaScript for better scoping and predictability, especially in backend systems to avoid bugs.

2. **What is hoisting in JavaScript?**  
   **Answer**: Hoisting moves variable and function declarations to the top of their scope during compilation, but only declarations, not initializations. `var` variables are initialized with `undefined`, while `let` and `const` remain in the Temporal Dead Zone (TDZ) until their declaration line.  
   **Example**:  
   ```javascript
   console.log(a); // undefined
   var a = 5;
   console.log(b); // ReferenceError: Cannot access 'b' before initialization
   let b = 10;
   foo(); // Works due to function hoisting
   function foo() { console.log("Hello"); }
   ```
   **Explanation**: In backend Node.js applications, understanding hoisting prevents errors when accessing variables or functions prematurely.

3. **What is the `this` keyword, and how does it behave in different contexts?**  
   **Answer**: The `this` keyword refers to the context in which a function is executed. Its value depends on how the function is called:  
   - Global context: `this` is `global` (Node.js) or `window` (browser).  
   - Object method: `this` is the object calling the method.  
   - Constructor: `this` is the new instance.  
   - Arrow functions: `this` is lexically bound to the enclosing scope.  
   **Example**:  
   ```javascript
   const obj = {
     name: "Test",
     func: function() { console.log(this.name); },
     arrow: () => console.log(this.name)
   };
   obj.func(); // "Test"
   obj.arrow(); // undefined (Node.js global context)
   ```
   **Explanation**: In backend APIs, binding `this` correctly (e.g., using `.bind()` or arrow functions) ensures proper context in callbacks.

4. **What is a closure, and how is it used in JavaScript?**  
   **Answer**: A closure is a function that retains access to its lexical scope’s variables even after the outer function finishes. It’s used for data privacy, memoization, or maintaining state.  
   **Example**:  
   ```javascript
   function counter() {
     let count = 0;
     return function() {
       return ++count;
     };
   }
   const increment = counter();
   console.log(increment()); // 1
   console.log(increment()); // 2
   ```
   **Explanation**: Closures are common in backend systems for creating private variables or caching in Node.js modules.

5. **What is the difference between `null` and `undefined`?**  
   **Answer**: `null` is an explicit absence of value, assigned intentionally. `undefined` means a variable is declared but not assigned or a property doesn’t exist.  
   **Example**:  
   ```javascript
   let a;
   console.log(a); // undefined
   let b = null;
   console.log(b); // null
   console.log(typeof null); // "object" (historical bug)
   console.log(typeof undefined); // "undefined"
   ```
   **Explanation**: In backend APIs, checking for `null` vs. `undefined` ensures correct handling of missing data.

## Variables and Data Types

6. **What are JavaScript’s primitive data types?**  
   **Answer**: JavaScript has seven primitives: `undefined`, `null`, `boolean`, `number`, `bigint`, `string`, and `symbol`. Non-primitives are objects (including arrays and functions).  
   **Example**:  
   ```javascript
   let str = "hello"; // string
   let num = 42; // number
   let sym = Symbol("id"); // symbol
   console.log(typeof str, typeof num, typeof sym); // string, number, symbol
   ```
   **Explanation**: Understanding primitives is crucial for backend data validation and type checking in APIs.

7. **What is type coercion in JavaScript?**  
   **Answer**: Type coercion is the automatic conversion of values between types during operations (e.g., `==` operator). Explicit coercion uses functions like `String()` or `Number()`.  
   **Example**:  
   ```javascript
   console.log(5 + "5"); // "55" (implicit coercion)
   console.log(5 == "5"); // true (loose equality coerces)
   console.log(5 === "5"); // false (strict equality)
   ```
   **Explanation**: In backend systems, avoid loose equality (`==`) to prevent unexpected coercion bugs in API logic.

8. **What is the difference between `==` and `===`?**  
   **Answer**: `==` performs loose equality with type coercion, while `===` performs strict equality without coercion, checking both value and type.  
   **Example**:  
   ```javascript
   console.log(1 == "1"); // true
   console.log(1 === "1"); // false
   console.log(null == undefined); // true
   console.log(null === undefined); // false
   ```
   **Explanation**: Use `===` in backend code for predictable comparisons, especially in database queries or API responses.

9. **What is a Symbol in JavaScript, and what’s its use case?**  
   **Answer**: A `Symbol` is a unique, immutable primitive used as object property keys to avoid naming collisions. It’s often used for private properties or meta-programming.  
   **Example**:  
   ```javascript
   const sym = Symbol("id");
   const obj = { [sym]: 123 };
   console.log(obj[sym]); // 123
   console.log(Object.keys(obj)); // [] (Symbol not enumerable)
   ```
   **Explanation**: In backend systems, Symbols can ensure unique keys in shared modules or APIs.

10. **How does JavaScript handle floating-point arithmetic?**  
    **Answer**: JavaScript uses IEEE 754 double-precision floating-point numbers, leading to precision issues in decimal arithmetic. Use libraries like `decimal.js` for accuracy.  
    **Example**:  
    ```javascript
    console.log(0.1 + 0.2); // 0.30000000000000004
    console.log(Number((0.1 + 0.2).toFixed(2))); // 0.3
    ```
    **Explanation**: In backend financial systems, precise arithmetic is critical to avoid rounding errors in calculations.

## Functions and Functional Programming

11. **What is a higher-order function in JavaScript?**  
    **Answer**: A higher-order function takes functions as arguments or returns a function. It’s used for abstraction, like `map`, `filter`, or custom utilities like debouncing.  
    **Example**:  
    ```javascript
    const double = x => x * 2;
    console.log([1, 2, 3].map(double)); // [2, 4, 6]
    ```
    **Explanation**: In backend APIs, higher-order functions simplify data transformations, like mapping database results.

12. **What is the difference between `call()`, `apply()`, and `bind()`?**  
    **Answer**:  
    - `call()` invokes a function with a specified `this` and arguments individually.  
    - `apply()` invokes with `this` and an array of arguments.  
    - `bind()` returns a new function with a fixed `this` and optional arguments.  
    **Example**:  
    ```javascript
    const obj = { name: "Test" };
    function greet(greeting) { return `${greeting}, ${this.name}`; }
    console.log(greet.call(obj, "Hello")); // Hello, Test
    console.log(greet.apply(obj, ["Hi"])); // Hi, Test
    const bound = greet.bind(obj, "Hey");
    console.log(bound()); // Hey, Test
    ```
    **Explanation**: These methods are useful in backend Node.js for controlling function context in middleware or callbacks.

13. **What are rest parameters in JavaScript?**  
    **Answer**: Rest parameters (`...args`) collect all remaining arguments into an array, allowing flexible function signatures.  
    **Example**:  
    ```javascript
    function sum(...numbers) {
      return numbers.reduce((a, b) => a + b, 0);
    }
    console.log(sum(1, 2, 3, 4)); // 10
    ```
    **Explanation**: Rest parameters are used in backend APIs to handle variable inputs, like processing query parameters.

14. **What is a pure function, and why is it important?**  
    **Answer**: A pure function always returns the same output for the same input and has no side effects (e.g., no external state changes). It improves testability and predictability.  
    **Example**:  
    ```javascript
    function add(a, b) { return a + b; } // Pure
    let x = 0;
    function increment() { return ++x; } // Impure
    console.log(add(2, 3)); // 5 (always)
    console.log(increment()); // 1, 2, ... (varies)
    ```
    **Explanation**: In backend systems, pure functions simplify debugging and concurrency in Node.js modules.

15. **What is currying in JavaScript?**  
    **Answer**: Currying transforms a function with multiple arguments into a sequence of single-argument functions. It’s used for partial application and reusability.  
    **Example**:  
    ```javascript
    const curryAdd = a => b => a + b;
    const add5 = curryAdd(5);
    console.log(add5(3)); // 8
    ```
    **Explanation**: In backend systems, currying can create reusable utilities for API data processing.

## Objects and Prototypes

16. **What is prototypal inheritance in JavaScript?**  
    **Answer**: JavaScript uses prototypes for inheritance, where objects inherit properties and methods from their prototype. The prototype chain links objects to `Object.prototype`.  
    **Example**:  
    ```javascript
    function Animal(name) { this.name = name; }
    Animal.prototype.speak = function() { return `${this.name} speaks`; };
    const dog = new Animal("Dog");
    console.log(dog.speak()); // Dog speaks
    ```
    **Explanation**: In backend Node.js, prototypal inheritance is used in custom modules or libraries for shared behavior.

17. **What is the difference between `Object.create()` and `new`?**  
    **Answer**: `Object.create()` creates an object with a specified prototype, while `new` creates an instance of a constructor, running its code and setting its prototype.  
    **Example**:  
    ```javascript
    const proto = { greet: () => "Hello" };
    const obj1 = Object.create(proto);
    console.log(obj1.greet()); // Hello
    function Person() { this.name = "Test"; }
    const obj2 = new Person();
    console.log(obj2.name); // Test
    ```
    **Explanation**: In backend systems, `Object.create()` is used for flexible inheritance, while `new` is common for structured classes.

18. **What are private fields in JavaScript classes?**  
    **Answer**: Private fields, declared with `#`, restrict access to within the class, ensuring encapsulation.  
    **Example**:  
    ```javascript
    class Counter {
      #count = 0;
      increment() { this.#count++; }
      getCount() { return this.#count; }
    }
    const counter = new Counter();
    console.log(counter.getCount()); // 0
    counter.increment();
    console.log(counter.getCount()); // 1
    // console.log(counter.#count); // SyntaxError
    ```
    **Explanation**: In backend Node.js, private fields protect sensitive data, like API keys or database connections.

19. **What is the `Object.defineProperty()` method used for?**  
    **Answer**: `Object.defineProperty()` defines or modifies a property on an object, controlling attributes like writability, enumerability, or getters/setters.  
    **Example**:  
    ```javascript
    const obj = {};
    Object.defineProperty(obj, "name", {
      value: "Test",
      writable: false,
      enumerable: true
    });
    console.log(obj.name); // Test
    obj.name = "New"; // Ignored
    console.log(obj.name); // Test
    ```
    **Explanation**: In backend systems, it’s used to create immutable or controlled properties in shared objects.

20. **What is a WeakMap, and when is it used?**  
    **Answer**: A `WeakMap` holds weak references to keys (objects), allowing garbage collection if no other references exist. It’s used for private data storage without memory leaks.  
    **Example**:  
    ```javascript
    const wm = new WeakMap();
    let obj = {};
    wm.set(obj, "data");
    console.log(wm.get(obj)); // data
    obj = null; // Allows garbage collection
    ```
    **Explanation**: In backend systems, `WeakMap` prevents memory leaks in long-running Node.js processes.

## Arrays and Iterables

21. **What is the difference between `map()` and `forEach()`?**  
    **Answer**: `map()` creates a new array by applying a function to each element, while `forEach()` executes a function for each element without returning anything.  
    **Example**:  
    ```javascript
    const arr = [1, 2, 3];
    const mapped = arr.map(x => x * 2); // [2, 4, 6]
    arr.forEach(x => console.log(x)); // Logs 1, 2, 3
    console.log(mapped); // [2, 4, 6]
    ```
    **Explanation**: In backend APIs, `map()` transforms data (e.g., database results), while `forEach()` handles side effects like logging.

22. **What is the `reduce()` method, and how is it used?**  
    **Answer**: `reduce()` applies a reducer function to accumulate array elements into a single value, optionally with an initial value.  
    **Example**:  
    ```javascript
    const arr = [1, 2, 3, 4];
    const sum = arr.reduce((acc, curr) => acc + curr, 0);
    console.log(sum); // 10
    ```
    **Explanation**: In backend systems, `reduce()` aggregates data, like summing transaction amounts from a database.

23. **What is the difference between `slice()` and `splice()`?**  
    **Answer**: `slice()` returns a shallow copy of a portion of an array without modifying it. `splice()` modifies the array by removing or replacing elements and returns the removed elements.  
    **Example**:  
    ```javascript
    const arr = [1, 2, 3, 4];
    console.log(arr.slice(1, 3)); // [2, 3]
    console.log(arr); // [1, 2, 3, 4]
    console.log(arr.splice(1, 2, 5)); // [2, 3]
    console.log(arr); // [1, 5, 4]
    ```
    **Explanation**: In backend APIs, `slice()` is used for non-destructive data extraction, while `splice()` modifies data in place.

24. **What is an iterator in JavaScript?**  
    **Answer**: An iterator is an object with a `next()` method that returns `{ value, done }`, enabling custom iteration over data structures. Arrays and Sets are iterable by default.  
    **Example**:  
    ```javascript
    const arr = [1, 2, 3];
    const it = arr[Symbol.iterator]();
    console.log(it.next()); // { value: 1, done: false }
    console.log(it.next()); // { value: 2, done: false }
    console.log(it.next()); // { value: 3, done: false }
    console.log(it.next()); // { value: undefined, done: true }
    ```
    **Explanation**: In backend systems, iterators process large datasets (e.g., streaming database results) efficiently.

25. **What is the `Array.from()` method used for?**  
    **Answer**: `Array.from()` creates a new array from an array-like or iterable object, optionally applying a mapping function.  
    **Example**:  
    ```javascript
    const set = new Set([1, 2, 3]);
    const arr = Array.from(set, x => x * 2);
    console.log(arr); // [2, 4, 6]
    ```
    **Explanation**: In backend systems, it converts query results or Sets into arrays for further processing.

## Asynchronous JavaScript

26. **What is the event loop in JavaScript?**  
    **Answer**: The event loop manages asynchronous operations by processing the call stack, task queue, and microtask queue. It ensures non-blocking behavior in single-threaded JavaScript.  
    **Example**:  
    ```javascript
    console.log("Start");
    setTimeout(() => console.log("Timeout"), 0);
    Promise.resolve().then(() => console.log("Promise"));
    console.log("End");
    // Output: Start, End, Promise, Timeout
    ```
    **Explanation**: In Node.js backends, the event loop handles async I/O operations like API calls or file reads.

27. **What is the difference between `setTimeout` and `setInterval`?**  
    **Answer**: `setTimeout` executes a function once after a delay, while `setInterval` executes repeatedly at the specified interval until cleared.  
    **Example**:  
    ```javascript
    setTimeout(() => console.log("Once"), 1000);
    const id = setInterval(() => console.log("Repeat"), 1000);
    setTimeout(() => clearInterval(id), 3000);
    ```
    **Explanation**: In backend systems, `setInterval` schedules recurring tasks (e.g., polling), while `setTimeout` handles one-off delays.

28. **What is a Promise, and how does it work?**  
    **Answer**: A Promise represents an asynchronous operation’s eventual completion or failure, with states: pending, fulfilled, or rejected. It uses `.then()` and `.catch()` for handling results.  
    **Example**:  
    ```javascript
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("Success"), 1000);
    });
    promise.then(result => console.log(result)); // Success
    ```
    **Explanation**: In backend Node.js, Promises handle async operations like database queries or HTTP requests.

29. **What is `async/await`, and how does it simplify asynchronous code?**  
    **Answer**: `async` functions return Promises, and `await` pauses execution until a Promise resolves, making async code read like synchronous code.  
    **Example**:  
    ```javascript
    async function fetchData() {
      try {
        const data = await new Promise(resolve => setTimeout(() => resolve("Data"), 1000));
        console.log(data); // Data
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    ```
    **Explanation**: In backend APIs, `async/await` simplifies handling database or API calls, improving readability.

30. **What is the difference between microtasks and macrotasks?**  
    **Answer**: Microtasks (e.g., Promises, `queueMicrotask`) have higher priority and execute before macrotasks (e.g., `setTimeout`, `setInterval`). The event loop processes microtasks first.  
    **Example**:  
    ```javascript
    setTimeout(() => console.log("Macrotask"), 0);
    Promise.resolve().then(() => console.log("Microtask"));
    // Output: Microtask, Macrotask
    ```
    **Explanation**: In Node.js, understanding task priority ensures correct async behavior in high-performance backends.

## Error Handling

31. **How does error handling work in JavaScript?**  
    **Answer**: Errors are handled using `try/catch` for synchronous code and `.catch()` or `try/catch` with `async/await` for asynchronous code. Custom errors can extend the `Error` class.  
    **Example**:  
    ```javascript
    try {
      throw new Error("Something went wrong");
    } catch (error) {
      console.log(error.message); // Something went wrong
    }
    ```
    **Explanation**: In backend APIs, robust error handling ensures graceful failure and user-friendly responses.

32. **What is the difference between `throw` and `return` in error handling?**  
    **Answer**: `throw` raises an exception, interrupting execution, while `return` exits a function with a value. `throw` is caught by `try/catch`; `return` is not.  
    **Example**:  
    ```javascript
    function validate(num) {
      if (num < 0) throw new Error("Negative number");
      return num * 2;
    }
    try {
      console.log(validate(-1)); // Throws error
    } catch (e) {
      console.log(e.message); // Negative number
    }
    ```
    **Explanation**: In backend systems, `throw` signals errors in API logic, while `return` handles normal flow.

33. **What is an unhandled promise rejection?**  
    **Answer**: An unhandled promise rejection occurs when a Promise rejects without a `.catch()` handler, potentially crashing a Node.js process unless handled globally.  
    **Example**:  
    ```javascript
    process.on("unhandledRejection", (reason) => console.log(reason));
    Promise.reject("Error");
    // Logs: Error
    ```
    **Explanation**: In Node.js backends, handling rejections prevents crashes in async operations like database queries.

34. **What is the `Error` object in JavaScript?**  
    **Answer**: The `Error` object represents runtime errors, with properties like `message` and `stack`. Subclasses like `TypeError` or `ReferenceError` provide specific error types.  
    **Example**:  
    ```javascript
    try {
      null.foo();
    } catch (e) {
      console.log(e.name, e.message); // TypeError, null.foo is not a function
    }
    ```
    **Explanation**: In backend systems, error types help debug specific issues, like invalid API inputs.

35. **How do you create a custom error in JavaScript?**  
    **Answer**: Extend the `Error` class to create custom errors with specific properties or behavior.  
    **Example**:  
    ```javascript
    class ValidationError extends Error {
      constructor(message) {
        super(message);
        this.name = "ValidationError";
      }
    }
    throw new ValidationError("Invalid input");
    ```
    **Explanation**: In backend APIs, custom errors provide clear feedback for specific failure cases, like invalid user data.

## Modules and Scope

36. **What is the difference between CommonJS and ES Modules?**  
    **Answer**: CommonJS (`require`, `module.exports`) is synchronous and used in Node.js, while ES Modules (`import`, `export`) are asynchronous and standard in modern JavaScript.  
    **Example**:  
    ```javascript
    // CommonJS
    const fs = require("fs");
    module.exports = { foo: "bar" };
    // ES Module
    import fs from "fs";
    export const foo = "bar";
    ```
    **Explanation**: In Node.js backends, ES Modules are increasingly used for tree-shaking and modern tooling support.

37. **What is the `import.meta` object?**  
    **Answer**: `import.meta` provides metadata about the current module, like its URL or path, primarily in ES Modules.  
    **Example**:  
    ```javascript
    console.log(import.meta.url); // file://path/to/module.js
    ```
    **Explanation**: In Node.js, `import.meta` helps resolve file paths dynamically in backend scripts.

38. **What is module scope in JavaScript?**  
    **Answer**: Module scope isolates variables in a module, preventing global namespace pollution. ES Modules have strict module scope; CommonJS uses a wrapper function.  
    **Example**:  
    ```javascript
    // module.js
    const secret = "hidden";
    export const public = "visible";
    // main.js
    import { public } from "./module.js";
    console.log(public); // visible
    // console.log(secret); // ReferenceError
    ```
    **Explanation**: In backend systems, module scope ensures encapsulation in Node.js applications.

39. **What is the `require.cache` object in Node.js?**  
    **Answer**: `require.cache` stores cached modules in CommonJS, allowing reuse without re-execution. Deleting a cache entry forces a reload.  
    **Example**:  
    ```javascript
    const mod = require("./mod");
    delete require.cache[require.resolve("./mod")];
    const mod2 = require("./mod"); // Reloads module
    ```
    **Explanation**: In Node.js backends, managing `require.cache` helps with hot-reloading during development.

40. **What is tree-shaking in JavaScript?**  
    **Answer**: Tree-shaking eliminates unused code from ES Modules during bundling, reducing bundle size. It requires static imports/exports.  
    **Example**:  
    ```javascript
    // module.js
    export const used = () => "Used";
    export const unused = () => "Unused";
    // main.js
    import { used } from "./module.js";
    console.log(used()); // Unused code removed by bundler
    ```
    **Explanation**: In backend Node.js with bundlers like Webpack, tree-shaking optimizes API performance.

## DOM and Events (Relevant for Backend SSR)

41. **What is the DOM, and how is it relevant to backend development?**  
    **Answer**: The Document Object Model (DOM) represents an HTML document as a tree. In backend Node.js with server-side rendering (SSR), libraries like `jsdom` simulate the DOM for rendering HTML.  
    **Example**:  
    ```javascript
    const { JSDOM } = require("jsdom");
    const dom = new JSDOM(`<p>Hello</p>`);
    console.log(dom.window.document.querySelector("p").textContent); // Hello
    ```
    **Explanation**: In SSR backends (e.g., Next.js), DOM manipulation generates dynamic HTML for clients.

42. **What is event delegation in JavaScript?**  
    **Answer**: Event delegation attaches a single event listener to a parent element to handle events from descendants, leveraging event bubbling. It’s efficient for dynamic content.  
    **Example**:  
    ```javascript
    document.querySelector("ul").addEventListener("click", (e) => {
      if (e.target.tagName === "LI") console.log(e.target.textContent);
    });
    ```
    **Explanation**: In SSR backends, event delegation optimizes client-side scripts sent from the server.

43. **What is the difference between `stopPropagation` and `preventDefault`?**  
    **Answer**: `stopPropagation()` prevents an event from bubbling up or capturing down, while `preventDefault()` stops the default action (e.g., form submission).  
    **Example**:  
    ```javascript
    document.querySelector("a").addEventListener("click", (e) => {
      e.preventDefault(); // Stops navigation
      e.stopPropagation(); // Stops bubbling to parent
      console.log("Clicked");
    });
    ```
    **Explanation**: In backend SSR, these methods ensure correct event handling in rendered HTML.

44. **What is a custom event in JavaScript?**  
    **Answer**: A custom event is a user-defined event created with `CustomEvent`, allowing custom data and dispatching.  
    **Example**:  
    ```javascript
    const event = new CustomEvent("myEvent", { detail: { data: "test" } });
    document.addEventListener("myEvent", (e) => console.log(e.detail.data));
    document.dispatchEvent(event); // test
    ```
    **Explanation**: In backend systems with WebSockets, custom events communicate server-side updates to clients.

45. **What is the `addEventListener` method, and how does it work?**  
    **Answer**: `addEventListener` attaches an event handler to an element, supporting multiple handlers and options like `once` or `capture`.  
    **Example**:  
    ```javascript
    document.querySelector("button").addEventListener("click", () => console.log("Clicked"), { once: true });
    ```
    **Explanation**: In SSR backends, it’s used in client-side scripts or simulated DOMs for dynamic behavior.

## Advanced JavaScript Features

46. **What is a generator function, and how is it used?**  
    **Answer**: A generator function (marked with `*`) yields values one at a time, pausing execution with `yield`. It’s used for lazy evaluation or streaming data.  
    **Example**:  
    ```javascript
    function* generateIds() {
      let id = 1;
      while (true) yield id++;
    }
    const gen = generateIds();
    console.log(gen.next().value); // 1
    console.log(gen.next().value); // 2
    ```
    **Explanation**: In backend Node.js, generators process large datasets (e.g., log streams) efficiently.

47. **What is the `Proxy` object in JavaScript?**  
    **Answer**: A `Proxy` wraps an object to intercept operations like property access or modification, using traps like `get` or `set`.  
    **Example**:  
    ```javascript
    const target = { name: "Test" };
    const proxy = new Proxy(target, {
      get: (obj, prop) => prop in obj ? obj[prop] : "Not found"
    });
    console.log(proxy.name); // Test
    console.log(proxy.age); // Not found
    ```
    **Explanation**: In backend APIs, Proxies validate or log property access in shared objects.

48. **What is the `Reflect` API, and when is it used?**  
    **Answer**: The `Reflect` API provides methods for object operations (e.g., `Reflect.get`, `Reflect.set`), often used with Proxies for default behavior.  
    **Example**:  
    ```javascript
    const obj = { name: "Test" };
    console.log(Reflect.get(obj, "name")); // Test
    Reflect.set(obj, "age", 30);
    console.log(obj.age); // 30
    ```
    **Explanation**: In backend systems, `Reflect` ensures consistent object manipulation in meta-programming.

49. **What is the `async` iterator in JavaScript?**  
    **Answer**: An async iterator allows iteration over asynchronous data (e.g., Promises) using `for await...of`. It’s defined with `Symbol.asyncIterator`.  
    **Example**:  
    ```javascript
    const asyncIterable = {
      [Symbol.asyncIterator]() {
        let i = 0;
        return {
          async next() {
            return i < 3 ? { value: Promise.resolve(i++), done: false } : { done: true };
          }
        };
      }
    };
    (async () => {
      for await (const num of asyncIterable) console.log(num); // 0, 1, 2
    })();
    ```
    **Explanation**: In Node.js backends, async iterators stream data from databases or APIs.

50. **What is the `BigInt` type, and why is it used?**  
    **Answer**: `BigInt` handles integers beyond the `Number` type’s safe limit (2^53 - 1), avoiding precision loss. It’s created with `n` suffix or `BigInt()`.  
    **Example**:  
    ```javascript
    const big = 12345678901234567890n;
    console.log(big + 1n); // 12345678901234567891n
    ```
    **Explanation**: In backend financial systems, `BigInt` ensures accurate calculations with large numbers.

## Performance and Optimization

51. **What is memoization in JavaScript?**  
    **Answer**: Memoization caches function results for repeated inputs, improving performance for expensive computations.  
    **Example**:  
    ```javascript
    const memoize = (fn) => {
      const cache = new Map();
      return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn(...args);
        cache.set(key, result);
        return result;
      };
    };
    const fib = memoize(n => n <= 1 ? n : fib(n - 1) + fib(n - 2));
    console.log(fib(40)); // Fast due to caching
    ```
    **Explanation**: In backend APIs, memoization optimizes recursive or database-heavy functions.

52. **What is the difference between `setTimeout(fn, 0)` and `queueMicrotask`?**  
    **Answer**: `setTimeout(fn, 0)` schedules a macrotask, executed after the current stack and microtasks. `queueMicrotask` schedules a microtask, executed before macrotasks.  
    **Example**:  
    ```javascript
    console.log("Start");
    setTimeout(() => console.log("Timeout"), 0);
    queueMicrotask(() => console.log("Microtask"));
    console.log("End");
    // Output: Start, End, Microtask, Timeout
    ```
    **Explanation**: In Node.js, `queueMicrotask` ensures faster async execution for critical tasks.

53. **How can you optimize a JavaScript function for performance?**  
    **Answer**: Optimize by reducing loops, using efficient data structures (e.g., Sets for lookups), memoizing results, avoiding global variables, and minimizing DOM access (in SSR). Profile with tools like Node.js’s `--prof`.  
    **Example**:  
    ```javascript
    // Inefficient
    function findDupes(arr) {
      return arr.filter((x, i) => arr.indexOf(x) !== i);
    }
    // Optimized
    function findDupesFast(arr) {
      const seen = new Set();
      return arr.filter(x => seen.has(x) ? true : !seen.add(x));
    }
    ```
    **Explanation**: In backend systems, optimized functions reduce API response times.

54. **What is a memory leak in JavaScript, and how do you prevent it?**  
    **Answer**: A memory leak occurs when objects are unintentionally retained, preventing garbage collection. Prevent by clearing event listeners, timers, or references in long-running apps.  
    **Example**:  
    ```javascript
    let obj = {};
    setInterval(() => { obj.data = new Array(1000000); }, 1000); // Leak
    // Fix: Clear interval
    const id = setInterval(() => {}, 1000);
    clearInterval(id);
    ```
    **Explanation**: In Node.js backends, memory leaks crash servers; tools like `heapdump` help diagnose.

55. **What is the role of a WeakSet in JavaScript?**  
    **Answer**: A `WeakSet` stores weakly referenced objects, allowing garbage collection if no other references exist. It’s used for tracking objects without preventing cleanup.  
    **Example**:  
    ```javascript
    const ws = new WeakSet();
    let obj = {};
    ws.add(obj);
    console.log(ws.has(obj)); // true
    obj = null; // Allows garbage collection
    ```
    **Explanation**: In backend systems, `WeakSet` prevents memory leaks in temporary object tracking.

## Node.js-Specific JavaScript

56. **What is the `process` object in Node.js?**  
    **Answer**: The `process` object provides information and control over the Node.js process, including environment variables, arguments, and exit handling.  
    **Example**:  
    ```javascript
    console.log(process.env.NODE_ENV); // e.g., "development"
    process.on("exit", () => console.log("Exiting"));
    ```
    **Explanation**: In backend Node.js, `process` manages runtime configuration and lifecycle events.

57. **What is the `Buffer` class in Node.js?**  
    **Answer**: The `Buffer` class handles raw binary data, used for file I/O, network operations, or encoding conversions.  
    **Example**:  
    ```javascript
    const buf = Buffer.from("Hello");
    console.log(buf.toString("base64")); // SGVsbG8=
    ```
    **Explanation**: In Node.js backends, `Buffer` processes binary data for APIs or file handling.

58. **How does Node.js handle asynchronous I/O?**  
    **Answer**: Node.js uses an event-driven, non-blocking I/O model with the event loop, leveraging `libuv` for async operations like file or network I/O.  
    **Example**:  
    ```javascript
    const fs = require("fs");
    fs.readFile("file.txt", (err, data) => {
      if (err) throw err;
      console.log(data.toString());
    });
    ```
    **Explanation**: Async I/O is critical for scalable backend APIs handling multiple requests.

59. **What is the `EventEmitter` class in Node.js?**  
    **Answer**: `EventEmitter` enables event-driven programming by allowing objects to emit and listen for custom events.  
    **Example**:  
    ```javascript
    const EventEmitter = require("events");
    const emitter = new EventEmitter();
    emitter.on("greet", (msg) => console.log(msg));
    emitter.emit("greet", "Hello"); // Hello
    ```
    **Explanation**: In Node.js backends, `EventEmitter` powers real-time features like WebSockets.

60. **What is the `module.exports` object in Node.js?**  
    **Answer**: `module.exports` defines what a module exports, making functions, objects, or values available to other modules.  
    **Example**:  
    ```javascript
    // math.js
    module.exports = { add: (a, b) => a + b };
    // main.js
    const math = require("./math");
    console.log(math.add(2, 3)); // 5
    ```
    **Explanation**: In Node.js backends, `module.exports` organizes code into reusable modules.

## Functional Programming Patterns

61. **What is function composition in JavaScript?**  
    **Answer**: Function composition combines multiple functions, where the output of one becomes the input of another, often using a utility like `compose`.  
    **Example**:  
    ```javascript
    const compose = (f, g) => x => f(g(x));
    const add1 = x => x + 1;
    const double = x => x * 2;
    const addThenDouble = compose(double, add1);
    console.log(addThenDouble(5)); // 12
    ```
    **Explanation**: In backend APIs, composition creates reusable data transformation pipelines.

62. **What is a monad in JavaScript?**  
    **Answer**: A monad is a design pattern that wraps a value, providing methods to chain operations (e.g., `map`, `flatMap`) while handling side effects. Promises are monad-like.  
    **Example**:  
    ```javascript
    Promise.resolve(5)
      .then(x => x + 1)
      .then(x => x * 2)
      .then(console.log); // 12
    ```
    **Explanation**: In backend systems, monads (like Promises) manage async workflows cleanly.

63. **What is the difference between `map` and `flatMap`?**  
    **Answer**: `map` transforms each element into a new value, while `flatMap` transforms and flattens nested arrays or structures.  
    **Example**:  
    ```javascript
    const arr = [1, 2, 3];
    console.log(arr.map(x => [x * 2])); // [[2], [4], [6]]
    console.log(arr.flatMap(x => [x * 2])); // [2, 4, 6]
    ```
    **Explanation**: In backend APIs, `flatMap` processes nested data, like query results.

64. **What is a partial application in JavaScript?**  
    **Answer**: Partial application fixes some arguments of a function, returning a new function with fewer parameters.  
    **Example**:  
    ```javascript
    const add = (a, b) => a + b;
    const add5 = add.bind(null, 5);
    console.log(add5(3)); // 8
    ```
    **Explanation**: In backend systems, partial application creates reusable utilities for API handlers.

65. **What is a functor in JavaScript?**  
    **Answer**: A functor is an object with a `map` method that applies a function to its wrapped value, preserving structure (e.g., arrays, Promises).  
    **Example**:  
    ```javascript
    const arr = [1, 2, 3];
    console.log(arr.map(x => x + 1)); // [2, 3, 4]
    Promise.resolve(5).then(x => x + 1).then(console.log); // 6
    ```
    **Explanation**: In backend systems, functors simplify data transformations in functional pipelines.

## Error Handling in Async Code

66. **How do you handle errors in `async/await`?**  
    **Answer**: Use `try/catch` to handle rejected Promises in `async` functions, ensuring graceful error handling.  
    **Example**:  
    ```javascript
    async function fetchData() {
      try {
        const data = await Promise.reject("Error");
      } catch (error) {
        console.log(error); // Error
      }
    }
    fetchData();
    ```
    **Explanation**: In Node.js APIs, `try/catch` with `async/await` ensures robust error handling for database or HTTP calls.

67. **What is the `Promise.all()` method, and how does it handle errors?**  
    **Answer**: `Promise.all()` takes an array of Promises and resolves when all succeed or rejects on the first failure.  
    **Example**:  
    ```javascript
    Promise.all([
      Promise.resolve(1),
      Promise.reject("Error"),
      Promise.resolve(3)
    ]).catch(err => console.log(err)); // Error
    ```
    **Explanation**: In backend systems, `Promise.all()` fetches multiple resources concurrently but requires error handling.

68. **What is `Promise.race()` used for?**  
    **Answer**: `Promise.race()` resolves or rejects with the first Promise that settles, used for timeouts or fastest response scenarios.  
    **Example**:  
    ```javascript
    const timeout = new Promise((_, reject) => setTimeout(() => reject("Timeout"), 1000));
    Promise.race([fetchData(), timeout]).catch(err => console.log(err));
    ```
    **Explanation**: In Node.js backends, `Promise.race()` implements timeouts for API requests.

69. **What is `Promise.allSettled()`?**  
    **Answer**: `Promise.allSettled()` resolves when all Promises settle (resolved or rejected), returning an array of their statuses.  
    **Example**:  
    ```javascript
    Promise.allSettled([
      Promise.resolve(1),
      Promise.reject("Error"),
      Promise.resolve(3)
    ]).then(results => console.log(results));
    // [{status: "fulfilled", value: 1}, {status: "rejected", reason: "Error"}, {status: "fulfilled", value: 3}]
    ```
    **Explanation**: In backend APIs, it’s used to process multiple requests without failing on errors.

70. **How do you handle async errors globally in Node.js?**  
    **Answer**: Use the `process` event `unhandledRejection` to catch unhandled Promise rejections globally, preventing crashes.  
    **Example**:  
    ```javascript
    process.on("unhandledRejection", (reason, promise) => {
      console.log("Unhandled:", reason);
    });
    Promise.reject("Error");
    ```
    **Explanation**: In Node.js backends, global error handling ensures stability in production.

## Security in JavaScript

71. **What is a prototype pollution attack?**  
    **Answer**: Prototype pollution occurs when an attacker modifies `Object.prototype`, affecting all objects. Prevent by sanitizing inputs and avoiding unsafe merges.  
    **Example**:  
    ```javascript
    const obj = JSON.parse('{"__proto__": {"polluted": true}}');
    console.log({}.polluted); // true
    ```
    **Explanation**: In Node.js APIs, sanitizing JSON inputs prevents prototype pollution vulnerabilities.

72. **How can you prevent XSS in server-side rendered JavaScript?**  
    **Answer**: Sanitize user inputs and escape outputs in SSR (e.g., using `sanitize-html`). Avoid direct DOM manipulation with untrusted data.  
    **Example**:  
    ```javascript
    const sanitizeHtml = require("sanitize-html");
    const dirty = "<script>alert('xss')</script>";
    console.log(sanitizeHtml(dirty)); // Escaped output
    ```
    **Explanation**: In Node.js SSR backends, XSS prevention ensures safe HTML rendering.

73. **What is the `SameSite` cookie attribute?**  
    **Answer**: The `SameSite` attribute (`Strict`, `Lax`, `None`) controls when cookies are sent in cross-site requests, mitigating CSRF attacks.  
    **Example**:  
    ```javascript
    // Express.js
    res.cookie("session", "id", { sameSite: "Strict" });
    ```
    **Explanation**: In backend APIs, `SameSite` enhances security for session cookies.

74. **What is a CSRF attack, and how is it mitigated in JavaScript?**  
    **Answer**: A CSRF attack tricks users into executing unwanted actions. Mitigate with CSRF tokens, validated server-side, and `SameSite` cookies.  
    **Example**:  
    ```javascript
    // Express middleware
    const csrf = require("csurf");
    app.use(csrf());
    app.post("/action", (req, res) => {
      console.log(req.csrfToken()); // Validate token
    });
    ```
    **Explanation**: In Node.js backends, CSRF protection secures form submissions.

75. **What is the `Content-Security-Policy` (CSP) header?**  
    **Answer**: CSP restricts resources (e.g., scripts, styles) a page can load, mitigating XSS. Set via HTTP headers in SSR.  
    **Example**:  
    ```javascript
    // Express.js
    app.use((req, res, next) => {
      res.setHeader("Content-Security-Policy", "script-src 'self'");
      next();
    });
    ```
    **Explanation**: In Node.js SSR, CSP enhances security for rendered pages.

## Practical Coding Scenarios

76. **How would you implement a debounce function?**  
    **Answer**: Debouncing delays a function’s execution until a pause in calls, useful for rate-limiting events like API searches.  
    **Example**:  
    ```javascript
    function debounce(fn, delay) {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
      };
    }
    const log = debounce(console.log, 1000);
    log("Test"); // Logs after 1s pause
    ```
    **Explanation**: In backend APIs, debouncing reduces server load for frequent requests.

77. **How would you implement a throttle function?**  
    **Answer**: Throttling limits function execution to once per interval, ensuring steady execution.  
    **Example**:  
    ```javascript
    function throttle(fn, delay) {
      let last = 0;
      return (...args) => {
        const now = Date.now();
        if (now - last >= delay) {
          fn(...args);
          last = now;
        }
      };
    }
    const log = throttle(console.log, 1000);
    log("Test"); // Logs immediately, then every 1s
    ```
    **Explanation**: In Node.js backends, throttling controls API call rates.

78. **How would you deep clone an object in JavaScript?**  
    **Answer**: Use `structuredClone` (modern) or `JSON.parse(JSON.stringify())` for simple objects, or a recursive function for complex cases.  
    **Example**:  
    ```javascript
    const obj = { a: 1, b: { c: 2 } };
    const clone = JSON.parse(JSON.stringify(obj));
    clone.b.c = 3;
    console.log(obj.b.c); // 2 (original unchanged)
    ```
    **Explanation**: In backend systems, deep cloning prevents unintended mutations in shared data.

79. **How would you flatten a nested array?**  
    **Answer**: Use `Array.prototype.flat()` or recursion to flatten nested arrays to a single level.  
    **Example**:  
    ```javascript
    const arr = [1, [2, [3, 4], 5]];
    console.log(arr.flat(Infinity)); // [1, 2, 3, 4, 5]
    function flatten(arr) {
      return arr.reduce((flat, curr) => flat.concat(Array.isArray(curr) ? flatten(curr) : curr), []);
    }
    console.log(flatten(arr)); // [1, 2, 3, 4, 5]
    ```
    **Explanation**: In backend APIs, flattening processes nested data from JSON responses.

80. **How would you implement a simple pub/sub system?**  
    **Answer**: Create a pub/sub system with methods to subscribe, unsubscribe, and publish events.  
    **Example**:  
    ```javascript
    class PubSub {
      constructor() { this.subs = new Map(); }
      subscribe(event, callback) {
        if (!this.subs.has(event)) this.subs.set(event, []);
        this.subs.get(event).push(callback);
      }
      unsubscribe(event, callback) {
        const cbs = this.subs.get(event);
        if (cbs) this.subs.set(event, cbs.filter(cb => cb !== callback));
      }
      publish(event, data) {
        const cbs = this.subs.get(event);
        if (cbs) cbs.forEach(cb => cb(data));
      }
    }
    const ps = new PubSub();
    ps.subscribe("update", console.log);
    ps.publish("update", "Data"); // Logs: Data
    ```
    **Explanation**: In Node.js backends, pub/sub systems enable event-driven architectures, like WebSocket notifications.

## JavaScript in Backend Contexts

81. **How do you handle file uploads in Node.js?**  
    **Answer**: Use middleware like `multer` to handle multipart form data for file uploads, saving to disk or memory.  
    **Example**:  
    ```javascript
    const express = require("express");
    const multer = require("multer");
    const app = express();
    const upload = multer({ dest: "uploads/" });
    app.post("/upload", upload.single("file"), (req, res) => {
      res.send("File uploaded");
    });
    ```
    **Explanation**: In backend APIs, file uploads handle user content, like images, securely.

82. **How do you implement a REST API in Node.js?**  
    **Answer**: Use Express.js to define routes, handle HTTP methods, and return JSON responses.  
    **Example**:  
    ```javascript
    const express = require("express");
    const app = express();
    app.use(express.json());
    app.get("/users/:id", (req, res) => res.json({ id: req.params.id }));
    app.listen(3000);
    ```
    **Explanation**: REST APIs in Node.js backends serve data for clients or microservices.

83. **What is middleware in Express.js?**  
    **Answer**: Middleware are functions executed in the request-response cycle, handling tasks like logging, authentication, or parsing.  
    **Example**:  
    ```javascript
    const express = require("express");
    const app = express();
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.url}`);
      next();
    });
    app.get("/", (req, res) => res.send("Hello"));
    app.listen(3000);
    ```
    **Explanation**: Middleware in Node.js backends modularizes request processing.

84. **How do you connect to a database in Node.js?**  
    **Answer**: Use drivers or ORMs (e.g., `mongodb`, `mongoose`) to connect to databases, handling connections and queries.  
    **Example**:  
    ```javascript
    const { MongoClient } = require("mongodb");
    async function connect() {
      const client = new MongoClient("mongodb://localhost:27017");
      await client.connect();
      const db = client.db("test");
      console.log(await db.collection("users").findOne());
      await client.close();
    }
    connect();
    ```
    **Explanation**: Database connections are critical for Node.js backends to store and retrieve data.

85. **How do you implement WebSockets in Node.js?**  
    **Answer**: Use the `ws` library or `Socket.IO` for real-time, bidirectional communication.  
    **Example**:  
    ```javascript
    const WebSocket = require("ws");
    const wss = new WebSocket.Server({ port: 8080 });
    wss.on("connection", ws => {
      ws.on("message", msg => ws.send(`Echo: ${msg}`));
    });
    ```
    **Explanation**: WebSockets in Node.js backends enable real-time features like chat.

## Debugging and Testing

86. **How do you debug JavaScript code in Node.js?**  
    **Answer**: Use `console.log`, Node.js’s built-in debugger (`node --inspect`), or IDE tools like VS Code.  
    **Example**:  
    ```javascript
    node --inspect script.js
    // Open chrome://inspect in Chrome to debug
    ```
    **Explanation**: Debugging in Node.js backends identifies issues in API or database logic.

87. **What is a unit test in JavaScript?**  
    **Answer**: A unit test verifies a single function or module in isolation, using frameworks like Jest or Mocha.  
    **Example**:  
    ```javascript
    const sum = (a, b) => a + b;
    test("adds 1 + 2 to equal 3", () => {
      expect(sum(1, 2)).toBe(3);
    });
    ```
    **Explanation**: Unit tests ensure reliable backend logic in Node.js applications.

88. **What is mocking in JavaScript testing?**  
    **Answer**: Mocking simulates dependencies (e.g., APIs, databases) to isolate the unit under test.  
    **Example**:  
    ```javascript
    jest.mock("axios");
    axios.get.mockResolvedValue({ data: "mocked" });
    ```
    **Explanation**: In Node.js backends, mocking tests API handlers without external calls.

89. **What is the `console` object used for?**  
    **Answer**: The `console` object logs messages for debugging, with methods like `log`, `error`, `warn`, or `time`.  
    **Example**:  
    ```javascript
    console.time("loop");
    for (let i = 0; i < 1000; i++) {}
    console.timeEnd("loop"); // loop: 0.123ms
    ```
    **Explanation**: In Node.js backends, `console` aids debugging and performance profiling.

90. **What is code coverage in JavaScript testing?**  
    **Answer**: Code coverage measures the percentage of code executed during tests, reported by tools like Jest or Istanbul.  
    **Example**:  
    ```javascript
    // Run: jest --coverage
    ```
    **Explanation**: In backend development, high coverage ensures robust API and logic testing.

## Practical Scenarios

91. **How would you parse a large JSON file in Node.js?**  
    **Answer**: Use streams with `JSONStream` to parse large JSON files incrementally, avoiding memory overload.  
    **Example**:  
    ```javascript
    const fs = require("fs");
    const JSONStream = require("JSONStream");
    const stream = fs.createReadStream("large.json").pipe(JSONStream.parse("*"));
    stream.on("data", data => console.log(data));
    ```
    **Explanation**: Streaming in Node.js backends handles large datasets efficiently.

92. **How would you implement a retry mechanism for API calls?**  
    **Answer**: Use a recursive function or library like `p-retry` to retry failed API calls with exponential backoff.  
    **Example**:  
    ```javascript
    async function fetchWithRetry(url, retries = 3) {
      try {
        return await fetch(url);
      } catch (err) {
        if (retries === 0) throw err;
        await new Promise(resolve => setTimeout(resolve, 1000));
        return fetchWithRetry(url, retries - 1);
      }
    }
    ```
    **Explanation**: In Node.js backends, retries handle transient API failures.

93. **How would you validate user input in a Node.js API?**  
    **Answer**: Use libraries like `Joi` or `express-validator` to validate input schemas before processing.  
    **Example**:  
    ```javascript
    const Joi = require("joi");
    const schema = Joi.object({ name: Joi.string().required() });
    const result = schema.validate({ name: "Test" });
    console.log(result.error); // undefined (valid)
    ```
    **Explanation**: Input validation in Node.js APIs prevents invalid data and security issues.

94. **How would you implement pagination in a Node.js API?**  
    **Answer**: Use query parameters like `page` and `limit`, slicing data from a database query.  
    **Example**:  
    ```javascript
    app.get("/users", async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const users = await db.users.find().skip((page - 1) * limit).limit(limit);
      res.json(users);
    });
    ```
    **Explanation**: Pagination in Node.js APIs improves performance for large datasets.

95. **How would you handle environment variables in Node.js?**  
    **Answer**: Use `process.env` with a `.env` file and `dotenv` library to manage configuration securely.  
    **Example**:  
    ```javascript
    require("dotenv").config();
    console.log(process.env.DB_URL); // From .env file
    ```
    **Explanation**: Environment variables in Node.js backends store sensitive data like API keys.

## Miscellaneous

96. **What is the `global` object in Node.js?**  
    **Answer**: The `global` object is the global namespace in Node.js, similar to `window` in browsers, containing globals like `process` or `console`.  
    **Example**:  
    ```javascript
    global.myVar = "test";
    console.log(myVar); // test
    ```
    **Explanation**: Avoid polluting `global` in Node.js backends to prevent conflicts.

97. **What is the `instanceof` operator, and how does it work?**  
    **Answer**: `instanceof` checks if an object is an instance of a constructor by traversing its prototype chain.  
    **Example**:  
    ```javascript
    class MyClass {}
    const obj = new MyClass();
    console.log(obj instanceof MyClass); // true
    console.log(obj instanceof Object); // true
    ```
    **Explanation**: In backend systems, `instanceof` validates object types in API logic.

98. **What is the `eval()` function, and why is it dangerous?**  
    **Answer**: `eval()` executes a string as JavaScript code, posing security risks like code injection if used with untrusted input.  
    **Example**:  
    ```javascript
    eval("console.log('Hello')"); // Hello
    ```
    **Explanation**: In Node.js backends, avoid `eval()`; use safer alternatives like `Function` constructors with sanitization.

99. **What is the `Intl` API in JavaScript?**  
    **Answer**: The `Intl` API provides internationalization features like date, number, and string formatting.  
    **Example**:  
    ```javascript
    const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
    console.log(formatter.format(1234.56)); // $1,234.56
    ```
    **Explanation**: In backend APIs, `Intl` ensures localized responses for global users.

100. **What is the importance of strict mode in JavaScript?**  
     **Answer**: Strict mode (`"use strict"`) enforces stricter parsing and error handling, preventing silent errors and unsafe practices.  
     **Example**:  
     ```javascript
     "use strict";
     x = 10; // ReferenceError: x is not defined
     ```
     **Explanation**: In Node.js backends, strict mode improves code reliability and security.