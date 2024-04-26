(virtual-machines)=
# Virtual Machines


## TL;DR

- Virtual machines are a way to create a "computer within a computer", which can be used to run code in an isolated environment. They are not usually part of replication packages in economics, and I do not suggest you use them as such, but they can be used to test replication packages.

## Overview

For sake of completeness, we will mention that you can also achieve the same outcome as using a brand-new computer by using a virtual machine, on your own system. Virtual machines are routinely used in computer science and other domains (including as class assignments in CS courses). Basic software is free, and there are standards on sharing virtual machine files (the specifications and the actual contents). 

```{warning}
Virtual machines are not typically used in economics, and in particular not as a key component of replication packages. They are presented here primarily as an advanced tool to **test** replication packages.
```

## Examples

None at this point. 

## Additional resources

- [Oracle VirtualBox](https://www.virtualbox.org/) is a free, open-source virtual machine software, originally developed by Sun Microsystems. It is available for Windows, macOS, and Linux.
- [VMWare Workstation Player](https://www.vmware.com/products/workstation-player.html) is commercial virtual machine software, with a free "player" version for Windows and Linux

Naturally, one would like to have virtual machines be reproducibly created, and this is possible using tools such as:

- [Vagrant](https://www.vagrantup.com/) is a free, open-source virtual machine manager, which allows users to create virtual machines using "recipes", similar to Dockerfiles. It is available for Windows, macOS, and Linux.
- [Multipass](https://multipass.run/) is a free, open-source virtual machine manager. While it can only handle creating Linux VMs, the tool itself is available for Windows, macOS, and Linux.

