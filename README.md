# Flight Status Board

A real-time flight status dashboard built with React, TypeScript, and Vite.

## Prerequisites

- Node.js 18+
- [Flight-Engine](https://github.com/AmericanAirlines/Flight-Engine) running locally on port 4000 (provides the flight data API)

## Getting Started

### 1. Start the data API

Clone and run [Flight-Engine](https://github.com/AmericanAirlines/Flight-Engine) following its README. It serves flight data at `http://localhost:4000`.

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Available Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start development server            |
| `npm run build`   | Type-check and build for production |
| `npm run preview` | Preview the production build        |
| `npm run lint`    | Run ESLint                          |
