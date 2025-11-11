(docker-wsl)=
# Installing Docker on WSL  

> Section contributed by David J. Graham (undergraduate student in economics, University of Colorado Boulder).

## Note

This section explains how to run Docker on Windows Subsystem for Linux (WSL). This is different but similar to installing the official [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/). Docker Desktop may be easier to install, but may also require a license. WSL is free to use, but requires more steps to set up. The examples given in the Testing Setup section below work in either setup, since they rely on the command line access.

## Install WSL  

- Open `Command Prompt` or `Git Bash`, one way is by hitting the `Win`  + `R` keys, typing "cmd" and hit enter. Then run the following:

```
wsl --install
```

- Restart your computer if prompted, if you do then re-open `Command Prompt` and type the following:

```
wsl
```

- The first time wsl runs you will need to create a username and password.

##  Open Linux

- Open `Command Prompt` and type the following to start linux:  

```
wsl
```

###  Installing Packages  

- Inside the Linux terminal (that you just opened):

```
sudo apt install -y ca-certificates curl gnupg lsb-release
```

- This installs tools for secure downloads and package verification.

###  Add Docker’s GPG Key

- Inside the Linux terminal:

```
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

- This creates a key folder and adds Docker’s official key.

###  Add Docker Repository

- Inside the Linux terminal:

```
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

- This tells your system where to download the official Docker packages from.


###  Install Docker

- Inside the Linux terminal:

```
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

- This downloads and installs Docker and its main tools.

###  Run Docker Without `sudo`

- Inside the Linux terminal:

```
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
```

- If you skip this step, you can still run Docker, but you’ll always need to type sudo before every command (e.g. sudo docker run hello-world).

##  Testing Setup

- Inside the Linux terminal:

```
docker --version
```

- If working, it should output a Docker version and build number.

- In the same terminal, type `docker run hello-world`. If your installation is working, you should get the following: 

```
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.
```

- For a little more interesting example, create a `test.R`, making sure it is in the correct directory (type `pwd` to see your current directory)

Example `test.R`:
```
# test.R - R example
R.version

height <- 6

print ("Congrats on getting Docker set up!")
for (i in 1:height) {
  # spaces for left padding
  spaces <- rep(" ", height - i)
  # stars for the level
  stars <- rep("*", 2*i - 1)
  # print the line
  cat(spaces, stars, "\n", sep = "")
}
```

- First pull base R:

```
docker pull r-base
```

- Then running the following command will execute whatever you put in your `test.R`:

```
docker run --rm -v "$PWD:$PWD" -w "$PWD" r-base Rscript test.R
```

- You can also open an R terminal with the following command:

```
docker run -it r-base R
```

- If you wanted a specific version of R you could checkout [Official Dockerhub](https://hub.docker.com/_/r-base) which maintains many versions of R or the [Data Editors Dockerhub](https://hub.docker.com/u/dataeditors) for Stata containers!

## References  

Docker. “Install Docker Engine on Ubuntu.” Docker Docs, Docker, https://docs.docker.com/engine/install/ubuntu/, Accessed 11 Sept. 2025.

Docker Inc. r-base: Official R base image. Docker Hub, n.d., https://hub.docker.com/_/r-base, Accessed 12 Sept. 2025.

Microsoft. “How to Install Linux on Windows with WSL.” Microsoft Learn, 6 Aug. 2025, https://learn.microsoft.com/en-us/windows/wsl/install Accessed 12 Sept. 2025.

Walker, James. “Installing Docker on Ubuntu (4 Easy Ways).” Kinsta, 17 Oct. 2023, https://kinsta.com/blog/install-docker-ubuntu/, Accessed 11 Sept. 2025.

