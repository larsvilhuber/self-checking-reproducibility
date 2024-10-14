# Creating log files

In order to document that you have actually run your code, a log file, a transcript, or some other evidence, may be useful. It may even be required by certain journals.

## TL;DR

- Log files are a way to document that you have run your code.
- In particular for code that runs for a very long time, or that uses data that cannot be shared, log files may be the only way to document basic reproducibility.

## Overview

::: {.incremental}

- Most statistical software has ways to keep a record that it has run, with the details of that run.
- Some make it easier than others. 
- You may need to instruct your code to be "verbose", or to "log" certain events. 
- You may need to use a command-line option to the software to create a log file.

:::

:::{.notes}
I do note that we are typically only looking to document what the statistical code does, at a high level. We are not looking to document system calls, fine-grained data access, etc. Computer scientists and IT security mavens may be interested in such details, but economists are typically not.
:::

---

In almost all cased, the generated log files are simple text files, without any formatting, and can be read by any text editor (e.g., Visual Studio Code, Notepad++, etc.). 

If not, ensure that they are (avoid *Stata SMCL* files, for example).

## Creating log files explicitly

We start by describing how to explicitly generate log files as part of the statistical processing code.


## Stata {auto-animate=true}

:::: {.columns}

::: {.column width=30%}
Start by creating a directory for the log files.

:::

::: {.column width=70%}

```{.stata code-line-numbers="1-2"}
global logdir "${rootdir}/logs"
cap mkdir "$logdir"
local c_date = c(current_date)
local cdate = subinstr("`c_date'", " ", "_", .)
local c_time = c(current_time)
local ctime = subinstr("`c_time'", ":", "_", .)
local logname = "`cdate'-`ctime'-`c(username)'"
local globallog = "$logdir/logfile_`logname'.log"
log using "`globallog'", name(global) replace text
```

:::
::::

## Stata {auto-animate=true}


:::: {.columns}

::: {.column width=30%}

Add code to capture date, time, and who ran the code.

:::

::: {.column width=70%}

```{.stata code-line-numbers="3-7"}
global logdir "${rootdir}/logs"
cap mkdir "$logdir"
local c_date = c(current_date)
local cdate = subinstr("`c_date'", " ", "_", .)
local c_time = c(current_time)
local ctime = subinstr("`c_time'", ":", "_", .)
local logname = "`cdate'-`ctime'-`c(username)'"
local globallog = "$logdir/logfile_`logname'.log"
log using "`globallog'", name(global) replace text
```
:::
::::

## Stata {auto-animate=true}


:::: {.columns}

::: {.column width=30%}

Create a logfile, giving it a name so it does not get closed.

:::

::: {.column width=70%}

```{.stata code-line-numbers="8-9"}
global logdir "${rootdir}/logs"
cap mkdir "$logdir"
local c_date = c(current_date)
local cdate = subinstr("`c_date'", " ", "_", .)
local c_time = c(current_time)
local ctime = subinstr("`c_time'", ":", "_", .)
local logname = "`cdate'-`ctime'-`c(username)'"
local globallog = "$logdir/logfile_`logname'.log"
log using "`globallog'", name(global) replace text
```

:::
::::

## Notes

- More examples 
- While some software (Stata, MATLAB) will create log files that contain **commands and output**, others (R, Python) will create log files that contain **only output**. 


# Creating log files automatically

An alternative (or complement) to creating log files explicitly is to use native functionality of the software to create them. This usually is triggered when using the command line to run the software, and thus may be considered an **advanced topic.** The examples below are for Linux/macOS, but similar functionality exists for Windows.




## Stata

To automatically create a log file, run Stata from the command line with the `-b` option:

```bash
stata -b do main.do
```

which will create a file `main.log` in the same directory as `main.do`. 

> - For this to work, the filename cannot include spaces.
> - On Windows, follow instructions [here](https://www.stata.com/manuals/gswb.pdf#gswB.5).






















## R {auto-animate=true transition="fade"}

To automatically create a log file, run R from the command line using the `BATCH` functionality, as follows:

```bash
R CMD BATCH options infile outfile
```

> On Windows, you may need to include the full path of R: 

```
C:\Program Files\R\R-4.1.0\bin\R.exe CMD BATCH main.R
```


## R {auto-animate=true transition="fade"}

To automatically create a log file, run R from the command line using the `BATCH` functionality, as follows:

```bash
R CMD BATCH options infile outfile
```

This will create a file `main.Rout` in the same directory as `main.R`. 

## R {auto-animate=true transition="fade"}

If you prefer a different name for the output file, you can specify it.

```bash
R CMD BATCH main.R main.$(date +%F-%H:%M:%S).Rout
```

which will create a second-precise date-time stamped log file. 

## R {auto-animate=true transition="fade"}

If you want to prevent R from saving or restoring its environment (by default, `R CMD BATCH` does both), you can specify the `--no-save` and `--no-restore` options.

```bash
R CMD BATCH --no-save --no-restore main.R main.$(date +%F-%H:%M:%S).Rout
```


## R {.smaller}

:::{warning}
If there are other commands, such as `sink()`, active in the R code, the `main.Rout` file will not contain some output.
:::

## R {.smaller}

> To see more information, check the manual documentation by typing
`?BATCH` (or `help(BATCH)`) from within an R interactive session. Or by 
typing `R CMD BATCH --help` from the command line.


























## MATLAB {auto-animate=true}

To automatically create a log file, run MATLAB from the command line as follows:

```bash
matlab -nodisplay -r "addpath(genpath('.')); main" -logfile matlab.log
```

## MATLAB {auto-animate=true transition="fade"}

A similar command on Windows would be:

```bash
start matlab -nosplash  -minimize -r  "addpath(genpath('.'));main"  -logfile matlab.log
```



## Julia, Python {auto-animate=true transition="fade"}

In order to capture screen output in Julia and Python, on Unix-like system (Linux, macOS), the following can be run:

```bash
julia main.jl | tee main.log
```

which will create a log file with everything that would normally appear on the console using the `tee` command. 

## Julia, Python {auto-animate=true transition="fade"}

In order to capture screen output in Julia and Python, on Unix-like system (Linux, macOS), the following can be run:

```bash
python main.py | tee main.log
```

which will create a log file with everything that would normally appear on the console using the `tee` command. 




## Takeaways {.smaller}


- [x]  your code runs without problem, after all the debugging.
- [x] your code runs without manual intervention, and with low effort
- [x] it actually produces all the outputs
- [x] your code generates a log file that you can inspect, and that you could share with others.
- [ ] it will run on somebody else's computer
