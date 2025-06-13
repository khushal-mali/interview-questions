
# 50 Most Asked React.js Interview Questions with Detailed Answers and Code Examples

This document provides a comprehensive list of 50 commonly asked React.js interview questions, focusing on functional components and hooks, with detailed answers and practical code examples. These questions range from beginner to advanced levels, designed to prepare candidates for front-end developer interviews.

---

## 1. What is React.js, and what are its key features?

**Answer**: React.js is an open-source JavaScript library developed by Facebook for building user interfaces, particularly single-page applications (SPAs). It enables developers to create reusable, composable UI components and manage the view layer efficiently. Key features include:

- **Component-Based Architecture**: UI is divided into independent, reusable components, promoting modularity.
- **Virtual DOM**: Optimizes rendering by updating only the changed parts of the real DOM, improving performance.
- **Declarative Syntax**: Developers describe the desired UI state, and React handles updates automatically.
- **Unidirectional Data Flow**: Data flows from parent to child via props, ensuring predictable state management.
- **JSX**: A syntax extension for writing HTML-like code within JavaScript, enhancing readability.
- **React Hooks**: Allows functional components to manage state and side effects, simplifying logic.

**Code Example**:
```jsx
import React from 'react';

function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default Welcome;
```

---

## 2. What is JSX, and how does it work under the hood?

**Answer**: JSX (JavaScript XML) is a syntax extension that allows writing HTML-like structures within JavaScript code. It’s not valid JavaScript but is transpiled by Babel into `React.createElement` calls, which produce JavaScript objects representing the DOM structure. JSX improves code readability and maintainability compared to manual DOM manipulation. During rendering, these objects are used by React’s Virtual DOM to efficiently update the UI.

**Code Example**:
```jsx
// JSX
const element = <div className="box">Hello</div>;

// Transpiled to:
const element = React.createElement('div', { className: 'box' }, 'Hello');
```

---

## 3. What is the Virtual DOM, and how does it improve performance?

**Answer**: The Virtual DOM is a lightweight, in-memory representation of the actual DOM. When state or props change, React creates a new Virtual DOM tree, compares it with the previous one (diffing), and applies only the necessary changes to the real DOM (reconciliation). This minimizes expensive DOM operations, enhancing performance for complex UIs with frequent updates.

**Code Example**:
```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
// Only the <p> content updates in the real DOM.
```

---

## 4. What is the difference between props and state in React?

**Answer**: **Props** are immutable, read-only data passed from a parent component to a child, used to configure or customize components. **State** is mutable, managed internally by a component using `useState`, and represents data that changes over time, triggering re-renders. Props enable communication between components, while state handles dynamic UI updates within a component.

**Code Example**:
```jsx
import React, { useState } from 'react';

function UserProfile({ name }) { // Props
  const [age, setAge] = useState(20); // State
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <button onClick={() => setAge(age + 1)}>Increase Age</button>
    </div>
  );
}

export default UserProfile;
```

---

## 5. What are React Hooks, and why were they introduced?

**Answer**: Hooks are special functions that allow functional components to manage state, side effects, and other React features without using classes. Introduced in React 16.8, hooks simplify code, improve reusability, and eliminate issues like complex class hierarchies and lifecycle method misuse. Common hooks include `useState` (state), `useEffect` (side effects), and `useContext` (context). They enable logic sharing via custom hooks and reduce boilerplate.

**Code Example**:
```jsx
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds(seconds + 1), 1000);
    return () => clearInterval(interval); // Cleanup
  }, [seconds]);

  return <p>Seconds: {seconds}</p>;
}

export default Timer;
```

---

## 6. How does the `useState` hook work, and how do you update complex state?

**Answer**: The `useState` hook manages state in functional components, returning a state variable and a setter function. Unlike class state, updates replace the entire state value, so for complex objects (e.g., arrays, objects), you must spread or merge the previous state to avoid overwriting. The setter is asynchronous, and updates trigger re-renders. For optimal updates, use functional updates to avoid stale state issues.

**Code Example**:
```jsx
import React, { useState } from 'react';

function Form() {
  const [form, setForm] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <p>{form.name}, {form.email}</p>
    </div>
  );
}

export default Form;
```

---

## 7. What is the `useEffect` hook, and how does it handle cleanup?

**Answer**: The `useEffect` hook manages side effects (e.g., API calls, subscriptions, timers) in functional components. It runs after every render by default or conditionally based on a dependency array. Returning a cleanup function prevents memory leaks (e.g., clearing timers or subscriptions). Empty dependencies (`[]`) mimic `componentDidMount`, while including variables controls re-runs.

**Code Example**:
```jsx
import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.example.com/data');
      const result = await response.json();
      setData(result);
    };
    fetchData();

    return () => console.log('Cleanup: Abort fetch'); // Cleanup
  }, []); // Empty array: runs once

  return <div>{data ? data.name : 'Loading...'}</div>;
}

export default DataFetcher;
```

---

## 8. What is the difference between `useEffect` and `useLayoutEffect`?

**Answer**: Both hooks handle side effects, but `useEffect` runs asynchronously after the DOM is painted, suitable for non-blocking tasks like API calls. `useLayoutEffect` runs synchronously before painting, ideal for DOM measurements or mutations to avoid visual glitches. Use `useEffect` unless you need to manipulate the DOM immediately after rendering.

**Code Example**:
```jsx
import React, { useLayoutEffect, useRef } from 'react';

function MeasureDiv() {
  const divRef = useRef(null);

  useLayoutEffect(() => {
    const { width } = divRef.current.getBoundingClientRect();
    console.log('Width:', width); // Logs before painting
  }, []);

  return <div ref={divRef} style={{ width: '100px' }}>Measure me</div>;
}

export default MeasureDiv;
```

---

## 9. What is the `useRef` hook, and what are its use cases?

**Answer**: The `useRef` hook creates a mutable object with a `.current` property that persists across renders without triggering re-renders when updated. Use cases include:
- **DOM References**: Accessing or manipulating DOM elements directly.
- **Storing Mutable Values**: Persisting values (e.g., timers, previous state) without re-rendering.
- **Tracking Previous State**: Comparing current and previous values.

**Code Example**:
```jsx
import React, { useRef, useEffect } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Focus input on mount
  }, []);

  return <input ref={inputRef} placeholder="Enter text" />;
}

export default FocusInput;
```

---

## 10. What is the `useContext` hook, and how does it work?

**Answer**: The `useContext` hook accesses a context’s value within a functional component, avoiding prop drilling. Context provides a way to share data (e.g., themes, user info) across the component tree. A `Context` is created using `React.createContext`, wrapped with a `Provider`, and consumed via `useContext`.

**Code Example**:
```jsx
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext(null);

function App() {
  return (
    <ThemeContext.Provider value={{ color: 'blue' }}>
      <ThemedComponent />
    </ThemeContext.Provider>
  );
}

function ThemedComponent() {
  const theme = useContext(ThemeContext);
  return <div style={{ color: theme.color }}>Themed Text</div>;
}

export default App;
```

---

## 11. What are custom hooks, and how do you create one?

**Answer**: Custom hooks are reusable functions that encapsulate logic involving React hooks, allowing you to share stateful logic across components. They follow the naming convention `useSomething` and can call other hooks. Custom hooks abstract complex logic (e.g., form handling, API fetching) into reusable utilities.

**Code Example**:
```jsx
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

function WindowDisplay() {
  const { width, height } = useWindowSize();
  return <p>Window: {width} x {height}</p>;
}

export default WindowDisplay;
```

---

## 12. What is prop drilling, and how can you avoid it?

**Answer**: Prop drilling occurs when props are passed through multiple component layers to reach a deeply nested child, leading to cumbersome code. To avoid it:
- **Use Context**: Share data globally via `useContext`.
- **Use State Management Libraries**: Libraries like Redux or Zustand centralize state.
- **Component Composition**: Restructure components to reduce nesting or use render props/children.

**Code Example**:
```jsx
import React, { createContext, useContext } from 'react';

const UserContext = createContext(null);

function App() {
  const user = { name: 'Alice' };
  return (
    <UserContext.Provider value={user}>
      <Parent />
    </UserContext.Provider>
  );
}

function Parent() {
  return <Child />;
}

function Child() {
  const user = useContext(UserContext);
  return <p>User: {user.name}</p>;
}

export default App;
// Avoids passing user prop through Parent
```

---

## 13. What is the `useReducer` hook, and when should you use it?

**Answer**: The `useReducer` hook manages complex state logic using a reducer function, similar to Redux. It returns a state value and a dispatch function to trigger state updates based on actions. Use it when state transitions are complex, involve multiple sub-values, or follow predictable patterns, instead of multiple `useState` calls.

**Code Example**:
```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}

export default Counter;
```

---

## 14. What is the difference between controlled and uncontrolled components?

**Answer**: **Controlled components** have their form inputs managed by React state, with values set via `value` and updated via `onChange`. **Uncontrolled components** rely on the DOM to store input values, accessed via refs. Controlled components are predictable and easier to validate, while uncontrolled components are simpler for basic forms but harder to manage.

**Code Example**:
```jsx
import React, { useState, useRef } from 'react';

function Form() {
  // Controlled
  const [value, setValue] = useState('');
  // Uncontrolled
  const inputRef = useRef(null);

  const handleSubmit = () => {
    console.log('Controlled:', value);
    console.log('Uncontrolled:', inputRef.current.value);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Controlled"
      />
      <input type="text" ref={inputRef} placeholder="Uncontrolled" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Form;
```

---

## 15. What is React.memo, and when should you use it?

**Answer**: `React.memo` is a higher-order component that memoizes a functional component, preventing re-renders if props remain unchanged (shallow comparison). Use it for performance optimization in components that render frequently with unchanged props, but avoid overusing it due to memoization overhead.

**Code Example**:
```jsx
import React, { memo } from 'react';

const Child = memo(({ value }) => {
  console.log('Child rendered');
  return <p>Value: {value}</p>;
});

function Parent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child value="Static" />
    </div>
  );
}

export default Parent;
// Child doesn't re-render unless its props change
```

---

## 16. What is the `useCallback` hook, and why is it useful?

**Answer**: The `useCallback` hook memoizes a callback function, returning the same function instance unless dependencies change. It’s useful to prevent unnecessary re-creations of functions passed as props to memoized components or used in `useEffect` dependencies, optimizing performance.

**Code Example**:
```jsx
import React, { useState, useCallback } from 'react';

function Child({ onClick }) {
  console.log('Child rendered');
  return <button onClick={onClick}>Click me</button>;
}

const MemoChild = React.memo(Child);

function Parent() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => console.log('Clicked'), []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <MemoChild onClick={handleClick} />
    </div>
  );
}

export default Parent;
// MemoChild doesn't re-render due to stable handleClick
```

---

## 17. What is the `useMemo` hook, and when should you use it?

**Answer**: The `useMemo` hook memoizes a computed value, recalculating only when dependencies change. Use it to optimize expensive calculations (e.g., filtering large arrays) or to stabilize object references passed to memoized components, preventing unnecessary re-renders.

**Code Example**:
```jsx
import React, { useState, useMemo } from 'react';

function ExpensiveCalculation() {
  const [count, setCount] = useState(0);
  const [items] = useState([1, 2, 3, 4, 5]);

  const sum = useMemo(() => {
    console.log('Calculating sum');
    return items.reduce((acc, curr) => acc + curr, 0);
  }, [items]);

  return (
    <div>
      <p>Sum: {sum}</p>
      <button onClick={() => setCount(count + 1)}>Re-render ({count})</button>
    </div>
  );
}

export default ExpensiveCalculation;
// Sum is only recalculated if items change
```

---

## 18. What are React fragments, and why are they used?

**Answer**: React fragments (`<>...</>` or `<React.Fragment>`) group multiple elements without adding extra DOM nodes. They’re used to avoid unnecessary wrapper `<div>`s, keeping the DOM clean and preventing CSS or layout issues caused by additional elements.

**Code Example**:
```jsx
import React from 'react';

function List() {
  return (
    <>
      <li>Item 1</li>
      <li>Item 2</li>
    </>
  );
}

export default List;
// No extra <div> in the DOM
```

---

## 19. What is the StrictMode in React, and what does it do?

**Answer**: `<StrictMode>` is a development tool that wraps components to identify potential problems, such as deprecated APIs, unsafe lifecycle usage, or side effects in render. It double-invokes certain functions (e.g., `useState`, `useEffect`) in development to catch issues but has no effect in production.

**Code Example**:
```jsx
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return <div>Hello, React!</div>;
}

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

---

## 20. How do you handle side effects in React?

**Answer**: Side effects (e.g., data fetching, subscriptions, DOM mutations) are managed using the `useEffect` hook in functional components. Place side effect logic in the effect callback and return a cleanup function to prevent memory leaks. For reusable side effects, create custom hooks.

**Code Example**:
```jsx
import React, { useEffect } from 'react';

function MouseTracker() {
  useEffect(() => {
    const handleMouseMove = (e) => console.log(`X: ${e.clientX}, Y: ${e.clientY}`);
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <p>Move your mouse</p>;
}

export default MouseTracker;
```

---

## 21. What is the React Router, and how do you set it up?

**Answer**: React Router is a library for handling client-side routing in React applications. It enables navigation between views without full page reloads. Key components include `BrowserRouter`, `Routes`, `Route`, and `Link`. Install `react-router-dom`, wrap the app in `BrowserRouter`, and define routes using `Routes` and `Route`.

**Code Example**:
```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <h1>Home</h1>;
}

function About() {
  return <h1>About</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## 22. What is the `useNavigate` hook in React Router?

**Answer**: The `useNavigate` hook from `react-router-dom` provides a function to programmatically navigate between routes. It replaces `useHistory` in React Router v6, offering a simpler API to push or replace routes, pass state, or navigate relative to the current route.

**Code Example**:
```jsx
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login
    navigate('/dashboard', { state: { user: 'Alice' } });
  };

  return <button onClick={handleLogin}>Login</button>;
}

export default Login;
```

---

## 23. How do you handle forms in React?

**Answer**: Forms in React are typically managed as controlled components, where input values are stored in state and updated via `onChange`. For complex forms, use libraries like Formik or React Hook Form. Handle submissions with an `onSubmit` handler, and validate inputs as needed.

**Code Example**:
```jsx
import React, { useState } from 'react';

function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginForm;
```

---

## 24. What is the `useImperativeHandle` hook, and when is it used?

**Answer**: The `useImperativeHandle` hook customizes the instance value exposed to parent components when using `ref` with `forwardRef`. It’s used to expose specific methods or properties instead of the entire DOM node, enhancing encapsulation in reusable components.

**Code Example**:
```jsx
import React, { useRef, useImperativeHandle, forwardRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focusAndClear: () => {
      inputRef.current.focus();
      inputRef.current.value = '';
    }
  }));

  return <input ref={inputRef} />;
});

function Parent() {
  const inputRef = useRef();

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={() => inputRef.current.focusAndClear()}>
        Focus and Clear
      </button>
    </div>
  );
}

export default Parent;
```

---

## 25. What is the `forwardRef` in React, and why is it needed?

**Answer**: `forwardRef` is a higher-order component that passes a `ref` from a parent to a child component, enabling the parent to access the child’s DOM node or instance. It’s needed for scenarios like focusing inputs or triggering methods in child components directly.

**Code Example**:
```jsx
import React, { forwardRef, useRef } from 'react';

const Child = forwardRef((props, ref) => {
  return <input ref={ref} />;
});

function Parent() {
  const inputRef = useRef();

  const handleClick = () => inputRef.current.focus();

  return (
    <div>
      <Child ref={inputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}

export default Parent;
```

---

## 26. What is the `useTransition` hook, and how does it improve UX?

**Answer**: The `useTransition` hook (React 18+) marks state updates as non-urgent, allowing React to prioritize critical updates (e.g., UI interactions) while deferring others. It returns a `startTransition` function and an `isPending` flag, improving UX by keeping the UI responsive during heavy updates.

**Code Example**:
```jsx
import React, { useState, useTransition } from 'react';

function SearchList() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setQuery(e.target.value);
    startTransition(() => {
      // Simulate heavy filtering
      setItems(new Array(10000).fill(e.target.value));
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} placeholder="Search" />
      {isPending && <p>Loading...</p>}
      <ul>{items.slice(0, 5).map((item, i) => <li key={i}>{item}</li>)}</ul>
    </div>
  );
}

export default SearchList;
```

---

## 27. What is the `useDeferredValue` hook, and when is it useful?

**Answer**: The `useDeferredValue` hook (React 18+) defers rendering of a value until higher-priority updates complete, improving responsiveness for expensive UI updates (e.g., search filtering). It’s useful when you want to keep the UI interactive while processing non-critical data.

**Code Example**:
```jsx
import React, { useState, useDeferredValue } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    // Simulate expensive computation
    return new Array(1000).fill(deferredQuery);
  }, [deferredQuery]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
      />
      <ul>{results.slice(0, 5).map((item, i) => <li key={i}>{item}</li>)}</ul>
    </div>
  );
}

export default SearchResults;
```

---

## 28. How do you optimize React performance?

**Answer**: Optimize React performance using:
- **Memoization**: Use `React.memo`, `useMemo`, `useCallback` to prevent unnecessary re-renders.
- **Lazy Loading**: Load components dynamically with `React.lazy` and `Suspense`.
- **Virtualization**: Use libraries like `react-window` for long lists.
- **Avoid Inline Functions/Objects**: Define functions/objects outside render to stabilize props.
- **Use Production Build**: Ensure the production build minimizes overhead.
- **Profile with DevTools**: Identify bottlenecks using React Profiler.

**Code Example**:
```jsx
import React, { useState, useCallback, memo } from 'react';

const Item = memo(({ text }) => {
  console.log('Item rendered');
  return <li>{text}</li>;
});

function List() {
  const [items, setItems] = useState(['A', 'B', 'C']);
  const addItem = useCallback(() => setItems([...items, 'D']), [items]);

  return (
    <div>
      <ul>{items.map((item, i) => <Item key={i} text={item} />)}</ul>
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

export default List;
```

---

## 29. What is React.lazy, and how does it work with Suspense?

**Answer**: `React.lazy` enables code-splitting by dynamically importing components, reducing initial bundle size. It’s used with `Suspense`, which displays a fallback UI (e.g., loader) while the lazy component loads. This improves performance for large applications.

**Code Example**:
```jsx
import React, { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

export default App;
```

---

## 30. What is the Error Boundary in React, and how do you implement it?

**Answer**: Error Boundaries catch JavaScript errors in a component tree, preventing the entire app from crashing. They are implemented using class components with `static getDerivedStateFromError` or `componentDidCatch`, as hooks don’t support error boundaries. Wrap components in an Error Boundary to display fallback UI.

**Code Example**:
```jsx
import React, { useState } from 'react';

// Note: ErrorBoundary must be a class component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

function BuggyComponent() {
  const [crash, setCrash] = useState(false);
  if (crash) throw new Error('Crashed!');
  return <button onClick={() => setCrash(true)}>Crash</button>;
}

function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}

export default App;
```

---

## 31. How do you handle API calls in React?

**Answer**: API calls are typically made in `useEffect` or custom hooks to manage fetching, loading states, and errors. Use `fetch` or libraries like Axios, and handle responses with state. For reusability, encapsulate API logic in custom hooks.

**Code Example**:
```jsx
import React, { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}

function UserList() {
  const { data, loading, error } = useFetch('https://api.example.com/users');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UserList;
```

---

## 32. What is the `useId` hook, and what problem does it solve?

**Answer**: The `useId` hook (React 18+) generates unique IDs for accessibility attributes (e.g., `aria-labelledby`, `htmlFor`) in server-side rendering (SSR) and client-side rendering. It ensures consistent IDs across server and client, preventing hydration mismatches.

**Code Example**:
```jsx
import React, { useId } from 'react';

function InputField() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Name</label>
      <input id={id} type="text" />
    </div>
  );
}

export default InputField;
```

---

## 33. How do you handle conditional rendering in React?

**Answer**: Conditional rendering displays different UI based on state or props using techniques like:
- **Ternary Operators**: For simple conditions.
- **Logical && Operator**: For rendering when a condition is true.
- **Early Returns**: To avoid rendering certain components.
Avoid complex logic in JSX for readability.

**Code Example**:
```jsx
import React, { useState } from 'react';

function ConditionalRender() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <button onClick={() => setIsLoggedIn(true)}>Login</button>;
  }

  return (
    <div>
      <p>Welcome!</p>
      <button onClick={() => setIsLoggedIn(false)}>Logout</button>
    </div>
  );
}

export default ConditionalRender;
```

---

## 34. What is the `useSyncExternalStore` hook, and when is it used?

**Answer**: The `useSyncExternalStore` hook (React 18+) synchronizes external store state (e.g., Redux, browser APIs) with React’s rendering cycle, preventing tearing in concurrent rendering. It’s used for integrating non-React state management or browser APIs like `window.localStorage`.

**Code Example**:
```jsx
import React, { useSyncExternalStore } from 'react';

function useTheme() {
  const subscribe = (cb) => {
    window.addEventListener('storage', cb);
    return () => window.removeEventListener('storage', cb);
  };

  const getSnapshot = () => localStorage.getItem('theme') || 'light';

  return useSyncExternalStore(subscribe, getSnapshot);
}

function ThemeToggle() {
  const theme = useTheme();

  const toggleTheme = () => {
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div>
      <p>Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

export default ThemeToggle;
```

---

## 35. How do you handle lists in React, and why are keys important?

**Answer**: Lists are rendered using array methods like `map` to generate components for each item. Each child needs a unique `key` prop to help React efficiently update the DOM by identifying which elements changed, added, or removed. Avoid using array indices as keys if the list order changes.

**Code Example**:
```jsx
import React from 'react';

function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

export default TodoList;
```

---

## 36. What is the React Context API, and how does it differ from Redux?

**Answer**: The Context API shares data across components without prop drilling, suitable for small to medium apps (e.g., themes, user data). Redux is a global state management library with predictable state updates via actions and reducers, ideal for large, complex apps. Context is simpler but less scalable; Redux adds structure but increases complexity.

**Code Example**:
```jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (name) => setUser({ name });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function Profile() {
  const { user, logout } = useContext(AuthContext);
  return user ? (
    <div>
      <p>Welcome, {user.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <p>Not logged in</p>
  );
}

function App() {
  return (
    <AuthProvider>
      <Profile />
    </AuthProvider>
  );
}

export default App;
```

---

## 37. How do you handle events in React?

**Answer**: Events in React use camelCase (e.g., `onClick`) and are passed as functions, not strings. Synthetic events normalize browser differences, and you can access event properties via the event object. Use `useCallback` for memoized handlers to optimize performance.

**Code Example**:
```jsx
import React, { useState, useCallback } from 'react';

function Button() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <p>Clicked: {count}</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default Button;
```

---

## 38. What is the `useDebugValue` hook, and when is it used?

**Answer**: The `useDebugValue` hook labels custom hooks in React DevTools, improving debugging by displaying custom information about hook state or values. It’s used in custom hooks to make debugging easier, especially in large applications.

**Code Example**:
```jsx
import { useState, useDebugValue } from 'react';

function useCounter(initialValue) {
  const [count, setCount] = useState(initialValue);
  useDebugValue(`Count: ${count}`);
  return [count, () => setCount(count + 1)];
}

function Counter() {
  const [count, increment] = useCounter(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;
```

---

## 39. How do you handle authentication in a React app?

**Answer**: Handle authentication by:
- Storing user data (e.g., token, user info) in Context or a state management library.
- Protecting routes with a `PrivateRoute` component using React Router.
- Redirecting unauthenticated users to a login page.
- Using custom hooks to manage auth state and API calls.

**Code Example**:
```jsx
import { createContext, useContext, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, login: setUser, logout: () => setUser(null) }}>
      {children}
    </AuthContext.Provider>
  );
}

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  return user ? children : <Navigate to="/login" state={{ from: location }} />;
}

function Login() {
  const { login } = useContext(AuthContext);
  return <button onClick={() => login({ name: 'Alice' })}>Login</button>;
}

function Dashboard() {
  return <h1>Dashboard</h1>;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute><Dashboard /></PrivateRoute>}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
```

---

## 40. What is the `useInsertionEffect` hook, and what is its purpose?

**Answer**: The `useInsertionEffect` hook (React 18+) runs synchronously before DOM mutations, designed for CSS-in-JS libraries to inject styles before rendering. It’s rarely used in application code, as `useEffect` or `useLayoutEffect` cover most needs.

**Code Example**:
```jsx
import React, { useInsertionEffect } from 'react';

function StyleInjector() {
  useInsertionEffect(() => {
    const style = document.createElement('style');
    style.textContent = `.box { color: blue; }`;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return <div className="box">Styled Text</div>;
}

export default StyleInjector;
```

---

## 41. How do you handle global state in React?

**Answer**: Global state can be managed using:
- **Context API**: For small to medium apps with simple state (e.g., themes, user).
- **State Management Libraries**: Redux, Zustand, or Recoil for complex apps.
- **Custom Hooks**: Combine Context with hooks for reusable state logic.
Avoid overusing global state; prefer local state when possible.

**Code Example**:
```jsx
import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext(null);

function GlobalProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <GlobalContext.Provider value={{ theme, toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light') }}>
      {children}
    </GlobalContext.Provider>
  );
}

function ThemeButton() {
  const { theme, toggleTheme } = useContext(GlobalContext);
  return (
    <button onClick={toggleTheme}>
      Toggle to {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
}

function App() {
  return (
    <GlobalProvider>
      <ThemeButton />
    </GlobalProvider>
  );
}

export default App;
```

---

## 42. What is the `useOutletContext` hook in React Router?

**Answer**: The `useOutletContext` hook (React Router v6) accesses context provided by a parent route’s `Outlet` component, allowing data sharing between parent and nested routes without prop drilling.

**Code Example**:
```jsx
import { Routes, Route, Outlet, useOutletContext, useParams } from 'react-router-dom';

function UserLayout() {
  const user = { name: 'Alice' };
  return (
    <div>
      <h1>User Profile</h1>
      <Outlet context={user} />
    </div>
  );
}

function UserProfile() {
  const user = useOutletContext();
  return <p>Name: {user.name}</p>;
}

function App() {
  return (
    <Routes>
      <Route path="/user" element={<UserLayout />}>
        <Route path="profile" element={<UserProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
```

---

## 43. How do you implement a modal in React?

**Answer**: Implement a modal using:
- **State**: Toggle visibility with `useState`.
- **Portals**: Render the modal outside the component hierarchy using `createPortal`.
- **CSS**: Style for overlay and positioning.
- **Accessibility**: Add ARIA attributes and keyboard support (e.g., Escape key).

**Code Example**:
```jsx
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    background: 'white',
    padding: '20px',
    borderRadius: '5px'
  }
};

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2>Modal Content</h2>
        <p>This is a modal!</p>
      </Modal>
    </div>
  );
}

export default App;
```

---

## 44. How do you handle component testing in React?

**Answer**: Test components using:
- **Unit Testing**: Test individual components with Jest and `@testing-library/react`.
- **Render Testing**: Render components and simulate events with `render` and `fireEvent`.
- **Assertions**: Check DOM output with `screen.getByText`, `expect`.
- **Snapshots**: Capture component output for regression testing.
- **Mocking**: Mock APIs or hooks with `jest.fn()` or libraries like MSW.

**Code Example**:
```jsx
// components/Counter.js
import React, { useState } from 'react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;

// __tests__/Counter.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../Counter';

test('increments counter', () => {
  const { getByText } = render(<Counter />);
  const button = getByText('Increment');
  expect(getByText('Count: 0')).toBeInTheDocument();
  fireEvent.click(button);
  expect(getByText('Count: 1')).toBeInTheDocument();
});
```

---

## 45. What is the `useLocation` hook in React Router?

**Answer**: The `useLocation` hook from `react-router-dom` returns the current location object, containing properties like `pathname`, `search`, and `state`. It’s useful for accessing URL information or state passed during navigation.

**Code Example**:
```jsx
import { useLocation } from 'react-router-dom';

function PageTracker() {
  const location = useLocation();

  return (
    <div>
      <p>Current Path: {location.pathname}</p>
      <p>Search: {location.search}</p>
      {location.state && <p>State: {location.state.from}</p>}
    </div>
  );
}

export default PageTracker;
```

---

## 46. How do you implement a custom hook for debouncing?

**Answer**: A debounce custom hook delays function execution until a specified time has passed since the last call, useful for search inputs or resize events. Use `useEffect` and `useCallback` to manage the debounced function and cleanup timers.

**Code Example**:
```jsx
import { useState, useCallback, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

function SearchInput() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      console.log('Search:', debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search"
    />
  );
}

export default SearchInput;
```

---

## 47. What is the `useParams` hook in React Router?

**Answer**: The `useParams` hook from `react-router-dom` extracts dynamic parameters from the URL defined in a route’s path, returning an object with parameter key-value pairs. It’s used to access route-specific data, like IDs.

**Code Example**:
```jsx
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();

  return <h1>User ID: {id}</h1>;
}

export default UserProfile;
// Route: <Route path="/user/:id" element={<UserProfile />} />
```

---

## 48. How do you handle accessibility (a11y) in React?

**Answer**: Ensure accessibility by:
- **Semantic HTML**: Use appropriate tags (`<nav>`, `<button>`).
- **ARIA Attributes**: Add `aria-label`, `aria-hidden`, etc., for screen readers.
- **Keyboard Navigation**: Support `onKeyDown` for keyboard users.
- **Focus Management**: Use refs to manage focus programmatically.
- **Testing**: Use tools like `axe-core` or `react-axe` to audit.

**Code Example**:
```jsx
import React, { useRef } from 'react';

function AccessibleButton() {
  const buttonRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      buttonRef.current.click();
    }
  };

  return (
    <button
      ref={buttonRef}
      onKeyDown={handleKeyDown}
      aria-label="Toggle menu"
      onClick={() => console.log('Toggled')}
    >
      Menu
    </button>
  );
}

export default AccessibleButton;
```

---

## 49. What is the `useSearchParams` hook in React Router?

**Answer**: The `useSearchParams` hook from `react-router-dom` (v6) manages URL query parameters, returning a `URLSearchParams` object and a setter function. It’s used to read and update query strings dynamically.

**Code Example**:
```jsx
import { useSearchParams } from 'react-router-dom';

function SearchFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const handleChange = (e) => {
    setSearchParams({ q: e.target.value });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} placeholder="Search" />
      <p>Query: {query}</p>
    </div>
  );
}

export default SearchFilter;
```

---

## 50. How do you implement a theme switcher in React?

**Answer**: Implement a theme switcher using Context to manage theme state, `useEffect` to apply styles (e.g., CSS variables, classes), and local storage to persist the theme. Use a custom hook for reusability and ensure accessibility with media queries for system preferences.

**Code Example**:
```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light') }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <p>Current Theme: {theme}</p>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>
  );
}

export default App;

// styles.css
body.light {
  background: white;
  color: black;
}
body.dark {
  background: black;
  color: white;
}
```

---

This Markdown file provides a detailed resource for React.js interview preparation, emphasizing modern practices with functional components and hooks. Each question is answered thoroughly with practical examples to ensure a deep understanding of React concepts.
```