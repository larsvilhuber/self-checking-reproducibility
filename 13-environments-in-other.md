(environments-other)=
# Using environments in other languages

Search paths, and the ability to manipulate the search path and thus create environments, exist in most other languages that have some notion of modularity and user-contributions. While not always as easy to manipulate, the basic functionality is the same.

## R

R has one or more `library paths`, which can be viewed and manipulated via the `.libPaths()` function. For instance, one might create a project-specific library path, into which all packages are installed, and from which all functions are read, as follows:

```r
rootdir <- here::here()
.libPaths(file.path(rootdir,"libraries"))
```

A more refined management of project-specific environments and specific software packages can be achieved via the [`renv`](https://rstudio.github.io/renv/articles/renv.html) library.

## Julia 

Natively, using the `Project`/[`Pkg.jl`](https://pkgdocs.julialang.org/v1/environments/) functionality. Note that the usual guidance at <https://julialang.org> is for interactive creation and use of environments. While we suggest to continue installing packages initially interactively, the re-use of environments is greatly facilitated by scripting. (Corrections welcome!)

### Step 0

The replication package should contain a `Project.toml` and a `Manifest.toml` file. 

### Step 1

As the first part of the code, `activate` and `instantiate` the environment.  

```julia
import Pkg
Pkg.activate(".")
Pkg.instantiate()
```

This will re-install the packages listed in the `Project.toml` file.

### Step 2

Insert the following code fragment in any subsequent Julia scripts, before any `Using` lines,  to ensure that the correct environment is used.

```julia
import Pkg
Pkg.activate(".")
```


## MATLAB

MATLAB programs can manipulate the [search path](https://www.mathworks.com/help/matlab/ref/path.html), which is done for plugins and other functionality, for instance when adding [Dynare](https://www.dynare.org/) as a plugin. 

More generally, MATLAB's Search Path collects the various native MATLAB features, official and user-provided toolboxes (packages), and defines the order in which they are found. See <https://www.mathworks.com/help/matlab/matlab_env/what-is-the-matlab-search-path.html> for more details. 

# Takeaways

From the earlier desiderata of *environments*:

- [x] **Isolated**: Installing a new or updated package for one project won’t break your other projects, and vice versa.
- [x] **Portable**: Easily transport your projects from one computer to another, even across different platforms.
- [ ] **Reproducible**: Records the exact package versions you depend on, and ensures those exact versions are the ones that get installed wherever you go.