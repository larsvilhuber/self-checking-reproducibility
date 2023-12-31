# Use of containers


## TL;DR

- Containers are a way to simulate a "computer within a computer", which can be used to run code in an isolated environment. They are relatively lightweight, and are starting to be used as part of replication packages in economics. 
- They do not work in all situations, and require some more advanced technical skills. 
- Using containers to test for reproducibility is easier, and should be considered as part of a toolkit. 
- Several online services make such testing (and development) easy.

## Overview

Coming soon.

Containers can be shared via online systems (Docker Hub, Singularity Hub, etc.), or via files (`.tar` files, etc.). While the former is convenient, the latter is more robust for archival purposes.

```{warning}
Commercial container sharing services regularly purge containers from their services if they are not actively used, or if a subscription is not maintained. While the core infrastructure containers, such as for Python or R, are likely to be maintained for a long time, commercial companies can change their preservation policies at any time, with little warning.
```


## Examples

```bash
docker run -it --rm \
   -v "$(pwd)":/project \
    -w /project \
    dataeditors/stata17:2023-08-29 \
    -b do main.do
```

## Additional resources

- [Docker](https://www.docker.com/) is a free, open-source container manager, which allows users to create containers using "recipes" (called `Dockerfiles`). While the underlying technology is usually Linux, [Docker Desktop](https://www.docker.com/products/docker-desktop) (commercial, free for most academic uses) allows users to run containers on Windows, macOS, and Linux.
- [OrbStack](https://www.orbstack.com/) is a container manager for macOS (commercial, free for typical academic usage). It is compatible with Docker.
- [Apptainer](https://www.apptainer.io/), formerly known as [Singularity](https://sylabs.io/singularity/), free, open-source container manager. It can use Docker images, but has its own syntax for "recipes". It is fundamentally Linux based, and available on many university HPC clusters.

Various other container managers are available for both Linux and Windows (Azure) based clouds (`podman`, etc.). They should all be able to run Docker containers.