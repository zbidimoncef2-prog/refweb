import React, { useEffect, useRef, useState } from 'react';
import { StageSnapshot } from '../../types/theater';
import { BookOpen, Copy, Check, Navigation } from 'lucide-react';

interface ScriptPrompterProps {
  snapshots: StageSnapshot[];
  currentStepIndex: number;
  onSelectStep: (stepIndex: number) => void;
}

export const ScriptPrompter: React.FC<ScriptPrompterProps> = ({
  snapshots,
  currentStepIndex,
  onSelectStep,
}) => {
  const [autoScroll, setAutoScroll] = useState(true);
  const [copied, setCopied] = useState(false);
  const activeLineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to active line when currentStepIndex changes
  useEffect(() => {
    if (autoScroll && activeLineRef.current && containerRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [currentStepIndex, autoScroll]);

  // Copy full theatrical script to clipboard
  const handleCopyScript = () => {
    const text = snapshots
      .map(
        (s, idx) =>
          `[Scène ${idx + 1}] ${s.actTitle} - ${s.sceneTitle}\n` +
          `Didascalie : ${s.stageDirection}\n` +
          (s.speechBubbles.length > 0
            ? s.speechBubbles.map(b => `${b.speakerName} : « ${b.text} »`).join('\n') + '\n'
            : '') +
          `Note algorithmique : ${s.technicalExplanation}\n`
      )
      .join('\n---\n\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#090D17] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Header bar */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-slate-100 tracking-tight">
            Le Script du Spectacle
          </h3>
          <span className="text-xs font-mono text-slate-400">
            · {currentStepIndex + 1}/{snapshots.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Auto-scroll toggle */}
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`text-xs px-2 py-1 rounded border transition-colors flex items-center gap-1 ${
              autoScroll
                ? 'bg-amber-950/60 text-amber-300 border-amber-600/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title="Défilement automatique"
          >
            <Navigation className="w-3 h-3" />
            <span className="hidden sm:inline">Suivi auto</span>
          </button>

          {/* Copy script button */}
          <button
            onClick={handleCopyScript}
            className="p-1 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded transition-colors"
            title="Copier le script complet"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Script Lines Scrollable List */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 font-serif text-sm max-h-[460px] sm:max-h-[520px]"
      >
        {snapshots.map((snap, idx) => {
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={idx}
              ref={isCurrent ? activeLineRef : null}
              onClick={() => onSelectStep(idx)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-amber-950/20 border-amber-500/60 shadow-lg shadow-amber-950/20'
                  : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700'
              }`}
            >
              {/* Scene & Act Number */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
                <span className={isCurrent ? 'text-amber-300 font-bold' : ''}>
                  {snap.actTitle}
                </span>
                <span className="text-[11px] text-slate-500">
                  #{idx + 1}
                </span>
              </div>

              {/* Didascalie / Stage Direction */}
              <p className="text-xs italic text-slate-400 mb-2 leading-relaxed">
                ✦ {snap.stageDirection}
              </p>

              {/* Spoken Dialogues */}
              {snap.speechBubbles.map((b, bIdx) => (
                <div key={bIdx} className="my-1.5 pl-2.5 border-l-2 border-slate-700">
                  <span className="text-xs font-sans font-bold text-slate-200">
                    {b.speakerName} :{' '}
                  </span>
                  <span className="text-xs text-slate-100 italic">
                    « {b.text} »
                  </span>
                </div>
              ))}

              {/* Technical Algorithmic Annotation */}
              <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="truncate max-w-[280px]">
                  {snap.technicalExplanation}
                </span>
                {isCurrent && (
                  <span className="text-[10px] uppercase font-bold text-amber-400 shrink-0">
                    En Direct
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
