// Generic publication process figure. Plain classic script (works from file://, in the browser page, and in Deno).
// Exposes globalThis.PublicationFigure = { STAGES, VIEWS, THEMES, buildSVG }.
(function (root) {
  // Edit STAGES to change the boxes. The first EARLY_COUNT stages sit in row 1, the rest in row 3.
  const STAGES = [
    { id: "idea",      label: ["Research", "idea"],             icon: "💡", early: true },
    { id: "implement", label: ["First", "implementation"],      icon: "💻", early: true },
    { id: "submit",    label: ["Submission", "to journal"],     icon: "📤" },
    { id: "data",      label: ["Inspection by", "data editor"], icon: "🔍", dataEditor: true },
    { id: "copy",      label: ["Copy", "editing"],              icon: "✍️" },
    { id: "publish",   label: ["Publication"],                  icon: "📰" },
  ];
  // Each view says which stages are highlighted and what the marker says. Add a view here and it is
  // exported automatically by build-figures.ts.
  const VIEWS = {
    "early":       { test: s => s.early,      text: "You are here" },
    "data-editor": { test: s => s.dataEditor, text: "You are here" },
    // no stage highlighted: the marker points at the arrow from the long process into the submission
    "transition":  { test: () => false,       text: "You should be here", link: true },
    "none":        { test: () => false,       text: "" },
  };
  const THEMES = {
    light: { bg: "#ffffff", fg: "#1f2937", muted: "#6b7280", line: "#cbd5e1", node: "#f1f5f9", nodeStroke: "#94a3b8",
             hl: "#fef3c7", hlStroke: "#d97706", marker: "#dc2626", markerFg: "#ffffff" },
    dark:  { bg: "#111827", fg: "#f3f4f6", muted: "#9ca3af", line: "#475569", node: "#1f2937", nodeStroke: "#64748b",
             hl: "#78350f", hlStroke: "#fbbf24", marker: "#dc2626", markerFg: "#ffffff" },
  };
  const BAND_LABEL = "Long process of research and writing";
  const EARLY_COUNT = 2;
  const VB_W = 840, VB_H = 580;
  const W = 160, H = 130, GAP = 50, X0 = 25;
  const ROW1_Y = 100, BAND_Y = 245, BAND_H = 76, ROW3_Y = 420;
  const FONT = "system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif";
  const EMOJI = "'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif";

  const xOf = i => X0 + (i < EARLY_COUNT ? i : i - EARLY_COUNT) * (W + GAP);
  const yOf = i => (i < EARLY_COUNT ? ROW1_Y : ROW3_Y);
  const esc = t => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // ---- discreet line-art for the band background: writing, computing (gears), presenting (all stroke-only)
  const r1 = v => Math.round(v * 10) / 10;
  function gear(cx, cy, r, teeth) {
    const pts = [], ri = r * 0.78, step = (2 * Math.PI) / teeth;
    for (let k = 0; k < teeth; k++) {
      const a = k * step;
      [[a - step * 0.28, ri], [a - step * 0.16, r], [a + step * 0.16, r], [a + step * 0.28, ri]]
        .forEach(([t, rad]) => pts.push(`${r1(cx + rad * Math.cos(t))},${r1(cy + rad * Math.sin(t))}`));
    }
    return `<polygon points="${pts.join(" ")}"/><circle cx="${cx}" cy="${cy}" r="${r1(r * 0.35)}"/>`;
  }
  const ICONS = {
    doc:    () => `<rect x="-14" y="-19" width="28" height="38" rx="2"/><path d="M-8 -9H8M-8 -2H8M-8 5H8M-8 12H2"/>`,
    pencil: () => `<path d="M-16 16L-12 5L10 -17L17 -10L-5 12ZM-12 5L-5 12M6 -13L13 -6"/>`,
    code:   () => `<path d="M-8 -12L-20 0L-8 12M8 -12L20 0L8 12M3 -15L-3 15"/>`,
    gears:  () => gear(-8, 3, 14, 10) + gear(14, -12, 8, 8),
    gear:   () => gear(0, 0, 16, 10),
    slide:  () => `<rect x="-22" y="-16" width="44" height="28" rx="2"/><path d="M-12 6V-2M-3 6V-8M6 6V-4M-16 6H14M0 12V19M-8 19H8"/>`,
  };
  // [icon, x]: kept to the left and right of the band label so they never run under the text
  const BG_ICONS = [["doc", 62], ["gear", 118], ["pencil", 176], ["code", 650], ["gears", 710], ["slide", 772]];

  // opts: theme ("light"|"dark"), animate (bobbing marker, for the web page), scale (set width/height = scale * viewBox)
  function buildSVG(view, opts) {
    opts = opts || {};
    const cfg = VIEWS[view] || VIEWS.none, c = THEMES[opts.theme] || THEMES.light;
    const size = opts.scale ? ` width="${VB_W * opts.scale}" height="${VB_H * opts.scale}"` : "";
    const out = [];
    out.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB_W} ${VB_H}"${size} role="img" aria-labelledby="t">`);
    out.push(`<title id="t">Generic publication process${cfg.text ? " (" + esc(cfg.text) + ")" : ""}</title>`);
    out.push(`<style>
      text{font-family:${FONT};text-anchor:middle;fill:${c.fg}}
      .stage rect{fill:${c.node};stroke:${c.nodeStroke};stroke-width:2}
      .stage text{font-size:20px}
      .stage .num{font-size:15px;fill:${c.muted};font-weight:600}
      .stage .icon{font-size:34px;font-family:${EMOJI}}
      .stage.active rect{fill:${c.hl};stroke:${c.hlStroke};stroke-width:4}
      .stage.active text{font-weight:700}
      .stage.active .num{font-weight:600}
      .band rect{fill:none;stroke:${c.line};stroke-width:2;stroke-dasharray:8 6}
      .band text{fill:${c.muted};font-size:22px;font-style:italic}
      .icon{filter:url(#gray)}
      .bgicons{fill:none;stroke:${c.muted};stroke-width:2;stroke-linejoin:round;stroke-linecap:round;opacity:.22}
      .link.hot{stroke:${c.hlStroke};stroke-width:5;marker-end:url(#arrow-hot)}
      .link{stroke:${c.line};stroke-width:3;fill:none;marker-end:url(#arrow)}
      .pin{fill:${c.marker}}
      .label{fill:${c.markerFg};font-size:22px;font-weight:700}
      ${opts.animate ? `.bob{animation:bob 1.6s ease-in-out infinite}@keyframes bob{50%{transform:translateY(-8px)}}.bobx{animation:bobx 1.6s ease-in-out infinite}@keyframes bobx{50%{transform:translateX(8px)}}@media (prefers-reduced-motion:reduce){.bob,.bobx{animation:none}}` : ""}
    </style>`);
    out.push(`<defs><filter id="gray"><feColorMatrix type="saturate" values="0"/></filter>` +
             `<clipPath id="bandclip"><rect x="${X0}" y="${BAND_Y}" width="${xOf(STAGES.length - 1) + W - X0}" height="${BAND_H}" rx="${BAND_H / 2}"/></clipPath>` +
             `<marker id="arrow-hot" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${c.hlStroke}"/></marker></defs>`);
    out.push(`<defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${c.nodeStroke}"/></marker></defs>`);
    out.push(`<rect width="${VB_W}" height="${VB_H}" fill="${c.bg}"/>`);

    // middle row: the long research-and-writing band, linked from the last early stage to the first later one
    const bandW = xOf(STAGES.length - 1) + W - X0;
    out.push(`<g clip-path="url(#bandclip)"><g class="bgicons">` +
      BG_ICONS.map(([n, x]) => `<g transform="translate(${x} ${BAND_Y + BAND_H / 2})">${ICONS[n]()}</g>`).join("") + `</g></g>`);
    out.push(`<g class="band"><rect x="${X0}" y="${BAND_Y}" width="${bandW}" height="${BAND_H}" rx="32"/>` +
             `<text x="${X0 + bandW / 2}" y="${BAND_Y + BAND_H / 2 + 8}">${esc(BAND_LABEL)}</text></g>`);
    out.push(`<path class="link" d="M${xOf(EARLY_COUNT - 1) + W / 2} ${ROW1_Y + H + 4} V${BAND_Y - 6}"/>`);
    out.push(`<path class="link${cfg.link ? " hot" : ""}" d="M${xOf(EARLY_COUNT) + W / 2} ${BAND_Y + BAND_H + 4} V${ROW3_Y - 6}"/>`);

    STAGES.forEach((s, i) => {
      const x = xOf(i), y = yOf(i), cx = x + W / 2;
      if (i > 0 && i !== EARLY_COUNT) out.push(`<path class="link" d="M${xOf(i - 1) + W + 4} ${y + H / 2} H${x - 6}"/>`);
      out.push(`<g class="stage${cfg.test(s) ? " active" : ""}"><rect x="${x}" y="${y}" width="${W}" height="${H}" rx="14"/>` +
        `<text class="num" x="${cx}" y="${y + 22}">${i + 1}</text>` +
        `<text class="icon" x="${cx}" y="${y + 66}">${s.icon}</text>` +
        s.label.map((l, j) => `<text x="${cx}" y="${y + 92 + j * 22}">${esc(l)}</text>`).join("") + `</g>`);
    });

    // marker for a transition: to the right of the highlighted arrow, pointing left at it
    if (cfg.link && cfg.text) {
      const ax = xOf(EARLY_COUNT) + W / 2, ay = (BAND_Y + BAND_H + ROW3_Y) / 2, w = 240, h = 48, left = ax + 34;
      out.push(`<g class="${opts.animate ? "bobx" : ""}"><rect class="pin" x="${left}" y="${ay - h / 2}" width="${w}" height="${h}" rx="10"/>` +
               `<path class="pin" d="M${left + 1} ${ay - 12} L${ax + 12} ${ay} L${left + 1} ${ay + 12}z"/>` +
               `<text class="label" x="${left + w / 2}" y="${ay + 8}">${esc(cfg.text)}</text></g>`);
    }
    // "You are here" marker centred over the highlighted stage(s)
    const hit = STAGES.map((s, i) => (cfg.test(s) ? i : -1)).filter(i => i >= 0);
    if (hit.length && cfg.text) {
      const x1 = xOf(hit[0]), x2 = xOf(hit[hit.length - 1]) + W, cx = (x1 + x2) / 2;
      const w = 200, h = 48, top = yOf(hit[0]) - 80;
      out.push(`<g class="${opts.animate ? "bob" : ""}"><path class="pin" d="M${cx - w / 2 + 10} ${top} h${w - 20} a10 10 0 0 1 10 10 v${h - 20} a10 10 0 0 1 -10 10 H${cx + 14} L${cx} ${top + h + 16} L${cx - 14} ${top + h} H${cx - w / 2 + 10} a10 10 0 0 1 -10 -10 v${-(h - 20)} a10 10 0 0 1 10 -10 z"/>` +
               `<text class="label" x="${cx}" y="${top + 31}">${esc(cfg.text)}</text></g>`);
    }
    out.push(`</svg>`);
    return out.join("\n");
  }

  root.PublicationFigure = { STAGES, VIEWS, THEMES, buildSVG, VB_W, VB_H };
})(typeof globalThis !== "undefined" ? globalThis : this);
