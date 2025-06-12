# 50 JavaScript Interview Questions with Detailed Answers and Code Examples

1. **What is the difference between `var`, `let`, and `const`?**
   - **Answer**: `var` is function-scoped, hoisted, and allows redeclaration. `let` is block-scoped, hoisted but not initialized (Temporal Dead Zone), and allows reassignment. `const` is block-scoped, cannot be reassigned, but object properties can be modified.
   - **Code Example**:
     ```javascript
     var x = 1; var x = 2; // Allowed
     let y = 1; y = 2; // Allowed
     const z = 1; // z = 2; // Error
     const obj = { a: 1 }; obj.a = 2; // Allowed
     console.log(x, y, obj.a); // 2, 2, 2
     ```

2. **What is hoisting in JavaScript?**
   - **Answer**: Hoisting moves variable and function declarations to the top of their scope during compilation. `var` is initialized with `undefined`; `let` and `const` are not initialized (Temporal Dead Zone).
   - **Code Example**:
     ```javascript
     console.log(x); // undefined
     var x = 5;
     console.log(y); // ReferenceError: Cannot access 'y' before initialization
     let y = 10;
     ```

3. **What is the difference between `==` and `===` in JavaScript?**
   - **Answer**: `==` performs loose equality with type coercion (e.g., `5 == "5"` is `true`). `===` performs strict equality, checking value and type (e.g., `5 === "5"` is `false`).
   - **Code Example**:
     ```javascript
     console.log(5 == "5"); // true
     console.log(5 === "5"); // false
     ```

4. **What is the purpose of the `this` keyword?**
   - **Answer**: `this` refers to the context in which a function is executed, determined by how the function is called (global object, object for methods, or specified via `call`/`apply`/`bind`).
   - **Code Example**:
     ```javascript
     const obj = {
       name: "Alice",
       getName() { return this.name; }
     };
     console.log(obj.getName()); // Alice
     ```

5. **What are closures in JavaScript?**
   - **Answer**: A closure is a function that retains access to its outer scope’s variables after the outer function returns, useful for data privacy or state management.
   - **Code Example**:
     ```javascript
     function counter() {
       let count = 0;
       return function() { return ++count; };
     }
     const inc = counter();
     console.log(inc()); // 1
     console.log(inc()); // 2
     ```

6. **What is the event loop in JavaScript?**
   - **Answer**: The event loop manages asynchronous operations in JavaScript’s single-threaded environment, processing the call stack and handling tasks from the callback queue (e.g., timers, events) when the stack is empty.
   - **Code Example**:
     ```javascript
     console.log("Start");
     setTimeout(() => console.log("Timeout"), 0);
     console.log("End"); // Start, End, Timeout
     ```

7. **What is the difference between `null` and `undefined`?**
   - **Answer**: `null` represents an intentional absence of a value, set explicitly. `undefined` indicates a variable is declared but not assigned or a property doesn’t exist.
   - **Code Example**:
     ```javascript
     let x;
     console.log(x); // undefined
     let y = null;
     console.log(y); // null
     ```

8. **What are arrow functions, and how do they differ from regular functions?**
   - **Answer**: Arrow functions (`=>`) are concise, don’t bind their own `this` or `arguments`, inheriting from the parent scope. They’re unsuitable as constructors or for changing `this`.
   - **Code Example**:
     ```javascript
     const add = (a, b) => a + b;
     console.log(add(2, 3)); // 5
     const obj = { name: "Bob", say: () => this.name };
     console.log(obj.say()); // undefined (this is global)
     ```

9. **What is the purpose of `async` and `await`?**
   - **Answer**: `async` declares a function that returns a Promise. `await` pauses execution inside an `async` function until a Promise resolves, simplifying asynchronous code.
   - **Code Example**:
     ```javascript
     async function fetchData() {
       const data = await new Promise(resolve => setTimeout(() => resolve("Data"), 1000));
       return data;
     }
     fetchData().then(console.log); // Data (after 1s)
     ```

10. **What is the difference between `call`, `apply`, and `bind`?**
    - **Answer**: `call` invokes a function with a specified `this` and individual arguments. `apply` uses an array of arguments. `bind` returns a new function with a fixed `this`.
    - **Code Example**:
      ```javascript
      const obj = { name: "Alice" };
      function greet(greeting) { return `${greeting}, ${this.name}!`; }
      console.log(greet.call(obj, "Hello")); // Hello, Alice!
      console.log(greet.apply(obj, ["Hi"])); // Hi, Alice!
      const bound = greet.bind(obj);
      console.log(bound("Hey")); // Hey, Alice!
      ```

11. **What is event delegation?**
    - **Answer**: Event delegation attaches a single event listener to a parent element to handle events from its children, leveraging event bubbling for efficiency.
    - **Code Example**:
      ```javascript
      document.querySelector("ul").addEventListener("click", (e) => {
        if (e.target.tagName === "LI") {
          console.log(e.target.textContent);
        }
      });
      // <ul><li>Item 1</li><li>Item 2</li></ul>
      ```

12. **What is the difference between `forEach` and `map`?**
    - **Answer**: `forEach` iterates over an array for side effects, returning nothing. `map` creates a new array with the results of a callback function.
    - **Code Example**:
      ```javascript
      const arr = [1, 2, 3];
      arr.forEach(x => console.log(x)); // 1, 2, 3
      const doubled = arr.map(x => x * 2);
      console.log(doubled); // [2, 4, 6]
      ```

13. **What are Promises in JavaScript?**
    - **Answer**: A Promise represents the eventual result of an asynchronous operation, with states (`pending`, `fulfilled`, `rejected`) and methods like `.then()`, `.catch()`.
    - **Code Example**:
      ```javascript
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("Success"), 1000);
      });
      promise.then(result => console.log(result)); // Success
      ```

14. **What is the purpose of the `try...catch` block?**
    - **Answer**: The `try...catch` block handles errors, executing code in `try` and catching errors in `catch` to prevent script crashes.
    - **Code Example**:
      ```javascript
      try {
        JSON.parse("invalid");
      } catch (e) {
        console.log("Error:", e.message); // Error: Unexpected token i...
      }
      ```

15. **What is the difference between `let` and `const` in a block scope?**
    - **Answer**: `let` allows reassignment within its block scope. `const` prevents reassignment, but object/array properties can be modified.
    - **Code Example**:
      ```javascript
      let x = 1; Ascending - 1, Descending - 2
x = 2; // Allowed
      const y = { a: 1 };
      y.a = 2; // Allowed
      // y = { b: 2 }; // Error
      console.log(x, y.a); // 2, 2
      ```

16. **What is the `spread` operator (`...`)?**
    - **Answer**: The spread operator expands elements of an iterable (array, object) for copying, merging, or passing arguments.
    - **Code Example**:
      ```javascript
      const arr1 = [1, 2];
      const arr2 = [...arr1, 3, 4];
      console.log(arr2); // [1, 2, 3, 4]
      const obj1 = { a: 1 };
      const obj2 = { ...obj1, b: 2 };
      console.log(obj2); // { a: 1, b: 2 }
      ```

17. **What is the `rest` parameter in JavaScript?**
    - **Answer**: The rest parameter (`...param`) collects remaining arguments into an array, useful for variable-length argument lists.
    - **Code Example**:
      ```javascript
      function sum(...numbers) {
        return numbers.reduce((a, b) => a + b, 0);
      }
      console.log(sum(1, 2, 3, 4)); // 10
      ```

18. **What is the difference between `setTimeout` and `setInterval`?**
    - **Answer**: `setTimeout` executes a function once after a delay. `setInterval` repeatedly executes at a specified interval until cleared.
    - **Code Example**:
      ```javascript
      setTimeout(() => console.log("Once"), 1000);
      const id = setInterval(() => console.log("Every second"), 1000);
      setTimeout(() => clearInterval(id), 3000); // Stops after 3 seconds
      ```

19. **What is a JavaScript module?**
    - **Answer**: A module is a JavaScript file that encapsulates code, exporting and importing variables or functions to promote modularity and avoid global scope pollution.
    - **Code Example**:
      ```javascript
      // module.js
      export const greet = () => "Hello!";
      // main.js
      import { greet } from './module.js';
      console.log(greet()); // Hello!
      ```

20. **What is the purpose of the `addEventListener` method?**
    - **Answer**: The `addEventListener` method attaches an event handler to an element without overwriting existing handlers, supporting options like `once` or `capture`.
    - **Code Example**:
      ```javascript
      document.querySelector("button").addEventListener("click", () => {
        console.log("Clicked!");
      }, { once: true });
      ```

21. **What is the `Array.prototype.filter` method?**
    - **Answer**: The `filter` method creates a new array with elements that pass a callback test, used for selecting subsets of data.
    - **Code Example**:
      ```javascript
      const numbers = [1, 2, 3, 4];
      const evens = numbers.filter(x => x % 2 === 0);
      console.log(evens); // [2, 4]
      ```

22. **What is the difference between `slice` and `splice`?**
    - **Answer**: `slice` returns a shallow copy of a portion of an array without modifying it. `splice` modifies the original array, removing or replacing elements.
    - **Code Example**:
      ```javascript
      const arr = [1, 2, 3, 4];
      console.log(arr.slice(1, 3)); // [2, 3]
      console.log(arr); // [1, 2, 3, 4]
      console.log(arr.splice(1, 2, 5)); // [2, 3]
      console.log(arr); // [1, 5, 4]
      ```

23. **What are the `JSON.parse` and `JSON.stringify` methods?**
    - **Answer**: `JSON.parse` converts a JSON string to a JavaScript object. `JSON.stringify` converts an object to a JSON string for serialization.
    - **Code Example**:
      ```javascript
      const json = '{"name": "Alice"}';
      const obj = JSON.parse(json);
      console.log(obj.name); // Alice
      console.log(JSON.stringify(obj)); // {"name":"Alice"}
      ```

24. **What is the purpose of the `bind` method?**
    - **Answer**: The `bind` method creates a new function with a fixed `this` context and optional preset arguments, useful for callbacks.
    - **Code Example**:
      ```javascript
      const obj = { name: "Bob" };
      function greet() { return this.name; }
      const bound = greet.bind(obj);
      console.log(bound()); // Bob
      ```

25. **What is the difference between `event.preventDefault` and `event.stopPropagation`?**
    - **Answer**: `event.preventDefault()` prevents the default action (e.g., form submission). `event.stopPropagation()` stops the event from bubbling or capturing further.
    - **Code Example**:
      ```javascript
      document.querySelector("a").addEventListener("click", (e) => {
        e.preventDefault(); // Prevents navigation
        console.log("Link clicked");
      });
      document.querySelector("div").addEventListener("click", (e) => {
        e.stopPropagation(); // Stops parent handlers
      });
      ```

26. **What is a JavaScript Promise chain?**
    - **Answer**: A Promise chain is a sequence of `.then()` or `.catch()` calls to handle asynchronous operations sequentially.
    - **Code Example**:
      ```javascript
      Promise.resolve(1)
        .then(x => x + 1)
        .then(x => console.log(x)); // 2
      ```

27. **What is the `Array.prototype.reduce` method?**
    - **Answer**: The `reduce` method reduces an array to a single value by applying a callback to each element, used for aggregations like summing.
    - **Code Example**:
      ```javascript
      const numbers = [1, 2, 3];
      const sum = numbers.reduce((acc, curr) => acc + curr, 0);
      console.log(sum); // 6
      ```

28. **What is the difference between `call` and `apply`?**
    - **Answer**: `call` invokes a function with a specified `this` and individual arguments. `apply` uses an array of arguments.
    - **Code Example**:
      ```javascript
      function add(a, b) { return a + b; }
      console.log(add.call(null, 1, 2)); // 3
      console.log(add.apply(null, [1, 2])); // 3
      ```

29. **What is the `Object.defineProperty` method?**
    - **Answer**: The `Object.defineProperty` method defines or modifies a property on an object, controlling its value, writability, and other attributes.
    - **Code Example**:
      ```javascript
      const obj = {};
      Object.defineProperty(obj, "x", { value: 42, writable: false });
      console.log(obj.x); // 42
      obj.x = 100; // Ignored
      console.log(obj.x); // 42
      ```

30. **What is a `debounce` function in JavaScript?**
    - **Answer**: A debounce function delays execution until a specified time has passed since the last call, useful for rate-limiting frequent events.
    - **Code Example**:
      ```javascript
      function debounce(fn, delay) {
        let timeout;
        return function(...args) {
          clearTimeout(timeout);
          timeout = setTimeout(() => fn(...args), delay);
        };
      }
      const log = debounce(() => console.log("Debounced"), 1000);
      log(); // Executes after 1s if not called again
      ```

31. **What is a `throttle` function in JavaScript?**
    - **Answer**: A throttle function ensures a function is called at most once per specified interval, controlling event frequency.
    - **Code Example**:
      ```javascript
      function throttle(fn, limit) {
        let wait = false;
        return function(...args) {
          if (!wait) {
            fn(...args);
            wait = true;
            setTimeout(() => wait = false, limit);
          }
        };
      }
      const log = throttle(() => console.log("Throttled"), 1000);
      log(); // Executes immediately, then waits 1s
      ```

32. **What is the purpose of the `Map` object?**
    - **Answer**: The `Map` object stores key-value pairs where keys can be any type, unlike objects (string/symbol keys), with methods like `set`, `get`, `has`.
    - **Code Example**:
      ```javascript
      const map = new Map();
      map.set({ id: 1 }, "value");
      console.log(map.get({ id: 1 })); // undefined (different object reference)
      const key = { id: 1 };
      map.set(key, "value");
      console.log(map.get(key)); // value
      ```

33. **What is the `Set` object in JavaScript?**
    - **Answer**: The `Set` object stores unique values of any type, eliminating duplicates, with methods like `add`, `has`, and `delete`.
    - **Code Example**:
      ```javascript
      const set = new Set([1, 1, 2, 3]);
      console.log([...set]); // [1, 2, 3]
      set.add(4);
      console.log(set.has(4)); // true
      ```

34. **What is the difference between `for...in` and `for...of` loops?**
    - **Answer**: `for...in` iterates over an object’s enumerable properties. `for...of` iterates over iterable objects’ values (e.g., arrays, strings).
    - **Code Example**:
      ```javascript
      const obj = { a: 1, b: 2 };
      for (let key in obj) console.log(key); // a, b
      const arr = [1, 2];
      for (let value of arr) console.log(value); // 1, 2
      ```

35. **What is the `fetch` API?**
    - **Answer**: The `fetch` API makes HTTP requests, returning a Promise with flexible response handling (JSON, text, blob), more modern than `XMLHttpRequest`.
    - **Code Example**:
      ```javascript
      fetch("https://api.example.com/data")
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
      ```

36. **What is the purpose of the `class` syntax in JavaScript?**
    - **Answer**: The `class` syntax is syntactic sugar for constructor functions, simplifying object creation and inheritance with methods and getters/setters.
    - **Code Example**:
      ```javascript
      class Person {
        constructor(name) { this.name = name; }
        greet() { return `Hello, ${this.name}`; }
      }
      const p = new Person("Alice");
      console.log(p.greet()); // Hello, Alice
      ```

37. **What is the `Symbol` data type?**
    - **Answer**: `Symbol` is a primitive type for creating unique identifiers, used as object keys to avoid collisions or define custom behavior (e.g., `Symbol.iterator`).
    - **Code Example**:
      ```javascript
      const sym = Symbol("id");
      const obj = { [sym]: 123 };
      console.log(obj[sym]); // 123
      ```

38. **What is the `WeakMap` object?**
    - **Answer**: A `WeakMap` stores key-value pairs with object keys, weakly referenced, allowing garbage collection if the key is unreferenced, preventing memory leaks.
    - **Code Example**:
      ```javascript
      const wm = new WeakMap();
      let obj = {};
      wm.set(obj, "value");
      console.log(wm.get(obj)); // value
      obj = null; // Allows garbage collection
      ```

39. **What is the purpose of the `Object.assign` method?**
    - **Answer**: The `Object.assign` method copies enumerable own properties from source objects to a target object, used for shallow copying or merging.
    - **Code Example**:
      ```javascript
      const target = { a: 1 };
      const source = { b: 2 };
      Object.assign(target, source);
      console.log(target); // { a: 1, b: 2 }
      ```

40. **What is the `Array.prototype.flat` method?**
    - **Answer**: The `flat` method creates a new array by flattening nested arrays up to a specified depth.
    - **Code Example**:
      ```javascript
      const arr = [1, [2, [3]]];
      console.log(arr.flat(2)); // [1, 2, 3]
      ```

41. **What is the `requestAnimationFrame` method?**
    - **Answer**: The `requestAnimationFrame` method schedules a function before the next browser repaint, ideal for smooth animations synced with the refresh rate.
    - **Code Example**:
      ```javascript
      function animate() {
        console.log("Frame");
        requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
      ```

42. **What is the difference between `innerHTML` and `textContent`?**
    - **Answer**: `innerHTML` gets/sets HTML content, parsing it as HTML. `textContent` gets/sets plain text, safer for preventing XSS attacks.
    - **Code Example**:
      ```javascript
      const div = document.createElement("div");
      div.innerHTML = "<p>HTML</p>";
      console.log(div.innerHTML); // <p>HTML</p>
      div.textContent = "<p>Text</p>";
      console.log(div.textContent); // <p>Text</p>
      ```

43. **What is the `Array.prototype.some` method?**
    - **Answer**: The `some` method tests if at least one element passes a callback test, returning `true` if any satisfy the condition.
    - **Code Example**:
      ```javascript
      const arr = [1, 2, 3];
      console.log(arr.some(x => x > 2)); // true
      ```

44. **What is the `Array.prototype.every` method?**
    - **Answer**: The `every` method tests if all elements pass a callback test, returning `true` only if all satisfy the condition.
    - **Code Example**:
      ```javascript
      const arr = [1, 2, 3];
      console.log(arr.every(x => x > 0)); // true
      console.log(arr.every(x => x > 2)); // false
      ```

45. **What is the purpose of the `Proxy` object?**
    - **Answer**: The `Proxy` object wraps another object to intercept operations like property access or assignment, used for validation or logging.
    - **Code Example**:
      ```javascript
      const target = { x: 1 };
      const proxy = new Proxy(target, {
        get(target, prop) { return target[prop] + 1; }
      });
      console.log(proxy.x); // 2
      ```

46. **What is the `Reflect` API?**
    - **Answer**: The `Reflect` API provides functional methods for object operations (e.g., `Reflect.get`), used with Proxies for consistent property access.
    - **Code Example**:
      ```javascript
      const obj = { x: 1 };
      console.log(Reflect.get(obj, "x")); // 1
      ```

47. **What is the `Object.freeze` method?**
    - **Answer**: The `Object.freeze` method makes an object immutable, preventing property additions, deletions, or modifications (shallow freeze).
    - **Code Example**:
      ```javascript
      const obj = { x: 1 };
      Object.freeze(obj);
      obj.x = 2; // Ignored
      console.log(obj.x); // 1
      ```

48. **What is the purpose of the `async function*` syntax?**
    - **Answer**: The `async function*` syntax defines an async generator that yields Promises, used for asynchronous iteration or streaming.
    - **Code Example**:
      ```javascript
      async function* gen() {
        yield await Promise.resolve(1);
        yield await Promise.resolve(2);
      }
      (async () => {
        for await (const value of gen()) {
          console.log(value); // 1, 2
        }
      })();
      ```

49. **What is the `IntersectionObserver` API?**
    - **Answer**: The `IntersectionObserver` API observes an element’s visibility relative to an ancestor or viewport, used for lazy loading or triggering animations.
    - **Code Example**:
      ```javascript
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) console.log("Visible");
      });
      observer.observe(document.querySelector("div"));
      ```

50. **What is the difference between `localStorage` and `cookies`?**
    - **Answer**: `localStorage` stores data (5-10MB) client-side with no expiration. Cookies store less data (4KB), can expire, and are sent with HTTP requests.
    - **Code Example**:
      ```javascript
      localStorage.setItem("key", "value");
      console.log(localStorage.getItem("key")); // value
      document.cookie = "key=value; max-age=3600";
      console.log(document.cookie); // key=value
      ```