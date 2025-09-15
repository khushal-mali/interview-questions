# Mastering Design Patterns: A Comprehensive Guide with Detailed Explanations

Design patterns are reusable solutions to common software engineering problems, providing a structured approach to designing flexible, maintainable, and scalable code. This guide covers all major design patterns, categorized into Creational, Structural, and Behavioral patterns, with detailed explanations, JavaScript/TypeScript implementations (tailored for the MERN stack), and real-world applications in business contexts like e-commerce, SaaS, or real-time systems. Each pattern includes its purpose, structure, complexity analysis, and a practical MERN example, ensuring clarity for beginners and advanced developers alike.

## 1. Introduction to Design Patterns

Design patterns, formalized in the "Gang of Four" (GoF) book, address recurring design problems in object-oriented programming. They promote best practices, improve code reusability, and enhance maintainability. The 23 GoF patterns are grouped into three categories:
- **Creational**: Deal with object creation mechanisms.
- **Structural**: Focus on object composition and relationships.
- **Behavioral**: Address object interaction and responsibilities.

**Why Use Design Patterns in MERN?**
- **Scalability**: Patterns like Singleton or Microservices ensure robust backend architecture.
- **Maintainability**: Patterns like Strategy or Decorator simplify code changes in React apps.
- **Reusability**: Patterns like Factory or Adapter enable modular APIs in Express.

## 2. Creational Patterns

Creational patterns manage object creation, ensuring flexibility and efficiency.

### 2.1. Singleton Pattern
**Purpose**: Ensure a class has only one instance and provide global access to it.

**Key Features**:
- Single instance enforced via private constructor or static method.
- Global access point for the instance.
- **Complexity**: O(1) for access, O(1) space (single instance).

**Use Case**: Managing a single MongoDB connection in a MERN backend.

**Example**: MongoDB Connection Singleton
```javascript
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = null; // Simulated MongoDB connection
    Database.instance = this;
  }

  connect() {
    if (!this.connection) {
      this.connection = "MongoDB connected"; // Simulate connection
      console.log(this.connection);
    }
    return this.connection;
  }
}
Database.instance = null;

// Usage in Express
const express = require("express");
const app = express();
const db = new Database();
app.get("/data", (req, res) => {
  db.connect();
  res.send("Data fetched");
});
app.listen(5000, () => console.log("Server running"));
```

**Explanation**:
- **Singleton**: Ensures one MongoDB connection instance, preventing multiple connections.
- **MERN Use**: Centralizes database access in Express, reducing resource overhead.
- **Pros**: Controlled access, resource efficiency.
- **Cons**: Global state can complicate testing.

### 2.2. Factory Method Pattern
**Purpose**: Define an interface for creating objects, letting subclasses decide which class to instantiate.

**Key Features**:
- Delegates object creation to subclasses.
- Promotes loose coupling.
- **Complexity**: O(1) creation, O(n) space for objects.

**Use Case**: Creating different payment processors (e.g., PayPal, Stripe) in an e-commerce app.

**Example**: Payment Processor Factory
```typescript
interface PaymentProcessor {
  process(amount: number): string;
}

class PayPalProcessor implements PaymentProcessor {
  process(amount: number) {
    return `Processed $${amount} via PayPal`;
  }
}

class StripeProcessor implements PaymentProcessor {
  process(amount: number) {
    return `Processed $${amount} via Stripe`;
  }
}

class PaymentFactory {
  static createProcessor(type: string): PaymentProcessor {
    switch (type) {
      case "paypal": return new PayPalProcessor();
      case "stripe": return new StripeProcessor();
      default: throw new Error("Unknown payment type");
    }
  }
}

// Usage in Express
app.post("/pay", (req, res) => {
  const { type, amount } = req.body;
  const processor = PaymentFactory.createProcessor(type);
  res.send(processor.process(amount));
});
```

**Explanation**:
- **Factory Method**: Creates payment processors based on type, decoupling client code.
- **MERN Use**: Handles payment logic in Express APIs.
- **Pros**: Flexible, extensible for new processors.
- **Cons**: Can increase complexity with many types.

### 2.3. Abstract Factory Pattern
**Purpose**: Provide an interface for creating families of related objects without specifying their concrete classes.

**Key Features**:
- Groups related factories for consistent object creation.
- **Complexity**: O(1) creation, O(n) space.

**Use Case**: Creating UI components (buttons, modals) for different themes in a React app.

**Example**: Theme Factory
```typescript
interface Button {
  render(): string;
}
interface Modal {
  show(): string;
}

class LightButton implements Button {
  render() { return "Light Button"; }
}
class DarkButton implements Button {
  render() { return "Dark Button"; }
}
class LightModal implements Modal {
  show() { return "Light Modal"; }
}
class DarkModal implements Modal {
  show() { return "Dark Modal"; }
}

interface ThemeFactory {
  createButton(): Button;
  createModal(): Modal;
}

class LightThemeFactory implements ThemeFactory {
  createButton() { return new LightButton(); }
  createModal() { return new LightModal(); }
}
class DarkThemeFactory implements ThemeFactory {
  createButton() { return new DarkButton(); }
  createModal() { return new DarkModal(); }
}

// Usage in React
import React from "react";
const factory = new DarkThemeFactory();
const App = () => {
  const button = factory.createButton();
  const modal = factory.createModal();
  return (
    <div>
      <p>{button.render()}</p>
      <p>{modal.show()}</p>
    </div>
  );
};
```

**Explanation**:
- **Abstract Factory**: Creates themed UI components consistently.
- **MERN Use**: Manages themes in React (e.g., Material-UI theming).
- **Pros**: Ensures consistent object families.
- **Cons**: Complex to implement for simple systems.

### 2.4. Builder Pattern
**Purpose**: Construct complex objects step-by-step, separating construction from representation.

**Key Features**:
- Fluent interface for building objects.
- Handles complex initialization.
- **Complexity**: O(1) creation, O(1) space per object.

**Use Case**: Building complex order objects in an e-commerce API.

**Example**: Order Builder
```typescript
class Order {
  items: { productId: string; quantity: number }[];
  shipping: string;
  paymentMethod: string;

  constructor(builder: OrderBuilder) {
    this.items = builder.items;
    this.shipping = builder.shipping;
    this.paymentMethod = builder.paymentMethod;
  }
}

class OrderBuilder {
  items: { productId: string; quantity: number }[] = [];
  shipping: string = "";
  paymentMethod: string = "";

  addItem(productId: string, quantity: number) {
    this.items.push({ productId, quantity });
    return this;
  }

  setShipping(shipping: string) {
    this.shipping = shipping;
    return this;
  }

  setPaymentMethod(paymentMethod: string) {
    this.paymentMethod = paymentMethod;
    return this;
  }

  build() {
    return new Order(this);
  }
}

// Usage in Express
app.post("/orders", (req, res) => {
  const order = new OrderBuilder()
    .addItem("prod1", 2)
    .setShipping("express")
    .setPaymentMethod("credit")
    .build();
  res.json(order);
});
```

**Explanation**:
- **Builder**: Constructs orders incrementally, ensuring valid configurations.
- **MERN Use**: Simplifies order creation in Express APIs or MongoDB schemas.
- **Pros**: Clear, flexible object creation.
- **Cons**: Verbose for simple objects.

### 2.5. Prototype Pattern
**Purpose**: Create new objects by copying an existing object (prototype).

**Key Features**:
- Cloning reduces initialization overhead.
- **Complexity**: O(1) cloning, O(n) space.

**Use Case**: Cloning default user settings in a SaaS app.

**Example**: User Settings Prototype
```javascript
class UserSettings {
  constructor() {
    this.theme = "light";
    this.notifications = true;
  }

  clone() {
    return Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
  }
}

// Usage in Express
app.get("/user/settings", (req, res) => {
  const defaultSettings = new UserSettings();
  const userSettings = defaultSettings.clone();
  userSettings.theme = "dark";
  res.json(userSettings);
});
```

**Explanation**:
- **Prototype**: Clones default settings for new users.
- **MERN Use**: Initializes user preferences in MongoDB.
- **Pros**: Efficient for similar objects.
- **Cons**: Deep cloning can be complex.

## 3. Structural Patterns

Structural patterns focus on object composition and relationships.

### 3.1. Adapter Pattern
**Purpose**: Allow incompatible interfaces to work together by wrapping one in a compatible interface.

**Key Features**:
- Converts one interface to another.
- **Complexity**: O(1) operations, O(1) space.

**Use Case**: Integrating a legacy payment API with a modern e-commerce system.

**Example**: Payment Adapter
```typescript
interface NewPaymentSystem {
  pay(amount: number): string;
}

class LegacyPayment {
  makeTransaction(amount: number) {
    return `Legacy payment: $${amount}`;
  }
}

class PaymentAdapter implements NewPaymentSystem {
  private legacy: LegacyPayment;

  constructor(legacy: LegacyPayment) {
    this.legacy = legacy;
  }

  pay(amount: number) {
    return this.legacy.makeTransaction(amount);
  }
}

// Usage in Express
app.post("/pay", (req, res) => {
  const legacyPayment = new LegacyPayment();
  const adapter = new PaymentAdapter(legacyPayment);
  res.send(adapter.pay(req.body.amount));
});
```

**Explanation**:
- **Adapter**: Wraps legacy payment API for compatibility.
- **MERN Use**: Integrates third-party APIs in Express.
- **Pros**: Reuses existing code.
- **Cons**: Adds wrapper complexity.

### 3.2. Composite Pattern
**Purpose**: Treat individual objects and compositions uniformly, forming a tree structure.

**Key Features**:
- Hierarchical structure for part-whole relationships.
- **Complexity**: O(n) traversal, O(n) space.

**Use Case**: Managing product categories and subcategories in e-commerce.

**Example**: Category Composite
```typescript
interface CategoryComponent {
  getName(): string;
}

class CategoryLeaf implements CategoryComponent {
  constructor(private name: string) {}
  getName() { return this.name; }
}

class CategoryComposite implements CategoryComponent {
  private children: CategoryComponent[] = [];
  constructor(private name: string) {}

  add(component: CategoryComponent) {
    this.children.push(component);
  }

  getName() {
    return `${this.name} [${this.children.map(c => c.getName()).join(", ")}]`;
  }
}

// Usage in React
const electronics = new CategoryComposite("Electronics");
electronics.add(new CategoryLeaf("Laptops"));
electronics.add(new CategoryLeaf("Phones"));
console.log(electronics.getName()); // Electronics [Laptops, Phones]
```

**Explanation**:
- **Composite**: Treats categories and subcategories uniformly.
- **MERN Use**: Renders category trees in React or stores in MongoDB.
- **Pros**: Simplifies hierarchical operations.
- **Cons**: Can obscure leaf vs. composite differences.

### 3.3. Decorator Pattern
**Purpose**: Add responsibilities to objects dynamically without modifying their code.

**Key Features**:
- Wraps objects to extend functionality.
- **Complexity**: O(1) operations, O(n) space for decorators.

**Use Case**: Adding discounts to products in an e-commerce app.

**Example**: Product Decorator
```typescript
interface Product {
  getPrice(): number;
}

class BaseProduct implements Product {
  constructor(private price: number) {}
  getPrice() { return this.price; }
}

class DiscountDecorator implements Product {
  constructor(private product: Product, private discount: number) {}
  getPrice() { return this.product.getPrice() * (1 - this.discount / 100); }
}

// Usage in Express
app.get("/product", (req, res) => {
  let product = new BaseProduct(100);
  product = new DiscountDecorator(product, 20); // 20% off
  res.json({ price: product.getPrice() }); // 80
});
```

**Explanation**:
- **Decorator**: Adds discounts without altering product code.
- **MERN Use**: Enhances product pricing logic in Express APIs.
- **Pros**: Flexible, reusable extensions.
- **Cons**: Stack of decorators can be hard to debug.

### 3.4. Facade Pattern
**Purpose**: Provide a simplified interface to a complex subsystem.

**Key Features**:
- Hides subsystem complexity.
- **Complexity**: O(1) operations, O(1) space.

**Use Case**: Simplifying payment processing in an e-commerce checkout.

**Example**: Checkout Facade
```typescript
class InventorySystem {
  reserveStock(productId: string, quantity: number) {
    return `Reserved ${quantity} of ${productId}`;
  }
}

class PaymentSystem {
  processPayment(amount: number) {
    return `Processed $${amount}`;
  }
}

class NotificationSystem {
  sendConfirmation(userId: string) {
    return `Confirmation sent to ${userId}`;
  }
}

class CheckoutFacade {
  private inventory = new InventorySystem();
  private payment = new PaymentSystem();
  private notification = new NotificationSystem();

  checkout(userId: string, productId: string, quantity: number, amount: number) {
    const stock = this.inventory.reserveStock(productId, quantity);
    const payment = this.payment.processPayment(amount);
    const notification = this.notification.sendConfirmation(userId);
    return { stock, payment, notification };
  }
}

// Usage in Express
app.post("/checkout", (req, res) => {
  const facade = new CheckoutFacade();
  const result = facade.checkout(req.body.userId, req.body.productId, req.body.quantity, req.body.amount);
  res.json(result);
});
```

**Explanation**:
- **Facade**: Simplifies checkout by coordinating subsystems.
- **MERN Use**: Streamlines complex API operations in Express.
- **Pros**: Reduces client complexity.
- **Cons**: May become a god object if overused.

### 3.5. Flyweight Pattern
**Purpose**: Share objects to minimize memory usage for large numbers of similar objects.

**Key Features**:
- Separates intrinsic (shared) and extrinsic (context-specific) state.
- **Complexity**: O(1) access, O(n) space for shared objects.

**Use Case**: Managing product attributes in a large e-commerce catalog.

**Example**: Product Flyweight
```typescript
class ProductFlyweight {
  constructor(private sharedData: { category: string; brand: string }) {}
  getSharedData() { return this.sharedData; }
}

class FlyweightFactory {
  private flyweights: Map<string, ProductFlyweight> = new Map();

  getFlyweight(category: string, brand: string) {
    const key = `${category}:${brand}`;
    if (!this.flyweights.has(key)) {
      this.flyweights.set(key, new ProductFlyweight({ category, brand }));
    }
    return this.flyweights.get(key);
  }
}

// Usage in MongoDB query
const factory = new FlyweightFactory();
const product = {
  id: "prod1",
  flyweight: factory.getFlyweight("Electronics", "BrandX"),
  uniqueData: { price: 100 }
};
console.log(product.flyweight.getSharedData()); // { category: "Electronics", brand: "BrandX" }
```

**Explanation**:
- **Flyweight**: Shares common product attributes to save memory.
- **MERN Use**: Optimizes MongoDB storage for large catalogs.
- **Pros**: Reduces memory usage.
- **Cons**: Increases complexity for managing state.

### 3.6. Proxy Pattern
**Purpose**: Control access to an object, adding functionality like lazy loading or access control.

**Key Features**:
- Acts as an intermediary.
- **Complexity**: O(1) operations, O(1) space.

**Use Case**: Restricting access to sensitive user data in a SaaS API.

**Example**: User Data Proxy
```typescript
interface UserData {
  getData(userId: string): string;
}

class RealUserData implements UserData {
  getData(userId: string) {
    return `Sensitive data for ${userId}`;
  }
}

class UserDataProxy implements UserData {
  private realData: RealUserData = new RealUserData();
  constructor(private role: string) {}

  getData(userId: string) {
    if (this.role !== "admin") {
      throw new Error("Unauthorized");
    }
    return this.realData.getData(userId);
  }
}

// Usage in Express
app.get("/user/:id", (req, res) => {
  const proxy = new UserDataProxy(req.user.role);
  try {
    res.send(proxy.getData(req.params.id));
  } catch (err) {
    res.status(403).send(err.message);
  }
});
```

**Explanation**:
- **Proxy**: Controls access based on user role.
- **MERN Use**: Secures API endpoints in Express.
- **Pros**: Enhances security and control.
- **Cons**: Adds overhead for simple access.

## 4. Behavioral Patterns

Behavioral patterns manage object collaboration and responsibilities.

### 4.1. Chain of Responsibility Pattern
**Purpose**: Pass a request along a chain of handlers until one processes it.

**Key Features**:
- Decouples sender from receiver.
- **Complexity**: O(n) processing, O(n) space for handlers.

**Use Case**: Processing user requests (e.g., authentication, logging) in an Express middleware chain.

**Example**: Middleware Chain
```typescript
interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: any): string;
}

class AuthHandler implements Handler {
  private next: Handler | null = null;

  setNext(handler: Handler) {
    this.next = handler;
    return handler;
  }

  handle(request: any) {
    if (!request.user) {
      return "Unauthorized";
    }
    return this.next ? this.next.handle(request) : "Processed";
  }
}

class LogHandler implements Handler {
  private next: Handler | null = null;

  setNext(handler: Handler) {
    this.next = handler;
    return handler;
  }

  handle(request: any) {
    console.log(`Logging: ${request.user}`);
    return this.next ? this.next.handle(request) : "Processed";
  }
}

// Usage in Express
app.use((req, res, next) => {
  const auth = new AuthHandler();
  const log = new LogHandler();
  auth.setNext(log);
  const result = auth.handle({ user: req.user });
  if (result === "Unauthorized") {
    res.status(401).send(result);
  } else {
    next();
  }
});
```

**Explanation**:
- **Chain**: Passes requests through authentication and logging handlers.
- **MERN Use**: Implements middleware pipelines in Express.
- **Pros**: Flexible handler ordering.
- **Cons**: Can be slow with long chains.

### 4.2. Command Pattern
**Purpose**: Encapsulate a request as an object, allowing parameterization and queuing.

**Key Features**:
- Decouples invoker from receiver.
- **Complexity**: O(1) execution, O(n) space for commands.

**Use Case**: Handling user actions (e.g., place order) in an e-commerce app.

**Example**: Order Command
```typescript
interface Command {
  execute(): string;
}

class PlaceOrderCommand implements Command {
  constructor(private order: { id: string; total: number }) {}
  execute() {
    return `Order ${this.order.id} placed for $${this.order.total}`;
  }
}

class OrderInvoker {
  private commands: Command[] = [];

  addCommand(command: Command) {
    this.commands.push(command);
  }

  executeCommands() {
    return this.commands.map(cmd => cmd.execute());
  }
}

// Usage in Express
app.post("/orders", (req, res) => {
  const invoker = new OrderInvoker();
  invoker.addCommand(new PlaceOrderCommand(req.body));
  res.json(invoker.executeCommands());
});
```

**Explanation**:
- **Command**: Encapsulates order placement as an object.
- **MERN Use**: Queues actions in Express or React state management.
- **Pros**: Supports undo/redo, queuing.
- **Cons**: Increases object overhead.

### 4.3. Iterator Pattern
**Purpose**: Provide a way to access elements of an aggregate object sequentially without exposing its structure.

**Key Features**:
- Abstracts traversal logic.
- **Complexity**: O(n) traversal, O(1) space.

**Use Case**: Iterating over products in a MongoDB cursor.

**Example**: Product Iterator
```typescript
interface Iterator<T> {
  hasNext(): boolean;
  next(): T;
}

class ProductIterator implements Iterator<any> {
  private index = 0;
  constructor(private products: any[]) {}

  hasNext() {
    return this.index < this.products.length;
  }

  next() {
    return this.products[this.index++];
  }
}

// Usage with MongoDB
const Product = require("./models/Product");
app.get("/products", async (req, res) => {
  const products = await Product.find().lean();
  const iterator = new ProductIterator(products);
  const result = [];
  while (iterator.hasNext()) {
    result.push(iterator.next());
  }
  res.json(result);
});
```

**Explanation**:
- **Iterator**: Abstracts product traversal.
- **MERN Use**: Processes MongoDB query results in Express.
- **Pros**: Simplifies collection access.
- **Cons**: Limited to sequential access.

### 4.4. Mediator Pattern
**Purpose**: Centralize communication between objects to reduce direct dependencies.

**Key Features**:
- Single mediator handles interactions.
- **Complexity**: O(1) communication, O(n) space for objects.

**Use Case**: Managing real-time chat in a Socket.IO-based MERN app.

**Example**: Chat Mediator
```typescript
interface Mediator {
  sendMessage(userId: string, message: string): void;
}

class ChatMediator implements Mediator {
  private users: Map<string, User> = new Map();

  addUser(user: User) {
    this.users.set(user.id, user);
  }

  sendMessage(userId: string, message: string) {
    this.users.forEach(user => {
      if (user.id !== userId) {
        user.receive(message);
      }
    });
  }
}

class User {
  constructor(public id: string, private mediator: Mediator) {}

  send(message: string) {
    this.mediator.sendMessage(this.id, message);
  }

  receive(message: string) {
    console.log(`${this.id} received: ${message}`);
  }
}

// Usage with Socket.IO
const io = require("socket.io")();
const mediator = new ChatMediator();
io.on("connection", socket => {
  const user = new User(socket.id, mediator);
  mediator.addUser(user);
  socket.on("message", ({ message }) => user.send(message));
});
```

**Explanation**:
- **Mediator**: Centralizes chat communication.
- **MERN Use**: Manages Socket.IO events in real-time apps.
- **Pros**: Reduces coupling.
- **Cons**: Mediator can become complex.

### 4.5. Memento Pattern
**Purpose**: Capture and restore an object’s state without exposing its internals.

**Key Features**:
- Stores snapshots for undo/redo.
- **Complexity**: O(1) save/restore, O(n) space for mementos.

**Use Case**: Undo functionality in a SaaS text editor.

**Example**: Text Editor Memento
```typescript
class EditorState {
  constructor(private content: string) {}
  getContent() { return this.content; }
}

class TextEditor {
  private content: string = "";

  setContent(content: string) {
    this.content = content;
  }

  createMemento() {
    return new EditorState(this.content);
  }

  restore(memento: EditorState) {
    this.content = memento.getContent();
  }
}

class Caretaker {
  private mementos: EditorState[] = [];

  addMemento(memento: EditorState) {
    this.mementos.push(memento);
  }

  getMemento(index: number) {
    return this.mementos[index];
  }
}

// Usage in React
const editor = new TextEditor();
const caretaker = new Caretaker();
editor.setContent("Hello");
caretaker.addMemento(editor.createMemento());
editor.setContent("World");
editor.restore(caretaker.getMemento(0));
console.log(editor.content); // Hello
```

**Explanation**:
- **Memento**: Saves and restores editor state.
- **MERN Use**: Implements undo/redo in React apps.
- **Pros**: Supports state restoration.
- **Cons**: High memory usage for many states.

### 4.6. Observer Pattern
**Purpose**: Define a one-to-many dependency where objects are notified of state changes.

**Key Features**:
- Subjects notify observers of changes.
- **Complexity**: O(n) notification, O(n) space for observers.

**Use Case**: Real-time order updates in an e-commerce app.

**Example**: Order Observer
```typescript
interface Observer {
  update(data: any): void;
}

interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

class OrderSubject implements Subject {
  private observers: Observer[] = [];
  private state: string = "";

  attach(observer: Observer) {
    this.observers.push(observer);
  }

  detach(observer: Observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify() {
    this.observers.forEach(obs => obs.update(this.state));
  }

  setState(state: string) {
    this.state = state;
    this.notify();
  }
}

class UserObserver implements Observer {
  constructor(private userId: string) {}
  update(data: string) {
    console.log(`${this.userId} notified: ${data}`);
  }
}

// Usage with Socket.IO
io.on("connection", socket => {
  const order = new OrderSubject();
  const observer = new UserObserver(socket.id);
  order.attach(observer);
  socket.on("updateOrder", ({ state }) => order.setState(state));
});
```

**Explanation**:
- **Observer**: Notifies users of order status changes.
- **MERN Use**: Real-time updates with Socket.IO.
- **Pros**: Dynamic subscriptions.
- **Cons**: Can be slow with many observers.

### 4.7. State Pattern
**Purpose**: Allow an object to alter its behavior when its state changes.

**Key Features**:
- Encapsulates state-specific behavior.
- **Complexity**: O(1) state transition, O(n) space for states.

**Use Case**: Managing order states (pending, shipped) in an e-commerce app.

**Example**: Order State
```typescript
interface OrderState {
  handle(order: OrderContext): string;
}

class PendingState implements OrderState {
  handle(order: OrderContext) {
    order.setState(new ShippedState());
    return "Order is pending";
  }
}

class ShippedState implements OrderState {
  handle(order: OrderContext) {
    return "Order is shipped";
  }
}

class OrderContext {
  private state: OrderState;

  constructor() {
    this.state = new PendingState();
  }

  setState(state: OrderState) {
    this.state = state;
  }

  process() {
    return this.state.handle(this);
  }
}

// Usage in Express
app.post("/order/process", (req, res) => {
  const order = new OrderContext();
  res.send(order.process());
});
```

**Explanation**:
- **State**: Encapsulates order state behavior.
- **MERN Use**: Manages order lifecycle in Express.
- **Pros**: Clean state transitions.
- **Cons**: Many states increase complexity.

### 4.8. Strategy Pattern
**Purpose**: Define a family of algorithms, encapsulating each one, and make them interchangeable.

**Key Features**:
- Swaps algorithms at runtime.
- **Complexity**: O(1) execution, O(n) space for strategies.

**Use Case**: Applying different discount strategies in e-commerce.

**Example**: Discount Strategy
```typescript
interface DiscountStrategy {
  applyDiscount(amount: number): number;
}

class RegularDiscount implements DiscountStrategy {
  applyDiscount(amount: number) {
    return amount * 0.9; // 10% off
  }
}

class PremiumDiscount implements DiscountStrategy {
  applyDiscount(amount: number) {
    return amount * 0.8; // 20% off
  }
}

class Cart {
  constructor(private discountStrategy: DiscountStrategy) {}

  setDiscountStrategy(strategy: DiscountStrategy) {
    this.discountStrategy = strategy;
  }

  checkout(amount: number) {
    return this.discountStrategy.applyDiscount(amount);
  }
}

// Usage in Express
app.post("/checkout", (req, res) => {
  const cart = new Cart(new RegularDiscount());
  if (req.body.isPremium) {
    cart.setDiscountStrategy(new PremiumDiscount());
  }
  res.json({ total: cart.checkout(req.body.amount) });
});
```

**Explanation**:
- **Strategy**: Switches discount logic dynamically.
- **MERN Use**: Flexible pricing in Express APIs.
- **Pros**: Easy to swap algorithms.
- **Cons**: Requires strategy management.

### 4.9. Template Method Pattern
**Purpose**: Define a skeleton of an algorithm, allowing subclasses to customize steps.

**Key Features**:
- Fixed algorithm structure with customizable steps.
- **Complexity**: O(1) execution, O(1) space.

**Use Case**: Standardizing API response formatting in Express.

**Example**: API Response Template
```typescript
abstract class ResponseFormatter {
  formatResponse(data: any): string {
    const validated = this.validate(data);
    const transformed = this.transform(validated);
    return this.finalize(transformed);
  }

  protected abstract validate(data: any): any;
  protected abstract transform(data: any): any;
  protected finalize(data: any): string {
    return JSON.stringify(data);
  }
}

class ProductFormatter extends ResponseFormatter {
  validate(data: any) {
    if (!data.name || !data.price) throw new Error("Invalid product");
    return data;
  }

  transform(data: any) {
    return { id: data.id, name: data.name, price: data.price };
  }
}

// Usage in Express
app.get("/products/:id", (req, res) => {
  const formatter = new ProductFormatter();
  const data = { id: "1", name: "Laptop", price: 999 };
  res.send(formatter.formatResponse(data));
});
```

**Explanation**:
- **Template Method**: Defines a response formatting process.
- **MERN Use**: Standardizes API responses in Express.
- **Pros**: Reusable algorithm structure.
- **Cons**: Limited flexibility for major changes.

### 4.10. Visitor Pattern
**Purpose**: Separate an algorithm from the objects it operates on, allowing new operations without modifying objects.

**Key Features**:
- Visitors define operations for elements.
- **Complexity**: O(n) traversal, O(n) space for visitors.

**Use Case**: Generating reports for different data types in a SaaS analytics dashboard.

**Example**: Report Visitor
```typescript
interface Element {
  accept(visitor: Visitor): void;
}

interface Visitor {
  visitProduct(product: ProductElement): string;
  visitOrder(order: OrderElement): string;
}

class ProductElement implements Element {
  constructor(public name: string, public price: number) {}
  accept(visitor: Visitor) {
    return visitor.visitProduct(this);
  }
}

class OrderElement implements Element {
  constructor(public id: string, public total: number) {}
  accept(visitor: Visitor) {
    return visitor.visitOrder(this);
  }
}

class ReportVisitor implements Visitor {
  visitProduct(product: ProductElement) {
    return `Product: ${product.name}, Price: $${product.price}`;
  }

  visitOrder(order: OrderElement) {
    return `Order: ${order.id}, Total: $${order.total}`;
  }
}

// Usage in Express
app.get("/report", (req, res) => {
  const visitor = new ReportVisitor();
  const elements = [
    new ProductElement("Laptop", 999),
    new OrderElement("ord1", 1000)
  ];
  res.json(elements.map(e => e.accept(visitor)));
});
```

**Explanation**:
- **Visitor**: Separates reporting logic from data structures.
- **MERN Use**: Generates analytics reports in Express.
- **Pros**: Easy to add new operations.
- **Cons**: Requires modifying elements to add new types.

## 5. Design Patterns in MERN Stack

### 5.1. Creational Patterns in MERN
- **Singleton**: Manages MongoDB connections or Redis clients in Node.js.
- **Factory Method**: Creates API services (e.g., payment processors) in Express.
- **Builder**: Constructs complex MongoDB documents or React components.

### 5.2. Structural Patterns in MERN
- **Adapter**: Integrates third-party APIs in Express.
- **Composite**: Builds category trees in MongoDB or React UI.
- **Decorator**: Enhances API responses or React components dynamically.

### 5.3. Behavioral Patterns in MERN
- **Observer**: Implements real-time updates with Socket.IO.
- **Strategy**: Switches business logic (e.g., discounts) in Express.
- **Mediator**: Manages Socket.IO events in chat apps.

## 6. Best Practices

1. **Choose the Right Pattern**:
   - Use Singleton for single-instance resources (e.g., database connections).
   - Use Factory for dynamic object creation (e.g., payment systems).
   - Use Observer for real-time updates (e.g., Socket.IO).

2. **Keep It Simple**:
   - Avoid overusing patterns, which can complicate code.
   - Start with simple patterns like Strategy or Facade for common MERN tasks.

3. **Testability**:
   - Use dependency injection (aligned with your interest in DI) with patterns like Factory or Strategy to improve testing.
   - Mock dependencies in Jest or Vitest (from your prior request).

4. **Scalability**:
   - Combine patterns with microservices (e.g., Facade for API gateways).
   - Use Observer with Redis for scalable real-time systems.

5. **Type Safety**:
   - Use TypeScript (per your MERN + TypeScript preference) to enforce interfaces in patterns like Factory or Strategy.

## 7. Real-World Applications

- **E-commerce**:
  - **Factory Method**: Payment processing (PayPal, Stripe).
  - **Decorator**: Dynamic pricing with discounts.
  - **Observer**: Real-time order updates via Socket.IO.
- **SaaS**:
  - **Singleton**: Centralized configuration management.
  - **Memento**: Undo/redo in editors.
  - **Strategy**: Customizable user workflows.
- **Chat Apps** (from your prior request):
  - **Mediator**: Managing Socket.IO events.
  - **Observer**: Real-time message notifications.
  - **Composite**: Structuring group chats.

## 8. Complexity Summary

| Pattern           | Time Complexity | Space Complexity | MERN Use Case |
|-------------------|-----------------|------------------|---------------|
| Singleton         | O(1) access     | O(1)             | MongoDB connection |
| Factory Method    | O(1) creation   | O(n) objects     | Payment processors |
| Abstract Factory  | O(1) creation   | O(n) objects     | UI themes in React |
| Builder           | O(1) creation   | O(1) per object  | Order creation |
| Prototype         | O(1) cloning    | O(n) objects     | User settings |
| Adapter           | O(1) operations | O(1)             | Legacy API integration |
| Composite         | O(n) traversal  | O(n) tree        | Category hierarchies |
| Decorator         | O(1) operations | O(n) decorators  | Dynamic pricing |
| Facade            | O(1) operations | O(1)             | Checkout process |
| Flyweight         | O(1) access     | O(n) shared      | Product catalog |
| Proxy             | O(1) operations | O(1)             | Access control |
| Chain of Resp.    | O(n) processing | O(n) handlers    | Middleware chain |
| Command           | O(1) execution  | O(n) commands    | Order actions |
| Iterator          | O(n) traversal  | O(1)             | MongoDB cursors |
| Mediator          | O(n) comm.      | O(n) objects     | Chat system |
| Memento           | O(1) save       | O(n) mementos    | Undo/redo |
| Observer          | O(n) notify     | O(n) observers   | Real-time updates |
| State             | O(1) transition | O(n) states      | Order lifecycle |
| Strategy          | O(1) execution  | O(n) strategies  | Discount logic |
| Template Method   | O(1) execution  | O(1)             | API responses |
| Visitor           | O(n) traversal  | O(n) visitors    | Analytics reports |

## 9. Conclusion

This guide covered all 23 GoF design patterns, providing detailed explanations, TypeScript/JavaScript implementations, and MERN stack applications. By mastering these patterns, you can design flexible, scalable, and maintainable systems for applications like e-commerce, SaaS, or chat apps. Practice implementing these patterns in a MERN project, such as an e-commerce API or real-time chat system, to solidify your understanding.

**Resources**:
- "Design Patterns: Elements of Reusable Object-Oriented Software" by Gamma et al.
- Refactoring Guru: https://refactoring.guru/design-patterns
- MongoDB and Express Documentation: https://www.mongodb.com/docs/, https://expressjs.com/

**Next Steps**:
- Build an e-commerce API using Factory, Decorator, and Observer patterns.
- Implement a chat app with Mediator and Observer patterns using Socket.IO.
- Use TypeScript to add type safety to pattern implementations.
- Combine patterns with microservices for a scalable MERN backend.