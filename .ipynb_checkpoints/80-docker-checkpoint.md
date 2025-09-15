# Use of containers


## TL;DR

- **Containers** are a way to simulate a "computer within a computer", which can be used to run code in an isolated environment. They are relatively lightweight, and are starting to be used as part of replication packages in economics **(but only 0.13% of 8280 packages…)**.
- They do not work in all situations, and require some **more advanced technical skills** (typically Linux, in addition to the statistical software).
- Using containers to test for reproducibility is easier, and should be considered as part of a toolkit. 
- Several **online services** make such testing (and development) easy.

## Overview

Coming soon.

Containers can be shared via online systems (Docker Hub, Singularity Hub, etc.), or via files (`.tar` files, etc.). While the former is convenient, the latter is more robust for archival purposes.

```{warning}
Commercial container sharing services regularly purge containers from their services if they are not actively used, or if a subscription is not maintained. While the core infrastructure containers, such as for Python or R, are likely to be maintained for a long time, commercial companies can change their preservation policies at any time, with little warning.
```


## Examples

While Docker is usually mentioned in the context of free open-source software such as Python or R, it can be used with commercial software. For example, the AEA Data Editor provides a [Docker image](https://hub.docker.com/r/dataeditors/stata17) for Stata 17, together with instructions on how to run it. You do need a license file, but if you are going to run a Stata replication package, you probably already have that.

```bash
docker run -it --rm \
   -v "/path/to/stata.lic":/usr/local/stata/stata.lic \
   -v "$(pwd)":/project \
    -w /project \
    dataeditors/stata17:2023-08-29 \
    -b do main.do
```


## Additional resources

- [Docker](https://www.docker.com/) is a free, open-source container manager, which allows users to create containers using "recipes" (called `Dockerfiles`). While the underlying technology is usually Linux, [Docker Desktop](https://www.docker.com/products/docker-desktop) (commercial, free for most academic uses) allows users to run containers on Windows, macOS, and Linux.
- [OrbStack](https://www.orbstack.com/) is a container manager for macOS (commercial, free for typical academic usage). It is compatible with Docker.
- [Apptainer](https://www.apptainer.io/), formerly known as [Singularity](https://sylabs.io/singularity/), free, open-source container manager. It can use Docker images, but has its own syntax for "recipes". It is fundamentally Linux based, and available on many university HPC clusters.
- [WholeTale](https://wholetale.org/) is Docker-based academic service providing free online resources to create (and use) reproducible research. While it does not allow you to directly run Docker, it does provide for free instances of Stata and MATLAB. 

Various other container managers are available for both Linux and Windows (Azure) based clouds (`podman`, etc.). They should all be able to run Docker containers.