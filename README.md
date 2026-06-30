## Frontend README (React / Vite / TypeScript)

```markdown
# Task Management Application – Frontend

A React + TypeScript single‑page application (SPA) built with Vite, providing the UI for the Task Management Application (task board, dashboard, user management).[1]

## Tech Stack

- React 19
- TypeScript
- Vite 8[1]
- React Router DOM
- Recharts for charts
- Tailwind CSS (via `@tailwindcss/vite` / Tailwind v4)[1]

## Prerequisites

- Node.js 18+ installed locally
- npm

## Environment Variables

Create a `.env` file in the frontend root:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

- In development, this points to your local backend.
- In production, set `VITE_API_BASE_URL` to your deployed backend URL (e.g., Vercel).[1]

Vite exposes `import.meta.env.VITE_API_BASE_URL` to your React code.

## Installation

```bash
# clone the repo
git clone <frontend-repo-url>
cd frontend

# install dependencies
npm install
```

Dependencies and devDependencies are defined in `package-lock.json` / `package.json`.[1]

## Scripts

Typical scripts (in `package.json`) look like:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview"
}
```

- `npm run dev` — start Vite dev server on `http://localhost:5173`.[1]
- `npm run build` — type‑check with `tsc -b` and create production assets in `dist/` using `vite build`.
- `npm run preview` — serve the built `dist/` folder locally for testing.

## Project Structure

```text
frontend/
  src/
    features/      # tasks, users, auth features and components
    components/    # shared UI components (Card, etc.)
    hooks/         # custom hooks (useTasks, etc.)
    types/         # shared TypeScript types
    main.tsx       # React entry
    index.css      # Tailwind + global styles
  public/          # static assets (if any)
  index.html       # SPA root html
  vite.config.ts   # Vite + React + Tailwind config
  tsconfig.app.json
  .env
```

- `vite.config.ts` configures React plugin, Tailwind integration, and an alias `@` → `./src`.[1]
- `tsconfig.app.json` defines compiler options for the app, includes `src`, and matches the Vite alias (`paths` + `baseUrl` or `moduleResolution: "bundler"`).[1]

## Running Locally

1. Ensure the backend is running (e.g., `http://localhost:4000/api`) and `.env` is set:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the app at:

```text
http://localhost:5173/
```

Use the UI to register/login, manage tasks, and navigate between dashboard/board/users pages.

## Production Build & Preview

```bash
npm run build
npm run preview
```

- `npm run build` generates optimized static assets in `dist/`.[1]
- `npm run preview` runs a local server to verify the production build before deployment.

## Deployment Notes

- On Netlify, set:
  - **Build command**: `npm run build`
  - **Publish directory**: `dist`[2][1]
- Ensure `VITE_API_BASE_URL` in the hosting environment points to the live backend (e.g., Vercel URL).
- For SPA routing (React Router), configure a redirect so all paths serve `index.html` (e.g., `_redirects` file or Netlify UI setting).[3]

***

To tailor these further:  
Are you planning to use these READMEs mainly for yourself or to show recruiters/other developers? That will affect how much detail and “marketing” versus strictly technical info you might want to add.
