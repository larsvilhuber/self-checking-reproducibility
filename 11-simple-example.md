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

:::{tab-item} `pip`

In a regular Python `venv` environment, `pip freeze` lists *all* installed packages. This may be more than you wish. For instance, if I install only `pandas` and `matplotlib`, the following is the output from `pip freeze`:

```
contourpy==1.3.3
cycler==0.12.1
fonttools==4.61.0
kiwisolver==1.4.9
matplotlib==3.10.8
numpy==2.3.5
packaging==25.0
pandas==2.3.3
pillow==12.0.0
pyparsing==3.2.5
python-dateutil==2.9.0.post0
pytz==2025.2
six==1.17.0
tzdata==2025.2
```

It is not easy to see which packages were explicitly installed by the user, and which ones were installed as dependencies. One way to get around this is to always use a `requirements.txt` file that specifies only the packages I wish to install, and always use it for installation (no manual `pip install`). For instance, if I create a `requirements.txt` file with the following contents:

```
pandas
matplotlib
```

and then install from that file using

```
pip install -r requirements.txt
``` 

If I need to add additional packages, I add them to the `requirements.txt` and re-run. I can provide the `requirements.txt` to replicators, while 

```
pip freeze --local > packages-as-installed.txt
```

can document all the packages that were present in my environment. 

:::

:::{tab-item} Conda

In a Conda environment, you can use the [`--from-history`](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#exporting-an-environment-file-across-platforms) flag 
to export only those packages explicitly installed.

```
conda env export --from-history > environment.yml
```

For instance, on a Linux system, using `conda env export` might yield in the base environment might yield


```yaml
name: base
channels:
  - defaults
dependencies:
  - _libgcc_mutex=0.1=main
  - _openmp_mutex=5.1=1_gnu
  - anaconda-anon-usage=0.7.4=pyhb46e38b_100
  - anaconda-auth=0.10.0=py313h06a4308_1
  - anaconda-cli-base=0.6.0=py313h06a4308_0
  - annotated-types=0.6.0=py313h06a4308_1
  - archspec=0.2.5=pyhd3eb1b0_0
  - boltons=25.0.0=py313h06a4308_0
  - brotlicffi=1.0.9.2=py313hbdd6827_2
  - bzip2=1.0.8=h5eee18b_6
(100 lines omitted!)
  - typing_extensions=4.15.0=py313h06a4308_0
  - tzdata=2025b=h04d1e81_0
  - urllib3=2.5.0=py313h06a4308_0
  - wheel=0.45.1=py313h06a4308_0
  - xorg-libx11=1.8.12=h9b100fa_1
  - xorg-libxau=1.0.12=h9b100fa_0
  - xorg-libxdmcp=1.1.5=h9b100fa_0
  - xorg-xorgproto=2024.1=h5eee18b_1
  - xz=5.6.4=h5eee18b_1
  - yaml-cpp=0.8.0=h6a678d5_1
  - zlib=1.3.1=hb25bd0a_0
  - zstandard=0.24.0=py313h3d778a8_0
  - zstd=1.5.7=h11fc155_0
prefix: /home/vilhuber/miniconda3
```

Some of the packages listed (`xorg-libx11`) are platform-specific, and cannot be installed on a Windows or a Mac system. Using the `--from-history` flag will yield a much shorter list, containing only those packages that were explicitly installed by the user:

```yaml
name: base
channels:
  - defaults
dependencies:
  - python=3.13
  - conda=25.9.1
  - setuptools
  - pip
  - wheel
  - conda-anaconda-telemetry[version='>=0.3.0']
  - conda-anaconda-tos[version='>=0.2.2']
  - conda-content-trust
  - conda-libmamba-solver
  - menuinst
  - anaconda-anon-usage
  - anaconda-auth
prefix: /home/vilhuber/miniconda3
```
:::
::::

The difference between the "intended" packages and all dependent packages can be substantial, and can make platform-agnostic reproducibility challenging if not impossible. 