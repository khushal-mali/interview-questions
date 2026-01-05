# 50 Most Asked Situational React Questions

This Markdown file compiles 50 frequently asked situational (scenario-based) React questions, often encountered in interviews or real-world development. Each question describes a practical scenario, followed by a detailed explanation, best practices, and code examples. These focus on problem-solving with React's core concepts like state, hooks, performance, forms, and more. Code is in JSX/JS for clarity.

## 1. You're building a search bar that filters a large list of items in real-time. How do you prevent performance issues during typing?

In this scenario, rapid keystrokes cause frequent re-renders, slowing the app. Use debouncing to delay the filter execution until the user stops typing (e.g., 300ms). This optimizes by limiting API calls or computations. Implement with `useMemo` for the filtered list and a custom hook for debounce.

```jsx
import { useState, useMemo, useCallback } from "react";

function SearchList({ items }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      ),
    [items, debouncedQuery]
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

This ensures smooth UX by avoiding excessive re-renders.

## 2. A parent component re-renders frequently, causing expensive child computations to run every time. How do you optimize?

Child re-renders are unnecessary if props haven't changed. Wrap the child in `React.memo` to shallow-compare props, and memoize expensive functions with `useCallback`. For computed values, use `useMemo`.

```jsx
import React, { memo, useMemo, useCallback } from "react";

const ExpensiveChild = memo(({ data, onProcess }) => {
  const processed = useMemo(() => data.map((item) => item * 2), [data]); // Memoize computation
  return <div>{processed.join(", ")}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const data = [1, 2, 3, 4]; // Static for demo
  const handleProcess = useCallback((val) => console.log(val), []); // Memoize callback

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveChild data={data} onProcess={handleProcess} />
    </div>
  );
}
```

This prevents child re-renders unless `data` or `onProcess` changes.

## 3. You're handling user authentication; the token expires mid-session. How do you manage this gracefully?

Detect token expiry via API response (e.g., 401 status) and redirect to login. Use an Axios interceptor for global handling, and store auth state in Context. Clear state on expiry to avoid stale data.

```jsx
import axios from "axios";
import { createContext, useContext } from "react";

// Interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const res = await axios.post("/api/login", credentials);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  return <AuthContext.Provider value={{ user, login }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
```

This ensures seamless logout and prevents unauthorized requests.

## 4. In a multi-step form wizard, how do you persist form data if the user navigates away and returns?

Use localStorage or sessionStorage to save progress per step. On mount, load from storage and merge with current state. This handles browser refreshes or accidental navigation.

```jsx
import { useState, useEffect } from "react";

function StepForm() {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("formData") || "{}");
    setFormData(saved);
    setCurrentStep(saved.currentStep || 1);
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify({ ...formData, currentStep }));
  }, [formData, currentStep]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <input
        value={formData.name || ""}
        onChange={(e) => updateField("name", e.target.value)}
      />
      <button onClick={() => setCurrentStep((s) => s + 1)}>Next</button>
    </div>
  );
}
```

Data persists across sessions, improving UX.

## 5. Your app has a modal that needs to focus on an input field when opened. How do you achieve this?

Use `useRef` to reference the input, and `useEffect` to call `focus()` on open. Ensure accessibility by trapping focus within the modal.

```jsx
import { useRef, useEffect } from "react";

function Modal({ isOpen, onClose }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <input ref={inputRef} placeholder="Enter text" />
      <button onClick={onClose}>Close</button>
    </div>
  );
}
```

This follows WCAG guidelines for keyboard navigation.

## 6. You're integrating a third-party script (e.g., analytics) that should load only after user consent. How do you handle it?

Use dynamic import or script injection in `useEffect` after consent state changes. Clean up on unmount to avoid memory leaks.

```jsx
import { useEffect, useState } from "react";

function Analytics() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    if (consent) {
      const script = document.createElement("script");
      script.src = "https://example.com/analytics.js";
      document.head.appendChild(script);
      return () => document.head.removeChild(script);
    }
  }, [consent]);

  return <button onClick={() => setConsent(true)}>Accept Cookies</button>;
}
```

This complies with GDPR by loading lazily.

## 7. A list item needs to animate on mount (e.g., slide in). How do you trigger CSS animations?

Use `useEffect` to add a class after render, leveraging FLIP technique for smooth animations. Or integrate Framer Motion for declarative animations.

```jsx
import { useEffect, useRef } from "react";
import "./SlideIn.css"; // @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }

function AnimatedListItem({ item }) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.classList.add("slide-in");
  }, []);

  return (
    <li ref={ref} className="list-item">
      {item}
    </li>
  );
}
```

Animations run post-render, avoiding layout thrashing.

## 8. Users report infinite re-renders in a counter with async increment. How do you debug and fix?

Infinite loops often stem from state updates in render or effect deps. Use React DevTools Profiler to trace, then fix by adding proper deps to `useEffect` and memoizing callbacks.

```jsx
import { useState, useEffect, useCallback } from "react";

function AsyncCounter() {
  const [count, setCount] = useState(0);

  const incrementAsync = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCount((c) => c + 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(incrementAsync, 2000);
    return () => clearInterval(timer);
  }, [incrementAsync]); // Memoized, no loop

  return <div>Count: {count}</div>;
}
```

Profiler highlights the issue; deps prevent loops.

## 9. You're building a chat app; messages load via WebSocket. How do you update UI without losing scroll position?

Use `useRef` for the scroll container, and in `useEffect` after new messages, check if at bottom and scroll if so. Append messages immutably.

```jsx
import { useState, useRef, useEffect } from "react";

function Chat() {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://example.com");
    ws.onmessage = (e) => {
      setMessages((prev) => [...prev, JSON.parse(e.data)]);
    };
    return () => ws.close();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="chat-container">
      {messages.map((m) => (
        <p key={m.id}>{m.text}</p>
      ))}
    </div>
  );
}
```

Maintains auto-scroll for new messages.

## 10. A component fetches data on mount but needs to refetch on tab visibility change. How?

Use the Visibility API with `useEffect`. Listen for `visibilitychange` event and trigger refetch if visible.

```jsx
import { useState, useEffect } from "react";

function DataFetcher() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await fetch("/api/data");
    setData(await res.json());
  };

  useEffect(() => {
    fetchData();
    const handleVisibility = () => {
      if (document.visibilityState === "visible") fetchData();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}
```

Optimizes for background tabs, saving resources.

## 11. In a dashboard with multiple charts, how do you lazy-load them to improve initial load time?

Use `React.lazy` and `Suspense` for code-splitting. Load charts only when their tab/section is visible.

```jsx
import React, { Suspense, lazy } from "react";
const Chart = lazy(() => import("./ChartComponent"));

function Dashboard() {
  const [activeTab, setActiveTab] = useState("chart1");

  return (
    <div>
      <button onClick={() => setActiveTab("chart1")}>Chart 1</button>
      <Suspense fallback={<div>Loading...</div>}>
        {activeTab === "chart1" && <Chart />}
      </Suspense>
    </div>
  );
}
```

Reduces bundle size, faster first paint.

## 12. A form has conditional fields (e.g., address if "ship to different"). How do you manage dynamic validation?

Use a schema library like Yup with Formik for conditional rules. Update validation schema based on state.

```jsx
import { useFormik } from "formik";
import * as Yup from "yup";

function ShippingForm() {
  const isDifferent = false; // From state

  const schema = Yup.object({
    name: Yup.string().required(),
    ...(isDifferent && { address: Yup.string().required() }),
  });

  const formik = useFormik({
    initialValues: { name: "", address: "" },
    validationSchema: schema,
    onSubmit: (values) => console.log(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input name="name" onChange={formik.handleChange} value={formik.values.name} />
      {isDifferent && (
        <input
          name="address"
          onChange={formik.handleChange}
          value={formik.values.address}
        />
      )}
      <button type="submit">Submit</button>
    </form>
  );
}
```

Handles dynamic fields cleanly.

## 13. Your app crashes on unhandled errors in a deep child component. How do you catch and display a fallback?

Implement Error Boundaries to wrap sections. Log errors and show user-friendly messages.

```jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>
          Something went wrong.{" "}
          <button onClick={() => this.setState({ hasError: false })}>Retry</button>
        </h1>
      );
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <DeepChild />
</ErrorBoundary>;
```

Prevents full app crash.

## 14. You're syncing form state with URL params for bookmarkable searches. How?

Use `useSearchParams` from React Router. Update params on change, and initialize state from params.

```jsx
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setSearchParams({ q: query });
  }, [query, setSearchParams]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

Enables sharing via URL.

## 15. A component uses heavy computations on prop changes, but props rarely change deeply. How to optimize?

Use `useMemo` for computations, and `React.memo` with custom equality for deep props comparison (e.g., via lodash isEqual).

```jsx
import { memo, useMemo } from "react";
import isEqual from "lodash/isEqual";

const OptimizedComp = memo(({ complexProp }) => {
  const result = useMemo(() => {
    // Heavy computation
    return complexProp.reduce((acc, val) => acc + val, 0);
  }, [complexProp]);

  return <div>{result}</div>;
}, isEqual); // Custom comparator
```

Avoids recomputes on shallow mismatches.

## 16. In a real-time collaborative editor, how do you handle concurrent updates without conflicts?

Use Operational Transformation (OT) or Conflict-free Replicated Data Types (CRDTs) libraries like Yjs. For simple cases, timestamp and resolve on receive.

```jsx
// Pseudo with simple timestamp
function Editor() {
  const [text, setText] = useState("");

  const handleUpdate = useCallback((newText, timestamp) => {
    setText((prev) => {
      if (timestamp > lastUpdateTime) return newText; // Basic resolution
      return prev;
    });
  }, []);

  // WebSocket listener calls handleUpdate
}
```

Libraries like Yjs handle complex merges.

## 17. Users on slow networks see blank screens during data fetch. How do you add loading skeletons?

Use state for loading, and render skeleton UI (e.g., via react-loading-skeleton) during fetch.

```jsx
import Skeleton from "react-loading-skeleton";

function DataList() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Skeleton count={5} height={30} />;

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

Improves perceived performance.

## 18. A tabbed interface re-initializes state on tab switch. How to preserve state per tab?

Use a key-based state object or Context with tab ID. Or lift state to parent with tab-specific keys.

```jsx
function TabbedView() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [states, setStates] = useState({ tab1: { count: 0 }, tab2: { count: 0 } });

  const updateState = (tab, updates) => {
    setStates((prev) => ({ ...prev, [tab]: { ...prev[tab], ...updates } }));
  };

  const Tab1 = () => (
    <button onClick={() => updateState("tab1", { count: states.tab1.count + 1 })}>
      Count: {states.tab1.count}
    </button>
  );

  return (
    <div>
      <button onClick={() => setActiveTab("tab1")}>Tab1</button>
      {activeTab === "tab1" && <Tab1 />}
    </div>
  );
}
```

State survives switches.

## 19. You're adding offline support; cache API responses. How with Service Workers or libraries?

Use Workbox for PWA caching. Or `swr`/`react-query` with persistence plugins for data caching.

```jsx
// Simple with localStorage fallback
function OfflineData() {
  const [data, setData] = useState(() =>
    JSON.parse(localStorage.getItem("data") || "[]")
  );

  useEffect(() => {
    if (navigator.onLine) {
      fetch("/api/data")
        .then((res) => res.json())
        .then((d) => {
          setData(d);
          localStorage.setItem("data", JSON.stringify(d));
        });
    }
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}
```

Ensures availability offline.

## 20. A drag-and-drop list reorders items, but state updates cause flickers. How to fix?

Use `useState` with immutable updates and `key` props. For smooth, use HTML5 Drag API with temporary UI state.

```jsx
import { useState } from "react";

function DraggableList({ items }) {
  const [list, setList] = useState(items);

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    const newList = Array.from(list);
    const [moved] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, moved);
    setList(newList);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {list.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.name}
                  </li>
                )}
              </Draggable>
            ))}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
```

Uses react-beautiful-dnd for flicker-free reordering.

## 21. Component A passes a large object as prop to B; B re-renders unnecessarily. Solution?

Memoize the object with `useMemo` in A, and use `React.memo` on B. For frequent passes, consider Context.

```jsx
import { useMemo, memo } from "react";

const Child = memo(({ largeObj }) => <div>{largeObj.value}</div>);

function Parent() {
  const largeObj = useMemo(() => ({ value: "heavy data", ...lotsMore }), []);
  return <Child largeObj={largeObj} />;
}
```

Prevents prop recreation.

## 22. Infinite scroll loads more items, but scrolls jump on append. How to maintain position?

Measure container height before append, then adjust scroll after. Use `useLayoutEffect` for sync.

```jsx
import { useRef, useEffect, useLayoutEffect } from "react";

function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const ref = useRef(null);

  const loadMore = () => {
    const prevHeight = ref.current.scrollHeight;
    setItems((prev) => [...prev, ...newItems]);
    useLayoutEffect(() => {
      ref.current.scrollTop += ref.current.scrollHeight - prevHeight;
    });
  };

  return (
    <div ref={ref}>
      {items.map((item) => (
        <div key={item.id}>{item}</div>
      ))}
    </div>
  );
}
```

Smooth append without jumps.

## 23. A custom hook fetches user data; how do you make it reusable across components?

Design the hook with parameters (e.g., userId), handle loading/error states, and return them.

```jsx
function useUser(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/user/${userId}`)
      .then((res) => res.json())
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  return { user, loading, error };
}

// Usage
function Profile({ userId }) {
  const { user, loading } = useUser(userId);
  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}
```

Encapsulates logic reusably.

## 24. App theme switches between light/dark; how to persist and apply globally?

Use Context for theme state, localStorage for persistence, and CSS variables for styling.

```jsx
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, toggle: () => setTheme((t) => (t === "light" ? "dark" : "light")) }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
```

Global, persistent theming.

## 25. Handling file uploads with progress bar; show upload percentage.

Use XMLHttpRequest or Axios with `onUploadProgress`. Update state with progress event.

```jsx
import axios from "axios";
import { useState } from "react";

function FileUpload() {
  const [progress, setProgress] = useState(0);

  const upload = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    axios.post("/api/upload", formData, {
      onUploadProgress: (e) => setProgress(Math.round((e.loaded * 100) / e.total)),
    });
  };

  return (
    <div>
      <input type="file" onChange={(e) => upload(e.target.files[0])} />
      <progress value={progress} max="100" />
    </div>
  );
}
```

Real-time feedback.

## 26. Component unmounts during async operation; how to prevent state updates or leaks?

Use AbortController in fetch, and check mounted flag in callbacks.

```jsx
import { useState, useEffect } from "react";

function AsyncComp() {
  const [data, setData] = useState(null);
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    fetch("/api/data", { signal: controller.signal })
      .then((res) => res.json())
      .then((d) => {
        if (mounted) setData(d);
      })
      .catch((e) => {
        if (e.name !== "AbortError" && mounted) console.error(e);
      });

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  return <div>{data ? data.name : "Loading"}</div>;
}
```

Prevents errors on unmount.

## 27. Building a virtualized list for 10k+ items; how to render efficiently?

Use `react-window` or `react-virtualized` to render only visible rows, with fixed row heights.

```jsx
import { FixedSizeList } from "react-window";

function VirtualList({ items }) {
  const Row = ({ index, style }) => <div style={style}>{items[index].name}</div>;

  return (
    <FixedSizeList height={500} itemCount={items.length} itemSize={35}>
      {Row}
    </FixedSizeList>
  );
}
```

Handles large datasets smoothly.

## 28. A button debounces clicks to prevent spam. How to implement?

Use `useCallback` with a timeout ref to ignore rapid clicks.

```jsx
import { useRef, useCallback } from "react";

function DebouncedButton({ onClick }) {
  const timeoutRef = useRef(null);

  const handleClick = useCallback(() => {
    if (timeoutRef.current) return;
    onClick();
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
    }, 1000);
  }, [onClick]);

  return <button onClick={handleClick}>Click</button>;
}
```

Anti-spam protection.

## 29. Managing global notifications (toasts) across the app. How?

Use Context with a queue state, and a portal for rendering outside root.

```jsx
const NotificationContext = createContext();

function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const add = (msg) => setNotifications((prev) => [...prev, { id: Date.now(), msg }]);
  const remove = (id) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <NotificationContext.Provider value={{ add }}>
      {children}
      {notifications.map((n) => (
        <Portal key={n.id}>
          <Toast msg={n.msg} onClose={() => remove(n.id)} />
        </Portal>
      ))}
    </NotificationContext.Provider>
  );
}
```

Non-intrusive alerts.

## 30. Component needs server-side rendering (SSR) compatibility; avoid hydration mismatches.

Use `useEffect` for client-only code (e.g., window access), and suppressHydrationWarning on mismatched elements.

```jsx
function ClientOnly({ children }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // Or placeholder

  return children;
}

// Usage: <ClientOnly><div suppressHydrationWarning>{window.innerWidth}</div></ClientOnly>
```

Ensures SSR safety.

## 31. Handling race conditions in sequential API calls (e.g., fetch user then posts).

Use a promise chain or AbortController to cancel previous requests. Track latest request ID.

```jsx
function SequentialFetch({ userId }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let latestId = Date.now();
    fetchUser(userId)
      .then((user) => {
        if (latestId !== Date.now()) return; // Stale check
        return fetchPosts(user.id);
      })
      .then((posts) => {
        if (latestId === Date.now()) setData(posts);
      });
  }, [userId]);

  return <div>{data?.length} posts</div>;
}
```

Latest data wins.

## 32. A carousel auto-advances slides; pause on hover. How?

Use `useEffect` for interval, clear on mouseEnter, restart on mouseLeave.

```jsx
import { useState, useEffect } from "react";

function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleHover = (isHover) => {
    // Clear/restart logic here
  };

  return (
    <img
      src={slides[current]}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    />
  );
}
```

Interactive pausing.

## 33. Optimizing images: lazy-load below fold, with placeholders.

Use `loading="lazy"` on `<img>`, or `react-lazyload`. Add low-res placeholders.

```jsx
import { LazyLoadImage } from "react-lazy-load-image-component";

function ImageGallery({ images }) {
  return images.map((img) => (
    <LazyLoadImage
      key={img.id}
      src={img.src}
      placeholderSrc={img.placeholder}
      effect="blur"
      width="300"
      height="200"
    />
  ));
}
```

Bandwidth-friendly.

## 34. A search uses debounced API; show "searching..." during debounce.

Add a separate "isSearching" state, set true on change, false after debounce.

```jsx
function DebouncedSearch() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      // API call
      setIsSearching(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div>
      <input onChange={(e) => setQuery(e.target.value)} />
      {isSearching && <span>Searching...</span>}
    </div>
  );
}
```

Clear feedback.

## 35. Handling i18n (internationalization) with dynamic language switch.

Use `react-i18next`. Load translations on switch, wrap app in provider.

```jsx
import { useTranslation } from "react-i18next";

function LocalizedComp() {
  const { t, i18n } = useTranslation();

  const switchLang = (lang) => i18n.changeLanguage(lang);

  return (
    <div>
      <button onClick={() => switchLang("es")}>ES</button>
      <p>{t("hello")}</p>
    </div>
  );
}
```

Seamless localization.

## 36. A component tracks mouse position for a tooltip. Optimize for performance.

Throttle the mousemove event with `useCallback` and lodash throttle.

```jsx
import { useState, useCallback } from "react";
import throttle from "lodash/throttle";

function TooltipTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    throttle((e) => setPosition({ x: e.clientX, y: e.clientY }), 16), // ~60fps
    []
  );

  return (
    <div onMouseMove={handleMouseMove}>
      Mouse at {position.x}, {position.y}
    </div>
  );
}
```

Smooth without overload.

## 37. Caching API responses to avoid refetch on remount. How?

Use a cache object in a custom hook, or SWR/react-query.

```jsx
const cache = new Map();

function useCachedFetch(url) {
  const [data, setData] = useState(cache.get(url));

  useEffect(() => {
    if (!data) {
      fetch(url)
        .then((res) => res.json())
        .then((d) => {
          cache.set(url, d);
          setData(d);
        });
    }
  }, [url, data]);

  return data;
}
```

Simple in-memory cache.

## 38. A video player needs play/pause on click, with keyboard support.

Use `useRef` for video element, add event listeners in `useEffect`.

```jsx
import { useRef, useEffect } from "react";

function VideoPlayer({ src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const togglePlay = () => (video.paused ? video.play() : video.pause());
    video.addEventListener("click", togglePlay);
    video.addEventListener("keydown", (e) => {
      if (e.key === " ") togglePlay();
      e.preventDefault();
    });

    return () => {
      video.removeEventListener("click", togglePlay);
      video.removeEventListener("keydown", togglePlay);
    };
  }, []);

  return <video ref={videoRef} src={src} tabIndex={0} />;
}
```

Accessible controls.

## 39. Managing subscriptions (e.g., Stripe) with trial periods; handle expiry.

Use `useEffect` to check expiry on mount, redirect if expired.

```jsx
function SubscriptionGate({ user }) {
  useEffect(() => {
    if (user.trialEnd < Date.now()) {
      window.location.href = "/upgrade";
    }
  }, [user]);

  return user.isSubscribed ? <PremiumContent /> : <TrialContent />;
}
```

Enforces access.

## 40. A grid layout reflows on resize; how to debounce window resize?

Use `useEffect` with throttled resize listener.

```jsx
import { useState, useEffect } from "react";
import throttle from "lodash/throttle";

function ResponsiveGrid() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = throttle(() => setWidth(window.innerWidth), 200);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, []);

  return <div className={`grid-${width > 768 ? "desktop" : "mobile"}`}>Content</div>;
}
```

Efficient resizing.

## 41. Integrating a map (e.g., Google Maps) that initializes on mount.

Use `useRef` for container, load script dynamically if needed.

```jsx
import { useRef, useEffect } from "react";

function Map({ lat, lng }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.google) {
      new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 8,
      });
    }
  }, [lat, lng]);

  return <div ref={mapRef} style={{ height: "400px" }} />;
}
```

Lazy map init.

## 42. A poll component updates vote counts in real-time via Socket.io.

Listen for events, optimistically update on vote, rollback on error.

```jsx
function Poll() {
  const [votes, setVotes] = useState({ yes: 0, no: 0 });
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("/poll");
    socket.current.on("voteUpdate", setVotes);

    return () => socket.current.close();
  }, []);

  const vote = (choice) => {
    const prev = { ...votes };
    setVotes((prev) => ({ ...prev, [choice]: prev[choice] + 1 })); // Optimistic
    socket.current.emit("vote", choice);
    // On error: setVotes(prev)
  };

  return (
    <div>
      <button onClick={() => vote("yes")}>Yes: {votes.yes}</button>
      <button onClick={() => vote("no")}>No: {votes.no}</button>
    </div>
  );
}
```

Responsive polling.

## 43. Handling print styles; hide/show elements on print.

Use CSS `@media print { .no-print { display: none; } }`. For dynamic, use `window.matchMedia`.

```jsx
function PrintableReport() {
  const [isPrint, setIsPrint] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("print");
    setIsPrint(mediaQuery.matches);
    const handler = (e) => setIsPrint(e.matches);
    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }, []);

  return (
    <div>
      <div className={isPrint ? "no-print" : ""}>Toolbar</div>
      <div>Content to print</div>
    </div>
  );
}
```

Print-optimized.

## 44. A stepper progress bar updates on step complete; animate transitions.

Use CSS transitions on state change, or Framer Motion for complex anims.

```jsx
import { useState } from "react";
import "./Stepper.css"; // .step { transition: width 0.3s; }

function Stepper({ steps }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="stepper">
      <div
        className="progress"
        style={{ width: `${((current + 1) / steps.length) * 100}%` }}
      />
      <button onClick={() => setCurrent((c) => Math.min(c + 1, steps.length - 1))}>
        Next
      </button>
    </div>
  );
}
```

Visual feedback.

## 45. Caching images locally for offline use.

Use IndexedDB or service worker. Simple: preload to cache.

```jsx
useEffect(() => {
  caches.open("images").then((cache) => {
    images.forEach((img) => cache.add(img.src));
  });
}, [images]);
```

Offline-ready.

## 46. A accordion expands/collapses sections; only one open at a time.

Use state for active index, toggle on click.

```jsx
function Accordion({ sections }) {
  const [active, setActive] = useState(null);

  return sections.map((sec, i) => (
    <div key={i}>
      <button onClick={() => setActive(active === i ? null : i)}>{sec.title}</button>
      {active === i && <div>{sec.content}</div>}
    </div>
  ));
}
```

Exclusive expansion.

## 47. Tracking analytics events on route changes.

Use `useLocation` from React Router, send on change.

```jsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Send to GA or similar
    gtag("event", "page_view", { page_path: location.pathname });
  }, [location]);

  return null;
}
```

Route-based tracking.

## 48. A canvas drawing app saves state on undo; how to implement undo stack?

Use `useReducer` with actions for push/pop state.

```jsx
function useUndo(initial) {
  const [state, dispatch] = useReducer(
    (s, a) => {
      switch (a.type) {
        case "PUSH":
          return { past: [...s.past, s.present], present: a.value, future: [] };
        case "UNDO":
          return {
            past: s.past.slice(0, -1),
            present: s.past[s.past.length - 1],
            future: [s.present, ...s.future],
          };
        default:
          return s;
      }
    },
    { past: [], present: initial, future: [] }
  );

  return [
    state.present,
    () => dispatch({ type: "PUSH", value: state.present }),
    () => dispatch({ type: "UNDO" }),
  ];
}
```

Undo/redo support.

## 49. Responsive breakpoints; detect screen size changes.

Use `useMediaQuery` hook or CSS-in-JS.

```jsx
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [query]);

  return matches;
}

// Usage: const isMobile = useMediaQuery('(max-width: 768px)');
```

Dynamic responsiveness.

## 50. A component tests user interactions; how to mock events in tests?

Use React Testing Library: `fireEvent.click(button)`. For async, `waitFor`.

```jsx
// Test example with RTL
import { render, screen, fireEvent } from "@testing-library/react";

test("increments counter", () => {
  render(<Counter />);
  const button = screen.getByRole("button");
  fireEvent.click(button);
  expect(screen.getByText("1")).toBeInTheDocument();
});
```

Robust testing.
