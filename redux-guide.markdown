# Redux and Redux Toolkit with React: From Basic to Advanced

This guide covers Redux and Redux Toolkit integration with React, from basic to advanced concepts, including managing multiple slices and using TypeScript. It includes practical examples and best practices for managing state in React applications.

## Table of Contents
1. [Introduction to Redux](#introduction-to-redux)
2. [Setting Up Redux with React](#setting-up-redux-with-react)
3. [Introduction to Redux Toolkit](#introduction-to-redux-toolkit)
4. [Basic Redux Toolkit Setup](#basic-redux-toolkit-setup)
5. [Intermediate Concepts](#intermediate-concepts)
6. [Advanced Techniques](#advanced-techniques)
7. [Managing Multiple Slices](#managing-multiple-slices)
8. [Using Redux Toolkit with TypeScript](#using-redux-toolkit-with-typescript)
9. [Best Practices](#best-practices)
10. [Example Application](#example-application)
11. [Common Pitfalls and Solutions](#common-pitfalls-and-solutions)

## Introduction to Redux

Redux is a predictable state container for JavaScript applications, commonly used with React to manage application state. It follows three core principles:
- **Single Source of Truth**: The entire state is stored in a single object tree.
- **State is Read-Only**: State can only be changed by dispatching actions.
- **Changes via Pure Functions**: Reducers are pure functions that specify how state changes in response to actions.

### Key Concepts
- **Store**: Holds the entire state tree.
- **Actions**: Payloads that describe state changes (e.g., `{ type: 'ADD_TODO', payload: 'Learn Redux' }`).
- **Reducers**: Pure functions that take the current state and an action, returning a new state.
- **Dispatch**: Method to send actions to the store.
- **Selectors**: Functions to extract specific pieces of state.

## Setting Up Redux with React

### Installation
Install Redux and React-Redux:
```bash
npm install redux react-redux
```

### Basic Example
Create a simple counter application using vanilla Redux.

#### Store Setup (`store.js`)
```javascript
import { createStore } from 'redux';

// Initial state
const initialState = { count: 0 };

// Reducer
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// Create store
const store = createStore(counterReducer);

export default store;
```

#### Connecting to React (`App.jsx`)
```javascript
import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './store';

const Counter = () => {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);

export default App;
```

## Introduction to Redux Toolkit

Redux Toolkit (RTK) is the official, opinionated toolset for efficient Redux development. It simplifies setup, reduces boilerplate, and includes best practices by default.

### Why Use Redux Toolkit?
- Simplifies store setup with `configureStore`.
- Reduces boilerplate with `createSlice` for actions and reducers.
- Includes utilities like `createAsyncThunk` for async operations.
- Built-in immutability helpers via Immer.

### Installation
```bash
npm install @reduxjs/toolkit react-redux
```

## Basic Redux Toolkit Setup

### Creating a Slice (`counterSlice.js`)
A slice combines reducers and actions for a specific feature.

```javascript
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1; // Immer allows mutable-like updates
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

### Configuring the Store (`store.js`)
```javascript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
```

### Using in React (`App.jsx`)
```javascript
import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './store';
import { increment, decrement, incrementByAmount } from './counterSlice';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Add 5</button>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);

export default App;
```

## Intermediate Concepts

### Async Operations with `createAsyncThunk`
Handle asynchronous logic like API calls.

#### Example Hawkesbury River
```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await response.json();
  return data.slice(0, 5); // Limit to 5 todos
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default todoSlice.reducer;
```

#### Update Store (`store.js`)
```javascript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import todoReducer from './todoSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
  },
});

export default store;
```

#### Using in Component (`TodoList.jsx`)
```javascript
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos } from './todoSlice';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h2>Todos</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
```

### Selectors with `createSelector`
Optimize performance by memoizing derived state.

```javascript
import { createSelector } from '@reduxjs/toolkit';

export const selectCompletedTodos = createSelector(
  [(state) => state.todos.items],
  (todos) => todos.filter((todo) => todo.completed)
);
```

#### Usage in Component
```javascript
const completedTodos = useSelector(selectCompletedTodos);
```

## Advanced Techniques

### Middleware Customization
Add custom middleware for logging or analytics.

```javascript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import todoReducer from './todoSlice';

const loggerMiddleware = (store) => (next) => (action) => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next state:', store.getState());
  return result;
};

const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;
```

### RTK Query for Data Fetching
RTK Query simplifies API interactions.

#### Setup (`apiSlice.js`)
```javascript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => '/todos?_limit=5',
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: '/todos',
        method: 'POST',
        body: newTodo,
      }),
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation } = apiSlice;
```

#### Update Store (`store.js`)
```javascript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import todoReducer from './todoSlice';
import { apiSlice } from './apiSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
```

#### Using RTK Query in Component (`TodoListRTK.jsx`)
```javascript
import React from 'react';
import { useGetTodosQuery, useAddTodoMutation } from './apiSlice';

const TodoListRTK = () => {
  const { data: todos, isLoading, error } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();

  const handleAddTodo = async () => {
    await addTodo({ title: 'New Todo', completed: false });
  };

  return (
    <div>
      <h2>RTK Query Todos</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default TodoListRTK;
```

### Normalizing State
For large datasets, normalize state to avoid duplication and improve performance.

#### Example: Normalized Todo State
```javascript
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {
    addTodo: (state, action) => {
      const { id, title } = action.payload;
      state.byId[id] = { id, title, completed: false };
      state.allIds.push(id);
    },
  },
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
```

## Managing Multiple Slices

In larger applications, you'll manage multiple slices (e.g., counter, todos, users). Here's how to organize and combine them effectively:

### Organizing Slices
- **Feature-Based Structure**: Group slices by feature (e.g., `features/counter/`, `features/todos/`).
- **Combine Reducers**: Use `configureStore` to combine multiple reducers into a single store.

#### Example: Combining Slices (`store.js`)
```javascript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todoReducer from '../features/todos/todoSlice';
import userReducer from '../features/users/userSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in specific actions
        ignoredActions: ['your/action/type'],
        ignoredPaths: ['some.nested.path'],
      },
    }),
});

export default store;
```

### Cross-Slice Interactions
- **Selectors for Shared Data**: Use selectors to access state from other slices.
- **Thunks for Complex Logic**: Use `createAsyncThunk` or thunks to dispatch actions across slices.

#### Example: Thunk with Multiple Slices
```javascript
import { createAsyncThunk } from '@reduxjs/toolkit';
import { increment } from '../counter/counterSlice';
import { addTodo } from '../todos/todoSlice';

export const addTodoAndIncrement = createAsyncThunk(
  'combined/addTodoAndIncrement',
  async (todo, { dispatch }) => {
    dispatch(addTodo(todo));
    dispatch(increment());
    return todo;
  }
);
```

### Tips for Managing Multiple Slices
- **Modularize Code**: Keep each slice in its own file/folder.
- **Use Namespacing**: Prefix action types with slice names (e.g., `todos/addTodo`) to avoid conflicts.
- **State Normalization**: Normalize state for related data across slices to reduce redundancy.
- **Avoid Circular Dependencies**: Ensure slices don't import each other in a circular manner.

## Using Redux Toolkit with TypeScript

TypeScript enhances Redux Toolkit by providing type safety for state, actions, and selectors. Here's how to integrate TypeScript effectively.

### Installation
```bash
npm install typescript @types/react @types/react-redux
```

### Typing the Store (`store.ts`)
```typescript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todoReducer from '../features/todos/todoSlice';

// Define RootState type
export type RootState = {
  counter: { value: number };
  todos: { items: { id: number; title: string; completed: boolean }[]; status: 'idle' | 'loading' | 'succeeded' | 'failed'; error: string | null };
};

const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
```

### Typing a Slice (`counterSlice.ts`)
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = { value: 0 };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

### Typing Async Thunks (`todoSlice.ts`)
```typescript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoState {
  items: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TodoState = { items: [], status: 'idle', error: null };

export const fetchTodos = createAsyncThunk<Todo[], void>(
  'todos/fetchTodos',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    return data.slice(0, 5);
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch todos';
      });
  },
});

export default todoSlice.reducer;
```

### Typing Selectors
```typescript
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectCompletedTodos = createSelector(
  [(state: RootState) => state.todos.items],
  (todos): Todo[] => todos.filter((todo) => todo.completed)
);
```

### Typing React Components (`TodoList.tsx`)
```typescript
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos } from './todoSlice';
import { RootState, AppDispatch } from '../store';

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.items);
  const status = useSelector((state: RootState) => state.todos.status);
  const error = useSelector((state: RootState) => state.todos.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h2>Todos</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
```

### Typing RTK Query (`apiSlice.ts`)
```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => '/todos?_limit=5',
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (newTodo) => ({
        url: '/todos',
        method: 'POST',
        body: newTodo,
      }),
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation } = apiSlice;
```

### TypeScript Best Practices
- **Define State Interfaces**: Clearly define state shapes for each slice.
- **Use PayloadAction**: Specify action payload types with `PayloadAction<T>`.
- **RootState Type**: Centralize the root state type in `store.ts`.
- **AppDispatch Type**: Use for typed dispatch in components.
- **Avoid Any**: Minimize use of `any` to maintain type safety.
- **Typed Hooks**: Use `useSelector` with `RootState` and `useDispatch` with `AppDispatch`.

## Best Practices

- **Use Redux Toolkit**: Always prefer RTK over vanilla Redux for less boilerplate and better defaults.
- **Normalize State**: For complex data, use normalized state to improve performance.
- **Use RTK Query for APIs**: Simplifies data fetching and caching.
- **Avoid Overusing Redux**: Use local component state for UI-specific state (e.g., form inputs).
- **Type Safety**: Use TypeScript for type-safe actions, reducers, and selectors.
- **Immer for Immutability**: Leverage Immer (included in RTK) for simpler state updates.
- **Organize Slices by Feature**: Group related state, actions, and reducers into feature slices.
- **Modularize Slices**: Keep slices independent to avoid tight coupling.
- **Use Selectors**: Encapsulate state access logic for reusability and performance.

## Example Application

A complete example combining counter and todos with RTK Query.

### File Structure
```
src/
├── features/
│   ├── counter/
│   │   └── counterSlice.ts
│   ├── todos/
│   │   └── todoSlice.ts
│   ├── api/
│   │   └── apiSlice.ts
│   └── users/
│       └── userSlice.ts
├── store.ts
├── App.tsx
└── index.ts
```

### Main App (`App.tsx`)
```typescript
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Counter from './features/counter/Counter';
import TodoList from './features/todos/TodoList';
import TodoListRTK from './features/api/TodoListRTK';

const App: React.FC = () => (
  <Provider store={store}>
    <div>
      <h1>Redux Toolkit Example</h1>
      <Counter />
      <TodoList />
      <TodoListRTK />
    </div>
  </Provider>
);

export default App;
```

## Common Pitfalls and Solutions

1. **Mutating State Directly**
   - **Problem**: Directly mutating state in reducers causes bugs.
   - **Solution**: Use Immer (included in RTK) or return new state objects.

2. **Overfetching Data**
   - **Problem**: Repeated API calls slow down the app.
   - **Solution**: Use RTK Query for caching and deduplication.

3. **Complex Selectors**
   - **Problem**: Nested state access leads to performance issues.
   - **Solution**: Use `createSelector` for memoized selectors.

4. **Large Reducers**
   - **Problem**: Large reducers are hard to maintain.
   - **Solution**: Split into feature-based slices.

5. **Async Logic in Components**
   - **Problem**: Mixing async logic in components makes them complex.
   - **Solution**: Use `createAsyncThunk` or RTK Query.

6. **Slice Dependencies**
   - **Problem**: Tight coupling between slices leads to maintenance issues.
   - **Solution**: Use thunks or selectors to access cross-slice data.

7. **Type Errors in TypeScript**
   - **Problem**: Incorrect or missing types cause compilation errors.
   - **Solution**: Define precise interfaces for state and actions, and use `RootState` and `AppDispatch`.

## Conclusion

Redux Toolkit streamlines state management in React applications by reducing boilerplate and enforcing best practices. Managing multiple slices by feature keeps code modular and maintainable. TypeScript enhances reliability with type-safe state, actions, and selectors. Start with basic slices and thunks, adopt RTK Query for APIs, and use TypeScript for scalability. Follow best practices to ensure clean, performant code.

For further learning:
- [Official Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Redux Essentials Tutorial](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)
- [RTK Query Guide](https://redux-toolkit.js.org/rtk-query/overview)
- [Redux Toolkit TypeScript Guide](https://redux-toolkit.js.org/usage/usage-with-typescript)