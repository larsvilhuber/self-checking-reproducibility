// Quarto pre-render script (run with Quarto's bundled Deno before every render, see ../_quarto.yml).
// Writes one SVG per view and theme into ../images/, e.g. images/publication-process-early-dark.svg.
// The images are generated files (git-ignored); never edit them by hand, edit publication-process.js instead.

const here = new URL(".", import.meta.url);
const outDir = new URL("../images/", here);

// publication-process.js is a classic script that sets globalThis.PublicationFigure
(0, eval)(await Deno.readTextFile(new URL("publication-process.js", here)));
const { VIEWS, THEMES, buildSVG } = (globalThis as any).PublicationFigure;

await Deno.mkdir(outDir, { recursive: true });
for (const view of Object.keys(VIEWS)) {
  for (const theme of Object.keys(THEMES)) {
    const file = new URL(`publication-process-${view}-${theme}.svg`, outDir);
    await Deno.writeTextFile(file, buildSVG(view, { theme }) + "\n");
    console.log(`wrote ${file.pathname}`);
  }
}
