# Object-Oriented Programming (OOP) Concepts with TypeScript

This guide provides a comprehensive overview of Object-Oriented Programming (OOP) concepts—encapsulation, inheritance, polymorphism, and abstraction—using TypeScript. It is designed for general TypeScript applications, with practical examples and best practices to ensure type safety and scalable code. The guide progresses from basic to advanced concepts, suitable for any TypeScript project.

## Table of Contents
1. [Introduction to OOP](#introduction-to-oop)
2. [Encapsulation](#encapsulation)
3. [Inheritance](#inheritance)
4. [Polymorphism](#polymorphism)
5. [Abstraction](#abstraction)
6. [Advanced OOP Patterns](#advanced-oop-patterns)
7. [Best Practices](#best-practices)
8. [Example Application](#example-application)
9. [Common Pitfalls and Solutions](#common-pitfalls-and-solutions)

## Introduction to OOP

Object-Oriented Programming (OOP) is a programming paradigm that organizes code into objects, which are instances of classes that combine data (properties) and behavior (methods). TypeScript enhances OOP with static typing, making it ideal for building robust, maintainable applications.

### Core OOP Principles
- **Encapsulation**: Bundling data and methods, controlling access to protect data integrity.
- **Inheritance**: Allowing a class to inherit properties and methods from another class for code reuse.
- **Polymorphism**: Enabling objects to be treated as instances of a common base class with specific implementations.
- **Abstraction**: Hiding complex implementation details and exposing only necessary functionality.

### Why Use TypeScript for OOP?
- **Type Safety**: Catches errors at compile time, reducing runtime issues.
- **Enhanced Tooling**: Provides autocompletion, refactoring, and better IDE support.
- **Scalability**: Supports large-scale applications with clear type definitions.

## Encapsulation

Encapsulation restricts direct access to an object’s data, exposing only necessary methods to interact with it. TypeScript’s access modifiers (`public`, `private`, `protected`) and getters/setters enforce this.

### Example: Bank Account
```typescript
class BankAccount {
  private balance: number;
  private accountNumber: string;

  constructor(accountNumber: string, initialBalance: number = 0) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
  }

  // Public methods
  public deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }
    this.balance += amount;
  }

  public withdraw(amount: number): void {
    if (amount > this.balance) {
      throw new Error("Insufficient funds");
    }
    this.balance -= amount;
  }

  // Getter
  public getBalance(): number {
    return this.balance;
  }

  // Private method
  private logTransaction(type: string, amount: number): void {
    console.log(`${type} of ${amount} on account ${this.accountNumber}`);
  }
}

// Usage
const account = new BankAccount("12345", 1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
account.withdraw(200);
console.log(account.getBalance()); // 1300
// account.balance; // Error: Property 'balance' is private
```

### Key Points
- **Private Properties**: `balance` and `accountNumber` are inaccessible outside the class.
- **Public Methods**: `deposit`, `withdraw`, and `getBalance` control interaction.
- **Private Methods**: `logTransaction` is internal to the class.
- **TypeScript Modifiers**: `public` (default), `private`, `protected`.

## Inheritance

Inheritance allows a class to extend another, inheriting its properties and methods to promote code reuse and establish a hierarchy.

### Example: Employee Hierarchy
```typescript
class Employee {
  protected name: string;
  protected salary: number;

  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }

  public getDetails(): string {
    return `${this.name} earns ${this.salary}`;
  }
}

class Manager extends Employee {
  private department: string;

  constructor(name: string, salary: number, department: string) {
    super(name, salary); // Call parent constructor
    this.department = department;
  }

  public getDetails(): string {
    return `${super.getDetails()} and manages ${this.department}`;
  }
}

const manager = new Manager("Alice", 80000, "Engineering");
console.log(manager.getDetails()); // Alice earns 80000 and manages Engineering
// manager.salary; // Error: Property 'salary' is protected
```

### Key Points
- **Extends Keyword**: `Manager extends Employee` inherits from `Employee`.
- **Protected Modifier**: Allows access in subclasses but not externally.
- **Super Call**: Initializes the parent class.
- **Method Overriding**: `getDetails` in `Manager` customizes the parent’s implementation.

## Polymorphism

Polymorphism allows objects of different classes to be treated as instances of a common base class or interface, with specific implementations. TypeScript supports this through interfaces and method overriding.

### Example: Payment System
```typescript
interface Payment {
  process(amount: number): string;
}

class CreditCardPayment implements Payment {
  private cardNumber: string;

  constructor(cardNumber: string) {
    this.cardNumber = cardNumber;
  }

  public process(amount: number): string {
    return `Processed ${amount} via Credit Card ${this.cardNumber}`;
  }
}

class PayPalPayment implements Payment {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  public process(amount: number): string {
    return `Processed ${amount} via PayPal ${this.email}`;
  }
}

// Polymorphic usage
const payments: Payment[] = [
  new CreditCardPayment("****-1234"),
  new PayPalPayment("user@example.com"),
];
payments.forEach((payment) => console.log(payment.process(100)));
// Output:
// Processed 100 via Credit Card ****-1234
// Processed 100 via PayPal user@example.com
```

### Key Points
- **Interfaces**: `Payment` defines a contract for all payment methods.
- **Method Implementation**: Each class provides its own `process` method.
- **Polymorphic Arrays**: Treat different classes uniformly via the `Payment` interface.

## Abstraction

Abstraction hides complex implementation details, exposing only essential functionality. TypeScript supports this with abstract classes and interfaces.

### Example: Abstract Device Class
```typescript
abstract class Device {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract turnOn(): string; // Abstract method

  public getStatus(): string {
    return `${this.name} is operational`;
  }
}

class Smartphone extends Device {
  constructor(name: string) {
    super(name);
  }

  public turnOn(): string {
    return `${this.name} is booting up`;
  }
}

class Laptop extends Device {
  constructor(name: string) {
    super(name);
  }

  public turnOn(): string {
    return `${this.name} is starting Windows`;
  }
}

const devices: Device[] = [new Smartphone("iPhone"), new Laptop("Dell XPS")];
devices.forEach((device) => console.log(device.turnOn()));
// Output:
// iPhone is booting up
// Dell XPS is starting Windows
```

### Key Points
- **Abstract Classes**: `Device` cannot be instantiated; it’s a blueprint.
- **Abstract Methods**: `turnOn` must be implemented by subclasses.
- **Interfaces vs. Abstract Classes**: Use interfaces for pure contracts, abstract classes for shared logic.

## Advanced OOP Patterns

### Singleton Pattern
Ensures a class has only one instance, useful for global resources like configuration managers.

```typescript
class ConfigurationManager {
  private static instance: ConfigurationManager;
  private settings: Map<string, string>;

  private constructor() {
    this.settings = new Map();
  }

  public static getInstance(): ConfigurationManager {
    if (!ConfigurationManager.instance) {
      ConfigurationManager.instance = new ConfigurationManager();
    }
    return ConfigurationManager.instance;
  }

  public setSetting(key: string, value: string): void {
    this.settings.set(key, value);
  }

  public getSetting(key: string): string | undefined {
    return this.settings.get(key);
  }
}

// Usage
const config = ConfigurationManager.getInstance();
config.setSetting("theme", "dark");
console.log(config.getSetting("theme")); // dark
const config2 = ConfigurationManager.getInstance();
console.log(config2.getSetting("theme")); // dark (same instance)
```

### Factory Pattern
Creates objects without specifying the exact class, useful for creating families of related objects.

```typescript
interface Vehicle {
  drive(): string;
}

class Car implements Vehicle {
  public drive(): string {
    return "Driving a car";
  }
}

class Truck implements Vehicle {
  public drive(): string {
    return "Driving a truck";
  }
}

class VehicleFactory {
  public static createVehicle(type: string): Vehicle {
    switch (type) {
      case "car":
        return new Car();
      case "truck":
        return new Truck();
      default:
        throw new Error("Unknown vehicle type");
    }
  }
}

// Usage
const car = VehicleFactory.createVehicle("car");
console.log(car.drive()); // Driving a car
const truck = VehicleFactory.createVehicle("truck");
console.log(truck.drive()); // Driving a truck
```

## Best Practices

- **Use Access Modifiers**: Leverage `private`, `protected`, and `public` to enforce encapsulation.
- **Favor Interfaces**: Use interfaces for contracts to ensure flexibility and decoupling.
- **Keep Classes Focused**: Follow the Single Responsibility Principle; each class should have one purpose.
- **Type Everything**: Define types for properties, methods, and parameters to maximize TypeScript’s benefits.
- **Avoid Deep Inheritance**: Prefer composition over deep inheritance hierarchies to reduce complexity.
- **Use Abstract Classes Sparingly**: Reserve for shared logic; use interfaces for most contracts.
- **Immutable Data**: Use `readonly` for properties that shouldn’t change after initialization.
- **Leverage Generics**: Use generics for reusable, type-safe classes (e.g., collections).

### Example: Using Generics
```typescript
class GenericContainer<T> {
  private items: T[] = [];

  public add(item: T): void {
    this.items.push(item);
  }

  public getAll(): T[] {
    return this.items;
  }
}

const numberContainer = new GenericContainer<number>();
numberContainer.add(1);
numberContainer.add(2);
console.log(numberContainer.getAll()); // [1, 2]
```

## Example Application

A simple library management system demonstrating all OOP concepts.

### File Structure
```
src/
├── models/
│   ├── Book.ts
│   ├── Library.ts
│   └── LibraryItem.ts
├── main.ts
```

### Abstract Class and Interface (`LibraryItem.ts`)
```typescript
interface Borrowable {
  borrow(): string;
}

abstract class LibraryItem {
  protected id: string;
  protected title: string;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }

  abstract getDetails(): string;
}
```

### Concrete Class (`Book.ts`)
```typescript
import { LibraryItem, Borrowable } from './LibraryItem';

class Book extends LibraryItem implements Borrowable {
  private author: string;

  constructor(id: string, title: string, author: string) {
    super(id, title);
    this.author = author;
  }

  public getDetails(): string {
    return `${this.title} by ${this.author} (ID: ${this.id})`;
  }

  public borrow(): string {
    return `Borrowed ${this.title}`;
  }
}
```

### Library Manager (`Library.ts`)
```typescript
import { LibraryItem, Borrowable } from './LibraryItem';

class Library {
  private items: LibraryItem[] = [];

  public addItem(item: LibraryItem): void {
    this.items.push(item);
  }

  public borrowItem<T extends LibraryItem & Borrowable>(id: string): string | undefined {
    const item = this.items.find((i) => i instanceof Book && i['id'] === id);
    if (item && 'borrow' in item) {
      return item.borrow();
    }
    return undefined;
  }

  public listItems(): string[] {
    return this.items.map((item) => item.getDetails());
  }
}
```

### Main Application (`main.ts`)
```typescript
import { Book } from './models/Book';
import { Library } from './models/Library';

const library = new Library();
const book1 = new Book("001", "TypeScript Guide", "John Doe");
const book2 = new Book("002", "OOP Basics", "Jane Smith");

library.addItem(book1);
library.addItem(book2);

console.log(library.listItems());
// Output:
// TypeScript Guide by John Doe (ID: 001)
// OOP Basics by Jane Smith (ID: 002)

console.log(library.borrowItem("001")); // Borrowed TypeScript Guide
```

## Common Pitfalls and Solutions

1. **Overusing Inheritance**
   - **Problem**: Deep inheritance hierarchies increase complexity.
   - **Solution**: Favor composition or interfaces over deep inheritance.

2. **Breaking Encapsulation**
   - **Problem**: Exposing internal state via public properties.
   - **Solution**: Use `private` or `protected` with getters/setters.

3. **Untyped Code**
   - **Problem**: Missing type annotations reduce TypeScript’s benefits.
   - **Solution**: Define interfaces or types for all classes and methods.

4. **Ignoring Abstraction**
   - **Problem**: Exposing implementation details makes code brittle.
   - **Solution**: Use abstract classes or interfaces to hide complexity.

5. **Misusing Polymorphism**
   - **Problem**: Incorrect interface implementations lead to runtime errors.
   - **Solution**: Use TypeScript’s type checking and explicit interface contracts.

6. **Singleton Misuse**
   - **Problem**: Overusing singletons can create global state issues.
   - **Solution**: Use singletons only for truly global resources.

## Conclusion

TypeScript enhances OOP by providing type safety and robust tooling for encapsulation, inheritance, polymorphism, and abstraction. By structuring code with classes, interfaces, and advanced patterns like Singleton and Factory, you can build scalable, maintainable applications. Follow best practices to ensure clean, type-safe code, and leverage TypeScript’s features to catch errors early.

For further learning:
- [TypeScript Handbook: Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [TypeScript Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)
- [Design Patterns in TypeScript](https://www.typescriptlang.org/docs/handbook/2/generics.html)