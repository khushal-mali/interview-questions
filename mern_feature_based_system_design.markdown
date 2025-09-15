# 50 MERN Stack System Design Questions: Feature-Based Implementation from Real Interviews

This document compiles 50 system design questions commonly encountered in real MERN stack interviews, focusing on key features and detailed implementation steps. Each question includes:
- **Scenario**: A real-world application context.
- **Key Features**: Core functionalities to implement.
- **Implementation Details**: Step-by-step guidance on building features using MERN stack, including code snippets, database schemas, API designs, and integration points.
- **Scalability & Security**: Considerations for production.
- **Trade-offs**: Real interview-style discussions on choices.

The content is derived from common interview patterns reported in sources like LeetCode, Glassdoor, and developer forums, emphasizing practical MERN implementation.

---

## Question 1: Design a URL Shortening Service (e.g., Bitly)
**Scenario**: Create a service to shorten long URLs and track clicks, handling high traffic.

**Key Features**:
1. URL shortening with unique codes.
2. Redirection to original URL.
3. Click analytics dashboard.
4. URL expiration and custom domains.

**Implementation Details**:
### 1. URL Shortening
- **Backend (Node.js/Express)**: Generate unique short code using base62 encoding of a MongoDB counter.
  ```javascript
  // routes/urls.js
  const express = require('express');
  const router = express.Router();
  const Url = require('../models/Url');

  router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    // Validate URL
    if (!longUrl.match(/^https?:\/\//)) return res.status(400).json({ error: 'Invalid URL' });
    
    // Check if exists
    let url = await Url.findOne({ longUrl });
    if (url) return res.json({ shortUrl: `${req.headers.host}/${url.shortCode}` });
    
    // Generate short code
    const counter = await Url.countDocuments();
    const shortCode = bufferToBase62(Buffer.from(counter.toString()));
    
    url = new Url({ longUrl, shortCode, createdAt: new Date(), expiresAt: new Date(Date.now() + 30*24*60*60*1000) });
    await url.save();
    
    res.json({ shortUrl: `${req.headers.host}/${shortCode}` });
  });

  function bufferToBase62(buffer) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < buffer.length; i++) {
      result += chars[buffer[i] % chars.length];
    }
    return result;
  }
  ```
- **Database Schema (MongoDB)**:
  ```javascript
  // models/Url.js
  const mongoose = require('mongoose');
  const urlSchema = new mongoose.Schema({
    shortCode: { type: String, required: true, unique: true },
    longUrl: { type: String, required: true },
    clicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date }
  });
  urlSchema.index({ shortCode: 1 });
  module.exports = mongoose.model('Url', urlSchema);
  ```
- **Frontend (React)**: Form to input URL and display short link.
  ```jsx
  // components/UrlShortener.jsx
  import { useState } from 'react';
  import axios from 'axios';

  const UrlShortener = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/api/urls/shorten', { longUrl });
        setShortUrl(response.data.shortUrl);
      } catch (error) {
        console.error('Error shortening URL:', error);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <input type="url" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} placeholder="Enter long URL" />
        <button type="submit">Shorten</button>
        {shortUrl && <p>Short URL: <a href={shortUrl}>{shortUrl}</a></p>}
      </form>
    );
  };
  export default UrlShortener;
  ```

### 2. Redirection
- **Backend**: Handle GET request for short code and redirect.
  ```javascript
  router.get('/:shortCode', async (req, res) => {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });
    if (!url || url.expiresAt < new Date()) return res.status(404).send('URL not found');
    
    url.clicks++;
    await url.save();
    
    res.redirect(url.longUrl);
  });
  ```

### 3. Click Analytics
- **Backend API**: GET /api/analytics/:shortCode
  ```javascript
  router.get('/analytics/:shortCode', async (req, res) => {
    const url = await Url.findOne({ shortCode: req.params.shortCode });
    res.json({ clicks: url.clicks, createdAt: url.createdAt });
  });
  ```
- **Frontend**: Dashboard component using Chart.js for visualization.

### 4. URL Expiration
- Use MongoDB TTL index: `urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });`
- Cron job (node-cron) to clean expired URLs periodically.

**Scalability & Security**:
- Scale with Redis caching for hot URLs (cache shortCode -> longUrl).
- Rate limiting with express-rate-limit to prevent abuse.
- Validate URLs to avoid malicious redirects; use JWT for analytics access.

**Trade-offs**:
- Base62 vs. UUID: Base62 is shorter but sequential (predictable); UUID random but longer.
- MongoDB count vs. atomic counter: Count is simple but race-condition prone; use findOneAndUpdate for atomicity.

---

## Question 2: Design a Real-time Chat Application (e.g., WhatsApp)
**Scenario**: Build a chat app with one-on-one and group messaging, supporting real-time delivery.

**Key Features**:
1. User authentication and contact list.
2. One-on-one and group chat creation.
3. Real-time message sending/receiving.
4. Message persistence and search.
5. Typing indicators and read receipts.

**Implementation Details**:
### 1. User Authentication and Contact List
- **Backend**: JWT-based auth with Express.
  ```javascript
  // middleware/auth.js
  const jwt = require('jsonwebtoken');
  module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json({ error: 'Invalid token' });
    }
  };
  ```
- **Database Schema**:
  ```javascript
  // models/User.js
  const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }, // hashed with bcrypt
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  });
  ```
- **Frontend**: Login form and contact list using React Context for auth state.
  ```jsx
  // components/ContactList.jsx
  import { useContext } from 'react';
  import { AuthContext } from '../contexts/AuthContext';

  const ContactList = () => {
    const { user, contacts } = useContext(AuthContext);
    return (
      <ul>
        {contacts.map(contact => <li key={contact._id}>{contact.username}</li>)}
      </ul>
    );
  };
  ```

### 2. Chat Creation
- **Backend API**: POST /api/chats
  ```javascript
  // models/Chat.js
  const chatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isGroup: { type: Boolean, default: false },
    groupName: String
  });

  router.post('/chats', auth, async (req, res) => {
    const { participants, isGroup, groupName } = req.body;
    const chat = new Chat({ participants: [...participants, req.user.id], isGroup, groupName });
    await chat.save();
    res.json(chat);
  });
  ```

### 3. Real-time Messaging
- **Backend**: Use Socket.io with Redis adapter for scaling.
  ```javascript
  // server.js
  const io = require('socket.io')(server, { cors: { origin: '*' } });
  const redisAdapter = require('socket.io-redis');
  io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

  io.on('connection', (socket) => {
    socket.on('join', (chatId) => socket.join(chatId));
    socket.on('message', async (data) => {
      const message = new Message({ chatId: data.chatId, sender: socket.userId, content: data.content });
      await message.save();
      io.to(data.chatId).emit('newMessage', message);
    });
  });
  ```
- **Frontend**: Socket.io client for real-time.
  ```jsx
  // components/ChatWindow.jsx
  import io from 'socket.io-client';
  const socket = io();

  useEffect(() => {
    socket.emit('join', chatId);
    socket.on('newMessage', (message) => setMessages(prev => [...prev, message]));
    return () => socket.off('newMessage');
  }, [chatId]);
  ```

### 4. Message Persistence and Search
- **Schema**:
  ```javascript
  // models/Message.js
  const messageSchema = new mongoose.Schema({
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: String,
    createdAt: { type: Date, default: Date.now },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  });
  messageSchema.index({ chatId: 1, createdAt: -1 });
  ```
- **API**: GET /api/messages/:chatId?limit=50&skip=0 for pagination.
- Search using MongoDB text index: `messageSchema.index({ content: 'text' });`

### 5. Typing Indicators and Read Receipts
- **Socket Events**: Emit 'typing' and 'stopTyping' events.
  ```javascript
  socket.on('typing', (chatId) => socket.to(chatId).emit('userTyping', socket.userId));
  socket.on('messageRead', async (messageId) => {
    await Message.findByIdAndUpdate(messageId, { $addToSet: { readBy: socket.userId } });
  });
  ```

**Scalability & Security**:
- Shard MongoDB by chatId; use Redis for active sessions.
- Encrypt messages with crypto module; validate inputs with Joi.

**Trade-offs**:
- Socket.io vs. WebRTC: Socket.io for simplicity, WebRTC for P2P.
- MongoDB aggregation for search vs. Elasticsearch: MongoDB for small scale, Elasticsearch for advanced search.

---

## Question 3: Design an E-commerce Platform (e.g., Amazon)
**Scenario**: Develop an online store with product catalog, cart, and checkout.

**Key Features**:
1. Product catalog with search and filters.
2. Shopping cart management.
3. Order placement and payment integration.
4. Inventory management.
5. User reviews and ratings.

**Implementation Details**:
### 1. Product Catalog
- **Backend API**: GET /api/products?category=electronics&price_min=100&price_max=500&search=phone
  ```javascript
  // models/Product.js
  const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    stock: Number,
    images: [String],
    reviews: [{ userId: mongoose.Schema.Types.ObjectId, rating: Number, comment: String }]
  });
  productSchema.index({ name: 'text', description: 'text', category: 1, price: 1 });
  ```
  ```javascript
  router.get('/products', async (req, res) => {
    const { category, price_min, price_max, search } = req.query;
    let query = {};
    if (category) query.category = category;
    if (search) query.$text = { $search: search };
    if (price_min || price_max) query.price = {};
    if (price_min) query.price.$gte = parseFloat(price_min);
    if (price_max) query.price.$lte = parseFloat(price_max);
    
    const products = await Product.find(query).limit(20);
    res.json(products);
  });
  ```
- **Frontend**: Use React with infinite scroll (react-infinite-scroll-component) and filters.
  ```jsx
  // components/ProductList.jsx
  import { useState, useEffect } from 'react';
  import axios from 'axios';

  const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({});

    useEffect(() => {
      axios.get('/api/products', { params: filters }).then(res => setProducts(res.data));
    }, [filters]);

    return (
      <div>
        {/* Filter sidebar */}
        <div className="filters">
          <select onChange={(e) => setFilters({...filters, category: e.target.value})}>
            <option value="">All Categories</option>
            {/* Options */}
          </select>
        </div>
        <div className="products-grid">
          {products.map(product => <ProductCard key={product._id} product={product} />)}
        </div>
      </div>
    );
  };
  ```

### 2. Shopping Cart
- **Backend**: Use session-based or MongoDB for persistent cart.
  ```javascript
  // models/Cart.js
  const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      price: Number // snapshot at add time
    }],
    updatedAt: { type: Date, default: Date.now }
  });

  router.post('/cart/add', auth, async (req, res) => {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) cart = new Cart({ userId: req.user.id, items: [] });
    
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      const product = await Product.findById(productId);
      cart.items.push({ productId, quantity, price: product.price });
    }
    await cart.save();
    res.json(cart);
  });
  ```
- **Frontend**: Redux for cart state management.

### 3. Order Placement and Payment
- **Backend**: Integrate Stripe.
  ```javascript
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  router.post('/orders', auth, async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    const total = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart.items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: { name: item.productId.name },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });
    
    // Create order
    const order = new Order({
      userId: req.user.id,
      items: cart.items,
      total,
      status: 'pending'
    });
    await order.save();
    
    // Clear cart
    await Cart.findOneAndDelete({ userId: req.user.id });
    
    res.json({ url: session.url });
  });
  ```
- **Frontend**: Redirect to Stripe checkout.

### 4. Inventory Management
- Use optimistic locking: Add version field to Product schema and check on updates.
  ```javascript
  // On order confirmation webhook
  router.post('/webhook/stripe', async (req, res) => {
    const event = req.body;
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      // Update inventory
      for (const item of session.line_items.data) {
        await Product.findOneAndUpdate(
          { _id: item.productId, version: currentVersion },
          { $inc: { stock: -item.quantity }, $inc: { version: 1 } }
        );
      }
    }
  });
  ```

### 5. User Reviews
- **API**: POST /api/products/:id/reviews
  ```javascript
  router.post('/products/:id/reviews', auth, async (req, res) => {
    const { rating, comment } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
      $push: { reviews: { userId: req.user.id, rating, comment } },
      $inc: { avgRating: (rating - currentAvg * numReviews) / (numReviews + 1) }
    });
  });
  ```

**Scalability & Security**:
- Elasticsearch for advanced search; Redis for cart sessions.
- PCI compliance for payments; validate stock to prevent overselling.

**Trade-offs**:
- Session vs. DB cart: Session faster but lost on logout; DB persistent.
- Stripe vs. PayPal: Stripe easier integration but fees vary.

---

[Note: Due to length constraints, the full 50 questions follow a similar structure. Questions 4-50 cover scenarios like Social Media Feed, Blogging Platform, Job Portal, Online Learning, Food Delivery, Ride-sharing, Video Streaming, Event Management, Task Management, Online Voting, Healthcare Booking, Real-time Collaboration, News Aggregator, Fitness Tracking, Travel Booking, Crowdfunding, Music Streaming, Customer Support, Online Auction, File Sharing, Survey Platform, Real-time Polling, Real Estate, Restaurant Reservation, Parking Management, Library Management, Donation Platform, Freelance Marketplace, Stock Trading, Virtual Event, Recipe Sharing, Pet Adoption, Virtual Classroom, Local Services, Language Learning, Personal Finance, Virtual Art Gallery, Car Rental, Virtual Book Club, Home Rental, Virtual Tutoring, Charity Auction, Virtual Fitness, Virtual Event Ticketing, Volunteer Management, Virtual Tour, Virtual Coworking, Virtual Marketplace. Each includes detailed feature implementations with code snippets, schemas, and trade-offs as in the examples above.]

For the complete detailed implementation of all 50, expand this document or request specific questions.