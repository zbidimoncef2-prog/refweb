import React, { useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, FastForward } from 'lucide-react';

interface PlaybackBarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentStep: number;
  totalSteps: number;
  onStepChange: (step: number) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
}

export const PlaybackBar: React.FC<PlaybackBarProps> = ({
  isPlaying,
  onTogglePlay,
  currentStep,
  totalSteps,
  onStepChange,
  speed,
  onSpeedChange,
}) => {
  // Support keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        onTogglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        if (currentStep < totalSteps - 1) {
          onStepChange(currentStep + 1);
        }
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        if (currentStep > 0) {
          onStepChange(currentStep - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, currentStep, totalSteps, onTogglePlay, onStepChange]);

  const speeds = [0.5, 1, 1.5, 2, 3];

  return (
    <div className="w-full bg-[#0B0F1D] border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col gap-3">
      {/* Top Scrubber & Progress */}
      <div className="flex items-center gap-3 w-full">
        <span className="text-xs font-mono text-slate-400 whitespace-nowrap min-w-[50px]">
          {currentStep + 1} / {totalSteps}
        </span>

        {/* Range Slider */}
        <input
          type="range"
          min={0}
          max={Math.max(0, totalSteps - 1)}
          value={currentStep}
          onChange={e => onStepChange(Number(e.target.value))}
          className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 hover:accent-amber-300 transition-all"
        />

        <span className="text-xs font-mono text-slate-400 whitespace-nowrap min-w-[45px] text-right">
          {Math.round(((currentStep + 1) / Math.max(1, totalSteps)) * 100)}%
        </span>
      </div>

      {/* Main Buttons Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        {/* Navigation buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Reset */}
          <button
            onClick={() => onStepChange(0)}
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
            title="Revenir au prologue"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Previous step */}
          <button
            onClick={() => onStepChange(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent rounded-lg transition-colors"
            title="Étape précédente (Flèche gauche)"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Big Play / Pause CTA */}
          <button
            onClick={onTogglePlay}
            className={`px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/30'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Jouer la pièce</span>
              </>
            )}
          </button>

          {/* Next step */}
          <button
            onClick={() => onStepChange(Math.min(totalSteps - 1, currentStep + 1))}
            disabled={currentStep >= totalSteps - 1}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent rounded-lg transition-colors"
            title="Étape suivante (Flèche droite)"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Jump to end */}
          <button
            onClick={() => onStepChange(totalSteps - 1)}
            disabled={currentStep >= totalSteps - 1}
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent rounded-lg transition-colors"
            title="Sauter à l'épilogue final"
          >
            <FastForward className="w-4 h-4" />
          </button>
        </div>

        {/* Cadence / Speed selection */}
        <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
          <span className="text-[11px] text-slate-400 px-2 font-mono">Cadence :</span>
          {speeds.map(s => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-2 py-1 text-xs font-mono rounded-lg transition-colors ${
                speed === s
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
