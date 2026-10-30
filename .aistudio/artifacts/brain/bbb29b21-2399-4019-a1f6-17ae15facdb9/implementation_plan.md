# Le Théâtre des Algorithmes Racontés

An interactive educational theater and algorithm simulation where core computer science algorithms (Bubble Sort, Quick Sort, Binary Search, and Dijkstra's Shortest Path) are staged as dramatic retro sci-fi starship plays. Characters politely dialogue, compare ranks, swap places, and navigate cosmic crossroads through animated speech bubbles, live play scripts, and custom data configuration.

## User Review & Critical Decisions

> [!IMPORTANT]
> The design and storytelling direction have been aligned with the user's preferences:
> - **Primary Narrative Theme**: **Retro Sci-Fi Starship Crew** ("L'Équipage de l'Astronef Hyperion" — Capitaine Stella, Android B0-B, Biologiste Orion, Ingénieure Nova, Dr. Quasar, Cadette Lyra). An in-app theme switcher also offers alternate universes (La Cour Royale and Les Animaux de la Forêt).
> - **Algorithms Included**: The comprehensive suite requested in the brief:
>   1. **Bubble Sort (Le Tri à Bulles)**: The polite airlock queue where crew members compare security clearance badges and excuse themselves to step ahead.
>   2. **Quick Sort (Le Tri Rapide)**: The Captain selects a "Pivot de Commandement" to divide the crew into vanguard and rearguard landing teams.
>   3. **Binary Search (La Recherche Binaire)**: The bridge officer queries the sorted archive cylinders, halving the search quadrant at each step with witty observations.
>   4. **Dijkstra's Shortest Path (Le Saut Hyperspatial)**: Navigating an interstellar beacon network, calculating ion fuel costs to plot the optimal warp route.
> - **Presentation Format**: **Interactive Theater Stage** with footlights, expressive speech bubbles, dynamic spotlighting on active actors, a synchronized dramatic play script teleprompter, and granular playback controls (Play, Pause, Step Next/Prev, Speed slider, Scrubber).

---

## 1. Overview & Core Concept

- **What It Does**: Transforms abstract, dry algorithmic mechanics into theatrical drama. When Bubble Sort runs, rather than colored bars shifting indices, two illustrated characters interact on stage: one bows, presents their clearance badge number, delivers a character-specific line ("*Pardonnez-moi ingénieure, mais mon badge 88 a priorité d'accès au réacteur sur votre badge 42 !*"), and smoothly swaps positions while the stage prompter updates the theatrical script.
- **Target Audience**: Students, educators, developers, and tech enthusiasts seeking intuitive, human-centered mental models for algorithm mechanics, loop invariants, and algorithmic complexities ($O(n^2)$, $O(n \log n)$, $O(\log n)$, $O(V + E \log V)$).
- **Key Value**: Replaces mechanical animation with relatable narrative intuition, making algorithms unforgettable through character personas, voice dialogue cues, and interactive control.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **The Stage Curtain Rises (Zero-State)**:
   - The user arrives at the Hyperion Command Stage. Footlights glow at the base of the proscenium arch.
   - The current algorithm is pre-loaded with an ensemble cast of 6–8 distinct crew members standing on marked stage positions.
   - The user clicks **"Lancer la Représentation" (Play)**: the director calls "En scène !", the spotlight dims around non-actors, and focus highlights the first two characters.
2. **Step-by-Step Theatrical Performance**:
   - The active actors turn toward each other. A crisp retro comic speech bubble pops up with their spoken dialogue and badge values.
   - If a swap is required, a stage direction animates their position swap with physics-based spring transitions.
   - Simultaneously, the **Script du Spectacle (Teleprompter)** on the right logs the exact act, scene, and line, with timestamps and algorithmic commentary.
3. **Director's Control Deck (Play & Inspection)**:
   - The user can pause anytime, step backward or forward one dramatic beat, adjust the performance cadence ($0.5\times$ to $3\times$), or drag the scene progress scrubber.
4. **Cast & Data Customizer (La Loge des Comédiens)**:
   - Users can click "Personnaliser la Troupe" to change names, badge values (numbers), ranks, dialogue temperaments (Polite, Dramatic, Robotic, Cynical), or generate random, reversed, or nearly sorted scenarios.
5. **Cosmic Route Planner (Dijkstra Mode)**:
   - The stage shifts to an interactive interstellar star chart where the pilot calculates the safest path through space beacons, evaluating path costs with narrative travel logs.

### Visual Identity & Theme

- **Aesthetic Direction**: 1970s French Retro Sci-Fi Theater (vintage Franco-Belgian space opera meets classical Molière theatrical staging). Clean hairline console borders, subtle brass footlights, velvet deep space curtain tones, and sharp typography.
- **Color Palette & Distribution (60-30-10 Rule)**:
  - **60% Dominant Canvas**: Deep Space Navy (`#0A0E1A`) and Dark Deck Slate (`#111827`).
  - **30% Structural Surfaces**: Stage flooring (`#161F30`), console frames (`#1F293D`), hairline dividers (`rgba(255,255,255,0.08)`), and script paper panel (`#0D1322`).
  - **10% Semantic Accents**:
    - *Spotlight Gold*: `#F59E0B` (active actor spotlight & highlighted dialogue).
    - *Retro Cyan*: `#06B6D4` (nominal clearance / radar beacons / calm crew).
    - *Warning Amber*: `#F97316` (comparison / swap in progress).
    - *Success Emerald*: `#10B981` (sorted status / path locked / target found).
    - *Alert Crimson*: `#EF4444` (out of range / eliminated partition).
- **Typography & Scale**:
  - *Display / Stage Titles*: `Plus Jakarta Sans` or `Outfit` (Bold, clean geometric hierarchy).
  - *Dramatic Script & Dialogue*: `DM Sans` (natural, highly readable narrative prose).
  - *Data & Telemetry Ranks*: `Space Mono` (`tabular-nums` for badge numbers, indices, fuel weights, and time complexity $O$).
- **Anti-Slop Discipline**:
  - Zero pill containers on static metadata; characters display clean badges with clear rank names.
  - Buttons use plain human labels ("Lire", "Pause", "Étape suivante", "Réinitialiser", "Modifier la troupe").
  - No decorative pulsing dots or fake compiler strings; authentic telemetry and theater cues only.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Pre-computed Snapshot Engine vs. Asynchronous Loop State**
  - *Chosen Approach*: Pure deterministic pre-computation of all execution frames and narrative dialogues.
  - *Why*: Allows instantaneous, zero-latency scrubbing back and forth through the story timeline without async race conditions or desynced speech bubble animations.
  - *Alternatives Considered*: Asynchronous `async/await` state loops (rejected because stepping backward is brittle and scrubbing causes glitchy states).
- **Decision 2: Narrative Generation Architecture**
  - *Chosen Approach*: Dynamic context-aware template generator with character persona voice matrices (each character has a distinct personality: Captain = formal & resolute, Android = probability-obsessed & polite, Biologist = curious, Nova = energetic engineer).
  - *Why*: Guarantees instant performance without API latency, while ensuring hilarious, natural, and pedagogically clear French dialogue that adapts accurately to any user-entered numbers.
- **Decision 3: Multi-Theme Support**
  - *Chosen Approach*: Retro Sci-Fi Starship as the flagship theme, with quick-switch toggles for "Cour Royale" (Nobles & Courtiers) and "Fable Forestière" (Woodland Critters).
  - *Why*: Delivers the user's explicit preference while preserving the playful universality of the "Théâtre des Algorithmes".

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Le Théâtre des Algorithmes                      │
├────────────────────────────────────────────────────────────────────────┤
│  Top Bar: [Le Théâtre des Algorithmes] ── [Tri Bulles | Tri Rapide |   │
│             Recherche Binaire | Dijkstra] ── [Changer d'Univers]       │
├───────────────────────────────────┬────────────────────────────────────┤
│           STAGE VIEW (65%)        │        CONTROL & SCRIPT (35%)      │
│ ┌───────────────────────────────┐ │ ┌────────────────────────────────┐ │
│ │  Proscenium Arch & Stage      │ │ │ Playback Controls (Play/Pause, │ │
│ │  Spotlights & Footlights      │ │ │ Step, Cadence, Scrubber)       │ │
│ │                               │ │ ├────────────────────────────────┤ │
│ │  [Actor 1]   [Actor 2 (Swap)] │ │ │ Le Script du Spectacle         │ │
│ │  "Pardon!"   "Je vous prie!"  │ │ │ (Live Teleprompter / Acts)     │ │
│ │    [💬]           [💬]         │ │ ├────────────────────────────────┤ │
│ │  (Badge 12)   (Badge 45)      │ │ │ Régie de la Troupe             │ │
│ │                               │ │ │ (Cast Editor & Data Presets)   │ │
│ └───────────────────────────────┘ │ └────────────────────────────────┘ │
├───────────────────────────────────┴────────────────────────────────────┤
│  Educational Ribbon: Algorithmic Invariants, Complexity ($O$) & Morale │
└────────────────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

- `App.tsx`: Top header navigation, current algorithm state, theme selection, master snapshot player hook.
- `src/components/theater/StageCanvas.tsx`: Visual proscenium stage with spotlights, actor podiums, smooth position swapping, and dynamic comic speech bubbles.
- `src/components/theater/CharacterAvatar.tsx`: Expressive vector retro sci-fi character figures with uniforms, rank insignias, emotions (idle, questioning, surprised, proud).
- `src/components/theater/ScriptPrompter.tsx`: Theatrical play script display logging acts, dialogue lines, character names, and stage directions with autoscroll.
- `src/components/theater/PlaybackBar.tsx`: Media player bar with Play/Pause, Step Prev/Next, speed multiplier ($0.5\times$, $1\times$, $1.5\times$, $2\times$), and timeline scrubber.
- `src/components/theater/CastEditorModal.tsx`: Modal to customize crew members (names, badges/values, order, archetypes, and presets: Random, Inverted, Nearly Sorted, Duplicates).
- `src/components/algorithms/`:
  - `bubbleSortStory.ts`: Generates bubble sort scenes, comparisons, polite swaps, and pass completion dialogues.
  - `quickSortStory.ts`: Generates pivot election, vanguard/rearguard partitioning, and recursive landing team assembly.
  - `binarySearchStory.ts`: Generates logarithmic quadrant searches, mid-point calculations, and targeted discoveries.
  - `dijkstraStory.ts`: Interstellar beacon graph, distance relaxations, and warp trail discovery.
- `src/types/theater.ts`: Data types for Character, DialogueLine, StageSnapshot, AlgorithmStep, ThemeUniverse.

---

## 5. Verification & Implementation Sequence

1. **Step 1 - Data & Story Engine**: Define TypeScript models and implement deterministic generators for Bubble Sort, Quick Sort, Binary Search, and Dijkstra with contextual French dialogues.
2. **Step 2 - Theatrical Stage Component**: Construct the responsive stage canvas with spotlighting, podium tracks, actor avatars, and speech bubble layouts.
3. **Step 3 - Playback & Teleprompter Controls**: Integrate playback state (Play/Pause, Step, Scrub, Speed) and the live auto-scrolling theatrical script.
4. **Step 4 - Cast Customizer & Presets**: Build the character and scenario editor with quick preset configurations and badge inputs.
5. **Step 5 - Testing & Build Verification**: Execute `compile_applet` and test all algorithms and user flows to guarantee 0 errors.
