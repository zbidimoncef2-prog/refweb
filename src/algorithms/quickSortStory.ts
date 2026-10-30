import { Character, StageSnapshot, UniverseTheme } from '../types/theater';

export function generateQuickSortStory(
  initialCast: Character[],
  theme: UniverseTheme
): StageSnapshot[] {
  const snapshots: StageSnapshot[] = [];
  const actors = initialCast.map(c => ({ ...c }));
  const n = actors.length;
  const lockedIndices = new Set<number>();

  snapshots.push({
    stepIndex: 0,
    totalSteps: 0,
    action: 'idle',
    actTitle: 'Prologue : L’Expédition Téléportée',
    sceneTitle: 'Stratégie de Partitionnement de la Troupe',
    actors: actors.map(a => ({ ...a })),
    activeActorIds: [],
    speechBubbles: [
      {
        speakerId: actors[0]?.id || 'c1',
        speakerName: actors[0]?.name || 'Capitaine',
        text: 'Pour téléporter l’équipage sur la planète, nous appliquons la stratégie impériale : Diviser pour Régner (Tri Rapide) !',
        tone: 'dramatic',
      },
    ],
    stageDirection: 'L’ensemble de la troupe se rassemble au centre de la passerelle.',
    technicalExplanation: 'Initialisation de Quicksort. Complexité moyenne : O(N log N). Meilleur pivot : médiane.',
    loopInvariant: 'Aucune partition n’est encore fixée.',
  });

  let sceneCounter = 1;

  function quickSortHelper(low: number, high: number, depth: number) {
    if (low >= high) {
      if (low === high) {
        lockedIndices.add(low);
        snapshots.push({
          stepIndex: snapshots.length,
          totalSteps: 0,
          action: 'complete',
          actTitle: `Acte ${depth} : Sous-groupe unitaire`,
          sceneTitle: `${actors[low].name} est seul dans son segment`,
          actors: actors.map(a => ({ ...a })),
          activeActorIds: [actors[low].id],
          speechBubbles: [
            {
              speakerId: actors[low].id,
              speakerName: actors[low].name,
              text: `Étant seul dans ce sous-secteur, mon placement (${actors[low].badgeValue}) est naturellement parfait !`,
              tone: 'polite',
            },
          ],
          stageDirection: `${actors[low].name} prend place avec sérénité.`,
          technicalExplanation: `Condition d'arrêt : segment de longueur 1 déjà trié.`,
          loopInvariant: `L’élément d’indice ${low} est verrouillé.`,
          sortedIndices: Array.from(lockedIndices),
        });
      }
      return;
    }

    // Choose pivot: we take the last element of the partition (high)
    const pivot = actors[high];
    const pivotIndex = high;

    snapshots.push({
      stepIndex: snapshots.length,
      totalSteps: 0,
      action: 'pivot',
      actTitle: `Acte ${depth} : Élection de la Balise Pivot`,
      sceneTitle: `${pivot.name} (Badge ${pivot.badgeValue}) devient le repère`,
      actors: actors.map(a => ({ ...a })),
      activeActorIds: [pivot.id],
      pivotIndex: high,
      searchRange: [low, high],
      speechBubbles: [
        {
          speakerId: pivot.id,
          speakerName: pivot.name,
          text: `Je suis la balise pivot (${pivot.badgeValue}) ! Que tous ceux dont le badge est inférieur se placent à ma gauche, et les supérieurs à ma droite !`,
          tone: 'triumphant',
        },
      ],
      stageDirection: `${pivot.name} s'avance sur l'estrade dorée sous un faisceau lumineux zénithal.`,
      technicalExplanation: `Sélection du pivot : pivot = actors[${high}].badgeValue (${pivot.badgeValue}). Intervalle [${low}..${high}].`,
      loopInvariant: `Tous les éléments < pivot iront à gauche de sa future position.`,
      sortedIndices: Array.from(lockedIndices),
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      const current = actors[j];
      const isSmaller = current.badgeValue < pivot.badgeValue;

      snapshots.push({
        stepIndex: snapshots.length,
        totalSteps: 0,
        action: 'compare',
        actTitle: `Acte ${depth} : Examen #${sceneCounter++}`,
        sceneTitle: `Comparaison entre ${current.name} et le Pivot ${pivot.name}`,
        actors: actors.map(a => ({ ...a })),
        activeActorIds: [current.id, pivot.id],
        comparingIndices: [j, high],
        pivotIndex: high,
        searchRange: [low, high],
        speechBubbles: [
          {
            speakerId: current.id,
            speakerName: current.name,
            text: `Mon badge est de ${current.badgeValue}. Est-il inférieur à votre balise ${pivot.badgeValue} ?`,
            tone: 'questioning',
            side: 'left',
          },
          {
            speakerId: pivot.id,
            speakerName: pivot.name,
            text: isSmaller
              ? `Oui ! ${current.badgeValue} < ${pivot.badgeValue}. Vous intégrez l’équipe d'avant-garde à gauche !`
              : `Non ! ${current.badgeValue} ≥ ${pivot.badgeValue}. Vous demeurez côté arrière-garde !`,
            tone: isSmaller ? 'triumphant' : 'analytical',
            side: 'right',
          },
        ],
        stageDirection: `${current.name} s’incline devant la balise pivot pour faire vérifier son accréditation.`,
        technicalExplanation: `Test de partition : actors[${j}] (${current.badgeValue}) < pivot (${pivot.badgeValue}) -> ${isSmaller}.`,
        loopInvariant: `La frontière de l’avant-garde avance si l’élément est plus petit.`,
        sortedIndices: Array.from(lockedIndices),
      });

      if (isSmaller) {
        i++;
        if (i !== j) {
          const temp = actors[i];
          actors[i] = actors[j];
          actors[j] = temp;

          snapshots.push({
            stepIndex: snapshots.length,
            totalSteps: 0,
            action: 'swap',
            actTitle: `Acte ${depth} : Reclassement d’Avant-Garde`,
            sceneTitle: `Permutation entre ${actors[i].name} et ${actors[j].name}`,
            actors: actors.map(a => ({ ...a })),
            activeActorIds: [actors[i].id, actors[j].id],
            swappedIndices: [i, j],
            pivotIndex: high,
            searchRange: [low, high],
            speechBubbles: [
              {
                speakerId: actors[i].id,
                speakerName: actors[i].name,
                text: `Je rejoins la zone avant-garde en position ${i + 1} ! Merci pour l’aiguillage !`,
                tone: 'polite',
                side: 'left',
              },
            ],
            stageDirection: `${actors[i].name} et ${actors[j].name} exécutent une volte-face amicale.`,
            technicalExplanation: `swap(actors[${i}], actors[${j}]). On rassemble les badges inférieurs vers le début de la partition.`,
            loopInvariant: `Tous les éléments de [${low}..${i}] sont strictement inférieurs au pivot.`,
            sortedIndices: Array.from(lockedIndices),
          });
        }
      }
    }

    // Place pivot in its true final location (i + 1)
    const finalPivotPos = i + 1;
    const temp = actors[finalPivotPos];
    actors[finalPivotPos] = actors[high];
    actors[high] = temp;

    lockedIndices.add(finalPivotPos);

    snapshots.push({
      stepIndex: snapshots.length,
      totalSteps: 0,
      action: 'complete',
      actTitle: `Acte ${depth} : Sacre du Pivot`,
      sceneTitle: `${pivot.name} s’installe à sa place définitive`,
      actors: actors.map(a => ({ ...a })),
      activeActorIds: [pivot.id],
      swappedIndices: [finalPivotPos, high],
      pivotIndex: finalPivotPos,
      searchRange: [low, high],
      speechBubbles: [
        {
          speakerId: pivot.id,
          speakerName: pivot.name,
          text: `Mission accomplie ! Je prends mon siège définitif en position ${finalPivotPos + 1}. À ma gauche, tous les inférieurs ; à ma droite, tous les supérieurs !`,
          tone: 'triumphant',
        },
      ],
      stageDirection: `${pivot.name} s'assoit solennellement dans son fauteuil de commandement.`,
      technicalExplanation: `Placement final du pivot à l'indice ${finalPivotPos}. Invariant de partition vérifié.`,
      loopInvariant: `actors[low..${finalPivotPos - 1}] ≤ pivot ≤ actors[${finalPivotPos + 1}..high].`,
      sortedIndices: Array.from(lockedIndices),
    });

    // Recurse left and right
    quickSortHelper(low, finalPivotPos - 1, depth + 1);
    quickSortHelper(finalPivotPos + 1, high, depth + 1);
  }

  quickSortHelper(0, n - 1, 1);

  // Grand Finale
  snapshots.push({
    stepIndex: snapshots.length,
    totalSteps: 0,
    action: 'complete',
    actTitle: 'Apothéose : Téléportation Réussie',
    sceneTitle: 'Toute la Troupe est Parfaitement Triée',
    actors: actors.map(a => ({ ...a })),
    activeActorIds: actors.map(a => a.id),
    speechBubbles: [
      {
        speakerId: actors[0].id,
        speakerName: actors[0].name,
        text: 'Grâce au Tri Rapide, chaque faction a trouvé sa place à vitesse grand V ! Téléportation imminente !',
        tone: 'triumphant',
      },
    ],
    stageDirection: 'Tous les membres de l’équipage saluent le public alors que le téléporteur vibre de lumière cyan.',
    technicalExplanation: 'Quicksort terminé en temps O(N log N). Tableau entièrement trié.',
    loopInvariant: 'Le tableau entier est maintenant totalement ordonné.',
    sortedIndices: actors.map((_, idx) => idx),
  });

  const total = snapshots.length;
  snapshots.forEach(s => {
    s.totalSteps = total;
  });

  return snapshots;
}
