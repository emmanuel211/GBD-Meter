import { CalendarDays } from 'lucide-react'
import { MAX_LOOKBACK_DAYS, addDays, clampDate, fromInputValue, toInputValue } from '../lib/pregnancy'

interface LmpInputProps {
  value: Date
  today: Date
  onChange: (date: Date) => void
}

export default function LmpInput({ value, today, onChange }: LmpInputProps) {
  const minDate = addDays(today, -MAX_LOOKBACK_DAYS)

  return (
    <label className="flex items-center gap-2.5 rounded-2xl border border-cream-300 bg-cream-50 px-3.5 py-2.5 transition-colors focus-within:border-rose-400 dark:border-navy-700 dark:bg-navy-900 sm:gap-3 sm:px-4 sm:py-3">
      <CalendarDays className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-300" />
      <span className="shrink-0 font-sans text-[11px] font-semibold uppercase tracking-widest2 text-navy-500 dark:text-navy-300">
        LMP
      </span>
      <input
        type="date"
        value={toInputValue(value)}
        min={toInputValue(minDate)}
        max={toInputValue(today)}
        onChange={(e) => {
          const parsed = fromInputValue(e.target.value)
          if (parsed) onChange(clampDate(parsed, minDate, today))
        }}
        className="w-full appearance-none bg-transparent font-sans text-sm font-medium text-navy-950 outline-none [color-scheme:light] dark:text-navy-50 dark:[color-scheme:dark]"
      />
    </label>
  )
}
