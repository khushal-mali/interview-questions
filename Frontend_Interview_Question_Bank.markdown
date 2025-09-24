# 🚀 Ultimate Frontend Developer Interview Question Bank

This question bank contains **200+ frontend interview questions**, organized by topic, tailored for mid-level Frontend Developer roles (e.g., React-focused with TypeScript). Each section includes:

- **Questions**: Common and advanced questions asked in interviews.
- **Why Asked**: The intent behind the question (e.g., testing fundamentals, problem-solving, or practical application).
- **How to Prepare**: Tips and resources to master the topic, including practice problems and key concepts.

---

## 📋 Table of Contents
1. **HTML & Accessibility**
2. **CSS**
3. **JavaScript**
4. **React**
5. **TypeScript**
6. **State Management**
7. **Testing**
8. **Build Tools & Performance**
9. **Frontend System Design**
10. **Behavioral Questions**

---

## 1. **HTML & Accessibility** (30 Questions)

### Questions
1. What is semantic HTML, and why is it important?
2. Difference between `<section>`, `<article>`, and `<div>`?
3. How do you structure a form for accessibility?
4. What are ARIA roles, and when should you use them?
5. Explain the purpose of the `alt` attribute in images.
6. How do you ensure keyboard navigation for a website?
7. What is the difference between `<button>` and `<input type="button">`?
8. What are HTML5 APIs? Name a few.
9. How do you validate form inputs in HTML?
10. What is the `data-` attribute, and how is it used?
11. Difference between `id` and `class` attributes?
12. What is the purpose of the `<meta>` tag?
13. How do you make a webpage accessible for screen readers?
14. What is the `tabindex` attribute, and how does it work?
15. Explain the role of the `lang` attribute in HTML.
16. What is the difference between `block`, `inline`, and `inline-block` elements?
17. How do you handle SEO in a single-page application (SPA)?
18. What are microdata and schema.org in HTML?
19. How do you make an image responsive without CSS?
20. What is the purpose of the `rel` attribute in links?
21. Difference between `<script>`, `<script async>`, and `<script defer>`?
22. How do you handle cross-browser compatibility in HTML?
23. What is the `contenteditable` attribute?
24. How do you optimize HTML for performance?
25. What are void elements in HTML?
26. Explain the use of `<picture>` and `<source>` tags.
27. What is the difference between `hidden` attribute and `display: none`?
28. How do you create a custom HTML element?
29. What is the purpose of the `role` attribute in accessibility?
30. How do you handle focus management in a modal dialog?

### Why Asked?
These questions test your understanding of HTML fundamentals, accessibility (a11y), and best practices. Companies prioritize accessible, SEO-friendly, and performant websites, so interviewers assess your ability to write clean, semantic, and user-friendly HTML.

### How to Prepare
- **Study**: MDN HTML Docs, WebAIM, and a11yproject.com for accessibility guidelines.
- **Practice**: Build accessible forms, modals, and landing pages. Use Lighthouse to audit accessibility.
- **Key Concepts**: Semantic tags, ARIA roles, keyboard navigation, SEO basics.
- **Resources**: W3C Accessibility Standards, freeCodeCamp HTML tutorials.
- **Practice Problems**:
  - Build a semantic portfolio page with proper ARIA roles.
  - Create an accessible form with validation and error handling.

---

## 2. **CSS** (40 Questions)

### Questions
1. What is the CSS box model?
2. Difference between `relative`, `absolute`, `fixed`, and `sticky` positioning?
3. How does CSS specificity work?
4. What is the difference between `display: none` and `visibility: hidden`?
5. Explain Flexbox and its key properties.
6. When would you use CSS Grid over Flexbox?
7. How do you center a div horizontally and vertically?
8. What are media queries, and how do they support responsive design?
9. Explain the CSS `z-index` property.
10. What is the difference between `rem` and `em` units?
11. How do you create a CSS animation?
12. What are pseudo-classes and pseudo-elements?
13. Difference between `:hover` and `:active`?
14. How does the CSS cascade work?
15. What is the `calc()` function in CSS?
16. Explain the `flex-grow`, `flex-shrink`, and `flex-basis` properties.
17. How do you handle browser-specific CSS prefixes?
18. What is a CSS reset, and why is it used?
19. How do you create a sticky footer?
20. What is the difference between `inline` and `inline-block`?
21. How do you optimize CSS for performance?
22. What is the `currentColor` keyword in CSS?
23. Explain CSS custom properties (variables).
24. How do you create a responsive image gallery?
25. What is the `clip-path` property used for?
26. Difference between `transition` and `animation`?
27. How do you implement dark mode with CSS?
28. What is the `will-change` property?
29. How do you handle CSS for right-to-left (RTL) languages?
30. What are CSS modules, and how do they work?
31. Explain the BEM methodology.
32. What is the purpose of the `aspect-ratio` property?
33. How do you create a gradient background?
34. What is the difference between `margin` and `padding`?
35. How do you use `box-shadow` effectively?
36. What is the `gap` property in Flexbox/Grid?
37. How do you handle CSS in a single-page application?
38. What is the `content` property in pseudo-elements?
39. How do you create a responsive typography system?
40. What are the benefits of utility-first frameworks like Tailwind?

### Why Asked?
CSS questions evaluate your ability to create responsive, maintainable, and performant layouts. Interviewers test your understanding of layout systems (Flexbox, Grid), animations, and modern CSS practices.

### How to Prepare
- **Study**: CSS-Tricks, MDN CSS Docs, Josh Comeau’s CSS for JS Developers.
- **Practice**: Build layouts (e.g., card grids, navbars) using Flexbox, Grid, and media queries. Experiment with Tailwind CSS.
- **Key Concepts**: Specificity, cascade, responsive design, animations, CSS methodologies (BEM, utility-first).
- **Resources**: freeCodeCamp CSS tutorials, Tailwind CSS Docs.
- **Practice Problems**:
  - Create a responsive dashboard layout with Grid.
  - Build an animated button with hover effects.

---

## 3. **JavaScript** (50 Questions)

### Questions
1. What is hoisting in JavaScript?
2. Difference between `var`, `let`, and `const`?
3. Explain the concept of closures with an example.
4. What is the `this` keyword, and how does it behave?
5. Difference between `==` and `===`?
6. What is the event loop in JavaScript?
7. Explain promises and their states.
8. How does `async/await` work under the hood?
9. What is event bubbling vs. event capturing?
10. How do you implement event delegation?
11. What is the difference between `null` and `undefined`?
12. Explain the prototype chain in JavaScript.
13. What are arrow functions, and how do they differ from regular functions?
14. What is destructuring in ES6?
15. Difference between `map`, `forEach`, `filter`, and `reduce`?
16. How do you deep copy an object in JavaScript?
17. What is the spread operator (`...`) used for?
18. Explain the `call`, `apply`, and `bind` methods.
19. What is a higher-order function?
20. How do you handle errors in JavaScript?
21. What is the purpose of `try/catch` blocks?
22. Explain the concept of debouncing.
23. What is throttling, and how is it different from debouncing?
24. How do you manipulate the DOM efficiently?
25. What are JavaScript modules (ES6)?
26. Difference between `import` and `require`?
27. What is the `Symbol` data type?
28. Explain the `Set` and `Map` data structures.
29. How do you handle asynchronous operations without promises?
30. What is a generator function in JavaScript?
31. Difference between shallow copy and deep copy?
32. What is the `typeof` operator, and what are its limitations?
33. How do you check if a variable is an array?
34. What is the `event.preventDefault()` method?
35. How do you create a custom event in JavaScript?
36. What is the difference between `slice` and `splice`?
37. Explain the `Array.prototype` methods.
38. What is the purpose of `Object.defineProperty`?
39. How do you handle memory leaks in JavaScript?
40. What is the `WeakMap` and `WeakSet`?
41. How do you optimize JavaScript performance?
42. What is the difference between `function` declaration and expression?
43. Explain the concept of currying in JavaScript.
44. How do you implement a polyfill for an older browser?
45. What is the `MutationObserver` API?
46. How do you handle CORS issues in JavaScript?
47. What is the `requestAnimationFrame` method?
48. How do you flatten a nested array?
49. What is the difference between `for...in` and `for...of` loops?
50. How do you implement a simple pub-sub pattern?

### Why Asked?
JavaScript is the backbone of frontend development. These questions test your understanding of core concepts, asynchronous programming, and real-world problem-solving.

### How to Prepare
- **Study**: JavaScript.info, You Don’t Know JS, MDN JavaScript Docs.
- **Practice**: Solve LeetCode problems (easy to medium) focusing on arrays, strings, and DOM manipulation.
- **Key Concepts**: Closures, prototypes, async programming, event handling, ES6+ features.
- **Resources**: Eloquent JavaScript, freeCodeCamp JavaScript tutorials.
- **Practice Problems**:
  - Implement debouncing/throttling for a search input.
  - Flatten a nested array or object.

---

## 4. **React** (40 Questions)

### Questions
1. What is the Virtual DOM, and how does it work?
2. Explain the reconciliation process in React.
3. Difference between `useState` and `useReducer`?
4. What is the purpose of the `useEffect` hook?
5. How does the dependency array in `useEffect` work?
6. What are controlled vs. uncontrolled components?
7. How do you optimize React performance?
8. What is `React.memo`, and when should you use it?
9. Explain the `useCallback` and `useMemo` hooks.
10. What is the Context API, and how do you use it?
11. How does React Router work?
12. What is prop drilling, and how do you avoid it?
13. How do you implement code-splitting in React?
14. What is lazy loading, and how is it done in React?
15. Difference between class and functional components?
16. What are React fragments?
17. How do you handle forms in React?
18. What is the purpose of `key` in React lists?
19. How do you manage side effects in React?
20. What is a higher-order component (HOC)?
21. Explain render props in React.
22. How do you handle errors in React components?
23. What is the `useRef` hook used for?
24. How do you create a custom hook in React?
25. What is the difference between `useState` and `useRef`?
26. How do you implement server-side rendering (SSR) in React?
27. What is hydration in React?
28. How do you handle authentication in a React app?
29. What are React portals?
30. How do you test a React component?
31. What is the difference between `React.StrictMode`?
32. How do you handle large lists in React?
33. What is the purpose of `Suspense` in React?
34. How do you implement a drag-and-drop feature in React?
35. What is the difference between `defaultProps` and `propTypes`?
36. How do you integrate WebSockets in a React app?
37. What are the benefits of using hooks over class components?
38. How do you handle state persistence in React?
39. What is the role of `children` in React components?
40. How do you debug performance issues in React?

### Why Asked?
React is the most popular frontend framework, and these questions test your ability to build and optimize complex React applications.

### How to Prepare
- **Study**: React Official Docs, Beta React Docs, Kent C. Dodds’ Epic React.
- **Practice**: Build small apps (e.g., todo, e-commerce) with React, Router, and Context.
- **Key Concepts**: Hooks, performance optimization, routing, component patterns.
- **Resources**: React Router Docs, Redux Toolkit Docs.
- **Practice Problems**:
  - Build an autocomplete input with React.
  - Create a paginated list with lazy loading.

---

## 5. **TypeScript** (20 Questions)

### Questions
1. What is TypeScript, and why use it in frontend development?
2. Difference between `interface` and `type`?
3. What are TypeScript generics?
4. Explain the `unknown` and `any` types.
5. What are utility types like `Pick`, `Omit`, `Partial`?
6. How do you handle type narrowing in TypeScript?
7. What is the `never` type?
8. How do you type a React component with TypeScript?
9. What is the `as` keyword in TypeScript?
10. How do you define a union type?
11. What is the `Record` utility type?
12. How do you handle optional properties in interfaces?
13. What is the difference between `extends` and `implements`?
14. How do you type an event handler in React with TypeScript?
15. What are discriminated unions?
16. How do you use TypeScript with Redux?
17. What is the `keyof` operator?
18. How do you handle third-party library types?
19. What is declaration merging in TypeScript?
20. How do you debug TypeScript type errors?

### Why Asked?
TypeScript is increasingly standard in frontend roles, and these questions test your ability to write type-safe, maintainable code.

### How to Prepare
- **Study**: TypeScript Handbook, Basarat’s TypeScript Deep Dive.
- **Practice**: Convert JavaScript React apps to TypeScript.
- **Key Concepts**: Types, interfaces, generics, utility types.
- **Resources**: TypeScript Playground, freeCodeCamp TypeScript tutorials.
- **Practice Problems**:
  - Type a todo app with TypeScript.
  - Create a generic function to fetch API data.

---

## 6. **State Management** (15 Questions)

### Questions
1. What is state management in frontend apps?
2. Difference between local and global state?
3. How does Redux work?
4. What is the role of reducers in Redux?
5. Explain Redux Toolkit and its benefits.
6. How does Zustand differ from Redux?
7. What is the Context API, and when should you use it?
8. How do you handle async actions in Redux?
9. What is the difference between `useSelector` and `useDispatch`?
10. How do you optimize state updates in Redux?
11. What is Jotai, and how does it work?
12. How do you persist state in a frontend app?
13. What are the trade-offs of using Context vs. Redux?
14. How do you debug state management issues?
15. When would you avoid using a state management library?

### Why Asked?
State management is critical for scalable apps, and these questions test your ability to manage complex application state.

### How to Prepare
- **Study**: Redux Toolkit Docs, Zustand GitHub, React Context Docs.
- **Practice**: Add state management to a React app (e.g., cart functionality).
- **Key Concepts**: Reducers, actions, selectors, async middleware.
- **Resources**: Redux DevTools, LogRocket tutorials.
- **Practice Problems**:
  - Build a cart with Redux Toolkit.
  - Implement a theme toggle with Context API.

---

## 7. **Testing** (15 Questions)

### Questions
1. Why is testing important in frontend development?
2. What is the difference between unit and integration testing?
3. How do you write a unit test with Jest?
4. What is React Testing Library, and how does it differ from Enzyme?
5. How do you test a React component?
6. What is mocking in testing?
7. Difference between a mock and a spy?
8. How do you write E2E tests with Cypress?
9. What is snapshot testing, and when is it useful?
10. How do you test asynchronous code?
11. What are the benefits of test-driven development (TDD)?
12. How do you test accessibility in a frontend app?
13. What is the `beforeEach` and `afterEach` in Jest?
14. How do you handle testing for third-party APIs?
15. What are the limitations of testing frontend applications?

### Why Asked?
Testing ensures reliability and maintainability, and these questions assess your ability to write robust, bug-free code.

### How to Prepare
- **Study**: Jest Docs, React Testing Library Docs, Cypress Docs.
- **Practice**: Write tests for a React app (unit and E2E).
- **Key Concepts**: Unit testing, mocking, E2E flows, accessibility testing.
- **Resources**: Testing Library tutorials, Cypress YouTube guides.
- **Practice Problems**:
  - Test a form component with Jest and RTL.
  - Write E2E tests for a login flow.

---

## 8. **Build Tools & Performance** (20 Questions)

### Questions
1. What is Webpack, and how does it work?
2. How does Vite differ from Webpack?
3. What is Babel, and why is it used?
4. Explain code-splitting and its benefits.
5. What are Core Web Vitals (LCP, CLS, FID)?
6. How do you optimize a website for performance?
7. What is tree-shaking in JavaScript?
8. How do you reduce bundle size in a frontend app?
9. What is a Service Worker, and how is it used?
10. How do you implement lazy loading for images?
11. What is the purpose of a `.babelrc` file?
12. How do you configure Webpack for production?
13. What is the role of a module bundler?
14. How do you use Lighthouse to audit performance?
15. What is the difference between `preload` and `prefetch`?
16. How do you optimize font loading?
17. What is the `IntersectionObserver` API?
18. How do you handle caching in a frontend app?
19. What are the benefits of using a CDN?
20. How do you debug build issues in Webpack/Vite?

### Why Asked?
Build tools and performance optimization are critical for production-ready apps, and these questions test your ability to deliver fast, scalable applications.

### How to Prepare
- **Study**: Webpack Docs, Vite Docs, web.dev (Core Web Vitals).
- **Practice**: Set up a React app with Vite and optimize its bundle.
- **Key Concepts**: Bundling, lazy loading, caching, performance metrics.
- **Resources**: Lighthouse guides, LogRocket performance tutorials.
- **Practice Problems**:
  - Optimize an image-heavy app with lazy loading.
  - Run a Lighthouse audit and fix issues.

---

## 9. **Frontend System Design** (20 Questions)

### Questions
1. How would you design a scalable component library?
2. How do you handle large lists (100k+ rows) in a frontend app?
3. Explain how to build a real-time dashboard.
4. How would you design an image-heavy news feed?
5. What is the architecture of a single-page application (SPA)?
6. How do you implement authentication in a frontend app?
7. What are the trade-offs of client-side vs. server-side rendering?
8. How do you handle state synchronization in real-time apps?
9. What is the role of WebSockets in frontend apps?
10. How do you design a reusable form component?
11. What is the difference between pagination and infinite scroll?
12. How do you implement a virtualized list in React?
13. What are the considerations for designing a dark mode feature?
14. How do you handle internationalization (i18n) in a frontend app?
15. What is the role of a design system in frontend development?
16. How do you optimize API calls in a frontend app?
17. What is the difference between JWT and OAuth?
18. How do you handle offline support in a frontend app?
19. How would you design a multi-tenant frontend application?
20. What are the challenges of scaling a frontend app to millions of users?

### Why Asked?
System design questions test your ability to architect scalable, performant, and user-friendly frontend systems, which is crucial for senior roles.

### How to Prepare
- **Study**: Frontend System Design by Alex Xu, LogRocket system design articles.
- **Practice**: Design a dashboard or news feed and explain your choices.
- **Key Concepts**: Component architecture, scalability, authentication, real-time updates.
- **Resources**: Storybook Docs, Clerk/Auth0 Docs.
- **Practice Problems**:
  - Design a scalable modal component.
  - Architect a real-time chat app.

---

## 10. **Behavioral Questions** (20 Questions)

### Questions
1. Tell me about yourself.
2. Describe your most challenging project.
3. How do you handle disagreements with a teammate?
4. What was a time you improved an app’s performance?
5. How do you stay updated with frontend trends?
6. Describe a time you failed and what you learned.
7. How do you prioritize tasks in a project?
8. What do you do when you don’t know how to solve a problem?
9. How do you handle tight deadlines?
10. Describe a time you mentored a junior developer.
11. How do you ensure code quality in a team?
12. What was a time you went above and beyond for a project?
13. How do you handle feedback from stakeholders?
14. What motivates you as a frontend developer?
15. Describe a time you resolved a production bug.
16. How do you balance design and functionality?
17. What is your approach to learning a new framework?
18. How do you collaborate with backend developers?
19. What was a time you improved user experience?
20. Why do you want to work at our company?

### Why Asked?
Behavioral questions assess your communication, teamwork, and problem-solving skills, which are critical for fitting into a team and company culture.

### How to Prepare
- **Study**: Use the STAR method (Situation, Task, Action, Result) for answers.
- **Practice**: Write down 2-3 stories for each question and rehearse.
- **Key Concepts**: Communication, conflict resolution, growth mindset.
- **Resources**: Big Interview, Glassdoor behavioral questions.
- **Practice Problems**:
  - Prepare a 2-minute “Tell me about yourself” pitch.
  - Practice answering conflict resolution questions with a peer.

---

## 🎯 How to Use This Question Bank
1. **Daily Practice**:
   - Pick 5-10 questions per day, covering 2-3 topics.
   - Write or explain answers aloud to mimic interview conditions.
2. **Coding Practice**:
   - For technical questions, implement solutions on LeetCode, CodePen, or a local setup.
   - Focus on practical challenges (e.g., debounced search, infinite scroll).
3. **Mock Interviews**:
   - Use platforms like Pramp or ask a friend to ask random questions from the bank.
   - Record yourself to improve clarity and confidence.
4. **Track Progress**:
   - Use a spreadsheet or Notion to mark questions you’ve mastered or need to revisit.
5. **Resources**:
   - Combine with MDN, React Docs, TypeScript Handbook, and freeCodeCamp.
   - Follow #Frontend and #ReactJS on X for real-time trends.

---

## 💡 Additional Tips
- **Focus on Weak Areas**: Spend extra time on topics you find challenging (e.g., TypeScript, system design).
- **Explain Thought Process**: Practice verbalizing your approach while solving problems.
- **Build Projects**: Create 2-3 portfolio projects (e.g., todo app, e-commerce) to demonstrate skills.
- **Stay Updated**: Follow frontend influencers on X for the latest tools and trends.

---

If you want a **90-day study plan** to pair with this question bank or need detailed answers to specific questions, let me know, and I’ll create a tailored artifact!