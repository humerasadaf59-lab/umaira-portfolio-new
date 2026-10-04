# Add a New Project in 60 Seconds

1. Open `data/projects.json`.
2. Copy any existing project object.
3. Change `title`, `category`, `description`, `demo`, `github`, `organization`, `type`, `year` and `tags`.
4. Save the JSON file.
5. Run the site and refresh the Projects section.
6. Push to GitHub. Vercel will redeploy the portfolio automatically.

Minimum example:

```json
{
  "title": "My New App",
  "category": "Full Stack",
  "description": "A short description of the problem the application solves and the main engineering work.",
  "demo": "https://my-new-app.vercel.app",
  "label": "Live Demo",
  "github": "https://github.com/humerasadaf59-lab/my-new-app",
  "organization": "Personal Project",
  "type": "Full Stack",
  "year": "2026",
  "featured": true,
  "tags": ["React", "Node.js", "API"]
}
```

If a project has no GitHub repository, simply omit `github`.
If it has no deployed demo, simply omit `demo`.
