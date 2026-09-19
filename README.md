# Multi-Agent Researcher — Frontend

> A polished React interface for an AI research assistant that searches, reads, writes, and critiques research in a transparent multi-agent workflow.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=20232A)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

## Live Demo

**[Open the Multi-Agent Research Assistant →](https://multi-agent-research-frontend.bhoitepushpak6.workers.dev)**

## Related Repository

This repository contains the React frontend. The research agents, retrieval tools, and report-generation pipeline are maintained in the backend repository:

- **Frontend:** [multi-agent-research-frontend](https://github.com/Pushpak-bhoite/multi-agent-research-frontend) *(this repository)*
- **Backend:** [multi-agent-research-backend](https://github.com/Pushpak-bhoite/multi-agent-research-backend)

## Overview

The application gives users a clear view of an AI research run from start to finish. A user submits a topic and can follow the pipeline as the backend progresses through:

```text
Search → Read → Write → Critique
```

The interface displays the active pipeline step, discovered sources, generated report, and critic feedback in a responsive layout with light and dark themes.

## Features

- Topic submission form for starting a research run
- Real-time-style agent timeline showing pipeline progress
- Research report rendering with Markdown support
- Source list for browsing retrieved references
- Critique card with score, strengths, and improvement areas
- Stop and start-over controls for research runs
- Responsive desktop and mobile layouts
- Light/dark theme toggle
- Clear error states when a research run fails
- Accessible labels and semantic UI structure

## Tech Stack

- **React 19** with functional components and hooks
- **TypeScript** for type-safe application code
- **Vite** for development and production builds
- **Tailwind CSS 4** for styling
- **React Markdown** and **remark-gfm** for report rendering
- **ESLint** for code quality

## Project Structure

```text
.
├── src/
│   ├── components/       # Timeline, report, sources, critique, and UI components
│   ├── hooks/            # Research-run and theme state hooks
│   ├── types.ts          # Shared frontend types
│   ├── ui.ts             # Reusable UI class names
│   ├── App.tsx           # Main application layout
│   ├── main.tsx          # React application entry point
│   └── index.css         # Global styles and Tailwind configuration
├── public/               # Static assets
├── package.json          # Scripts and dependencies
├── vite.config.ts        # Vite configuration
└── eslint.config.js      # ESLint configuration
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Pushpak-bhoite/multi-agent-research-frontend.git
cd multi-agent-research-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local URL shown by Vite in your browser.

### 4. Create a production build

```bash
npm run build
```

### 5. Run linting

```bash
npm run lint
```

## Backend Integration

The frontend is designed to work with the companion Python backend:

[View the Multi-Agent Research Backend →](https://github.com/Pushpak-bhoite/multi-agent-research-backend)

The backend uses Google Gemini for generation, Tavily for web search, HTTPX and BeautifulSoup for source extraction, and specialized agents for search, reading, writing, and critique.

## Design Highlights

- **Progress visibility:** users can see where the research run is in the pipeline instead of waiting on an unexplained loading state.
- **Readable output:** reports are rendered as structured Markdown, making long-form research easier to scan.
- **Focused composition:** the interface is split into reusable components for the timeline, report, sources, critique, topic form, and theme controls.
- **Responsive experience:** the layout adapts from a two-column desktop workspace to a mobile-friendly single-column view.

## Author

Built by **Pushpak Bhoite** as a full-stack exploration of multi-agent AI systems and research-oriented user experiences.

- GitHub: [@Pushpak-bhoite](https://github.com/Pushpak-bhoite)
- Live demo: [multi-agent-research-frontend.bhoitepushpak6.workers.dev](https://multi-agent-research-frontend.bhoitepushpak6.workers.dev)

## License

No license has been specified yet. Add a `LICENSE` file if you want to define terms for using, modifying, and distributing this project.
