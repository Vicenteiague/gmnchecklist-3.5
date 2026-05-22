import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function ThemeToggle({ darkMode, setDarkMode }: ThemeToggleProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setDarkMode(!darkMode)}
      className="relative p-2.5 rounded-xl border border-white/10 dark:border-white/10 md:bg-white/5 bg-slate-100/80 dark:bg-slate-900/30 backdrop-blur-md text-slate-700 dark:text-slate-200 cursor-pointer transition-colors duration-200 shadow-md flex items-center justify-center"
      aria-label="Alternar tema de cores"
    >
      <motion.div
        initial={false}
        animate={{ rotate: darkMode ? 180 : 0, scale: darkMode ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className={darkMode ? 'absolute invisible' : 'visible'}
      >
        <Moon className="w-5 h-5 text-indigo-600" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: darkMode ? 0 : -180, scale: darkMode ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={!darkMode ? 'absolute invisible' : 'visible'}
      >
        <Sun className="w-5 h-5 text-amber-400" />
      </motion.div>
    </motion.button>
  );
}
