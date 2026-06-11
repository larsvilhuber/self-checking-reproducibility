# Installing Docker on macOS

:::{admonition} {raw-html}`<i class="fas fa-chalkboard"></i>` Presentation slides
:class: seealso dropdown
See the parent topic in the [presentation](https://larsvilhuber.github.io/self-checking-reproducibility/presentation/#/use-of-containers).
:::

Newer Macs run on M chips, older ones on Intel chips. This may affect the ability to run most commonly used Docker containers, which are usually built for Linux on Intel. The goal is to have the command line "docker" available. 

There are two ways to install Docker on Mac. The first is using OrbStack. See this [page](https://orbstack.dev/) for easy download options. See [their note on Rosetta emulation](https://docs.orbstack.dev/docker/#intel-x86-emulation) for cross-platform compatibility.

Or, instead of using OrbStack there is the official Docker Desktop, which can be installed on a Mac at [this link](https://docs.docker.com/desktop/setup/install/mac-install/). 

> Note that both products may require you to purchase a license.

Lastly, another untested alternative for installing Docker is using Homebrew. This [page](https://dev.to/mochafreddo/running-docker-on-macos-without-docker-desktop-64o) shows some steps to achieve this. 