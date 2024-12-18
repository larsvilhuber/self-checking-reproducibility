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
from datetime import datetime
def track_calls(func):
    def wrapper(*args, **kwargs):
        with open('function_log.txt', 'a') as f:
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            f.write(f"[{timestamp}] Calling {func.__name__} with args: {args}, kwargs: {kwargs}\n")
        result = func(*args, **kwargs)
        return result
    return wrapper

# Usage
@track_calls
def my_function(x, y,default="TRUE"):
    return x + y

my_function(1, 2,default="false")
```

will output

```
[2024-12-15 12:05:37] Calling my_function with args: (1, 2), kwargs: {'default': 'false'}
```

See also the [Python logging documentation](https://docs.python.org/3/library/logging.html) for controlled output.
:::

::::

While some software (Stata, MATLAB) will create log files that contain commands and output, others (R, Python) will (by default) create log files that contain only output.

## Using `tidylog` for logging data manipulations in R

### Installing `tidylog`

To install the `tidylog` package, you can add it to your `requirements.txt` file in the root directory of your project. Alternatively, you can install it directly in your R script using the following command:

```R
install.packages("tidylog")
```

### Example usage of `tidylog`

Here is an example of how to use `tidylog` in the context of AEJPol-2023-0640:

```R
library(tidylog)
library(dplyr)

# Example data manipulation
data <- data %>%
  filter(!is.na(variable)) %>%
  mutate(new_variable = variable * 2) %>%
  group_by(group_variable) %>%
  summarize(mean_value = mean(new_variable, na.rm = TRUE))
```

### How `tidylog` logs data manipulations

`tidylog` automatically logs data manipulations performed using `dplyr` functions. When you use `tidylog` functions, it provides informative messages about the changes made to your data. For example, it will log the number of rows removed by a `filter` operation, the number of new columns created by a `mutate` operation, and so on. This makes it easier to track and understand the changes made to your data.

### Reference to example paper AEJPol-2023-0640

The example paper AEJPol-2023-0640 illustrates the use of `tidylog` for logging data manipulations in R. By incorporating `tidylog` into your R scripts, you can explicitly log data manipulations, making it easier to track and understand the changes made to your data.
