# Use of containers

Coming soon.

```bash
docker run -it --rm \
   -v "$(pwd)":/project \
    -w /project \
    dataeditors/stata17:2023-08-29 \
    -b do main.do
```