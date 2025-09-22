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

export type BulletItem = string | { text: string; sub?: string[] }

export type BulletsSlide = Common & {
  type: 'bullets'
  title: string
  bullets: BulletItem[]
  notes?: string
}

export type TableSlide = Common & {
  type: 'table'
  title: string
  subtitle?: string
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
  eyebrow: 'Adobe Trial Kickoff',
  title: 'Making this 30‑day trial a success',
  subtitle: 'Overall goal: increase developer effectiveness',
  },

  // Measurable sub‑goals — KPI trio
  {
    type: 'kpis',
    bg: 'plain',
    title: 'Trial targets that track with developer effectiveness',
    kpis: [
      { label: "PRs closed vs baseline", value: '+10%', trend: [95, 97, 101, 110] },
      { label: 'Weekly active devs', value: '75%', trend: [0, 40, 65, 75] },
      { label: 'PRs with helpful Bugbot review', value: '50%', sub: '≥1 accepted Bugbot review', trend: [0, 23, 39, 50] },
    ],
  },

  // Features overview
  {
    type: 'bullets',
    bg: 'plain',
    title: 'Cursor features that move the needle — two types',
    bullets: [
      'AI‑assisted coding: Tab (multi‑line, cross‑file), Agent, and Codebase Indexing.',
      'Platform & workflow: Background agents, Slack/Linear integrations, Rules/AGENTS.md governance.',
      'BugBot: Automated reviews',
    ],
  },

  // Background agents intro slide (precedes competitor comparisons)
  {
    type: 'bullets',
    bg: 'plain',
    title: 'Background agents — delegate work without breaking flow',
    bullets: [
      'Start new work in the background from within Cursor without losing focus.',
      'Start agents from Slack, Linear, or even your phone, enabling more employees to start tasks.',
      'Create your own integrations with our API.',
      'Everything runs in an isolated environment on a new branch.'
    ],
    notes: 'More details: https://cursor.com/docs/background-agent',
  },

  // Competitor comparisons — bullets (replaces table)
  {
    type: 'bullets',
    bg: 'plain',
    title: 'Cursor vs competitors — quick comparisons',
    bullets: [
      '93% of developers prefer Cursor in head‑to‑head comparisons.',
      { text: 'We ship, they adapt, e.g. Background Agents:', sub: [
        'Still no comparable feature in Windsurf.',
        "No model selection in Copilot’s version.",
        'Microsoft Teams/Azure Boards integration just entered preview this week.'
      ]},
      'Consistent immediate access to latest models like Opus 4.1 (not available in Windsurf for months), while Copilot is often delayed in getting the latest models.',

    ],
  },

  // Enterprise & org features
  {
    type: 'bullets',
    bg: 'plain',
    title: 'Enterprise & governance',
    bullets: [
      'Privacy Mode (zero data retention) means no training on your prompts or code.',
      { text: 'Identity & governance', sub: [
        'SAML SSO + SCIM for automated provisioning',
        'Org‑level policy enforcement (models, features, agent/tools)',
        'Audit logs and admin analytics',
      ]},
      { text: 'Security & compliance', sub: [
        'SOC 2 Type II certified',
        'Encryption in transit and at rest',
        'Subprocessors & DPA details on Trust Center',
      ]},
      'Detailed security and privacy information at https://trust.cursor.com/ and https://cursor.com/security'
    ],
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
    title: '4 Week Plan',
    bullets: [
      'Detailed call with Compliance to answer questions and enable background agents, and Slack/Linear integrations',
      'Weekly meetings between myself and Adobe Eng Ops to discuss progress and KPIs',
      'Daily open office hours with engineers and engineering leaders',
      'Live dashboards measuring adoption, usage, and outcomes',
      'Cursor‑External Slack channel for support and feedback',
    ],
  },

  // Live edit closer (optional)
  {
    type: 'title',
    bg: 'burst',
    accent: '#ffd08a',
    eyebrow: 'Live Cursor Edit',
    title: "Change this slideshow to reflect Adobe's branding",
  },
]
