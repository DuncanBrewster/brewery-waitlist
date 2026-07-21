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
