import React from 'react';
import { Character, StageAction } from '../../types/theater';

interface CharacterFigureProps {
  character: Character;
  isActive: boolean;
  isComparing?: boolean;
  isSwapping?: boolean;
  isSorted?: boolean;
  isPivot?: boolean;
  isTarget?: boolean;
  isEliminated?: boolean;
  stageAction: StageAction;
  size?: 'normal' | 'compact';
}

export const CharacterFigure: React.FC<CharacterFigureProps> = ({
  character,
  isActive,
  isComparing,
  isSwapping,
  isSorted,
  isPivot,
  isTarget,
  isEliminated,
  stageAction,
  size = 'normal',
}) => {
  const isCompact = size === 'compact';
  const widthClass = isCompact ? 'w-20' : 'w-28 sm:w-32';
  const heightClass = isCompact ? 'h-32' : 'h-44 sm:h-48';

  // State-based accent glow
  let ringColor = 'border-slate-700/60';
  let badgeBg = 'bg-slate-800 text-slate-200 border-slate-700';

  if (isPivot) {
    ringColor = 'border-amber-400 ring-4 ring-amber-400/30';
    badgeBg = 'bg-amber-500 text-slate-950 font-bold border-amber-300';
  } else if (isTarget || (isSorted && stageAction === 'complete')) {
    ringColor = 'border-emerald-400 ring-4 ring-emerald-400/30';
    badgeBg = 'bg-emerald-500 text-slate-950 font-bold border-emerald-300';
  } else if (isSwapping) {
    ringColor = 'border-rose-400 ring-4 ring-rose-400/30 animate-pulse';
    badgeBg = 'bg-rose-500 text-white font-bold border-rose-300';
  } else if (isComparing) {
    ringColor = 'border-cyan-400 ring-4 ring-cyan-400/30';
    badgeBg = 'bg-cyan-500 text-slate-950 font-bold border-cyan-300';
  } else if (isSorted) {
    ringColor = 'border-emerald-500/70';
    badgeBg = 'bg-emerald-900/80 text-emerald-200 border-emerald-500/50';
  } else if (isActive) {
    ringColor = 'border-amber-400/80 ring-2 ring-amber-400/20';
    badgeBg = 'bg-amber-500/90 text-slate-950 font-bold border-amber-300';
  }

  // Pick portrait SVG archetype
  const renderAvatarGraphic = () => {
    switch (character.avatarKey) {
      case 'captain':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Captain peaked cap */}
            <circle cx="50" cy="50" r="38" fill="#1E293B" />
            <ellipse cx="50" cy="30" rx="32" ry="14" fill="#0F172A" />
            <path d="M22 30 C 22 18, 78 18, 78 30 Z" fill="#0284C7" />
            <circle cx="50" cy="24" r="5" fill="#F59E0B" />
            {/* Face */}
            <circle cx="50" cy="54" r="22" fill="#FED7AA" />
            {/* Hair */}
            <path d="M30 46 C 30 36, 70 36, 70 46" stroke="#9A3412" strokeWidth="4" fill="none" />
            {/* Eyes */}
            <circle cx="43" cy="52" r="2.5" fill="#0F172A" />
            <circle cx="57" cy="52" r="2.5" fill="#0F172A" />
            {/* Smile / Expression */}
            {isSwapping || isComparing ? (
              <path d="M44 63 Q 50 60 56 63" stroke="#0F172A" strokeWidth="2" fill="none" strokeLinecap="round" />
            ) : isTarget || isSorted ? (
              <path d="M43 60 Q 50 67 57 60" stroke="#0F172A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            ) : (
              <line x1="45" y1="62" x2="55" y2="62" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
            )}
            {/* Uniform collar */}
            <path d="M30 76 L 50 88 L 70 76" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />
            <circle cx="50" cy="82" r="3" fill="#F59E0B" />
          </svg>
        );
      case 'android':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Metal chassis */}
            <circle cx="50" cy="50" r="38" fill="#334155" />
            <rect x="28" y="32" width="44" height="36" rx="8" fill="#475569" stroke="#94A3B8" strokeWidth="2" />
            {/* Antenna */}
            <line x1="50" y1="32" x2="50" y2="16" stroke="#A78BFA" strokeWidth="3" />
            <circle cx="50" cy="14" r="4" fill="#C084FC" className="animate-pulse" />
            {/* Digital visor / eyes */}
            <rect x="36" y="44" width="28" height="10" rx="3" fill="#0F172A" />
            <circle cx="43" cy="49" r="3" fill="#38BDF8" className="animate-ping" style={{ animationDuration: '2s' }} />
            <circle cx="57" cy="49" r="3" fill="#38BDF8" />
            {/* Speaker grill */}
            <line x1="42" y1="61" x2="58" y2="61" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 2" />
            {/* Chest lights */}
            <circle cx="40" cy="78" r="2.5" fill="#34D399" />
            <circle cx="50" cy="78" r="2.5" fill="#F59E0B" />
            <circle cx="60" cy="78" r="2.5" fill="#38BDF8" />
          </svg>
        );
      case 'scientist':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="38" fill="#1E293B" />
            {/* Crazy scientist hair */}
            <circle cx="30" cy="38" r="14" fill="#E2E8F0" />
            <circle cx="70" cy="38" r="14" fill="#E2E8F0" />
            <circle cx="50" cy="26" r="16" fill="#F1F5F9" />
            {/* Face */}
            <circle cx="50" cy="54" r="22" fill="#FED7AA" />
            {/* Round Glasses */}
            <circle cx="42" cy="50" r="8" fill="rgba(56, 189, 248, 0.2)" stroke="#F59E0B" strokeWidth="2.5" />
            <circle cx="58" cy="50" r="8" fill="rgba(56, 189, 248, 0.2)" stroke="#F59E0B" strokeWidth="2.5" />
            <line x1="50" y1="50" x2="50" y2="50" stroke="#F59E0B" strokeWidth="2" />
            {/* Eyes behind glasses */}
            <circle cx="42" cy="50" r="2" fill="#0F172A" />
            <circle cx="58" cy="50" r="2" fill="#0F172A" />
            {/* Concentrated mouth */}
            <ellipse cx="50" cy="64" rx="4" ry="2" fill="#9A3412" />
            {/* Lab coat */}
            <path d="M30 76 L 50 88 L 70 76" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
            <path d="M50 76 L 50 95" stroke="#94A3B8" strokeWidth="1.5" />
          </svg>
        );
      case 'engineer':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="38" fill="#1E293B" />
            {/* Welding visor pushed up on forehead */}
            <rect x="32" y="22" width="36" height="12" rx="4" fill="#FB7185" stroke="#F43F5E" strokeWidth="2" />
            <circle cx="50" cy="28" r="3" fill="#FFE4E6" />
            {/* Face */}
            <circle cx="50" cy="54" r="22" fill="#FDBA74" />
            {/* Messy ponytail */}
            <path d="M68 40 Q 82 45 78 62" stroke="#B45309" strokeWidth="6" fill="none" strokeLinecap="round" />
            {/* Eyes with protective attitude */}
            <circle cx="43" cy="52" r="2.5" fill="#0F172A" />
            <circle cx="57" cy="52" r="2.5" fill="#0F172A" />
            {/* Grin */}
            <path d="M44 63 Q 50 68 56 61" stroke="#0F172A" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Overalls */}
            <path d="M30 76 L 50 86 L 70 76" fill="#F43F5E" stroke="#E11D48" strokeWidth="2" />
          </svg>
        );
      case 'cadet':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="38" fill="#1E293B" />
            {/* Cadet helmet dome */}
            <circle cx="50" cy="48" r="28" fill="rgba(52, 211, 153, 0.15)" stroke="#34D399" strokeWidth="2" />
            {/* Face */}
            <circle cx="50" cy="52" r="18" fill="#FECDD3" />
            {/* Big curious eyes */}
            <circle cx="44" cy="50" r="3.5" fill="#0F172A" />
            <circle cx="56" cy="50" r="3.5" fill="#0F172A" />
            <circle cx="45" cy="49" r="1" fill="#FFFFFF" />
            <circle cx="57" cy="49" r="1" fill="#FFFFFF" />
            {/* Cute smile */}
            <path d="M46 59 Q 50 64 54 59" stroke="#0F172A" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Suit */}
            <path d="M32 76 L 50 86 L 68 76" fill="#059669" stroke="#34D399" strokeWidth="2" />
          </svg>
        );
      default:
        // Tactical / Officer fallback
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="38" fill="#1E293B" />
            <circle cx="50" cy="52" r="22" fill="#FED7AA" />
            <path d="M28 38 C 30 26, 70 26, 72 38" stroke="#475569" strokeWidth="8" fill="none" />
            {/* Eyepatch / Scouter */}
            <circle cx="43" cy="50" r="5" fill="#EA580C" stroke="#C2410C" strokeWidth="2" />
            <circle cx="57" cy="50" r="2.5" fill="#0F172A" />
            <line x1="38" y1="46" x2="62" y2="54" stroke="#78350F" strokeWidth="1.5" />
            {/* Serious mouth */}
            <line x1="45" y1="63" x2="55" y2="63" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
            {/* Uniform */}
            <path d="M30 76 L 50 88 L 70 76" fill="#EA580C" stroke="#F97316" strokeWidth="2" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center transition-all duration-300 ${widthClass} ${
        isEliminated ? 'opacity-30 grayscale scale-90 translate-y-2' : 'opacity-100'
      }`}
    >
      {/* Visual Role Indicator */}
      {isPivot && (
        <span className="absolute -top-7 text-[10px] uppercase font-bold tracking-wider text-amber-300 bg-amber-950/80 border border-amber-500/50 px-2 py-0.5 rounded shadow-sm whitespace-nowrap z-20 animate-bounce">
          Balise Pivot
        </span>
      )}
      {isTarget && (
        <span className="absolute -top-7 text-[10px] uppercase font-bold tracking-wider text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 px-2 py-0.5 rounded shadow-sm whitespace-nowrap z-20">
          Cible Trouvée
        </span>
      )}

      {/* Character Figure Body */}
      <div
        className={`relative ${heightClass} w-full flex flex-col items-center justify-end rounded-xl border-2 transition-transform duration-300 p-2 ${ringColor} ${
          isActive ? 'scale-105 -translate-y-1' : ''
        } ${isSwapping ? 'rotate-1' : ''}`}
        style={{
          background: `radial-gradient(circle at 50% 30%, ${character.accentColor}18 0%, #0F172A 80%)`,
        }}
      >
        {/* Spotlight overhead beam when active */}
        {isActive && (
          <div
            className="absolute -top-16 inset-x-0 h-20 opacity-40 pointer-events-none"
            style={{
              background: `conic-gradient(from 180deg at 50% 0%, ${character.accentColor} 0deg, transparent 60deg, transparent 300deg, ${character.accentColor} 360deg)`,
            }}
          />
        )}

        {/* Avatar Graphic */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 z-10 transition-transform duration-200">
          {renderAvatarGraphic()}
        </div>

        {/* Badge Shield (The Core Number) */}
        <div className="mt-1 z-10 flex flex-col items-center">
          <div
            className={`px-2.5 py-0.5 rounded border text-xs sm:text-sm font-mono tracking-wider tabular-nums shadow-md transition-colors ${badgeBg}`}
          >
            #{character.badgeValue}
          </div>
          <span className="text-[11px] sm:text-xs font-semibold text-slate-200 mt-1 truncate max-w-[90px] text-center">
            {character.name}
          </span>
          <span className="text-[9px] text-slate-400 truncate max-w-[85px] text-center">
            {character.role}
          </span>
        </div>
      </div>
    </div>
  );
};
