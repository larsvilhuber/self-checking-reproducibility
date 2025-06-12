(auto-saving-figures)=
# Hands-off running: Automatically saving figures

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

# Same for tables 

Learn how to save tables in robust, reproducible ways. Do not try to copy-paste from console!

## Stata

`esttab` or `outreg2`, also `putexcel`. For fancier stuff, treat tables as data, use `regsave` or `export excel` to manipulate.

## R

`xtable`, `stargazer`, others.

::::

## Takeaways

- [x] your code runs without problem, after all the debugging.
- [x] your code runs without manual intervention, and with low effort
- [x] it actually produces all the outputs
- [ ] your code generates a log file that you can inspect, and that you could share with others.
- [ ] it will run on somebody else’s computer
