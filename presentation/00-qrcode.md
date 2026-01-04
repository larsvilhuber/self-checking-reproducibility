
```{r qrcode}
#| echo: false
library(qrcode)

code <- qr_code(WEBSITE_URL)
png(filename="qrcode.png")
plot(code)
invisible(dev.off())

```

