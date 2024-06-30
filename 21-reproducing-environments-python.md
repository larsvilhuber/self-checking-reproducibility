(reproducing-environments-python)=
# Reproducing and documenting environments in Python

Python allows for pinpointing exact versions of packages in the *PyPi* repository. This is done by creating a `requirements.txt` file that lists all the packages that are needed to run your code. In principle, this file can be used by others to recreate the environment you used. The problem is that it might contain TOO many packages, some of which are not relevant, even if you carefully constructed the environment, because it will contain dependencies that are specific to your platform (OS or version of Python).

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

