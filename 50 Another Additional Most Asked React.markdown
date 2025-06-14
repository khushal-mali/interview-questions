# 50 Additional Most Asked React.js Interview Questions with Detailed Answers and Code Examples (Vanilla React)

This document provides a fresh set of 50 commonly asked React.js interview questions, focusing on functional components and hooks in vanilla React.js, avoiding class components and Next.js-specific features. These questions range from beginner to advanced levels, designed for front-end developer interviews, complementing previous sets for comprehensive preparation. Examples use client-side rendering and libraries like `react-router-dom` for routing.

---

## 1. What is the significance of the `children` prop in React components?

**Answer**: The `children` prop allows components to accept and render nested content (elements, strings, or other components) passed between their opening and closing tags. It enables component composition, making components flexible and reusable. You can access `children` directly in props or manipulate it (e.g., map over it for lists). Special cases include rendering `children` conditionally or passing additional props using `React.Children` utilities.

**Code Example**:
```jsx
import React from 'react';

function Card({ children }) {
  return (
    <div style={{ border: '1px solid', padding: '10px' }}>
      {children}
    </div>
  );
}

function App() {
  return (
    <Card>
      <h2>Title</h2>
      <p>Content</p>
    </Card>
  );
}

export default App;
```

---

## 2. How do you optimize a React component that renders a large list?

**Answer**: Optimize large lists using:
- **Virtualization**: Libraries like `react-window` or `react-virtualized` render only visible items.
- **Memoization**: Use `React.memo` to prevent child re-renders.
- **Keys**: Assign unique, stable keys to list items.
- **Lazy Loading**: Load data incrementally with pagination or infinite scroll.
- **Avoid Heavy Computations**: Use `useMemo` for expensive calculations.
Virtualization is key for thousands of items, reducing DOM nodes and improving performance.

**Code Example**:
```jsx
import React, { useState, memo } from 'react';
import { FixedSizeList } from 'react-window';

const Row = memo(({ index, style }) => (
  <div style={style}>Item {index}</div>
));

function LargeList() {
  return (
    <FixedSizeList
      height={400}
      width={300}
      itemCount={1000}
      itemSize={35}
    >
      {Row}
    </FixedSizeList>
  );
}

export default LargeList;
```

---

## 3. What is the role of `React.createElement`, and why is JSX preferred?

**Answer**: `React.createElement(type, props, ...children)` creates a React element, describing what to render (e.g., a DOM node or component). It’s the core function React uses to build the Virtual DOM. JSX is preferred because it provides a declarative, HTML-like syntax that’s more readable and concise than nested `createElement` calls. JSX is transpiled to `React.createElement` by Babel, combining the benefits of both.

**Code Example**:
```jsx
import React from 'react';

// JSX
const element = <div className="box">Hello</div>;

// Equivalent createElement
const elementRaw = React.createElement('div', { className: 'box' }, 'Hello');

function App() {
  return element;
}

export default App;
```

---

## 4. How do you handle multiple state updates in a single event handler?

**Answer**: Multiple state updates in a single handler can lead to stale state if not handled correctly. Use functional updates with `setState` to ensure updates are based on the latest state. For related state, consider consolidating into a single object with `useState` or using `useReducer` for complex logic to manage updates atomically.

**Code Example**:
```jsx
import React, { useState } from 'react';

function Counter() {
  const [state, setState] = useState({ count: 0, step: 1 });

  const handleClick = () => {
    setState((prev) => ({
      ...prev,
      count: prev.count + prev.step,
      step: prev.step + 1
    }));
  };

  return (
    <div>
      <p>Count: {state.count}, Step: {state.step}</p>
      <button onClick={handleClick}>Update</button>
    </div>
  );
}

export default Counter;
```

---

## 5. What is the purpose of the `defaultProps` in functional components?

**Answer**: `defaultProps` defines default values for props in functional components, ensuring props have fallback values if undefined. While `defaultProps` is a legacy approach (set via `Component.defaultProps`), modern React favors default parameters in the function signature for simplicity and clarity. Both achieve the same goal, but default parameters are more idiomatic in functional components.

**Code Example**:
```jsx
import React from 'react';

function Button({ text = 'Click me', color = 'blue' }) {
  return <button style={{ backgroundColor: color }}>{text}</button>;
}

// Legacy defaultProps
Button.defaultProps = {
  text: 'Click me',
  color: 'blue'
};

export default Button;
```

---

## 6. How do you implement a custom hook for toggling state?

**Answer**: A custom toggle hook encapsulates boolean state logic, providing a value and a toggle function. It uses `useState` to manage the boolean and `useCallback` to memoize the toggle function, making it reusable across components for UI elements like modals or accordions.

**Code Example**:
```jsx
import { useState, useCallback } from 'react';

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((prev) => !prev), []);
  return [value, toggle];
}

function Accordion() {
  const [isOpen, toggleOpen] = useToggle();

  return (
    <div>
      <button onClick={toggleOpen}>{isOpen ? 'Hide' : 'Show'}</button>
      {isOpen && <p>Content</p>}
    </div>
  );
}

export default Accordion;
```

---

## 7. What is the difference between shallow and deep comparison in React memoization?

**Answer**: React’s memoization (`React.memo`, `useMemo`, `useCallback`) uses shallow comparison to check if values or props are unchanged, comparing references or primitive values directly. Deep comparison checks nested object properties recursively but isn’t used by React natively due to performance overhead. Shallow comparison can cause issues with object props unless stabilized with `useMemo` or libraries like `lodash.isEqual` for custom deep checks.

**Code Example**:
```jsx
import React, { memo, useMemo } from 'react';

const Child = memo(({ data }) => {
  console.log('Child rendered');
  return <p>{data.value}</p>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const data = useMemo(() => ({ value: 'Stable' }), []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child data={data} />
    </div>
  );
}

export default Parent;
// Child doesn’t re-render due to stable data reference
```

---

## 8. How do you handle keyboard events in React for accessibility?

**Answer**: Handle keyboard events using `onKeyDown` or `onKeyPress`, checking `event.key` or `event.code` to trigger actions (e.g., Enter, Space). Ensure components are focusable (`tabIndex`) and use ARIA attributes for screen readers. For accessibility, support common patterns like activating buttons with Enter/Space or navigating menus with arrows.

**Code Example**:
```jsx
import React from 'react';

function AccessibleButton() {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      console.log('Button activated');
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => console.log('Button clicked')}
      onKeyDown={handleKeyDown}
      style={{ padding: '10px', border: '1px solid' }}
    >
      Activate
    </div>
  );
}

export default AccessibleButton;
```

---

## 9. What is the `useEffect` dependency array, and how does it affect execution?

**Answer**: The `useEffect` dependency array controls when the effect runs. If empty (`[]`), the effect runs once on mount and cleans up on unmount. If populated (`[dep1, dep2]`), the effect re-runs when listed dependencies change. Omitting the array causes the effect to run after every render. Incorrect dependencies can lead to stale data or infinite loops, so include all referenced values.

**Code Example**:
```jsx
import React, { useState, useEffect } from 'react';

function DataFetcher({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://api.example.com/data/${id}`)
      .then((res) => res.json())
      .then(setData);
  }, [id]); // Re-runs when id changes

  return <p>{data ? data.name : 'Loading...'}</p>;
}

export default DataFetcher;
```

---

## 10. How do you implement a custom hook for form validation?

**Answer**: A form validation hook manages input state, errors, and validation rules, returning values, errors, and handlers. Use `useState` for form state and errors, and validate inputs on change or submission. Provide flexibility for custom validation rules.

**Code Example**:
```jsx
import { useState } from 'react';

function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validate[name]?.(value) });
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    const newErrors = Object.keys(values).reduce((acc, key) => ({
      ...acc,
      [key]: validate[key]?.(values[key])
    }), {});
    setErrors(newErrors);
    if (Object.values(newErrors).every((err) => !err)) callback(values);
  };

  return { values, errors, handleChange, handleSubmit };
}

function LoginForm() {
  const validate = {
    email: (value) => (!value.includes('@') ? 'Invalid email' : ''),
    password: (value) => (value.length < 6 ? 'Password too short' : '')
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    validate
  );

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email}</p>}
      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
      />
      {errors.password && <p>{errors.password}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
```

---

## 11. What is the `React.memo` higher-order component, and when should you avoid it?

**Answer**: `React.memo` memoizes a functional component, preventing re-renders if props are shallowly equal. It’s ideal for components with expensive renders or frequent parent re-renders. Avoid using it when:
- Props change frequently, negating memoization benefits.
- The component is simple (render cost is low).
- Memoization overhead (shallow comparison) outweighs render savings.

**Code Example**:
```jsx
import React, { memo } from 'react';

const Item = memo(({ text }) => {
  console.log('Item rendered');
  return <li>{text}</li>;
});

function List() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Item text="Static" />
    </div>
  );
}

export default List;
// Item doesn’t re-render on count change
```

---

## 12. How do you implement a custom hook for managing timers?

**Answer**: A timer hook uses `setInterval` or `setTimeout` to execute periodic or delayed tasks, with `useEffect` for cleanup. Provide controls to start, stop, or reset the timer, using `useRef` to persist mutable state across renders.

**Code Example**:
```jsx
import { useState, useEffect, useRef } from 'react';

function useTimer(initialSeconds) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef();

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setSeconds(initialSeconds);
    setIsRunning(false);
  };

  return { seconds, isRunning, start, stop, reset };
}

function Countdown() {
  const { seconds, isRunning, start, stop, reset } = useTimer(10);

  return (
    <div>
      <p>Time: {seconds}s</p>
      <button onClick={start} disabled={isRunning}>Start</button>
      <button onClick={stop} disabled={!isRunning}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Countdown;
```

---

## 13. What is the `useContext` hook’s limitation with frequent updates?

**Answer**: `useContext` causes a component to re-render whenever the context value changes, which can be problematic with frequent updates or large context objects. To mitigate:
- Split contexts into smaller, focused ones.
- Use `useMemo` to stabilize the context value.
- Wrap consumers with `React.memo` to skip unnecessary re-renders.
- Consider state management libraries like Redux for complex global state.

**Code Example**:
```jsx
import React, { createContext, useContext, useState, useMemo } from 'react';

const CounterContext = createContext(null);

function CounterProvider({ children }) {
  const [count, setCount] = useState(0);
  const value = useMemo(() => ({ count, setCount }), [count]);

  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  );
}

function CounterDisplay() {
  const { count } = useContext(CounterContext);
  console.log('Display rendered');
  return <p>Count: {count}</p>;
}

function App() {
  return (
    <CounterProvider>
      <CounterDisplay />
    </CounterProvider>
  );
}

export default App;
// Memoized value reduces re-renders
```

---

## 14. How do you implement a custom hook for handling scroll position?

**Answer**: A scroll position hook tracks the window or element’s scroll coordinates using a `scroll` event listener, updating state with `useState`. Use `useEffect` for cleanup and `useCallback` for memoized handlers to optimize performance.

**Code Example**:
```jsx
import { useState, useEffect, useCallback } from 'react';

function useScrollPosition() {
  const [scroll, setScroll] = useState({ x: 0, y: 0 });

  const handleScroll = useCallback(() => {
    setScroll({ x: window.scrollX, y: window.scrollY });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return scroll;
}

function ScrollIndicator() {
  const { y } = useScrollPosition();

  return (
    <div style={{ height: '2000px' }}>
      <p>Scroll Y: {y}px</p>
    </div>
  );
}

export default ScrollIndicator;
```

---

## 15. What is the `useReducer` hook’s advantage over multiple `useState` calls?

**Answer**: `useReducer` centralizes complex state logic in a reducer function, making state transitions predictable and easier to test. It’s advantageous over multiple `useState` calls when:
- State properties are interdependent (e.g., form with validation).
- Updates involve complex logic (e.g., state machines).
- You need to dispatch actions for clarity.
It reduces boilerplate and errors compared to juggling multiple setters.

**Code Example**:
```jsx
import React, { useReducer } from 'react';

const initialState = { name: '', email: '', errors: {} };

function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: action.value ? '' : 'Required'
        }
      };
    default:
      return state;
  }
}

function Form() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({
      type: 'update',
      field: e.target.name,
      value: e.target.value
    });
  };

  return (
    <div>
      <input
        name="name"
        value={state.name}
        onChange={handleChange}
        placeholder="Name"
      />
      {state.errors.name && <p>{state.errors.name}</p>}
      <input
        name="email"
        value={state.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {state.errors.email && <p>{state.errors.email}</p>}
    </div>
  );
}

export default Form;
```

---

## 16. How do you implement a custom hook for managing focus?

**Answer**: A focus management hook uses `useRef` to reference a DOM element and `useEffect` to focus it programmatically, with options for conditional focus (e.g., on mount, on state change). It’s useful for accessibility, like focusing inputs on modal open.

**Code Example**:
```jsx
import { useRef, useEffect } from 'react';

function useFocus(shouldFocus) {
  const ref = useRef(null);

  useEffect(() => {
    if (shouldFocus && ref.current) {
      ref.current.focus();
    }
  }, [shouldFocus]);

  return ref;
}

function AutoFocusInput() {
  const [isActive, setActive] = useState(false);
  const inputRef = useFocus(isActive);

  return (
    <div>
      <button onClick={() => setActive(true)}>Focus Input</button>
      <input ref={inputRef} placeholder="Type here" />
    </div>
  );
}

export default AutoFocusInput;
```

---

## 17. What is the `useCallback` hook’s impact on child component renders?

**Answer**: `useCallback` memoizes a function, preventing new instances on each render, which is critical when passing functions as props to memoized child components (`React.memo`). Without `useCallback`, a new function reference triggers child re-renders, even if other props are unchanged. Ensure dependencies are correctly listed to avoid stale closures.

**Code Example**:
```jsx
import React, { useState, useCallback, memo } from 'react';

const Child = memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => console.log('Clicked'), []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </div>
  );
}

export default Parent;
// Child doesn’t re-render on count change
```

---

## 18. How do you implement a custom hook for managing viewport size?

**Answer**: A viewport size hook tracks window dimensions using a `resize` event listener, updating state with `useState`. Use `useEffect` for cleanup and `useCallback` for the handler to optimize performance.

**Code Example**:
```jsx
import { useState, useEffect, useCallback } from 'react';

function useViewportSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const handleResize = useCallback(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return size;
}

function ViewportDisplay() {
  const { width, height } = useViewportSize();

  return <p>Viewport: {width}x{height}</p>;
}

export default ViewportDisplay;
```

---

## 19. What is the `useMemo` hook’s role in optimizing expensive computations?

**Answer**: `useMemo` memoizes a computed value, recalculating only when dependencies change, preventing expensive operations on every render. It’s ideal for heavy calculations (e.g., sorting, filtering) or stabilizing object references for memoized components. Overuse can add overhead, so apply it judiciously.

**Code Example**:
```jsx
import React, { useState, useMemo } from 'react';

function SortedList({ items }) {
  const [filter, setFilter] = useState('');

  const sortedItems = useMemo(() => {
    console.log('Sorting items');
    return [...items]
      .filter((item) => item.includes(filter))
      .sort();
  }, [items, filter]);

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter"
      />
      <ul>
        {sortedItems.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default SortedList;
// items = ['banana', 'apple', 'cherry']
```

---

## 20. How do you implement a custom hook for managing query parameters with React Router?

**Answer**: A query parameter hook uses `useSearchParams` from `react-router-dom` to read and update URL query strings, providing a clean API for filters or search. It simplifies managing query state without manual URL parsing.

**Code Example**:
```jsx
import { useSearchParams } from 'react-router-dom';

function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = (key) => searchParams.get(key) || '';
  const setParam = (key, value) => {
    setSearchParams({ ...Object.fromEntries(searchParams), [key]: value });
  };

  return { getParam, setParam };
}

function SearchFilter() {
  const { getParam, setParam } = useQueryParams();
  const query = getParam('q');

  return (
    <input
      value={query}
      onChange={(e) => setParam('q', e.target.value)}
      placeholder="Search"
    />
  );
}

export default SearchFilter;
```

---

## 21. What is the `useTransition` hook’s effect on UI responsiveness?

**Answer**: The `useTransition` hook (React 18+) marks state updates as low-priority, allowing React to prioritize urgent updates (e.g., input typing) while deferring others (e.g., list filtering). It returns `startTransition` to wrap deferred updates and `isPending` to show loading states, enhancing UI responsiveness during heavy computations.

**Code Example**:
```jsx
import React, { useState, useTransition } from 'react';

function FilterableList() {
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
      <ul>
        {items.slice(0, 5).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default FilterableList;
```

---

## 22. How do you implement a custom hook for managing hover state?

**Answer**: A hover hook tracks whether an element is hovered using `mouseenter` and `mouseleave` events, updating state with `useState`. Use `useEffect` to attach listeners and `useRef` to reference the element.

**Code Example**:
```jsx
import { useState, useEffect, useRef } from 'react';

function useHover() {
  const [isHovered, setHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const enter = () => setHovered(true);
    const leave = () => setHovered(false);

    element.addEventListener('mouseenter', enter);
    element.addEventListener('mouseleave', leave);
    return () => {
      element.removeEventListener('mouseenter', enter);
      element.removeEventListener('mouseleave', leave);
    };
  }, []);

  return [ref, isHovered];
}

function HoverBox() {
  const [boxRef, isHovered] = useHover();

  return (
    <div
      ref={boxRef}
      style={{
        width: '100px',
        height: '100px',
        background: isHovered ? 'lightblue' : 'lightgray'
      }}
    >
      {isHovered ? 'Hovered' : 'Hover me'}
    </div>
  );
}

export default HoverBox;
```

---

## 23. What is the `useDeferredValue` hook’s use case in search inputs?

**Answer**: The `useDeferredValue` hook (React 18+) defers rendering of a value until urgent updates complete, ideal for search inputs where filtering large datasets can lag the UI. It keeps the input responsive while deferring the filtered results render.

**Code Example**:
```jsx
import React, { useState, useDeferredValue, useMemo } from 'react';

function SearchInput() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    return new Array(1000).fill(deferredQuery);
  }, [deferredQuery]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
      />
      <ul>
        {results.slice(0, 5).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchInput;
```

---

## 24. How do you implement a custom hook for managing undo/redo functionality?

**Answer**: An undo/redo hook maintains a history stack with `useState`, tracking past and future states. Provide methods to update state, undo, and redo, using array operations to manage the stacks. It’s useful for text editors or forms.

**Code Example**:
```jsx
import { useState } from 'react';

function useUndoRedo(initialState) {
  const [state, setState] = useState({
    current: initialState,
    past: [],
    future: []
  });

  const set = (newState) => {
    setState((prev) => ({
      current: newState,
      past: [...prev.past, prev.current],
      future: []
    }));
  };

  const undo = () => {
    setState((prev) => {
      if (prev.past.length === 0) return prev;
      const [last, ...rest] = prev.past;
      return {
        current: last,
        past: rest,
        future: [prev.current, ...prev.future]
      };
    });
  };

  const redo = () => {
    setState((prev) => {
      if (prev.future.length === 0) return prev;
      const [next, ...rest] = prev.future;
      return {
        current: next,
        past: [...prev.past, prev.current],
        future: rest
      };
    });
  };

  return [state.current, set, { undo, redo }];
}

function TextEditor() {
  const [text, setText, { undo, redo }] = useUndoRedo('');

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
    </div>
  );
}

export default TextEditor;
```

---

## 25. What is the `useId` hook’s advantage over manual ID generation?

**Answer**: The `useId` hook (React 18+) generates unique IDs for accessibility attributes (e.g., `aria-labelledby`), ensuring consistency across client and server rendering to prevent hydration mismatches. Manual ID generation risks collisions or SSR inconsistencies, while `useId` is React-aware and deterministic.

**Code Example**:
```jsx
import React, { useId } from 'react';

function RadioGroup() {
  const id = useId();

  return (
    <div>
      <input type="radio" id={`${id}-1`} name={id} />
      <label htmlFor={`${id}-1`}>Option 1</label>
      <input type="radio" id={`${id}-2`} name={id} />
      <label htmlFor={`${id}-2`}>Option 2</label>
    </div>
  );
}

export default RadioGroup;
```

---

## 26. How do you implement a custom hook for managing modal state?

**Answer**: A modal hook manages visibility and provides open/close functions, using `useState` for state and `useCallback` for handlers. It can include focus management or escape key handling for accessibility.

**Code Example**:
```jsx
import { useState, useCallback, useEffect } from 'react';

function useModal() {
  const [isOpen, setOpen] = useState(false);

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') close();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, close]);

  return { isOpen, open, close };
}

function ModalComponent() {
  const { isOpen, open, close } = useModal();

  return (
    <div>
      <button onClick={open}>Open Modal</button>
      {isOpen && (
        <div style={{ background: 'rgba(0,0,0,0.5)', position: 'fixed', inset: 0 }}>
          <div style={{ background: 'white', padding: '20px', margin: '50px auto', width: '200px' }}>
            <p>Modal Content</p>
            <button onClick={close}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalComponent;
```

---

## 27. What is the `useImperativeHandle` hook’s role in controlled components?

**Answer**: `useImperativeHandle`, used with `forwardRef`, customizes the ref object exposed to parents, allowing controlled access to a component’s methods or DOM nodes. It’s used in reusable components (e.g., custom inputs) to expose specific functionality while encapsulating internals.

**Code Example**:
```jsx
import React, { useRef, useImperativeHandle, forwardRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    clear: () => {
      inputRef.current.value = '';
    }
  }));

  return <input ref={inputRef} {...props} />;
});

function Form() {
  const inputRef = useRef();

  return (
    <div>
      <CustomInput />
      <button onClick={() => inputRef.current.clear()}>Clear</button>
    </div>
  );
}

export default Form;
```

---

## 28. How do you handle file inputs in React with multiple files?

**Answer**: Manage multiple file inputs with a controlled `<input type="file" multiple>`, storing files in an array state. Use `onChange` to update the state with `e.target.files`, and process files (e.g., preview, upload) as needed. Validate file types or sizes for user feedback.

**Code Example**:
```jsx
import React, { useState } from 'react';

function FileUploader() {
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    console.log('Uploading:', files);
    // Example: fetch('/api/upload', { method: 'POST', body: formData });
  };

  return (
    <div>
      <input type="file" multiple onChange={handleChange} />
      <button onClick={handleUpload} disabled={files.length === 0}>
        Upload
      </button>
      <ul>
        {files.map((file, i) => (
          <li key={i}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FileUploader;
```

---

## 29. What is the `useLayoutEffect` hook’s synchronization with rendering?

**Answer**: `useLayoutEffect` runs synchronously **after** DOM mutations but **before** the browser paints, ensuring DOM measurements or updates occur before rendering. It’s used for tasks like calculating element sizes or fixing layout issues, unlike `useEffect`, which runs asynchronously after painting.

**Code Example**:
```jsx
import React, { useRef, useLayoutEffect } from 'react';

function AutoWidth() {
  const ref = useRef();
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, []);

  return (
    <div ref={ref} style={{ border: '1px solid' }}>
      <p>Width: {width}px</p>
    </div>
  );
}

export default AutoWidth;
```

---

## 30. How do you implement a custom hook for managing theme switching?

**Answer**: A theme switching hook manages theme state (e.g., light/dark) with `useState`, persists it to `localStorage`, and applies styles via `useEffect`. It can integrate with system preferences (`prefers-color-scheme`) for accessibility.

**Code Example**:
```jsx
import { useState, useEffect } from 'react';

function useTheme(defaultTheme = 'light') {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || defaultTheme;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return [theme, toggleTheme];
}

function ThemeSwitcher() {
  const [theme, toggleTheme] = useTheme();

  return (
    <div>
      <p>Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

export default ThemeSwitcher;

// CSS
[data-theme='light'] { background: white; color: black; }
[data-theme='dark'] { background: black; color: white; }
```

---

## 31. What is the `useNavigate` hook’s use in form submissions?

**Answer**: The `useNavigate` hook from `react-router-dom` enables programmatic navigation, redirecting users after form submissions (e.g., to a success page). It supports passing state or replacing history entries, making it ideal for dynamic workflows.

**Code Example**:
```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard', { state: { email }, replace: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
```

---

## 32. How do you implement a custom hook for managing cookies?

**Answer**: A cookie hook manages browser cookies, providing methods to get, set, and delete cookies. Use `document.cookie` for operations and parse cookies into an object for easy access.

**Code Example**:
```jsx
import { useState, useCallback } from 'react';

function useCookie(name, defaultValue) {
  const getCookie = () => {
    const value = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`))
      ?.split('=')[1];
    return value || defaultValue;
  };

  const [value, setValue] = useState(getCookie);

  const updateCookie = useCallback((newValue, days = 7) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${newValue}; expires=${expires}; path=/`;
    setValue(newValue);
  }, [name]);

  const deleteCookie = useCallback(() => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    setValue(defaultValue);
  }, [name, defaultValue]);

  return [value, updateCookie, deleteCookie];
}

function CookieManager() {
  const [theme, setTheme, deleteTheme] = useCookie('theme', 'light');

  return (
    <div>
      <p>Theme Cookie: {theme}</p>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={deleteTheme}>Delete Cookie</button>
    </div>
  );
}

export default CookieManager;
```

---

## 33. What is the `useLocation` hook’s role in tracking navigation?

**Answer**: The `useLocation` hook from `react-router-dom` returns the current location object (`pathname`, `search`, `state`), enabling components to react to URL changes or access navigation state. It’s used for analytics, conditional rendering, or retrieving passed data.

**Code Example**:
```jsx
import { useLocation } from 'react-router-dom';

function PageTracker() {
  const location = useLocation();

  return (
    <div>
      <p>Path: {location.pathname}</p>
      {location.state && <p>Message: {location.state.message}</p>}
    </div>
  );
}

export default PageTracker;
```

---

## 34. How do you implement a custom hook for managing drag events?

**Answer**: A drag hook tracks drag state (e.g., dragging, position) using `dragstart`, `drag`, and `dragend` events, with `useState` for state and `useRef` for the element. It’s useful for custom drag-and-drop interfaces.

**Code Example**:
```jsx
import { useState, useRef, useEffect } from 'react';

function useDrag() {
  const [isDragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;
    const start = () => setDragging(true);
    const end = () => setDragging(false);
    const drag = (e) => {
      if (isDragging && e.clientX && e.clientY) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    };

    element.addEventListener('dragstart', start);
    element.addEventListener('dragend', end);
    element.addEventListener('drag', drag);
    return () => {
      element.removeEventListener('dragstart', start);
      element.removeEventListener('dragend', end);
      element.removeEventListener('drag', drag);
    };
  }, [isDragging]);

  return [ref, isDragging, position];
}

function Draggable() {
  const [dragRef, isDragging, position] = useDrag();

  return (
    <div
      ref={dragRef}
      draggable
      style={{
        width: '50px',
        height: '50px',
        background: isDragging ? 'lightgreen' : 'lightblue',
        position: 'absolute',
        left: position.x,
        top: position.y
      }}
    />
  );
}

export default Draggable;
```

---

## 35. What is the `useSyncExternalStore` hook’s integration with external stores?

**Answer**: The `useSyncExternalStore` hook (React 18+) synchronizes external store state (e.g., Redux, Zustand) with React’s rendering, preventing tearing in concurrent rendering. It requires a `subscribe` function to listen for changes and a `getSnapshot` function to read the current state.

**Code Example**:
```jsx
import { useSyncExternalStore } from 'react';

const store = {
  state: { count: 0 },
  listeners: new Set(),
  setState(newState) {
    this.state = newState;
    this.listeners.forEach((listener) => listener());
  },
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },
  getSnapshot() {
    return this.state;
  }
};

function useStore() {
  return useSyncExternalStore(store.subscribe.bind(store), store.getSnapshot.bind(store));
}

function Counter() {
  const { count } = useStore();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => store.setState({ count: count + 1 })}>
        Increment
      </button>
    </div>
  );
}

export default Counter;
```

---

## 36. How do you implement a custom hook for managing tab focus?

**Answer**: A tab focus hook restricts focus to elements within a container (e.g., modal) using `focus` and `keydown` (Tab key) events, improving accessibility. Use `useRef` to track the container and `useEffect` to manage focus.

**Code Example**:
```jsx
import { useRef, useEffect } from 'react';

function useTrapFocus() {
  const ref = useRef();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      const focusable = ref.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const element = ref.current;
    element.addEventListener('keydown', handleKeyDown);
    element.querySelector('button, input')?.focus();
    return () => element.removeEventListener('keydown', handleKeyDown);
  }, []);

  return ref;
}

function Modal() {
  const modalRef = useTrapFocus();

  return (
    <div ref={modalRef} style={{ background: 'white', padding: '20px' }}>
      <input placeholder="Input 1" />
      <input placeholder="Input 2" />
      <button>Close</button>
    </div>
  );
}

export default Modal;
```

---

## 37. What is the `useDebugValue` hook’s enhancement for custom hooks?

**Answer**: The `useDebugValue` hook labels custom hooks in React DevTools, displaying custom information about their state or values. It improves debugging in complex applications by providing context without affecting production builds.

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

## 38. How do you implement a custom hook for managing clipboard reading?

**Answer**: A clipboard reading hook uses `navigator.clipboard.readText()` to access clipboard content, with `useState` for the value and `useCallback` for the read function. Handle permissions and errors for robustness.

**Code Example**:
```jsx
import { useState, useCallback } from 'react';

function useClipboardRead() {
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  const read = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  return { text, error, read };
}

function ClipboardReader() {
  const { text, error, read } = useClipboardRead();

  return (
    <div>
      <button onClick={read}>Read Clipboard</button>
      {text && <p>Clipboard: {text}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default ClipboardReader;
```

---

## 39. What is the `useParams` hook’s use in dynamic routing?

**Answer**: The `useParams` hook from `react-router-dom` extracts dynamic route parameters (e.g., `:id`) from the URL, returning an object with parameter values. It’s used to fetch or display route-specific data, like user details.

**Code Example**:
```jsx
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();

  return <h2>User ID: {userId}</h2>;
}

export default UserProfile;
// Route: <Route path="/user/:userId" element={<UserProfile />} />
```

---

## 40. How do you implement a custom hook for managing session storage?

**Answer**: A session storage hook synchronizes state with `sessionStorage`, using `useState` for reactivity and `useEffect` to persist changes. Handle JSON parsing errors and provide a default value.

**Code Example**:
```jsx
import { useState, useEffect } from 'react';

function useSessionStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem(key)) || defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function SessionData() {
  const [data, setData] = useSessionStorage('data', { name: '' });

  return (
    <div>
      <input
        value={data.name}
        onChange={(e) => setData({ name: e.target.value })}
        placeholder="Name"
      />
      <p>Name: {data.name}</p>
    </div>
  );
}

export default SessionData;
```

---

## 41. What is the `useOutletContext` hook’s role in nested routes?

**Answer**: The `useOutletContext` hook from `react-router-dom` accesses context provided by a parent route’s `<Outlet>`, enabling data sharing with nested routes without prop drilling. It’s used for layouts passing shared data to children.

**Code Example**:
```jsx
import { Routes, Route, Outlet, useOutletContext } from 'react-router-dom';

function Layout() {
  const data = { theme: 'dark' };
  return (
    <div>
      <h1>Layout</h1>
      <Outlet context={data} />
    </div>
  );
}

function Child() {
  const { theme } = useOutletContext();
  return <p>Theme: {theme}</p>;
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

## 42. How do you implement a custom hook for managing visibility state?

**Answer**: A visibility hook uses the Intersection Observer API to detect when an element is visible in the viewport, updating state with `useState`. It’s useful for lazy loading or triggering animations.

**Code Example**:
```jsx
import { useState, useEffect, useRef } from 'react';

function useVisibility(options = {}) {
  const [isVisible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      options
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible];
}

function VisibleComponent() {
  const [ref, isVisible] = useVisibility({ threshold: 0.5 });

  return (
    <div ref={ref} style={{ height: '100px', background: isVisible ? 'lightgreen' : 'lightgray' }}>
      {isVisible ? 'Visible' : 'Hidden'}
    </div>
  );
}

export default VisibleComponent;
```

---

## 43. What is the `useInsertionEffect` hook’s specific use case?

**Answer**: The `useInsertionEffect` hook (React 18+) runs synchronously before DOM mutations, designed for CSS-in-JS libraries to inject styles before rendering. It’s rarely used in application code, as `useEffect` or `useLayoutEffect` cover most needs.

**Code Example**:
```jsx
import React, { useInsertionEffect } from 'react';

function StyleInjector() {
  useInsertionEffect(() => {
    const style = document.createElement('style');
    style.textContent = `.highlight { color: blue; }`;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return <div className="highlight">Styled Text</div>;
}

export default StyleInjector;
```

---

## 44. How do you implement a custom hook for managing audio playback?

**Answer**: An audio playback hook controls an `HTMLAudioElement` with `useRef`, managing playback state with `useState`. Provide methods to play, pause, and seek, with `useEffect` for cleanup.

**Code Example**:
```jsx
import { useState, useRef, useEffect } from 'react';

function useAudio(src) {
  const audioRef = useRef(new Audio(src));
  const [isPlaying, setPlaying] = useState(false);

  const play = () => {
    audioRef.current.play();
    setPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlaying(false);
  };

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, []);

  return { isPlaying, play, pause };
}

function AudioPlayer() {
  const { isPlaying, play, pause } = useAudio('audio.mp3');

  return (
    <div>
      <button onClick={isPlaying ? pause : play}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}

export default AudioPlayer;
```

---

## 45. What is the `useRouteMatch` hook’s replacement in React Router v6?

**Answer**: In React Router v6, `useRouteMatch` is replaced by `useMatch`, which checks if the current URL matches a pattern, returning match details (e.g., params). It’s used for conditional rendering or logic based on routes.

**Code Example**:
```jsx
import { useMatch } from 'react-router-dom';

function MatchChecker() {
  const match = useMatch('/post/:id');

  return match ? <p>Post ID: {match.params.id}</p> : <p>No match</p>;
}

export default MatchChecker;
```

---

## 46. How do you implement a custom hook for managing resize observers?

**Answer**: A resize observer hook tracks an element’s size changes using the ResizeObserver API, updating state with `useState`. Use `useRef` for the element and `useEffect` for cleanup.

**Code Example**:
```jsx
import { useState, useEffect, useRef } from 'react';

function useResizeObserver() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const ref = useRef();

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height
      });
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, size];
}

function ResizableBox() {
  const [boxRef, { width, height }] = useResizeObserver();

  return (
    <div ref={boxRef} style={{ border: '1px solid', resize: 'both', overflow: 'auto' }}>
      <p>Size: {width}x{height}</p>
    </div>
  );
}

export default ResizableBox;
```

---

## 47. What is the `useBeforeUnload` hook’s role in preventing navigation?

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

function UnsavedForm() {
  const [text, setText] = useState('');
  useBeforeUnload(!!text);

  return <input value={text} onChange={(e) => setText(e.target.value)} />;
}

export default UnsavedForm;
```

---

## 48. How do you implement a custom hook for managing WebSocket connections?

**Answer**: A WebSocket hook manages a WebSocket connection with `useRef` to persist the socket, `useState` for messages, and `useEffect` for setup and cleanup. Provide methods to send messages and handle events.

**Code Example**:
```jsx
import { useState, useEffect, useRef } from 'react';

function useWebSocket(url) {
  const wsRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    wsRef.current = new WebSocket(url);

    wsRef.current.onmessage = (e) => {
      setMessages((prev) => [...prev, e.data]);
    };

    wsRef.current.onclose = () => {
      wsRef.current = null;
    };

    return () => wsRef.current?.close();
  }, [url]);

  const send = (message) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    }
  };

  return { messages, send };
}

function Chat() {
  const { messages, send } = useWebSocket('ws://example.com');
  const [input, setInput] = useState('');

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Message"
      />
      <button onClick={() => send(input)}>Send</button>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default Chat;
```

---

## 49. What is the `useFormStatus` hook’s use in React Router forms?

**Answer**: The `useFormStatus` hook from `react-router-dom` provides the status of a pending form submission within a `<Form>` component, including `pending`, `data`, and `method`. It’s used to disable buttons or show loaders during submissions.

**Code Example**:
```jsx
import { Form, useFormStatus } from 'react-router-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? 'Submitting...' : 'Submit'}</button>;
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

## 50. How do you implement a custom hook for managing geolocation updates?

**Answer**: A geolocation hook uses `navigator.geolocation.watchPosition` to track position updates, with `useState` for coordinates and errors, and `useEffect` for cleanup. It’s useful for real-time location-based apps.

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

function LocationTracker() {
  const { position, error } = useGeolocation();

  if (error) return <p>Error: {error}</p>;
  if (!position) return <p>Loading...</p>;

  return <p>Lat: {position.lat}, Lng: {position.lng}</p>;
}

export default LocationTracker;
```

---

This Markdown file provides a detailed resource for React.js interview preparation, focusing on vanilla React with functional components and hooks. Each question is answered thoroughly with practical examples, avoiding Next.js-specific features for broad applicability.
```
