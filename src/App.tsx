import { Heart } from 'lucide-react'
import { useMemo, useState } from 'react'
import LmpWheel from './components/LmpWheel'
import LmpInput from './components/LmpInput'
import ResultStats from './components/ResultStats'
import ThemeToggle from './components/ThemeToggle'
import { diffInDays, gestationalAge, naegeleEDD, startOfDay, trimesterFor } from './lib/pregnancy'

const today = startOfDay(new Date())

export default function App() {
  const [lmp, setLmp] = useState(() => {
    const d = new Date(today)
    d.setDate(d.getDate() - 70)
    return d
  })

  const edd = useMemo(() => naegeleEDD(lmp), [lmp])
  const age = useMemo(() => gestationalAge(lmp, today), [lmp])
  const trimester = trimesterFor(age.weeks)
  const daysToGo = useMemo(() => diffInDays(edd, today), [edd])

  return (
    <div className="min-h-svh bg-cream-50 dark:bg-navy-950">
      <div className="mx-auto flex min-h-svh w-full max-w-5xl flex-col px-5 py-4 sm:px-10 sm:py-10">
        <header className="flex items-center justify-between">
          <span className="font-sans text-sm font-bold uppercase tracking-widest2 text-navy-950 dark:text-navy-50">
            GBD Meter
          </span>
          <ThemeToggle />
        </header>

        <main className="flex flex-1 flex-col justify-center gap-4 py-4 sm:gap-10 sm:py-8 lg:flex-row lg:items-center lg:gap-16 lg:py-16">
          <section className="flex flex-col items-center gap-3 sm:gap-6 lg:flex-[1.1]">
            <h1 className="max-w-xs text-center font-display text-2xl font-bold uppercase leading-[0.95] tracking-wide text-navy-950 dark:text-navy-50 sm:max-w-md sm:text-4xl lg:text-5xl">
              Rotate to the last period
            </h1>

            <LmpWheel value={lmp} edd={edd} today={today} onChange={setLmp} />

            <div className="w-full max-w-xs">
              <LmpInput value={lmp} today={today} onChange={setLmp} />
            </div>
          </section>

          <section className="w-full max-w-sm lg:flex-1">
            <ResultStats edd={edd} weeks={age.weeks} days={age.days} trimester={trimester} daysToGo={daysToGo} />
          </section>
        </main>

        <footer className="border-t border-cream-300 pt-3 text-center dark:border-navy-700 sm:pt-5">
          <p className="flex items-center justify-center gap-1.5 text-xs text-navy-500 dark:text-navy-300">
            RIRI MADE IT with
            <Heart className="h-3.5 w-3.5 fill-rose-600 text-rose-600 dark:fill-rose-400 dark:text-rose-400" />
          </p>
        </footer>
      </div>
    </div>
  )
}
