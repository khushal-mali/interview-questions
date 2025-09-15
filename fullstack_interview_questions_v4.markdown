# Full-Stack Developer Interview Questions and Answers (2025) - Version 4

This document provides an extensive set of 60 full-stack developer interview questions and answers, organized by interview rounds, covering behavioral, situational, technical (front-end and back-end), and framework-specific topics, including React, Next.js, and Express.js. These questions prepare candidates for all stages of the interview process, from initial screenings to final rounds, based on industry standards for 2025.

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

1. **Describe a time when you successfully delivered a full-stack project with tight integration between front-end and back-end. What was your approach?**

   **Answer**: In a recent project, I built a task management app with a React front-end and Node.js/Express back-end. I used REST APIs to connect the two, defined clear endpoints with Swagger, and implemented Redux for state management. Regular syncs with the team ensured alignment, and we delivered a seamless app with a 20% faster response time due to optimized API calls.

2. **Tell us about a time you identified and fixed a scalability issue in a full-stack application.**

   **Answer**: In an e-commerce app, high traffic caused slow database queries. I analyzed with PostgreSQL’s `EXPLAIN` and added indexes, while implementing Redis caching on the Node.js backend. On the front-end, I used React’s lazy loading for components. These changes improved response times by 30%, teaching me holistic optimization.

3. **Can you share an experience where you resolved a conflict between front-end and back-end priorities?**

   **Answer**: During a social media app project, the back-end team prioritized database optimization over new API endpoints needed for the UI. I facilitated a meeting to align on user needs, proposed a phased approach to balance both, and prototyped endpoints with Postman. This resolved the conflict and kept the project on track.

4. **Describe a situation where you learned a new full-stack technology under pressure.**

   **Answer**: For a client project, I had to learn Next.js in a week. I focused on its documentation, built a small SSR prototype, and integrated it with an Express API. Pair-programming with a colleague helped clarify concepts, and we delivered a performant app, enhancing my rapid learning skills.

5. **What’s an example of a time you improved team collaboration on a full-stack project?**

   **Answer**: I introduced a shared Git workflow with feature branches and pull requests, using GitHub Actions for CI/CD. I also set up a Slack channel for real-time updates and documented API specs in OpenAPI. This reduced merge conflicts by 40% and improved cross-team communication.

6. **Tell us about a time you handled a critical bug in a live full-stack application.**

   **Answer**: A user authentication bug caused login failures in a Node.js app. I traced it to a JWT expiration issue using logs, updated the refresh token logic, and deployed the fix with zero downtime. Automated tests were added to prevent recurrence, reinforcing proactive monitoring.

### Situational Questions

7. **How would you handle a situation where a new feature causes performance degradation across the stack?**

   **Answer**: I’d use Lighthouse for front-end and New Relic for back-end to pinpoint bottlenecks. If database queries are slow, I’d optimize with indexes or caching. For the front-end, I’d implement code splitting or memoization. I’d test fixes under load with JMeter and update stakeholders.

8. **What would you do if an API change breaks the front-end unexpectedly?**

   **Answer**: I’d add error boundaries in React, validate API responses with TypeScript, and log errors with Sentry. I’d coordinate with the back-end team to version the API and update the front-end to handle the new structure, ensuring compatibility.

9. **How would you respond to a security vulnerability reported in your application?**

   **Answer**: I’d assess the vulnerability’s impact using OWASP guidelines, apply patches (e.g., sanitize inputs), and test with tools like Burp Suite. I’d inform stakeholders, deploy fixes with minimal disruption, and add security tests to the CI pipeline.

10. **What steps would you take if a client requests a feature that increases technical debt?**

    **Answer**: I’d explain the long-term risks (e.g., maintenance issues) and propose a scalable alternative, like modular code. I’d prototype both options, show performance metrics, and align with the client on a solution that balances speed and quality.

---

## Technical Round - Front-End

### HTML Questions

11. **What is the `<dialog>` element, and how is it used?**

    **Answer**: The `<dialog>` element creates native modal dialogs. Example:
    ```html
    <dialog id="myDialog">
      <p>Content</p>
      <button onclick="myDialog.close()">Close</button>
    </dialog>
    <script>
      document.getElementById('myDialog').showModal();
    </script>
    ```
    It improves accessibility and simplifies modal implementation.

12. **What is the purpose of the `nonce` attribute in `<script>` tags?**

    **Answer**: The `nonce` attribute supports Content Security Policy (CSP) by allowing only scripts with a matching nonce to execute, preventing XSS. Example:
    ```html
    <script nonce="random123">code</script>
    ```
    ```html
    <meta http-equiv="Content-Security-Policy" content="script-src 'nonce-random123'">
    ```

13. **How do you ensure HTML is accessible for screen readers?**

    **Answer**: Use semantic tags, ARIA attributes (e.g., `aria-live`), and proper focus management. Example:
    ```html
    <button aria-label="Submit form">Submit</button>
    ```
    Test with NVDA or VoiceOver to meet WCAG standards.

14. **What is the `srcset` attribute in images?**

    **Answer**: `srcset` provides multiple image sources for responsive design. Example:
    ```html
    <img src="low.jpg" srcset="high.jpg 2x, medium.jpg 1.5x" alt="Image">
    ```
    It improves performance by serving appropriate resolutions.

15. **What is the difference between `<aside>` and `<div>`?**

    **Answer**: `<aside>` is a semantic element for tangential content (e.g., sidebars), aiding accessibility and SEO. `<div>` is a generic, non-semantic container. Use `<aside>` for meaningful context.

### CSS Questions

16. **What is the CSS `gap` property in Flexbox and Grid?**

    **Answer**: `gap` sets spacing between Flexbox or Grid items. Example:
    ```css
    .grid { display: grid; gap: 20px; }
    ```
    It simplifies layouts, replacing manual margins.

17. **How do you create a CSS-only hamburger menu?**

    **Answer**: Use a checkbox and `:checked`. Example:
    ```css
    input { display: none; }
    input:checked ~ .menu { display: block; }
    .menu { display: none; }
    ```
    ```html
    <input type="checkbox" id="menu-toggle">
    <label for="menu-toggle">☰</label>
    <div class="menu">Items</div>
    ```

18. **What is the `contain` property in CSS?**

    **Answer**: `contain` (e.g., `strict`, `content`) limits an element’s rendering scope, improving performance. Example:
    ```css
    .box { contain: content; }
    ```
    It’s used for isolated components to reduce reflows.

19. **How do you style a CSS custom property dynamically?**

    **Answer**: Update via JavaScript or inline styles. Example:
    ```css
    :root { --color: blue; }
    div { background: var(--color); }
    ```
    ```javascript
    document.documentElement.style.setProperty('--color', 'red');
    ```

20. **What is the difference between `min-width` and `max-width` in media queries?**

    **Answer**: `min-width` applies styles for viewports wider than the value; `max-width` applies for narrower viewports. Example:
    ```css
    @media (min-width: 600px) { div { font-size: 16px; } }
    ```

### JavaScript Questions

21. **What is the difference between `Array.prototype.find` and `Array.prototype.filter`?**

    **Answer**:
    - `find`: Returns the first element meeting a condition.
    - `filter`: Returns all elements meeting a condition.
    Example:
    ```javascript
    const arr = [1, 2, 3];
    arr.find(x => x > 1); // 2
    arr.filter(x => x > 1); // [2, 3]
    ```

22. **What is the `Symbol` type in JavaScript?**

    **Answer**: `Symbol` creates unique identifiers, often for object properties. Example:
    ```javascript
    const sym = Symbol('id');
    const obj = { [sym]: 1 };
    console.log(obj[sym]); // 1
    ```
    It prevents property collisions.

23. **How do you implement debouncing in JavaScript?**

    **Answer**:
    ```javascript
    function debounce(fn, delay) {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
      };
    }
    ```

24. **What is the purpose of `Promise.any`?**

    **Answer**: `Promise.any` resolves with the first fulfilled Promise, ignoring rejections unless all fail. Example:
    ```javascript
    Promise.any([Promise.reject('Error'), Promise.resolve('Success')]).then(console.log); // "Success"
    ```

25. **What is the difference between `Object.seal` and `Object.freeze`?**

    **Answer**:
    - `seal`: Prevents adding/deleting properties but allows modification.
    - `freeze`: Prevents all changes.
    Example:
    ```javascript
    const obj = Object.seal({ key: 1 });
    obj.key = 2; // Works
    obj.newKey = 3; // Fails
    ```

---

## Technical Round - Back-End

### Node.js Questions

26. **What is the `fs.promises` API in Node.js?**

    **Answer**: `fs.promises` provides Promise-based file system operations. Example:
    ```javascript
    const fs = require('fs').promises;
    async function readFile() {
      const data = await fs.readFile('file.txt', 'utf8');
      console.log(data);
    }
    ```
    It simplifies async file handling.

27. **How do you handle concurrent requests in Node.js?**

    **Answer**: Use async operations, clustering, or load balancing. Example with `cluster`:
    ```javascript
    const cluster = require('cluster');
    if (cluster.isMaster) {
      cluster.fork();
    } else {
      require('./server');
    }
    ```

28. **What is the purpose of `process.nextTick`?**

    **Answer**: `process.nextTick` schedules a callback before the next event loop iteration, ahead of I/O tasks. Example:
    ```javascript
    process.nextTick(() => console.log('Next tick'));
    ```

29. **How do you implement logging in a Node.js app?**

    **Answer**: Use libraries like Winston. Example:
    ```javascript
    const winston = require('winston');
    const logger = winston.createLogger({
      transports: [new winston.transports.File({ filename: 'app.log' })]
    });
    logger.info('Log message');
    ```

30. **What is the `crypto` module in Node.js?**

    **Answer**: The `crypto` module handles encryption, hashing, etc. Example:
    ```javascript
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256').update('password').digest('hex');
    ```

### Database Questions

31. **What is a foreign key, and why is it used?**

    **Answer**: A foreign key links tables to enforce referential integrity. Example:
    ```sql
    CREATE TABLE orders (
      id INT PRIMARY KEY,
      user_id INT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
    ```

32. **How do you handle database migrations?**

    **Answer**: Use tools like Sequelize or Knex.js. Example with Knex:
    ```javascript
    exports.up = knex => knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('name');
    });
    exports.down = knex => knex.schema.dropTable('users');
    ```

33. **What is the difference between `findOne` and `find` in MongoDB?**

    **Answer**:
    - `findOne`: Returns the first matching document.
    - `find`: Returns a cursor for all matching documents.
    Example:
    ```javascript
    db.collection.findOne({ name: 'John' });
    ```

34. **What is ACID in databases?**

    **Answer**: ACID (Atomicity, Consistency, Isolation, Durability) ensures reliable transactions. Example: A bank transfer uses ACID to ensure funds are moved or rolled back.

35. **How do you optimize a database for read-heavy workloads?**

    **Answer**: Use indexes, caching (Redis), and read replicas. Example:
    ```sql
    CREATE INDEX idx_name ON users(name);
    ```

---

## Framework-Specific Round

### React Questions

36. **What is the purpose of `React.StrictMode`?**

    **Answer**: `React.StrictMode` enables additional checks for potential issues, like deprecated APIs. Example:
    ```javascript
    <React.StrictMode><App /></React.StrictMode>
    ```
    It’s used in development to improve code quality.

37. **How do you handle side effects in React functional components?**

    **Answer**: Use `useEffect`. Example:
    ```javascript
    useEffect(() => {
      const timer = setInterval(() => console.log('Tick'), 1000);
      return () => clearInterval(timer);
    }, []);
    ```

38. **What is a custom hook in React?**

    **Answer**: A custom hook is a reusable function using React hooks. Example:
    ```javascript
    function useWindowSize() {
      const [size, setSize] = useState({ width: 0, height: 0 });
      useEffect(() => {
        const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
      }, []);
      return size;
    }
    ```

### Next.js Questions

39. **What is the difference between `getStaticProps` and `getServerSideProps` in Next.js?**

    **Answer**:
    - `getStaticProps`: Fetches data at build time for static pages.
    - `getServerSideProps`: Fetches data on each request for server-side rendering.
    Example:
    ```javascript
    export async function getStaticProps() {
      const data = await fetchData();
      return { props: { data } };
    }
    ```

40. **How does Next.js handle dynamic routing?**

    **Answer**: Use file-based routing with square brackets. Example:
    ```
    pages/posts/[id].js
    ```
    ```javascript
    export async function getServerSideProps({ params }) {
      const post = await fetchPost(params.id);
      return { props: { post } };
    }
    ```

41. **What is the purpose of `next/image`?**

    **Answer**: `next/image` optimizes images with lazy loading, resizing, and modern formats (e.g., WebP). Example:
    ```javascript
    import Image from 'next/image';
    <Image src="/image.jpg" width={500} height={300} alt="Image" />
    ```

42. **How do you implement API routes in Next.js?**

    **Answer**: Create files in `pages/api`. Example:
    ```javascript
    // pages/api/hello.js
    export default function handler(req, res) {
      res.status(200).json({ message: 'Hello' });
    }
    ```

43. **What is Incremental Static Regeneration (ISR) in Next.js?**

    **Answer**: ISR regenerates static pages in the background after a specified interval. Example:
    ```javascript
    export async function getStaticProps() {
      const data = await fetchData();
      return { props: { data }, revalidate: 10 };
    }
    ```
    It balances static performance with dynamic updates.

### Express.js Questions

44. **How do you implement session-based authentication in Express.js?**

    **Answer**: Use `express-session`. Example:
    ```javascript
    const session = require('express-session');
    app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
    app.post('/login', (req, res) => {
      req.session.user = { id: 1 };
      res.send('Logged in');
    });
    ```

45. **What is the purpose of `express.urlencoded`?**

    **Answer**: `express.urlencoded` parses URL-encoded form data. Example:
    ```javascript
    app.use(express.urlencoded({ extended: true }));
    app.post('/form', (req, res) => res.json(req.body));
    ```

---

## Advanced Technical Round

### System Design and Optimization Questions

46. **How do you design a scalable e-commerce platform?**

    **Answer**: Design with:
    - **Frontend**: Next.js for SSR and static pages.
    - **Backend**: Node.js/Express with microservices for cart, payments, and inventory.
    - **Database**: PostgreSQL for transactions, Redis for sessions.
    - **Scaling**: AWS ECS for containers, CloudFront CDN for assets.

47. **What is the difference between monolithic and microservices architectures?**

    **Answer**:
    - **Monolithic**: Single codebase, simpler to develop but harder to scale.
    - **Microservices**: Independent services, scalable but complex to manage.
    Use microservices for large-scale apps with Kubernetes.

48. **How do you optimize database performance for write-heavy workloads?**

    **Answer**: Use batch writes, async replication, and sharding. Example:
    ```sql
    INSERT INTO logs (data) VALUES ('data1'), ('data2');
    ```

49. **What is a message queue, and how is it used?**

    **Answer**: A message queue (e.g., RabbitMQ) decouples services for async tasks. Example: Queue order processing tasks to avoid blocking the main thread.

50. **How do you ensure high availability in a full-stack app?**

    **Answer**: Use load balancers, multi-region deployments, and health checks. Example: Configure AWS ELB with auto-scaling groups.

### Coding Questions

51. **Write a Next.js API route to fetch paginated data.**

    **Answer**:
    ```javascript
    // pages/api/users.js
    export default function handler(req, res) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const users = [{ id: 1, name: 'John' }]; // Mock data
      const start = (page - 1) * limit;
      res.status(200).json({ users: users.slice(start, start + limit), total: users.length });
    }
    ```

52. **Write a function to reverse a linked list.**

    **Answer**:
    ```javascript
    function reverseList(head) {
      let prev = null, current = head;
      while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
      }
      return prev;
    }
    ```

53. **Write a SQL query to find the second-highest salary.**

    **Answer**:
    ```sql
    SELECT MAX(salary) as second_highest
    FROM employees
    WHERE salary < (SELECT MAX(salary) FROM employees);
    ```

54. **Write a function to implement a rate limiter in Node.js.**

    **Answer**:
    ```javascript
    function rateLimiter(limit, windowMs) {
      const requests = new Map();
      return (req, res, next) => {
        const ip = req.ip;
        const now = Date.now();
        if (!requests.has(ip)) requests.set(ip, []);
        requests.set(ip, requests.get(ip).filter(t => now - t < windowMs));
        if (requests.get(ip).length >= limit) return res.status(429).send('Too Many Requests');
        requests.get(ip).push(now);
        next();
      };
    }
    ```

55. **Write a React component with Next.js to fetch data using SWR.**

    **Answer**:
    ```javascript
    import useSWR from 'swr';
    const fetcher = url => fetch(url).then(res => res.json());
    function DataComponent() {
      const { data, error } = useSWR('/api/data', fetcher);
      if (error) return <div>Error</div>;
      if (!data) return <div>Loading...</div>;
      return <div>{data.name}</div>;
    }
    export default