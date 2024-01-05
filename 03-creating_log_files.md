(creating-log-files)=
# Creating log files

In order to document that you have actually run your code, a log file, a transcript, or some other evidence, may be useful. It may even be required by certain journals.

## TL;DR

- Log files are a way to document that you have run your code.
- In particular for code that runs for a very long time, or that uses data that cannot be shared, log files may be the only way to document basic reproducibility.

## Overview

Most statistical software has ways to keep a record that it has run, with the details of that run. Some make it easier than others. In some cases, you may need to instruct your code to be "verbose", or to "log" certain events. In other cases, you may need to use a command-line option to the software to create a log file.

```{note}
I do note that we are typically only looking to document what the statistical code does, at a high level. We are not looking to document system calls, fine-grained data access, etc. Computer scientists and IT security mavens may be interested in such details, but economists are typically not.
```

In almost all cased, the generated log files are simple text files, without any formatting, and can be read by any text editor (e.g., Visual Studio Code, Notepad++, etc.).

## Creating log files

### Creating log files explicitly

We start by describing how to explicitly generate log files as part of the statistical processing code.

::::{tab-set}


:::{tab-item} Stata

```stata
global logdir "${rootdir}/logs"
cap mkdir "$logdir"
local c_date = c(current_date)
local cdate = subinstr("`c_date'", " ", "_", .)
local c_time = c(current_time)
local ctime = subinstr("`c_time'", ":", "_", .)
local globallog = "$logdir/logfile_`cdate'-`ctime'-`c(username)'.log"
log using "`globallog'", name(global) replace text
```

:::

:::{tab-item} R

```R
# This will only log output ("stdout") and warnings/messages ("stderr"), but not the commands themselves!

logfile.name <- paste0("logfile_", Sys.Date(),"-",format(as.POSIXct(Sys.time()), format = "%H_%M"),"-",Sys.info()["user"], ".log")
globallog    <- file(file.path(rootdir,logfile.name), open = "wt")
# Send output to logfile
sink(globallog, split=TRUE)
sink(globallog, type = "message")

## revert output back to the console 
sink(type = "message")
sink()
close(globallog)
```

:::

:::{tab-item} MATLAB
    
```matlab
% The "diary" function should achieve this. Not a MATLAB expert!
```
:::

:::{tab-item} Python
    
```python
% The logging module should achieve this.
import logging
logging.warning('Watch out!')
```
will output

```
WARNING:root:Watch out!
```

:::

::::

While some software (Stata, MATLAB) will create log files that contain commands and output, others (R, Python) will only create log files that contain output. 

### Creating log files automatically

An alternative (or complement) to creating log files explicitly is to use native functionality of the software to create them. This usually is triggered when using the command line to run the software, and thus may be considered an **advanced topic.** The examples below are for Linux/macOS, but similar functionality exists for Windows.


::::{tab-set}


:::{tab-item} Stata

To automatically create a log file, run Stata from the command line with the `-b` option:

```bash
stata -b do main.do
```

which will create a file `main.log` in the same directory as `main.do`. 

```{warning}
For this to work, the filename cannot include spaces.
```
On Windows, follow instructions [here](https://www.stata.com/manuals/gswb.pdf#gswB.5).

:::

:::{tab-item} R

To automatically create a log file, run R from the command line as follows:

```bash
R CMD BATCH main.R
```

will create a file `main.Rout` in the same directory as `main.R`. 

```{warning}
If there are other commands, such as `sink()`, active in the R code, the `main.Rout` file will not contain some output.
```

:::

:::{tab-item} MATLAB

To automatically create a log file, run MATLAB from the command line as follows:

```bash
matlab -nodisplay -r "addpath(genpath('.')); main" -logfile matlab.log
```

A similar command on Windows would be:

```bash
start matlab -nosplash  -minimize -r  "addpath(genpath('.'));main"  -logfile matlab.log
```

:::

::::



## What this does

This ensures

- that your code runs without problem, after all the debugging.
- that your code runs without manual intervention.
- that your code generates a log file that you can inspect, and that you could share with others.

## What this does not do

This does not ensure

- that it will run on somebody else's computer
  - because it does not guarantee that all the software is there
  - because it does not guarantee that all the directories for input or output are there
  - because many intermediate files might be present that are not in the replication package
  - because it does not guarantee that all the directory names are correctly adjusted everywhere in your code
- that it actually produces all the outputs
  - because some outputs might be present from test runs

## What to do next

To solve some of these problems, let's go to the next step.