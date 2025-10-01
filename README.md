# Cocktail Recipe Explorer

Explore cocktails by name, ingredient, and category using the public CocktailDB API.

## Tech Stack
- React (Vite)
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- React Router v6
- ESLint + Prettier

## Getting Started
```bash
npm install
npm run dev
```

## Scripts
- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview production build
- `npm run lint` – run ESLint
- `npm run format` – format with Prettier
- `npm run test` – run tests in watch mode
- `npm run test:run` – run tests once
- `npm run test:cov` – run tests with coverage

## Project Goals
- Search cocktails by name and ingredient
- Browse categories and list drinks within a category
- View cocktail details (ingredients, measurements, instructions, thumbnail)

## API Endpoints (TheCocktailDB)
Base URL: `https://www.thecocktaildb.com/api/json/v1/1/`

- Search by name: `search.php?s=margarita`
- Lookup by ID: `lookup.php?i=11007`
- Random cocktail: `random.php`
- Filter by ingredient: `filter.php?i=Gin`
- Filter by alcoholic: `filter.php?a=Alcoholic`
- Filter by category: `filter.php?c=Ordinary_Drink`
- List categories: `list.php?c=list`
- List ingredients: `list.php?i=list`

See docs: https://www.thecocktaildb.com/api.php

## Deployment

### Vercel

1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project" and import your GitHub repository
   - Configure build settings:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`
   - Click "Deploy"

3. **Deploy via CLI**:
   ```bash
   vercel
   ```

   Follow the prompts and accept defaults. Your app will be deployed automatically.

4. **Environment Variables** (if needed):
   - No environment variables required for this app
   - The CocktailDB API is public and doesn't require keys

### Other Platforms

**Netlify**:
- Build command: `npm run build`
- Publish directory: `dist`

**GitHub Pages**:
- Configure base path in `vite.config.js`:
  ```js
  export default defineConfig({
    base: '/cocktail-recipe-explorer/',
    // ... rest of config
  })
  ```
- Build and deploy to `gh-pages` branch

## Features

- 🔍 **Search by name**: Find cocktails instantly
- 🍹 **Filter by ingredient**: Browse cocktails with specific ingredients
- 🎲 **Random discovery**: Get a random cocktail suggestion
- ❤️ **Favorites**: Save your favorite cocktails (localStorage)
- 🌙 **Dark mode**: Toggle between light and dark themes (persisted)
- 📱 **Responsive**: Mobile-first design with beautiful UI
- ♿ **Accessible**: ARIA labels, keyboard navigation, screen reader support
- ⚡ **Fast**: Skeleton loaders and optimized performance

## Testing

Tests are written using Vitest and include:
- **API wrapper tests**: Mocked fetch calls for all API functions
- **Hook tests**: useDebounce behavior with fake timers

Run tests:
```bash
npm run test        # Watch mode
npm run test:run    # Single run
npm run test:cov    # With coverage
```

## CI/CD

GitHub Actions workflow runs on every push:
- Linting with ESLint
- Unit tests with Vitest
- Production build verification
- Tested on Node 18.x and 20.x

## Notes
- Tailwind v4 requires only `@import "tailwindcss";` in `src/index.css` and the Tailwind Vite plugin in `vite.config.js`.
- Dark mode uses `@variant dark (&:is(.dark *))` directive for class-based toggling.
- Favorites and dark mode preferences are stored in localStorage.
