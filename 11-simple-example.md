(simple-example)=
# A simple example

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

These are packages I have installed to work. Now let's create a new environment, that activate it to see what happens:


::::{tab-set}


:::{tab-item} POSIX (Linux, macOS, etc.)


```bash
# create a new environment
python -m venv myenv
# activate the new environment
source myenv/bin/activate
```

:::

:::{tab-item} Windows/command

```bash
# create a new environment
python -m venv myenv
# activate the new environment
myenv\Scripts\activate.bat
# On Windows/Bash:
source myenv/Scripts/activate
```

:::

:::{tab-item} Windows/bash


```bash
# create a new environment
python -m venv myenv
# activate the new environment
source myenv/Scripts/activate
```

:::

::::

Let's see what happens when we list the installed packages:

```bash

# list installed packages
pip list
```

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

So the operating system is looking for Python in the `myenv` directory. And this is also where `pip` will look. In fact, all of the packages previously listed are still on my computer - but are not accessible as long as I have this environment active.

```{note}
Technically, we modified the operating system's PATH variable. Every operating system has an ordered list through which it searches for commands and software. 

```

Our environment got added to the top of the various directories listed there, so that the particular location for Python is found first. Python, in turn, then uses the location of `python`  in `sys.prefix` and `sys.exec_prefix` to find the other packages. See [Python documentation](https://docs.python.org/3/library/venv.html#how-venvs-work).

## Installing packages when an environment is active

:::{admonition} TODO
Walk through the steps to install packages, and identify where they go.
:::

## Installing precise versions of packages


:::{admonition} TODO
Walk through the steps to install specific versions of packages, and where they come from.
:::

## Making environments portable and reproducible

This is deferred to [later](reproducing-environments).


:::{warning}

While we used interactive commands to install the various packages here, that was only for illustrative purposes. **Always** using a `requirements.txt` file to specify the packages to be installed. We will address how and when to use that file in the [next section](reproducing-environments).

:::

## Specifying only the intended packages

When constructing an environment, `python` and its various package managers will install many dependencies, including some that are platform-specific. Thus, a complete listing of packages may not be portable. To the extent possible, authors should both document what was installed in their environment (for completeness), and provide documentation that allows others to re-instantiate an environment (i.e., the `environment.yml` or `requirements.txt` file mentioned earlier).

::::{tab-set}

:::{tab-item} Pip

:::

:::{tab-item} Conda

In a Conda environment, you can use the [`--from-history`](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#exporting-an-environment-file-across-platforms) flag 
to export only those packages explicitly installed.

```
conda env export --from-history > environment.yml
```
 
