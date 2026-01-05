# 50 React building-blocks questions & detailed answers

Below are **50 interview-style questions** focused on React’s core building blocks, each followed by a clear, detailed answer. I included your sample question **“Why does React use the Virtual DOM?”** as one of the items (Q1). Ready? Let’s go.

---

### 1. Why does React use the Virtual DOM?

**Answer:**
React uses a **Virtual DOM (VDOM)** — an in-memory lightweight representation of the real DOM — to minimize expensive direct DOM operations. Manipulating the browser DOM is slow because it triggers layout, style recalculation, and reflow/paint. React batches updates into an internal VDOM, calculates what changed via a diff (reconciliation) algorithm, and applies only the necessary minimal updates to the real DOM. This reduces the number of direct DOM writes and allows React to optimize when and how updates happen (batching, prioritization). The VDOM also enables abstractions such as functional rendering, time slicing (in concurrent features), and predictable UI updates because the VDOM snapshot approach makes it easier to reason about changes and implement features like reconciliation, server rendering, and hydration.

---

### 2. What is JSX and why is it used?

**Answer:**
JSX is a syntax extension that looks like HTML/XML but compiles to JavaScript `React.createElement` calls. It improves developer ergonomics by allowing UI structure and markup to be written inline with JavaScript logic. JSX is not required, but it makes component templates readable and concise. Under the hood, JSX transforms to objects (React elements) that represent the VDOM nodes, including type, props, and children. This keeps UI declarative and composable, enables tooling (linting, syntax highlighting), and makes templates easier to reason about compared to manual `createElement` calls.

---

### 3. What is a React element vs a component?

**Answer:**
A **React element** is the smallest unit — an immutable object describing a DOM node or component instance (`{ type, props, children }`). Elements are what JSX produces. A **component** is a function or class that returns React elements. Components are reusable, can accept props, and manage state/lifecycle (if stateful). Elements describe what should be rendered; components define how to produce those elements.

---

### 4. What are props in React and how are they different from state?

**Answer:**
**Props** (properties) are read-only inputs passed from a parent to a child component. They make components configurable and reusable. **State** is internal, managed by the component (via `useState`, `this.state`), and can change over time causing re-renders. Props come from outside and should not be mutated by the receiving component; state is internal and mutable via state update functions. Props flow down, events/state changes flow up (callback props) to achieve parent control.

---

### 5. What is state in React and how does it trigger updates?

**Answer:**
State is component-local data that affects rendering. In class components it lives in `this.state` and is updated via `this.setState`; in functional components via `useState`/`useReducer`. When state updates, React schedules a re-render for that component; during reconciliation React compares the new VDOM to the previous one and updates the real DOM accordingly. Modern React batches state updates inside event handlers to avoid unnecessary intermediate renders and uses priorities in concurrent features to schedule updates efficiently.

---

### 6. How does React reconciliation work?

**Answer:**
Reconciliation is the process React uses to determine how the UI should change in response to updates. React creates a new VDOM tree on each render, then performs a diff against the previous tree. It applies heuristic rules (e.g., same type = update; different type = replace; keyed lists to match children) to compute minimal changes. The Fiber architecture lets React pause, resume, and prioritize reconciliation work. Keys on lists are crucial to help reconciliation correctly match and reorder items without unnecessary DOM operations.

---

### 7. What are keys and why are they important in lists?

**Answer:**
Keys are unique identifiers (usually strings/IDs) assigned to list items (`<li key={id}>`). Keys allow React to match VDOM children between renders and track identity across reorders, insertions, and deletions. Without stable keys, React may reuse DOM nodes incorrectly or perform more operations (recreate nodes) leading to bugs and performance hits. Keys should be stable, predictable, and unique among siblings; using array indexes as keys is risky if the list changes order.

---

### 8. What are controlled vs uncontrolled components?

**Answer:**
**Controlled components** are form inputs where React state is the single source of truth (`value={state}` + `onChange` updates state). **Uncontrolled components** let the DOM manage the input state (use refs to access values). Controlled inputs offer predictable data flow, validation, and easier synchronization with app state; uncontrolled components can be simpler for simple uncontrolled forms or when integrating third-party libraries, but they sacrifice immediate control and predictability.

---

### 9. What is the purpose of `ref` in React?

**Answer:**
Refs provide a way to access a DOM node or component instance directly (`useRef`, `createRef`). They’re used when you need imperative control: focusing inputs, measuring size/position, managing animations, interacting with third-party DOM APIs, or storing mutable values that persist across renders without causing re-renders. Refs should be used sparingly — prefer declarative approaches when possible.

---

### 10. What are lifecycle methods in class components and their hooks equivalents?

**Answer:**
Class lifecycle methods include `constructor`, `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`, `shouldComponentUpdate`, etc. Hooks provide equivalents: `useEffect` can replace `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` depending on dependencies; `useLayoutEffect` for synchronous DOM reads/writes after render; `useMemo`/`useCallback` for memoization; `useRef` for instance-like persistence. Hooks unify lifecycle concerns into a composable API.

---

### 11. What is `useEffect` and how does dependency array work?

**Answer:**
`useEffect` runs side effects after render. The dependency array (`[]`, `[a,b]`, or omitted) controls when the effect runs: empty array → run once after mount; specific dependencies → run after mount and whenever any dependency changes; omitted → run after every render. Returning a cleanup function handles unmount or pre-effect cleanup. Proper dependency lists avoid stale closures and unnecessary runs — ESLint rules help enforce correctness.

---

### 12. What is `useMemo` vs `useCallback` and when to use them?

**Answer:**
`useMemo` memoizes computed values; `useCallback` memoizes function references. Use `useMemo` to avoid expensive recalculations between renders when inputs haven’t changed. Use `useCallback` to prevent unnecessary re-creation of functions that are passed to children (which can prevent needless child re-renders). Overusing them can add complexity and memory cost; only use when there’s a measured perf problem or when stable references are required (e.g., dependencies of other hooks or memoized components).

---

### 13. What is `useReducer` and when is it preferred over `useState`?

**Answer:**
`useReducer` manages complex state logic with a reducer function (`(state, action) => newState`). It’s useful when state updates depend on previous state, when multiple sub-values are updated together, or when you want action-based updates (similar to Redux pattern). It centralizes state transitions, making logic testable and predictable. For simple independent state values, `useState` is simpler.

---

### 14. What is Context API and when to use it?

**Answer:**
Context provides a way to pass data through the component tree without prop drilling. Use it for global-ish data like theme, authenticated user, or locale. Create a context with `React.createContext`, provide a value with `<Context.Provider>`, and consume via `useContext` or `Context.Consumer`. Beware: context updates propagate to all consumers, which can cause unnecessary re-renders; consider splitting contexts or memoizing provider values for performance.

---

### 15. What are higher-order components (HOCs)?

**Answer:**
HOCs are functions that take a component and return an enhanced component (`const Enhanced = withFeature(Wrapped)`). They implement cross-cutting concerns (logging, routing, data fetching) by wrapping components. HOCs were widely used before hooks; many use cases now map to custom hooks or render-props. HOCs can introduce wrapper hierarchies and prop/name collisions; use them judiciously or prefer hooks/composition.

---

### 16. What are render props?

**Answer:**
A render prop is a function prop (commonly named `render` or `children`) that determines what to render. Components using render props expose data/behavior to children via a function: `<DataProvider>{data => <UI data={data} />}</DataProvider>`. This pattern enables sharing logic between components. Hooks have reduced the need for render props by enabling logic reuse without extra wrapper components.

---

### 17. What is memoization in React (`React.memo`, `PureComponent`)?

**Answer:**
Memoization prevents unnecessary re-renders by comparing props. `React.memo` wraps a functional component and shallowly compares props — if unchanged, React reuses the previous render result. `PureComponent` is the class equivalent. Memoization helps performance but can hide issues if props include unstable references (new functions/objects each render). Use stable props and only memoize when you measure a cost benefit.

---

### 18. How does `setState` behave in class components (synchronous vs asynchronous)?

**Answer:**
`setState` is asynchronous in that React may batch multiple updates for performance. You shouldn’t rely on `this.state` immediately after `setState`; instead use the updater form `this.setState(prev => ({ count: prev.count + 1 }))` to derive new state from old state. In certain environments (outside React event handlers), updates may be flush-synchronous; the key rule is to never compute new state from `this.state` without the functional updater if you need the latest value.

---

### 19. What is the Fiber architecture?

**Answer:**
Fiber is React’s reimplementation of the reconciliation algorithm that breaks rendering work into small units (fibers) so it can be paused, resumed, and prioritized. This enabled features like time slicing and concurrent rendering. Fiber represents each component as a unit of work with pointers to child/sibling/parent, allowing React to do incremental rendering and interleave rendering with other browser tasks, improving responsiveness for complex UIs.

---

### 20. What is Concurrent Mode (and related APIs like `useTransition`)?

**Answer:**
Concurrent Mode (now incrementally added as concurrent features) allows React to interrupt long renders and prioritize urgent updates (like user input) over non-urgent work. APIs like `useTransition` let you mark updates as low priority (transitions) so React can keep UI responsive. `useDeferredValue` defers a value, letting React show a previous stable value until the new value is ready. These features are about scheduling and UX, not changing semantics of components.

---

### 21. What is server-side rendering (SSR) and hydration?

**Answer:**
SSR renders React on the server and sends HTML to the client for faster initial paint and better SEO. **Hydration** is the process of attaching React event listeners and internal VDOM to the server-rendered HTML on the client to make it interactive. Hydration must match the server output exactly; mismatches can cause warnings and force re-renders. Modern frameworks like Next.js provide optimized SSR + hydration flows.

---

### 22. What is code-splitting and `React.lazy` + `Suspense`?

**Answer:**
Code-splitting splits app bundles so that only needed code loads initially, improving startup performance. `React.lazy(() => import('./Comp'))` lets you lazily load components; `Suspense` provides a fallback while loading. This is declarative, easy to use, and integrates with bundlers. Suspense for data fetching is an evolving feature that extends this principle beyond code to asynchronous data, enabling coordinated loading states.

---

### 23. What are Error Boundaries?

**Answer:**
Error boundaries are components that catch JavaScript errors during rendering, lifecycle methods, and constructors of the whole tree below them (class components implementing `componentDidCatch` and `getDerivedStateFromError`). They prevent the entire React tree from unmounting by rendering a fallback UI. Hooks can’t create error boundaries directly — must use class components — but you can wrap hook-based components with an error-boundary class.

---

### 24. What are fragments and why use them?

**Answer:**
Fragments (`<>...</>` or `<React.Fragment>`) let you return multiple children from a component without adding extra DOM nodes. They keep the DOM clean and avoid unnecessary wrapper `<div>`s (which can break CSS/layout). Fragments support `key` when mapping lists of items and are lightweight.

---

### 25. What is prop drilling and how to avoid it?

**Answer:**
Prop drilling is passing props down many levels to reach a deeply nested component that needs them. It makes code harder to maintain. Avoid prop drilling by using Context API, composition, or state management libraries (Redux/MobX) for genuinely global state. For isolated hierarchies, restructure components or lift state up to a closer ancestor to limit depth.

---

### 26. What is the purpose of Synthetic Events in React?

**Answer:**
React wraps browser native events in SyntheticEvent — a cross-browser wrapper that provides consistent behavior and pooling for memory optimization (though pooling is less relevant now). Synthetic events normalize event properties across browsers and integrate with React’s event delegation system (events are attached at the document root and delegated), which reduces the number of listeners and improves efficiency.

---

### 27. How does React handle events (delegation, performance implications)?

**Answer:**
React uses event delegation: instead of attaching many listeners to individual DOM nodes, React attaches a single listener at the root and dispatches events to components via its internal system. This saves memory and simplifies cleanup, but means event handling semantics may differ slightly from native events (e.g., `stopPropagation` still works but internal handling may differ). For large apps, delegation reduces overhead from thousands of DOM listeners.

---

### 28. What are portals and when would you use them?

**Answer:**
Portals let you render children into a DOM node outside the root DOM tree (`ReactDOM.createPortal`). Use portals for modals, tooltips, and overlays where the rendered element must exist outside parent overflow/stacking contexts but still operate in React’s component tree (events propagate to React hierarchy). Portals simplify layout and keep logic within the React component model while solving CSS/positioning issues.

---

### 29. How do you optimize performance in React apps?

**Answer:**
Performance strategies include: avoiding unnecessary re-renders (`React.memo`, `PureComponent`, `shouldComponentUpdate`), memoizing heavy calculations (`useMemo`), stabilizing callbacks (`useCallback`), splitting bundles (code-splitting), virtualization for long lists (react-window/react-virtualized), avoiding prop object/array recreation, batching updates, lazy-loading images and routes, and profiling (React Profiler) to find hot spots. Also consider server-side rendering, caching, and minimizing expensive DOM reads/writes.

---

### 30. What is React Profiler and how do you use it?

**Answer:**
React Profiler is a tool (DevTools and API `<Profiler onRender={...} />`) to measure rendering performance. It records render durations, why components render, and which props changed. Use it to identify components causing slow renders and to validate optimizations. The Profiler can show "commit time" and help you prioritize optimization efforts based on real metrics, not guesswork.

---

### 31. What is `useRef` for storing mutable values vs accessing DOM?

**Answer:**
`useRef` creates a mutable object `{ current }` that persists across renders. It’s commonly used to access DOM elements, but also to store any mutable value that should not cause re-renders when updated (e.g., timers, previous props/state, tracking render counts). Unlike state, updating `.current` doesn’t trigger a re-render, making refs ideal for imperatively stored values.

---

### 32. How do you forward refs and why?

**Answer:**
Ref forwarding (`React.forwardRef`) lets parent components pass a ref through a component to a child DOM node. Useful for building reusable components that behave like native inputs (focusable), or when wrapping third-party components while preserving imperative access. The pattern: `const Comp = forwardRef((props, ref) => <input ref={ref} ... />)`.

---

### 33. What is hydration mismatch and how to prevent it?

**Answer:**
Hydration mismatch occurs when server-rendered HTML doesn’t match the client’s initial render, causing warnings or re-renders. Prevent by ensuring server and client render the same output (avoid data or random values only on client), defer client-only differences with `useEffect`, use stable IDs, and guard access to browser-only APIs. When differences are unavoidable (e.g., `window`), render a placeholder on the server and update on the client.

---

### 34. What are side effects in React and why should they go in `useEffect`?

**Answer:**
Side effects are operations that interact with external systems or cause things outside the render’s scope: network requests, subscriptions, timers, DOM mutations, logging. `useEffect` is the hook to run side effects after render, keeping render pure and synchronous (render must be idempotent). Put effect setup and cleanup in `useEffect` to avoid memory leaks and ensure predictable lifecycle semantics.

---

### 35. Explain composition vs inheritance in React.

**Answer:**
React encourages **composition** — assembling UIs from small components and passing children/props — over classical inheritance. Composition provides flexible, reusable building blocks (slots, render props, HOCs). Inheritance is rarely used; the component model and composition patterns handle code reuse and specialization better, maintaining simpler, more maintainable architectures.

---

### 36. What is optimistic UI and how can you implement it in React?

**Answer:**
Optimistic UI updates assume a successful server result and update the UI immediately, improving perceived performance. Implement by updating local state right away, showing pending status, and rolling back if the server returns an error. Use unique temporary IDs for created items, track async state (loading/error), and reconcile real server responses (replacing temp data with confirmed data) to keep UI consistent.

---

### 37. How does React handle error boundaries with hooks-based components?

**Answer:**
Error boundaries must be class components implementing `componentDidCatch`. To use error boundaries with hook-based components, wrap functional components with an error boundary component. For finer-grained handling, you can build reusable error-boundary wrappers and use composition to apply them where needed. Libraries also provide hook-like APIs to surface errors, but the boundary itself remains a class at present.

---

### 38. What is tree shaking and how does it relate to React apps?

**Answer:**
Tree shaking is a bundler optimization that removes unused code (dead exports) using ES modules. In React apps, tree shaking reduces bundle size by eliminating unused parts of libraries and your code. Writing modular code, using named exports, and avoiding dynamic `require` calls improves tree shaking effectiveness. Tools like Webpack, Rollup, and modern bundlers perform tree shaking during build.

---

### 39. What are functional updates in `useState` and why use them?

**Answer:**
Functional updates pass a function to the state setter: `setCount(prev => prev + 1)`. This is necessary when the new state depends on the previous state and ensures correctness when multiple updates are batched. It avoids stale closures and race conditions when updates occur asynchronously.

---

### 40. What is throttling vs debouncing in React and when to use them?

**Answer:**
Both control the frequency of function calls. **Debounce** delays a function until a pause in events (e.g., search input) — use when you want a single final action. **Throttle** ensures a function runs at most once every interval (e.g., scroll/resize handlers) — use when you need periodic updates. In React, wrap handlers with debouncing/throttling utilities (or `useCallback` + custom hook) to reduce expensive operations and re-renders.

---

### 41. How do you test React components?

**Answer:**
Common approaches: unit test pure logic (Jest), component test rendering and behavior (React Testing Library), snapshot testing (Jest snapshots for UI stability), and end-to-end testing (Cypress, Playwright). Prefer testing behavior over implementation details: render as a user would, assert DOM outcomes, simulate events, and test effects. Keep tests focused, deterministic, and fast.

---

### 42. What is the difference between `useLayoutEffect` and `useEffect`?

**Answer:**
`useLayoutEffect` runs synchronously after DOM mutations but before the browser paints, allowing you to read layout and synchronously apply changes to avoid flicker. `useEffect` runs after paint (asynchronously), which is usually preferable for non-blocking tasks like network calls. Use `useLayoutEffect` only when you need to measure DOM size/position and synchronously update the DOM to prevent visual glitches.

---

### 43. What are controlled side-effects and how to avoid stale closures?

**Answer:**
Stale closures happen when an effect captures outdated values from previous renders. Avoid by specifying correct dependency arrays for hooks, using refs to access up-to-date mutable values, or re-declaring functions/values in the dependency array. Controlled side effects ensure the effect re-runs when any value it depends on changes, keeping behavior consistent.

---

### 44. What is render prop drilling vs context — tradeoffs?

**Answer:**
Render prop drilling passes functions down many levels versus context which provides values globally. Render props are explicit and scoped; context hides plumbing and reduces props but can cause re-renders on provider value change. Context is preferable for global cross-cutting data; render props or composition are better when the data is local or when you want explicit control of updates and scoping.

---

### 45. What is virtualization/windowing and why use it?

**Answer:**
Virtualization (windowing) renders only visible items in long lists (react-window, react-virtualized). It dramatically reduces DOM node counts and renders, improving performance for large datasets by recycling DOM nodes and computing visible ranges. Use for chat feeds, infinite scrolls, large tables — whenever rendering every item would be expensive.

---

### 46. How does `React.Children` help?

**Answer:**
`React.Children` provides utilities for manipulating `props.children` (map, forEach, toArray, count, only). It normalizes children (which can be a single child, array, or nested structure) and helps safely iterate, clone, or validate children in component libraries and advanced composition scenarios.

---

### 47. What are controlled side-effect cleanup patterns?

**Answer:**
Cleanup in effects returns a cleanup function (`useEffect(() => { const id = setTimeout(...); return () => clearTimeout(id); }, [])`). For subscriptions, unsubscribe in cleanup; for event listeners, remove them; for async calls, track mounted state via ref or abort controller to avoid setting state on unmounted components. Always clean up to avoid memory leaks and race conditions.

---

### 48. How do you handle accessibility (a11y) in React?

**Answer:**
Accessibility is about semantics and keyboard interaction: use semantic HTML, ARIA attributes when needed, proper labels for inputs, meaningful alt text for images, focus management (especially for modals/portals), keyboard navigation, and tools (axe, Lighthouse) to test. Use `role`, `aria-*` attributes carefully and ensure interactive elements are reachable via keyboard and screen readers.

---

### 49. How to structure a scalable React project (folder/layout)?

**Answer:**
No single perfect pattern, but common principles: group by feature/domain (feature folders) or by type (components, hooks, pages). Keep components small and focused, centralize shared utilities/hooks, define a consistent naming convention, leverage index exports, and separate presentational vs container logic. Maintainable projects favor clear boundaries, documented APIs for shared components, and a consistent styling approach (CSS Modules, styled-components, or Tailwind).

---

### 50. What is the difference between `useEffect` cleanup and `componentWillUnmount`?

**Answer:**
`componentWillUnmount` (class) runs once before unmount. In hooks, the cleanup function returned by `useEffect` executes before the effect re-runs (on dependency change) and before unmount. So `useEffect` cleanup handles both teardown on unmount and per-effect updates, making lifecycle management more composable: you can colocate setup and cleanup with the logic that needs it.

---

If you want, I can:

- Turn these into a printable study sheet.
- Provide **short** and **concise** answers for quick revision.
- Convert them into flashcards or a mock interview quiz (I’ll ask you these questions one by one).
- Expand any particular answer (e.g., show code examples for `useEffect` dependency pitfalls, virtualization setup, or `React.memo` usage).

Which of those would help you most next?
