# Vue Exchange-Rate Project Instructions

## Project Overview

This is a lightweight Vue 3 application combining a recipe browsing feature with a currency exchange rate tool. Built with Composition API, TypeScript, and Vite.

## Key Technologies & Environment

- **Vue 3.5.31** with Composition API (`<script setup>`)
- **TypeScript 6.0** with strict mode enabled
- **Vite 8** for bundling and dev server
- **Vue Router 4.6.4** with memory history (client-side only)
- Node.js requirement: ^20.19.0 or >=22.12.0

## Build & Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Type-check + minify (parallel execution) |
| `npm run type-check` | Incremental type checking with vue-tsc |
| `npm run build-only` | Vite build without type-check |
| `npm run preview` | Test production build locally |

## Architecture & Component Boundaries

**Structure**: Pages + Layout + Components pattern
- **App.vue**: Sticky layout using CSS Grid (Header → RouterView → Footer)
- **Pages**: `Home.vue` (currency exchange), `About.vue` (recipe browse) — route targets
- **Components**: `Header.vue`, `Footer.vue`, `RecipeCard.vue`
- **Router**: Vue Router with `createMemoryHistory()` (no SSR support)

**Data Flow**:
1. Custom `useFetch` composable in `scripts/fetch.ts` returns reactive `{ data, error }`
2. Static recipe data in `assets/data.ts`
3. API integration: Direct `fetch()` calls with `watch()` for reactivity in components

## Project-Specific Conventions

| Convention | Details |
|------------|---------|
| **Path Aliases** | `@/` → `src/` (e.g., `@/components/Header.vue`) |
| **Layout Utility** | `.container-xxl` class: max-width 1440px, 24px padding, centered |
| **Styling** | Scoped styles only; global reset in `main.css` |
| **Script Style** | Composition API `<script setup>` (no explicit exports) |
| **TypeScript** | `noUncheckedIndexedAccess: true` for safety |
| **Images** | Public assets in `/public/photos/` → reference as `/photos/recipe.jpg` |

## Potential Pitfalls & Development Issues

1. **Router Limitation**: Memory history doesn't support server-side rendering
2. **Fetch Composable**: `useFetch()` auto-runs on mount—can't manually trigger. Workaround: Use direct `fetch()` with `watch()` (see `Home.vue`)
3. **Component Props**: `RecipeCard` uses untyped props—add TypeScript schemas
4. **API Data Shape**: Currency API returns `iso_code` (not `code`)—verify field names
5. **Vue Tooling**: Requires **Volar extension** (not Vetur) for TypeScript support in `.vue` files
6. **Build Cache**: Type-check cache in `node_modules/.tmp/tsconfig.app.tsbuildinfo`—preserve during builds

## Key Files Exemplifying Patterns

| File | Pattern | Use Case |
|------|---------|----------|
| `src/main.ts` | Router + app setup | Initialization template |
| `src/App.vue` | Grid layout + slots | Sticky header/footer |
| `src/Home.vue` | Fetch + reactive watch | Dynamic API data |
| `src/scripts/fetch.ts` | Custom composable | Reusable data-fetching |
| `src/components/Header.vue` | Navigation + aliases | RouterLink + SVG assets |

## Setup & Development

See [README.md](README.md) for initial setup instructions.

For Vue.js devtools and TypeScript support, follow the IDE and browser setup in the README.</content>
<parameter name="filePath">/Users/iryna/Work/vue/exchange-rate/.github/copilot-instructions.md