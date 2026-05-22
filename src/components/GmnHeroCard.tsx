import { ExternalLink, CheckCircle, Sparkles, MessageSquare, ShieldAlert, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { getClaimProfileUrl, getWhatsappShareUrl } from '../utils/whatsapp';
import { GmnFormData } from '../types';

interface GmnHeroCardProps {
  formData: GmnFormData;
  progress: number;
  filledCount: number;
  totalCount: number;
}

export default function GmnHeroCard({ formData, progress, filledCount, totalCount }: GmnHeroCardProps) {
  // Determine gradient color based on progress
  const progressColorClass =
    progress < 30
      ? 'from-rose-500 to-amber-500 text-rose-500'
      : progress < 70
      ? 'from-amber-500 to-emerald-500 text-amber-500'
      : 'from-emerald-500 to-cyan-500 text-emerald-500';

  const shareUrl = getWhatsappShareUrl(formData, progress);

  return (
    <div className="flex flex-col gap-6 w-full lg:sticky lg:top-8">
      {/* Brand & Introduction */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden p-6 rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-2xl shadow-indigo-500/5 dark:shadow-cyan-500/5"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 dark:bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 dark:bg-cyan-500/10 text-indigo-600 dark:text-cyan-400">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-indigo-600 dark:text-cyan-400">
              Gerador Inteligente
            </span>
            <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white leading-none">
              GMN Check list
            </h1>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Otimize a presença digital da sua empresa. Preencha seus dados de forma guiada, exporte tudo para nossa retaguarda e impulsione suas conversões!
        </p>

        {/* Hero Segment: Reivindicar Perfil Call-to-action */}
        <div className="mt-6 p-4 rounded-2xl bg-indigo-500/5 dark:bg-cyan-500/5 border border-indigo-500/10 dark:border-cyan-500/10">
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-indigo-600 dark:text-cyan-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100">
                Ainda não tem perfil no Google?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-3.5">
                O Google Meu Negócio posiciona sua marca no topo dos mapas e das buscas orgânicas gratuitamente.
              </p>
              
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={getClaimProfileUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg shadow-indigo-600/15 transition-all text-center cursor-pointer"
              >
                Reivindicar Perfil
                <ExternalLink className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dynamic Progress Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="p-6 rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-2xl relative"
      >
        <div className="flex items-center justify-between gap-2 mb-6">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            Status do Cadastro
          </h2>
          <span className="font-mono text-xs text-slate-500 bg-slate-100 dark:bg-slate-950/40 px-2.5 py-1 rounded-full border border-slate-200/50 dark:border-slate-800/50">
            {filledCount} de {totalCount} preenchidos
          </span>
        </div>

        {/* Circular Progress & Percentage layout */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-6 py-4">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="54"
                className="stroke-slate-200 dark:stroke-slate-800 fill-none"
                strokeWidth="8"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="54"
                className="fill-none stroke-current"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 54}
                initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 54 * (1 - progress / 100) }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                strokeLinecap="round"
                style={{ stroke: `url(#progressGradient)` }}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute text-center">
              <span className="block text-3xl font-black tracking-tight text-slate-800 dark:text-white">
                {progress}%
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                Completo
              </span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center text-center sm:text-left lg:text-center w-full">
            <div className="h-1.5 w-full bg-slate-200/50 dark:bg-slate-800/50 rounded-full overflow-hidden relative mb-4">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8 }}
                className={`h-full bg-gradient-to-r ${progressColorClass}`}
              />
            </div>

            {progress === 100 ? (
              <p className="text-xs text-emerald-500 font-semibold flex items-center justify-center gap-1.5">
                <CheckCircle className="w-4 h-4 fill-emerald-500/10 shrink-0" />
                Excelente! Cadastro 100% preenchido.
              </p>
            ) : progress > 50 ? (
              <p className="text-xs text-indigo-500 dark:text-cyan-400 font-medium">
                Quase lá! Falta pouco para um perfil premium.
              </p>
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Continue preenchendo os dados para otimizar suas buscas.
              </p>
            )}
          </div>
        </div>

        {/* Global Green Action Button to Save/WhatsApp */}
        <div className="mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-800/40">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full py-4 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all text-center cursor-pointer group"
          >
            <MessageSquare className="w-5 h-5 shrink-0 group-hover:rotate-12 transition-transform" />
            Salvar Dados no WhatsApp
          </motion.a>
          
          <div className="flex justify-center gap-1.5 mt-3 text-[10px] font-medium text-slate-400 dark:text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mt-1" />
            Exportação direta para o suporte +55 (67) 99317-4612
          </div>
        </div>
      </motion.div>
    </div>
  );
}
