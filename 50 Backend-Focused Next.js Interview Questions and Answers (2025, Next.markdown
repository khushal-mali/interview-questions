# 50 Backend-Focused Next.js Interview Questions with Detailed Answers and Code Examples (2025, Next.js 15)

This document provides 50 backend-specific interview questions for Next.js (version 15, released October 2024), focusing on server-side features like API routes, server components, server actions, middleware, caching, and data fetching. Designed for backend or full-stack developer interviews, these questions cover foundational to advanced concepts, ensuring comprehensive preparation for Next.js backend roles. Each question includes a detailed answer and a practical code example, emphasizing server-side logic, performance, security, and scalability in the App Router.

---

## 1. What are server components in Next.js 15, and how do they enhance backend development?

**Answer**: Server Components in Next.js 15, part of React 19, render on the server by default, reducing client-side JavaScript and enabling direct backend operations like database queries or API calls. They support asynchronous rendering, streaming, and integration with server-side caching, making them ideal for data-intensive backend tasks. Unlike client components (`"use client"`), they don’t ship to the browser, enhancing performance and security.

**Code Example**:

```jsx
// app/users/page.tsx
async function UsersPage() {
  const users = await fetch("https://api.example.com/users").then((res) => res.json());
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

## 2. How do API routes work in Next.js 15, and how are they defined?

**Answer**: API routes in Next.js 15 are defined in the `app/api/` directory using `route.ts` files, acting as serverless functions. They support HTTP methods (GET, POST, etc.) via exported handlers, enabling backend endpoints for data processing or external API integration. They leverage Node.js runtime for flexibility and scale seamlessly on platforms like Vercel.

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

## 3. What are server actions in Next.js 15, and how do they simplify backend logic?

**Answer**: Server Actions (experimental in Next.js 15) allow form submissions or client interactions to trigger server-side functions directly, defined with the `"use server"` directive. They simplify backend logic by eliminating the need for separate API routes, enabling secure data mutations (e.g., database updates) with built-in CSRF protection and progressive enhancement.

**Code Example**:

```jsx
// app/form/page.tsx
"use server";

async function submitForm(formData: FormData) {
  const name = formData.get("name");
  // Simulate database update
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

## 4. How does middleware work in Next.js 15 for backend request handling?

**Answer**: Middleware in Next.js 15, defined in `middleware.ts`, runs before a request reaches a route, enabling backend tasks like authentication, redirects, or request rewriting. It uses `NextRequest` and `NextResponse` for flexible request manipulation, ideal for enforcing security or customizing responses globally.

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
  matcher: ["/api/protected/:path*", "/dashboard/:path*"],
};
```

---

## 5. How do you implement authentication in Next.js 15’s backend?

**Answer**: Authentication in Next.js 15’s backend can use libraries like NextAuth.js (Auth.js) or custom JWT-based solutions. Use server components or API routes to verify sessions, middleware to protect routes, and HTTP-only cookies for secure token storage. Server Actions can handle login/logout securely.

**Code Example**:

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Validate credentials against database
        return { id: "1", name: "User" };
      },
    }),
  ],
  session: { strategy: "jwt" },
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

## 6. What is the `revalidatePath` function in Next.js 15, and how is it used for cache management?

**Answer**: The `revalidatePath` function from `next/cache` invalidates cached data for a specific route, triggering regeneration on the next request. It’s used in ISR or cached `fetch` scenarios to ensure fresh data, providing fine-grained control over backend caching strategies.

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

## 7. How does Next.js 15 handle data fetching on the server side?

**Answer**: Next.js 15 uses server components for server-side data fetching, allowing direct `fetch` or database queries within `async` components. It supports caching via `fetch` options (`next: { revalidate }`), streaming with Suspense, and integration with ORMs like Prisma, optimizing backend performance.

**Code Example**:

```jsx
// app/posts/page.tsx
async function PostsPage() {
  const posts = await fetch("https://api.example.com/posts", {
    next: { revalidate: 3600 }, // Cache for 1 hour
  }).then((res) => res.json());

  return (
    <ul>
      {posts.map((post: { id: string, title: string }) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export default PostsPage;
```

---

## 8. What is Incremental Static Regeneration (ISR) in Next.js 15, and how does it benefit backend performance?

**Answer**: ISR combines static site generation (SSG) with on-demand revalidation, regenerating pages in the background after a `revalidate` period. Defined per page with the `revalidate` export, it reduces backend load by serving cached content while keeping data fresh, ideal for semi-dynamic content.

**Code Example**:

```jsx
// app/news/page.tsx
export const revalidate = 60; // Revalidate every 60 seconds

async function NewsPage() {
  const news = await fetch("https://api.example.com/news").then((res) => res.json());
  return (
    <ul>
      {news.map((item: { id: string, headline: string }) => (
        <li key={item.id}>{item.headline}</li>
      ))}
    </ul>
  );
}

export default NewsPage;
```

---

## 9. How do you configure `next.config.js` for backend optimizations in Next.js 15?

**Answer**: The `next.config.js` file customizes backend behavior, configuring Webpack, redirects, rewrites, caching, and experimental features like Partial Prerendering (PPR). It enables optimizations such as Turbopack for faster builds or custom headers for security.

**Code Example**:

```javascript
// next.config.js
module.exports = {
  experimental: {
    partialPrerendering: true,
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600" }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/old-api",
        destination: "/api/new",
        permanent: true,
      },
    ];
  },
};
```

---

## 10. What is Partial Prerendering (PPR) in Next.js 15, and how does it impact backend rendering?

**Answer**: PPR, experimental in Next.js 15, combines static and dynamic rendering within a page. Static parts are prerendered at build time, while dynamic parts are streamed or rendered on-demand, reducing backend latency and improving SEO. It’s ideal for pages with mixed content, like e-commerce or dashboards.

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
```

---

## 11. How do you secure API routes in Next.js 15?

**Answer**: Secure API routes by validating inputs, using JWT or OAuth for authentication, implementing rate limiting, and sanitizing responses. Use middleware to enforce authorization, and leverage `NextResponse` for error handling. Libraries like `helmet` can add security headers.

**Code Example**:

```typescript
// app/api/secure/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({ data: "Secure data" });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
```

---

## 12. How do you handle environment variables in Next.js 15’s backend?

**Answer**: Environment variables in Next.js 15 are stored in `.env` files (e.g., `.env.local`). Backend-only variables don’t need `NEXT_PUBLIC_`, accessed via `process.env`. Use them for API keys or database URLs, and configure production variables on platforms like Vercel.

**Code Example**:

```bash
# .env.local
DATABASE_URL=postgresql://user:password@localhost:5432/db
```

```typescript
// app/api/db/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Simulate database connection
  const dbUrl = process.env.DATABASE_URL;
  return NextResponse.json({ db: dbUrl });
}
```

---

## 13. What is the `generateStaticParams` function in Next.js 15, and how is it used for backend rendering?

**Answer**: The `generateStaticParams` function defines dynamic route parameters for SSG at build time, enabling backend prerendering of dynamic routes. It returns an array of parameter values, optimizing SEO and performance for static content.

**Code Example**:

```jsx
// app/post/[id]/page.tsx
export async function generateStaticParams() {
  const posts = await fetch("https://api.example.com/posts").then((res) => res.json());
  return posts.map((post: { id: string }) => ({ id: post.id }));
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await fetch(`https://api.example.com/post/${params.id}`).then((res) =>
    res.json()
  );
  return <h1>{post.title}</h1>;
}
```

---

## 14. How do you implement rate limiting in Next.js 15’s backend?

**Answer**: Rate limiting in Next.js 15 can be implemented using middleware with libraries like `rate-limit` or custom logic tracking request counts. Store counts in memory (e.g., Redis) for distributed systems, and return `429` status for exceeded limits, enhancing backend security.

**Code Example**:

```typescript
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

const limiter = new RateLimiterMemory({
  points: 10, // 10 requests
  duration: 60, // per minute
});

export async function middleware(request: NextRequest) {
  const ip = request.ip || "unknown";
  try {
    await limiter.consume(ip);
    return NextResponse.next();
  } catch {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
}

export const config = {
  matcher: "/api/:path*",
};
```

---

## 15. What is the `Suspense` component’s role in Next.js 15 backend rendering?

**Answer**: The `Suspense` component enables streaming and progressive rendering in Next.js 15, allowing backend data fetching to resolve asynchronously while displaying fallback UI. It integrates with server components for efficient data delivery, reducing time-to-first-byte.

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

## 16. How do you connect to a database in Next.js 15’s backend?

**Answer**: Connect to databases (e.g., PostgreSQL, MongoDB) in Next.js 15 using ORMs like Prisma or Mongoose within server components or API routes. Initialize connections in a singleton pattern to avoid repeated connections, and use environment variables for credentials.

**Code Example**:

```typescript
// lib/db.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

// app/api/users/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
```

---

## 17. What is the `redirect` function in Next.js 15, and how is it used in backend logic?

**Answer**: The `redirect` function from `next/navigation` triggers server-side redirects in server components or server actions. It sends a `302` (or `301` with `permanent: true`) response, useful for authentication flows or URL rewrites, simplifying backend navigation logic.

**Code Example**:

```jsx
// app/protected/page.tsx
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const isAuthenticated = false; // Simulate auth check
  if (!isAuthenticated) redirect("/login");
  return <h1>Protected</h1>;
}
```

---

## 18. How do you implement CORS in Next.js 15 API routes?

**Answer**: Implement CORS in Next.js 15 API routes by setting appropriate headers in `NextResponse`. Use libraries like `cors` for complex policies or manually configure `Access-Control-Allow-*` headers to allow cross-origin requests, ensuring secure backend communication.

**Code Example**:

```typescript
// app/api/cors/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "CORS enabled" },
    {
      headers: {
        "Access-Control-Allow-Origin": "https://example.com",
        "Access-Control-Allow-Methods": "GET, POST",
      },
    }
  );
}
```

---

## 19. What is Turbopack, and how does it impact Next.js 15 backend builds?

**Answer**: Turbopack, an experimental Rust-based bundler in Next.js 15, replaces Webpack for faster builds and development. It optimizes backend compilation, reducing build times for server components and API routes, especially in large projects. Enable with `next build --turbo`.

**Code Example**:

```bash
# package.json
"scripts": {
  "build": "next build --turbo"
}
```

---

## 20. How do you handle file uploads in Next.js 15’s backend?

**Answer**: Handle file uploads in Next.js 15 API routes using libraries like `formidable` or `multer` to parse `multipart/form-data`. Store files in cloud storage (e.g., AWS S3, Cloudinary) or local disk, and validate file types/sizes for security.

**Code Example**:

```typescript
// app/api/upload/route.ts
import { NextResponse } from "next/server";
import formidable from "formidable";
import { promises as fs } from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  const form = formidable({ uploadDir: "./uploads", keepExtensions: true });
  const [fields, files] = await form.parse(request);

  // Simulate saving file
  return NextResponse.json({ filename: files.file?.[0].newFilename });
}
```

---

## 21. How do you implement error handling in Next.js 15 API routes?

**Answer**: Implement error handling in API routes using try-catch blocks, returning structured error responses with appropriate status codes. Use middleware for global error handling, and log errors for monitoring, ensuring robust backend reliability.

**Code Example**:

```typescript
// app/api/data/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await fetch("https://api.example.com/data").then((res) => res.json());
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
```

---

## 22. What is the `notFound` function in Next.js 15, and how is it used in backend logic?

**Answer**: The `notFound` function from `next/navigation` triggers a 404 response in server components, rendering the `not-found.tsx` page. It’s used for backend validation when resources (e.g., database records) are missing, streamlining error handling.

**Code Example**:

```jsx
// app/post/[id]/page.tsx
import { notFound } from "next/navigation";

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await fetch(`https://api.example.com/post/${params.id}`).then((res) =>
    res.json()
  );
  if (!post) notFound();
  return <h1>{post.title}</h1>;
}
```

---

## 23. How do you optimize backend performance in Next.js 15?

**Answer**: Optimize backend performance by:

- Using server components to minimize client-side JavaScript.
- Implementing ISR or caching with `fetch` options.
- Enabling PPR for hybrid rendering.
- Using Turbopack for faster builds.
- Configuring `next.config.js` for custom headers or compression.
- Monitoring with tools like Vercel Analytics.

**Code Example**:

```jsx
// app/page.tsx
export const revalidate = 300; // Cache for 5 minutes

async function Home() {
  const data = await fetch("https://api.example.com/data", {
    next: { revalidate: 300 },
  }).then((res) => res.json());
  return <h1>{data.name}</h1>;
}

export default Home;
```

---

## 24. How do you implement internationalization (i18n) in Next.js 15’s backend?

**Answer**: Implement i18n in Next.js 15’s backend using `next.config.js` for locale routing and server components or middleware to serve locale-specific content. Use libraries like `next-intl` for translation management, ensuring backend data aligns with user locales.

**Code Example**:

```javascript
// next.config.js
module.exports = {
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
};

// app/api/content/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const locale = request.headers.get("accept-language")?.split(",")[0] || "en";
  const content = await fetch(`https://api.example.com/content?lang=${locale}`).then(
    (res) => res.json()
  );
  return NextResponse.json(content);
}
```

---

## 25. What is the `revalidateTag` function in Next.js 15, and how is it used?

**Answer**: The `revalidateTag` function from `next/cache` invalidates cached data associated with a specific tag, used in `fetch` requests. It allows targeted cache updates, improving backend efficiency for dynamic content updates.

**Code Example**:

```typescript
// app/api/update/route.ts
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  revalidateTag("posts");
  return NextResponse.json({ revalidated: true });
}

// app/posts/page.tsx
async function PostsPage() {
  const posts = await fetch("https://api.example.com/posts", {
    next: { tags: ["posts"] },
  }).then((res) => res.json());
  return (
    <ul>
      {posts.map((post: { id: string; title: string }) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export default PostsPage;
```

---

## 26. How do you handle WebSockets in Next.js 15’s backend?

**Answer**: Next.js 15 doesn’t natively support WebSockets, but you can integrate them using external servers (e.g., Socket.IO) or platforms like Vercel’s WebSocket support. Host a separate Node.js server for WebSocket connections, and proxy requests via API routes or middleware.

**Code Example**:

```typescript
// server/socket.ts
import { Server } from "socket.io";

const io = new Server(3001);
io.on("connection", (socket) => {
  socket.on("message", (msg) => socket.broadcast.emit("message", msg));
});

// app/api/socket/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "WebSocket server running on port 3001" });
}
```

---

## 27. How do you implement a custom error page for backend errors in Next.js 15?

**Answer**: Create `error.tsx` for route-specific backend errors or `global-error.tsx` in `app/` for top-level errors. Use server components to log errors and trigger fallback UI, integrating with monitoring tools for backend reliability.

**Code Example**:

```jsx
// app/global-error.tsx
"use client";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error,
  reset: () => void,
}) {
  useEffect(() => {
    // Log to backend
    fetch("/api/log", { method: "POST", body: JSON.stringify({ error: error.message }) });
  }, [error]);

  return (
    <html>
      <body className="App">
        <h1>App Error</h1>
        <button onClick={reset}>Retry</button>
      </body>
    </html>
  );
}
```

---

## 28. How do you handle form submissions with file uploads in Next.js 15?

**Answer**: Handle file uploads in Next.js 15 API routes using libraries like `formidable` or `multer` to parse `multipart/form-data`. Store files in cloud storage (e.g., AWS S3, Cloudinary) or local disk, and validate file types/sizes for security. Server Actions can also process form submissions.

**Code Example**:

```tsx
// app/api/upload/route.ts]
import { NextResponse } from "next/server";
import formidable from "formidable";
import { promises as fs } from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  const form = formidable({ uploadDir: "./uploads", keepExtensions: true });
  const [fields, files] = await form.parse(request);

  // Simulate cloud storage upload
  return NextResponse.json({ filename: files.file?.[0].newFilename });
}
```

---

## 29. How do you implement server-side A/B testing in Next.js 15?

**Answer**: Implement server-side A/B testing by using server-side logic or middleware in Next.js 15 to assign users to test variants based on cookies or user IDs, serving different content or layouts. Use server components to render variant-specific UI and API routes to track metrics, ensuring backend-driven experimentation.

**Code Example**:

```typescript
// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  let variant = request.cookies.get("ab_test")?.value;
  if (!variant) {
    variant = Math.random() < 0.5 ? "A" : "B";
    const response = NextResponse.next();
    response.cookies.set("ab_test", variant);
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/experiment/:path*",
};

// app/experiment/page.tsx
import { cookies } from "next/headers";

export default async function ExperimentPage() {
  const variant = cookies().get("ab_test")?.value || "A";
  return <h1>Variant: {variant}</h1>;
}
```

---

## 30. How do you handle server-side caching in Next.js 15?

**Answer**: Server-side cache in Next.js 15 by using `fetch` with `next: { revalidate }` or `revalidate` or `cache` tags for fine-grained control. Use ISR for static content, Redis or Memcached for session data, and Vercel’s edge cache for API responses, optimizing backend performance.

**Code Example**:

```typescript
// app/api/cache/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const data = await fetch("https://api.example.com/data", {
    next: { tags: ["data"], revalidate: 3600 },
  }).then((res) => res.json());
  return NextResponse.json(data);
}
```

---

## 31. How do you implement server-side logging in Next.js 15?

**Answer**: Implement server-side logging using libraries like `winston` or `pino` in server components or API routes. Send logs to external services (e.g., Datadog, Sentry) for monitoring, and use environment variables to control log levels, ensuring backend observability.

**Code Example**:

```typescript
// lib/logger.ts
import winston from "winston";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  transports: [new winston.transports.Console()],
});

export default logger;

// app/api/log/route.ts
import { NextResponse } from "next/server";
import logger from "@/lib/logger";

export async function POST(request: Request) {
  const { message } = await request.json();
  logger.error(message);
  return NextResponse.json({ logged: true });
}
```

---

## 32. How do you handle database migrations in Next.js 15 projects?

**Answer**: Handle database migrations using ORMs like Prisma, which provides a migration CLI (`prisma migrate`). Define schemas in `schema.prisma`, run migrations during deployment, and use server components or API routes to interact with the updated database.

**Code Example**:

```prisma
// prisma/schema.prisma
model User {
  id    Int     @id @default(autoincrement())
  name  String
}
```

```bash
# Run migration
npx prisma migrate dev --name add-user
```

```typescript
// app/api/users/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
```

---

## 33. How do you implement server-side redirects based on user roles in Next.js 15?

**Answer**: Implement role-based redirects using middleware or server components to check user roles (e.g., via JWT or session). Use `redirect` from `next/navigation` to route users to appropriate pages, ensuring secure backend access control.

**Code Example**:

```jsx
// app/admin/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminPage() {
  const session = await auth();
  if (session?.user.role !== "admin") redirect("/dashboard");
  return <h1>Admin Panel</h1>;
}
```

---

## 34. How do you handle background jobs in Next.js 15’s backend?

**Answer**: Handle background jobs using libraries like `bull` or `node-cron` in a separate Node.js process or API route. Trigger jobs via server actions or API calls, and store job states in a database or Redis for scalability.

**Code Example**:

```typescript
// lib/cron.ts
import cron from "node-cron";

cron.schedule("0 0 * * *", async () => {
  // Simulate daily task
  console.log("Running daily job");
});

// app/api/start-cron/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Cron jobs running" });
}
```

---

## 35. How do you implement server-side validation in Next.js 15?

**Answer**: Implement server-side validation using libraries like `zod` or `yup` in API routes or server actions. Validate inputs before processing, returning descriptive error responses to ensure backend data integrity and security.

**Code Example**:

```typescript
// app/api/submit/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    // Process validated data
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}
```

---

## 36. How do you handle server-side sessions in Next.js 15?

**Answer**: Handle sessions using libraries like `next-auth` or custom solutions with JWT stored in HTTP-only cookies. Use server components or middleware to validate sessions, and store session data in Redis or a database for scalability.

**Code Example**:

```typescript
// app/api/session/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const session = cookies().get("session")?.value;
  if (!session) return NextResponse.json({ error: "No session" }, { status: 401 });
  return NextResponse.json({ session });
}
```

---

## 37. How do you implement server-side pagination in Next.js 15?

**Answer**: Implement pagination in server components or API routes by querying data with `limit` and `offset` parameters. Return paginated results with metadata (e.g., total count), optimizing backend database queries.

**Code Example**:

```typescript
// app/api/users/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  const users = await prisma.user.findMany({ take: limit, skip });
  const total = await prisma.user.count();

  return NextResponse.json({ users, total, page, limit });
}
```

---

## 38. How do you handle server-side file downloads in Next.js 15?

**Answer**: Handle file downloads in API routes by streaming file content with `NextResponse`. Set appropriate headers (e.g., `Content-Disposition`) to prompt downloads, and use cloud storage or local files for scalability.

**Code Example**:

```typescript
// app/api/download/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";

export async function GET() {
  const file = await fs.readFile("./files/example.pdf");
  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=example.pdf",
    },
  });
}
```

---

## 39. How do you implement server-side search functionality in Next.js 15?

**Answer**: Implement search using server components or API routes with database queries (e.g., Prisma, MongoDB) or external search services (e.g., Algolia). Sanitize inputs to prevent injection, and cache results for performance.

**Code Example**:

```typescript
// app/api/search/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  const results = await prisma.post.findMany({
    where: { title: { contains: query, mode: "insensitive" } },
  });

  return NextResponse.json(results);
}
```

---

## 40. How do you handle server-side email sending in Next.js 15?

**Answer**: Send emails using libraries like `nodemailer` in API routes or server actions. Configure SMTP or email services (e.g., SendGrid) with environment variables, and handle errors to ensure reliable delivery.

**Code Example**:

```typescript
// app/api/email/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: Request) {
  const { to, subject, text } = await request.json();
  try {
    await transporter.sendMail({ from: "no-reply@example.com", to, subject, text });
    return NextResponse.json({ sent: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
```

---

## 41. How do you implement server-side metrics collection in Next.js 15?

**Answer**: Collect metrics using libraries like `prom-client` in API routes or middleware. Expose a `/metrics` endpoint for Prometheus scraping, and integrate with monitoring tools (e.g., Grafana) for backend performance tracking.

**Code Example**:

```typescript
// app/api/metrics/route.ts
import { NextResponse } from "next/server";
import prom from "prom-client";

const counter = new prom.Counter({
  name: "api_requests_total",
  help: "Total API requests",
});

export async function GET() {
  counter.inc();
  return new NextResponse(await prom.register.metrics(), {
    headers: { "Content-Type": prom.register.contentType },
  });
}
```

---

## 42. How do you handle server-side content negotiation in Next.js 15?

**Answer**: Handle content negotiation by checking `Accept` headers in API routes and returning appropriate formats (e.g., JSON, XML). Use `NextResponse` to set `Content-Type`, ensuring flexible backend API compatibility.

**Code Example**:

```typescript
// app/api/content/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const accept = request.headers.get("accept") || "application/json";
  const data = { name: "Example" };

  if (accept.includes("application/xml")) {
    return new NextResponse(`<data><name>${data.name}</name></data>`, {
      headers: { "Content-Type": "application/xml" },
    });
  }

  return NextResponse.json(data);
}
```

---

## 43. How do you implement server-side role-based access control (RBAC) in Next.js 15?

**Answer**: Implement RBAC using middleware or server components to check user roles from JWT or database queries. Restrict access to routes or resources based on roles, and use server actions for secure operations, ensuring backend authorization.

**Code Example**:

```typescript
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", request.url));

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string };
  if (decoded.role !== "admin" && request.nextUrl.pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/admin/:path*",
};
```

---

## 44. How do you handle server-side data aggregation in Next.js 15?

**Answer**: Perform data aggregation in server components or API routes using database queries (e.g., Prisma, MongoDB aggregation pipelines). Cache results with `fetch` tags or ISR to optimize performance, and sanitize outputs for security.

**Code Example**:

```typescript
// app/api/stats/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  const stats = await prisma.user.aggregate({
    _count: { id: true },
    _avg: { age: true },
  });

  return NextResponse.json(stats);
}
```

---

## 45. How do you implement server-side webhook handling in Next.js 15?

**Answer**: Handle webhooks in API routes by verifying signatures (e.g., HMAC) and processing payloads asynchronously. Use libraries like `crypto` for security, and store results in a database or queue for reliability.

**Code Example**:

```typescript
// app/api/webhook/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const signature = request.headers.get("x-signature");
  const body = await request.text();
  const computed = crypto
    .createHmac("sha256", process.env.WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  if (signature !== computed) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  // Process webhook
  return NextResponse.json({ received: true });
}
```

---

## 46. How do you handle server-side data seeding in Next.js 15?

**Answer**: Seed data using scripts run via `node` or API routes for initial database population. Use ORMs like Prisma for structured seeding, and trigger during development or deployment setup to ensure consistent backend data.

**Code Example**:

```typescript
// scripts/seed.ts
import prisma from "../lib/db";

async function seed() {
  await prisma.user.createMany({
    data: [{ name: "Alice" }, { name: "Bob" }],
  });
  console.log("Seeded");
}

seed().catch(console.error);

// app/api/seed/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST() {
  await prisma.user.createMany({
    data: [{ name: "Alice" }, { name: "Bob" }],
  });
  return NextResponse.json({ seeded: true });
}
```

---

## 47. How do you implement server-side compression in Next.js 15?

**Answer**: Enable compression using middleware or Vercel’s built-in compression. Use libraries like `compression` in custom servers or configure `next.config.js` for headers to reduce response sizes, optimizing backend delivery.

**Code Example**:

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [{ key: "Content-Encoding", value: "gzip" }],
      },
    ];
  },
};
```

---

## 48. How do you handle server-side data export in Next.js 15?

**Answer**: Export data in API routes by generating files (e.g., CSV, JSON) and streaming them with `NextResponse`. Set headers for downloads, and use libraries like `json2csv` for format conversion, ensuring efficient backend data delivery.

**Code Example**:

```typescript
// app/api/export/route.ts
import { NextResponse } from "next/server";
import { Parser } from "json2csv";

export async function GET() {
  const data = [{ name: "Alice" }, { name: "Bob" }];
  const csv = new Parser().parse(data);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=export.csv",
    },
  });
}
```

---

## 49. How do you implement server-side audit logging in Next.js 15?

**Answer**: Implement audit logging by capturing user actions in server components or API routes, storing logs in a database or external service (e.g., MongoDB, ELK). Use middleware for global tracking, ensuring backend accountability.

**Code Example**:

```typescript
// app/api/action/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  const { action, userId } = await request.json();
  await prisma.auditLog.create({
    data: { action, userId, timestamp: new Date() },
  });
  return NextResponse.json({ logged: true });
}
```

---

## 50. How do you test Next.js 15 backend features?

**Answer**: Test backend features using Jest and `supertest` for API routes, and mock server components with `@testing-library/react`. Test middleware with mocked `NextRequest`, and use tools like Prisma’s test environment for database interactions, ensuring robust backend validation.

**Code Example**:

```typescript
// __tests__/api.test.ts
import { GET } from "@/app/api/hello/route";
import { NextResponse } from "next/server";

describe("API Route", () => {
  it("returns hello message", async () => {
    const response = await GET();
    const json = await response.json();
    expect(response.status).toBe(200);
    expect(json).toEqual({ message: "Hello, world!" });
  });
});
```

---

This Markdown file provides a backend-focused resource for Next.js 15 interview preparation, emphasizing server-side features like API routes, server components, and caching. Each question is answered with practical examples, ensuring a deep understanding of backend concepts for developer roles.

```

```
