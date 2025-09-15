# 100 Node.js Backend Scenario-Based Questions for Scaling and Industry-Grade Features: Part 1 (Questions 1–50)

This document provides detailed answers to the first 50 of 100 scenario-based questions about scaling a Node.js backend and implementing industry-grade features. Each question presents a practical scenario, followed by a detailed answer, explanation, and code example (where applicable). Topics include horizontal scaling, microservices, containerization, CI/CD, monitoring, security, and high-availability practices.

## Table of Contents
1. **Horizontal and Vertical Scaling**
2. **Load Balancing**
3. **Microservices Architecture**
4. **Containerization and Orchestration**
5. **CI/CD Pipelines**
6. **Monitoring and Logging**
7. **Security**
8. **High Availability and Fault Tolerance**
9. **Performance Optimization**
10. **Best Practices**

---

## 1. Horizontal and Vertical Scaling

### 1. How do you scale a Node.js backend to handle increased traffic?
**Scenario**: Your API is experiencing high traffic, causing slow responses.

**Answer**: Implement horizontal scaling by running multiple Node.js instances with a load balancer, or vertical scaling by upgrading server resources.

**Explanation**: Horizontal scaling adds more servers (instances) to distribute load, while vertical scaling increases resources (CPU, RAM) on a single server. Node.js’s single-threaded nature makes horizontal scaling more effective, often using clustering or containerization.

**Code Example**:
```javascript
const express = require('express');
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  app.get('/', (req, res) => res.send('Hello'));
  app.listen(3000);
}
```

---

### 2. How do you implement clustering in Node.js?
**Scenario**: Your app needs to utilize multiple CPU cores to handle concurrent requests.

**Answer**: Use the `cluster` module to fork multiple Node.js processes.

**Explanation**: Clustering creates worker processes to handle requests, leveraging multiple CPU cores for better performance.

**Code Example**:
```javascript
const cluster = require('cluster');
const express = require('express');

if (cluster.isMaster) {
  const numCPUs = require('os').cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  app.get('/', (req, res) => res.send(`Worker ${process.pid}`));
  app.listen(3000);
}
```

---

### 3. How do you handle session persistence in a clustered Node.js app?
**Scenario**: Your clustered app loses user sessions across workers.

**Answer**: Store sessions in a shared store like Redis to ensure persistence across workers.

**Explanation**: A shared session store ensures all workers access the same session data, maintaining user state.

**Code Example**:
```javascript
const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const app = express();

const client = redis.createClient({ url: 'redis://localhost:6379' });
client.connect();

app.use(session({
  store: new RedisStore({ client }),
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
}));

app.get('/', (req, res) => {
  req.session.views = (req.session.views || 0) + 1;
  res.send(`Views: ${req.session.views}`);
});

app.listen(3000);
```

---

### 4. How do you implement a load balancer for a Node.js app?
**Scenario**: Your app needs to distribute traffic across multiple instances.

**Answer**: Use a reverse proxy like Nginx or a cloud load balancer (e.g., AWS ELB).

**Explanation**: Load balancers distribute incoming requests to multiple backend instances, improving scalability and reliability.

**Code Example** (Nginx configuration):
```
http {
  upstream backend {
    server localhost:3001;
    server localhost:3002;
  }
  server {
    listen 80;
    location / {
      proxy_pass http://backend;
    }
  }
}
```

---

### 5. How do you scale database connections in a Node.js app?
**Scenario**: High traffic causes database connection issues.

**Answer**: Use connection pooling with Mongoose or a similar library.

**Explanation**: Connection pooling reuses database connections, reducing overhead and handling concurrent requests efficiently.

**Code Example**:
```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp', {
  maxPoolSize: 20,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected'));
```

---

## 2. Load Balancing

### 6. How do you configure sticky sessions with a load balancer?
**Scenario**: Your app requires sessions to be routed to the same server instance.

**Answer**: Configure sticky sessions in the load balancer (e.g., Nginx with `ip_hash`).

**Explanation**: Sticky sessions ensure requests from the same client go to the same server, maintaining session state without a shared store.

**Code Example** (Nginx):
```
http {
  upstream backend {
    ip_hash;
    server localhost:3001;
    server localhost:3002;
  }
  server {
    listen 80;
    location / {
      proxy_pass http://backend;
    }
  }
}
```

---

### 7. How do you handle health checks for load-balanced instances?
**Scenario**: Your load balancer needs to route traffic only to healthy instances.

**Answer**: Implement a `/health` endpoint to report instance status.

**Explanation**: Health checks allow the load balancer to remove unhealthy instances from the rotation.

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

### 8. How do you implement rate limiting across multiple instances?
**Scenario**: Your app needs consistent rate limiting across all instances.

**Answer**: Use a centralized store like Redis with `express-rate-limit`.

**Explanation**: A shared Redis store ensures rate limits are enforced consistently across distributed instances.

**Code Example**:
```javascript
const express = require('express');
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redis = require('redis');
const app = express();

const client = redis.createClient({ url: 'redis://localhost:6379' });
client.connect();

app.use(rateLimit({
  store: new RedisStore({ client }),
  windowMs: 15 * 60 * 1000,
  max: 100
}));

app.get('/', (req, res) => res.send('Hello'));

app.listen(3000);
```

---

### 9. How do you handle failover in a load-balanced Node.js app?
**Scenario**: One of your app instances fails, and you need to redirect traffic.

**Answer**: Configure the load balancer to detect failures via health checks and route traffic to healthy instances.

**Explanation**: Load balancers like AWS ELB or Nginx can remove failed instances based on health check responses.

**Code Example** (Nginx):
```
http {
  upstream backend {
    server localhost:3001;
    server localhost:3002;
  }
  server {
    listen 80;
    location /health {
      proxy_pass http://backend;
    }
    location / {
      proxy_pass http://backend;
    }
  }
}
```

---

### 10. How do you monitor load balancer performance?
**Scenario**: You need to ensure your load balancer is distributing traffic efficiently.

**Answer**: Use monitoring tools like Prometheus and Grafana to track metrics like request rates and latency.

**Explanation**: Prometheus collects metrics from the load balancer or app, and Grafana visualizes them for analysis.

**Code Example**:
```javascript
const express = require('express');
const prom = require('prom-client');
const app = express();

const counter = new prom.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests'
});

app.use((req, res, next) => {
  counter.inc();
  next();
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', prom.register.contentType);
  res.end(await prom.register.metrics());
});

app.listen(3000);
```

---

## 3. Microservices Architecture

### 11. How do you split a monolithic Node.js app into microservices?
**Scenario**: Your monolithic app is becoming hard to maintain and scale.

**Answer**: Refactor the app into independent services, each with its own routes, database, and API.

**Explanation**: Microservices break down functionality into smaller, independent units, improving scalability and maintainability.

**Code Example** (User Service):
```javascript
const express = require('express');
const app = express();
app.use(express.json());

app.get('/users', (req, res) => res.json([{ id: 1, name: 'Alice' }]));

app.listen(3001);
```

---

### 12. How do you implement inter-service communication in Node.js?
**Scenario**: Your microservices need to exchange data.

**Answer**: Use HTTP/REST, message queues (e.g., RabbitMQ), or gRPC for communication.

**Explanation**: HTTP is simple for synchronous communication, while message queues handle asynchronous tasks.

**Code Example** (HTTP):
```javascript
const express = require('express');
const axios = require('axios');
const app = express();

app.get('/order', async (req, res) => {
  const user = await axios.get('http://user-service:3001/users/1');
  res.json({ order: { id: 1, user: user.data } });
});

app.listen(3002);
```

---

### 13. How do you use a message queue for asynchronous communication?
**Scenario**: Your order service needs to notify the inventory service asynchronously.

**Answer**: Use a message queue like RabbitMQ with the `amqplib` package.

**Explanation**: Message queues decouple services, allowing reliable asynchronous communication.

**Code Example**:
```javascript
const amqp = require('amqplib');

async function publish() {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  await channel.assertQueue('orders');
  channel.sendToQueue('orders', Buffer.from(JSON.stringify({ id: 1 })));
}

publish();
```

---

### 14. How do you handle service discovery in a microservices architecture?
**Scenario**: Your services need to locate each other dynamically.

**Answer**: Use a service registry like Consul or Eureka, or leverage Kubernetes service discovery.

**Explanation**: Service discovery enables services to find each other without hardcoding addresses, supporting dynamic scaling.

**Code Example** (Consul):
```javascript
const consul = require('consul')();
consul.agent.service.register({
  name: 'user-service',
  address: 'localhost',
  port: 3001
}, (err) => {
  if (err) console.error(err);
  console.log('Service registered');
});
```

---

### 15. How do you implement API gateway in a Node.js microservices architecture?
**Scenario**: You need a single entry point for all microservices.

**Answer**: Use Express.js to create an API gateway that routes requests to appropriate services.

**Explanation**: An API gateway simplifies client interactions and handles cross-cutting concerns like authentication.

**Code Example**:
```javascript
const express = require('express');
const httpProxy = require('http-proxy-middleware');
const app = express();

app.use('/users', httpProxy({ target: 'http://user-service:3001', changeOrigin: true }));
app.use('/orders', httpProxy({ target: 'http://order-service:3002', changeOrigin: true }));

app.listen(3000);
```

---

## 4. Containerization and Orchestration

### 16. How do you containerize a Node.js app with Docker?
**Scenario**: You need to deploy your app consistently across environments.

**Answer**: Create a `Dockerfile` to define the app’s environment and dependencies.

**Explanation**: Docker ensures consistent environments by packaging the app with its dependencies.

**Code Example** (Dockerfile):
```dockerfile
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
```

---

### 17. How do you orchestrate multiple Node.js services with Kubernetes?
**Scenario**: You need to manage multiple containerized services with automatic scaling.

**Answer**: Use Kubernetes deployments and services to manage and scale containers.

**Explanation**: Kubernetes orchestrates containers, handling scaling, load balancing, and failover.

**Code Example** (Kubernetes Deployment):
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: node-app
  template:
    metadata:
      labels:
        app: node-app
    spec:
      containers:
      - name: node-app
        image: node-app:latest
        ports:
        - containerPort: 3000
```

---

### 18. How do you handle secrets in a containerized Node.js app?
**Scenario**: Your app needs secure access to sensitive data like API keys.

**Answer**: Use Kubernetes secrets or Docker secrets to manage sensitive data.

**Explanation**: Secrets store sensitive data securely, avoiding hardcoding in source code.

**Code Example** (Kubernetes Secret):
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  api-key: c2VjcmV0LWtleQ== # base64 encoded
```

---

### 19. How do you optimize Docker images for Node.js apps?
**Scenario**: Your Docker images are too large, slowing down deployments.

**Answer**: Use multi-stage builds and minimal base images like `node:alpine`.

**Explanation**: Multi-stage builds reduce image size by separating build and runtime environments.

**Code Example** (Dockerfile):
```dockerfile
FROM node:16 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --production
CMD ["node", "dist/app.js"]
```

---

### 20. How do you handle rolling updates in Kubernetes for a Node.js app?
**Scenario**: You need to deploy updates without downtime.

**Answer**: Use Kubernetes rolling updates with a `Deployment` configuration.

**Explanation**: Rolling updates deploy new versions gradually, ensuring zero downtime.

**Code Example**:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-app
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  replicas: 3
  template:
    spec:
      containers:
      - name: node-app
        image: node-app:v2
```

---

## 5. CI/CD Pipelines

### 21. How do you set up a CI/CD pipeline for a Node.js app?
**Scenario**: You need automated testing and deployment for your app.

**Answer**: Use GitHub Actions to run tests and deploy to a cloud provider.

**Explanation**: CI/CD pipelines automate testing, building, and deployment, ensuring consistent releases.

**Code Example** (GitHub Actions):
```yaml
name: CI/CD
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
      with:
        node-version: '16'
    - run: npm install
    - run: npm test
    - run: npm run build
```

---

### 22. How do you automate Docker image builds in a CI/CD pipeline?
**Scenario**: You need to build and push Docker images automatically.

**Answer**: Use a CI/CD tool to build and push images to a registry like Docker Hub.

**Explanation**: Automating image builds ensures consistent and repeatable deployments.

**Code Example** (GitHub Actions):
```yaml
name: Build Docker
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - run: docker build -t myapp:latest .
    - run: docker login -u ${{ secrets.DOCKER_USER }} -p ${{ secrets.DOCKER_PASS }}
    - run: docker push myapp:latest
```

---

### 23. How do you implement blue-green deployments for a Node.js app?
**Scenario**: You need zero-downtime deployments with rollback capability.

**Answer**: Use Kubernetes to switch traffic between blue and green environments.

**Explanation**: Blue-green deployments run two identical environments, switching traffic to the new version after validation.

**Code Example** (Kubernetes Service):
```yaml
apiVersion: v1
kind: Service
metadata:
  name: node-app
spec:
  selector:
    app: node-app
    version: blue
  ports:
  - port: 80
    targetPort: 3000
```

---

### 24. How do you handle automated testing in a CI/CD pipeline?
**Scenario**: You need to ensure code quality before deployment.

**Answer**: Use Jest for unit tests and integrate them into your CI/CD pipeline.

**Explanation**: Automated tests catch bugs early, ensuring reliable deployments.

**Code Example** (Jest Test):
```javascript
const sum = (a, b) => a + b;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

---

### 25. How do you deploy a Node.js app to AWS ECS?
**Scenario**: You need to deploy your app to a managed container service.

**Answer**: Use AWS ECS with a task definition and service to run Dockerized Node.js apps.

**Explanation**: ECS manages container orchestration, simplifying deployment and scaling.

**Code Example** (ECS Task Definition):
```json
{
  "family": "node-app",
  "containerDefinitions": [
    {
      "name": "node-app",
      "image": "myapp:latest",
      "portMappings": [
        { "containerPort": 3000, "hostPort": 3000 }
      ]
    }
  ]
}
```

---

## 6. Monitoring and Logging

### 26. How do you monitor a Node.js app with Prometheus and Grafana?
**Scenario**: You need to track metrics like request latency and error rates.

**Answer**: Use `prom-client` to expose metrics and visualize them in Grafana.

**Explanation**: Prometheus collects metrics, and Grafana provides dashboards for visualization.

**Code Example**:
```javascript
const express = require('express');
const prom = require('prom-client');
const app = express();

const latency = new prom.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Request latency'
});

app.use((req, res, next) => {
  const end = latency.startTimer();
  res.on('finish', () => end());
  next();
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', prom.register.contentType);
  res.end(await prom.register.metrics());
});

app.listen(3000);
```

---

### 27. How do you implement distributed logging in a Node.js app?
**Scenario**: You need to aggregate logs from multiple microservices.

**Answer**: Use Winston with a transport like `winston-loki` to send logs to Grafana Loki.

**Explanation**: Distributed logging centralizes logs for easier analysis and debugging.

**Code Example**:
```javascript
const winston = require('winston');
const { LokiTransport } = require('winston-loki');

const logger = winston.createLogger({
  transports: [
    new LokiTransport({
      host: 'http://loki:3100',
      labels: { app: 'node-app' }
    })
  ]
});

logger.info('Application started');
```

---

### 28. How do you implement request tracing in a Node.js app?
**Scenario**: You need to trace requests across microservices.

**Answer**: Use OpenTelemetry to instrument your app and send traces to Jaeger.

**Explanation**: OpenTelemetry provides standardized tracing, and Jaeger visualizes request flows.

**Code Example**:
```javascript
const opentelemetry = require('@opentelemetry/sdk-node');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

const sdk = new opentelemetry.NodeSDK({
  traceExporter: new JaegerExporter({ endpoint: 'http://jaeger:14268/api/traces' })
});

sdk.start();
```

---

### 29. How do you monitor database performance in a Node.js app?
**Scenario**: You need to identify slow database queries.

**Answer**: Use MongoDB’s profiling or a tool like New Relic to monitor query performance.

**Explanation**: Database profiling identifies slow queries, enabling optimization.

**Code Example** (MongoDB Profiling):
```javascript
const mongoose = require('mongoose');

mongoose.connection.db.command({ profile: 1, slowms: 100 });
```

---

### 30. How do you implement alerting for Node.js app failures?
**Scenario**: You need to be notified when your app or services fail.

**Answer**: Use Prometheus Alertmanager to send alerts based on metrics.

**Explanation**: Alertmanager sends notifications (e.g., email, Slack) when thresholds are breached.

**Code Example** (Prometheus Alert Rule):
```yaml
groups:
- name: example
  rules:
  - alert: HighErrorRate
    expr: rate(http_requests_total{status="500"}[5m]) > 0.01
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "High error rate detected"
```

---

## 7. Security

### 31. How do you secure a Node.js app against SQL injection?
**Scenario**: Your app uses PostgreSQL and is vulnerable to SQL injection.

**Answer**: Use parameterized queries with the `pg` package.

**Explanation**: Parameterized queries prevent malicious input from altering query logic.

**Code Example**:
```javascript
const { Pool } = require('pg');
const pool = new Pool({ user: 'postgres', database: 'myapp' });

app.get('/users', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [req.query.id]);
  res.json(rows);
});
```

---

### 32. How do you protect against XSS in a Node.js app?
**Scenario**: User input is displayed without sanitization, risking XSS attacks.

**Answer**: Use `sanitize-html` to clean user input before rendering.

**Explanation**: Sanitizing input removes malicious scripts, preventing XSS attacks.

**Code Example**:
```javascript
const express = require('express');
const sanitizeHtml = require('sanitize-html');
const app = express();
app.use(express.json());

app.post('/comment', (req, res) => {
  const cleanComment = sanitizeHtml(req.body.comment);
  res.json({ comment: cleanComment });
});

app.listen(3000);
```

---

### 33. How do you implement rate limiting with user-specific quotas?
**Scenario**: You need to limit API usage per user, not just per IP.

**Answer**: Use Redis to track user-specific request counts.

**Explanation**: User-specific rate limiting ensures fair usage across authenticated users.

**Code Example**:
```javascript
const express = require('express');
const redis = require('redis');
const app = express();
app.use(express.json());

const client = redis.createClient({ url: 'redis://localhost:6379' });
client.connect();

app.use(async (req, res, next) => {
  const userId = req.body.userId || 'anonymous';
  const count = await client.incr(userId);
  if (count === 1) await client.expire(userId, 60);
  if (count > 10) return res.status(429).json({ error: 'Rate limit exceeded' });
  next();
});

app.get('/', (req, res) => res.send('Hello'));

app.listen(3000);
```

---

### 34. How do you secure sensitive data in environment variables?
**Scenario**: Your app’s environment variables are exposed in logs.

**Answer**: Use a secrets management tool like AWS Secrets Manager or `dotenv-vault`.

**Explanation**: Secrets management tools securely store and retrieve sensitive data, avoiding exposure.

**Code Example**:
```javascript
require('dotenv').config();

const dbPassword = process.env.DB_PASSWORD;
console.log('Connecting with password:', dbPassword);
```

---

### 35. How do you implement JWT refresh tokens in Node.js?
**Scenario**: You need to maintain user sessions securely with JWTs.

**Answer**: Issue short-lived access tokens and long-lived refresh tokens stored in Redis.

**Explanation**: Refresh tokens allow secure session renewal without frequent logins.

**Code Example**:
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const redis = require('redis');
const app = express();
app.use(express.json());

const client = redis.createClient({ url: 'redis://localhost:6379' });
client.connect();

app.post('/refresh', async (req, res) => {
  const refreshToken = req.body.refreshToken;
  const stored = await client.get(refreshToken);
  if (!stored) return res.status(401).json({ error: 'Invalid refresh token' });
  const user = jwt.verify(refreshToken, 'refresh-secret');
  const accessToken = jwt.sign({ userId: user.userId }, 'access-secret', { expiresIn: '15m' });
  res.json({ accessToken });
});

app.listen(3000);
```

---

## 8. High Availability and Fault Tolerance

### 36. How do you ensure high availability in a Node.js app?
**Scenario**: Your app must remain available during server failures.

**Answer**: Deploy multiple instances across availability zones with a load balancer.

**Explanation**: High availability requires redundancy and failover mechanisms to handle failures.

**Code Example** (AWS ELB Setup):
```yaml
Resources:
  LoadBalancer:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Subnets:
        - subnet-1
        - subnet-2
```

---

### 37. How do you implement circuit breakers in Node.js?
**Scenario**: Your app depends on an unreliable external service.

**Answer**: Use the `opossum` library to implement circuit breakers.

**Explanation**: Circuit breakers prevent cascading failures by stopping requests to failing services.

**Code Example**:
```javascript
const CircuitBreaker = require('opossum');
const fetch = require('node-fetch');

const breaker = new CircuitBreaker(() => fetch('https://api.example.com/data'), {
  timeout: 1000,
  maxFailures: 3
});

breaker.fallback(() => ({ error: 'Service unavailable' }));
breaker.fire().then(console.log).catch(console.error);
```

---

### 38. How do you handle database failover in MongoDB?
**Scenario**: Your MongoDB primary node fails, disrupting service.

**Answer**: Use a MongoDB replica set with Mongoose for automatic failover.

**Explanation**: Replica sets provide redundancy, automatically promoting a secondary node on primary failure.

**Code Example**:
```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://primary:27017,secondary:27017/myapp?replicaSet=rs0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected'));
```

---

### 39. How do you implement graceful shutdown in a Node.js app?
**Scenario**: Your app needs to close connections cleanly during restarts.

**Answer**: Handle `SIGTERM` to close server and database connections.

**Explanation**: Graceful shutdown ensures all operations complete, preventing data loss.

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

### 40. How do you handle database connection retries in a Node.js app?
**Scenario**: Your app needs to retry MongoDB connections on failure.

**Answer**: Implement exponential backoff with Mongoose’s `connect` method.

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
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
  throw new Error('Connection failed');
}

connectWithRetry();
```

---

## 9. Performance Optimization

### 41. How do you optimize Node.js app performance with caching?
**Scenario**: Your API is slow due to repeated database queries.

**Answer**: Use Redis for caching frequently accessed data.

**Explanation**: Caching reduces database load by storing results in memory.

**Code Example**:
```javascript
const express = require('express');
const redis = require('redis');
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

### 42. How do you optimize database queries in a Node.js app?
**Scenario**: Your MongoDB queries are slowing down your API.

**Answer**: Use indexes, `lean()`, and selective fields in Mongoose queries.

**Explanation**: Indexes speed up searches, `lean()` reduces overhead, and field selection minimizes data transfer.

**Code Example**:
```javascript
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({ name: String, email: String });
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

app.get('/users', async (req, res) => {
  const users = await User.find({ email: req.query.email }).select('name').lean();
  res.json(users);
});
```

---

### 43. How do you implement request batching in a Node.js app?
**Scenario**: Your API receives multiple similar requests that can be combined.

**Answer**: Use a batching middleware to combine requests and process them together.

**Explanation**: Batching reduces the number of database or external calls, improving performance.

**Code Example**:
```javascript
const express = require('express');
const app = express();
app.use(express.json());

const batch = [];
app.use((req, res, next) => {
  if (req.path === '/batch') {
    batch.push(req.body);
    if (batch.length >= 5) {
      res.json(batch);
      batch.length = 0;
    } else {
      res.status(202).send('Batching');
    }
  } else {
    next();
  }
});

app.listen(3000);
```

---

### 44. How do you optimize Node.js app startup time?
**Scenario**: Your app takes too long to start due to heavy initialization.

**Answer**: Lazy-load dependencies and defer non-critical tasks.

**Explanation**: Lazy loading reduces startup time by loading dependencies only when needed.

**Code Example**:
```javascript
const express = require('express');
const app = express();

let db;
app.get('/data', async (req, res) => {
  if (!db) db = require('./db'); // Lazy load
  res.json(await db.getData());
});

app.listen(3000);
```

---

### 45. How do you handle large dataset streaming in a Node.js API?
**Scenario**: Your API needs to return large datasets without crashing.

**Answer**: Use streaming with `res.write()` or a library like `JSONStream`.

**Explanation**: Streaming sends data in chunks, reducing memory usage.

**Code Example**:
```javascript
const express = require('express');
const JSONStream = require('JSONStream');
const app = express();

app.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const stream = JSONStream.stringify();
  stream.pipe(res);
  for (let i = 0; i < 1000; i++) stream.write({ id: i });
  stream.end();
});

app.listen(3000);
```

---

## 10. Best Practices

### 46. How do you structure a Node.js app for maintainability?
**Scenario**: Your app is growing, and code is becoming hard to manage.

**Answer**: Use a modular structure with separate directories for routes, controllers, services, and models.

**Explanation**: Modular structures separate concerns, improving maintainability and scalability.

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
│   └── app.js
```

---

### 47. How do you implement centralized error handling in a Node.js app?
**Scenario**: You need consistent error responses across your API.

**Answer**: Use a custom error middleware to handle all errors.

**Explanation**: Centralized error handling ensures uniform error responses, simplifying client-side error handling.

**Code Example**:
```javascript
const express = require('express');
const app = express();

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

app.get('/error', (req, res, next) => {
  next(new Error('Something went wrong'));
});

app.listen(3000);
```

---

### 48. How do you implement environment-specific configurations?
**Scenario**: Your app needs different settings for development, staging, and production.

**Answer**: Use environment variables and a configuration module.

**Explanation**: Environment-specific configs ensure flexibility and security across environments.

**Code Example**:
```javascript
const config = {
  development: { db: 'mongodb://localhost/dev' },
  production: { db: 'mongodb://prod/db' }
};

module.exports = config[process.env.NODE_ENV || 'development'];
```

---

### 49. How do you handle API versioning in a Node.js app?
**Scenario**: You need to introduce breaking changes without affecting existing clients.

**Answer**: Use URL path versioning or headers to manage API versions.

**Explanation**: Path versioning is explicit and widely used, allowing multiple API versions to coexist.

**Code Example**:
```javascript
const express = require('express');
const app = express();

app.get('/api/v1/users', (req, res) => res.json({ version: 'v1' }));
app.get('/api/v2/users', (req, res) => res.json({ version: 'v2' }));

app.listen(3000);
```

---

### 50. How do you implement a health monitoring system for microservices?
**Scenario**: You need to monitor the health of multiple microservices.

**Answer**: Implement health check endpoints and aggregate them with a monitoring tool.

**Explanation**: Health checks provide status updates for each service, enabling proactive issue detection.

**Code Example**:
```javascript
const express = require('express');
const app = express();

app.get('/health', async (req, res) => {
  const dependencies = { db: 'OK', redis: 'OK' }; // Check dependencies
  res.json({ status: 'OK', dependencies });
});

app.listen(3000);
```

---