export const MONTH_LABELS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
]

const MS_PER_DAY = 24 * 60 * 60 * 1000

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function daysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate()
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function diffInDays(a: Date, b: Date): number {
  return Math.round((startOfDay(a).getTime() - startOfDay(b).getTime()) / MS_PER_DAY)
}

/** Naegele's rule: EDD = LMP + 280 days (40 weeks), assuming a 28-day cycle. */
export function naegeleEDD(lmp: Date): Date {
  return addDays(lmp, 280)
}

export interface GestationalAge {
  weeks: number
  days: number
  totalDays: number
}

export function gestationalAge(lmp: Date, today: Date = new Date()): GestationalAge {
  const totalDays = Math.max(0, diffInDays(today, lmp))
  return { weeks: Math.floor(totalDays / 7), days: totalDays % 7, totalDays }
}

/** How far back the dial can reach: it has no year ring, so one full turn is its limit. */
export const MAX_LOOKBACK_DAYS = 364

export function clampDate(date: Date, min: Date, max: Date): Date {
  if (startOfDay(date) < startOfDay(min)) return min
  if (startOfDay(date) > startOfDay(max)) return max
  return date
}

export function trimesterFor(weeks: number): 1 | 2 | 3 {
  if (weeks < 13) return 1
  if (weeks < 27) return 2
  return 3
}

/**
 * The dial is laid out as 12 equal 30deg month arcs (matching the printed
 * pregnancy-wheel reference), with each day positioned proportionally
 * within its own month's arc so day 1 and the month's last day both read
 * at the arc's edges.
 */
export function angleForDate(date: Date): number {
  const month = date.getMonth()
  const day = date.getDate()
  const total = daysInMonth(date.getFullYear(), month)
  return month * 30 + ((day - 1) / total) * 30
}

/**
 * Inverse of angleForDate. The dial has no year ring, so it resolves to
 * the most recent past (or today's) occurrence of that month/day — the
 * same assumption a physical LMP wheel makes, since a last period is
 * never in the future.
 */
export function dateFromAngle(angleDeg: number, today: Date = new Date()): Date {
  const normalized = ((angleDeg % 360) + 360) % 360
  const month = Math.min(11, Math.floor(normalized / 30))
  const fracWithinMonth = (normalized - month * 30) / 30

  let year = today.getFullYear()
  let total = daysInMonth(year, month)
  let day = Math.min(total, Math.max(1, Math.round(fracWithinMonth * total) + 1))
  let candidate = new Date(year, month, day)

  if (startOfDay(candidate) > startOfDay(today)) {
    year -= 1
    total = daysInMonth(year, month)
    day = Math.min(total, Math.max(1, Math.round(fracWithinMonth * total) + 1))
    candidate = new Date(year, month, day)
  }

  return candidate
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function toInputValue(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function fromInputValue(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return null
  const [, y, m, d] = match
  const date = new Date(Number(y), Number(m) - 1, Number(d))
  return Number.isNaN(date.getTime()) ? null : date
}
