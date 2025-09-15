# 100 Node.js Questions with Detailed Answers

This document provides 100 Node.js questions with detailed answers, covering beginner to advanced topics. Each question includes explanations, code examples, and key takeaways to deepen your understanding of Node.js.

## Node.js Basics

### 1. What is Node.js, and what are its key features?
**Answer**:  
Node.js is a runtime environment that allows JavaScript to run on the server side, built on Chrome’s V8 engine.  
**Key Features**:  
- **Asynchronous and Event-Driven**: Non-blocking I/O operations.  
- **Single-Threaded**: Uses an event loop for concurrency.  
- **Cross-Platform**: Runs on Windows, macOS, Linux.  
- **Module System**: Uses CommonJS and ES modules for modularity.  
- **Fast Execution**: Leverages V8 for performance.  
**Example**:  
```javascript
console.log("Hello, Node.js!");
```
**Key Takeaway**: Node.js enables server-side JavaScript with high performance and asynchronous capabilities.

### 2. How does Node.js handle asynchronous operations?  
**Answer**:  
Node.js uses an event loop, callbacks, Promises, and `async/await` to handle asynchronous operations in a single-threaded environment.  
**Example**:  
```javascript
setTimeout(() => console.log("Delayed"), 1000);
console.log("Immediate");
// Immediate, Delayed (after 1s)
```
**Key Takeaway**: Asynchronous handling ensures non-blocking execution, critical for I/O operations.

### 3. What is the event loop in Node.js?  
**Answer**:  
The event loop manages asynchronous tasks, processing the call stack, microtask queue (Promises), and task queue (timers, I/O).  
**Example**:  
```javascript
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");
// Start, End, Promise, Timeout
```
**Key Takeaway**: The event loop prioritizes microtasks, enabling efficient async processing.

### 4. What is the difference between Node.js and browser JavaScript?  
**Answer**:  
- **Node.js**: Runs on the server, has access to file system, network, and OS APIs. Uses CommonJS/ES modules.  
- **Browser JavaScript**: Runs in browsers, interacts with the DOM, and uses browser APIs (e.g., `window`).  
**Example**:  
```javascript
// Node.js
const fs = require("fs");
fs.writeFileSync("test.txt", "Hello");
```
**Key Takeaway**: Node.js extends JavaScript for server-side tasks, unlike browser JavaScript’s client-side focus.

### 5. What is the `process` object in Node.js?  
**Answer**:  
A global object providing information and control over the Node.js process (e.g., environment variables, arguments).  
**Example**:  
```javascript
console.log(process.argv); // Command-line arguments
console.log(process.env.NODE_ENV); // Environment variable
```
**Key Takeaway**: Use `process` for runtime information and configuration.

### 6. What are environment variables, and how are they accessed?  
**Answer**:  
Environment variables are key-value pairs for configuring applications, accessed via `process.env`.  
**Example**:  
```javascript
console.log(process.env.PORT || 3000); // Default to 3000 if PORT undefined
```
**Key Takeaway**: Environment variables enable flexible, secure configuration.

### 7. What is the `require` function?  
**Answer**:  
`require` imports modules in CommonJS, resolving and caching them.  
**Example**:  
```javascript
const fs = require("fs");
fs.readFileSync("file.txt");
```
**Key Takeaway**: `require` is the foundation of Node.js’s CommonJS module system.

### 8. What are ES modules in Node.js?  
**Answer**:  
ES modules use `import`/`export` syntax, supported in Node.js with `.mjs` files or `"type": "module"` in `package.json`.  
**Example**:  
```javascript
// math.mjs
export const add = (a, b) => a + b;
// main.mjs
import { add } from './math.mjs';
console.log(add(2, 3)); // 5
```
**Key Takeaway**: ES modules offer modern, standardized modularity.

### 9. What is `module.exports`?  
**Answer**:  
Exports values, functions, or objects from a module in CommonJS.  
**Example**:  
```javascript
// math.js
module.exports = {
  add: (a, b) => a + b
};
// main.js
const math = require("./math");
console.log(math.add(2, 3)); // 5
```
**Key Takeaway**: `module.exports` defines what a module exposes.

### 10. What is the difference between CommonJS and ES modules?  
**Answer**:  
- **CommonJS**: Uses `require`/`module.exports`, synchronous, widely used in Node.js.  
- **ES Modules**: Uses `import`/`export`, supports async loading, standard in modern JavaScript.  
**Example**:  
```javascript
// CommonJS
const fs = require("fs");
// ES Module
import fs from "fs";
```
**Key Takeaway**: Choose ES modules for modern code, CommonJS for legacy compatibility.

## File System Operations

### 11. How do you read a file in Node.js?  
**Answer**:  
Use the `fs` module’s `readFile` (async) or `readFileSync` (sync).  
**Example**:  
```javascript
const fs = require("fs");
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
```
**Key Takeaway**: Prefer async methods to avoid blocking the event loop.

### 12. How do you write to a file?  
**Answer**:  
Use `fs.writeFile` (async) or `fs.writeFileSync` (sync).  
**Example**:  
```javascript
const fs = require("fs");
fs.writeFile("file.txt", "Hello", err => {
  if (err) throw err;
  console.log("Written");
});
```
**Key Takeaway**: Async writing ensures non-blocking I/O.

### 13. What is the difference between `fs.readFile` and `fs.readFileSync`?  
**Answer**:  
- **`fs.readFile`**: Asynchronous, uses a callback.  
- **`fs.readFileSync`**: Synchronous, blocks execution.  
**Example**:  
```javascript
const fs = require("fs");
console.log(fs.readFileSync("file.txt", "utf8")); // Sync
fs.readFile("file.txt", "utf8", (err, data) => console.log(data)); // Async
```
**Key Takeaway**: Use async methods for better performance in I/O-heavy apps.

### 14. How do you create a directory?  
**Answer**:  
Use `fs.mkdir` (async) or `fs.mkdirSync` (sync).  
**Example**:  
```javascript
const fs = require("fs");
fs.mkdir("newDir", err => {
  if (err) throw err;
  console.log("Directory created");
});
```
**Key Takeaway**: Async directory creation avoids blocking.

### 15. How do you check if a file exists?  
**Answer**:  
Use `fs.access` or `fs.existsSync`.  
**Example**:  
```javascript
const fs = require("fs");
fs.access("file.txt", fs.constants.F_OK, err => {
  console.log(err ? "File does not exist" : "File exists");
});
```
**Key Takeaway**: `fs.access` is preferred for async file checks.

### 16. How do you delete a file?  
**Answer**:  
Use `fs.unlink` (async) or `fs.unlinkSync` (sync).  
**Example**:  
```javascript
const fs = require("fs");
fs.unlink("file.txt", err => {
  if (err) throw err;
  console.log("File deleted");
});
```
**Key Takeaway**: Use async deletion for non-blocking operations.

### 17. How do you rename a file?  
**Answer**:  
Use `fs.rename` or `fs.renameSync`.  
**Example**:  
```javascript
const fs = require("fs");
fs.rename("old.txt", "new.txt", err => {
  if (err) throw err;
  console.log("Renamed");
});
```
**Key Takeaway**: Async renaming ensures efficient file operations.

### 18. How do you read a directory’s contents?  
**Answer**:  
Use `fs.readdir` or `fs.readdirSync`.  
**Example**:  
```javascript
const fs = require("fs");
fs.readdir(".", (err, files) => {
  if (err) throw err;
  console.log(files); // Array of file names
});
```
**Key Takeaway**: Async directory reading is non-blocking.

### 19. What is `fs.promises`?  
**Answer**:  
The `fs.promises` API provides Promise-based file system methods.  
**Example**:  
```javascript
const fs = require("fs").promises;
async function readFile() {
  const data = await fs.readFile("file.txt", "utf8");
  console.log(data);
}
readFile();
```
**Key Takeaway**: Use `fs.promises` for modern, Promise-based file operations.

### 20. How do you watch for file changes?  
**Answer**:  
Use `fs.watch` to monitor file or directory changes.  
**Example**:  
```javascript
const fs = require("fs");
fs.watch("file.txt", (event, filename) => {
  console.log(`${filename} changed: ${event}`);
});
```
**Key Takeaway**: `fs.watch` enables real-time file monitoring.

## Modules and Packages

### 21. What is `package.json`?  
**Answer**:  
A JSON file defining a Node.js project’s metadata, dependencies, and scripts.  
**Example**:  
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.17.1"
  },
  "scripts": {
    "start": "node index.js"
  }
}
```
**Key Takeaway**: `package.json` is the backbone of Node.js projects.

### 22. What is `npm`?  
**Answer**:  
Node Package Manager (npm) is a tool for managing Node.js packages and dependencies.  
**Example**:  
```bash
npm install express
```
**Key Takeaway**: npm simplifies dependency management and scripting.

### 23. What is the difference between `dependencies` and `devDependencies`?  
**Answer**:  
- **`dependencies`**: Required for the application to run in production.  
- **`devDependencies`**: Needed only for development (e.g., testing tools).  
**Example**:  
```json
{
  "dependencies": { "express": "^4.17.1" },
  "devDependencies": { "jest": "^27.0.6" }
}
```
**Key Takeaway**: Use `devDependencies` for tools not needed in production.

### 24. What is `npx`?  
**Answer**:  
`npx` executes npm package binaries without global installation.  
**Example**:  
```bash
npx create-react-app my-app
```
**Key Takeaway**: `npx` simplifies running one-off commands.

### 25. What is the `node_modules` directory?  
**Answer**:  
Stores installed dependencies for a project.  
**Example**:  
```bash
npm install express
# Creates node_modules/express
```
**Key Takeaway**: `node_modules` is auto-generated by npm; avoid committing it to version control.

### 26. What is a `package-lock.json` file?  
**Answer**:  
Locks dependency versions for consistent installs across environments.  
**Example**:  
```json
{
  "name": "my-app",
  "lockfileVersion": 2,
  "dependencies": {
    "express": {
      "version": "4.17.1"
    }
  }
}
```
**Key Takeaway**: Commit `package-lock.json` for reproducible builds.

### 27. How do you create a custom Node.js module?  
**Answer**:  
Create a file, define `module.exports`, and import it with `require`.  
**Example**:  
```javascript
// myModule.js
module.exports = { say: () => "Hello" };
// main.js
const myModule = require("./myModule");
console.log(myModule.say()); // Hello
```
**Key Takeaway**: Custom modules promote code reusability.

### 28. What is the `path` module?  
**Answer**:  
Handles file paths in a platform-agnostic way.  
**Example**:  
```javascript
const path = require("path");
console.log(path.join(__dirname, "file.txt")); // Absolute path to file.txt
```
**Key Takeaway**: Use `path` for cross-platform path handling.

### 29. What is `__dirname`?  
**Answer**:  
The directory name of the current module.  
**Example**:  
```javascript
console.log(__dirname); // Path to current directory
```
**Key Takeaway**: `__dirname` provides context for file operations.

### 30. What is `__filename`?  
**Answer**:  
The file name of the current module, including its path.  
**Example**:  
```javascript
console.log(__filename); // Absolute path to current file
```
**Key Takeaway**: Use `__filename` for file-specific operations.

## HTTP and Servers

### 31. How do you create a basic HTTP server in Node.js?  
**Answer**:  
Use the `http` module to create a server.  
**Example**:  
```javascript
const http = require("http");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, World!");
});
server.listen(3000, () => console.log("Server running"));
```
**Key Takeaway**: The `http` module enables basic server creation.

### 32. What is Express.js?  
**Answer**:  
A minimal web framework for building HTTP servers and APIs.  
**Example**:  
```javascript
const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("Hello, Express!"));
app.listen(3000, () => console.log("Server running"));
```
**Key Takeaway**: Express simplifies server-side development.

### 33. How do you handle GET requests in Express?  
**Answer**:  
Use `app.get` to define a route handler.  
**Example**:  
```javascript
app.get("/user/:id", (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});
```
**Key Takeaway**: Route parameters make dynamic URLs easy.

### 34. How do you handle POST requests in Express?  
**Answer**:  
Use `app.post` and middleware like `express.json()` for parsing.  
**Example**:  
```javascript
const express = require("express");
const app = express();
app.use(express.json());
app.post("/user", (req, res) => {
  res.send(`Received: ${req.body.name}`);
});
```
**Key Takeaway**: Middleware enables request body parsing.

### 35. What is middleware in Express?  
**Answer**:  
Functions that process requests/responses, executed sequentially.  
**Example**:  
```javascript
app.use((req, res, next) => {
  console.log("Request received");
  next();
});
```
**Key Takeaway**: Middleware handles tasks like logging, authentication, etc.

### 36. How do you serve static files in Express?  
**Answer**:  
Use `express.static` middleware.  
**Example**:  
```javascript
app.use(express.static("public"));
```
**Key Takeaway**: Serve files like HTML, CSS, and images easily.

### 37. What is the `url` module?  
**Answer**:  
Parses and formats URLs.  
**Example**:  
```javascript
const url = require("url");
const myUrl = url.parse("http://example.com?key=value");
console.log(myUrl.query); // key=value
```
**Key Takeaway**: Use `url` for URL manipulation.

### 38. How do you handle query parameters in Express?  
**Answer**:  
Access via `req.query`.  
**Example**:  
```javascript
app.get("/search", (req, res) => {
  res.send(`Query: ${req.query.q}`);
});
```
**Key Takeaway**: `req.query` simplifies query string access.

### 39. What is CORS, and how do you enable it in Express?  
**Answer**:  
Cross-Origin Resource Sharing (CORS) allows restricted resources to be requested from another domain. Use the `cors` middleware.  
**Example**:  
```javascript
const cors = require("cors");
app.use(cors());
```
**Key Takeaway**: CORS is essential for cross-origin API requests.

### 40. How do you handle errors in Express?  
**Answer**:  
Use error-handling middleware with four arguments.  
**Example**:  
```javascript
app.use((err, req, res, next) => {
  res.status(500).send("Something broke!");
});
```
**Key Takeaway**: Centralized error handling improves robustness.

## Streams and Buffers

### 41. What is a stream in Node.js?  
**Answer**:  
A stream is an abstract interface for handling streaming data (e.g., reading/writing large files).  
**Example**:  
```javascript
const fs = require("fs");
const readStream = fs.createReadStream("file.txt");
readStream.on("data", chunk => console.log(chunk));
```
**Key Takeaway**: Streams process data in chunks, saving memory.

### 42. What are the types of streams in Node.js?  
**Answer**:  
- **Readable**: Read data (e.g., `fs.createReadStream`).  
- **Writable**: Write data (e.g., `fs.createWriteStream`).  
- **Duplex**: Both readable and writable (e.g., TCP sockets).  
- **Transform**: Modify data during streaming.  
**Key Takeaway**: Streams handle different data flow scenarios.

### 43. How do you pipe streams?  
**Answer**:  
Use the `pipe` method to connect a readable stream to a writable stream.  
**Example**:  
```javascript
const fs = require("fs");
fs.createReadStream("input.txt").pipe(fs.createWriteStream("output.txt"));
```
**Key Takeaway**: Piping simplifies data transfer between streams.

### 44. What is a Buffer in Node.js?  
**Answer**:  
A `Buffer` is a temporary storage for raw binary data.  
**Example**:  
```javascript
const buf = Buffer.from("Hello");
console.log(buf.toString()); // Hello
```
**Key Takeaway**: Buffers handle binary data efficiently.

### 45. How do you create a Transform stream?  
**Answer**:  
Extend the `stream.Transform` class.  
**Example**:  
```javascript
const { Transform } = require("stream");
const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});
process.stdin.pipe(upperCase).pipe(process.stdout);
```
**Key Takeaway**: Transform streams modify data during streaming.

### 46. How do you handle stream errors?  
**Answer**:  
Listen for the `error` event on streams.  
**Example**:  
```javascript
const fs = require("fs");
const stream = fs.createReadStream("nonexistent.txt");
stream.on("error", err => console.error(err.message));
```
**Key Takeaway**: Proper error handling prevents stream crashes.

### 47. What is backpressure in streams?  
**Answer**:  
Backpressure occurs when a writable stream cannot process data as fast as the readable stream provides it. Piping handles it automatically.  
**Key Takeaway**: Streams manage backpressure to prevent memory issues.

### 48. How do you convert a Buffer to a string?  
**Answer**:  
Use `Buffer.toString()`.  
**Example**:  
```javascript
const buf = Buffer.from("Hello");
console.log(buf.toString("utf8")); // Hello
```
**Key Takeaway**: Specify encoding for correct string conversion.

### 49. What is the `stream` module?  
**Answer**:  
Provides the foundation for creating and using streams.  
**Example**:  
```javascript
const { Readable } = require("stream");
const myStream = new Readable({
  read() {}
});
```
**Key Takeaway**: The `stream` module enables custom stream implementations.

### 50. How do you pause and resume a stream?  
**Answer**:  
Use `pause()` and `resume()` on readable streams.  
**Example**:  
```javascript
const fs = require("fs");
const stream = fs.createReadStream("file.txt");
stream.pause();
setTimeout(() => stream.resume(), 1000);
```
**Key Takeaway**: Pausing/resuming controls stream flow.

## Asynchronous Programming

### 51. What are callbacks in Node.js?  
**Answer**:  
Functions passed as arguments to be executed after an async operation.  
**Example**:  
```javascript
const fs = require("fs");
fs.readFile("file.txt", (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});
```
**Key Takeaway**: Callbacks are foundational but can lead to callback hell.

### 52. What is callback hell, and how do you avoid it?  
**Answer**:  
Nested callbacks causing unreadable code. Avoid with Promises or `async/await`.  
**Example**:  
```javascript
// Callback Hell
fs.readFile("file1.txt", (err, data1) => {
  fs.readFile("file2.txt", (err, data2) => {
    console.log(data1, data2);
  });
});
// Better with async/await
async function readFiles() {
  const data1 = await fs.promises.readFile("file1.txt");
  const data2 = await fs.promises.readFile("file2.txt");
  console.log(data1, data2);
}
```
**Key Takeaway**: Modern async patterns improve readability.

### 53. What are Promises in Node.js?  
**Answer**:  
Objects representing async operation outcomes (see Q42 in JavaScript).  
**Example**:  
```javascript
const fs = require("fs").promises;
fs.readFile("file.txt").then(data => console.log(data.toString()));
```
**Key Takeaway**: Promises simplify async code management.

### 54. What is `async/await` in Node.js?  
**Answer**:  
Syntactic sugar over Promises for readable async code.  
**Example**:  
```javascript
const fs = require("fs").promises;
async function read() {
  const data = await fs.readFile("file.txt", "utf8");
  console.log(data);
}
read();
```
**Key Takeaway**: `async/await` enhances async code clarity.

### 55. What is `Promise.all` in Node.js?  
**Answer**:  
Runs multiple Promises in parallel, resolving when all complete.  
**Example**:  
```javascript
const fs = require("fs").promises;
Promise.all([
  fs.readFile("file1.txt"),
  fs.readFile("file2.txt")
]).then(([data1, data2]) => console.log(data1, data2));
```
**Key Takeaway**: Use for parallel async operations.

### 56. How do you handle async errors?  
**Answer**:  
Use `try/catch` with `async/await` or `.catch` with Promises.  
**Example**:  
```javascript
async function read() {
  try {
    await fs.promises.readFile("nonexistent.txt");
  } catch (err) {
    console.error(err.message);
  }
}
read();
```
**Key Takeaway**: Proper error handling is critical for async code.

### 57. What is `setImmediate`?  
**Answer**:  
Schedules a callback to run after the current event loop phase.  
**Example**:  
```javascript
setImmediate(() => console.log("Immediate"));
console.log("Now");
// Now, Immediate
```
**Key Takeaway**: Use for prioritizing over `setTimeout`.

### 58. What is `process.nextTick`?  
**Answer**:  
Runs a callback before the next event loop iteration, ahead of other tasks.  
**Example**:  
```javascript
process.nextTick(() => console.log("Next Tick"));
console.log("Now");
// Now, Next Tick
```
**Key Takeaway**: `nextTick` is for high-priority async tasks.

### 59. What is the `async` module?  
**Answer**:  
A third-party module for advanced async flow control (e.g., parallel, series).  
**Example**:  
```javascript
const async = require("async");
async.parallel([
  cb => cb(null, "One"),
  cb => cb(null, "Two")
], (err, results) => console.log(results)); // ["One", "Two"]
```
**Key Takeaway**: Use `async` for complex async patterns (pre-Promises).

### 60. What is the difference between `setTimeout` and `setImmediate`?  
**Answer**:  
- **`setTimeout`**: Runs after a delay, in the timers phase.  
- **`setImmediate`**: Runs in the check phase, after I/O.  
**Example**:  
```javascript
setTimeout(() => console.log("Timeout"), 0);
setImmediate(() => console.log("Immediate"));
```
**Key Takeaway**: `setImmediate` typically runs before `setTimeout(0)`.

## Error Handling and Debugging

### 61. How do you handle errors in Node.js?  
**Answer**:  
Use `try/catch`, `.catch`, or event emitters for errors.  
**Example**:  
```javascript
const fs = require("fs");
fs.readFile("nonexistent.txt", (err, data) => {
  if (err) console.error(err.message);
});
```
**Key Takeaway**: Robust error handling prevents crashes.

### 62. What is the `Error` object?  
**Answer**:  
Represents errors with properties like `message` and `stack`.  
**Example**:  
```javascript
try {
  throw new Error("Something went wrong");
} catch (err) {
  console.log(err.message, err.stack);
}
```
**Key Takeaway**: Use `Error` for consistent error handling.

### 63. What is `process.on("uncaughtException")`?  
**Answer**:  
Catches unhandled exceptions to prevent process crashes.  
**Example**:  
```javascript
process.on("uncaughtException", err => console.error(err.message));
throw new Error("Uncaught");
```
**Key Takeaway**: Use as a last resort for uncaught errors.

### 64. What is `process.on("unhandledRejection")`?  
**Answer**:  
Catches unhandled Promise rejections.  
**Example**:  
```javascript
process.on("unhandledRejection", reason => console.error(reason));
Promise.reject("Failed");
```
**Key Takeaway**: Ensures Promise errors are caught.

### 65. How do you debug Node.js applications?  
**Answer**:  
Use `console.log`, Node.js’s built-in debugger, or tools like VS Code.  
**Example**:  
```javascript
node --inspect app.js
```
**Key Takeaway**: Debugging tools improve development efficiency.

### 66. What is the `util` module?  
**Answer**:  
Provides utility functions (e.g., `util.inspect`, `util.promisify`).  
**Example**:  
```javascript
const util = require("util");
const obj = { name: "Alice" };
console.log(util.inspect(obj)); // { name: 'Alice' }
```
**Key Takeaway**: `util` enhances debugging and compatibility.

### 67. What is `util.promisify`?  
**Answer**:  
Converts callback-based functions to Promise-based.  
**Example**:  
```javascript
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);
readFile("file.txt", "utf8").then(data => console.log(data));
```
**Key Takeaway**: Simplifies async code with Promises.

### 68. How do you log errors effectively?  
**Answer**:  
Use `console.error` or libraries like `winston` for structured logging.  
**Example**:  
```javascript
const winston = require("winston");
const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: "error.log" })]
});
logger.error("Something went wrong");
```
**Key Takeaway**: Structured logging aids debugging and monitoring.

### 69. What is a stack trace?  
**Answer**:  
A report of the call stack when an error occurs.  
**Example**:  
```javascript
try {
  throw new Error("Error");
} catch (err) {
  console.log(err.stack);
}
```
**Key Takeaway**: Stack traces pinpoint error locations.

### 70. How do you handle async errors in Express?  
**Answer**:  
Use `try/catch` in async route handlers or error middleware.  
**Example**:  
```javascript
app.get("/data", async (req, res, next) => {
  try {
    throw new Error("Failed");
  } catch (err) {
    next(err);
  }
});
```
**Key Takeaway**: Async error handling requires explicit passing to middleware.

## Performance and Optimization

### 71. What is clustering in Node.js?  
**Answer**:  
Uses the `cluster` module to spawn worker processes for parallel execution.  
**Example**:  
```javascript
const cluster = require("cluster");
if (cluster.isMaster) {
  cluster.fork();
} else {
  console.log("Worker running");
}
```
**Key Takeaway**: Clustering improves performance on multi-core systems.

### 72. What is the `worker_threads` module?  
**Answer**:  
Enables true multi-threading in Node.js.  
**Example**:  
```javascript
const { Worker, isMainThread } = require("worker_threads");
if (isMainThread) {
  new Worker(__filename);
} else {
  console.log("Worker thread");
}
```
**Key Takeaway**: Use `worker_threads` for CPU-intensive tasks.

### 73. How do you optimize Node.js performance?  
**Answer**:  
Use async operations, clustering, caching, and profiling tools.  
**Key Takeaway**: Optimization focuses on non-blocking I/O and resource management.

### 74. What is `process.memoryUsage`?  
**Answer**:  
Returns memory usage statistics.  
**Example**:  
```javascript
console.log(process.memoryUsage().heapUsed); // Heap memory in bytes
```
**Key Takeaway**: Monitor memory to detect leaks.

### 75. How do you profile a Node.js application?  
**Answer**:  
Use `--prof`, `v8-profiler`, or tools like Clinic.js.  
**Example**:  
```javascript
node --prof app.js
```
**Key Takeaway**: Profiling identifies performance bottlenecks.

## Security

### 76. How do you secure a Node.js application?  
**Answer**:  
Use HTTPS, input validation, secure headers, and avoid `eval`.  
**Key Takeaway**: Security practices prevent common vulnerabilities.

### 77. What is `helmet`?  
**Answer**:  
An Express middleware for setting secure HTTP headers.  
**Example**:  
```javascript
const helmet = require("helmet");
app.use(helmet());
```
**Key Takeaway**: `helmet` enhances HTTP security.

### 78. How do you handle sensitive data in Node.js?  
**Answer**:  
Use environment variables and encryption libraries (e.g., `crypto`).  
**Example**:  
```javascript
const crypto = require("crypto");
const hash = crypto.createHash("sha256").update("password").digest("hex");
console.log(hash);
```
**Key Takeaway**: Protect sensitive data with encryption and secure storage.

### 79. What is input validation?  
**Answer**:  
Ensuring user input is safe and expected, often using libraries like `express-validator`.  
**Example**:  
```javascript
const { body, validationResult } = require("express-validator");
app.post("/user", body("email").isEmail(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors.array());
});
```
**Key Takeaway**: Validation prevents security risks like injection.

### 80. How do you prevent SQL injection in Node.js?  
**Answer**:  
Use parameterized queries or ORMs like Sequelize.  
**Example**:  
```javascript
const { Pool } = require("pg");
const pool = new Pool();
pool.query("SELECT * FROM users WHERE id = $1", [1], (err, res) => {
  console.log(res.rows);
});
```
**Key Takeaway**: Parameterized queries ensure safe database interactions.

## Testing

### 81. How do you test Node.js applications?  
**Answer**:  
Use testing frameworks like Jest, Mocha, or Jasmine.  
**Example**:  
```javascript
// test.js (Jest)
const sum = require("./sum");
test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```
**Key Takeaway**: Testing ensures code reliability.

### 82. What is a unit test?  
**Answer**:  
Tests individual functions or modules in isolation.  
**Example**:  
```javascript
const sum = (a, b) => a + b;
test("sum adds correctly", () => {
  expect(sum(2, 3)).toBe(5);
});
```
**Key Takeaway**: Unit tests verify small code units.

### 83. What is an integration test?  
**Answer**:  
Tests interactions between components (e.g., API endpoints).  
**Example**:  
```javascript
const request = require("supertest");
const app = require("./app");
test("GET / responds with Hello", async () => {
  const res = await request(app).get("/");
  expect(res.text).toBe("Hello");
});
```
**Key Takeaway**: Integration tests validate system interactions.

### 84. What is `Jest`?  
**Answer**:  
A popular testing framework with built-in assertions and mocking.  
**Example**:  
```javascript
test("mock function", () => {
  const mock = jest.fn().mockReturnValue(42);
  expect(mock()).toBe(42);
});
```
**Key Takeaway**: Jest simplifies testing with robust features.

### 85. What is mocking in testing?  
**Answer**:  
Simulating dependencies to isolate tests.  
**Example**:  
```javascript
jest.mock("fs");
const fs = require("fs");
fs.readFileSync.mockReturnValue("Mocked data");
```
**Key Takeaway**: Mocking isolates tests from external systems.

## Databases

### 86. How do you connect to a database in Node.js?  
**Answer**:  
Use drivers like `pg` for PostgreSQL or `mongoose` for MongoDB.  
**Example**:  
```javascript
const { Pool } = require("pg");
const pool = new Pool({ database: "mydb" });
pool.query("SELECT NOW()", (err, res) => console.log(res.rows));
```
**Key Takeaway**: Database drivers enable seamless DB integration.

### 87. What is Mongoose?  
**Answer**:  
An ODM (Object Data Modeling) library for MongoDB.  
**Example**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mydb");
const User = mongoose.model("User", { name: String });
```
**Key Takeaway**: Mongoose simplifies MongoDB interactions.

### 88. How do you perform CRUD operations with Mongoose?  
**Answer**:  
Use Mongoose model methods like `save`, `find`, `updateOne`, `deleteOne`.  
**Example**:  
```javascript
const user = new User({ name: "Alice" });
user.save();
User.find({ name: "Alice" });
```
**Key Takeaway**: Mongoose provides intuitive CRUD methods.

### 89. What is an ORM?  
**Answer**:  
Object-Relational Mapping (e.g., Sequelize) maps database tables to JavaScript objects.  
**Example**:  
```javascript
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
class User extends Model {}
User.init({ name: DataTypes.STRING }, { sequelize });
```
**Key Takeaway**: ORMs simplify relational database interactions.

### 90. How do you handle database connection pooling?  
**Answer**:  
Use a pool to manage multiple database connections efficiently.  
**Example**:  
```javascript
const { Pool } = require("pg");
const pool = new Pool({ max: 20 });
pool.query("SELECT NOW()");
```
**Key Takeaway**: Connection pooling improves performance for concurrent queries.

## Miscellaneous

### 91. What is the `crypto` module?  
**Answer**:  
Provides cryptographic functionality (e.g., hashing, encryption).  
**Example**:  
```javascript
const crypto = require("crypto");
const hash = crypto.createHash("sha256").update("password").digest("hex");
console.log(hash);
```
**Key Takeaway**: `crypto` ensures secure data handling.

### 92. What is the `os` module?  
**Answer**:  
Provides operating system-related utility methods.  
**Example**:  
```javascript
const os = require("os");
console.log(os.cpus().length); // Number of CPU cores
```
**Key Takeaway**: `os` provides system information.

### 93. What is the `child_process` module?  
**Answer**:  
Runs external processes or scripts.  
**Example**:  
```javascript
const { exec } = require("child_process");
exec("ls", (err, stdout) => console.log(stdout));
```
**Key Takeaway**: `child_process` enables interaction with system commands.

### 94. What is the `events` module?  
**Answer**:  
Implements the EventEmitter class for event-driven programming.  
**Example**:  
```javascript
const EventEmitter = require("events");
const emitter = new EventEmitter();
emitter.on("event", () => console.log("Triggered"));
emitter.emit("event");
```
**Key Takeaway**: EventEmitter powers event-driven architectures.

### 95. How do you create a CLI tool in Node.js?  
**Answer**:  
Use `process.argv` or libraries like `commander`.  
**Example**:  
```javascript
const [,, arg] = process.argv;
console.log(`Hello, ${arg}`);
```
**Key Takeaway**: CLI tools enhance Node.js’s utility.

### 96. What is `nodemon`?  
**Answer**:  
A tool that restarts the Node.js server on file changes.  
**Example**:  
```bash
nodemon app.js
```
**Key Takeaway**: `nodemon` speeds up development.

### 97. What is `pm2`?  
**Answer**:  
A process manager for running Node.js apps in production.  
**Example**:  
```bash
pm2 start app.js
```
**Key Takeaway**: `pm2` ensures reliable app deployment.

### 98. How do you handle graceful shutdown?  
**Answer**:  
Listen for `SIGINT` or `SIGTERM` and clean up resources.  
**Example**:  
```javascript
process.on("SIGINT", () => {
  console.log("Shutting down");
  process.exit(0);
});
```
**Key Takeaway**: Graceful shutdown prevents data loss.

### 99. What is the `dns` module?  
**Answer**:  
Performs DNS lookups and name resolution.  
**Example**:  
```javascript
const dns = require("dns");
dns.lookup("example.com", (err, address) => console.log(address));
```
**Key Takeaway**: `dns` enables network-related operations.

### 100. What is the `net` module?  
**Answer**:  
Provides TCP server and client functionality.  
**Example**:  
```javascript
const net = require("net");
const server = net.createServer(socket => {
  socket.write("Hello\n");
});
server.listen(3000);
```
**Key Takeaway**: `net` supports low-level networking.