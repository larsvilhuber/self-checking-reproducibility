(environments)=
# Creating and using environments

One way to isolate your statistical code in one project from the rest of your installation on your computer is to use "environments". The term is used here generically, and not every statistical language calls it that. Generically, all "environments" simply modify where the specific software searches for its components, and in particular any supplementary components (packages, libraries, etc.). Formally, this is true for operating systems as well, and in some cases, the operating system and the programming language interact (for instance, in Python).

## TL;DR

- Using environments allows a researcher to isolate a project (replication package) from the rest of their system.
- Properly defined environments can therefore help make code more reproducible.

