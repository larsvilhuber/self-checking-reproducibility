(environments)=
# Environments

## TL;DR

- Using environments allows a researcher to isolate a project (replication package) from the rest of their system.
- Properly defined environments can therefore help make code more reproducible.

## What is an environment?

From the `renv` documentation:

- **Isolated**: Installing a new or updated package for one project won’t break your other projects, and vice versa.
- **Portable**: Easily transport your projects from one computer to another, even across different platforms.
- **Reproducible**: Records the exact package versions you depend on, and ensures those exact versions are the ones that get installed wherever you go.

## What software supports environments?

- R: `renv` package
- Python: `venv` or `virtualenv` module
- Julia: `Pkg` module

## Understanding search paths

Generically, all “environments” simply modify where the specific software searches (the “search path”) for its components, and in particular any supplementary components (packages, libraries, etc.). [3^][3^]:Formally, this is true for operating systems as well, and in some cases, the operating system and the programming language interact (for instance, in Python).

- R: `.libPaths()`
- Python: `sys.path`
- Julia: `DEPOT_PATH` [(Julia docs)](https://docs.julialang.org/en/v1/manual/code-loading/)

