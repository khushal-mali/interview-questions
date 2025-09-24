# 50 Front-End Developer Interview Questions with Detailed Answers

Below is a comprehensive list of 50 front-end developer interview questions, covering HTML, CSS, JavaScript, React, accessibility, performance, and more. Each question includes a detailed answer to help candidates prepare effectively.

---

## HTML Questions

### 1. What is the purpose of the `<!DOCTYPE>` declaration?
**Answer**:  
The `<!DOCTYPE>` declaration is placed at the top of an HTML document to inform browsers about the document type and version of HTML being used (e.g., HTML5). It ensures that browsers render the page in standards mode, adhering to modern web standards, rather than quirks mode, which may cause inconsistent rendering. For example:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Sample Page</title>
  </head>
  <body>
    <p>Hello, World!</p>
  </body>
</html>
```
Without the `<!DOCTYPE>` declaration, browsers may misinterpret the HTML, leading to rendering issues.

---

### 2. What are semantic HTML elements, and why are they important?
**Answer**:  
Semantic HTML elements (e.g., `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`) clearly describe their meaning and purpose in a document's structure. They improve:
- **Accessibility**: Screen readers use semantic elements to provide context to users with disabilities.
- **SEO**: Search engines better understand the content, improving indexing.
- **Maintainability**: Semantic code is easier to read and maintain.
For example:
```html
<main>
  <article>
    <h1>Blog Title</h1>
    <p>Content here...</p>
  </article>
</main>
```
Using `<div>` for everything is non-semantic and less meaningful.

---

### 3. What is the difference between `block`, `inline`, and `inline-block` elements?
**Answer**:  
- **Block**: Takes the full width of its container, starts on a new line (e.g., `<div>`, `<p>`, `<h1>`).
- **Inline**: Takes only the width of its content, does not start on a new line (e.g., `<span>`, `<a>`, `<img>`). Cannot have width/height set.
- **Inline-block**: Behaves like inline but allows setting width, height, and margins (e.g., `<button>`).
Example:
```html
<div style="display: block;">Block element</div>
<span style="display: inline;">Inline element</span>
<span style="display: inline-block; width: 100px;">Inline-block element</span>
```

---

### 4. What is the purpose of the `alt` attribute in `<img>` tags?
**Answer**:  
The `alt` attribute provides alternative text for an image, describing its content or purpose. It is crucial for:
- **Accessibility**: Screen readers read the `alt` text to visually impaired users.
- **SEO**: Search engines use `alt` text to understand images.
- **Fallback**: Displays if the image fails to load.
Example:
```html
<img src="cat.jpg" alt="A fluffy cat sitting on a couch">
```
An empty `alt=""` is used for decorative images to indicate they can be ignored by assistive technologies.

---

### 5. What is the difference between `<script>` with and without the `defer` and `async` attributes?
**Answer**:  
- **Default `<script>`**: Blocks HTML parsing until the script is downloaded and executed.
- **`<script defer>`**: Downloads the script asynchronously but executes it after the HTML is fully parsed. Maintains execution order.
- **`<script async>`**: Downloads and executes the script as soon as it’s available, potentially out of order, and does not wait for HTML parsing.
Example:
```html
<script src="app.js"></script>
<script defer src="app-deferred.js"></script>
<script async src="app-async.js"></script>
```
Use `defer` for scripts that depend on the DOM and `async` for independent scripts like analytics.

---

## CSS Questions

### 6. What is the CSS box model, and how does it work?
**Answer**:  
The CSS box model represents the structure and space of an element, consisting of:
- **Content**: The inner content (text, images).
- **Padding**: Space between content and border.
- **Border**: Surrounds the padding.
- **Margin**: Space outside the border.
The total width/height of an element is calculated as:
```
Total Width = Content Width + Padding (left + right) + Border (left + right) + Margin (left + right)
```
Example:
```css
.box {
  width: 200px;
  padding: 10px;
  border: 5px solid black;
  margin: 15px;
  /* Total width: 200 + 10 + 10 + 5 + 5 + 15 + 15 = 260px */
}
```
The `box-sizing: border-box` property includes padding and border in the width/height.

---

### 7. What is the difference between `relative`, `absolute`, `fixed`, and `sticky` positioning?
**Answer**:  
- **Relative**: Positioned relative to its normal position. Offsets (`top`, `left`, etc.) move it without affecting other elements.
- **Absolute**: Positioned relative to the nearest positioned ancestor (or document body). Removed from normal flow.
- **Fixed**: Positioned relative to the viewport. Stays in place during scrolling.
- **Sticky**: Toggles between relative and fixed based on scroll position.
Example:
```css
.relative { position: relative; top: 10px; left: 10px; }
.absolute { position: absolute; top: 20px; right: 20px; }
.fixed { position: fixed; top: 0; left: 0; }
.sticky { position: sticky; top: 0; }
```

---

### 8. How does CSS specificity work?
**Answer**:  
CSS specificity determines which styles are applied when multiple rules target the same element. It is calculated based on a hierarchy:
- Inline styles: 1000
- IDs: 100
- Classes, attributes, pseudo-classes: 10
- Elements, pseudo-elements: 1
Example:
```css
#container .box p { /* Specificity: 100 + 10 + 1 = 111 */ }
div p { /* Specificity: 1 + 1 = 2 */ }
```
The rule with higher specificity wins. If equal, the last declared rule applies. `!important` overrides specificity but should be used sparingly.

---

### 9. What are CSS Flexbox and Grid, and when would you use each?
**Answer**:  
- **Flexbox**: A one-dimensional layout model for arranging items in a row or column. Ideal for navigation bars, forms, or aligning content.
  ```css
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  ```
- **Grid**: A two-dimensional layout system for rows and columns. Best for complex layouts like dashboards or page grids.
  ```css
  .container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 10px;
  }
  ```
Use Flexbox for simpler, linear layouts and Grid for structured, grid-based designs.

---

### 10. What is a CSS preprocessor, and what are its benefits?
**Answer**:  
A CSS preprocessor (e.g., Sass, Less) extends CSS with features like variables, nesting, mixins, and functions. Benefits include:
- **Modularity**: Organize styles in reusable files.
- **Maintainability**: Variables (e.g., `$primary-color: #007bff`) simplify updates.
- **Nesting**: Reduces repetition and improves readability.
Example (Sass):
```scss
$primary-color: #007bff;
.nav {
  background: $primary-color;
  a { color: white; }
}
```
Compiles to standard CSS for browser use.

---

## JavaScript Questions

### 11. What is the difference between `var`, `let`, and `const` in JavaScript?
**Answer**:  
- **var**: Function-scoped, allows redeclaration and reassignment. Hoisted with `undefined`.
- **let**: Block-scoped, allows reassignment but not redeclaration. Not initialized until declared.
- **const**: Block-scoped, cannot be reassigned or redeclared. Must be initialized at declaration.
Example:
```javascript
var x = 1; // Function-scoped
let y = 2; // Block-scoped, reassignable
const z = 3; // Block-scoped, fixed value
```

---

### 12. What is hoisting in JavaScript?
**Answer**:  
Hoisting is JavaScript’s behavior of moving variable and function declarations to the top of their scope during compilation. Only declarations are hoisted, not initializations.
Example:
```javascript
console.log(x); // undefined
var x = 5;
function foo() { console.log("Hello"); }
foo(); // Works due to hoisting
```
`let` and `const` are hoisted but not initialized, causing a ReferenceError if accessed before declaration.

---

### 13. What are closures in JavaScript, and how are they used?
**Answer**:  
A closure is a function that retains access to its lexical scope’s variables even after the outer function has finished executing. Closures are used for data privacy, memoization, and callbacks.
Example:
```javascript
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}
const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
```
Here, `inner` retains access to `count`.

---

### 14. What is the difference between `==` and `===` in JavaScript?
**Answer**:  
- `==`: Equality operator with type coercion. Compares values after converting to a common type.
- `===`: Strict equality operator without type coercion. Compares both value and type.
Example:
```javascript
console.log(5 == "5"); // true (coerces string to number)
console.log(5 === "5"); // false (different types)
```

---

### 15. What is the event loop in JavaScript, and how does it handle asynchronous operations?
**Answer**:  
The event loop is a mechanism that allows JavaScript to handle asynchronous operations in a single-threaded environment. It manages the call stack, task queue, and microtask queue:
- **Call Stack**: Executes synchronous code.
- **Task Queue**: Holds asynchronous callbacks (e.g., `setTimeout`).
- **Microtask Queue**: Holds promises and other high-priority tasks.
The event loop continuously checks if the call stack is empty, then processes microtasks, followed by tasks.
Example:
```javascript
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");
// Output: Start, End, Promise, Timeout
```

---

## React Questions

### 16. What are React components, and what are the differences between functional and class components?
**Answer**:  
React components are reusable building blocks for UI. They can be:
- **Functional Components**: Simple functions that return JSX. Use hooks for state and lifecycle.
  ```javascript
  function Welcome({ name }) {
    return <h1>Hello, {name}</h1>;
  }
  ```
- **Class Components**: ES6 classes extending `React.Component`. Use `this.state` and lifecycle methods.
  ```javascript
  class Welcome extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }
  ```
Functional components are preferred for their simplicity and hooks. Class components are used in legacy codebases.

---

### 17. What are React hooks, and why are they used?
**Answer**:  
Hooks are functions that let functional components manage state, side effects, and other React features. Common hooks include:
- `useState`: Manages state.
- `useEffect`: Handles side effects (e.g., API calls).
Example:
```javascript
import { useState, useEffect } from 'react';
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```
Hooks simplify code and eliminate the need for class components.

---

### 18. What is the virtual DOM in React, and how does it improve performance?
**Answer**:  
The virtual DOM is an in-memory representation of the real DOM. React uses it to:
1. Create a virtual DOM tree for the UI.
2. Compare it with the previous tree (diffing).
3. Update only the changed parts of the real DOM (reconciliation).
This minimizes direct DOM manipulations, which are slow, improving performance for dynamic UIs.

---

### 19. What is the purpose of `key` in React lists?
**Answer**:  
The `key` prop is used when rendering lists in React to uniquely identify each element. It helps React efficiently update the DOM by tracking which items have changed, been added, or removed.
Example:
```javascript
const items = ['Apple', 'Banana', 'Orange'];
return (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);
```
Use unique IDs (not indices) for stable keys to avoid rendering issues.

---

### 20. What is the difference between controlled and uncontrolled components in React?
**Answer**:  
- **Controlled Components**: Form inputs whose values are controlled by React state.
  ```javascript
  function Form() {
    const [value, setValue] = useState('');
    return <input value={value} onChange={(e) => setValue(e.target.value)} />;
  }
  ```
- **Uncontrolled Components**: Form inputs that store their own state in the DOM, accessed via refs.
  ```javascript
  function Form() {
    const inputRef = useRef();
    return <input ref={inputRef} />;
  }
  ```
Controlled components are preferred for predictable state management.

---

## Accessibility Questions

### 21. What is ARIA, and when should it be used?
**Answer**:  
ARIA (Accessible Rich Internet Applications) is a set of attributes that enhance accessibility for dynamic content and custom UI components. Use ARIA when native HTML elements lack sufficient semantics (e.g., custom buttons, modals).
Example:
```html
<button role="button" aria-label="Close dialog">X</button>
```
Avoid overusing ARIA; prefer native semantic HTML when possible.

---

### 22. How can you ensure a website is keyboard-accessible?
**Answer**:  
To ensure keyboard accessibility:
- Ensure all interactive elements (e.g., buttons, links) are focusable with `tabindex`.
- Use semantic HTML (e.g., `<button>` instead of `<div>`).
- Provide visible focus indicators (e.g., `:focus` styles).
- Handle keyboard events (e.g., `Enter` or `Space` for buttons).
Example:
```css
button:focus {
  outline: 2px solid blue;
}
```

---

### 23. What are some common accessibility mistakes to avoid?
**Answer**:  
Common mistakes include:
- Missing `alt` text for images.
- Using non-semantic elements (e.g., `<div>` for buttons).
- Insufficient color contrast (WCAG recommends 4.5:1 for text).
- Lack of keyboard navigation support.
- Missing ARIA attributes for custom components.
Fix by adhering to WCAG guidelines and testing with tools like Lighthouse.

---

### 24. What is the role of the `lang` attribute in HTML?
**Answer**:  
The `lang` attribute specifies the primary language of a document or element, aiding screen readers and search engines.
Example:
```html
<html lang="en">
  <p lang="fr">Bonjour</p>
</html>
```
It ensures correct pronunciation by assistive technologies and improves SEO.

---

### 25. How do you test for web accessibility?
**Answer**:  
Test accessibility using:
- **Manual Testing**: Navigate with a keyboard, use screen readers (e.g., NVDA, VoiceOver).
- **Automated Tools**: Lighthouse, axe, WAVE.
- **WCAG Compliance**: Follow WCAG 2.1 guidelines (e.g., contrast, ARIA).
- **User Testing**: Involve users with disabilities for feedback.

---

## Performance Questions

### 26. How can you optimize a website’s performance?
**Answer**:  
Optimize performance by:
- Minifying CSS, JavaScript, and HTML.
- Compressing images (e.g., WebP format).
- Using lazy loading for images (`loading="lazy"`).
- Reducing render-blocking resources (e.g., deferring scripts).
- Leveraging browser caching with HTTP headers.
- Using a CDN for faster asset delivery.

---

### 27. What is lazy loading, and how is it implemented?
**Answer**:  
Lazy loading defers the loading of non-critical resources (e.g., images, videos) until they are needed (e.g., when they enter the viewport). Implementation:
- **HTML**: Use the `loading="lazy"` attribute for images.
  ```html
  <img src="image.jpg" loading="lazy" alt="Description">
  ```
- **JavaScript**: Use IntersectionObserver to load content dynamically.
  ```javascript
  const images = document.querySelectorAll('img[data-src]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        observer.unobserve(entry.target);
      }
    });
  });
  images.forEach((img) => observer.observe(img));
  ```

---

### 28. What is the critical rendering path?
**Answer**:  
The critical rendering path is the sequence of steps browsers take to render a webpage:
1. Parse HTML to build the DOM.
2. Parse CSS to build the CSSOM.
3. Combine DOM and CSSOM to create the render tree.
4. Layout (calculate positions and sizes).
5. Paint (render pixels to the screen).
Optimize by minimizing render-blocking resources (e.g., deferring CSS/JS).

---

### 29. How can you reduce JavaScript bundle size?
**Answer**:  
Reduce bundle size by:
- **Tree Shaking**: Remove unused code with tools like Webpack.
- **Code Splitting**: Split code into smaller chunks (e.g., React lazy loading).
- **Minification**: Use tools like Terser or UglifyJS.
- **Dynamic Imports**: Load modules on demand.
Example (React lazy loading):
```javascript
const LazyComponent = React.lazy(() => import('./Component'));
```

---

### 30. What is a CDN, and how does it improve performance?
**Answer**:  
A Content Delivery Network (CDN) is a network of distributed servers that cache and deliver content closer to users. It improves performance by:
- Reducing latency (servers are geographically closer).
- Offloading traffic from the origin server.
- Caching static assets (e.g., images, CSS, JS).
Example: Use a CDN like Cloudflare or Akamai to serve assets.

---

## General Front-End Questions

### 31. What is responsive web design, and how is it achieved?
**Answer**:  
Responsive web design ensures a website adapts to different screen sizes and devices. Achieve it with:
- **Fluid Grids**: Use percentages or `vw`/`vh` for layouts.
- **Flexible Images**: Use `max-width: 100%` for images.
- **Media Queries**: Apply styles based on screen size.
Example:
```css
.container {
  width: 100%;
  max-width: 1200px;
}
@media (max-width: 768px) {
  .container { padding: 10px; }
}
```

---

### 32. What are Progressive Web Apps (PWAs)?
**Answer**:  
PWAs are web apps that provide a native app-like experience, offering offline support, push notifications, and fast loading. Key features:
- **Service Workers**: Enable offline functionality and caching.
- **Manifest File**: Defines app metadata (e.g., icons, name).
Example (manifest.json):
```json
{
  "name": "My PWA",
  "start_url": "/",
  "display": "standalone",
  "icons": [{ "src": "icon.png", "sizes": "192x192", "type": "image/png" }]
}
```

---

### 33. How do you handle cross-browser compatibility?
**Answer**:  
Ensure cross-browser compatibility by:
- Using feature detection (e.g., Modernizr).
- Adding vendor prefixes with tools like Autoprefixer.
- Testing on multiple browsers (e.g., Chrome, Firefox, Safari, Edge).
- Using polyfills for unsupported features (e.g., `Promise` polyfill for older browsers).
Example (Autoprefixer in CSS):
```css
.container {
  display: flex;
  /* Autoprefixer adds -webkit-, -moz-, etc. */
}
```

---

### 34. What is the purpose of a CSS reset or normalize?
**Answer**:  
- **CSS Reset**: Removes default browser styles to ensure consistency (e.g., Eric Meyer’s Reset).
- **Normalize.css**: Standardizes default styles across browsers while preserving useful defaults.
Example (Reset):
```css
* { margin: 0; padding: 0; box-sizing: border-box; }
```
Use Normalize.css for modern projects to reduce inconsistencies without losing browser defaults.

---

### 35. What are web components, and how do they work?
**Answer**:  
Web components are reusable, encapsulated custom HTML elements built with:
- **Custom Elements**: Define new HTML tags.
- **Shadow DOM**: Encapsulate styles and markup.
- **HTML Templates**: Define reusable markup.
Example:
```javascript
class MyComponent extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<p>Hello, Web Component!</p>`;
  }
}
customElements.define('my-component', MyComponent);
```
Use: `<my-component></my-component>`

---

## Advanced Questions

### 36. What is event delegation, and why is it useful?
**Answer**:  
Event delegation involves attaching a single event listener to a parent element to handle events for its children, leveraging event bubbling. Benefits:
- Reduces memory usage (fewer listeners).
- Handles dynamically added elements.
Example:
```javascript
document.querySelector('ul').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log(e.target.textContent);
  }
});
```

---

### 37. How do you optimize images for the web?
**Answer**:  
Optimize images by:
- Using modern formats (e.g., WebP, AVIF).
- Compressing images with tools like TinyPNG or ImageOptim.
- Specifying image dimensions in HTML/CSS.
- Using responsive images with `srcset` and `sizes`.
Example:
```html
<img src="small.jpg" srcset="medium.jpg 768w, large.jpg 1200w" sizes="(max-width: 768px) 100vw, 50vw" alt="Description">
```

---

### 38. What is the difference between throttling and debouncing?
**Answer**:  
- **Throttling**: Limits how often a function is called, ensuring it runs at most once in a specified time interval.
- **Debouncing**: Delays a function call until after a specified time has passed since the last invocation.
Example (Debouncing):
```javascript
function debounce(fn, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}
window.addEventListener('resize', debounce(() => console.log('Resized'), 200));
```
Use throttling for scroll events, debouncing for input events.

---

### 39. What is tree shaking in JavaScript?
**Answer**:  
Tree shaking is a build process (e.g., in Webpack) that removes unused code from JavaScript bundles, reducing file size. It relies on ES modules (`import`/`export`).
Example:
```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// main.js
import { add } from './math.js';
console.log(add(2, 3)); // subtract is removed during tree shaking
```

---

### 40. What is the Same-Origin Policy, and how does it affect web development?
**Answer**:  
The Same-Origin Policy restricts web pages from making requests to a different origin (protocol, domain, or port) for security reasons. It affects:
- AJAX requests (use CORS to allow cross-origin requests).
- WebSockets and iframes.
Example (CORS):
```javascript
fetch('https://api.example.com/data', {
  method: 'GET',
  headers: { 'Origin': 'https://my-site.com' }
});
```
Workarounds include CORS, JSONP, or proxy servers.

---

## Behavioral and Scenario-Based Questions

### 41. How would you debug a slow-loading webpage?
**Answer**:  
Debug by:
1. Using browser DevTools (e.g., Chrome’s Performance tab) to analyze load times.
2. Checking network requests for large assets or slow APIs.
3. Profiling JavaScript with the Performance panel.
4. Optimizing images, minifying code, and using lazy loading.
5. Testing with tools like Lighthouse or WebPageTest.

---

### 42. How do you approach building a reusable component library?
**Answer**:  
Build a reusable component library by:
- Using a component-based framework (e.g., React, Vue).
- Following a design system for consistency (e.g., colors, typography).
- Documenting components with tools like Storybook.
- Ensuring accessibility and responsiveness.
- Versioning and publishing to npm.
Example (React component):
```javascript
function Button({ label, onClick }) {
  return <button className="btn" onClick={onClick}>{label}</button>;
}
```

---

### 43. How do you handle browser compatibility issues in older browsers?
**Answer**:  
Handle compatibility by:
- Using feature detection (e.g., `if ('IntersectionObserver' in window)`).
- Adding polyfills (e.g., `core-js` for ES6 features).
- Testing on older browsers (e.g., IE11) with BrowserStack.
- Using tools like Babel to transpile modern JavaScript.
Example (Babel preset):
```json
{
  "presets": ["@babel/preset-env"]
}
```

---

### 44. What steps would you take to improve a website’s SEO?
**Answer**:  
Improve SEO by:
- Using semantic HTML (e.g., `<h1>`, `<meta>` tags).
- Adding descriptive `title` and `meta description` tags.
- Optimizing images with `alt` text.
- Ensuring fast load times (e.g., minify assets, use CDN).
- Creating a sitemap and submitting it to search engines.
Example:
```html
<head>
  <title>My Website | Home</title>
  <meta name="description" content="A brief description of my website">
</head>
```

---

### 45. Describe a challenging front-end project you worked on and how you overcame obstacles.
**Answer**:  
Example response:  
In a recent e-commerce project, I faced performance issues due to large product images and complex animations. I:
- Optimized images using WebP and lazy loading.
- Replaced heavy CSS animations with lightweight JavaScript alternatives.
- Used Chrome DevTools to identify bottlenecks.
- Implemented code splitting with React lazy loading.  
The result was a 40% reduction in load time, improving user experience and SEO.

---

## Miscellaneous Questions

### 46. What is TypeScript, and how does it benefit front-end development?
**Answer**:  
TypeScript is a superset of JavaScript that adds static typing. Benefits:
- Catches type-related errors during development.
- Improves code maintainability and refactoring.
- Enhances IDE support with autocompletion.
Example:
```typescript
interface User {
  name: string;
  age: number;
}
const user: User = { name: "Alice", age: 25 };
```

---

### 47. What are service workers, and how do they enable offline functionality?
**Answer**:  
Service workers are scripts that run in the background, intercepting network requests to enable offline functionality, caching, and push notifications.
Example:
```javascript
// sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll(['/', '/index.html', '/styles.css']);
    })
  );
});
self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)));
});
```
Register: `navigator.serviceWorker.register('/sw.js');`

---

### 48. What is the role of Webpack in front-end development?
**Answer**:  
Webpack is a module bundler that combines JavaScript, CSS, and other assets into optimized bundles. It supports:
- Code splitting and lazy loading.
- Tree shaking to remove unused code.
- Asset processing (e.g., Sass to CSS).
Example (Webpack config):
```javascript
module.exports = {
  entry: './src/index.js',
  output: { filename: 'bundle.js', path: './dist' },
  module: {
    rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader'] }]
  }
};
```

---

### 49. How do you stay updated with front-end development trends?
**Answer**:  
Stay updated by:
- Following blogs (e.g., CSS-Tricks, Smashing Magazine).
- Reading newsletters (e.g., Frontend Focus).
- Participating in communities (e.g., X, Reddit, Dev.to).
- Taking online courses (e.g., Udemy, freeCodeCamp).
- Experimenting with new tools/frameworks via side projects.

---

### 50. What are some common security concerns in front-end development?
**Answer**:  
Common concerns include:
- **Cross-Site Scripting (XSS)**: Sanitize user input and use frameworks like React that escape output.
- **Cross-Site Request Forgery (CSRF)**: Use CSRF tokens for forms.
- **Insecure Dependencies**: Audit packages with tools like `npm audit`.
- **Content Security Policy (CSP)**: Restrict script sources.
Example (CSP):
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://trusted.com">
```

---

This collection of questions and answers covers a wide range of topics to prepare for a front-end developer interview. Good luck!