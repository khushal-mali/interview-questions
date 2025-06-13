# 50 Additional Most Asked React.js Interview Questions with Detailed Answers and Code Examples

This document provides a fresh set of 50 commonly asked React.js interview questions, focusing on functional components and hooks, with detailed answers and practical code examples. These questions range from beginner to advanced levels, designed to prepare candidates for front-end developer interviews, complementing a previous set for comprehensive React.js preparation.

---

## 1. What is the purpose of the `key` prop in React, and why is it important?

**Answer**: The `key` prop is a unique identifier for elements in a list, helping React efficiently update the DOM during reconciliation. It allows React to track which items have changed, been added, or removed, minimizing unnecessary re-renders and DOM operations. Using stable, unique keys (e.g., IDs) prevents UI bugs, like incorrect state binding, and improves performance. Avoid using array indices as keys in dynamic lists, as reordering can cause issues.

**Code Example**:
```jsx
import React from 'react';

function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.text}</li>
      ))}
    </ul>
  );
}

export default TaskList;
// tasks = [{ id: 1, text: 'Task 1' }, { id: 2, text: 'Task 2' }]
```

---

## 2. What is the difference between `useState` and `useReducer` for state management?

**Answer**: Both `useState` and `useReducer` manage state in functional components, but they serve different purposes:
- **`useState`**: Ideal for simple, independent state values (e.g., counters, form inputs). It provides a state variable and setter function but can become unwieldy with complex state logic.
- **`useReducer`**: Suited for complex state transitions involving multiple sub-values or interdependent logic (e.g., form with validation, game state). It uses a reducer function to handle actions, promoting predictable state updates similar to Redux.
Use `useState` for simplicity and `useReducer` when state logic is intricate or requires centralized control.

**Code Example**:
```jsx
import React, { useState, useReducer } from 'react';

function StateExample() {
  // useState
  const [count, setCount] = useState(0);

  // useReducer
  const initialState = { count: 0, step: 1 };
  const reducer = (state, action) => {
    switch (action.type) {
      case 'increment': return { ...state, count: state.count + state.step };
      case 'setStep': return { ...state, step: action.payload };
      default: return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>useState Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>useReducer Count: {state.count}, Step: {state.step}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <input
        type="number"
        value={state.step}
        onChange={(e) => dispatch({ type: 'setStep', payload: Number(e.target.value) })}
      />
    </div>
  );
}

export default StateExample;
```

---

## 3. How does React handle re-rendering, and what triggers it?

**Answer**: React re-renders a component when its state, props, or context changes, triggering a new render to update the UI. The Virtual DOM compares the new render output with the previous one (diffing) and applies minimal changes to the real DOM (reconciliation). Parent re-renders can cause child re-renders, but memoization (`React.memo`, `useMemo`, `useCallback`) can prevent unnecessary updates. Avoid mutating state directly, as it bypasses React’s change detection.

**Code Example**:
```jsx
import React, { useState } from 'react';

function Parent() {
  const [count, setCount] = useState(0);
  console.log('Parent rendered');

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child />
    </div>
  );
}

function Child() {
  console.log('Child rendered');
  return <p>Static Child</p>;
}

export default Parent;
// Both Parent and Child re-render on count change
```

---

## 4. What is the `useCallback` hook, and how does it differ from `useMemo`?

**Answer**: Both `useCallback` and `useMemo` optimize performance by memoizing values, but they serve different purposes:
- **`useCallback`**: Memoizes a function, returning the same function instance unless dependencies change. It’s used to stabilize function props for memoized components or `useEffect` dependencies.
- **`useMemo`**: Memoizes a computed value (e.g., array, object, calculation), recalculating only when dependencies change. It’s used for expensive computations or stabilizing object references.
Use `useCallback` for functions and `useMemo` for values.

**Code Example**:
```jsx
import React, { useState, useCallback, useMemo } from 'react';

const Child = React.memo(({ onClick, data }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Value: {data.sum}</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const numbers = [1, 2, 3];

  const handleClick = useCallback(() => console.log('Clicked'), []);
  const sum = useMemo(() => numbers.reduce((a, b) => a + b, 0), [numbers]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onClick={handleClick} data={{ sum }} />
    </div>
  );
}

export default Parent;
// Child doesn’t re-render unless handleClick or sum changes
```

---

## 5. What is the `useRef` hook’s role in managing mutable values?

**Answer**: The `useRef` hook creates a mutable `.current` property that persists across renders without triggering re-renders when updated. Beyond DOM access, it’s used to store mutable values like timers, previous state, or counters. Unlike state, changing `.current` doesn’t cause a re-render, making it ideal for non-UI-related data.

**Code Example**:
```jsx
import React, { useState, useRef } from 'react';

function ClickCounter() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  renderCount.current += 1; // Increments without re-rendering

  return (
    <div>
      <p>Clicks: {count}</p>
      <p>Renders: {renderCount.current}</p>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  );
}

export default ClickCounter;
```

---

## 6. What is the purpose of `React.Fragment` with a key?

**Answer**: `React.Fragment` groups multiple elements without adding extra DOM nodes, and when used in lists, it can accept a `key` prop to uniquely identify the fragment. This is necessary when rendering lists of grouped elements (e.g., table rows with multiple cells) to ensure React correctly tracks and updates them.

**Code Example**:
```jsx
import React from 'react';

function Table({ rows }) {
  return (
    <table>
      <tbody>
        {rows.map((row) => (
          <React.Fragment key={row.id}>
            <tr><td>{row.name}</td></tr>
            <tr><td>{row.description}</td></tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
// rows = [{ id: 1, name: 'Row 1', description: 'Desc 1' }, ...]
```

---

## 7. How do you prevent unnecessary re-renders in React?

**Answer**: Prevent unnecessary re-renders using:
- **React.memo**: Memoizes components to skip re-renders if props are unchanged.
- **useCallback**: Stabilizes function props.
- **useMemo**: Stabilizes computed values or object references.
- **Split Components**: Break large components into smaller ones to isolate state updates.
- **Avoid Inline Objects/Functions**: Define them outside render to prevent new references.

**Code Example**:
```jsx
import React, { useState, memo } from 'react';

const Display = memo(({ value }) => {
  console.log('Display rendered');
  return <p>Value: {value}</p>;
});

function App() {
  const [count, setCount] = useState(0);
  const staticValue = useMemo(() => ({ value: 'Static' }), []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Display value={staticValue.value} />
    </div>
  );
}

export default App;
// Display doesn’t re-render on count change
```

---

## 8. What is the `useContext` hook’s performance impact?

**Answer**: The `useContext` hook subscribes a component to a context, causing re-renders when the context value changes. If the context value is an object created on every render, it can trigger unnecessary re-renders. To optimize:
- Use `useMemo` to stabilize the context value.
- Split contexts for different data to reduce re-render scope.
- Use `React.memo` for components that don’t need context updates.

**Code Example**:
```jsx
import React, { createContext, useContext, useState, useMemo } from 'react';

const AppContext = createContext(null);

function AppProvider({ children }) {
  const [count, setCount] = useState(0);
  const value = useMemo(() => ({ count, setCount }), [count]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function Consumer() {
  const { count } = useContext(AppContext);
  console.log('Consumer rendered');
  return <p>Count: {count}</p>;
}

function App() {
  return (
    <AppProvider>
      <Consumer />
    </AppProvider>
  );
}

export default App;
// Memoized value prevents unnecessary re-renders
```

---

## 9. What is the `useTransition` hook’s role in concurrent rendering?

**Answer**: The `useTransition` hook (React 18+) marks state updates as non-urgent, allowing React to prioritize critical updates (e.g., UI interactions) while deferring others. It returns a `startTransition` function to wrap deferred updates and an `isPending` flag to show loading states, improving UX in concurrent rendering scenarios like search filtering.

**Code Example**:
```jsx
import React, { useState, useTransition } from 'react';

function FilterList() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setQuery(e.target.value);
    startTransition(() => {
      setItems(new Array(1000).fill(e.target.value));
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} placeholder="Filter" />
      {isPending && <p>Loading...</p>}
      <ul>{items.slice(0, 5).map((item, i) => <li key={i}>{item}</li>)}</ul>
    </div>
  );
}

export default FilterList;
```

---

## 10. What is the `useDeferredValue` hook, and how does it differ from `useTransition`?

**Answer**: The `useDeferredValue` hook (React 18+) defers rendering of a value until high-priority updates complete, improving responsiveness for expensive UI updates (e.g., large lists). Unlike `useTransition`, which marks specific updates as low-priority, `useDeferredValue` defers a single value’s rendering. Use `useDeferredValue` for simpler deferral scenarios and `useTransition` for broader state updates.

**Code Example**:
```jsx
import React, { useState, useDeferredValue } from 'react';

function SearchList() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const items = useMemo(() => {
    return new Array(1000).fill(deferredQuery);
  }, [deferredQuery]);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
      <ul>{items.slice(0, 5).map((item, i) => <li key={i}>{item}</li>)}</ul>
    </div>
  );
}

export default SearchList;
```

---

## 11. How do you implement lazy loading of images in React?

**Answer**: Lazy load images using the `loading="lazy"` attribute for native browser support or libraries like `react-lazyload`. For custom implementation, use the Intersection Observer API with a custom hook to load images when they enter the viewport, reducing initial page load time.

**Code Example**:
```jsx
import React, { useState, useEffect, useRef } from 'react';

function useLazyImage(src) {
  const [imageSrc, setImageSrc] = useState(null);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [src]);

  return [imageSrc, ref];
}

function LazyImage({ src, alt }) {
  const [imageSrc, imageRef] = useLazyImage(src);

  return (
    <img
      ref={imageRef}
      src={imageSrc || 'placeholder.jpg'}
      alt={alt}
      style={{ width: '200px', height: '200px' }}
    />
  );
}

export default LazyImage;
```

---

## 12. What is the `useId` hook’s role in accessibility?

**Answer**: The `useId` hook (React 18+) generates unique IDs for accessibility attributes (e.g., `aria-labelledby`, `htmlFor`) that are consistent across server-side and client-side rendering. It prevents hydration mismatches and ensures screen readers correctly associate labels with inputs.

**Code Example**:
```jsx
import React, { useId } from 'react';

function Checkbox() {
  const id = useId();

  return (
    <div>
      <input type="checkbox" id={id} />
      <label htmlFor={id}>Agree to terms</label>
    </div>
  );
}

export default Checkbox;
```

---

## 13. How do you handle dynamic forms in React?

**Answer**: Dynamic forms manage variable input fields using an array in state, updated via event handlers. Use `map` to render inputs, assign unique keys, and handle additions/removals with array methods. Libraries like Formik or React Hook Form simplify complex dynamic forms.

**Code Example**:
```jsx
import React, { useState } from 'react';

function DynamicForm() {
  const [fields, setFields] = useState([{ id: 1, value: '' }]);

  const addField = () => {
    setFields([...fields, { id: fields.length + 1, value: '' }]);
  };

  const handleChange = (id, value) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, value } : field)));
  };

  return (
    <div>
      {fields.map((field) => (
        <input
          key={field.id}
          value={field.value}
          onChange={(e) => handleChange(field.id, e.target.value)}
          placeholder={`Field ${field.id}`}
        />
      ))}
      <button onClick={addField}>Add Field</button>
    </div>
  );
}

export default DynamicForm;
```

---

## 14. What is the `useImperativeHandle` hook’s use case with `forwardRef`?

**Answer**: The `useImperativeHandle` hook, used with `forwardRef`, customizes the ref object exposed to parent components, allowing controlled access to a child’s methods or properties. It’s used in reusable components (e.g., custom inputs) to expose specific functionality while hiding internal details.

**Code Example**:
```jsx
import React, { useRef, useImperativeHandle, forwardRef } from 'react';

const CustomButton = forwardRef((props, ref) => {
  const buttonRef = useRef();

  useImperativeHandle(ref, () => ({
    triggerClick: () => buttonRef.current.click()
  }));

  return <button ref={buttonRef} {...props}>Click me</button>;
});

function Parent() {
  const buttonRef = useRef();

  return (
    <div>
      <CustomButton ref={buttonRef} />
      <button onClick={() => buttonRef.current.triggerClick()}>Trigger</button>
    </div>
  );
}

export default Parent;
```

---

## 15. How do you implement a custom hook for fetching data?

**Answer**: A custom hook for data fetching encapsulates API call logic, managing loading, error, and data states. Use `useEffect` to fetch data and `useState` for state management. Add options for refetching or handling query parameters to make it reusable.

**Code Example**:
```jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
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

## 16. What is the `useLayoutEffect` hook’s specific use case?

**Answer**: The `useLayoutEffect` hook runs synchronously before the browser paints, ideal for DOM measurements or mutations that must occur before rendering to avoid visual glitches (e.g., adjusting element positions). It’s less common than `useEffect`, which runs asynchronously and is better for non-DOM side effects.

**Code Example**:
```jsx
import React, { useLayoutEffect, useRef } from 'react';

function Tooltip() {
  const tooltipRef = useRef();

  useLayoutEffect(() => {
    const { width } = tooltipRef.current.getBoundingClientRect();
    tooltipRef.current.style.transform = `translateX(-${width / 2}px)`;
  }, []);

  return <div ref={tooltipRef} style={{ position: 'absolute' }}>Tooltip</div>;
}

export default Tooltip;
```

---

## 17. How do you handle routing with nested routes in React Router?

**Answer**: Nested routes in React Router v6 organize UI hierarchically, using `<Outlet>` to render child routes within a parent layout. Define routes with `Routes` and `Route`, and use hooks like `useParams` or `useNavigate` for dynamic navigation.

**Code Example**:
```jsx
import { Routes, Route, Outlet, Link, useParams } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <nav>
        <Link to="profile">Profile</Link> | <Link to="settings">Settings</Link>
      </nav>
      <Outlet />
    </div>
  );
}

function Profile() {
  const { userId } = useParams();
  return <h2>Profile for User {userId}</h2>;
}

function Settings() {
  return <h2>Settings</h2>;
}

function App() {
  return (
    <Routes>
      <Route path="/user/:userId" element={<Layout />}>
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
```

---

## 18. What is the `useDebugValue` hook’s practical application?

**Answer**: The `useDebugValue` hook enhances debugging by labeling custom hooks in React DevTools, displaying custom information about their state or values. It’s used in reusable hooks to make debugging easier, especially in complex applications, without affecting production builds.

**Code Example**:
```jsx
import { useState, useDebugValue } from 'react';

function useToggle(initialValue) {
  const [value, setValue] = useState(initialValue);
  useDebugValue(value ? 'On' : 'Off');
  return [value, () => setValue(!value)];
}

function ToggleSwitch() {
  const [isOn, toggle] = useToggle(false);
  return <button onClick={toggle}>{isOn ? 'On' : 'Off'}</button>;
}

export default ToggleSwitch;
```

---

## 19. How do you implement a custom hook for throttling?

**Answer**: A throttle custom hook limits function execution to once per specified interval, useful for events like scrolling or resizing. Use `useRef` to track the last execution time and `useCallback` to memoize the throttled function.

**Code Example**:
```jsx
import { useCallback, useRef } from 'react';

function useThrottle(callback, delay) {
  const lastCall = useRef(0);

  return useCallback(
    (...args) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        callback(...args);
        lastCall.current = now;
      }
    },
    [callback, delay]
  );
}

function ScrollTracker() {
  const handleScroll = useThrottle(() => {
    console.log('Scrolled:', window.scrollY);
  }, 1000);

  return (
    <div style={{ height: '2000px' }} onScroll={handleScroll}>
      Scroll me
    </div>
  );
}

export default ScrollTracker;
```

---

## 20. What is the `useOutlet` hook in React Router?

**Answer**: The `useOutlet` hook (React Router v6) returns the element of the current nested route rendered by an `<Outlet>`. It’s used in advanced scenarios to programmatically access or manipulate child route content within a parent layout.

**Code Example**:
```jsx
import { Routes, Route, Outlet, useOutlet } from 'react-router-dom';

function Layout() {
  const outlet = useOutlet();
  return (
    <div>
      <h1>Layout</h1>
      {outlet || <p>No child route</p>}
    </div>
  );
}

function Child() {
  return <h2>Child Route</h2>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="child" element={<Child />} />
      </Route>
    </Routes>
  );
}

export default App;
```

---

## 21. How do you handle file uploads in React?

**Answer**: Handle file uploads using a controlled `<input type="file">`, storing the file in state or sending it to a server via `FormData`. Use `onChange` to capture the file and libraries like Axios for API requests. Validate file types or sizes as needed.

**Code Example**:
```jsx
import React, { useState } from 'react';

function FileUploader() {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await fetch('/api/upload', { method: 'POST', body: formData });
      console.log('File uploaded');
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default FileUploader;
```

---

## 22. What is the `useSyncExternalStore` hook’s use case?

**Answer**: The `useSyncExternalStore` hook (React 18+) synchronizes external store state (e.g., Redux, browser APIs) with React’s rendering, preventing tearing in concurrent rendering. It’s used for integrating non-React state systems or browser APIs like `localStorage`.

**Code Example**:
```jsx
import React, { useSyncExternalStore } from 'react';

function useLocalStorage(key, defaultValue) {
  const subscribe = (callback) => {
    window.addEventListener('storage', callback);
    return () => window.removeEventListener('storage', callback);
  };

  const getSnapshot = () => localStorage.getItem(key) || defaultValue;

  return useSyncExternalStore(subscribe, getSnapshot);
}

function ThemeDisplay() {
  const theme = useLocalStorage('theme', 'light');

  return <p>Current Theme: {theme}</p>;
}

export default ThemeDisplay;
```

---

## 23. How do you implement a drag-and-drop interface in React?

**Answer**: Implement drag-and-drop using the HTML5 Drag and Drop API or libraries like `react-dnd`. Use event handlers (`onDragStart`, `onDrop`) and state to track dragged items. For accessibility, add keyboard support and ARIA attributes.

**Code Example**:
```jsx
import React, { useState } from 'react';

function DragDrop() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDrop = (index) => {
    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setItems(newItems);
    setDraggedIndex(null);
  };

  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={index}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(index)}
          style={{ padding: '10px', border: '1px solid' }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default DragDrop;
```

---

## 24. What is the `useInsertionEffect` hook’s niche application?

**Answer**: The `useInsertionEffect` hook (React 18+) runs synchronously before DOM mutations, designed for CSS-in-JS libraries to inject styles before rendering. It’s rarely used in application code, as `useEffect` or `useLayoutEffect` handle most side effects.

**Code Example**:
```jsx
import React, { useInsertionEffect } from 'react';

function StyleInjector() {
  useInsertionEffect(() => {
    const style = document.createElement('style');
    style.textContent = `.custom { color: red; }`;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return <div className="custom">Red Text</div>;
}

export default StyleInjector;
```

---

## 25. How do you implement a custom hook for window events?

**Answer**: A custom hook for window events (e.g., resize, scroll) uses `useEffect` to add and remove event listeners, ensuring cleanup to prevent memory leaks. Use `useCallback` to memoize the handler if it’s used in dependencies.

**Code Example**:
```jsx
import { useEffect, useCallback } from 'react';

function useWindowEvent(event, callback) {
  const memoizedCallback = useCallback(callback, [callback]);

  useEffect(() => {
    window.addEventListener(event, memoizedCallback);
    return () => window.removeEventListener(event, memoizedCallback);
  }, [event, memoizedCallback]);
}

function ScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useWindowEvent('scroll', () => setScrollY(window.scrollY));

  return <p>Scroll Position: {scrollY}px</p>;
}

export default ScrollPosition;
```

---

## 26. What is the `useSearchParams` hook’s role in query management?

**Answer**: The `useSearchParams` hook (React Router v6) manages URL query parameters, returning a `URLSearchParams` object and a setter function. It’s used to read, update, or remove query strings dynamically, ideal for filters or search functionality.

**Code Example**:
```jsx
import { useSearchParams } from 'react-router-dom';

function FilterControls() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';

  const handleChange = (e) => {
    setSearchParams({ category: e.target.value });
  };

  return (
    <div>
      <input value={category} onChange={handleChange} placeholder="Category" />
      <p>Active Category: {category}</p>
    </div>
  );
}

export default FilterControls;
```

---

## 27. How do you handle internationalization (i18n) in React?

**Answer**: Implement i18n using libraries like `react-i18next`. Store translations in JSON files, initialize `i18next`, and use the `useTranslation` hook to access translated strings. Support language switching with state or context, and handle pluralization or interpolation as needed.

**Code Example**:
```jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

// translations/en.json: { "greeting": "Hello, {{name}}!" }
// translations/fr.json: { "greeting": "Bonjour, {{name}}!" }

function Greeting() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <p>{t('greeting', { name: 'Alice' })}</p>
      <button onClick={() => i18n.changeLanguage('fr')}>French</button>
      <button onClick={() => i18n.changeLanguage('en')}>English</button>
    </div>
  );
}

export default Greeting;
```

---

## 28. What is the `useParams` hook’s use in dynamic routing?

**Answer**: The `useParams` hook (React Router v6) extracts dynamic route parameters (e.g., `:id`) from the URL, returning an object with parameter values. It’s used to fetch or display data specific to the current route, like user profiles.

**Code Example**:
```jsx
import { useParams } from 'react-router-dom';

function Post() {
  const { postId } = useParams();

  return <h2>Post ID: {postId}</h2>;
}

export default Post;
// Route: <Route path="/post/:postId" element={<Post />} />
```

---

## 29. How do you implement a custom hook for media queries?

**Answer**: A media query custom hook uses `window.matchMedia` to track responsive breakpoints, updating state when the query matches. Use `useEffect` to manage listeners and ensure cleanup.

**Code Example**:
```jsx
import { useState, useEffect } from 'react';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return <p>{isMobile ? 'Mobile View' : 'Desktop View'}</p>;
}

export default ResponsiveComponent;
```

---

## 30. What is the `useLocation` hook’s practical application?

**Answer**: The `useLocation` hook (React Router v6) returns the current location object (`pathname`, `search`, `state`), useful for tracking navigation history, accessing query parameters, or retrieving state passed during navigation.

**Code Example**:
```jsx
import { useLocation } from 'react-router-dom';

function NavigationTracker() {
  const location = useLocation();

  return (
    <div>
      <p>Path: {location.pathname}</p>
      <p>Query: {location.search}</p>
      {location.state && <p>State: {location.state.message}</p>}
    </div>
  );
}

export default NavigationTracker;
```

---

## 31. How do you handle animations in React?

**Answer**: Handle animations using:
- **CSS Animations**: Apply classes with `transition` or `@keyframes`.
- **Libraries**: Use `react-spring` or `framer-motion` for complex animations.
- **State**: Toggle animation states with `useState`.
- **useEffect**: Synchronize animations with component lifecycle.
Ensure animations are performant and accessible (e.g., respect `prefers-reduced-motion`).

**Code Example**:
```jsx
import React, { useState } from 'react';

function FadeIn() {
  const [isVisible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(!isVisible)}>Toggle</button>
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s ease',
          height: '100px',
          background: 'lightblue'
        }}
      >
        {isVisible && 'Content'}
      </div>
    </div>
  );
}

export default FadeIn;
```

---

## 32. What is the `useNavigate` hook’s role in programmatic navigation?

**Answer**: The `useNavigate` hook (React Router v6) provides a function to navigate programmatically, replacing `useHistory`. It supports navigating to paths, passing state, replacing history entries, or moving relative to the current route (e.g., go back).

**Code Example**:
```jsx
import { useNavigate } from 'react-router-dom';

function Form() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/success', { state: { message: 'Form submitted' }, replace: true });
  };

  return <button onClick={handleSubmit}>Submit</button>;
}

export default Form;
```

---

## 33. How do you implement a custom hook for local storage?

**Answer**: A custom hook for local storage synchronizes state with `localStorage`, using `useState` for reactivity and `useEffect` to persist changes. Handle JSON parsing errors and provide a default value.

**Code Example**:
```jsx
import { useState, useEffect } from 'react';

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) || defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function Settings() {
  const [settings, setSettings] = useLocalStorage('settings', { theme: 'light' });

  return (
    <div>
      <p>Theme: {settings.theme}</p>
      <button onClick={() => setSettings({ theme: 'dark' })}>Set Dark</button>
    </div>
  );
}

export default Settings;
```

---

## 34. What is the `useRouteError` hook in React Router?

**Answer**: The `useRouteError` hook (React Router v6) retrieves errors thrown in a route’s loader, action, or component, used within an error boundary route to display error messages or fallback UI.

**Code Example**:
```jsx
import { Routes, Route, useRouteError } from 'react-router-dom';

function ErrorBoundary() {
  const error = useRouteError();
  return <p>Error: {error.message}</p>;
}

function FaultyComponent() {
  throw new Error('Something broke!');
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<FaultyComponent />} errorElement={<ErrorBoundary />} />
    </Routes>
  );
}

export default App;
```

---

## 35. How do you implement a custom hook for online/offline status?

**Answer**: A custom hook for online/offline status uses the `navigator.onLine` property and window events (`online`, `offline`) to track network status, updating state with `useState` and managing listeners with `useEffect`.

**Code Example**:
```jsx
import { useState, useEffect } from 'react';

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

function NetworkStatus() {
  const isOnline = useOnlineStatus();
  return <p>{isOnline ? 'Online' : 'Offline'}</p>;
}

export default NetworkStatus;
```

---

## 36. What is the `useLoaderData` hook in React Router?

**Answer**: The `useLoaderData` hook (React Router v6) accesses data fetched by a route’s `loader` function, enabling server-side or pre-render data fetching. It simplifies data loading for components, reducing manual API calls.

**Code Example**:
```jsx
import { Routes, Route, useLoaderData } from 'react-router-dom';

async function loader() {
  const response = await fetch('https://api.example.com/data');
  return await response.json();
}

function DataComponent() {
  const data = useLoaderData();
  return <p>Data: {data.name}</p>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<DataComponent />} loader={loader} />
    </Routes>
  );
}

export default App;
```

---

## 37. How do you implement a toast notification system in React?

**Answer**: Implement toasts using a context to manage notifications, state to store messages, and a portal to render toasts outside the component hierarchy. Use `useEffect` for auto-dismissal and CSS for animations.

**Code Example**:
```jsx
import React, { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';

const ToastContext = createContext(null);

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    const id = Date.now();
    setToasts([...toasts, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((toast) => toast.id !== id)), 3000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {createPortal(
        <div style={{ position: 'fixed', top: 10, right: 10 }}>
          {toasts.map((toast) => (
            <div key={toast.id} style={{ background: 'lightgreen', padding: '10px', margin: '5px' }}>
              {toast.message}
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

function ToastButton() {
  const { addToast } = useContext(ToastContext);
  return <button onClick={() => addToast('Success!')}>Show Toast</button>;
}

function App() {
  return (
    <ToastProvider>
      <ToastButton />
    </ToastProvider>
  );
}

export default App;
```

---

## 38. What is the `useActionData` hook in React Router?

**Answer**: The `useActionData` hook (React Router v6) retrieves data returned by a route’s `action` function, typically used for form submissions to handle server responses or validation errors.

**Code Example**:
```jsx
import { Routes, Route, useActionData, Form } from 'react-router-dom';

async function action({ request }) {
  const formData = await request.formData();
  return { message: formData.get('name') };
}

function FormComponent() {
  const data = useActionData();
  return (
    <div>
      <Form method="post">
        <input name="name" />
        <button type="submit">Submit</button>
      </Form>
      {data && <p>Response: {data.message}</p>}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<FormComponent />} action={action} />
    </Routes>
  );
}

export default App;
```

---

## 39. How do you implement a custom hook for geolocation?

**Answer**: A geolocation custom hook uses `navigator.geolocation` to fetch the user’s position, managing state for coordinates, loading, and errors. Use `useEffect` to handle the API and cleanup.

**Code Example**:
```jsx
import { useState, useEffect } from 'react';

function useGeolocation() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (pos) => setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => setError(err.message)
    );

    return () => navigator.geolocation.clearWatch(id);
  }, []);

  return { position, error };
}

function LocationDisplay() {
  const { position, error } = useGeolocation();

  if (error) return <p>Error: {error}</p>;
  if (!position) return <p>Loading...</p>;

  return <p>Lat: {position.lat}, Lng: {position.lng}</p>;
}

export default LocationDisplay;
```

---

## 40. What is the `useFormStatus` hook in React Router?

**Answer**: The `useFormStatus` hook (React Router v6) provides the status of a pending form submission within a `<Form>` component, including `pending`, `data`, and `method`. It’s used to show loading states during form actions.

**Code Example**:
```jsx
import { Form, useFormStatus } from 'react-router-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending}>{pending ? 'Submitting...' : 'Submit'}</button>;
}

function FormComponent() {
  return (
    <Form method="post">
      <input name="name" />
      <SubmitButton />
    </Form>
  );
}

export default FormComponent;
```

---

## 41. How do you implement a custom hook for clipboard access?

**Answer**: A clipboard custom hook uses the Clipboard API (`navigator.clipboard`) to copy text, managing state for success or error feedback. Use `useCallback` to memoize the copy function.

**Code Example**:
```jsx
import { useState, useCallback } from 'react';

function useClipboard() {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const copy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  return { copied, error, copy };
}

function CopyButton() {
  const { copied, error, copy } = useClipboard();

  return (
    <div>
      <button onClick={() => copy('Hello, world!')}>
        {copied ? 'Copied!' : 'Copy'}
      </button>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default CopyButton;
```

---

## 42. What is the `useSubmit` hook in React Router?

**Answer**: The `useSubmit` hook (React Router v6) programmatically submits a form to a route’s action, allowing custom form submission logic without a `<Form>` component. It’s used for dynamic or non-standard form submissions.

**Code Example**:
```jsx
import { useSubmit } from 'react-router-dom';

function CustomForm() {
  const submit = useSubmit();

  const handleSubmit = () => {
    submit({ name: 'Alice' }, { method: 'post', action: '/submit' });
  };

  return <button onClick={handleSubmit}>Submit</button>;
}

export default CustomForm;
```

---

## 43. How do you implement a custom hook for polling?

**Answer**: A polling custom hook repeatedly fetches data at an interval, using `useEffect` to manage the interval and cleanup. Include options to start/stop polling and handle errors.

**Code Example**:
```jsx
import { useState, useEffect } from 'react';

function usePolling(url, interval) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        setData(await res.json());
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
    const id = setInterval(fetchData, interval);
    return () => clearInterval(id);
  }, [url, interval]);

  return { data, error };
}

function PollingData() {
  const { data, error } = usePolling('https://api.example.com/status', 5000);

  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Loading...</p>;

  return <p>Status: {data.status}</p>;
}

export default PollingData;
```

---

## 44. What is the `useBeforeUnload` hook’s use case?

**Answer**: The `useBeforeUnload` hook adds a `beforeunload` event listener to warn users before leaving a page, useful for unsaved changes. Use `useEffect` to manage the listener and cleanup.

**Code Example**:
```jsx
import { useEffect } from 'react';

function useBeforeUnload(shouldWarn) {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (shouldWarn) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [shouldWarn]);
}

function UnsavedChanges() {
  const [text, setText] = useState('');
  useBeforeUnload(!!text);

  return <input value={text} onChange={(e) => setText(e.target.value)} />;
}

export default UnsavedChanges;
```

---

## 45. How do you implement a custom hook for keyboard shortcuts?

**Answer**: A keyboard shortcut custom hook listens for key combinations using `window.addEventListener('keydown')`, triggering callbacks when matches occur. Use `useEffect` for cleanup and `useCallback` for memoized handlers.

**Code Example**:
```jsx
import { useEffect, useCallback } from 'react';

function useKeyboardShortcut(keys, callback) {
  const memoizedCallback = useCallback(callback, [callback]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const pressedKeys = [];
      if (e.ctrlKey) pressedKeys.push('ctrl');
      if (e.altKey) pressedKeys.push('alt');
      pressedKeys.push(e.key.toLowerCase());

      if (keys.every((key) => pressedKeys.includes(key.toLowerCase()))) {
        e.preventDefault();
        memoizedCallback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keys, memoizedCallback]);
}

function ShortcutDemo() {
  useKeyboardShortcut(['ctrl', 's'], () => console.log('Saved!'));

  return <p>Press Ctrl + S</p>;
}

export default ShortcutDemo;
```

---

## 46. What is the `useRouteMatch` hook’s alternative in React Router v6?

**Answer**: In React Router v6, `useRouteMatch` is replaced by hooks like `useMatch`, which checks if the current URL matches a pattern, returning match details (e.g., params). It’s used for conditional logic based on route matches.

**Code Example**:
```jsx
import { useMatch } from 'react-router-dom';

function RouteChecker() {
  const match = useMatch('/user/:id');

  return match ? <p>User ID: {match.params.id}</p> : <p>No match</p>;
}

export default RouteChecker;
```

---

## 47. How do you implement a custom hook for mouse position?

**Answer**: A mouse position custom hook tracks cursor coordinates using a `mousemove` event listener, updating state with `useState`. Use `useEffect` for cleanup to prevent memory leaks.

**Code Example**:
```jsx
import { useState, useEffect } from 'react';

function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}

function MouseTracker() {
  const { x, y } = useMousePosition();
  return <p>Mouse: {x}, {y}</p>;
}

export default MouseTracker;
```

---

## 48. What is the `useNavigation` hook in React Router?

**Answer**: The `useNavigation` hook (React Router v6) provides navigation state (`idle`, `loading`, `submitting`) and details about pending navigations or form submissions. It’s used to show loading indicators during transitions.

**Code Example**:
```jsx
import { useNavigation } from 'react-router-dom';

function NavigationStatus() {
  const navigation = useNavigation();

  return (
    <div>
      {navigation.state === 'loading' && <p>Loading...</p>}
      <p>Navigation State: {navigation.state}</p>
    </div>
  );
}

export default NavigationStatus;
```

---

## 49. How do you implement a custom hook for interval-based tasks?

**Answer**: An interval custom hook runs a callback at a specified interval using `setInterval`, managing cleanup with `useEffect`. Allow dynamic interval changes and pause/resume functionality.

**Code Example**:
```jsx
import { useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function Clock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useInterval(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);

  return <p>Time: {time}</p>;
}

export default Clock;
```

---

## 50. How do you handle server-side rendering (SSR) with React?

**Answer**: Implement SSR using frameworks like Next.js or custom setups with `ReactDOMServer`. Render components to HTML on the server with `renderToString`, hydrate on the client with `hydrateRoot`, and manage data fetching with loaders or `getServerSideProps`. SSR improves SEO and initial load performance.

**Code Example**:
```jsx
// pages/index.js (Next.js)
import React from 'react';

export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data } };
}

function Home({ data }) {
  return <h1>Data: {data.name}</h1>;
}

export default Home;
```

---

This Markdown file provides a detailed, modern resource for React.js interview preparation, emphasizing functional components and hooks. Each question is answered thoroughly with practical examples to ensure a deep understanding of React concepts.
```