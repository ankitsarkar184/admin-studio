# Ankit Admin Studio

A customized, responsive admin dashboard starter created for `ankitsarkar184`.

## Features

- Responsive admin dashboard layout
- Revenue overview chart with week/month/year selector
- Traffic source donut chart
- KPI cards and recent orders table
- Light/dark theme toggle
- Search orders and export visible order rows to CSV
- Sidebar navigation and mobile menu
- No build step or package installation required

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a browser.

For a local development server, you can use VS Code's Live Server extension or run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish to your GitHub account

### Option A — Create an empty repository on GitHub

1. Sign in at https://github.com/new
2. Set repository name to `ankit-admin-studio`.
3. Choose Public or Private.
4. Do **not** initialize it with a README, license, or `.gitignore` (this project already contains a README).
5. Create the repository.

### Option B — Push this project from your computer

Install Git if needed, extract the project ZIP, open a terminal in the `ankit-admin-studio` folder, then run:

```bash
git init
git add .
git commit -m "Create Ankit Admin Studio dashboard"
git branch -M main
git remote add origin https://github.com/ankitsarkar184/ankit-admin-studio.git
git push -u origin main
```

If Git says `remote origin already exists`, use:

```bash
git remote set-url origin https://github.com/ankitsarkar184/ankit-admin-studio.git
git push -u origin main
```

If Git requests authentication, sign in through the browser/device flow or use Git Credential Manager. Do not paste passwords or personal access tokens into chat.

## Publish as a GitHub Pages website

After pushing:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch `main` and folder `/ (root)`, then save.
5. Wait for the Pages build. The site URL will normally be `https://ankitsarkar184.github.io/ankit-admin-studio/`.

## Customize

- Edit `index.html` for text, sections, and table rows.
- Edit `style.css` for colors, spacing, typography, and responsive layout.
- Edit `script.js` for interactions and chart behavior.

## Important notes

- This is a frontend demo with sample values, not a connected business system.
- Search, CSV export, theme toggle, navigation, and chart-range controls are client-side.
- Revenue, customers, traffic, and orders are sample data. Do not use them as real business reporting.
- Before using in production, add a backend/API, authentication, authorization, validation, and appropriate security controls.
- Fonts load from Google Fonts; a system-font fallback is provided.
- Check the license and attribution requirements of any third-party code or assets you add later.
