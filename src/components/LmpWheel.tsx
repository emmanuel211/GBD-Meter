import { useCallback, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import {
  MAX_LOOKBACK_DAYS,
  MONTH_LABELS,
  angleForDate,
  dateFromAngle,
  diffInDays,
  formatDate,
  startOfDay,
} from '../lib/pregnancy'

interface LmpWheelProps {
  value: Date
  edd: Date
  today: Date
  onChange: (date: Date) => void
}

const SIZE = 400
const CENTER = SIZE / 2
const RING_R = 150
const TICK_MAJOR_OUT = 166
const TICK_MINOR_OUT = 159
const LABEL_R = 180
const ARC_R = 138
const HIT_STROKE = 56

function polarToCartesian(r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: CENTER + r * Math.cos(rad), y: CENTER + r * Math.sin(rad) }
}

function describeArc(r: number, startAngle: number, endAngleRaw: number) {
  const endAngle = endAngleRaw <= startAngle ? endAngleRaw + 360 : endAngleRaw
  const start = polarToCartesian(r, startAngle)
  const end = polarToCartesian(r, endAngle)
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`
}

export default function LmpWheel({ value, edd, today, onChange }: LmpWheelProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dragging, setDragging] = useState(false)
  const reduceMotion = usePrefersReducedMotion()

  const angleFromPointer = useCallback((clientX: number, clientY: number) => {
    const rect = svgRef.current!.getBoundingClientRect()
    const dx = clientX - (rect.left + rect.width / 2)
    const dy = clientY - (rect.top + rect.height / 2)
    let deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90
    if (deg < 0) deg += 360
    return deg
  }, [])

  const applyPointer = useCallback(
    (clientX: number, clientY: number) => {
      onChange(dateFromAngle(angleFromPointer(clientX, clientY), today))
    },
    [angleFromPointer, onChange, today],
  )

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    ;(e.target as Element).setPointerCapture(e.pointerId)
    setDragging(true)
    applyPointer(e.clientX, e.clientY)
  }
  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragging) return
    applyPointer(e.clientX, e.clientY)
  }
  const endDrag = () => setDragging(false)

  const handleKeyDown = (e: React.KeyboardEvent<SVGCircleElement>) => {
    const step =
      e.key === 'ArrowLeft' || e.key === 'ArrowDown'
        ? -1
        : e.key === 'ArrowRight' || e.key === 'ArrowUp'
          ? 1
          : e.key === 'PageDown'
            ? -7
            : e.key === 'PageUp'
              ? 7
              : 0
    if (step === 0) return
    e.preventDefault()
    const next = new Date(value)
    next.setDate(next.getDate() + step)
    if (startOfDay(next) > startOfDay(today)) return
    onChange(next)
  }

  const lmpAngle = angleForDate(value)
  const eddAngle = angleForDate(edd)
  const isToday = startOfDay(value).getTime() === startOfDay(today).getTime()

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[13.5rem] select-none touch-none sm:max-w-[19rem] lg:max-w-[26rem]">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-full w-full cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        role="presentation"
      >
        {/* gestation span band */}
        <path
          d={describeArc(ARC_R, lmpAngle, eddAngle)}
          className="fill-none stroke-rose-500/25 dark:stroke-rose-400/20"
          strokeWidth={20}
          strokeLinecap="round"
        />

        {/* base ring */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RING_R}
          className="fill-none stroke-cream-200 dark:stroke-navy-700"
          strokeWidth={1.5}
        />

        {/* month ticks + labels */}
        {MONTH_LABELS.map((label, m) => {
          const boundary = m * 30
          const major = polarToCartesian(RING_R, boundary)
          const majorOut = polarToCartesian(TICK_MAJOR_OUT, boundary)
          const labelPos = polarToCartesian(LABEL_R, boundary + 15)
          return (
            <g key={label}>
              <line
                x1={major.x}
                y1={major.y}
                x2={majorOut.x}
                y2={majorOut.y}
                className="stroke-navy-300 dark:stroke-navy-500"
                strokeWidth={1.5}
              />
              {[1, 2, 3, 4, 5].map((i) => {
                const a = boundary + (30 / 6) * i
                const inner = polarToCartesian(RING_R, a)
                const outer = polarToCartesian(TICK_MINOR_OUT, a)
                return (
                  <line
                    key={i}
                    x1={inner.x}
                    y1={inner.y}
                    x2={outer.x}
                    y2={outer.y}
                    className="stroke-cream-300 dark:stroke-navy-700"
                    strokeWidth={1}
                  />
                )
              })}
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-navy-500 dark:fill-navy-300 font-sans text-[17px] font-semibold tracking-widest2 sm:text-[12px] lg:text-[10px]"
              >
                {label}
              </text>
            </g>
          )
        })}

        {/* today marker */}
        {(() => {
          const todayAngle = angleForDate(today)
          const inner = polarToCartesian(RING_R - 8, todayAngle)
          const outer = polarToCartesian(TICK_MAJOR_OUT, todayAngle)
          return (
            <line
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              className="stroke-navy-400 dark:stroke-navy-300"
              strokeWidth={2}
              strokeDasharray="1 3.2"
              strokeLinecap="round"
            />
          )
        })()}

        {/* EDD marker */}
        {(() => {
          const pos = polarToCartesian(RING_R, eddAngle)
          return (
            <circle
              cx={pos.x}
              cy={pos.y}
              r={6}
              className="fill-cream-50 stroke-rose-400 dark:fill-navy-900 dark:stroke-rose-300"
              strokeWidth={2.5}
              style={{
                transition: reduceMotion
                  ? 'none'
                  : 'cx 0.4s cubic-bezier(0.16,1,0.3,1), cy 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            />
          )
        })()}

        {/* invisible wide hit-ring for easier grabbing */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RING_R}
          className="fill-none stroke-transparent"
          strokeWidth={HIT_STROKE}
        />

        {/* LMP handle */}
        {(() => {
          const pos = polarToCartesian(RING_R, lmpAngle)
          return (
            <circle
              cx={pos.x}
              cy={pos.y}
              r={dragging ? 14 : 12}
              tabIndex={0}
              role="slider"
              aria-label="Last menstrual period date"
              aria-valuetext={formatDate(value)}
              aria-valuenow={diffInDays(today, value)}
              aria-valuemin={0}
              aria-valuemax={MAX_LOOKBACK_DAYS}
              onKeyDown={handleKeyDown}
              className="fill-rose-600 stroke-cream-50 dark:stroke-navy-950 outline-none focus-visible:stroke-rose-300"
              strokeWidth={4}
              style={{
                filter: 'drop-shadow(0 2px 6px rgba(184,31,95,0.45))',
                transition: reduceMotion
                  ? 'none'
                  : dragging
                    ? 'r 0.15s ease-out'
                    : 'r 0.15s ease-out, cx 0.4s cubic-bezier(0.16,1,0.3,1), cy 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            />
          )
        })()}
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center sm:px-6">
        <span className="font-sans text-[9px] font-semibold uppercase tracking-widest2 text-navy-500 dark:text-navy-300 sm:text-[11px]">
          {isToday ? 'LMP · today' : 'LMP'}
        </span>
        <span className="font-display text-lg font-semibold leading-none text-navy-950 dark:text-navy-50 sm:text-3xl lg:text-[2.6rem]">
          {formatDate(value)}
        </span>
        <span className="mt-2 hidden text-[11px] text-navy-500 dark:text-navy-300 sm:block">
          drag the ring, or set it manually below
        </span>
      </div>
    </div>
  )
}
