# Changelog

All notable changes to the CanvasCraft project are documented in this log.

---

## [1.0.0] - 2026-09-19

### Added
- Scaffolding of React 19 and Vite 8 project workspace.
- Integration of Tailwind CSS design system with custom frosted glassmorphism utilities.
- Canvas engine (`Canvas.jsx`) with 2D rendering context extraction and pixel coordinate translation.
- Pen tool with round line caps and joins.
- Eraser tool utilizing `globalCompositeOperation = 'destination-out'`.
- Geometric Line and Rectangle tools with real-time `getImageData` and `putImageData` live preview buffers.
- Native HTML color picker and quick preset palette swatches.
- Range slider for dynamic brush thickness with live scaling dot preview.
- Non-destructive drawing history stack with instantaneous synchronous Undo (`undo-button`).
- Instant canvas reset via Clear Canvas action (`clear-canvas-button`).
- Local Storage persistence engine under key `savedDrawings` (`save-storage-button`).
- Dynamic Artwork Gallery with thumbnail display (`gallery-container`, `gallery-item-0`) and one-click canvas restoration.
- Export as PNG image via programmatic download trigger (`export-png-button`).
- Global testing hook `window.getCanvasDataURL()` attached to page scope for evaluation suites.
- Desktop keyboard shortcuts (`Ctrl+Z` / `Cmd+Z` for undo, `Ctrl+S` / `Cmd+S` for save).
- Technical documentation suite in `docs/` and Render deployment guide.

### Optimized
- Eliminated redundant re-renders of the canvas DOM node using `useRef` architecture.
- Scaled canvas coordinates to `getBoundingClientRect()` bounds to prevent coordinate offset on scaled displays.
- Minified asset bundle footprint (production output under 75 kB gzipped).
