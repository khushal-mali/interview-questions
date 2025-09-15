# Object-Oriented Programming (OOP) in TypeScript

This guide provides a detailed explanation of Object-Oriented Programming (OOP) concepts using TypeScript, a superset of JavaScript that adds static typing and enhances OOP practices. We'll cover the core OOP principles—Classes, Objects, Encapsulation, Inheritance, Polymorphism, and Abstraction—along with TypeScript-specific features and a practical example.

## Table of Contents
1. [Introduction to OOP](#introduction-to-oop)
2. [Classes and Objects](#classes-and-objects)
3. [Encapsulation](#encapsulation)
4. [Inheritance](#inheritance)
5. [Polymorphism](#polymorphism)
6. [Abstraction](#abstraction)
7. [TypeScript-Specific Features](#typescript-specific-features)
8. [Practical Example: Library System](#practical-example-library-system)
9. [Best Practices](#best-practices)

## Introduction to OOP
Object-Oriented Programming is a paradigm that organizes code into objects, which are instances of classes. It models real-world entities with attributes (data) and behaviors (methods). The four pillars of OOP are:
- **Encapsulation**: Bundling data and methods while controlling access.
- **Inheritance**: Allowing a class to inherit properties and methods from another class.
- **Polymorphism**: Enabling objects to be treated as instances of their parent class, with the ability to override or extend behavior.
- **Abstraction**: Hiding complex implementation details and exposing only the necessary interface.

TypeScript enhances OOP with static typing, interfaces, and access modifiers, making code more robust and maintainable.

## Classes and Objects

### Classes
A class is a blueprint for creating objects. It defines properties and methods that objects created from the class will have.

### Objects
An object is an instance of a class, representing a specific entity.

### Example
```typescript
class Car {
  // Properties
  brand: string;
  model: string;
  year: number;

  // Constructor
  constructor(brand: string, model: string, year: number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  // Method
  getCarInfo(): string {
    return `${this.brand} ${this.model} (${this.year})`;
  }
}

// Creating an object
const myCar = new Car("Toyota", "Camry", 2020);
console.log(myCar.getCarInfo()); // Output: Toyota Camry (2020)
```

**Explanation**:
- The `Car` class defines properties (`brand`, `model`, `year`) with TypeScript types.
- The `constructor` initializes these properties.
- The `getCarInfo` method returns a formatted string.
- `myCar` is an object instantiated from the `Car` class.

## Encapsulation
Encapsulation bundles data and methods within a class and restricts access to some components using access modifiers: `public`, `private`, and `protected`.

- `public`: Accessible everywhere (default).
- `private`: Accessible only within the class.
- `protected`: Accessible within the class and its subclasses.

### Example
```typescript
class BankAccount {
  private balance: number;
  public accountHolder: string;

  constructor(accountHolder: string, initialBalance: number) {
    this.accountHolder = accountHolder;
    this.balance = initialBalance;
  }

  public deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited ${amount}. New balance: ${this.balance}`);
    }
  }

  public getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount("Alice", 1000);
account.deposit(500); // Deposited 500. New balance: 1500
console.log(account.getBalance()); // 1500
// console.log(account.balance); // Error: Property 'balance' is private
```

**Explanation**:
- The `balance` is `private`, so it cannot be accessed directly outside the class.
- Public methods (`deposit`, `getBalance`) provide controlled access to the balance.

## Inheritance
Inheritance allows a class (subclass) to inherit properties and methods from another class (superclass), promoting code reuse.

### Example
```typescript
class Vehicle {
  protected speed: number;

  constructor(speed: number) {
    this.speed = speed;
  }

  public move(): string {
    return `Moving at ${this.speed} km/h`;
  }
}

class Car extends Vehicle {
  private brand: string;

  constructor(brand: string, speed: number) {
    super(speed); // Call parent constructor
    this.brand = brand;
  }

  public getInfo(): string {
    return `${this.brand} ${this.move()}`;
  }
}

const myCar = new Car("Honda", 120);
console.log(myCar.getInfo()); // Honda Moving at 120 km/h
```

**Explanation**:
- `Car` extends `Vehicle`, inheriting the `speed` property and `move` method.
- The `super` keyword calls the parent class's constructor.
- `Car` adds its own property (`brand`) and method (`getInfo`).

## Polymorphism
Polymorphism allows objects of different classes to be treated as objects of a common superclass, often by overriding methods.

### Example
```typescript
class Animal {
  public makeSound(): string {
    return "Some generic sound";
  }
}

class Dog extends Animal {
  public makeSound(): string {
    return "Woof!";
  }
}

class Cat extends Animal {
  public makeSound(): string {
    return "Meow!";
  }
}

const animals: Animal[] = [new Dog(), new Cat()];
animals.forEach(animal => console.log(animal.makeSound()));
// Output: Woof!
//         Meow!
```

**Explanation**:
- `Dog` and `Cat` override the `makeSound` method of `Animal`.
- The `animals` array treats all objects as `Animal`, but the overridden methods are called, demonstrating polymorphism.

## Abstraction
Abstraction hides complex implementation details and exposes only the necessary interface. In TypeScript, abstraction can be achieved using `abstract` classes or interfaces.

### Example with Abstract Class
```typescript
abstract class Shape {
  abstract calculateArea(): number; // Abstract method
}

class Circle extends Shape {
  private radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  public calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

const circle = new Circle(5);
console.log(circle.calculateArea()); // ~78.54
```

**Explanation**:
- `Shape` is an abstract class with an abstract method `calculateArea`.
- `Circle` implements `calculateArea` to compute the area of a circle.
- Abstract classes cannot be instantiated directly.

## TypeScript-Specific Features

### Interfaces
Interfaces define contracts for classes or objects, specifying required properties and methods.

```typescript
interface Printable {
  print(): string;
}

class Document implements Printable {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  public print(): string {
    return `Printing: ${this.content}`;
  }
}

const doc = new Document("Hello, TypeScript!");
console.log(doc.print()); // Printing: Hello, TypeScript!
```

### Readonly Properties
Properties marked as `readonly` can only be set during initialization.

```typescript
class Product {
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}

const product = new Product("P123");
// product.id = "P456"; // Error: Cannot assign to 'id' because it is a read-only property
```

### Parameter Properties
TypeScript allows shorthand constructor syntax to define and initialize properties.

```typescript
class Employee {
  constructor(public name: string, private salary: number) {}
}

const emp = new Employee("Bob", 50000);
console.log(emp.name); // Bob
// console.log(emp.salary); // Error: Property 'salary' is private
```

## Practical Example: Library System
This example demonstrates a library system using multiple OOP concepts.

```typescript
interface Borrowable {
  borrow(): void;
  returnItem(): void;
}

abstract class LibraryItem {
  protected title: string;
  protected isBorrowed: boolean;

  constructor(title: string) {
    this.title = title;
    this.isBorrowed = false;
  }

  abstract getInfo(): string;
}

class Book extends LibraryItem implements Borrowable {
  private author: string;

  constructor(title: string, author: string) {
    super(title);
    this.author = author;
  }

  public getInfo(): string {
    return `${this.title} by ${this.author} (${this.isBorrowed ? "Borrowed" : "Available"})`;
  }

  public borrow(): void {
    if (!this.isBorrowed) {
      this.isBorrowed = true;
      console.log(`${this.title} has been borrowed`);
    } else {
      console.log(`${this.title} is already borrowed`);
    }
  }

  public returnItem(): void {
    if (this.isBorrowed) {
      this.isBorrowed = false;
      console.log(`${this.title} has been returned`);
    }
  }
}

class Library {
  private items: LibraryItem[] = [];

  public addItem(item: LibraryItem): void {
    this.items.push(item);
  }

  public listItems(): void {
    this.items.forEach(item => console.log(item.getInfo()));
  }
}

const library = new Library();
const book1 = new Book("1984", "George Orwell");
const book2 = new Book("The Hobbit", "J.R.R. Tolkien");

library.addItem(book1);
library.addItem(book2);
library.listItems();
// Output: 1984 by George Orwell (Available)
//         The Hobbit by J.R.R. Tolkien (Available)

book1.borrow(); // 1984 has been borrowed
library.listItems();
// Output: 1984 by George Orwell (Borrowed)
//         The Hobbit by J.R.R. Tolkien (Available)
```

**Explanation**:
- `Borrowable` interface ensures classes implement `borrow` and `returnItem` methods.
- `LibraryItem` is an abstract class with common properties and an abstract `getInfo` method.
- `Book` extends `LibraryItem` and implements `Borrowable`.
- `Library` manages a collection of items, demonstrating encapsulation and composition.

## Best Practices
- **Use Access Modifiers**: Leverage `private` and `protected` to enforce encapsulation.
- **Prefer Interfaces for Contracts**: Use interfaces to define clear contracts for classes.
- **Leverage TypeScript Types**: Use TypeScript’s type system to catch errors early.
- **Keep Classes Focused**: Follow the Single Responsibility Principle—each class should have one purpose.
- **Use Abstract Classes Judiciously**: Use abstract classes for shared behavior, interfaces for shared structure.
- **Avoid Deep Inheritance Hierarchies**: Favor composition over deep inheritance to reduce complexity.

This guide provides a solid foundation for understanding OOP in TypeScript. Practice these concepts by building small projects to reinforce your learning!