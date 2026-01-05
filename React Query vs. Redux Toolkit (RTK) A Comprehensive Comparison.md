# React Query vs. Redux Toolkit (RTK): A Comprehensive Comparison

This Markdown guide compares **React Query** (now TanStack Query v5+) and **Redux Toolkit (RTK)**, focusing on their use for server-state management in React apps. RTK is a full state management library with RTK Query for data fetching; React Query is a dedicated data-fetching and caching library. Both reduce boilerplate but differ in scope, API, and philosophy. React Query excels in simplicity for API-heavy apps; RTK suits apps already using Redux for client state.

The comparison covers key dimensions: setup, core features, caching, mutations, performance, testing, and more. Use this to decide based on app needs (e.g., React Query for greenfield REST apps; RTK for Redux-integrated or complex client state).

## Overview Table

| Aspect                   | React Query (TanStack Query)                              | Redux Toolkit (RTK) with RTK Query                |
| ------------------------ | --------------------------------------------------------- | ------------------------------------------------- |
| **Primary Purpose**      | Server-state management (fetching, caching, sync)         | Full state management; RTK Query for server state |
| **Scope**                | Focused on queries/mutations; no client state             | Global client + server state; RTK Query optional  |
| **Learning Curve**       | Low: Declarative hooks, minimal config                    | Medium: Redux concepts + RTK Query learning       |
| **Bundle Size**          | ~10-15kB minified                                         | ~20-30kB (full RTK; RTK Query ~15kB)              |
| **Best For**             | API-heavy apps, rapid prototyping                         | Large apps with Redux ecosystem, normalized state |
| **SSR Support**          | Excellent via `Hydrate`/`dehydrate`                       | Good via `persistReducer` or manual hydration     |
| **Community/ Ecosystem** | High adoption for data fetching; integrates with anything | Official Redux backing; deep TypeScript support   |

## Detailed Comparison

### 1. Setup and Configuration

React Query requires a `QueryClient` wrapped in `QueryClientProvider`. Minimal: Just provide the client. Customize defaults (e.g., retry, staleTime) globally.

RTK uses `configureStore` for the Redux store, injecting RTK Query via `reducerPath`. More setup if using full Redux, but RTK Query integrates seamlessly.

**Pros/Cons**: React Query is faster to start (no store concept); RTK ties into existing Redux for unified state.

```jsx
// React Query Setup
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
});
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>;

// RTK Setup (with RTK Query)
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api"; // RTK Query createApi
export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (gdm) => gdm().concat(api.middleware),
});
<Provider store={store}>
  <App />
</Provider>;
```

### 2. Core Hooks/API

React Query's `useQuery` for GET (with status like `isLoading`), `useMutation` for POST/PUT, `useInfiniteQuery` for pagination. Declarative; returns data/status directly.

RTK Query's `useGetUsersQuery()` (auto-generated from endpoints), `useAddUserMutation()`. Redux-style: Selectors via `useSelector` if needed, but hooks return similar status.

**Pros/Cons**: React Query is more intuitive (direct data access); RTK Query feels Redux-y but generates typed hooks.

```jsx
// React Query: useQuery
const { data, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: () => fetch("/api/users"),
});

// RTK Query: Auto-generated
const { data, isLoading } = useGetUsersQuery(); // From endpoints: builder.query({ query: () => '/api/users' })
```

### 3. Caching and Deduping

Both cache by key (arrays/objects). React Query defaults to infinite cache (gcTime: 5min unused); auto-deduplicates in-flight requests. Stale-while-revalidate: Serve cache, refetch background.

RTK Query caches similarly (keepUnusedDataFor: 60s default), with tags for invalidation. Dedupes via Redux store.

**Pros/Cons**: React Query's cache is more aggressive/optimistic; RTK's is Redux-integrated for normalization (e.g., entities by ID).

```jsx
// React Query: Key-based
useQuery({ queryKey: ['user', id], ... });

// RTK Query: Tag-based invalidation
getUsers: builder.query({ providesTags: ['User'] }),
addUser: builder.mutation({ invalidatesTags: ['User'] }),
```

### 4. Mutations and Optimistic Updates

React Query: `useMutation` with `onMutate` for optimistic (manual setQueryData + rollback). Invalidate post-success.

RTK Query: `onQueryStarted` for optimistic (patch cache, await, undo on error). Auto-invalidates via tags.

**Pros/Cons**: RTK Query's tags simplify invalidation; React Query's manual control is flexible but verbose.

```jsx
// React Query Optimistic
const mutation = useMutation({
  onMutate: async (newUser) => {
    const prev = queryClient.getQueryData(['users']);
    queryClient.setQueryData(['users'], [...prev, newUser]);
    return { prev };
  },
  onError: (_, __, ctx) => queryClient.setQueryData(['users'], ctx.prev),
});

// RTK Query Optimistic
addUser: builder.mutation({
  async onQueryStarted(newUser, { dispatch, queryFulfilled }) {
    const patch = dispatch(api.util.updateQueryData('getUsers', undefined, draft => draft.push(newUser)));
    try { await queryFulfilled; } catch { patch.undo(); }
  },
}),
```

### 5. Pagination and Infinite Queries

React Query: `useInfiniteQuery` with `getNextPageParam`; `fetchNextPage` for "load more". Handles bidirectional.

RTK Query: Manual via `query` params (e.g., page arg); no built-in infinite—use `useLazyQuery` + state.

**Pros/Cons**: React Query wins for infinite scrolls; RTK Query requires more glue code.

```jsx
// React Query Infinite
useInfiniteQuery({ queryFn: ({ pageParam }) => fetch(`/posts?page=${pageParam}`), getNextPageParam: last => last.next });

// RTK Query Pagination
getPosts: builder.query({ query: (page = 1) => `/posts?page=${page}` }),
const { data } = useGetPostsQuery(2); // Manual page
```

### 6. Error Handling and Retries

Both: Retry with count/delay (exponential default). Errors in `error` prop; global `onError`.

React Query: Per-query `retry: false` for 4xx; throws for boundaries.

RTK Query: `rejectWithValue` for custom; middleware for logging.

**Pros/Cons**: Similar; React Query's `throwOnError` integrates better with Suspense.

### 7. Performance and Bundle Size

React Query: Lightweight, no Redux overhead; efficient cache (structural sharing). Re-renders only on data change.

RTK: Heavier if using full Redux; RTK Query alone is comparable. Memoized selectors prevent unnecessary renders.

**Pros/Cons**: React Query lighter for pure data apps; RTK scales for complex state trees.

### 8. TypeScript Support

Both excellent: React Query infers from `queryFn` return; RTK Query generates types from endpoints.

**Pros/Cons**: RTK edges out with entity adapters for normalized TS types.

```tsx
// React Query TS
const { data } = useQuery<User[]>({ queryKey: ["users"], queryFn: () => fetchUsers() });

// RTK Query TS (generated)
interface User {
  id: number;
  name: string;
}
const { data } = useGetUsersQuery(); // Typed as User[]
```

### 9. Testing

React Query: Mock `queryClient` with `setQueryData`; wrap in provider. Use MSW for API mocks.

RTK Query: Mock store/thunks; `@reduxjs/toolkit` utils for slices.

**Pros/Cons**: Both straightforward; React Query simpler without Redux mocks.

### 10. SSR and Hydration

React Query: `dehydrate` server state, `Hydrate` on client. Handles mismatches with `initialData`.

RTK: Manual serialization or `redux-persist`; RTK Query supports via store hydration.

**Pros/Cons**: React Query more seamless for data-only SSR (e.g., Next.js).

### 11. DevTools and Debugging

React Query: Official DevTools for cache inspection, timelines.

RTK: Redux DevTools + RTK Query tab for queries/actions.

**Pros/Cons**: Both strong; RTK's ties to Redux for full app tracing.

### 12. Integration with Other Libraries

React Query: Agnostic; pairs with Zustand for client state, React Router for params.

RTK: Best in Redux apps; can standalone but awkward without.

**Pros/Cons**: React Query more flexible for mixed stacks.

### 13. Community and Maintenance

React Query: Tanner Linsley (TkDodo); 40k+ stars, active v5.

RTK: Redux team (Mark Erikson); 10k+ stars, stable.

**Pros/Cons**: React Query faster evolution; RTK more battle-tested in enterprise.

## When to Choose Which?

- **React Query**: New apps, REST/GraphQL fetching focus, minimal setup. Avoid if deep Redux investment.
- **RTK (with Query)**: Existing Redux codebase, need normalized client/server state, enterprise scale.
- **Hybrid**: Use React Query for data, Redux/Zustand for UI state.

For migration: From Redux to React Query, extract async to queries; reverse: Wrap RTK Query in store.

This comparison is based on v5 (React Query) and latest RTK (2.x) as of 2026—check docs for updates.
