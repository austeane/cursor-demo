### Adobe × Cursor — Trial Scorecard Slides

Run a polished, live‑editable slideshow with keyboard navigation, presenter notes, KPI tiles, and a lightweight SVG line chart. Content lives in `src/slides.ts` and updates hot‑reload in dev.

### Quick start

```bash
npm install
npm run dev
```

Open the served URL and use your keyboard to present.

### Shortcuts

- → / Space: Next (reveals bullets one‑by‑one)
- ←: Previous (un‑reveal bullets, then go back)
- N: Toggle presenter notes
- O: Overview grid
- F: Fullscreen
- H / ?: Help

### Customizing slides

- Edit `src/slides.ts`. Types include `title`, `bullets`, `table`, `kpis`, `chart`.
- Per‑slide options:
  - `bg`: `'plain' | 'burst'` background
  - `accent`: hex color to theme components
  - `notes`: presenter notes (shown with N)

### Chart slide

Provide `x: string[]`, and `series: { name: string; data: number[]; dashed?: boolean }[]`. Optional `yLabel`.

### Printing to PDF

Use the browser print dialog. Footer/overlays are auto‑hidden for clean PDFs.

### Development

- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

### Accessibility

- Buttons have labels; slides update the URL hash to allow reloading at the same slide.

### Notes

- Bullet reveal is now supported. To disable for a slide, convert it to a `table` or `title`, or reveal count will be ignored.
