# Hands-off running: Automatically saving figures

Say you have 53 figures and 23 tables, the latter created from 161 different specifications. That makes for a lot of work when re-running the code, if you haven't automated the saving of said figures and tables. 


:::{.notes}
We have seen instructions that tell the replicator to right-click and save the figures. While there is no substitute for comparing all these figures, that's too much work!
:::

## TL;DR

- Save all figures using commands, rather than manually.
- It's easy.

## Saving figures programmatically

In order to be able to enable "hands-off running", saving figures (and tables) automatically is important. I will show here a few simple examples for various statistical programming languages. 




## Stata

After having created the graph ("`graph twoway`", "`graph bar`", etc.), simply add "`graph export "name_of_file.graph-extension", replace`". Many formats are available, as required by journal requirements. 

---

```stata
sysuse auto
graph twoway (lfitci mpg disp) (scatter mpg disp)
graph export "path/to/figure1.png"
```

For more information, see [https://www.stata.com/manuals/g-2graphexport.pdf](https://www.stata.com/manuals/g-2graphexport.pdf).


## R

Methods vary, but the two main ones are redefining the graphics device for the desired format, or using the `ggsave` wrapper. 

---

```r

library(ggplot2)
library(here)
figures <- here::here("figures")

ggp <- ggplot(mtcars,aes(mpg,disp)) + 
       geom_point()+ 
       stat_smooth(method = "lm",geom="smooth" )
ggsave(ggp,file.path(figures,"figure1.png"))
```

(for more information, see [https://ggplot2.tidyverse.org/reference/ggsave.html](https://ggplot2.tidyverse.org/reference/ggsave.html))

## For more examples

Python, MATLAB, other R methods - see the [full text](https://larsvilhuber.github.io/self-checking-reproducibility/03-automatically_saving_figures.html).

> In every programming language, this is simple!

::: {.notes}

If you want to create fancy figures with specific fonts and all sorts of widgets, you can do so, but you should not rely on that more complex code. Let the replicator create a figure that is close to, but not as fancy as yours. That's enough!

:::

## Same for tables

Learn how to save tables in robust, reproducible ways. Do not try to copy-paste from console!

### Stata

`esttab` or `outreg2`, also `putexcel`. For fancier stuff, treat tables as data, use `regsave` or `export excel` to manipulate.

### R

`xtable`,  `stargazer`, others. 


## Takeaways


::: {.incremental}

- ✅ your code runs without problem, after all the debugging.
- ✅your code runs without manual intervention, and with low effort
- ✅it actually produces all the outputs
- ❓your code generates a log file that you can inspect, and that you could share with others.
- ❓it will run on somebody else's computer

:::