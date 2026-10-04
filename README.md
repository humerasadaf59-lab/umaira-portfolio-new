# Umaira Sadaf — Full-Stack Developer Portfolio

A polished, responsive, API-driven portfolio built to present Umaira Sadaf as a **Full-Stack Web Developer and AI-focused Software Engineer**.

The project keeps the original lightweight stack—semantic HTML, custom CSS, vanilla JavaScript and Node.js/Express—while adding a much stronger professional presentation, recent projects, internships, certifications, project search/filtering, live demo links and a maintainable project-data workflow.

## What is included

- Professional dark/gold developer portfolio UI
- Responsive mobile navigation
- Hero typing animation
- Scroll reveal animations and reading progress bar
- About / education / CGPA section
- Experience timeline with FlyRank AI, CodeAlpha, InternGrow.official, HACKTHONYPERU and hackathon work
- Skills and technology stack section
- Certifications / learning section
- 12 recent and portfolio projects
- Live demo and GitHub buttons where available
- Project category filters
- Project search
- API-driven profile and project data
- Dynamic project statistics
- Working contact API with validation
- Mail fallback when deployment storage is unavailable
- Vercel-friendly Node.js 24 configuration
- Easy project expansion through `data/projects.json`

## Recent featured projects

1. **ArchCoach** — AI mock system-design interviewer
   - https://archcoach-hack.vercel.app
2. **RingGuard AI** — AI home-security command center
   - https://ringguard-ai.vercel.app
3. **BijliGuard — Vehari** — community outage intelligence and prediction
   - https://bijliguard-vehari-hvq9.vercel.app
4. **BazaarPK Django Ecommerce** — Pakistan-focused Django ecommerce project
   - https://bazaarpk-django-ecommerce.vercel.app
5. **Real-Time Collaboration App** — CodeAlpha internship project
   - https://realtime-collaboration-app.vercel.app
6. **Pulse Social Platform** — CodeAlpha internship project
   - https://pulse-social-platform-xi.vercel.app
7. **Research Scout Agent** — FlyRank AI / General AI Fluency portfolio work
8. **Urban Heat Island Analysis** — HACKTHONYPERU team project
9. **Automated Semester CGPA Planner** — InternGrow.official
10. **Banking Engine** — InternGrow.official
11. **Secure User Authentication System** — InternGrow.official
12. **To-Do List App** — React + Node.js REST API project

## Profile included

- **Name:** Umaira Sadaf
- **Education:** BS Computer Science, 6th Semester
- **Institution:** Government Graduate College, Vehari
- **CGPA:** 3.84 / 4.00
- **Phone:** 03176480080
- **Professional email:** humerasadaf59@gmail.com
- **Portfolio email:** sadaffarid069@gmail.com
- **GitHub:** https://github.com/humerasadaf59-lab
- **LinkedIn:** https://www.linkedin.com/in/umaira-sadaf-163aaa2a9
- **Portfolio:** https://humerasadaf59-lab.github.io

## Experience included

### FlyRank AI — AI Marketing Intern
**Jul 2026 – Present**

General AI Fluency / AI Marketing work including AI-assisted research, content evaluation, LLM workflows and applied machine-learning fundamentals.

### CodeAlpha — Full Stack Web Development Intern
**Sep 2026 – Present**

Practical full-stack internship portfolio work including the Real-Time Collaboration App and Pulse Social Platform.

### InternGrow.official — Intern
**Aug 2026 – Present**

C++ projects covering a banking engine, authentication system and CGPA planner.

### HACKTHONYPERU — Team Lead
**Aug 2026 – Present**

Urban heat island analysis project using temperature data and the FortGuard Temperature API.

### Independent / Hackathon Projects — Hackathon Builder
**2026**

ArchCoach, RingGuard AI and BijliGuard projects focused on AI, system design, security intelligence and civic technology.

## Certifications included

- HP Certified — AI Business Professional (HP LIFE)
- Saylor Academy — Software Engineering Certificate
- Anthropic — Claude 101
- Anthropic — Claude Platform
- Anthropic — Claude Cowork
- Anthropic — Agent Skills
- Anthropic — Claude on Google Cloud

## Tech stack represented

**Frontend:** HTML5, CSS3, JavaScript, React, Next.js, TypeScript, Tailwind CSS

**Backend:** Node.js, Express, Python, Django, REST APIs

**Programming:** C++, OOP, Data Structures

**AI:** AI Fluency, LLMs, prompt engineering, AI-enabled applications, machine-learning fundamentals

**Tools / deployment:** Git, GitHub, Vercel, API integration, responsive UI

## Run on Windows

Open PowerShell in the project folder:

```powershell
npm install
npm start
```

Then open:

```text
http://localhost:3000
```

Development mode:

```powershell
npm run dev
```

## Test the backend

```text
http://localhost:3000/api/health
http://localhost:3000/api/profile
http://localhost:3000/api/projects
http://localhost:3000/api/stats
```

The contact endpoint is:

```text
POST /api/contact
```

## Add more projects later

You do **not** need to change the HTML layout.

Open:

```text
data/projects.json
```

Copy an existing project object and change the fields:

```json
{
  "title": "My New Project",
  "category": "AI / Full Stack",
  "description": "Short professional description of what the project does.",
  "demo": "https://my-project.vercel.app",
  "label": "Live Demo",
  "github": "https://github.com/humerasadaf59-lab/my-project",
  "organization": "Personal Project",
  "type": "Full Stack",
  "year": "2026",
  "featured": true,
  "tags": ["Next.js", "TypeScript", "AI"]
}
```

The portfolio automatically includes the project in the grid, search, filters and project statistics.

## Deploy to Vercel

This portfolio uses Express. Vercel currently supports Express deployment with zero configuration, so the repository can be imported directly from GitHub. Vercel's current Node.js guidance also recommends Node 24 for new deployments because Node 20 is deprecated for new builds/functions as of October 1, 2026.

Recommended workflow:

1. Push the `umaira-portfolio` folder to GitHub.
2. Import the repository into Vercel.
3. Keep the project root as `./`.
4. Let Vercel detect the Express application.
5. Deploy.

Or use the Windows PowerShell CLI:

```powershell
npm install
npm install -g vercel
vercel
vercel --prod
```

For local Vercel-style testing:

```powershell
vercel dev
```

## Contact storage note

The local development version stores messages in `data/messages.json`. Serverless deployments may not provide persistent writable storage, so the frontend includes an email fallback if the contact API cannot persist a message.

For a production hiring portfolio, the next backend upgrade should replace JSON persistence with a persistent database such as PostgreSQL/Supabase and optionally add an email provider. Never commit real secrets to GitHub.

## Project structure

```text
umaira-portfolio/
├── data/
│   ├── messages.json
│   └── projects.json
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── .env.example
├── package.json
├── README.md
└── server.js
```

## Engineering quality checklist

- Semantic HTML
- Responsive layout
- Accessible navigation labels
- Client-side input validation
- Server-side input validation
- HTML escaping for project data before rendering
- API error handling
- No hard-coded project cards in the UI
- Project data separated from presentation
- Node.js 24 target for new Vercel deployments
- No `.env` secrets committed
