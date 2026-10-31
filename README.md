# Cinematic 3D Portfolio

Premium interactive developer portfolio built with Next.js, React Three Fiber, GSAP-ready motion, Lenis, MongoDB, and NextAuth.

The first impression is an immersive digital laboratory, not a template landing page. Content is database-driven and editable from `/admin`.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Three.js, React Three Fiber, Drei
- Framer Motion + Lenis
- MongoDB + Mongoose
- NextAuth credentials authentication

## Quick start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

Edit `.env.local`:

```bash
# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/portfolio

# Auth secret (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=replace-with-a-long-random-string

# Public site URL
NEXTAUTH_URL=http://localhost:3000

# Admin login
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change-me
```

```bash
# Start the development server
npm run dev
```

Open http://localhost:3000

Admin dashboard: http://localhost:3000/admin

The site also runs without MongoDB. In that mode it uses placeholder content from `lib/seed.ts` and keeps contact messages in memory.

## Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## First-time content

Placeholder strings are intentional:

- YOUR NAME
- YOUR ROLE
- YOUR BIO
- YOUR PROJECT
- YOUR EMAIL
- YOUR GITHUB
- YOUR LINKEDIN

Sign in to `/admin` and replace them. Do not invent jobs, degrees, or statistics. Achievements stay hidden until you add real values.

## Architecture

```text
app/                 Pages, layouts, API routes
components/3d/       WebGL scenes
components/sections/ Public portfolio sections
components/admin/    Dashboard UI
lib/                 Mongo, auth, validation, seed data
models/              Mongoose schemas
```

Public API examples:

- `GET /api/portfolio`
- `GET /api/projects`
- `GET /api/projects/[slug]`
- `POST /api/contact`

Admin mutations require a NextAuth session.

## MongoDB Atlas

1. Create a free cluster at https://www.mongodb.com/atlas
2. Add a database user
3. Allow your IP (or `0.0.0.0/0` for local experiments)
4. Paste the connection string into `MONGODB_URI`
5. Restart `npm run dev`

On first database connection the app seeds placeholder content automatically.

## Deploy on Vercel

1. Push the repo to GitHub
2. Import the project in Vercel
3. Set the same environment variables
4. Set `NEXTAUTH_URL` to the production domain
5. Deploy

## Notes

- Custom cursor is disabled on touch devices and when `prefers-reduced-motion` is set
- Heavy 3D scenes fall back to a 2D atmosphere if WebGL is unavailable
- Particle counts drop on mobile
- Contact submissions are rate-limited and include a honeypot field
