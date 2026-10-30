import React from 'react';
import { DijkstraGraphState } from '../../types/theater';

interface DijkstraGraphCanvasProps {
  graphState: DijkstraGraphState;
}

export const DijkstraGraphCanvas: React.FC<DijkstraGraphCanvasProps> = ({ graphState }) => {
  const { nodes, edges, currentNeighborId } = graphState;

  // Node lookup helper
  const getNode = (id: string) => nodes.find(n => n.id === id);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] rounded-xl overflow-hidden border border-slate-800 bg-[#070B14]">
      {/* Background Starfield and Radial Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/30 via-slate-950 to-[#070B14]" />
      <div className="absolute top-4 left-4 text-xs font-mono text-slate-400 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>RÉSEAU DE SAUT WARP · CARBURANT IONIQUE (ML)</span>
      </div>

      {/* SVG Edges and Paths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {edges.map(edge => {
          const u = getNode(edge.from);
          const v = getNode(edge.to);
          if (!u || !v) return null;

          const isShortest = edge.isShortestPath;
          const isActive = edge.isActive;

          let strokeColor = 'rgba(71, 85, 105, 0.4)';
          let strokeWidth = 2;
          let filter;

          if (isShortest) {
            strokeColor = '#10B981'; // Emerald
            strokeWidth = 4;
            filter = 'url(#glow-emerald)';
          } else if (isActive) {
            strokeColor = '#38BDF8'; // Cyan
            strokeWidth = 3;
            filter = 'url(#glow-cyan)';
          }

          // Calculate midpoint for weight badge
          const midX = (u.x + v.x) / 2;
          const midY = (u.y + v.y) / 2;

          return (
            <g key={edge.id}>
              {/* Corridor Line */}
              <line
                x1={`${u.x}%`}
                y1={`${u.y}%`}
                x2={`${v.x}%`}
                y2={`${v.y}%`}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={isActive ? '6 4' : undefined}
                filter={filter}
                className={isActive ? 'animate-pulse' : ''}
              />

              {/* Edge Weight Pill on Canvas */}
              <foreignObject
                x={`calc(${midX}% - 16px)`}
                y={`calc(${midY}% - 12px)`}
                width="32"
                height="24"
              >
                <div
                  className={`w-full h-full flex items-center justify-center rounded text-[11px] font-mono font-bold border transition-colors ${
                    isShortest
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                      : isActive
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-400'
                      : 'bg-slate-900/90 text-slate-300 border-slate-700'
                  }`}
                >
                  {edge.weight}
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>

      {/* Nodes / Space Stations */}
      {nodes.map(node => {
        const isStart = node.id === 'A';
        const isTarget = node.id === 'F';
        const isCurrent = node.isCurrent;
        const isNeighbor = node.id === currentNeighborId;
        const isVisited = node.visited;
        const costDisplay = node.fuelCost === Infinity ? '∞' : `${node.fuelCost} ML`;

        return (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all duration-300"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            {/* Pulsing Beacon Halo */}
            {isCurrent && (
              <span className="absolute -inset-2 rounded-full bg-cyan-400/20 animate-ping" />
            )}

            {/* Station Orb with Character Badge */}
            <div
              className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 flex items-center justify-center shadow-lg transition-transform ${
                isCurrent
                  ? 'border-cyan-400 bg-cyan-950/80 scale-110 shadow-cyan-500/30 ring-4 ring-cyan-400/30'
                  : isTarget
                  ? 'border-emerald-400 bg-emerald-950/80 shadow-emerald-500/30'
                  : isNeighbor
                  ? 'border-amber-400 bg-amber-950/80 ring-2 ring-amber-400/40'
                  : isVisited
                  ? 'border-emerald-500/60 bg-slate-900/90'
                  : 'border-slate-700 bg-slate-900/80'
              }`}
            >
              <span className="text-sm sm:text-base font-bold font-mono text-white">
                {node.id}
              </span>

              {/* Station Manager Badge */}
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border border-slate-800 flex items-center justify-center text-[9px] font-bold text-slate-950 shadow"
                style={{ backgroundColor: node.character.accentColor }}
                title={node.character.name}
              >
                {node.character.name.charAt(0)}
              </div>
            </div>

            {/* Station Label & Cost */}
            <div className="mt-1 flex flex-col items-center pointer-events-none">
              <span className="text-[11px] font-semibold text-slate-200 whitespace-nowrap drop-shadow">
                {node.name}
              </span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded border whitespace-nowrap ${
                  node.fuelCost === 0
                    ? 'bg-slate-800 text-slate-300 border-slate-700'
                    : node.fuelCost === Infinity
                    ? 'bg-slate-900/70 text-slate-500 border-slate-800'
                    : isCurrent
                    ? 'bg-cyan-950 text-cyan-200 border-cyan-500 font-bold'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-600'
                }`}
              >
                Coût: {costDisplay}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
