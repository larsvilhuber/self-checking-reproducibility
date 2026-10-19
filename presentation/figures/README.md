# Publication process figure

`publication-process.html` is a self-contained (no dependencies, plain JavaScript + SVG) diagram of a generic
publication process: research idea → first implementation → submission to journal → inspection by data editor →
copy editing → publication.

Open it in a browser. Buttons switch which stage carries the **You are here** marker, and
**Download SVG / PNG** export the current view for pasting into slides.

URL parameters (useful for embedding in the Quarto/reveal.js slides):

| Parameter | Values | Effect |
|---|---|---|
| `here` | `early` (default), `data-editor`, `none` | Which stage is highlighted |
| `embed` | `1` | Hide the buttons |
| `bg` | `white` | Force a white background (default follows light/dark mode) |

Example: `publication-process.html?here=data-editor&embed=1`

To change stages, labels or icons, edit the `STAGES` array at the top of the script; to add a view, add an entry to `VIEWS`.
