(testing-docker)=
# Testing Docker

Once you have Docker installed, you should test it with the software you plan to use. 

> These instructions are provided as command-line examples, as this abstracts away from any differences in graphical user interfaces. You may be able to figure out as well how to do this with a GUI, we have not tested that.


## Pre-requisites

You need to have Docker (engine) installed, or an equivalent (compatible) system.


## Testing a R image  

- Open a terminal and type.:

```bash
VERSION=4.4.3
TYPE=r-ver

docker run --rm rocker/$TYPE:$VERSION R --version
```

or for something a bit more complicated

```
docker run --rm  rocker/$TYPE:$VERSION Rscript -e "Sys.info()"
```

which should generate something like this:

:::: {tab-set}

::: {tab-item} WSL

```
                                              sysname
                                              "Linux"
                                              release
                   "6.6.87.2-microsoft-standard-WSL2"
                                              version
"#1 SMP PREEMPT_DYNAMIC Thu Jun  5 18:30:46 UTC 2025"
                                             nodename
                                       "fd2497260a3c"
                                              machine
                                             "x86_64"
                                                login
                                            "unknown"
                                                 user
                                               "root"
                                       effective_user
                                               "root"
```

:::
::: {tab-item} Linux

```

                                                        sysname
                                                        "Linux"
                                                        release
                                   "6.4.0-150600.23.60-default"
                                                        version
"#1 SMP PREEMPT_DYNAMIC Tue Jul  1 14:43:49 UTC 2025 (6f98261)"
                                                       nodename
                                                 "c295b531b0e7"
                                                        machine
                                                       "x86_64"
                                                          login
                                                      "unknown"
                                                           user
                                                         "root"
                                                 effective_user
                                                         "root"
```

:::

::: {tab-item} MacOS
```

			                  sysname                               release 
                              "Linux"                    "6.11.11-linuxkit" 
                              version                              nodename 
"#1 SMP Wed Oct 22 09:37:46 UTC 2025"                        "4c32b0d648a9" 
                              machine                                 login 
                            "aarch64"                             "unknown" 
                                 user                        effective_user 
                               "root"                                "root” 
                               
```

:::
::::

##  Testing a Stata image

In order to run Stata, you need to have a Stata license, as installed on your existing system. This can be in a few locations. Replace `$STATALIC` with the path to your Stata license file:

- Windows: `C:\Program Files\Stata17\stata.lic` or `C:\Program Files (x86)\Stata17\stata.lic`
- MacOS: `/Applications/Stata/Stata.lic`
- Linux: `/usr/local/stata/stata.lic` or `/usr/local/stata17/stata.lic`

```bash
STATALIC="/path/to/stata.lic"
VERSION=16
TAG=2023-06-13
```

> NOTE: Regardless of your current license, say for Stata 19Now, we will run the test with Stata 16! Your license file will work for all lower versions of Stata. 

Then, to test the Stata installation, run the following in a terminal.


```bash
docker run -it --rm \
   -v "$STATALIC":/usr/local/stata/stata.lic \
   --entrypoint "stata" \
    dataeditors/stata$VERSION:$TAG \
    exit, STATA
```

This should start and then immediately exit Stata:

```
> docker run -it --rm \
>    -v "$STATALIC":/usr/local/stata/stata.lic \
>    --entrypoint "stata" \
>     dataeditors/stata$VERSION:$TAG \
>     exit, STATA

Unable to find image 'dataeditors/stata16:2023-06-13' locally
2023-06-13: Pulling from dataeditors/stata16
56e0351b9876: Already exists
2523c6655958: Pull complete
cfc7dba720bb: Pull complete
58680fd4cb1a: Pull complete
6116d32e100f: Pull complete
7fe335012735: Pull complete
Digest: sha256:cbc369637c6463ad32d7914326009c14f42524729079d1f88d8fbb197abed4c2
Status: Downloaded newer image for dataeditors/stata16:2023-06-13

  ___  ____  ____  ____  ____ (R)
 /__    /   ____/   /   ____/
___/   /   /___/   /   /___/   16.1   Copyright 1985-2019 StataCorp LLC
  Statistics/Data analysis            StataCorp
                                      4905 Lakeway Drive
                                      College Station, Texas 77845 USA
                                      800-STATA-PC        https://www.stata.com
                                      979-696-4600        stata@stata.com
                                      979-696-4601 (fax)

Stata license: (your info here)
Serial number: (your serial number here)
  Licensed to: (your info here)

Notes:
      1. Unicode is supported; see help unicode_advice.

. exit, STATA
>
```

### Troubleshooting

:::: {tab-set}

::: {tab-item} MacOS

**File sharing**

On MacOS, Docker Desktop requires you to explicitly share file paths with the Docker engine if the desired path is outside of `/Users`. This may include cloud filesystems like Dropbox.  

To do this, open Docker Desktop, go to Preferences -> Resources -> File Sharing, and add the path where your files are located (see the [Docker manual](https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/topics/#using-mounted-volumes-and-getting-runtime-errors-indicating-an-application-file-is-not-found-access-to-a-volume-mount-is-denied-or-a-service-cannot-start) for more information).

**Workaround for License issues**


If you run into file sharing issues with the license file, you see an error message like this:

```
WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested
docker: Error response from daemon: mounts denied:
The path /Applications/Stata/Stata.lic is not shared from the host and is not known to Docker.
You can configure shared paths from Docker -> Preferences... -> Resources -> File Sharing.
See https://docs.docker.com/go/mac-file-sharing/ for more info.

Run 'docker run --help' for more information
```

When using Docker Desktop on Mac, if the above steps for Stata aren't working, you may need to move your Stata license file to `Documents` and allow access to the file from there. Before running anything, run the following line in terminal to copy your Stata license file from `Applications` to `Documents`.

```bash
cp /Applications/Stata/Stata.lic $HOME/Documents
```

Then you will use the following file path in your set up:

```bash
export STATALIC="$HOME/Documents/Stata/stata.lic"
```

From there the rest of your code should work fine. 


:::
::: {tab-item} Windows

**File sharing**

In principle, on Windows, filesharing should either "just work", or ask for permissions. See <https://docs.docker.com/desktop/settings-and-maintenance/settings/#shared-folders-on-demand> for more information.

:::

::::

### Caution: Stata docker images and licenses

The AEA Data Editor has maintained the Stata images at <https://github.com/AEADataEditor/docker-stata>. In order to use a version that is equivalent to yours (or lower), you need to 

- understand which version your Stata license applies to (e.g., Stata 19 and Stata 19Now licenses are *different* licenses)
- which "size" of Stata you have (`IC`, `SE`, `MP`) (`IC` maps into the executable `stata` on Linux, `SE` into `stata-se`, and `MP` into `stata-mp`)
- which "tag" you want to use. The tags are dates that correspond to the `born` date in Stata, i.e., the update. Versions that are under active maintenance will have multiple tags; versions that are out of maintenance (e.g., Stata 16) will also have a `latest` tag that corresponds to the last update (and can be ommitted).

## Next steps

Once you have verified that Docker works with the software of your choice, you can move on to running all your code through Docker. In general, you do NOT need to rebuild the Docker image (a somewhat more advanced topic), but will need to map your project directory into the Docker container, and install any user-created packages or libraries as part of your code. In some cases, images might be available that already include commonly used packages, for instance the various `rocker` images for R.