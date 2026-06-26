(auto-saving-figures)=
# Hands-off running: Automatically saving figures

:::{admonition} {raw-html}`<i class="fas fa-chalkboard"></i>` Presentation slides
:class: seealso dropdown
See this topic in the [presentation](https://larsvilhuber.github.io/self-checking-reproducibility/presentation/#/hands-off-running-automatically-saving-figures).
:::

Say you have 53 figures and 23 tables, the latter created from 161 different specifications. That makes for a lot of work when re-running the code, if you haven't automated the saving of said figures and tables. 


:::{warning}
We have seen instructions that tell the replicator to right-click and save the figures. While there is no substitute for comparing all these figures, that's too much work!
:::

## TL;DR

- Save all figures using commands, rather than manually.
- It's easy.

## Saving figures programmatically

In order to be able to enable "hands-off running", saving figures (and tables) automatically is important. I will show here a few simple examples for various statistical programming languages. 


::::{tab-set}


:::{tab-item} Stata

After having created the graph ("`graph twoway`", "`graph bar`", etc.), simply add "`graph export "name_of_file.graph-extension", replace`". Many formats are available, as required by journal requirements. 


```stata
sysuse auto
graph twoway (lfitci mpg disp) (scatter mpg disp)
graph export "path/to/figure1.png"
```

For more information, see [https://www.stata.com/manuals/g-2graphexport.pdf](https://www.stata.com/manuals/g-2graphexport.pdf).


:::

:::{tab-item} R

Methods vary, but the two main ones are redefining the graphics device for the desired format, or using the `ggsave` wrapper. Examples for both, below.

```r
attach(mtcars)
fit <- lm(mpg ~ disp)
png(filename=file.path("path","to","figure1.png"))
plot(fit)
dev.off()
```

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


:::

:::{tab-item} Python

There are many ways to do this in Python, which is often geared towards "head-less" processing. Even if using Jupyter notebooks, you should save the figures!

```python
import matplotlib.pyplot as plt
import os

plt.plot([1, 2, 3], [1, 4, 9])
plt.show()
plt.savefig(os.path.join("figures",'foo.png'))
plt.savefig(os.path.join("figures",'foo.pdf'))
```


:::

:::{tab-item} MATLAB

```matlab
bar(x);
saveas(gcf,fullfile('path','to','figure1.png'))
```
:::

:::{tab-item} Mathematica


Use [`Export[]`](https://reference.wolfram.com/language/ref/Export.html) to explicitly write out figures, rather than extracting them from a notebook.

:::


::::


## Same for tables 

Learn how to save tables in robust, reproducible ways. Do not try to copy-paste from console!


::::{tab-set}


:::{tab-item} Stata

For regression tables, use `esttab` or `outreg2`.

To output generic tables, use `export excel`. Can also be used to create more complex tables that are then re-arranged in Excel using cell references.

For fancier stuff, treat tables as data, use `regsave`, or write custom tables with pinpoint precision using  `putexcel`, possibly in combination with in combination with `r()` or `e()`.

:::

::: {tab-item} R

Use `xtable`, `stargazer` and its variants. For many objects, `print()`, `kable()` can output LaTeX or other formats. Most model output in R can be treated natively as an object, and manipulated or coerced into desired formats. For generic writing to Excel formats, possible to then further manipulate (with cell references!) into custom tables or figures, consider [`openxlsx`](https://cran.r-project.org/web/packages/openxlsx/index.html) or [`openxlsx::write.xlsx()`](https://ycphs.github.io/openxlsx/reference/write.xlsx.html).[^alsoexcel]

[^alsoexcel]: There is also a [`xlsx`](https://cran.r-project.org/web/packages/xlsx/xlsx.pdf) package, but it has a Java dependency, which is not as robust cross-platform.

:::

::: {tab-item} MATLAB

To write out Excel files, consider the modern  [`writematrix`](https://www.mathworks.com/help/matlab/ref/writematrix.html) and [`writetable`](https://www.mathworks.com/help/matlab/ref/writetable.html). Do not use older methods that require the presence of Microsoft Excel, since they uselessly limit the portability of your code.

For more complex tables, consider using [`fprintf`](https://www.mathworks.com/help/matlab/ref/fprintf.html) to write out text files, which can then be imported into Excel or other software.

:::

::::


## Combining table output and figure generation

If you must use Excel to create figures, you can still automate the process of writing the data to Excel. Do not copy-and-paste data, and generally, there is no need to export/import CSV files. By writing directly to Excel, you can use an Excel "shell" file that does all the graphing and formatting, and your Stata/R/etc. code simply updates the data that drives the figure. Simply reference in your figure the cells written by the various export commands noted above. 


## Some examples

:::: {tab-set}

:::{tab-item} Stata

```stata
// run gmm model
use http://www.stata-press.com/data/r13/auto
gmm (mpg - {b1}*weight - {b2}*length - {b0}), instruments(weight length)
matrix b = e(b)'
// prepare sheet
putexcel set myresults, sheet("GMM Results")
// write out results
putexcel B1 = "Coefficients"
putexcel A2 = matrix(b), rownames nformat(number_d2)
```

The resulting Excel sheet 
[myresults.xlsx](https://github.com/labordynamicsinstitute/replicability-training/files/12752468/myresults.xlsx) looks like this:

|  | Coefficients| |
|-- | --| -- |
|b1 | _cons | 0.00 |
|b2 | _cons | -0.08|
|b0 | _cons | 47.88|


An Excel formula could now collect specific coefficients across multiple regressions into a summary table, possibly easier than to program it in Stata. For more information, see [`putexcel`](https://www.stata.com/manuals/rptputexcel.pdf) (available since [at least Stata 13](https://www.stata.com/manuals13/pputexcel.pdf))

:::

::: {tab-item} MATLAB

```
    fileName = "./tables/table_6.xlsx";
    writetable(tDeltaChannelsAll, fileName, "Sheet", "default", "WriteRowNames", true, "Range", "A1");
```

:::
::::

## Takeaways

- [x] your code runs without problem, after all the debugging.
- [x] your code runs without manual intervention, and with low effort
- [x] it actually produces all the outputs
- [ ] your code generates a log file that you can inspect, and that you could share with others.
- [ ] it will run on somebody else’s computer
