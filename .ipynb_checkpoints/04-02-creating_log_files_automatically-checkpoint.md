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

To automatically create a log file, run R from the command line using the `BATCH` functionality, as follows:

```bash
R CMD BATCH options infile outfile
```

where

- `infile` is the required input file with the code to be executed

- `outfile` is the name of an optional output file. If `outfile` is omitted, this will create a file `main.Rout` in the same directory as `main.R`.


:::{warning}
On Windows, you may need to include the full path of R: `C:\Program Files\R\R-4.1.0\bin\R.exe CMD BATCH main.R`
:::


If you prefer a different name for the output file, you can specify it.

```bash
R CMD BATCH main.R main.$(date +%F-%H:%M:%S).Rout
```

which will create a second-precise date-time stamped log file. 

Finally, if you want to prevent R from saving or restoring its environment (by default, `R CMD BATCH` does both), you can specify the `--no-save` and `--no-restore` options.

```bash
R CMD BATCH --no-save --no-restore main.R main.$(date +%F-%H:%M:%S).Rout
```

The most output, and the least "acquired" information, is obtained by running the following command:

```bash
R CMD BATCH --debugger --verbose --vanilla main.R main.$(date +%F-%H:%M:%S).Rout
```

:::{warning}
If there are other commands, such as `sink()`, active in the R code, the `main.Rout` file will not contain some output.
:::


> To see more information, check the manual documentation by typing
`?BATCH` (or `help(BATCH)`) from within an R interactive session. Or by 
typing `R CMD BATCH --help` from the command line.



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
julia main.jl | tee main-$(date +%F-%H_%M)-${USER}.log
```

or 

```bash
python main.py | tee main-$(date +%F-%H_%M)-${USER}.log
```

which will create a log file with everything that would normally appear on the console using the `tee` command. 

::::

:::::

## Takeaways

- [x] your code runs without problem, after all the debugging.
- [x] your code runs without manual intervention, and with low effort
- [x] it actually produces all the outputs
- [x] your code generates a log file that you can inspect, and that you could share with others.
- [ ] it will run on somebody else’s computer
