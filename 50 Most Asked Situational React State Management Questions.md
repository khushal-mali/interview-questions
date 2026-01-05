# 50 Most Asked Situational React State Management Questions

This Markdown file features 50 frequently asked situational questions focused on React state management. These scenarios draw from real-world challenges in local state (useState/useReducer), Context API, Redux, Zustand, Recoil, and other libraries. Each includes a practical problem, detailed explanation, best practices, and code examples in JSX/JS. Questions emphasize selection, implementation, optimization, and debugging.

## 1. Your app has a global theme toggle affecting all components. How do you manage this without prop drilling?

Use React Context for global state. Create a ThemeContext, provide the theme and toggle function, and consume it where needed. This avoids drilling through every level. For persistence, sync with localStorage.

```jsx
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

// Usage in component
function Button() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className={theme} onClick={toggleTheme}>
      Toggle
    </button>
  );
}
```

Context scales for app-wide state without Redux overhead.

## 2. A form with complex validation needs to reset state on submit. How do you handle this with useReducer?

useReducer suits complex state logic. Define actions for update, validate, reset. Dispatch reset after successful submit to clear form.

```jsx
import { useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value, errors: {} };
    case "VALIDATE":
      return { ...state, errors: action.errors };
    case "RESET":
      return { name: "", email: "", errors: {} };
    default:
      return state;
  }
};

function Form() {
  const [state, dispatch] = useReducer(formReducer, { name: "", email: "", errors: {} });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate and submit logic
    dispatch({ type: "RESET" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={state.name}
        onChange={(e) =>
          dispatch({ type: "UPDATE_FIELD", field: "name", value: e.target.value })
        }
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

Centralizes form logic, easier to test than useState.

## 3. Shopping cart state is shared across pages; users complain of lost items on navigation. How to persist?

Lift cart state to Context or use a library like Zustand. Persist to localStorage on changes, hydrate on app load.

```jsx
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
    }),
    { name: "cart-storage" }
  )
);

// Usage
function CartButton() {
  const { items, addItem } = useCartStore();
  return <button onClick={() => addItem({ id: 1, name: "Item" })}>Add</button>;
}
```

Zustand's persist middleware handles storage seamlessly.

## 4. Redux store causes unnecessary re-renders in a list of items. How to optimize?

Use `useSelector` with selectors for shallow equality. Memoize selectors with `reselect`. Wrap components in `React.memo`.

```jsx
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { shallowEqual } from "react-redux";

const selectItems = createSelector(
  (state) => state.items,
  (items) => items.filter((item) => item.visible)
);

function ItemList() {
  const items = useSelector(selectItems, shallowEqual);
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

Selectors prevent recomputes; shallowEqual skips re-renders.

## 5. Async user data fetch in Context leads to multiple requests on multiple consumers. How to fix?

Memoize the fetch in a custom hook or use a state manager like Recoil with async selectors. In Context, use a flag to prevent refetching.

```jsx
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      fetch("/api/user")
        .then((res) => res.json())
        .then(setUser)
        .finally(() => setLoading(false));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
```

Single fetch on provider mount.

## 6. useState for counter causes re-renders on unrelated prop changes. Solution?

The component re-renders on any state/prop change. Use `useReducer` for isolated logic or split into smaller components.

```jsx
import { useReducer } from "react";

function Counter() {
  const [count, dispatch] = useReducer((state, action) => {
    switch (action) {
      case "increment":
        return state + 1;
      default:
        return state;
    }
  }, 0);

  return <button onClick={() => dispatch("increment")}>{count}</button>;
}

// In parent
function Parent({ unrelatedProp }) {
  return (
    <div>
      <Counter />
    </div>
  ); // Counter isolated
}
```

Smaller components localize re-renders.

## 7. Redux middleware for logging actions; how to implement without affecting performance?

Use `applyMiddleware` with a logger that only runs in development. Throttle logs if needed.

```jsx
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

const logger = createLogger({ collapsed: true });
const store = createStore(reducer, applyMiddleware(logger)); // Dev only

// Production: applyMiddleware(thunk)
```

Conditional middleware keeps prod lean.

## 8. State race condition in parallel API calls with useEffect. How to resolve?

Use a request ID or AbortController. Track the latest request and ignore stale responses.

```jsx
import { useState, useEffect, useRef } from "react";

function DataFetcher({ id }) {
  const [data, setData] = useState(null);
  const abortControllerRef = useRef(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    requestIdRef.current += 1;
    const currentId = requestIdRef.current;
    abortControllerRef.current = new AbortController();

    fetch(`/api/data/${id}`, { signal: abortControllerRef.current.signal })
      .then((res) => res.json())
      .then((result) => {
        if (currentId === requestIdRef.current) setData(result);
      });

    return () => abortControllerRef.current?.abort();
  }, [id]);

  return <div>{JSON.stringify(data)}</div>;
}
```

Ensures latest data.

## 9. MobX observable causing excessive re-renders in a large app. How to optimize?

Use `@observer` only on components needing updates. Compute derived state with `@computed` to avoid recalcs.

```jsx
import { makeAutoObservable, observable, computed } from "mobx";
import { observer } from "mobx-react-lite";

class Store {
  items = observable([]);

  constructor() {
    makeAutoObservable(this);
  }

  @computed get filteredItems() {
    return this.items.filter((item) => item.active);
  }
}

const store = new Store();

const ItemList = observer(() => {
  return (
    <ul>
      {store.filteredItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
});
```

Computed props update efficiently.

## 10. Context value changes cause all consumers to re-render. How to avoid?

Split Context into multiple (e.g., one for read-only data). Use `useMemo` for stable value objects.

```jsx
const DispatchContext = createContext();
const StateContext = createContext();

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const memoizedState = useMemo(() => state, [state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={memoizedState}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}

const useAppState = () => useContext(StateContext);
const useAppDispatch = () => useContext(DispatchContext);
```

Separate concerns for granular updates.

## 11. Zustand store for offline-first app; sync when online. How?

Use middleware for persistence and a sync action that checks navigator.onLine.

```jsx
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useTodoStore = create(
  persist(
    (set, get) => ({
      todos: [],
      addTodo: (text) =>
        set((state) => ({ todos: [...state.todos, { id: Date.now(), text }] })),
      sync: () => {
        if (navigator.onLine) {
          const todos = get().todos;
          fetch("/api/sync", { method: "POST", body: JSON.stringify(todos) });
        }
      },
    }),
    { name: "todo-storage" }
  )
);

// In component
useTodoStore((state) => state.sync()); // Call on mount
```

Auto-syncs on online.

## 12. Redux Saga for complex async flows (e.g., fetch then post). How to implement?

Use generators with `yield` for effects like `call`, `put`. Define sagas and fork them.

```jsx
import { call, put, takeEvery } from "redux-saga/effects";

function* fetchThenPost(action) {
  try {
    const data = yield call(fetchData, action.payload);
    yield put({ type: "POST_DATA", payload: data });
    yield call(postData, data);
  } catch (e) {
    yield put({ type: "ERROR", error: e });
  }
}

function* rootSaga() {
  yield takeEvery("FETCH", fetchThenPost);
}

export default rootSaga;
```

Handles orchestration cleanly.

## 13. Recoil atom for user prefs; how to make it global without providers?

Atoms are global by default. Use `<RecoilRoot>` at app root for all atoms.

```jsx
import { atom, useRecoilState } from "recoil";

const themeAtom = atom({
  key: "theme",
  default: "light",
});

function ThemeToggle() {
  const [theme, setTheme] = useRecoilState(themeAtom);
  return (
    <button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
      {theme}
    </button>
  );
}

// App.js
import { RecoilRoot } from "recoil";
<RecoilRoot>
  <App />
</RecoilRoot>;
```

Minimal setup for global state.

## 14. useState object mutation leads to no re-render. How to fix?

Always create new objects with spread: `setState({ ...prev, key: value })`. Use immer for deep updates.

```jsx
import { useImmer } from "use-immer";

function UserForm() {
  const [user, updateUser] = useImmer({ name: "", address: { street: "" } });

  const handleChange = (path, value) => {
    updateUser((draft) => {
      // Immutable-like mutations
      _.set(draft, path, value);
    });
  };

  return <input onChange={(e) => handleChange("address.street", e.target.value)} />;
}
```

Immer simplifies immutability.

## 15. Redux store hydration from localStorage on app start.

Use `redux-persist` middleware. It rehydrates automatically.

```jsx
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = { key: "root", storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };

// In App
import { PersistGate } from "redux-persist/integration/react";
<PersistGate loading={<div>Loading...</div>} persistor={persistor}>
  <App />
</PersistGate>;
```

Seamless persistence.

## 16. Multiple components update shared state; conflicts arise. How to centralize?

Lift state up or use a store like Redux with actions. Enforce single source of truth.

```jsx
// Lifted state
function Parent() {
  const [shared, setShared] = useState("");

  return (
    <>
      <ChildA value={shared} onChange={setShared} />
      <ChildB value={shared} onChange={setShared} />
    </>
  );
}
```

Prevents divergence.

## 17. Jotai atoms for dynamic forms; how to create atoms per field?

Use atom families: `atomFamily(param => atom(defaultValue))`. Key by field ID.

```jsx
import { atom, useRecoilValue, useSetRecoilState } from "recoil"; // Jotai similar

const fieldAtom = atomFamily({
  key: "field",
  default: "",
});

function DynamicField({ id }) {
  const value = useRecoilValue(fieldAtom(id));
  const setValue = useSetRecoilState(fieldAtom(id));
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

Scalable for dynamic UIs.

## 18. Debugging stale closures in useEffect with state. Solution?

Use functional updates or include state in deps. ESLint react-hooks/exhaustive-deps helps.

```jsx
function Timer({ delay }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 1), delay); // Functional update
    return () => clearInterval(id);
  }, [delay]); // No count dep needed

  return <div>{count}</div>;
}
```

Avoids stale values.

## 19. Valtio proxy state for collaborative editing; how to sync?

Valtio uses proxies for reactivity. Subscribe to changes and broadcast via WebSocket.

```jsx
import { proxy, useSnapshot } from "valtio";

const state = proxy({ text: "" });

function Editor() {
  const snap = useSnapshot(state);
  return (
    <textarea
      value={snap.text}
      onChange={(e) => {
        state.text = e.target.value; /* Broadcast */
      }}
    />
  );
}
```

Reactive and simple.

## 20. Redux Toolkit for normalized cache (e.g., entities). How?

Use `createEntityAdapter` for CRUD. Normalize in reducers.

```jsx
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter();
const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {
    addOne: usersAdapter.addOne,
    upsertMany: usersAdapter.upsertMany,
  },
});

export const { addOne } = usersSlice.actions;
```

Efficient for relational data.

## 21. Context + useReducer for large form; performance drops. Optimize?

Memoize dispatch with `useCallback`. Split reducer into sub-reducers.

```jsx
const reducer = combineReducers({ personal: personalReducer, address: addressReducer });

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const memoDispatch = useCallback(dispatch, []);

  return (
    <Context.Provider value={{ state, dispatch: memoDispatch }}>
      {children}
    </Context.Provider>
  );
}
```

Reduces re-renders.

## 22. useSyncExternalStore for integrating non-React state (e.g., browser API).

Hook subscribes to external store, syncs with React.

```jsx
import { useSyncExternalStore } from "react";

function useOnlineStatus() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener("online", callback);
      window.addEventListener("offline", callback);
      return () => {
        window.removeEventListener("online", callback);
        window.removeEventListener("offline", callback);
      };
    },
    () => navigator.onLine
  );
}

function Status() {
  const isOnline = useOnlineStatus();
  return <div>{isOnline ? "Online" : "Offline"}</div>;
}
```

Bridges external state.

## 23. Redux offline queueing for actions when disconnected.

Use `redux-offline` or custom middleware to queue dispatches.

```jsx
// Middleware
const offlineMiddleware = (store) => (next) => (action) => {
  if (!navigator.onLine && action.meta?.offline) {
    // Queue action
    localStorage.setItem("queue", JSON.stringify([...queue, action]));
    return;
  }
  return next(action);
};
```

Resilient to network issues.

## 24. Atomic state updates in useState for concurrent mode.

Use `startTransition` for non-urgent updates.

```jsx
import { useState, startTransition } from "react";

function Search() {
  const [query, setQuery] = useState("");

  const handleChange = (value) => {
    startTransition(() => {
      setQuery(value); // Non-blocking
    });
  };

  return <input onChange={(e) => handleChange(e.target.value)} />;
}
```

Smooth UI in concurrent React.

## 25. Effector for event-driven state; handle user events.

Use `createEvent` and `sample` for side effects.

```jsx
import { createStore, createEvent, sample } from "effector";

const addTodo = createEvent();
const $todos = createStore([]).on(addTodo, (state, todo) => [...state, todo]);

sample({
  clock: addTodo,
  source: $todos,
  fn: (todos) => ({ count: todos.length }),
  target: someSideEffect,
});
```

Declarative events.

## 26. State normalization in Recoil; avoid duplicates.

Use selectors for normalization, atoms for primitives.

```jsx
const postIdsAtom = atom({ key: "postIds", default: [] });
const postsState = atomFamily({ key: "posts", default: null });

const postsSelector = selector({
  key: "posts",
  get: ({ get }) => {
    const ids = get(postIdsAtom);
    return ids.map((id) => get(postsState(id)));
  },
});
```

Normalized, efficient.

## 27. useState batching in React 18; leverage for multiple updates.

React auto-batches in events. Use `flushSync` for immediate.

```jsx
import { flushSync } from "react-dom";

function BatchUpdate() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const update = () => {
    setA(1);
    setB(2); // Batched, one render
  };

  const syncUpdate = () => {
    flushSync(() => {
      setA(3); // Immediate
    });
  };
}
```

Optimizes renders.

## 28. Redux devtools for time-travel debugging.

Wrap store with `devTools` enhancer.

```jsx
import { devToolsEnhancer } from "@redux-devtools/extension";

const store = createStore(reducer, composeEnhancers(devToolsEnhancer()));
```

Inspect state history.

## 29. XState for form machine; manage validation states.

Define states/transitions for pending, valid, invalid.

```jsx
import { createMachine, interpret } from "xstate";

const formMachine = createMachine({
  id: "form",
  initial: "editing",
  states: {
    editing: {
      on: { SUBMIT: "submitting" },
    },
    submitting: {
      invoke: { src: "validate", onDone: "valid", onError: "invalid" },
    },
  },
});

const service = interpret(formMachine).start();
```

Finite state for complex flows.

## 30. Immer in Redux reducers for immutable updates.

Use `produce` for draft mutations.

```jsx
import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

const slice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    add: (state, action) =>
      produce(state, (draft) => {
        draft.push(action.payload);
      }),
  },
});
```

Safe mutations.

## 31. Context selector pattern to avoid re-renders.

Custom hook with useMemo for parts of state.

```jsx
function useSelectedTheme({ theme }) {
  return useMemo(() => ({ primaryColor: theme === "dark" ? "white" : "black" }), [theme]);
}
```

Granular consumption.

## 32. Zustand immer middleware for complex state.

Integrate immer for drafts.

```jsx
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useStore = create(
  immer((set) => ({
    user: { profile: {} },
    updateProfile: (key, value) =>
      set((draft) => {
        draft.user.profile[key] = value;
      }),
  }))
);
```

Deep updates easy.

## 33. Redux Thunk vs Saga for simple async.

Thunk for basic; dispatch async functions.

```jsx
const fetchUser = () => async (dispatch) => {
  dispatch({ type: "LOADING" });
  const data = await fetch("/user");
  dispatch({ type: "SUCCESS", payload: await data.json() });
};
```

Lightweight async.

## 34. useReducer with TypeScript for typed actions.

Union type for actions.

```tsx
type Action = { type: "INCREMENT" } | { type: "DECREMENT" };
const reducer = (state: number, action: Action): number => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    default:
      return state;
  }
};
```

Type-safe.

## 35. Recoil snapshot for testing state.

Use `getSnapshot` to assert.

```jsx
import { getSnapshot } from "recoil";

test("theme", () => {
  const snapshot = getSnapshot();
  expect(snapshot.getLoadable(themeAtom).contents).toBe("light");
});
```

Testable state.

## 36. Redux normalize entities on fetch.

Use normalizr or manual in reducer.

```jsx
const normalize = (data) => ({
  result: data.map((d) => d.id),
  entities: { users: { [d.id]: d } },
});

reducer: (state, action) => ({
  ...state,
  ...normalize(action.payload),
});
```

Deduplicated data.

## 37. useState for optimistic updates in forms.

Update UI first, rollback on error.

```jsx
const [todos, setTodos] = useState([]);
const addOptimistic = (todo) => {
  setTodos((prev) => [...prev, { ...todo, isPending: true }]);
  postTodo(todo).catch(() => setTodos((prev) => prev.filter((t) => !t.isPending)));
};
```

Snappy UX.

## 38. MobX action for batched updates.

Wrap mutations in `@action`.

```jsx
class Store {
  @observable todos = [];

  @action addTodo = (todo) => {
    this.todos.push(todo); // Batched
  };
}
```

Efficient batches.

## 39. Context for auth state; protect routes.

Provider checks token, children conditional.

```jsx
function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  // Fetch token

  return (
    <AuthContext.Provider value={auth}>
      {auth ? children : <Login />}
    </AuthContext.Provider>
  );
}
```

Guarded access.

## 40. useDeferredValue for search state in lists.

Defer heavy filters.

```jsx
const [query, setQuery] = useState("");
const deferredQuery = useDeferredValue(query);

const filtered = useMemo(
  () => items.filter((i) => i.includes(deferredQuery)),
  [deferredQuery]
);
```

Responsive search.

## 41. Redux persist blacklist/whitelist.

Config in persistConfig.

```jsx
const persistConfig = {
  key: "root",
  whitelist: ["todos"], // Persist only todos
  blacklist: ["temp"],
};
```

Selective storage.

## 42. Jotai withError for error handling.

Atoms return errors.

```jsx
const asyncAtom = atom(async (get) => {
  try {
    return await fetchData();
  } catch (e) {
    throw e;
  }
});
```

Built-in errors.

## 43. useTransition for state updates.

Mark non-urgent.

```jsx
const [isPending, startTransition] = useTransition();
startTransition(() => setTab(nextTab));
```

Prioritizes UI.

## 44. Redux combineReducers for modules.

Modular reducers.

```jsx
const rootReducer = combineReducers({
  todos: todosReducer,
  users: usersReducer,
});
```

Scalable.

## 45. Valtio subscribe for external sync.

Manual subscribe.

```jsx
import { subscribe } from "valtio/utils";
subscribe(state, () => {
  // Sync to server
});
```

Custom listeners.

## 46. Recoil async selector with suspense.

Loadable for loading.

```jsx
const dataSelector = selector({
  get: async ({ get }) => {
    // Async
    return await fetch();
  },
});
```

Suspense-friendly.

## 47. useState with key for reset.

Change key to remount.

```jsx
<Form key={resetKey} />;
const reset = () => setResetKey(Date.now());
```

Full reset.

## 48. Redux middleware for API versioning.

Intercept and rewrite URLs.

```jsx
const apiMiddleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    if (action.type.startsWith("API/")) {
      action.meta.url = `/v2${action.meta.url}`;
    }
    return next(action);
  };
```

Centralized.

## 49. MobX toJS for serialization.

Convert to plain object.

```jsx
import { toJS } from "mobx";
const json = JSON.stringify(toJS(store));
```

Portable state.

## 50. Zustand devtools integration.

Add devtools middleware.

```jsx
import { devtools } from "zustand/middleware";

const useStore = create(
  devtools((set) => ({
    /* store */
  }))
);
```

Debug-friendly.
