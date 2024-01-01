(creating-log-files)=
# Creating log files

In order to document that you have actually run your code, a log file, a transcript, or some other evidence, may be useful. It may even be required by certain journals.

## TL;DR

- Log files are a way to document that you have run your code.
- In particular for code that runs for a very long time, or that uses data that cannot be shared, log files may be the only way to document basic reproducibility.

## Overview

Most statistical software has ways to keep a record that it has run, with the details of that run. Some make it easier than others. In some cases, you may need to instruct your code to be "verbose", or to "log" certain events. In other cases, you may need to use a command-line option to the software to create a log file.

```{warning}
I do note that we are typically only looking to document what the statistical code does, at a high level. We are not looking to document system calls, fine-grained data access, etc. Computer scientists and IT security mavens may be interested in such details, but economists are typically not.
```

## Examples

### Explicit log files

We start by describing how to explicitly generate log files as part of the statistical processing code.

::::{tab-set}


:::{tab-item} Stata

```stata
global logdir "${rootdir}/logs"
cap mkdir "$logdir"`
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
globallog <- file(file.path(rootdir,logfile.name), open = "wt")
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

::::

