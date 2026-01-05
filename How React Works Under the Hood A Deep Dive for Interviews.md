# How React Works Under the Hood: A Deep Dive for Interviews

In React interviews, questions about "how React works" often probe your understanding of its core mechanics beyond surface-level components and hooks. Expect follow-ups like: "Explain the Virtual DOM diffing process," "How does Fiber enable concurrency?" or "What happens during a re-render?" This guide breaks it down step-by-step, focusing on the **background processes** (rendering pipeline, reconciliation, and runtime). I'll use interview-style explanations: clear, structured, with code snippets, diagrams (text-based), and tips on what interviewers want. Based on React 19 (stable as of January 2026), which refines concurrency and adds server actions.

Think of React as a **UI rendering engine**: It takes your declarative descriptions (components) and efficiently syncs them to the browser DOM. The "magic" is in minimizing expensive DOM operations while handling complexity like async rendering.

## 1. The Rendering Pipeline: High-Level Overview

React's lifecycle revolves around **rendering**: When state/props change, React doesn't blindly re-render everything—it computes the minimal updates.

**Interview Tip**: Start here: "React's rendering is batched and prioritized. It has three phases: Render (build VDOM), Commit (apply to DOM), and Effects (side effects)."

**Textual Diagram** (The Flow):

```
Trigger (State/Props Change)
          ↓
[Render Phase] → Build new Virtual DOM (JS objects)
          ↓ (Diffing/Reconciliation)
[Commit Phase] → Patch real DOM minimally
          ↓
[Post-Commit] → Run useEffect, mutations
          ↓
UI Updated (User sees changes)
```

- **Batching (React 18+)**: Multiple state updates in one event (e.g., click) trigger one render, not per update.
- **Why?** DOM ops are costly (~10-100ms each); React batches to 60fps smoothness.

Code Trigger Example:

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleClick = () => {
    setCount((c) => c + 1); // Batched with next
    setFlag((f) => !f); // One render, not two
  };

  return (
    <button onClick={handleClick}>
      Count: {count} {flag ? "On" : "Off"}
    </button>
  );
}
```

## 2. Virtual DOM: The In-Memory Representation

The **Virtual DOM (VDOM)** is React's secret sauce—a lightweight JS tree mirroring the real DOM. Instead of `document.getElementById('foo').innerHTML = 'bar'`, React builds/ diffs VDOM trees.

**How It Works**:

1. **Creation**: `React.createElement` (or JSX transpiles to it) builds VDOM nodes as objects: `{ type: 'div', props: { className: 'foo' }, children: [...] }`.
2. **Why Virtual?** Real DOM mutations are slow (browser reflows). VDOM is cheap (~1ms to build/diff).

**Interview Question**: "Why not use the real DOM directly?"

- **Answer**: Real DOM changes trigger layout thrashing (calculate → paint). VDOM diffs isolate changes, applying only deltas (e.g., update text, not re-mount node).

Example VDOM (from `<div className="container"><p>Hi</p></div>`):

```js
{
  type: 'div',
  props: { className: 'container' },
  children: [{ type: 'p', props: {}, children: ['Hi'] }]
}
```

**Pitfall**: VDOM isn't always faster for tiny apps—overhead for <100 elements. But scales to millions (e.g., Facebook feed).

## 3. Reconciliation: The Diffing Algorithm

**Reconciliation** (or "diffing") compares old/new VDOM trees to find minimal changes. It's heuristic-based for speed, not full AST diff (too slow).

**Core Rules** (O(n) time, not O(n^3)):

- **Elements of Different Types**: Treat as new tree (tear down old, mount new). E.g., `<div>` to `<span>` → full replace.
- **Same Type**: Update props/children. Retain instance (e.g., input value).
- **Lists**: Use `key` props for stable identity. Without keys, uses index (buggy for dynamic lists).
  - **Why Keys?** Helps React track adds/removes/moves. Bad: `key={index}` (reorders break state). Good: `key={item.id}`.

**How It Works Step-by-Step**:

1. **Root Diff**: Start at root; recurse children.
2. **Heuristics**:
   - Assume same-type elements are same (fast path).
   - For dev, enable "strict mode" to double-render (catch impurities).
3. **Output**: Worklet of mutations (e.g., `setAttribute`, `appendChild`).

**Interview Deep Dive**: "Explain diffing for lists."

- **Answer**: Without keys: Scans sequentially (O(n^2) worst). With keys: Maps to identities, diffs positions (e.g., React Fiber tracks effects list).

Code Example (List Diffing):

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}{" "}
      // Keys enable efficient diff
    </ul>
  );
}

// Reorder: [A,B,C] → [C,A,B] → React moves B/C, not remounts
```

**React 19 Update**: Compiler optimizes static parts (no diff needed).

## 4. Fiber Architecture: The Reconciling Engine

Since React 16, **Fiber** is React's internal representation—a linked-list tree of "fibers" (work units) for the component tree. Each fiber has: type, props, state, child/sibling/parent pointers, effects list.

**Why Fiber?** Pre-16 React was synchronous (blocked UI). Fiber makes rendering **incremental and pausable**.

**How It Works**:

- **Fiber Nodes**: Represent components/hosts. E.g., a `<div>` fiber links to text child fibers.
- **Work Loop**: Scheduler prioritizes (e.g., urgent: user input; low: data fetch).
  - **Phases**:
    - **Render Phase** (pure, pausable): Build fiber tree, compute effects (insert/update/delete).
    - **Commit Phase** (mutative, atomic): Apply to DOM, run useLayoutEffect.
- **Double Buffering**: Two trees (current/workInProgress); swap on commit.

**Textual Diagram** (Fiber Tree):

```
Root Fiber
├── Type: App (Function)
│   └── Child: Header Fiber
│       ├── Type: div (Host)
│       │   └── Child: h1 Fiber (Text: 'Title')
│       └── Sibling: Nav Fiber
└── Alternate: Previous Version (for diff)
```

**Interview Question**: "How does Fiber enable concurrency?"

- **Answer**: Breaks work into units (fibers), yielding to browser (e.g., via `requestIdleCallback`). Concurrent Mode (18+) uses `startTransition` for low-pri updates (e.g., search results defer if typing).

Example (Concurrent):

```jsx
import { startTransition } from "react";

function Search({ query, setQuery }) {
  const [results, setResults] = useState([]);

  const handleChange = (q) => {
    startTransition(() => {
      // Low prio
      setQuery(q);
      setResults(fetchResults(q)); // Won't block input
    });
  };

  return <input onChange={(e) => handleChange(e.target.value)} />;
}
```

**Pitfall**: Effects run post-commit; use `useLayoutEffect` for sync DOM reads.

## 5. Hooks: Internal Magic (The Queue System)

Hooks seem simple but use **linked lists** per fiber for state/effects.

**How Hooks Work**:

- **Dispatch**: Each hook call is a "dispatch" (e.g., `useState` queues updater).
- **Storage**: Fiber has `memoizedState` (linked list: { memoizedState: value, queue: updates, next: nextHook }).
- **Order Matters**: Hooks read/write by index (0: first useState, 1: useEffect). Rules enforce top-level calls to match order.
- **Re-renders**: Traverse list, apply queued updates, rebuild.

**Interview Deep Dive**: "What if hooks are conditional?"

- **Answer**: Breaks order (e.g., if (cond) useState() → mismatch). React warns in dev.

Code (Internal-ish):

```js
// Pseudo: Fiber's hook list
fiber.memoizedState = {
  memoizedState: 0, // useState value
  queue: { pending: { action: incFn } }, // Updater
  next: {
    // useEffect
    memoizedState: deps,
    queue: { effect: cleanupFn },
    next: null,
  },
};
```

**React 19**: Hooks are more concurrent-safe with `use` for promises.

## 6. Effects and Side Effects: useEffect Internals

`useEffect` schedules effects post-render.

**Flow**:

1. **Schedule**: During render, push to effects list (passive: post-paint).
2. **Flush**: After commit, traverse tree, run create fn, queue destroy for unmount.
3. **Deps Check**: Skip if deps shallow-equal (useMemo caches equality).

**Interview Tip**: "useEffect vs useLayoutEffect?"

- **Answer**: Effect: Async, post-paint (avoids blocking). Layout: Sync, pre-paint (for measurements).

```jsx
useEffect(() => {
  const timer = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(timer); // Cleanup on unmount/update
}, [deps]); // Re-run if changed
```

## 7. Concurrent Features and React 19 Enhancements

**Concurrent Mode (18+)**: Rendering isn't blocking—prioritize (e.g., `useDeferredValue` lags heavy lists).

**React 19 (2025)**:

- **Actions**: `<form action={handleSubmit}>` auto-mutates state + fetches.
- **Server Components**: Zero-JS renders on server; client for interactivity.
- **Improved Hydration**: Async boundaries for partial loads.

**Interview Question**: "Explain time-slicing."

- **Answer**: Fiber yields work (e.g., 5ms chunks), resuming later. Enables "interruptible" renders without jank.

## Interview Prep Tips

- **Common Pitfalls**: Explain why no `for` in render (impure); keys in lists.
- **Deep Questions**: Fiber vs. Stack Reconciler; why single root (React 18).
- **Practice**: Trace a re-render with React DevTools Profiler.
- **Resources**: "React Fiber Architecture" doc; Dan Abramov's blog.

This covers the internals—React's power is its balance of abstraction and control. For specifics (e.g., scheduler code), dive into `react-reconciler` on GitHub!
