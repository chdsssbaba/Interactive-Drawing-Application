# CanvasCraft Documentation Hub

Welcome to the technical documentation repository for **CanvasCraft Studio**. This documentation provides in-depth architectural specifications, development workflows, feature catalogues, and deployment guides.

---

## Documentation Index

1. [Project Structure](PROJECT_STRUCTURE.md) — Comprehensive breakdown of project organization and file purposes.
2. [Architecture](ARCHITECTURE.md) — Core design principles, React state vs. Canvas imperative rendering decoupling, and high-DPI scaling.
3. [Workflow](WORKFLOW.md) — Event pipelines for drawing, previewing, undo/history state machines, and persistence.
4. [Features](FEATURES.md) — Exhaustive overview of all application tools, controls, and accessibility capabilities.
5. [Deployment Guide](DEPLOYMENT.md) — Production setup, build commands, and hosting on Render.
6. [Changelog](CHANGELOG.md) — Chronological record of additions, refactorings, and optimizations.

---

## Core Technologies

- **React 19**: Component lifecycle, reactive UI state, and custom event listeners.
- **HTML5 Canvas API**: Direct raster manipulation via `CanvasRenderingContext2D`.
- **Tailwind CSS**: Utility-first responsive styling and glassmorphism design tokens.
- **Vite 8**: Modern, high-speed ES-module bundler.
- **Web Storage API**: Persistent local JSON data serialization.
