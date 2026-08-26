# Meal optimization client

React client for the evolutionary meal-optimization API.

## Requirements

- Node.js 22.12 or newer
- npm 10 or newer

## Development

```bash
npm install
npm run dev
```

The development client calls the API on port `8000` of the current hostname.

## Production build

```bash
npm ci
npm run build
```

The production build is written to `dist/` and calls the hosted Render API.
