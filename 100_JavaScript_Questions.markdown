# 100 JavaScript Questions with Detailed Answers

This document provides 100 JavaScript questions with detailed answers, covering beginner to advanced topics. Each question includes explanations, code examples, and key takeaways to help deepen your understanding of JavaScript.

## Basics and Syntax

### 1. What is JavaScript, and what are its key features?
**Answer**:  
JavaScript is a high-level, interpreted programming language primarily used for web development to add interactivity to websites. It runs in browsers and Node.js.  
**Key Features**:  
- **Dynamic Typing**: Variables can hold any data type without explicit declaration.  
- **Prototype-Based OOP**: Uses prototypes for inheritance.  
- **First-Class Functions**: Functions can be assigned to variables, passed as arguments, or returned.  
- **Event-Driven**: Supports asynchronous programming via events and callbacks.  
- **Single-Threaded**: Uses an event loop for non-blocking operations.  
**Example**:  
```javascript
let greet = function(name) {
  return `Hello, ${name}!`;
};
console.log(greet("Alice")); // Hello, Alice!
```
**Key Takeaway**: JavaScript’s versatility makes it essential for web development, with features supporting both functional and object-oriented programming.

### 2. What is the difference between `var`, `let`, and `const`?  
**Answer**:  
- **`var`**: Function-scoped or globally scoped, hoisted with `undefined`. Can be redeclared and reassigned.  
```javascript
var x = 10;
var x = 20; // Redeclaration allowed
console.log(x); // 20
```
- **`let`**: Block-scoped, hoisted but not initialized (Temporal Dead Zone). Reassignable, not redeclarable.  
```javascript
let y = 30;
y = 40; // Reassignment allowed
// let y = 50; // Error: Identifier 'y' has already been declared
```
- **`const`**: Block-scoped, cannot be reassigned or redeclared, but object properties can be mutated.  
```javascript
const z = 60;
// z = 70; // Error: Assignment to constant variable
const obj = { a: 1 };
obj.a = 2; // Allowed
```
**Key Takeaway**: Prefer `const` for immutable bindings, `let` for reassignable variables, and avoid `var` in modern JavaScript.

### 3. What is hoisting in JavaScript?  
**Answer**:  
Hoisting is JavaScript’s behavior of moving variable and function declarations to the top of their scope during compilation. Variables declared with `var` are hoisted with `undefined`; `let` and `const` are hoisted but not initialized (Temporal Dead Zone).  
**Example**:  
```javascript
console.log(x); // undefined
var x = 10;
console.log(x); // 10
// console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 20;
```
**Key Takeaway**: Understand hoisting to avoid bugs; always declare variables before use and prefer `let`/`const` to avoid `undefined` access.

### 4. What are the different data types in JavaScript?  
**Answer**:  
JavaScript has **primitive** and **non-primitive** data types:  
- **Primitives**: `number`, `string`, `boolean`, `undefined`, `null`, `bigint`, `symbol`.  
- **Non-Primitives**: `object` (including arrays, functions, etc.).  
**Example**:  
```javascript
let num = 42; // number
let str = "Hello"; // string
let obj = { key: "value" }; // object
let sym = Symbol("id"); // symbol
console.log(typeof num); // "number"
```
**Key Takeaway**: Knowing data types helps with type coercion and proper variable handling.

### 5. What is the difference between `null` and `undefined`?  
**Answer**:  
- **`undefined`**: Variable declared but not assigned, or missing property.  
- **`null`**: Explicitly assigned to indicate "no value."  
**Example**:  
```javascript
let x;
console.log(x); // undefined
let y = null;
console.log(y); // null
console.log(null == undefined); // true
console.log(null === undefined); // false
```
**Key Takeaway**: Use `null` for intentional absence; `undefined` is the default for uninitialized variables.

### 6. What is type coercion in JavaScript?  
**Answer**:  
Type coercion is the automatic conversion of values from one data type to another during operations (e.g., `==`, `+`).  
**Example**:  
```javascript
console.log(5 + "5"); // "55" (number coerced to string)
console.log(5 == "5"); // true (string coerced to number)
console.log(5 === "5"); // false (no coercion in strict equality)
```
**Key Takeaway**: Prefer `===` to avoid unexpected coercion; understand coercion for debugging.

### 7. What is the `typeof` operator used for?  
**Answer**:  
The `typeof` operator returns a string indicating the type of a value.  
**Example**:  
```javascript
console.log(typeof 42); // "number"
console.log(typeof "Hello"); // "string"
console.log(typeof null); // "object" (historical bug)
console.log(typeof undefined); // "undefined"
```
**Key Takeaway**: Use `typeof` for type checking, but be aware of quirks like `typeof null`.

### 8. What are template literals in JavaScript?  
**Answer**:  
Template literals (ES6) are strings enclosed in backticks (\`) allowing embedded expressions (`${}`) and multi-line strings.  
**Example**:  
```javascript
let name = "Alice";
let greeting = `Hello, ${name}!
Welcome to JS!`;
console.log(greeting);
// Hello, Alice!
// Welcome to JS!
```
**Key Takeaway**: Use template literals for readable string interpolation and multi-line strings.

### 9. What is the difference between `==` and `===`?  
**Answer**:  
- **`==`**: Loose equality, compares after type coercion.  
- **`===`**: Strict equality, compares value and type without coercion.  
**Example**:  
```javascript
console.log(5 == "5"); // true
console.log(5 === "5"); // false
console.log(null == undefined); // true
console.log(null === undefined); // false
```
**Key Takeaway**: Use `===` for predictable comparisons; `==` only when coercion is intentional.

### 10. What is the purpose of the `use strict` directive?  
**Answer**:  
`"use strict"` enables strict mode, which enforces stricter parsing and error handling, preventing common mistakes (e.g., undeclared variables).  
**Example**:  
```javascript
"use strict";
x = 10; // ReferenceError: x is not defined
```
**Key Takeaway**: Always use strict mode in modern JavaScript to catch errors early.

## Functions and Scope

### 11. What are first-class functions in JavaScript?  
**Answer**:  
Functions are first-class citizens, meaning they can be assigned to variables, passed as arguments, or returned from other functions.  
**Example**:  
```javascript
const add = (a, b) => a + b;
function operate(fn, a, b) {
  return fn(a, b);
}
console.log(operate(add, 2, 3)); // 5
```
**Key Takeaway**: First-class functions enable functional programming patterns.

### 12. What is a closure, and how is it used?  
**Answer**:  
A closure is a function that retains access to its outer scope’s variables after the outer function has executed.  
**Example**:  
```javascript
function outer() {
  let count = 0;
  return function inner() {
    return ++count;
  };
}
const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
```
**Key Takeaway**: Closures are useful for data privacy and maintaining state.

### 13. What is the difference between function declarations and expressions?  
**Answer**:  
- **Function Declaration**: Hoisted, can be called before definition.  
```javascript
console.log(myFunc()); // Works
function myFunc() {
  return "Hello";
}
```
- **Function Expression**: Not hoisted, assigned to a variable.  
```javascript
// console.log(myExp()); // TypeError: myExp is not a function
const myExp = function() {
  return "Hello";
};
```
**Key Takeaway**: Use declarations for top-level functions, expressions for conditional assignment.

### 14. What are arrow functions, and how do they differ from regular functions?  
**Answer**:  
Arrow functions (`=>`) are concise and have lexical `this` binding (inherits from surrounding scope). They cannot be used as constructors.  
**Example**:  
```javascript
const add = (a, b) => a + b;
const obj = {
  name: "Alice",
  say: () => this.name // Lexical this (window or undefined)
};
console.log(add(2, 3)); // 5
console.log(obj.say()); // ""
```
**Key Takeaway**: Use arrow functions for concise syntax and consistent `this` behavior.

### 15. What is the `this` keyword, and how is it determined?  
**Answer**:  
`this` refers to the context in which a function is called:  
- Global context: `window` (non-strict) or `undefined` (strict).  
- Object method: The object itself.  
- Constructor: Newly created object.  
- Explicit binding: Set via `call`, `apply`, or `bind`.  
- Arrow functions: Lexical `this` from surrounding scope.  
**Example**:  
```javascript
const obj = {
  name: "Alice",
  say() {
    return this.name;
  }
};
console.log(obj.say()); // Alice
```
**Key Takeaway**: Always check the calling context to predict `this`.

### 16. What is function currying?  
**Answer**:  
Currying transforms a function with multiple arguments into a sequence of functions, each taking one argument.  
**Example**:  
```javascript
function curry(fn) {
  return function(a) {
    return function(b) {
      return fn(a, b);
    };
  };
}
const add = (a, b) => a + b;
const curriedAdd = curry(add);
console.log(curriedAdd(2)(3)); // 5
```
**Key Takeaway**: Currying enables partial application and reusable functions.

### 17. What is the difference between `call`, `apply`, and `bind`?  
**Answer**:  
- **`call`**: Invokes a function with a specified `this` and arguments individually.  
- **`apply`**: Invokes a function with a specified `this` and arguments as an array.  
- **`bind`**: Returns a new function with a fixed `this` and optional arguments.  
**Example**:  
```javascript
function greet(greeting) {
  return `${greeting}, ${this.name}!`;
}
const person = { name: "Alice" };
console.log(greet.call(person, "Hello")); // Hello, Alice!
console.log(greet.apply(person, ["Hi"])); // Hi, Alice!
const boundGreet = greet.bind(person, "Hey");
console.log(boundGreet()); // Hey, Alice!
```
**Key Takeaway**: Use `call`/`apply` for immediate invocation, `bind` for creating reusable functions.

### 18. What is a higher-order function?  
**Answer**:  
A higher-order function takes a function as an argument or returns a function.  
**Example**:  
```javascript
function map(arr, fn) {
  const result = [];
  for (let item of arr) {
    result.push(fn(item));
  }
  return result;
}
console.log(map([1, 2, 3], x => x * 2)); // [2, 4, 6]
```
**Key Takeaway**: Higher-order functions enable abstraction and functional programming.

### 19. What is the difference between `arguments` and rest parameters?  
**Answer**:  
- **`arguments`**: An array-like object containing all arguments passed to a function. Not available in arrow functions.  
- **Rest Parameters**: ES6 syntax (`...param`) for collecting arguments into a real array.  
**Example**:  
```javascript
function sum() {
  return Array.from(arguments).reduce((acc, val) => acc + val, 0);
}
function sumRest(...nums) {
  return nums.reduce((acc, val) => acc + val, 0);
}
console.log(sum(1, 2, 3)); // 6
console.log(sumRest(1, 2, 3)); // 6
```
**Key Takeaway**: Prefer rest parameters for clarity and array methods.

### 20. What is the difference between `return` and `return false`?  
**Answer**:  
- **`return`**: Exits a function, optionally returning a value (defaults to `undefined`).  
- **`return false`**: Returns the boolean `false`.  
**Example**:  
```javascript
function test() {
  return; // undefined
}
function testFalse() {
  return false; // false
}
console.log(test()); // undefined
console.log(testFalse()); // false
```
**Key Takeaway**: Use `return false` only when a boolean is needed (e.g., event handlers).

## Objects and Prototypes

### 21. What is an object in JavaScript?  
**Answer**:  
An object is a collection of key-value pairs, where values can be data or functions.  
**Example**:  
```javascript
const person = {
  name: "Alice",
  greet() {
    return `Hello, ${this.name}!`;
  }
};
console.log(person.greet()); // Hello, Alice!
```
**Key Takeaway**: Objects are fundamental for structuring data and behavior.

### 22. What is prototypal inheritance?  
**Answer**:  
Objects inherit properties and methods from a prototype via the prototype chain.  
**Example**:  
```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return `${this.name} speaks`;
};
const dog = new Animal("Dog");
console.log(dog.speak()); // Dog speaks
```
**Key Takeaway**: Prototypal inheritance enables memory-efficient code reuse.

### 23. How do you create an object in JavaScript?  
**Answer**:  
Objects can be created via:  
- **Object Literal**: `{}`  
- **Constructor Function**: `new FunctionName()`  
- **Object.create**: Creates an object with a specified prototype.  
**Example**:  
```javascript
const objLiteral = { name: "Alice" };
function Person(name) {
  this.name = name;
}
const objConstructor = new Person("Bob");
const objCreate = Object.create({ name: "Charlie" });
```
**Key Takeaway**: Choose the method based on your use case (literals for simplicity, constructors for instances).

### 24. What is the difference between `Object.create` and `new`?  
**Answer**:  
- **`Object.create`**: Creates an object with a specified prototype.  
- **`new`**: Creates an instance of a constructor function, setting `this` to the new object.  
**Example**:  
```javascript
const proto = { greet: () => "Hello" };
const obj = Object.create(proto);
console.log(obj.greet()); // Hello
function Person() {}
const person = new Person();
```
**Key Takeaway**: Use `Object.create` for custom prototypes, `new` for constructor-based instantiation.

### 25. What is the `Object.prototype`?  
**Answer**:  
`Object.prototype` is the root prototype for all objects, providing methods like `toString` and `hasOwnProperty`.  
**Example**:  
```javascript
const obj = {};
console.log(obj.toString()); // [object Object]
console.log(Object.prototype.isPrototypeOf(obj)); // true
```
**Key Takeaway**: `Object.prototype` is the end of the prototype chain for most objects.

### 26. How do you prevent object property modification?  
**Answer**:  
Use `Object.defineProperty`, `Object.freeze`, or `Object.seal`.  
- **`Object.defineProperty`**: Set property attributes (e.g., `writable: false`).  
- **`Object.freeze`**: Prevents adding, removing, or modifying properties.  
- **`Object.seal`**: Prevents adding/removing properties but allows modification.  
**Example**:  
```javascript
const obj = { name: "Alice" };
Object.freeze(obj);
obj.name = "Bob"; // Ignored in strict mode
console.log(obj.name); // Alice
```
**Key Takeaway**: Use these methods to enforce immutability.

### 27. What is the difference between `hasOwnProperty` and `in`?  
**Answer**:  
- **`hasOwnProperty`**: Checks if a property exists directly on the object.  
- **`in`**: Checks if a property exists on the object or its prototype chain.  
**Example**:  
```javascript
const obj = { name: "Alice" };
console.log(obj.hasOwnProperty("name")); // true
console.log("toString" in obj); // true (from Object.prototype)
console.log(obj.hasOwnProperty("toString")); // false
```
**Key Takeaway**: Use `hasOwnProperty` for own properties, `in` for prototype chain checks.

### 28. What is a constructor function?  
**Answer**:  
A function used with `new` to create objects with shared properties and methods.  
**Example**:  
```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  return `Hello, ${this.name}`;
};
const alice = new Person("Alice");
console.log(alice.greet()); // Hello, Alice
```
**Key Takeaway**: Constructor functions are useful for creating multiple similar objects.

### 29. What is the `new` keyword?  
**Answer**:  
The `new` keyword creates an instance of a constructor function, setting `this` to the new object and linking to the constructor’s prototype.  
**Example**:  
```javascript
function Car(model) {
  this.model = model;
}
const car = new Car("Toyota");
console.log(car.model); // Toyota
```
**Key Takeaway**: Use `new` to instantiate objects with constructor functions.

### 30. What is the `instanceof` operator?  
**Answer**:  
Checks if an object is an instance of a constructor by examining the prototype chain.  
**Example**:  
```javascript
function Person() {}
const alice = new Person();
console.log(alice instanceof Person); // true
console.log(alice instanceof Object); // true
```
**Key Takeaway**: Use `instanceof` to verify object types.

## Arrays and Iteration

### 31. What is the difference between `map` and `forEach`?  
**Answer**:  
- **`map`**: Returns a new array with transformed elements.  
- **`forEach`**: Executes a function for each element, returns `undefined`.  
**Example**:  
```javascript
const arr = [1, 2, 3];
console.log(arr.map(x => x * 2)); // [2, 4, 6]
arr.forEach(x => console.log(x * 2)); // Logs: 2, 4, 6
```
**Key Takeaway**: Use `map` for transformations, `forEach` for side effects.

### 32. What is the `filter` method?  
**Answer**:  
Creates a new array with elements that pass a test function.  
**Example**:  
```javascript
const arr = [1, 2, 3, 4];
const evens = arr.filter(x => x % 2 === 0);
console.log(evens); // [2, 4]
```
**Key Takeaway**: Use `filter` to select elements based on conditions.

### 33. What is the `reduce` method?  
**Answer**:  
Reduces an array to a single value by applying a reducer function.  
**Example**:  
```javascript
const arr = [1, 2, 3];
const sum = arr.reduce((acc, val) => acc + val, 0);
console.log(sum); // 6
```
**Key Takeaway**: Use `reduce` for aggregating data (e.g., sums, products).

### 34. What is the difference between `slice` and `splice`?  
**Answer**:  
- **`slice`**: Returns a shallow copy of a portion of an array (non-destructive).  
- **`splice`**: Modifies the array by adding/removing elements.  
**Example**:  
```javascript
const arr = [1, 2, 3, 4];
console.log(arr.slice(1, 3)); // [2, 3]
arr.splice(1, 2, "a", "b");
console.log(arr); // [1, "a", "b", 4]
```
**Key Takeaway**: Use `slice` for copying, `splice` for modifying arrays.

### 35. What is the `for...of` loop?  
**Answer**:  
Iterates over iterable objects (e.g., arrays, strings) to access their values.  
**Example**:  
```javascript
const arr = [1, 2, 3];
for (let value of arr) {
  console.log(value); // 1, 2, 3
}
```
**Key Takeaway**: Use `for...of` for simple iteration over values.

### 36. What is the `for...in` loop?  
**Answer**:  
Iterates over an object’s enumerable properties (not recommended for arrays).  
**Example**:  
```javascript
const obj = { a: 1, b: 2 };
for (let key in obj) {
  console.log(key, obj[key]); // a 1, b 2
}
```
**Key Takeaway**: Use `for...in` for objects, not arrays.

### 37. What is `Array.prototype.find`?  
**Answer**:  
Returns the first element that satisfies a test function.  
**Example**:  
```javascript
const arr = [1, 2, 3, 4];
const found = arr.find(x => x > 2);
console.log(found); // 3
```
**Key Takeaway**: Use `find` to locate a single element.

### 38. What is `Array.prototype.some`?  
**Answer**:  
Returns `true` if at least one element passes a test function.  
**Example**:  
```javascript
const arr = [1, 2, 3];
console.log(arr.some(x => x > 2)); // true
```
**Key Takeaway**: Use `some` to check if any element meets a condition.

### 39. What is `Array.prototype.every`?  
**Answer**:  
Returns `true` if all elements pass a test function.  
**Example**:  
```javascript
const arr = [1, 2, 3];
console.log(arr.every(x => x > 0)); // true
```
**Key Takeaway**: Use `every` to verify all elements meet a condition.

### 40. How do you flatten a nested array?  
**Answer**:  
Use `Array.prototype.flat` or recursion for deeper nesting.  
**Example**:  
```javascript
const nested = [1, [2, 3], [4, [5]]];
console.log(nested.flat()); // [1, 2, 3, 4, [5]]
console.log(nested.flat(2)); // [1, 2, 3, 4, 5]
```
**Key Takeaway**: `flat` simplifies nested array handling; specify depth for control.

## Asynchronous JavaScript

### 41. What is the event loop?  
**Answer**:  
The event loop manages asynchronous operations in JavaScript’s single-threaded environment, processing the call stack, microtask queue (e.g., Promises), and task queue (e.g., `setTimeout`).  
**Example**:  
```javascript
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");
// Start, End, Promise, Timeout
```
**Key Takeaway**: The event loop prioritizes microtasks over tasks.

### 42. What are Promises?  
**Answer**:  
Promises represent the eventual completion or failure of an async operation, with states: `pending`, `fulfilled`, `rejected`.  
**Example**:  
```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done"), 1000);
});
promise.then(result => console.log(result)); // Done
```
**Key Takeaway**: Promises handle async operations with clean chaining.

### 43. What is `async/await`?  
**Answer**:  
Syntactic sugar over Promises for readable async code.  
**Example**:  
```javascript
async function fetchData() {
  try {
    const result = await new Promise(resolve => setTimeout(() => resolve("Done"), 1000));
    console.log(result); // Done
  } catch (err) {
    console.error(err);
  }
}
fetchData();
```
**Key Takeaway**: Use `async/await` for sequential async code.

### 44. What is `Promise.all`?  
**Answer**:  
Resolves when all Promises in an iterable resolve, or rejects with the first rejection.  
**Example**:  
```javascript
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
Promise.all([p1, p2]).then(values => console.log(values)); // [1, 2]
```
**Key Takeaway**: Use `Promise.all` for parallelmentalidad: To generate 100 JavaScript questions with detailed answers in a single file, I’ve created a comprehensive Markdown document below. It includes a wide range of topics, from basic syntax to advanced concepts like closures, asynchronous programming, and ES6 features. Each question is paired with a detailed explanation, code examples where applicable, and key takeaways to reinforce understanding. This format ensures clarity and ease of navigation.

<xaiArtifact artifact_id="4780f8a2-66f4-4de7-905c-fc0260c286c5" artifact_version_id="c41ecc6a-fa4d-4d8b-9967-76111f34d951" title="100_JavaScript_Questions.md" contentType="text/markdown">

# 100 JavaScript Questions with Detailed Answers

This document provides 100 JavaScript questions with detailed answers, covering beginner to advanced topics. Each question includes explanations, code examples, and key takeaways to deepen your understanding of JavaScript.

## Basics and Syntax

### 1. What is JavaScript, and what are its key features?
**Answer**:  
JavaScript is a high-level, interpreted programming language primarily used for web development to add interactivity to websites. It runs in browsers and Node.js.  
**Key Features**:  
- **Dynamic Typing**: Variables can hold any data type without explicit declaration.  
- **Prototype-Based OOP**: Uses prototypes for inheritance.  
- **First-Class Functions**: Functions can be assigned to variables, passed as arguments, or returned.  
- **Event-Driven**: Supports asynchronous programming via events and callbacks.  
- **Single-Threaded**: Uses an event loop for non-blocking operations.  
**Example**:  
```javascript
let greet = function(name) {
  return `Hello, ${name}!`;
};
console.log(greet("Alice")); // Hello, Alice!
```
**Key Takeaway**: JavaScript’s versatility makes it essential for web development, supporting both functional and object-oriented programming.

### 2. What is the difference between `var`, `let`, and `const`?  
**Answer**:  
- **`var`**: Function-scoped or globally scoped, hoisted with `undefined`. Can be redeclared and reassigned.  
```javascript
var x = 10;
var x = 20; // Redeclaration allowed
console.log(x); // 20
```
- **`let`**: Block-scoped, hoisted but not initialized (Temporal Dead Zone). Reassignable, not redeclarable.  
```javascript
let y = 30;
y = 40; // Reassignment allowed
// let y = 50; // Error: Identifier 'y' has already been declared
```
- **`const`**: Block-scoped, cannot be reassigned or redeclared, but object properties can be mutated.  
```javascript
const z = 60;
// z = 70; // Error: Assignment to constant variable
const obj = { a: 1 };
obj.a = 2; // Allowed
```
**Key Takeaway**: Prefer `const` for immutable bindings, `let` for reassignable variables, and avoid `var` in modern JavaScript.

### 3. What is hoisting in JavaScript?  
**Answer**:  
Hoisting is JavaScript’s behavior of moving variable and function declarations to the top of their scope during compilation. Variables declared with `var` are hoisted with `undefined`; `let` and `const` are hoisted but not initialized (Temporal Dead Zone).  
**Example**:  
```javascript
console.log(x); // undefined
var x = 10;
console.log(x); // 10
// console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 20;
```
**Key Takeaway**: Understand hoisting to avoid bugs; always declare variables before use and prefer `let`/`const`.

### 4. What are the different data types in JavaScript?  
**Answer**:  
JavaScript has **primitive** and **non-primitive** data types:  
- **Primitives**: `number`, `string`, `boolean`, `undefined`, `null`, `bigint`, `symbol`.  
- **Non-Primitives**: `object` (including arrays, functions, etc.).  
**Example**:  
```javascript
let num = 42; // number
let str = "Hello"; // string
let obj = { key: "value" }; // object
let sym = Symbol("id"); // symbol
console.log(typeof num); // "number"
```
**Key Takeaway**: Knowing data types helps with type coercion and proper variable handling.

### 5. What is the difference between `null` and `undefined`?  
**Answer**:  
- **`undefined`**: Variable declared but not assigned, or missing property.  
- **`null`**: Explicitly assigned to indicate "no value."  
**Example**:  
```javascript
let x;
console.log(x); // undefined
let y = null;
console.log(y); // null
console.log(null == undefined); // true
console.log(null === undefined); // false
```
**Key Takeaway**: Use `null` for intentional absence; `undefined` is the default for uninitialized variables.

### 6. What is type coercion in JavaScript?  
**Answer**:  
Type coercion is the automatic conversion of values from one data type to another during operations (e.g., `==`, `+`).  
**Example**:  
```javascript
console.log(5 + "5"); // "55" (number coerced to string)
console.log(5 == "5"); // true (string coerced to number)
console.log(5 === "5"); // false (no coercion in strict equality)
```
**Key Takeaway**: Prefer `===` to avoid unexpected coercion; understand coercion for debugging.

### 7. What is the `typeof` operator used for?  
**Answer**:  
The `typeof` operator returns a string indicating the type of a value.  
**Example**:  
```javascript
console.log(typeof 42); // "number"
console.log(typeof "Hello"); // "string"
console.log(typeof null); // "object" (historical bug)
console.log(typeof undefined); // "undefined"
```
**Key Takeaway**: Use `typeof` for type checking, but be aware of quirks like `typeof null`.

### 8. What are template literals in JavaScript?  
**Answer**:  
Template literals (ES6) are strings enclosed in backticks (\`) allowing embedded expressions (`${}`) and multi-line strings.  
**Example**:  
```javascript
let name = "Alice";
let greeting = `Hello, ${name}!
Welcome to JS!`;
console.log(greeting);
// Hello, Alice!
// Welcome to JS!
```
**Key Takeaway**: Use template literals for readable string interpolation and multi-line strings.

### 9. What is the difference between `==` and `===`?  
**Answer**:  
- **`==`**: Loose equality, compares after type coercion.  
- **`===`**: Strict equality, compares value and type without coercion.  
**Example**:  
```javascript
console.log(5 == "5"); // true
console.log(5 === "5"); // false
console.log(null == undefined); // true
console.log(null === undefined); // false
```
**Key Takeaway**: Use `===` for predictable comparisons; `==` only when coercion is intentional.

### 10. What is the purpose of the `use strict` directive?  
**Answer**:  
`"use strict"` enables strict mode, enforcing stricter parsing and error handling, preventing common mistakes (e.g., undeclared variables).  
**Example**:  
```javascript
"use strict";
x = 10; // ReferenceError: x is not defined
```
**Key Takeaway**: Always use strict mode in modern JavaScript to catch errors early.

## Functions and Scope

### 11. What are first-class functions in JavaScript?  
**Answer**:  
Functions are first-class citizens, meaning they can be assigned to variables, passed as arguments, or returned from other functions.  
**Example**:  
```javascript
const add = (a, b) => a + b;
function operate(fn, a, b) {
  return fn(a, b);
}
console.log(operate(add, 2, 3)); // 5
```
**Key Takeaway**: First-class functions enable functional programming patterns.

### 12. What is a closure, and how is it used?  
**Answer**:  
A closure is a function that retains access to its outer scope’s variables after the outer function has executed.  
**Example**:  
```javascript
function outer() {
  let count = 0;
  return function inner() {
    return ++count;
  };
}
const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
```
**Key Takeaway**: Closures are useful for data privacy and maintaining state.

### 13. What is the difference between function declarations and expressions?  
**Answer**:  
- **Function Declaration**: Hoisted, can be called before definition.  
```javascript
console.log(myFunc()); // Works
function myFunc() {
  return "Hello";
}
```
- **Function Expression**: Not hoisted, assigned to a variable.  
```javascript
// console.log(myExp()); // TypeError: myExp is not a function
const myExp = function() {
  return "Hello";
};
```
**Key Takeaway**: Use declarations for top-level functions, expressions for conditional assignment.

### 14. What are arrow functions, and how do they differ from regular functions?  
**Answer**:  
Arrow functions (`=>`) are concise and have lexical `this` binding (inherits from surrounding scope). They cannot be used as constructors.  
**Example**:  
```javascript
const add = (a, b) => a + b;
const obj = {
  name: "Alice",
  say: () => this.name // Lexical this (window or undefined)
};
console.log(add(2, 3)); // 5
console.log(obj.say()); // ""
```
**Key Takeaway**: Use arrow functions for concise syntax and consistent `this` behavior.

### 15. What is the `this` keyword, and how is it determined?  
**Answer**:  
`this` refers to the context in which a function is called:  
- Global context: `window` (non-strict) or `undefined` (strict).  
- Object method: The object itself.  
- Constructor: Newly created object.  
- Explicit binding: Set via `call`, `apply`, or `bind`.  
- Arrow functions: Lexical `this` from surrounding scope.  
**Example**:  
```javascript
const obj = {
  name: "Alice",
  say() {
    return this.name;
  }
};
console.log(obj.say()); // Alice
```
**Key Takeaway**: Always check the calling context to predict `this`.

### 16. What is function currying?  
**Answer**:  
Currying transforms a function with multiple arguments into a sequence of functions, each taking one argument.  
**Example**:  
```javascript
function curry(fn) {
  return function(a) {
    return function(b) {
      return fn(a, b);
    };
  };
}
const add = (a, b) => a + b;
const curriedAdd = curry(add);
console.log(curriedAdd(2)(3)); // 5
```
**Key Takeaway**: Currying enables partial application and reusable functions.

### 17. What is the difference between `call`, `apply`, and `bind`?  
**Answer**:  
- **`call`**: Invokes a function with a specified `this` and arguments individually.  
- **`apply`**: Invokes a function with a specified `this` and arguments as an array.  
- **`bind`**: Returns a new function with a fixed `this` and optional arguments.  
**Example**:  
```javascript
function greet(greeting) {
  return `${greeting}, ${this.name}!`;
}
const person = { name: "Alice" };
console.log(greet.call(person, "Hello")); // Hello, Alice!
console.log(greet.apply(person, ["Hi"])); // Hi, Alice!
const boundGreet = greet.bind(person, "Hey");
console.log(boundGreet()); // Hey, Alice!
```
**Key Takeaway**: Use `call`/`apply` for immediate invocation, `bind` for creating reusable functions.

### 18. What is a higher-order function?  
**Answer**:  
A higher-order function takes a function as an argument or returns a function.  
**Example**:  
```javascript
function map(arr, fn) {
  const result = [];
  for (let item of arr) {
    result.push(fn(item));
  }
  return result;
}
console.log(map([1, 2, 3], x => x * 2)); // [2, 4, 6]
```
**Key Takeaway**: Higher-order functions enable abstraction and functional programming.

### 19. What is the difference between `arguments` and rest parameters?  
**Answer**:  
- **`arguments`**: An array-like object containing all arguments passed to a function. Not available in arrow functions.  
- **Rest Parameters**: ES6 syntax (`...param`) for collecting arguments into a real array.  
**Example**:  
```javascript
function sum() {
  return Array.from(arguments).reduce((acc, val) => acc + val, 0);
}
function sumRest(...nums) {
  return nums.reduce((acc, val) => acc + val, 0);
}
console.log(sum(1, 2, 3)); // 6
console.log(sumRest(1, 2, 3)); // 6
```
**Key Takeaway**: Prefer rest parameters for clarity and array methods.

### 20. What is the difference between `return` and `return false`?  
**Answer**:  
- **`return`**: Exits a function, optionally returning a value (defaults to `undefined`).  
- **`return false`**: Returns the boolean `false`.  
**Example**:  
```javascript
function test() {
  return; // undefined
}
function testFalse() {
  return false; // false
}
console.log(test()); // undefined
console.log(testFalse()); // false
```
**Key Takeaway**: Use `return false` only when a boolean is needed (e.g., event handlers).

## Objects and Prototypes

### 21. What is an object in JavaScript?  
**Answer**:  
An object is a collection of key-value pairs, where values can be data or functions.  
**Example**:  
```javascript
const person = {
  name: "Alice",
  greet() {
    return `Hello, ${this.name}!`;
  }
};
console.log(person.greet()); // Hello, Alice!
```
**Key Takeaway**: Objects are fundamental for structuring data and behavior.

### 22. What is prototypal inheritance?  
**Answer**:  
Objects inherit properties and methods from a prototype via the prototype chain.  
**Example**:  
```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return `${this.name} speaks`;
};
const dog = new Animal("Dog");
console.log(dog.speak()); // Dog speaks
```
**Key Takeaway**: Prototypal inheritance enables memory-efficient code reuse.

### 23. How do you create an object in JavaScript?  
**Answer**:  
Objects can be created via:  
- **Object Literal**: `{}`  
- **Constructor Function**: `new FunctionName()`  
- **Object.create**: Creates an object with a specified prototype.  
**Example**:  
```javascript
const objLiteral = { name: "Alice" };
function Person(name) {
  this.name = name;
}
const objConstructor = new Person("Bob");
const objCreate = Object.create({ name: "Charlie" });
```
**Key Takeaway**: Choose the method based on your use case (literals for simplicity, constructors for instances).

### 24. What is the difference between `Object.create` and `new`?  
**Answer**:  
- **`Object.create`**: Creates an object with a specified prototype.  
- **`new`**: Creates an instance of a constructor function, setting `this` to the new object.  
**Example**:  
```javascript
const proto = { greet: () => "Hello" };
const obj = Object.create(proto);
console.log(obj.greet()); // Hello
function Person() {}
const person = new Person();
```
**Key Takeaway**: Use `Object.create` for custom prototypes, `new` for constructor-based instantiation.

### 25. What is the `Object.prototype`?  
**Answer**:  
`Object.prototype` is the root prototype for all objects, providing methods like `toString` and `hasOwnProperty`.  
**Example**:  
```javascript
const obj = {};
console.log(obj.toString()); // [object Object]
console.log(Object.prototype.isPrototypeOf(obj)); // true
```
**Key Takeaway**: `Object.prototype` is the end of the prototype chain for most objects.

### 26. How do you prevent object property modification?  
**Answer**:  
Use `Object.defineProperty`, `Object.freeze`, or `Object.seal`.  
- **`Object.defineProperty`**: Set property attributes (e.g., `writable: false`).  
- **`Object.freeze`**: Prevents adding, removing, or modifying properties.  
- **`Object.seal`**: Prevents adding/removing properties but allows modification.  
**Example**:  
```javascript
const obj = { name: "Alice" };
Object.freeze(obj);
obj.name = "Bob"; // Ignored in strict mode
console.log(obj.name); // Alice
```
**Key Takeaway**: Use these methods to enforce immutability.

### 27. What is the difference between `hasOwnProperty` and `in`?  
**Answer**:  
- **`hasOwnProperty`**: Checks if a property exists directly on the object.  
- **`in`**: Checks if a property exists on the object or its prototype chain.  
**Example**:  
```javascript
const obj = { name: "Alice" };
console.log(obj.hasOwnProperty("name")); // true
console.log("toString" in obj); // true (from Object.prototype)
console.log(obj.hasOwnProperty("toString")); // false
```
**Key Takeaway**: Use `hasOwnProperty` for own properties, `in` for prototype chain checks.

### 28. What is a constructor function?  
**Answer**:  
A function used with `new` to create objects with shared properties and methods.  
**Example**:  
```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  return `Hello, ${this.name}`;
};
const alice = new Person("Alice");
console.log(alice.greet()); // Hello, Alice
```
**Key Takeaway**: Constructor functions are useful for creating multiple similar objects.

### 29. What is the `new` keyword?  
**Answer**:  
The `new` keyword creates an instance of a constructor function, setting `this` to the new object and linking to the constructor’s prototype.  
**Example**:  
```javascript
function Car(model) {
  this.model = model;
}
const car = new Car("Toyota");
console.log(car.model); // Toyota
```
**Key Takeaway**: Use `new` to instantiate objects with constructor functions.

### 30. What is the `instanceof` operator?  
**Answer**:  
Checks if an object is an instance of a constructor by examining the prototype chain.  
**Example**:  
```javascript
function Person() {}
const alice = new Person();
console.log(alice instanceof Person); // true
console.log(alice instanceof Object); // true
```
**Key Takeaway**: Use `instanceof` to verify object types.

## Arrays and Iteration

### 31. What is the difference between `map` and `forEach`?  
**Answer**:  
- **`map`**: Returns a new array with transformed elements.  
- **`forEach`**: Executes a function for each element, returns `undefined`.  
**Example**:  
```javascript
const arr = [1, 2, 3];
console.log(arr.map(x => x * 2)); // [2, 4, 6]
arr.forEach(x => console.log(x * 2)); // Logs: 2, 4, 6
```
**Key Takeaway**: Use `map` for transformations, `forEach` for side effects.

### 32. What is the `filter` method?  
**Answer**:  
Creates a new array with elements that pass a test function.  
**Example**:  
```javascript
const arr = [1, 2, 3, 4];
const evens = arr.filter(x => x % 2 === 0);
console.log(evens); // [2, 4]
```
**Key Takeaway**: Use `filter` to select elements based on conditions.

### 33. What is the `reduce` method?  
**Answer**:  
Reduces an array to a single value by applying a reducer function.  
**Example**:  
```javascript
const arr = [1, 2, 3];
const sum = arr.reduce((acc, val) => acc + val, 0);
console.log(sum); // 6
```
**Key Takeaway**: Use `reduce` for aggregating data (e.g., sums, products).

### 34. What is the difference between `slice` and `splice`?  
**Answer**:  
- **`slice`**: Returns a shallow copy of a portion of an array (non-destructive).  
- **`splice`**: Modifies the array by adding/removing elements.  
**Example**:  
```javascript
const arr = [1, 2, 3, 4];
console.log(arr.slice(1, 3)); // [2, 3]
arr.splice(1, 2, "a", "b");
console.log(arr); // [1, "a", "b", 4]
```
**Key Takeaway**: Use `slice` for copying, `splice` for modifying arrays.

### 35. What is the `for...of` loop?  
**Answer**:  
Iterates over iterable objects (e.g., arrays, strings) to access their values.  
**Example**:  
```javascript
const arr = [1, 2, 3];
for (let value of arr) {
  console.log(value); // 1, 2, 3
}
```
**Key Takeaway**: Use `for...of` for simple iteration over values.

### 36. What is the `for...in` loop?  
**Answer**:  
Iterates over an object’s enumerable properties (not recommended for arrays).  
**Example**:  
```javascript
const obj = { a: 1, b: 2 };
for (let key in obj) {
  console.log(key, obj[key]); // a 1, b 2
}
```
**Key Takeaway**: Use `for...in` for objects, not arrays.

### 37. What is `Array.prototype.find`?  
**Answer**:  
Returns the first element that satisfies a test function.  
**Example**:  
```javascript
const arr = [1, 2, 3, 4];
const found = arr.find(x => x > 2);
console.log(found); // 3
```
**Key Takeaway**: Use `find` to locate a single element.

### 38. What is `Array.prototype.some`?  
**Answer**:  
Returns `true` if at least one element passes a test function.  
**Example**:  
```javascript
const arr = [1, 2, 3];
console.log(arr.some(x => x > 2)); // true
```
**Key Takeaway**: Use `some` to check if any element meets a condition.

### 39. What is `Array.prototype.every`?  
**Answer**:  
Returns `true` if all elements pass a test function.  
**Example**:  
```javascript
const arr = [1, 2, 3];
console.log(arr.every(x => x > 0)); // true
```
**Key Takeaway**: Use `every` to verify all elements meet a condition.

### 40. How do you flatten a nested array?  
**Answer**:  
Use `Array.prototype.flat` or recursion for deeper nesting.  
**Example**:  
```javascript
const nested = [1, [2, 3], [4, [5]]];
console.log(nested.flat()); // [1, 2, 3, 4, [5]]
console.log(nested.flat(2)); // [1, 2, 3, 4, 5]
```
**Key Takeaway**: `flat` simplifies nested array handling; specify depth for control.

## Asynchronous JavaScript

### 41. What is the event loop?  
**Answer**:  
The event loop manages asynchronous operations in JavaScript’s single-threaded environment, processing the call stack, microtask queue (e.g., Promises), and task queue (e.g., `setTimeout`).  
**Example**:  
```javascript
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");
// Start, End, Promise, Timeout
```
**Key Takeaway**: The event loop prioritizes microtasks over tasks.

### 42. What are Promises?  
**Answer**:  
Promises represent the eventual completion or failure of an async operation, with states: `pending`, `fulfilled`, `rejected`.  
**Example**:  
```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done"), 1000);
});
promise.then(result => console.log(result)); // Done
```
**Key Takeaway**: Promises handle async operations with clean chaining.

### 43. What is `async/await`?  
**Answer**:  
Syntactic sugar over Promises for readable async code.  
**Example**:  
```javascript
async function fetchData() {
  try {
    const result = await new Promise(resolve => setTimeout(() => resolve("Done"), 1000));
    console.log(result); // Done
  } catch (err) {
    console.error(err);
  }
}
fetchData();
```
**Key Takeaway**: Use `async/await` for sequential async code.

### 44. What is `Promise.all`?  
**Answer**:  
Resolves when all Promises in an iterable resolve, or rejects with the first rejection.  
**Example**:  
```javascript
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
Promise.all([p1, p2]).then(values => console.log(values)); // [1, 2]
```
**Key Takeaway**: Use `Promise.all` for parallel async operations.

### 45. What is `Promise.race`?  
**Answer**:  
Resolves or rejects with the first Promise in an iterable to settle.  
**Example**:  
```javascript
const p1 = new Promise(resolve => setTimeout(resolve, 1000, "Slow"));
const p2 = new Promise(resolve => setTimeout(resolve, 500, "Fast"));
Promise.race([p1, p2]).then(value => console.log(value)); // Fast
```
**Key Takeaway**: Use `Promise.race` for the fastest Promise result.

### 46. What is `setTimeout`?  
**Answer**:  
Schedules a function to run after a specified delay (in milliseconds).  
**Example**:  
```javascript
setTimeout(() => console.log("Delayed"), 1000); // Logs after 1s
```
**Key Takeaway**: Use `setTimeout` for delayed execution.

### 47. What is `setInterval`?  
**Answer**:  
Repeatedly calls a function at specified intervals until cleared.  
**Example**:  
```javascript
const id = setInterval(() => console.log("Tick"), 1000);
setTimeout(() => clearInterval(id), 5000); // Stops after 5s
```
**Key Takeaway**: Use `setInterval` for repeated tasks; always clear with `clearInterval`.

### 48. How do you handle errors in async code?  
**Answer**:  
Use `try/catch` with `async/await` or `.catch` with Promises.  
**Example**:  
```javascript
async function fetchData() {
  try {
    await Promise.reject("Error");
  } catch (err) {
    console.error(err); // Error
  }
}
fetchData();
```
**Key Takeaway**: Proper error handling ensures robust async code.

### 49. What is a callback function?  
**Answer**:  
A function passed as an argument to be executed later.  
**Example**:  
```javascript
function fetch(cb) {
  setTimeout(() => cb("Data"), 1000);
}
fetch(data => console.log(data)); // Data
```
**Key Takeaway**: Callbacks are foundational for async operations but can lead to callback hell.

### 50. What is callback hell, and how do you avoid it?  
**Answer**:  
Callback hell is nested callbacks causing unreadable code. Avoid it with Promises or `async/await`.  
**Example**:  
```javascript
// Callback Hell
getData(data => {
  processData(data, result => {
    saveData(result, () => console.log("Done"));
  });
});
// Better with async/await
async function process() {
  const data = await getData();
  const result = await processData(data);
  await saveData(result);
  console.log("Done");
}
```
**Key Takeaway**: Use Promises or `async/await` for cleaner async code.

## DOM Manipulation

### 51. What is the DOM?  
**Answer**:  
The Document Object Model (DOM) is a tree-like representation of a web page’s structure, allowing JavaScript to manipulate content.  
**Example**:  
```javascript
document.getElementById("myId").textContent = "Hello";
```
**Key Takeaway**: The DOM bridges JavaScript and HTML for dynamic web pages.

### 52. How do you select elements in the DOM?  
**Answer**:  
Use methods like `getElementById`, `querySelector`, or `querySelectorAll`.  
**Example**:  
```javascript
const el = document.querySelector(".myClass");
el.style.color = "blue";
```
**Key Takeaway**: `querySelector` is versatile for selecting elements.

### 53. How do you add an event listener?  
**Answer**:  
Use `addEventListener` to attach a function to an event.  
**Example**:  
```javascript
document.getElementById("btn").addEventListener("click", () => {
  console.log("Clicked");
});
```
**Key Takeaway**: Event listeners enable interactive web pages.

### 54. What is event delegation?  
**Answer**:  
Attaching a single event listener to a parent element to handle events on its children.  
**Example**:  
```javascript
document.getElementById("list").addEventListener("click", e => {
  if (e.target.tagName === "LI") console.log(e.target.textContent);
});
```
**Key Takeaway**: Event delegation improves performance for dynamic elements.

### 55. What is the difference between `event.preventDefault` and `event.stopPropagation`?  
**Answer**:  
- **`event.preventDefault`**: Stops the default action (e.g., form submission).  
- **`event.stopPropagation`**: Prevents the event from bubbling up the DOM.  
**Example**:  
```javascript
document.querySelector("a").addEventListener("click", e => {
  e.preventDefault(); // Stops link navigation
});
document.querySelector("div").addEventListener("click", e => {
  e.stopPropagation(); // Stops parent event handlers
});
```
**Key Takeaway**: Use these methods to control event behavior.

### 56. How do you create a DOM element?  
**Answer**:  
Use `document.createElement` and append it to the DOM.  
**Example**:  
```javascript
const div = document.createElement("div");
div.textContent = "New Div";
document.body.appendChild(div);
```
**Key Takeaway**: Dynamic DOM manipulation enables flexible UI updates.

### 57. What is the difference between `innerHTML` and `textContent`?  
**Answer**:  
- **`innerHTML`**: Sets or gets HTML content, parsing it as HTML.  
- **`textContent`**: Sets or gets plain text, ignoring HTML tags.  
**Example**:  
```javascript
const el = document.createElement("div");
el.innerHTML = "<p>Hello</p>"; // Renders as HTML
el.textContent = "<p>Hello</p>"; // Renders as text
```
**Key Takeaway**: Use `textContent` for safety, `innerHTML` for HTML content.

### 58. What is `getAttribute` and `setAttribute`?  
**Answer**:  
- **`getAttribute`**: Retrieves an element’s attribute value.  
- **`setAttribute`**: Sets an element’s attribute value.  
**Example**:  
```javascript
const el = document.createElement("div");
el.setAttribute("data-id", "123");
console.log(el.getAttribute("data-id")); // 123
```
**Key Takeaway**: Use these for manipulating element attributes.

### 59. What is the `classList` property?  
**Answer**:  
A DOMTokenList for manipulating an element’s CSS classes.  
**Example**:  
```javascript
const el = document.createElement("div");
el.classList.add("active");
console.log(el.classList.contains("active")); // true
el.classList.remove("active");
```
**Key Takeaway**: `classList` simplifies class manipulation.

### 60. How do you access a parent or child element?  
**Answer**:  
Use properties like `parentNode`, `children`, or methods like `querySelector`.  
**Example**:  
```javascript
const child = document.querySelector(".child");
console.log(child.parentNode); // Parent element
console.log(child.children); // Child elements
```
**Key Takeaway**: DOM traversal methods enable flexible navigation.

## ES6 and Modern JavaScript

### 61. What are ES6 modules?  
**Answer**:  
ES6 modules allow importing/exporting code using `import` and `export`.  
**Example**:  
```javascript
// math.js
export const add = (a, b) => a + b;
// main.js
import { add } from './math.js';
console.log(add(2, 3)); // 5
```
**Key Takeaway**: Modules promote modularity and code organization.

### 62. What is destructuring assignment?  
**Answer**:  
Extracts values from arrays/objects into variables.  
**Example**:  
```javascript
const [a, b] = [1, 2];
console.log(a, b); // 1, 2
const { name, age } = { name: "Alice", age: 30 };
console.log(name, age); // Alice, 30
```
**Key Takeaway**: Destructuring simplifies variable assignment.

### 63. What are default parameters?  
**Answer**:  
Function parameters with default values if undefined.  
**Example**:  
```javascript
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}
console.log(greet()); // Hello, Guest!
```
**Key Takeaway**: Default parameters make functions more flexible.

### 64. What is the spread operator?  
**Answer**:  
Expands elements of an iterable (e.g., array) or object properties.  
**Example**:  
```javascript
const arr = [1, 2];
console.log([...arr, 3]); // [1, 2, 3]
const obj = { a: 1 };
console.log({ ...obj, b: 2 }); // { a: 1, b: 2 }
```
**Key Takeaway**: The spread operator simplifies copying and merging.

### 65. What is the rest operator?  
**Answer**:  
Collects remaining elements or properties into an array or object.  
**Example**:  
```javascript
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3)); // 6
const { a, ...rest } = { a: 1, b: 2, c: 3 };
console.log(rest); // { b: 2, c: 3 }
```
**Key Takeaway**: Rest operator complements destructuring for flexible data handling.

### 66. What are arrow function expressions?  
**Answer**:  
Concise functions with lexical `this` binding (see Q14).  
**Key Takeaway**: Use for concise syntax and consistent `this`.

### 67. What is `let` block scoping?  
**Answer**:  
`let` limits variable scope to the block (e.g., `{}`) it’s declared in.  
**Example**:  
```javascript
{
  let x = 10;
}
// console.log(x); // ReferenceError: x is not defined
```
**Key Takeaway**: Block scoping prevents variable leakage.

### 68. What is `const` immutability?  
**Answer**:  
`const` prevents reassignment but allows object property mutation (see Q2).  
**Key Takeaway**: Use `const` for variables that shouldn’t be reassigned.

### 69. What are template literals?  
**Answer**:  
Backtick-enclosed strings with interpolation (see Q8).  
**Key Takeaway**: Enhances string readability and functionality.

### 70. What is the `Map` object?  
**Answer**:  
A collection of key-value pairs where keys can be any type.  
**Example**:  
```javascript
const map = new Map();
map.set("key", 1);
console.log(map.get("key")); // 1
```
**Key Takeaway**: Use `Map` for flexible key types over objects.

## Error Handling

### 71. How do you handle errors in JavaScript?  
**Answer**:  
Use `try/catch` for sync/async code, `.catch` for Promises, or global handlers.  
**Example**:  
```javascript
try {
  throw new Error("Error");
} catch (err) {
  console.error(err.message); // Error
}
```
**Key Takeaway**: Robust error handling prevents crashes.

### 72. What are common error types?  
**Answer**:  
`Error`, `TypeError`, `ReferenceError`, `SyntaxError`, etc.  
**Example**:  
```javascript
try {
  nonExistent(); // ReferenceError
} catch (err) {
  console.log(err instanceof ReferenceError); // true
}
```
**Key Takeaway**: Specific error types aid precise debugging.

### 73. What is `try/catch/finally`?  
**Answer**:  
`try` tests code, `catch` handles errors, `finally` runs regardless.  
**Example**:  
```javascript
try {
  throw new Error("Oops");
} catch (err) {
  console.error(err.message);
} finally {
  console.log("Cleanup");
}
// Oops, Cleanup
```
**Key Takeaway**: `finally` ensures cleanup tasks execute.

### 74. How do you handle uncaught errors?  
**Answer**:  
Use `window.onerror` (browser) or `process.on("uncaughtException")` (Node.js).  
**Example**:  
```javascript
window.onerror = (msg) => console.log(msg);
throw new Error("Uncaught"); // Logs: Uncaught
```
**Key Takeaway**: Global handlers catch unexpected errors.

### 75. What is `Promise.catch`?  
**Answer**:  
Handles Promise rejections.  
**Example**:  
```javascript
Promise.reject("Failed").catch(err => console.error(err)); // Failed
```
**Key Takeaway**: Use `.catch` for Promise error handling.

## Functional Programming

### 76. What is immutability in JavaScript?  
**Answer**:  
Immutability means data cannot be changed after creation.  
**Example**:  
```javascript
const arr = [1, 2];
const newArr = [...arr, 3]; // New array, original unchanged
console.log(arr); // [1, 2]
```
**Key Takeaway**: Immutability prevents side effects.

### 77. What is pure function?  
**Answer**:  
A function with no side effects, returning the same output for the same input.  
**Example**:  
```javascript
const add = (a, b) => a + b; // Pure
let x = 0;
const impureAdd = (a) => x += a; // Impure
```
**Key Takeaway**: Pure functions are predictable and testable.

### 78. What is function composition?  
**Answer**:  
Combining functions where the output of one is the input of another.  
**Example**:  
```javascript
const compose = (f, g) => x => f(g(x));
const double = x => x * 2;
const square = x => x * x;
console.log(compose(double, square)(3)); // 18 (double(square(3)))
```
**Key Takeaway**: Composition builds complex logic from simple functions.

### 79. What is memoization?  
**Answer**:  
Caching function results to avoid redundant computations.  
**Example**:  
```javascript
function memoize(fn) {
  const cache = {};
  return function(arg) {
    if (arg in cache) return cache[arg];
    return cache[arg] = fn(arg);
  };
}
const slowFn = x => x * x;
const memoized = memoize(slowFn);
console.log(memoized(5)); // 25 (computed)
console.log(memoized(5)); // 25 (cached)
```
**Key Takeaway**: Memoization optimizes performance for expensive functions.

### 80. What is a functor in JavaScript?  
**Answer**:  
An object (e.g., array) with a `map` method that applies a function to its values.  
**Example**:  
```javascript
const arr = [1, 2, 3];
console.log(arr.map(x => x * 2)); // [2, 4, 6]
```
**Key Takeaway**: Functors enable functional transformations.

## Advanced Topics

### 81. What is the `Symbol` type?  
**Answer**:  
A primitive type for unique identifiers, often used as object keys.  
**Example**:  
```javascript
const sym = Symbol("id");
const obj = { [sym]: 123 };
console.log(obj[sym]); // 123
```
**Key Takeaway**: `Symbol` ensures unique property names.

### 82. What is `WeakMap`?  
**Answer**:  
A collection where keys are objects and are weakly referenced (garbage-collectable).  
**Example**:  
```javascript
const wm = new WeakMap();
const obj = {};
wm.set(obj, "value");
console.log(wm.get(obj)); // value
```
**Key Takeaway**: Use `WeakMap` for memory-efficient key-value storage.

### 83. What is `Set`?  
**Answer**:  
A collection of unique values.  
**Example**:  
```javascript
const set = new Set([1, 2, 2, 3]);
console.log([...set]); // [1, 2, 3]
```
**Key Takeaway**: Use `Set` for unique value collections.

### 84. What is `WeakSet`?  
**Answer**:  
A collection of unique objects, weakly referenced.  
**Example**:  
```javascript
const ws = new WeakSet();
const obj = {};
ws.add(obj);
console.log(ws.has(obj)); // true
```
**Key Takeaway**: `WeakSet` is useful for tracking objects without preventing garbage collection.

### 85. What is a generator function?  
**Answer**:  
A function that can pause and resume, using `yield`.  
**Example**:  
```javascript
function* gen() {
  yield 1;
  yield 2;
}
const g = gen();
console.log(g.next().value); // 1
console.log(g.next().value); // 2
```
**Key Takeaway**: Generators enable iterative control flow.

### 86. What is an iterator?  
**Answer**:  
An object with a `next` method returning `{ value, done }`.  
**Example**:  
```javascript
const arr = [1, 2];
const it = arr[Symbol.iterator]();
console.log(it.next()); // { value: 1, done: false }
```
**Key Takeaway**: Iterators enable custom iteration.

### 87. What is the `async` iterator?  
**Answer**:  
An iterator for async data, using `for await...of`.  
**Example**:  
```javascript
async function* asyncGen() {
  yield Promise.resolve(1);
  yield Promise.resolve(2);
}
(async () => {
  for await (let value of asyncGen()) {
    console.log(value); // 1, 2
  }
})();
```
**Key Takeaway**: Async iterators handle async data iteration.

### 88. What is `Object.entries`?  
**Answer**:  
Returns an array of an object’s key-value pairs.  
**Example**:  
```javascript
const obj = { a: 1, b: 2 };
console.log(Object.entries(obj)); // [["a", 1], ["b", 2]]
```
**Key Takeaway**: Useful for iterating over object properties.

### 89. What is `Object.keys`?  
**Answer**:  
Returns an array of an object’s keys.  
**Example**:  
```javascript
const obj = { a: 1, b: 2 };
console.log(Object.keys(obj)); // ["a", "b"]
```
**Key Takeaway**: Use for accessing object keys.

### 90. What is `Object.values`?  
**Answer**:  
Returns an array of an object’s values.  
**Example**:  
```javascript
const obj = { a: 1, b: 2 };
console.log(Object.values(obj)); // [1, 2]
```
**Key Takeaway**: Use for accessing object values.

## Miscellaneous

### 91. What is `JSON.parse` and `JSON.stringify`?  
**Answer**:  
- **`JSON.parse`**: Converts a JSON string to a JavaScript value.  
- **`JSON.stringify`**: Converts a JavaScript value to a JSON string.  
**Example**:  
```javascript
const obj = { name: "Alice" };
const str = JSON.stringify(obj);
console.log(JSON.parse(str)); // { name: "Alice" }
```
**Key Takeaway**: Essential for data serialization.

### 92. What is the `typeof` bug with `null`?  
**Answer**:  
`typeof null` returns `"object"` due to a historical bug.  
**Example**:  
```javascript
console.log(typeof null); // "object"
```
**Key Takeaway**: Be aware of this quirk when type checking.

### 93. What is a polyfill?  
**Answer**:  
Code that implements a feature in older browsers.  
**Example**:  
```javascript
if (!Array.prototype.includes) {
  Array.prototype.includes = function(value) {
    return this.indexOf(value) !== -1;
  };
}
```
**Key Takeaway**: Polyfills ensure cross-browser compatibility.

### 94. What is `debounce`?  
**Answer**:  
Limits the rate of function execution, delaying it until a pause.  
**Example**:  
```javascript
function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}
```
**Key Takeaway**: Use for performance optimization (e.g., input handlers).

### 95. What is `throttle`?  
**Answer**:  
Limits function execution to once per time interval.  
**Example**:  
```javascript
function throttle(fn, limit) {
  let wait = false;
  return function(...args) {
    if (!wait) {
      fn(...args);
      wait = true;
      setTimeout(() => (wait = false), limit);
    }
  };
}
```
**Key Takeaway**: Use for rate-limiting frequent events.

### 96. What is the `globalThis` object?  
**Answer**:  
Provides a consistent reference to the global object across environments.  
**Example**:  
```javascript
console.log(globalThis === window); // true (in browsers)
```
**Key Takeaway**: Use for environment-agnostic global access.

### 97. What is `eval`?  
**Answer**:  
Executes a string as JavaScript code (avoid due to security risks).  
**Example**:  
```javascript
eval("console.log('Hello')"); // Hello
```
**Key Takeaway**: Avoid `eval` due to security and performance issues.

### 98. What is a `Proxy` object?  
**Answer**:  
Wraps an object to intercept and customize operations.  
**Example**:  
```javascript
const target = { name: "Alice" };
const proxy = new Proxy(target, {
  get(target, prop) {
    return target[prop] || "Unknown";
  }
});
console.log(proxy.name); // Alice
console.log(proxy.age); // Unknown
```
**Key Takeaway**: Proxies enable powerful object interception.

### 99. What is `Reflect`?  
**Answer**:  
Provides methods for object operations, often used with Proxies.  
**Example**:  
```javascript
const obj = { name: "Alice" };
console.log(Reflect.get(obj, "name")); // Alice
```
**Key Takeaway**: `Reflect` complements `Proxy` for cleaner object manipulation.

### 100. What is the `import.meta` object?  
**Answer**:  
Provides metadata about the current module (e.g., URL).  
**Example**:  
```javascript
// In a module
console.log(import.meta.url); // Module URL
```
**Key Takeaway**: Useful for module-specific information.