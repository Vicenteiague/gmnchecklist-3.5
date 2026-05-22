import { useState } from 'react';
import { GmnFormData, FieldKey } from '../types';
import { GMN_FIELDS, FIELD_CATEGORIES } from '../constants/fields';
import GmnFormField from './GmnFormField';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trash2, ListFilter, LayoutGrid, CheckCircle } from 'lucide-react';

interface GmnFormSectionsProps {
  formData: GmnFormData;
  setFormData: (data: GmnFormData) => void;
  onChange: (key: string, value: string) => void;
  onClear: (key: string) => void;
  onFillDemo: () => void;
  onResetAll: () => void;
}

export default function GmnFormSections({
  formData,
  setFormData,
  onChange,
  onClear,
  onFillDemo,
  onResetAll,
}: GmnFormSectionsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Calculates completion for a given category
  const getCategoryProgress = (catId: string) => {
    const catFields = GMN_FIELDS.filter((f) => f.category === catId);
    const filledCount = catFields.filter((f) => formData[f.key]?.trim().length > 0).length;
    return {
      filled: filledCount,
      total: catFields.length,
      isDone: filledCount === catFields.length,
    };
  };

  const filteredFields = selectedCategory === 'all'
    ? GMN_FIELDS
    : GMN_FIELDS.filter((f) => f.category === selectedCategory);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Category Selection Tabs */}
      <div className="p-4 rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-2xl flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-black tracking-wider uppercase text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <ListFilter className="w-4 h-4 text-indigo-500 dark:text-cyan-400" />
            Seções do Checklist
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onFillDemo}
              className="text-[11px] font-bold text-indigo-600 dark:text-cyan-400 hover:bg-indigo-500/10 dark:hover:bg-cyan-500/10 px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              type="button"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Preencher Simulação
            </button>
            <button
              onClick={onResetAll}
              className="text-[11px] font-bold text-rose-500 dark:text-rose-400 hover:bg-rose-500/10 dark:hover:bg-rose-500/10 px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              type="button"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Limpar Tudo
            </button>
          </div>
        </div>

        {/* Scrollable Tabs Wrapper */}
        <div className="flex flex-wrap gap-2">
          {/* "All" Tab button */}
          <button
            onClick={() => setSelectedCategory('all')}
            className={`relative py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              selectedCategory === 'all'
                ? 'text-white bg-slate-950 dark:bg-white dark:text-slate-950'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Todos os Campos
          </button>

          {/* Categorized Tab buttons */}
          {FIELD_CATEGORIES.map((cat) => {
            const progress = getCategoryProgress(cat.id);
            const active = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  active
                    ? 'text-white bg-indigo-600 dark:bg-cyan-500 dark:text-slate-950 shadow-md shadow-indigo-500/10 dark:shadow-cyan-500/15'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat.label}</span>
                
                {progress.filled > 0 && (
                  <span
                    className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      progress.isDone
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                        : 'bg-indigo-500/10 text-indigo-700 dark:bg-cyan-500/10 dark:text-cyan-400'
                    }`}
                  >
                    {progress.filled}/{progress.total}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fields Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredFields.map((field) => (
            <GmnFormField
              key={String(field.key)}
              config={field}
              value={formData[field.key]}
              onChange={onChange}
              onClear={onClear}
            />
          ))}
        </AnimatePresence>
      </div>

      {filteredFields.length === 0 && (
        <div className="text-center py-12 p-6 rounded-3xl bg-white/20 dark:bg-slate-900/10 border border-dashed border-slate-300 dark:border-slate-800">
          <p className="text-slate-400 dark:text-slate-600 font-medium text-sm">
            Nenhum campo disponível nesta seção.
          </p>
        </div>
      )}
    </div>
  );
}
