# My Match Notebook

A static site that organizes the 2026 World Cup and CS2 IEM Cologne Major schedules in Eastern Time.

## Live Site

[Open My Match Notebook](https://crafy-ai.github.io/my-match-notebook/)

## Features

- Browse match times, teams, scores, and status by date
- World Cup group tables and CS2 Swiss-stage standings
- Team flags, logos, and current rankings
- Filters for upcoming matches, late-night kickoffs, normal hours, and favorites
- Mark matches you want to watch
- Rolling news for the World Cup and CS2

## Local Preview

Click **Use this template** in the top-right corner of the repository to copy the project to your own GitHub account, or use **Code > Download ZIP** to download all files.

Clone with Git:

```powershell
git clone https://github.com/crafy-ai/my-match-notebook.git
cd my-match-notebook
```

Run a local server in the project directory:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:4173/`.

You can also save the files locally and open `index.html` directly in a browser.

This is a pure static project with no npm dependencies. Keep the file structure intact and it will run as-is.

## Deployment

After pushing to the default branch, the `Deploy GitHub Pages` workflow publishes the site automatically.
