# Mobile App Developer (React Native) Interview Questions and Answers (2025)

This document provides an extensive set of 60 interview questions and detailed answers for mobile app development using React Native, organized by interview rounds. It covers behavioral, situational, technical (React Native, JavaScript, styling, and performance), and framework-specific topics, preparing candidates for all stages of the interview process, from initial screenings to final rounds, based on industry standards for 2025. Each answer includes a detailed explanation to clarify the concept, its practical application, and why it matters in mobile app development.

## Table of Contents
1. [Initial Screening Round](#initial-screening-round)
   - [Behavioral Questions](#behavioral-questions)
   - [Situational Questions](#situational-questions)
2. [Technical Round - React Native Basics](#technical-round-react-native-basics)
   - [Core Concepts](#core-concepts)
   - [Components and Styling](#components-and-styling)
   - [JavaScript Questions](#javascript-questions)
3. [Technical Round - Mobile-Specific](#technical-round-mobile-specific)
   - [Navigation and State Management](#navigation-and-state-management)
   - [Performance and Debugging](#performance-and-debugging)
4. [Framework-Specific Round](#framework-specific-round)
   - [React Native Advanced](#react-native-advanced)
   - [Third-Party Libraries](#third-party-libraries)
5. [Advanced Technical Round](#advanced-technical-round)
   - [Optimization and Scalability Questions](#optimization-and-scalability-questions)
   - [Coding Questions](#coding-questions)
6. [Final Round](#final-round)
   - [Cultural Fit and Industry Knowledge](#cultural-fit-and-industry-knowledge)

---

## Initial Screening Round

### Behavioral Questions

1. **Describe a time when you successfully delivered a React Native app under a tight deadline. What was your approach?**

   **Answer**: In a recent project, I built a fitness tracking app using React Native in three weeks. I prioritized core features (e.g., workout logging) using a Kanban board, leveraged reusable components with TypeScript for type safety, and integrated a Supabase backend for data storage. I used React Navigation for smooth transitions and tested with Jest to ensure stability. Daily stand-ups with the team kept us aligned, and we delivered a functional app on time, which received a 4.8-star rating on initial release.

   **Explanation**: This answer highlights time management, prioritization, and technical skills specific to React Native, such as component reuse and navigation. It shows familiarity with modern tools (TypeScript, Supabase) and testing, which are critical for mobile apps. The outcome (star rating) demonstrates success, while the process (Kanban, stand-ups) shows teamwork and organization, key for fast-paced mobile development.

2. **Tell us about a time you resolved a critical bug in a React Native app in production. How did you handle it?**

   **Answer**: Users reported crashes in a social media app due to a memory leak in a FlatList rendering large datasets. I used React Native’s Performance Monitor to identify excessive re-renders, then optimized the list with `getItemLayout` and memoized components using `React.memo`. I deployed the fix via CodePush for minimal downtime and added monitoring with Sentry to track future issues. The crashes dropped to zero, improving user retention by 15%.

   **Explanation**: This demonstrates debugging skills specific to React Native (Performance Monitor, FlatList optimization) and production strategies (CodePush, Sentry). It explains the root cause (memory leak), the solution (memoization, `getItemLayout`), and the impact (user retention), showing a complete problem-solving cycle relevant to mobile app stability.

3. **Can you share an experience where you collaborated with designers to improve a React Native app’s UI/UX?**

   **Answer**: For a travel app, designers provided Figma mockups with complex animations. I collaborated using Zeplin to extract assets and implemented animations with `react-native-reanimated` for smooth transitions. I suggested accessibility improvements, like adding `accessibilityLabel` to buttons, which designers incorporated. Weekly reviews ensured alignment, resulting in a 20% increase in user engagement due to the enhanced UI.

   **Explanation**: This showcases collaboration with designers, a key aspect of mobile development, and technical expertise with React Native libraries (`react-native-reanimated`). It highlights accessibility, a critical concern in mobile apps, and quantifies the outcome (engagement increase), demonstrating the impact of teamwork on user experience.

4. **Describe a situation where you had to learn a new React Native library quickly for a project.**

   **Answer**: A client needed push notifications in a React Native app. I learned `react-native-push-notification` in a week by studying its documentation and building a prototype to send local and remote notifications via Firebase. I integrated it with TypeScript, handling edge cases like permissions, and tested on both iOS and Android. The feature was delivered on time, increasing user re-engagement by 25%.

   **Explanation**: This answer emphasizes adaptability, a critical skill in mobile development, and shows familiarity with React Native’s ecosystem (push notifications, Firebase). It details the learning process (documentation, prototyping) and cross-platform testing, which are essential for React Native apps, while the outcome highlights business impact.

5. **What’s an example of a time you improved the performance of a React Native app?**

   **Answer**: In an e-commerce app, users reported slow image loading. I replaced standard `Image` components with `react-native-fast-image` for caching and optimized FlatList rendering with `initialNumToRender`. I also reduced JavaScript bundle size by enabling Hermes and code splitting. These changes cut load times by 40%, improving user satisfaction scores.

   **Explanation**: This demonstrates performance optimization, a key concern in mobile apps, using React Native-specific tools (`react-native-fast-image`, Hermes). It explains technical choices (caching, code splitting) and their impact (load time reduction), showing a deep understanding of mobile performance challenges.

6. **Tell us about a time you mentored a junior developer on a React Native project.**

   **Answer**: I guided a junior developer on integrating a REST API in a React Native app. I explained `axios` for HTTP requests, helped them structure reusable hooks with TypeScript, and pair-programmed to debug network errors. I also introduced them to React Native Debugger for state inspection. Their code quality improved, and they contributed a feature independently by the sprint’s end.

   **Explanation**: This highlights leadership and technical expertise in React Native (axios, hooks, TypeScript). It shows mentoring strategies (pair-programming, debugging tools) and the outcome (improved code quality), emphasizing teamwork and knowledge-sharing in mobile development.

### Situational Questions

7. **How would you handle a situation where a React Native app crashes on iOS but not Android?**

   **Answer**: I’d reproduce the crash using Xcode’s simulator, check logs with React Native Debugger, and analyze platform-specific code (e.g., native modules). If the issue is UI-related, I’d verify styles with `Platform.OS` conditions. For example, iOS-specific layout bugs might stem from Flexbox differences, so I’d adjust styles or use `react-native-normalize`. I’d test the fix on multiple iOS versions and deploy via TestFlight, ensuring stability.

   **Explanation**: This demonstrates platform-specific debugging skills, critical for React Native’s cross-platform nature. It details tools (Xcode, React Native Debugger) and solutions (`Platform.OS`, `react-native-normalize`), showing how to isolate and resolve iOS-specific issues while ensuring robust testing.

8. **What would you do if a client reports slow navigation transitions in a React Native app?**

   **Answer**: I’d analyze navigation performance with React Navigation’s `PerformanceProfiler` and check for heavy re-renders using React DevTools. I’d optimize by memoizing components with `React.memo`, using `useNavigation` sparingly, and enabling `react-native-screens` for native navigation. I’d test on low-end devices and share metrics with the client to confirm improvements, targeting a 60fps transition rate.

   **Explanation**: This addresses a common mobile UX issue (navigation lag) with React Native-specific tools (`react-native-screens`, React DevTools). It explains optimization strategies (memoization, native navigation) and testing on low-end devices, emphasizing performance and client communication.

9. **How would you respond if a React Native app fails to fetch data due to a network issue?**

   **Answer**: I’d implement offline support with AsyncStorage to cache data, display a retry UI with `react-query`, and use exponential backoff for retries. I’d log errors with Sentry for monitoring and notify users with a Snackbar. Post-fix, I’d add network status detection with `@react-native-community/netinfo` to handle connectivity changes gracefully.

   **Explanation**: This shows robust error handling for mobile apps, using React Native libraries (`react-query`, AsyncStorage). It details user feedback (Snackbar) and monitoring (Sentry), critical for reliability in variable network conditions, a common mobile challenge.

10. **What steps would you take if a new feature causes high battery drain in a React Native app?**

    **Answer**: I’d use Android Studio’s Profiler or Xcode’s Instruments to identify power-intensive processes, like excessive API calls or animations. I’d optimize by throttling API requests with `lodash.debounce`, using `react-native-reanimated` for efficient animations, and reducing background tasks. I’d test on physical devices and monitor battery usage post-deployment to ensure efficiency.

    **Explanation**: Battery drain is a critical mobile concern. This answer uses platform-specific tools (Profiler, Instruments) and React Native libraries (`react-native-reanimated`) to address it, showing a systematic approach to optimization and testing for mobile-specific constraints.

---

## Technical Round - React Native Basics

### Core Concepts

11. **What is the difference between React Native and React?**

    **Answer**: React is a JavaScript library for building web UIs with components, using browser DOM. React Native is a framework for building mobile apps using React components, rendering native UI elements (e.g., UIView on iOS, View on Android) via a JavaScript bridge. React Native uses platform-specific APIs and requires native configuration (e.g., AndroidManifest.xml).

    **Explanation**: This clarifies the distinction between web and mobile development with React. It highlights React Native’s native rendering and configuration needs, which are crucial for understanding its mobile-specific architecture and why it differs from web-based React.

12. **What is the role of the JavaScript bridge in React Native?**

    **Answer**: The JavaScript bridge enables communication between JavaScript code and native modules (e.g., Java/Kotlin for Android, Swift/Objective-C for iOS). It translates JavaScript calls to native functions for tasks like accessing the camera or file system, ensuring cross-platform functionality but adding slight overhead.

    **Explanation**: This explains a core React Native concept, as the bridge is fundamental to its cross-platform nature. Understanding its role and performance implications helps developers optimize native interactions and avoid bottlenecks.

13. **What is Hermes, and how does it improve React Native apps?**

    **Answer**: Hermes is a lightweight JavaScript engine optimized for React Native. It reduces app startup time and memory usage by precompiling JavaScript to bytecode. Enable it in `android/app/build.gradle` with `enableHermes: true`. For example, it cut startup time by 30% in a recent project.

    **Explanation**: Hermes is a key optimization tool in React Native. This answer details its purpose, setup, and impact, showing practical knowledge of performance tuning, which is critical for mobile apps where resources are constrained.

14. **How does React Native handle platform-specific code?**

    **Answer**: Use `Platform.OS` or platform-specific files (e.g., `Component.ios.js`, `Component.android.js`). Example:
    ```javascript
    import { Platform } from 'react-native';
    const styles = StyleSheet.create({
      container: { padding: Platform.OS === 'ios' ? 20 : 10 }
    });
    ```
    This ensures tailored behavior, like iOS-safe area padding.

    **Explanation**: This demonstrates how to handle platform differences, a common challenge in React Native. It shows practical use of `Platform.OS` and file extensions, ensuring developers can create consistent yet platform-optimized UIs.

15. **What is the purpose of the Metro bundler in React Native?**

    **Answer**: Metro bundles JavaScript code, transforms it (e.g., JSX to JS), and serves it to the React Native app. It supports hot reloading and module resolution. Configure it in `metro.config.js` to customize module paths or enable experimental features.

    **Explanation**: Metro is central to React Native’s development workflow. This answer explains its role in bundling and real-time updates, critical for developer productivity and app performance, especially in projects like your `todoApp02`.

### Components and Styling

16. **How do you create responsive layouts in React Native?**

    **Answer**: Use Flexbox, `Dimensions` API, and libraries like `react-native-responsive-screen`. Example:
    ```javascript
    import { Dimensions } from 'react-native';
    const { width } = Dimensions.get('window');
    const styles = StyleSheet.create({
      container: { width: width * 0.9 }
    });
    ```
    This ensures layouts adapt to device sizes, critical for diverse mobile screens.

    **Explanation**: Responsive design is vital for mobile apps. This answer details Flexbox and the `Dimensions` API, with a nod to libraries you’ve explored (e.g., Unistyles), showing how to achieve consistent UI across devices.

17. **What is the difference between `View` and `ScrollView`?**

    **Answer**: `View` is a basic container for layout, while `ScrollView` enables scrolling for content exceeding the screen. Example:
    ```javascript
    <ScrollView>
      {items.map(item => <View key={item.id}><Text>{item.name}</Text></View>)}
    </ScrollView>
    ```
    Use `ScrollView` for lists, but prefer `FlatList` for large datasets.

    **Explanation**: This clarifies core React Native components, emphasizing their use cases. It mentions `FlatList` as a performance alternative, showing awareness of optimization needs in mobile apps.

18. **How do you apply styles in React Native?**

    **Answer**: Use `StyleSheet.create` for performance or inline styles for quick prototyping. Example:
    ```javascript
    const styles = StyleSheet.create({
      button: { backgroundColor: '#caca27', padding: 10 }
    });
    <View style={styles.button}><Text>Click</Text></View>
    ```
    Libraries like NativeWind (Tailwind CSS) can also be used for utility-first styling.

    **Explanation**: This covers React Native’s styling system, referencing your interest in Tailwind CSS (e.g., from Swaraj). It explains `StyleSheet` benefits (performance) and alternatives, showing practical styling knowledge.

19. **What is the `TouchableOpacity` component, and how does it work?**

    **Answer**: `TouchableOpacity` creates a touchable element with opacity animation on press. Example:
    ```javascript
    <TouchableOpacity activeOpacity={0.7} onPress={() => console.log('Pressed')}>
      <Text>Tap me</Text>
    </TouchableOpacity>
    ```
    It’s ideal for buttons, providing visual feedback without native dependencies.

    **Explanation**: This addresses your prior question about `TouchableOpacity` opacity, explaining its purpose and configuration (`activeOpacity`). It highlights its role in mobile UX, where tactile feedback is key.

20. **How do you handle images in React Native?**

    **Answer**: Use the `Image` component with `resizeMode` (`cover`, `contain`) and libraries like `react-native-fast-image` for caching. Example:
    ```javascript
    import FastImage from 'react-native-fast-image';
    <FastImage source={{ uri: 'https://example.com/img.jpg' }} style={{ width: 200, height: 200 }} resizeMode="cover" />
    ```
    This optimizes image loading for mobile performance.

    **Explanation**: This addresses image handling, a common mobile challenge you’ve explored (e.g., Swaraj image uploads). It explains `resizeMode` and optimization libraries, critical for fast, responsive mobile apps.

### JavaScript Questions

21. **What is the difference between `useState` and `useReducer` in React Native?**

    **Answer**: `useState` manages simple state (e.g., a counter), while `useReducer` handles complex state logic with actions. Example:
    ```javascript
    const [state, dispatch] = useReducer((state, action) => {
      switch (action.type) {
        case 'increment': return { count: state.count + 1 };
        default: return state;
      }
    }, { count: 0 });
    ```
    Use `useReducer` for forms or multi-step workflows.

    **Explanation**: This clarifies state management, a core React Native concept. It compares `useState` and `useReducer`, showing when to use each, which is critical for managing app state in complex mobile UIs.

22. **How do you handle asynchronous operations in React Native?**

    **Answer**: Use `async/await` with Promises or `react-query` for data fetching. Example:
    ```javascript
    async function fetchData() {
      try {
        const response = await fetch('https://api.example.com/data');
        return response.json();
      } catch (error) {
        console.error(error);
      }
    }
    ```
    This ensures robust network handling on mobile devices.

    **Explanation**: Asynchronous operations are critical for mobile apps with network calls. This answer provides a practical example and mentions `react-query`, aligning with modern React Native practices for reliable data fetching.

23. **What is the `useEffect` hook, and how is it used in React Native?**

    **Answer**: `useEffect` handles side effects (e.g., data fetching, subscriptions). Example:
    ```javascript
    useEffect(() => {
      const timer = setInterval(() => console.log('Tick'), 1000);
      return () => clearInterval(timer); // Cleanup
    }, []);
    ```
    The empty dependency array ensures it runs once on mount.

    **Explanation**: This explains a fundamental React hook used in React Native for tasks like timers or API calls. The cleanup function is highlighted to prevent memory leaks, a key concern in mobile apps.

24. **What is the `Promise.allSettled` method, and when is it useful?**

    **Answer**: `Promise.allSettled` resolves when all Promises settle (resolved or rejected), returning their statuses. Example:
    ```javascript
    Promise.allSettled([Promise.resolve(1), Promise.reject('Error')])
      .then(results => console.log(results));
    // [{ status: 'fulfilled', value: 1 }, { status: 'rejected', reason: 'Error' }]
    ```
    It’s useful for independent API calls in mobile apps, like fetching user data and posts.

    **Explanation**: This addresses handling multiple async operations, common in mobile apps. It explains `Promise.allSettled`’s advantage over `Promise.all` (no short-circuiting), ensuring robust data fetching.

25. **What is the difference between `map` and `forEach` in JavaScript?**

    **Answer**: `map` creates a new array with transformed elements, while `forEach` executes a function without returning anything. Example:
    ```javascript
    const numbers = [1, 2, 3];
    const doubled = numbers.map(n => n * 2); // [2, 4, 6]
    numbers.forEach(n => console.log(n)); // Logs 1, 2, 3
    ```
    Use `map` for rendering lists in React Native.

    **Explanation**: This clarifies a common JavaScript concept used in React Native for list rendering (e.g., FlatList). It explains their purposes and performance implications, critical for efficient mobile UI rendering.

---

## Technical Round - Mobile-Specific

### Navigation and State Management

26. **What is React Navigation, and how do you set it up?**

    **Answer**: React Navigation is a library for routing and navigation in React Native apps. Setup:
    ```bash
    npm install @react-navigation/native @react-navigation/stack react-native-screens
    ```
    ```javascript
    import { NavigationContainer } from '@react-navigation/native';
    import { createStackNavigator } from '@react-navigation/stack';
    const Stack = createStackNavigator();
    function App() {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    ```
    It supports stack, tab, and drawer navigation, optimized for mobile UX.

    **Explanation**: Navigation is a core mobile app feature. This answer details setup and usage of React Navigation, a standard library, and highlights its role in creating intuitive mobile experiences.

27. **How do you manage global state in a React Native app?**

    **Answer**: Use Redux Toolkit or Context API. Example with Redux Toolkit:
    ```javascript
    import { configureStore, createSlice } from '@reduxjs/toolkit';
    const counterSlice = createSlice({
      name: 'counter',
      initialState: { value: 0 },
      reducers: { increment: state => { state.value += 1; } }
    });
    const store = configureStore({ reducer: counterSlice.reducer });
    ```
    Wrap the app with `Provider` to access state. Use Context for simpler apps.

    **Explanation**: This builds on your interest in Redux Toolkit, explaining global state management for complex mobile apps. It compares Redux and Context, showing when each is appropriate for React Native.

28. **What is the difference between Stack and Tab navigation?**

    **Answer**: Stack navigation pushes screens in a stack (e.g., back/forward), ideal for linear flows. Tab navigation switches between parallel screens, like a bottom tab bar. Example:
    ```javascript
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
    const Tab = createBottomTabNavigator();
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
    ```

    **Explanation**: This clarifies navigation patterns, critical for mobile UX. It explains their use cases and provides a practical example, ensuring developers can choose the right pattern for app flows.

29. **How do you persist state in React Native?**

    **Answer**: Use `AsyncStorage` for key-value storage or libraries like `@react-native-async-storage/async-storage`. Example:
    ```javascript
    import AsyncStorage from '@react-native-async-storage/async-storage';
    const saveData = async () => {
      await AsyncStorage.setItem('key', 'value');
    };
    const getData = async () => {
      return await AsyncStorage.getItem('key');
    };
    ```
    It’s used for offline data or user preferences.

    **Explanation**: State persistence is key for mobile apps, especially offline scenarios. This answer details `AsyncStorage`, a standard solution, and its use case, ensuring reliable data handling.

30. **What is the role of `useNavigation` hook in React Navigation?**

    **Answer**: The `useNavigation` hook provides access to navigation methods (e.g., `navigate`, `goBack`). Example:
    ```javascript
    import { useNavigation } from '@react-navigation/native';
    function MyComponent() {
      const navigation = useNavigation();
      return <Button title="Go" onPress={() => navigation.navigate('Home')} />;
    }
    ```
    It simplifies navigation in functional components.

    **Explanation**: This explains a key React Navigation feature, showing how it enhances mobile app navigation. The example demonstrates practical usage, critical for dynamic screen transitions.

### Performance and Debugging

31. **How do you optimize FlatList performance in React Native?**

    **Answer**: Optimize with:
    - `getItemLayout` for fixed item sizes.
    - `initialNumToRender` to limit initial renders.
    - `React.memo` for item components.
    Example:
    ```javascript
    <FlatList
      data={items}
      renderItem={({ item }) => <MemoizedItem item={item} />}
      getItemLayout={(data, index) => ({ length: 50, offset: 50 * index, index })}
      initialNumToRender={10}
    />
    ```
    This reduces lag for large lists.

    **Explanation**: FlatList optimization is critical for mobile performance. This answer details specific props and techniques, addressing common performance issues in data-heavy mobile apps.

32. **What tools do you use to debug React Native apps?**

    **Answer**: Use React Native Debugger, Flipper, or Chrome DevTools for JavaScript debugging, and Xcode/Android Studio for native issues. Example: Connect to Flipper to inspect network requests and state. Log errors with `console.log` or Sentry for production.

    **Explanation**: Debugging is essential for mobile development. This answer lists industry-standard tools, explaining their roles and how they help diagnose issues like those you faced with `todoApp02`.

33. **How do you handle memory leaks in React Native?**

    **Answer**: Avoid leaks by:
    - Cleaning up subscriptions in `useEffect` (e.g., timers, listeners).
    - Using `React.memo` for components.
    - Monitoring with Flipper’s LeakCanary plugin.
    Example:
    ```javascript
    useEffect(() => {
      const subscription = subscribe();
      return () => subscription.unsubscribe();
    }, []);
    ```

    **Explanation**: Memory management is critical for mobile apps. This answer explains common leak sources and solutions, ensuring developers can maintain app stability on resource-constrained devices.

34. **What is CodePush, and how is it used in React Native?**

    **Answer**: CodePush (by Microsoft) enables over-the-air updates for React Native apps, bypassing app store reviews. Example:
    ```bash
    npm install react-native-code-push
    ```
    ```javascript
    import codePush from 'react-native-code-push';
    const App = () => <AppComponent />;
    export default codePush(App);
    ```
    It’s used for quick bug fixes or feature updates.

    **Explanation**: This introduces a key deployment tool for React Native, explaining its setup and use case. It’s critical for rapid updates in production, enhancing mobile app maintenance.

35. **How do you test React Native components?**

    **Answer**: Use Jest with `@testing-library/react-native`. Example:
    ```javascript
    import { render, screen } from '@testing-library/react-native';
    test('renders button', () => {
      render(<Button title="Click" />);
      expect(screen.getByText('Click')).toBeTruthy();
    });
    ```
    Test accessibility and interactions for mobile-specific UX.

    **Explanation**: Testing ensures app reliability. This answer details Jest and Testing Library, showing how to test mobile components, which is essential for maintaining quality in React Native apps.

---

## Framework-Specific Round

### React Native Advanced

36. **What is the `useFocusEffect` hook in React Navigation?**

    **Answer**: `useFocusEffect` runs side effects when a screen gains focus. Example:
    ```javascript
    import { useFocusEffect } from '@react-navigation/native';
    useFocusEffect(
      React.useCallback(() => {
        console.log('Screen focused');
        return () => console.log('Screen unfocused');
      }, [])
    );
    ```
    It’s used for analytics or refreshing data on screen focus.

    **Explanation**: This advanced navigation hook is key for mobile apps with dynamic screen states. The example shows its use and cleanup, critical for managing side effects in navigation-heavy apps.

37. **How do you implement animations in React Native?**

    **Answer**: Use `react-native-reanimated` for performant animations. Example:
    ```javascript
    import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
    function AnimatedBox() {
      const offset = useSharedValue(0);
      const animatedStyles = { transform: [{ translateX: offset.value }] };
      return (
        <Animated.View style={[styles.box, animatedStyles]} />
        <Button onPress={() => offset.value = withSpring(100)} title="Move" />
      );
    }
    ```
    It leverages native drivers for smooth animations.

    **Explanation**: Animations enhance mobile UX. This answer details `react-native-reanimated`, a modern library, and explains native driver benefits, critical for 60fps animations on mobile.

38. **What is the `useWindowDimensions` hook?**

    **Answer**: `useWindowDimensions` provides the device’s screen dimensions. Example:
    ```javascript
    import { useWindowDimensions } from 'react-native';
    function Component() {
      const { width, height } = useWindowDimensions();
      return <View style={{ width: width * 0.8, height: height * 0.5 }} />;
    }
    ```
    It’s used for responsive layouts.

    **Explanation**: This addresses your interest in responsive design (e.g., `device.width`). It explains a React Native hook for dynamic layouts, ensuring compatibility across mobile devices.

39. **How do you handle deep linking in React Native?**

    **Answer**: Use React Navigation’s deep linking. Example:
    ```javascript
    const linking = {
      prefixes: ['myapp://'],
      config: { screens: { Profile: 'profile/:id' } }
    };
    <NavigationContainer linking={linking}>
      <App />
    </NavigationContainer>
    ```
    Configure `AndroidManifest.xml` and `Info.plist` for URL schemes.

    **Explanation**: Deep linking enhances mobile app navigation. This answer details setup and configuration, critical for integrating with external links or notifications in React Native apps.

40. **What is the role of `react-native-screens`?**

    **Answer**: `react-native-screens` enables native navigation primitives, improving performance over JavaScript-based navigation. Install with:
    ```bash
    npm install react-native-screens
    ```
    Enable with `enableScreens()` in React Navigation setup. It reduces memory usage and boosts transition speed.

    **Explanation**: This explains a performance-critical library for React Native navigation. It highlights its benefits and setup, essential for smooth mobile navigation experiences.

### Third-Party Libraries

41. **How do you integrate Firebase in a React Native app?**

    **Answer**: Use `@react-native-firebase`. Example for push notifications:
    ```bash
    npm install @react-native-firebase/app @react-native-firebase/messaging
    ```
    ```javascript
    import messaging from '@react-native-firebase/messaging';
    useEffect(() => {
      messaging().onMessage(async remoteMessage => {
        Alert.alert('Notification', remoteMessage.notification.body);
      });
    }, []);
    ```
    Configure Firebase for iOS/Android in `google-services.json` and `GoogleService-Info.plist`.

    **Explanation**: Firebase is widely used for mobile features like notifications. This answer details setup and usage, addressing your interest in features like push notifications (e.g., Swaraj).

42. **What is `react-native-vector-icons`, and how is it used?**

    **Answer**: `react-native-vector-icons` provides customizable icon sets. Example:
    ```bash
    npm install react-native-vector-icons
    ```
    ```javascript
    import Icon from 'react-native-vector-icons/MaterialIcons';
    <Icon name="star" size={30} color="#caca27" />
    ```
    Link with `npx react-native link` or manual configuration.

    **Explanation**: Icons are essential for mobile UI. This answer explains setup and usage, referencing your interest in styling, and addresses linking challenges common in React Native.

43. **How do you use `react-native-fast-image` for image optimization?**

    **Answer**: `react-native-fast-image` caches images for faster loading. Example:
    ```bash
    npm install react-native-fast-image
    ```
    ```javascript
    import FastImage from 'react-native-fast-image';
    <FastImage source={{ uri: 'https://example.com/img.jpg' }} style={{ width: 200, height: 200 }} />
    ```
    It reduces memory usage and improves performance.

    **Explanation**: This addresses your interest in image optimization (e.g., Swaraj). It explains the library’s benefits and setup, critical for efficient image handling in mobile apps.

44. **What is `react-query`, and how is it used in React Native?**

    **Answer**: `react-query` manages server state with caching and refetching. Example:
    ```bash
    npm install @tanstack/react-query
    ```
    ```javascript
    import { useQuery } from '@tanstack/react-query';
    function Component() {
      const { data } = useQuery(['key'], () => fetch('https://api.example.com/data').then(res => res.json()));
      return <Text>{data?.name}</Text>;
    }
    ```
    It simplifies data fetching and syncing.

    **Explanation**: This introduces a modern data-fetching library, explaining its role in mobile apps for efficient API handling, which aligns with robust data management needs.

45. **How do you integrate TypeScript in a React Native app?**

    **Answer**: Rename files to `.tsx`, add `tsconfig.json`, and install dependencies:
    ```bash
    npm install typescript @types/react @types/react-native
    ```
    Example:
    ```javascript
    interface Props { name: string }
    const Component: React.FC<Props> = ({ name }) => <Text>{name}</Text>;
    ```
    TypeScript ensures type safety, reducing runtime errors.

    **Explanation**: This builds on your TypeScript interest (e.g., Swaraj), explaining setup and benefits for mobile apps, where type safety enhances reliability and developer experience.

---

## Advanced Technical Round

### Optimization and Scalability Questions

46. **How do you optimize React Native app startup time?**

    **Answer**: Optimize with:
    - Hermes engine for faster JavaScript execution.
    - Code splitting with dynamic imports.
    - Lazy loading images with `react-native-fast-image`.
    - Minimizing initial state with Redux Toolkit.
    Example: Enable Hermes in `build.gradle` and use `React.lazy` for components.

    **Explanation**: Startup time is critical for mobile UX. This answer details React Native-specific optimizations, addressing tools and techniques to ensure fast app loading.

47. **What is the role of native modules in React Native?**

    **Answer**: Native modules bridge JavaScript to native code for platform-specific features (e.g., GPS). Example:
    ```javascript
    import { NativeModules } from 'react-native';
    const { MyModule } = NativeModules;
    MyModule.doSomething();
    ```
    Create them in Java/Swift for custom functionality.

    **Explanation**: Native modules are key for advanced mobile features. This answer explains their purpose and setup, critical for extending React Native’s capabilities.

48. **How do you handle offline-first functionality in React Native?**

    **Answer**: Use `AsyncStorage` for local caching and `@react-native-community/netinfo` for network status. Example:
    ```javascript
    import NetInfo from '@react-native-community/netinfo';
    NetInfo.fetch().then(state => {
      if (!state.isConnected) AsyncStorage.getItem('cachedData').then(data => console.log(data));
    });
    ```

    **Explanation**: Offline support is vital for mobile apps. This answer details tools and strategies, ensuring robust functionality in unreliable network conditions.

49. **What is the difference between Expo and React Native CLI?**

    **Answer**:
    - **Expo**: Managed workflow with prebuilt tools, easier setup but limited native access.
    - **React Native CLI**: Bare workflow with full native control, used for custom modules.
    Choose Expo for rapid prototyping, CLI for complex apps.

    **Explanation**: This clarifies development workflows, addressing your experience with React Native CLI (e.g., `todoApp02`). It explains trade-offs, helping developers choose the right approach.

50. **How do you secure a React Native app?**

    **Answer**: Secure with:
    - HTTPS for API calls.
    - Encrypted storage with `react-native-encrypted-storage`.
    - Code obfuscation with ProGuard or Hermes.
    - Input validation to prevent injection.
    Example: Use `axios` with HTTPS endpoints.

    **Explanation**: Security is critical for mobile apps. This answer details React Native-specific practices, ensuring data protection and robust app integrity.

### Coding Questions

51. **Write a React Native component to fetch and display data with error handling.**

    **Answer**:
    ```javascript
    import { useState, useEffect } from 'react';
    import { View, Text, ActivityIndicator } from 'react-native';
    function DataComponent() {
      const [data, setData] = useState(null);
      const [error, setError] = useState(null);
      useEffect(() => {
        fetch('https://api.example.com/data')
          .then(res => res.json())
          .then(setData)
          .catch(err => setError(err.message));
      }, []);
      if (error) return <Text>Error: {error}</Text>;
      if (!data) return <ActivityIndicator />;
      return <Text>{data.name}</Text>;
    }
    ```

    **Explanation**: This demonstrates data fetching, a common mobile task, with robust error handling and loading states, ensuring a smooth user experience.

52. **Write a function to debounce a search input in React Native.**

    **Answer**:
    ```javascript
    import { useCallback } from 'react';
    import { debounce } from 'lodash';
    function SearchComponent() {
      const handleSearch = useCallback(
        debounce(text => console.log('Search:', text), 500),
        []
      );
      return <TextInput onChangeText={handleSearch} />;
    }
    ```

    **Explanation**: Debouncing prevents excessive API calls in search inputs, critical for mobile performance. This uses `lodash.debounce`, showing a practical optimization technique.

53. **Write a FlatList component with pagination.**

    **Answer**:
    ```javascript
    import { useState, useEffect } from 'react';
    import { FlatList, Text } from 'react-native';
    function PaginatedList() {
      const [data, setData] = useState([]);
      const [page, setPage] = useState(1);
      useEffect(() => {
        fetch(`https://api.example.com/data?page=${page}`)
          .then(res => res.json())
          .then(newData => setData(prev => [...prev, ...newData]));
      }, [page]);
      return (
        <FlatList
          data={data}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          onEndReached={() => setPage(prev => prev + 1)}
          onEndReachedThreshold={0.5}
        />
      );
    }
    ```

    **Explanation**: This shows pagination in FlatList, a common mobile pattern for large datasets, ensuring efficient rendering and smooth scrolling.

54. **Write a SQL query to fetch recent posts for a mobile app (assume a posts table).**

    **Answer**:
    ```sql
    SELECT id, title, created_at
    FROM posts
    ORDER BY created_at DESC
    LIMIT 10;
    ```

    **Explanation**: This demonstrates a simple query for a mobile app’s feed, aligning with your interest in SQL and backend integration (e.g., Swaraj). It ensures efficient data retrieval for display.

55. **Write a TypeScript interface for a React Native component’s props.**

    **Answer**:
    ```typescript
    interface ButtonProps {
      title: string;
      onPress: () => void;
      disabled?: boolean;
    }
    const Button: React.FC<ButtonProps> = ({ title, onPress, disabled }) => (
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Text>{title}</Text>
      </TouchableOpacity>
    );
    ```

    **Explanation**: This leverages your TypeScript interest, showing how to define props for a React Native component, ensuring type safety and better developer experience.

---

## Final Round

### Cultural Fit and Industry Knowledge

56. **How do you stay updated with React Native and mobile development trends?**

    **Answer**: I follow React Native’s GitHub, read blogs like Vercel and Callstack, and experiment with libraries like `react-native-reanimated` in side projects. I also attend React Native meetups and contribute to open-source, ensuring I stay current with trends like TypeScript adoption and new navigation APIs.

    **Explanation**: This shows proactive learning, critical for fast-evolving mobile development. It mentions specific resources and practices, aligning with your interest in staying updated.

57. **What excites you about mobile app development with React Native?**

    **Answer**: React Native’s ability to build cross-platform apps with native performance excites me, as seen in a chat app I built with real-time features. Its ecosystem (e.g., TypeScript, NativeWind) streamlines development, letting me focus on creating engaging mobile experiences.

    **Explanation**: This ties your passion for React Native (e.g., Swaraj) to its technical benefits, showing enthusiasm and practical experience in mobile development.

58. **How do you ensure code quality in a React Native project?**

    **Answer**: Use ESLint for linting, Prettier for formatting, Jest for testing, and TypeScript for type safety. Example: Configure ESLint with `react-native` rules to catch issues early. Regular code reviews and CI/CD pipelines (e.g., GitHub Actions) ensure consistency.

    **Explanation**: Code quality is vital for mobile apps. This answer details tools and processes, aligning with your interest in structured development (e.g., Git commands).

59. **What’s a recent React Native challenge you faced, and how did you overcome it?**

    **Answer**: In a real-time app, WebSocket connections lagged on low-end devices. I optimized with `react-native-reanimated` for UI updates and used `socket.io` with reconnection logic, reducing latency by 50%. This deepened my understanding of mobile performance optimization.

    **Explanation**: This showcases problem-solving in a mobile context, using advanced libraries and quantifying the impact, relevant to your interest in real-time features.

60. **Why are you a good fit for this React Native role?**

    **Answer**: My experience with React Native, TypeScript, and libraries like React Navigation, as seen in projects like a social media app, aligns with your focus on scalable mobile solutions. I’m passionate about creating performant, user-friendly apps and eager to contribute to your innovative projects while growing in mobile development.

    **Explanation**: This ties your skills and projects (e.g., Swaraj, `todoApp02`) to the role, emphasizing enthusiasm and alignment with mobile development goals, ensuring a strong fit.

---

This guide provides 60 questions to prepare for a React Native developer interview. Tailor these answers to your experience (e.g., projects like `todoApp02` or Swaraj, skills in TypeScript and styling), practice them, and approach each round confidently to succeed!