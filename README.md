# Movie Explorer

A movie browsing app built with Next.js 15, featuring infinite scroll, search, and genre filtering.

## Stack

- **Next.js 15** (App Router) — server components, route handlers, streaming
- **TanStack Query** — client-side pagination and cache management
- **Zod** — runtime validation at the API boundary
- **Tailwind CSS 4** — utility-first styling
- **Jest + Testing Library** — unit and component tests

## Architecture decisions

### Server components seed client cache

Pages fetch initial data server-side and pass it as `initialData` to TanStack Query. This gives instant first-paint from SSR while the client takes over pagination without a loading flash.

```
Server component → fetchPopularMovies(1) → initialData
Client (TanStack) → GET /api/movies/popular?page=2 → infinite scroll
```

### Route handlers instead of server actions for pagination

Pagination calls are GET requests — server actions are always POST, which prevents HTTP caching. Route handlers allow Next.js ISR (`revalidate`) and browser caching to work correctly.

### Search reset via Suspense key

When the search query changes, `<Suspense key={query}>` forces a full remount of the search subtree. The server re-fetches page 1 for the new query and seeds `initialData` fresh — no client-side reset logic needed.

### Zod at the API boundary

All TMDB responses are parsed with Zod schemas before reaching the app. Invalid or missing fields are caught early with clear errors rather than silent `undefined` bugs at render time. Input params on route handlers are also validated (type coercion, min/max bounds).

### Error handling

- Critical data (movie detail, genre): throws → caught by Next.js error boundary or `notFound()`
- Secondary data (similar movies): returns empty array on failure, page still renders
- Client pagination errors: surfaced via TanStack `error` state, stops further fetches

## Getting started

```bash
pnpm install
```

Create a `.env.local` file:

```
TMDB_API_KEY=your_key_here
```

Get a free API key at [themoviedb.org](https://www.themoviedb.org/settings/api).

```bash
pnpm dev
```

## Testing

```bash
pnpm test
pnpm test
pnpm typecheck
```

## Project structure

```
app/
├── api/              # Route handlers (cached GET endpoints)
├── hooks/            # usePaginatedScroll — scroll + pagination logic
├── lib/              # Zod schemas, TMDB client, data fetching, utils
├── routing/          # Route and API path constants
├── ui/               # Shared components
├── movie/[id]/       # Movie detail page
├── genre/[id]/       # Genre listing page
└── search/           # Search page
```
