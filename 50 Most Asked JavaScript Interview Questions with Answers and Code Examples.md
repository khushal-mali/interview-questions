# 50 Most Asked JavaScript Interview Questions with Detailed Answers and Code Examples

1. **What is the difference between `undefined` and `undeclared` variables?**
   - **Answer**: `undefined` is a variable that has been declared but not assigned a value. `undeclared` refers to a variable that has not been declared at all, resulting in a `ReferenceError` when accessed.
   - **Code Example**:
     ```javascript
     let x;
     console.log(x); // undefined
     console.log(y); // ReferenceError: y is not defined
     ```

2. **What is type coercion in JavaScript?**
   - **Answer**: Type coercion is the automatic conversion of values from one data type to another (e.g., string to number) during operations like comparisons or arithmetic.
   - **Code Example**:
     ```javascript
     console.log("5" + 3); // "53" (string concatenation)
     console.log("5" - 3); // 2 (number coercion)
     ```

3. **What is the purpose of the `typeof` operator?**
   - **Answer**: The `typeof` operator returns a string indicating the type of a value or variable, useful for type checking.
   - **Code Example**:
     ```javascript
     console.log(typeof 42); // "number"
     console.log(typeof "hello"); // "string"
     console.log(typeof null); // "object" (historical bug)
     ```

4. **What are the falsy values in JavaScript?**
   - **Answer**: Falsy values are `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`, and `document.all`. They evaluate to `false` in boolean contexts.
   - **Code Example**:
     ```javascript
     console.log(!!0); // false
     console.log(!!"hello"); // true
     ```

5. **What is the difference between `null` and `undefined`?**
   - **Answer**: `null` represents an intentional absence of a value, explicitly set. `undefined` indicates a variable is declared but unassigned or a property doesn’t exist.
   - **Code Example**:
     ```javascript
     let a = null;
     let b;
     console.log(a, b); // null, undefined
     ```

6. **What is the `this` keyword in arrow functions?**
   - **Answer**: Arrow functions don’t bind their own `this`; they inherit `this` from the surrounding lexical context, unlike regular functions.
   - **Code Example**:
     ```javascript
     const obj = {
       name: "Alice",
       arrow: () => console.log(this.name),
       regular: function() { console.log(this.name); }
     };
     obj.arrow(); // undefined (inherits global this)
     obj.regular(); // Alice
     ```

7. **What is a higher-order function in JavaScript?**
   - **Answer**: A higher-order function takes a function as an argument or returns a function, commonly used in functional programming (e.g., `map`, `filter`).
   - **Code Example**:
     ```javascript
     function higherOrder(fn) {
       return fn(2);
     }
     const result = higherOrder(x => x * x);
     console.log(result); // 4
     ```

8. **What is the purpose of the `bind` method?**
   - **Answer**: The `bind` method creates a new function with a fixed `this` context and optional preset arguments, useful for event handlers or callbacks.
   - **Code Example**:
     ```javascript
     const obj = { name: "Bob" };
     function greet(greeting) { return `${greeting}, ${this.name}!`; }
     const bound = greet.bind(obj, "Hello");
     console.log(bound()); // Hello, Bob!
     ```

9. **What is the difference between `function` declarations and expressions?**
   - **Answer**: Function declarations are hoisted entirely, allowing calls before definition. Function expressions are assigned to variables and are not hoisted fully.
   - **Code Example**:
     ```javascript
     console.log(decl()); // Works
     function decl() { return "Declaration"; }
     console.log(expr()); // TypeError: expr is not a function
     const expr = function() { return "Expression"; };
     ```

10. **What is the Temporal Dead Zone (TDZ)?**
    - **Answer**: The TDZ is the period where `let` and `const` variables are hoisted but not initialized, causing a `ReferenceError` if accessed before declaration.
    - **Code Example**:
      ```javascript
      console.log(x); // ReferenceError: Cannot access 'x' before initialization
      let x = 5;
      ```

11. **What is event bubbling in JavaScript?**
    - **Answer**: Event bubbling is when an event triggers on an element and then propagates up through its parent elements in the DOM hierarchy.
    - **Code Example**:
      ```javascript
      document.querySelector("div").addEventListener("click", () => console.log("Div clicked"));
      document.querySelector("button").addEventListener("click", () => console.log("Button clicked"));
      // Clicking button logs: "Button clicked", "Div clicked"
      ```

12. **What is the `prototype` property in JavaScript?**
    - **Answer**: The `prototype` property allows adding methods or properties to a constructor’s prototype, shared by all instances created by that constructor.
    - **Code Example**:
      ```javascript
      function Person(name) { this.name = name; }
      Person.prototype.greet = function() { return `Hi, ${this.name}`; };
      const p = new Person("Alice");
      console.log(p.greet()); // Hi, Alice
      ```

13. **What is the difference between `let` and `var` in loops?**
    - **Answer**: `let` creates a new binding for each iteration in a loop (block-scoped), while `var` creates a single binding (function-scoped), leading to different behaviors.
    - **Code Example**:
      ```javascript
      for (var i = 0; i < 3; i++) {
        setTimeout(() => console.log(i), 0); // 3, 3, 3
      }
      for (let j = 0; j < 3; j++) {
        setTimeout(() => console.log(j), 0); // 0, 1, 2
      }
      ```

14. **What is the `Array.prototype.includes` method?**
    - **Answer**: The `includes` method checks if an array contains a specific value, returning `true` or `false`.
    - **Code Example**:
      ```javascript
      const arr = [1, 2, 3];
      console.log(arr.includes(2)); // true
      console.log(arr.includes(4)); // false
      ```

15. **What is the purpose of the `new` keyword?**
    - **Answer**: The `new` keyword creates an instance of a constructor function, setting `this` to a new object and linking it to the constructor’s prototype.
    - **Code Example**:
      ```javascript
      function Car(model) { this.model = model; }
      const myCar = new Car("Toyota");
      console.log(myCar.model); // Toyota
      ```

16. **What is the difference between `Array.prototype.push` and `Array.prototype.concat`?**
    - **Answer**: `push` adds elements to the end of an array, modifying it. `concat` creates a new array by combining arrays or values, leaving the original unchanged.
    - **Code Example**:
      ```javascript
      const arr = [1, 2];
      arr.push(3);
      console.log(arr); // [1, 2, 3]
      const newArr = arr.concat([4]);
      console.log(newArr); // [1, 2, 3, 4]
      ```

17. **What is the `instanceof` operator?**
    - **Answer**: The `instanceof` operator checks if an object is an instance of a constructor or its prototype chain, returning `true` or `false`.
    - **Code Example**:
      ```javascript
      function Animal() {}
      const dog = new Animal();
      console.log(dog instanceof Animal); // true
      console.log(dog instanceof Object); // true
      ```

18. **What is a callback function?**
    - **Answer**: A callback function is passed as an argument to another function and executed later, often used for asynchronous operations or event handling.
    - **Code Example**:
      ```javascript
      function process(callback) {
        setTimeout(() => callback("Done"), 1000);
      }
      process(result => console.log(result)); // Done
      ```

19. **What is the `Array.prototype.find` method?**
    - **Answer**: The `find` method returns the first element in an array that satisfies a provided callback function, or `undefined` if none found.
    - **Code Example**:
      ```javascript
      const arr = [1, 2, 3, 4];
      const found = arr.find(x => x > 2);
      console.log(found); // 3
      ```

20. **What is the purpose of the `Object.keys` method?**
    - **Answer**: The `Object.keys` method returns an array of an object’s enumerable own property names.
    - **Code Example**:
      ```javascript
      const obj = { a: 1, b: 2 };
      console.log(Object.keys(obj)); // ["a", "b"]
      ```

21. **What is the difference between `break` and `continue` in loops?**
    - **Answer**: `break` exits the loop entirely. `continue` skips the current iteration and proceeds to the next.
    - **Code Example**:
      ```javascript
      for (let i = 1; i <= 5; i++) {
        if (i === 3) break;
        console.log(i); // 1, 2
      }
      for (let i = 1; i <= 5; i++) {
        if (i === 3) continue;
        console.log(i); // 1, 2, 4, 5
      }
      ```

22. **What is the `Array.prototype.join` method?**
    - **Answer**: The `join` method concatenates all array elements into a string, with an optional separator.
    - **Code Example**:
      ```javascript
      const arr = ["a", "b", "c"];
      console.log(arr.join("-")); // "a-b-c"
      ```

23. **What is the purpose of the `setTimeout` function?**
    - **Answer**: The `setTimeout` function executes a callback after a specified delay (in milliseconds), used for delayed or asynchronous operations.
    - **Code Example**:
      ```javascript
      setTimeout(() => console.log("Delayed"), 1000); // Logs after 1s
      ```

24. **What is the `Array.prototype.sort` method?**
    - **Answer**: The `sort` method sorts an array in place, optionally using a comparison function, and returns the sorted array.
    - **Code Example**:
      ```javascript
      const arr = [3, 1, 2];
      arr.sort((a, b) => a - b);
      console.log(arr); // [1, 2, 3]
      ```

25. **What is the `event.target` property?**
    - **Answer**: The `event.target` property refers to the element that triggered an event, useful for identifying the specific element in event handlers.
    - **Code Example**:
      ```javascript
      document.querySelector("button").addEventListener("click", (e) => {
        console.log(e.target.tagName); // BUTTON
      });
      ```

26. **What is the purpose of the `Object.create` method?**
    - **Answer**: The `Object.create` method creates a new object with a specified prototype, allowing custom prototype chains.
    - **Code Example**:
      ```javascript
      const proto = { greet: () => "Hello" };
      const obj = Object.create(proto);
      console.log(obj.greet()); // Hello
      ```

27. **What is the difference between shallow and deep copying?**
    - **Answer**: Shallow copying copies only the top-level properties, sharing references to nested objects. Deep copying creates a fully independent copy of all levels.
    - **Code Example**:
      ```javascript
      const obj = { a: 1, b: { c: 2 } };
      const shallow = { ...obj };
      shallow.b.c = 3;
      console.log(obj.b.c); // 3 (shared reference)
      ```

28. **What is the `Array.prototype.map` method?**
    - **Answer**: The `map` method creates a new array with the results of a callback function applied to each element, used for transforming data.
    - **Code Example**:
      ```javascript
      const arr = [1, 2, 3];
      const squared = arr.map(x => x * x);
      console.log(squared); // [1, 4, 9]
      ```

29. **What is the purpose of the `Promise.all` method?**
    - **Answer**: The `Promise.all` method takes an array of Promises and resolves when all Promises resolve, or rejects on the first rejection, returning an array of results.
    - **Code Example**:
      ```javascript
      const promises = [Promise.resolve(1), Promise.resolve(2)];
      Promise.all(promises).then(results => console.log(results)); // [1, 2]
      ```

30. **What is the `Array.prototype.reduceRight` method?**
    - **Answer**: The `reduceRight` method reduces an array from right to left into a single value using a callback, useful for right-to-left operations.
    - **Code Example**:
      ```javascript
      const arr = [1, 2, 3];
      const result = arr.reduceRight((acc, curr) => acc + curr, 0);
      console.log(result); // 6
      ```

31. **What is the `typeof null` bug in JavaScript?**
    - **Answer**: `typeof null` returns `"object"` due to a historical bug in JavaScript’s type system, though `null` is a primitive value.
    - **Code Example**:
      ```javascript
      console.log(typeof null); // "object"
      console.log(null instanceof Object); // false
      ```

32. **What is the `Array.prototype.slice` method?**
    - **Answer**: The `slice` method returns a shallow copy of a portion of an array, specified by start and end indices, without modifying the original.
    - **Code Example**:
      ```javascript
      const arr = [1, 2, 3, 4];
      console.log(arr.slice(1, 3)); // [2, 3]
      console.log(arr); // [1, 2, 3, 4]
      ```

33. **What is the purpose of the `Object.values` method?**
    - **Answer**: The `Object.values` method returns an array of an object’s enumerable own property values.
    - **Code Example**:
      ```javascript
      const obj = { a: 1, b: 2 };
      console.log(Object.values(obj)); // [1, 2]
      ```

34. **What is the `event.preventDefault` method used for?**
    - **Answer**: The `event.preventDefault` method prevents the default action of an event, such as form submission or link navigation.
    - **Code Example**:
      ```javascript
      document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("Form submission prevented");
      });
      ```

35. **What is the `Array.prototype.forEach` method?**
    - **Answer**: The `forEach` method executes a callback for each array element, used for side effects without returning a value.
    - **Code Example**:
      ```javascript
      const arr = [1, 2, 3];
      arr.forEach(x => console.log(x)); // 1, 2, 3
      ```

36. **What is the `Object.entries` method?**
    - **Answer**: The `Object.entries` method returns an array of an object’s enumerable own property key-value pairs.
    - **Code Example**:
      ```javascript
      const obj = { a: 1, b: 2 };
      console.log(Object.entries(obj)); // [["a", 1], ["b", 2]]
      ```

37. **What is the purpose of the `Promise.reject` method?**
    - **Answer**: The `Promise.reject` method creates a Promise that is immediately rejected with a given reason, used for error handling.
    - **Code Example**:
      ```javascript
      Promise.reject("Error").catch(err => console.log(err)); // Error
      ```

38. **What is the `Array.prototype.reverse` method?**
    - **Answer**: The `reverse` method reverses the order of an array’s elements in place, modifying the original array.
    - **Code Example**:
      ```javascript
      const arr = [1, 2, 3];
      arr.reverse();
      console.log(arr); // [3, 2, 1]
      ```

39. **What is the `Object.seal` method?**
    - **Answer**: The `Object.seal` method prevents adding or removing properties from an object but allows modifying existing properties (unlike `Object.freeze`).
    - **Code Example**:
      ```javascript
      const obj = { a: 1 };
      Object.seal(obj);
      obj.b = 2; // Ignored
      obj.a = 3; // Allowed
      console.log(obj); // { a: 3 }
      ```

40. **What is the purpose of the `Array.prototype.indexOf` method?**
    - **Answer**: The `indexOf` method returns the first index of a specified value in an array, or `-1` if not found.
    - **Code Example**:
      ```javascript
      const arr = [1, 2, 3];
      console.log(arr.indexOf(2)); // 1
      console.log(arr.indexOf(4)); // -1
      ```

41. **What is the `Promise.race` method?**
    - **Answer**: The `Promise.race` method takes an array of Promises and resolves or rejects as soon as one Promise settles, returning its result.
    - **Code Example**:
      ```javascript
      const p1 = new Promise(resolve => setTimeout(() => resolve("First"), 1000));
      const p2 = new Promise(resolve => setTimeout(() => resolve("Second"), 500));
      Promise.race([p1, p2]).then(result => console.log(result)); // Second
      ```

42. **What is the `Array.prototype.pop` method?**
    - **Answer**: The `pop` method removes and returns the last element of an array, modifying the original array.
    - **Code Example**:
      ```javascript
      const arr = [1, 2, 3];
      console.log(arr.pop()); // 3
      console.log(arr); // [1, 2]
      ```

43. **What is the purpose of the `Symbol.iterator`?**
    - **Answer**: The `Symbol.iterator` is a method that makes an object iterable, defining how `for...of` loops or spread operators work on it.
    - **Code Example**:
      ```javascript
      const obj = {
        [Symbol.iterator]() {
          let i = 0;
          return { next: () => ({ value: i++, done: i > 3 }) };
        }
      };
      console.log([...obj]); // [0, 1, 2]
      ```

44. **What is the `Array.prototype.shift` method?**
    - **Answer**: The `shift` method removes and returns the first element of an array, shifting remaining elements down and modifying the array.
    - **Code Example**:
      ```javascript
      const arr = [1, 2, 3];
      console.log(arr.shift()); // 1
      console.log(arr); // [2, 3]
      ```

45. **What is the purpose of the `Object.is` method?**
    - **Answer**: The `Object.is` method compares two values for strict equality, handling edge cases like `NaN` and `-0` differently from `===`.
    - **Code Example**:
      ```javascript
      console.log(Object.is(NaN, NaN)); // true
      console.log(NaN === NaN); // false
      console.log(Object.is(0, -0)); // false
      ```

46. **What is the `Array.prototype.findIndex` method?**
    - **Answer**: The `findIndex` method returns the index of the first element that satisfies a callback, or `-1` if none found.
    - **Code Example**:
      ```javascript
      const arr = [1, 2, 3];
      console.log(arr.findIndex(x => x > 1)); // 1
      ```

47. **What is the `Promise.resolve` method?**
    - **Answer**: The `Promise.resolve` method creates a Promise that is immediately resolved with a given value, used for consistent Promise handling.
    - **Code Example**:
      ```javascript
      Promise.resolve("Success").then(result => console.log(result)); // Success
      ```

48. **What is the `Array.prototype.unshift` method?**
    - **Answer**: The `unshift` method adds elements to the beginning of an array and returns the new length, modifying the array.
    - **Code Example**:
      ```javascript
      const arr = [2, 3];
      console.log(arr.unshift(1)); // 3
      console.log(arr); // [1, 2, 3]
      ```

49. **What is the purpose of the `WeakSet` object?**
    - **Answer**: The `WeakSet` object stores unique objects with weak references, allowing garbage collection if objects are unreferenced, used for memory-efficient storage.
    - **Code Example**:
      ```javascript
      const ws = new WeakSet();
      let obj = {};
      ws.add(obj);
      console.log(ws.has(obj)); // true
      obj = null; // Allows garbage collection
      ```

50. **What is the `event.currentTarget` property?**
    - **Answer**: The `event.currentTarget` property refers to the element to which the event handler is attached, unlike `event.target`, which is the element that triggered the event.
    - **Code Example**:
      ```javascript
      document.querySelector("div").addEventListener("click", (e) => {
        console.log(e.currentTarget.tagName); // DIV
        console.log(e.target.tagName); // Could be BUTTON if clicked
      });
      ```