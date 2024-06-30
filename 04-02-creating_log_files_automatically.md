(creating-log-files-automatically)=
# Creating log files automatically

An alternative (or complement) to creating log files explicitly is to use native functionality of the software to create them. This usually is triggered when using the **command line** to run the software, and thus may be considered an **advanced topic.** The examples below are for Linux/macOS, but similar functionality exists for Windows.


:::::{tab-set}


::::{tab-item} Stata

To automatically create a log file, run Stata from the command line with the `-b` option:

```bash
stata -b do main.do
```

which will create a file `main.log` in the same directory as `main.do`. 

:::{warning}
For this to work, the filename cannot include spaces.
:::

On Windows, follow instructions [here](https://www.stata.com/manuals/gswb.pdf#gswB.5).

::::

::::{tab-item} R

To automatically create a log file, run R from the command line as follows:

```bash
R CMD BATCH main.R
```

will create a file `main.Rout` in the same directory as `main.R`. 

:::{warning}
If there are other commands, such as `sink()`, active in the R code, the `main.Rout` file will not contain some output.
:::

::::

::::{tab-item} MATLAB

To automatically create a log file, run MATLAB from the command line as follows:

```bash
matlab -nodisplay -r "addpath(genpath('.')); main" -logfile matlab.log
```

A similar command on Windows would be:

```bash
start matlab -nosplash  -minimize -r  "addpath(genpath('.'));main"  -logfile matlab.log
```

::::

::::{tab-item} Julia, Python

In order to capture screen output in Julia and Python, on Unix-like system (Linux, macOS), the following can be run:

```bash
julia main.jl | tee main.log
```

or 

```bash
python main.py | tee main.log
```

which will create a log file with everything that would normally appear on the console using the `tee` command. 

::::

:::::

## Takeaways

### What this does

This ensures

- that your code runs without problem, after all the debugging.
- that your code runs without manual intervention.
- that your code generates a log file that you can inspect, and that you could share with others.

### What this does not do

This does not ensure

- that it will run on somebody else's computer
  - because it does not guarantee that all the software is there
  - because it does not guarantee that all the directories for input or output are there
  - because many intermediate files might be present that are not in the replication package
  - because it does not guarantee that all the directory names are correctly adjusted everywhere in your code
- that it actually produces all the outputs
  - because some outputs might be present from test runs

### What to do next

To solve some of these problems, let's go to the next step.