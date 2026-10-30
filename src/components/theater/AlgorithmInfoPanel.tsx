import React from 'react';
import { AlgorithmType } from '../../types/theater';
import { Compass, Lightbulb, Clock, ShieldCheck } from 'lucide-react';

interface AlgorithmInfoPanelProps {
  algorithm: AlgorithmType;
  loopInvariant: string;
}

export const AlgorithmInfoPanel: React.FC<AlgorithmInfoPanelProps> = ({
  algorithm,
  loopInvariant,
}) => {
  const getDetails = () => {
    switch (algorithm) {
      case 'bubble-sort':
        return {
          title: 'Le Tri à Bulles (Bubble Sort)',
          metaphor:
            'Chaque membre de l’équipage regarde son voisin de droite. Si son accréditation est supérieure, il lui demande poliment de permuter. Les badges les plus élevés remontent le rang vers la droite comme des bulles d’air dans un sas rempli de liquide.',
          bestCase: 'O(N)',
          averageCase: 'O(N²)',
          worstCase: 'O(N²)',
          space: 'O(1) (En place)',
          stability: 'Stable (Conserve l’ordre des badges égaux)',
        };
      case 'quick-sort':
        return {
          title: 'Le Tri Rapide (Quick Sort)',
          metaphor:
            'Le Capitaine désigne une balise de référence (le Pivot). Tous les membres d’équipage comparent leur insigne : les plus petits rejoignent l’avant-garde à gauche, les plus grands restent à l’arrière-garde. L’opération est ensuite répétée récursivement.',
          bestCase: 'O(N log N)',
          averageCase: 'O(N log N)',
          worstCase: 'O(N²)',
          space: 'O(log N)',
          stability: 'Non stable (Échanges distants)',
        };
      case 'binary-search':
        return {
          title: 'La Recherche Dichotomique (Binary Search)',
          metaphor:
            'Dans un équipage déjà ordonné, l’archiviste interroge la personne située exactement au centre. Si la cible a un badge supérieur, toute la moitié inférieure est écartée d’un coup ! On élimine 50% de l’univers à chaque réplique.',
          bestCase: 'O(1)',
          averageCase: 'O(log N)',
          worstCase: 'O(log N)',
          space: 'O(1)',
          stability: 'Recherche pure',
        };
      case 'dijkstra':
        return {
          title: 'Le Plus Court Chemin (Dijkstra)',
          metaphor:
            'L’officier de navigation calcule la traversée vers une nébuleuse lointaine. À chaque saut, il explore la station la plus économique en carburant ionique parmi celles non encore visitées, puis met à jour le coût des balises adjacentes.',
          bestCase: 'O(V + E log V)',
          averageCase: 'O(V² ou E log V)',
          worstCase: 'O(V²)',
          space: 'O(V)',
          stability: 'Optimal pour poids ≥ 0',
        };
    }
  };

  const details = getDetails();

  return (
    <div className="w-full bg-[#0B0F1C] border border-slate-800 rounded-2xl p-5 shadow-xl">
      <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
        {/* Metaphor Explanation */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>La Métaphore Théâtrale : {details.title}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {details.metaphor}
          </p>

          {/* Current Invariant */}
          <div className="pt-2 flex items-start gap-2 text-xs text-emerald-400/90 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-emerald-300">Invariant en cours :</strong> {loopInvariant}
            </span>
          </div>
        </div>

        {/* Complexity Metrics Matrix (Anti-slop clean table) */}
        <div className="w-full md:w-auto shrink-0 bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 text-xs font-mono">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            Complexité Algorithmique
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-slate-300">
            <div>
              <span className="text-slate-500">Pire cas :</span>{' '}
              <span className="text-amber-300 font-bold">{details.worstCase}</span>
            </div>
            <div>
              <span className="text-slate-500">Moyen :</span>{' '}
              <span className="text-cyan-300 font-bold">{details.averageCase}</span>
            </div>
            <div>
              <span className="text-slate-500">Meilleur :</span>{' '}
              <span className="text-emerald-300 font-bold">{details.bestCase}</span>
            </div>
            <div>
              <span className="text-slate-500">Mémoire :</span>{' '}
              <span className="text-slate-200">{details.space}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
