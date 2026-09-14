import React from 'react';

const Header = ({ historyCount, activeTool, color }) => {
  return (
    <header className="glass-panel w-full px-4 sm:px-6 py-3 rounded-2xl flex items-center justify-between z-20">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 ring-1 ring-white/20">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
            CanvasCraft
            <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/30">
              Studio v1.0
            </span>
          </h1>
          <p className="text-xs text-slate-400 hidden sm:block">
            HTML5 Canvas &amp; React Interactive Workspace
          </p>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/50 border border-white/5 text-xs text-slate-300">
          <span className="text-slate-400">Active Tool:</span>
          <span className="capitalize font-semibold text-indigo-300 flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full border border-white/40"
              style={{ backgroundColor: color }}
            />
            {activeTool}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/50 border border-white/5 text-xs text-slate-300 font-mono">
          <span className="text-slate-400">History:</span>
          <span className="text-emerald-400 font-semibold">{historyCount}</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Ready</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
