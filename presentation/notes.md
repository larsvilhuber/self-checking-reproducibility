# Need to strip out elements

- Beginning anchors that are valid in Pythonbook but not in Quarto

`grep -vE "=$" |\

- Tab-sets need to be translated

arg=filename
cat $arg |\
grep -vE "=$" |\
sed 's/:::{tab-set}/::: {.panel-tabset}/' |\
sed 's/:::{tab-item}/###/' |\
sed 's/^:::$//' |\
sed 's/warning/.notes/' |\
sed 's/{note}/{.notes}/' > presentation/$arg

# Running from the command line

## Powershell

```
& "C:\Program Files\RStudio\resources\app\bin\quarto\bin\quarto.exe" render index.Rmd
```

## Bash

```
/c/Program\ Files/RStudio/resources/app/bin/quarto/bin/quarto.exe render index.Rmd 
```


🎲❓✅ ❌