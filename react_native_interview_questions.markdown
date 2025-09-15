# Top 100 React Native Interview Questions with Detailed Answers (2025)

This document compiles the 100 most frequently asked React Native interview questions, ranging from beginner to advanced levels, with detailed answers. Each question includes an explanation, practical examples, and use cases to help you prepare for React Native developer interviews. The questions are curated based on recent trends and insights from various sources, ensuring relevance for 2025.[](https://www.igmguru.com/blog/react-native-interview-questions)[](https://www.reddit.com/r/reactnative/comments/1dk5hbb/expected_react_native_interview_questions_for_15/)[](https://medium.com/%40anandgaur2207/top-react-native-interview-questions-with-answer-c5b59ccdd9f0)

---

## Table of Contents
1. [Beginner Questions (1-30)](#beginner-questions)
2. [Intermediate Questions (31-60)](#intermediate-questions)
3. [Advanced Questions (61-100)](#advanced-questions)

---

## Beginner Questions

### 1. What is React Native?
**Answer**: React Native is an open-source framework developed by Meta for building native mobile applications using JavaScript and React. It allows developers to create cross-platform apps for iOS and Android using a single codebase, rendering native UI components for a native-like user experience.

**Details**: Unlike React, which targets web browsers, React Native uses native components (e.g., `<View>`, `<Text>`) instead of HTML elements. It leverages the React component-based architecture and JavaScript to deliver high-performance apps with near-native capabilities.

**Example**:
```jsx
import React from 'react';
import { View, Text } from 'react-native';

const App = () => {
  return (
    <View>
      <Text>Hello, React Native!</Text>
    </View>
  );
};
export default App;
```

**Use Case**: Building cross-platform apps with reusable code, reducing development time and cost.[](https://medium.com/%40reactmasters.in/react-native-interview-questions-and-answers-9ba9bbca6e3f)[](https://medium.com/%40anandgaur2207/top-react-native-interview-questions-with-answer-c5b59ccdd9f0)

---

### 2. How does React Native differ from React?
**Answer**: React is a JavaScript library for building web user interfaces, while React Native is a framework for building native mobile apps using React principles.

**Details**:
- **Rendering**: React renders HTML to the browser’s DOM, while React Native renders native components (e.g., `<View>` instead of `<div>`).
- **Styling**: React uses CSS, while React Native uses JavaScript-based styles with `StyleSheet`.
- **Platform APIs**: React Native interacts with native APIs (e.g., camera, GPS) via a bridge, unlike React’s web APIs.
- **Codebase**: React Native enables cross-platform mobile apps, while React focuses on web apps.

**Use Case**: Use React for web apps and React Native for mobile apps requiring native performance.[](https://www.turing.com/interview-questions/react-native)[](https://medium.com/%40reactmasters.in/react-native-interview-questions-and-answers-9ba9bbca6e3f)

---

### 3. What is JSX in React Native?
**Answer**: JSX (JavaScript XML) is a syntax extension that allows writing HTML-like code within JavaScript. In React Native, JSX represents native components like `<View>` and `<Text>` rather than HTML elements.

**Details**: JSX combines the expressiveness of JavaScript with a template-like syntax, making it easier to describe UI structures. It’s transpiled to JavaScript by tools like Babel.

**Example**:
```jsx
import React from 'react';
import { View, Text } from 'react-native';

const App = () => (
  <View>
    <Text>Welcome to JSX in React Native!</Text>
  </View>
);
export default App;
```

**Use Case**: Simplifies UI development by allowing developers to write declarative UI code.[](https://www.igmguru.com/blog/react-native-interview-questions)[](https://medium.com/%40anandgaur2207/top-react-native-interview-questions-with-answer-c5b59ccdd9f0)

---

### 4. What are the core components in React Native?
**Answer**: Core components are built-in React Native components used to create UI, such as `<View>`, `<Text>`, `<Image>`, `<TextInput>`, `<ScrollView>`, `<FlatList>`, and `<TouchableOpacity>`.

**Details**: These components map to native UI elements, ensuring platform-specific rendering. For example, `<View>` is a container like `<div>`, and `<Text>` displays text like `<p>`.

**Example**:
```jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const App = () => (
  <View>
    <Text>Core Component Example</Text>
    <TouchableOpacity onPress={() => alert('Pressed!')}>
      <Text>Click Me</Text>
    </TouchableOpacity>
  </View>
);
export default App;
```

**Use Case**: Building basic UI layouts and handling user interactions.[](https://www.igmguru.com/blog/react-native-interview-questions)

---

### 5. What is the purpose of `StyleSheet` in React Native?
**Answer**: The `StyleSheet` module in React Native is used to define and manage styles efficiently, optimizing performance by creating immutable stylesheet references.

**Details**: Unlike CSS, React Native styles are written in JavaScript. `StyleSheet.create` assigns IDs to styles, reducing redundant object creation and enabling native-side processing.

**Example**:
```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Styled Text</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, color: 'blue' },
});
export default App;
```

**Use Case**: Styling UI components consistently across platforms.[](https://www.turing.com/interview-questions/react-native)[](https://www.toptal.com/react-native/interview-questions)

---

### 6. How does React Native handle cross-platform development?
**Answer**: React Native enables cross-platform development by using a single JavaScript codebase that compiles to native code for iOS and Android, leveraging platform-specific components.

**Details**: It uses a bridge to communicate between JavaScript and native code, allowing access to device features (e.g., camera, GPS). Platform-specific code can be written using conditional logic or separate files (e.g., `Component.ios.js`, `Component.android.js`).

**Example**:
```jsx
import { Platform, Text } from 'react-native';

const App = () => (
  <Text>
    {Platform.OS === 'ios' ? 'Running on iOS' : 'Running on Android'}
  </Text>
);
```

**Use Case**: Developing apps that work seamlessly on both iOS and Android with minimal platform-specific code.[](https://www.igmguru.com/blog/react-native-interview-questions)

---

### 7. What is the Virtual DOM in React Native?
**Answer**: The Virtual DOM is an in-memory representation of the UI used by React and React Native to optimize rendering by minimizing direct manipulations of native components.

**Details**: When state or props change, React Native creates a new Virtual DOM tree, compares it with the previous one (reconciliation), and updates only the changed native UI elements via the bridge.

**Use Case**: Improves performance by reducing costly native UI updates.[](https://www.turing.com/interview-questions/react-native)

---

### 8. What is the React Native bridge?
**Answer**: The bridge is an asynchronous communication layer that enables JavaScript to interact with native code (Java/Objective-C/Swift) in React Native.

**Details**: JavaScript runs on a separate thread, and the bridge facilitates data exchange for tasks like rendering UI or accessing device features. It handles asynchronous calls to native modules, ensuring smooth performance.

**Use Case**: Accessing native APIs (e.g., camera, notifications) from JavaScript.[](https://www.turing.com/interview-questions/react-native)[](https://www.igmguru.com/blog/react-native-interview-questions)

---

### 9. What is the purpose of `useState` hook in React Native?
**Answer**: The `useState` hook is used in functional components to manage state, enabling dynamic UI updates when state changes.

**Details**: It returns a state variable and a setter function. Updates to the state trigger re-renders.

**Example**:
```jsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
    </View>
  );
};
export default App;
```

**Use Case**: Managing local component state, like counters or form inputs.[](https://www.interviewbit.com/react-interview-questions/)

---

### 10. What is the `useEffect` hook used for?
**Answer**: The `useEffect` hook handles side effects in functional components, such as data fetching, subscriptions, or DOM manipulations.

**Details**: It runs after every render (or when specified dependencies change) and can include a cleanup function to prevent memory leaks.

**Example**:
```jsx
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

const App = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(setData);
    return () => console.log('Cleanup');
  }, []);
  return <Text>{data ? data : 'Loading...'}</Text>;
};
export default App;
```

**Use Case**: Fetching data or setting up event listeners.[](https://www.igmguru.com/blog/react-native-interview-questions)[](https://flexiple.com/react/interview-questions)

---

### 11. What is `AsyncStorage` in React Native?
**Answer**: `AsyncStorage` is a simple, unencrypted key-value storage system for persisting small amounts of data locally, like user preferences or tokens.

**Details**: It’s asynchronous and now maintained as a community package (`@react-native-async-storage/async-storage`). Data is stored as strings.

**Example**:
```jsx
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};

const getData = async key => {
  return await AsyncStorage.getItem(key);
};
```

**Use Case**: Storing user authentication tokens or app settings.[](https://medium.com/%40anandgaur2207/top-react-native-interview-questions-with-answer-c5b59ccdd9f0)[](https://www.finalroundai.com/blog/react-native-developer-interview-questions)

---

### 12. What is `TouchableOpacity` and how is it used?
**Answer**: `TouchableOpacity` is a component that makes its children clickable, reducing opacity when pressed to provide visual feedback.

**Details**: It’s commonly used for buttons or interactive elements, supporting `onPress`, `onLongPress`, and other touch events.

**Example**:
```jsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const App = () => (
  <TouchableOpacity onPress={() => alert('Pressed!')}>
    <Text>Press Me</Text>
  </TouchableOpacity>
);
export default App;
```

**Use Case**: Creating interactive buttons or tappable areas.[](https://medium.com/%40anandgaur2207/top-react-native-interview-questions-with-answer-c5b59ccdd9f0)

---

### 13. What is `SafeAreaView` in React Native?
**Answer**: `SafeAreaView` ensures that UI content is rendered within the safe boundaries of a device, avoiding notches, status bars, or navigation bars.

**Details**: It’s particularly useful for iOS devices with notches or rounded corners, ensuring content is not obscured.

**Example**:
```jsx
import React from 'react';
import { SafeAreaView, Text } from 'react-native';

const App = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <Text>Safe Content</Text>
  </SafeAreaView>
);
export default App;
```

**Use Case**: Ensuring UI compatibility across devices with varying screen designs.[](https://medium.com/%40anandgaur2207/top-react-native-interview-questions-with-answer-c5b59ccdd9f0)

---

### 14. What is `FlatList` and why is it preferred for lists?
**Answer**: `FlatList` is a performant component for rendering large lists of data efficiently, using lazy loading to render only visible items.

**Details**: It supports features like scrolling, pull-to-refresh, and item separators, making it ideal for dynamic lists.

**Example**:
```jsx
import React from 'react';
import { FlatList, Text } from 'react-native';

const data = [{ key: 'Item 1' }, { key: 'Item 2' }];
const App = () => (
  <FlatList
    data={data}
    renderItem={({ item }) => <Text>{item.key}</Text>}
  />
);
export default App;
```

**Use Case**: Displaying large datasets like message lists or product catalogs.[](https://www.interviewbit.com/react-native-interview-questions/)[](https://medium.com/%40anandgaur2207/top-react-native-interview-questions-with-answer-c5b59ccdd9f0)

---

### 15. How do you handle navigation in React Native?
**Answer**: Navigation is managed using libraries like React Navigation, which provides components like `StackNavigator`, `TabNavigator`, and `DrawerNavigator`.

**Details**: React Navigation allows defining screens and navigating using methods like `navigate`, `push`, or `goBack`.

**Example**:
```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
```

**Use Case**: Navigating between screens in a mobile app.[](https://www.turing.com/interview-questions/react-native)

---

### 16. What is Flexbox in React Native?
**Answer**: Flexbox is a layout model used in React Native to arrange and align UI components within a container, similar to CSS Flexbox but adapted for mobile.

**Details**: It uses properties like `flex`, `justifyContent`, and `alignItems` to control layout. Unlike CSS, only `flex` and `none` are supported for the `display` property.

**Example**:
```jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

const App = () => (
  <View style={styles.container}>
    <View style={styles.box} />
    <View style={styles.box} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', justifyContent: 'space-between' },
  box: { width: 50, height: 50, backgroundColor: 'blue' },
});
export default App;
```

**Use Case**: Creating responsive layouts for mobile screens.[](https://www.turing.com/interview-questions/react-native)[](https://www.knowledgehut.com/interview-questions/react-native)

---

### 17. What are controlled and uncontrolled components?
**Answer**: Controlled components have their form data managed by React state, while uncontrolled components rely on the component’s internal state or DOM.

**Details**: Controlled components use state and callbacks (e.g., `value` and `onChangeText`), while uncontrolled components use refs or native form behavior.

**Example (Controlled)**:
```jsx
import React, { useState } from 'react';
import { TextInput } from 'react-native';

const App = () => {
  const [text, setText] = useState('');
  return (
    <TextInput value={text} onChangeText={setText} placeholder="Enter text" />
  );
};
```

**Use Case**: Controlled components are preferred for predictable state management in forms.[](https://www.knowledgehut.com/interview-questions/react-native)

---

### 18. How do you make network requests in React Native?
**Answer**: Network requests are made using JavaScript’s `fetch` API or libraries like Axios, typically within `useEffect` for side effects.

**Details**: The `fetch` API is built into React Native, while Axios offers additional features like interceptors and cancellation.

**Example**:
```jsx
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

const App = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error(err));
  }, []);
  return <Text>{data ? JSON.stringify(data) : 'Loading...'}</Text>;
};
export default App;
```

**Use Case**: Fetching data from REST APIs for dynamic content.[](https://www.igmguru.com/blog/react-native-interview-questions)[](https://medium.com/%40anandgaur2207/top-react-native-interview-questions-with-answer-c5b59ccdd9f0)

---

### 19. What is the role of keys in React Native lists?
**Answer**: Keys are unique identifiers used in lists (e.g., `FlatList`) to help React Native efficiently update and render list items.

**Details**: Keys enable React Native to track items during re-renders, preventing unnecessary re-rendering and improving performance.

**Example**:
```jsx
<FlatList
  data={[{ id: '1', name: 'Item 1' }, { id: '2', name: 'Item 2' }]}
  keyExtractor={item => item.id}
  renderItem={({ item }) => <Text>{item.name}</Text>}
/>
```

**Use Case**: Rendering dynamic lists with stable identities.[](https://www.igmguru.com/blog/react-native-interview-questions)

---

### 20. What is the component lifecycle in React Native?
**Answer**: The component lifecycle refers to the phases a component goes through: mounting, updating, and unmounting.

**Details**:
- **Mounting**: Component is created and inserted into the UI (e.g., `constructor`, `render`, `componentDidMount` in class components; `useEffect` in functional components).
- **Updating**: Component re-renders due to state/props changes (e.g., `componentDidUpdate`).
- **Unmounting**: Component is removed (e.g., `componentWillUnmount` or `useEffect` cleanup).

**Example**:
```jsx
import React, { useEffect } from 'react';
import { Text } from 'react-native';

const App = () => {
  useEffect(() => {
    console.log('Mounted');
    return () => console.log('Unmounted');
  }, []);
  return <Text>Lifecycle Demo</Text>;
};
```

**Use Case**: Managing side effects like data fetching or cleanup.[](https://www.igmguru.com/blog/react-native-interview-questions)

---

### 21-30. Additional Beginner Questions
Due to space constraints, here are brief summaries for questions 21-30:
21. **What is `ScrollView`?** A component for scrolling content vertically or horizontally.
22. **What is `TextInput`?** A component for capturing user input, supporting properties like `value` and `onChangeText`.
23. **What is `Image` component?** Displays images from local or remote sources.
24. **What is `Platform` API?** Detects the running platform (iOS/Android) for conditional logic.
25. **What is `Alert`?** Displays native alert dialogs for user interaction.
26. **What is `Button`?** A simple component for triggering actions on press.
27. **What is `ActivityIndicator`?** Shows a loading spinner for asynchronous tasks.
28. **What is `StatusBar`?** Controls the appearance of the device’s status bar.
29. **What is `Dimensions` API?** Retrieves device screen dimensions for responsive design.
30. **What is `PixelRatio`?** Handles device pixel density for consistent UI scaling.

**Details**: These components and APIs are foundational for building basic React Native apps, providing essential UI and device interaction capabilities. Refer to React Native documentation for detailed usage.

---

## Intermediate Questions

### 31. How are animations handled in React Native?
**Answer**: Animations are handled using the `Animated` API for declarative animations or `react-native-reanimated` for complex, performant animations.

**Details**: `Animated.timing` and `Animated.spring` are common for basic animations, with `useNativeDriver` improving performance by running animations on the native thread.

**Example**:
```jsx
import React, { useRef } from 'react';
import { Animated, Button } from 'react-native';

const App = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Button title="Fade In" onPress={fadeIn} />
    </Animated.View>
  );
};
```

**Use Case**: Creating smooth UI transitions or interactive gestures.[](https://www.finalroundai.com/blog/react-native-developer-interview-questions)

---

### 32. How do you integrate native SDKs in React Native?
**Answer**: Native SDKs are integrated by creating native modules in Java/Objective-C/Swift and exposing them to JavaScript via the bridge.

**Details**: Use `NativeModules` to call native code from JavaScript. Libraries like `react-native link` or manual configuration link native code.

**Example** (iOS - Objective-C):
```objc
// MyModule.m
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(doSomething:(NSString *)input callback:(RCTResponseSenderBlock)callback) {
  callback(@[input]);
}
```

**JavaScript**:
```jsx
import { NativeModules } from 'react-native';
const { MyModule } = NativeModules;
MyModule.doSomething('Test', result => console.log(result));
```

**Use Case**: Accessing platform-specific features not available in React Native.[](https://www.igmguru.com/blog/react-native-interview-questions)

---

### 33. What is `React.memo` and its use in React Native?
**Answer**: `React.memo` is a higher-order component that memoizes functional components, preventing unnecessary re-renders when props are unchanged.

**Details**: It’s useful for optimizing performance in components with expensive rendering logic.

**Example**:
```jsx
import React from 'react';
import { Text } from 'react-native';

const MyComponent = React.memo(({ value }) => (
  <Text>{value}</Text>
));
```

**Use Case**: Optimizing list items or components with static props.[](https://www.knowledgehut.com/interview-questions/react-native)

---

### 34. How do you handle deep linking in React Native?
**Answer**: Deep linking is implemented by configuring URL schemes and using React Navigation’s `linking` prop to handle navigation from external links.

**Details**: Configure `Info.plist` (iOS) and `AndroidManifest.xml` (Android) for URL schemes, and use libraries like `react-native-deep-linking`.

**Example**:
```jsx
const linking = {
  prefixes: ['myapp://'],
  config: { screens: { Home: 'home', Details: 'details/:id' } },
};

const App = () => (
  <NavigationContainer linking={linking}>
    {/* Navigator setup */}
  </NavigationContainer>
);
```

**Use Case**: Navigating to specific app screens from external URLs.[](https://www.finalroundai.com/blog/react-native-developer-interview-questions)

---

### 35. How do you manage state in React Native?
**Answer**: State is managed using `useState` for local state, `useReducer` for complex state logic, or global state libraries like Redux or Context API.

**Details**: Redux centralizes state with actions and reducers, while Context API is lighter for simpler apps.

**Example (Context API)**:
```jsx
import React, { createContext, useContext, useState } from 'react';
import { Text, View } from 'react-native';

const MyContext = createContext();

const App = () => {
  const [value, setValue] = useState('Hello');
  return (
    <MyContext.Provider value={{ value, setValue }}>
      <Child />
    </MyContext.Provider>
  );
};

const Child = () => {
  const { value } = useContext(MyContext);
  return <Text>{value}</Text>;
};
```

**Use Case**: Managing app-wide settings or user authentication.[](https://www.knowledgehut.com/interview-questions/react-native)[](https://www.interviewbit.com/react-interview-questions/)

---

### 36-60. Additional Intermediate Questions
Brief summaries for questions 36-60:
36. **What is `useCallback`?** Memoizes callback functions to prevent re-creation.
37. **What is `useMemo`?** Memoizes computed values to optimize performance.
38. **How to handle push notifications?** Use `@react-native-firebase/messaging` for cross-platform notifications.
39. **What is `InteractionManager`?** Schedules tasks after animations/interactions.
40. **How to optimize FlatList performance?** Use `getItemLayout`, `initialNumToRender`, and `windowSize`.
41. **What is `shouldComponentUpdate`?** Controls re-rendering in class components.
42. **How to handle errors in React Native?** Use try-catch in async code and `ErrorBoundary` components.
43. **What is `SectionList`?** Renders grouped lists with section headers.
44. **How to use WebViews?** Use `react-native-webview` for embedding web content.
45. **What is `NetInfo`?** Monitors network connectivity status.
46. **How to handle gestures?** Use `react-native-gesture-handler` for advanced gestures.
47. **What is `TouchableHighlight`?** Highlights on press, similar to `TouchableOpacity`.
48. **How to debug React Native apps?** Use React Native Debugger, Flipper, or `console.log`.
49. **What is `useReducer`?** Manages complex state with reducer functions.
50. **How to implement internationalization (i18n)?** Use `react-i18next` or `react-intl`.
51. **What is `PropTypes`?** Validates component props for type checking.
52. **How to handle permissions?** Use `react-native-permissions` for camera, location, etc.
53. **What is `KeyboardAvoidingView`?** Adjusts UI to avoid keyboard overlap.
54. **How to implement code splitting?** Use dynamic imports with `React.lazy`.
55. **What is `ActivityIndicator`?** Shows a loading spinner.
56. **How to handle background tasks?** Use `react-native-background-task` (limited on iOS).
57. **What is `ImageBackground`?** Displays an image as a background.
58. **How to use `Modal`?** Displays overlay content for dialogs or popups.
59. **What is `RefreshControl`?** Adds pull-to-refresh to `ScrollView` or `FlatList`.
60. **How to test React Native apps?** Use Jest for unit tests and Detox for E2E tests.

**Details**: These cover intermediate concepts like performance optimization, state management, and debugging. Refer to React Native documentation for specifics.

---

## Advanced Questions

### 61. What are common memory leaks in React Native and how to prevent them?
**Answer**: Memory leaks occur from un-cleaned subscriptions, timers, or event listeners, causing performance issues or crashes.

**Details**: Use `useEffect` cleanup functions and tools like Flipper’s Memory Inspector to detect leaks.

**Example**:
```jsx
import React, { useEffect } from 'react';
import { Text } from 'react-native';

const App = () => {
  useEffect(() => {
    const timer = setInterval(() => console.log('Tick'), 1000);
    return () => clearInterval(timer); // Cleanup
  }, []);
  return <Text>Preventing Memory Leaks</Text>;
};
```

**Use Case**: Ensuring app stability in long-running apps.[](https://www.finalroundai.com/blog/react-native-developer-interview-questions)

---

### 62. How do you implement biometric authentication?
**Answer**: Biometric authentication (e.g., fingerprint, face ID) is implemented using libraries like `react-native-fingerprint-scanner` or `expo-local-authentication`.

**Details**: Check device compatibility, request permissions, and handle authentication results.

**Example**:
```jsx
import * as LocalAuthentication from 'expo-local-authentication';

const authenticate = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  if (hasHardware) {
    const result = await LocalAuthentication.authenticateAsync();
    console.log(result.success ? 'Authenticated' : 'Failed');
  }
};
```

**Use Case**: Securing sensitive app features.[](https://www.finalroundai.com/blog/react-native-developer-interview-questions)

---

### 63. What is the shadow thread in React Native?
**Answer**: The shadow thread calculates layouts for React Native components in the background, sending results to the main UI thread for rendering.

**Details**: It optimizes performance by offloading layout computations, ensuring smooth UI rendering.

**Use Case**: Handling complex layouts without blocking the main thread.[](https://www.ideamotive.co/react-native/interview)[](https://mindmajix.com/react-native-interview-questions)

---

### 64. How do you handle third-party native modules?
**Answer**: Third-party native modules are integrated by installing their packages, linking them (manually or via autolinking), and accessing them via `NativeModules`.

**Details**: Ensure compatibility with React Native versions and configure native code as needed.

**Example**:
```bash
npm install react-native-some-module
npx react-native link react-native-some-module
```

**Use Case**: Adding features like analytics or custom hardware access.[](https://www.igmguru.com/blog/react-native-interview-questions)

---

### 65. What are the challenges of React Native upgrades?
**Answer**: Upgrades can break due to deprecated APIs, third-party library incompatibilities, or changes in native configurations.

**Details**: Common issues include updated bridge APIs, Hermes engine changes, or native module updates. Mitigate by testing thoroughly and using tools like `react-native-upgrade-helper`.

**Use Case**: Maintaining app compatibility during framework updates.[](https://www.igmguru.com/blog/react-native-interview-questions)

---

### 66. How do you implement debouncing in React Native?
**Answer**: Debouncing delays function execution until a user stops performing an action, using libraries like `lodash.debounce` or custom implementations.

**Details**: Useful for search inputs or scroll handlers to reduce performance overhead.

**Example**:
```jsx
import { debounce } from 'lodash';
import { TextInput } from 'react-native';

const App = () => {
  const handleSearch = debounce(text => console.log(text), 500);
  return <TextInput onChangeText={handleSearch} />;
};
```

**Use Case**: Optimizing search or input-heavy features.[](https://medium.com/%40anandgaur2207/top-react-native-interview-questions-with-answer-c5b59ccdd9f0)

---

### 67. How do you implement a Context API for authentication?
**Answer**: Use `createContext` and `useContext` to manage and share authentication state across components.

**Details**: Store user data or tokens in a context provider and access them in child components.

**Example**:
```jsx
import React, { createContext, useContext, useState } from 'react';
import { Text, Button } from 'react-native';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const App = () => (
  <AuthProvider>
    <AuthConsumer />
  </AuthProvider>
);

const AuthConsumer = () => {
  const { user, setUser } = useContext(AuthContext);
  return (
    <>
      <Text>{user ? `Logged in as ${user}` : 'Not logged in'}</Text>
      <Button title="Login" onPress={() => setUser('John')} />
    </>
  );
};
```

**Use Case**: Managing user sessions across the app.[](https://www.igmguru.com/blog/react-native-interview-questions)

---

### 68. What is prop drilling and how to avoid it?
**Answer**: Prop drilling occurs when props are passed through multiple component levels unnecessarily. Avoid it using Context API or state management libraries.

**Details**: Context API provides a global state, eliminating the need to pass props manually.

**Example**: See Context API example in Q67.

**Use Case**: Simplifying state sharing in deeply nested components.[](https://www.igmguru.com/blog/react-native-interview-questions)[](https://www.interviewbit.com/react-interview-questions/)

---

### 69. How do you optimize React Native app performance?
**Answer**: Optimize performance by:
- Using `React.memo` and `useCallback` to prevent re-renders.
- Optimizing `FlatList` with `getItemLayout` and `initialNumToRender`.
- Enabling `useNativeDriver` for animations.
- Using Hermes engine for faster JavaScript execution.
- Avoiding inline functions in render methods.

**Details**: Profile with tools like Flipper to identify bottlenecks.

**Use Case**: Ensuring smooth performance in large apps.[](https://www.knowledgehut.com/interview-questions/react-native)[](https://www.reddit.com/r/reactnative/comments/1hjhlbr/what_are_the_most_common_or_challenging_questions/)

---

### 70. How do you handle WebSocket connections in React Native?
**Answer**: Use libraries like `socket.io` or the native `WebSocket` API to establish real-time connections, managing them in `useEffect`.

**Details**: Handle connection setup, message listeners, and cleanup to prevent memory leaks.

**Example**:
```jsx
import { useEffect } from 'react';
import { Text } from 'react-native';

const App = () => {
  useEffect(() => {
    const socket = new WebSocket('ws://example.com');
    socket.onmessage = e => console.log(e.data);
    return () => socket.close();
  }, []);
  return <Text>WebSocket Demo</Text>;
};
```

**Use Case**: Real-time features like chat or live updates.[](https://flexiple.com/react/interview-questions)

---

### 71-100. Additional Advanced Questions
Brief summaries for questions 71-100:
71. **What is `react-native-reanimated`?** A library for complex, performant animations.
72. **How to handle offline functionality?** Use `AsyncStorage` or SQLite with `@react-native-community/netinfo`.
73. **What is Hermes engine?** A lightweight JavaScript engine for React Native.
74. **How to implement snapshot testing?** Use Jest to compare UI outputs with stored snapshots.
75. **What is `InteractionManager`?** Schedules tasks after interactions/animations.
76. **How to handle CORS in React Native?** Configure backend for CORS; no frontend setup needed.
77. **What is `useRef`?** Persists values across renders without triggering re-renders.
78. **How to integrate Firebase?** Use `@react-native-firebase` for analytics, notifications, etc.
79. **What is `react-native-gesture-handler`?** Handles advanced touch gestures.
80. **How to handle platform-specific code?** Use `Platform` API or separate `.ios.js`/`.android.js` files.
81. **What is `useLayoutEffect`?** Runs synchronously before painting, unlike `useEffect`.
82. **How to implement lazy loading?** Use `React.lazy` with dynamic imports.
83. **What is `Animated.Value`?** A value for driving animations in `Animated` API.
84. **How to handle app state (foreground/background)?** Use `AppState` API.
85. **What is `react-native-vector-icons`?** Provides scalable icon sets.
86. **How to secure API keys?** Store in environment variables or native code.
87. **What is `react-native-screens`?** Optimizes navigation performance.
88. **How to handle large images?** Use compressed formats and caching libraries.
89. **What is `useContext`?** Accesses context values in functional components.
90. **How to implement Redux?** Use `redux` and `react-redux` for global state.
91. **What is `react-native-fast-image`?** Optimizes image loading and caching.
92. **How to handle app versioning?** Update `version` in `app.json` and native configs.
93. **What is `react-native-webview`?** Embeds web content in apps.
94. **How to handle accessibility?** Use `accessible`, `accessibilityLabel`, and `accessibilityRole`.
95. **What is `useImperativeHandle`?** Customizes ref behavior in functional components.
96. **How to implement OTA updates?** Use CodePush for over-the-air updates.
97. **What is `react-native-permissions`?** Manages runtime permissions.
98. **How to handle multi-language support?** Use `react-i18next` for translations.
99. **What is `useTransition`?** Manages concurrent rendering in React 18+.
100. **How to profile performance?** Use Flipper or React Native Performance Monitor.

**Details**: These cover advanced topics like performance, security, and scalability. Refer to React Native and library documentation for implementation details.

---

## Conclusion
This guide covers 100 React Native interview questions, providing a foundation for mastering React Native development. Practice these concepts, explore the React Native documentation, and build sample projects to reinforce your understanding. For further details, check resources like InterviewBit, Turing, and Medium articles.[](https://www.interviewbit.com/react-native-interview-questions/)[](https://www.turing.com/interview-questions/react-native)[](https://medium.com/%40anandgaur2207/top-react-native-interview-questions-with-answer-c5b59ccdd9f0)