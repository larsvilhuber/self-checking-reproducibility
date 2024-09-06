# Multi-software projects

Many projects will use multiple softwares, along the lines of "use what is appropriate for specific tasks." This may pose particular challenges. I showed that a generic `bash` script can handle running multiple softwares in the right sequence, but some researchers may be more comfortable in a main software package, or may not want to incur the additional complication of relying on `bash`, or worse, restricting reproducibility to a particular platform, for instance by choosing `cmd.exe` (`.bat` files) or Powershell scripts.

## System Paths

In order to call external software from within a statistical programming language, it is necessary to know where, on a system, the software can be found. In "Environments", we discussed *search paths*, but in many computing environments, not each piece of software is on that search path.

However, it is possible to explicitly address this. Each software does know where it is installed. 


### R

```R
R.home("bin")
```

will yield the location of the `R` executable, for instance
`C:/Program Files/R/R-4.4.0/bin/x64/R`. Note that it will vary by version!

### Stata

```stata
display c(sysdir_stata)
```

might display

```
. display c(sysdir_stata)
/usr/local/stata/
```

### Python

Typing 

:::::{tab-set}

::::{tab-item} bash/Zsh

```bash
which python3
```

into a Bash or Zsh window  might yield `/usr/bin/python3` on a particular *nix system (including macOS).

::::

::::{tab-item} Powershell

```bash
(Get-Command python).Path
```
into a (Windows) Powershell window  might yield `C:\Program Files\Python312\python.exe` on a particular Windows system.


::::

::::{tab-item} Cmd

```bash
where python
```

into a (Windows) Command window  might yield `C:\Program Files\Python312\python.exe` on a particular Windows system.

::::


:::::

## Calling software A from within software B

### Calling other software from Stata

This can then be used, for instance, to call `R` and `python` from a Stata program:

:::::{tab-set}

:::: Stata 16+

```stata
global Rterm_path "C:/Program Files/R/R-4.3.1/bin/x64"
* Set path to python executable here:
global python_ex "C:\Program Files\Python312\python.exe"

ssc install rsource
ssc install python


python set exec "$python_ex"
python script "code/run_geo_clean.py"

rsource using "code/figure1.R"
```

::::

:::: Stata before Stata 16

```stata
global Rterm_path "C:/Program Files/R/R-4.3.1/bin/x64"
* Set path to python executable here:
global python_ex "C:/Program Files/Python312/python.exe"

ssc install rsource
ssc install python


set python_exec "$python_ex"
python script "code/run_geo_clean.py"

rsource using "code/figure1.R"
```

where the Stata package [`rsource`](https://ideas.repec.org/c/boc/bocode/s456847.html) is used.[^pythonstata]

[^pythonstata]: Note that Stata has [integrated Python functionality](https://www.stata.com/manuals/ppystataintegration.pdf) since version 16. The example referenced uses an older Stata package that works for Stata since 2013.

::::
:::::

### Calling other software from Python

(WIP)

Python can be used as a multi-purpose orchestration system quite easily. Multiple "kernels" can be used in Jupyter notebooks, with appropriate support. Very simply, any OS call from Python can initiate "command line" execution of other code. More involved is to have programmatic structured approach. Examples include:

- [pystata](https://www.stata.com/python/pystata18/): calling Stata from Python

- 
