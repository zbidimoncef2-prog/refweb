import { Character, StageSnapshot, UniverseTheme } from '../types/theater';

export function generateBinarySearchStory(
  initialCast: Character[],
  theme: UniverseTheme,
  customTargetValue?: number
): StageSnapshot[] {
  const snapshots: StageSnapshot[] = [];
  // Ensure actors are sorted by badgeValue for Binary Search
  const actors = [...initialCast].sort((a, b) => a.badgeValue - b.badgeValue);
  const n = actors.length;

  // Pick target value (default to a middle-high actor or custom)
  const targetVal =
    customTargetValue !== undefined
      ? customTargetValue
      : actors[Math.floor(n * 0.65)]?.badgeValue || actors[0].badgeValue;

  const targetActor = actors.find(a => a.badgeValue === targetVal);

  snapshots.push({
    stepIndex: 0,
    totalSteps: 0,
    action: 'idle',
    actTitle: 'Prologue : L’Avis de Recherche Spatial',
    sceneTitle: `Recherche de l’accréditation secrète #${targetVal}`,
    actors: actors.map(a => ({ ...a })),
    activeActorIds: [],
    targetValue: targetVal,
    searchRange: [0, n - 1],
    speechBubbles: [
      {
        speakerId: actors[0]?.id || 'c1',
        speakerName: actors[0]?.name || 'Officier',
        text: `Urgence galactique ! Nous devons retrouver immédiatement l’officier détenteur du badge #${targetVal} !`,
        tone: 'exclamatory',
      },
      {
        speakerId: actors[1]?.id || 'c2',
        speakerName: actors[1]?.name || 'Android',
        text: `Pas de panique. Notre rangée est déjà triée par ordre croissant. La Recherche Binaire divisera notre temps d'exploration par deux à chaque coup !`,
        tone: 'robotic',
      },
    ],
    stageDirection: 'Les membres d’équipage se tiennent droits sur leurs podiums triés.',
    technicalExplanation: `Recherche Dichotomique (Binary Search). Complexité temporelle logarithmique : O(log₂ N). Espace : O(1).`,
    loopInvariant: `Si l'élément cible existe, il réside obligatoirement dans l'intervalle [low..high].`,
  });

  let low = 0;
  let high = n - 1;
  let stepCounter = 1;
  let found = false;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midActor = actors[mid];

    snapshots.push({
      stepIndex: snapshots.length,
      totalSteps: 0,
      action: 'inspect',
      actTitle: `Acte I : Division #${stepCounter}`,
      sceneTitle: `Vérification du membre médian : ${midActor.name} (Position ${mid + 1})`,
      actors: actors.map(a => ({ ...a })),
      activeActorIds: [midActor.id],
      pivotIndex: mid,
      searchRange: [low, high],
      targetValue: targetVal,
      speechBubbles: [
        {
          speakerId: midActor.id,
          speakerName: midActor.name,
          text: `Je suis pile au centre de l'intervalle [${low + 1}..${high + 1}] ! Mon badge est le #${midActor.badgeValue}.`,
          tone: 'analytical',
        },
      ],
      stageDirection: `Le projecteur principal descend sur ${midActor.name} tandis que les bornes [${low + 1}..${high + 1}] clignotent en cyan.`,
      technicalExplanation: `Calcul de l'indice médian : mid = floor((${low} + ${high}) / 2) = ${mid}. Valeur observée = ${midActor.badgeValue}. Cible = ${targetVal}.`,
      loopInvariant: `Cible ∈ [${low}..${high}]. Éléments restants à explorer : ${high - low + 1}.`,
    });

    if (midActor.badgeValue === targetVal) {
      found = true;
      snapshots.push({
        stepIndex: snapshots.length,
        totalSteps: 0,
        action: 'found',
        actTitle: `Apothéose : Identité Confirmée !`,
        sceneTitle: `${midActor.name} détient précisément le badge #${targetVal}`,
        actors: actors.map(a => ({ ...a })),
        activeActorIds: [midActor.id],
        pivotIndex: mid,
        searchRange: [mid, mid],
        targetValue: targetVal,
        speechBubbles: [
          {
            speakerId: midActor.id,
            speakerName: midActor.name,
            text: `BINGO ! Mon badge #${midActor.badgeValue} correspond à l’accréditation recherchée ! Mission accomplie en seulement ${stepCounter} divisions !`,
            tone: 'triumphant',
          },
        ],
        stageDirection: `Une aura émeraude enveloppe ${midActor.name} sous les applaudissements de la passerelle.`,
        technicalExplanation: `Succès : actors[${mid}].badgeValue == ${targetVal}. Trouvé en ${stepCounter} comparaisons au lieu de ${n} en recherche linéaire !`,
        loopInvariant: `Élément trouvé à l'indice ${mid}. Terminaison immédiate.`,
        sortedIndices: [mid],
      });
      break;
    } else if (midActor.badgeValue < targetVal) {
      // Eliminate left side
      const eliminatedRange = [low, mid];
      snapshots.push({
        stepIndex: snapshots.length,
        totalSteps: 0,
        action: 'eliminate',
        actTitle: `Acte I : Élimination de l’Aile Gauche`,
        sceneTitle: `Tous les badges ≤ ${midActor.badgeValue} sont trop bas`,
        actors: actors.map(a => ({ ...a })),
        activeActorIds: actors.slice(low, mid + 1).map(a => a.id),
        pivotIndex: mid,
        searchRange: [low, high],
        targetValue: targetVal,
        speechBubbles: [
          {
            speakerId: midActor.id,
            speakerName: midActor.name,
            text: `Puisque mon badge (${midActor.badgeValue}) est inférieur à la cible (${targetVal}), toute l’aile gauche jusqu'à moi est disculpée !`,
            tone: 'polite',
          },
        ],
        stageDirection: `Les acteurs de la position ${low + 1} à ${mid + 1} font un pas en arrière dans l'ombre.`,
        technicalExplanation: `actors[mid] < target -> la cible se trouve obligatoirement à droite. Nouvel intervalle : low = mid + 1 = ${mid + 1}.`,
        loopInvariant: `Tout indice k ≤ ${mid} vérifie actors[k] < target.`,
      });
      low = mid + 1;
    } else {
      // Eliminate right side
      snapshots.push({
        stepIndex: snapshots.length,
        totalSteps: 0,
        action: 'eliminate',
        actTitle: `Acte I : Élimination de l’Aile Droite`,
        sceneTitle: `Tous les badges ≥ ${midActor.badgeValue} sont trop hauts`,
        actors: actors.map(a => ({ ...a })),
        activeActorIds: actors.slice(mid, high + 1).map(a => a.id),
        pivotIndex: mid,
        searchRange: [low, high],
        targetValue: targetVal,
        speechBubbles: [
          {
            speakerId: midActor.id,
            speakerName: midActor.name,
            text: `Mon badge (${midActor.badgeValue}) dépasse la cible (${targetVal}) ! Toute l'aile droite jusqu'à moi peut se retirer du dossier !`,
            tone: 'polite',
          },
        ],
        stageDirection: `Les comédiens de la position ${mid + 1} à ${high + 1} saluent poliment et reculent dans la pénombre.`,
        technicalExplanation: `actors[mid] > target -> la cible se trouve obligatoirement à gauche. Nouvel intervalle : high = mid - 1 = ${mid - 1}.`,
        loopInvariant: `Tout indice k ≥ ${mid} vérifie actors[k] > target.`,
      });
      high = mid - 1;
    }

    stepCounter++;
  }

  if (!found) {
    snapshots.push({
      stepIndex: snapshots.length,
      totalSteps: 0,
      action: 'not-found',
      actTitle: `Épilogue : Enquête Infructueuse`,
      sceneTitle: `Le badge #${targetVal} n’existe pas dans cet équipage`,
      actors: actors.map(a => ({ ...a })),
      activeActorIds: [],
      targetValue: targetVal,
      speechBubbles: [
        {
          speakerId: actors[0]?.id || 'c1',
          speakerName: actors[0]?.name || 'Officier',
          text: `L'intervalle s'est refermé (low > high). Aucun membre ne possède ce badge #${targetVal}. Un passager clandestin peut-être ?`,
          tone: 'exclamatory',
        },
      ],
      stageDirection: 'Les officiers lèvent les bras au ciel avec perplexité.',
      technicalExplanation: `Condition low (${low}) > high (${high}) atteinte sans égalité. Retourne -1 (Non trouvé).`,
      loopInvariant: `La cible n'appartient à aucun sous-ensemble du tableau.`,
    });
  }

  const total = snapshots.length;
  snapshots.forEach(s => {
    s.totalSteps = total;
  });

  return snapshots;
}
