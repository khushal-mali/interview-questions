# Top 100 JavaScript Interview Questions for 2025

This comprehensive guide compiles the top 100 JavaScript interview questions for 2025, covering beginner, intermediate, and advanced topics to help you prepare for your next technical interview. These questions are curated based on current trends, focusing on core JavaScript concepts, modern ES6+ features, asynchronous programming, and practical coding scenarios commonly asked by top tech companies.

## Table of Contents
1. [Beginner-Level Questions](#beginner-level-questions)
2. [Intermediate-Level Questions](#intermediate-level-questions)
3. [Advanced-Level Questions](#advanced-level-questions)
4. [Coding Challenges](#coding-challenges)

---

## Beginner-Level Questions

1. **What is JavaScript, and what are its key features?**  
   JavaScript is a lightweight, interpreted, object-oriented scripting language used to create dynamic and interactive web content. It runs in browsers and on servers via Node.js. Key features include:  
   - Client and server-side scripting  
   - Dynamic typing  
   - Asynchronous capabilities (Promises, async/await)  
   - Extensive library ecosystem (React, Vue, etc.)[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

2. **What are the different data types in JavaScript?**  
   JavaScript supports seven primitive types: String, Number, BigInt, Boolean, Undefined, Null, Symbol, and one non-primitive type: Object (including Arrays, Functions).[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

3. **What is the difference between `var`, `let`, and `const`?**  
   - `var`: Function-scoped, hoisted with `undefined`, allows re-declaration and updates.  
   - `let`: Block-scoped, hoisted but not initialized (temporal dead zone), allows updates but not re-declaration.  
   - `const`: Block-scoped, cannot be updated or re-declared, but object properties can be mutated.[](https://prepinsta.com/interview-preparation/technical-interview-questions/javascript/)

4. **What is hoisting in JavaScript?**  
   Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their scope before execution. Variables declared with `var` are hoisted with `undefined`, while `let` and `const` are hoisted but not initialized.[](https://prepinsta.com/interview-preparation/technical-interview-questions/javascript/)

5. **What is the difference between `==` and `===`?**  
   - `==`: Loose equality, compares values after type coercion.  
   - `===`: Strict equality, compares both value and type without coercion.  
   Example: `5 == "5"` returns `true`, but `5 === "5"` returns `false`.[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

6. **What is the `typeof` operator used for?**  
   The `typeof` operator returns the type of a variable or expression (e.g., `"string"`, `"number"`, `"object"`, `"undefined"`). Note: `typeof null` returns `"object"`, which is a historical quirk.[](https://www.interviewbit.com/javascript-interview-questions/)

7. **What is `null` vs. `undefined` in JavaScript?**  
   - `null`: Represents an intentional absence of value.  
   - `undefined`: Indicates a variable is declared but not assigned a value.[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

8. **What is a closure in JavaScript?**  
   A closure is a function that retains access to its lexical scope’s variables even after the outer function has executed. Useful for data privacy and state management.  
   Example:
   ```javascript
   function outer() {
     let count = 0;
     return function inner() {
       return count++;
     };
   }
   const counter = outer();
   console.log(counter()); // 0
   console.log(counter()); // 1
   ```

9. **What is the difference between a function declaration and a function expression?**  
   - Function Declaration: `function foo() {}` is hoisted entirely and can be called before its definition.  
   - Function Expression: `const foo = function() {}` is hoisted only as a variable (not initialized), cannot be called before assignment.[](https://github.com/greatfrontend/top-javascript-interview-questions)

10. **What is an IIFE (Immediately Invoked Function Expression)?**  
    An IIFE is a function expression that is defined and executed immediately to create a private scope and avoid polluting the global namespace.  
    Example: `(function() { console.log("Runs once!"); })();`[](https://github.com/greatfrontend/top-javascript-interview-questions)

11. **What are arrow functions, and how do they differ from regular functions?**  
    Arrow functions (`=>`) provide a concise syntax and do not bind their own `this`, inheriting it from the surrounding context. They are ideal for callbacks but cannot be used as constructors.[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

12. **What is the `this` keyword in JavaScript?**  
    The `this` keyword refers to the object that is executing the current function. Its value depends on how the function is called (e.g., method call, standalone function, `new` keyword).[](https://www.frontendinterviewhandbook.com/javascript-questions)

13. **What are template literals?**  
    Template literals are strings enclosed in backticks (`` ` ``) that support multi-line strings and interpolation using `${expression}`.  
    Example: `const name = "Alice"; console.log(`Hello, ${name}!`);`[](https://prepinsta.com/interview-preparation/technical-interview-questions/javascript/)

14. **What is the purpose of `use strict`?**  
    `"use strict"` enforces stricter parsing and error handling, preventing accidental globals, silent errors, and certain unsafe actions.[](https://www.toptal.com/javascript/interview-questions)

15. **What is the difference between `null` and `undefined`?**  
    - `null`: Explicitly assigned to indicate no value.  
    - `undefined`: Default value for uninitialized variables or missing properties.[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

16. **What is event bubbling?**  
    Event bubbling is when an event triggered on an element propagates up through its parent elements in the DOM hierarchy. Useful for event delegation.[](https://www.vskills.in/certification/blog/top-100-javascript-interview-questions-2025/)

17. **What is the DOM (Document Object Model)?**  
    The DOM is a tree-like representation of a web page’s structure, allowing JavaScript to manipulate HTML elements dynamically.[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

18. **How do you access HTML elements in JavaScript?**  
    Common methods include:  
    - `getElementById()`: Access by ID.  
    - `getElementsByClassName()`: Access by class.  
    - `getElementsByTagName()`: Access by tag.  
    - `querySelector()`: Access using CSS selectors.[](https://www.geeksforgeeks.org/javascript/javascript-interview-questions/)

19. **What is the purpose of `setTimeout` and `setInterval`?**  
    - `setTimeout`: Executes a function once after a specified delay.  
    - `setInterval`: Executes a function repeatedly at a specified interval until cleared.[](https://www.geeksforgeeks.org/javascript/javascript-interview-questions/)

20. **What is a Promise in JavaScript?**  
    A Promise is an object representing the eventual completion or failure of an asynchronous operation. It has three states: `pending`, `fulfilled`, `rejected`.[](https://www.turing.com/interview-questions/javascript)

21. **What is the difference between `let` and `var` in terms of scope?**  
    - `var`: Function-scoped, accessible throughout the function.  
    - `let`: Block-scoped, limited to the block it’s declared in.[](https://www.interviewbit.com/javascript-interview-questions/)

22. **What is the global object in JavaScript?**  
    The global object is `window` in browsers or `global` in Node.js, serving as the top-level scope for global variables and functions.[](https://www.toptal.com/javascript/interview-questions)

23. **What are JavaScript’s falsy values?**  
    Falsy values are: `false`, `0`, `-0`, `""`, `null`, `undefined`, `NaN`. All other values are truthy.[](https://www.interviewbit.com/javascript-interview-questions/)

24. **What is the purpose of the `bind` method?**  
    The `bind` method creates a new function with a specified `this` value and optional initial arguments, useful for controlling function context.[](https://www.frontendinterviewhandbook.com/javascript-questions)

25. **What is the difference between `call` and `apply`?**  
    Both invoke a function with a specified `this` context, but `call` takes arguments individually, while `apply` takes an array of arguments.[](https://www.frontendinterviewhandbook.com/javascript-questions)

26. **What is the `event.preventDefault()` method?**  
    It prevents the default action of an event (e.g., stopping a form submission or link navigation).[](https://www.vskills.in/certification/blog/top-100-javascript-interview-questions-2025/)

27. **What is JSON, and how is it used in JavaScript?**  
    JSON (JavaScript Object Notation) is a format for storing and exchanging data. JavaScript provides `JSON.parse()` to convert JSON to objects and `JSON.stringify()` to convert objects to JSON.[](https://www.turing.com/interview-questions/javascript)

28. **What is the purpose of the `map` method?**  
    The `map` method creates a new array with the results of calling a function on every element.  
    Example: `const doubled = [1, 2, 3].map(num => num * 2); // [2, 4, 6]`[](https://prepinsta.com/interview-preparation/technical-interview-questions/javascript/)

29. **What is the `filter` method used for?**  
    The `filter` method creates a new array with elements that pass a test.  
    Example: `const evens = [1, 2, 3, 4].filter(num => num % 2 === 0); // [2, 4]`[](https://prepinsta.com/interview-preparation/technical-interview-questions/javascript/)

30. **What is the `reduce` method?**  
    The `reduce` method applies a function to an accumulator and each element to reduce the array to a single value.  
    Example: `const sum = [1, 2, 3].reduce((acc, num) => acc + num, 0); // 6`[](https://prepinsta.com/interview-preparation/technical-interview-questions/javascript/)

31. **What is the difference between `slice` and `splice`?**  
    - `slice`: Returns a shallow copy of a portion of an array without modifying the original.  
    - `splice`: Modifies the original array by removing or adding elements.[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

32. **What is a callback function?**  
    A callback is a function passed as an argument to another function to be executed later, often used in asynchronous operations.[](https://www.turing.com/interview-questions/javascript)

33. **What is the `forEach` method?**  
    The `forEach` method executes a function for each array element but does not return a new array.[](https://prepinsta.com/interview-preparation/technical-interview-questions/javascript/)

34. **What is the purpose of the `Array.prototype`?**  
    `Array.prototype` is an object that defines methods and properties available to all arrays, like `map`, `filter`, and `push`.[](https://www.geeksforgeeks.org/javascript/javascript-interview-questions/)

35. **What is the difference between `null` and `0`?**  
    `null` represents the absence of a value, while `0` is a numeric value. `null` is falsy, but they are not equal (`null !== 0`).[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

36. **What is the `NaN` value in JavaScript?**  
    `NaN` (Not-a-Number) represents an invalid or unrepresentable numeric value. Use `isNaN()` to check for it.[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

37. **What are JavaScript modules?**  
    Modules allow code to be split into separate files using `import` and `export` statements, promoting modularity and reusability.[](https://www.frontendinterviewhandbook.com/javascript-questions)

38. **What is the difference between `undefined` and `not defined`?**  
    - `undefined`: A variable is declared but not assigned a value.  
    - `not defined`: A variable or function does not exist, causing a `ReferenceError`.[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

39. **What is the `Object.keys()` method?**  
    It returns an array of an object’s enumerable property names.  
    Example: `Object.keys({a: 1, b: 2}) // ["a", "b"]`[](https://github.com/greatfrontend/top-javascript-interview-questions)

40. **What is the `Object.values()` method?**  
    It returns an array of an object’s enumerable property values.  
    Example: `Object.values({a: 1, b: 2}) // [1, 2]`[](https://github.com/greatfrontend/top-javascript-interview-questions)

41. **What is the `Object.entries()` method?**  
    It returns an array of an object’s enumerable key-value pairs.  
    Example: `Object.entries({a: 1, b: 2}) // [["a", 1], ["b", 2]]`[](https://github.com/greatfrontend/top-javascript-interview-questions)

42. **What is the `typeof` pitfall with `null`?**  
    `typeof null` returns `"object"`, which is misleading since `null` is a primitive. Use `=== null` to check for `null`.[](https://www.toptal.com/javascript/interview-questions)

43. **What is the difference between `for...in` and `for...of` loops?**  
    - `for...in`: Iterates over enumerable properties of an object.  
    - `for...of`: Iterates over iterable objects like arrays, strings, etc.[](https://github.com/greatfrontend/top-javascript-interview-questions)

44. **What is the `event.stopPropagation()` method?**  
    It stops an event from bubbling up the DOM tree, preventing parent elements from handling it.[](https://www.vskills.in/certification/blog/top-100-javascript-interview-questions-2025/)

45. **What is a higher-order function?**  
    A higher-order function takes a function as an argument or returns a function. Examples include `map`, `filter`, and `reduce`.[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

46. **What is the purpose of `Array.isArray()`?**  
    It checks if a value is an array, returning `true` or `false`.  
    Example: `Array.isArray([1, 2, 3]) // true`[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

47. **What is the `new` keyword used for?**  
    The `new` keyword creates an instance of a constructor function or class, setting `this` to the new object.[](https://www.frontendinterviewhandbook.com/javascript-questions)

48. **What is the `instanceof` operator?**  
    It checks if an object is an instance of a constructor or class.  
    Example: `[] instanceof Array // true`[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

49. **What is the purpose of `try...catch`?**  
    It handles errors by executing code in the `try` block and catching exceptions in the `catch` block.[](https://builtin.com/software-engineering-perspectives/javascript-interview-questions)

50. **What is the `globalThis` object?**  
    `globalThis` provides a standard way to access the global object across environments (`window` in browsers, `global` in Node.js).[](https://www.toptal.com/javascript/interview-questions)

---

## Intermediate-Level Questions

51. **What is the event loop in JavaScript?**  
    The event loop manages asynchronous operations by processing the call stack, task queue, and microtask queue, ensuring non-blocking execution.[](https://github.com/greatfrontend/top-javascript-interview-questions)

52. **What are Promises, and how do they work?**  
    Promises handle asynchronous operations with three states: `pending`, `fulfilled`, `rejected`. They use `.then()` for success and `.catch()` for errors.  
    Example:  
    ```javascript
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("Success"), 1000);
    });
    promise.then(result => console.log(result)); // Success
    ```[](https://www.turing.com/interview-questions/javascript)

53. **What is `async/await`, and how does it differ from Promises?**  
    `async/await` is syntactic sugar over Promises, allowing asynchronous code to be written synchronously. `async` functions return Promises, and `await` pauses execution until a Promise resolves.[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

54. **What is event delegation?**  
    Event delegation attaches a single event listener to a parent element to handle events from multiple child elements, improving performance.[](https://github.com/greatfrontend/top-javascript-interview-questions)

55. **What is the difference between `call`, `apply`, and `bind`?**  
    - `call`: Invokes a function with a specified `this` and individual arguments.  
    - `apply`: Invokes a function with a specified `this` and an array of arguments.  
    - `bind`: Returns a new function with a fixed `this` and optional arguments.[](https://www.frontendinterviewhandbook.com/javascript-questions)

56. **What is prototypal inheritance?**  
    JavaScript objects inherit properties and methods from a prototype. Objects created with `new` inherit from the constructor’s `prototype`.[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

57. **What is the difference between `Object.create()` and `new`?**  
    - `Object.create()`: Creates an object with a specified prototype.  
    - `new`: Creates an instance of a constructor function, invoking it with `this`.[](https://www.frontendinterviewhandbook.com/javascript-questions)

58. **What is the `this` binding in arrow functions?**  
    Arrow functions do not have their own `this`; they inherit it from the enclosing lexical scope.[](https://www.frontendinterviewhandbook.com/javascript-questions)

59. **What are ES6 modules?**  
    ES6 modules use `import` and `export` to organize code into reusable files, supporting both synchronous and asynchronous loading.[](https://www.frontendinterviewhandbook.com/javascript-questions)

60. **What is destructuring in JavaScript?**  
    Destructuring unpacks values from arrays or objects into variables.  
    Example: `const { name, age } = { name: "Alice", age: 25 };`[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

61. **What is the spread operator?**  
    The spread operator (`...`) expands elements of an iterable (e.g., array) or object properties.  
    Example: `const arr = [...[1, 2], 3]; // [1, 2, 3]`[](https://github.com/greatfrontend/top-javascript-interview-questions)

62. **What is the rest parameter?**  
    The rest parameter (`...`) collects remaining arguments into an array.  
    Example: `function sum(...numbers) { return numbers.reduce((a, b) => a + b); }`[](https://github.com/greatfrontend/top-javascript-interview-questions)

63. **What is a generator function?**  
    Generator functions (`function*`) yield multiple values one at a time, pausing execution with `yield`.  
    Example:  
    ```javascript
    function* generator() {
      yield 1;
      yield 2;
    }
    const gen = generator();
    console.log(gen.next().value); // 1
    ```[](https://www.turing.com/interview-questions/javascript)

64. **What is the `Map` object?**  
    A `Map` is a collection of key-value pairs where keys can be any type. It preserves insertion order and provides methods like `set`, `get`, and `has`.[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

65. **What is the `Set` object?**  
    A `Set` is a collection of unique values, useful for removing duplicates.  
    Example: `const set = new Set([1, 1, 2]); // Set {1, 2}`[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

66. **What is the difference between `forEach` and `map`?**  
    - `forEach`: Executes a function for each element, no return value.  
    - `map`: Returns a new array with the results of applying a function to each element.[](https://prepinsta.com/interview-preparation/technical-interview-questions/javascript/)

67. **What is a closure’s use case?**  
    Closures are used for data encapsulation, private variables, and maintaining state in functions like counters or event handlers.[](https://www.vskills.in/certification/blog/top-100-javascript-interview-questions-2025/)

68. **What is the `Promise.all` method?**  
    `Promise.all` takes an array of Promises and resolves when all Promises resolve or rejects on the first rejection.  
    Example: `Promise.all([p1, p2]).then(results => console.log(results));`[](https://www.turing.com/interview-questions/javascript)

69. **What is the same-origin policy?**  
    The same-origin policy restricts scripts from accessing resources from different origins (protocol, domain, port) for security.[](https://www.frontendinterviewhandbook.com/javascript-questions)

70. **What is the difference between `slice` and `substring`?**  
    - `slice`: Extracts a portion of a string or array, supports negative indices.  
    - `substring`: Extracts a portion of a string, does not support negative indices.[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

71. **What is the `bind` method’s practical use?**  
    It’s used to fix the `this` context in callbacks or event handlers.  
    Example: `const boundFn = obj.method.bind(obj);`[](https://www.frontendinterviewhandbook.com/javascript-questions)

72. **What is the `Object.freeze()` method?**  
    It prevents modifications to an object’s properties, making it immutable.  
    Example: `const obj = Object.freeze({ a: 1 });`[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

73. **What is the `Object.seal()` method?**  
    It prevents adding or removing properties but allows modifying existing ones.  
    Example: `const obj = Object.seal({ a: 1 });`[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

74. **What is the `WeakMap` object?**  
    A `WeakMap` holds key-value pairs where keys are objects, and entries are garbage-collected when the key is no longer referenced.[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

75. **What is the `WeakSet` object?**  
    A `WeakSet` stores unique objects, and entries are garbage-collected when the object is no longer referenced.[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

---

## Advanced-Level Questions

76. **What is the difference between shallow and deep cloning?**  
    - Shallow cloning: Copies top-level properties but shares nested objects.  
    - Deep cloning: Creates a fully independent copy, including nested objects (e.g., using `JSON.parse(JSON.stringify(obj))`).[](https://www.keka.com/javascript-coding-interview-questions-and-answers)

77. **What is the `this` value in an event handler?**  
    In an event handler, `this` refers to the element that triggered the event, unless overridden by arrow functions or `bind`.[](https://www.frontendinterviewhandbook.com/javascript-questions)

78. **What is the virtual DOM, and how does it work?**  
    The virtual DOM is a lightweight representation of the real DOM used by libraries like React. It compares changes via a diffing algorithm and updates only the necessary parts of the real DOM.[](https://www.geeksforgeeks.org/reactjs/react-interview-questions/)

79. **What is a memory leak in JavaScript?**  
    A memory leak occurs when unused objects remain in memory, often due to unremoved event listeners or global variables.[](https://www.geeksforgeeks.org/javascript/javascript-interview-questions/)

80. **What is debouncing, and how is it implemented?**  
    Debouncing delays function execution until after a specified time since the last call, useful for events like typing.  
    Example:  
    ```javascript
    function debounce(fn, delay) {
      let timeout;
      return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
      };
    }
    ```[](https://www.vskills.in/certification/blog/top-100-javascript-interview-questions-2025/)

81. **What is throttling, and how is it different from debouncing?**  
    Throttling limits function calls to once every specified interval, unlike debouncing, which waits for a pause in calls.[](https://www.vskills.in/certification/blog/top-100-javascript-interview-questions-2025/)

82. **What is the `Proxy` object in JavaScript?**  
    A `Proxy` wraps an object to intercept and customize operations like property access or assignment.  
    Example:  
    ```javascript
    const target = { a: 1 };
    const proxy = new Proxy(target, {
      get: (obj, prop) => console.log(`Getting ${prop}`)
    });
    ```[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

83. **What is tree shaking?**  
    Tree shaking removes unused code from the final build, reducing bundle size, often used with tools like Webpack.[](https://www.vskills.in/certification/blog/top-100-javascript-interview-questions-2025/)

84. **What is the difference between CommonJS and ES6 modules?**  
    - CommonJS: Synchronous, used in Node.js (`require`/`module.exports`).  
    - ES6 Modules: Asynchronous, browser-compatible (`import`/`export`).[](https://www.frontendinterviewhandbook.com/javascript-questions)

85. **What is the `Symbol` data type?**  
    `Symbol` creates unique, immutable identifiers, often used as object keys to avoid naming conflicts.[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

86. **What is the `async` function’s return value?**  
    An `async` function always returns a Promise, even if no Promise is explicitly returned.[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

87. **What is the `Reflect` API?**  
    The `Reflect` API provides methods for interceptable JavaScript operations, often used with `Proxy`.[](https://www.foundit.in/career-advice/javascript-interview-questions-and-answers/)

88. **What is the difference between `Promise.all` and `Promise.race`?**  
    - `Promise.all`: Resolves when all Promises resolve or rejects on the first rejection.  
    - `Promise.race`: Resolves or rejects as soon as one Promise settles.[](https://www.turing.com/interview-questions/javascript)

89. **What is a polyfill?**  
    A polyfill is code that implements a feature in browsers that lack support, ensuring compatibility.[](https://www.frontendinterviewhandbook.com/javascript-questions)

90. **What is the `IntersectionObserver` API?**  
    It observes changes in the visibility of an element relative to an ancestor or viewport, useful for lazy loading.[](https://www.vskills.in/certification/blog/top-100-javascript-interview-questions-2025/)

---

## Coding Challenges

91. **Write a function to check if a string is a palindrome.**  
    ```javascript
    function isPalindrome(str) {
      str = str.toLowerCase().replace(/[^a-z0-9]/g, "");
      return str === str.split("").reverse().join("");
    }
    console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
    ```[](https://www.keka.com/javascript-coding-interview-questions-and-answers)

92. **Write a function to find the factorial of a number.**  
    ```javascript
    function factorial(n) {
      if (n <= 1) return 1;
      return n * factorial(n - 1);
    }
    console.log(factorial(5)); // 120
    ```[](https://www.keka.com/javascript-coding-interview-questions-and-answers)

93. **Write a function to reverse a string.**  
    ```javascript
    function reverseString(str) {
      return str.split("").reverse().join("");
    }
    console.log(reverseString("hello")); // "olleh"
    ```

94. **Implement a deep clone function for an object.**  
    ```javascript
    function deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    const obj = { a: 1, b: { c: 2 } };
    const clone = deepClone(obj);
    clone.b.c = 3;
    console.log(obj.b.c); // 2
    ```[](https://www.keka.com/javascript-coding-interview-questions-and-answers)

95. **Write a function to merge two sorted arrays.**  
    ```javascript
    function mergeSortedArrays(arr1, arr2) {
      const merged = [];
      let i = 0, j = 0;
      while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) merged.push(arr1[i++]);
        else merged.push(arr2[j++]);
      }
      return merged.concat(arr1.slice(i)).concat(arr2.slice(j));
    }
    console.log(mergeSortedArrays([1, 3], [2, 4])); // [1, 2, 3, 4]
    ```[](https://www.keka.com/javascript-coding-interview-questions-and-answers)

96. **Implement a function to check if a number is prime.**  
    ```javascript
    function isPrime(num) {
      if (num <= 1) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    }
    console.log(isPrime(17)); // true
    ```[](https://www.keka.com/javascript-coding-interview-questions-and-answers)

97. **Write a function to implement FizzBuzz.**  
    ```javascript
    function fizzBuzz(n) {
      for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) console.log("FizzBuzz");
        else if (i % 3 === 0) console.log("Fizz");
        else if (i % 5 === 0) console.log("Buzz");
        else console.log(i);
      }
    }
    fizzBuzz(15);
    ```[](https://www.frontendinterviewhandbook.com/javascript-questions)

98. **Write a function to flatten a nested array.**  
    ```javascript
    function flattenArray(arr) {
      return arr.reduce((flat, current) => 
        flat.concat(Array.isArray(current) ? flattenArray(current) : current), []);
    }
    console.log(flattenArray([1, [2, [3, 4], 5]])); // [1, 2, 3, 4, 5]
    ```

99. **Implement a function to throttle a function call.**  
    ```javascript
    function throttle(fn, limit) {
      let lastCall = 0;
      return function (...args) {
        const now = Date.now();
        if (now - lastCall >= limit) {
          lastCall = now;
          return fn(...args);
        }
      };
    }
    ```[](https://www.vskills.in/certification/blog/top-100-javascript-interview-questions-2025/)

100. **Create a JavaScript class for a linked list.**  
     ```javascript
     class Node {
       constructor(data) {
         this.data = data;
         this.next = null;
       }
     }
     class LinkedList {
       constructor() {
         this.head = null;
       }
       insertAtBeginning(data) {
         const newNode = new Node(data);
         newNode.next = this.head;
         this.head = newNode;
       }
     }
     const list = new LinkedList();
     list.insertAtBeginning(1);
     ```[](https://www.keka.com/javascript-coding-interview-questions-and-answers)

---

## Tips for Interview Success
- **Practice Coding**: Solve problems on platforms like LeetCode or HackerRank.[](https://builtin.com/software-engineering-perspectives/javascript-interview-questions)
- **Understand Fundamentals**: Master core concepts like closures, prototypes, and the event loop.[](https://prepinsta.com/interview-preparation/technical-interview-questions/javascript/)
- **Explain Your Thought Process**: Interviewers value how you approach problems, not just the final answer.[](https://www.interviewbit.com/javascript-interview-questions/)
- **Stay Updated**: Be familiar with ES6+ features and modern JavaScript frameworks like React or Vue.[](https://www.vskills.in/certification/blog/top-100-javascript-interview-questions-2025/)

Good luck with your JavaScript interviews in 2025! 🚀