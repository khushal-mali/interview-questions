# 50 Most Asked Next.js Interview Questions with Detailed Answers and Code Examples (2025, Next.js 15)

This document provides a curated set of 50 commonly asked Next.js interview questions, aligned with Next.js version 15 (released October 2024), covering essential and advanced concepts. Designed for front-end developer interviews, these questions include detailed answers and practical code examples using modern Next.js features in the App Router, focusing on server components, streaming, partial prerendering, and performance optimization. Ideal for both beginners and experienced developers preparing for Next.js-related roles.

---

## 1. What is Next.js, and how does it differ from React?

**Answer**: Next.js is a React-based framework for building server-rendered, static, or hybrid web applications. Unlike React, a library for building UI components, Next.js provides additional features like file-based routing, server-side rendering (SSR), static site generation (SSG), incremental static regeneration (ISR), and built-in optimizations for performance and SEO. Next.js 15 enhances server components in the App Router, supports streaming, partial prerendering, and improved TypeScript integration, simplifying full-stack development with React.

**Code Example**:

```jsx
// app/page.tsx (Next.js 15, App Router)
export default function Home() {
  return <h1>Welcome to Next.js 15!</h1>;
}
// Automatically routed to "/"
```

---

## 2. What is the App Router in Next.js 15, and how does it differ from the Pages Router?

**Answer**: The App Router, introduced in Next.js 13 and stabilized in Next.js 15, is the modern routing system using the `app/` directory. It supports React Server Components (RSCs) by default, nested layouts, dynamic routes, and advanced features like streaming and parallel routes. Unlike the Pages Router (`pages/`), which relies on file-based routing for pages only, the App Router allows colocated components, layouts, and server-side logic, offering better performance and flexibility. Pages Router is still supported but deprecated for new features.

**Code Example**:

```jsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// app/page.tsx
export default function Home() {
  return <h1>Home Page</h1>;
}
```

---

## 3. What are React Server Components (RSCs) in Next.js 15?

**Answer**: React Server Components (RSCs) are a Next.js 15 feature that allows components to render on the server by default, reducing client-side JavaScript and improving performance. RSCs support asynchronous rendering, direct database access, and streaming, ideal for data-heavy applications. Client components (marked with `"use client"`) handle interactivity. RSCs integrate seamlessly with the App Router, enabling hybrid rendering (server + client) for optimal UX and SEO.

**Code Example**:

```jsx
// app/server-component.tsx (Server Component by default)
async function ServerComponent() {
  const data = await fetch("https://api.example.com/data").then((res) => res.json());
  return <div>Data: {data.name}</div>;
}

export default ServerComponent;
```

---

## 4. What is Partial Prerendering in Next.js 15, and when should you use it?

**Answer**: Partial Prerendering (PPR), experimental in Next.js 15, combines static and dynamic rendering within a single page. Static parts (e.g., headers, footers) are prerendered at build time, while dynamic parts (e.g., user-specific data) are streamed or rendered on-demand. PPR reduces initial load times and improves SEO while maintaining dynamic interactivity. Use it for pages with a mix of static and user-specific content, like dashboards or e-commerce product pages.

**Code Example**:

```jsx
// app/product/[id]/page.tsx
import { Suspense } from "react";

async function ProductDetails({ id }: { id: string }) {
  const product = await fetch(`https://api.example.com/product/${id}`).then((res) =>
    res.json()
  );
  return <h1>{product.name}</h1>;
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <header>Static Header</header>
      <Suspense fallback={<p>Loading...</p>}>
        <ProductDetails id={params.id} />
      </Suspense>
    </div>
  );
}
// Static header prerendered, product details streamed
```

---

## 5. How does file-based routing work in the Next.js 15 App Router?

**Answer**: In Next.js 15’s App Router, file-based routing maps files in the `app/` directory to URL paths. Files named `page.tsx` define routes, while `layout.tsx` defines shared UI. Folders create nested routes, and dynamic routes use `[param]` or `[...slug]` syntax. Special files like `loading.tsx` and `error.tsx` handle loading states and errors. This system simplifies routing and supports advanced patterns like parallel routes and intercepting routes.

**Code Example**:

```jsx
// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return <h1>Blog Post: {params.slug}</h1>;
}
// URL: /blog/my-post
```

---

## 6. What is the difference between SSR, SSG, and ISR in Next.js 15?

**Answer**:

- **Server-Side Rendering (SSR)**: Renders pages on each request using `getServerSideProps` (Pages Router) or server components (App Router), ideal for dynamic, user-specific data.
- **Static Site Generation (SSG)**: Prerenders pages at build time using `getStaticProps`, suitable for static content like blogs.
- **Incremental Static Regeneration (ISR)**: Combines SSG with on-demand revalidation, regenerating pages in the background after a specified `revalidate` period.
  Next.js 15 enhances these with RSCs and PPR for hybrid rendering, improving performance and flexibility.

**Code Example (SSG with ISR)**:

```jsx
// app/page.tsx
export const revalidate = 60; // Revalidate every 60 seconds

async function Home() {
  const data = await fetch("https://api.example.com/data").then((res) => res.json());
  return <h1>Data: {data.name}</h1>;
}

export default Home;
```

---

## 7. How do you fetch data in Next.js 15 using Server Components?

**Answer**: In Next.js 15, Server Components allow direct data fetching within the component using `async/await`, eliminating the need for `getStaticProps` or `getServerSideProps` in the App Router. Use `fetch` or database clients (e.g., Prisma) inside server components, leveraging streaming and Suspense for progressive rendering. Cache fetched data with `cache` or `revalidate` options for performance.

**Code Example**:

```jsx
// app/users/page.tsx
async function UsersPage() {
  const users = await fetch("https://api.example.com/users", {
    next: { revalidate: 3600 }, // Cache for 1 hour
  }).then((res) => res.json());

  return (
    <ul>
      {users.map((user: { id: string, name: string }) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UsersPage;
```

---

## 8. What is the `use` hook in Next.js 15, and how is it used with route parameters?

**Answer**: The `use` hook, introduced in React 19 and supported in Next.js 15, unwraps promises in client components, simplifying access to asynchronous data like route parameters. In Next.js 15, route params in client components (`"use client"`) are wrapped in promises, requiring `use` to access them. This enables seamless integration of server and client rendering.

**Code Example**:

```jsx
// app/post/[id]/page.tsx
"use client";
import { use } from "react";

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Unwrap promise
  return <h1>Post ID: {id}</h1>;
}
```

[](https://x.com/AdebanjoSt63916/status/1931500075106103424)

---

## 9. How do you implement dynamic routes in Next.js 15?

**Answer**: Dynamic routes in the App Router use folders named `[param]` for single parameters or `[...param]` for catch-all routes. Parameters are accessed via the `params` prop in `page.tsx`. For SSG, use `generateStaticParams` to define dynamic paths at build time. Next.js 15 supports dynamic routes with RSCs for server-side data fetching.

**Code Example**:

```jsx
// app/product/[id]/page.tsx
export default function ProductPage({ params }: { params: { id: string } }) {
  return <h1>Product ID: {params.id}</h1>;
}

// app/product/[id]/generateStaticParams.tsx
export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }]; // Pre-render /product/1, /product/2
}
```

---

## 10. What is the purpose of `next.config.js` in Next.js 15?

**Answer**: The `next.config.js` file customizes Next.js behavior, configuring features like Webpack, redirects, rewrites, environment variables, and experimental settings (e.g., PPR). In Next.js 15, it supports new options for optimizing RSCs, Turbopack, and caching strategies. Use it to tailor build and runtime behavior to your application’s needs.

**Code Example**:

```javascript
// next.config.js
module.exports = {
  experimental: {
    partialPrerendering: true, // Enable PPR
  },
  images: {
    domains: ["example.com"],
  },
  async redirects() {
    return [
      {
        source: "/old-path",
        destination: "/new-path",
        permanent: true,
      },
    ];
  },
};
```

---

## 11. How do you handle client-side data fetching in Next.js 15?

**Answer**: Client-side data fetching in Next.js 15 uses React hooks like `useEffect` or libraries like SWR or TanStack Query in client components (`"use client"`). Use this for data that doesn’t impact SEO or initial render, like user interactions. Combine with Suspense for loading states to enhance UX.

**Code Example**:

```jsx
// app/client-data/page.tsx
"use client";
import { useState, useEffect } from "react";

export default function ClientData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.example.com/data")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;
  return <h1>Data: {data.name}</h1>;
}
```

---

## 12. What is the `Image` component in Next.js 15, and why is it important?

**Answer**: The `Image` component optimizes images by automatically resizing, converting to modern formats (e.g., WebP), and lazy-loading offscreen images. In Next.js 15, it supports new features like blurred placeholders and priority loading for LCP (Largest Contentful Paint) optimization. It enhances performance and SEO by reducing page load times and data usage.

**Code Example**:

```jsx
// app/page.tsx
import Image from "next/image";

export default function Home() {
  return (
    <Image
      src="/example.jpg"
      alt="Example"
      width={500}
      height={300}
      priority // Optimize for LCP
    />
  );
}
```

---

## 13. How do you implement API routes in Next.js 15?

**Answer**: API routes in Next.js 15 are defined in the `app/api/` directory using `route.ts` files. They support HTTP methods (GET, POST, etc.) via exported handlers, enabling serverless functions within your application. Use RSCs for direct server logic or route handlers for traditional API endpoints.

**Code Example**:

```typescript
// app/api/hello/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello, world!" });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ received: body });
}
```

---

## 14. What is the `Suspense` component, and how is it used in Next.js 15?

**Answer**: The `Suspense` component, part of React, enables streaming and progressive rendering in Next.js 15. It wraps components that fetch data asynchronously (e.g., in RSCs), displaying a fallback UI (e.g., loading spinner) until the data is ready. This improves perceived performance and supports PPR.

**Code Example**:

```jsx
// app/page.tsx
import { Suspense } from "react";

async function DataComponent() {
  const data = await fetch("https://api.example.com/data").then((res) => res.json());
  return <h1>{data.name}</h1>;
}

export default function Home() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DataComponent />
    </Suspense>
  );
}
```

---

## 15. How do you create a custom 404 page in Next.js 15?

**Answer**: In Next.js 15’s App Router, create a `not-found.tsx` file in the `app/` directory to define a custom 404 page. Use the `notFound()` function from `next/navigation` to programmatically trigger the 404 page. This ensures a consistent user experience for missing routes.

**Code Example**:

```jsx
// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link href="/">Return Home</Link>
    </div>
  );
}

// app/post/[id]/page.tsx
import { notFound } from 'next/navigation';

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await fetch(`https://api.example.com/post/${params.id}`).then((res) => res.json());
  if (!post) notFound();
  return <h1>{post.title}</h1>;
}
```

---

## 16. What is the `loading.tsx` file in Next.js 15’s App Router?

**Answer**: The `loading.tsx` file defines an instant loading state for a route segment in the App Router. It renders immediately when a page is loading, improving UX by providing visual feedback. Wrap dynamic components with `Suspense` for fine-grained control. In Next.js 15, it integrates with streaming and PPR.

**Code Example**:

```jsx
// app/blog/loading.tsx
export default function Loading() {
  return <p>Loading blog posts...</p>;
}

// app/blog/page.tsx
async function BlogPage() {
  const posts = await fetch('https://api.example.com/posts').then((res) => res.json());
  return (
    <ul>
      {posts.map((post: { id: string; title: string }) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export default BlogPage;
```

---

## 17. How do you handle authentication in Next.js 15?

**Answer**: Authentication in Next.js 15 can be implemented using libraries like NextAuth.js (Auth.js) or custom solutions with JWT/cookies. Use middleware to protect routes, server components for session checks, and client components for login forms. Store tokens securely in HTTP-only cookies and validate on the server for SSR/SSG.

**Code Example**:

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Validate credentials
        return { id: "1", name: "User" };
      },
    }),
  ],
});

// app/protected/page.tsx
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await auth();
  if (!session) redirect("/login");
  return <h1>Welcome, {session.user.name}!</h1>;
}
```

---

## 18. What is middleware in Next.js 15, and how is it used?

**Answer**: Middleware in Next.js 15 runs before a request reaches a route, allowing you to handle authentication, redirects, or logging. Defined in `middleware.ts` at the project root, it uses the `NextRequest` and `NextResponse` APIs. Middleware is ideal for global logic, like enforcing authentication or rewriting URLs.

**Code Example**:

```typescript
// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.cookies.has("token")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

---

## 19. How do you optimize performance in Next.js 15?

**Answer**: Optimize Next.js 15 applications by:

- Using RSCs to reduce client-side JavaScript.
- Leveraging PPR for hybrid rendering.
- Enabling `next/image` for image optimization.
- Implementing code splitting with dynamic imports.
- Using ISR or caching with `fetch` options.
- Analyzing bundles with `@next/bundle-analyzer`.
- Enabling Turbopack for faster builds (experimental).
  Monitor performance with tools like Lighthouse and Vercel Analytics.

**Code Example**:

```jsx
// app/page.tsx
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("../components/HeavyComponent"), {
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <HeavyComponent />
    </div>
  );
}
```

---

## 20. What is `generateStaticParams` in Next.js 15, and when is it used?

**Answer**: The `generateStaticParams` function defines dynamic route parameters for SSG at build time. Used in dynamic routes (`[param]`), it returns an array of parameter values to prerender, ensuring static HTML for each route. In Next.js 15, it integrates with RSCs for efficient static generation.

**Code Example**:

```jsx
// app/post/[id]/page.tsx
export async function generateStaticParams() {
  const posts = await fetch("https://api.example.com/posts").then((res) => res.json());
  return posts.map((post: { id: string }) => ({ id: post.id }));
}

export default function PostPage({ params }: { params: { id: string } }) {
  return <h1>Post ID: {params.id}</h1>;
}
```

---

## 21. How do you implement internationalization (i18n) in Next.js 15?

**Answer**: Next.js 15 supports i18n via `next.config.js` for locale detection and routing. Use libraries like `next-intl` or `react-i18next` for translations. Define locales and default locale in `next.config.js`, and use middleware or server components to handle locale-specific rendering.

**Code Example**:

```javascript
// next.config.js
module.exports = {
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
};

// app/[locale]/page.tsx
import { useLocale } from "next-intl";

export default function Home() {
  const locale = useLocale();
  return <h1>Welcome ({locale})</h1>;
}
```

---

## 22. What is the `error.tsx` file in Next.js 15’s App Router?

**Answer**: The `error.tsx` file defines a custom error UI for a route segment in the App Router. It catches errors thrown during rendering or data fetching, displaying a fallback UI. Use the `ErrorBoundary` component and `reset` function to allow retrying. In Next.js 15, it supports client and server errors.

**Code Example**:

```jsx
// app/error.tsx
"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1>Something went wrong!</h1>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

---

## 23. How do you use the `Link` component for navigation in Next.js 15?

**Answer**: The `Link` component from `next/link` enables client-side navigation, prefetching pages for faster transitions. In Next.js 15, it supports App Router routes and integrates with RSCs. Use `href` for navigation and optional props like `scroll` or `replace` for custom behavior.

**Code Example**:

```jsx
// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/about">Go to About</Link>
    </div>
  );
}
```

---

## 24. What is Turbopack, and how does it relate to Next.js 15?

**Answer**: Turbopack is a next-generation bundler, introduced as an experimental feature in Next.js 13 and improved in Next.js 15. It replaces Webpack for faster builds and development, leveraging Rust for performance. Enable it with `next dev --turbo` or `next build --turbo`. In Next.js 15, Turbopack supports most Next.js features but is still stabilizing.

**Code Example**:

```bash
# package.json
"scripts": {
  "dev": "next dev --turbo"
}
```

---

## 25. How do you handle form submissions in Next.js 15?

**Answer**: Handle forms in Next.js 15 using server actions (experimental) or API routes. Server actions allow form submissions to trigger server-side logic directly, reducing client-side code. Use `<form>` with the `action` prop pointing to a server action or API route. Validate inputs on the server for security.

**Code Example**:

```jsx
// app/form/page.tsx
"use server";

async function submitForm(formData: FormData) {
  const name = formData.get("name");
  // Process form data
  return { success: true, name };
}

export default function FormPage() {
  return (
    <form action={submitForm}>
      <input name="name" type="text" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## 26. What is the `useRouter` hook in Next.js 15, and how has it changed?

**Answer**: In Next.js 15, `useRouter` from `next/navigation` is used in client components for programmatic navigation. It replaces `next/router` and supports App Router features. Key methods include `push`, `replace`, and `back`. Route parameters are now promises, requiring the `use` hook for access.

**Code Example**:

```jsx
// app/client-nav/page.tsx
"use client";
import { useRouter } from "next/navigation";

export default function ClientNav() {
  const router = useRouter();
  return <button onClick={() => router.push("/about")}>Go to About</button>;
}
```

---

## 27. How do you implement lazy loading in Next.js 15?

**Answer**: Lazy loading in Next.js 15 uses `next/dynamic` for dynamic imports, loading components or libraries only when needed. This reduces initial bundle size and improves performance. Use `loading` or `ssr` options to control rendering behavior.

**Code Example**:

```jsx
// app/page.tsx
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("../components/HeavyComponent"), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Disable SSR
});

export default function Home() {
  return <DynamicComponent />;
}
```

---

## 28. What is the `next/font` module, and how is it used in Next.js 15?

**Answer**: The `next/font` module optimizes font loading by self-hosting Google Fonts or custom fonts, reducing layout shifts and improving CLS (Cumulative Layout Shift). In Next.js 15, it supports variable fonts and automatic font optimization, applied via `next/font/google` or `next/font/local`.

**Code Example**:

```jsx
// app/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

---

## 29. How do you deploy a Next.js 15 application?

**Answer**: Deploy Next.js 15 applications to platforms like Vercel, Netlify, or AWS. Run `next build` to generate a production build, then upload the `.next` folder and `public` directory. Vercel offers seamless deployment with auto-scaling, domain management, and environment variables. Configure `next.config.js` for platform-specific settings.

**Code Example**:

```bash
# Build and deploy to Vercel
npm run build
vercel --prod
```

---

## 30. What is the `useSearchParams` hook in Next.js 15?

**Answer**: The `useSearchParams` hook from `next/navigation` accesses URL query parameters in client components. In Next.js 15, it returns a `URLSearchParams` object for reading query strings, ideal for filters or search functionality. Use with `useRouter` for updates.

**Code Example**:

```jsx
// app/search/page.tsx
"use client";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  return <h1>Search Query: {query}</h1>;
}
```

---

## 31. How do you handle environment variables in Next.js 15?

**Answer**: Next.js 15 supports environment variables via `.env` files (e.g., `.env.local`). Prefix variables with `NEXT_PUBLIC_` for client-side access. Access them via `process.env` in server or client code. Use Vercel’s dashboard or platform-specific tools for production variables.

**Code Example**:

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
```

```jsx
// app/page.tsx
export default function Home() {
  return <h1>API URL: {process.env.NEXT_PUBLIC_API_URL}</h1>;
}
```

---

## 32. What is the `revalidatePath` function in Next.js 15?

**Answer**: The `revalidatePath` function from `next/cache` invalidates cached data for a specific route, triggering regeneration on the next request. Used with ISR or cached `fetch` requests, it ensures fresh data without rebuilding the entire site. In Next.js 15, it supports fine-grained cache control.

**Code Example**:

```typescript
// app/api/revalidate/route.ts
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  revalidatePath("/blog");
  return NextResponse.json({ revalidated: true });
}
```

---

## 33. How do you implement a custom error page in Next.js 15?

**Answer**: Beyond `not-found.tsx`, create `error.tsx` for general errors and `global-error.tsx` in `app/` for top-level errors. Use client components (`"use client"`) to handle interactivity, like retry buttons. In Next.js 15, these integrate with RSCs and streaming for robust error handling.

**Code Example**:

```jsx
// app/global-error.tsx
"use client";
export default function GlobalError({
  error,
  reset,
}: {
  error: Error,
  reset: () => void,
}) {
  return (
    <html>
      <body>
        <h1>App Error</h1>
        <button onClick={reset}>Retry</button>
      </body>
    </html>
  );
}
```

---

## 34. What is the `usePathname` hook in Next.js 15?

**Answer**: The `usePathname` hook from `next/navigation` returns the current URL pathname in client components. In Next.js 15, it’s used for conditional rendering or navigation logic based on the current route, replacing parts of `useRouter`.

**Code Example**:

```jsx
// app/nav/page.tsx
"use client";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  return <p>Current Path: {pathname}</p>;
}
```

---

## 35. How do you use CSS in Next.js 15?

**Answer**: Next.js 15 supports multiple CSS approaches:

- **CSS Modules**: Use `.module.css` files for scoped styles.
- **Tailwind CSS**: Configure via `postcss.config.js`.
- **Global CSS**: Import in `app/layout.tsx`.
- **CSS-in-JS**: Use libraries like `styled-components` with RSCs.
  Next.js optimizes CSS by default, minifying, and removing unused styles.

**Code Example**:

```css
/* styles.module.css */
.container {
  padding: 20px;
}
```

```jsx
// app/page.tsx
import styles from "./styles.module.css";

export default function Home() {
  return <div className={styles.container}>Styled Content</div>;
}
```

---

## 36. What is the `next/head` component, and how is it used?

**Answer**: The `next/head` component manages `<head>` tags for SEO, metadata, or scripts. In Next.js 15, it’s used in the App Router within layouts or pages to set titles, meta tags, or links. For dynamic SEO, combine with server components to fetch metadata.

**Code Example**:

```jsx
// app/page.tsx
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>My App</title>
      </Head>
      <h1>Welcome</h1>
    </>
  );
}
```

---

## 37. How do you implement redirects in Next.js 15?

**Answer**: Redirects in Next.js 15 are configured in `next.config.js` for static redirects or handled programmatically with `useNavigate` (client-side) or `useRedirect` (server-side).) or Use middleware for conditional redirects or `useRedirect` from `useNavigate` for dynamic routes. In Next.js 15, server components support `useRedirect` for SSR redirects.

**Code Example**:

```typescript
// app/legacy/page.tsx
import { redirect } from "next/navigation";

export default async function LegacyPage() {
  redirect("/new-page");
  return null;
}
```

---

## 38. What is the `next/script` component, and when is it used?

**Answer**: The `next/script` component optimizes third-party script loading with strategies like `afterInteractive`, `lazyOnload`, or `beforeInteractive`. In Next.js 15, it reduces CLS and improves performance by controlling script execution timing, ideal for analytics or widgets.

**Code Example**:

```jsx
// app/page.tsx
import Script from "next/script";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Script src="https://example.com/script.js" strategy="lazyOnload" />
    </>
  );
}
```

---

## 39. How do you handle static assets in Next.js 15?

**Answer**: Static assets (images, fonts, etc.) are placed in the `public/` directory, served from the root URL. In Next.js 15, use `next/image` for images and `next/font` for fonts to optimize delivery. Assets in `app/` can be colocated with components for organization logic.

**Code Example**:

```jsx
// public/logo.png
// app/page.tsx
import Image from "next/image";

export default function Home() {
  return <Image src="/logo.png" alt="Logo" width={100} height={100} />;
}
```

---

## 40. What is the `useFormStatus` hook in Next.js 15?

**Answer**: The `useFormStatus` hook from `react-dom` provides the status of a pending form submission (e.g., `pending`, `data`) in client components. In Next.js 15, it’s used with server actions to show loading states during form processing, enhancing UX.

**Code Example**:

```jsx
// app/form/page.tsx
"use client";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

export default function FormPage() {
  async function submit(formData: FormData) {
    "use server";
    // Process form
  }

  return (
    <form action={submit}>
      <input name="name" />
      <SubmitButton />
    </form>
  );
}
```

---

## 41. How do you implement a custom API route with error handling?

**Answer**: Create robust API routes in `app/api/` with try-catch blocks to handle errors, returning appropriate status codes. In Next.js 15, use `NextResponse` for structured responses and integrate with logging or monitoring tools.

**Code Example**:

```typescript
// app/api/data/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await fetch("https://api.example.com/data").then((res) => res.json());
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
```

---

## 42. What is the `useTransition` hook’s role in Next.js 15?

**Answer**: The `useTransition` hook from React manages state transitions in client components, allowing non-urgent updates to be deferred. In Next.js 15, it’s used for smooth UI updates (e.g., search filters) while integrating with server-side navigation, reducing perceived latency.

**Code Example**:

```jsx
// app/search.tsx
"use client";
import { useState, useTransition } from "react";

export default function Search() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");

  const handleSearch = (value: string) => {
    startTransition(() => {
      setQuery(value);
    });
  };

  return (
    <div>
      <input onChange={(e) => handleSearch(e.target.value)} />
      {isPending && <p>Searching...</p>}
      <p>Query: {query}</p>
    </div>
  );
}
```

---

## 43. How do you use `next/dynamic` with Server Components?

**Answer**: In Next.js 15, `next/dynamic` works with server components by default but requires `"use client"` for client-only components. Use it to lazy-load heavy server components or disable SSR for specific components to optimize bundle size.

**Code Example**:

```jsx
// app/page.tsx
import dynamic from "next/dynamic";

const DynamicServerComponent = dynamic(() => import("../components/ServerComponent"));

export default function Home() {
  return <DynamicServerComponent />;
}
```

---

## 44. What is the `useOptimistic` hook in Next.js 15?

**Answer**: The `useOptimistic` hook from React, supported in Next.js 15, enables optimistic UI updates, rendering temporary state while awaiting asynchronous operations (e.g., form submissions). It’s used in client components with server actions for instant feedback.

**Code Example**:

```jsx
// app/optimistic.tsx
"use client";
import { useOptimistic, useState } from "react";

export default function OptimisticForm() {
  const [messages, setMessages] = useState([]);
  const [optimisticMessages, addOptimistic] = useOptimistic(messages);

  async function submit(formData: FormData) {
    const message = formData.get("message");
    addOptimistic([...messages, { text: message, pending: true }]);
    // Simulate async submission
    setMessages([...messages, { text: message, pending: false }]);
  }

  return (
    <form action={submit}>
      <input name="message" />
      <button type="submit">Send</button>
      <ul>
        {optimisticMessages.map((msg: { text: string, pending: boolean }, i) => (
          <li key={i} style={{ opacity: msg.pending ? 0.5 : 1 }}>
            {msg.text}
          </li>
        ))}
      </ul>
    </form>
  );
}
```

---

## 45. How do you implement a custom loading skeleton?

**Answer**: Create a custom loading skeleton using `loading.tsx` or `Suspense` with a skeleton UI component. In Next.js 15, skeletons enhance UX by mimicking content layout during data fetching, reducing perceived load time.

**Code Example**:

```jsx
// app/skeleton.tsx
export default function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}

// app/page.tsx
import { Suspense } from 'react';
import Skeleton from './skeleton';

async function Data() {
  const data = await fetch('https://api.example.com/data').then((res) => res.json());
  return <h1>{data.name}</h1>;
}

export default function Home() {
  return (
    <Suspense fallback={<Skeleton />}>
      <Data />
    </Suspense>
  );
}
```

---

## 46. What is the `useActionState` hook in Next.js 15?

**Answer**: The `useActionState` hook from `react-dom`, supported in Next.js 15, manages state for server actions in client components. It returns the action’s state (e.g., success, error) and a dispatch function, simplifying form handling with server-side logic.

**Code Example**:

```jsx
// app/form.tsx
"use client";
import { useActionState } from "react-dom";

async function submit(prevState: any, formData: FormData) {
  const name = formData.get("name");
  if (!name) return { error: "Name required" };
  return { success: true, name };
}

export default function Form() {
  const [state, formAction] = useActionState(submit, null);

  return (
    <form action={formAction}>
      <input name="name" />
      <button type="submit">Submit</button>
      {state?.error && <p>{state.error}</p>}
      {state?.success && <p>Welcome, {state.name}!</p>}
    </form>
  );
}
```

---

## 47. How do you handle SEO in Next.js 15?

**Answer**: Improve SEO in Next.js 15 with:

- **Metadata API**: Define static or dynamic metadata in `layout.tsx` or `page.tsx`.
- **SSR/SSG**: Ensure content is prerendered for crawlers.
- **Sitemaps**: Generate with `app/sitemap.ts`.
- **Robots.txt**: Configure in `app/robots.ts`.
- **Structured Data**: Add via `next/head` or JSON-LD.
  Next.js 15’s Metadata API simplifies dynamic SEO with server components.

**Code Example**:

```jsx
// app/page.tsx
export const metadata = {
  title: "My App",
  description: "A Next.js 15 application",
};

export default function Home() {
  return <h1>Home</h1>;
}
```

---

## 48. What is the `useEffect` hook’s role in Next.js 15?

**Answer**: The `useEffect` hook, used in client components (`"use client"`), handles side effects like data fetching, subscriptions, or DOM updates. In Next.js 15, prefer server components for data fetching, reserving `useEffect` for client-side effects (e.g., analytics, animations) to minimize JavaScript.

**Code Example**:

```jsx
// app/tracker.tsx
"use client";
import { useEffect } from "react";

export default function Tracker() {
  useEffect(() => {
    console.log("Page viewed");
    return () => console.log("Page left");
  }, []);

  return <h1>Tracker</h1>;
}
```

---

## 49. How do you implement a custom middleware for internationalization?

**Answer**: Use middleware to handle i18n by detecting user locale from headers, cookies, or URL paths, then rewriting or redirecting requests. In Next.js 15, combine with `next.config.js` i18n settings for seamless locale routing.

**Code Example**:

```typescript
// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const locale = request.headers.get("accept-language")?.split(",")[0] || "en";
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith(`/${locale}`)) {
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next).*)"],
};
```

---

## 50. How do you test Next.js 15 applications?

**Answer**: Test Next.js 15 apps with:

- **Unit Tests**: Use Jest and Testing Library for components.
- **Integration Tests**: Test API routes and server components with `supertest`.
- **E2E Tests**: Use Playwright or Cypress for browser testing.
- **Mocking**: Mock `fetch` or database calls in server components.
  Next.js 15 supports testing RSCs with Jest’s experimental ESM mode and Vercel’s testing utilities.

**Code Example**:

```typescript
// __tests__/home.test.tsx
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

test("renders home page", async () => {
  render(await Home());
  expect(screen.getByText("Home")).toBeInTheDocument();
});
```

---

This Markdown file provides a comprehensive resource for Next.js 15 interview preparation, focusing on modern features like the App Router, React Server Components, and Partial Prerendering. Each question is answered with practical examples, ensuring a deep understanding of Next.js concepts for front-end developer roles.[](https://www.geeksforgeeks.org/next-js-interview-questions-answers/)

```

```
