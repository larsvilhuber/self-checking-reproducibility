(creating-log-files)=
# Creating log files

In order to document that you have actually run your code, a log file, a transcript, or some other evidence, may be useful. It may even be required by certain journals.

## TL;DR

- Log files are a way to document that you have run your code.
- In particular for code that runs for a very long time, or that uses data that cannot be shared, log files may be the only way to document basic reproducibility.

## Overview

Most statistical software has ways to keep a record that it has run, with the details of that run. Some make it easier than others. In some cases, you may need to instruct your code to be "verbose", or to "log" certain events. In other cases, you may need to use a command-line option to the software to create a log file.

:::{note}
I do note that we are typically only looking to document what the statistical code does, at a high level. We are not looking to document system calls, fine-grained data access, etc. Computer scientists and IT security mavens may be interested in such details, but economists are typically not.
:::

In almost all cased, the generated log files are simple text files, without any formatting, and can be read by any text editor (e.g., Visual Studio Code, Notepad++, etc.).


If not, ensure that they are (avoid *Stata SMCL* files, for example).

## Some auxiliary info

> It may be useful at this time to understand how to run code non-interactively. 
>
> - [Useful resource for R](https://github.com/gastonstat/tutorial-R-noninteractive/)