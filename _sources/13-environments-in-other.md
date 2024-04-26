(environments-other)=
# Using environments in other languages

R (via the `renv`) functionality, and Julia (natively, using the `Project` functionality) have similar functionality. MATLAB programs can also manipulate the [search path](https://www.mathworks.com/help/matlab/ref/path.html), which is done for plugins and other functionality, for instance when adding [Dynare](https://www.dynare.org/) as a plugin. They all work the same way. 

## Takeaways

### What this does

This ensures

- that your code runs without problem, after all the debugging.
- that your code runs without manual intervention.
- that your code generates a log file that you can inspect, and that you could share with others.
- that it will run on somebody else's computer
  - because it guarantees that all the software is there (but with a caveat we will discuss next)

### What this does not do

This does not ensure

- that it will run on somebody else's computer
  - because it does not guarantee that the next person can install the environment!
  - because it does not guarantee that all the directories for input or output are there
  - because many intermediate files might be present that are not in the replication package
  - because it does not guarantee that all the directory names are correctly adjusted everywhere in your code
- that it actually produces all the outputs
  - because some outputs might be present from test runs

### What to do next

To solve some of these problems, let's go to the next step.