```markdown
# 50 Front-End Focused React and Next.js Interview Questions with Detailed Answers and Code Examples (2025, React 19, Next.js 15)

This document provides 50 front-end-specific interview questions for React (version 19) and Next.js (version 15, released October 2024), focusing on UI rendering, state management, performance optimization, and user experience. Designed for front-end developer interviews, these questions cover React hooks, React Server Components (RSCs), and Next.js’s App Router features like layouts, navigation, and client-side interactivity, avoiding backend concerns. Each question includes a detailed answer and a practical code example, ensuring comprehensive preparation for React and Next.js front-end roles.

---

## 1. What is the significance of the `key` prop in React lists, and how does it impact rendering?

**Answer**: The `key` prop uniquely identifies elements in a React list, enabling efficient DOM updates during reconciliation. It helps React track additions, removals, or changes, minimizing re-renders and preventing UI bugs like mismatched state. Use stable, unique keys (e.g., IDs) instead of indices, especially for dynamic lists, to ensure correct rendering.

**Code Example**:
```jsx
// components/TaskList.tsx
import React from 'react';

function TaskList({ tasks }: { tasks: { id: string; text: string }[] }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.text}</li>
      ))}
    </ul>
  );
}

export default TaskList;
```

---

## 2. How does React’s reconciliation process work in React 19?

**Answer**: Reconciliation in React 19 compares the Virtual DOM’s new render output with the previous one to determine minimal DOM updates. Triggered by state, prop, or context changes, it uses a diffing algorithm to optimize rendering. React 19 enhances this with improved concurrent rendering, supporting features like Suspense and transitions for smoother UI updates.

**Code Example**:
```jsx
// components/Counter.tsx
import { useState } from 'react';

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
// State change triggers reconciliation
```

---

## 3. What is the `useState` hook, and how do you handle complex state in React 19?

**Answer**: The `useState` hook manages state in functional components, returning a state variable and setter. For complex state (e.g., objects, arrays), use functional updates to avoid stale state and spread operators to preserve immutability. For intricate logic, consider `useReducer` instead.

**Code Example**:
```jsx
// components/Form.tsx
import { useState } from 'react';

function Form() {
  const [form, setForm] = useState({ name: '', age: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="age" type="number" value={form.age} onChange={handleChange} />
      <p>Name: {form.name}, Age: {form.age}</p>
    </div>
  );
}

export default Form;
```

---

## 4. How does the `useEffect` hook manage side effects in React 19?

**Answer**: The `useEffect` hook handles side effects (e.g., data fetching, subscriptions) in client components, running after render. It accepts a callback and dependency array, ensuring cleanup to prevent memory leaks. In React 19, it integrates with concurrent rendering, supporting Suspense for deferred effects.

**Code Example**:
```jsx
// components/Timer.tsx
import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return <p>Seconds: {seconds}</p>;
}

export default Timer;
```

---

## 5. What is the `useCallback` hook, and why is it used in React 19?

**Answer**: The `useCallback` hook memoizes a function, returning the same instance unless dependencies change. It prevents unnecessary re-creations of functions passed as props to memoized components or used in `useEffect`, optimizing performance by reducing re-renders.

**Code Example**:
```jsx
// components/Parent.tsx
import { useState, useCallback } from 'react';
import { memo } from 'react';

const Child = memo(({ onClick }: { onClick: () => void }) => {
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
```

---

## 6. How does `React.memo` prevent unnecessary re-renders in React 19?

**Answer**: `React.memo` memoizes a functional component, preventing re-renders if props remain unchanged (shallow comparison). It’s useful for optimizing pure components with static or infrequently changing props. Combine with `useCallback` or `useMemo` for stable prop references.

**Code Example**:
```jsx
// components/Display.tsx
import { memo } from 'react';

const Display = memo(({ value }: { value: string }) => {
  console.log('Display rendered');
  return <p>{value}</p>;
});

export default Display;

// components/App.tsx
import { useState } from 'react';
import Display from './Display';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Display value="Static" />
    </div>
  );
}

export default App;
```

---

## 7. What is the `useMemo` hook’s role in optimizing React 19 components?

**Answer**: The `useMemo` hook memoizes computed values, recalculating only when dependencies change. It optimizes performance by avoiding expensive calculations or stabilizing object references, preventing unnecessary re-renders in child components.

**Code Example**:
```jsx
// components/List.tsx
import { useState, useMemo } from 'react';

function List({ items }: { items: number[] }) {
  const [filter, setFilter] = useState('');

  const filteredItems = useMemo(() => {
    return items.filter((item) => item.toString().includes(filter));
  }, [items, filter]);

  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <ul>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default List;
```

---

## 8. How does the `useRef` hook work for DOM access in React 19?

**Answer**: The `useRef` hook creates a mutable `.current` property that persists across renders, commonly used to access DOM elements. It doesn’t trigger re-renders when updated, making it ideal for imperative interactions like focusing inputs or storing non-UI state.

**Code Example**:
```jsx
// components/Input.tsx
import { useRef } from 'react';

function Input() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </div>
  );
}

export default Input;
```

---

## 9. What is the `useContext` hook, and how do you optimize its usage?

**Answer**: The `useContext` hook accesses context values in functional components, enabling global state sharing. To optimize, split contexts to reduce re-renders, memoize context values with `useMemo`, and use `React.memo` for consuming components to avoid unnecessary updates.

**Code Example**:
```jsx
// contexts/ThemeContext.tsx
import { createContext, useContext, useMemo, useState } from 'react';

const ThemeContext = createContext(null);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');
  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Theme: {theme}
    </button>
  );
}

export { ThemeProvider, ThemedButton };
```

---

## 10. How does the `useTransition` hook improve UX in React 19?

**Answer**: The `useTransition` hook marks state updates as non-urgent, allowing React to prioritize critical updates (e.g., input typing) while deferring others (e.g., search results). It returns an `isPending` flag to show loading states, enhancing perceived performance.

**Code Example**:
```jsx
// components/Search.tsx
import { useState, useTransition } from 'react';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    startTransition(() => {
      setResults(new Array(1000).fill(e.target.value));
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <p>Searching...</p>}
      <ul>
        {results.slice(0, 5).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
```

---

## 11. What is the `useDeferredValue` hook, and when is it useful in React 19?

**Answer**: The `useDeferredValue` hook defers rendering of a value until high-priority updates complete, improving responsiveness for expensive UI updates (e.g., large lists). It’s simpler than `useTransition` for single-value deferral, ideal for search or filter UIs.

**Code Example**:
```jsx
// components/DeferredList.tsx
import { useState, useDeferredValue } from 'react';

function DeferredList() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const items = new Array(1000).fill(deferredQuery);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {items.slice(0, 5).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default DeferredList;
```

---

## 12. How do you implement a custom hook in React 19?

**Answer**: A custom hook encapsulates reusable logic, combining built-in hooks like `useState` or `useEffect`. It follows the `use` prefix convention, is reusable across components, and promotes DRY code. Ensure it’s pure and doesn’t render JSX.

**Code Example**:
```jsx
// hooks/useWindowSize.ts
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// components/Responsive.tsx
import useWindowSize from '../hooks/useWindowSize';

function Responsive() {
  const { width, height } = useWindowSize();
  return (
    <p>
      Window: {width}x{height}
    </p>
  );
}

export default Responsive;
```

---

## 13. What is the `useId` hook’s role in React 19 for accessibility?

**Answer**: The `useId` hook generates unique IDs for accessibility attributes (e.g., `aria-labelledby`, `htmlFor`), ensuring consistency across server and client rendering. It prevents hydration mismatches and improves screen reader compatibility.

**Code Example**:
```jsx
// components/Checkbox.tsx
import { useId } from 'react';

function Checkbox() {
  const id = useId();

  return (
    <div>
      <input type="checkbox" id={id} />
      <label htmlFor={id}>Agree</label>
    </div>
  );
}

export default Checkbox;
```

---

## 14. How do you handle forms in React 19 with controlled components?

**Answer**: Controlled components manage form inputs via state, binding `value` to state and updating via `onChange`. This ensures predictable behavior, validation, and dynamic UI updates. Use `useState` for simple forms or libraries like React Hook Form for complex ones.

**Code Example**:
```jsx
// components/LoginForm.tsx
import { useState } from 'react';

function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={form.email} onChange={handleChange} />
      <input name="password" type="password" value={form.password} onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
```

---

## 15. What is the `useOptimistic` hook in React 19, and how does it enhance UX?

**Answer**: The `useOptimistic` hook enables optimistic UI updates, rendering temporary state while awaiting asynchronous operations (e.g., form submissions). It provides instant feedback, reverting if the operation fails, improving perceived responsiveness.

**Code Example**:
```jsx
// components/CommentForm.tsx
import { useState, useOptimistic } from 'react';

function CommentForm() {
  const [comments, setComments] = useState<string[]>([]);
  const [optimisticComments, addOptimistic] = useOptimistic(comments);

  const handleSubmit = async (formData: FormData) => {
    const comment = formData.get('comment') as string;
    addOptimistic([...comments, comment]);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async
    setComments([...comments, comment]);
  };

  return (
    <form action={handleSubmit}>
      <input name="comment" />
      <button type="submit">Add</button>
      <ul>
        {optimisticComments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </form>
  );
}

export default CommentForm;
```

---

## 16. How do you implement lazy loading of images in React 19?

**Answer**: Lazy load images using the native `loading="lazy"` attribute or custom hooks with the Intersection Observer API. This defers offscreen image loading, reducing initial page load time and improving performance.

**Code Example**:
```jsx
// components/LazyImage.tsx
import { useState, useEffect, useRef } from 'react';

function LazyImage({ src, alt }: { src: string; alt: string }) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setImageSrc(src);
        observer.disconnect();
      }
    });
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [src]);

  return <img ref={imgRef} src={imageSrc || '/placeholder.png'} alt={alt} />;
}

export default LazyImage;
```

---

## 17. What is the `useImperativeHandle` hook’s use case in React 19?

**Answer**: The `useImperativeHandle` hook, used with `forwardRef`, customizes the ref object exposed to parent components. It’s used in reusable components to expose specific methods (e.g., focus, play) while hiding internal details, ensuring controlled imperative access.

**Code Example**:
```jsx
// components/CustomInput.tsx
import { useRef, useImperativeHandle, forwardRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus()
  }));

  return <input ref={inputRef} {...props} />;
});

function App() {
  const inputRef = useRef<{ focus: () => void }>(null);

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
    </div>
  );
}

export default App;
```

---

## 18. How do you handle animations in React 19?

**Answer**: Handle animations with CSS transitions, `@keyframes`, or libraries like `react-spring`. Use state to toggle animation classes, and respect `prefers-reduced-motion` for accessibility. React 19’s concurrent rendering ensures smooth animations during transitions.

**Code Example**:
```jsx
// components/FadeIn.tsx
import { useState } from 'react';

function FadeIn() {
  const [isVisible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(!isVisible)}>Toggle</button>
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s ease',
          height: '100px'
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

## 19. What is the `useDebugValue` hook’s role in React 19?

**Answer**: The `useDebugValue` hook labels custom hooks in React DevTools, displaying debug information about their state or values. It enhances debugging for reusable hooks, especially in complex applications, without impacting production builds.

**Code Example**:
```jsx
// hooks/useToggle.ts
import { useState, useDebugValue } from 'react';

function useToggle(initialValue: boolean) {
  const [value, setValue] = useState(initialValue);
  useDebugValue(value ? 'On' : 'Off');
  return [value, () => setValue(!value)] as const;
}

// components/Toggle.tsx
import useToggle from '../hooks/useToggle';

function Toggle() {
  const [isOn, toggle] = useToggle(false);
  return <button onClick={toggle}>{isOn ? 'On' : 'Off'}</button>;
}

export default Toggle;
```

---

## 20. How do you implement a drag-and-drop interface in React 19?

**Answer**: Implement drag-and-drop using the HTML5 Drag and Drop API or libraries like `react-dnd`. Use event handlers (`onDragStart`, `onDrop`) and state to manage dragged items. Add ARIA attributes for accessibility.

**Code Example**:
```jsx
// components/DragDrop.tsx
import { useState } from 'react';

function DragDrop() {
  const [items, setItems] = useState(['A', 'B', 'C']);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => setDraggedIndex(index);
  const handleDrop = (index: number) => {
    if (draggedIndex === null) return;
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

## 21. What is the App Router in Next.js 15, and how does it enhance front-end development?

**Answer**: The App Router in Next.js 15, using the `app/` directory, provides file-based routing with support for layouts, nested routes, and client-side navigation. It enhances front-end development with features like streaming, automatic code splitting, and integrated Suspense, simplifying complex UI hierarchies.

**Code Example**:
```jsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>Nav</nav>
        {children}
      </body>
    </html>
  );
}

// app/page.tsx
export default function Home() {
  return <h1>Home</h1>;
}
```

---

## 22. How do you create a layout in Next.js 15’s App Router?

**Answer**: Layouts in Next.js 15’s App Router are defined in `layout.tsx` files, wrapping child routes with shared UI (e.g., navbars). Nested layouts enable hierarchical UI structures, and the `children` prop renders child routes. Layouts persist during navigation, enhancing UX.

**Code Example**:
```jsx
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>Dashboard Header</header>
      {children}
    </div>
  );
}

// app/dashboard/page.tsx
export default function Dashboard() {
  return <h1>Dashboard</h1>;
}
```

---

## 23. What is the `Link` component in Next.js 15, and how does it optimize navigation?

**Answer**: The `Link` component from `next/link` enables client-side navigation in Next.js 15, prefetching pages for instant transitions. It reduces full page reloads, supports App Router routes, and optimizes performance with automatic code splitting.

**Code Example**:
```jsx
// app/nav.tsx
import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <Link href="/">Home</Link> | <Link href="/about">About</Link>
    </nav>
  );
}
```

---

## 24. How do you handle client-side navigation in Next.js 15?

**Answer**: Client-side navigation in Next.js 15 uses the `useRouter` hook from `next/navigation` in client components (`"use client"`). Methods like `push`, `replace`, and `back` enable programmatic navigation, integrating with the App Router for seamless transitions.

**Code Example**:
```jsx
// app/navigate.tsx
'use client';
import { useRouter } from 'next/navigation';

export default function Navigate() {
  const router = useRouter();

  return <button onClick={() => router.push('/about')}>Go to About</button>;
}
```

---

## 25. What is the `useSearchParams` hook in Next.js 15?

**Answer**: The `useSearchParams` hook from `next/navigation` accesses URL query parameters in client components. It returns a `URLSearchParams` object, ideal for dynamic UIs like search filters, enhancing front-end interactivity.

**Code Example**:
```jsx
// app/search.tsx
'use client';
import { useSearchParams } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return <p>Search: {query}</p>;
}
```

---

## 26. How do you optimize images in Next.js 15?

**Answer**: The `Image` component from `next/image` optimizes images by resizing, converting to WebP, and lazy-loading offscreen images. In Next.js 15, it supports blurred placeholders and priority loading, improving LCP and user experience.

**Code Example**:
```jsx
// app/page.tsx
import Image from 'next/image';

export default function Home() {
  return (
    <Image src="/hero.jpg" alt="Hero" width={800} height={400} priority />
  );
}
```

---

## 27. What is the `loading.tsx` file in Next.js 15, and how does it improve UX?

**Answer**: The `loading.tsx` file in the App Router defines an instant loading UI for a route segment, displayed during navigation or data fetching. It enhances UX by providing immediate feedback, integrating with Suspense for streaming.

**Code Example**:
```jsx
// app/loading.tsx
export default function Loading() {
  return <p>Loading...</p>;
}

// app/page.tsx
export default function Home() {
  return <h1>Home</h1>;
}
```

---

## 28. How do you create a custom 404 page in Next.js 15?

**Answer**: In Next.js 15’s App Router, create a `not-found.tsx` file in `app/` to define a custom 404 page. Use the `notFound()` function from `next/navigation` to trigger it programmatically, ensuring a consistent error UI.

**Code Example**:
```jsx
// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <Link href="/">Home</Link>
    </div>
  );
}
```

---

## 29. What is the `error.tsx` file in Next.js 15’s App Router?

**Answer**: The `error.tsx` file defines a custom error UI for a route segment, catching rendering or data-fetching errors. It uses client components (`"use client"`) with an `error` prop and `reset` function, improving error handling UX.

**Code Example**:
```jsx
// app/error.tsx
'use client';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1>Error</h1>
      <button onClick={reset}>Retry</button>
    </div>
  );
}
```

---

## 30. How do you use CSS in Next.js 15 for front-end styling?

**Answer**: Next.js 15 supports CSS Modules (`.module.css`), Tailwind CSS, global CSS (imported in `layout.tsx`), and CSS-in-JS (e.g., `styled-components`). CSS Modules provide scoped styles, ensuring maintainable and conflict-free styling.

**Code Example**:
```css
/* styles.module.css */
.container {
  padding: 20px;
}
```

```jsx
// app/page.tsx
import styles from './styles.module.css';

export default function Home() {
  return <div className={styles.container}>Styled Content</div>;
}
```

---

## 31. What is the `next/font` module in Next.js 15?

**Answer**: The `next/font` module optimizes font loading by self-hosting Google Fonts or custom fonts, reducing layout shifts (CLS). In Next.js 15, it supports variable fonts and applies styles globally or locally, enhancing front-end typography.

**Code Example**:
```jsx
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

---

## 32. How do you implement dynamic routes in Next.js 15?

**Answer**: Dynamic routes in Next.js 15’s App Router use `[param]` folders for single parameters or `[...param]` for catch-all routes. Parameters are accessed via the `params` prop in `page.tsx`, enabling dynamic UI rendering.

**Code Example**:
```jsx
// app/post/[id]/page.tsx
export default function PostPage({ params }: { params: { id: string } }) {
  return <h1>Post ID: {params.id}</h1>;
}
```

---

## 33. What is the `usePathname` hook in Next.js 15?

**Answer**: The `usePathname` hook from `next/navigation` returns the current URL pathname in client components. It’s used for conditional UI rendering or navigation logic, enhancing front-end interactivity.

**Code Example**:
```jsx
// app/nav.tsx
'use client';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  return <p>Current Path: {pathname}</p>;
}
```

---

## 34. How do you handle internationalization (i18n) in Next.js 15’s front-end?

**Answer**: Next.js 15 supports i18n with `next-intl` or `react-i18next` for front-end translations. Use client components to switch languages and display translated content, leveraging context or hooks for locale management.

**Code Example**:
```jsx
// app/[locale]/page.tsx
'use client';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');
  return <h1>{t('title')}</h1>;
}
// messages/en.json: { "Home": { "title": "Welcome" } }
```

---

## 35. What is the `useFormStatus` hook in Next.js 15?

**Answer**: The `useFormStatus` hook from `react-dom`, used in Next.js 15 client components, provides the status of a form submission (e.g., `pending`). It enhances UX by showing loading states during form interactions.

**Code Example**:
```jsx
// app/form.tsx
'use client';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending}>{pending ? 'Submitting...' : 'Submit'}</button>;
}

export default function Form() {
  const handleSubmit = async (formData: FormData) => {
    'use server';
    console.log(formData.get('name'));
  };

  return (
    <form action={handleSubmit}>
      <input name="name" />
      <SubmitButton />
    </form>
  );
}
```

---

## 36. How do you implement a custom loading skeleton in Next.js 15?

**Answer**: Create a loading skeleton using `loading.tsx` or `Suspense` with a skeleton UI component. Skeletons mimic content layout during loading, improving perceived performance and UX in Next.js 15.

**Code Example**:
```jsx
// components/Skeleton.tsx
export default function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    </div>
  );
}

// app/page.tsx
import { Suspense } from 'react';
import Skeleton from '../components/Skeleton';

export default function Home() {
  return (
    <Suspense fallback={<Skeleton />}>
      <h1>Home</h1>
    </Suspense>
  );
}
```

---

## 37. What is the `useActionState` hook in Next.js 15?

**Answer**: The `useActionState` hook from `react-dom` manages state for server actions in Next.js 15 client components. It returns the action’s state (e.g., success, error) and a dispatch function, simplifying form handling UX.

**Code Example**:
```jsx
// app/form.tsx
'use client';
import { useActionState } from 'react-dom';

async function submit(prevState: any, formData: FormData) {
  const name = formData.get('name');
  return name ? { success: true, name } : { error: 'Name required' };
}

export default function Form() {
  const [state, formAction] = useActionState(submit, null);

  return (
    <form action={formAction}>
      <input name="name" />
      <button type="submit">Submit</button>
      {state?.error && <p>{state.error}</p>}
      {state?.success && <p>Welcome, {state.name}!</p>}
    </form>
  );
}
```

---

## 38. How do you handle responsive design in React and Next.js?

**Answer**: Implement responsive design using CSS (media queries, Tailwind CSS) or custom hooks with `window.matchMedia`. In Next.js 15, apply styles via CSS Modules or global CSS, ensuring consistent UI across devices.

**Code Example**:
```jsx
// hooks/useMediaQuery.ts
import { useState, useEffect } from 'react';

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

// components/Responsive.tsx
import useMediaQuery from '../hooks/useMediaQuery';

function Responsive() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return <p>{isMobile ? 'Mobile' : 'Desktop'}</p>;
}

export default Responsive;
```

---

## 39. What is the `next/head` component in Next.js 15?

**Answer**: The `next/head` component manages `<head>` tags for metadata, titles, or scripts, enhancing front-end SEO and UX. In Next.js 15, it’s used in layouts or pages to dynamically update head content.

**Code Example**:
```jsx
// app/page.tsx
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>My App</title>
      </Head>
      <h1>Home</h1>
    </>
  );
}
```

---

## 40. How do you implement a toast notification system in React?

**Answer**: Create a toast system using context to manage notifications, state for messages, and a portal for rendering. Use `useEffect` for auto-dismissal and CSS for animations, ensuring a polished front-end UX.

**Code Example**:
```jsx
// contexts/ToastContext.tsx
import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';

const ToastContext = createContext<{ addToast: (msg: string) => void } | null>(null);

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  const addToast = (message: string) => {
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
  const { addToast } = useContext(ToastContext)!;
  return <button onClick={() => addToast('Success!')}>Show Toast</button>;
}

export { ToastProvider, ToastButton };
```

---

## 41. How do you implement a modal in React 19?

**Answer**: Create a modal using state to toggle visibility, a portal for rendering outside the DOM hierarchy, and CSS for styling. Ensure accessibility with ARIA attributes and keyboard navigation (e.g., Esc to close).

**Code Example**:
```jsx
// components/Modal.tsx
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center' }}>
      <div style={{ background: 'white', padding: '20px' }}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Modal Content</h2>
      </Modal>
    </div>
  );
}

export default App;
```

---

## 42. What is the `use` hook in React 19, and how is it used in Next.js 15?

**Answer**: The `use` hook in React 19 unwraps promises in client components, simplifying asynchronous data access. In Next.js 15, it’s used to access route parameters (wrapped in promises) in client components, enhancing front-end integration with server rendering.

**Code Example**:
```jsx
// app/post/[id]/page.tsx
'use client';
import { use } from 'react';

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <h1>Post ID: {id}</h1>;
}
```

---

## 43. How do you implement a custom hook for debouncing in React 19?

**Answer**: A debouncing custom hook delays function execution until a specified time elapses, useful for inputs like search. Use `useEffect` for cleanup and `useCallback` to memoize the debounced function.

**Code Example**:
```jsx
// hooks/useDebounce.ts
import { useEffect, useCallback } from 'react';

function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const memoizedCallback = useCallback(callback, [callback]);

  useEffect(() => {
    const handler = setTimeout(() => memoizedCallback(), delay);
    return () => clearTimeout(handler);
  }, [memoizedCallback, delay]);
}

// components/Search.tsx
import { useState } from 'react';
import useDebounce from '../hooks/useDebounce';

function Search() {
  const [query, setQuery] = useState('');

  useDebounce(() => console.log('Search:', query), 500);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}

export default Search;
```

---

## 44. How do you handle keyboard shortcuts in React 19?

**Answer**: Implement keyboard shortcuts using a custom hook with `window.addEventListener('keydown')`. Check key combinations and trigger callbacks, ensuring accessibility with clear feedback.

**Code Example**:
```jsx
// hooks/useKeyboardShortcut.ts
import { useEffect, useCallback } from 'react';

function useKeyboardShortcut(keys: string[], callback: () => void) {
  const memoizedCallback = useCallback(callback, [callback]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const pressed = [e.ctrlKey && 'ctrl', e.altKey && 'alt', e.key.toLowerCase()].filter(Boolean);
      if (keys.every((key) => pressed.includes(key.toLowerCase()))) {
        e.preventDefault();
        memoizedCallback();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keys, memoizedCallback]);
}

// components/Shortcut.tsx
import useKeyboardShortcut from '../hooks/useKeyboardShortcut';

function Shortcut() {
  useKeyboardShortcut(['ctrl', 's'], () => alert('Saved!'));
  return <p>Press Ctrl + S</p>;
}

export default Shortcut;
```

---

## 45. What is the `next/script` component in Next.js 15?

**Answer**: The `next/script` component optimizes third-party script loading with strategies like `afterInteractive` or `lazyOnload`. In Next.js 15, it improves front-end performance by controlling script execution, reducing CLS.

**Code Example**:
```jsx
// app/page.tsx
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Script src="https://example.com/script.js" strategy="lazyOnload" />
    </>
  );
}
```

---

## 46. How do you implement a custom hook for local storage in React 19?

**Answer**: A local storage custom hook synchronizes state with `localStorage`, using `useState` for reactivity and `useEffect` to persist changes. Handle JSON parsing errors for robust front-end state management.

**Code Example**:
```jsx
// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      return JSON.parse(localStorage.getItem(key)!) || defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// components/Settings.tsx
import useLocalStorage from '../hooks/useLocalStorage';

function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <div>
      <p>Theme: {theme}</p>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </div>
  );
}

export default Settings;
```

---

## 47. How do you implement a carousel in React 19?

**Answer**: Create a carousel using state to track the current slide, buttons for navigation, and CSS for transitions. Ensure accessibility with ARIA roles and keyboard support, enhancing front-end UX.

**Code Example**:
```jsx
// components/Carousel.tsx
import { useState } from 'react';

function Carousel({ slides }: { slides: string[] }) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  return (
    <div style={{ position: 'relative', overflow: 'hidden', width: '300px' }}>
      <div
        style={{
          display: 'flex',
          transform: `translateX(-${current * 100}%)`,
          transition: 'transform 0.5s'
        }}
      >
        {slides.map((slide, i) => (
          <div key={i} style={{ minWidth: '100%', textAlign: 'center' }}>
            {slide}
          </div>
        ))}
      </div>
      <button onClick={prev} style={{ position: 'absolute', left: 0, top: '50%' }}>
        Prev
      </button>
      <button onClick={next} style={{ position: 'absolute', right: 0, top: '50%' }}>
        Next
      </button>
    </div>
  );
}

export default Carousel;
```

---

## 48. What is the `useLayoutEffect` hook’s specific use case in React 19?

**Answer**: The `useLayoutEffect` hook runs synchronously before painting, ideal for DOM measurements or mutations (e.g., positioning tooltips) to avoid visual glitches. Use it sparingly, as `useEffect` is sufficient for most side effects.

**Code Example**:
```jsx
// components/Tooltip.tsx
import { useLayoutEffect, useRef } from 'react';

function Tooltip() {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (tooltipRef.current) {
      const { width } = tooltipRef.current.getBoundingClientRect();
      tooltipRef.current.style.transform = `translateX(-${width / 2}px)`;
    }
  }, []);

  return <div ref={tooltipRef} style={{ position: 'absolute' }}>Tooltip</div>;
}

export default Tooltip;
```

---

## 49. How do you implement a custom hook for clipboard access in React 19?

**Answer**: A clipboard custom hook uses the Clipboard API to copy text, managing state for feedback. Use `useCallback` to memoize the copy function, ensuring a seamless front-end experience.

**Code Example**:
```jsx
// hooks/useClipboard.ts
import { useState, useCallback } from 'react';

function useClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return { copied, copy };
}

// components/CopyButton.tsx
import useClipboard from '../hooks/useClipboard';

function CopyButton() {
  const { copied, copy } = useClipboard();

  return (
    <button onClick={() => copy('Hello')}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export default CopyButton;
```

---

## 50. How do you ensure accessibility in React and Next.js applications?

**Answer**: Ensure accessibility by:
- Using semantic HTML (e.g., `<nav>`, `<main>`).
- Adding ARIA attributes (e.g., `aria-label`).
- Supporting keyboard navigation (e.g., `tabIndex`).
- Providing alt text for images (`next/image`).
- Testing with tools like Lighthouse or axe.
In Next.js 15, use `useId` for unique IDs and `next/head` for meta tags to enhance screen reader compatibility.

**Code Example**:
```jsx
// app/page.tsx
import Image from 'next/image';
import { useId } from 'react';

export default function Home() {
  const id = useId();

  return (
    <main>
      <h1 id={id}>Welcome</h1>
      <Image src="/hero.jpg" alt="Hero image" width={800} height={400} />
      <button aria-labelledby={id}>Action</button>
    </main>
  );
}
```

---

This Markdown file provides a front-end-focused resource for React 19 and Next.js 15 interview preparation, emphasizing UI development, performance, and accessibility. Each question is answered with practical examples, ensuring a deep understanding of front-end concepts for developer roles.
```