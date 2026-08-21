# Anyao Web Multi Video Player — Product Site

GitHub Pages site for **Anyao Web Multi Video Player**, an Electron desktop app for collecting supported video-page bookmarks and playing multiple web videos together.

## Local preview

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Configuration

Release links and the Polar checkout URL are centralized in `site-config.js`. Downloads are intentionally disabled until release assets are published; set `DOWNLOADS_ENABLED` to `true` when all three packages are available.

## Publishing

GitHub Pages can serve the repository root from the default branch:

https://anyao3.github.io/anyao-web-multi-video-player-site/
