# Need to strip out elements

- Beginning anchors that are valid in Pythonbook but not in Quarto

`grep -vE "=$" |\

- Tab-sets need to be translated

sed 's/:::{tab-set}/::: {.panel-tabset}/' |\
sed 's/:::{tab-item}/###/g' presentation/notes.md |\
sed 's/warning/notes/' > presentation/notes.md
