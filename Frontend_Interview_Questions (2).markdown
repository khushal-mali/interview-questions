# 100 Front End Developer Interview Questions with Answers

This document provides 100 questions and detailed answers for a Front End Developer role, tailored to Khushal Mali’s experience as a full-stack developer with expertise in JavaScript, TypeScript, React, Next.js, React Native, and related technologies, as demonstrated in his internship and personal projects.

---

## General Front End Development

1. **What is your background as a Front End Developer?**  
   **Answer**: I’m a full-stack developer with a focus on front-end technologies like JavaScript (ES6+), TypeScript, React, Next.js, and React Native. During my internship at The RD Group of Industries, I built cross-platform MERN applications and real-time dashboards, improving load times by 40% using lazy loading and SSR. My projects, like the AI Workout Tracker and Slacky Chat, showcase responsive UIs with Tailwind CSS and state management with Zustand.

2. **Which front-end tools are you most proficient in?**  
   **Answer**: I’m proficient in JavaScript (ES6+), TypeScript, HTML5, CSS3, React, Next.js, React Native, Redux Toolkit, Zustand, Jotai, React Query, Tailwind CSS, NativeWind, and Shadcn UI, which I used in projects like Care Pulse and Slacky Chat for scalable, user-friendly interfaces.

3. **How do you ensure clean and maintainable code?**  
   **Answer**: I use modular code structures, TypeScript for type safety, ESLint/Prettier for formatting, and follow DRY principles. In Slacky Chat, I wrote reusable React components and documented code for better maintainability.

4. **Explain the difference between `let`, `const`, and `var`.**  
   **Answer**: `var` is function-scoped and allows re-declaration; `let` is block-scoped and allows reassignment; `const` is block-scoped and prevents reassignment. I use `const` and `let` for predictable scoping, as in my Airbnb-inspired platform.

5. **Why do you use TypeScript in your projects?**  
   **Answer**: TypeScript adds static typing, catching errors early and improving code scalability. In Care Pulse, I used interfaces to define props and API response types, enhancing developer experience.

6. **How do you debug front-end issues?**  
   **Answer**: I use Chrome DevTools for inspecting elements and network requests, React Developer Tools for component debugging, and TypeScript for catching type errors. In my internship, I debugged dashboard rendering issues this way.

7. **What’s the difference between React and Next.js?**  
   **Answer**: React is a UI library, while Next.js is a React framework with SSR, SSG, and file-based routing. I used Next.js in Slacky Chat for SSR to improve performance and SEO.

8. **What is the Virtual DOM in React?**  
   **Answer**: The Virtual DOM is an in-memory representation of the real DOM. React uses it to compute minimal updates, improving performance. In my projects, I optimize it with `React.memo` and `useMemo`.

9. **How do you manage state in React?**  
   **Answer**: I use Zustand for lightweight state management (e.g., AI Workout Tracker) and React Query for server-state (e.g., internship dashboards). For complex apps, I combine both for efficiency.

10. **What is React Query, and how did you use it?**  
    **Answer**: React Query manages server-side state and caching. In my internship, I used it to fetch and cache dashboard data, enabling real-time updates with minimal refetching.

---

## React and Next.js

11. **What are React Hooks, and how do you use them?**  
    **Answer**: Hooks like `useState` and `useEffect` enable state and lifecycle management in functional components. In the Airbnb-inspired platform, I used `useEffect` for API calls and `useState` for UI state.

12. **What’s the difference between `useEffect` and `useLayoutEffect`?**  
    **Answer**: `useEffect` runs asynchronously after DOM updates; `useLayoutEffect` runs synchronously before painting. I use `useEffect` for most side effects, like fetching data in Slacky Chat.

13. **How do you optimize React rendering?**  
    **Answer**: I use `React.memo`, `useMemo`, and `useCallback` to prevent unnecessary re-renders. In my internship, I implemented code splitting with `React.lazy` to reduce load times by 40%.

14. **What is server-side rendering (SSR) in Next.js?**  
    **Answer**: SSR renders pages on the server for faster initial loads and better SEO. In Care Pulse, I used `getServerSideProps` to fetch dynamic data for patient dashboards.

15. **How do you handle routing in Next.js?**  
    **Answer**: Next.js uses file-based routing. In the Airbnb-inspired platform, I used dynamic routes (`[id].js`) for property pages and `getServerSideProps` for SSR.

16. **What’s the difference between `getStaticProps` and `getServerSideProps`?**  
    **Answer**: `getStaticProps` fetches data at build time for SSG; `getServerSideProps` fetches data per request for SSR. I used both in Care Pulse for static and dynamic pages.

17. **How do you make API calls in Next.js?**  
    **Answer**: I create API routes in `pages/api` and use `fetch` or React Query on the client. In Slacky Chat, I designed RESTful APIs for real-time messaging with Convex.

18. **What is the purpose of `_app.js` in Next.js?**  
    **Answer**: `_app.js` customizes the App component for global layouts and state. In Care Pulse, I used it to wrap the app with a consistent layout and Shadcn UI components.

19. **How do you implement authentication in Next.js?**  
    **Answer**: I use NextAuth.js for OAuth and JWT-based authentication. In Slacky Chat, I implemented Google OAuth with role-based access control using NextAuth.js.

20. **Why use TypeScript with React/Next.js?**  
    **Answer**: TypeScript ensures type safety and better tooling. In Slacky Chat, I defined interfaces for props and state, reducing errors and improving code clarity.

---

## React Native

21. **What is React Native, and how did you use it?**  
    **Answer**: React Native builds mobile apps using React. In the AI Workout Tracker, I used it with Expo and TypeScript to create a cross-platform fitness app with AI-driven features.

22. **How do you manage navigation in React Native?**  
    **Answer**: I use React Navigation. In the AI Workout Tracker, I implemented stack and tab navigators for seamless transitions between workout and profile screens.

23. **What is Expo CLI, and how did you leverage it?**  
    **Answer**: Expo CLI simplifies React Native development. In the AI Workout Tracker, I used it for rapid development, testing, and deployment with a managed workflow.

24. **How do you optimize React Native apps?**  
    **Answer**: I use FlatList for lists, memoize components, and optimize animations with `useNativeDriver`. In the AI Workout Tracker, I lazy-loaded exercise data for faster startup.

25. **What is NativeWind, and how did you use it?**  
    **Answer**: NativeWind applies Tailwind CSS to React Native. In the AI Workout Tracker, I used it for responsive styling, ensuring consistent UI across iOS and Android.

26. **How do you manage state in React Native?**  
    **Answer**: I use Zustand for lightweight state management. In the AI Workout Tracker, I managed workout data and user preferences with Zustand for efficiency.

27. **What challenges did you face in React Native?**  
    **Answer**: Platform-specific bugs were challenging. In the AI Workout Tracker, I resolved Android rendering issues by testing on multiple devices and optimizing animations.

28. **How do you implement push notifications in React Native?**  
    **Answer**: I use Expo’s notification API. In the AI Workout Tracker, I implemented push notifications for workout reminders, ensuring reliable delivery.

29. **What is Clerk, and how did you use it?**  
    **Answer**: Clerk provides authentication and user management. In the AI Workout Tracker, I used Clerk for Google OAuth, ensuring secure and GDPR-compliant login flows.

30. **How do you test React Native apps?**  
    **Answer**: I use Jest and React Native Testing Library. In the AI Workout Tracker, I tested UI components and form correction logic to ensure reliability.

---

## CSS and Styling

31. **What is Tailwind CSS, and why do you use it?**  
    **Answer**: Tailwind CSS is a utility-first framework for rapid styling. I used it in Slacky Chat for responsive, customizable designs without writing custom CSS.

32. **How does Tailwind CSS differ from Bootstrap?**  
    **Answer**: Tailwind uses utility classes for flexibility, while Bootstrap offers pre-built components. I prefer Tailwind for custom designs, as in Care Pulse.

33. **What is Shadcn UI, and how did you implement it?**  
    **Answer**: Shadcn UI provides customizable React components. In Slacky Chat, I used it for buttons and modals, integrating with Tailwind for consistent styling.

34. **How do you ensure responsive design?**  
    **Answer**: I use Tailwind’s responsive utilities and media queries. In the Airbnb-inspired platform, I created responsive grids for property listings across devices.

35. **When do you use Flexbox vs. Grid?**  
    **Answer**: Flexbox is for one-dimensional layouts; Grid is for two-dimensional. In Care Pulse, I used Flexbox for navbars and Grid for dashboard layouts.

36. **How do you ensure cross-browser compatibility?**  
    **Answer**: I use Autoprefixer with Tailwind and test in Chrome, Firefox, and Safari. I also provide fallbacks for older browsers, as in Slacky Chat.

37. **What is the CSS Box Model?**  
    **Answer**: The Box Model includes content, padding, borders, and margins. I use it in Tailwind projects to ensure accurate spacing, as in Care Pulse.

38. **How do you implement CSS animations?**  
    **Answer**: I use Tailwind’s animation utilities or `@keyframes`. In the AI Workout Tracker, I applied smooth transitions for modals using Tailwind classes.

39. **What are CSS custom properties?**  
    **Answer**: Custom properties store reusable values. In Slacky Chat, I defined them in `tailwind.config.js` for consistent theming across components.

40. **How do you ensure accessibility in styling?**  
    **Answer**: I use semantic HTML, ARIA attributes, and test with screen readers. In Care Pulse, I ensured form inputs had proper labels and focus states.

---

## JavaScript and TypeScript

41. **What are closures in JavaScript?**  
    **Answer**: Closures allow functions to access their lexical scope. I use them in React for event handlers, ensuring data encapsulation in components.

42. **What’s the difference between `==` and `===`?**  
    **Answer**: `==` coerces types; `===` checks value and type. I use `===` in TypeScript projects like Slacky Chat for strict equality.

43. **What is the JavaScript event loop?**  
    **Answer**: The event loop manages asynchronous tasks via the call stack and queues. I use it for async API calls in React Query, as in my internship.

44. **How do you handle async operations in JavaScript?**  
    **Answer**: I use `async/await` and Promises. In the Airbnb-inspired platform, I used `async/await` for fetching property data from APIs.

45. **What are arrow functions?**  
    **Answer**: Arrow functions have concise syntax and don’t bind `this`. I use them in React for event handlers, as in Care Pulse, to maintain context.

46. **What’s the difference between `interface` and `type` in TypeScript?**  
    **Answer**: `interface` is extendable; `type` supports unions. In Slacky Chat, I used `interface` for props and `type` for state unions.

47. **How do you handle errors in TypeScript?**  
    **Answer**: I use try-catch and discriminated unions. In Care Pulse, I implemented React error boundaries to handle UI errors gracefully.

48. **What is the `unknown` type in TypeScript?**  
    **Answer**: `unknown` is a safer `any`, requiring type checking. I use it for API responses, narrowing types with guards, as in Slacky Chat.

49. **What is a Promise in JavaScript?**  
    **Answer**: A Promise handles asynchronous operations. In my internship, I used Promises with `fetch` for dashboard API calls.

50. **How do `map`, `filter`, and `reduce` differ?**  
    **Answer**: `map` transforms elements, `filter` selects elements, `reduce` aggregates. In the Airbnb-inspired platform, I used `map` for listings and `filter` for searches.

---

## Performance and Optimization

51. **How do you optimize React app performance?**  
    **Answer**: I use memoization, code splitting, and React Query. In my internship, I reduced load times by 40% with lazy loading and SSR.

52. **What is code splitting?**  
    **Answer**: Code splitting splits bundles into smaller chunks. In my internship, I used `React.lazy` and `Suspense` for dynamic dashboard loading.

53. **What is lazy loading?**  
    **Answer**: Lazy loading defers non-critical resource loading. In the AI Workout Tracker, I lazy-loaded images to improve startup time.

54. **How do you optimize images?**  
    **Answer**: I use WebP format and Cloudinary for compression. In the Airbnb-inspired platform, Cloudinary optimized property image delivery.

55. **What is tree shaking?**  
    **Answer**: Tree shaking removes unused code from bundles. I rely on Next.js’s Webpack for tree shaking in Slacky Chat.

56. **How do you measure front-end performance?**  
    **Answer**: I use Lighthouse and Chrome DevTools. In Care Pulse, Lighthouse helped achieve high performance scores.

57. **What is the Critical Rendering Path?**  
    **Answer**: It’s the process of rendering a page. I optimize it with async scripts and inlined CSS, as in Care Pulse.

58. **How do you handle large datasets in React?**  
    **Answer**: I use virtualization (`react-window`) and pagination. In my internship, I paginated dashboard data for performance.

59. **What are service workers?**  
    **Answer**: Service workers enable caching and offline access. I’m familiar with them for PWAs but haven’t implemented them yet.

60. **How do you reduce reflows and repaints?**  
    **Answer**: I minimize DOM changes and use CSS transforms. In Slacky Chat, I optimized animations to reduce reflows.

---

## Authentication and Security

61. **How do you implement secure authentication?**  
    **Answer**: I use JWT and OAuth with Clerk or NextAuth.js. In the AI Workout Tracker, I implemented Google OAuth with Clerk.

62. **What is JWT?**  
    **Answer**: JWT is a token for authentication. In my internship, I used JWT to secure API requests for dashboards.

63. **What is OAuth 2.0?**  
    **Answer**: OAuth 2.0 authorizes third-party access. In Slacky Chat, I used it with NextAuth.js for Google login.

64. **How do you prevent XSS attacks?**  
    **Answer**: I sanitize inputs and use React’s escaping. In Care Pulse, I set CSP headers to mitigate XSS risks.

65. **What is role-based access control (RBAC)?**  
    **Answer**: RBAC restricts access by roles. In Slacky Chat, I used NextAuth.js to enforce workspace access based on user roles.

66. **How do you secure API calls?**  
    **Answer**: I use HTTPS and JWT tokens. In the Airbnb-inspired platform, I secured API calls with proper CORS settings.

67. **What is CORS?**  
    **Answer**: CORS controls cross-origin requests. In my internship, I configured CORS on Express.js for secure API access.

68. **How do you store sensitive data?**  
    **Answer**: I use `HttpOnly` cookies or encrypted local storage. In the AI Workout Tracker, Clerk handled secure token storage.

69. **What is CSRF, and how do you mitigate it?**  
    **Answer**: CSRF involves unauthorized actions. I mitigate it with CSRF tokens, as in Slacky Chat’s authentication.

70. **How do you ensure GDPR compliance?**  
    **Answer**: I implement consent management and secure storage. In the AI Workout Tracker, Clerk ensured GDPR-compliant data handling.

---

## Tools and Workflow

71. **How do you use Git in your workflow?**  
    **Answer**: I use Git for version control, creating branches and pull requests. In my internship, I used GitHub for collaborative development.

72. **What is Postman’s role in your process?**  
    **Answer**: Postman tests APIs. In my internship, I used it to verify dashboard API endpoints.

73. **How did you use Vercel?**  
    **Answer**: Vercel deploys web apps. I used it for Care Pulse and Slacky Chat, leveraging automatic scaling.

74. **What is Cloudinary’s role in your projects?**  
    **Answer**: Cloudinary manages media. In the Airbnb-inspired platform, I used it for optimized image uploads.

75. **How do you write unit tests?**  
    **Answer**: I use Jest and React Testing Library. In the AI Workout Tracker, I tested UI components for reliability.

76. **How do you collaborate with backend teams?**  
    **Answer**: I define API contracts and use Postman. In my internship, I worked with backend teams to design REST APIs.

77. **What’s your approach to code reviews?**  
    **Answer**: I review for readability and performance, providing feedback. In my internship, I participated in GitHub pull request reviews.

78. **How do you stay updated with trends?**  
    **Answer**: I read blogs, documentation, and follow X for updates. I learned Shadcn UI by experimenting with demos.

79. **What’s your experience with CI/CD?**  
    **Answer**: I use Vercel’s CI/CD for deployments. In Care Pulse, I set up automatic deployments on commits.

80. **How do you manage project deadlines?**  
    **Answer**: I use Agile, prioritizing critical tasks. In my internship, I focused on dashboards to meet deadlines.

---

## Project-Specific Questions

81. **Describe the AI Workout Tracker.**  
    **Answer**: It’s a React Native app with AI-driven workout recommendations, built with Expo, TypeScript, Sanity CMS, and Clerk for authentication, using NativeWind for styling.

82. **What challenges did you face in the AI Workout Tracker?**  
    **Answer**: Gemini API latency was an issue. I optimized it with debouncing and caching for smooth performance.

83. **How did you enable real-time messaging in Slacky Chat?**  
    **Answer**: I used Convex for real-time data syncing, with Next.js and Shadcn UI for the frontend.

84. **How did you implement RBAC in Slacky Chat?**  
    **Answer**: I used NextAuth.js and Convex to assign roles and restrict workspace access.

85. **How did you optimize the Airbnb-inspired platform?**  
    **Answer**: I used Next.js SSR, Cloudinary for images, and React Query for caching, with dynamic search filters.

86. **What was the tech stack for Care Pulse?**  
    **Answer**: TypeScript, Next.js, Appwrite, Shadcn UI, and Vercel for a healthcare appointment app.

87. **How did you ensure accessibility in Care Pulse?**  
    **Answer**: I used semantic HTML, ARIA, and tested with screen readers for form accessibility.

88. **What was Sanity CMS’s role in the AI Workout Tracker?**  
    **Answer**: Sanity CMS managed real-time workout data, integrated with the React Native frontend.

89. **How did you implement search in the Airbnb-inspired platform?**  
    **Answer**: I used Prisma for queries and debounced search inputs for efficient filtering.

90. **What was rewarding about your projects?**  
    **Answer**: Delivering impactful solutions like healthcare management in Care Pulse was highly rewarding.

---

## Advanced Topics

91. **What is WAI-ARIA?**  
    **Answer**: WAI-ARIA enhances accessibility for dynamic content. In Care Pulse, I used ARIA roles for forms.

92. **What are Progressive Web Apps (PWAs)?**  
    **Answer**: PWAs offer native-like experiences. I’m familiar with them but haven’t built one yet.

93. **How do you handle internationalization (i18n)?**  
    **Answer**: I’d use `react-i18next` or Next.js i18n routing for language support and RTL compatibility.

94. **What’s GraphQL vs. REST?**  
    **Answer**: GraphQL offers flexible queries; REST uses fixed endpoints. I’ve used REST but am exploring GraphQL.

95. **How do you implement dark mode?**  
    **Answer**: I use Tailwind’s `dark` variant. In Slacky Chat, I toggled themes with `prefers-color-scheme`.

96. **What is Webpack’s role?**  
    **Answer**: Webpack bundles and optimizes code. I use Next.js’s Webpack for tree shaking in my projects.

97. **How do you use browser storage?**  
    **Answer**: I use `localStorage` for persistent data. In the AI Workout Tracker, I stored preferences securely.

98. **What is Jamstack?**  
    **Answer**: Jamstack uses static sites with APIs. My Next.js projects like Care Pulse align with Jamstack.

99. **How do you implement real-time features?**  
    **Answer**: I use Convex or WebSockets. In Slacky Chat, Convex enabled real-time messaging.

100. **How do you learn new technologies?**  
     **Answer**: I build demos, read docs, and follow tutorials. I learned Shadcn UI by experimenting before using it in Slacky Chat.

---