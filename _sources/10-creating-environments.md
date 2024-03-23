(environments)=
# Creating and using environments

One way to isolate your statistical code in one project from the rest of your installation on your computer is to use "environments". The term is used here generically, and not every statistical language calls it that. Generically, all "environments" simply modify where the specific software searches for its components, and in particular any supplementary components (packages, libraries, etc.). Formally, this is true for operating systems as well, and in some cases, the operating system and the programming language interact (for instance, in Python).

## TL;DR

- Using environments allows a researcher to isolate a project (replication package) from the rest of their system.
- Properly defined environments can therefore help make code more reproducible.


## A simple example

Let's consider a simple example in Python, where this functionality is (nearly) native. We will use the `virtualenv` package, which is a standard part of Python. First, let's consider what happens when we install a package in the "base" environment, the default when you start Python.

```bash
# list installed packages
pip list
```

outputs:

```
Package            Version
------------------ ----------
certifi            2023.11.17
charset-normalizer 3.3.2
idna               3.6
pip                23.2.1
PyYAML             6.0.1
requests           2.31.0
urllib3            2.1.0
wget               3.2
zenodo-get         1.5.1
```

These are packages I have installed to work. Now let's create a new environment, and activate to see what happens:


::::{tab-set}


:::{tab-item} POSIX (Linux, macOS, etc.)


```bash
# create a new environment
python -m venv myenv
# activate the new environment
source myenv/bin/activate
# list installed packages
pip list
```

:::

:::{tab-item} Windows/command

```bash


```bash
# create a new environment
python -m venv myenv
# activate the new environment
myenv\Scripts\activate.bat
# On Windows/Bash:
source myenv/Scripts/activate
# list installed packages
pip list
```

:::

:::{tab-item} Windows/bash


```bash
# create a new environment
python -m venv myenv
# activate the new environment
source myenv/Scripts/activate
# list installed packages
pip list
```

:::

::::

will output

```
Package Version
------- -------
pip     23.2.1
```

So where did all the other packages go? One hint is if we identify *which* Python we are using:

```bash
which python
```

```
/c/Users/lv39/Documents/GitHub/self-checking-reproducibility/myenv/Scripts/python
```

So it is looking for Python in the `myenv` directory. And this is also where `pip` will look. In fact, all of the packages previously listed are still on my computer - but are not accessible as long as I have this environment active.

```{note}
Technically, we modified the Python search path: the operating system's PATH variable. Our environment got added to the top of the various directories listed there, so that the particular location for Python is found first. Python, in turn, then uses that in `sys.prefix` and `sys.exec_prefix` to find the other packages. See [Python documentation](https://docs.python.org/3/library/venv.html#how-venvs-work).

```

## Search paths in Stata

In Stata, we typically do not talk about environments, but the same basic structure applies: Stata searches along a set order for its commands. Some commands are built into the executable (the software that is opened when you click on the Stata icon), but most other internal, and all external commands, are found in a search path. This is typically the `ado` directory in the Stata installation directory, and one will find replication packages that contain instructions to copy files into that directory. Once we've shown how environments work in Stata, this will become a lot simpler!

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

The search path where Stata looks for commands is queried by `adopath`, and looks similar, but now has an order assigned to each entry:

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

When we install a package, only one of the paths is relevant: `PLUS`. So if we install `reghdfe` with `ssc install reghdfe`, it will be installed in the `PLUS` directory, and we can see that with `which`:

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

```{important}
It is important here to recognize that it is the value of the special entry `PLUS` in the `adopath` that determines where Stata looks for commands, not the specific location!
```

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

We now see it in the **project-specific** directory, which we can distribute with the whole project (more on that later). 

Let's imagine we need an older version of `reghdfe`. We will leverage the SSC Snapshot maintained by Lars Vilhuber on Github ([https://github.com/labordynamicsinstitute/ssc-mirror/](https://github.com/labordynamicsinstitute/ssc-mirror/)) (details are for a different tutorial):

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

## Using environments in other languages

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