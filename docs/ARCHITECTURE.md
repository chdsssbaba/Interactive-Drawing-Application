# System Architecture

CanvasCraft bridges the gap between **declarative React UI state** and **imperative HTML5 Canvas 2D raster operations**.

---

## Architectural Data Flow

```mermaid
flowchart TD
    subgraph UI_State["React Declarative Layer"]
        App["App Component (Root State)"]
        State["tool, color, brushSize"]
        History["historyRef Stack (Snapshots)"]
        App --> State
        App --> History
    end

    subgraph Presentation["UI Presentation Components"]
        Toolbar["Toolbar Component"]
        Gallery["Gallery Component"]
        Header["Header Component"]
        App --> Toolbar
        App --> Gallery
        App --> Header
    end

    subgraph Canvas_Subsystem["Canvas Imperative Engine"]
        CanvasComp["Canvas Component"]
        CanvasDOM["HTML5 <canvas> DOM Node"]
        Context["CanvasRenderingContext2D"]
        App -->|Props & Callbacks| CanvasComp
        CanvasComp -->|useRef| CanvasDOM
        CanvasDOM -->|getContext('2d')| Context
    end

    subgraph Persistence["Storage Subsystem"]
        LocalStorage[("Browser LocalStorage ('savedDrawings')")]
        App <-->|JSON.stringify / JSON.parse| LocalStorage
    end

    subgraph Testing_Bridge["Testing & Evaluation Bridge"]
        GlobalHook["window.getCanvasDataURL()"]
        CanvasDOM -.->|toDataURL('image/png')| GlobalHook
    end
```

---

## Core Architectural Decisions

### 1. Separation of Declarative State vs. Imperative Graphics
In traditional React applications, DOM nodes are driven purely by virtual DOM reconciliations. However, updating `<canvas>` via virtual DOM re-renders clears the internal raster pixel buffer and introduces catastrophic 100+ ms rendering latency during rapid cursor movements.

To resolve this:
- **UI State (`useState`)**: Properties that alter UI controls (active tool, stroke color, brush thickness slider, saved artworks array) are managed with `useState`.
- **Canvas Reference (`useRef`)**: The `<canvas>` DOM element and its `CanvasRenderingContext2D` are held in mutable `useRef` instances. Drawing operations manipulate the context directly inside mouse/touch event handlers without invoking React state updates.

### 2. Live Preview for Geometric Shapes
Drawing lines and rectangles requires a non-destructive real-time preview before the stroke is committed:
1. On `mousedown`, the current frame's pixel buffer is snapshotted via `context.getImageData()`.
2. On `mousemove`, the canvas is refreshed with `context.putImageData()` and the provisional shape is drawn at the current cursor coordinates.
3. On `mouseup`, the final shape is stroked and committed to the history stack.

### 3. Non-Destructive Undo Stack
Canvas pixel manipulation is destructive. To achieve 100% accurate Undo:
- Each completed stroke pushes both an `ImageData` object (for synchronous 0-latency restoration) and a Base64 `dataUrl` string into a history stack ref.
- Clicking the Undo button decrements the history index and immediately paints the previous snapshot without asynchronous flickering.

### 4. High-DPI & Coordinate Calibration
Mouse coordinates are calibrated relative to the canvas element using `getBoundingClientRect()`, accounting for window scrolling and viewport offsets:
```javascript
const rect = canvas.getBoundingClientRect();
const x = (e.clientX - rect.left);
const y = (e.clientY - rect.top);
```
Both desktop mouse events (`mousedown`, `mousemove`, `mouseup`) and mobile touch events (`touchstart`, `touchmove`, `touchend`) are mapped to the same coordinate normalizer.
