import React, { useState, useMemo, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { AlgorithmType, Character, UniverseTheme } from './types/theater';
import { UNIVERSE_PRESETS } from './data/themes';
import { generateBubbleSortStory } from './algorithms/bubbleSortStory';
import { generateQuickSortStory } from './algorithms/quickSortStory';
import { generateBinarySearchStory } from './algorithms/binarySearchStory';
import { generateDijkstraStory } from './algorithms/dijkstraStory';
import { TopBar } from './components/TopBar';
import { StageCanvas } from './components/theater/StageCanvas';
import { ScriptPrompter } from './components/theater/ScriptPrompter';
import { PlaybackBar } from './components/theater/PlaybackBar';
import { AlgorithmInfoPanel } from './components/theater/AlgorithmInfoPanel';
import { CastEditorModal } from './components/theater/CastEditorModal';

export default function App() {
  const [currentAlgorithm, setCurrentAlgorithm] = useState<AlgorithmType>('bubble-sort');
  const [currentTheme, setCurrentTheme] = useState<UniverseTheme>('scifi');
  const [isCastEditorOpen, setIsCastEditorOpen] = useState(false);

  // Cast state - defaults to the chosen theme
  const [cast, setCast] = useState<Character[]>(() => [
    ...UNIVERSE_PRESETS.scifi.defaultCast,
  ]);

  // Binary search target value
  const [binarySearchTarget, setBinarySearchTarget] = useState<number>(45);

  // When theme changes, update cast unless user customized heavily
  const handleSelectTheme = (theme: UniverseTheme) => {
    setCurrentTheme(theme);
    setCast([...UNIVERSE_PRESETS[theme].defaultCast]);
  };

  // Generate snapshots based on selected algorithm and cast
  const snapshots = useMemo(() => {
    switch (currentAlgorithm) {
      case 'bubble-sort':
        return generateBubbleSortStory(cast, currentTheme);
      case 'quick-sort':
        return generateQuickSortStory(cast, currentTheme);
      case 'binary-search':
        return generateBinarySearchStory(cast, currentTheme, binarySearchTarget);
      case 'dijkstra':
        return generateDijkstraStory(cast, currentTheme);
    }
  }, [currentAlgorithm, cast, currentTheme, binarySearchTarget]);

  // Current step state
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  // Reset playback step when algorithm or cast changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [currentAlgorithm, cast, binarySearchTarget]);

  // Trigger celebration confetti when reaching the final celebration step
  const celebratedRef = useRef<boolean>(false);
  useEffect(() => {
    if (
      snapshots.length > 0 &&
      currentStepIndex === snapshots.length - 1 &&
      !celebratedRef.current
    ) {
      celebratedRef.current = true;
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#38BDF8', '#10B981', '#EC4899'],
        });
      } catch (e) {
        // Safe confetti fallback
      }
    } else if (currentStepIndex < snapshots.length - 1) {
      celebratedRef.current = false;
    }
  }, [currentStepIndex, snapshots.length]);

  // Autoplay loop timer
  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = Math.round(1800 / playbackSpeed);
    const timer = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev >= snapshots.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, snapshots.length]);

  const currentSnapshot = snapshots[currentStepIndex] || snapshots[0];
  const activePreset = UNIVERSE_PRESETS[currentTheme] || UNIVERSE_PRESETS.scifi;

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans">
      {/* 3-Zone Top Navigation Bar */}
      <TopBar
        currentAlgorithm={currentAlgorithm}
        onSelectAlgorithm={algo => {
          setCurrentAlgorithm(algo);
          setCurrentStepIndex(0);
          setIsPlaying(false);
        }}
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
        onOpenCastEditor={() => setIsCastEditorOpen(true)}
      />

      {/* Mobile Algorithm Selector Bar (Visible on < lg screens) */}
      <div className="lg:hidden px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex overflow-x-auto gap-2 text-xs">
        {[
          { id: 'bubble-sort', label: 'Tri à Bulles' },
          { id: 'quick-sort', label: 'Tri Rapide' },
          { id: 'binary-search', label: 'Recherche Binaire' },
          { id: 'dijkstra', label: 'Dijkstra' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => {
              setCurrentAlgorithm(item.id as AlgorithmType);
              setCurrentStepIndex(0);
              setIsPlaying(false);
            }}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              currentAlgorithm === item.id
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/50'
                : 'text-slate-400 bg-slate-800/60'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Theater Studio Layout */}
      <main className="flex-1 max-w-[1500px] w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* Two-Zone Primary Stage & Script Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (Stage + Transport Controls) - 8 cols on large screens */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* The Theatrical Stage Canvas */}
            <StageCanvas
              snapshot={currentSnapshot}
              algorithm={currentAlgorithm}
              universeStageName={activePreset.stageName}
            />

            {/* Playback & Transportation Controls */}
            <PlaybackBar
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying(!isPlaying)}
              currentStep={currentStepIndex}
              totalSteps={snapshots.length}
              onStepChange={step => {
                setCurrentStepIndex(step);
                setIsPlaying(false);
              }}
              speed={playbackSpeed}
              onSpeedChange={setPlaybackSpeed}
            />
          </div>

          {/* Right Column (Le Script du Spectacle Teleprompter) - 4 cols on large screens */}
          <div className="lg:col-span-4 h-full flex flex-col">
            <ScriptPrompter
              snapshots={snapshots}
              currentStepIndex={currentStepIndex}
              onSelectStep={step => {
                setCurrentStepIndex(step);
                setIsPlaying(false);
              }}
            />
          </div>
        </div>

        {/* Lower Educational Ribbon & Invariant Panel */}
        <AlgorithmInfoPanel
          algorithm={currentAlgorithm}
          loopInvariant={currentSnapshot.loopInvariant}
        />
      </main>

      {/* Cast & Data Customizer Modal */}
      <CastEditorModal
        isOpen={isCastEditorOpen}
        onClose={() => setIsCastEditorOpen(false)}
        cast={cast}
        onSaveCast={newCast => {
          setCast(newCast);
          setCurrentStepIndex(0);
          setIsPlaying(false);
        }}
        badgeConcept={activePreset.badgeConcept}
        isBinarySearch={currentAlgorithm === 'binary-search'}
        targetValue={binarySearchTarget}
        onSaveTargetValue={setBinarySearchTarget}
      />
    </div>
  );
}
