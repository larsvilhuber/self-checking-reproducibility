# Installing Docker on Linux

Most of the commands here are the same as for running from within [WSL](docker-wsl), because of course, WSL is Linux.

## Pre-requisites

You need to have `sudo` access on the Linux system you are using. On many university or government managed systems, you likely do not have this, so do not try it there. Rather, talk to the system admins about how to run Docker. 

> The instructions below are for Ubuntu or Debian Linux. Other Linux distributions will have different commands for installing packages.

###  Installing Packages  

- Open a terminal and type.:

```
sudo apt install -y ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
```
##  Testing Setup


```
docker --version
```

- If working, it should output a Docker version and build number.
- For more examples, see [the earlier section](docker-wsl).

