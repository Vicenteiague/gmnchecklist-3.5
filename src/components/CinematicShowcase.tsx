import React, { useEffect, useRef, useState, ReactNode, MouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { 
  Laptop, Sparkles, Sliders, Play, Pause, RefreshCw, 
  Layers, Palette, Compass, ArrowRight, Eye, Gauge, 
  TrendingUp, Search, ExternalLink, Moon, Sun, Monitor
} from 'lucide-react';
import { gsap } from 'gsap';

interface CinematicShowcaseProps {
  onScrollToForm: () => void;
}

interface WebsiteTemplate {
  id: string;
  title: string;
  tag: string;
  color: string;
  description: string;
  elements: ReactNode;
}

export default function CinematicShowcase({ onScrollToForm }: CinematicShowcaseProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('agency');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeAngle, setActiveAngle] = useState<'front' | 'isometric' | 'low-angle' | 'flat'>('isometric');
  const [activeLight, setActiveLight] = useState<'aurora' | 'cyberpunk' | 'mono' | 'cosmic'>('cosmic');
  const [scrollSpeed, setScrollSpeed] = useState<number>(30); // in seconds for full loop
  
  // Element Refs for GSAP
  const laptopRef = useRef<HTMLDivElement>(null);
  const screenScrollRef = useRef<HTMLDivElement>(null);
  const glowLightRef = useRef<HTMLDivElement>(null);

  // Mouse tilt tracking states (interactivity)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20 });

  // Handle Mouse movement for interactive 3D Tilt
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (activeAngle !== 'isometric') return; // Tilt only in isometric view
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Max 12 degrees tilt
    x.set(mouseX / (width / 2) * 12);
    y.set(-(mouseY / (height / 2)) * 12);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // GSAP animation for screen scrolling simulation
  useEffect(() => {
    let ctx = gsap.context(() => {
      if (screenScrollRef.current && isPlaying) {
        // Reset scroll position
        gsap.set(screenScrollRef.current, { scrollTop: 0 });
        
        // Loop scrolling animation
        const maxScroll = screenScrollRef.current.scrollHeight - screenScrollRef.current.clientHeight;
        if (maxScroll > 0) {
          gsap.to(screenScrollRef.current, {
            scrollTop: maxScroll,
            duration: scrollSpeed,
            ease: "none",
            repeat: -1,
            yoyo: true,
            repeatDelay: 2
          });
        }
      }
    });

    return () => ctx.revert();
  }, [selectedTemplate, isPlaying, scrollSpeed]);

  // Handle atmosphere lighting pulse with GSAP
  useEffect(() => {
    let ctx = gsap.context(() => {
      if (glowLightRef.current) {
        gsap.to(glowLightRef.current, {
          scale: 1.15,
          opacity: 0.85,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    });
    return () => ctx.revert();
  }, [activeLight]);

  // Preset Angle Matrix for 3D Transform
  // [rotateX, rotateY, translateZ, perspective, rotateZ]
  const angles = {
    'front': { rx: 0, ry: 0, rz: 0, scale: 1.05, p: 1000, tz: 0 },
    'isometric': { rx: 14, ry: -18, rz: 3, scale: 0.95, p: 1200, tz: 30 },
    'low-angle': { rx: 25, ry: 10, rz: -4, scale: 1.0, p: 900, tz: 50 },
    'flat': { rx: 42, ry: -42, rz: 14, scale: 0.85, p: 1500, tz: -20 },
  };

  // Preset Lighting Schemes
  const lightingStyles = {
    cosmic: {
      bgGlow: 'from-violet-600/25 via-indigo-500/15 to-transparent',
      shadow: 'shadow-[0_0_80px_rgba(124,58,237,0.25)]',
      accent: 'text-indigo-400',
      border: 'border-violet-500/30',
      btn: 'bg-violet-500/10 hover:bg-violet-500/20 text-violet-300'
    },
    cyberpunk: {
      bgGlow: 'from-pink-500/20 via-rose-500/10 to-transparent',
      shadow: 'shadow-[0_0_80px_rgba(244,39,122,0.25)]',
      accent: 'text-rose-400',
      border: 'border-pink-500/30',
      btn: 'bg-pink-500/10 hover:bg-pink-500/20 text-pink-300'
    },
    aurora: {
      bgGlow: 'from-emerald-500/20 via-cyan-500/15 to-transparent',
      shadow: 'shadow-[0_0_80px_rgba(16,185,129,0.25)]',
      accent: 'text-cyan-400',
      border: 'border-cyan-500/20',
      btn: 'bg-emerald-500/10 hover:bg-emerald-500/20 text-cyan-400'
    },
    mono: {
      bgGlow: 'from-slate-400/15 via-slate-600/5 to-transparent',
      shadow: 'shadow-[0_0_80px_rgba(255,255,255,0.1)]',
      accent: 'text-slate-200',
      border: 'border-slate-500/20',
      btn: 'bg-slate-500/10 hover:bg-slate-500/20 text-slate-300'
    }
  };

  // Simulated Web Templates to run inside the scroll container
  const templates: WebsiteTemplate[] = [
    {
      id: 'agency',
      title: 'Start Mkt Digital MS',
      tag: 'Portfolio & Conversões',
      color: 'from-indigo-600 to-violet-700',
      description: 'Luminosa landing page institucional corporativa, com heros cinematográficos, métricas dinâmicas de SEO e blocos em mesh gradient.',
      elements: (
        <div className="w-full text-left bg-slate-950 font-sans selection:bg-indigo-500 selection:text-white">
          {/* Header */}
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-slate-950/80 sticky top-0 backdrop-blur-md z-10">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center font-black text-[10px] text-slate-950">
                S
              </div>
              <span className="text-xs font-bold text-white tracking-tight">Start Mkt</span>
            </div>
            <div className="flex gap-2.5">
              <div className="w-8 h-2 rounded-full bg-white/10" />
              <div className="w-8 h-2 rounded-full bg-white/10" />
              <div className="w-12 h-4 rounded-md bg-indigo-500/20 border border-indigo-500/30" />
            </div>
          </div>

          {/* Hero */}
          <div className="p-6 pt-10 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl" />
            <span className="text-[8px] uppercase tracking-widest font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
              PRESENÇA DIGITAL MÁXIMA
            </span>
            <h1 className="text-lg font-black text-white mt-3 leading-tight tracking-tight">
              Aceleramos Vendas <br />com Perfis de <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Alta Performance</span>
            </h1>
            <p className="text-[10px] text-slate-400 mt-2 max-w-sm mx-auto">
              Desenvolvemos ecossistemas web sob medida para empresas de Campo Grande e do MS se destacarem no topo absoluto do Google.
            </p>
            <div className="flex gap-2 justify-center mt-4">
              <div className="w-18 h-6 rounded-md bg-indigo-500 flex items-center justify-center text-[8px] font-bold text-white shadow-lg shadow-indigo-500/25">
                Iniciar Diagnóstico
              </div>
              <div className="w-18 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[8px] font-bold text-slate-300">
                Ver Cases
              </div>
            </div>
          </div>

          {/* Glass Bento Cards Section */}
          <div className="p-4 grid grid-cols-2 gap-3 bg-slate-900/40 border-t border-white/5">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-left">
              <span className="text-[8px] font-mono font-bold text-emerald-400">99.8% ACCURACY</span>
              <h3 className="text-[10px] font-bold text-slate-100 mt-1">SEO Turbinado</h3>
              <p className="text-[8px] text-slate-400 mt-1 font-light">Código sem lixo, renderização instantânea para indexação nota 100.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-left flex flex-col justify-between">
              <div>
                <span className="text-[8px] font-mono font-bold text-cyan-400">Otimização</span>
                <h3 className="text-[10px] font-bold text-slate-100 mt-1">Posição No Google</h3>
              </div>
              {/* Graphic Simulator */}
              <div className="flex gap-1 items-end mt-2 h-8">
                <div className="w-full bg-slate-800 h-2 rounded-t-sm" />
                <div className="w-full bg-slate-800 h-4 rounded-t-sm" />
                <div className="w-full bg-slate-800 h-5 rounded-t-sm" />
                <div className="w-full bg-indigo-500 h-8 rounded-t-sm" />
              </div>
            </div>
          </div>

          {/* Core dynamic service summary */}
          <div className="p-6 bg-slate-950 text-center">
            <h4 className="text-[10px] font-black text-slate-300">O que oferecemos:</h4>
            <ul className="mt-3 space-y-2 text-left">
              {[
                { title: 'Google Meu Negócio Premium', desc: 'Sincronização 100% de dados e fotos otimizadas.' },
                { title: 'Sites Ultrarrápidos em Next.js', desc: 'Performances imbatíveis no Core Web Vitals.' },
                { title: 'Gestão de Tráfego MS', desc: 'Captação local focada no público-alvo exato.' }
              ].map((serv, idx) => (
                <li key={idx} className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5 flex gap-2 items-start">
                  <div className="w-4 h-4 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-[8px] shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-[9px] font-bold text-slate-200">{serv.title}</h5>
                    <p className="text-[8px] text-slate-400">{serv.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'dashboard',
      title: 'Quantum SaaS Insight',
      tag: 'Analytics & Métricas',
      color: 'from-cyan-500 to-indigo-600',
      description: 'Painel analítico futurista com gráficos dinâmicos de faturamento, canais de conversão, metas financeiras e nodes de leads.',
      elements: (
        <div className="w-full text-left bg-slate-900 font-mono text-slate-300 selection:bg-cyan-500 selection:text-slate-950">
          {/* Top Bar */}
          <div className="p-3 border-b border-white/5 flex justify-between items-center bg-slate-950/80 sticky top-0 backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[9px] text-white font-black tracking-wider">QUANTUM_CORE_V1</span>
            </div>
            <span className="text-[8px] text-slate-500 bg-slate-900 rounded-sm px-1.5 py-0.5 border border-white/5">
              SECURE_TLS
            </span>
          </div>

          {/* Quick Metrics Header */}
          <div className="p-4 grid grid-cols-3 gap-2">
            <div className="p-2.5 rounded-lg bg-slate-950/50 border border-cyan-500/10 text-left">
              <span className="text-[7px] text-slate-500 uppercase tracking-wider block">MRR REVENUE</span>
              <span className="text-xs font-bold text-cyan-400 block mt-1">$42,910.02</span>
              <span className="text-[6px] text-emerald-400">+12% vs last month</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/50 border border-cyan-500/10 text-left">
              <span className="text-[7px] text-slate-500 uppercase tracking-wider block">ACTIVE_USERS</span>
              <span className="text-xs font-bold text-white block mt-1">11,283</span>
              <span className="text-[6px] text-indigo-400">99.98% runtime</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/50 border border-cyan-500/10 text-left">
              <span className="text-[7px] text-slate-500 uppercase tracking-wider block">CONVERSIONS</span>
              <span className="text-xs font-bold text-emerald-400 block mt-1">4.82%</span>
              <span className="text-[6px] text-cyan-400">Pulse stable</span>
            </div>
          </div>

          {/* Graph Core Representation */}
          <div className="mx-4 p-4 rounded-xl bg-slate-950/90 border border-white/5 text-left">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[8px] text-slate-300 font-bold uppercase tracking-widest">Global Traffic Index</span>
              <div className="flex gap-1.5 text-[6px] text-slate-500">
                <span className="text-cyan-400">● Live View</span>
                <span>● Server Status</span>
              </div>
            </div>
            {/* Visualizer bars simulated */}
            <div className="flex items-end gap-1.5 h-16 pt-2">
              {[20, 35, 10, 45, 60, 40, 75, 45, 90, 110, 85, 120, 150].map((val, idx) => (
                <div key={idx} className="w-full bg-slate-800 rounded-xs relative group" style={{ height: `${val / 1.5}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-xs shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                  {idx === 9 && (
                    <div className="absolute inset-0 bg-cyan-400 rounded-xs shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-1 text-[6px] text-slate-600 font-mono">
              <span>00:00 UTC</span>
              <span>12:00 UTC</span>
              <span>24:00 UTC</span>
            </div>
          </div>

          {/* Terminal / Live Feed block */}
          <div className="p-4 mt-2">
            <span className="text-[8px] text-slate-500 font-black block mb-2">SYSTEM_EVENT_FEED</span>
            <div className="space-y-1.5 text-[7px] text-slate-400 bg-slate-950 p-3 rounded-lg border border-white/5 font-mono">
              <p className="text-slate-500">{"[22:15:02] INITIALIZING BACKEND DATABASE..."}</p>
              <p className="text-emerald-400">{"[22:15:04] SUCCESS: Google API keys secured and validated"}</p>
              <p className="text-cyan-400">{"[22:15:07] INCOMING: Nova Lead de Campo Grande recebida"}</p>
              <p className="text-indigo-400">{"[22:15:10] PARSING: SEO audit complete (status: EXCELLENT)"}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'editorial',
      title: 'Apex AI Writer',
      tag: 'Minimal & Editorial',
      color: 'from-orange-500 to-red-600',
      description: 'Lindo portal de copywriting com foco em tipografia elegante (serifa clássica), espaçamento fluido e um canvas limpo.',
      elements: (
        <div className="w-full text-left bg-stone-50 font-sans text-stone-800 selection:bg-orange-200">
          {/* Clean Navigation */}
          <div className="p-4 border-b border-stone-200/40 flex justify-between items-center bg-stone-50/90 py-3 sticky top-0 backdrop-blur-md">
            <span className="font-serif text-sm italic font-bold tracking-tight text-stone-900">Apex_</span>
            <div className="flex gap-3 text-[8px] text-stone-500 font-medium">
              <span>Ensaios</span>
              <span>Modelos</span>
              <span className="text-orange-600">Upgrade →</span>
            </div>
          </div>

          {/* Clean Editorial Title */}
          <div className="px-5 py-10 text-left">
            <span className="text-[7px] tracking-widest text-orange-600 font-bold uppercase font-sans">
              PRODUTIVIDADE REVOLUCIONADA
            </span>
            <h2 className="font-serif text-xl font-bold tracking-tight text-stone-900 mt-2 mb-3 leading-tight">
              A elegância da escrita limpa aliada ao poder de <span className="italic font-normal">redes mentais profundas</span>.
            </h2>
            <p className="text-[10px] text-stone-500 leading-relaxed max-w-sm font-light">
              Uma ferramenta projetada exclusivamente para autores que exigem silêncio visual, tipografia impecável e assistentes de parágrafos contextuais.
            </p>
          </div>

          {/* Minimal visual item list with subtle borders */}
          <div className="border-t border-b border-stone-200/60 divide-y divide-stone-200/60 bg-white">
            {[
              { num: 'I', title: 'Interface Sem Ruído', desc: 'Concentre-se no seu fluxo intelectual com zero interrupções ou menus colaterais irrelevantes.' },
              { num: 'II', title: 'Nuvem Descentralizada', desc: 'Todo caractere redigido é sincronizado em frações de segundos via criptografia militar com redundância.' },
              { num: 'III', title: 'Assistência Hermética', desc: 'O motor de IA reorganiza a cadência das frases mantendo sua voz de autor única e refinada.' }
            ].map((sec, idx) => (
              <div key={idx} className="p-4 flex gap-4 items-start">
                <span className="font-serif text-[10px] text-orange-600 font-bold">{sec.num}</span>
                <div>
                  <h4 className="text-[10px] font-bold text-stone-900">{sec.title}</h4>
                  <p className="text-[8px] text-stone-500 mt-0.5 leading-relaxed font-light">{sec.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Minimal Action CTA Call */}
          <div className="p-6 text-center bg-stone-100">
            <p className="text-[9px] text-stone-400 font-serif italic">"Apex transformou nosso departamento literário completamente." @startmkt</p>
            <div className="w-24 h-7 rounded-sm border border-stone-800 text-[8px] font-medium text-stone-900 mx-auto flex items-center justify-center mt-4 bg-transparent hover:bg-stone-900 hover:text-white transition-colors cursor-pointer">
              Experimente Grátis
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentTemplate = templates.find(t => t.id === selectedTemplate) || templates[0];
  const activeStyle = lightingStyles[activeLight];
  const currentAngleObj = angles[activeAngle];

  return (
    <div className="relative w-full py-12 flex flex-col items-center">
      
      {/* Background Cinematic Atmos-Glow */}
      <div 
        ref={glowLightRef}
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full blur-[110px] transition-all bg-gradient-to-tr ${activeStyle.bgGlow} duration-700 pointer-events-none z-0`} 
      />

      {/* Main Content Layout */}
      <div className="w-full relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-8 items-center max-w-7xl px-4">
        
        {/* Left Side: Control Station Card */}
        <div className="xl:col-span-4 flex flex-col gap-5 text-left order-2 xl:order-1">
          {/* Control Title Info */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-5 rounded-3xl bg-white/5 dark:bg-slate-900/30 backdrop-blur-md border border-white/10 dark:border-white/5 shadow-xl"
          >
            <span className="text-[10px] uppercase font-mono font-black tracking-widest text-indigo-400 flex items-center gap-1 mb-2">
              <Compass className="w-3.5 h-3.5 animate-spin" /> ESTAÇÃO DE CONTROLE DE MOCKUP
            </span>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight leading-none">
              Showcase Interativo
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Mude as angulações de câmera 3D, controle a atmosfera luminosa e navegue por diferentes interfaces criadas pela nossa agência.
            </p>
          </motion.div>

          {/* Template Switcher */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-5 rounded-3xl bg-white/5 dark:bg-slate-900/30 backdrop-blur-md border border-white/10 dark:border-white/5 shadow-xl"
          >
            <h3 className="text-xs font-black tracking-wider text-slate-500 dark:text-slate-300 uppercase mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              1. Selecionar Interface
            </h3>
            
            <div className="flex flex-col gap-2">
              {templates.map((temp) => (
                <button
                  key={temp.id}
                  onClick={() => setSelectedTemplate(temp.id)}
                  className={`w-full p-3 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                    selectedTemplate === temp.id
                      ? 'bg-gradient-to-r from-indigo-500/10 to-transparent border-indigo-500 text-indigo-950 dark:text-white'
                      : 'bg-white/5 dark:bg-slate-950/20 border-transparent hover:bg-white/10 dark:hover:bg-slate-950/40 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                    temp.id === 'agency' ? 'bg-indigo-500' : temp.id === 'dashboard' ? 'bg-cyan-400' : 'bg-orange-500'
                  }`} />
                  <div>
                    <h4 className="font-bold text-xs leading-tight">{temp.title}</h4>
                    <span className="text-[10px] opacity-75">{temp.tag}</span>
                    {selectedTemplate === temp.id && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-light leading-snug"
                      >
                        {temp.description}
                      </motion.p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Angle Camera controls */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-5 rounded-3xl bg-white/5 dark:bg-slate-900/30 backdrop-blur-md border border-white/10 dark:border-white/5 shadow-xl"
          >
            <h3 className="text-xs font-black tracking-wider text-slate-500 dark:text-slate-300 uppercase mb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              2. Perspectiva da Câmera
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'isometric', label: 'Cinemático' },
                { id: 'front', label: 'Frontal Focado' },
                { id: 'low-angle', label: 'Visão de Baixo' },
                { id: 'flat', label: 'Detalhado Angular' }
              ].map((ang) => (
                <button
                  key={ang.id}
                  onClick={() => setActiveAngle(ang.id as any)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                    activeAngle === ang.id
                      ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-transparent shadow-lg'
                      : 'bg-white/5 dark:bg-slate-950/20 border-transparent hover:bg-white/10 dark:hover:bg-slate-950/40 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {ang.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Ambience & Atmosphere Selector */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-5 rounded-3xl bg-white/5 dark:bg-slate-900/30 backdrop-blur-md border border-white/10 dark:border-white/5 shadow-xl"
          >
            <h3 className="text-xs font-black tracking-wider text-slate-500 dark:text-slate-300 uppercase mb-3 flex items-center gap-2">
              <Palette className="w-4 h-4 text-emerald-400" />
              3. Atmosfera Luminosa
            </h3>
            <div className="flex gap-2">
              {(Object.keys(lightingStyles) as Array<keyof typeof lightingStyles>).map((light) => (
                <button
                  key={light}
                  onClick={() => setActiveLight(light)}
                  className={`flex-1 py-2 px-1 rounded-xl text-[10px] font-bold uppercase transition-all border cursor-pointer ${
                    activeLight === light
                      ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-extrabold'
                      : 'bg-white/5 dark:bg-slate-900/30 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-white'
                  }`}
                >
                  {light}
                </button>
              ))}
            </div>

            {/* Scrolling Simulator Control */}
            <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between gap-4">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Auto Rolagem</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-lg bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-white/20 transition-all cursor-pointer"
                  title={isPlaying ? "Pausar rolagem" : "Iniciar rolagem"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    if (screenScrollRef.current) {
                      gsap.to(screenScrollRef.current, { scrollTop: 0, duration: 0.6 });
                    }
                  }}
                  className="p-2 rounded-lg bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-white/20 transition-all cursor-pointer"
                  title="Reiniciar scroll"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: 3D Laptop Presenter canvas */}
        <div className="xl:col-span-8 flex flex-col items-center justify-center min-h-[480px] py-6 relative order-1 xl:order-2">
          
          {/* Floating dynamic status indicators for cinematic depth */}
          <div className="absolute inset-0 pointer-events-none z-20">
            {/* SEO Score floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: -1, duration: 4, ease: 'easeInOut' }}
              className="absolute top-10 left-4 md:left-24 p-2.5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 text-emerald-400 backdrop-blur-md flex items-center gap-2 shadow-lg"
            >
              <div className="p-1 h-7 w-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Gauge className="w-4 h-4 animate-pulse" />
              </div>
              <div className="text-left font-mono">
                <span className="text-[7px] text-slate-500 block">DESK PAGESPEED</span>
                <span className="text-xs font-bold leading-none">99/100 Core</span>
              </div>
            </motion.div>

            {/* Performance trending graph floating badge */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: -1, duration: 5, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-16 right-4 sm:right-12 p-2.5 rounded-2xl bg-slate-950/80 border border-cyan-500/30 text-cyan-400 backdrop-blur-md flex items-center gap-2 shadow-lg"
            >
              <div className="p-1 h-7 w-7 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-left font-mono">
                <span className="text-[7px] text-slate-500 block font-bold">CLIENT ORGANIC</span>
                <span className="text-xs font-bold leading-none">+450% Leads</span>
              </div>
            </motion.div>
          </div>

          {/* Interactive Mouse Tilt Canvas */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full max-w-[620px] h-[380px] flex items-center justify-center cursor-crosshair group/screen"
            style={{ perspective: `${currentAngleObj.p}px` }}
          >
            {/* Custom 3D Projected Laptop Rig */}
            <motion.div
              ref={laptopRef}
              style={{
                rotateX: activeAngle === 'isometric' ? mouseYSpring : currentAngleObj.rx,
                rotateY: activeAngle === 'isometric' ? mouseXSpring : currentAngleObj.ry,
                rotateZ: currentAngleObj.rz,
                z: currentAngleObj.tz,
                scale: currentAngleObj.scale,
                transformStyle: 'preserve-3d'
              }}
              transition={{ type: 'spring', stiffness: 80, damping: 18 }}
              className="relative w-[480px] sm:w-[560px] h-auto flex flex-col items-center select-none"
            >
              
              {/* LED Atmosphere shadow beneath the device */}
              <div className={`absolute -bottom-2 w-[104%] h-8 bg-slate-950/90 rounded-full blur-[24px] pointer-events-none transition-shadow ${activeStyle.shadow}`} />
              <div className="absolute -bottom-1 w-[90%] h-4 bg-slate-950/60 rounded-full blur-[8px] pointer-events-none" />

              {/* 1. Laptop Bezel/Screen Container (Rotated up) */}
              <div 
                className="relative w-full aspect-[16/10.3] rounded-2xl border-[5px] border-slate-950/95 bg-slate-950 shadow-2xl flex flex-col overflow-hidden leading-none origin-bottom"
                style={{ 
                  transform: 'rotateX(-6deg)', 
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 30px 100px -20px rgba(0,0,0,0.85), inset 0 0 1px 1px rgba(255,255,255,0.08)'
                }}
              >
                
                {/* Simulated Webcam Notch area */}
                <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-16 h-[6px] bg-slate-950 rounded-b-md z-30 flex items-center justify-center gap-1">
                  <div className="w-[3px] h-[3px] rounded-full bg-slate-800" />
                  <div className="w-[2px] h-[2px] rounded-full bg-cyan-600/60" />
                </div>

                {/* The Internal Display Field */}
                <div className="w-full h-full relative bg-slate-950 rounded-[10px] overflow-hidden">
                  
                  {/* Outer Laser Reflection Sheen overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.04] to-white/[0.15] pointer-events-none z-20 mix-blend-overlay transition-opacity group-hover/screen:opacity-70" />
                  <div className="absolute -inset-10 bg-gradient-to-r from-violet-500/5 via-cyan-500/5 to-emerald-500/5 blur-xl pointer-events-none z-10" />

                  {/* Website Browser Header Simulation */}
                  <div className="h-6 w-full bg-slate-950 border-b border-white/5 flex items-center justify-between px-3 z-20 relative font-sans">
                    <div className="flex gap-1.5 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                    </div>
                    {/* Fake locked URL line */}
                    <div className="h-4 w-44 rounded-sm bg-white/[0.03] border border-white/5 flex items-center justify-center gap-1 px-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
                      <span className="text-[7px] text-slate-500 scale-95 origin-center capitalize truncate tracking-tight">
                        {currentTemplate.title.toLowerCase().replace(/ /g, '')}.com.br
                      </span>
                    </div>
                    <div className="w-3 h-3 rounded-xs flex items-center justify-center text-slate-600 font-mono text-[8px] border border-white/5 bg-slate-900">
                      +
                    </div>
                  </div>

                  {/* Smooth Auto-Scrolling Template Viewport */}
                  <div 
                    ref={screenScrollRef}
                    className="w-full h-[calc(100%-24px)] overflow-y-auto scrollbar-thin scrollbar-track-slate-950 scrollbar-thumb-slate-800 relative z-0"
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedTemplate}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-auto"
                      >
                        {currentTemplate.elements}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                </div>

              </div>

              {/* 2. Realistic Aluminium Lower Bottom Case Frame hinge */}
              <div 
                className="w-[101.5%] h-2.5 bg-slate-200/90 dark:bg-slate-800/90 border-t border-b border-white/10 dark:border-white/5 shadow-md flex items-center justify-center relative origin-top"
                style={{ 
                  transform: 'rotateX(82deg) translateY(-2px)', 
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden'
                }}
              >
                {/* Display hinge groove shadow block */}
                <div className="absolute top-0 w-32 h-[3px] bg-slate-950 rounded-b-md" />
              </div>

              {/* 3. The Metal Keyboard / Lower Deck Surface base */}
              <div 
                className="w-[104%] aspect-[16/5.8] bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 border-t border-slate-100 dark:border-slate-700/60 shadow-2xl relative rounded-b-xl flex flex-col justify-between p-3"
                style={{ 
                  transform: 'rotateX(83deg) translateY(-22px) translateZ(-14px)',
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 20px 40px -15px rgba(0,0,0,0.9), inset 0 2px 2px rgba(255,255,255,0.4), inset 0 -2px 3px rgba(0,0,0,0.3)',
                  backfaceVisibility: 'hidden'
                }}
              >
                
                {/* Keyboard keys indentation simulation (Realistic details) */}
                <div className="w-full aspect-[16/3.0] bg-slate-950/20 dark:bg-slate-950/50 rounded-lg p-1.5 flex flex-col gap-1 border border-black/10 dark:border-slate-950">
                  {/* Row 1-4 represented by slim glowing keys blocks */}
                  {[1, 2, 3, 4].map((rowIdx) => (
                    <div key={rowIdx} className="w-full flex gap-1 justify-between flex-1">
                      {Array.from({ length: rowIdx === 4 ? 8 : 14 }).map((_, colIdx) => (
                        <div 
                          key={colIdx} 
                          className={`rounded-xs bg-slate-100/90 dark:bg-slate-800 border-b border-black/30 dark:border-slate-900 shadow-xs flex-1 transition-colors ${
                            rowIdx === 4 && colIdx === 3 ? 'flex-[4]' : '' // Space bar key
                          }`} 
                        />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Glass trackpad overlay */}
                <div className="w-24 h-11 bg-slate-100/30 dark:bg-slate-950/30 mx-auto rounded-md border border-slate-300/40 dark:border-slate-700/50 shadow-inner mt-2 shrink-0" />

                {/* Anodized lip indentation */}
                <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-14 h-[4px] bg-slate-900/60 dark:bg-slate-950/80 rounded-t-sm" />
              </div>

            </motion.div>
          </div>

          {/* Quick Stats/Pitch line below device */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-950/50 py-1.5 px-3 rounded-full border border-slate-200 dark:border-slate-800">
              <Monitor className="w-3.5 h-3.5 text-cyan-500" />
              Responsivo Multi-telas
            </span>
            <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-950/50 py-1.5 px-3 rounded-full border border-slate-200 dark:border-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
              Tecnologias de Vanguarda
            </span>
          </div>

        </div>

      </div>

      {/* Epic Smooth Transition Button scrolling to deep optimization checklist form */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-14 w-full max-w-lg flex flex-col items-center text-center px-4"
      >
        <span className="text-xs text-slate-400 dark:text-slate-500 font-bold max-w-sm mb-4">
          Pronto para elevar o posicionamento de sua empresa no Google Meu Negócio? Preencha os dados abaixo de forma automatizada.
        </span>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onScrollToForm}
          className="relative inline-flex items-center justify-center gap-3 py-4 px-8 rounded-2xl font-black text-sm text-white bg-slate-950 dark:bg-white dark:text-slate-950 shadow-2xl hover:shadow-indigo-500/20 hover:scale-105 cursor-pointer transition-all border border-white/10 dark:border-slate-800 group"
          type="button"
        >
          Ir Para Formulário GMN Checklist
          <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1.5 transition-transform" />
          
          {/* Subtle neon outline ring for visual attention */}
          <span className="absolute -inset-[1px] rounded-2xl border border-indigo-500/40 animate-pulse pointer-events-none" />
        </motion.button>
      </motion.div>

    </div>
  );
}
