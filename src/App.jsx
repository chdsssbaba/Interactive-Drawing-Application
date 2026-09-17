import React, { useState, useRef, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import Gallery from './components/Gallery';

function App() {
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);

  // Read savedDrawings from localStorage on initial mount
  const [savedDrawings, setSavedDrawings] = useState(() => {
    try {
      const stored = localStorage.getItem('savedDrawings');
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (err) {
      console.error('Failed to parse savedDrawings from localStorage:', err);
    }
    return [];
  });

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const restoreSnapshotRef = useRef(null);

  // Undo history stack
  const historyRef = useRef([]);
  const historyIndexRef = useRef(-1);
  const [historyCount, setHistoryCount] = useState(0);

  // Record a new snapshot in the history stack
  const handleSnapshotTaken = useCallback((snapshot) => {
    // Truncate any redo path when a new action is performed
    const truncated = historyRef.current.slice(0, historyIndexRef.current + 1);
    truncated.push(snapshot);
    historyRef.current = truncated;
    historyIndexRef.current = truncated.length - 1;
    setHistoryCount(truncated.length);
  }, []);

  // Undo functionality
  const handleUndo = useCallback(() => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current -= 1;
      const targetSnapshot = historyRef.current[historyIndexRef.current];
      if (restoreSnapshotRef.current && targetSnapshot) {
        restoreSnapshotRef.current(targetSnapshot);
      }
      setHistoryCount(historyRef.current.length);
    }
  }, []);

  // Clear Canvas functionality
  const handleClear = useCallback(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    // Erase all pixel data across entire canvas
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();

    // Push blank state to history stack
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      handleSnapshotTaken({ dataUrl, imageData });
    } catch (err) {
      // ignore
    }
  }, [handleSnapshotTaken]);

  // Save Artwork to LocalStorage
  const handleSave = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');

    let current = [];
    try {
      const raw = localStorage.getItem('savedDrawings');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          current = parsed;
        }
      }
    } catch (err) {
      current = [];
    }

    current.push(dataUrl);
    localStorage.setItem('savedDrawings', JSON.stringify(current));
    setSavedDrawings([...current]);
  }, []);

  // Restore drawing from gallery
  const handleSelectDrawing = useCallback((drawingUrl) => {
    if (restoreSnapshotRef.current) {
      restoreSnapshotRef.current({ dataUrl: drawingUrl }, () => {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        if (canvas && context) {
          try {
            const dataUrl = canvas.toDataURL('image/png');
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            handleSnapshotTaken({ dataUrl, imageData });
          } catch (e) {
            // ignore
          }
        }
      });
    }
  }, [handleSnapshotTaken]);

  // Delete individual drawing from gallery
  const handleDeleteDrawing = useCallback((indexToDelete) => {
    const updated = savedDrawings.filter((_, idx) => idx !== indexToDelete);
    localStorage.setItem('savedDrawings', JSON.stringify(updated));
    setSavedDrawings(updated);
  }, [savedDrawings]);

  // Clear all saved drawings
  const handleClearAllSaved = useCallback(() => {
    localStorage.removeItem('savedDrawings');
    setSavedDrawings([]);
  }, []);

  // Export artwork as PNG image
  const handleExportPNG = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.download = `canvascraft-artwork-${Date.now()}.png`;
    downloadLink.href = dataUrl;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }, []);

  // Keyboard shortcut listener (Ctrl+Z for undo, Ctrl+S for save)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleSave]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gradient-to-br from-[#090d16] via-[#0f172a] to-[#090d16] text-slate-100 p-2 sm:p-4 gap-3">
      {/* Top Navigation Bar */}
      <Header
        historyCount={historyCount}
        activeTool={tool}
        color={color}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 min-h-0 flex flex-col sm:flex-row gap-3 relative">
        {/* Responsive Toolbar */}
        <Toolbar
          tool={tool}
          setTool={setTool}
          color={color}
          setColor={setColor}
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          onUndo={handleUndo}
          canUndo={historyIndexRef.current > 0}
          onClear={handleClear}
          onSave={handleSave}
          onExport={handleExportPNG}
        />

        {/* Central Drawing Canvas Canvas Board */}
        <div className="flex-1 min-w-0 h-full relative rounded-2xl overflow-hidden glass-panel flex flex-col">
          <Canvas
            tool={tool}
            color={color}
            brushSize={brushSize}
            canvasRef={canvasRef}
            contextRef={contextRef}
            onSnapshotTaken={handleSnapshotTaken}
            restoreSnapshotRef={restoreSnapshotRef}
          />
        </div>
      </main>

      {/* Bottom Saved Artworks Gallery */}
      <footer className="w-full flex-shrink-0 z-10">
        <Gallery
          savedDrawings={savedDrawings}
          onSelectDrawing={handleSelectDrawing}
          onDeleteDrawing={handleDeleteDrawing}
          onClearAll={handleClearAllSaved}
        />
      </footer>
    </div>
  );
}

export default App;
