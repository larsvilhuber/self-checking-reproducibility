# Hands-off running: Creating a controller script

Did it take you a long time to run everything again?

![⏳](https://c.tenor.com/4qs0klfg8nMAAAAC/tenor.gif)

# Let's ramp it up a bit. 

Your code must run, beginning to end, top to bottom, without error, and without any user intervention. This should in principle (re)create all figures, tables, and numbers you include in your paper. 


::: {.notes}
We have seen users who appear to highlight code and to run it interactively, in pieces, using the program file as a kind of notepad. This is not reproducible, and should be avoided. It is fine for debugging.
:::

## TL;DR

- Create a "main" file that runs all the other files in the correct order.
- Run this file, without user intervention.
- It should run without error.

## Creating a main or master script

In order to be able to enable "hands-off running", the main script is key. I will show here a few simple examples for single-software replication packages. We will discuss more complex examples in one of the next chapters.

## Examples

::: {.panel-tabset}


### Stata

```stata
* main.do
* This is a simple example of a main file in Stata
* It runs all the other files in the correct order

* Set the root directory

global rootdir : pwd

* Run the data preparation file
do $rootdir/01_data_prep.do

* Run the analysis file
do $rootdir/02_analysis.do

* Run the table file
do $rootdir/03_tables.do

* Run the figure file
do $rootdir/04_figures.do

* Run the appendix file
do $rootdir/05_appendix.do
```
The use of `do` (instead of `run` or even `capture run`) is best, as it will show the code that is being run, and is thus more transparent to you and the future replicator.


Run this using the [right-click method](https://labordynamicsinstitute.github.io/ldilab-manual/96-02-running-stata-code.html#step-6-run-the-code) (Windows) or from the terminal (macOS, Linux): 

```bash
cd /where/my/code/is
stata-mp -b do main.do
```
where `stata-mp` should be replaced with `stata` or `stata-se` depending on your licensed version.



### R

```r
# main.R
# This is a simple example of a main file in R
# It runs all the other files in the correct order

# Set the root directory
# rootdir <- getwd()
# or if you are using Rproj files or git
rootdir <- here::here()

# Run the data preparation file
source(file.path(rootdir, "01_data_prep.R"), echo = TRUE)

# Run the analysis file
source(file.path(rootdir, "02_analysis.R"), echo = TRUE)

# Run the table file
source(file.path(rootdir, "03_tables.R"), echo = TRUE)

# Run the figure file
source(file.path(rootdir, "04_figures.R"), echo = TRUE)

# Run the appendix file
source(file.path(rootdir, "05_appendix.R"), echo = TRUE)
```
The use of `echo=TRUE` is best, as it will show the code that is being run, and is thus more transparent to you and the future replicator.


Run this using the [terminal method](https://labordynamicsinstitute.github.io/ldilab-manual/96-12-running-r-code.html) in Rstudio for any platform, or from the terminal (macOS, Linux): 

```bash
cd /where/my/code/is
R CMD BATCH main.R
```

Do not use `Rscript`, as it will not generate enough output! On Windows, under `cmd.exe` or Powershell, you may need to adjust `R` to be `R.exe` if it is in your `%PATH%` or the full path to `R.exe` if it is not (this is automatically set for you in Rstudio).


### Python

```python
# main.py
# This is a simple example of a main file in Python
# It runs all the other files in the correct order

# Set the root directory
# rootdir = os.getcwd()
# or better
rootdir = os.path.dirname(os.path.realpath(__file__))

# Run the data preparation file
exec(open(os.path.join(rootdir, "01_data_prep.py")).read())

# Run the analysis file
exec(open(os.path.join(rootdir, "02_analysis.py")).read())

# Run the table file
exec(open(os.path.join(rootdir, "03_tables.py")).read())

# Run the figure file
exec(open(os.path.join(rootdir, "04_figures.py")).read())

# Run the appendix file
exec(open(os.path.join(rootdir, "05_appendix.py")).read())
```

Run this from your favorite IDE or from a terminal:

```bash
cd /where/my/code/is
python main.py
```


### MATLAB

```matlab
% main.m
% This is a simple example of a main file in MATLAB
% It runs all the other files in the correct order

% Set the root directory
rootdir = pwd;

% Run the data preparation file
run(fullfile(rootdir, '01_data_prep.m'))

% Run the analysis file
run(fullfile(rootdir, '02_analysis.m'))

% Run the table file
run(fullfile(rootdir, '03_tables.m'))

% Run the figure file
run(fullfile(rootdir, '04_figures.m'))

% Run the appendix file
run(fullfile(rootdir, '05_appendix.m'))
```

Run this script, and it should run all the other ones. Note that there are various other ways to achieve a similar goal, for instance, by treating each MATLAB file as a function. 


### Julia

In Julia, we can do something similar:

```julia
# This is a simple example of a main file in Julia
# It runs all the other files in the correct order

# Set the root directory
rootdir = pwd()

# Run the data preparation file
include(joinpath(rootdir, "01_data_prep.jl"))

# Run the analysis file
include(joinpath(rootdir, "02_analysis.jl"))

# Run the table file
include(joinpath(rootdir, "03_tables.jl"))

# Run the figure file
include(joinpath(rootdir, "04_figures.jl"))

# Run the appendix file
include(joinpath(rootdir, "05_appendix.jl"))
```

Run this from your favorite IDE or from a terminal:

```bash
cd /where/my/code/is
julia main.jl
```


### Bash[^bash]

[^bash]: Bash is a cross-platform terminal interpreter that many users may have encountered if using Git on Windows ("Git Bash"). It is also installed by default on macOS and Linux. It can be used to run command line versions of most statistical software, and is thus a good candidate for a main script. Note that it does introduce an additional dependency - the replicator now needs to have Bash installed, and it is not entirely platform agnostic when calling other software, as those calls may be different on different platforms, though that is a problem afflicting any multi-software main script. In particular, on most Windows machines, the statistical software is not in the `%PATH%` by default, and thus may need to be called with the full path to the executable.



```bash
# main.bash
# Run the data preparation file
# Example for calling Stata
stata-mp -b do "01_data_prep.do"
# Run the analysis file
python 02_analysis.py
# Run the table file
Rscript 03_tables.R
# Run the appendix file
# Here, we use MATLAB. Running MATLAB is *never* platform-independent. 
# Linux:
matlab -nodisplay -r "addpath(genpath('.')); 05_appendix" 
# Windows:
#start matlab -nosplash  -minimize -r  "addpath(genpath('.')); 05_appendix"
```

:::


## Takeaways

:::: {.columns}

::: {.column}

### What this does 

This ensures

- that your code runs without problem, after all the debugging.
- that your code runs without manual intervention.
:::

::: {.column .smaller }

### What this does not do


- that your code generates a log file that you can inspect, and that you could share with others.
- that it will run on somebody else's computer
- that it actually produces all the outputs

:::

::::
