# 50 Most Asked React-Redux and Redux Toolkit Interview Questions

This Markdown file lists 50 frequently asked interview questions on React-Redux and Redux Toolkit (RTK), focusing on core concepts, implementation, optimization, and best practices. Questions are non-situational, drawn from common technical interviews. Each includes a detailed explanation and code examples in JSX/JS for clarity.

## 1. What is React-Redux, and why is it used?

React-Redux is the official binding library for integrating Redux with React. It provides hooks like `useSelector` and `useDispatch` (or the `connect` HOC) to connect components to the Redux store, enabling efficient state reading and dispatching actions. It's used to manage global state predictably in large apps, ensuring unidirectional data flow and avoiding prop drilling.

```jsx
// Basic usage with hooks
import { useSelector, useDispatch } from "react-redux";

function Counter() {
  const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return <button onClick={() => dispatch({ type: "INCREMENT" })}>Count: {count}</button>;
}
```

## 2. Explain the Redux flow in a React app.

Redux follows unidirectional flow: Actions (plain objects with `type` and optional `payload`) are dispatched to the store. The store runs the root reducer, producing a new state. React-Redux's `useSelector` subscribes to state changes, re-rendering components. RTK simplifies with `createSlice` for reducers/actions and `createAsyncThunk` for async.

```jsx
// Flow: Action -> Dispatch -> Reducer -> State -> Component Re-render
const INCREMENT = "INCREMENT";
dispatch({ type: INCREMENT }); // Action
// Reducer: case INCREMENT: return state + 1;
```

## 3. What is the difference between `useSelector` and `useDispatch`?

`useSelector` subscribes to the store and selects specific state slices, triggering re-renders on changes. `useDispatch` returns the store's dispatch function for sending actions. In RTK, `useSelector` pairs with memoized selectors for optimization.

```jsx
const value = useSelector((state) => state.value); // Selects state
const dispatch = useDispatch(); // Dispatches actions
```

## 4. How does `connect` HOC work in React-Redux?

`connect` is a higher-order component that maps state to props (`mapStateToProps`) and actions to props (`mapDispatchToProps`). It wraps components for Redux integration. Modern apps favor hooks, but `connect` suits class components.

```jsx
import { connect } from "react-redux";

const mapStateToProps = (state) => ({ count: state.count });
const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch({ type: "INCREMENT" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
```

## 5. What is Redux Toolkit, and what problems does it solve?

Redux Toolkit (RTK) is the official toolkit for efficient Redux code. It solves boilerplate with `createSlice` (auto-generates actions/reducers), `createAsyncThunk` (async logic), and `configureStore` (setup with defaults). It uses Immer for immutable updates and includes DevTools integration.

```jsx
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
  },
});
```

## 6. Explain `createSlice` in RTK.

`createSlice` generates a reducer function, action creators, and types from a config object with `name`, `initialState`, and `reducers`. It uses Immer, allowing "mutative" code in reducers. Extra reducers handle async cases.

```jsx
const slice = createSlice({
  name: "todos",
  initialState: { list: [] },
  reducers: {
    addTodo: (state, action) => {
      state.list.push(action.payload);
    },
  },
});
export const { addTodo } = slice.actions;
```

## 7. What is `createAsyncThunk` and how is it used?

`createAsyncThunk` generates an action creator for async operations (e.g., API calls). It dispatches `pending/fulfilled/rejected` actions. Handle in `extraReducers` for loading/error states.

```jsx
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  const res = await fetch("/api/todos");
  return res.json();
});

const slice = createSlice({
  name: "todos",
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});
```

## 8. How do you set up a store with RTK's `configureStore`?

`configureStore` creates a store with `reducer`, optional `preloadedState`, `middleware`, and `devTools`. It auto-includes Redux Thunk and serializable checks.

```jsx
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
```

## 9. What are Redux selectors, and how do you create them with RTK?

Selectors extract state slices. RTK uses `createSelector` from `reselect` for memoized, composable selectors to avoid recomputes.

```jsx
import { createSelector } from "@reduxjs/toolkit";

export const selectTodos = createSelector(
  (state) => state.todos,
  (todos) => todos.filter((todo) => !todo.completed)
);
```

## 10. Explain the Provider component in React-Redux.

`<Provider store={store}>` makes the Redux store available to child components via React Context. Wrap the app root to enable hooks like `useSelector`.

```jsx
import { Provider } from "react-redux";
import { store } from "./store";

<Provider store={store}>
  <App />
</Provider>;
```

## 11. What is the role of Redux Thunk, and how does RTK integrate it?

Redux Thunk middleware allows dispatching functions for async logic. RTK includes it by default in `configureStore` and enhances with `createAsyncThunk`.

```jsx
// Thunk example
const fetchData = () => async (dispatch) => {
  dispatch({ type: "LOADING" });
  const data = await apiCall();
  dispatch({ type: "SUCCESS", payload: data });
};
```

## 12. How do you handle immutable updates in Redux reducers?

Use `return newState` for shallow copies or Immer in RTK for "mutative" drafts. Avoid direct mutations to preserve predictability.

```jsx
// Without Immer
case 'ADD': return [...state, action.payload];

// With RTK/Immer
addItem: (state, action) => { state.push(action.payload); } // Draft
```

## 13. What are extraReducers in RTK slices?

`extraReducers` handle actions outside the slice, like async thunk cases (`pending`, `fulfilled`, `rejected`). Use builder callback or object map.

```jsx
extraReducers: (builder) => {
  builder
    .addCase(fetchData.pending, state => { state.loading = true; })
    .addCase(fetchData.fulfilled, (state, action) => { state.data = action.payload; });
},
```

## 14. Explain RTK Query and its benefits.

RTK Query is a data-fetching tool in RTK for caching, mutations, and auto-refetching. Benefits: Reduces boilerplate, handles loading/errors, and integrates with Redux DevTools.

```jsx
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getPosts: builder.query({ query: () => "posts" }),
  }),
});
```

## 15. How do you use `useQuery` and `useMutation` hooks in RTK Query?

`useQuery` fetches data with loading/error states. `useMutation` for POST/PUT, returning trigger function and result.

```jsx
const { data, isLoading } = useGetPostsQuery();
const [createPost, { isLoading: creating }] = useCreatePostMutation();
createPost({ title: "New" });
```

## 16. What is entity normalization in Redux?

Normalization stores data by ID (e.g., `{ users: { 1: { name: 'A' } } }`) to avoid duplicates and enable efficient updates. Use RTK's `createEntityAdapter`.

```jsx
import { createEntityAdapter } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();
```

## 17. How do you implement optimistic updates with RTK?

Update state on action dispatch, rollback on failure using `onQueryStarted` in RTK Query mutations or thunk meta.

```jsx
addTodo: builder.mutation({
  async onQueryStarted({ tempId }, { dispatch, queryFulfilled }) {
    const patch = dispatch(
      api.util.updateQueryData("getTodos", undefined, (draft) =>
        draft.push({ id: tempId })
      )
    );
    try {
      await queryFulfilled;
    } catch {
      patch.undo();
    }
  },
});
```

## 18. What is the `shallowEqual` option in `useSelector`?

`shallowEqual` uses shallow comparison for the selected value, preventing re-renders if the slice is structurally unchanged (useful for arrays/objects).

```jsx
const todos = useSelector((state) => state.todos, shallowEqual);
```

## 19. Explain Redux DevTools and RTK integration.

Redux DevTools enables time-travel debugging, action replay, and state inspection. RTK auto-configures it in `configureStore` for non-production.

```jsx
configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});
```

## 20. How do you combine multiple reducers in RTK?

Use `combineReducers` from Redux, passing an object of slice reducers to `configureStore`.

```jsx
import { combineReducers } from "redux";
import todosReducer from "./todosSlice";
import usersReducer from "./usersSlice";

const rootReducer = combineReducers({
  todos: todosReducer,
  users: usersReducer,
});
```

## 21. What are tags in RTK Query?

Tags categorize cache entries for invalidation. `providesTags` marks data, `invalidatesTags` refetches on mutations.

```jsx
getPosts: builder.query({ query: () => 'posts', providesTags: ['Post'] }),
addPost: builder.mutation({ invalidatesTags: ['Post'] }),
```

## 22. How do you handle authentication in Redux?

Store token in state, use middleware to add to headers. RTK Query's `prepareHeaders` injects it dynamically.

```jsx
const baseQuery = fetchBaseQuery({
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set("Authorization", `Bearer ${token}`);
  },
});
```

## 23. Explain `rejectWithValue` in `createAsyncThunk`.

`rejectWithValue` returns custom payload on error instead of throwing, for structured error handling in reducers.

```jsx
createAsyncThunk("fetch", async (_, { rejectWithValue }) => {
  try {
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});
```

## 24. What is the purpose of `batch` in React-Redux?

`batch` groups multiple dispatches into one re-render, optimizing performance.

```jsx
import { batch } from "react-redux";
batch(() => {
  dispatch(action1());
  dispatch(action2());
});
```

## 25. How do you test Redux slices in RTK?

Test reducers/actions with `jest` by dispatching and asserting state. Use `@reduxjs/toolkit` for thunk mocking.

```jsx
test("addTodo", () => {
  const state = { list: [] };
  expect(todosSlice.reducer(state, addTodo("test"))).toEqual({ list: ["test"] });
});
```

## 26. What is RTK's listener middleware?

Listener middleware watches actions and triggers effects (e.g., side effects, debouncing). Added via `configureStore`.

```jsx
import { createListenerMiddleware } from "@reduxjs/toolkit";

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  actionCreator: addTodo,
  effect: () => console.log("Added"),
});
```

## 27. Explain `useLazyQuery` in RTK Query.

`useLazyQuery` returns a trigger function for manual query execution, unlike auto-fetching `useQuery`.

```jsx
const [trigger, { data }] = useLazyGetPostsQuery();
useEffect(() => {
  trigger();
}, [trigger]);
```

## 28. How do you persist Redux state?

Use `redux-persist` with RTK: Wrap reducer with `persistReducer` and add `<PersistGate>`.

```jsx
import { persistReducer } from "redux-persist";
const persisted = persistReducer(config, rootReducer);
```

## 29. What are action creators in Redux?

Functions returning action objects. RTK's `createSlice` auto-generates them from reducers.

```jsx
const addTodo = (text) => ({ type: "ADD_TODO", payload: text });
```

## 30. Explain the `getDefaultMiddleware` in RTK.

`getDefaultMiddleware` provides standard middleware (thunk, serializable, immutable checks). Customize by concatenating.

```jsx
middleware: getDefaultMiddleware().concat(custom),
```

## 31. How do you handle loading states in RTK Query?

Queries return `isLoading`, `isFetching`; mutations return `isLoading`. Combine for global loaders.

```jsx
const { isLoading: postsLoading } = useGetPostsQuery();
const [createPost, { isLoading: createLoading }] = useCreatePostMutation();
```

## 32. What is normalization with `createEntityAdapter`?

`createEntityAdapter` provides CRUD methods for normalized state (by ID), with built-in selectors.

```jsx
const adapter = createEntityAdapter();
const { selectById } = adapter.getSelectors();
```

## 33. Explain `onQueryStarted` in RTK Query.

`onQueryStarted` runs side effects (e.g., optimistic updates) after mutation starts, with `queryFulfilled` for await.

```jsx
onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
  const result = await queryFulfilled;
  // Update cache
},
```

## 34. How do you use `useSelector` with TypeScript?

Type the store and use `useSelector` with generics or typed hooks.

```typescript
import { useAppSelector } from "./hooks"; // Custom typed hook
const count = useAppSelector((state) => state.counter);
```

## 35. What is the `serializableCheck` middleware?

Prevents non-serializable values (e.g., functions) in state/actions, with ignored actions for RTK Query.

```jsx
serializableCheck: { ignoredActions: [api.util.resetApiState] },
```

## 36. Explain RTK Query's `keepUnusedDataFor`.

Sets cache time for unused data before garbage collection (default 60s).

```jsx
getPosts: builder.query({ keepUnusedDataFor: 300 }), // 5 min
```

## 37. How do you debounce actions in Redux?

Use listener middleware or custom thunk with timeouts.

```jsx
const debouncedSearch = debounce((query) => dispatch(search(query)), 300);
```

## 38. What are RTK Query endpoints?

Functions defining queries/mutations, auto-generating hooks and reducer cases.

```jsx
endpoints: builder => ({
  getUser: builder.query({ query: id => `user/${id}` }),
}),
```

## 39. Explain `providesTags` and `invalidatesTags`.

`providesTags` tags cache entries; `invalidatesTags` clears them on success, triggering refetches.

```jsx
providesTags: ['User'],
invalidatesTags: ['User'],
```

## 40. How do you mock RTK Query in tests?

Use `api.util.resetApiState` or mock `fetchBaseQuery`.

```jsx
jest.mock("@reduxjs/toolkit/query", () => ({
  // Mock hooks
}));
```

## 41. What is the difference between Redux and RTK?

Redux is core (store, reducers, actions); RTK is opinionated layer reducing boilerplate and adding utilities like Query.

## 42. Explain Redux middleware.

Functions enhancing dispatch (e.g., logging, async). Chain via `applyMiddleware` or RTK's array.

## 43. How do you access `getState` in thunks?

Pass `{ getState }` as thunk arg for conditional logic.

```jsx
const thunk = () => (dispatch, getState) => {
  if (getState().loaded) return;
  // Fetch
};
```

## 44. What is `unwrap` in RTK thunks?

`unwrap()` on thunk result rejects on error, resolves on success for promise handling.

```jsx
const result = await dispatch(fetchUser()).unwrap();
```

## 45. Explain RTK's `createApi`.

Factory for RTK Query, defining `baseQuery`, `tagTypes`, and `endpoints`.

```jsx
export const api = createApi({ reducerPath: "api", baseQuery, endpoints });
```

## 46. How do you inject endpoints dynamically?

Use `injectEndpoints` to extend `createApi` without redefinition.

```jsx
api.injectEndpoints({ endpoints: newEndpoints });
```

## 47. What is `refetchOnMountOrArgChange` in RTK Query?

Controls refetch on mount or arg change (default true for queries).

```jsx
getPosts: builder.query({ refetchOnMountOrArgChange: 60 }), // Refetch if >60s old
```

## 48. Explain Redux's `compose` for enhancers.

Combines store enhancers (e.g., applyMiddleware, DevTools). RTK's `configureStore` handles internally.

## 49. How do you handle race conditions in thunks?

Use abort signals or request IDs to ignore stale responses.

```jsx
const abortController = new AbortController();
fetch(url, { signal: abortController.signal });
```

## 50. What are best practices for Redux in React apps?

Use RTK for new code; normalize data; memoize selectors; avoid over-fetching with RTK Query; test slices independently.
