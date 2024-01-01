# Run it all again

The very first test is that your code must run, beginning to end, top to bottom, without error, and ideally without any user intervention. This should in principle (re)create all figures, tables, and numbers you include in your paper. 

## TL;DR

This is pretty much the most basic test of reproducibility. If you cannot run your code, you cannot reproduce your results, nor can anybody else. So just re-run the code.

## Exceptions

### Code runs for a very long time

What happens when some of these re-runs are very long? See later in this chapter for how to handle this.

### Making the code run takes you a very long time

While the code, once set to run, can do so on its own, *you* might need to spend a lot of time getting all the various pieces to run. This should be a warning sign: if it takes you a long time to get it to run, or to manually reproduce the results, it might take others even longer. Furthermore, it may suggest that you haven't been able to re-run your own code very often, which can be correlated with fragility or even lack of reproducibility. We address this partially in the [next section](hands-off-running).

## What this does

This ensures

- that your code runs without problem, after all the debugging.

## What this does not do

This does not ensure


- that your code runs without manual intervention.
- that your code generates a log file that you can inspect, and that you could share with others.
- that it will run on somebody else's computer
  - because it does not guarantee that all the software is there
  - because it does not guarantee that all the directories for input or output are there
  - because many intermediate files might be present that are not in the replication package
  - because it does not guarantee that all the directory names are correctly adjusted everywhere in your code
- that it actually produces all the outputs
  - because some outputs might be present from test runs