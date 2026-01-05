# 50 Most Asked React Query Interview Questions

This Markdown file lists 50 frequently asked interview questions on React Query (now officially TanStack Query v5+), focusing on core concepts, hooks, caching, mutations, optimization, and integration with React. Questions are drawn from common technical interviews. Each includes a detailed explanation, best practices, potential pitfalls, and code examples in JSX/TS for clarity. React Query simplifies server state management with caching, background updates, and deduping.

## 1. What is React Query, and why use it over Redux for server state?

React Query (TanStack Query) is a library for managing server-side state in React apps, handling fetching, caching, synchronization, and updates without manual boilerplate. Unlike Redux (for client state), it focuses on "server state" (data from APIs), providing automatic caching, refetching, and optimistic updates. Use it to avoid Redux's action/reducer overhead for async data; it's declarative and reduces ~90% of server-state code. Pitfall: Not for pure client state like UI toggles—combine with Zustand/Redux if needed.

```jsx
// Installation: npm install @tanstack/react-query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  );
}
```

Setup wraps the app for global query management.

## 2. Explain the core hooks: useQuery, useMutation, and useInfiniteQuery.

`useQuery` fetches and caches data with keys, status (loading/error), and auto-refetch. `useMutation` handles side-effects like POST/PUT, with callbacks for success/error. `useInfiniteQuery` paginates data (e.g., "load more"), using `getNextPageParam`. All use query keys for deduping/caching. Best practice: Use `enabled` for conditional queries. Pitfall: Forgetting keys leads to cache misses.

```jsx
import { useQuery, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUser = (id) => axios.get(`/api/users/${id}`).then((res) => res.data);

// useQuery
function User({ userId }) {
  const { data, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  });
  if (isLoading) return <div>Loading...</div>;
  return <div>{data.name}</div>;
}

// useMutation
const updateUser = useMutation({
  mutationFn: (user) => axios.put(`/api/users/${user.id}`, user),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
});

// useInfiniteQuery
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ["posts"],
  queryFn: ({ pageParam = 1 }) => axios.get(`/api/posts?page=${pageParam}`),
  getNextPageParam: (lastPage) => lastPage.nextPage,
});
```

## 3. What are query keys, and how do they enable caching?

Query keys are unique arrays/objects (e.g., `['user', id]`) identifying queries for caching, deduping, and invalidation. React Query hashes them for storage; changes trigger refetches. Use strings for simple, objects for complex (with `queryKeyHashFn`). Best practice: Include variables (e.g., userId) to cache variants. Pitfall: Mutable keys cause unnecessary refetches—use primitives.

```jsx
// Basic key
const { data } = useQuery({
  queryKey: ["todos", { status: "active" }], // Object key
  queryFn: () => fetchTodos({ status: "active" }),
});

// Invalidation
queryClient.invalidateQueries({ queryKey: ["todos"] }); // Refetches all todo variants
```

## 4. How does React Query handle stale data and refetching?

Data is "stale" after `staleTime` (default 0ms), triggering background refetches on focus/mount/reconnect. `cacheTime` (now `gcTime` in v5) evicts unused data. Set `staleTime: Infinity` for static data. Best practice: Use `refetchOnWindowFocus: false` for PWAs. Pitfall: Short staleTime causes excessive API calls—tune per query.

```jsx
useQuery({
  queryKey: ["posts"],
  queryFn: fetchPosts,
  staleTime: 5 * 60 * 1000, // 5 min
  gcTime: 10 * 60 * 1000, // Evict after 10 min unused
  refetchOnWindowFocus: "always", // Options: true/false/'always'
});
```

## 5. Explain optimistic updates in React Query.

Optimistic updates apply changes to UI immediately (e.g., add to list), then sync with server. Use `onMutate` to rollback on error via `rollbackFn`. Best for fast UX; pair with error boundaries. Pitfall: Race conditions if server rejects—always provide rollback.

```jsx
const addTodo = useMutation({
  mutationFn: addTodoToServer,
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ["todos"] });
    const previousTodos = queryClient.getQueryData(["todos"]);
    queryClient.setQueryData(["todos"], (old) => [...old, newTodo]);
    return { previousTodos }; // For rollback
  },
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(["todos"], context.previousTodos);
  },
  onSettled: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
});
```

## 6. What is query invalidation, and when to use `invalidateQueries` vs `refetchQueries`?

`invalidateQueries` marks data stale, triggering background refetch. `refetchQueries` forces immediate refetch. Use invalidation post-mutation for auto-sync; refetch for manual. Best practice: Invalidate specific keys to avoid over-fetching. Pitfall: Broad invalidation (e.g., `['*']`) hits performance.

```jsx
// After mutation
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['user', userId] }); // Background refetch
  // Or queryClient.refetchQueries({ queryKey: ['user'] }); // Immediate
},
```

## 7. How do you configure a QueryClient, and what are common devtools options?

`QueryClient` manages cache/middleware. Configure with `defaultOptions` for global behaviors (e.g., retry). DevTools: Set `devtools: true` for React Query Devtools panel. Best practice: Singleton client for SSR. Pitfall: Multiple clients cause cache silos—use one provider.

```jsx
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 3, staleTime: 1000 * 60 },
    mutations: { retry: false },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

## 8. Describe pagination with `useInfiniteQuery`.

`useInfiniteQuery` fetches pages via `queryFn` with `pageParam`. `getNextPageParam` extracts next cursor (e.g., last ID). `fetchNextPage` loads more. Best for infinite scrolls; use `initialPageParam`. Pitfall: Forgetting `getPreviousPageParam` breaks bidirectional pagination.

```jsx
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
  queryKey: ["posts"],
  queryFn: ({ pageParam = 0 }) => fetchPosts(pageParam),
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor, // Or pages.length * 10
  initialPageParam: 0,
});

return (
  <div>
    {data.pages.map((page, i) => (
      <div key={i}>
        {page.posts.map((post) => (
          <Post post={post} />
        ))}
      </div>
    ))}
    <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
      {isFetchingNextPage ? "Loading..." : "Load More"}
    </button>
  </div>
);
```

## 9. What are placeholders and initial data in useQuery?

`placeholderData` shows temp data during fetch (optimistic). `initialData` seeds cache, skipping fetch if valid. Use for SSR hydration. Best practice: `initialDataUpdatedAt` for staleness check. Pitfall: Stale initialData without timestamps leads to outdated UI.

```jsx
useQuery({
  queryKey: ["user"],
  queryFn: fetchUser,
  placeholderData: { name: "Loading..." }, // Temp UI
  initialData: { name: "John" }, // From SSR
  initialDataUpdatedAt: Date.now() - 1000 * 60 * 5, // 5 min old
});
```

## 10. Explain error handling and retry in React Query.

Errors populate `error` and `failureCount`. Default retry: 3 times with exponential backoff. Customize per query with `retry: (failureCount, error) => failureCount < 3`. Best: Use `onError` in mutations for toasts. Pitfall: Infinite retries on non-recoverable errors—set `retry: false` for 4xx.

```jsx
const { error, isError } = useQuery({
  queryKey: ["data"],
  queryFn: fetchData,
  retry: 2, // Fixed retries
  // Or function: retry: (fc, err) => err.status !== 404 && fc < 3,
});

if (isError) return <div>Error: {error.message}</div>;
```

## 11. How does React Query integrate with React Suspense?

Wrap queries in `<Suspense fallback={<Spinner />}>`. Queries suspend until resolved, enabling code-splitting. Best for v5+; use `useSuspenseQuery`. Pitfall: Mutations don't suspend—handle separately.

```jsx
import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

function UserProfile() {
  const { data } = useSuspenseQuery({ queryKey: ["user"], queryFn: fetchUser });
  return <div>{data.name}</div>;
}

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile />
    </Suspense>
  );
}
```

## 12. What is the `useQueries` hook for dynamic queries?

`useQueries` runs multiple queries from an array config, useful for lists (e.g., fetch users by IDs). Each gets its key/status. Best: Parallel fetches. Pitfall: No shared cache—use if keys differ.

```jsx
const userIds = [1, 2, 3];
const queries = useQueries({
  queries: userIds.map((id) => ({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
  })),
});

return <div>{queries.map((q) => q.data?.name)}</div>;
```

## 13. Explain mutations with `onSuccess`, `onError`, and `onSettled`.

`onSuccess` runs post-success (e.g., invalidate). `onError` for errors (e.g., toast). `onSettled` always runs (cleanup). Best: Chain for UX flow. Pitfall: Async `onSuccess` without await blocks invalidation.

```jsx
const mutation = useMutation({
  mutationFn: updatePost,
  onSuccess: (data) => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    toast.success("Updated!");
  },
  onError: (err) => toast.error(err.message),
  onSettled: () => console.log("Done"),
});
```

## 14. How do you prefetch data with React Query?

`queryClient.prefetchQuery({ queryKey, queryFn })` loads data into cache proactively (e.g., on hover). Best for perf in lists. Pitfall: Over-prefetching wastes bandwidth—condition on viewport.

```jsx
// In a list item onMouseEnter
const prefetchUser = async (id) => {
  await queryClient.prefetchQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
  });
};
```

## 15. Describe dependent queries (queries that depend on others).

Use `enabled: !!prevData.id` to run only after parent query succeeds. Best for chained fetches (e.g., user -> posts). Pitfall: Circular deps—ensure acyclic.

```jsx
const { data: user } = useQuery({ queryKey: ["user", id], queryFn: fetchUser });
const { data: posts } = useQuery({
  queryKey: ["posts", user?.id],
  queryFn: () => fetchPosts(user.id),
  enabled: !!user?.id, // Dependent
});
```

## 16. What is the role of `select` in useQuery?

`select` transforms fetched data (e.g., extract field), memoized to avoid re-renders. Best for derived state. Pitfall: Non-memoized select recomputes every render.

```jsx
const { data: user } = useQuery({
  queryKey: ["user", id],
  queryFn: fetchUser,
  select: (data) => data.profile.name, // Extract name
});
```

## 17. Explain background refetching and `refetchInterval`.

`refetchInterval` polls at ms intervals (e.g., 30s for live data). Stops on window blur. Best: Use `refetchIntervalInBackground: true` for always-on. Pitfall: High intervals drain battery—use WebSockets for real-time.

```jsx
useQuery({
  queryKey: ["stock"],
  queryFn: fetchStock,
  refetchInterval: 30000, // 30s
  refetchIntervalInBackground: true,
});
```

## 18. How do you handle mutations that don't invalidate queries?

Use `queryClient.setQueryData` for manual updates (e.g., optimistic without full refetch). Best for simple cases; prefer invalidation for consistency. Pitfall: Manual sync drifts from server.

```jsx
const mutation = useMutation({
  mutationFn: updateUser,
  onSuccess: (data) => {
    queryClient.setQueryData(["user", data.id], data); // Manual update
  },
});
```

## 19. What are query filters for invalidation?

`invalidateQueries` accepts filters like `predicate`, `queryKey`, or `status: 'error'`. Best: Filter by exact/active keys. Pitfall: `exact: true` misses variants—use false for partial matches.

```jsx
queryClient.invalidateQueries({
  queryKey: ["todos"],
  predicate: (query) => query.getQueryData() !== undefined, // Only active
});
```

## 20. Explain SSR with React Query (hydration).

Use `Hydrate` and `dehydrate` to serialize state on server, hydrate on client. Best: Prefetch on server with `queryClient`. Pitfall: Mismatch causes double fetches—use `initialData`.

```jsx
// Server (Next.js)
import { dehydrate, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();
await queryClient.prefetchQuery({ queryKey: ["posts"], queryFn: fetchPosts });
const dehydratedState = dehydrate(queryClient);

// Client
import { Hydrate } from "@tanstack/react-query";
<Hydrate state={dehydratedState}>
  <Posts />
</Hydrate>;
```

## 21. How does React Query handle network reconnection?

`refetchOnReconnect: true` (default) refetches on online event. Best: Pair with `navigator.onLine`. Pitfall: No auto-retry for offline queues—use service workers.

```jsx
useQuery({
  queryKey: ["data"],
  queryFn: fetchData,
  refetchOnReconnect: true,
});
```

## 22. What is `useIsFetching` and when to use it?

`useIsFetching` counts active fetches globally or filtered, for global loaders. Best: Show spinner if >0. Pitfall: Counts mutations too—filter with `includePending: false`.

```jsx
import { useIsFetching } from "@tanstack/react-query";

function GlobalLoader() {
  const isFetching = useIsFetching();
  return isFetching > 0 ? <Spinner /> : null;
}
```

## 23. Explain `queryClient.cancelQueries` for aborting.

Cancels in-flight queries by key/filter, useful on unmount to prevent leaks. Best: In `useEffect` cleanup. Pitfall: Aborts don't rollback—handle manually.

```jsx
useEffect(() => {
  return () => queryClient.cancelQueries({ queryKey: ["search", query] });
}, [query]);
```

## 24. How do you integrate React Query with Axios or Fetch?

Pass as `queryFn`, handling promises. Best: Create reusable fns with auth. Pitfall: Forgetting `.then(res => res.data)` leaks raw responses.

```jsx
const queryFn = ({ queryKey }) => {
  const [, id] = queryKey;
  return axios.get(`/api/users/${id}`).then((res) => res.data);
};
```

## 25. What are stale-while-revalidate patterns in React Query?

Serve cached (stale) data immediately, refetch in background. Default behavior with `staleTime > 0`. Best: Set high for images/static. Pitfall: No `placeholderData` shows blank during initial.

```jsx
useQuery({
  queryKey: ["static"],
  queryFn: fetchStatic,
  staleTime: Infinity, // Never stale, but gcTime applies
});
```

## 26. Describe `useMutationKey` and multiple mutations.

`useMutationKey` tracks mutation state by key. Best: For optimistic UI with shared state. Pitfall: Rare use—prefer `useMutation` for most.

```jsx
const mutationKey = ["updateUser", userId];
const { status } = useMutation({ mutationKey, mutationFn: update });
```

## 27. How do you test React Query components?

Wrap in `<QueryClientProvider>` with mocked client (`setQueryData`). Use `@tanstack/react-query` testing utils. Best: Mock `queryFn` with MSW. Pitfall: Tests fetch real APIs—always mock.

```jsx
import { render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
client.setQueryData(["user", 1], { name: "Test" });

render(
  <QueryClientProvider client={client}>
    <User id={1} />
  </QueryClientProvider>
);
```

## 28. Explain `structuralSharing` in React Query cache.

Cache uses immutable updates with structural sharing (shared unchanged parts between old/new data). Best: Enables efficient diffs. Pitfall: Mutating data breaks sharing—always return new objects.

```jsx
// Auto-handled; queryFn must return immutable data
queryFn: () => ({ ...oldData, newField: value }); // Shares structure
```

## 29. What is `useQueryWithSuspense` (v5)?

Alias for `useSuspenseQuery`, throws promise on loading for Suspense. Best: Streamlined Suspense integration. Pitfall: No `isLoading`—handle in fallback.

```jsx
const { data } = useSuspenseQuery({ queryKey: ["data"], queryFn });
```

## 30. How do you handle file uploads with mutations?

Use `FormData` in `mutationFn`, track progress with Axios `onUploadProgress`. Best: Update local state in `onMutate`. Pitfall: No built-in progress—custom hook needed.

```jsx
const upload = useMutation({
  mutationFn: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post("/upload", formData, {
      onUploadProgress: (p) => setProgress(p.loaded / p.total),
    });
  },
});
```

## 31. Explain query deduping.

Same key runs once; duplicates use cache. Best: Prevents API spam on rapid mounts. Pitfall: Background refetches still dedupe.

```jsx
// Two components with ['user', 1] share one fetch
```

## 32. What are global callbacks like `onError` in QueryClient?

`queryCache.onError` runs on any query error. Best: Global logging/toasts. Pitfall: Overrides per-query handlers—use carefully.

```jsx
queryClient.setDefaultOptions({
  queries: {
    onError: (error) => toast.error(error.message),
  },
});
```

## 33. How does React Query work with React Router?

Use `useParams` in keys for route-based queries. Best: Invalidate on route changes via `useEffect`. Pitfall: No auto-sync—manual invalidation needed.

```jsx
const { id } = useParams();
useQuery({ queryKey: ["post", id], queryFn: () => fetchPost(id) });
```

## 34. Describe `meta` in query/mutation options.

`meta` stores arbitrary data (e.g., { persist: true }). Best: Custom behaviors. Pitfall: Not serialized—avoid complex objects.

```jsx
useQuery({
  queryKey: ["data"],
  meta: { priority: "high" },
  // Use in middleware
});
```

## 35. What is `usePrefetchInfiniteQuery`?

Prefetches first page of infinite query. Best: For lists on hover. Pitfall: Limited to initial—prefetch full with loop.

```jsx
queryClient.prefetchInfiniteQuery({
  queryKey: ["posts"],
  queryFn: ({ pageParam }) => fetchPage(pageParam),
});
```

## 36. Explain retry delays and backoff.

`retryDelay` function computes ms between retries (default exponential). Best: `retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)`. Pitfall: No delay causes thundering herd.

```jsx
useQuery({
  retry: true,
  retryDelay: (attempt) => attempt * 100,
});
```

## 37. How do you use React Query with TypeScript?

Type `queryFn` returns and use generics in hooks. Best: `@tanstack/react-query` types infer from keys. Pitfall: Loose typing on complex data—define interfaces.

```tsx
interface User {
  id: number;
  name: string;
}
const fetchUser = (id: number): Promise<User> =>
  axios.get(`/user/${id}`).then((r) => r.data);

const { data } = useQuery<User>({ queryKey: ["user", id], queryFn: () => fetchUser(id) });
```

## 38. What is the `observer` effect in React Query?

Queries auto-refetch on mount if stale. Best: Keeps data fresh. Pitfall: Disable with `refetchOnMount: false` for expensive queries.

```jsx
useQuery({
  refetchOnMount: false,
});
```

## 39. Explain `useMutationState` (v5).

Tracks mutation status without full hook (e.g., for shared state). Best: In Zustand/Recoil. Pitfall: Manual key management.

```jsx
import { useMutationState } from "@tanstack/react-query";
const isPending = useMutationState({
  filters: { mutationKey: ["update"] },
  select: (s) => s.status === "pending",
});
```

## 40. How do you reset the entire cache?

`queryClient.clear()` or `queryClient.resetQueries({ type: 'all' })`. Best: On logout. Pitfall: Loses all data—use selectively.

```jsx
queryClient.clear(); // Full reset
```

## 41. Describe integration with SWR-like patterns.

React Query is SWR-inspired but more feature-rich (mutations, infinite). Best: Migrate by mapping `useSWR` to `useQuery`. Pitfall: SWR's simpler for tiny apps.

## 42. What are focused query filters?

`isFocused` refetches on focus if stale. Best: For tabs/apps. Pitfall: Mobile blur on app switch—disable if needed.

```jsx
useQuery({
  refetchOnWindowFocus: true,
});
```

## 43. Explain `throwOnError` in v5.

If true (default false), errors throw for error boundaries. Best: With `<ErrorBoundary>`. Pitfall: Breaks non-boundary components.

```jsx
useQuery({
  throwOnError: true,
});
```

## 44. How do you handle concurrent mutations?

Mutations dedupe by key if same vars. Best: Use unique keys for variants. Pitfall: No built-in queue—custom logic for order.

```jsx
mutationKey: ['update', id, version],
```

## 45. What is `queryClient.getQueryData`?

Retrieves cached data without subscribing. Best: For prefetch checks. Pitfall: Undefined if not cached—default to null.

```jsx
const data = queryClient.getQueryData(["user", 1]);
```

## 46. Explain garbage collection in React Query.

`gcTime` evicts inactive queries. Best: Set per-query for memory. Pitfall: Short gcTime loses cache—balance with staleTime.

## 47. How do you use React Query in dev mode with logging?

`logger` option in QueryClient for query logs. Best: Console-based debugging. Pitfall: Prod disable to avoid noise.

```jsx
new QueryClient({
  queryCache: { onError: () => console.error("Query error") },
});
```

## 48. Describe `useHydrated` for SSR.

Custom hook checks if hydrated (client-mounted). Best: Hide server-only mismatches. Pitfall: Flash of wrong content—use placeholders.

```jsx
// Polyfill or useEffect for !isServer
```

## 49. What are best practices for large-scale React Query apps?

Use query keys consistently; dedupe fns; optimistic everywhere; RTK Query if Redux-integrated; monitor with DevTools. Avoid: Global invalidations, no typing.

## 50. How does React Query compare to Apollo Client?

React Query is agnostic (any API), lighter for REST; Apollo for GraphQL with schema. Best: Query for flexibility, Apollo for typed queries. Pitfall: No built-in schema—manual typing in Query.
