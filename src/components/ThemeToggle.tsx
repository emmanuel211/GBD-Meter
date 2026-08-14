import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream-300 bg-cream-50 text-navy-950 outline-none transition-colors hover:border-rose-400 hover:text-rose-600 focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 dark:border-navy-700 dark:bg-navy-900 dark:text-navy-50 dark:hover:border-rose-400 dark:hover:text-rose-300 dark:focus-visible:ring-offset-navy-950"
    >
      {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  )
}
