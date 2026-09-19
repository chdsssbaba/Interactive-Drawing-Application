# Feature Catalogue

CanvasCraft Studio offers a comprehensive suite of creative drawing, editing, persistence, and export tools.

---

## 1. Creative Toolset

| Tool | Trigger / `data-testid` | Description |
|---|---|---|
| **Pen** | `tool-pen` | Freehand drawing engine with round caps and joins for smooth vector-like stroke tracing. |
| **Eraser** | `tool-eraser` | Destructive canvas clearing that switches `globalCompositeOperation` to `destination-out`. Erases pixels cleanly under the cursor. |
| **Line** | `tool-line` | Straight line drawing tool with interactive real-time preview before committing to canvas. |
| **Rectangle** | `tool-rectangle` | Bounding box shape tool supporting live dimension preview on drag. |

---

## 2. Drawing Properties & Controls

| Control | Element / `data-testid` | Capabilities |
|---|---|---|
| **Color Picker** | `color-picker` | Native color selection supporting 16+ million hex colors. |
| **Palette Swatches** | Toolbar Buttons | 10 rapid-access high-contrast preset color swatches for instant switching. |
| **Brush Size Slider** | `brush-size-slider` | Native range input adjustable from 1px to 50px. Accompanied by a live dynamic brush dot indicator. |

---

## 3. History & State Management

| Action | Attribute / Shortcut | Behavior |
|---|---|---|
| **Undo** | `undo-button` / `Ctrl+Z` | Pops the latest stroke from the snapshot history stack and immediately paints the prior state. |
| **Clear Canvas** | `clear-canvas-button` | Erases all active pixels across the entire canvas viewport and records the blank state. |

---

## 4. Persistence & Artwork Gallery

| Feature | Attribute | Details |
|---|---|---|
| **Save to Storage** | `save-storage-button` / `Ctrl+S` | Serializes the active canvas to Base64 PNG and stores it into browser `localStorage` under `savedDrawings`. |
| **Gallery Container** | `gallery-container` | Responsive horizontal scrolling shelf displaying saved artwork thumbnails. |
| **Artwork Thumbnails** | `gallery-item-0`, `gallery-item-1` | Clickable artwork cards with hover focus; clicking restores the artwork onto the active canvas. |
| **Delete Artwork** | Thumbnail delete button | Removes individual drawings from `localStorage` without affecting remaining entries. |

---

## 5. Export & Testing Integration

| Feature | Details |
|---|---|
| **PNG File Export** | `button[data-testid="export-png-button"]` programmatically creates and triggers a download link with timestamped filename (`canvascraft-artwork-[timestamp].png`). |
| **Global Testing Hook** | `window.getCanvasDataURL()` attaches to the root window object, allowing automated test runners to retrieve current canvas image strings (`data:image/png;base64,...`). |
