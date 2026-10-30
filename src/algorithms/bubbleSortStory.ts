import { Character, StageSnapshot, UniverseTheme } from '../types/theater';

export function generateBubbleSortStory(
  initialCast: Character[],
  theme: UniverseTheme
): StageSnapshot[] {
  const snapshots: StageSnapshot[] = [];
  const actors = initialCast.map(c => ({ ...c }));
  const n = actors.length;
  const sortedIndices: number[] = [];

  // Snapshot 0: The Prologue / Setup
  snapshots.push({
    stepIndex: 0,
    totalSteps: 0, // will be updated at the end
    action: 'idle',
    actTitle: 'Prologue : Rassemblement devant le Sas',
    sceneTitle: 'Alignement initial de l’équipage',
    actors: actors.map(a => ({ ...a })),
    activeActorIds: [],
    speechBubbles: [
      {
        speakerId: actors[0]?.id || 'c1',
        speakerName: actors[0]?.name || 'Officier',
        text: 'Attention équipage ! Avant l’ouverture du sas hyper-spatial, nous devons former un rang strict selon nos accréditations.',
        tone: 'polite',
      },
    ],
    stageDirection: 'Les comédiens entrent en scène et se placent dans le désordre le plus complet.',
    technicalExplanation: 'Initialisation du tableau de taille N = ' + n + '. Complexité pire cas : O(N²).',
    loopInvariant: 'Aucun élément n’est encore garanti d’être à sa place définitive.',
  });

  let actNum = 1;

  for (let i = 0; i < n - 1; i++) {
    let swappedInThisPass = false;

    // Beginning of a pass
    snapshots.push({
      stepIndex: snapshots.length,
      totalSteps: 0,
      action: 'idle',
      actTitle: `Acte ${actNum} : Balayage du rang #${i + 1}`,
      sceneTitle: `Début du cycle de vérification de gauche à droite`,
      actors: actors.map(a => ({ ...a })),
      activeActorIds: [actors[0].id, actors[1].id],
      speechBubbles: [
        {
          speakerId: actors[0].id,
          speakerName: actors[0].name,
          text: `Début du passage ${i + 1} ! Vérifions chaque paire d’insignes, de la gauche vers la droite.`,
          tone: 'polite',
        },
      ],
      stageDirection: `L’officier en tête de file se tourne vers son voisin direct avec courtoisie.`,
      technicalExplanation: `Boucle externe i = ${i}. On va comparer les paires adjacentes jusqu’à l’index ${n - 1 - i}.`,
      loopInvariant: `Les ${i} derniers éléments (à partir de l’index ${n - i}) sont déjà triés et immobiles.`,
      sortedIndices: [...sortedIndices],
    });

    for (let j = 0; j < n - 1 - i; j++) {
      const left = actors[j];
      const right = actors[j + 1];

      // Comparison step
      const needSwap = left.badgeValue > right.badgeValue;

      snapshots.push({
        stepIndex: snapshots.length,
        totalSteps: 0,
        action: 'compare',
        actTitle: `Acte ${actNum} : Scène ${j + 1}`,
        sceneTitle: `Dialogue de préséance entre ${left.name} et ${right.name}`,
        actors: actors.map(a => ({ ...a })),
        activeActorIds: [left.id, right.id],
        comparingIndices: [j, j + 1],
        speechBubbles: [
          {
            speakerId: left.id,
            speakerName: left.name,
            text: `Bonjour ${right.name} ! Mon badge indique ${left.badgeValue}, et le vôtre affiche ${right.badgeValue}.`,
            tone: 'polite',
            side: 'left',
          },
          {
            speakerId: right.id,
            speakerName: right.name,
            text: needSwap
              ? `En effet, ${left.badgeValue} > ${right.badgeValue} ! Selon le protocole, vous devez passer devant moi.`
              : `Parfaitement en règle (${left.badgeValue} ≤ ${right.badgeValue}). Nous pouvons conserver nos places.`,
            tone: needSwap ? 'exclamatory' : 'polite',
            side: 'right',
          },
        ],
        stageDirection: `${left.name} et ${right.name} se saluent avec politesse et comparent leurs accréditations respectives.`,
        technicalExplanation: `Comparaison : actors[${j}].badgeValue (${left.badgeValue}) > actors[${j + 1}].badgeValue (${right.badgeValue}) ? -> ${needSwap ? 'VRAI (Échange requis)' : 'FAUX (Ordre respecté)'}.`,
        loopInvariant: `Tous les éléments après l’indice ${n - 1 - i} restent ordonnés.`,
        sortedIndices: [...sortedIndices],
      });

      if (needSwap) {
        // Swap elements in actors array
        const temp = actors[j];
        actors[j] = actors[j + 1];
        actors[j + 1] = temp;
        swappedInThisPass = true;

        snapshots.push({
          stepIndex: snapshots.length,
          totalSteps: 0,
          action: 'swap',
          actTitle: `Acte ${actNum} : Scène ${j + 1}b (La Cession Polie)`,
          sceneTitle: `${left.name} double poliment ${right.name}`,
          actors: actors.map(a => ({ ...a })),
          activeActorIds: [left.id, right.id],
          swappedIndices: [j, j + 1],
          speechBubbles: [
            {
              speakerId: left.id,
              speakerName: left.name,
              text: `Mille mercis pour votre civisme ! Je passe en position ${j + 2}.`,
              tone: 'triumphant',
              side: 'right',
            },
            {
              speakerId: right.id,
              speakerName: right.name,
              text: `Je vous en prie ! La rigueur de l'algorithme fait la fierté de notre équipage.`,
              tone: 'polite',
              side: 'left',
            },
          ],
          stageDirection: `${left.name} et ${right.name} s’échangent leurs podiums d’un pas coordonné et gracieux.`,
          technicalExplanation: `swap(actors[${j}], actors[${j + 1}]). Le plus grand badge progresse vers la droite telle une bulle d'air remontant à la surface.`,
          loopInvariant: `Le maximum de la sous-liste [0..${j + 1}] se trouve maintenant en position ${j + 1}.`,
          sortedIndices: [...sortedIndices],
        });
      }
    }

    // Element at n - 1 - i is now guaranteed to be sorted
    sortedIndices.push(n - 1 - i);
    const lockedActor = actors[n - 1 - i];

    snapshots.push({
      stepIndex: snapshots.length,
      totalSteps: 0,
      action: 'idle',
      actTitle: `Fin de l’Acte ${actNum}`,
      sceneTitle: `Couronnement de ${lockedActor.name} à sa place définitive`,
      actors: actors.map(a => ({ ...a })),
      activeActorIds: [lockedActor.id],
      speechBubbles: [
        {
          speakerId: lockedActor.id,
          speakerName: lockedActor.name,
          text: `Mon accréditation ${lockedActor.badgeValue} est la plus haute de ce passage. Je prends mon poste définitif au sas !`,
          tone: 'triumphant',
        },
      ],
      stageDirection: `${lockedActor.name} salue l’assemblée ; son socle s’illumine d’un vert émeraude officiel.`,
      technicalExplanation: `L’élément d’indice ${n - 1 - i} est désormais à sa position finale garantie.`,
      loopInvariant: `La sous-liste [${n - 1 - i}..${n - 1}] est entièrement et irrévocablement triée.`,
      sortedIndices: [...sortedIndices],
    });

    actNum++;

    // Early termination optimization if no swaps
    if (!swappedInThisPass) {
      snapshots.push({
        stepIndex: snapshots.length,
        totalSteps: 0,
        action: 'idle',
        actTitle: `Révélation Anticipée`,
        sceneTitle: `Aucun échange n’a été nécessaire !`,
        actors: actors.map(a => ({ ...a })),
        activeActorIds: actors.map(a => a.id),
        speechBubbles: [
          {
            speakerId: actors[0].id,
            speakerName: actors[0].name,
            text: `Constat admirable : aucun membre n’a eu à céder sa place lors de ce passage ! Tout l'équipage est ordonné !`,
            tone: 'triumphant',
          },
        ],
        stageDirection: `Tous les acteurs se redressent fièrement à l’unisson.`,
        technicalExplanation: `Optimisation du Tri à Bulles : le flag swapped == false permet d'interrompre le tri en temps O(N).`,
        loopInvariant: `L'ensemble du tableau est entièrement trié.`,
        sortedIndices: actors.map((_, idx) => idx),
      });
      break;
    }
  }

  // Ensure all indices are sorted in final snapshot
  const allIndices = actors.map((_, idx) => idx);

  // Grand Finale
  snapshots.push({
    stepIndex: snapshots.length,
    totalSteps: 0,
    action: 'complete',
    actTitle: 'Épilogue Triomphal',
    sceneTitle: 'Le Sas s’ouvre : Saluts de la troupe',
    actors: actors.map(a => ({ ...a })),
    activeActorIds: actors.map(a => a.id),
    speechBubbles: [
      {
        speakerId: actors[0].id,
        speakerName: actors[0].name,
        text: 'La file est parfaitement harmonieuse, du plus modeste insigne jusqu’au plus prestigieux ! Le sas peut s’ouvrir !',
        tone: 'triumphant',
      },
    ],
    stageDirection: 'La troupe entière s’incline devant les projecteurs sous une pluie d’étoiles d’artifice.',
    technicalExplanation: 'Tri à Bulles complété avec succès. Tableau trié par ordre croissant.',
    loopInvariant: '∀ k ∈ [0..N-2], actors[k].badgeValue ≤ actors[k+1].badgeValue.',
    sortedIndices: allIndices,
  });

  // Stamp total steps on all snapshots
  const total = snapshots.length;
  snapshots.forEach(s => {
    s.totalSteps = total;
  });

  return snapshots;
}
