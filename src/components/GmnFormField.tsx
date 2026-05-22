import { FieldConfig } from '../types';
import { motion } from 'motion/react';
import { CheckCircle, AlertCircle, HelpCircle, X } from 'lucide-react';
import { useState } from 'react';

interface GmnFormFieldProps {
  key?: string;
  config: FieldConfig;
  value: string;
  onChange: (key: string, value: string) => void;
  onClear: (key: string) => void;
}

export default function GmnFormField({ config, value, onChange, onClear }: GmnFormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const isFilled = value.trim().length > 0;

  // Simple basic validation support based on input types
  const isValid = () => {
    if (!isFilled) return true; // empty is allowed for fill progression
    if (config.type === 'url') {
      try {
        // loose URL matching
        return value.startsWith('http://') || value.startsWith('https://') || value.includes('.');
      } catch {
        return false;
      }
    }
    if (config.type === 'tel') {
      return value.replace(/\D/g, '').length >= 8;
    }
    return true;
  };

  const fieldValid = isValid();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative flex flex-col gap-2 p-5 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-lg transition-shadow duration-300 hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-emerald-500/5 group"
    >
      <div className="flex items-center justify-between gap-2">
        <label className="flex items-center gap-2 font-sans font-semibold text-sm tracking-wide text-slate-800 dark:text-slate-100 uppercase">
          {config.label}
          {isFilled ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-500/10" />
            </motion.div>
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
          )}
        </label>

        <div className="flex items-center gap-1.5">
          {config.helpText && (
            <button
              type="button"
              onClick={() => setShowHelp(!showHelp)}
              aria-label="Ajuda"
              className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          )}

          {isFilled && (
            <button
              type="button"
              onClick={() => onClear(config.key)}
              aria-label="Limpar campo"
              className="p-1 rounded-lg text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 cursor-pointer transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {showHelp && config.helpText && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="text-xs text-slate-500 dark:text-slate-400 bg-white/20 dark:bg-slate-950/20 p-2.5 rounded-xl border border-white/10"
        >
          {config.helpText}
        </motion.div>
      )}

      <div className="relative">
        {config.type === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => onChange(config.key, e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={config.placeholder}
            rows={3}
            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 bg-white/20 dark:bg-slate-950/20 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-hidden resize-y ${
              isFocused
                ? 'border-indigo-500 dark:border-cyan-500 ring-2 ring-indigo-500/20 dark:ring-cyan-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)] dark:shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                : 'border-slate-200 dark:border-slate-800'
            }`}
          />
        ) : (
          <input
            type={config.type}
            value={value}
            onChange={(e) => onChange(config.key, e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={config.placeholder}
            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 bg-white/20 dark:bg-slate-950/20 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-hidden ${
              isFocused
                ? 'border-indigo-500 dark:border-cyan-500 ring-2 ring-indigo-500/20 dark:ring-cyan-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)] dark:shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                : 'border-slate-200 dark:border-slate-800'
            }`}
          />
        )}

        {!fieldValid && (
          <div className="absolute right-3 top-3.5 flex items-center text-rose-500 pointer-events-none">
            <AlertCircle className="w-4 h-4" />
          </div>
        )}
      </div>

      {!fieldValid && (
        <span className="text-[11px] text-rose-500 flex items-center gap-1 mt-1 font-medium">
          <AlertCircle className="w-3.5 h-3.5" />
          Formato inválido. Por favor, verifique as informações preenchidas.
        </span>
      )}
    </motion.div>
  );
}
