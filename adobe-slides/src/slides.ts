// Slide content + visual hints. Edit these numbers live during the demo.

type Common = {
  bg?: 'plain' | 'burst'   // monochrome vs subtle color glow
  accent?: string          // single accent color per slide (optional)
}

export type TitleSlide = Common & {
  type: 'title'
  eyebrow?: string
  title: string
  subtitle?: string
}

export type BulletsSlide = Common & {
  type: 'bullets'
  title: string
  bullets: string[]
  notes?: string
}

export type TableSlide = Common & {
  type: 'table'
  title: string
  headers: string[]
  rows: string[][]
  notes?: string
}

export type KpiSlide = Common & {
  type: 'kpis'
  title: string
  kpis: { label: string; value: string; sub?: string; trend?: number[]; footnote?: string }[]
  notes?: string
}

export type ChartSlide = Common & {
  type: 'chart'
  title: string
  x: string[]                 // x-axis labels
  series: { name: string; data: number[]; dashed?: boolean }[]
  yLabel?: string
  notes?: string
}

export type Slide = TitleSlide | BulletsSlide | TableSlide | KpiSlide | ChartSlide

export const slides: Slide[] = [
  {
    type: 'title',
    bg: 'burst',
    accent: '#9ad0ff',
    eyebrow: '30‑Day Trial Kickoff',
    title: 'Adobe × Cursor — Trial Scorecard',
    subtitle: 'Outcomes, measurement, and the acceleration you should expect.',
  },

  // KPI Scorecard — edit values live
  {
    type: 'kpis',
    bg: 'plain',
    title: "What we'll measure (and what we typically see in Month 1)",
    kpis: [
      { label: 'Weekly active devs', value: '80%', sub: 'by Day 28', trend: [40, 60, 72, 80] },
      { label: 'PRs closed (index)', value: '+12%', sub: 'vs. baseline', trend: [95, 100, 108, 112] },
      { label: 'PR lead time', value: '−15%', sub: 'by Week 4', trend: [1.0, 0.96, 0.90, 0.85], footnote: 'Lower is better' },
      { label: 'Accepted AI lines', value: '30%', sub: 'of merged lines', trend: [12, 18, 25, 30] },
      { label: 'Automated PR reviews', value: '70%', sub: 'PRs w/ Bugbot by W4', trend: [35, 50, 60, 70] },
    ],
    notes: 'Numbers reflect typical large‑org first‑month outcomes; Week‑1 is ramp.',
  },

  // Adoption curve (single series)
  {
    type: 'chart',
    bg: 'plain',
    title: 'Adoption — Weekly active seats',
    x: ['W1', 'W2', 'W3', 'W4'],
    series: [
      { name: 'Cursor @ Adobe (target)', data: [40, 60, 72, 80] }
    ],
    yLabel: '% active',
    notes: 'Ramps after enablement + week‑2 patterns training.'
  },

  // PRs closed — index with a comparator line
  {
    type: 'chart',
    bg: 'plain',
    title: 'PRs closed — month‑1 acceleration (baseline 100)',
    x: ['W1', 'W2', 'W3', 'W4'],
    series: [
      { name: 'Cursor expected', data: [95, 100, 108, 115] },
      { name: 'Other tools (avg)', data: [94, 97, 101, 103], dashed: true }
    ],
    yLabel: 'Index (100 = pre‑trial)',
  },

  // Mapping: metric -> where/how measured
  {
    type: 'table',
    bg: 'plain',
    title: 'Measurement plan',
    headers: ['Metric', 'How we capture it', 'Owner'],
    rows: [
      ['Weekly active devs', 'Cursor Analytics → Active users by team', 'Adobe Eng Ops'],
      ['Accepted AI lines', 'AI Code Tracking → accepted lines %', 'Team Leads'],
      ['PRs closed / Lead time', 'Repo metrics vs. week −1 baseline', 'Adobe Eng Ops'],
      ['Automated review coverage', 'Bugbot enabled on pilot repos', 'Repo Maintainers'],
      ['Qual feedback', 'Pre/post 5‑min survey', 'SE + HRBP'],
    ],
  },

  // Trial plan in bullets (keep short for time box)
  {
    type: 'bullets',
    bg: 'plain',
    title: 'Trial timeline',
    bullets: [
      'Week 0: SSO + policy; pilot repos; enable analytics',
      'Week 1: Tab/Agent patterns; Bugbot on PRs; snapshot metrics',
      'Week 2: apples‑to‑apples tasks across tools',
      'Week 3: tune rules; remove friction; snapshot',
      'Week 4: exec readout — charts + 3 short stories',
    ],
  },

  {
    type: 'title',
    bg: 'burst',
    accent: '#ffd08a',
    eyebrow: 'Live Edit',
    title: 'Change a KPI live → site updates',
    subtitle: "Let's bump PRs closed from +12% → +15% to reflect last week's spike.",
  },
]