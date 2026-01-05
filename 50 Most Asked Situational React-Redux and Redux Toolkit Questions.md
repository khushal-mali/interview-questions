# 50 Most Asked Situational React-Redux and Redux Toolkit Questions

This Markdown file compiles 50 frequently asked situational questions centered on React-Redux and Redux Toolkit (RTK). These scenarios address real-world challenges in connecting React apps to Redux stores, handling async operations, optimization, testing, and migration. Each includes a practical problem, detailed explanation, best practices, and code examples in JSX/JS. Assumes familiarity with core Redux concepts.

## 1. Your React app needs to connect to a Redux store for global user state, but components re-render excessively on unrelated updates. How do you fix?

Use `useSelector` with shallow equality checks or memoized selectors from `reselect`. Wrap components in `React.memo` to prevent prop-based re-renders. In RTK, leverage `createSelector` for derived state.

```jsx
import { useSelector } from "react-redux";
import { shallowEqual } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

const selectUser = createSelector(
  (state) => state.user,
  (user) => user.profile // Derived
);

function UserProfile() {
  const profile = useSelector(selectUser, shallowEqual);
  return <div>{profile.name}</div>; // Re-renders only on profile change
}
```

Selectors isolate updates, improving perf.

## 2. Implementing authentication: Dispatch login action and store token. How with RTK?

Use `createAsyncThunk` for the login API call. Handle fulfilled/rejected in extraReducers to update auth slice state.

```jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  return res.json();
});

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, loading: false },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
```

Async thunks simplify API integration.

## 3. A list component fetches data on mount but duplicates calls on re-renders. How to prevent?

Dispatch the thunk only if data is empty, using `useEffect` with a flag. RTK Query (if used) auto-caches.

```jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "./itemsSlice";

function ItemList() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.data);
  const loading = useSelector((state) => state.items.loading);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchItems());
    }
  }, [dispatch, items.length]);

  if (loading) return <div>Loading...</div>;
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

Conditional dispatch avoids redundancy.

## 4. Migrating from Redux to RTK: Refactor a reducer for todos. How?

Use `createSlice` to combine reducer and actions. Replace `combineReducers` with RTK's `configureStore`.

```jsx
// Old Redux
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    default:
      return state;
  }
};

// RTK
import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload); // Immer handles immutability
    },
  },
});

export const { addTodo } = todosSlice.actions;
```

RTK reduces boilerplate by 50-70%.

## 5. useDispatch causes function recreation, leading to child re-renders. Optimize?

Memoize callbacks with `useCallback`, but `useDispatch` returns a stable function. Use `bindActionCreators` for multiple dispatches.

```jsx
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { addTodo, deleteTodo } from "./todosSlice";

function TodoControls() {
  const dispatch = useDispatch();

  const handleAdd = useCallback(
    (text) => {
      dispatch(addTodo(text));
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteTodo(id));
    },
    [dispatch]
  );

  return (
    <>
      <button onClick={() => handleAdd("New")}>Add</button>
      <button onClick={() => handleDelete(1)}>Delete</button>
    </>
  );
}
```

Stable callbacks prevent child re-renders.

## 6. Handling errors from async thunks globally. How?

Use `extraReducers` for rejected cases, or middleware like `serializableCheck` for error logging. RTK includes error handling out-of-box.

```jsx
const fetchUser = createAsyncThunk("user/fetch", async (id) => {
  const res = await fetch(`/api/user/${id}`);
  if (!res.ok) throw new Error("Failed");
  return res.json();
});

const userSlice = createSlice({
  // ...
  extraReducers: (builder) => {
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.error = action.error.message;
      // Global toast via listener middleware
    });
  },
});
```

Centralized error states.

## 7. Connecting a large app: Provider wraps root, but hot reload breaks store. Fix?

Use `configureStore` with `devTools: process.env.NODE_ENV !== 'production'`. Ensure Provider is at root.

```jsx
// store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

// App.js
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
```

Hot reload preserves state in dev.

## 8. Selector returns undefined initially; component crashes. How to handle?

Use optional chaining or default values in selector. Add loading state from thunk.

```jsx
const selectUserName = (state) => state.user.data?.name || "Guest";

function UserName() {
  const name = useSelector(selectUserName);
  return <div>Hello, {name}</div>;
}
```

Graceful fallbacks.

## 9. RTK Query for caching API data; avoid refetch on focus. How?

Use `refetchOnFocus: false` in query hooks. Set cache time with `keepUnusedDataFor`.

```jsx
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => "items",
      keepUnusedDataFor: 300, // 5 min
    }),
  }),
});

export const { useGetItemsQuery } = api;

// Usage: const { data } = useGetItemsQuery(); // No refetch on focus
```

Built-in caching reduces network calls.

## 10. Dispatching actions from non-React code (e.g., WebSocket). How?

Get store instance and dispatch directly, or use `store.dispatch` in middleware.

```jsx
import { store } from "./store";

const ws = new WebSocket("/ws");
ws.onmessage = (e) => {
  const action = { type: "WS_MESSAGE", payload: JSON.parse(e.data) };
  store.dispatch(action);
};
```

Integrates external events.

## 11. Testing a component that uses useSelector: Mock store state.

Use `@reduxjs/toolkit` testing utils or `jest.mock` for Provider.

```jsx
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import UserList from "./UserList";

const mockStore = configureStore([]);

test("renders users", () => {
  const store = mockStore({ users: { list: [{ id: 1, name: "Test" }] } });
  render(
    <Provider store={store}>
      <UserList />
    </Provider>
  );
  expect(screen.getByText("Test")).toBeInTheDocument();
});
```

Mock stores for isolated tests.

## 12. RTK slice for optimistic updates in a todo app. Implement?

Update state immediately on pending, rollback on rejected.

```jsx
const updateTodo = createAsyncThunk('todos/update', async (todo) => {
  return await fetch(`/api/todos/${todo.id}`, { method: 'PUT', body: JSON.stringify(todo) });
});

extraReducers: (builder) => {
  builder
    .addCase(updateTodo.pending, (state, action) => {
      const index = state.findIndex(t => t.id === action.meta.arg.id);
      state[index].status = 'updating'; // Optimistic
    })
    .addCase(updateTodo.rejected, (state, action) => {
      // Revert
      state[index].status = 'error';
    });
},
```

Perceived faster UX.

## 13. Multiple slices; organize root reducer. Best practice?

Use `combineReducers` in RTK's `configureStore`. Group related slices.

```jsx
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import todosReducer from "./todosSlice";
import usersReducer from "./usersSlice";

const rootReducer = combineReducers({
  todos: todosReducer,
  users: usersReducer,
});

export const store = configureStore({ reducer: rootReducer });
```

Modular structure.

## 14. useSelector with deep object causes re-renders on shallow changes. Fix?

Use `reselect` for deep selectors or `shallowEqual` customizer.

```jsx
import { createSelector } from "reselect";

const selectTodoById = (state, id) =>
  createSelector(
    (state) => state.todos,
    (todos) => todos.find((t) => t.id === id)
  );

function TodoItem({ id }) {
  const todo = useSelector((state) => selectTodoById(state, id));
  return <div>{todo?.text}</div>;
}
```

Precise selections.

## 15. RTK middleware for API base query with auth headers.

Inject token dynamically in `fetchBaseQuery`.

```jsx
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});
```

Auto-auth for queries.

## 16. Debugging Redux actions: Action dispatched but state unchanged.

Use Redux DevTools to trace. Ensure reducer handles type correctly; check immutability.

```jsx
// In reducer, log or use immer
extraReducers: (builder) => {
  builder.addCase('myAction', (state) => {
    console.log('Action hit'); // Debug
    state.value += 1;
  });
},
```

DevTools shows payloads/states.

## 17. Lazy-loading reducers in RTK for code-splitting.

Use `injectReducer` dynamically, but RTK prefers static. Use dynamic imports for slices.

```jsx
const lazyReducer = () => import("./lazySlice").then((m) => ({ lazy: m.default }));

const store = configureStore({
  reducer: {
    // ...static
    lazy: lazyReducer,
  },
});
```

Optimizes bundle.

## 18. useDispatch in HOC; bind actions for convenience.

Use `connect` mapDispatchToProps or RTK's `useDispatch` with `bindActionCreators`.

```jsx
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

function withActions(WrappedComponent) {
  return function Connected(props) {
    const dispatch = useDispatch();
    const { addTodo, deleteTodo } = bindActionCreators({ addTodo, deleteTodo }, dispatch);

    return <WrappedComponent {...props} addTodo={addTodo} deleteTodo={deleteTodo} />;
  };
}
```

HOC for legacy.

## 19. RTK Query mutation invalidates tags for refetch.

Use `providesTags` and `invalidatesTags` for cache invalidation.

```jsx
endpoints: (builder) => ({
  getTodos: builder.query({ query: () => "todos", providesTags: ["Todo"] }),
  addTodo: builder.mutation({
    query: (todo) => ({ url: "todos", method: "POST", body: todo }),
    invalidatesTags: ["Todo"],
  }),
});
```

Auto-refreshes on mutations.

## 20. Persisting Redux state across tabs/sessions.

Use `redux-persist` with RTK. Configure in `configureStore`.

```jsx
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistedReducer = persistReducer({ key: "root", storage }, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});
```

Hydrates on reload.

## 21. Selector for computed values like filtered list.

`createSelector` with params.

```jsx
const selectFilteredTodos = createSelector(
  [(state) => state.todos, (state, filter) => filter],
  (todos, filter) => todos.filter((t) => t.status === filter)
);

const filtered = useSelector((state) => selectFilteredTodos(state, "done"));
```

Memoized derivations.

## 22. Handling loading states across multiple thunks.

Use entity adapters or global loading slice. RTK Query handles per-query.

```jsx
const loadingSlice = createSlice({
  name: "loading",
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

// In thunks: dispatch(increment()) on pending, decrement on fulfilled/rejected
```

Global spinner control.

## 23. RTK codegen for TypeScript types.

Run `npx @reduxjs/toolkit queryCodegen` for endpoint types.

```typescript
// Generated
export type GetItemsQueryArg = void;
export type GetItemsQueryResult = { data?: Item[] };

// Usage in component
const { data: items } = useGetItemsQuery(undefined as GetItemsQueryArg);
```

Type safety.

## 24. Unsubscribing from thunks to prevent leaks.

Thunks auto-clean; for manual, use `unwrap` with abort.

```jsx
const { unwrap } = useDispatch(fetchItems());
unwrap().catch(() => {}); // Handle
```

No manual unsub needed.

## 25. RTK listener middleware for side effects on actions.

Watch actions and dispatch others.

```jsx
import { listenerMiddleware } from "@reduxjs/toolkit";

listenerMiddleware.startListening({
  actionCreator: addTodo,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(logAction(action));
  },
});
```

Reactive side effects.

## 26. Connecting class components to Redux.

Use `connect` HOC.

```jsx
import { connect } from "react-redux";

class MyClass extends React.Component {
  render() {
    return <div>{this.props.count}</div>;
  }
}

export default connect((state) => ({ count: state.count }))(MyClass);
```

Legacy support.

## 27. RTK entity adapter for CRUD on normalized data.

`createEntityAdapter` for upserts.

```jsx
const adapter = createEntityAdapter();
const slice = createSlice({
  // ...
  reducers: adapter.getCrudActions(),
});
```

Normalized storage.

## 28. Batching dispatches for multiple updates.

Use `batch` from `react-redux`.

```jsx
import { batch } from "react-redux";

batch(() => {
  dispatch(addTodo("a"));
  dispatch(addTodo("b"));
});
```

Single re-render.

## 29. RTK Query polling for real-time data.

`pollingInterval` in query.

```jsx
getItems: builder.query({
  query: () => 'items',
  pollingInterval: 5000, // 5s
}),
```

Auto-refreshes.

## 30. Debugging RTK Query cache.

Use DevTools or `util.skipToken` for conditional queries.

```jsx
const skip = !userId ? { skip: true } : undefined;
const { data } = useGetUserQuery(userId ? userId : skip);
```

Conditional caching.

## 31. Thunk returning promise for component await.

Use `unwrap()` on dispatched thunk.

```jsx
const dispatch = useDispatch();
const onSubmit = async () => {
  try {
    await dispatch(login(creds)).unwrap();
    // Success
  } catch (err) {
    // Error
  }
};
```

Async/await support.

## 32. RTK slice with immer for deep nests.

Direct mutations in reducers.

```jsx
addComment: (state, action) => {
  state.posts[action.payload.postId].comments.push(action.payload.comment);
},
```

Immer enables.

## 33. useSelector with ownProps in functional.

Pass as second arg.

```jsx
const selectTodo = (state, id) => state.todos[id];
const todo = useSelector((state) => selectTodo(state, ownProps.id));
```

Parametrized.

## 34. RTK configureStore with enhancers.

Add middleware array.

```jsx
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware),
});
```

Custom extensions.

## 35. Handling Redux state in SSR.

Use `hydrate` from `react-redux` for Next.js.

```jsx
import { useSelector } from "react-redux";
import { hydrate } from "react-dom";

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

Server hydration.

## 36. RTK Query optimistic updates in mutations.

Patch state on pending.

```jsx
addTodo: builder.mutation({
  // ...
  async onQueryStarted(id, { dispatch, queryFulfilled }) {
    const patchResult = dispatch(api.util.updateQueryData('getTodos', undefined, draft => {
      draft.push({ id, text: 'temp' });
    }));
    try {
      await queryFulfilled;
    } catch {
      patchResult.undo();
    }
  },
}),
```

Temporary UI updates.

## 37. Selector memoization with reselect.

Input selectors as array.

```jsx
const selectTotal = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => todos.filter((t) => t.status === filter).length
);
```

Cached computations.

## 38. RTK rejectWithValue for custom errors.

Throw in thunk.

```jsx
const fetchUser = createAsyncThunk("user/fetch", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/user/${id}`);
    if (!res.ok) return rejectWithValue("Not found");
    return res.json();
  } catch (e) {
    return rejectWithValue(e.message);
  }
});
```

Structured errors.

## 39. Connecting multiple stores (legacy). Avoid?

Use single store; RTK enforces.

```jsx
// Bad: Multiple stores
// Good: One store with slices
```

Single source of truth.

## 40. RTK Query with tags for granular invalidation.

Tag entities.

```jsx
getPost: builder.query({ providesTags: (result, error, id) => [{ type: 'Post', id }] }),
updatePost: builder.mutation({ invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }] }),
```

Precise cache control.

## 41. useDispatch typing in TS.

Infer from store type.

```typescript
import { useAppDispatch } from "./hooks"; // Typed hook

const dispatch = useAppDispatch();
dispatch(addTodo("typed"));
```

Type-safe dispatches.

## 42. RTK middleware for logging in prod.

Conditional.

```jsx
const logger = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: { ignoredActions: ["persist/PERSIST"] },
  });
```

Filtered logs.

## 43. Selector for union types.

Reselect handles.

```jsx
const selectActive = createSelector(
  (state) => state.ui.activeTab,
  (tab) => (tab === "todos" ? state.todos : state.users)
);
```

Conditional selects.

## 44. RTK Query lazy queries.

`useLazyGetItemsQuery` for manual trigger.

```jsx
const [trigger] = useLazyGetItemsQuery();
useEffect(() => {
  trigger();
}, []);
```

On-demand fetches.

## 45. Batch selectors for multiple values.

Object selector.

```jsx
const selectTodoData = createSelector(
  (state) => state,
  (state) => ({ todos: state.todos, filter: state.filter })
);

const { todos, filter } = useSelector(selectTodoData);
```

Efficient multi-select.

## 46. RTK entity upsert for merges.

Adapter.upsertMany.

```jsx
const { upsertOne } = adapter.getCrudActions();
dispatch(upsertOne(entity));
```

Idempotent updates.

## 47. Handling Redux in concurrent features.

RTK compatible; use `unstable_batchedUpdates`.

```jsx
import { unstable_batchedUpdates as batch } from "react-redux";
```

Concurrent safe.

## 48. RTK code splitting slices.

Dynamic import in reducer.

```jsx
const reducer = (state) => {
  if (!state.lazy) return state;
  return { ...state, lazy: lazyReducer(state.lazy) };
};
```

Lazy slices.

## 49. Testing thunks.

`jest.mock` fetch, test fulfilled.

```jsx
test("fetches", async () => {
  const mockData = { id: 1 };
  global.fetch = jest.fn().mockResolvedValue({ json: () => mockData });

  const result = await store.dispatch(fetchUser(1));
  expect(result.payload).toEqual(mockData);
});
```

Async tests.

## 50. RTK Query with websockets for real-time.

Use `onCacheEntryAdded` for subscriptions.

```jsx
getLiveData: builder.query({
  // ...
  async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
    await cacheDataLoaded;
    const ws = new WebSocket('/ws');
    ws.onmessage = (e) => updateCachedData(draft => { draft.push(e.data); });
    await cacheEntryRemoved;
    ws.close();
  },
}),
```

Real-time caching.
