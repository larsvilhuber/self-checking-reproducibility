# Publication process figure

A generic publication process: research idea → first implementation → *(long process of research and writing)* →
submission to journal → inspection by data editor → copy editing → publication.

| File | Purpose |
|---|---|
| `publication-process.js` | The single source of truth: stages, views ("You are here" placements), colours, and `buildSVG()` |
| `publication-process.html` | Interactive page for playing with the figure (open directly in a browser) |
| `build-figures.ts` | Quarto **pre-render** script that writes the SVGs used by the slides |

## In the slides (automatic)

`presentation/_quarto.yml` runs `figures/build-figures.ts` before every `quarto render`, so the images are
regenerated on each compilation (locally and in the GitHub Action) into `presentation/images/`.
They are git-ignored; do not edit them by hand.

One file per view and theme (`night` slides: use `-dark`):

```
images/publication-process-early-dark.svg        images/publication-process-early-light.svg
images/publication-process-data-editor-dark.svg  images/publication-process-data-editor-light.svg
images/publication-process-none-dark.svg         images/publication-process-none-light.svg
```

```markdown
![](images/publication-process-early-dark.svg){fig-alt="Publication process: you are at the early phases"}
```

## Changing the figure

Edit `STAGES`, `VIEWS`, `THEMES` or the layout constants in `publication-process.js`. A new entry in `VIEWS` or
`THEMES` is exported automatically on the next render. To preview, open `publication-process.html`
(`?here=early|data-editor|none`, `&theme=light|dark`, `&embed=1` to hide the buttons).
