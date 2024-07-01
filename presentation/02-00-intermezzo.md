# Why is this not enough?


## Does your code run without manual intervention?

Automation and robustness checks, as well as efficiency.

## Can you provide evidence that you ran it?

Generating a log file means that you can inspect it, and you can share it with others. Also helps in debugging, for you and others.

## Will it run on somebody else's computer? {.smaller}

Running it again does not help:

::: {.incremental}
  - because it does not guarantee that somebody else has all the software (including packages!)
  - because it does not guarantee that all the directories for input or output are there
  - because many intermediate files might be present that are not in the replication package
  - because you might have run things out of sequence, or relied on previously generated files in ways that won't work for others
  - because some outputs might be present from test runs, but actually fail in this run

:::