# 50 Front-End Developer Interview Questions with Detailed Answers (Set 2)

Below is a second set of 50 front-end developer interview questions, covering HTML, CSS, JavaScript, frameworks, tools, and advanced concepts. Each question includes a detailed answer to aid in interview preparation.

---

## HTML Questions

### 1. What is the difference between `<section>` and `<div>` in HTML?
**Answer**:  
- **`<div>`**: A generic, non-semantic container used for grouping elements for styling or scripting. It carries no inherent meaning.
- **`<section>`**: A semantic element that represents a standalone section of content, typically with a heading. It improves accessibility and SEO by providing context.
Example:
```html
<div class="container">Generic content</div>
<section>
  <h2>Blog Post</h2>
  <p>Content here...</p>
</section>
```
Use `<section>` for meaningful content divisions and `<div>` for styling purposes.

---

### 2. What is the `data-` attribute in HTML, and how is it used?
**Answer**:  
The `data-` attribute stores custom data on HTML elements, accessible via JavaScript or CSS. It’s useful for attaching metadata without affecting semantics.
Example:
```html
<div data-id="123" data-type="product">Item</div>
<script>
  const element = document.querySelector('div');
  console.log(element.dataset.id); // 123
</script>
```
CSS example:
```css
div[data-type="product"] { background: blue; }
```

---

### 3. What is the purpose of the `<meta>` tag?
**Answer**:  
The `<meta>` tag provides metadata about the HTML document, such as character encoding, viewport settings, or SEO information. It’s not displayed but affects page behavior.
Example:
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="A website about technology">
```
Common uses: encoding, responsive design, and search engine optimization.

---

### 4. What is the difference between `<figure>` and `<img>` elements?
**Answer**:  
- **`<img>`**: Displays an image with attributes like `src` and `alt`.
- **`<figure>`**: A semantic container for images, illustrations, or diagrams, often paired with `<figcaption>` for captions.
Example:
```html
<figure>
  <img src="photo.jpg" alt="Nature scene">
  <figcaption>A beautiful landscape</figcaption>
</figure>
```
Use `<figure>` to provide context and improve accessibility.

---

### 5. How does the `<canvas>` element work in HTML?
**Answer**:  
The `<canvas>` element provides a resolution-dependent bitmap surface for rendering graphics, animations, or games using JavaScript.
Example:
```html
<canvas id="myCanvas" width="200" height="100"></canvas>
<script>
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'blue';
  ctx.fillRect(10, 10, 50, 50);
</script>
```
It’s used for dynamic graphics (e.g., charts, games) but requires JavaScript for functionality.

---

## CSS Questions

### 6. What is the CSS `calc()` function, and how is it used?
**Answer**:  
The `calc()` function performs calculations to determine CSS property values, supporting addition, subtraction, multiplication, and division.
Example:
```css
.container {
  width: calc(100% - 20px);
  height: calc(50vh - 2rem);
}
```
It’s useful for responsive layouts and dynamic sizing.

---

### 7. What are CSS custom properties (variables), and why are they useful?
**Answer**:  
CSS custom properties (e.g., `--variable-name`) allow reusable values in CSS, defined with `--` and accessed with `var()`.
Example:
```css
:root {
  --primary-color: #007bff;
}
.button {
  background: var(--primary-color);
}
```
Benefits: Easier maintenance, theming, and dynamic updates via JavaScript.

---

### 8. What is the `z-index` property, and how does it work?
**Answer**:  
The `z-index` property controls the stacking order of positioned elements (`relative`, `absolute`, `fixed`, `sticky`). Higher values stack above lower ones.
Example:
```css
.box1 { position: absolute; z-index: 10; }
.box2 { position: absolute; z-index: 5; }
```
`box1` appears above `box2`. Elements must have a `position` property for `z-index` to work.

---

### 9. How do you create a CSS-only hover effect?
**Answer**:  
Use the `:hover` pseudo-class to apply styles when a user hovers over an element.
Example:
```css
.button {
  background: blue;
  transition: background 0.3s;
}
.button:hover {
  background: darkblue;
}
```
The `transition` property ensures smooth changes.

---

### 10. What is the difference between `rem` and `em` units in CSS?
**Answer**:  
- **rem**: Relative to the root (`<html>`) font size.
- **em**: Relative to the parent element’s font size.
Example:
```css
html { font-size: 16px; }
.parent { font-size: 1.5em; } /* 24px if parent’s parent is 16px */
.child { font-size: 2rem; } /* Always 32px (2 * 16px) */
```
Use `rem` for consistency, `em` for contextual scaling.

---

## JavaScript Questions

### 11. What is the difference between `null` and `undefined` in JavaScript?
**Answer**:  
- **null**: Represents an intentional absence of a value. Assigned explicitly.
- **undefined**: Indicates a variable has been declared but not assigned a value.
Example:
```javascript
let a;
console.log(a); // undefined
let b = null;
console.log(b); // null
```

---

### 12. What are arrow functions, and how do they differ from regular functions?
**Answer**:  
Arrow functions (`=>`) are a concise way to write functions in ES6. Differences:
- No `this` binding; they inherit `this` from the surrounding scope.
- No `arguments` object.
- Cannot be used as constructors.
Example:
```javascript
const add = (a, b) => a + b;
console.log(add(2, 3)); // 5
```
Use arrow functions for concise callbacks; avoid for methods needing `this`.

---

### 13. What is the purpose of `Promise` in JavaScript?
**Answer**:  
A `Promise` represents a value that may be available now, later, or never, handling asynchronous operations.
Example:
```javascript
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Data fetched"), 1000);
});
fetchData.then((data) => console.log(data)).catch((err) => console.log(err));
```
Promises improve readability over callbacks and support chaining.

---

### 14. What is the difference between `forEach` and `map` in JavaScript?
**Answer**:  
- **forEach**: Iterates over an array and executes a function for each element. Returns `undefined`.
- **map**: Creates a new array with the results of applying a function to each element.
Example:
```javascript
const arr = [1, 2, 3];
arr.forEach((x) => console.log(x * 2)); // Logs 2, 4, 6
const doubled = arr.map((x) => x * 2); // Returns [2, 4, 6]
```

---

### 15. What is the `this` keyword in JavaScript, and how does it behave?
**Answer**:  
The `this` keyword refers to the context in which a function is executed. Its value depends on how the function is called:
- Global context: `window` (browser).
- Object method: The object itself.
- Arrow functions: Inherits `this` from the surrounding scope.
Example:
```javascript
const obj = {
  name: "Alice",
  sayName: function () { console.log(this.name); }
};
obj.sayName(); // Alice
```

---

## React Questions

### 16. What is JSX, and how does it work in React?
**Answer**:  
JSX is a syntax extension for JavaScript that allows HTML-like code in React. It’s transpiled to `React.createElement` calls by Babel.
Example:
```javascript
const element = <h1>Hello, World!</h1>;
// Transpiles to:
React.createElement("h1", null, "Hello, World!");
```
JSX makes React code more readable and declarative.

---

### 17. What is the difference between state and props in React?
**Answer**:  
- **State**: Internal, mutable data managed by a component using `useState` or `this.state`.
- **Props**: External, immutable data passed to a component.
Example:
```javascript
function Child({ name }) { // Props
  const [count, setCount] = useState(0); // State
  return <p>{name}: {count}</p>;
}
```

---

### 18. What is the purpose of `useEffect` in React?
**Answer**:  
`useEffect` handles side effects (e.g., API calls, subscriptions) in functional components. It runs after render and can clean up on unmount.
Example:
```javascript
useEffect(() => {
  const timer = setInterval(() => console.log("Tick"), 1000);
  return () => clearInterval(timer); // Cleanup
}, []); // Empty dependency array: runs once
```

---

### 19. What is React Router, and how is it used?
**Answer**:  
React Router is a library for handling client-side routing in React applications.
Example:
```javascript
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```
It enables navigation without full page reloads.

---

### 20. What are React fragments, and why are they used?
**Answer**:  
Fragments (`<></>` or `<React.Fragment>`) group multiple elements without adding extra DOM nodes.
Example:
```javascript
function List() {
  return (
    <>
      <li>Item 1</li>
      <li>Item 2</li>
    </>
  );
}
```
They prevent unnecessary wrapper `<div>`s, keeping the DOM clean.

---

## Accessibility Questions

### 21. What is the purpose of the `role` attribute in HTML?
**Answer**:  
The `role` attribute defines the purpose of an element for assistive technologies, part of ARIA.
Example:
```html
<div role="alert">Error: Invalid input</div>
```
Use when native HTML elements don’t convey enough semantic meaning.

---

### 22. How do you ensure sufficient color contrast for accessibility?
**Answer**:  
Ensure a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (WCAG 2.1). Use tools like WebAIM’s Contrast Checker.
Example:
```css
.text { color: #000; background: #fff; } /* High contrast */
```

---

### 23. What is the importance of focus management in accessibility?
**Answer**:  
Focus management ensures users can navigate interactive elements using a keyboard. Key practices:
- Set `tabindex` appropriately.
- Programmatically manage focus (e.g., modals).
Example:
```javascript
const modal = document.querySelector('#modal');
modal.focus();
```

---

### 24. How do you make form inputs accessible?
**Answer**:  
Make forms accessible by:
- Using `<label>` with `for` attribute.
- Adding `aria-label` or `aria-describedby` for clarity.
- Ensuring error messages are accessible.
Example:
```html
<label for="name">Name:</label>
<input id="name" aria-describedby="name-error">
<span id="name-error">Please enter a valid name</span>
```

---

### 25. What is a skip link, and why is it important?
**Answer**:  
A skip link is a hidden link that allows keyboard users to bypass repetitive content (e.g., navigation) to reach the main content.
Example:
```html
<a href="#main" class="skip-link">Skip to content</a>
<main id="main">Content</main>
```
```css
.skip-link { position: absolute; top: -999px; }
.skip-link:focus { top: 0; }
```
It improves keyboard navigation for screen reader users.

---

## Performance Questions

### 26. What is code splitting, and how does it improve performance?
**Answer**:  
Code splitting divides a JavaScript bundle into smaller chunks, loading only what’s needed. It reduces initial load time.
Example (React):
```javascript
const LazyComponent = React.lazy(() => import('./Component'));
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

---

### 27. How does browser caching improve website performance?
**Answer**:  
Browser caching stores static assets (e.g., CSS, images) locally, reducing server requests. Set via HTTP headers like `Cache-Control`.
Example:
```http
Cache-Control: max-age=31536000
```
Use for assets that rarely change to speed up subsequent page loads.

---

### 28. What is the impact of reflows and repaints on performance?
**Answer**:  
- **Reflow**: Recalculates element positions and sizes (expensive).
- **Repaint**: Updates visuals without changing layout (less expensive).
Minimize by:
- Avoiding frequent DOM changes.
- Using `transform` for animations instead of `top`/`left`.
Example:
```css
.element { transform: translateX(100px); } /* Better than top: 100px */
```

---

### 29. How do you optimize font loading for performance?
**Answer**:  
Optimize font loading by:
- Using `font-display: swap` to show fallback fonts during loading.
- Preloading critical fonts.
- Hosting fonts locally or using a CDN.
Example:
```html
<link rel="preload" href="/fonts/myfont.woff2" as="font" type="font/woff2" crossorigin>
<style>
  @font-face {
    font-family: 'MyFont';
    src: url('/fonts/myfont.woff2') format('woff2');
    font-display: swap;
  }
</style>
```

---

### 30. What is the role of service workers in performance optimization?
**Answer**:  
Service workers cache assets and enable offline functionality, reducing server requests and improving load times.
Example:
```javascript
// sw.js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
```

---

## General Front-End Questions

### 31. What is the difference between mobile-first and desktop-first design?
**Answer**:  
- **Mobile-first**: Start with base styles for smaller screens, then progressively add styles for larger screens using `min-width` media queries.
- **Desktop-first**: Start with styles for larger screens, then adjust for smaller screens using `max-width` media queries.
Example (Mobile-first):
```css
.container { width: 100%; }
@media (min-width: 768px) { .container { width: 750px; } }
```

---

### 32. What are CSS Grid’s `fr` unit and `auto-fit`/`auto-fill`?
**Answer**:  
- **fr**: A fractional unit representing a portion of available space.
- **auto-fit**/**auto-fill**: Adjusts the number of grid columns dynamically.
Example:
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}
```
`auto-fit` collapses empty tracks; `auto-fill` keeps them.

---

### 33. What is a polyfill, and when would you use one?
**Answer**:  
A polyfill is JavaScript code that provides modern functionality for older browsers. Use when a feature isn’t supported (e.g., `Promise` in IE).
Example:
```javascript
if (!window.Promise) {
  window.Promise = require('promise-polyfill');
}
```

---

### 34. How do you handle state management in a large React application?
**Answer**:  
Manage state with:
- **React Context**: For global state (e.g., user data).
- **State Management Libraries**: Redux, Zustand, or Recoil for complex state.
- **Component State**: `useState` or `useReducer` for local state.
Example (Context):
```javascript
const UserContext = createContext();
function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Child />
    </UserContext.Provider>
  );
}
```

---

### 35. What is the role of a linter in front-end development?
**Answer**:  
A linter (e.g., ESLint, Stylelint) enforces code quality and consistency by detecting errors, stylistic issues, and potential bugs.
Example (ESLint config):
```json
{
  "rules": {
    "semi": ["error", "always"],
    "no-unused-vars": "error"
  }
}
```

---

## Advanced Questions

### 36. What is the Shadow DOM, and how is it used?
**Answer**:  
The Shadow DOM encapsulates a DOM subtree, isolating styles and markup from the main document. It’s used in web components.
Example:
```javascript
class MyElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `<style>p { color: blue; }</style><p>Hello</p>`;
  }
}
customElements.define('my-element', MyElement);
```

---

### 37. How do you implement infinite scrolling?
**Answer**:  
Infinite scrolling loads content as the user scrolls. Use `IntersectionObserver` to detect when the user reaches the bottom.
Example:
```javascript
const sentinel = document.querySelector('#sentinel');
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadMoreContent();
  }
});
observer.observe(sentinel);
```

---

### 38. What is memoization, and how is it used in JavaScript?
**Answer**:  
Memoization caches function results to avoid redundant computations.
Example:
```javascript
function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    return (cache[key] = fn(...args));
  };
}
const slowFn = memoize((n) => n * 2);
```

---

### 39. What is a Single Page Application (SPA), and what are its pros and cons?
**Answer**:  
An SPA loads a single HTML page and updates content dynamically via JavaScript (e.g., React, Vue).
- **Pros**: Fast navigation, smooth UX, less server load.
- **Cons**: Slower initial load, SEO challenges, complex state management.
Example: React with React Router for SPA routing.

---

### 40. What is the Fetch API, and how does it compare to XMLHttpRequest?
**Answer**:  
The Fetch API is a modern interface for making HTTP requests, simpler than `XMLHttpRequest`.
Example:
```javascript
fetch('https://api.example.com/data')
  .then((response) => response.json())
  .then((data) => console.log(data));
```
**Fetch** vs. **XMLHttpRequest**:
- Fetch is promise-based, cleaner syntax.
- XMLHttpRequest is older, more verbose.

---

## Behavioral and Scenario-Based Questions

### 41. How would you debug a JavaScript error in production?
**Answer**:  
Debug by:
1. Checking browser console for errors.
2. Using source maps to map minified code to source.
3. Monitoring logs with tools like Sentry or LogRocket.
4. Reproducing the issue in a staging environment.
5. Adding debug logs to trace the issue.

---

### 42. How do you collaborate with designers to implement a UI?
**Answer**:  
Collaborate by:
- Reviewing design files (e.g., Figma, Sketch) for specs.
- Discussing responsive behavior and edge cases.
- Using a design system for consistency.
- Providing feedback on feasibility.
- Prototyping with tools like Storybook.

---

### 43. How would you handle a situation where a feature doesn’t work in a specific browser?
**Answer**:  
Handle by:
1. Identifying the browser and issue via testing (e.g., BrowserStack).
2. Using feature detection to provide fallbacks.
3. Applying polyfills or alternative implementations.
4. Updating CSS with vendor prefixes or browser-specific hacks.
5. Documenting limitations for stakeholders.

---

### 44. Describe a time you improved a website’s performance.
**Answer**:  
Example response:  
On a media-heavy site, I reduced load time by:
- Compressing images with WebP and lazy loading.
- Minifying JavaScript and CSS with Webpack.
- Implementing code splitting for React routes.
- Using a CDN for assets.  
This cut load time by 50%, improving user retention.

---

### 45. How do you ensure your code is maintainable?
**Answer**:  
Ensure maintainability by:
- Following consistent naming conventions (e.g., BEM for CSS).
- Writing modular, reusable code.
- Using linters and formatters (e.g., Prettier).
- Documenting code with comments or tools like JSDoc.
- Organizing files logically (e.g., by feature).

---

## Miscellaneous Questions

### 46. What is GraphQL, and how does it differ from REST?
**Answer**:  
GraphQL is a query language for APIs, allowing clients to request specific data.
- **GraphQL**: Single endpoint, flexible queries, reduces over/under-fetching.
- **REST**: Multiple endpoints, fixed responses.
Example (GraphQL query):
```graphql
query {
  user(id: 1) {
    name
    email
  }
}
```

---

### 47. What is the role of a bundler like Vite in front-end development?
**Answer**:  
Vite is a modern bundler that provides fast development with ES modules and optimizes builds.
- **Development**: Hot module replacement for instant updates.
- **Production**: Minifies and bundles code.
Example (Vite config):
```javascript
import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [react()],
});
```

---

### 48. How do you handle API errors in a front-end application?
**Answer**:  
Handle API errors by:
- Using try-catch with async/await or `.catch()` with promises.
- Displaying user-friendly error messages.
- Implementing retry logic or fallbacks.
Example:
```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) throw new Error('Network error');
    return await response.json();
  } catch (error) {
    console.error(error);
    alert('Failed to load data');
  }
}
```

---

### 49. What is the importance of version control in front-end development?
**Answer**:  
Version control (e.g., Git) tracks code changes, enabling collaboration, rollback, and branching.
- Use Git for source control.
- Follow workflows like GitFlow or trunk-based development.
- Commit frequently with clear messages.
Example:
```bash
git commit -m "Add responsive navigation bar"
```

---

### 50. What are some common front-end testing strategies?
**Answer**:  
Common testing strategies:
- **Unit Testing**: Test individual components (e.g., Jest, React Testing Library).
- **Integration Testing**: Test component interactions.
- **End-to-End Testing**: Test user flows (e.g., Cypress, Playwright).
- **Accessibility Testing**: Use tools like axe or Lighthouse.
Example (Jest):
```javascript
test('renders button', () => {
  render(<Button label="Click" />);
  expect(screen.getByText('Click')).toBeInTheDocument();
});
```

---

This set of questions complements the first, covering additional concepts and scenarios to prepare for a front-end developer interview. Best of luck!