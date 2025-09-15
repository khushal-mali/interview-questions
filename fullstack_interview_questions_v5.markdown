# Full-Stack Developer Interview Questions and Answers (2025) - Version 4

This document provides an extensive set of 60 full-stack developer interview questions and answers, organized by interview rounds, covering behavioral, situational, technical (front-end and back-end), and framework-specific topics, including Next.js. These questions prepare candidates for all stages of the interview process, from initial screenings to final rounds, based on industry standards for 2025.

## Table of Contents
1. [Initial Screening Round](#initial-screening-round)
   - [Behavioral Questions](#behavioral-questions)
   - [Situational Questions](#situational-questions)
2. [Technical Round - Front-End](#technical-round-front-end)
   - [HTML Questions](#html-questions)
   - [CSS Questions](#css-questions)
   - [JavaScript Questions](#javascript-questions)
3. [Technical Round - Back-End](#technical-round-back-end)
   - [Node.js Questions](#nodejs-questions)
   - [Database Questions](#database-questions)
4. [Framework-Specific Round](#framework-specific-round)
   - [React Questions](#react-questions)
   - [Next.js Questions](#nextjs-questions)
   - [Express.js Questions](#expressjs-questions)
5. [Advanced Technical Round](#advanced-technical-round)
   - [System Design and Optimization Questions](#system-design-and-optimization-questions)
   - [Coding Questions](#coding-questions)
6. [Final Round](#final-round)
   - [Cultural Fit and Industry Knowledge](#cultural-fit-and-industry-knowledge)

---

## Initial Screening Round

### Behavioral Questions

1. **Describe a time when you successfully delivered a full-stack project with both front-end and back-end components. What was your approach?**

   **Answer**: In a recent project, I built a task management app using Next.js for the front-end and Node.js/Express with MongoDB for the back-end. I planned the API first, used Swagger for documentation, and integrated it with a React-based UI. Regular testing with Jest and Postman ensured smooth integration, delivering the app on time with a 98% uptime in production.

2. **Tell us about a time you faced a challenging bug in a full-stack application. How did you resolve it?**

   **Answer**: A Next.js app had inconsistent data rendering due to a server-side hydration issue. I used Chrome DevTools to trace the mismatch, fixed it by ensuring consistent data fetching with `getServerSideProps`, and added error boundaries. This reduced errors by 90% and improved my debugging skills across the stack.

3. **Can you share an experience where you collaborated with designers and back-end developers to achieve a project goal?**

   **Answer**: For a SaaS dashboard, I worked with designers to align on Figma prototypes and back-end developers to define REST APIs. I used Next.js for SSR and created reusable components, ensuring UI consistency. Weekly syncs and shared docs streamlined collaboration, resulting in a 20% increase in user satisfaction.

4. **Describe a situation where you had to learn a new technology quickly for a full-stack project.**

   **Answer**: A client required Next.js for a blog platform. I studied Next.js documentation, built a prototype with dynamic routes, and integrated it with a Node.js API. Pair-programming with a colleague accelerated learning, and we delivered a performant app in two weeks, enhancing my adaptability.

5. **What’s an example of a time you improved the scalability of a full-stack application?**

   **Answer**: In an e-commerce app, high traffic caused slow API responses. I implemented Redis caching for product data, optimized MongoDB queries with indexes, and used Next.js static generation for product pages. This reduced response times by 35% and handled 10x more users.

6. **Tell us about a time you received constructive feedback on your code and how you acted on it.**

   **Answer**: A code review flagged my Express API for lacking input validation. I integrated `express-validator`, refactored endpoints, and added unit tests with Mocha. This improved security and taught me to prioritize validation early in development.

### Situational Questions

7. **How would you handle a situation where a Next.js app fails to hydrate correctly on the client?**

   **Answer**: I’d check for mismatches between server and client rendering, ensure consistent data fetching (e.g., `getServerSideProps`), and use `useEffect` for client-only logic. I’d log hydration errors with Sentry and test fixes with React DevTools to ensure seamless rendering.

8. **What would you do if a critical database query slows down a production API?**

   **Answer**: I’d analyze the query with `EXPLAIN` (SQL) or MongoDB’s profiler, add indexes, and cache results with Redis. I’d monitor performance with New Relic, deploy the fix with zero downtime, and add tests to prevent regression, ensuring minimal disruption.

9. **How would you respond if a client requests a feature that increases technical debt?**

   **Answer**: I’d explain the long-term risks (e.g., maintenance issues) and propose a scalable alternative, like modular components in Next.js. I’d prototype both options, share performance metrics, and align with the client on a solution that balances speed and quality.

10. **What steps would you take if an API endpoint is rate-limited by a third-party service?**

    **Answer**: I’d implement client-side caching with localStorage or server-side caching with Redis, use exponential backoff for retries, and inform users with a friendly message. I’d also explore alternative APIs or negotiate higher limits with the provider.

---

## Technical Round - Front-End

### HTML Questions

11. **What is the purpose of the `<dialog>` element in HTML5?**

    **Answer**: The `<dialog>` element creates native modal or dialog boxes. Example:
    ```html
    <dialog id="myDialog">
      <p>Content</p>
      <button onclick="myDialog.close()">Close</button>
    </dialog>
    <script>
      myDialog.showModal();
    </script>
    ```
    It improves accessibility and simplifies modal implementation.

12. **How do you ensure HTML is compatible with older browsers?**

    **Answer**: Use polyfills (e.g., `html5shiv`), feature detection with Modernizr, and progressive enhancement. Example:
    ```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js"></script>
    ```
    Test with tools like BrowserStack for compatibility.

13. **What is the `data-testid` attribute used for?**

    **Answer**: `data-testid` is used for testing, providing stable identifiers for tools like Jest or Cypress. Example:
    ```html
    <button data-testid="submit">Click</button>
    ```

14. **What is the difference between `<meter>` and `<progress>` elements?**

    **Answer**:
    - `<meter>`: Represents a scalar value within a range (e.g., battery level).
    - `<progress>`: Shows task completion progress.
    Example:
    ```html
    <meter min="0" max="100" value="75"></meter>
    <progress max="100" value="50"></progress>
    ```

15. **How do you optimize HTML for performance?**

    **Answer**: Optimize with:
    - Minified HTML.
    - Deferred scripts (`defer` or `async`).
    - Preloading critical resources (`<link rel="preload">`).
    Example: `<link rel="preload" href="critical.css" as="style">`.

### CSS Questions

16. **What is the CSS `gap` property in Flexbox and Grid?**

    **Answer**: `gap` sets spacing between Flexbox or Grid items. Example:
    ```css
    .grid { display: grid; gap: 20px; }
    ```
    It replaces `margin` hacks, simplifying layouts.

17. **How do you create a CSS-only hamburger menu?**

    **Answer**: Use `:checked` with a checkbox. Example:
    ```css
    #menu-toggle { display: none; }
    #menu-toggle:checked ~ .menu { display: block; }
    .menu { display: none; }
    ```
    ```html
    <input type="checkbox" id="menu-toggle">
    <label for="menu-toggle">Menu</label>
    <nav class="menu">Items</nav>
    ```

18. **What is the `contain` property in CSS?**

    **Answer**: `contain` restricts an element’s rendering scope (e.g., `layout`, `paint`). Example:
    ```css
    .box { contain: strict; }
    ```
    It improves performance by isolating DOM updates.

19. **How do you handle browser-specific CSS issues?**

    **Answer**: Use vendor prefixes (via Autoprefixer), feature queries (`@supports`), and fallbacks. Example:
    ```css
    @supports (display: grid) { .container { display: grid; } }
    ```

20. **What is the difference between `min-width` and `max-width` in media queries?**

    **Answer**:
    - `min-width`: Applies styles for viewports wider than or equal to the value.
    - `max-width`: Applies styles for viewports narrower than or equal to the value.
    Example:
    ```css
    @media (min-width: 600px) { .box { width: 50%; } }
    ```

### JavaScript Questions

21. **What is the `Symbol` type in JavaScript?**

    **Answer**: `Symbol` creates unique identifiers, often used as object keys to avoid collisions. Example:
    ```javascript
    const key = Symbol('key');
    const obj = { [key]: 'value' };
    ```

22. **How do you implement memoization in JavaScript?**

    **Answer**:
    ```javascript
    function memoize(fn) {
      const cache = new Map();
      return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn(...args);
        cache.set(key, result);
        return result;
      };
    }
    ```

23. **What is the difference between `for...of` and `for...in` loops?**

    **Answer**:
    - `for...of`: Iterates over values of iterable objects (e.g., arrays).
    - `for...in`: Iterates over enumerable properties of objects.
    Example:
    ```javascript
    const arr = [1, 2];
    for (let x of arr) console.log(x); // 1, 2
    ```

24. **What is the `IntersectionObserver` API?**

    **Answer**: `IntersectionObserver` monitors element visibility in the viewport. Example:
    ```javascript
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) console.log('Visible');
      });
    });
    observer.observe(document.querySelector('.box'));
    ```
    It’s used for lazy loading or animations.

25. **How do you handle memory management in JavaScript?**

    **Answer**: Manage memory by:
    - Avoiding global variables.
    - Cleaning up event listeners.
    - Using `WeakMap`/`WeakSet` for garbage collection.
    Example: `element.removeEventListener('click', handler)`.

---

## Technical Round - Back-End

### Node.js Questions

26. **What is the `buffer` module in Node.js?**

    **Answer**: The `buffer` module handles binary data. Example:
    ```javascript
    const buf = Buffer.from('Hello');
    console.log(buf.toString()); // "Hello"
    ```
    It’s used for file or network operations.

27. **How do you implement a REST client in Node.js?**

    **Answer**: Use `axios` or `node-fetch`. Example:
    ```javascript
    const axios = require('axios');
    async function getData() {
      const res = await axios.get('https://api.example.com/data');
      return res.data;
    }
    ```

28. **What is the purpose of `pm2` in Node.js?**

    **Answer**: `pm2` is a process manager for Node.js apps, enabling clustering, monitoring, and zero-downtime restarts. Example:
    ```bash
    pm2 start app.js
    ```

29. **How do you secure sensitive data in Node.js?**

    **Answer**: Use environment variables with `dotenv` and encrypt data with `crypto`. Example:
    ```javascript
    require('dotenv').config();
    console.log(process.env.API_KEY);
    ```

30. **What is the `async_hooks` module used for?**

    **Answer**: `async_hooks` tracks asynchronous operations for debugging or logging. Example:
    ```javascript
    const asyncHooks = require('async_hooks');
    asyncHooks.createHook({ init: () => console.log('Async op') }).enable();
    ```

### Database Questions

31. **What is a foreign key constraint in SQL?**

    **Answer**: A foreign key links a column to a primary key in another table, ensuring referential integrity. Example:
    ```sql
    CREATE TABLE orders (
      id INT PRIMARY KEY,
      user_id INT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
    ```

32. **How do you handle large datasets in MongoDB?**

    **Answer**: Use pagination, aggregation, and indexes. Example:
    ```javascript
    db.collection.find().skip(10).limit(10);
    ```

33. **What is the difference between `TRUNCATE` and `DELETE` in SQL?**

    **Answer**:
    - `TRUNCATE`: Removes all rows without logging, faster but non-reversible.
    - `DELETE`: Removes rows with logging, supports conditions.
    Example: `TRUNCATE TABLE users;` vs. `DELETE FROM users WHERE id = 1;`.

34. **What is a database view?**

    **Answer**: A view is a virtual table based on a query, simplifying complex queries. Example:
    ```sql
    CREATE VIEW active_users AS SELECT * FROM users WHERE active = 1;
    ```

35. **How do you handle database migrations?**

    **Answer**: Use tools like Knex.js or Sequelize. Example with Knex:
    ```javascript
    exports.up = async knex => {
      await knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name');
      });
    };
    ```

---

## Framework-Specific Round

### React Questions

36. **What is the purpose of `React.StrictMode`?**

    **Answer**: `React.StrictMode` enables additional checks and warnings for potential issues, like deprecated APIs. Example:
    ```javascript
    <React.StrictMode><App /></React.StrictMode>
    ```

37. **How do you handle dynamic imports in React?**

    **Answer**: Use `React.lazy`. Example:
    ```javascript
    const LazyComponent = React.lazy(() => import('./Component'));
    ```

38. **What is the difference between `useState` and `useRef`?**

    **Answer**:
    - `useState`: Triggers re-renders on state changes.
    - `useRef`: Persists values without re-rendering.
    Example: `const ref = useRef(0); ref.current++`.

39. **How do you implement custom hooks in React?**

    **Answer**:
    ```javascript
    function useWindowSize() {
      const [size, setSize] = useState({ width: 0, height: 0 });
      useEffect(() => {
        const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
      }, []);
      return size;
    }
    ```

### Next.js Questions

40. **What is the difference between `getStaticProps` and `getServerSideProps` in Next.js?**

    **Answer**:
    - `getStaticProps`: Fetches data at build time for static generation.
    - `getServerSideProps`: Fetches data on each request for server-side rendering.
    Example:
    ```javascript
    export async function getStaticProps() {
      return { props: { data: await fetchData() } };
    }
    ```

41. **How do you implement dynamic routes in Next.js?**

    **Answer**: Use file-based routing with brackets. Example:
    ```
    pages/posts/[id].js
    ```
    ```javascript
    export async function getServerSideProps({ params }) {
      const post = await fetchPost(params.id);
      return { props: { post } };
    }
    ```

42. **What is the purpose of the `next/image` component?**

    **Answer**: `next/image` optimizes images with lazy loading, responsive sizing, and modern formats (e.g., WebP). Example:
    ```javascript
    import Image from 'next/image';
    <Image src="/img.jpg" width={500} height={300} alt="Image" />
    ```

43. **How do you handle API routes in Next.js?**

    **Answer**: Create files in `pages/api`. Example:
    ```javascript
    // pages/api/hello.js
    export default function handler(req, res) {
      res.status(200).json({ message: 'Hello' });
    }
    ```

44. **What is Incremental Static Regeneration (ISR) in Next.js?**

    **Answer**: ISR regenerates static pages in the background after a specified interval. Example:
    ```javascript
    export async function getStaticProps() {
      return { props: { data: await fetchData() }, revalidate: 60 };
    }
    ```

### Express.js Questions

45. **How do you implement session management in Express.js?**

    **Answer**: Use `express-session`. Example:
    ```javascript
    const session = require('express-session');
    app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
    ```

46. **What is the purpose of `helmet` in Express.js?**

    **Answer**: `helmet` sets security headers to protect against attacks like XSS. Example:
    ```javascript
    const helmet = require('helmet');
    app.use(helmet());
    ```

47. **How do you handle file streaming in Express.js?**

    **Answer**: Use `fs.createReadStream`. Example:
    ```javascript
    const fs = require('fs');
    app.get('/stream', (req, res) => {
      fs.createReadStream('file.txt').pipe(res);
    });
    ```

---

## Advanced Technical Round

### System Design and Optimization Questions

48. **How do you design a scalable e-commerce platform?**

    **Answer**: Design with:
    - **Front-end**: Next.js for SSR/SSG.
    - **Back-end**: Node.js/Express microservices (cart, payments).
    - **Database**: PostgreSQL for orders, Redis for sessions.
    - **Scaling**: AWS ECS for containers, CDN for assets.

49. **What is the difference between monolithic and microservices architectures?**

    **Answer**:
    - **Monolithic**: Single codebase, simpler but harder to scale.
    - **Microservices**: Independent services, scalable but complex.
    Choose microservices for large, distributed systems.

50. **How do you optimize database performance in a high-traffic app?**

    **Answer**: Use:
    - Indexes for frequent queries.
    - Read replicas for load distribution.
    - Caching with Redis.
    - Connection pooling (e.g., `pg-pool`).

51. **What is a message queue, and how is it used in full-stack apps?**

    **Answer**: A message queue (e.g., RabbitMQ) handles asynchronous tasks like email sending. Example:
    ```javascript
    const amqp = require('amqplib');
    async function sendMessage() {
      const conn = await amqp.connect('amqp://localhost');
      const channel = await conn.createChannel();
      await channel.sendToQueue('queue', Buffer.from('Task'));
    }
    ```

52. **How do you implement load balancing in a full-stack app?**

    **Answer**: Use NGINX or AWS ELB to distribute traffic. Example NGINX config:
    ```
    upstream backend {
      server backend1.example.com;
      server backend2.example.com;
    }
    server {
      location / { proxy_pass http://backend; }
    }
    ```

### Coding Questions

53. **Write a Next.js API route to fetch user data.**

    **Answer**:
    ```javascript
    // pages/api/users/[id].js
    export default async function handler(req, res) {
      const { id } = req.query;
      const user = await fetchUser(id); // Assume fetchUser function
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.status(200).json(user);
    }
    ```

54. **Write a function to check if two strings are anagrams.**

    **Answer**:
    ```javascript
    function isAnagram(str1, str2) {
      const normalize = str => str.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
      return normalize(str1) === normalize(str2);
    }
    console.log(isAnagram('listen', 'silent')); // true
    ```

55. **Write a SQL query to find the second-highest salary.**

    **Answer**:
    ```sql
    SELECT MAX(salary) as second_highest
    FROM employees
    WHERE salary < (SELECT MAX(salary) FROM employees);
    ```

56. **Write a Node.js function to hash a password.**

    **Answer**:
    ```javascript
    const bcrypt = require('bcrypt');
    async function hashPassword(password) {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(password, salt);
    }
    ```

57. **Write a React component to toggle a theme.**

    **Answer**:
    ```javascript
    function ThemeToggle() {
      const [theme, setTheme] = React.useState('light');
      const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        document.body.className = theme;
      };
      return <button onClick={toggleTheme}>Toggle Theme</button>;
    }
    ```

---

## Final Round

### Cultural Fit and Industry Knowledge

58. **How do you stay updated with full-stack trends like Next.js?**

    **Answer**: I follow Next.js releases on GitHub, read Vercel’s blog, and experiment with features like ISR in side projects. I also engage with communities on Discord and attend conferences like Next.js Conf.

59. **What excites you about building full-stack apps with Next.js?**

    **Answer**: Next.js’s hybrid rendering (SSR, SSG, ISR) simplifies building performant, SEO-friendly apps, as seen in a blog I built. Its API routes and TypeScript support streamline full-stack development, aligning with my passion for efficient solutions.

60. **Why are you a good fit for this full-stack role?**

    **Answer**: My experience with Next.js, React, Node.js, and SQL, as demonstrated in projects like a real-time chat app, aligns with your focus on scalable web solutions. I’m eager to contribute to innovative projects and grow in areas like serverless and microservices.

---

This guide provides 60 questions to prepare for a full-stack developer interview, with a focus on Next.js. Tailor these answers to your experience (e.g., projects like Slacky-Chat or skills in React, Node.js, and SQL), practice them, and approach each round confidently to succeed!