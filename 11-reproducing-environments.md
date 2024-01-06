(reproducing-environments)=
# Reproducing and documenting environments

There is a difference between documenting environments after the fact, and creating environments. 

## TL;DR

- Provide a documentation of what your environment looks like when you run it
- Provide instructions on how to create the minimal environment needed to run your code

## The issue

```bash
pip freeze
```

will output all the packages installed in your environment. These will include the packages you explicitly installed, but also the packages that were installed as dependencies. Some of those dependencies may be specific to your operating system or environment. In some cases, they contain packages that you needed to develop the code, but that are not needed to run it.

```bash
pip freeze > requirements.txt
```

will output all the packages installed in your environment in a file called `requirements.txt`. This file can be used to recreate the environment. Obviously, because of the above issue, it will likely contain too many packages.

```bash
pip install -r requirements.txt
```

will install all the packages listed in `requirements.txt`. If you run this on your computer, in a different environment, this will duplicate your environment, which is fine. But it probably will not work on somebody else's Mac, or Linux, system, and may not even work on somebody else's Windows computer.

## The solution

The solution is to create a minimal environment, and document it. This is done in two steps:

1. Identify the packages that are needed to run your code. There are packages that may help you with this, but in principle, you want to include everything you explicitly `import` in your code, and nothing else. This is the minimal environment.
2. Prune the `requirements.txt` file to only include the packages that are needed to run your code. This will be the file you provide to replicators to recreate your necessary environment, and let the package installers solve all the other dependencies. 

The resulting `requirements.txt` file will contain "pinned" versions of the packages you have, so it will be very precise. Possibly overly precise. 

