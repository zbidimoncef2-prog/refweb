import React from 'react';
import { AlgorithmType, StageSnapshot } from '../../types/theater';
import { CharacterFigure } from './CharacterFigure';
import { SpeechBubbleView } from './SpeechBubbleView';
import { DijkstraGraphCanvas } from './DijkstraGraphCanvas';

interface StageCanvasProps {
  snapshot: StageSnapshot;
  algorithm: AlgorithmType;
  universeStageName: string;
}

export const StageCanvas: React.FC<StageCanvasProps> = ({
  snapshot,
  algorithm,
  universeStageName,
}) => {
  const {
    actors,
    activeActorIds,
    comparingIndices,
    swappedIndices,
    sortedIndices = [],
    pivotIndex,
    searchRange,
    targetValue,
    speechBubbles,
    stageDirection,
    graphState,
    action,
    actTitle,
    sceneTitle,
  } = snapshot;

  const isDijkstra = algorithm === 'dijkstra';

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-[#070A12] shadow-2xl flex flex-col">
      {/* Proscenium Theater Header Valance (Velvet & Brass Trim) */}
      <div className="relative z-30 bg-gradient-to-r from-red-950/90 via-rose-950/80 to-red-950/90 border-b border-amber-500/30 px-4 py-2.5 flex items-center justify-between text-xs backdrop-blur-sm">
        {/* Stage Name / Location */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="font-semibold text-amber-200 tracking-wide">
            {universeStageName}
          </span>
          <span className="text-amber-500/60">·</span>
          <span className="text-slate-300 font-mono text-[11px]">
            {actTitle}
          </span>
        </div>

        {/* Current Scene Kicker */}
        <div className="text-right hidden sm:block">
          <span className="text-slate-400 text-[11px] italic">
            {sceneTitle}
          </span>
        </div>
      </div>

      {/* Main Stage Atmosphere / Viewport */}
      <div className="relative flex-1 min-h-[380px] sm:min-h-[440px] flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
        {/* Starfield space background layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-[#070A12] to-[#04060A]" />
        
        {/* Subtle stage curtains on left and right borders */}
        <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-red-950/30 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-red-950/30 to-transparent pointer-events-none z-10" />

        {/* Dynamic Overhead Spotlights Beam */}
        <div className="absolute top-0 left-1/4 right-1/4 h-32 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-xl pointer-events-none" />

        {/* Dialogue & Speech Bubbles Zone (Top Area) */}
        <div className="relative z-20 w-full flex flex-col items-center gap-3 min-h-[100px] justify-center">
          {speechBubbles && speechBubbles.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-4 w-full">
              {speechBubbles.map((bubble, idx) => (
                <SpeechBubbleView key={`${bubble.speakerId}-${idx}`} bubble={bubble} index={idx} />
              ))}
            </div>
          ) : (
            <div className="text-xs italic text-slate-500">
              (Silence sur le plateau... L'acte se prépare)
            </div>
          )}
        </div>

        {/* Center Canvas: Either Dijkstra Graph or Actor Lineup */}
        <div className="relative z-20 my-4 flex items-center justify-center w-full">
          {isDijkstra && graphState ? (
            <div className="w-full">
              <DijkstraGraphCanvas graphState={graphState} />
            </div>
          ) : (
            <div className="w-full overflow-x-auto pb-4 pt-2">
              <div className="flex items-end justify-center gap-2 sm:gap-4 md:gap-6 min-w-max px-4 mx-auto">
                {actors.map((actor, idx) => {
                  const isActive = activeActorIds.includes(actor.id);
                  const isComp =
                    comparingIndices !== undefined &&
                    (comparingIndices[0] === idx || comparingIndices[1] === idx);
                  const isSwap =
                    swappedIndices !== undefined &&
                    (swappedIndices[0] === idx || swappedIndices[1] === idx);
                  const isSorted = sortedIndices.includes(idx);
                  const isPiv = pivotIndex === idx;
                  const isTarget = targetValue !== undefined && actor.badgeValue === targetValue && action === 'found';
                  const isEliminated =
                    searchRange !== undefined &&
                    (idx < searchRange[0] || idx > searchRange[1]);

                  return (
                    <div
                      key={actor.id}
                      className="flex flex-col items-center transition-all duration-300"
                    >
                      {/* Character Actor */}
                      <CharacterFigure
                        character={actor}
                        isActive={isActive}
                        isComparing={isComp}
                        isSwapping={isSwap}
                        isSorted={isSorted}
                        isPivot={isPiv}
                        isTarget={isTarget}
                        isEliminated={isEliminated}
                        stageAction={action}
                      />

                      {/* Marked Podium Pedestal on Stage */}
                      <div className="mt-2 flex flex-col items-center">
                        {/* Podium Top Plate */}
                        <div
                          className={`w-16 sm:w-20 h-3 rounded-t-md border-t border-x transition-colors ${
                            isPiv
                              ? 'bg-amber-700/60 border-amber-400'
                              : isTarget || isSorted
                              ? 'bg-emerald-800/60 border-emerald-400'
                              : isSwap
                              ? 'bg-rose-800/60 border-rose-400'
                              : isComp
                              ? 'bg-cyan-800/60 border-cyan-400'
                              : 'bg-slate-800/80 border-slate-700'
                          }`}
                        />
                        {/* Podium Pillar with Position Number */}
                        <div className="w-20 sm:w-24 h-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 flex items-center justify-center text-[10px] font-mono text-slate-400">
                          Pos. {idx + 1}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Stage Footlights Rim (Floor lights at proscenium apron) */}
        <div className="relative z-20 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
          {/* Footlights dots */}
          <div className="flex items-center gap-1.5">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-amber-400/70 shadow-[0_0_6px_#f59e0b]"
              />
            ))}
            <span className="text-[10px] text-amber-500/70 ml-2 uppercase font-mono tracking-wider">
              Rampe de Feux
            </span>
          </div>

          {/* Didascalie / Stage Direction */}
          <div className="flex-1 max-w-xl mx-4 text-center">
            <p className="text-xs sm:text-sm text-slate-300 italic truncate font-serif">
              ✦ {stageDirection}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-amber-400/70 shadow-[0_0_6px_#f59e0b]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
