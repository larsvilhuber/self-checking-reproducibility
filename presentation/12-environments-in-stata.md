# Environments in Stata

## TL;DR

- Creating virtual environments in Stata is feasible
- Doing so stabilizes the code, and makes it more transportable

## Search paths in Stata {.smaller}

In Stata, we typically do not talk about environments, but the same basic structure applies: Stata searches along a set order for its commands. 

## Search paths in Stata {.smaller}

Some commands are built into the executable (the software that is opened when you click on the Stata icon), but most other internal, and all external commands, are found in a search path. 


## The `sysdir` directories {.smaller}

:::: {.columns}

::: {.column width=40%}
The default set of directories which can be searched, from a freshly installed Stata, can be queried with the `sysdir` command, and will look something like this:

```stata
sysdir
```
:::

::: {.column width=60%}

```{.stata}
   STATA:  C:\Program Files\Stata18\
    BASE:  C:\Program Files\Stata18\ado\base\
    SITE:  C:\Program Files\Stata18\ado\site\
    PLUS:  C:\Users\lv39\ado\plus\
PERSONAL:  C:\Users\lv39\ado\personal\
OLDPLACE:  c:\ado\
```
:::

::::

## The `adopath` search order {.smaller}

:::: {.columns}

::: {.column width=40%}

The search paths where Stata looks for commands is queried by `adopath`, and looks similar, but now has an order assigned to each entry:

```stata
adopath
```

:::

::: {.column width=60%}

```{.stata}
  [1]  (BASE)      "C:\Program Files\Stata18\ado\base/"
  [2]  (SITE)      "C:\Program Files\Stata18\ado\site/"
  [3]              "."
  [4]  (PERSONAL)  "C:\Users\lv39\ado\personal/"
  [5]  (PLUS)      "C:\Users\lv39\ado\plus/"
  [6]  (OLDPLACE)  "c:\ado/"
```

:::

::::

## The path at work {.smaller}

:::: {.columns}

::: {.column width=40%}


To look for a command, Stata will look in the first directory, then the second, and so on, until it finds it. If it does not find it, it will return an error. 

```stata
which reghdfe
```
:::

::: {.column width=60%}

```
command reghdfe not found as either built-in or ado-file
r(111);
```

:::

::::

## Where are packages installed?

[^net-ref]: [`net install` refererence](https://www.stata.com/manuals/rnet.pdf). Strictly speaking, the location where ado packages are installed can be changed via the `net set ado` command, but this is rarely done in practice, and we won't do it here. 

:::: {.columns}

::: {.column width=40%}

When we install a package (`net install`, `ssc install`)[^net-ref], only one of the (`sysdir`) paths is relevant: `PLUS`. 

:::

::: {.column width=60%}

```{.stata code-line-numbers="5"}
  [1]  (BASE)      "C:\Program Files\Stata18\ado\base/"
  [2]  (SITE)      "C:\Program Files\Stata18\ado\site/"
  [3]              "."
  [4]  (PERSONAL)  "C:\Users\lv39\ado\personal/"
  [5]  (PLUS)      "C:\Users\lv39\ado\plus/"
  [6]  (OLDPLACE)  "c:\ado/"
```

:::

::::

## Installing packages {.smaller}

:::: {.columns}

::: {.column width=40%}

```stata
ssc install reghdfe
which reghdfe
```

:::

::: {.column width=60%}

```{.stata code-line-numbers="3|7"} 
. ssc install reghdfe
checking reghdfe consistency and verifying not already installed...
installing into C:\Users\lv39\ado\plus\...
installation complete.

. which reghdfe
C:\Users\lv39\ado\plus\r\reghdfe.ado
*! version 6.12.3 08aug2023
```
:::

::::

## Using environments in Stata {auto-animate=true}

:::: {.columns}

::: {.column width=40%}

But the `(PLUS)` directory can be manipulated

:::

::: {.column width=60%}


```{.stata code-line-numbers="4|13-14"}
* Set the root directory
global rootdir : pwd
* Define a location where we will hold all packages in THIS project (the "environment")
global adodir "$rootdir/ado"
* make sure it exists, if not create it.
cap mkdir "$adodir"
* Now let's simplify the adopath
* - remove the OLDPLACE and PERSONAL paths
* - NEVER REMOVE THE SYSTEM-WIDE PATHS - bad things will happen!
adopath - OLDPLACE
adopath - PERSONAL
* modify the PLUS path to point to our new location, and move it up in the order
sysdir set PLUS "$adodir"
adopath ++ PLUS
* verify the path
adopath
```

:::

::::

## Using environments in Stata {.smaller auto-animate=true transition="none"}

:::: {.columns}


::: {.column width=40%}


```{.stata code-line-numbers="13-14"}
* Set the root directory
global rootdir : pwd
* Define a location where we will hold all packages in THIS project (the "environment")
global adodir "$rootdir/ado"
* make sure it exists, if not create it.
cap mkdir "$adodir"
* Now let's simplify the adopath
* - remove the OLDPLACE and PERSONAL paths
* - NEVER REMOVE THE SYSTEM-WIDE PATHS - bad things will happen!
adopath - OLDPLACE
adopath - PERSONAL
* modify the PLUS path to point to our new location, and move it up in the order
sysdir set PLUS "$adodir"
adopath ++ PLUS
* verify the path
adopath
```

:::

::: {.column width=60%}


```{.stata code-line-numbers="2"}
. adopath
  [1]  (PLUS)      "C:\Users\lv39\Documents/PROJECT123/ado/"
  [2]  (BASE)      "C:\Program Files\Stata18\ado\base/"
  [3]  (SITE)      "C:\Program Files\Stata18\ado\site/"
  [4]              "."
```

:::
::::

## Using environments in Stata {auto-animate=true}

:::: {.columns}

::: {.column width=40%}

Let's verify again where the `reghdfe` package is:

```stata
which reghdfe
```
:::

::: {.column width=60%}

```{.stata code-line-numbers="2"}
. which reghdfe
command reghdfe not found as either built-in or ado-file
r(111);
```

:::

::::

## Using environments in Stata {.smaller auto-animate=true transition="none"}

So it is no longer found. Why? Because we have removed the previous location (the old `PLUS` path) from the search sequence. It's as if it didn't exist.

:::: {.columns}

::: {.column width=50%}

Previously:

```{.stata code-line-numbers="2"} 
. which reghdfe
C:\Users\lv39\ado\plus\r\reghdfe.ado
*! version 6.12.3 08aug2023
```
:::

::: {.column width=50%}


```{.stata code-line-numbers="2|3|4|5"}
. adopath
  [1]  (PLUS)      "C:\Users\lv39\Documents/PROJECT123/ado/"
  [2]  (BASE)      "C:\Program Files\Stata18\ado\base/"
  [3]  (SITE)      "C:\Program Files\Stata18\ado\site/"
  [4]              "."
```

:::

::::

## Installing packages when an environment is active {.smaller}


When we now install `reghdfe` again:

```{.stata code-line-numbers="3|7"}
. ssc install reghdfe
checking reghdfe consistency and verifying not already installed...
installing into C:\Users\lv39\Documents\PROJECT123\ado\plus\...
installation complete.

. which reghdfe
C:\Users\lv39\Documents\PROJECT123\ado\plus\r\reghdfe.ado
*! version 6.12.3 08aug2023
```

We now see it in the **project-specific** directory, which we can distribute with the whole project. 


## Installing precise versions of Stata packages {.smaller}

Let's imagine we need an older version of `reghdfe`. 

- In general, it is **not** possible in Stata to install an older version of a package in a straightforward fashion. 
- You *may* have success with the [Wayback Machine archive of SSC](https://web.archive.org/web/20141226200440/http://fmwww.bc.edu/RePEc/bocode/). 

## Package repositories

Most package repositories are versioned:

- R: CRAN, Bioconductor
- Python: PyPI
- Julia: "General" default Julia package registry.

Stata does not (as of 2024). **But** see [the full site](https://larsvilhuber.github.io/self-checking-reproducibility/12-environments-in-stata.html#installing-precise-versions-of-packages) for one approach.

## Takeaways {auto-animate=true .smaller}

From the earlier desiderata of *environments*:

-  ✅  **Isolated**: Installing a new or updated package for one project won't break your other projects, and vice versa. 
-  ✅  **Portable**: Easily transport your projects from one computer to another, *even across different platforms*. 
-  ❌ **Reproducible**: Records the exact package versions you depend on, and ensures those exact versions are the ones that get installed wherever you go.


## Takeaways {.smaller}


- [x]  your code runs without problem, after all the debugging.
- [x] your code runs without manual intervention, and with low effort
- [x] it actually produces all the outputs
- [x] your code generates a log file that you can inspect, and that you could share with others.
- [x] ❓ it will run on somebody else's computer
