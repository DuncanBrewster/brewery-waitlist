# AI Agent Instructions for brewery-waitlist

## What this repo is
- A small single-page React app built with Vite.
- Uses real brewery data from the Open Brewery DB API.
- Manages client-side waitlist state in React and persists it locally.
- Uses SCSS for styling.

## Key files
- `package.json` — install and run commands.
- `index.html` — Vite HTML entry.
- `src/main.jsx` — React app bootstrapping.
- `src/App.jsx` — top-level layout, local state, and waitlist persistence.
- `src/hooks/useBreweries.js` — fetches breweries from `https://api.openbrewerydb.org/v1/breweries?by_city=san_diego&per_page=15`, handles loading/error states, and seeds availability.
- `src/components/BreweryList.jsx` — list rendering and loading/error messaging.
- `src/components/BreweryCard.jsx` — brewery card UI and join/leave waitlist actions.
- `src/components/AvailabilityBadge.jsx` — Low/Medium/High badge styling.
- `src/styles/global.scss` and `src/styles/variables.scss` — dark theme styling.

## Project conventions
- Keep the app single-screen and avoid adding routing.
- Maintain the client-only waitlist state in React.
- Persist waitlist state using `localStorage` under `brewery-waitlist-status`.
- Keep the Open Brewery DB query hardcoded as San Diego breweries for the initial list.
- Use SCSS classes rather than inline styles when updating UI.
- Preserve accessibility and mobile-friendly layout.

## Build and run
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## What not to do
- Do not introduce a backend or server-side database for waitlist state.
- Do not replace the primary architecture with routing or multi-page navigation.
- Do not change the main brewery data source away from the Open Brewery DB query pattern without user direction.
