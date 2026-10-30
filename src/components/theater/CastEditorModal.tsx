import React, { useState } from 'react';
import { Character, Temperament } from '../../types/theater';
import { X, Shuffle, ArrowDownUp, Sparkles, Plus, Trash2, Check } from 'lucide-react';

interface CastEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  cast: Character[];
  onSaveCast: (newCast: Character[]) => void;
  badgeConcept: string;
  isBinarySearch?: boolean;
  targetValue?: number;
  onSaveTargetValue?: (val: number) => void;
}

export const CastEditorModal: React.FC<CastEditorModalProps> = ({
  isOpen,
  onClose,
  cast,
  onSaveCast,
  badgeConcept,
  isBinarySearch,
  targetValue,
  onSaveTargetValue,
}) => {
  const [editedCast, setEditedCast] = useState<Character[]>(() =>
    cast.map(c => ({ ...c }))
  );
  const [customTarget, setCustomTarget] = useState<number>(targetValue || 45);

  if (!isOpen) return null;

  const handleUpdate = (index: number, field: keyof Character, value: any) => {
    setEditedCast(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleAddMember = () => {
    if (editedCast.length >= 8) return;
    const newId = `c_${Date.now()}`;
    const newMember: Character = {
      id: newId,
      name: `Recrue #${editedCast.length + 1}`,
      role: 'Spécialiste de mission',
      badgeValue: Math.floor(Math.random() * 90) + 10,
      avatarKey: 'cadet',
      accentColor: '#38BDF8',
      temperament: 'polite',
    };
    setEditedCast(prev => [...prev, newMember]);
  };

  const handleRemoveMember = (index: number) => {
    if (editedCast.length <= 3) return; // Keep at least 3
    setEditedCast(prev => prev.filter((_, i) => i !== index));
  };

  // Presets
  const applyPresetRandom = () => {
    setEditedCast(prev =>
      prev.map(c => ({
        ...c,
        badgeValue: Math.floor(Math.random() * 89) + 10,
      }))
    );
  };

  const applyPresetReversed = () => {
    const descending = [95, 80, 65, 50, 35, 20, 10, 5];
    setEditedCast(prev =>
      prev.map((c, i) => ({
        ...c,
        badgeValue: descending[i] || 10,
      }))
    );
  };

  const applyPresetNearlySorted = () => {
    const nearly = [12, 25, 42, 38, 70, 85, 92, 99];
    setEditedCast(prev =>
      prev.map((c, i) => ({
        ...c,
        badgeValue: nearly[i] || 50,
      }))
    );
  };

  const applyPresetDuplicates = () => {
    const withDups = [20, 45, 45, 60, 60, 88];
    setEditedCast(prev =>
      prev.map((c, i) => ({
        ...c,
        badgeValue: withDups[i] || 45,
      }))
    );
  };

  const handleSave = () => {
    onSaveCast(editedCast);
    if (isBinarySearch && onSaveTargetValue) {
      onSaveTargetValue(customTarget);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0B0F1E] border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              La Loge des Comédiens · Modifier la Troupe
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Changez les noms, rôles et {badgeConcept.toLowerCase()} pour réécrire la pièce.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets Strip */}
        <div className="px-6 py-3 bg-slate-900/40 border-b border-slate-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-mono text-[11px] mr-1">Scénarios types :</span>
          <button
            onClick={applyPresetRandom}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Shuffle className="w-3 h-3 text-cyan-400" />
            Aléatoire
          </button>
          <button
            onClick={applyPresetReversed}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <ArrowDownUp className="w-3 h-3 text-rose-400" />
            Ordre Inversé (Pire cas)
          </button>
          <button
            onClick={applyPresetNearlySorted}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Check className="w-3 h-3 text-emerald-400" />
            Presque trié
          </button>
          <button
            onClick={applyPresetDuplicates}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            Doublons
          </button>
        </div>

        {/* Target Value Picker for Binary Search */}
        {isBinarySearch && (
          <div className="px-6 py-2.5 bg-amber-950/20 border-b border-amber-500/20 flex items-center justify-between text-xs">
            <span className="font-semibold text-amber-200">
              Badge cible recherché par l'équipage :
            </span>
            <input
              type="number"
              value={customTarget}
              onChange={e => setCustomTarget(Number(e.target.value))}
              className="w-20 px-2 py-1 bg-slate-900 border border-amber-500/50 rounded text-amber-300 font-mono font-bold text-center"
            />
          </div>
        )}

        {/* Character List Editor */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {editedCast.map((actor, idx) => (
            <div
              key={actor.id}
              className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-wrap items-center gap-3 justify-between"
            >
              {/* Position Tag & Avatar mini */}
              <div className="flex items-center gap-2 min-w-[70px]">
                <span className="text-xs font-mono text-slate-500">#{idx + 1}</span>
                <div
                  className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-900"
                  style={{ backgroundColor: actor.accentColor }}
                >
                  {actor.name.charAt(0)}
                </div>
              </div>

              {/* Name input */}
              <div className="flex-1 min-w-[130px]">
                <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">
                  Nom du personnage
                </label>
                <input
                  type="text"
                  value={actor.name}
                  onChange={e => handleUpdate(idx, 'name', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Role input */}
              <div className="flex-1 min-w-[120px]">
                <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">
                  Rôle / Fonction
                </label>
                <input
                  type="text"
                  value={actor.role}
                  onChange={e => handleUpdate(idx, 'role', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Badge value (The numeric key) */}
              <div className="w-24">
                <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">
                  Valeur / Badge
                </label>
                <input
                  type="number"
                  min={1}
                  max={999}
                  value={actor.badgeValue}
                  onChange={e =>
                    handleUpdate(idx, 'badgeValue', Math.max(1, Number(e.target.value)))
                  }
                  className="w-full px-2.5 py-1.5 bg-slate-950 border border-amber-500/40 rounded-lg text-xs font-mono font-bold text-amber-300 text-center focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Temperament Selector */}
              <div className="w-28">
                <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">
                  Tempérament
                </label>
                <select
                  value={actor.temperament}
                  onChange={e =>
                    handleUpdate(idx, 'temperament', e.target.value as Temperament)
                  }
                  className="w-full px-2 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none"
                >
                  <option value="polite">Poli</option>
                  <option value="dramatic">Théâtral</option>
                  <option value="analytical">Analytique</option>
                  <option value="rebel">Rebelle</option>
                </select>
              </div>

              {/* Delete button */}
              <button
                onClick={() => handleRemoveMember(idx)}
                disabled={editedCast.length <= 3}
                className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg disabled:opacity-20 transition-colors"
                title="Retirer ce membre de la troupe"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Add member button */}
          {editedCast.length < 8 && (
            <button
              onClick={handleAddMember}
              className="w-full py-2.5 border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ajouter un comédien à la troupe ({editedCast.length}/8)
            </button>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {editedCast.length} membres en scène
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-lg shadow-amber-400/20"
            >
              Appliquer & Monter la Pièce
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
