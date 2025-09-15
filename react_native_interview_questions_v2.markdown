# Mobile App Developer (React Native) Interview Questions and Answers (2025) - Version 2

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

1. **Describe a time when you successfully integrated a complex feature into a React Native app. What challenges did you face?**

   **Answer**: In a recent e-commerce app, I integrated a real-time chat feature using Socket.IO and React Native. The challenge was managing WebSocket connections on unstable mobile networks. I implemented reconnection logic with exponential backoff, used `react-native-reanimated` for smooth message animations, and stored offline messages with AsyncStorage. I collaborated with the backend team to optimize API payloads, delivering the feature in two sprints with a 95% user adoption rate.

   **Explanation**: This highlights your ability to handle complex mobile features, addressing your interest in real-time functionality (e.g., Swaraj’s WebSocket interest). It details technical challenges (network instability), solutions (reconnection logic, AsyncStorage), and collaboration, showing end-to-end feature development skills critical for mobile apps.

2. **Tell us about a time you optimized a React Native app for low-end devices.**

   **Answer**: Users on low-end Android devices reported lag in a news app’s article list. I optimized FlatList with `initialNumToRender` and `windowSize`, used `react-native-fast-image` for image caching, and enabled Hermes to reduce JavaScript execution time. Testing on a low-end emulator confirmed a 50% reduction in scroll lag, improving accessibility for diverse users.

   **Explanation**: This addresses performance optimization, a key mobile concern, especially for low-end devices. It leverages React Native-specific tools (Hermes, `react-native-fast-image`) and testing strategies, aligning with your focus on performance (e.g., image handling in Swaraj).

3. **Can you share an experience where you worked with a cross-functional team to launch a React Native app?**

   **Answer**: For a fitness app, I collaborated with designers, backend developers, and QA engineers. I translated Figma designs into React Native components using NativeWind for styling, defined REST API contracts with Swagger, and used Jest for end-to-end testing. Bi-weekly syncs ensured alignment, and we launched with a 4.7-star rating, meeting all UX requirements.

   **Explanation**: This showcases teamwork, a critical mobile development skill. It references your interest in styling (NativeWind) and testing (Jest), detailing collaboration tools (Figma, Swagger) and outcomes, emphasizing your ability to deliver user-focused apps.

4. **Describe a situation where you had to debug a platform-specific issue in a React Native app.**

   **Answer**: An iOS-specific crash occurred in a payment app due to a native module error. Using Xcode logs, I traced it to a misconfigured Stripe SDK. I updated the native module, added `Platform.OS` checks for iOS compatibility, and tested with TestFlight. The fix eliminated crashes, and I added Flipper monitoring to prevent future issues.

   **Explanation**: This demonstrates platform-specific debugging, crucial for React Native’s cross-platform nature. It details tools (Xcode, Flipper) and processes (TestFlight), showing how to resolve iOS-specific issues, a common mobile challenge.

5. **What’s an example of a time you introduced a new tool to streamline React Native development?**

   **Answer**: My team struggled with inconsistent styling across a React Native app. I introduced NativeWind (Tailwind CSS for React Native), configured it with TypeScript, and trained the team via a workshop. This reduced styling code by 30% and improved UI consistency, accelerating development by two weeks.

   **Explanation**: This leverages your interest in NativeWind, showing leadership in adopting modern tools. It explains the tool’s impact (code reduction, consistency) and training, critical for team efficiency in mobile development.

6. **Tell us about a time you handled a tight deadline for a React Native feature.**

   **Answer**: A client needed a location-sharing feature in a week. I used `react-native-geolocation-service` for GPS access, implemented a simple UI with TypeScript, and tested on both platforms. I used Git for version control and delivered via CodePush, meeting the deadline and increasing user engagement by 20%.

   **Explanation**: This highlights your ability to deliver under pressure, using tools like `react-native-geolocation-service` and CodePush. It aligns with your interest in TypeScript and Git, showing practical mobile feature development.

### Situational Questions

7. **How would you handle a React Native app crashing on Android during a specific user action?**

   **Answer**: I’d reproduce the crash using Android Studio’s Logcat, focusing on the action (e.g., button press). If it’s a native module issue, I’d check Java/Kotlin code; for JavaScript, I’d use React Native Debugger. I’d isolate the issue with `try/catch`, test fixes on an emulator, and deploy via CodePush. Post-fix, I’d add Sentry monitoring to track recurrence.

   **Explanation**: This addresses Android-specific debugging, a common React Native challenge. It details tools (Logcat, React Native Debugger) and deployment strategies (CodePush), ensuring robust issue resolution and monitoring, critical for mobile app stability.

8. **What would you do if a React Native app’s animations cause performance issues on older devices?**

   **Answer**: I’d analyze animations with Flipper’s Animation plugin, replace heavy Animated API calls with `react-native-reanimated` for native-driven animations, and limit frame rates with `withTiming`. I’d test on older devices and monitor FPS with Performance Monitor, aiming for 60fps. This ensures smooth UX across devices.

   **Explanation**: Animations are key for mobile UX but can degrade performance. This answer leverages your interest in `react-native-reanimated`, explaining optimization and testing strategies for older devices, a critical mobile concern.

9. **How would you respond if a client reports inconsistent UI rendering across iOS and Android?**

   **Answer**: I’d use `Platform.OS` to apply platform-specific styles, normalize dimensions with `react-native-normalize`, and test with BrowserStack for device coverage. For example, iOS safe areas require extra padding. I’d review styles with NativeWind and confirm fixes with the client via a demo, ensuring consistent UX.

   **Explanation**: This addresses your interest in responsive design (e.g., Unistyles). It details cross-platform styling solutions and testing, ensuring consistent UI, a common challenge in React Native apps.

10. **What steps would you take if a React Native app’s API calls fail intermittently?**

    **Answer**: I’d implement retry logic with `react-query`, cache responses with AsyncStorage, and use `@react-native-community/netinfo` for network status. I’d log failures with Sentry, display a retry UI with Snackbar, and test with simulated network drops. This ensures robust data fetching and user feedback.

    **Explanation**: Intermittent API failures are common in mobile apps. This answer uses modern libraries (`react-query`, `netinfo`) and aligns with your interest in reliable data handling, ensuring a resilient mobile experience.

---

## Technical Round - React Native Basics

### Core Concepts

11. **What is the Virtual DOM in React Native, and how does it differ from React?**

    **Answer**: The Virtual DOM in React Native is a lightweight representation of the UI, but instead of updating a browser DOM, it maps to native components (e.g., UIView on iOS) via the JavaScript bridge. Unlike React’s browser DOM updates, React Native translates changes to native APIs, optimizing for mobile performance.

    **Explanation**: This clarifies a core React Native concept, contrasting it with React to highlight its mobile-specific rendering. Understanding the Virtual DOM’s role is essential for optimizing UI updates in mobile apps.

12. **What is the role of the `AppRegistry` in React Native?**

    **Answer**: `AppRegistry` registers the root component of a React Native app, bridging JavaScript and native code. Example:
    ```javascript
    import { AppRegistry } from 'react-native';
    import App from './App';
    AppRegistry.registerComponent('MyApp', () => App);
    ```
    It’s required to start the app and manage the entry point.

    **Explanation**: This explains a fundamental React Native setup step, critical for initializing mobile apps. It shows how `AppRegistry` integrates with native platforms, ensuring developers understand the app lifecycle.

13. **What is the significance of the `metro.config.js` file?**

    **Answer**: `metro.config.js` configures the Metro bundler, controlling module resolution, transformations, and caching. Example:
    ```javascript
    module.exports = {
      transformer: { getTransformOptions: async () => ({ transform: { experimentalImportSupport: true } }) }
    };
    ```
    It’s used to customize bundling for large apps or TypeScript support.

    **Explanation**: Metro is central to React Native’s development workflow. This answer details its configuration, aligning with your interest in TypeScript and project setup (e.g., `todoApp02`), critical for efficient builds.

14. **How does React Native handle hot reloading?**

    **Answer**: Hot reloading, enabled by Metro, updates JavaScript code in real-time without restarting the app. Enable it via the developer menu (`shake device`). It preserves app state, unlike live reloading, which refreshes the app. Example: Modify a component’s style, and see changes instantly.

    **Explanation**: This explains a key developer experience feature in React Native, improving productivity. It clarifies the difference from live reloading, essential for efficient mobile development workflows.

15. **What is the `Platform` module, and how is it used?**

    **Answer**: The `Platform` module provides platform-specific logic. Example:
    ```javascript
    import { Platform } from 'react-native';
    const fontFamily = Platform.select({ ios: 'Helvetica', android: 'Roboto' });
    ```
    It’s used for platform-specific styles, components, or APIs.

    **Explanation**: This addresses your interest in cross-platform development (e.g., responsive design). It shows how to handle platform differences, ensuring consistent mobile UX across iOS and Android.

### Components and Styling

16. **How do you create adaptive layouts in React Native?**

    **Answer**: Use Flexbox, `useWindowDimensions`, and libraries like `react-native-responsive-screen`. Example:
    ```javascript
    import { useWindowDimensions } from 'react-native';
    function Component() {
      const { width } = useWindowDimensions();
      return <View style={{ flex: 1, padding: width > 600 ? 20 : 10 }} />;
    }
    ```
    This ensures layouts adapt to tablets and phones.

    **Explanation**: Adaptive layouts are critical for mobile apps. This leverages your interest in responsive design (e.g., `device.width`), detailing tools and techniques for device compatibility.

17. **What is the difference between `TextInput` and `Text` components?**

    **Answer**: `TextInput` allows user input, while `Text` displays static text. Example:
    ```javascript
    <TextInput placeholder="Enter text" onChangeText={text => console.log(text)} />
    <Text>Static text</Text>
    ```
    Use `TextInput` for forms, `Text` for labels or content.

    **Explanation**: This clarifies core UI components, essential for mobile forms and displays. It aligns with your interest in UI elements (e.g., Swaraj’s input handling), showing their distinct roles.

18. **How do you use NativeWind for styling in React Native?**

    **Answer**: NativeWind applies Tailwind CSS utilities to React Native. Install:
    ```bash
    npm install nativewind tailwindcss
    ```
    ```javascript
    import { Text, View } from 'react-native';
    function Component() {
      return <View className="bg-yellow-500 p-4"><Text className="text-white">Styled</Text></View>;
    }
    ```
    Configure `tailwind.config.js` for custom styles.

    **Explanation**: This builds on your interest in NativeWind, explaining its setup and usage. It highlights its utility-first approach, streamlining mobile UI development.

19. **What is the `TouchableHighlight` component, and how does it differ from `TouchableOpacity`?**

    **Answer**: `TouchableHighlight` changes background color on press, while `TouchableOpacity` adjusts opacity. Example:
    ```javascript
    <TouchableHighlight underlayColor="#caca27" onPress={() => console.log('Pressed')}>
      <Text>Tap</Text>
    </TouchableHighlight>
    ```
    Use `TouchableHighlight` for stronger visual feedback.

    **Explanation**: This addresses your prior question about `TouchableOpacity`, comparing it with `TouchableHighlight`. It explains their UX differences, critical for mobile button interactions.

20. **How do you optimize image loading in React Native?**

    **Answer**: Use `react-native-fast-image` for caching and efficient rendering. Example:
    ```javascript
    import FastImage from 'react-native-fast-image';
    <FastImage
      source={{ uri: 'https://example.com/image.jpg', priority: FastImage.priority.high }}
      style={{ width: 200, height: 200 }}
      resizeMode={FastImage.resizeMode.cover}
    />
    ```
    This reduces load times and memory usage.

    **Explanation**: This aligns with your interest in image handling (e.g., Swaraj). It details optimization techniques, critical for mobile performance on diverse devices.

### JavaScript Questions

21. **What is the `useCallback` hook, and why is it used in React Native?**

    **Answer**: `useCallback` memoizes functions to prevent unnecessary re-renders. Example:
    ```javascript
    const handlePress = useCallback(() => console.log('Pressed'), []);
    <Button onPress={handlePress} title="Click" />
    ```
    It’s used to optimize performance in components passed as props.

    **Explanation**: This explains a performance-critical hook, essential for mobile apps where re-renders impact UX. It shows practical usage, aligning with React Native optimization needs.

22. **What is the difference between `async/await` and Promises in JavaScript?**

    **Answer**: `async/await` is syntactic sugar over Promises, making asynchronous code cleaner. Example:
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
    Promises use `.then`/`.catch`, but `async/await` improves readability.

    **Explanation**: This clarifies asynchronous programming, critical for mobile API calls. It compares syntaxes, showing why `async/await` is preferred in React Native for clarity.

23. **What is the `useMemo` hook, and when is it useful?**

    **Answer**: `useMemo` memoizes expensive computations, preventing recalculation. Example:
    ```javascript
    const filteredData = useMemo(() => data.filter(item => item.active), [data]);
    ```
    Use it for heavy operations like filtering large lists in FlatList.

    **Explanation**: This addresses performance optimization, a key mobile concern. It explains `useMemo`’s role in reducing computation overhead, critical for smooth React Native apps.

24. **What is the `Array.prototype.reduce` method?**

    **Answer**: `reduce` transforms an array into a single value. Example:
    ```javascript
    const sum = [1, 2, 3].reduce((acc, curr) => acc + curr, 0); // 6
    ```
    It’s used for aggregations, like calculating totals in a shopping cart.

    **Explanation**: This explains a versatile JavaScript method, useful for mobile apps (e.g., cart calculations). It aligns with your interest in data manipulation, showing practical application.

25. **What is the `WeakSet` object, and when is it used?**

    **Answer**: `WeakSet` stores objects with weak references, allowing garbage collection. Example:
    ```javascript
    const ws = new WeakSet();
    const obj = {};
    ws.add(obj);
    ```
    It’s used to track objects without preventing cleanup, like managing component instances.

    **Explanation**: This addresses memory management, critical for mobile apps. It explains `WeakSet`’s niche use case, ensuring developers understand resource optimization.

---

## Technical Round - Mobile-Specific

### Navigation and State Management

26. **What is the difference between `createStackNavigator` and `createNativeStackNavigator`?**

    **Answer**: `createStackNavigator` uses JavaScript-based navigation, while `createNativeStackNavigator` leverages native navigation (via `react-native-screens`). Example:
    ```javascript
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    const Stack = createNativeStackNavigator();
    ```
    Use `createNativeStackNavigator` for better performance.

    **Explanation**: This clarifies navigation options, emphasizing performance with native stacks, critical for smooth mobile transitions and aligning with your interest in navigation.

27. **How do you implement Redux Toolkit in a React Native app?**

    **Answer**: Install:
    ```bash
    npm install @reduxjs/toolkit react-redux
    ```
    ```javascript
    import { configureStore, createSlice } from '@reduxjs/toolkit';
    const userSlice = createSlice({
      name: 'user',
      initialState: { name: '' },
      reducers: { setName: (state, action) => { state.name = action.payload; } }
    });
    const store = configureStore({ reducer: userSlice.reducer });
    ```
    Wrap the app with `Provider` to access state.

    **Explanation**: This builds on your Redux Toolkit interest, detailing setup and usage for mobile state management, ensuring scalable app architecture.

28. **What is the `useRoute` hook in React Navigation?**

    **Answer**: `useRoute` accesses route parameters and metadata. Example:
    ```javascript
    import { useRoute } from '@react-navigation/native';
    function Component() {
      const { params } = useRoute();
      return <Text>{params.id}</Text>;
    }
    ```
    It’s used for dynamic screens, like user profiles.

    **Explanation**: This explains a navigation hook, critical for dynamic mobile UIs. It shows how to access route data, enhancing app interactivity.

29. **How do you handle state persistence across app restarts?**

    **Answer**: Use `redux-persist` with AsyncStorage. Example:
    ```bash
    npm install redux-persist
    ```
    ```javascript
    import { persistStore, persistReducer } from 'redux-persist';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    const persistConfig = { key: 'root', storage: AsyncStorage };
    const persistedReducer = persistReducer(persistConfig, reducer);
    ```
    This persists state like user settings.

    **Explanation**: This addresses your interest in state management, explaining persistent storage for mobile apps, ensuring seamless user experiences across sessions.

30. **What is deep linking, and how do you implement it?**

    **Answer**: Deep linking routes external URLs to app screens. Example:
    ```javascript
    const linking = {
      prefixes: ['myapp://'],
      config: { screens: { Details: 'details/:id' } }
    };
    <NavigationContainer linking={linking}><App /></NavigationContainer>
    ```
    Configure platform-specific URL schemes in native configs.

    **Explanation**: This explains a key mobile feature, aligning with your interest in navigation. It details setup and use case, critical for app integration with external links.

### Performance and Debugging

31. **How do you optimize React Native app memory usage?**

    **Answer**: Optimize with:
    - Hermes for efficient JavaScript execution.
    - `React.memo` for components.
    - Avoiding large state objects.
    - Monitoring with Flipper’s LeakCanary.
    Example: `const MemoizedComponent = React.memo(Component);`.

    **Explanation**: Memory management is critical for mobile apps. This details React Native-specific strategies, ensuring performance on resource-constrained devices.

32. **What is Flipper, and how is it used in React Native?**

    **Answer**: Flipper is a debugging platform for React Native, offering tools like network inspection and performance profiling. Install:
    ```bash
    npm install react-native-flipper
    ```
    Connect via Flipper desktop app to inspect app state and logs.

    **Explanation**: This introduces a powerful debugging tool, explaining its role in diagnosing mobile app issues, aligning with your interest in debugging (e.g., `todoApp02`).

33. **How do you handle slow API responses in a React Native app?**

    **Answer**: Use `react-query` for caching and retries, display loading indicators, and cache data with AsyncStorage. Example:
    ```javascript
    import { useQuery } from '@tanstack/react-query';
    const { data, isLoading } = useQuery(['data'], () => fetch('https://api.example.com/data').then(res => res.json()));
    ```
    Show `<ActivityIndicator />` if `isLoading`.

    **Explanation**: This addresses your interest in API handling, explaining modern tools for robust data fetching, critical for mobile app performance.

34. **What is the `Performance Monitor` in React Native, and how is it used?**

    **Answer**: The Performance Monitor (enabled via developer menu) displays FPS and memory usage. Use it to identify re-renders or lag. Example: Optimize a FlatList if FPS drops below 60. Combine with Flipper for deeper analysis.

    **Explanation**: This explains a built-in tool for performance debugging, critical for ensuring smooth mobile UX, especially for animations or lists.

35. **How do you test React Native apps on multiple devices?**

    **Answer**: Use emulators (Xcode, Android Studio), physical devices via TestFlight/ADB, and services like BrowserStack for broader coverage. Example: Test on iOS 16 and Android 12 to ensure compatibility. Automate with Detox for end-to-end tests.

    **Explanation**: This addresses cross-device testing, a key mobile concern. It details tools and automation, ensuring robust app performance across platforms.

---

## Framework-Specific Round

### React Native Advanced

36. **What is the `useAnimatedStyle` hook in `react-native-reanimated`?**

    **Answer**: `useAnimatedStyle` creates animated styles for `Animated.View`. Example:
    ```javascript
    import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
    function Component() {
      const offset = useSharedValue(0);
      const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateX: offset.value }] }));
      return <Animated.View style={[styles.box, animatedStyle]} />;
    }
    ```
    It ensures native-driven animations.

    **Explanation**: This leverages your interest in animations, explaining a key `react-native-reanimated` feature for smooth mobile UX, critical for performance.

37. **How do you implement custom native modules in React Native?**

    **Answer**: Create a module in Java/Swift and bridge it. Example (Android):
    ```java
    public class MyModule extends ReactContextBaseJavaModule {
      @Override
      public String getName() { return "MyModule"; }
      @ReactMethod
      public void doSomething() { /* Native code */ }
    }
    ```
    Register in JavaScript with `NativeModules.MyModule`.

    **Explanation**: This explains advanced React Native customization, critical for platform-specific features, showing how to extend functionality beyond JavaScript.

38. **What is the `useNativeDriver` option in animations?**

    **Answer**: `useNativeDriver: true` offloads animations to the native thread, improving performance. Example:
    ```javascript
    Animated.timing(value, { toValue: 100, duration: 500, useNativeDriver: true }).start();
    ```
    It’s essential for smooth animations on mobile.

    **Explanation**: This addresses animation performance, explaining a key optimization technique for React Native, ensuring fluid mobile UX.

39. **How do you handle gestures in React Native?**

    **Answer**: Use `react-native-gesture-handler`. Example:
    ```javascript
    import { PanGestureHandler } from 'react-native-gesture-handler';
    function Component() {
      return (
        <PanGestureHandler onGestureEvent={event => console.log(event.nativeEvent.translationX)}>
          <View style={styles.box} />
        </PanGestureHandler>
      );
    }
    ```
    It supports complex gestures like swipes.

    **Explanation**: Gestures enhance mobile interactivity. This details a standard library, showing how to implement touch interactions, critical for engaging UX.

40. **What is the `useColorScheme` hook?**

    **Answer**: `useColorScheme` detects the device’s color scheme (light/dark). Example:
    ```javascript
    import { useColorScheme } from 'react-native';
    function Component() {
      const scheme = useColorScheme();
      return <View style={{ backgroundColor: scheme === 'dark' ? '#000' : '#fff' }} />;
    }
    ```
    It enables adaptive theming.

    **Explanation**: This addresses your interest in styling, explaining a hook for responsive theming, critical for mobile UX consistency across device settings.

### Third-Party Libraries

41. **How do you integrate push notifications in React Native?**

    **Answer**: Use `@react-native-firebase/messaging`. Example:
    ```javascript
    import messaging from '@react-native-firebase/messaging';
    useEffect(() => {
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('Opened:', remoteMessage);
      });
    }, []);
    ```
    Configure Firebase for iOS/Android.

    **Explanation**: This leverages your interest in notifications (e.g., Swaraj), detailing setup and usage for a common mobile feature, ensuring user engagement.

42. **What is `react-native-mmkv` for storage?**

    **Answer**: `react-native-mmkv` is a fast, persistent key-value store. Example:
    ```bash
    npm install react-native-mmkv
    ```
    ```javascript
    import { MMKV } from 'react-native-mmkv';
    const storage = new MMKV();
    storage.set('key', 'value');
    ```
    It’s faster than AsyncStorage for large data.

    **Explanation**: This introduces an advanced storage option, explaining its performance benefits for mobile apps, aligning with your interest in efficient data handling.

43. **How do you use `react-native-camera` for camera functionality?**

    **Answer**: Install:
    ```bash
    npm install react-native-camera
    ```
    ```javascript
    import { RNCamera } from 'react-native-camera';
    function CameraComponent() {
      return <RNCamera style={styles.preview} type={RNCamera.Constants.Type.back} />;
    }
    ```
    Configure permissions in `AndroidManifest.xml` and `Info.plist`.

    **Explanation**: This addresses camera integration, a common mobile feature, detailing setup and permissions, critical for apps like Swaraj.

44. **What is `react-native-permissions` used for?**

    **Answer**: `react-native-permissions` manages runtime permissions. Example:
    ```javascript
    import { request, PERMISSIONS } from 'react-native-permissions';
    request(PERMISSIONS.IOS.CAMERA).then(result => console.log(result));
    ```
    It ensures compliance with platform permission models.

    **Explanation**: Permissions are critical for mobile apps. This explains a standard library, showing how to handle user permissions, ensuring app functionality.

45. **How do you use `react-native-share` for sharing content?**

    **Answer**: Install:
    ```bash
    npm install react-native-share
    ```
    ```javascript
    import Share from 'react-native-share';
    Share.share({ message: 'Check this out!', url: 'https://example.com' });
    ```
    It enables sharing to other apps.

    **Explanation**: This addresses your interest in social features (e.g., Swaraj), explaining a library for content sharing, a common mobile UX pattern.

---

## Advanced Technical Round

### Optimization and Scalability Questions

46. **How do you optimize React Native app bundle size?**

    **Answer**: Optimize with:
    - Hermes for bytecode compilation.
    - Code splitting with `React.lazy`.
    - Tree shaking to remove unused code.
    - Minifying assets with `react-native-bundle-visualizer`.
    Example: Enable Hermes in `build.gradle`.

    **Explanation**: Bundle size impacts mobile app performance. This details React Native-specific strategies, ensuring fast startup and efficient resource use.

47. **What is the role of native bridges in React Native performance?**

    **Answer**: The JavaScript bridge facilitates communication between JavaScript and native code, but heavy use (e.g., frequent native calls) can cause bottlenecks. Optimize by batching calls or using native-driven libraries like `react-native-reanimated`.

    **Explanation**: This explains a performance-critical aspect of React Native, showing how to mitigate bridge overhead, essential for smooth mobile apps.

48. **How do you implement offline syncing in a React Native app?**

    **Answer**: Use `redux-persist` for state and `react-query` for API caching. Example:
    ```javascript
    import { persistStore } from 'redux-persist';
    const persistor = persistStore(store);
    ```
    Sync data when online using `@react-native-community/netinfo`.

    **Explanation**: Offline syncing is key for mobile apps. This details robust solutions, aligning with your interest in reliable data handling.

49. **What is the difference between managed and bare workflows in Expo?**

    **Answer**:
    - **Managed**: Uses Expo’s prebuilt tools, simpler but limited native access.
    - **Bare**: Full control over native code, suitable for custom modules.
    Choose bare for complex apps with native integrations.

    **Explanation**: This clarifies Expo workflows, addressing your React Native CLI experience (e.g., `todoApp02`), helping developers choose the right approach.

50. **How do you monitor React Native app performance in production?**

    **Answer**: Use Sentry for error tracking, New Relic for performance metrics, and Flipper for real-time debugging. Example: Configure Sentry to capture crashes and slow transactions, ensuring proactive issue resolution.

    **Explanation**: Monitoring is critical for mobile apps. This details industry-standard tools, ensuring developers can maintain app reliability in production.

### Coding Questions

51. **Write a React Native component to toggle dark mode.**

    **Answer**:
    ```javascript
    import { useColorScheme } from 'react-native';
    import { View, Button, StyleSheet } from 'react-native';
    function ThemeToggle() {
      const scheme = useColorScheme();
      const toggleTheme = () => {
        // Assume theme state management
        console.log('Toggle to', scheme === 'dark' ? 'light' : 'dark');
      };
      return (
        <View style={[styles.container, { backgroundColor: scheme === 'dark' ? '#000' : '#fff' }]}>
          <Button title="Toggle Theme" onPress={toggleTheme} />
        </View>
      );
    }
    const styles = StyleSheet.create({
      container: { flex: 1 }
    });
    ```

    **Explanation**: This leverages your interest in theming, showing how to use `useColorScheme` for adaptive UI, a common mobile requirement.

52. **Write a function to fetch data with retry logic.**

    **Answer**:
    ```javascript
    async function fetchWithRetry(url, retries = 3, delay = 1000) {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url);
          return response.json();
        } catch (error) {
          if (i === retries - 1) throw error;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    ```

    **Explanation**: This addresses reliable API calls, critical for mobile apps, showing retry logic for handling network failures.

53. **Write a FlatList component with infinite scroll.**

    **Answer**:
    ```javascript
    import { useState, useEffect } from 'react';
    import { FlatList, Text } from 'react-native';
    function InfiniteList() {
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
          renderItem={({ item }) => <Text>{item.title}</Text>}
          onEndReached={() => setPage(prev => prev + 1)}
          onEndReachedThreshold={0.5}
        />
      );
    }
    ```

    **Explanation**: This demonstrates infinite scrolling, a common mobile pattern, ensuring efficient data loading for large lists.

54. **Write a TypeScript interface for a React Native navigation screen.**

    **Answer**:
    ```typescript
    import { NativeStackScreenProps } from '@react-navigation/native-stack';
    type RootStackParamList = { Home: undefined; Details: { id: string } };
    type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;
    const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => (
      <Text>{route.params.id}</Text>
    );
    ```

    **Explanation**: This leverages your TypeScript interest, showing how to type navigation props, ensuring type-safe navigation in React Native.

55. **Write a component to handle image uploads.**

    **Answer**:
    ```javascript
    import { useState } from 'react';
    import { Button, Image } from 'react-native';
    import * as ImagePicker from 'react-native-image-picker';
    function ImageUpload() {
      const [image, setImage] = useState(null);
      const pickImage = async () => {
        const result = await ImagePicker.launchImageLibrary({ mediaType: 'photo' });
        if (result.assets) setImage(result.assets[0].uri);
      };
      return (
        <>
          <Button title="Pick Image" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </>
      );
    }
    ```

    **Explanation**: This addresses your interest in image handling (e.g., Swaraj), showing how to implement uploads, a common mobile feature.

---

## Final Round

### Cultural Fit and Industry Knowledge

56. **How do you keep up with React Native advancements?**

    **Answer**: I follow React Native’s blog, join Discord communities, and experiment with new libraries like `react-native-reanimated` v3 in side projects. I also contribute to open-source repos on GitHub, ensuring I stay updated with trends like TypeScript and native navigation.

    **Explanation**: This shows proactive learning, aligning with your interest in staying current (e.g., TypeScript, Git). It details specific resources, critical for mobile development.

57. **What excites you about building mobile apps with React Native?**

    **Answer**: React Native’s cross-platform capabilities and rich ecosystem (e.g., NativeWind, TypeScript) allow me to build performant apps, like a real-time chat app I developed. Creating intuitive mobile experiences with native-like performance is thrilling and aligns with user expectations.

    **Explanation**: This ties your passion for React Native to its technical strengths, referencing your project interests (e.g., Swaraj), showing enthusiasm for mobile development.

58. **How do you ensure accessibility in React Native apps?**

    **Answer**: Use `accessibilityLabel`, `accessibilityRole`, and test with VoiceOver (iOS) and TalkBack (Android). Example:
    ```javascript
    <TouchableOpacity accessibilityLabel="Submit button" accessibilityRole="button">
      <Text>Submit</Text>
    </TouchableOpacity>
    ```
    Follow WCAG guidelines for inclusive UX.

    **Explanation**: Accessibility is critical for mobile apps. This details React Native-specific practices, ensuring inclusive design, a key industry standard.

59. **What’s a recent React Native challenge you overcame?**

    **Answer**: A navigation lag in a social app was caused by heavy re-renders. I optimized with `react-native-screens` and `React.memo`, reducing transition time by 40%. This improved my skills in mobile performance tuning.

    **Explanation**: This showcases problem-solving, leveraging your interest in navigation and performance, with a quantifiable outcome.

60. **Why are you a good fit for this React Native role?**

    **Answer**: My experience with React Native, TypeScript, and libraries like NativeWind and `react-native-reanimated`, as seen in projects like a task app, aligns with your focus on scalable mobile solutions. I’m eager to build user-centric apps and grow in areas like native module development.

    **Explanation**: This ties your skills (e.g., Swaraj, `todoApp02`) to the role, emphasizing passion and alignment with mobile development goals.

---

This guide provides 60 questions to prepare for a React Native developer interview. Tailor these answers to your experience (e.g., projects like Swaraj or `todoApp02`, skills in TypeScript and styling), practice them, and approach each round confidently to succeed!