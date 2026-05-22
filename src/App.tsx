import { useEffect, useRef, useState } from 'react';
import { GmnFormData } from './types';
import { GMN_FIELDS } from './constants/fields';
import ThemeToggle from './components/ThemeToggle';
import GmnHeroCard from './components/GmnHeroCard';
import GmnFormSections from './components/GmnFormSections';
import CinematicShowcase from './components/CinematicShowcase';
import { MapPin, CheckCircle, Sparkles, AlertTriangle, ShieldCheck, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const EMPTY_FORM: GmnFormData = {
  nomeEmpresa: '',
  descricao: '',
  endereco: '',
  cep: '',
  dataAbertura: '',
  site: '',
  areaCobertura: '',
  servicos: '',
  produtos: '',
  horario: '',
  horarioSabado: '',
  whatsapp: '',
  facebook: '',
  instagram: '',
  linkedin: '',
  tiktok: '',
  observacoes: '',
};

const DEMO_FORM: GmnFormData = {
  nomeEmpresa: 'Start Mkt Digital MS',
  descricao: 'Agência especializada em posicionamento estratégico e atração de novos clientes para negócios locais de Mato Grosso do Sul através de otimização de perfil do Google Meu Negócio, tráfego pago, SEO e design.',
  endereco: 'Avenida Afonso Pena, 1500 - Centro',
  cep: '79002-072',
  dataAbertura: '2021-08-20',
  site: 'https://www.startmktdigital.com.br',
  areaCobertura: 'Mato Grosso do Sul, Campo Grande, Dourados, Ponta Porã, Três Lagoas',
  servicos: 'Otimização e Auditoria de Perfis do Google Meu Negócio, CRM, Gestão de Campanhas locais, Produção de Conteúdo, Fotografia Corporativa.',
  produtos: 'Consultoria Presença 3D, Mentoria GMN de Destaque, Pacotes de Gestão de Presença mensal.',
  horario: 'Segunda a Sexta das 08:30 às 18:00',
  horarioSabado: 'Sábado das 09:00 às 12:00',
  whatsapp: '+5567993174612',
  facebook: 'https://facebook.com/startmktdigitalms',
  instagram: 'https://instagram.com/startmktdigitalms',
  linkedin: 'https://linkedin.com/company/startmktdigitalms',
  tiktok: 'https://tiktok.com/@startmktdigitalms',
  observacoes: 'Oferecemos diagnóstico gratuito de perfil para novos parceiros locais do MS. Estacionamento próprio no local de reuniões.',
};

export default function App() {
  const formSectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<GmnFormData>(() => {
    try {
      const saved = localStorage.getItem('gmn_checklist_data_v2');
      return saved ? JSON.parse(saved) : EMPTY_FORM;
    } catch {
      return EMPTY_FORM;
    }
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('gmn_dark_mode_preference');
      if (saved !== null) {
        return saved === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return true;
    }
  });

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('gmn_checklist_data_v2', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('gmn_dark_mode_preference', String(darkMode));
  }, [darkMode]);

  // Handle automatic user system theme updates
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('gmn_dark_mode_preference') === null) {
        setDarkMode(e.matches);
      }
    };
    media.addEventListener('change', updateTheme);
    return () => media.removeEventListener('change', updateTheme);
  }, []);

  // Calculate fields progression
  const totalCount = GMN_FIELDS.length;
  const filledCount = GMN_FIELDS.filter((field) => {
    const val = formData[field.key];
    return val && val.trim().length > 0;
  }).length;
  
  const progressPercentage = totalCount > 0 ? Math.round((filledCount / totalCount) * 100) : 0;

  const handleFieldChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFieldClear = (key: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: '',
    }));
  };

  const handleFillDemo = () => {
    setFormData(DEMO_FORM);
  };

  const handleResetAll = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    setFormData(EMPTY_FORM);
    setShowResetConfirm(false);
  };

  const scrollToFormSection = () => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${darkMode ? 'dark bg-mesh-dark text-slate-100' : 'bg-mesh-light text-slate-800'}`}>
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-[40rem] h-[30rem] bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[40rem] h-[30rem] bg-emerald-500/5 dark:bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        
        {/* Navigation / Floating Header Bar */}
        <header className="flex items-center justify-between gap-4 mb-4 p-4 rounded-2xl bg-white/30 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-md">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 dark:bg-cyan-500 text-white dark:text-slate-950 font-black text-sm">
              S
            </span>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-none block">Start Mkt Digital MS</span>
              <span className="block font-black text-sm leading-none tracking-tight text-slate-800 dark:text-white uppercase mt-1">GMN Check list</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToFormSection}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100/50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800/60 border border-slate-200/40 dark:border-slate-700/30 transition-all cursor-pointer"
            >
              Checklist Formulário
            </button>
            
            <a
              href="https://business.google.com/add"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 border border-transparent transition-all cursor-pointer shadow-lg shadow-indigo-600/10"
            >
              Reivindicar Perfil
              <MapPin className="w-3.5 h-3.5 shrink-0" />
            </a>
            
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </header>

        {/* Premium Cinematic Showcase Presentation Banner */}
        <CinematicShowcase onScrollToForm={scrollToFormSection} />

        {/* Spacer & Anchor Header */}
        <div 
          ref={formSectionRef} 
          id="checklist-form-anchor" 
          className="pt-20 pb-8 flex flex-col items-center text-center"
        >
          <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-indigo-600 dark:text-cyan-400">
            Formulário Dinâmico
          </span>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight mt-2">
            Preenchimento Otimizado GMN
          </h2>
          <div className="h-1 w-12 bg-indigo-500 rounded-full mt-3" />
        </div>

        {/* Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Hero segment + Control Center dashboard */}
          <section className="lg:col-span-4 lg:sticky lg:top-8">
            <GmnHeroCard
              formData={formData}
              progress={progressPercentage}
              filledCount={filledCount}
              totalCount={totalCount}
            />
          </section>

          {/* Core Interactive Checklist form */}
          <main className="lg:col-span-8">
            <GmnFormSections
              formData={formData}
              setFormData={setFormData}
              onChange={handleFieldChange}
              onClear={handleFieldClear}
              onFillDemo={handleFillDemo}
              onResetAll={handleResetAll}
            />
          </main>
        </div>

        {/* Humild Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-200/50 dark:border-slate-800/50 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            GMN Check list — Ferramenta Segura de Coleta & Otimização de Perfis do Google. Os dados são salvos apenas no seu navegador.
          </p>
        </footer>
      </div>

      {/* Reset Confirmation Dialog Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResetConfirm(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-10"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-500 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-black tracking-tight text-slate-800 dark:text-white">
                Limpar todos os campos?
              </h3>
              
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-6 leading-relaxed">
                Esta ação apagará permanentemente todas as informações preenchidas no formulário atual e redefinirá os dados salvos localmente. Deseja continuar?
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmReset}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                >
                  Sim, Limpar Tudo
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
