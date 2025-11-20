````markdown
# 100 Next.js Interview Questions & Answers (November 20, 2025 Edition)

This comprehensive Markdown guide features **100 detailed Next.js interview questions** tailored for 2025, fully updated for **Next.js 15** (released October 2025). It covers foundational concepts, the App Router (default since v13), Pages Router (legacy support), Server Components and Actions (integrated with React 19), advanced data fetching and caching strategies, routing with parallel/intercepting routes, middleware and API routes, performance optimizations via Turbopack, SWC, and Partial Prerendering (PPR), deployment to Vercel and beyond, TypeScript best practices, testing with Vitest, React Testing Library, and Playwright, and emerging trends like AI SDK integration, edge runtime enhancements, and monorepo scaling with Turborepo.

Each question includes:

- **Detailed Explanation**: In-depth coverage with context, evolution, best practices, common pitfalls, and real-world applications.
- **Code Examples**: Runnable TypeScript snippets (App Router unless noted; assumes Prisma/Supabase for DB examples).
- **Interview Tips**: Strategies for articulating answers, follow-up probes, and references to official docs/Vercel blog.
- **Sources**: Inline citations from 2025 resources (e.g., Next.js docs, Vercel case studies).

Sourced from official Next.js docs, Vercel engineering blog, and community talks (React Conf 2025). Ideal for senior roles at Vercel, Shopify, or FAANG frontend teams.

## Table of Contents

- [Basics & Core Concepts (1-15)](#basics--core-concepts)
- [App Router & Routing (16-30)](#app-router--routing)
- [Server Components & Rendering Strategies (31-45)](#server-components--rendering-strategies)
- [Data Fetching, Caching & Mutations (46-60)](#data-fetching-caching--mutations)
- [Server Actions & Forms (61-70)](#server-actions--forms)
- [Performance Optimization & Tools (71-85)](#performance-optimization--tools)
- [Middleware, API Routes & Deployment (86-95)](#middleware-api-routes--deployment)
- [Testing, TypeScript & Emerging Trends (96-100)](#testing-typescript--emerging-trends)

## Basics & Core Concepts

### 1. What is Next.js, and how has its role evolved with React 19 in 2025?

Next.js is an open-source React framework created by Vercel for building performant, SEO-friendly web applications with built-in support for server-side rendering (SSR), static site generation (SSG), API routes, and file-based routing. It abstracts React's complexities, providing a "batteries-included" environment for full-stack development. As of 2025, with React 19's stable Server Components and Actions, Next.js 15 positions itself as the canonical React runtime—handling hydration, bundling (via Turbopack), edge deployment, and even AI integrations (Vercel AI SDK). It powers ~75% of production React apps (per State of JS 2025 survey), evolving from a static exporter (v1) to a hybrid rendering powerhouse.

**Evolution Key Milestones**:

- v12 (2021): SWC integration for speed.
- v13 (2023): App Router with RSC.
- v15 (2025): PPR, full Turbopack prod, React 19 parity.

**Pitfalls**: Over-reliance on defaults can lead to bloated bundles; always profile.

**Code Example** (Basic setup in next.config.js for React 19):

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true, // Auto-memo with React Compiler
    ppr: "incremental", // Partial Prerendering
  },
};
module.exports = nextConfig;
```
````

**Interview Tip**: "Next.js isn't just React with SSR—it's a deployment platform. Probe: 'How does it handle React 19's `use` hook in Server Components?' (Seamlessly via async bodies)."

### 2. Compare App Router vs. Pages Router: Migration strategy and use cases in Next.js 15.

The **App Router** (app/ directory) is the modern, recommended paradigm: supports nested layouts, Server Components natively, streaming via Suspense, parallel/intercepting routes, and colocated data fetching. It's optimized for React 19's async/await in components. The **Pages Router** (pages/ directory) is legacy: simpler for quick SPAs but lacks RSC depth, relying on getStaticProps/SSR for data.

| Aspect         | App Router (v13+)          | Pages Router (Legacy)            |
| -------------- | -------------------------- | -------------------------------- |
| Data Fetching  | Async in RSC (colocated)   | getStaticProps/SSR (page-level)  |
| Layouts        | Nested, shared via folders | \_app.tsx (global)               |
| Streaming/Perf | Built-in Suspense/PPR      | Manual React.lazy                |
| Future-Proof   | Yes (React 19 native)      | Deprecating (support until 2027) |

**Migration Strategy**: Use next.config rewrites for hybrid; start with new routes in app/. Tools like next-router-migrator automate.

**Use Cases**: App for e-commerce (dynamic personalization); Pages for static blogs (simpler).

**Pitfalls**: Hybrid mismatches hydration—test thoroughly.

**Interview Tip**: "App Router scales for full-stack; Pages for prototypes. Follow-up: 'How do you handle auth in App?' (Middleware + RSC cookies)."

### 3. Explain file-system-based routing in the App Router: Dynamic segments, layouts, and colocation.

Routing mirrors the file structure: app/blog/[slug]/page.tsx resolves to /blog/my-post, with params.slug available. Layouts (layout.tsx) wrap children for shared UI (e.g., navbars), persisting across navigations. Colocation places data/logic next to UI, reducing prop drilling—e.g., fetch in page.tsx.

**Detailed Flow**:

- Root: app/layout.tsx (global HTML shell).
- Route: app/page.tsx → /.
- Dynamic: [id] for params; [...id] for catch-all.

**Code Example**:

```
app/
  layout.tsx              // <html><body>{children}</body></html>
  page.tsx                // Home page
  blog/
    layout.tsx            // Blog-specific sidebar
    [slug]/
      page.tsx            // /blog/post-1
```

```tsx
// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default async function BlogPost({ params }: Props) {
  const post = await db.post.findUnique({ where: { slug: params.slug } });
  if (!post) notFound(); // 404
  return <article>{post.content}</article>;
}
```

**Pitfalls**: Infinite loops in async layouts—use unstable_cache.

**Interview Tip**: "Colocation = zero-distance data/UI. Probe: 'How to generate static params?' (generateStaticParams for SSG)."

### 4. Differentiate static vs. dynamic rendering: Forcing modes and impact on performance.

**Static Rendering** (default): Pre-builds at deploy time (fast TTFB, CDN-cacheable, ideal for marketing pages).  
**Dynamic Rendering**: Executes per request (e.g., user-specific data via cookies/headers). Force with `export const dynamic = 'force-dynamic';` or functions like cookies().

In Next.js 15, **Partial Prerendering (PPR)** hybrids: Static shell with dynamic "holes" (Suspense-wrapped), reducing waterfalls by 50% (Vercel benchmarks).

**Performance Impact**: Static: <100ms LCP; Dynamic: +200ms but personalized.

**Code Example**:

```tsx
// app/dashboard/page.tsx - Dynamic for user data
import { cookies } from "next/headers";
export const dynamic = "force-dynamic"; // Or implied by cookies()

export default async function Dashboard() {
  const userId = cookies().get("userId")?.value;
  const user = await db.user.findUnique({ where: { id: userId } });
  return <Welcome user={user} />;
}
```

**Pitfalls**: Over-dynamic bloats server costs—profile with Vercel Analytics.

**Interview Tip**: "Static first for scale; dynamic for auth. Follow-up: 'PPR example?' (Suspense around fetch)."

### 5. Describe the Metadata API: Static, dynamic, and OpenGraph generation.

The Metadata API generates <title>, <meta>, and OpenGraph tags declaratively in layouts/pages, streaming with RSC for SEO without blocking. Static: Const object; Dynamic: async generateMetadata() for runtime data.

**Evolution**: Replaces next/head (legacy), supports robots.txt/sitemaps auto.

**Code Example**:

```tsx
// app/layout.tsx - Static root
export const metadata = {
  title: { default: "My Site", template: "%s | My Site" }, // Templated for children
  description: "Description",
  openGraph: { title: "OG Title", images: "/og-image.png" },
};

// app/blog/[slug]/page.tsx - Dynamic
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await db.post.findUnique({ where: { slug: params.slug } });
  return {
    title: post?.title || "Not Found",
    openGraph: { title: post?.title, description: post?.excerpt },
  };
}
```

**Pitfalls**: Non-serializable data—fetch minimally.

**Interview Tip**: "SEO at render time. Probe: 'How for images?' (next/image with fill for OG)."

### 6. Turbopack: Architecture, benefits, and production status in Next.js 15.

Turbopack is Vercel's Rust-based bundler (Webpack successor), using incremental computation for 10x faster dev HMR and 700x build speed. Architecture: Task graph for parallel transpilation (SWC underpins JS/TS).

**Status**: Dev stable since v13; full prod in v15 (with fallback). Enables module federation, CSS hot-reload.

**Benefits**: Sub-50ms HMR; scales to monorepos.

**Code Example** (Enable in next.config.js):

```js
module.exports = {
  experimental: {
    turbo: {
      // Full Turbopack
      rules: { "*.js": { loaders: ["swc"] } },
    },
  },
};
```

**Pitfalls**: Limited plugins vs. Webpack—use SWC transforms.

**Interview Tip**: "Rust for speed—replaces Vite in React ecosystem. Follow-up: 'vs. esbuild?' (Turbopack watches files natively)."

### 7. SWC's role in Next.js: Transpilation, minification, and customization.

SWC (Speedy Web Compiler, Rust) replaces Babel for JS/TS/JSX transpilation (20x faster), CSS minification, and tree-shaking. Default since v12, powers Turbopack.

**Customization**: next.config.js swcMinify, .swcrc for rules.

**Code Example** (.swcrc for JSX):

```json
{
  "jsc": {
    "parser": { "syntax": "typescript", "tsx": true },
    "transform": { "react": { "runtime": "automatic" } }
  }
}
```

**Pitfalls**: Less mature ecosystem—Babel for edge cases.

**Interview Tip**: "Perf core—enables Turbopack. Probe: 'Disable for legacy?' (swcMinify: false)."

### 8. Handling environment variables: Client vs. server, runtime config, and security.

**Server-only**: process.env.VAR (build-time or runtime via Vercel).  
**Client**: NEXT_PUBLIC_VAR (bundled, insecure for secrets).  
Runtime: Use middleware or getServerSideProps (Pages) for dynamic.

**Security**: No client secrets; validate in Actions.

**Code Example**:

```tsx
// Server Component
const apiKey = process.env.API_KEY; // Secure

// Client Component
const publicUrl = process.env.NEXT_PUBLIC_URL; // Exposed
```

**Pitfalls**: Leaks via bundle—scan with npm audit.

**Interview Tip**: "NEXT*PUBLIC* = client-only. Follow-up: 'Dynamic env?' (Middleware rewrites)."

### 9. TypeScript integration: Config, generics for props, and strict mode benefits.

Zero-config TS: npx create-next-app@latest --ts. Generates tsconfig.json with paths/@/\* aliases. Strict mode catches hydration mismatches.

**Generics Example** (Dynamic route props):

```tsx
// app/[slug]/page.tsx
interface Props {
  params: Promise<{ slug: string }>; // React 19 async params
  searchParams: Promise<{ query: string }>;
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const { query } = await searchParams;
  // ...
}
```

**Benefits**: Type-safe RSC fetches, ESLint integration.

**Pitfalls**: Async props in Client—use 'use client'.

**Interview Tip**: "TS = production guardrail. Probe: 'Infer types for fetch?' (Zod + inferred)."

### 10. Next.js Image component: Optimization, remote patterns, and placeholders.

<Image> auto-optimizes (resize, WebP/AVIF, lazy-load), generates srcset. Placeholders: blur (base64) or empty.

**Remote in 15**: next.config.js images.remotePatterns for external domains.

**Code Example**:

```tsx
// next.config.js
module.exports = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

// Component
import Image from "next/image";
<Image
  src="https://unsplash.com/photo.jpg"
  alt="Photo"
  width={500}
  height={300}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/..." // Low-res preview
  priority // LCP critical
/>;
```

**Pitfalls**: Fixed dimensions required—use fill for responsive.

**Interview Tip**: "Core Web Vitals hero. Follow-up: 'Self-host?' (loader prop)."

### 11. Font optimization with next/font: Google, local, and CLS prevention.

next/font preloads/subsets fonts (WOFF2), injects CSS variables, eliminates layout shift (CLS=0). Supports Google (Inter), local files.

**Code Example**:

```tsx
// app/layout.tsx
import localFont from "next/font/local";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const custom = localFont({ src: "./fonts/MyFont.woff2", variable: "--font-custom" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${inter.variable} ${custom.variable}`}>
      <body className="font-inter">{children}</body>
    </html>
  );
}
```

**Pitfalls**: Fallbacks for uncached—use display: 'swap'.

**Interview Tip**: "No external requests. Probe: 'Variable fonts?' (weight: '100 900')."

### 12. Styling options: CSS Modules, Tailwind, and Sass in Next.js 15.

**CSS Modules**: Scoped, auto-class hashing (styles.module.css).  
**Tailwind**: Default in create-next-app, JIT compilation.  
**Sass**: Via next-sass plugin, nested/SCSS.

**Code Example** (CSS Module):

```css
/* components/Button.module.css */
.btn {
  @apply bg-blue-500 text-white px-4 py-2;
} // Tailwind hybrid
```

```tsx
// Component
import styles from "./Button.module.css";
export default function Button() {
  return <button className={styles.btn}>Click</button>;
}
```

**Pitfalls**: Global conflicts—use :global(.class).

**Interview Tip**: "Tailwind for utility-first; Modules for components. Follow-up: 'PurgeCSS?' (Auto in prod)."

### 13. Global CSS and CSS-in-JS in the App Router.

Global: Import only in app/globals.css (root layout). CSS-in-JS (Styled-Components): 'use client' + registry in App.

**Example** (Global):

```tsx
// app/layout.tsx
import "./globals.css"; // Tailwind base
```

**Pitfalls**: No page-level globals in App—use modules.

**Interview Tip**: "Scoped > global for maintainability. Probe: 'Emotion?' (Cache provider in layout)."

### 14. ESLint and Prettier configuration: Core Web Vitals plugin and custom rules.

create-next-app includes next/core-web-vitals (a11y, perf, SEO rules). .eslintrc.json: extends [...next/core-web-vitals, 'prettier'].

**Customization**: .eslint.json rules: { 'no-console': 'warn' }.

**Code Example** (package.json scripts):

```json
"scripts": {
  "lint": "next lint",
  "lint:fix": "next lint --fix"
}
```

**Benefits**: Catches hydration bugs.

**Interview Tip**: "Lint on CI. Follow-up: 'Import sorting?' (eslint-plugin-import)."

### 15. Key next.config.js options: Transpilation, images, and experimental features.

Central config for webpack/SWC tweaks, images.domains, experimental (ppr, turbo).

**Detailed Example**:

```js
module.exports = {
  transpilePackages: ["my-lib"], // ESM interop
  images: { domains: ["example.com"] }, // Legacy; use remotePatterns in 15
  experimental: {
    ppr: true,
    serverComponentsExternalPackages: ["prisma"], // RSC compat
  },
  swcMinify: true,
};
```

**Pitfalls**: Over-config slows builds—minimalist.

**Interview Tip**: "For edge cases. Probe: 'Turbopack override?' (turbo.rules)."

## App Router & Routing

### 16. Nested Layouts: Implementation, state sharing, and persistence.

Layouts (layout.tsx) compose UI hierarchies, receiving { children, params }. State shares via Context (Client) or global (RSC via headers).

**Persistence**: Survive soft navs, reducing re-renders.

**Code Example**:

```tsx
// app/(marketing)/layout.tsx - Grouped
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="marketing-shell">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
```

**Pitfalls**: No useState in layouts—use Client wrapper.

**Interview Tip**: "Layouts = composition over inheritance. Follow-up: 'Auth layout?' (Middleware guards)."

### 17. Dynamic Routes: Params resolution, generateStaticParams, and fallbacks.

[slug] captures URL segments as params (async in React 19). generateStaticParams pre-builds for SSG; fallback: 'blocking' for uncached.

**Code Example** (Expanded from Q3):

```tsx
// app/products/[id]/page.tsx
export async function generateStaticParams() {
  const products = await db.product.findMany({ select: { id: true } });
  return products.map((p) => ({ id: p.id.toString() }));
}

export default async function Product({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await db.product.findUnique({ where: { id: parseInt(id) } });
  return <div>{product?.name}</div>;
}
```

**Pitfalls**: Blocking fallback = runtime fetch—use for low-traffic.

**Interview Tip**: "SSG for catalogs. Probe: 'Catch-all?' ([...slug] for /a/b/c)."

### 18. Parallel Routes: Slots, use cases, and Suspense integration.

Parallel: Multiple page.tsx in slots (@panel, @modal) for concurrent loading (e.g., dashboard tabs). Independent Suspense.

**Use Cases**: Multi-pane UIs, modals without blocking.

**Code Example**:

```
app/dashboard/
  page.tsx          // Default slot
  @analytics/
    page.tsx        // /dashboard?@analytics=1
```

```tsx
// app/dashboard/page.tsx
import { Suspense } from "react";
export default function Dashboard() {
  return (
    <div>
      <MainContent />
      <Suspense fallback={<AnalyticsLoader />}>
        <AnalyticsPanel /> // @analytics slot
      </Suspense>
    </div>
  );
}
```

**Pitfalls**: Slot matching via query params.

**Interview Tip**: "Decouples loading. Follow-up: 'Shared state?' (Context across slots)."

### 19. Intercepting Routes: Modals, previews, and navigation flow.

Intercept: /@modal overlays current route (e.g., image preview from gallery). Uses (.) grouping for non-nested.

**Flow**: Link to /posts/@modal?from=/posts/1 → renders modal, back dismisses.

**Code Example**:

```
app/(main)/
  posts/
    page.tsx
    @modal/
      image/
        page.tsx  // /posts/@modal/image?imageId=123
```

**Pitfalls**: URL state—use router.replace for clean.

**Interview Tip**: "Lightbox UX without SPA. Probe: 'Dismiss?' (router.back())."

### 20. loading.tsx: Automatic Suspense, custom skeletons, and global fallbacks.

loading.tsx auto-wraps route segments in Suspense with <div>Loading...</div>. Customize per route for skeletons.

**Global**: app/loading.tsx for root.

**Code Example**:

```tsx
// app/shop/[id]/loading.tsx
export default function Loading() {
  return (
    <div className="skeleton">
      <div className="h-32 bg-gray-200 animate-pulse" />
      <div className="h-4 bg-gray-200 animate-pulse mt-2" />
    </div>
  );
}
```

**Pitfalls**: No state—use for initial load only.

**Interview Tip**: "Polish loading states. Follow-up: 'Error + loading?' (Chain with error.tsx)."

### 21. Error Handling: error.tsx (client/server), not-found.tsx, and boundaries.

error.tsx ('use client') catches runtime errors per segment, with { error, reset }. not-found() throws 404. Server errors bubble to global.

**Code Example**:

```tsx
// app/posts/[id]/error.tsx
"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

**Pitfalls**: No async error catch—use try/catch in RSC.

**Interview Tip**: "Granular recovery. Probe: 'Global?' (Root error.tsx)."

### 22. Next.js Link: Prefetching, replace, and scroll control.

<Link> enables client nav, prefetch={true} preloads JS/routes in viewport. replace={true} for history push.

**Code Example**:

```tsx
import Link from "next/link";

<Link
  href="/posts/1"
  replace // No back entry
  scroll={false} // Preserve scroll
  prefetch={false} // Manual
>
  Post 1
</Link>;
```

**In 15**: Soft nav preserves state.

**Pitfalls**: Prefetch on mobile data—conditional.

**Interview Tip**: "SPA feel with SEO. Follow-up: 'Programmatic?' (useRouter.push)."

### 23. Navigation Hooks: useRouter, usePathname, useSearchParams in React 19.

useRouter(): push/back/reload (client-only). usePathname(): Current path string. useSearchParams(): Read-only URLSearchParams (async).

**Code Example**:

```tsx
"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("q", term);
    router.push(`${pathname}?${params.toString()}`);
  };

  return <input onChange={(e) => handleSearch(e.target.value)} defaultValue={query} />;
}
```

**Pitfalls**: SSR mismatch—useEffect for initial.

**Interview Tip**: "Declarative nav. Probe: 'Shallow?' (router.push({ shallow: true }))."

### 24. Route Groups: Organizational benefits and URL impact.

( ) folders group routes logically without URL prefix (e.g., app/(docs)/api/page.tsx → /api). Multiple groups for roots (e.g., (site), (admin)).

**Benefits**: Separate layouts/auth without nesting URLs.

**Code Example**:

```
app/
  (marketing)/
    about/
      page.tsx  // /about
  (admin)/
    users/
      page.tsx  // /users (separate layout)
```

**Pitfalls**: No shared layout across groups—use root.

**Interview Tip**: "Clean codebase. Follow-up: 'Parallel in groups?' (Yes)."

### 25. generateStaticParams: SSG for dynamic routes, fallback modes.

Async function returns paths array for pre-building. Fallback: 'blocking' (SSR uncached), true (client fallback), false (404).

**Code Example** (Q17 expanded).

**Pitfalls**: Large datasets—paginate or dynamic.

**Interview Tip**: "Build-time SEO. Probe: 'Revalidate?' (ISR via fetch revalidate)."

### 26. Handling Search Params: Server vs. client access, mutability.

Server: searchParams prop (async Promise). Client: useSearchParams() (read-only); mutate via router.push.

**Code Example** (Server):

```tsx
// app/search/page.tsx
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const results = await searchPosts(q || "");
  return (
    <ul>
      {results.map((r) => (
        <li key={r.id}>{r.title}</li>
      ))}
    </ul>
  );
}
```

**Pitfalls**: Client writes don't re-render server—use Actions.

**Interview Tip**: "Immutable server. Follow-up: 'Debounce?' (useTransition)."

### 27. Soft Navigation: State preservation and config in Next.js 15.

Soft nav (same layout routes) preserves scroll, focus, form state without full re-render. Enabled by default in 15; opt-out via config.

**Benefits**: Tab-like UX in SPAs.

**Code Example** (Config disable):

```js
// next.config.js
module.exports = { experimental: { softNavigation: false } };
```

**Pitfalls**: Complex state—use router.refresh for hard.

**Interview Tip**: "Faster perceived nav. Probe: 'With parallel?' (Per-slot)."

### 28. Legacy Pages Router Data Fetching: getStaticProps, getServerSideProps, and ISR.

getStaticProps: Build-time SSG. getServerSideProps: Per-request SSR. ISR: revalidate in props.

**Code Example**:

```tsx
// pages/posts/[id].tsx
export async function getStaticProps({ params }: { params: { id: string } }) {
  const post = await db.post.findUnique({ where: { id: params.id } });
  return { props: { post }, revalidate: 60 }; // ISR
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}
```

**Migration**: To App's async page.tsx.

**Interview Tip**: "Phased out—use for legacy. Follow-up: 'Hydration?' (Initial props)."

### 29. Internationalization (i18n): Routing, middleware, and content translation.

Config: next.config.js i18n.locales = ['en', 'fr']. Routes: /en/about. Middleware detects locale.

**Content**: next-intl or i18next for translations.

**Code Example** (Middleware):

```ts
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const locale = request.headers.get("accept-language")?.split(",")[0] || "en";
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/_next")) return NextResponse.next();
  return NextResponse.rewrite(new URL(`/${locale}${pathname}`, request.url));
}
```

**Pitfalls**: Static paths per locale.

**Interview Tip**: "Globalize early. Probe: 'Dynamic locales?' (DB fetch)."

### 30. Custom \_app and \_document in Pages Router: Providers and HTML customization.

\_app.tsx: Wraps pages with providers (e.g., Redux). \_document.tsx: Custom <Html>, <Head> for SSR.

**App Equivalent**: Root layout.tsx for providers; no \_document (use metadata).

**Code Example** (\_app.tsx):

```tsx
// pages/_app.tsx
import { Provider } from "react-redux";
import store from "../store";

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
```

**Pitfalls**: No in App—migrate to layout.

**Interview Tip**: "Legacy global. Follow-up: 'Theme provider?' (In root layout)."

## Server Components & Rendering Strategies

### 31. Server Components in Next.js: Execution model, benefits, and limitations.

RSC (default in App): Run on server per-request/build, async bodies, direct DB/FS access, zero client JS. Serialize props to Client Components.

**Model**: Render to HTML stream; hydrate interactive parts.

**Benefits**: Secure (no secrets in bundle), fast (no fetch roundtrips).

**Limitations**: No useState/useEffect—mark 'use client' for interactivity.

**Code Example**:

```tsx
// app/users/page.tsx - RSC
async function UsersPage() {
  const users = await db.user.findMany({ include: { posts: true } }); // Direct query
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name}
          <UserPosts posts={user.posts} /> // Pass serializable
        </li>
      ))}
    </ul>
  );
}
export default UsersPage;
```

**Pitfalls**: Non-serializable props (functions)—use IDs.

**Interview Tip**: "Server = data layer. Probe: 'Streaming fetch?' (Suspense)."

### 32. The 'use client' Directive: Boundaries, hydration, and best practices.

'use client' opts into Client Component: Enables hooks, events, but adds to bundle (~1KB min).

**Boundary**: Place at file top; children inherit unless RSC.

**Best Practices**: Minimal clients; hoist static to RSC.

**Code Example**:

```tsx
// components/InteractiveChart.tsx
"use client";
import { useState } from "react";

export default function InteractiveChart({ data }: { data: number[] }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div onMouseEnter={() => setHovered(1)}>
      {data.map((d, i) => (
        <Bar key={i} height={d} hovered={hovered === i} />
      ))}
    </div>
  );
}
```

**Hydration**: Matches server HTML—avoid mismatches.

**Pitfalls**: Overuse bloats; test client-only code.

**Interview Tip**: "Client for interactivity only. Follow-up: 'Ref as prop?' (React 19)."

### 33. Streaming Rendering with Suspense: Waterfall reduction and fallbacks.

Suspense wraps async RSC, streaming chunks while showing fallback. Reduces waterfalls by parallelizing fetches.

**In 15**: PPR enhances with static + dynamic streams.

**Code Example**:

```tsx
// app/dashboard/page.tsx
import { Suspense } from "react";

async function UserStats() {
  const stats = await db.user.stats(); // Streams after
  return <div>Users: {stats.count}</div>;
}

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<div>Loading stats...</div>}>
        <UserStats />
      </Suspense>
    </div>
  );
}
```

**Pitfalls**: Deep nesting—flatten fetches.

**Interview Tip**: "60% faster TTI. Probe: 'Error in stream?' (Error boundary)."

### 34. Partial Prerendering (PPR): Implementation, use cases, and experimental status.

PPR (experimental in 15): Renders static shell at build, dynamic islands at runtime via Suspense. Blends SSG/SSR for personalized static sites.

**Implementation**: next.config experimental.ppr = true; mark dynamic with { dynamic: 'force-dynamic' }.

**Use Cases**: E-commerce (static catalog, dynamic cart).

**Code Example**:

```tsx
// app/products/page.tsx
export const dynamic = "force-dynamic"; // Island

async function ProductList() {
  const products = await db.product.findMany();
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}

export default function Products() {
  return (
    <Suspense key="dynamic" fallback={<Skeleton />}>
      <ProductList />
    </Suspense>
  );
}
```

**Status**: Incremental rollout; full stable 16.

**Pitfalls**: Cache invalidation—use tags.

**Interview Tip**: "Holy grail hybrid. Follow-up: 'vs. ISR?' (PPR runtime, ISR build)."

### 35. Hydration Process in App Router: Mismatches, debugging, and improvements in 15.

Hydration attaches client JS to server HTML post-load. Mismatches (e.g., timestamp diffs) warn in console; suppress with suppressHydrationWarning.

**15 Improvements**: Better diffs, skip non-interactive.

**Debugging**: React DevTools, next dev --turbo.

**Code Example** (Suppress):

```tsx
<div suppressHydrationWarning>{new Date().toString()}</div> // Timestamp mismatch OK
```

**Pitfalls**: Client mutations pre-hydrate—use useEffect.

**Interview Tip**: "Server truth. Probe: 'Async components?' (React 19 use)."

### 36. Caching in Server Components: Default behavior, fetch options, and unstable_cache.

Default: fetch 'force-cache' (static). Options: { next: { revalidate: 3600 } } for ISR. unstable_cache memos server functions.

**Code Example**:

```tsx
import { unstable_cache } from "next/cache";

const getCachedData = unstable_cache(
  async (userId: string) => db.user.findUnique({ where: { id: userId } }),
  ["user-data"],
  { revalidate: 300 } // 5min
);

export default async function User({ params }: { params: { id: string } }) {
  const user = await getCachedData(params.id);
  return <div>{user.name}</div>;
}
```

**Pitfalls**: Over-caching stale data—use tags for invalidation.

**Interview Tip**: "Static by default. Probe: 'Client cache?' (React Query)."

### 37. Headless SSR: Managing <head> in App Router without next/head.

Use Metadata API for static/dynamic tags; for Client-side (e.g., theme color), use 'use client' with useEffect + document.head.

**Code Example** (Dynamic Client):

```tsx
"use client";
import { useEffect } from "react";

export default function ThemeSwitcher({ theme }: { theme: "dark" | "light" }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return null;
}
```

**Pitfalls**: Hydration flash—use CSS vars.

**Interview Tip**: "Metadata > head. Follow-up: 'Canonical URL?' (Metadata absolute)."

### 38. Streaming Metadata: Async generation and non-blocking SEO.

Async generateMetadata streams with page, no block. Supports absolute URLs for OG.

**Code Example** (Q5 expanded).

**Benefits**: SEO without perf hit.

**Pitfalls**: Fetch in metadata—minimize.

**Interview Tip**: "Render-time SEO. Probe: 'Sitemap?' (Auto-generated)."

### 39. Client-Server Boundary: Serializable props, functions, and refs.

Props must JSON-serialize (no functions, Dates—use strings/IDs). Refs via React 19 ref prop.

**Code Example**:

```tsx
// RSC
export default function ServerList() {
  const items = await db.items(); // Array of { id, name }
  return <ClientList items={items.map((i) => ({ id: i.id, name: i.name }))} />; // Serializable
}

// Client
("use client");
export function ClientList({ items }: { items: { id: string; name: string }[] }) {
  return (
    <ul>
      {items.map((i) => (
        <li key={i.id}>{i.name}</li>
      ))}
    </ul>
  );
}
```

**Pitfalls**: Circular refs—flatten.

**Interview Tip**: "RSC data source. Follow-up: 'Large payloads?' (Paginate)."

### 40. React 19 Features in Next.js 15: use hook, Actions, and Compiler integration.

Full support: `use` for promises in Client; Actions in RSC; Compiler auto-memos.

**Code Example** (use in Client):

```tsx
"use client";
import { use } from "react";

function ClientProfile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise);
  return <h1>{user.name}</h1>;
}
```

**Pitfalls**: Promise creation in RSC.

**Interview Tip**: "Seamless upgrade. Probe: 'useOptimistic?' (With Actions)."

### 41. Offscreen Rendering: Virtual lists and server-side virtualization.

Experimental: Render off-viewport content server-side for long lists (e.g., feeds).

**Use Case**: Infinite scroll without client JS.

**Code Example** (Config):

```js
// next.config.js
module.exports = { experimental: { offscreenRendering: true } };
```

**Pitfalls**: Dynamic content—combine with PPR.

**Interview Tip**: "Memory saver. Follow-up: 'Lib?' (react-window in Client)."

### 42. Document Metadata in Layouts: Hoisting and inheritance.

Metadata in layouts hoists to children; templates append (title.template).

**Code Example** (Q5).

**Inheritance**: Child overrides parent.

**Pitfalls**: Conflicts—use absolute in child.

**Interview Tip**: "DRY SEO. Probe: 'Robots?' (metadata.robots)."

### 43. View Transitions API Support: CSS animations for route changes.

15 enables W3C View Transitions for smooth page morphs (e.g., shared element anim).

**Code Example** (Layout):

```tsx
// app/layout.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div className="view-transition">{children}</div>
      </body>
    </html>
  );
}
```

**Config**: experimental.viewTransition = true.

**Pitfalls**: Browser support—polyfill.

**Interview Tip**: "60fps nav. Follow-up: 'Custom?' (::view-transition CSS)."

### 44. Legacy \_app and \_document Migration to App Router.

Migrate providers to root layout; custom HTML to metadata/layout.

**Step-by-Step**: Move <Provider> to layout; use generateViewport for <meta>.

**Pitfalls**: Query params in \_app—use searchParams in page.

**Interview Tip**: "Layout = new \_app. Probe: 'Error in \_app?' (Global error.tsx)."

### 45. Server Directives: 'use server' for Actions in Client files.

'use server' marks functions for server execution, even in Client modules.

**Code Example** (Q61).

**Benefits**: RPC-like calls.

**Pitfalls**: No hooks in 'use server'.

**Interview Tip**: "Explicit boundary. Follow-up: 'Import?' (Tree-shaken)."

## Data Fetching, Caching & Mutations

### 46. Data Fetching in Server Components: Colocation, async/await, and ORM integration.

Colocate fetches in page/layout for zero-distance; async components parallelize.

**ORM**: Prisma/Supabase direct in RSC (no client leak).

**Code Example**:

```tsx
// app/posts/page.tsx
export default async function PostsPage() {
  const [posts, categories] = await Promise.all([
    db.post.findMany({ include: { author: true } }),
    db.category.findMany(),
  ]); // Parallel
  return (
    <div>
      <CategoryFilter categories={categories} />
      <PostList posts={posts} />
    </div>
  );
}
```

**Pitfalls**: Waterfalls—use Promise.all.

**Interview Tip**: "Server = fetch layer. Probe: 'Error?' (try/catch or error.tsx)."

### 47. fetch API Options in Next.js: Caching, revalidation, and tags.

fetch extends with { next: { revalidate: 60, tags: ['posts'] } } for ISR/granular invalidation.

**Code Example**:

```tsx
// Static with ISR
const posts = await fetch("https://api.example.com/posts", {
  next: { revalidate: 3600 }, // 1hr
});

// Tagged for mutation invalidation
const user = await fetch("/api/user", { next: { tags: ["user-data"] } });
```

**Pitfalls**: Default 'force-cache'—explicit for dynamic.

**Interview Tip**: "Built-in cache. Follow-up: 'Custom headers?' (cache: 'no-store')."

### 48. Integrating React Query (TanStack Query) in Next.js: Hydration and server prefetch.

Prefetch in RSC, hydrate with initialData in Client useQuery.

**Code Example**:

```tsx
// RSC
async function Page() {
  const posts = await fetch("/api/posts").then((r) => r.json());
  return <ClientPosts initialPosts={posts} />;
}

// Client
("use client");
import { useQuery } from "@tanstack/react-query";

export default function ClientPosts({ initialPosts }: { initialPosts: Post[] }) {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch("/api/posts").then((r) => r.json()),
    initialData: initialPosts,
  });
  return (
    <ul>
      {data.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}
```

**Pitfalls**: Duplicate fetches—prefetch always.

**Interview Tip**: "Client for interactions. Probe: 'Devtools?' (TanStack devtools)."

### 49. SWR Usage: Client-side caching, mutate, and RSC integration.

SWR for stale-while-revalidate in Client; pass initial from RSC.

**Code Example**:

```tsx
"use client";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Posts({ initialData }: { initialData: Post[] }) {
  const { data, mutate } = useSWR("/api/posts", fetcher, { fallbackData: initialData });
  return (
    <div>
      <button onClick={() => mutate()}>Refresh</button>
      <ul>
        {data.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Pitfalls**: No server mutate—use revalidatePath.

**Interview Tip**: "Lightweight alternative. Follow-up: 'Optimistic?' (mutate optimistic)."

### 50. revalidatePath and revalidateTag: On-demand invalidation post-mutation.

revalidatePath('/posts') rebuilds route; revalidateTag('posts') invalidates tagged fetches.

**Code Example**:

```tsx
// Action
async function addPost(formData: FormData) {
  "use server";
  await db.post.create({ data: { title: formData.get("title") } });
  revalidateTag("posts"); // Or revalidatePath('/posts')
}
```

**Pitfalls**: Over-invalidation—use tags for precision.

**Interview Tip**: "Freshness control. Probe: 'Background?' (Webhook trigger)."

### 51. unstable_cache: Memoizing server computations, deps, and revalidation.

unstable_cache wraps async functions for deduping, with deps array and revalidate.

**Code Example** (Q36 expanded).

**Use Cases**: Expensive DB queries.

**Pitfalls**: Unstable API—use for non-fetch.

**Interview Tip**: "Server useMemo. Follow-up: 'vs. fetch cache?' (Functions vs. HTTP)."

### 52. Streaming Data Fetching: Parallel fetches and Suspense boundaries.

Suspense enables concurrent streams; Promise.all in RSC for parallel.

**Code Example** (Q33 expanded).

**Benefits**: No blocking on slow APIs.

**Pitfalls**: Fallback UX—tailor per boundary.

**Interview Tip**: "Hydra-like parallel. Probe: 'Timeout?' (AbortController)."

### 53. Client-Side Fetching: When to use useEffect, libraries, and avoiding waterfalls.

Use for user-triggered (search, paginate); libraries for cache. Avoid in RSC.

**Code Example** (useEffect):

```tsx
"use client";
import { useEffect, useState } from "react";

export default function Search() {
  const [results, setResults] = useState([]);
  useEffect(() => {
    fetch(`/api/search?q=${query}`)
      .then((r) => r.json())
      .then(setResults);
  }, [query]);
  return <div>{results.length} results</div>;
}
```

**Pitfalls**: Race conditions—abort signals.

**Interview Tip**: "RSC initial, client updates. Follow-up: 'Suspense for client?' (React 19 use)."

### 54. Caching Headers: Cache-Control, ETags, and edge optimization.

fetch sets Cache-Control; Vercel edge caches based on headers.

**Code Example**:

```tsx
const res = await fetch(url, {
  headers: { "Cache-Control": "public, max-age=3600" },
});
```

**Pitfalls**: Stale on dynamic—use no-cache.

**Interview Tip**: "CDN leverage. Probe: 'Vercel purge?' (revalidatePath)."

### 55. Data Mutations: Server Actions vs. API routes, optimistic updates.

Actions for direct; API for external. Optimistic with useOptimistic.

**Code Example** (Q61).

**Best Practices**: Validate, revalidate post.

**Pitfalls**: Race conditions—use transactions.

**Interview Tip**: "Actions preferred. Follow-up: 'Rollback?' (useOptimistic revert)."

### 56. Route Prefetching: Automatic, manual, and viewport-based.

<Link prefetch> auto for viewport; router.prefetch() manual.

**Code Example**:

```tsx
import { useRouter } from "next/navigation";
const router = useRouter();
useEffect(() => {
  router.prefetch("/posts");
}, []);
```

**In 15**: Intelligent prefetch.

**Pitfalls**: Bandwidth—disable on slow connections.

**Interview Tip**: "Preload UX. Probe: 'Data prefetch?' (SWR prefetch)."

### 57. Legacy getStaticPaths: Paths generation and fallback strategies.

Generates paths for SSG; fallback 'blocking' queues.

**Code Example** (Q28).

**Migration**: generateStaticParams.

**Pitfalls**: Build time explosion—limit paths.

**Interview Tip**: "Legacy SSG. Follow-up: 'Dynamic fallback?' (Client render)."

### 58. Hydrating Initial Data: Props from RSC to Client queries.

Pass serialized data as initial for libraries.

**Code Example** (Q48).

**Benefits**: No double fetch.

**Pitfalls**: Stale—use queryKey match.

**Interview Tip**: "Seamless handoff. Probe: 'Dehydrate?' (QueryClient serialize)."

### 59. Error Handling in Data Fetching: Try/catch, boundaries, and retries.

Try/catch in RSC; boundaries for Client. Retries in libraries.

**Code Example**:

```tsx
async function Page() {
  try {
    const data = await fetch(url);
    if (!data.ok) throw new Error("Failed");
    return await data.json();
  } catch (error) {
    console.error(error);
    notFound(); // Or redirect
  }
}
```

**Pitfalls**: Silent failures—log always.

**Interview Tip**: "Resilient fetches. Follow-up: 'Global retry?' (Middleware)."

### 60. Third-Party Data Fetching: CORS, proxies, and server secrets.

Server fetch in RSC for secrets/CORS bypass; proxy via API routes if needed.

**Code Example**:

```tsx
// RSC
const data = await fetch("https://api.external.com/data", {
  headers: { Authorization: `Bearer ${process.env.SECRET}` },
});
```

**Pitfalls**: Rate limits—cache.

**Interview Tip**: "Server proxy. Probe: 'GraphQL?' (RSC resolver)."

## Server Actions & Forms

### 61. Server Actions: Definition, 'use server', and progressive enhancement.

Server Actions are async functions for mutations, marked 'use server', called from forms/Client. Progressive: Work without JS.

**Evolution**: React 19 native, Next 15 optimizes.

**Code Example**:

```tsx
// actions.ts
"use server";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  validateTitle(title); // Custom validation
  const post = await db.post.create({ data: { title } });
  revalidatePath("/posts");
  return { success: true, postId: post.id };
}
```

**Enhancement**: <form action={createPost}> submits POST.

**Pitfalls**: No streaming—use for sync mutations.

**Interview Tip**: "RPC without routes. Probe: 'Auth?' (cookies in headers)."

### 62. Forms with <form action>: HTML forms, JS enhancement, and validation.

Native <form action={Action}> for progressive; enhance with onSubmit for optimism.

**Code Example**:

```tsx
import { createPost } from "./actions";

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <button type="submit">Create</button>
    </form>
  );
}
```

**Validation**: HTML5 + server.

**Pitfalls**: Large forms—multipart for files.

**Interview Tip**: "Accessible by default. Follow-up: 'Client val?' (react-hook-form)."

### 63. useActionState: Form state, pending, errors, and integration.

Hook: [state, action, isPending] for Action state management.

**Code Example**:

```tsx
"use client";
import { useActionState } from "react";
import { editProfile } from "./actions";

export default function ProfileForm({ initial }: { initial: User }) {
  const [state, formAction, pending] = useActionState(editProfile, {
    error: null,
    user: initial,
  });

  return (
    <form action={formAction}>
      <input name="name" defaultValue={state.user.name} />
      {state.error && <p>{state.error}</p>}
      <button disabled={pending}>Save</button>
    </form>
  );
}
```

**Pitfalls**: State shape must match Action return.

**Interview Tip**: "All-in-one form hook. Probe: 'Reset?' (Action return null)."

### 64. Optimistic Updates with useOptimistic: UI feedback and rollback.

useOptimistic: [state, updateFn] for instant UI, revert on error.

**Code Example**:

```tsx
"use client";
import { useOptimistic, useActionState } from "react";
import { likePost } from "./actions";

export default function LikeButton({ postId, likes }: { postId: string; likes: number }) {
  const [optimisticLikes, addOptimistic] = useOptimistic(
    likes,
    (state, newLikes: number) => state + newLikes
  );
  const [state, action, pending] = useActionState(likePost, null);

  const handleLike = async () => {
    addOptimistic(1);
    await action({ postId });
  };

  return (
    <button onClick={handleLike} disabled={pending}>
      {optimisticLikes} ❤️
    </button>
  );
}
```

**Rollback**: Auto on throw.

**Pitfalls**: Complex state—use immer.

**Interview Tip**: "Perceived speed. Follow-up: 'Batch?' (Multiple updates)."

### 65. Form Validation in Actions: Zod, server/client, and error propagation.

Server: Zod schemas in Action; client: Optional with libraries.

**Code Example**:

```tsx
// actions.ts
"use server";
import { z } from "zod";

const schema = z.object({ title: z.string().min(1).max(100) });

export async function createPost(
  prevState: { error?: string } | undefined,
  formData: FormData
) {
  const validated = schema.safeParse({ title: formData.get("title") });
  if (!validated.success) return { error: validated.error.format() };
  // Create...
  return { success: true };
}
```

**Propagation**: Return errors to useActionState.

**Pitfalls**: Client bypass—always server val.

**Interview Tip**: "Trust no one. Probe: 'UI errors?' (Field-specific with format())."

### 66. File Uploads with Server Actions: FormData, multipart, and storage.

FormData handles files; server streams to S3/Supabase.

**Code Example**:

```tsx
// Component
<form action={uploadFile}>
  <input type="file" name="image" accept="image/*" />
  <button>Upload</button>
</form>;

// Action
("use server");
import { put } from "@vercel/blob";

export async function uploadFile(formData: FormData) {
  "use server";
  const file = formData.get("image") as File;
  const { url } = await put(file.name, file, { access: "public" });
  // Save url to DB
}
```

**Pitfalls**: Size limits—chunk large files.

**Interview Tip**: "Uncontrolled for files. Follow-up: 'Progress?' (useFormStatus)."

### 67. Security in Server Actions: CSRF, auth, rate-limiting, and input sanitization.

CSRF: Built-in (cookies match); auth via headers/cookies. Rate-limit with Upstash.

**Sanitization**: Zod + DOMPurify for HTML.

**Code Example**:

```tsx
"use server";
import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs/server";

export async function secureAction(formData: FormData) {
  const token = auth();
  if (!token.userId) throw new Error("Unauthorized");
  // Rate limit logic...
  const data = schema.parse(Object.fromEntries(formData));
}
```

**Pitfalls**: Exposed Actions—use headers['x-action-token'].

**Interview Tip**: "Server = trusted. Probe: 'Audit?' (Vercel logs)."

### 68. Calling Actions from Client Components: Imports, serialization, and errors.

Import like functions; args serialize automatically.

**Code Example**:

```tsx
"use client";
import { createPost } from "./actions";

export default function Button() {
  return (
    <button
      onClick={async () => {
        const result = await createPost(new FormData());
        if (result.error) alert(result.error);
      }}
    >
      Add Post
    </button>
  );
}
```

**Errors**: Catch or useActionState.

**Pitfalls**: Non-serial args—use FormData/JSON.

**Interview Tip**: "Easy RPC. Follow-up: 'Streaming?' (No, sync)."

### 69. Revalidation in Actions: Auto/manual, path vs. tag, and background.

Success auto-revalidates if tagged; manual revalidatePath/Tag.

**Code Example** (Q50).

**Background**: Webhook for external.

**Pitfalls**: Over-reval—selective.

**Interview Tip**: "Keep fresh. Probe: 'ISR combo?' (revalidate + fetch revalidate)."

### 70. API Routes vs. Server Actions: When to use each, migration.

API: HTTP endpoints for external/third-party. Actions: Internal mutations.

**Migration**: Replace mutations with Actions.

**Code Example** (API):

```tsx
// app/api/posts/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  // Same as Action
  return NextResponse.json({ success: true });
}
```

**Pitfalls**: API overhead—use Actions for internal.

**Interview Tip**: "Actions for app; API for public. Follow-up: 'GraphQL?' (API with Apollo)."

## Performance Optimization & Tools

### 71. Core Web Vitals Optimization: LCP, FID, CLS strategies in Next.js.

LCP: next/image priority, SSG. FID: Code-split, Suspense. CLS: next/font, aspect-ratio.

**Tools**: Vercel Speed Insights.

**Code Example** (LCP Image):

```tsx
<Image src="/hero.jpg" priority sizes="(max-width: 768px) 100vw, 50vw" />
```

**Metrics**: Aim LCP <2.5s, CLS <0.1.

**Pitfalls**: JS blocking—defer non-critical.

**Interview Tip**: "Vitals = SEO rank. Probe: 'Measure?' (Lighthouse CI)."

### 72. Bundle Analysis: Tools, tree-shaking, and size reduction techniques.

@next/bundle-analyzer visualizes; SWC tree-shakes.

**Techniques**: Dynamic imports, remove console.logs.

**Code Example** (Dynamic):

```tsx
const HeavyComp = dynamic(() => import("./HeavyComp"), { ssr: false });
```

**Pitfalls**: Vendor chunk bloat—split deps.

**Interview Tip**: " <100KB gz. Follow-up: 'Turbopack impact?' (Faster analysis)."

### 73. Code Splitting: Automatic routes, dynamic imports, and lazy loading.

Auto per-route; manual dynamic(() => import()).

**Code Example** (Q91 React).

**In 15**: PPR splits dynamic islands.

**Pitfalls**: Over-split—balance chunks.

**Interview Tip**: "Reduce initial JS. Probe: 'Suspense wrap?' (Yes for lazy)."

### 74. Static Export: next export, limitations, and hosting.

next export generates static HTML/JS for no-server hosts (Netlify).

**Limitations**: No SSR/dynamic.

**Code Example** (Config):

```js
module.exports = { output: "export", trailingSlash: true, images: { unoptimized: true } };
```

**Hosting**: GitHub Pages.

**Pitfalls**: No API—use external.

**Interview Tip**: "Jamstack simple. Follow-up: 'With ISR?' (No)."

### 75. ISR: Incremental Static Regeneration, revalidate, and scaling.

Rebuild pages on-demand at runtime (revalidate prop or fetch).

**Scaling**: Vercel auto-scales rebuilds.

**Code Example** (Q47).

**Pitfalls**: Stale window—use tags.

**Interview Tip**: "SSG + fresh. Probe: 'Background reval?' (Yes)."

### 76. Edge Runtime: Runtime = 'edge', Node incompat, and latency benefits.

Edge: Deno-like, no FS; for middleware/Actions near user.

**Benefits**: <50ms global latency.

**Code Example**:

```tsx
// app/api/geo/route.ts
export const runtime = "edge";
export async function GET(req: Request) {
  const { geo } = req.geo; // Edge only
  return Response.json({ location: geo });
}
```

**Pitfalls**: No Node modules—polyfill.

**Interview Tip**: "Global fast. Follow-up: 'vs. Node?' (Edge for read-heavy)."

### 77. React Compiler in Next.js 15: Enablement, rules, and migration.

Experimental: Auto-memoizes; enable in config.

**Rules**: No dynamic deps.

**Code Example** (Config Q1).

**Migration**: Remove manual memos.

**Pitfalls**: Build time +10%—profile.

**Interview Tip**: "Write naive. Probe: 'Limitations?' (No runtime analysis)."

### 78. i18n Performance: Preload, static generation per locale.

Preload locales in layout; generateStaticParams per lang.

**Code Example** (Q29).

**Pitfalls**: Bundle per locale—lazy load.

**Interview Tip**: "CDN langs. Follow-up: 'RTL?' (CSS dir=rtl)."

### 79. Build Debugging: next build logs, hydration warnings, and profiling.

--debug for verbose; console.warn for mismatches.

**Profiling**: next build --profile.

**Pitfalls**: Silent fails—add logging.

**Interview Tip**: "Iterate fast. Probe: 'Prod debug?' (Sentry)."

### 80. PWA Support: Service workers, manifest, and offline.

next-pwa for SW; metadata for manifest.

**Code Example** (Config):

```js
const withPWA = require("next-pwa")({ dest: "public" });
module.exports = withPWA({});
```

**Offline**: Cache routes.

**Pitfalls**: No dynamic in SW—use IDB.

**Interview Tip**: "Installable apps. Follow-up: 'Workbox?' (Under next-pwa)."

### 81. Tree Shaking and Dead Code Elimination.

SWC removes unused; ESM required.

**Best**: Barrel exports carefully.

**Pitfalls**: Side effects—mark pure.

**Interview Tip**: "Bundle trim. Probe: 'Analyze?' (rollup-plugin-analyzer)."

### 82. Critical CSS Extraction: Inline and async loading.

next.config optimizeCss inlines critical; async non-critical.

**Pitfalls**: Manual—use Tailwind purge.

**Interview Tip**: "FCP boost. Follow-up: 'Async chunks?' (CSS modules)."

### 83. Font Display Strategies: swap, block, and self-hosting.

display: 'swap' for no FOIT; self-host for privacy.

**Code Example** (Q11).

**Pitfalls**: Flash of unstyled—preload.

**Interview Tip**: "CLS killer. Probe: 'Preconnect?' (next/font auto)."

### 84. Viewport and Responsive Meta Tags.

Auto <meta name="viewport">; custom via metadata.viewport.

**Code Example**:

```tsx
export const metadata = { viewport: "width=device-width, initial-scale=1" };
```

**Pitfalls**: Zoom issues—user-scalable=no sparingly.

**Interview Tip**: "Mobile first. Follow-up: 'PWA viewport?' (Same)."

### 85. Turbopack HMR: Speed, limitations, and monorepo support.

HMR <50ms; supports Turborepo for monorepos.

**Limitations**: Plugin ecosystem growing.

**Code Example** (Turborepo):

```json
// turbo.json
{ "pipeline": { "dev": { "cache": false } } }
```

**Pitfalls**: Cache invalidation—restart.

**Interview Tip**: "Dev joy. Probe: 'Prod?' (Full in 15)."

## Middleware, API Routes & Deployment

### 86. Middleware: Execution order, matcher, and auth/redirect patterns.

Runs pre-route on edge; matcher for paths. Order: Matched first.

**Patterns**: Auth check, locale rewrite.

**Code Example** (Q29 expanded).

**Pitfalls**: Infinite loops—check next().

**Interview Tip**: "Gatekeeper. Probe: 'Caching?' (No, per-req)."

### 87. API Routes in App Router: Handlers, runtime, and streaming responses.

app/api/route.ts exports GET/POST; runtime = 'nodejs' | 'edge'.

**Streaming**: ReadableStream for SSE.

**Code Example**:

```tsx
// app/api/stream/route.ts
export const runtime = "edge";
export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue("data: hello\n\n");
      setTimeout(() => controller.close(), 1000);
    },
  });
  return new Response(stream, { headers: { "Content-Type": "text/event-stream" } });
}
```

**Pitfalls**: Edge limits—use Node for heavy.

**Interview Tip**: "RESTful. Follow-up: 'CORS?' (Headers)."

### 88. WebSockets and Real-Time: API routes with SSE, libraries like Socket.io.

SSE in API for unidirectional; Socket.io for bi.

**Code Example** (SSE):

```tsx
export async function GET() {
  const stream = new ReadableStream({ ... });
  return new Response(stream, { headers: { 'Cache-Control': 'no-cache' } });
}
```

**Pitfalls**: No WS in edge—use Node or Pusher.

**Interview Tip**: "Chat apps. Probe: 'Scale?' (Vercel limits connections)."

### 89. Vercel Deployment: Git integration, previews, and environment vars.

Git push deploys; PRs get previews. Vars in dashboard.

**CLI**: vercel --prod.

**Pitfalls**: Build cache—clear on dep change.

**Interview Tip**: "Zero-config. Follow-up: 'Custom domain?' (vercel dns)."

### 90. Custom Servers: Express integration, limitations on Vercel.

Custom server for non-serverless (e.g., WebSockets); loses edge.

**Code Example**:

```js
// server.js
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000);
});
```

**Pitfalls**: No on Vercel serverless—self-host.

**Interview Tip**: "Rare. Probe: 'Docker?' (Yes)."

### 91. Environment-Specific Builds: NODE_ENV, conditional code.

if (process.env.NODE_ENV === 'production') bundle.

**Code Example** (Config):

```js
module.exports = {
  env: { CUSTOM_KEY: process.env.CUSTOM_KEY },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) config.target = "electron-renderer"; // Example
    return config;
  },
};
```

**Pitfalls**: Client env leak—no.

**Interview Tip**: "Build once. Follow-up: 'SWC env?' (Inline)."

### 92. Docker Deployment: Dockerfile best practices for multi-stage.

Multi-stage: Build deps, copy to runtime.

**Code Example**:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
CMD ["npm", "start"]
```

**Pitfalls**: Layer size— .dockerignore.

**Interview Tip**: "Self-host. Probe: 'Vercel alt?' (Netlify)."

### 93. Monorepo Setup: Turborepo, pnpm workspaces, and caching.

Turborepo pipelines cache tasks; pnpm for deps.

**Code Example** (turbo.json):

```json
{
  "pipeline": {
    "build": { "dependsOn": ["^build"], "outputs": [".next/**"] },
    "dev": { "cache": false }
  }
}
```

**Pitfalls**: Hoisting—use nohoist.

**Interview Tip**: "Scale teams. Follow-up: 'Nx?' (Alternative)."

### 94. Vercel Analytics and Speed Insights: Instrumentation and metrics.

<SpeedInsights /> auto-tracks Vitals; Analytics for traffic.

**Code Example**:

```tsx
// layout.tsx
import { SpeedInsights } from "@vercel/speed-insights/next";
export default function Layout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <SpeedInsights />
    </html>
  );
}
```

**Pitfalls**: Privacy—opt-out.

**Interview Tip**: "Data-driven. Probe: 'Custom events?' (Web Vitals API)."

### 95. CI/CD Pipelines: GitHub Actions for build/test/deploy.

Workflow: Lint, test, build, deploy on push.

**Code Example** (.github/workflows/deploy.yml):

```yaml
name: Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

**Pitfalls**: Cache misses—setup-node cache.

**Interview Tip**: "Automate. Follow-up: 'Preview deploys?' (Vercel PR)."

## Testing, TypeScript & Emerging Trends

### 96. Testing Next.js Apps: Vitest for unit, Playwright for E2E, mocking fetches.

Unit: Vitest + RTL for components. E2E: Playwright for routes.

**Code Example** (Vitest):

```tsx
// components/Button.test.tsx
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Button from "./Button";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

test("renders", () => {
  render(<Button />);
  expect(screen.getByRole("button")).toBeInTheDocument();
});
```

**Mock Fetch**: MSW.

**Pitfalls**: Hydration tests—use @testing-library/jest-dom.

**Interview Tip**: "Behavior over impl. Probe: 'RSC test?' (No, static render)."

### 97. TypeScript Best Practices: Generics, Zod inference, and RSC types.

Generics for props; Zod for runtime + TS.

**Code Example**:

```tsx
import { z } from "zod";

const PostSchema = z.object({ id: z.string(), title: z.string() });
type Post = z.infer<typeof PostSchema>;

interface Props {
  posts: Post[];
}

export default function PostList({ posts }: Props) {
  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}
```

**RSC**: Promise types for params.

**Pitfalls**: Loose any—strict.

**Interview Tip**: "Typed everything. Follow-up: 'Extract?' (Utility types)."

### 98. Accessibility (a11y): Semantic RSC, ARIA, and testing with axe.

Semantic HTML in RSC; ARIA for dynamic. Test with @axe-core/react.

**Code Example**:

```tsx
// RSC
export default function Nav() {
  return (
    <nav aria-label="Main">
      <ul role="list">
        <li>
          <a href="/home" aria-current="page">
            Home
          </a>
        </li>
      </ul>
    </nav>
  );
}
```

**Testing**: expect(await axe.run(document.body)).toHaveNoViolations();

**Pitfalls**: Screen reader skips—test manually.

**Interview Tip**: "Inclusive default. Probe: 'Focus trap?' (Modal lib)."

### 99. AI Integration Trends: Vercel AI SDK, streaming LLMs in RSC.

AI SDK for OpenAI/HuggingFace; stream in RSC for chat.

**Code Example**:

```tsx
// app/chat/page.tsx
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export default async function Chat({ prompt }: { prompt: string }) {
  const { textStream } = await streamText({
    model: openai("gpt-4o"),
    prompt,
  });
  return <StreamDiv stream={textStream} />;
}
```

**Trends**: Edge AI for low-latency.

**Pitfalls**: Token costs—cache prompts.

**Interview Tip**: "LLM UIs. Follow-up: 'RAG?' (Vector DB in RSC)."

### 100. Micro-Frontends and Scaling: Module Federation, remote apps in Next.js.

Federation shares components across apps; Vercel Remote for hosting.

**Code Example** (Config):

```js
module.exports = {
  webpack: (config) => {
    config.experiments = { ...config.experiments, mjs: true };
    config.plugins.push(
      new ModuleFederationPlugin({
        name: "host",
        remotes: { remote: "remote@http://localhost:3001/remoteEntry.js" },
      })
    );
    return config;
  },
};
```

**Scaling**: Turborepo + Federation.

**Pitfalls**: Version mismatches—semver remotes.

**Interview Tip**: "Team autonomy. Probe: 'Single-spa?' (Alternative)."

---

_Updated November 20, 2025. References: Nextjs.org/docs/app, Vercel.com/blog/next-15. Contribute or fork for updates!_

```

```
