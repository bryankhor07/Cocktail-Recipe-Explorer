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

## Notes
- Tailwind v4 requires only `@import "tailwindcss";` in `src/index.css` and the Tailwind Vite plugin in `vite.config.js`.
- Create a Tailwind config only if you need customization.
