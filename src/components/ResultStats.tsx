import type { ReactNode } from 'react'
import { formatDate } from '../lib/pregnancy'

interface ResultStatsProps {
  edd: Date
  weeks: number
  days: number
  trimester: 1 | 2 | 3
  daysToGo: number
}

const ORDINAL = { 1: '1st', 2: '2nd', 3: '3rd' } as const

function dueLabel(daysToGo: number) {
  if (daysToGo > 0) return { value: String(daysToGo), unit: daysToGo === 1 ? 'day to go' : 'days to go' }
  if (daysToGo === 0) return { value: 'Due', unit: 'today' }
  const overdue = Math.abs(daysToGo)
  return { value: String(overdue), unit: overdue === 1 ? 'day overdue' : 'days overdue' }
}

function TrimesterSteps({ trimester }: { trimester: 1 | 2 | 3 }) {
  return (
    <div className="mt-1.5 flex gap-1 sm:mt-2" aria-hidden="true">
      {([1, 2, 3] as const).map((t) => (
        <span
          key={t}
          className={`h-1 flex-1 rounded-full transition-colors ${
            t <= trimester ? 'bg-rose-600 dark:bg-rose-400' : 'bg-cream-300 dark:bg-navy-700'
          }`}
        />
      ))}
    </div>
  )
}

function Stat({
  eyebrow,
  value,
  accent,
  extra,
}: {
  eyebrow: string
  value: string
  accent?: boolean
  extra?: ReactNode
}) {
  return (
    <div className="border-t border-cream-300 py-2 first:border-t-0 first:pt-0 dark:border-navy-700 sm:py-4">
      <p className="font-sans text-[9px] font-semibold uppercase tracking-widest2 text-navy-500 dark:text-navy-300 sm:text-[11px]">
        {eyebrow}
      </p>
      <p
        className={`mt-0.5 font-display text-xl font-semibold leading-none sm:mt-1 sm:text-3xl lg:text-[2.25rem] ${
          accent ? 'text-rose-600 dark:text-rose-400' : 'text-navy-950 dark:text-navy-50'
        }`}
      >
        {value}
      </p>
      {extra}
    </div>
  )
}

export default function ResultStats({ edd, weeks, days, trimester, daysToGo }: ResultStatsProps) {
  const due = dueLabel(daysToGo)

  return (
    <div className="flex flex-col">
      <Stat eyebrow="Estimated due date · EDD" value={formatDate(edd)} accent />
      <Stat eyebrow="Gestational age" value={`${weeks}w ${days}d`} />
      <Stat eyebrow="Trimester" value={ORDINAL[trimester]} extra={<TrimesterSteps trimester={trimester} />} />
      <Stat eyebrow={due.unit} value={due.value} accent={daysToGo <= 0} />
    </div>
  )
}
