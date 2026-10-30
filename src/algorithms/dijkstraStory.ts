import { Character, DijkstraEdge, DijkstraGraphState, DijkstraNode, StageSnapshot, UniverseTheme } from '../types/theater';

export function generateDijkstraStory(
  initialCast: Character[],
  theme: UniverseTheme
): StageSnapshot[] {
  const snapshots: StageSnapshot[] = [];

  // Default starship beacon network with 6 nodes
  const nodes: DijkstraNode[] = [
    {
      id: 'A',
      name: 'Station Terre-Orbital',
      stationType: 'Port de Départ',
      x: 10,
      y: 50,
      fuelCost: 0,
      visited: false,
      isCurrent: false,
      isTarget: false,
      character: initialCast[0] || {
        id: 'c1',
        name: 'Capitaine Stella',
        role: 'Commandant',
        badgeValue: 0,
        avatarKey: 'captain',
        accentColor: '#38BDF8',
        temperament: 'dramatic',
      },
    },
    {
      id: 'B',
      name: 'Relais Astéroïde Pallas',
      stationType: 'Avant-poste minier',
      x: 35,
      y: 20,
      fuelCost: Infinity,
      visited: false,
      isCurrent: false,
      isTarget: false,
      character: initialCast[1] || {
        id: 'c2',
        name: 'Android B0-B',
        role: 'Officier',
        badgeValue: 99,
        avatarKey: 'android',
        accentColor: '#A78BFA',
        temperament: 'analytical',
      },
    },
    {
      id: 'C',
      name: 'Base Lunaire Tycho',
      stationType: 'Dépôt d’hélium-3',
      x: 35,
      y: 80,
      fuelCost: Infinity,
      visited: false,
      isCurrent: false,
      isTarget: false,
      character: initialCast[2] || {
        id: 'c3',
        name: 'Dr. Quasar',
        role: 'Savant',
        badgeValue: 99,
        avatarKey: 'scientist',
        accentColor: '#F59E0B',
        temperament: 'polite',
      },
    },
    {
      id: 'D',
      name: 'Station Anneaux de Saturne',
      stationType: 'Accélérateur gravitationnel',
      x: 65,
      y: 25,
      fuelCost: Infinity,
      visited: false,
      isCurrent: false,
      isTarget: false,
      character: initialCast[3] || {
        id: 'c4',
        name: 'Ingénieure Nova',
        role: 'Ingénieure',
        badgeValue: 99,
        avatarKey: 'engineer',
        accentColor: '#FB7185',
        temperament: 'rebel',
      },
    },
    {
      id: 'E',
      name: 'Passerelle Nébuleuse d’Orion',
      stationType: 'Balise de saut warp',
      x: 65,
      y: 75,
      fuelCost: Infinity,
      visited: false,
      isCurrent: false,
      isTarget: false,
      character: initialCast[4] || {
        id: 'c5',
        name: 'Cadette Lyra',
        role: 'Pilote',
        badgeValue: 99,
        avatarKey: 'cadet',
        accentColor: '#34D399',
        temperament: 'polite',
      },
    },
    {
      id: 'F',
      name: 'Nébuleuse d’Émeraude (Omega)',
      stationType: 'Sanctuaire d’Arrivée',
      x: 90,
      y: 50,
      fuelCost: Infinity,
      visited: false,
      isCurrent: false,
      isTarget: true,
      character: initialCast[5] || {
        id: 'c6',
        name: 'Major Sol',
        role: 'Garde Alpha',
        badgeValue: 99,
        avatarKey: 'tactical',
        accentColor: '#F97316',
        temperament: 'dramatic',
      },
    },
  ];

  const edges: DijkstraEdge[] = [
    { id: 'A-B', from: 'A', to: 'B', weight: 4, isActive: false, isShortestPath: false },
    { id: 'A-C', from: 'A', to: 'C', weight: 2, isActive: false, isShortestPath: false },
    { id: 'B-C', from: 'B', to: 'C', weight: 1, isActive: false, isShortestPath: false },
    { id: 'B-D', from: 'B', to: 'D', weight: 5, isActive: false, isShortestPath: false },
    { id: 'C-E', from: 'C', to: 'E', weight: 8, isActive: false, isShortestPath: false },
    { id: 'C-D', from: 'C', to: 'D', weight: 8, isActive: false, isShortestPath: false },
    { id: 'D-E', from: 'D', to: 'E', weight: 2, isActive: false, isShortestPath: false },
    { id: 'D-F', from: 'D', to: 'F', weight: 6, isActive: false, isShortestPath: false },
    { id: 'E-F', from: 'E', to: 'F', weight: 3, isActive: false, isShortestPath: false },
  ];

  const previous: Record<string, string | null> = {
    A: null,
    B: null,
    C: null,
    D: null,
    E: null,
    F: null,
  };

  const currentDistances: Record<string, number> = {
    A: 0,
    B: Infinity,
    C: Infinity,
    D: Infinity,
    E: Infinity,
    F: Infinity,
  };

  const visitedSet = new Set<string>();

  function makeGraphState(currentId?: string, currentNeighbor?: string): DijkstraGraphState {
    return {
      nodes: nodes.map(n => ({
        ...n,
        fuelCost: currentDistances[n.id],
        visited: visitedSet.has(n.id),
        isCurrent: n.id === currentId,
      })),
      edges: edges.map(e => ({
        ...e,
        isActive:
          (e.from === currentId && e.to === currentNeighbor) ||
          (e.to === currentId && e.from === currentNeighbor),
      })),
      startNodeId: 'A',
      targetNodeId: 'F',
      currentNeighborId: currentNeighbor,
    };
  }

  // Prologue
  snapshots.push({
    stepIndex: 0,
    totalSteps: 0,
    action: 'idle',
    actTitle: 'Prologue : La Traversée des Balises',
    sceneTitle: 'Cartographie du Saut Hyperspatial à Carburant Minimal',
    actors: initialCast,
    activeActorIds: [nodes[0].character.id, nodes[5].character.id],
    speechBubbles: [
      {
        speakerId: nodes[0].character.id,
        speakerName: nodes[0].character.name,
        text: `Pilote ! Nous devons rallier la Nébuleuse d’Émeraude (F) depuis notre base (A). Les réserves de carburant ionique sont précieuses !`,
        tone: 'dramatic',
      },
      {
        speakerId: nodes[1].character.id,
        speakerName: nodes[1].character.name,
        text: `Algorithme de Dijkstra enclenché ! À chaque saut, nous choisirons la balise la plus économique, puis évaluerons ses relais voisins.`,
        tone: 'robotic',
      },
    ],
    stageDirection: 'L’holocarte stellaire s’illumine en trois dimensions au centre de la passerelle.',
    technicalExplanation: `Algorithme du Plus Court Chemin (Dijkstra). Graphe pondéré à arêtes positives. Complexité : O((V + E) log V).`,
    loopInvariant: `Pour tout nœud visité, la distance calculée est la distance minimale absolue depuis la source A.`,
    graphState: makeGraphState(),
  });

  let stepAct = 1;

  while (visitedSet.size < nodes.length) {
    // Find unvisited node with minimum distance
    let minNodeId: string | null = null;
    let minDistance = Infinity;

    for (const node of nodes) {
      if (!visitedSet.has(node.id) && currentDistances[node.id] < minDistance) {
        minDistance = currentDistances[node.id];
        minNodeId = node.id;
      }
    }

    if (!minNodeId || minDistance === Infinity) {
      break;
    }

    const currentNode = nodes.find(n => n.id === minNodeId)!;

    // Snapshot: Visiting the chosen node
    snapshots.push({
      stepIndex: snapshots.length,
      totalSteps: 0,
      action: 'inspect',
      actTitle: `Acte ${stepAct} : Halte à ${currentNode.name}`,
      sceneTitle: `Sélection de la station la plus accessible (Coût : ${minDistance} ML)`,
      actors: initialCast,
      activeActorIds: [currentNode.character.id],
      speechBubbles: [
        {
          speakerId: currentNode.character.id,
          speakerName: currentNode.character.name,
          text: `Station ${currentNode.name} (${currentNode.id}) atteinte avec ${minDistance} Mégalitres ! C'est le trajet certifié le plus court depuis la Terre !`,
          tone: 'triumphant',
        },
      ],
      stageDirection: `Le faisceau vert de l’astronef se verrouille sur la balise ${currentNode.id}.`,
      technicalExplanation: `Extraction du nœud u de distance minimale parmi les non-visités : u = ${currentNode.id}, dist[${currentNode.id}] = ${minDistance}.`,
      loopInvariant: `La distance minimale vers ${currentNode.id} est maintenant irrévocablement fixée.`,
      graphState: makeGraphState(currentNode.id),
    });

    visitedSet.add(currentNode.id);

    // Stop early if target node F is extracted
    if (currentNode.id === 'F') {
      break;
    }

    // Relax all neighbors
    const incidentEdges = edges.filter(
      e => e.from === currentNode.id || e.to === currentNode.id
    );

    for (const edge of incidentEdges) {
      const neighborId = edge.from === currentNode.id ? edge.to : edge.from;
      if (visitedSet.has(neighborId)) continue;

      const neighborNode = nodes.find(n => n.id === neighborId)!;
      const weight = edge.weight;
      const newDist = minDistance + weight;
      const currentNeighborDist = currentDistances[neighborId];
      const improves = newDist < currentNeighborDist;

      snapshots.push({
        stepIndex: snapshots.length,
        totalSteps: 0,
        action: 'relax-edge',
        actTitle: `Acte ${stepAct} : Évaluation de la Balise ${neighborNode.name}`,
        sceneTitle: `Trajet vers ${neighborId} via ${currentNode.id} (Coût : ${minDistance} + ${weight} = ${newDist} ML)`,
        actors: initialCast,
        activeActorIds: [currentNode.character.id, neighborNode.character.id],
        speechBubbles: [
          {
            speakerId: currentNode.character.id,
            speakerName: currentNode.character.name,
            text: `Balise ${neighborId}, nous pouvons vous relier via notre corridor pour ${weight} ML additionnels (Total : ${newDist} ML).`,
            tone: 'polite',
            side: 'left',
          },
          {
            speakerId: neighborNode.character.id,
            speakerName: neighborNode.character.name,
            text: improves
              ? `Excellente nouvelle ! Notre ancienne estimation était de ${currentNeighborDist === Infinity ? 'l’infini' : currentNeighborDist + ' ML'}. Nous adoptons votre itinéraire !`
              : `Merci de la proposition, mais notre route actuelle via une autre balise ne coûte que ${currentNeighborDist} ML. Nous gardons notre raccourci !`,
            tone: improves ? 'triumphant' : 'analytical',
            side: 'right',
          },
        ],
        stageDirection: `Les faisceaux de communication ioniques crépitent entre ${currentNode.id} et ${neighborId}.`,
        technicalExplanation: `Relâchement de l'arête (${currentNode.id}, ${neighborId}) : alt = ${minDistance} + ${weight} = ${newDist} < dist[${neighborId}] (${currentNeighborDist === Infinity ? '∞' : currentNeighborDist}) ? -> ${improves ? 'MISE À JOUR' : 'CONSERVÉ'}.`,
        loopInvariant: `Toutes les distances enregistrées sont des bornes supérieures valides de la distance minimale.`,
        graphState: makeGraphState(currentNode.id, neighborId),
      });

      if (improves) {
        currentDistances[neighborId] = newDist;
        previous[neighborId] = currentNode.id;
      }
    }

    stepAct++;
  }

  // Reconstruct shortest path from A to F
  const shortestPathEdges = new Set<string>();
  let curr: string | null = 'F';
  const pathNodes: string[] = [];

  while (curr) {
    pathNodes.unshift(curr);
    const prev: string | null = previous[curr] ?? null;
    if (prev) {
      const e = edges.find(
        ed =>
          (ed.from === prev && ed.to === curr) ||
          (ed.to === prev && ed.from === curr)
      );
      if (e) shortestPathEdges.add(e.id);
    }
    curr = prev;
  }

  // Final Celebration Snapshot
  const finalGraph: DijkstraGraphState = {
    nodes: nodes.map(n => ({
      ...n,
      fuelCost: currentDistances[n.id],
      visited: true,
      isCurrent: n.id === 'F',
    })),
    edges: edges.map(e => ({
      ...e,
      isActive: false,
      isShortestPath: shortestPathEdges.has(e.id),
    })),
    startNodeId: 'A',
    targetNodeId: 'F',
  };

  snapshots.push({
    stepIndex: snapshots.length,
    totalSteps: 0,
    action: 'complete',
    actTitle: 'Épilogue : Trajectoire Parfaite Verrouillée',
    sceneTitle: `Arrivée à la Nébuleuse d’Émeraude en ${currentDistances['F']} Mégalitres !`,
    actors: initialCast,
    activeActorIds: nodes.filter(n => pathNodes.includes(n.id)).map(n => n.character.id),
    speechBubbles: [
      {
        speakerId: nodes[0].character.id,
        speakerName: nodes[0].character.name,
        text: `Victoire ! La route la plus frugale est : ${pathNodes.join(' ➔ ')}, pour seulement ${currentDistances['F']} ML de carburant ! Moteurs Warp activés !`,
        tone: 'triumphant',
      },
    ],
    stageDirection: `Le corridor de vol s’illumine d’une intense lumière émeraude d’un bout à l’autre de la galaxie.`,
    technicalExplanation: `Itinéraire optimal trouvé : ${pathNodes.join(' -> ')} avec un coût total minimal garanti de ${currentDistances['F']}.`,
    loopInvariant: `La route reconstruite par rétro-propagation des pères est prouvée minimale.`,
    graphState: finalGraph,
  });

  const total = snapshots.length;
  snapshots.forEach(s => {
    s.totalSteps = total;
  });

  return snapshots;
}
