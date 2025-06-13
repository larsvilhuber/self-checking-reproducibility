# Preliminaries

The goal of reproducibility is ultimately efficiency, of your own work, and that of others wishing to build on it. The ultimate goal remains replicability. It is uninteresting (but useful) to continually re-run the same code on the same data (reproducibility), The ability of others to build on your work (replicability) is the ultimate goal.

## Programming basics in support of reproducibility

### Platform-independent path names

There are three major operating systems in use for scientific research in 2024: Windows, MacOS, and Linux. Ideally, your code should be able to run on all three. While this may not always be feasible for certain software, the non-specific components of the replication package should be maximized. Good practices include:

- using operating-system independent path names. All modern statistical software packages can handle a uniform way of writing path names.


:::::{tab-set}


::::{tab-item} Stata

Always use `/`, even on Windows:

```stata
global rootdir : pwd
global datadir "$rootdir/data"
```

While Stata also has functions to correctly manipulate paths (see [`pathjoin`](https://www.stata.com/manuals/m-5pathjoin.pdf)), and its [guidance suggests that you use platform-specific filenames](https://www.stata.com/manuals/u.pdf#ubyvarlistconstructFilenamingconventions), this is not necessary, and would actually be detrimental to reproducibility.

:::{warning}

The use of Windows-typical file paths (e.g. `global datadir "$rootdir\data"`) will guarantee that no Mac or Linux user will be able to run your code without modification.

::::

::::{tab-item} R


Always use `/`, even on Windows:

```R
rootdir <- getwd()
datadir <- paste(rootdir, "data", sep = "/")
```

**Better** is to use the `file.path` function, which will automatically use the correct separator for the operating system:

```R
rootdir <- getwd()
datadir <- file.path(rootdir, "data")
```

::::

::::{tab-item} MATLAB


Use the `fullfile()` function, which will automatically use the correct separator for the operating system:

```matlab
rootdir = pwd;
datadir = fullfile(rootdir, 'data');
```

::::

::::{tab-item} Python


Use the `os.path.join()` function, which will automatically use the correct separator for the operating system:

```python
import os
rootdir = os.path.realpath(__file__)
datadir = os.path.join(rootdir, 'data')
```

::::

::::{tab-item} Julia


Use the `joinpath()` function, which will automatically use the correct separator for the operating system:

```julia
rootdir = pwd()
datadir = joinpath(rootdir, "data")
```

::::

:::::

### Platform-independent file manipulation

You may need to leverage certain operating-system specific commands. For instance, you might want to unzip an archive, to be able to use the data within. It is tempting to just use the operating system specific command (or do it manually!), but this leads to inefficiencies and unnecessary platform dependence. The following example is for unzipping, but the general principle applies to other file manipulation tasks: find out, if the programming language you are using supports doing this for you, and already did the heavy lifting in abstracting it for all platforms.


:::::{tab-set}


::::{tab-item} Stata

Avoid

```{.stata eval=FALSE}
shell unzip "C:\data\myfile.zip"
```

**Use**

```stata
unzipfile "zipfile.zip" [, replace]
```

::::

::::{tab-item} R

Avoid

```r
system("unzip C:\data\myfile.zip")
```
**Use** instead the `unzip()` function:


```r
unzip(zipfile, files = NULL, list = FALSE, overwrite = TRUE,
      junkpaths = FALSE, exdir = ".", unzip = "internal",
      setTimes = FALSE)
```
::::

:::::


## TL;DR

:::{note}

Avoid platform specificity wherever possible.

:::

## Takeaways

### What this does

This ensures

- that your code runs on multiple platforms.

### What this does not do

This does not ensure

- that your code runs cleanly.
- that your code runs without manual intervention.
- that your code generates a log file that you can inspect, and that you could share with others.
- that it will run on somebody else's computer
  - because it does not guarantee that all the software is there
  - because it does not guarantee that all the directories for input or output are there
  - because many intermediate files might be present that are not in the replication package
  - because it does not guarantee that all the directory names are correctly adjusted everywhere in your code
- that it actually produces all the outputs
  - because some outputs might be present from test runs
