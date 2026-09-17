import React from 'react';

const Gallery = ({ savedDrawings, onSelectDrawing, onDeleteDrawing, onClearAll }) => {
  return (
    <section className="glass-panel w-full rounded-2xl p-4 transition-all">
      <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <h2 className="text-sm font-semibold text-slate-200 tracking-wide uppercase">
            Saved Artworks
          </h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
            {savedDrawings.length}
          </span>
        </div>
        {savedDrawings.length > 0 && onClearAll && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
          >
            Clear Gallery
          </button>
        )}
      </div>

      <div
        data-testid="gallery-container"
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin max-h-36 items-center min-h-[100px]"
      >
        {savedDrawings.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-4 text-center text-slate-500 text-xs">
            <svg className="w-8 h-8 mb-1.5 opacity-40 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>No saved artworks yet. Draw something and click &quot;Save&quot;!</span>
          </div>
        ) : (
          savedDrawings.map((drawing, index) => (
            <div
              key={`drawing-${index}`}
              className="relative group flex-shrink-0"
            >
              <button
                type="button"
                data-testid={`gallery-item-${index}`}
                onClick={() => onSelectDrawing(drawing)}
                title={`Load Artwork #${index + 1}`}
                className="w-24 h-20 sm:w-28 sm:h-22 rounded-xl bg-white/90 overflow-hidden border-2 border-transparent group-hover:border-indigo-500 transition-all shadow-md group-hover:shadow-indigo-500/30 flex items-center justify-center"
              >
                <img
                  src={drawing}
                  alt={`Artwork #${index + 1}`}
                  className="w-full h-full object-contain pointer-events-none"
                />
              </button>
              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-slate-900/80 text-[10px] text-slate-300 font-mono pointer-events-none border border-white/10">
                #{index + 1}
              </span>
              {onDeleteDrawing && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteDrawing(index);
                  }}
                  title="Delete drawing"
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] shadow"
                >
                  &times;
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Gallery;
