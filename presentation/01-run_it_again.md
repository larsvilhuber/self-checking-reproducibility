# Run it all again

The very first test is that your code must run, beginning to end, top to bottom, without error, and ideally without any user intervention. This should in principle (re)create all figures, tables, and numbers you include in your paper. 

## TL;DR

This is pretty much the most basic test of reproducibility. If you cannot run your code, you cannot reproduce your results, nor can anybody else. So just re-run the code.

## Exceptions

## Code runs for a very long time

What happens when some of these re-runs are very long? See later in this chapter for how to handle this.

## Making the code run takes YOU a very long time

While the code, once set to run, can do so on its own, *you* might need to spend a lot of time getting all the various pieces to run. 

---

![](images/Red-Warning-PNG-Clipart.png)


*This should be a warning sign:* if it takes you a long time to get it to run, or to manually reproduce the results, it might take others even longer.[^warning-sign] 


[^warning-sign]: Source: [Red Warning PNG Clipart](https://www.pngall.com/warning-sign-png/download/69408), CC-BY.

---

Furthermore, it may suggest that you haven't been able to re-run your own code very often, which can be correlated with fragility or even lack of reproducibility. 

## Takeaways

::: {.incremental}

- ✅ your code runs without problem, after all the debugging.
- ❓your code runs without manual intervention, and with low effort
- ❓it actually produces all the outputs
- ❓your code generates a log file that you can inspect, and that you could share with others.
- ❓it will run on somebody else's computer

:::