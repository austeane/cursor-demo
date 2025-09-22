import React, { useEffect, useMemo, useState } from 'react'
import { slides as initialSlides, type Slide, type KpiSlide, type ChartSlide } from './slides'

function useKeyboard(handlers: Partial<Record<string, (e: KeyboardEvent) => void>>) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (handlers[key]) handlers[key]!(e)
      else if ((key === ' ' || key === 'spacebar') && handlers[' ']) handlers[' ']!(e)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handlers])
}

export default function App() {
  const [slides, setSlides] = useState<Slide[]>(initialSlides)
  const [i, setI] = useState(0)
  const [showNotes, setShowNotes] = useState(false)
  const [showOverview, setShowOverview] = useState(false)
  const [help, setHelp] = useState(false)
  const [reveals, setReveals] = useState<Record<number, number>>({})
  const total = slides.length

  // HMR for slides
  useEffect(() => {
    const hot = (import.meta as unknown as { hot?: { accept: (path: string, cb: (mod: { slides?: Slide[] }) => void) => void } }).hot
    if (hot) {
      hot.accept('./slides', (mod) => {
        if (mod?.slides) setSlides(mod.slides)
      })
    }
  }, [])

  const current = slides[i]
  const progress = useMemo(() => (i + 1) / total, [i, total])
  const currentBulletCount = useMemo(() =>
    current && (current as any).type === 'bullets' ? ((current as any).bullets?.length ?? 0) : 0
  , [current])
  const currentRevealCount = reveals[i] ?? 0

  const next = () => {
    if ((current as any)?.type === 'bullets' && currentRevealCount < currentBulletCount) {
      setReveals((prev) => ({ ...prev, [i]: (prev[i] ?? 0) + 1 }))
      return
    }
    setI((n) => Math.min(n + 1, total - 1))
  }

  const prev = () => {
    if ((current as any)?.type === 'bullets' && currentRevealCount > 0) {
      setReveals((prev) => ({ ...prev, [i]: Math.max(0, (prev[i] ?? 0) - 1) }))
      return
    }
    setI((n) => Math.max(n - 1, 0))
  }
  const go = (idx: number) => { setI(Math.max(0, Math.min(idx, total - 1))); setShowOverview(false) }

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen().catch(() => {})
    else await document.exitFullscreen().catch(() => {})
  }

  useKeyboard({
    arrowright: () => next(),
    arrowdown: () => next(),
    ' ': (e) => { e.preventDefault(); next() },
    arrowleft: () => prev(),
    arrowup: () => prev(),
    f: () => toggleFullscreen(),
    n: () => setShowNotes((v) => !v),
    o: () => setShowOverview((v) => !v),
    '?': () => setHelp((v) => !v),
    h: () => setHelp((v) => !v),
  })

  // start at slide from URL hash (#N)
  useEffect(() => {
    const m = window.location.hash.match(/^#(\d+)$/)
    if (m) {
      const idx = Math.max(1, Math.min(parseInt(m[1], 10), total)) - 1
      setI(idx)
    }
  }, [total])

  // update hash when slide changes
  useEffect(() => {
    const newHash = `#${i + 1}`
    if (window.location.hash !== newHash) {
      history.replaceState(null, '', newHash)
    }
  }, [i])

  const accent = (current as any).accent || '#bfc7d4'
  const bgMode = (current as any).bg || 'plain'

  return (
    <div className="stage" style={{ ['--accent' as any]: accent } as React.CSSProperties}>
      <div className="bgGrid" />
      {bgMode === 'burst' && <div className="bgBurst" />}

      <a className="logo" href="https://cursor.com" target="_blank" rel="noreferrer" aria-label="Cursor">
        <img src="/cursor-logo.svg" alt="Cursor" />
      </a>

      <div className="progress"><div className="bar" style={{ transform: `scaleX(${progress})` }} /></div>

      <div className="frame">
        <SlideView slide={current} revealCount={(current as any)?.type === 'bullets' ? currentRevealCount : undefined} />

        <div className="footer">
          <span className="index">{i + 1} / {total}</span>
          <div className="controls">
            <button onClick={prev} aria-label="Previous">←</button>
            <button onClick={next} aria-label="Next">→</button>
            <button onClick={() => setShowNotes((v) => !v)} aria-label="Notes">Notes</button>
            <button onClick={() => setShowOverview((v) => !v)} aria-label="Overview">Grid</button>
            <button onClick={toggleFullscreen} aria-label="Fullscreen">Full</button>
            <button onClick={() => setHelp((v) => !v)} aria-label="Help">?</button>
          </div>
        </div>
      </div>

      {showNotes && <NotesOverlay slide={current} onClose={() => setShowNotes(false)} />}
      {showOverview && <OverviewGrid slides={slides} currentIndex={i} onPick={go} />}
      {help && <Help onClose={() => setHelp(false)} />}
    </div>
  )
}

function SlideView({ slide, revealCount = Infinity }: { slide: Slide; revealCount?: number }) {
  switch (slide.type) {
    case 'title':
      return (
        <div className={`card title ${slide.bg || 'plain'}`}>
          {'eyebrow' in slide && slide.eyebrow && <div className="eyebrow">{slide.eyebrow}</div>}
          {'title' in slide && <h1 className="titleText">{(slide as any).title}</h1>}
          {'subtitle' in slide && (slide as any).subtitle && <p className="subtitle">{(slide as any).subtitle}</p>}
        </div>
      )
    case 'bullets':
      return (
        <div className={`card bullets ${slide.bg || 'plain'}`}>
          <h2 className="heading">{(slide as any).title}</h2>
          <ul>
            {(slide as any).bullets.map((b: any, idx: number) => (
              typeof b === 'string'
                ? <li key={idx} className={`reveal ${idx < (revealCount as number) ? 'on' : 'off'}`}><span className="dot" /> {b}</li>
                : <li key={idx} className={`reveal ${idx < (revealCount as number) ? 'on' : 'off'}`}>
                    <span className="dot" /> {b.text}
                    {Array.isArray(b.sub) && b.sub.length > 0 && (
                      <ul className="sub">
                        {b.sub.map((s: string, j: number) => (
                          <li key={j}><span className="subDot" /> {s}</li>
                        ))}
                      </ul>
                    )}
                  </li>
            ))}
          </ul>
        </div>
      )
    case 'table':
      return (
        <div className={`card table ${slide.bg || 'plain'}`}>
          <h2 className="heading">{(slide as any).title}</h2>
          {'subtitle' in slide && (slide as any).subtitle && <p className="subtitle">{(slide as any).subtitle}</p>}
          <div className="tableWrap">
            <table>
              <thead><tr>{(slide as any).headers.map((h: string, i: number) => <th key={i}>{h}</th>)}</tr></thead>
              <tbody>
                {(slide as any).rows.map((row: string[], r: number) => (
                  <tr key={r}>{row.map((cell, c) => <td key={c}>{cell}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    case 'kpis':
      return <KpiGridSlide slide={slide as KpiSlide} />
    case 'chart':
      return <ChartSlideView slide={slide as ChartSlide} />
    default:
      return null
  }
}

/* ---------- KPI GRID ---------- */
function KpiGridSlide({ slide }: { slide: KpiSlide }) {
  return (
    <div className={`card kpis ${slide.bg || 'plain'}`}>
      <h2 className="heading">{slide.title}</h2>
      <div className="kpiGrid">
        {slide.kpis.map((k, idx) => (
          <div className="kpiTile" key={idx}>
            <div className="kpiValue">{k.value}</div>
            <div className="kpiLabel">{k.label}</div>
            {k.sub && <div className="kpiSub">{k.sub}</div>}
            {k.trend && <Spark values={k.trend} target={k.value} />}
            {k.footnote && <div className="kpiFoot">{k.footnote}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

function Spark({ values, target }: { values: number[]; target?: string | number }) {
  const w = 92, h = 32, p = 8
  const min = Math.min(...values), max = Math.max(...values)
  const dx = (w - p * 2) / Math.max(1, values.length - 1)
  const scaleY = (v: number) => {
    const denom = max - min || 1
    return p + (h - p * 2) * (1 - (v - min) / denom)
  }
  const d = values.map((v, i) => `${i ? 'L' : 'M'} ${p + i * dx} ${scaleY(v)}`).join(' ')
  const lastX = p + (values.length - 1) * dx
  const lastY = scaleY(values[values.length - 1])
  const xEndLabel = values.length
  const targetLabel = target ?? values[values.length - 1]
  const firstX = p
  const firstY = scaleY(values[0])
  const zeroLabelX = Math.max(6, firstX - 2)
  const zeroLabelY = Math.min(h - 2, firstY + 8)
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true">
      <path d={d} fill="none" stroke="var(--accent)" strokeWidth="2" />
      <circle cx={lastX} cy={lastY} r="2.5" fill="var(--accent)" />
      {/* tiny axis labels */}
      <text x={zeroLabelX} y={zeroLabelY} textAnchor="end" fill="#a5aab5" fontSize="10">0</text>
      <text x={lastX} y={h - 3} textAnchor="middle" fill="#a5aab5" fontSize="10">{xEndLabel}</text>
      <text x={zeroLabelX -6} y={10} textAnchor="start" fill="#a5aab5" fontSize="10">{String(targetLabel)}</text>
    </svg>
  )
}

/* ---------- LINE CHART ---------- */
function ChartSlideView({ slide }: { slide: ChartSlide }) {
  const pad = { l: 54, r: 16, t: 18, b: 36 }
  const W = 900, H = 320
  const innerW = W - pad.l - pad.r
  const innerH = H - pad.t - pad.b

  const all = slide.series.flatMap(s => s.data)
  const min = Math.min(...all)
  const max = Math.max(...all)
  const denom = max - min || 1

  const x = (i: number) => pad.l + (innerW * i) / Math.max(1, slide.x.length - 1)
  const y = (v: number) => pad.t + innerH * (1 - (v - min) / denom)

  const mkPath = (vals: number[]) =>
    vals.map((v, i) => `${i ? 'L' : 'M'} ${x(i)} ${y(v)}`).join(' ')

  // horizontal gridlines (4)
  const gridYs = [0, 0.25, 0.5, 0.75, 1].map(r => pad.t + innerH * r)

  // axis helper labels
  const xEndLabel = slide.x.length
  const targetValue = (slide.series[0]?.data?.[slide.series[0]?.data.length - 1]) ?? max

  return (
    <div className={`card chart ${slide.bg || 'plain'}`}>
      <h2 className="heading">{slide.title}</h2>
      <div className="chartWrap">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img">
          {/* Y grid */}
          {gridYs.map((gy, i) => (
            <line key={i} x1={pad.l} x2={W - pad.r} y1={gy} y2={gy} stroke="rgba(255,255,255,0.08)" />
          ))}
          {/* X labels */}
          {slide.x.map((label, i) => (
            <text key={i} x={x(i)} y={H - 10} textAnchor="middle" fill="#a5aab5" fontSize="12">{label}</text>
          ))}
          {/* Small axis endpoints */}
          <text x={pad.l} y={H - 10} textAnchor="middle" fill="#a5aab5" fontSize="12">0</text>
          <text x={W - pad.r} y={H - 10} textAnchor="middle" fill="#a5aab5" fontSize="12">{xEndLabel}</text>
          {/* Y min/max labels */}
          <text x={8} y={pad.t + 8} fill="#a5aab5" fontSize="12">{max}</text>
          <text x={8} y={pad.t + innerH + 4} fill="#a5aab5" fontSize="12">{min}</text>
          {/* Y-axis target label at the top */}
          <text x={pad.l - 10} y={pad.t + 8} textAnchor="end" fill="#a5aab5" fontSize="12">{targetValue}</text>
          {/* Series */}
          {slide.series.map((s, idx) => (
            <g key={idx}>
              <path d={mkPath(s.data)} fill="none"
                stroke={idx === 0 ? 'var(--accent)' : 'rgba(191,199,212,0.85)'}
                strokeWidth={2.5}
                strokeDasharray={s.dashed ? '6 6' : '0'} />
              {/* Last point */}
              <circle cx={x(s.data.length - 1)} cy={y(s.data[s.data.length - 1])} r="3"
                fill={idx === 0 ? 'var(--accent)' : 'rgba(191,199,212,0.85)'} />
              {/* Legend */}
              <text x={pad.l + 8} y={pad.t + 16 + idx * 18} fill={idx === 0 ? 'var(--accent)' : '#bfc7d4'} fontSize="13">
                {s.name}
              </text>
            </g>
          ))}
          {/* Y axis label */}
          {slide.yLabel && (
            <text x={pad.l - 36} y={pad.t + innerH / 2} fill="#a5aab5" fontSize="12" transform={`rotate(-90 ${pad.l - 36} ${pad.t + innerH / 2})`}>
              {slide.yLabel}
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}

/* ---------- Overlays / chrome ---------- */
function NotesOverlay({ slide, onClose }: { slide: Slide; onClose: () => void }) {
  const notes = (slide as any).notes ?? 'Add `notes:` in slides.ts; toggle with N.'
  return (
    <div className="overlay" onClick={onClose}>
      <div className="overlayPanel" onClick={(e) => e.stopPropagation()}>
        <div className="overlayHeader"><strong>Presenter Notes</strong><button onClick={onClose}>✕</button></div>
        <pre className="notes">{notes}</pre>
      </div>
    </div>
  )
}

function OverviewGrid({ slides, currentIndex, onPick }:{ slides: Slide[]; currentIndex: number; onPick: (i:number)=>void }) {
  return (
    <div className="overlay" onClick={() => onPick(currentIndex)}>
      <div className="grid" onClick={(e) => e.stopPropagation()}>
        {slides.map((s, idx) => (
          <button key={idx} className={`thumb ${idx === currentIndex ? 'active' : ''}`} onClick={() => onPick(idx)}>
            <div className="thumbInner">
              <small>{s.type.toUpperCase()}</small>
              {'title' in s && (s as any).title
                ? <div className="thumbTitle">{(s as any).title}</div>
                : 'eyebrow' in s
                ? <div className="thumbTitle">{(s as any).eyebrow}</div>
                : <div className="thumbTitle">Slide {idx + 1}</div>}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function Help({ onClose }: { onClose: () => void }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="overlayPanel" onClick={(e) => e.stopPropagation()}>
        <div className="overlayHeader"><strong>Shortcuts</strong><button onClick={onClose}>✕</button></div>
        <ul className="helpList">
          <li><kbd>→</kbd>/<kbd>Space</kbd> Next</li>
          <li><kbd>←</kbd> Previous</li>
          <li><kbd>N</kbd> Notes</li>
          <li><kbd>O</kbd> Overview Grid</li>
          <li><kbd>F</kbd> Fullscreen</li>
          <li><kbd>H</kbd>/<kbd>?</kbd> Help</li>
        </ul>
      </div>
    </div>
  )
}