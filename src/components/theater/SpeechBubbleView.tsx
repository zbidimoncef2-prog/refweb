import React from 'react';
import { SpeechBubble } from '../../types/theater';

interface SpeechBubbleViewProps {
  bubble: SpeechBubble;
  index: number;
}

export const SpeechBubbleView: React.FC<SpeechBubbleViewProps> = ({ bubble, index }) => {
  // Border and accent styling based on tone
  let toneBadge = 'bg-slate-700/80 text-slate-200';
  let bubbleBorder = 'border-slate-700 bg-slate-900/95';

  if (bubble.tone === 'triumphant') {
    toneBadge = 'bg-emerald-950 border border-emerald-500/50 text-emerald-300';
    bubbleBorder = 'border-emerald-500/60 bg-slate-950/95 shadow-emerald-950/50';
  } else if (bubble.tone === 'exclamatory') {
    toneBadge = 'bg-rose-950 border border-rose-500/50 text-rose-300';
    bubbleBorder = 'border-rose-500/60 bg-slate-950/95 shadow-rose-950/50';
  } else if (bubble.tone === 'dramatic') {
    toneBadge = 'bg-red-950 border border-red-500/50 text-red-300';
    bubbleBorder = 'border-red-500/60 bg-slate-950/95 shadow-red-950/50';
  } else if (bubble.tone === 'robotic') {
    toneBadge = 'bg-purple-950 border border-purple-500/50 text-purple-300';
    bubbleBorder = 'border-purple-500/60 bg-slate-950/95 shadow-purple-950/50';
  } else if (bubble.tone === 'analytical') {
    toneBadge = 'bg-indigo-950 border border-indigo-500/50 text-indigo-300';
    bubbleBorder = 'border-indigo-500/60 bg-slate-950/95 shadow-indigo-950/50';
  } else if (bubble.tone === 'polite') {
    toneBadge = 'bg-amber-950 border border-amber-500/50 text-amber-300';
    bubbleBorder = 'border-amber-500/60 bg-slate-950/95 shadow-amber-950/50';
  } else if (bubble.tone === 'questioning') {
    toneBadge = 'bg-cyan-950 border border-cyan-500/50 text-cyan-300';
    bubbleBorder = 'border-cyan-500/60 bg-slate-950/95 shadow-cyan-950/50';
  }

  return (
    <div
      className={`relative max-w-sm sm:max-w-md p-3.5 sm:p-4 rounded-xl border-2 shadow-xl backdrop-blur-md transition-all duration-300 ${bubbleBorder}`}
    >
      {/* Header bar with character name & tone */}
      <div className="flex items-center justify-between gap-3 mb-1.5">
        <span className="text-xs font-bold text-amber-300 tracking-wide uppercase">
          {bubble.speakerName}
        </span>
        <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded ${toneBadge}`}>
          {bubble.tone === 'polite'
            ? 'Politesse'
            : bubble.tone === 'triumphant'
            ? 'Victoire'
            : bubble.tone === 'robotic'
            ? 'Cybernétique'
            : bubble.tone === 'exclamatory'
            ? 'Alerte'
            : bubble.tone === 'dramatic'
            ? 'Dramatique'
            : bubble.tone === 'analytical'
            ? 'Analyse'
            : 'Enquête'}
        </span>
      </div>

      {/* Dialogue line */}
      <p className="text-sm sm:text-base text-slate-100 italic leading-snug font-medium">
        « {bubble.text} »
      </p>

      {/* Comic speech bubble tail pointing downwards */}
      <div
        className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-r-2 border-b-2 bg-inherit"
        style={{ borderColor: 'inherit' }}
      />
    </div>
  );
};
