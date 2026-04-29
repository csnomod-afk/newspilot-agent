# NewsPilot Agent

NewsPilot Agent is a static, GitHub Pages friendly demo for an AI-driven news intelligence product. It shows a landing page, interactive mock registration, admin dashboard, multi-agent workflow, daily report results, source settings, and token usage evidence.

## Why this project exists

The demo is built for project review scenarios where reviewers need to see a complete AI/Agent product instead of only a text description. It highlights:

- A real product landing page.
- A usable registration entry with local mock login.
- An admin dashboard with task queue, reports, source settings, and token usage.
- A clear multi-agent workflow: collector, parser, deduper, analyst, writer.
- Static deployment support for GitHub Pages, Vercel, Netlify, or any CDN.

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static server:

```bash
python -m http.server 5173
```

Then visit:

```text
http://localhost:5173
```

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository.
2. Open the repository settings.
3. Go to Pages.
4. Select `Deploy from a branch`.
5. Select the default branch and root folder.
6. Save and wait for the Pages URL.

## Suggested screenshots for the application form

- Landing page hero showing product name, value proposition, and metrics.
- Admin dashboard overview showing Agent status and token usage.
- Daily report page showing generated summaries.
- Token section showing cumulative usage.

## Suggested project URL

Live demo:

```text
https://csnomod-afk.github.io/newspilot-agent/
```
