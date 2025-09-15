(reproducing-environments-stata)=
# Reproducing and documenting environments in Stata

Stata poses additional challenges, since there are no robust mechanisms to point to specific versions of packages in the standard package repositories.

- Stata Journal provides clearly versioned packages that go with the relevant publication, but are not necessarily updated.
- SSC packages are not versioned, and will change over time.
- Github-hosted Stata packages may or may not be correctly versioned. 




## TL;DR

- Provide a an install program that you used to install packages, and documents to others how you installed them.
- Provide a directory with the installed Stata packages as part of the replication package.

## Bad solution

One solution we often find in replication packages is that authors force installation of the latest package:

```stata
cap noi net uninstall package
ssc install package, replace
```	

This is fragile, because it will install the latest version of the package, which may not be the version you used, and may fail for the replicator when the version you used worked for you.

## Solution

### Construct a Stata environment 

As described in [Environments in Stata](stata-environments), construct a Stata environment, which installs packages into a specific directory, say, `installed-ado`.

### Create a setup script

Create a setup script that installs all the packages you used. Ideally, this is executed only when needed, and will not overwrite existing packages. Note the absence of the `replace` option. From now on, never manually install packages, always use the setup script.

```stata
* setup.do
* Installed on 2024-06-21
ssc install package1
* Installed on 2024-07-01
net install package2, from("https://example.com/package2")
``` 

```stata
* main.do
* Set the root directory
global rootdir : pwd
* other stuff as previously outlined
* Set install flag
global install 0
* ...
* Run the setup program only if the flag is set
if $install == 1 {
    do $rootdir/setup.do
}
```

### Provide `setup.do` and the `installed-ado` directory as part of your replication package.

The `setup.do` file documents how you installed, and with the noted dates, when you installed it. However, the replicator will not actually need to run it, since you also provide the `installed-ado` directory.

### Instructions to the replicator

Your README might now say:

> The replication package depends on the following Stata packages:
>
> - `package1` (installed on 2024-06-21)
> - `package2` (installed on 2024-07-01)
>
> The packages are included in the `installed-ado` directory. The `main.do` automatically sets the `adopath` to include this directory.
> The `setup.do` documents how these were installed, and can be used to re-install, if so desired (not suggested).
> To re-install, delete the contents of the `installed-ado` directory, and set the global `install` to 1 in `main.do`.



## Extra-good solution

One way to ensure that, even when the installed packages are lost, re-installation provides the same packages as before is to attempt something like the "version pinning" of Python, R, Julia, etc. This only works 

- for certain packages
- for a certain time period.

### Github-hosted packags

If Github-hosted packages have specifically tagged versions, a correct `net install` command can be constructed. 

```stata
local github "https://raw.githubusercontent.com"
local multeversion "1.1.0"
net install multe, from(`github'/gphk-metrics/stata-multe/`mutleversion'/)
```

**Downside**

If the author decides to remove the package from Github (which is not a trusted archive), this still fails.

### SSC packages after Jan 1, 2022

For SSC packages, a mirror of the SSC archive has been maintained by *Lars Vilhuber* at [github.com/labordynamicsinstitute/ssc-mirror/](https://github.com/labordynamicsinstitute/ssc-mirror/), allowing for installation of packages "as of" a specific date.

```stata
local github "https://raw.githubusercontent.com"
local sscurl "fmwww.bc.edu/repec/bocode"
local sscdate "2022-01-01"
net install a2reg, from(`github'/labordynamicsinstitute/ssc-mirror/`sscdate'/`sscurl'/a)
```

**Downside**

This only works for SSC hosted packages.

