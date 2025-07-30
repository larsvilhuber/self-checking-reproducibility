(stata-environments)=
# Environments in Stata

## Search paths in Stata

In Stata, we typically do not talk about environments, but the same basic structure applies: Stata searches along a set order for its commands. Some commands are built into the executable (the software that is opened when you click on the Stata icon), but most other internal, and all external commands, are found in a search path. This is typically the `ado` directory in the Stata installation directory, and one will find replication packages that contain instructions to copy files into that directory. Once we've shown how environments work in Stata, this will become a lot simpler!

### The `sysdir` directories

The default set of directories which can be searched, from a freshly installed Stata, can be queried with the `sysdir` command, and will look something like this:

```stata
sysdir
```

```
   STATA:  C:\Program Files\Stata18\
    BASE:  C:\Program Files\Stata18\ado\base\
    SITE:  C:\Program Files\Stata18\ado\site\
    PLUS:  C:\Users\lv39\ado\plus\
PERSONAL:  C:\Users\lv39\ado\personal\
OLDPLACE:  c:\ado\
```

### The `adopath` search order

The search paths where Stata looks for commands is queried by `adopath`, and looks similar, but now has an order assigned to each entry:

```stata
adopath
```

```
  [1]  (BASE)      "C:\Program Files\Stata18\ado\base/"
  [2]  (SITE)      "C:\Program Files\Stata18\ado\site/"
  [3]              "."
  [4]  (PERSONAL)  "C:\Users\lv39\ado\personal/"
  [5]  (PLUS)      "C:\Users\lv39\ado\plus/"
  [6]  (OLDPLACE)  "c:\ado/"
```

To look for a command, say `reghdfe`, Stata will look in the first directory, then the second, and so on, until it finds it. If it does not find it, it will return an error. We can query the location of `reghdfe` explicitly with `which`:

```stata
which reghdfe
```

```
command reghdfe not found as either built-in or ado-file
r(111);
```

### Where are packages installed?

[^net-ref]: [`net install` refererence](https://www.stata.com/manuals/rnet.pdf). Strictly speaking, the location where ado packages are installed can be changed via the `net set ado` command, but this is rarely done in practice, and we won't do it here. 


When we install a package, using one of the various package installation commands (`net install`, `ssc install`)[^net-ref], only one of the (`sysdir`) paths is relevant: `PLUS`. So if we install `reghdfe` with `ssc install reghdfe`, it will be installed in the `PLUS` directory, and we can see that with `which`:

```stata
ssc install reghdfe
which reghdfe
```

```
. ssc install reghdfe
checking reghdfe consistency and verifying not already installed...
installing into C:\Users\lv39\ado\plus\...
installation complete.

. which reghdfe
C:\Users\lv39\ado\plus\r\reghdfe.ado
*! version 6.12.3 08aug2023
```

:::{important}
It is important here to recognize that it is the value of the special `sysdir` directory `PLUS` that determines where Stata installs commands, but the separate list of `adopath`  locations where it looks for commands. It is possible to install a command in a location that Stata does not look for commands!
:::

## Using environments in Stata

But the `(PLUS)` directory can be manipulated, and that creates the opportunity to create an "environment". 



```stata

* Set the root directory

global rootdir : pwd

* Define a location where we will hold all packages in THIS project (the "environment")

global adodir "$rootdir/ado"

* make sure it exists, if not create it.

cap mkdir "$adodir"

* Now let's simplify the adopath
* - remove the OLDPLACE and PERSONAL paths
* - NEVER REMOVE THE SYSTEM-WIDE PATHS - bad things will happen!

adopath - OLDPLACE
adopath - PERSONAL

* modify the PLUS path to point to our new location, and move it up in the order

sysdir set PLUS "$adodir"
adopath ++ PLUS

* verify the path

adopath
```

which should show something like this:

```
. adopath
  [1]  (PLUS)      "C:\Users\lv39\Documents/PROJECT123/ado/"
  [2]  (BASE)      "C:\Program Files\Stata18\ado\base/"
  [3]  (SITE)      "C:\Program Files\Stata18\ado\site/"
  [4]              "."
```

Let's verify again where the `reghdfe` package is:

```stata
which reghdfe
```

```
. which reghdfe
command reghdfe not found as either built-in or ado-file
r(111);
```

So it is no longer found. Why? Because we have removed the previous location (the old `PLUS` path) from the search sequence. It's as if it didn't exist.



## Installing packages when an environment is active


When we now install `reghdfe` again:

```
. ssc install reghdfe
checking reghdfe consistency and verifying not already installed...
installing into C:\Users\lv39\Documents\PROJECT123\ado\plus\...
installation complete.

. which reghdfe
C:\Users\lv39\Documents\PROJECT123\ado\plus\r\reghdfe.ado
*! version 6.12.3 08aug2023
```

We now see it in the **project-specific** directory, which we can distribute with the whole project (more on that [later](reproducing-environments)). 

## Other implementation of this approach

The above approach is not novel. [Julian Reif](https://julianreif.com) has suggested something similar for several years in his [Stata Coding Guide](https://julianreif.com/guide/#libraries), though I do not agree with his suggestion to delete the `_install_stata_packages.do`, because doing so destroys provenance information (where did the Stata packages come from).

More recently, the folks at the [World Bank DIME Analytics](https://www.worldbank.org/en/research/dime/data-and-analytics) and [LSMS](https://www.worldbank.org/en/programs/lsms) teams have created a Stata command called [`repado`](https://worldbank.github.io/repkit/reference/repado.html) to manage Stata package environments, which fundamentally is a two-line way to implement the various adjustments outlined earlier. 

Personally, I prefer the few lines of code explicitly written out above, for their transparency, but all of these approaches ultimately achieve the goal of isolating the project-specific package environment from uncontrolled changes to the rest of your software platform, and when included in the replication package, make replication more robust and easier.


## Installing precise versions of packages


Let's imagine we need an older version of `reghdfe`. In general, it is **not** possible in Stata to install an older version of a package in a straightforward fashion. You *may* have success with the [Wayback Machine archive of SSC](https://web.archive.org/web/20141226200440/http://fmwww.bc.edu/RePEc/bocode/), which in some cases goes back to 2000, by carefully reconstructing the necessary files. 

Here, we will leverage the **SSC Snapshot** maintained by Lars Vilhuber on Github ([https://github.com/labordynamicsinstitute/ssc-mirror/](https://github.com/labordynamicsinstitute/ssc-mirror/)), which has been capturing snapshots of SSC since [late 2021](https://github.com/labordynamicsinstitute/ssc-mirror/releases/tag/2021-12-21) (details are for a different tutorial):

```stata
* define the date
global sscdate "2021-12-21"
net install reghdfe, from(https://raw.githubusercontent.com/labordynamicsinstitute/ssc-mirror/${sscdate}/fmwww.bc.edu/repec/bocode/r)
```

which gives us

```
. net install reghdfe, from(https://raw.githubusercontent.com/labordynamicsinsti
> tute/ssc-mirror/${sscdate}/fmwww.bc.edu/repec/bocode/r)
checking reghdfe consistency and verifying not already installed...
installing into C:\Users\lv39\Documents/ado\...
installation complete.

. which reghdfe
C:\Users\lv39\Documents/ado\r\reghdfe.ado
*! version 5.7.3 13nov2019
```

So we now have TWO different version of `reghdfe` installed:

- Version 5.7.3 from Nov 2019 is installed at `C:\Users\lv39\Documents/ado\r\reghdfe.ado` 
- Version 6.12.3 from Aug 2023 is installed at `C:\Users\lv39\ado\plus\r\reghdfe.ado`

::: {.column-margin}

**Stata can get confused about how to write paths...**

Stata on Windows can understand two types of path syntax: the "Windows" syntax, with backslashes `\`, and the "Unix" syntax, with forward slashes '/'. It will usually report paths in the "Windows" syntax, but these will not work, if coded as such, on non-Windows platforms, which do not understand the backslash as a path separator. We have used platform-agnostic paths above, using forward slashes. This then generates the "weird"  mixed notation:

```
C:\Users\lv39\Documents/ado\r\reghdfe.ado
```

Other software (e.g, R), will consistently use the forward slash, even on Windows, when paths are coded internally.

:::

Only the former is used by the "environment" we just configured! Which is a good thing, since there are a few functional differences between these two packages. But for the life of *this* project, that functionality can now be relied upon - as long as we take care to use the same "environment" for all code run within this project. This can be achieved by using the `main.do` defined in [one of the previous sections](hands-off-running):

```stata
* main.do
* This is a simple example of a main file in Stata
* It runs all the other files in the correct order

* Set the root directory

global rootdir : pwd

* Define a location where we will hold all packages in THIS project (the "environment")

global adodir "$rootdir/ado"

* Enable project environment

cap mkdir "$adodir"
adopath - OLDPLACE
adopath - PERSONAL
sysdir set PLUS "$adodir"
adopath ++ PLUS
adopath

* Run the data preparation file
do $rootdir/01_data_prep.do

// etc. etc.
```

:::{warning}

While we used interactive commands to install the various packages here, that was only for illustrative purposes. **Always** script the installation of packages in a `setup.do` file. We will address how and when to run that file in the [next section](reproducing-environments).

:::

