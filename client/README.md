# client

React 19 + TypeScript frontend for the portfolio. Renders the public-facing portfolio site and the protected admin dashboard.

## Tech Stack

| Library | Purpose |
|---------|---------|
| React 19 + TypeScript | UI framework |
| Vite | Dev server and bundler |
| TanStack Router | File-based type-safe routing |
| TanStack Query | Server state, caching, and mutations |
| Framer Motion | Scroll-triggered section animations |
| Tailwind CSS v4 | Utility-first styling |
| React Three Fiber + Three.js | WebGL hero background |
| React Hook Form + Zod | Contact form validation |
| Lucide React | Icon library |
| Sonner | Toast notifications |

## Folder Structure

```
src/
  components/
    admin/        Eight admin panels (one per content type)
    layout/       Navbar, Footer, DotNavigation
    sections/     Nine public portfolio sections
    three/        HeroBackground (WebGL canvas)
  hooks/
    useActiveSection.ts   IntersectionObserver-based scroll spy
  lib/
    animations.ts   Framer Motion variants (fadeInUp, staggerContainer, etc.)
    auth.ts         Token read/write helpers (localStorage)
    router.ts       TanStack Router instance and route definitions
    utils.ts        Shared utility functions
  pages/
    Home.tsx              Public portfolio (single long page)
    Login.tsx             Admin login
    admin/
      Dashboard.tsx       Admin panel shell
  services/
    api.ts          Public API calls (no auth required)
    adminApi.ts     Authenticated API calls (Bearer token)
  types/
    index.ts        All shared TypeScript interfaces
  main.tsx          App entry point
  index.css         Global styles and Tailwind directives
```

## Public Sections

Rendered in order on `Home.tsx`:

1. `Hero` — name, tagline, hero image, CTA buttons
2. `About` — bio loaded from settings API
3. `Skills` — tabbed by category
4. `Portfolio` — project cards with image lightbox
5. `Resume` — experience and education timeline
6. `Testimonials` — rotating testimonial cards
7. `Community` — community involvement cards
8. `Contact` — contact info + message form
9. `Footer` — links and navigation

## Admin Panels

Each panel in `components/admin/` maps to one API resource:

| Panel | Resource |
|-------|---------|
| `ProjectsPanel` | Projects (with image upload) |
| `SkillsPanel` | Skills (with icon upload) |
| `ExperiencePanel` | Work experience |
| `EducationPanel` | Education (with logo upload) |
| `TestimonialsPanel` | Testimonials (with avatar upload) |
| `CommunityPanel` | Community involvement (with logo upload) |
| `ContactPanel` | Incoming contact messages |
| `SettingsPanel` | Site settings, hero image, resume, social links |

## Routes

| Path | Component | Access |
|------|-----------|--------|
| `/` | `Home.tsx` | Public |
| `/admin/login` | `Login.tsx` | Public |
| `/admin/dashboard` | `Dashboard.tsx` | Protected (redirects to login) |

## Environment

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

During local development, Vite proxies all `/api` requests to `http://localhost:5000` (configured in `vite.config.ts`). The `VITE_API_URL` value is used as the fetch base URL in both `api.ts` and `adminApi.ts`, with `'/api'` as the fallback for production deployments where the URL might not be set.

## Commands

```bash
pnpm dev       # Start Vite dev server on port 5173
pnpm build     # Type-check + build to dist/
pnpm preview   # Preview the production build locally
pnpm lint      # Run ESLint
```
