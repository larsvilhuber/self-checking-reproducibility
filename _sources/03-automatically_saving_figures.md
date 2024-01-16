(auto-saving-figures)=
# Hands-off running: Automatically saving figures

Say you have 53 figures and 23 tables, the latter created from 161 different specifications. That makes for a lot of work when re-running the code, if you haven't automated the saving of said figures and tables. 


```{warning}
We have seen instructions that tell the replicator to right-click and save the figures. While there is no substitute for comparing all these figures, that's too much work!
```

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

(for more information, see help pages for "?png", "?eps", or "?pdf") 

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

```python
Need example
```


:::

:::{tab-item} MATLAB

```matlab
bar(x);
saveas(gcf,fullfile('path','to','figure1.png'))

```


:::


::::

## Takeaways

### What this does

This ensures

- that your code runs without problem, after all the debugging.
- that your code runs without manual intervention.
- that you do not impose fallible and onerous work on replicators

### What this does not do

This does not ensure

- that your code generates a log file that you can inspect, and that you could share with others.
- that it will run on somebody else's computer
  - because it does not guarantee that all the software is there
  - because it does not guarantee that all the directories for input or output are there
  - because many intermediate files might be present that are not in the replication package
  - because it does not guarantee that all the directory names are correctly adjusted everywhere in your code
- that it actually produces all the outputs
  - because some outputs might be present from test runs

### What to do next

To solve some of these problems, let's go to the next step.
