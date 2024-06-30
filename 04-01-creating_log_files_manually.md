(creating-log-files-explicitly)=
# Creating log files explicitly

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

How to potentially do this automatically at each start, see [Stata manual](https://www.stata.com/manuals/gswb.pdf#gswB.3).

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

While some software (Stata, MATLAB) will create log files that contain commands and output, others (R, Python) will  create log files that contain only output. 
