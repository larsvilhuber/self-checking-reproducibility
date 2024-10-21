(environments-other)=
# Using environments in other languages

Search paths, and the ability to manipulate the search path and thus create environments, exist in most other languages that have some notion of modularity and user-contributions. While not always as easy to manipulate, the basic functionality is the same.

## R

R has one or more `library paths`, which can be viewed and manipulated via the `.libPaths()` function. For instance, one might create a project-specific library path, into which all packages are installed, and from which all functions are read, as follows:

```{.R}
rootdir <- here::here()
.libPaths(file.path(rootdir,"libraries"))
```

A more refined management of project-specific environments and specific software packages can be achieved via the [`renv`](https://rstudio.github.io/renv/articles/renv.html) library.

## Julia 

Natively, using the `Project`/[`Pkg.jl`](https://pkgdocs.julialang.org/v1/) functionality. 

## MATLAB

MATLAB programs can manipulate the [search path](https://www.mathworks.com/help/matlab/ref/path.html), which is done for plugins and other functionality, for instance when adding [Dynare](https://www.dynare.org/) as a plugin. 

More generally, MATLAB's Search Path collects the various native MATLAB features, official and user-provided toolboxes (packages), and defines the order in which they are found. See <https://www.mathworks.com/help/matlab/matlab_env/what-is-the-matlab-search-path.html> for more details. 

## Takeaways

### What this does

This ensures

- that your code runs without problem, after all the debugging.
- that your code runs without manual intervention.
- that your code generates a log file that you can inspect, and that you could share with others.
- that it will run on somebody else's computer
  - because it guarantees that all the software is there (but with a caveat we will discuss next)

### What this does not do

This does not ensure

- that it will run on somebody else's computer
  - because it does not guarantee that the next person can install the environment!
  - because it does not guarantee that all the directories for input or output are there
  - because many intermediate files might be present that are not in the replication package
  - because it does not guarantee that all the directory names are correctly adjusted everywhere in your code
- that it actually produces all the outputs
  - because some outputs might be present from test runs

### What to do next

To solve some of these problems, let's go to the next step.
