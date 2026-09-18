# Application Workflow

This document details the user interactions, drawing event loops, and persistence lifecycles of CanvasCraft.

---

## User Interaction Flow

```mermaid
stateDiagram-v2
    [*] --> Idle: Mount Application
    Idle --> Idle: Select Tool / Color / Brush Size

    Idle --> Drawing_Stroke: MouseDown / TouchStart (Pen / Eraser)
    Drawing_Stroke --> Drawing_Stroke: MouseMove / TouchMove (Render Line)
    Drawing_Stroke --> Idle: MouseUp / TouchEnd (Commit to History)

    Idle --> Previewing_Shape: MouseDown (Line / Rectangle)
    Previewing_Shape --> Previewing_Shape: MouseMove (Restore Buffer & Draw Provisional Shape)
    Previewing_Shape --> Idle: MouseUp (Finalize Shape & Commit)

    Idle --> Undo_Action: Click Undo Button
    Undo_Action --> Idle: Revert Canvas to Previous Snapshot

    Idle --> Clear_Canvas: Click Clear Button
    Clear_Canvas --> Idle: Clear Entire Raster Buffer & Commit Blank State

    Idle --> Save_Artwork: Click Save Button
    Save_Artwork --> Idle: Serialize to JSON & Persist in LocalStorage

    Idle --> Load_Artwork: Click Gallery Item
    Load_Artwork --> Idle: Paint Stored Image onto Canvas

    Idle --> Export_PNG: Click Export PNG Button
    Export_PNG --> Idle: Programmatic File Download
```

---

## Drawing Event Loop

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Toolbar as Toolbar Component
    participant Canvas as Canvas Component
    participant Ctx as CanvasRenderingContext2D
    participant History as History Stack

    User->>Toolbar: Select Tool (e.g. 'pen') & Color
    Toolbar-->>Canvas: Props update (tool, color, brushSize)
    User->>Canvas: onMouseDown(x, y)
    Canvas->>Ctx: beginPath(), moveTo(x, y)
    
    loop On Cursor Move
        User->>Canvas: onMouseMove(x, y)
        Canvas->>Ctx: lineTo(x, y), stroke()
    end

    User->>Canvas: onMouseUp()
    Canvas->>Ctx: closePath()
    Canvas->>History: push({ dataUrl, imageData })
```

---

## LocalStorage Persistence Flow

1. **Initial Mount**:
   - `App.jsx` reads key `'savedDrawings'` via `localStorage.getItem()`.
   - Content is deserialized via `JSON.parse()`.
   - Gallery renders thumbnail cards for all retrieved entries.
2. **Save Action**:
   - User clicks `button[data-testid="save-storage-button"]`.
   - Active canvas is serialized to a standard PNG Base64 Data URL via `canvas.toDataURL('image/png')`.
   - Current list is retrieved from `localStorage`, updated with the new artwork string, and persisted back via `localStorage.setItem('savedDrawings', JSON.stringify(list))`.
   - State is updated reactively, immediately populating the gallery.
3. **Artwork Restoration**:
   - User clicks `button[data-testid="gallery-item-0"]`.
   - Serialized image is assigned to a native `Image` object.
   - Canvas context is cleared and `context.drawImage(img, 0, 0)` repaints the artwork in 100% pixel fidelity.
