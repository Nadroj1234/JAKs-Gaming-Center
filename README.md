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

This project is configured for GitHub Pages using `HashRouter` and the repo base path.

Deploy steps:

```bash
npm run deploy
```

That command will:

1. Build the app
2. Publish the `dist` folder to the `gh-pages` branch

After deploying, make sure the GitHub repository Pages settings are using the `gh-pages` branch.

Live URL:

[https://nadroj1234.github.io/JAKs-Gaming-Center/](https://nadroj1234.github.io/JAKs-Gaming-Center/)

Because GitHub Pages is using hash-based routing, routes will look like:

```text
https://nadroj1234.github.io/JAKs-Gaming-Center/#/games
```
