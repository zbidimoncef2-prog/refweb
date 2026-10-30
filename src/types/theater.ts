export type AlgorithmType = 'bubble-sort' | 'quick-sort' | 'binary-search' | 'dijkstra';

export type UniverseTheme = 'scifi' | 'royal' | 'forest';

export type Temperament = 'polite' | 'dramatic' | 'analytical' | 'rebel';

export interface Character {
  id: string;
  name: string;
  role: string;
  badgeValue: number;
  avatarKey: string;
  accentColor: string;
  temperament: Temperament;
}

export type StageAction =
  | 'idle'
  | 'compare'
  | 'swap'
  | 'pivot'
  | 'partition'
  | 'inspect'
  | 'found'
  | 'not-found'
  | 'eliminate'
  | 'relax-edge'
  | 'complete';

export interface SpeechBubble {
  speakerId: string;
  speakerName: string;
  text: string;
  tone: 'polite' | 'exclamatory' | 'robotic' | 'triumphant' | 'questioning' | 'analytical' | 'dramatic';
  side?: 'left' | 'right' | 'center';
}

export interface DijkstraNode {
  id: string;
  name: string;
  stationType: string;
  x: number;
  y: number;
  fuelCost: number;
  visited: boolean;
  isCurrent: boolean;
  isTarget: boolean;
  character: Character;
}

export interface DijkstraEdge {
  id: string;
  from: string;
  to: string;
  weight: number;
  isActive: boolean;
  isShortestPath: boolean;
}

export interface DijkstraGraphState {
  nodes: DijkstraNode[];
  edges: DijkstraEdge[];
  startNodeId: string;
  targetNodeId: string;
  currentNeighborId?: string;
}

export interface StageSnapshot {
  stepIndex: number;
  totalSteps: number;
  action: StageAction;
  actTitle: string;
  sceneTitle: string;
  actors: Character[];
  activeActorIds: string[];
  comparingIndices?: [number, number];
  swappedIndices?: [number, number];
  sortedIndices?: number[];
  pivotIndex?: number;
  searchRange?: [number, number];
  targetValue?: number;
  speechBubbles: SpeechBubble[];
  stageDirection: string;
  technicalExplanation: string;
  loopInvariant: string;
  graphState?: DijkstraGraphState;
}

export interface UniversePreset {
  id: UniverseTheme;
  title: string;
  tagline: string;
  stageName: string;
  badgeConcept: string;
  defaultCast: Character[];
}
