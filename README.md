# JAKs Gaming Center

A small React + Vite game hub with:

- Rock Paper Scissors
- Memory Game
- Reaction Game
- Hangman
- Local leaderboard data saved with `localStorage`

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## GitHub Pages Deploy

This project is configured for GitHub Pages using `HashRouter`, the repo base path, and a GitHub Actions deploy workflow.

Automatic deploy flow:

```bash
git add .
git commit -m "Update site"
git push origin main
```

Every push to `main` will:

1. Build the app
2. Deploy the `dist` output to GitHub Pages automatically

One-time GitHub setup:

1. Open the repository on GitHub
2. Go to `Settings > Pages`
3. Under `Build and deployment`, choose `GitHub Actions`

Manual local production check:

```bash
npm run build
```

Live URL:

[https://nadroj1234.github.io/JAKs-Gaming-Center/](https://nadroj1234.github.io/JAKs-Gaming-Center/)

Because GitHub Pages is using hash-based routing, routes will look like:

```text
https://nadroj1234.github.io/JAKs-Gaming-Center/#/games
```
