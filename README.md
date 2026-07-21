# Brewery Waitlist

- A single-page React app built with Vite using CoPilot.
- Uses real brewery data from the Open Brewery DB API. (https://www.openbrewerydb.org/documentation)
- Manages client-side waitlist state in React and persists it locally using localStorage.
- Uses SCSS for styling.



Clone the project using command:

`git clone https://github.com/DuncanBrewster/brewery-waitlist.git`

Install the project dependencies from the command line:

`npm install`

Run the project locally from the command line:

`npm run dev`



**Tradeoff**

- Used SCSS instead of Tailwind sacrificing extra files for less cluttered JSX files, Variables, and scaling. I would utilize CSS Modules for its scoping if this project was to scale, and SCSS works great with CSS Modules while Tailwind does not.


**If I Had More Time**

- Rename SCSS variables to more intuitive names
- Fix styling issues. e.g. brewery button alignment
- Migrate functions from App.jsx into components to keep App.jsx lean
- Add minimal comments in code explaining functions
- Add a cleaner error state for user experience



# AI-Usage Log

**AI tool(s) used**

- GitHub CoPilot (Plan and Agent mode)



**Where AI helped most**

- Planning mode really helped with visualizing file structure before actually generating files.



**Where AI got it wrong/hallucinated**

- When building the searchbox, AI hallucinated including 2 filter dropdowns, one of which was redundant because it was already included in the search function. I tried to use more precise wording to correct this, but after it did the same thing on the 2nd attempt, I just manually removed them and added the search functionality I desired in the code.



**What you changed or rejected by hand, and why**

1) After the plan was made, AI was ready to try and scaffold the whole project at once. I denied that and told it we were going to scaffold the project in smaller chunks to reduce complexity and make potential debugging easier.
2) Even though styling with SCSS was documented in the plan, CoPilot would add its own inline-styling when generating the project files before styling files were added.
3) Hallucination filter dropdown mentioned above^.
4) Replaced HTML that felt cluttered and too robotic with simpler, warmer language.
5) Styling edits to make the app pop a bit more.


# AI Log

**Plan Mode Prompt:**

"I am building a small, responsive consumer React app for a brewery waitlist, using real brewery data from the Open Brewery DB API (https://www.openbrewerydb.org/documentation). Propose a minimal architecture for this based on the following scope and constraints:

1) List breweries — fetch from Open Brewery DB and show a list with name, type, and city/state. You can hardcode a single query to keep it simple, e.g.: GET https://api.openbrewerydb.org/v1/breweries?by_city=san_diego&per_page=15 
2) Seat availability — show a Low / Medium / High badge per brewery. The API has no such field, so seed it yourself in local state. Just display it clearly. 
3) Join / leave waitlist — for a brewery, let the user join and leave a waitlist, and see their current status (in line vs. not). Let's manage this state in React state. 
4) Handle loading and error states for the API call. That's it. Four things, one screen is fine. 


Stack & constraints

React + modern JS.
SCSS, mainly for variables
Vite for build setup
Real brewery data from the API; waitlist/seat state faked by you.
Should be usable on mobile; a little keyboard/contrast hygiene is a plus."


**CoPilot:**

I'll save a concise implementation plan to session memory, then show it here for review.

Created memory file plan.md

Plan (top-line steps)

Scaffold Vite + React, add sass.
Create useBreweries hook to fetch the hardcoded Open Brewery DB URL and expose {data, loading, error, refetch}. Seed stable Low|Medium|High availability per brewery.id.
Manage waitlist state in React (object/Map keyed by brewery.id), persist to localStorage. Provide join/leave handlers.
Build minimal components: App, BreweryList, BreweryCard, AvailabilityBadge. Add SCSS variables and responsive styles.
Add loading, error, retry UI and basic accessibility (focus, aria-pressed, aria-live). Verify on mobile.
Plan: Brewery waitlist single-screen app
TL;DR - Build a small Vite + React app (JSX) that fetches breweries from Open Brewery DB, seeds a stable per-brewery seat-availability badge (Low/Medium/High), and manages a join/leave waitlist in React state (persisted to localStorage). Single responsive screen with loading/error handling and simple SCSS variables for theming.

Steps

Scaffold project: Vite + React (vanilla JS) and add sass dependency. (Can be done with npm init vite@latest.)
Add global SCSS variables in src/styles/variables.scss and import in src/main.jsx.
Implement API hook useBreweries that fetches https://api.openbrewerydb.org/v1/breweries?by_city=san_diego&per_page=15 and exposes {data, loading, error, refetch}.
Seed seat availability: compute a stable value per brewery using a deterministic hash of brewery.id mapped to Low|Medium|High; store in a React useMemo or in the hook so UI gets availability alongside brewery data.
Waitlist state: maintain a Map or object keyed by brewery.id in App (or BreweryList) with booleans. Persist to localStorage so page reload keeps status. Provide join(breweryId) and leave(breweryId) functions.
UI components:
App.jsx: shell, invokes useBreweries, passes handlers and state down.
BreweryList.jsx: lists BreweryCard components; handle loading/error/empty.
BreweryCard.jsx: shows name, type, city/state, AvailabilityBadge, and Join/Leave button reflecting current state.
AvailabilityBadge.jsx: visual Low/Med/High with color from SCSS variables and accessible text.
UX & responsiveness: single-column list on small screens; 2-column grid on tablet, 3-column max on wide screens. Ensure buttons focus styles, sufficient contrast, and aria-pressed plus aria-live region for status updates.
Error & loading UI: skeleton or spinner for loading; friendly message and Retry button on error.
Small polish: keyboard focus, touch targets >=44px, label buttons clearly, add prefers-reduced-motion handling.
Verification: run dev server, test join/leave flow, test offline/error case, test mobile layout.
Relevant files

package.json — add sass if needed and scripts dev, build, preview.
index.html — base Vite entry.
src/main.jsx — mount React app and import global SCSS.
src/App.jsx — top-level state + layout.
src/hooks/useBreweries.js — API fetch + availability seeding.
src/components/BreweryList.jsx — maps breweries to cards.
src/components/BreweryCard.jsx — displays brewery and waitlist button.
src/components/AvailabilityBadge.jsx — Low/Medium/High badge.
src/styles/variables.scss — color vars and spacing scale.
src/styles/global.scss — basic resets, typography, grid rules.
Verification

Install & run: npm install then npm run dev and open the dev URL.
Confirm list loads (shows names, type, city/state). If loading shown initially, then replaced by data.
Join/leave a brewery: clicking toggles state, button text updates, and state persists after reload.
Simulate error: modify hook URL to an invalid host and confirm error message and Retry work.
Accessibility checks: keyboard tab through controls; screen-reader announces join/leave changes via aria-live.
Decisions

Seed availability deterministically (hash of brewery.id) so badges are stable across reloads, rather than purely random per session.
Keep all state client-only (no backend). Persist waitlist to localStorage for simple persistence.
Single screen only; no routing.
Further Considerations

Persistence options: Use localStorage now; for multi-device support later, add a lightweight backend.
Seat availability source: if you later want dynamic updates, add a small simulated server or real-time WebSocket.
Would you like me to (A) scaffold the Vite project and create these files, or (B) generate component stubs and the hook next?


**Agent Mode Prompt:**

"This looks good. Let's scaffold the project in smaller chunks though to reduce complexity and make debugging easier. Start by generating the package.json, index.html, src/main.jsx, and src/App.jsx files"


**CoPilot:**

"I'll add a short todo plan for the scaffold steps."

Created 5 todos

Now creating initial project files: package.json, index.html, src/main.jsx, and src/App.jsx.

Apply Patch

Applying the file patch to add the four initial files now.

Apply Patch

Applying the patch again using absolute workspace paths.

Edited
package.json+19-1
Edited
index.html+13-1
Edited
main.jsx+13-1
Edited
App.jsx+17-1
Done — created the initial scaffold files:

package.json
index.html
main.jsx
App.jsx
Next I'll implement the useBreweries hook and the BreweryList / BreweryCard components. Proceed?


**Prompt:**

"Proceed with implementing useBreweries hook and the BreweryList, BreweryCard, and AvailabilityBadge components"


**CoPilot:**

I'll update the todo list to mark the scaffold step complete and start the hook/components implementation, then add the new files.

Progress update: I added the useBreweries hook and three components (AvailabilityBadge, BreweryCard, BreweryList). Next I'll integrate these into App.jsx and add local waitlist state (persisted to localStorage). Proceed?


**Prompt:**

Yes, integrate these into App.jsx and add local waitlist state (persisted to localStorage)


**CoPilot:**

Checking the current App.jsx and relevant component file before integrating state and hook.

Reading the current App.jsx and component file contents to safely integrate the hook and waitlist state.

Read App.jsx

Updating App.jsx to wire the brewery fetch hook, waitlist state, and main list UI.

Edited
App.jsx+67-6
Integrated useBreweries and local waitlistMap state into App.jsx, including:

localStorage persistence via STORAGE_KEY
join/leave toggles
a summary count banner
hook-driven brewery list rendering
Next I can add styles and verify the app with npm install + npm run dev.


**Prompt:**

"Add scss styling file. Move inline-styling in existing files to new scss files. Use a dark color palette"


**CoPilot:**

Reading current app and component sources so I can safely replace inline styles with SCSS classes.

Multi-Replace String in Files

Reading current component files and entrypoint to migrate inline styles to SCSS.

Checking main.jsx before adding the global SCSS import and class-based styling.

Read main.jsx

Adding the dark-theme SCSS files and converting inline App, BreweryList, BreweryCard, and AvailabilityBadge styles into class-based SCSS styling.

✅ Migrated the inline styling into SCSS and added a dark palette.

Files updated:

variables.scss
global.scss
main.jsx
App.jsx
BreweryCard.jsx
BreweryList.jsx
AvailabilityBadge.jsx
Everything is now using CSS class names and the app has a dark theme with higher contrast, consistent card/badge/button styling. Next step is to run it and verify the UI works end-to-end.


**Prompt:**

"/init"


**CoPilot:**

Exploring the workspace for existing AI customization or documentation files before creating guidance.

Searched for files matching **/{.github/copilot-instructions.md,AGENT.md,AGENTS.md,README.md}, no matches

I’m checking the workspace structure to determine whether an agent customization file already exists and what documentation is available.

Read brewery-waitlist

Gathering the project’s build details and source layout to write concise agent instructions.

I’m verifying project details and file structure so the customization guidance matches the exact repo.

Read package.json

The project has no existing agent customization docs, so I’m adding a small AGENTS.md with build instructions, architecture, and repo-specific guidance.

Created AGENTS.md

Created AGENTS.md to help AI agents understand the repo.

File added:

AGENTS.md — explains build commands, key files, architecture, conventions, and boundaries.
If you want, I can also add a .github/copilot-instructions.md variant or extend this into a custom skill for frontend updates.


**Prompt:**

"Add a search bar component and filter by name, type, or availability"


**CoPilot:**

Adding a SearchBar component, styles, and wiring filters in App.jsx (query/type/availability). I'll update three files.

Apply Patch

Patching again including explanation.

Updating App.jsx to import SearchBar, add filter state, compute filteredBreweries, and render the search UI.

Edited
App.jsx
Added SearchBar and wired filtering by name/type/availability into App.jsx. Files changed:

Created SearchBar.jsx
Updated global.scss (search styles)
Updated App.jsx (filter state + filteredBreweries)
Progress: search UI implemented and connected. Next would be to run the dev server to verify behavior — want me to run npm run dev and check in the browser?

**Prompt:**

(I denied changes) "Add a search bar component that can search and show live results by name, type, or availability"


**CoPilot:**

I'll update the todo list then read current files to determine required edits.

Now I'll add SearchBar.jsx, update App.jsx to wire live filtering, and add search styles to global.scss. This will implement live search by name/type/availability.

Done — added a live SearchBar and wired it into App.jsx, plus styles.

What's changed:

Added SearchBar.jsx (search input + type & availability selects)
Updated App.jsx to manage query, filterType, filterAvailability, compute filteredBreweries, and pass to BreweryList
Added search styles to global.scss
Updated todo list progress (search task now in-progress)
Next steps I can take:

Run the dev server and verify live filtering works (npm run dev), or add small unit tests. Do you want me to start the dev server and check it now?

**(Denied Changes, manually removed filter dropdowns and added the search functionality I desired in the code.)**

**(END)**


