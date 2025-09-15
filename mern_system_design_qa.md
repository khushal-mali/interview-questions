# 30 Advanced System Design Questions for Large-Scale MERN Stack Projects

Each question is structured with a clear explanation of **why** it's asked in system design interviews and **how** to approach solving it using the **MERN (MongoDB, Express.js, React, Node.js)** stack.

---

## 1. Design a Scalable Social Media Platform

### Why?
Social media platforms involve high user engagement and massive read/write operations. This tests your understanding of performance optimization, relational data modeling, and scalability techniques across frontend and backend.

### How?
- **Frontend (React)**: Implement infinite scroll using pagination or cursor-based loading. Show loading skeletons to improve UX. Use lazy loading for media.
- **Backend (Node.js + Express)**: Create modular services like User, Post, Comment, and Notification. Use JWT for authentication and rate limiting middleware to prevent spam.
- **MongoDB Schema Design**:
  - `users`: { _id, username, email, followers: [], following: [] }
  - `posts`: { _id, userId, content, mediaUrl, likesCount, commentsCount, createdAt }
  - `comments`: { _id, postId, userId, comment, createdAt }
- **Feed Generation**:
  - Use fan-out on write for faster reads (push post to followers’ feed).
  - Cache the latest posts in Redis for quicker access.
- **Media Storage**: Upload media to AWS S3 using signed URLs to avoid passing large files through your backend.
- **Scaling**:
  - Horizontal scaling of Node.js servers behind a load balancer.
  - MongoDB sharding and indexing for performance.
  - Use CDN for media delivery.

---

## 2. Design a Real-Time Chat Application

### Why?
Tests real-time communication handling, stateful connections via WebSockets, data persistence, and message synchronization.

### How?
- **Frontend**: Use `socket.io-client` to connect to server. Render chat list, conversation view, typing indicators.
- **Backend**:
  - Use Express + Socket.io for bi-directional real-time comms.
  - Implement message queueing for offline users.
  - Use REST APIs for chat history and Socket.io for real-time exchange.
- **MongoDB Schema**:
  - `users`: { _id, username, onlineStatus }
  - `messages`: { _id, senderId, receiverId/groupId, content, timestamp, status }
  - `conversations`: { _id, members: [], lastMessage }
- **Redis for Pub/Sub**:
  - Sync socket events across multiple instances.
  - Store temporary message state or typing indicators.
- **Scalability**:
  - Sticky sessions or token-based reconnection.
  - Deploy behind a WebSocket-capable load balancer.

---

## 3. Design an E-Commerce Platform

### Why?
Tests transactional consistency, product and order flows, search and filtering, and secure payment handling.

### How?
- **Frontend (React)**: Use dynamic routing for product pages, maintain cart state with Redux or Context API.
- **Backend**:
  - Create APIs for product listing, cart management, and order processing.
  - Integrate payment gateways like Stripe.
- **MongoDB Schema**:
  - `products`: { _id, name, price, stock, category, images }
  - `users`: { _id, name, email, addresses }
  - `orders`: { _id, userId, items, totalAmount, paymentStatus, shippingStatus }
  - `carts`: { userId, products[] }
- **Checkout Flow**:
  - Lock inventory on checkout start.
  - Deduct stock on payment confirmation (with MongoDB transactions).
  - Send confirmation email using services like SendGrid.
- **Scalability**:
  - Redis cache for trending or recently viewed products.
  - ElasticSearch for full-text search.

---

## 4. Design a Multi-Tenant SaaS Platform

### Why?
Evaluates your ability to build applications where multiple clients (tenants) can use the same infrastructure with isolated data and performance.

### How?
- **Tenant Isolation**:
  - Include `tenantId` in every collection document.
  - Use middleware to inject tenant context in DB queries.
- **Frontend**:
  - Display tenant-specific branding via subdomain (e.g., `tenantA.app.com`).
- **Authentication**:
  - Use JWTs with embedded tenant claims.
- **Scaling**:
  - Vertical (shared DB, different collections) or horizontal (separate DB per tenant).
  - Per-tenant rate limiting using Redis.

---

## 5. Design a Collaborative Document Editor

### Why?
Assesses real-time synchronization, document versioning, and operational transform handling.

### How?
- **Frontend**: Use rich text editors (like Slate.js). Track cursor positions.
- **Backend**:
  - Use Socket.io for live collaboration.
  - Implement Operational Transform (OT) or CRDTs for sync.
- **MongoDB Schema**:
  - `documents`: { _id, content, ownerId, editors: [] }
  - `versions`: { docId, changes[], timestamp }
- **Redis**:
  - Temporary state, user cursors.
  - Pub/Sub for broadcasting updates.
- **Conflict Handling**:
  - Lock sections or merge intelligently.

---

## 6. Design a Notification System

### Why?
Tests your ability to manage async background jobs, delivery mechanisms, user preferences, and batching logic.

### How?
- **MongoDB Schema**:
  - `notifications`: { _id, userId, type, payload, read: false }
- **Job Queue**:
  - Use BullMQ with Redis to schedule and retry jobs.
  - Send real-time alerts (via WebSockets) or batch email/push notifications.
- **User Preferences**:
  - `userSettings`: store notification preferences (email, SMS, etc.)
- **Delivery**:
  - Integrate with services like Firebase, SendGrid, Twilio.

---

## 7. Design a File Upload and Management System

### Why?
Evaluates handling of large file uploads, cloud storage integration, secure access, and metadata tracking.

### How?
- **Frontend**:
  - Use pre-signed S3 URLs to upload files directly from the browser.
  - Show upload progress via HTML5 APIs.
- **Backend**:
  - Generate signed URLs from AWS SDK.
  - Store metadata (file type, size, tags) in MongoDB.
- **MongoDB Schema**:
  - `files`: { _id, ownerId, filename, s3Url, mimeType, size, createdAt }
- **Security**:
  - Validate MIME types.
  - Periodic virus scanning with Lambda.

---

## 8. Design a User Role and Permissions System

### Why?
Fundamental to security, especially in admin dashboards and multi-user systems.

### How?
- **MongoDB Schema**:
  - `roles`: { _id, name, permissions: [] }
  - `users`: { _id, roleId }
- **Permissions Enforcement**:
  - Middleware in Express to guard routes.
  - Use React guards (e.g., HOCs) to show/hide UI elements.
- **Custom Permissions**:
  - Allow admin to define role-permission mappings dynamically.

---

## 9. Design a Rate Limiting System

### Why?
Prevents abuse and ensures fair usage of APIs.

### How?
- Use Redis to store request counters per IP/user.
- Choose algorithm:
  - Fixed window: Simple but can spike.
  - Sliding window/log: More accurate.
  - Token bucket/leaky bucket: Smooth requests.
- Middleware:
  - Integrate in Express middleware.
  - Respond with 429 Too Many Requests.

---

## 10. Design a Logging and Monitoring System

### Why?
Essential for observability, debugging, and alerting in production systems.

### How?
- **Logging**:
  - Use Winston or Pino for structured logs.
  - Send logs to ELK (Elasticsearch, Logstash, Kibana) or Loki.
- **Monitoring**:
  - Use Prometheus to gather metrics (CPU, memory, request rate).
  - Grafana for visualizing alerts.
- **MongoDB**:
  - Store application-level events (e.g., logins, errors).
  - Ensure logs don’t overwhelm the main DB (use TTL indexes).

---

_Stay tuned for the next 20 questions._

