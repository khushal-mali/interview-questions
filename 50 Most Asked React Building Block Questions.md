# 50 Most Asked React Building Block Questions

This Markdown file contains 50 frequently asked questions about React's core building blocks, focusing on fundamentals like components, state, props, hooks, lifecycle, and more. Each question is followed by a detailed answer to provide a solid understanding. These are curated based on common interview and learning queries.

## 1. What is React?

React is an open-source JavaScript library developed by Facebook (now Meta) for building user interfaces, particularly single-page applications. It allows developers to create reusable UI components that manage their own state efficiently. React uses a declarative programming style, where you describe what the UI should look like for a given state, and React handles the rendering and updates. At its core, React revolves around the concept of components, which are the building blocks of the UI.

## 2. What is the Virtual DOM in React?

The Virtual DOM (VDOM) is a lightweight, in-memory representation of the real DOM. React creates a VDOM tree that mirrors the structure of the actual DOM. When state or props change, React updates the VDOM, compares it with the previous VDOM (via a process called reconciliation or diffing), and then applies only the necessary changes to the real DOM. This minimizes expensive DOM manipulations, improving performance.

## 3. What are React Components?

React components are independent, reusable pieces of UI that encapsulate HTML, CSS, and JavaScript logic. They can be functional (simple functions returning JSX) or class-based (ES6 classes extending React.Component). Components receive data via props and manage internal data via state. They form the hierarchical structure of a React app, with a root component like `<App />` rendering child components.

## 4. Explain the difference between Functional and Class Components.

Functional components are JavaScript functions that return JSX and are stateless by default (though they can use hooks for state). They are simpler, more concise, and preferred in modern React. Class components extend `React.Component`, have built-in state and lifecycle methods, and use `this` for context. Functional components with hooks (e.g., `useState`, `useEffect`) have largely replaced class components due to better performance and readability.

## 5. What are Props in React?

Props (short for properties) are read-only data passed from a parent component to a child component. They act like function arguments, allowing components to be reusable and configurable. Props are immutable within the child; any changes must come from the parent re-rendering. Example: `<Child name="John" />` passes `name` as a prop. Destructuring props in the child function enhances readability.

## 6. What is State in React?

State is a built-in object in class components (or managed via `useState` hook in functional components) that holds dynamic data that changes over time, triggering re-renders. Unlike props, state is mutable but should only be updated via `setState()` (class) or the setter from `useState` (functional) to ensure React detects changes. State promotes unidirectional data flow.

## 7. How does one-way data binding work in React?

React enforces one-way (unidirectional) data binding, where data flows downward from parent to child via props. Changes in parent state propagate to children on re-render. To simulate two-way binding (e.g., for forms), use controlled components: tie input values to state and handle changes with `onChange` events that update state, creating a feedback loop.

## 8. What is JSX?

JSX (JavaScript XML) is a syntax extension for JavaScript that looks like HTML but allows embedding JavaScript expressions inside curly braces `{}`. It's transpiled to `React.createElement()` calls by Babel. JSX enables declarative UI description in code, e.g., `const element = <h1>Hello, {name}!</h1>;`. It must have one parent element and supports attributes like `className` instead of `class`.

## 9. Explain React's Reconciliation Process.

Reconciliation is React's algorithm for updating the DOM efficiently. When a component re-renders, React creates a new VDOM tree, diffs it against the previous one (using heuristics like key props for lists), and computes the minimal set of changes (patches). These are then applied to the real DOM. This process ensures fast updates by avoiding full re-renders.

## 10. What are Keys in React Lists?

Keys are special string attributes in React lists (e.g., `map()`) that help identify which items have changed, been added, or removed. They enable efficient reconciliation by providing stable identities. Use unique, stable values like IDs: `{items.map(item => <li key={item.id}>{item.name}</li>)}`. Avoid index-based keys for dynamic lists to prevent bugs like incorrect state updates.

## 11. How do you handle Events in React?

React events use camelCase (e.g., `onClick`) and pass synthetic events (wrappers around native events for cross-browser consistency). Event handlers are functions: `<button onClick={handleClick}>Click</button>`. For inline handlers, use arrow functions to avoid rebinding `this`. Prevent default behavior with `e.preventDefault()`.

## 12. What is Conditional Rendering in React?

Conditional rendering displays UI based on conditions using JavaScript operators like `&&`, ternary (`? :`), or `if` statements outside JSX. Example: `{isLoggedIn ? <UserGreeting /> : <GuestGreeting />} or {show && <Alert />}`. It leverages React's declarative nature to dynamically include/exclude elements without manual DOM manipulation.

## 13. Explain the Role of Render Method.

The `render()` method in class components (or the return statement in functional) defines what the component outputs to the UI. It should be pure (no side effects) and return JSX, null, or false. React calls it during mounting, updates, and unmounting. Only the output matters; internal logic goes in lifecycle methods or hooks.

## 14. What are Lifecycle Methods in React?

Lifecycle methods are special hooks in class components that run at specific points: Mounting (e.g., `componentDidMount` for API calls), Updating (e.g., `componentDidUpdate` for prop changes), and Unmounting (`componentWillUnmount` for cleanup). They allow intervention in the component's lifecycle. Modern equivalents are hooks like `useEffect`.

## 15. What is componentDidMount?

`componentDidMount()` runs once after the component mounts and the DOM is updated. Ideal for side effects like fetching data, setting up subscriptions, or DOM manipulations. Example: Fetch API data and update state. It's the class equivalent of `useEffect` with an empty dependency array.

## 16. What is componentDidUpdate?

`componentDidUpdate(prevProps, prevState)` runs after updates, receiving previous values for comparison. Use for conditional side effects, like re-fetching data if props change. Avoid infinite loops by checking changes: `if (prevProps.id !== this.props.id) { fetchData(); }`. Pair with `useEffect` dependencies.

## 17. What is componentWillUnmount?

`componentWillUnmount()` runs before unmounting, perfect for cleanup: clearing timers, canceling API requests, or removing event listeners to prevent memory leaks. It doesn't receive arguments and can't trigger state updates. Use `useEffect` return function for functional equivalents.

## 18. What are React Hooks?

Hooks are functions that let functional components use state and lifecycle features. Introduced in React 16.8, they avoid class complexities. Common hooks: `useState` for state, `useEffect` for side effects. Rules: Call at top level, only in React functions. Custom hooks reuse logic.

## 19. Explain useState Hook.

`useState(initialValue)` returns a state variable and its setter. It preserves state across re-renders: `const [count, setCount] = useState(0);`. For objects/arrays, use spread or immer for immutability. Lazy initialization: Pass a function `useState(() => computeInitial())` for expensive setups.

## 20. What is useEffect Hook?

`useEffect(callback, dependencies)` runs side effects (e.g., API calls, subscriptions) after render. Empty deps `[]` mimics `componentDidMount`; no deps runs every render; return cleanup function for `componentWillUnmount`. It replaces multiple lifecycle methods with one.

## 21. How to Fetch Data in React?

Use `useEffect` to fetch in functional components: `useEffect(() => { fetch('/api').then(res => res.json()).then(setData); }, []);`. Handle loading/errors with state. For classes, use `componentDidMount`. Libraries like Axios or SWR simplify. Always clean up abort controllers for unmounts.

## 22. What is Prop Drilling?

Prop drilling occurs when props pass through multiple component levels to reach a deeply nested child, cluttering intermediates. It's a common issue in large apps. Solutions: React Context for global-like data, or state management like Redux.

## 23. What is React Context?

Context provides a way to pass data through the component tree without props drilling. Create with `React.createContext()`, provide via `<MyContext.Provider value={data}>`, consume with `useContext(MyContext)`. Ideal for themes, auth, or locale. Rerenders consumers on value change.

## 24. Explain Controlled vs Uncontrolled Components.

Controlled components tie form inputs to React state: `<input value={state} onChange={handleChange} />`. React controls the value. Uncontrolled use refs/DOM defaults: `<input ref={inputRef} />`. Controlled are predictable for validation; uncontrolled for simple cases or legacy integration.

## 25. What are Refs in React?

Refs provide direct access to DOM nodes or component instances. Create with `useRef(null)` or `createRef()`. Use for focus, measurements, or imperative actions: `inputRef.current.focus()`. Avoid overusing; prefer declarative state/props. Forward refs with `forwardRef` for HOCs.

## 26. What is Error Boundary?

Error Boundaries are class components that catch JavaScript errors in child trees using `static getDerivedStateFromError` and `componentDidCatch`. They render fallbacks: `<ErrorBoundary><MyApp /></ErrorBoundary>`. Hooks can't create them; use for production robustness, logging errors.

## 27. Explain React Fragments.

Fragments (`<>...</>` or `<React.Fragment>`) group multiple elements without extra DOM nodes. Useful for returning sibling JSX: `return (<> <h1>Title</h1> <p>Para</p> </>);`. They have optional `key` for lists. Improves clean, semantic HTML output.

## 28. What is the Purpose of index.js in React?

`index.js` (or `App.js`) is the entry point, rendering the root component into the DOM via `ReactDOM.render(<App />, document.getElementById('root'))`. It bootstraps the app, sets up providers (e.g., Router), and is targeted by bundlers like Webpack.

## 29. How Does React Handle Forms?

Forms use controlled components for state management. Handle submissions with `onSubmit`: `<form onSubmit={handleSubmit}>`. Validate with libraries like Formik or native checks. Prevent default: `e.preventDefault()`. For file uploads, use `FormData`.

## 30. What are Higher-Order Components (HOCs)?

HOCs are functions that take a component and return an enhanced one, reusing logic like auth or logging: `const Enhanced = withAuth(BaseComponent);`. They use render hijacking or props injection. Prefer hooks for new code, but HOCs remain for legacy.

## 31. Explain Render Props Pattern.

Render Props share code via a prop that's a function: `<DataProvider render={data => <Consumer data={data} />} />`. The child decides rendering, promoting reusability. It's flexible but can lead to "prop drilling"; hooks often replace it.

## 32. What is the useReducer Hook?

`useReducer(reducer, initialState)` manages complex state logic like Redux: `const [state, dispatch] = useReducer(reducer, { count: 0 });`. Reducer: `(state, action) => newState`. Better for multiple sub-values or non-primitive state than `useState`.

## 33. Explain useCallback Hook.

`useCallback(fn, deps)` memoizes functions to prevent unnecessary re-creations, optimizing child re-renders: `const memoized = useCallback(() => doSomething(a, b), [a, b]);`. Use in dependency arrays or for expensive callbacks. Empty deps if no inputs.

## 34. What is useMemo Hook?

`useMemo(fn, deps)` caches expensive computations: `const expensive = useMemo(() => compute(a, b), [a, b]);`. Returns previous value if deps unchanged. Use for derived state or heavy ops; avoid over-optimization as it adds overhead.

## 35. How to Optimize React Performance?

Profile with React DevTools. Memoize with `React.memo`, `useMemo`, `useCallback`. Use keys in lists. Code-split with lazy/Suspense. Avoid anonymous functions/inline objects in render. Virtualize long lists with react-window.

## 36. What is React.lazy and Suspense?

`React.lazy(() => import('./Component'))` code-splits components for lazy loading. Wrap in `<Suspense fallback={<Spinner />}>` to show fallbacks during load. Improves initial bundle size, especially for routes.

## 37. Explain Portals in React.

Portals render children into a DOM node outside the parent hierarchy: `ReactDOM.createPortal(<Child />, document.getElementById('modal'))`. Useful for modals, tooltips. Events bubble to React tree; preserves context.

## 38. What is the StrictMode Component?

`<React.StrictMode>` enables extra checks/warnings in development: double-invokes effects, detects unsafe lifecycles. Wraps app root. No production impact; helps find issues like legacy string refs.

## 9. How to Handle Side Effects in Functional Components?

Use `useEffect` for fetches, timers. Dependencies control runs. Cleanup returns function. For layout effects (DOM reads/writes), use `useLayoutEffect`. Separate concerns: effects for async, state for sync.

## 40. What are Custom Hooks?

Custom hooks are functions starting with `use` that call other hooks: `function useFetch(url) { const [data, setData] = useState(); useEffect(() => { fetch(url).then(setData); }, [url]); return data; }`. Encapsulate reusable logic, like forms or windows.

## 41. Explain Concurrent Mode in React.

Concurrent Mode (React 18+) allows interrupting renders for better UX. Features: `startTransition` for non-urgent updates, `useDeferredValue` for lagging values. Enables time-slicing; opt-in via `createRoot`.

## 42. What is the Difference Between State and Props?

Props are external, immutable inputs from parents. State is internal, mutable data managed by the component. Props drive re-renders from outside; state from inside. Lifting state up shares it via props.

## 43. How to Debug React Apps?

Use React DevTools extension for components, profiler, hooks inspector. Console logs in effects/lifecycles. `why-did-you-render` for re-render tracking. Source maps for builds.

## 44. What is the Event Bubbling in React?

Synthetic events bubble like native: child events propagate to parents unless stopped with `e.stopPropagation()`. React pools events for performance; access via `e.persist()` if needed post-handler.

## 45. Explain Pure Components.

`React.PureComponent` shallow-compares props/state to skip re-renders if unchanged. Extends for class components. Use `React.memo` for functional. Good for list items; deep equality needs custom compare.

## 46. What is the Context API vs Redux?

Context is built-in for simple global state (e.g., theme). Redux adds actions, reducers, middleware for complex apps (time travel, devtools). Context can cause unnecessary re-renders; use selectors in Redux.

## 47. How to Implement Dark Mode in React?

Use Context for theme state: Provider toggles `dark` flag. Consumers apply CSS classes/variables. Persist with localStorage in `useEffect`. Toggle button dispatches via `useContext`.

## 48. What are Children Props?

`props.children` accesses nested JSX: `<Parent><Child1 /><Child2 /></Parent>`. Render as `{children}` or map/transform. Type-check with PropTypes: `PropTypes.node`.

## 49. Explain TypeScript in React.

TypeScript adds static types to props/state: `interface Props { name: string; } const MyComp: React.FC<Props> = ({ name }) => ...`. Benefits: IntelliSense, error catching. Use `@types/react` for defs.

## 50. What are the Best Practices for React Components?

Keep components small/single-responsibility. Use functional with hooks. Immutable updates. Descriptive names. Extract custom hooks. Test with Jest/React Testing Library. Accessible ARIA, semantic HTML.
