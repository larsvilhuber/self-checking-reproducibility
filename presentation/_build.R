
# for testing on Mac
sysinf <- Sys.info()

if ( sysinf['sysname'] == 'Darwin' ) {
   Sys.setenv(RSTUDIO_PANDOC="/Applications/RStudio.app/Contents/MacOS/pandoc")
}

if ( sysinf['sysname'] == 'Windows' ) {
   # only if RSTUDIO_PANDOC is not already set
   if (Sys.getenv("RSTUDIO_PANDOC")=="" || is.na(Sys.getenv("RSTUDIO_PANDOC"))) {
      # this might not always be accurate! True for RStudio RStudio 2024.04.1+748 
      Sys.setenv(RSTUDIO_PANDOC="C:/Program Files/RStudio/resources/app/bin/quarto/bin/tools")
   }
}


# setup a few things, if needed

setwd(here::here("presentation"))
source(here::here("presentation","libraries.R"))

#run render

rmarkdown::render("index.Rmd")

