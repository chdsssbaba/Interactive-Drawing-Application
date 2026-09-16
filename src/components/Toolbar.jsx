import React from 'react';

const PRESET_COLORS = [
  '#000000',
  '#ef4444',
  '#f97316',
  '#eab308',
  '#10b981',
  '#06b6d4',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#ffffff',
];

const Toolbar = ({
  tool,
  setTool,
  color,
  setColor,
  brushSize,
  setBrushSize,
  onUndo,
  canUndo,
  onClear,
  onSave,
  onExport,
}) => {
  return (
    <aside className="glass-panel w-full sm:w-auto p-3 sm:p-4 rounded-2xl flex flex-wrap sm:flex-col items-center justify-between sm:justify-start gap-4 z-20 transition-all">
      {/* Tool Selection Section */}
      <div className="flex sm:flex-col gap-2 p-1.5 bg-slate-900/60 rounded-xl border border-white/5">
        {/* Pen */}
        <button
          type="button"
          data-testid="tool-pen"
          onClick={() => setTool('pen')}
          title="Pen Tool"
          className={`p-2.5 rounded-lg flex items-center justify-center transition-all ${
            tool === 'pen'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 ring-1 ring-white/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>

        {/* Eraser */}
        <button
          type="button"
          data-testid="tool-eraser"
          onClick={() => setTool('eraser')}
          title="Eraser Tool"
          className={`p-2.5 rounded-lg flex items-center justify-center transition-all ${
            tool === 'eraser'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 ring-1 ring-white/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>

        {/* Line */}
        <button
          type="button"
          data-testid="tool-line"
          onClick={() => setTool('line')}
          title="Line Tool"
          className={`p-2.5 rounded-lg flex items-center justify-center transition-all ${
            tool === 'line'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 ring-1 ring-white/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 20L20 4" />
          </svg>
        </button>

        {/* Rectangle */}
        <button
          type="button"
          data-testid="tool-rectangle"
          onClick={() => setTool('rectangle')}
          title="Rectangle Tool"
          className={`p-2.5 rounded-lg flex items-center justify-center transition-all ${
            tool === 'rectangle'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 ring-1 ring-white/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="2" />
          </svg>
        </button>
      </div>

      <div className="hidden sm:block w-full h-[1px] bg-white/10 my-1" />

      {/* Color Picker & Swatches */}
      <div className="flex sm:flex-col items-center gap-2">
        <div className="relative group">
          <input
            type="color"
            data-testid="color-picker"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            title="Stroke Color"
            className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-2 border-white/20 p-0.5 shadow-inner hover:scale-105 transition-transform"
          />
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-900 text-xs px-2 py-0.5 rounded text-white font-mono whitespace-nowrap z-30 border border-white/10">
            {color}
          </span>
        </div>

        {/* Quick Swatches on desktop */}
        <div className="hidden sm:grid grid-cols-2 gap-1.5 p-1.5 bg-slate-900/40 rounded-xl border border-white/5">
          {PRESET_COLORS.slice(0, 6).map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setColor(preset)}
              style={{ backgroundColor: preset }}
              className={`w-4 h-4 rounded-md border transition-transform ${
                color.toLowerCase() === preset.toLowerCase()
                  ? 'border-white scale-110 shadow-sm'
                  : 'border-white/20 hover:scale-110'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="hidden sm:block w-full h-[1px] bg-white/10 my-1" />

      {/* Brush Size Slider */}
      <div className="flex sm:flex-col items-center gap-2 w-32 sm:w-auto">
        <div className="flex items-center justify-between w-full text-xs text-slate-400 font-mono">
          <span className="hidden sm:inline">Size</span>
          <span className="px-1.5 py-0.5 bg-white/5 rounded text-indigo-300 font-semibold">{brushSize}px</span>
        </div>
        <input
          type="range"
          data-testid="brush-size-slider"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value, 10) || 1)}
          title="Brush Thickness"
          className="w-full cursor-pointer accent-indigo-500"
        />
        {/* Dynamic preview dot */}
        <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900/50 border border-white/5">
          <div
            className="rounded-full bg-indigo-400 transition-all"
            style={{
              width: `${Math.max(3, Math.min(24, brushSize))}px`,
              height: `${Math.max(3, Math.min(24, brushSize))}px`,
            }}
          />
        </div>
      </div>

      <div className="hidden sm:block w-full h-[1px] bg-white/10 my-1" />

      {/* Action Buttons */}
      <div className="flex sm:flex-col gap-2">
        {/* Undo */}
        <button
          type="button"
          data-testid="undo-button"
          onClick={onUndo}
          title="Undo (Ctrl+Z)"
          className="p-2.5 rounded-xl glass-button text-slate-300 hover:text-white flex items-center justify-center"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a5 5 0 015 5v2m0 0l-4-4m4 4l4-4" transform="matrix(-1 0 0 1 24 0)" />
          </svg>
        </button>

        {/* Clear Canvas */}
        <button
          type="button"
          data-testid="clear-canvas-button"
          onClick={onClear}
          title="Clear Canvas"
          className="p-2.5 rounded-xl glass-button text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 flex items-center justify-center"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>

        {/* Save to LocalStorage */}
        <button
          type="button"
          data-testid="save-storage-button"
          onClick={onSave}
          title="Save Artwork to LocalStorage"
          className="p-2.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/30 hover:border-emerald-400/50 flex items-center justify-center transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
        </button>

        {/* Export PNG */}
        <button
          type="button"
          data-testid="export-png-button"
          onClick={onExport}
          title="Export as PNG Image"
          className="p-2.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/30 hover:border-indigo-400/50 flex items-center justify-center transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>
    </aside>
  );
};

export default Toolbar;
