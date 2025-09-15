# 100 Node.js Backend Scenario-Based Questions: Part 1 (Questions 1–50)

This document provides detailed answers to the first 50 of 100 scenario-based questions about Node.js backend development. Each question presents a practical scenario, followed by a detailed answer, explanation, and code example to illustrate the solution. The questions cover topics like Express.js, REST APIs, middleware, authentication, database integration, error handling, and performance optimization.

## Table of Contents
1. **Setting Up a Node.js Backend**
2. **Express.js Basics**
3. **REST API Development**
4. **Middleware and Request Handling**
5. **Authentication and Authorization**
6. **Database Integration**
7. **Error Handling**
8. **Performance and Optimization**
9. **Testing and Debugging**
10. **Best Practices**

---

## 1. Setting Up a Node.js Backend

### 1. How do you set up a basic Node.js server using Express.js?
**Scenario**: You need to create a simple Node.js server that responds with "Hello, World!" on the root endpoint.

**Answer**: Use Express.js to create a server, define a route for the root endpoint, and start the server on a specified port.

**Explanation**: Express.js is a lightweight framework for building Node.js web servers. It simplifies routing, middleware, and request handling. The server listens on a port (e.g., 3000) and responds to HTTP requests.

**Code Example**:
```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

---

### 2. How do you handle environment variables in a Node.js application?
**Scenario**: You want to store sensitive data like database credentials securely in a Node.js app.

**Answer**: Use the `dotenv` package to load environment variables from a `.env` file and access them via `process.env`.

**Explanation**: Environment variables keep sensitive data out of source code. The `dotenv` package loads variables from a `.env` file into `process.env`, making them accessible throughout the application.

**Code Example**:
```javascript
// .env
DB_HOST=localhost
DB_USER=admin
DB_PASS=secret

// index.js
require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`Connecting to DB at ${process.env.DB_HOST}`);
});

app.listen(3000, () => console.log('Server started'));
```

---

### 3. How do you structure a Node.js project for scalability?
**Scenario**: You’re building a Node.js backend that may grow to include multiple routes, services, and database models.

**Answer**: Organize the project into modular directories like `routes`, `controllers`, `services`, `models`, and `middleware`.

**Explanation**: A modular structure separates concerns, making the codebase easier to maintain and scale. For example, routes define endpoints, controllers handle request logic, services manage business logic, and models define database schemas.

**Code Example**:
```
// project structure
├── src
│   ├── controllers
│   │   └── userController.js
│   ├── models
│   │   └── user.js
│   ├── routes
│   │   └── userRoutes.js
│   ├── services
│   │   └── userService.js
│   ├── middleware
│   │   └── auth.js
│   └── app.js

// app.js
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(3000, () => console.log('Server started'));
```

---

### 4. How do you handle JSON payloads in Express.js?
**Scenario**: Your API needs to accept and process JSON data sent in POST requests.

**Answer**: Use the `express.json()` middleware to parse JSON payloads in request bodies.

**Explanation**: The `express.json()` middleware parses incoming JSON requests and makes the data available in `req.body`. This is essential for handling POST and PUT requests with JSON data.

**Code Example**:
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.json({ message: `Received: ${name}, ${email}` });
});

app.listen(3000);
```

---

### 5. How do you serve static files in Express.js?
**Scenario**: You need to serve images and CSS files from a Node.js server.

**Answer**: Use the `express.static()` middleware to serve files from a specified directory.

**Explanation**: The `express.static()` middleware maps a directory to a URL path, allowing clients to access static assets like images, CSS, or JavaScript files.

**Code Example**:
```javascript
const express = require('express');
const app = express();

app.use('/static', express.static('public'));

app.listen(3000, () => console.log('Server started'));
// Access files at http://localhost:3000/static/image.jpg
```

---

### 6. How do you handle query parameters in Express.js?
**Scenario**: Your API needs to filter users based on query parameters like `age` and `role`.

**Answer**: Access query parameters via `req.query` and use them to filter data.

**Explanation**: Query parameters are key-value pairs in the URL (e.g., `?age=25&role=admin`). Express parses them into `req.query`, allowing dynamic filtering.

**Code Example**:
```javascript
const express = require('express');
const app = express();

app.get('/users', (req, res) => {
  const { age, role } = req.query;
  res.json({ message: `Filtering users with age=${age}, role=${role}` });
});

app.listen(3000);
```

---

### 7. How do you create a RESTful API with Express.js?
**Scenario**: You need to build a REST API for managing users with CRUD operations.

**Answer**: Define routes for GET, POST, PUT, and DELETE operations, mapping them to controller functions.

**Explanation**: RESTful APIs follow conventions like using HTTP methods (GET, POST, PUT, DELETE) and meaningful endpoints (e.g., `/users/:id`). Express routes handle these requests.

**Code Example**:
```javascript
const express = require('express');
const app = express();
app.use(express.json());

app.get('/users', (req, res) => res.json({ users: [] }));
app.get('/users/:id', (req, res) => res.json({ id: req.params.id }));
app.post('/users', (req, res) => res.json(req.body));
app.put('/users/:id', (req, res) => res.json({ id: req.params.id, ...req.body }));
app.delete('/users/:id', (req, res) => res.json({ message: 'Deleted' }));

app.listen(3000);
```

---

### 8. How do you connect to MongoDB in a Node.js app?
**Scenario**: Your app needs to connect to MongoDB to store user data.

**Answer**: Use Mongoose to connect to MongoDB and define models for data interaction.

**Explanation**: Mongoose simplifies MongoDB interactions with schemas and models. The `mongoose.connect()` method establishes a connection, and models define data structures.

**Code Example**:
```javascript
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'));

const userSchema = new mongoose.Schema({ name: String });
const User = mongoose.model('User', userSchema);

app.listen(3000);
```

---

### 9. How do you handle CORS in Express.js?
**Scenario**: Your frontend app on a different domain needs to access your Node.js API.

**Answer**: Use the `cors` middleware to enable Cross-Origin Resource Sharing.

**Explanation**: CORS allows controlled access to resources across different origins. The `cors` package simplifies configuration in Express.

**Code Example**:
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: 'http://example.com' }));

app.get('/data', (req, res) => res.json({ message: 'CORS enabled' }));

app.listen(3000);
```

---

### 10. How do you implement middleware in Express.js?
**Scenario**: You need to log all incoming requests to your API.

**Answer**: Create a custom middleware function and use `app.use()` to apply it to all routes.

**Explanation**: Middleware functions have access to `req`, `res`, and `next`, allowing you to process requests before they reach route handlers.

**Code Example**:
```javascript
const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date()}`);
  next();
});

app.get('/', (req, res) => res.send('Hello'));

app.listen(3000);
```

---

### 11. How do you create route-specific middleware?
**Scenario**: You want to apply authentication only to specific routes.

**Answer**: Define middleware and apply it to specific routes using `app.use()` or route handlers.

**Explanation**: Route-specific middleware allows targeted processing, like authentication, for certain endpoints.

**Code Example**:
```javascript
const express = require('express');
const app = express();

const authMiddleware = (req, res, next) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

app.get('/protected', authMiddleware, (req, res) => res.json({ message: 'Protected route' }));

app.listen(3000);
```

---

### 12. How do you handle file uploads in Node.js?
**Scenario**: Users need to upload profile pictures to your backend.

**Answer**: Use the `multer` middleware to handle multipart/form-data for file uploads.

**Explanation**: `multer` processes file uploads, storing them on disk or in memory, and makes file data available in `req.file` or `req.files`.

**Code Example**:
```javascript
const express = require('express');
const multer = require('multer');
const app = express();

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('profilePic'), (req, res) => {
  res.json({ file: req.file });
});

app.listen(3000);
```

---

### 13. How do you implement JWT authentication?
**Scenario**: You need to secure your API with JSON Web Tokens.

**Answer**: Use the `jsonwebtoken` package to create and verify JWTs, and middleware to protect routes.

**Explanation**: JWTs encode user data and are verified with a secret key. Middleware checks for valid tokens in requests.

**Code Example**:
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const SECRET = 'mysecret';

app.post('/login', (req, res) => {
  const token = jwt.sign({ userId: 1 }, SECRET);
  res.json({ token });
});

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

app.get('/protected', auth, (req, res) => res.json({ user: req.user }));

app.listen(3000);
```

---

### 14. How do you handle password hashing in Node.js?
**Scenario**: You need to securely store user passwords in your database.

**Answer**: Use the `bcrypt` package to hash passwords before storing them.

**Explanation**: `bcrypt` securely hashes passwords with a salt, making them resistant to brute-force attacks.

**Code Example**:
```javascript
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
app.use(express.json());

app.post('/register', async (req, res) => {
  const { password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  res.json({ hash });
});

app.listen(3000);
```

---

### 15. How do you validate request data in Express.js?
**Scenario**: You need to ensure incoming user data meets specific requirements.

**Answer**: Use the `express-validator` package to validate and sanitize request data.

**Explanation**: `express-validator` provides middleware to check fields like email or required fields, returning errors if validation fails.

**Code Example**:
```javascript
const { body, validationResult } = require('express-validator');
const express = require('express');
const app = express();
app.use(express.json());

app.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  res.json({ message: 'Valid data' });
});

app.listen(3000);
```

---

### 16. How do you connect to a PostgreSQL database in Node.js?
**Scenario**: Your app needs to store relational data in PostgreSQL.

**Answer**: Use the `pg` package to connect to PostgreSQL and perform queries.

**Explanation**: The `pg` package provides a client or pool for executing SQL queries, suitable for relational data.

**Code Example**:
```javascript
const { Pool } = require('pg');
const express = require('express');
const app = express();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'myapp',
  password: 'secret',
  port: 5432
});

app.get('/users', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM users');
  res.json(rows);
});

app.listen(3000);
```

---

### 17. How do you handle async errors in Express.js?
**Scenario**: Your async route handlers throw errors that need to be caught.

**Answer**: Use a wrapper function to catch async errors and pass them to Express’s error-handling middleware.

**Explanation**: Async route handlers don’t automatically pass errors to Express. A wrapper ensures errors are caught and handled.

**Code Example**:
```javascript
const express = require('express');
const app = express();

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/data', asyncHandler(async (req, res) => {
  throw new Error('Something went wrong');
}));

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(3000);
```

---

### 18. How do you implement rate limiting in Express.js?
**Scenario**: You want to prevent abuse by limiting API requests per user.

**Answer**: Use the `express-rate-limit` package to restrict the number of requests within a time window.

**Explanation**: Rate limiting prevents DDoS attacks and abuse by limiting requests per IP or user.

**Code Example**:
```javascript
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per IP
});

app.use(limiter);

app.get('/', (req, res) => res.send('Hello'));

app.listen(3000);
```

---

### 19. How do you handle sessions in Express.js?
**Scenario**: You need to maintain user sessions for authentication.

**Answer**: Use the `express-session` package to manage session data.

**Explanation**: Sessions store user data between requests, typically in memory or a store like Redis for persistence.

**Code Example**:
```javascript
const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
}));

app.get('/login', (req, res) => {
  req.session.userId = 1;
  res.send('Logged in');
});

app.listen(3000);
```

---

### 20. How do you integrate Redis for caching in Node.js?
**Scenario**: You want to cache database query results to improve performance.

**Answer**: Use the `redis` package to connect to Redis and store/retrieve cached data.

**Explanation**: Redis is an in-memory store that reduces database load by caching frequently accessed data.

**Code Example**:
```javascript
const redis = require('redis');
const express = require('express');
const app = express();

const client = redis.createClient({ url: 'redis://localhost:6379' });
client.connect();

app.get('/data', async (req, res) => {
  const cached = await client.get('data');
  if (cached) return res.json(JSON.parse(cached));
  const data = { message: 'From DB' };
  await client.setEx('data', 3600, JSON.stringify(data));
  res.json(data);
});

app.listen(3000);
```

---

### 21. How do you handle file downloads in Express.js?
**Scenario**: Users need to download files like PDFs from your server.

**Answer**: Use `res.download()` to send files to the client.

**Explanation**: `res.download()` sets headers to prompt the client to download a file instead of displaying it.

**Code Example**:
```javascript
const express = require('express');
const app = express();

app.get('/download', (req, res) => {
  res.download('./files/report.pdf');
});

app.listen(3000);
```

---

### 22. How do you implement pagination in a Node.js API?
**Scenario**: Your API needs to return large datasets in smaller chunks.

**Answer**: Use query parameters for `page` and `limit`, and apply `skip()` and `limit()` in database queries.

**Explanation**: Pagination improves performance by limiting the data returned per request, using `skip` and `limit` for MongoDB or SQL `OFFSET` and `LIMIT`.

**Code Example**:
```javascript
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const userSchema = new mongoose.Schema({ name: String });
const User = mongoose.model('User', userSchema);

app.get('/users', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const users = await User.find().skip((page - 1) * limit).limit(limit);
  res.json(users);
});

app.listen(3000);
```

---

### 23. How do you secure HTTP headers in Express.js?
**Scenario**: You want to protect your app from common security vulnerabilities.

**Answer**: Use the `helmet` middleware to set secure HTTP headers.

**Explanation**: `helmet` sets headers like `Content-Security-Policy` and `X-XSS-Protection` to mitigate attacks like XSS or clickjacking.

**Code Example**:
```javascript
const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet());

app.get('/', (req, res) => res.send('Secure app'));

app.listen(3000);
```

---

### 24. How do you handle API versioning in Express.js?
**Scenario**: You need to introduce breaking changes to your API without affecting existing clients.

**Answer**: Use URL path versioning (e.g., `/api/v1`) or query parameters to version your API.

**Explanation**: Path versioning is common and explicit, allowing different API versions to coexist.

**Code Example**:
```javascript
const express = require('express');
const app = express();

app.get('/api/v1/users', (req, res) => res.json({ version: 'v1' }));
app.get('/api/v2/users', (req, res) => res.json({ version: 'v2' }));

app.listen(3000);
```

---

### 25. How do you implement error logging in Node.js?
**Scenario**: You need to log errors to a file for debugging.

**Answer**: Use the `winston` package to log errors to files or other transports.

**Explanation**: `winston` provides flexible logging with support for multiple transports like files, consoles, or external services.

**Code Example**:
```javascript
const winston = require('winston');
const express = require('express');
const app = express();

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ]
});

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ error: 'Server error' });
});

app.listen(3000);
```

---

### 26. How do you handle database connection pooling in Node.js?
**Scenario**: Your app needs to handle multiple concurrent database connections efficiently.

**Answer**: Use a connection pool with libraries like `pg` for PostgreSQL or Mongoose for MongoDB.

**Explanation**: Connection pooling reuses database connections, reducing overhead and improving scalability.

**Code Example**:
```javascript
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'myapp',
  password: 'secret',
  max: 20 // Max connections
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(res.rows);
});
```

---

### 27. How do you implement OAuth 2.0 in Node.js?
**Scenario**: You need to allow users to log in via Google OAuth.

**Answer**: Use the `passport` library with the `passport-google-oauth20` strategy.

**Explanation**: Passport simplifies OAuth integration by handling authentication flows and token management.

**Code Example**:
```javascript
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();

passport.use(new GoogleStrategy({
  clientID: 'your-client-id',
  clientSecret: 'your-client-secret',
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  res.json({ user: req.user });
});

app.listen(3000);
```

---

### 28. How do you handle form data in Express.js?
**Scenario**: Your app needs to process form submissions from a web page.

**Answer**: Use `express.urlencoded()` to parse form data in `req.body`.

**Explanation**: `express.urlencoded()` middleware handles `application/x-www-form-urlencoded` data, commonly used in HTML forms.

**Code Example**:
```javascript
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Received: ${name}` });
});

app.listen(3000);
```

---

### 29. How do you implement a WebSocket server in Node.js?
**Scenario**: You need real-time communication for a chat application.

**Answer**: Use the `ws` package to create a WebSocket server.

**Explanation**: WebSockets enable bidirectional communication, ideal for real-time features like chat or notifications.

**Code Example**:
```javascript
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
  ws.on('message', (message) => {
    server.clients.forEach((client) => client.send(message));
  });
});
```

---

### 30. How do you handle environment-specific configurations?
**Scenario**: Your app needs different settings for development and production.

**Answer**: Use environment variables and a configuration file to manage settings.

**Explanation**: Environment-specific configs ensure flexibility, with `NODE_ENV` determining the environment.

**Code Example**:
```javascript
const config = {
  development: { db: 'mongodb://localhost/dev' },
  production: { db: 'mongodb://prod/db' }
};

const env = process.env.NODE_ENV || 'development';
console.log(config[env].db);
```

---

### 31. How do you handle large JSON responses in Express.js?
**Scenario**: Your API returns large datasets that slow down responses.

**Answer**: Use streaming with `res.write()` or pagination to reduce response size.

**Explanation**: Streaming sends data in chunks, while pagination limits the data per request.

**Code Example**:
```javascript
const express = require('express');
const app = express();

app.get('/stream', (req, res) => {
  res.write('[');
  for (let i = 0; i < 1000; i++) {
    res.write(JSON.stringify({ id: i }) + (i < 999 ? ',' : ''));
  }
  res.write(']');
  res.end();
});

app.listen(3000);
```

---

### 32. How do you implement middleware for logging response time?
**Scenario**: You want to measure how long each request takes.

**Answer**: Create middleware to record the start time and log the duration after the response.

**Explanation**: Middleware can track request processing time by comparing timestamps before and after route handling.

**Code Example**:
```javascript
const express = require('express');
const app = express();

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`${req.method} ${req.url} - ${Date.now() - start}ms`);
  });
  next();
});

app.get('/', (req, res) => res.send('Hello'));

app.listen(3000);
```

---

### 33. How do you handle database migrations in Node.js?
**Scenario**: You need to update your database schema without losing data.

**Answer**: Use a migration tool like `knex` to manage schema changes.

**Explanation**: `knex` provides a programmatic way to define and apply schema changes, ensuring consistency across environments.

**Code Example**:
```javascript
const knex = require('knex')({
  client: 'pg',
  connection: { user: 'postgres', database: 'myapp' }
});

knex.migrate.latest({
  directory: './migrations'
});
```

---

### 34. How do you implement a health check endpoint?
**Scenario**: Your app needs an endpoint to verify server and database status.

**Answer**: Create a `/health` endpoint that checks dependencies like the database.

**Explanation**: Health checks are used by monitoring tools to ensure the app is running correctly.

**Code Example**:
```javascript
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.get('/health', async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'OK' : 'DOWN';
  res.json({ status: 'OK', database: dbStatus });
});

app.listen(3000);
```

---

### 35. How do you handle file compression in Express.js?
**Scenario**: You want to reduce response size for faster client loading.

**Answer**: Use the `compression` middleware to compress responses.

**Explanation**: Compression reduces response size using gzip, improving performance for large payloads.

**Code Example**:
```javascript
const express = require('express');
const compression = require('compression');
const app = express();

app.use(compression());

app.get('/', (req, res) => res.json({ data: 'Large dataset' }));

app.listen(3000);
```

---

### 36. How do you implement a retry mechanism for failed requests?
**Scenario**: Your app needs to retry failed API calls to an external service.

**Answer**: Use a library like `p-retry` or implement a custom retry function.

**Explanation**: Retries handle transient failures, improving reliability for external API calls.

**Code Example**:
```javascript
const fetch = require('node-fetch');
const retry = async (fn, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
};

retry(() => fetch('https://api.example.com/data'));
```

---

### 37. How do you handle background jobs in Node.js?
**Scenario**: You need to process time-consuming tasks like sending emails asynchronously.

**Answer**: Use a job queue like `bull` with Redis to manage background tasks.

**Explanation**: Job queues offload long-running tasks from the main thread, improving responsiveness.

**Code Example**:
```javascript
const Queue = require('bull');
const emailQueue = new Queue('email', 'redis://localhost:6379');

emailQueue.process(async (job) => {
  console.log(`Sending email to ${job.data.to}`);
});

emailQueue.add({ to: 'user@example.com', subject: 'Hello' });
```

---

### 38. How do you implement API documentation in Node.js?
**Scenario**: You need to provide documentation for your API endpoints.

**Answer**: Use `swagger-ui-express` and `swagger-jsdoc` to generate and serve API documentation.

**Explanation**: Swagger provides interactive API documentation based on OpenAPI specifications.

**Code Example**:
```javascript
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();

const specs = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'My API', version: '1.0.0' }
  },
  apis: ['./routes/*.js']
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(3000);
```

---

### 39. How do you handle multipart form data with validation?
**Scenario**: You need to validate file uploads and form fields together.

**Answer**: Combine `multer` for file uploads with `express-validator` for form validation.

**Explanation**: `multer` handles file uploads, while `express-validator` validates other form fields, ensuring all data is valid.

**Code Example**:
```javascript
const express = require('express');
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/profile', upload.single('avatar'), [
  body('name').notEmpty()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  res.json({ name: req.body.name, file: req.file });
});

app.listen(3000);
```

---

### 40. How do you implement a custom error class in Node.js?
**Scenario**: You need consistent error handling across your API.

**Answer**: Create a custom error class extending `Error` and use it in your routes.

**Explanation**: Custom error classes standardize error formats, making it easier to handle and respond to errors.

**Code Example**:
```javascript
class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const express = require('express');
const app = express();

app.get('/data', (req, res, next) => {
  next(new ApiError('Not found', 404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(3000);
```

---

### 41. How do you handle database transactions in Node.js?
**Scenario**: You need to ensure atomic updates across multiple MongoDB operations.

**Answer**: Use Mongoose sessions to manage transactions.

**Explanation**: Transactions ensure all operations succeed or fail together, maintaining data consistency.

**Code Example**:
```javascript
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.post('/transfer', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await User.updateOne({ _id: 'user1' }, { $inc: { balance: -100 } }, { session });
    await User.updateOne({ _id: 'user2' }, { $inc: { balance: 100 } }, { session });
    await session.commitTransaction();
    res.json({ message: 'Transfer successful' });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
});

app.listen(3000);
```

---

### 42. How do you implement role-based access control (RBAC)?
**Scenario**: Your app needs to restrict access to certain routes based on user roles.

**Answer**: Create middleware to check user roles against required permissions.

**Explanation**: RBAC restricts access based on roles (e.g., admin, user), checked in middleware before route execution.

**Code Example**:
```javascript
const express = require('express');
const app = express();

const restrictTo = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).json({ error: 'Forbidden' });
  next();
};

app.get('/admin', restrictTo('admin'), (req, res) => res.json({ message: 'Admin access' }));

app.listen(3000);
```

---

### 43. How do you handle file streaming in Node.js?
**Scenario**: You need to stream large video files to clients.

**Answer**: Use `fs.createReadStream()` to stream files and pipe them to the response.

**Explanation**: Streaming reduces memory usage by sending file chunks, ideal for large files.

**Code Example**:
```javascript
const express = require('express');
const fs = require('fs');
const app = express();

app.get('/video', (req, res) => {
  const stream = fs.createReadStream('video.mp4');
  stream.pipe(res);
});

app.listen(3000);
```

---

### 44. How do you implement a retry mechanism for database connections?
**Scenario**: Your app needs to retry MongoDB connections on failure.

**Answer**: Use a retry loop with Mongoose’s `connect` method and exponential backoff.

**Explanation**: Retries with backoff handle transient connection issues, improving reliability.

**Code Example**:
```javascript
const mongoose = require('mongoose');

async function connectWithRetry() {
  for (let i = 0; i < 5; i++) {
    try {
      await mongoose.connect('mongodb://localhost:27017/myapp');
      console.log('Connected');
      return;
    } catch (err) {
      console.error('Retry', i + 1);
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
  throw new Error('Connection failed');
}

connectWithRetry();
```

---

### 45. How do you handle API rate limiting with Redis?
**Scenario**: You want to limit API requests per user with Redis.

**Answer**: Use Redis to track request counts and `express-rate-limit` with a Redis store.

**Explanation**: Redis provides fast storage for rate-limiting counters, scalable for distributed systems.

**Code Example**:
```javascript
const express = require('express');
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redis = require('redis');
const app = express();

const client = redis.createClient({ url: 'redis://localhost:6379' });
client.connect();

const limiter = rateLimit({
  store: new RedisStore({ client }),
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

app.listen(3000);
```

---

### 46. How do you implement a custom middleware for request validation?
**Scenario**: You need to validate custom headers in all requests.

**Answer**: Create middleware to check headers and return errors if invalid.

**Explanation**: Custom middleware ensures specific requirements, like custom headers, are met before processing requests.

**Code Example**:
```javascript
const express = require('express');
const app = express();

app.use((req, res, next) => {
  if (!req.headers['x-api-key']) return res.status(400).json({ error: 'Missing API key' });
  next();
});

app.get('/', (req, res) => res.send('Valid request'));

app.listen(3000);
```

---

### 47. How do you handle large file uploads with progress tracking?
**Scenario**: Users need to upload large files and see upload progress.

**Answer**: Use `multer` with a progress-tracking library like `progress-stream`.

**Explanation**: Progress tracking enhances user experience by showing upload status for large files.

**Code Example**:
```javascript
const express = require('express');
const multer = require('multer');
const progress = require('progress-stream');
const app = express();

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  const prog = progress();
  req.pipe(prog);
  prog.on('progress', (info) => console.log(info.percentage));
  res.json({ message: 'Uploaded' });
});

app.listen(3000);
```

---

### 48. How do you implement a logging middleware with request IDs?
**Scenario**: You need to trace requests across your app with unique IDs.

**Answer**: Generate a unique ID for each request and log it with middleware.

**Explanation**: Request IDs help trace requests through logs, useful for debugging distributed systems.

**Code Example**:
```javascript
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use((req, res, next) => {
  req.requestId = uuidv4();
  console.log(`[${req.requestId}] ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => res.send('Hello'));

app.listen(3000);
```

---

### 49. How do you handle graceful shutdown in Node.js?
**Scenario**: Your app needs to close connections cleanly on shutdown.

**Answer**: Listen for `SIGTERM` and close server and database connections.

**Explanation**: Graceful shutdown ensures all operations complete before the app exits, preventing data loss.

**Code Example**:
```javascript
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const server = app.listen(3000);

process.on('SIGTERM', async () => {
  console.log('Shutting down...');
  server.close();
  await mongoose.connection.close();
  process.exit(0);
});
```

---

### 50. How do you implement a basic GraphQL server in Node.js?
**Scenario**: You want to provide a GraphQL API instead of REST.

**Answer**: Use `express-graphql` and define a schema with resolvers.

**Explanation**: GraphQL allows flexible queries, and `express-graphql` integrates it with Express.

**Code Example**:
```javascript
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = { hello: () => 'Hello, World!' };

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

app.listen(3000);
```

---