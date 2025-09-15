# How OOP is Used in TypeScript

This guide explores the practical applications of Object-Oriented Programming (OOP) concepts in TypeScript, a superset of JavaScript that enhances OOP with static typing and features like interfaces and access modifiers. We’ll dive into how core OOP principles—Classes/Objects, Encapsulation, Inheritance, Polymorphism, and Abstraction—are used in real-world TypeScript applications, with detailed examples and use cases.

## Table of Contents
1. [Introduction to OOP in TypeScript](#introduction-to-oop-in-typescript)
2. [Classes and Objects](#classes-and-objects)
3. [Encapsulation](#encapsulation)
4. [Inheritance](#inheritance)
5. [Polymorphism](#polymorphism)
6. [Abstraction](#abstraction)
7. [TypeScript-Specific Features](#typescript-specific-features)
8. [Practical Example: Library System](#practical-example-library-system)
9. [Additional Use Cases](#additional-use-cases)
10. [Best Practices](#best-practices)

## Introduction to OOP in TypeScript
OOP in TypeScript is used to create modular, reusable, and maintainable code for applications like web apps, APIs, and enterprise systems. TypeScript’s static typing, interfaces, and access modifiers enhance OOP by catching errors early and enforcing clear contracts. OOP principles help developers model complex systems, manage state, and promote code reuse, making it ideal for large-scale projects.

## Classes and Objects

### How They’re Used
Classes define blueprints for objects, which represent real-world entities or abstract concepts. Objects are instances of classes, encapsulating data and behavior. In TypeScript, classes are used to model entities like users, products, or services in applications.

### Practical Application
In a web application, a `User` class might represent user accounts, with properties for data (e.g., name, email) and methods for behavior (e.g., login, update profile).

### Example
```typescript
class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  login(): string {
    return `${this.name} logged in with ${this.email}`;
  }
}

const user = new User("Alice", "alice@example.com");
console.log(user.login()); // Alice logged in with alice@example.com
```

**Use Case**: In a user management system, the `User` class can be used to create and manage user objects, ensuring consistent structure and behavior across the application.

## Encapsulation

### How It’s Used
Encapsulation restricts access to an object’s internal state, exposing only necessary interfaces via public methods. TypeScript’s `private`, `protected`, and `public` access modifiers enforce this.

### Practical Application
Encapsulation is used to protect sensitive data, such as a user’s password or account balance, and provide controlled access through methods like `deposit` or `updatePassword`.

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

const account = new BankAccount("Bob", 1000);
account.deposit(500); // Deposited 500. New balance: 1500
console.log(account.getBalance()); // 1500
// console.log(account.balance); // Error: Property 'balance' is private
```

**Use Case**: In a banking application, encapsulation ensures that the `balance` is only modified through secure methods, preventing unauthorized changes.

## Inheritance

### How It’s Used
Inheritance allows a class to inherit properties and methods from a parent class, promoting code reuse and hierarchical modeling. TypeScript’s `extends` keyword facilitates this.

### Practical Application
Inheritance is used to create specialized classes, such as `Admin` and `Customer` classes inheriting from a `User` base class in a system requiring different user roles.

### Example
```typescript
class User {
  protected id: string;

  constructor(id: string) {
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }
}

class Admin extends User {
  private role: string;

  constructor(id: string, role: string) {
    super(id);
    this.role = role;
  }

  public getInfo(): string {
    return `Admin ID: ${this.id}, Role: ${this.role}`;
  }
}

const admin = new Admin("A123", "Superuser");
console.log(admin.getInfo()); // Admin ID: A123, Role: Superuser
```

**Use Case**: In a content management system, `Admin` and `Editor` classes can inherit from `User` to share common properties while adding role-specific functionality.

## Polymorphism

### How It’s Used
Polymorphism allows objects of different classes to be treated as instances of a common superclass, often by overriding methods. This enables flexible and extensible code.

### Practical Application
Polymorphism is used in systems where different types of objects share a common interface, such as payment methods (e.g., `CreditCard`, `PayPal`) in an e-commerce platform.

### Example
```typescript
class PaymentMethod {
  public processPayment(amount: number): string {
    return `Processing payment of $${amount}`;
  }
}

class CreditCard extends PaymentMethod {
  public processPayment(amount: number): string {
    return `Credit card payment of $${amount} processed`;
  }
}

class PayPal extends PaymentMethod {
  public processPayment(amount: number): string {
    return `PayPal payment of $${amount} processed`;
  }
}

const payments: PaymentMethod[] = [new CreditCard(), new PayPal()];
payments.forEach(payment => console.log(payment.processPayment(100)));
// Output: Credit card payment of $100 processed
//         PayPal payment of $100 processed
```

**Use Case**: In a payment processing system, polymorphism allows the application to handle various payment methods uniformly, simplifying integration.

## Abstraction

### How It’s Used
Abstraction hides implementation details, exposing only essential interfaces. TypeScript supports abstraction through `abstract` classes and interfaces.

### Practical Application
Abstraction is used to define common behaviors for related classes, such as a `Shape` class for geometric shapes in a graphics application, without specifying implementation details.

### Example
```typescript
abstract class Shape {
  abstract calculateArea(): number;
}

class Rectangle extends Shape {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }

  public calculateArea(): number {
    return this.width * this.height;
  }
}

const rectangle = new Rectangle(5, 10);
console.log(rectangle.calculateArea()); // 50
```

**Use Case**: In a drawing application, an abstract `Shape` class ensures all shapes implement `calculateArea`, allowing consistent area calculations.

## TypeScript-Specific Features

### Interfaces
Interfaces define contracts for classes or objects, ensuring they implement specific properties and methods.

#### Example
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
    return `Document: ${this.content}`;
  }
}

const doc = new Document("Report");
console.log(doc.print()); // Document: Report
```

**Use Case**: Interfaces are used in APIs to ensure data objects conform to expected structures, such as JSON responses.

### Readonly Properties
`readonly` properties can only be set during initialization, ensuring immutability.

#### Example
```typescript
class Product {
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}

const product = new Product("P123");
// product.id = "P456"; // Error: Cannot assign to 'id'
```

**Use Case**: In an inventory system, `readonly` ensures product IDs remain unchanged after creation.

### Parameter Properties
TypeScript’s parameter properties simplify constructor definitions by automatically creating properties.

#### Example
```typescript
class Employee {
  constructor(public name: string, private salary: number) {}
}

const emp = new Employee("Eve", 60000);
console.log(emp.name); // Eve
// console.log(emp.salary); // Error: Property 'salary' is private
```

**Use Case**: Parameter properties reduce boilerplate code in classes like `Employee` for HR systems.

## Practical Example: Library System
This example demonstrates a library management system using OOP concepts in TypeScript.

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

class DVD extends LibraryItem implements Borrowable {
  private duration: number;

  constructor(title: string, duration: number) {
    super(title);
    this.duration = duration;
  }

  public getInfo(): string {
    return `${this.title} (${this.duration} min) (${this.isBorrowed ? "Borrowed" : "Available"})`;
  }

  public borrow(): void {
    if (!this.isBorrowed) {
      this.isBorrowed = true;
      console.log(`${this.title} DVD has been borrowed`);
    } else {
      console.log(`${this.title} is already borrowed`);
    }
  }

  public returnItem(): void {
    if (this.isBorrowed) {
      this.isBorrowed = false;
      console.log(`${this.title} DVD has been returned`);
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

  public findItem(title: string): LibraryItem | undefined {
    return this.items.find(item => item.getInfo().includes(title));
  }
}

const library = new Library();
const book = new Book("1984", "George Orwell");
const dvd = new DVD("Inception", 148);

library.addItem(book);
library.addItem(dvd);
library.listItems();
// Output: 1984 by George Orwell (Available)
//         Inception (148 min) (Available)

book.borrow(); // 1984 has been borrowed
dvd.borrow(); // Inception DVD has been borrowed
library.listItems();
// Output: 1984 by George Orwell (Borrowed)
//         Inception (148 min) (Borrowed)
```

**How It’s Used**:
- **Encapsulation**: `title` and `isBorrowed` are `protected`, accessed only through methods.
- **Inheritance**: `Book` and `DVD` inherit from `LibraryItem`.
- **Polymorphism**: The `Library` class treats `Book` and `DVD` as `LibraryItem` objects.
- **Abstraction**: `LibraryItem` provides an abstract `getInfo` method.
- **Interface**: `Borrowable` ensures `borrow` and `returnItem` methods are implemented.

**Use Case**: This system can be used in a library management application to track books, DVDs, and other items, with extensible support for new item types.

## Additional Use Cases

### E-Commerce Platform
- **Classes/Objects**: `Product`, `Cart`, `Order` classes model items, shopping carts, and orders.
- **Encapsulation**: Private properties like `stockQuantity` are updated via methods like `reduceStock`.
- **Inheritance**: `Electronics` and `Clothing` extend a `Product` class.
- **Polymorphism**: A `PaymentProcessor` interface allows different payment methods (e.g., `CreditCard`, `PayPal`).
- **Abstraction**: An abstract `Discount` class defines discount calculation logic for various promotions.

### Game Development
- **Classes/Objects**: `Player`, `Enemy`, and `Weapon` classes represent game entities.
- **Encapsulation**: Private properties like `health` are modified through methods like `takeDamage`.
- **Inheritance**: `BossEnemy` extends `Enemy` with additional abilities.
- **Polymorphism**: A `Character` array handles `Player` and `Enemy` objects uniformly.
- **Abstraction**: An abstract `Item` class defines how items like `Weapon` or `Armor` interact with players.

## Best Practices
- **Use Strong Typing**: Leverage TypeScript’s types to ensure data integrity.
- **Encapsulate Data**: Use `private` and `protected` to protect sensitive data.
- **Favor Interfaces**: Use interfaces for flexible contracts over abstract classes when no shared implementation is needed.
- **Keep Classes Focused**: Follow the Single Responsibility Principle.
- **Avoid Overusing Inheritance**: Use composition for flexibility (e.g., components in a game entity system).
- **Use Readonly for Immutability**: Protect critical properties like IDs.
- **Document Code**: Use JSDoc or comments to clarify complex logic.

## Conclusion
OOP in TypeScript is a powerful approach for building scalable, maintainable applications. By combining classes, encapsulation, inheritance, polymorphism, abstraction, and TypeScript’s features, developers can model complex systems, enforce contracts, and reduce errors. The library system example and additional use cases demonstrate how these concepts are applied in real-world scenarios, from e-commerce to game development.