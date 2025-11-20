````markdown
# 100 React Interview Questions & Answers (November 20, 2025 Edition)

This comprehensive Markdown guide features **100 detailed React interview questions** tailored for 2025, fully updated for **React 19** (stable since December 2024). It covers foundational concepts, JSX, components, state management, classic and new hooks, lifecycle methods, Server Components, Actions API, React Compiler ("Forget"), performance optimizations, Next.js 15 integration, TypeScript, testing with Vitest and React Testing Library, and emerging trends like AI-assisted UIs and WebAssembly.

Each question includes:

- **Detailed Explanation**: In-depth coverage with context, best practices, and common pitfalls.
- **Code Examples**: Runnable TypeScript snippets.
- **Interview Tips**: How to answer in interviews, with references.
- **Sources**: Inline citations from recent resources.

Sourced from official docs, community repos, and 2025 articles. Use for FAANG-level prep.

## Table of Contents

- [Basics & Core Concepts (1-15)](#basics--core-concepts)
- [JSX & Rendering (16-25)](#jsx--rendering)
- [Components & Props (26-35)](#components--props)
- [State Management Basics (36-45)](#state-management-basics)
- [Classic Hooks (46-55)](#classic-hooks)
- [React 19 Hooks & Features (56-70)](#react-19-hooks--features)
- [Lifecycle & Effects (71-75)](#lifecycle--effects)
- [Server Components & Actions (76-85)](#server-components--actions)
- [Performance & React Compiler (86-95)](#performance--react-compiler)
- [Advanced Topics: Routing, Testing, TypeScript & Trends (96-100)](#advanced-topics)

## Basics & Core Concepts

### 1. What is React, and why is it considered a library rather than a framework?

React is an open-source JavaScript library developed by Facebook (now Meta) for building interactive user interfaces, particularly single-page applications (SPAs). It emphasizes a declarative, component-based architecture where UIs are composed of reusable, self-contained pieces. Unlike full frameworks like Angular or Vue, which provide built-in solutions for routing, state management, and dependency injection, React focuses solely on the **view layer** of the MVC pattern. This "unopinionated" design allows developers to integrate it with any stack—e.g., Next.js for SSR, Redux/Zustand for state, or TanStack Router for navigation—offering flexibility and a smaller core footprint (React 19 minified is ~45KB).

**Key Advantages**: Virtual DOM for efficient updates, JSX for intuitive templating, and a vast ecosystem. Limitations include the need for additional libraries, which can lead to "decision fatigue" in small projects.

**Interview Tip**: Highlight modularity: "React's library status enables seamless integration, like using Server Components in Next.js 15 for zero-client JS rendering."

### 2. Explain the Virtual DOM, Reconciliation, and how React Fiber enhances it.

The Virtual DOM (VDOM) is a lightweight, in-memory representation of the real DOM as a tree of JavaScript objects. When state changes, React creates a new VDOM tree, compares (diffs) it against the previous one via **reconciliation**, and applies only the minimal set of changes (patches) to the actual DOM. This reduces expensive direct manipulations, improving performance by 10-100x in dynamic UIs.

**React Fiber** (introduced in 16.0, refined in 19) is the reimplementation of the reconciler as a linked-list structure, allowing work to be broken into priority-based units. It enables concurrent rendering (e.g., time-slicing for smooth 60fps), Suspense for lazy loading, and Transitions for non-urgent updates. In React 19, Fiber integrates with Server Components for streaming SSR, where partial trees hydrate independently.

**Code Example** (Diffing in action):

```tsx
function App({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}{" "}
      // Keys ensure efficient diffing
    </ul>
  );
}
```
````

**Pitfalls**: Poor keys cause full re-renders; Fiber's interruptibility can lead to stale data without proper Suspense fallbacks.

**Interview Tip**: "Fiber's goal is 'interruptible rendering'—it pauses low-priority work for urgent inputs, preventing jank."

### 3. What is JSX, how is it transpiled, and why use it over templates?

JSX (JavaScript XML) is a syntax extension that allows embedding HTML-like structures within JavaScript, making UI code more readable and composable. It's not HTML—it's syntactic sugar transpiled by Babel or SWC into `React.createElement` calls, which return React elements (plain objects). This happens at build time, ensuring no runtime parsing overhead.

**Transpilation Example**:

```tsx
// JSX
const element = <h1 className="title">Hello, {name}!</h1>;

// Transpiled to:
const element = React.createElement("h1", { className: "title" }, "Hello, ", name, "!");
```

**Benefits**: Type safety with TypeScript, conditional rendering (`{condition && <Comp />}`), and mapping (`{list.map(...)}`). In React 19, JSX supports async Server Components, streaming chunks.

**Drawbacks**: Learning curve for JS devs; potential XSS if not sanitized.

**Interview Tip**: "JSX enables 'everything is JavaScript'—no context-switching between templates and logic."

### 4. Differentiate between React Elements, Components, and Instances.

- **React Element**: Immutable, lightweight descriptor (e.g., `{ type: 'div', props: { children: 'Hi' } }`). Created via JSX; not interactive.
- **React Component**: Reusable function (functional) or class defining behavior and render logic. Returns elements.
- **React Instance**: Runtime object of a component, holding state, refs, and lifecycle methods (e.g., after `mount`).

In React 19, elements in Server Components are serialized to HTML/JSON streams, instances hydrate on client.

**Example**:

```tsx
// Element
const elem = <div>Hi</div>;

// Component
function MyComp() {
  return elem;
} // Returns element

// Instance (internal)
const instance = new MyComp(); // Has state
```

**Interview Tip**: "Elements are blueprints; components are factories; instances are runtime objects—key for understanding reconciliation."

### 5. What are the key principles of React: Unidirectional Data Flow and Composition over Inheritance?

**Unidirectional Data Flow**: State changes flow one way—down via props from parent to child, up via callbacks. This predictability aids debugging (e.g., Redux pattern). Mutations trigger re-renders via setState.

**Composition over Inheritance**: Build UIs by nesting components (`<App><Header /><Main /></App>`), not extending classes. Enables flexible, testable code; hooks replace HOCs/mixins.

In React 19, this extends to Server Actions, where server mutations revalidate client state declaratively.

**Pitfall**: Bidirectional flow (e.g., direct child state mutation) causes bugs.

**Interview Tip**: "Composition lets you 'slot' behaviors like lego—e.g., compound components share implicit state via Context."

### 6. What is React Fiber, and what problems does it solve?

Fiber rearchitects the reconciler as a fiber tree (linked list of work units), solving React 15's synchronous, uninterruptible rendering. It prioritizes tasks (urgent: user input; low: data fetch), enabling concurrent mode, Suspense, and better accessibility.

**Problems Solved**:

- **Jank**: Time-slicing yields to browser.
- **Stale UI**: Transitions defer non-urgent updates.
- **Blocking**: Async rendering without freezing.

In React 19, Fiber supports `use` for promise suspension during render.

**Interview Tip**: "Fiber's 'goal tree' allows pausing/resuming—crucial for 60fps in complex apps."

### 7. Why are keys important in React lists, and what makes a good key?

Keys are unique, stable identifiers React uses during reconciliation to track list items efficiently, minimizing DOM ops (e.g., moves vs. remounts). Bad keys (indices) cause unnecessary re-renders or state loss.

**Good Key**: Stable ID like `user.id` (not random or index).

**Example**:

```tsx
// Good
{
  users.map((user) => <User key={user.id} {...user} />);
}

// Bad - shifts keys on insert
{
  users.map((user, i) => <User key={i} {...user} />);
}
```

**Interview Tip**: "Keys optimize diffs but don't affect output—use them for performance, not logic."

### 8. What is a React Fragment, and when would you use it?

Fragments (`<>...</>` or `<React.Fragment>`) group multiple elements without adding extra DOM nodes, avoiding unnecessary wrappers that break CSS (e.g., flexbox).

**Example**:

```tsx
function ListItem({ item }) {
  return (
    <>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>
  );
}
```

**With Key**: `<React.Fragment key={id}>` for lists.

**Interview Tip**: "Use for clean markup—essential in table rows or when parent requires single child."

### 9. Explain React Portals and their use cases.

Portals render children outside the parent DOM hierarchy (e.g., modals to `body`), escaping container boundaries for overlays or tooltips.

**Example**:

```tsx
import { createPortal } from "react-dom";

function Modal({ children }) {
  return createPortal(<div className="modal">{children}</div>, document.body);
}
```

**Use Cases**: Modals, popovers; preserves event bubbling.

**Interview Tip**: "Portals break DOM tree but keep React tree—events bubble to React root."

### 10. What are Error Boundaries, and how do you implement one?

Error Boundaries are React components (classes only) that catch JS errors in the child tree during render, log them, and display fallbacks, preventing full app crashes.

**Implementation**:

```tsx
class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error(error, info);
  }
  render() {
    return this.state.error ? <h1>Oops!</h1> : this.props.children;
  }
}
```

**Limitations**: No async errors; use libraries like `react-error-boundary` for hooks.

**Interview Tip**: "Wrap risky subtrees—key for production resilience."

### 11. What is the significance of the `key` prop in React?

(Expanded from Q7) Keys must be unique per sibling, stable across renders, and predictable. React uses them for efficient identity matching in lists. In React 19, bad keys still trigger full sub-tree re-renders, even with Compiler optimizations.

**Best Practice**: Use IDs from data; avoid `Math.random()` (unstable).

**Interview Tip**: Probe: "What happens if keys are omitted?" (Treats all as new.)

### 12. Describe the React event system (Synthetic Events).

React wraps native events in SyntheticEvent objects for consistency across browsers, pooling for performance. Handlers like `onClick` receive `e` with methods like `preventDefault()`.

**Example**:

```tsx
function Button() {
  const handleClick = (e) => {
    e.preventDefault(); // Cross-browser
    // e.nativeEvent for raw access
  };
  return <button onClick={handleClick}>Click</button>;
}
```

**Interview Tip**: "Bubbling works; delegation on root for efficiency."

### 13. What is the difference between controlled and uncontrolled components?

**Controlled**: Value managed by React state (e.g., `<input value={state} onChange={setState} />`—predictable, for validation).

**Uncontrolled**: DOM handles value, accessed via ref (e.g., `ref.current.value`—simpler for one-offs, like file uploads).

In React 19, Actions make forms more controlled by default.

**Interview Tip**: "Controlled for sync UI-state; uncontrolled for perf in large forms."

### 14. Explain prop drilling and how to mitigate it.

Prop drilling passes props through intermediate components, cluttering code. Mitigate with **Context API** (global state) or composition (restructure tree).

**Example (Context)**:

```tsx
const ThemeContext = createContext();
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>;
```

**Interview Tip**: "For app-wide data like theme/user, Context > drilling."

### 15. What is the purpose of `React.StrictMode`?

StrictMode (<React.StrictMode>) enables extra checks in dev: double-invokes effects (detects unsafe side effects), warns on deprecated APIs, and verifies fiber behavior. No prod impact.

**Example**:

```tsx
<React.StrictMode>
  <App />
</React.StrictMode>
```

**Interview Tip**: "Preps for concurrent features; double renders simulate future behaviors."

## JSX & Rendering

### 16. How do you handle conditional rendering in JSX?

Use ternaries (`{cond ? <A /> : <B />}`), logical AND (`{cond && <Comp />}`), or if/else outside JSX. For null/undefined, they render nothing.

**Example**:

```tsx
{
  isLoggedIn ? <UserMenu /> : <LoginButton />;
}
{
  loading && <Spinner />;
}
```

**Best Practice**: Avoid complex logic in render—extract to vars.

**Interview Tip**: "Short-circuit for optional UI; enums for multi-state."

### 17. What are the rules for naming JSX elements and attributes?

PascalCase for components, lowercase for HTML. Attributes: camelCase (`onClick`, `className`). Booleans auto-cast to true.

**Example**:

```tsx
<MyComponent className="btn" onClick={handle} disabled />
```

**Interview Tip**: "Custom elements default to components if not HTML tags."

### 18. Explain spread operators in JSX props.

`{...obj}` spreads properties as props, great for dynamic or default merging.

**Example**:

```tsx
const props = { className: "btn", onClick: handle };
<Button {...props} disabled />; // <Button className="btn" onClick={handle} disabled />
```

**Pitfall**: Overrides order matters; validate to avoid XSS.

**Interview Tip**: "Efficient for HOCs or polymorphic components."

### 19. How does React handle forms in JSX (controlled vs. uncontrolled)?

(See Q13; expanded) Controlled syncs input to state for real-time validation; uncontrolled uses refs for "set once" like uploads. React 19's `<form action>` makes forms declarative.

**Interview Tip**: "Controlled for search; uncontrolled for legacy integrations."

### 20. What is `dangerouslySetInnerHTML`, and when is it safe?

Injects raw HTML strings, bypassing React's escaping (risks XSS). Use with sanitizers like DOMPurify for user content.

**Example**:

```tsx
<div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
```

**Alternative**: `html-react-parser`.

**Interview Tip**: "Rarely use—prefer React elements for security."

### 21. Can you return multiple elements from a component without a wrapper?

Yes, via Fragments (Q8). In lists, arrays with keys: `return [ <li key="1">A</li>, <li key="2">B</li> ];`.

**Interview Tip**: "Fragments keep DOM lean."

### 22. Explain JSX expressions and their types.

Any JS: numbers, strings, arrays, functions (called), objects (stringified), or ReactNodes. No statements (if/while).

**Example**:

```tsx
<div>
  {2 + 2} {user && user.name}{" "}
  {items.map((i) => (
    <span key={i}>{i}</span>
  ))}
</div>
```

**Interview Tip**: "Expressions enable dynamic UIs—always key mapped arrays."

### 23. What are self-closing tags in JSX?

Like HTML: `<img />`, `<br />`. Required for void elements; components too if no children.

**Interview Tip**: "Consistency with HTML—Babel enforces."

### 24. How does React 19 change JSX with async Server Components?

JSX can be async, awaiting in body and streaming via Suspense.

**Example** (from React 19 docs):

```tsx
async function Page() {
  const data = await fetch("/api");
  return <div>{data}</div>; // Streams
}
```

**Interview Tip**: "Reduces waterfalls—data loads in parallel."

### 25. What tools transpile JSX in modern setups?

Babel (flexible plugins), SWC (Rust, 20x faster—default in Next.js 15). esbuild for bundling.

**Interview Tip**: "SWC for prod speed; Babel for complex transforms."

## Components & Props

### 26. Functional vs. Class Components: Status in 2025?

Functional components (with hooks) are standard since 16.8; classes deprecated for new code (only for Error Boundaries). React 19 APIs are hook-only.

**Example (Functional)**:

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

**Interview Tip**: "Hooks make classes obsolete—stateful logic is composable."

### 27. What are Props? How to type and validate them?

Props are read-only inputs to components, enabling reusability. Type with TypeScript interfaces; validate runtime with PropTypes (legacy).

**Example**:

```tsx
interface Props {
  name: string;
  age?: number;
}
function Greeting({ name, age }: Props) {
  return (
    <h1>
      Hi {name} {age && `(${age})`}
    </h1>
  );
}
```

**Interview Tip**: "Props enforce contracts—TS catches errors early."

### 28. Explain defaultProps and how they work with TypeScript.

`defaultProps` sets fallbacks (pre-18). In TS, use optional props + defaults in function.

**Example**:

```tsx
function Button({ label = "Click" }: { label?: string }) {
  return <button>{label}</button>;
}
```

**Interview Tip**: "TS makes defaultProps redundant—use param defaults."

### 29. What is React.forwardRef, and when is it needed?

Forwards ref from parent to child DOM element or instance.

**Example**:

```tsx
const Input = forwardRef((props, ref) => <input ref={ref} {...props} />);
```

In React 19, refs as props deprecates it.

**Interview Tip**: "Essential for imperative APIs like focus."

### 30. Describe Higher-Order Components (HOCs) and their drawbacks.

HOC: Function taking component, returning enhanced one (e.g., `withAuth(Comp)` adds auth check).

**Example**:

```tsx
function withAuth(Wrapped) {
  return function AuthComp(props) {
    if (!isAuth) return <Login />;
    return <Wrapped {...props} />;
  };
}
```

**Drawbacks**: Wrapper hell, static method loss. Hooks replace them.

**Interview Tip**: "HOCs for cross-cutting concerns; prefer hooks in 2025."

### 31. What is the Render Props pattern?

Pass a function as prop to share code, avoiding HOC issues.

**Example**:

```tsx
<Mouse render={(mouse) => <Cat mouse={mouse} />} />
```

**Interview Tip**: "Flexible inversion of control—e.g., for data fetching."

### 32. Explain Compound Components.

Related components sharing state implicitly (via Context), like `<Select><Option /></Select>`.

**Example** (using Context):

```tsx
const SelectContext = createContext();
function Select({ children }) {
  const [value, setValue] = useState();
  return (
    <SelectContext.Provider value={{ value, setValue }}>
      {children}
    </SelectContext.Provider>
  );
}
```

**Interview Tip**: "Enables expressive APIs without prop explosion."

### 33. What is the `children` prop, and what can it contain?

Special prop for content between tags: string, number, element, array of nodes, or function (render prop).

**Type**: `React.ReactNode`.

**Interview Tip**: "Clones with `React.cloneElement` for enhancement."

### 34. Props vs. State: Differences and best practices.

Props: External, immutable inputs. State: Internal, mutable via setter. Lift state up for sharing.

**Best Practice**: Compute derived from props/state with `useMemo`.

**Interview Tip**: "State for UI logic; props for data flow."

### 35. How do you pass functions as props without re-renders?

Memoize with `useCallback`.

**Example**:

```tsx
const handleClick = useCallback(() => console.log(id), [id]);
<Child onClick={handleClick} />;
```

**Interview Tip**: "Prevents child re-renders in React.memo."

## State Management Basics

### 36. What is local state in React, and when to use useState?

Local state holds component-specific data triggering re-renders. Use `useState` for simple values.

**Example**:

```tsx
const [count, setCount] = useState(0);
setCount((prev) => prev + 1); // Functional for async safety
```

**When**: Toggles, forms. Not for shared/global.

**Interview Tip**: "Batches updates automatically in events."

### 37. Explain lifting state up with an example.

Move shared state to nearest common ancestor, pass down as props, up via callbacks.

**Example**: Two inputs syncing total—lift to parent.

**Interview Tip**: "Enables React's unidirectional flow."

### 38. What is derived state, and how to compute it safely?

Computed from props/state (e.g., total from items). Use `useMemo` to avoid recompute every render.

**Example**:

```tsx
const total = useMemo(() => items.reduce((sum, i) => sum + i.price, 0), [items]);
```

**Interview Tip**: "Prevents infinite loops in effects."

### 39. When should you avoid using state?

For static data, pure props, or infrequent changes (use ref). Overuse bloats components.

**Interview Tip**: "State for dynamic UI; refs for mutations."

### 40. How do you update nested state immutably?

Spread or functional updates to avoid mutation.

**Example**:

```tsx
setUser((prev) => ({ ...prev, address: { ...prev.address, city: "NY" } }));
```

**Interview Tip**: "Immutability enables efficient diffs."

### 41. Introduce Context API for global state.

Context provides a way to pass data through the tree without props. Create with `createContext`, provide with `<Provider>`, consume with `useContext`.

**Example** (Q37 expanded).

**Pitfalls**: Re-renders all consumers on change—split contexts.

**Interview Tip**: "For theme/user; not full state mgmt."

### 42. useReducer vs. useState: When to choose each?

useState for simple; useReducer for complex logic, multiple sub-values, or Redux-like actions.

**Example**:

```tsx
const reducer = (state, action) => ({ ...state, [action.type]: action.payload });
const [state, dispatch] = useReducer(reducer, initial);
```

**Interview Tip**: "useReducer scales better for forms."

### 43. Lazy initialization of state.

`useState(() => computeExpensive(initial))` runs once.

**Example**:

```tsx
const [data, setData] = useState(() => JSON.parse(localStorage.getItem("data") || "[]"));
```

**Interview Tip**: "For heavy setup without effects."

### 44. State batching: How it works in React 18+.

Multiple setState in same event/timeout batch into one render, reducing work.

**Example**: Two setCount in click → one re-render.

**Interview Tip**: "Automatic since 18; async setState still batches."

### 45. Handling arrays in state: Best practices.

Use immutable methods: `map`, `filter`, `concat`. For large lists, Immer or libraries.

**Example**:

```tsx
setItems((prev) => [...prev, newItem]);
```

**Interview Tip**: "Avoid splice/mutation—breaks reconciliation."

## Classic Hooks

### 46. What are the Rules of Hooks, and why do they exist?

Call hooks only at top level (not loops/conditions) and in React functions/custom hooks. Ensures consistent order for Fiber's internal list.

**Violation Example**: if (cond) useState() → wrong state mapping.

**Interview Tip**: "Order matters—ESLint enforces."

### 47. Explain useEffect: Dependencies, cleanup, and common pitfalls.

useEffect runs side effects post-render. Deps array controls runs; empty [] for mount/unmount.

**Cleanup**: Return function.

**Example**:

```tsx
useEffect(() => {
  const sub = api.subscribe(update);
  return () => sub.unsubscribe();
}, [id]); // Re-run on id change
```

**Pitfalls**: Stale closures (include all deps); infinite loops (setState in effect without []).

**Interview Tip**: "Exhaustive deps ESLint helps; use for fetches, subs."

### 48. useLayoutEffect vs. useEffect.

useLayoutEffect sync before paint (for DOM measurements); useEffect async after.

**Example**: useLayoutEffect for canvas sizing.

**Interview Tip**: "useLayoutEffect blocks paint—use sparingly."

### 49. When and how to use useCallback?

Memoize callbacks to avoid re-renders in optimized children.

**Example** (Q35).

**Pitfall**: Overuse increases memory.

**Interview Tip**: "Only if passed to memoized child."

### 50. useMemo: Use cases and optimization rules.

Memoize expensive computations.

**Example** (Q38).

**Rule**: Deps must cover all inputs; profile before adding.

**Interview Tip**: "React Compiler (19) auto-memos most—manual rare."

### 51. useRef: Mutable values and DOM access.

Holds mutable value across renders without trigger; .current for DOM.

**Example**:

```tsx
const inputRef = useRef<HTMLInputElement>(null);
useEffect(() => inputRef.current?.focus(), []);
```

**Interview Tip**: "For prev values: const prev = useRef(); prev.current = val."

### 52. useImperativeHandle: Customizing refs.

Expose methods via ref in forwardRef.

**Example**:

```tsx
useImperativeHandle(ref, () => ({ focus: () => inputRef.current.focus() }));
```

**Interview Tip**: "For parent control—rare, prefer declarative."

### 53. Creating custom hooks: Naming and sharing logic.

Prefix "use"; extract reusable effects/state.

**Example**:

```tsx
function useFetch(url) {
  const [data, setData] = useState();
  useEffect(() => {
    fetch(url).then(setData);
  }, [url]);
  return data;
}
```

**Interview Tip**: "Testable, composable—core of modern React."

### 54. useDebugValue: For custom hook debugging.

Displays label in DevTools.

**Example**:

```tsx
useDebugValue(isOnline ? "Online" : "Offline");
```

**Interview Tip**: "Enhances DX for library authors."

### 55. useId: Generating unique IDs.

SSR-safe IDs for forms/labels.

**Example**:

```tsx
const id = useId();
<label htmlFor={id}>Name</label><input id={id} />
```

**Interview Tip**: "Prevents hydration mismatches."

## React 19 Hooks & Features

### 56. What is the `use` hook in React 19?

`use` reads promises/context during render, suspending on unresolved promises (Suspense-integrated). No effects needed for data.

**Example** (from docs):

```tsx
function Profile({ userPromise }) {
  const user = use(userPromise);
  return <div>{user.name}</div>; // Suspends
}
```

**Impact**: Simplifies fetching; must pre-create promises.

**Interview Tip**: "`use` = await in render—game-changer for colocation."

### 57. Explain `useOptimistic` for optimistic UI.

Updates UI immediately, reverts on error. Pairs with Actions.

**Detailed Example**:

```tsx
const [optimisticLikes, addOptimistic] = useOptimistic(
  likes,
  (state, update) => state + update
);
function Like() {
  return (
    <button
      onClick={() => {
        addOptimistic(1);
        likeAction().catch(() => {}); // Reverts auto
      }}
    >
      {optimisticLikes}
    </button>
  );
}
```

**Benefits**: 200ms faster perceived speed.

**Interview Tip**: "Reduces latency feel—essential for social apps."

### 58. `useActionState`: Managing action state.

Returns [state, action, pending] for async functions.

**Example**:

```tsx
const [state, submitAction, pending] = useActionState(async (prev, formData) => {
  const result = await api.update(formData);
  return result.error || null;
}, null);

<form action={submitAction}>
  <input name="name" />
  <button disabled={pending}>Submit</button>
</form>;
```

**Interview Tip**: "Combines useState + useTransition—auto error/loading."

### 59. `useFormStatus`: Reading form state.

Accesses nearest form's pending from descendants.

**Example** (Q4 from docs).

**Interview Tip**: "No drilling—perfect for reusable UI."

### 60. How does `use` handle Context after early returns?

Allows `use(Context)` post-if, without hoisting issues.

**Example** (Q6 from docs).

**Interview Tip**: "Cleaner conditional theming."

### 61. Integrating `useOptimistic` with Server Actions.

Call action after optimistic update; auto-rollback on fail.

**Detailed Flow**: Update local → server call → revalidate or revert.

**Interview Tip**: "Progressive enhancement: Works offline-ish."

### 62. Error handling with new hooks in React 19.

`useActionState` returns errors; `use` throws to boundaries.

**Example**: Wrap in <ErrorBoundary>.

**Interview Tip**: "Declares errors—less try/catch boilerplate."

### 63. Performance implications of React 19 hooks.

`use` avoids double fetches (no effect); `useOptimistic` cuts latency.

**Benchmark**: 30% faster forms per Vercel.

**Interview Tip**: "Hooks push async to render—Suspense everywhere."

### 64. Migrating useEffect fetches to `use`.

Pre-fetch promises outside, read with `use(promise)`.

**Before/After**: From tool output (Q59).

**Interview Tip**: "Colocates data/UI—reduces z-index issues."

### 65. Custom hooks using React 19 APIs.

```tsx
function useAsyncData(promiseCreator) {
  const promise = useMemo(promiseCreator, []);
  return use(promise);
}
```

**Interview Tip**: "Composable data layers."

### 66. What are Actions in React 19?

Async functions for mutations, integrated with transitions. Handle pending, errors, resets automatically. Mark with `'use server'` for RSC.

**Detailed Example** (from docs, Q1).

**Impact**: Replaces manual fetch + state.

**Interview Tip**: "Actions = serverless endpoints in components."

### 67. Progressive Enhancement with `<form action>`.

Forms submit via Action even without JS; JS adds client navigation.

**Example** (Q3 from docs).

**In Next.js 15**: Uses new <Form> for prefetch.

**Interview Tip**: "SEO-friendly—works on slow networks."

### 68. Ref as a Prop in React 19.

Direct `ref` prop on functions—no forwardRef.

**Example** (Q9 from docs).

**Migration**: Remove forwardRef.

**Interview Tip**: "Simplifies imperative access."

### 69. `<Context>` as Provider shorthand.

`<ThemeContext value={theme}>` vs. `<ThemeContext.Provider>`.

**Interview Tip**: "Less verbose—deprecated old in future."

### 70. Ref cleanup functions.

Return teardown from ref callback.

**Example** (Q11 from docs).

**Interview Tip**: "Like useEffect cleanup for DOM."

## Lifecycle & Effects

### 71. Functional equivalents to class lifecycle methods.

useEffect([]) ≈ componentDidMount; deps ≈ didUpdate; cleanup ≈ willUnmount.

**No Direct**: constructor (useState), render (return).

**Interview Tip**: "Effects unify lifecycles."

### 72. Dependency arrays in useEffect: Best practices.

Include all used vars/functions; ESLint exhaustive-deps.

**Pitfall**: Omissions cause bugs/stales.

**Interview Tip**: "Lint it—saves debugging time."

### 73. Cleanup in effects: Examples and importance.

Teardown subs, timers, intervals.

**Example** (Q47).

**Importance**: Prevents leaks (memory, zombie events).

**Interview Tip**: "Always cleanup—StrictMode double-invokes test it."

### 74. Concurrent effects and transitions in React 19.

Effects can be wrapped in transitions for deferral.

**Example**:

```tsx
startTransition(() => setQuery(input)); // Non-urgent
```

**Interview Tip**: "Keeps UI responsive."

### 75. Handling async effects safely.

Don't setState in async without deps check.

**Best**: useActionState for async.

**Interview Tip**: "Effects for init; Actions for mutations."

## Server Components & Actions

### 76. What are React Server Components (RSC) in React 19?

Stable RSC run only on server: async, DB access, no hooks/JS bundle. Pass data to Client Components.

**Example** (from docs/Next.js):

```tsx
// app/page.tsx
async function Page() {
  const posts = await db.posts(); // Server-only
  return <ClientList posts={posts} />; // Serialize props
}
```

**Benefits**: Security, perf (zero hydrate for static).

**Interview Tip**: "RSC for fetch; Client for interact—boundary with 'use client'."

### 77. Client vs. Server Components: Detailed differences.

| Aspect      | Server       | Client           |
| ----------- | ------------ | ---------------- |
| Execution   | Server       | Client (hydrate) |
| Hooks       | No           | Yes              |
| Async Body  | Yes          | No               |
| Bundle Size | 0 JS         | Includes JS      |
| Secrets     | Yes (env/DB) | No               |

**In Next.js 15**: Async headers/cookies.

**Interview Tip**: "Mix via composition—RSC wraps Client."

### 78. Streaming with Suspense in Server Components.

Suspense boundaries stream partial HTML while awaiting.

**Example** (Q68).

**Interview Tip**: "Parallelizes waterfalls—faster TTI."

### 79. Implementing Server Actions.

Async functions with `'use server'`, called from forms/events.

**Detailed Example** (Q66; Next.js dead-code elim).

**Security**: Validate inputs, secure IDs.

**Interview Tip**: "No API routes needed—direct mutations."

### 80. Revalidation with Server Actions in Next.js 15.

Success auto-revalidates RSC cache (like `revalidatePath`).

**Example**:

```tsx
async function action() {
  "use server";
  await db.update();
  revalidatePath("/dashboard"); // Or auto
}
```

**Interview Tip**: "Keeps data fresh without full reloads."

### 81. Security best practices for Server Actions.

Use `'use server'`, input validation (zod), rate-limiting. Next.js: Unused actions stripped.

**Interview Tip**: "Treat as public APIs—auth via cookies."

### 82. Calling Server Actions from Client Components.

Import and call like functions; serializes args.

**Example**: <button onClick={createPost}>Add</button>

**Interview Tip**: "Seamless RPC—no fetch boilerplate."

### 83. Server Actions vs. API Routes.

Actions: Direct, no HTTP overhead, auto-revalidate. Routes: For external/third-party.

**Interview Tip**: "Actions for internal; Routes for webhooks."

### 84. Hydration in React 19 with RSC.

Improved diffs show mismatches; skips script tags.

**Interview Tip**: "Faster SSR—use suppressHydrationWarning sparingly."

### 85. unstable_after in Next.js 15 for Server Components.

Schedules post-response tasks (e.g., analytics).

**Example** (from tool).

**Interview Tip**: "Non-blocking logging—perf win."

## Performance & React Compiler

### 86. What is the React Compiler ("Forget")?

Build-time analyzer auto-memoizes based on static deps, skipping re-renders. Experimental in Next.js 15.

**Example** (from intro):

```tsx
// Auto-memoized—no manual
function List({ items }) {
  return items.sort((a, b) => a - b).map((i) => <Item key={i.id} i={i} />);
}
```

**Limitations**: Dynamic code, bad keys.

**Interview Tip**: "Eliminates 90% manual memos—write naive code."

### 87. Limitations and when to disable Compiler.

Can't handle runtime deps (e.g., props as deps); disable for CSS-in-JS or complex.

**Interview Tip**: "Profile—Compiler slows builds initially."

### 88. Measuring performance with React DevTools.

Profiler tab: Record interactions, view flamegraphs, rank commits.

**Interview Tip**: "Why did it re-render? Check props/state changes."

### 89. useTransition: Deferring non-urgent updates.

Wrap sets in startTransition for pending UI.

**Example** (Q74).

**Interview Tip**: "Search inputs: Mark pending without block."

### 90. useDeferredValue: For debounced inputs.

Defers value until urgent work done.

**Example** (Q12 from docs): initialValue prevents flash.

**Interview Tip**: "Like useMemo for values."

### 91. Code-splitting with React.lazy and Suspense.

Lazy-load components.

**Example**:

```tsx
const LazyComp = lazy(() => import("./Comp"));
<Suspense fallback={<div>Loading...</div>}>
  <LazyComp />
</Suspense>;
```

**Interview Tip**: "Bundle perf—combine with RSC for data."

### 92. React.memo and when to use it post-Compiler.

Shallow compare props; Compiler reduces need, use for expensive renders.

**Interview Tip**: "Profile first—memo can hurt if overused."

### 93. Avoiding inline functions and objects in render.

Use useCallback/memo.

**Interview Tip**: "Breaks memoization."

### 94. Bundle analysis tools in 2025.

Next.js built-in, webpack-bundle-analyzer.

**Interview Tip**: "Aim <100KB gzipped for core."

### 95. SSR performance tips in React 19.

Use prerender for static, metadata hoisting, stylesheet precedence.

**Example** (Q14 from docs).

**Interview Tip**: "Stream + preload = fast FCP."

## Advanced Topics: Routing, Testing, TypeScript & Trends

### 96. Next.js App Router vs. React Router in 2025.

App Router (Next 15): File-based, RSC-integrated, parallel routes. React Router: SPA-focused, flexible.

**Best**: Next for full-stack.

**Interview Tip**: "App Router for SSR; Router for CRA."

### 97. Data fetching best practices with React Query/TanStack.

useQuery for cache, mutations.

**Example**:

```tsx
const { data } = useQuery({ queryKey: ["user"], queryFn: () => fetchUser() });
```

**Interview Tip**: "Infinite queries for lists."

### 98. Testing React components: RTL + Vitest.

Behavior-focused: `render(<Comp />); fireEvent.click(getByRole('button'));`.

**Mock**: vi.fn(), MSW for APIs.

**Interview Tip**: "No implementation details—test user flow."

### 99. TypeScript in React: Hooks and generics.

Type hooks: `useState<string>(initial)`; generics for custom.

**Example** (Q96 intro).

**Interview Tip**: "Extract types for reusability."

### 100. Emerging trends: AI in React and WebAssembly.

Vercel AI SDK for LLM UIs; WASM for compute (e.g., via react-wasm). React Server Functions for edge AI.

**Interview Tip**: "AI hooks for dynamic content; WASM for perf-critical."

---

_Updated Nov 20, 2025. References: React.dev, Next.js blog. For more, see cited sources._

```

```
