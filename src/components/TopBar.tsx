import React from 'react';
import { AlgorithmType, UniverseTheme } from '../types/theater';
import { Users, Sparkles } from 'lucide-react';

interface TopBarProps {
  currentAlgorithm: AlgorithmType;
  onSelectAlgorithm: (algo: AlgorithmType) => void;
  currentTheme: UniverseTheme;
  onSelectTheme: (theme: UniverseTheme) => void;
  onOpenCastEditor: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentAlgorithm,
  onSelectAlgorithm,
  currentTheme,
  onSelectTheme,
  onOpenCastEditor,
}) => {
  return (
    <header className="flex items-center justify-between gap-6 px-4 sm:px-8 py-3.5 border-b border-slate-800 bg-[#060913]/90 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <a
          href="/"
          className="text-base sm:text-lg font-bold tracking-tight text-slate-100 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
          <span>Le Théâtre des Algorithmes</span>
        </a>
      </div>

      {/* Zone 2: 4 clean single-line algorithm tabs */}
      <nav className="hidden lg:flex items-center gap-2 text-xs font-medium text-slate-400">
        <button
          onClick={() => onSelectAlgorithm('bubble-sort')}
          className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            currentAlgorithm === 'bubble-sort'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 font-semibold'
              : 'hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          Tri à Bulles (File Polie)
        </button>

        <button
          onClick={() => onSelectAlgorithm('quick-sort')}
          className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            currentAlgorithm === 'quick-sort'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 font-semibold'
              : 'hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          Tri Rapide (Pivot Éclaireur)
        </button>

        <button
          onClick={() => onSelectAlgorithm('binary-search')}
          className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            currentAlgorithm === 'binary-search'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 font-semibold'
              : 'hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          Recherche Binaire (Dichotomie)
        </button>

        <button
          onClick={() => onSelectAlgorithm('dijkstra')}
          className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            currentAlgorithm === 'dijkstra'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 font-semibold'
              : 'hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          Chemin Dijkstra (Balises Warp)
        </button>
      </nav>

      {/* Zone 3: Primary action + Universe Selector */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Universe switcher dropdown */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/90 border border-slate-800 px-2 py-1 rounded-lg">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <select
            value={currentTheme}
            onChange={e => onSelectTheme(e.target.value as UniverseTheme)}
            className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer pr-1"
          >
            <option value="scifi" className="bg-slate-900 text-slate-200">
              Astronef Hyperion (Rétro Sci-Fi)
            </option>
            <option value="royal" className="bg-slate-900 text-slate-200">
              Cour Royale (Versailles)
            </option>
            <option value="forest" className="bg-slate-900 text-slate-200">
              Animaux de la Forêt
            </option>
          </select>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={onOpenCastEditor}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md shadow-amber-400/20 whitespace-nowrap shrink-0 flex items-center gap-1.5"
        >
          <Users className="w-3.5 h-3.5" />
          <span>Personnaliser la Troupe</span>
        </button>
      </div>
    </header>
  );
};
