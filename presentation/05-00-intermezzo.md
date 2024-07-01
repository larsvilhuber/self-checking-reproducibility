# Environments 


## TL;DR

- Search paths and environments are key concepts to create **portable**, **reproducible** code, by **isolating** each project from others.
- Methods exist in all (statistical) programming languages

## What is an environment?

From the [renv](https://rstudio.github.io/renv/) documentation:

-   **Isolated**: Installing a new or updated package for one project won't break your other projects, and vice versa. 
-   **Portable**: Easily transport your projects from one computer to another, *even across different platforms*. 
-   **Reproducible**: Records the exact package versions you depend on, and ensures those exact versions are the ones that get installed wherever you go.

## What software supports environments?

- R: `renv` package
- Python: `venv` or `virtualenv` module
- Julia: `Pkg` module

## "But I use Stata!"

## Hold on...

## Understanding search paths

Generically, all "environments" simply modify where the specific **software searches** (the "search path") for its components, and in particular any supplementary components (packages, libraries, etc.).[^searchpaths]
 
[^searchpaths]: Formally, this is true for operating systems as well, and in some cases, the operating system and the programming language interact (for instance, in Python).

## Search paths {auto-animate=true}


:::: {.columns}

::: {.column width=30%}

- R: `.libPaths()`

:::

::: {.column width=70%}

```{.r code-line-numbers="2-3"}
> .libPaths()
[1] "C:/Users/lv39/AppData/Local/R/win-library/4.3"         
[2] "C:/Users/lv39/AppData/Local/Programs/R/R-4.3.2/library"
   
```

:::

::::

## Search paths {auto-animate=true}

:::: {.columns}

::: {.column width=30%}

- R: `.libPaths()`
- Python: `sys.path`

:::

::: {.column width=70%}

```{.python code-line-numbers="4-9"}
>>> import sys
>>> from pprint import pprint
>>> pprint(sys.path)
['',
 'C:\\Users\\lv39\\AppData\\Local\\Programs\\Python\\Python312\\python312.zip',
 'C:\\Users\\lv39\\AppData\\Local\\Programs\\Python\\Python312\\DLLs',
 'C:\\Users\\lv39\\AppData\\Local\\Programs\\Python\\Python312\\Lib',
 'C:\\Users\\lv39\\AppData\\Local\\Programs\\Python\\Python312',
 'C:\\Users\\lv39\\AppData\\Local\\Programs\\Python\\Python312\\Lib\\site-packages']

```

:::

::::

## Search paths {auto-animate=true}

:::: {.columns}

::: {.column width=30% .smaller}

- R: `.libPaths()`
- Python: `sys.path`
- Julia: `DEPOT_PATH` ([Julia docs](https://docs.julialang.org/en/v1/manual/code-loading/))

:::

::: {.column width=70%}

```{.julia code-line-numbers="3-5" .smaller}
julia> DEPOT_PATH
3-element Vector{String}:
 "C:\\Users\\lv39\\.julia"
 "C:\\Users\\lv39\\.julia\\juliaup\\julia-1.10.0+0.x64.w64.mingw32\\local\\share\\julia"
 "C:\\Users\\lv39\\.julia\\juliaup\\julia-1.10.0+0.x64.w64.mingw32\\share\\julia"

```

:::

::::


## "Yes, but what about Stata?"

> We now have the **ingredients** to understand (project) environments in Stata.