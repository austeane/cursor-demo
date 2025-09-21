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
  title: '30‑Day Trial Goals — What we measure',
  subtitle: 'Overall goal: increase developer effectiveness'
  },

  // Measurable sub‑goals — KPI trio
  {
    type: 'kpis',
    bg: 'plain',
    title: 'Measurable sub‑goals (targets for Adobe trial)',
    kpis: [
      { label: "PRs closed (month‑1 vs baseline)", value: '+10%', sub: 'target', trend: [98, 100, 104, 110] },
      { label: 'Weekly active devs', value: '75%', sub: 'of active Adobe devs by Day 28', trend: [45, 58, 66, 75] },
      { label: 'PRs with Bugbot review', value: '50%', sub: '≥1 Bugbot on the PR by W4', trend: [20, 32, 42, 50], footnote: 'Talking point: % PRs with accepted human comment as a cross‑check' },
    ],
  },

  // Bridge slide (2.5)
  {
    type: 'bullets',
    bg: 'plain',
    title: 'Interpreting the signals',
    bullets: [
      "If usage is up, PRs close faster, and Bugbot flags real issues → effectiveness is improving.",
      'We believe in this enough that the quarter after this trial, the goal is: exceed your org OKRs.'
    ],
  },

  // Features overview
  {
    type: 'bullets',
    bg: 'plain',
    title: "Cursor features that move the needle — two types",
    bullets: [
      'AI‑assisted coding: Tab (multi‑line, cross‑file), Agent, Codebase Indexing, PR search.',
      'Platform & workflow: Background agents, Slack/Linear integrations, Rules/AGENTS.md governance.'
    ],
  },

  // Comparison table (AI coding focus and differentiators)
  {
    type: 'table',
    bg: 'plain',
    title: 'AI coding: where Cursor stands out',
    headers: ['Dimension', 'Cursor', 'GitHub Copilot', 'Windsurf'],
    rows: [
      ['Multi‑file change', 'Tab + Agent (repo‑aware)', 'Inline + Chat', 'Editor + Cascade'],
      ['Repo awareness', 'Index + PR search', 'Repo indexing for Chat', 'Context + Cascade'],
      ['PR review', 'Bugbot with fix links', 'PR insights/summaries', 'Cascade review'],
      ['Background agents', 'Built‑in, optional handoff', '—', 'Cascade workflows'],
      ['Integrations', 'Slack/Linear via Web/Mobile agent', 'GitHub‑native context', 'Some integrations'],
    ],
  },

  // Enterprise & org features
  {
    type: 'bullets',
    bg: 'plain',
    title: 'Not just for coders — enterprise & governance',
    bullets: [
      'Privacy Mode (zero data retention).',
      'Auto‑run allowlist for agents/tools.',
      'SSO + SCIM; org‑level enforcement; Analytics & AI Code Tracking.'
    ],
  },

  // Adoption curve (kept from scorecard)
  {
    type: 'chart',
    bg: 'plain',
    title: 'Adoption — Weekly active seats',
    x: ['W1', 'W2', 'W3', 'W4'],
    series: [
      { name: 'Cursor @ Adobe (target)', data: [45, 58, 66, 75] }
    ],
    yLabel: '% active',
    notes: 'Ramps after enablement + week‑2 patterns training.'
  },

  // PRs closed — index with a comparator line (kept)
  {
    type: 'chart',
    bg: 'plain',
    title: 'PRs closed — month‑1 acceleration (baseline 100)',
    x: ['W1', 'W2', 'W3', 'W4'],
    series: [
      { name: 'Cursor expected', data: [98, 100, 104, 110] },
      { name: 'Other tools (avg)', data: [94, 97, 101, 103], dashed: true }
    ],
    yLabel: 'Index (100 = pre‑trial)',
  },

  // Measurement mapping (kept)
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

  // Trial plan (kept)
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

  // Live edit closer (optional)
  {
    type: 'title',
    bg: 'burst',
    accent: '#ffd08a',
    eyebrow: 'Live Edit',
    title: 'Change a KPI live → site updates',
    subtitle: "Let's bump PRs closed from +10% → +12% to reflect last week's spike.",
  },
]
