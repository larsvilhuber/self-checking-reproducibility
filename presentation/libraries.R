####################################
# global libraries used everywhere #
####################################
mran.date <- "2024-04-01"

get_os <- function(){
  sysinf <- Sys.info()
  if (!is.null(sysinf)){
    os <- sysinf['sysname']
    if (os == 'Darwin')
      os <- "osx"
  } else { ## mystery machine
    os <- .Platform$OS.type
    if (grepl("^darwin", R.version$os))
      os <- "osx"
    if (grepl("linux-gnu", R.version$os))
      os <- "linux"
  }
  tolower(os)
}


pkgTest <- function(x)
{
	if (!require(x,character.only = TRUE))
	{
		install.packages(x,dep=TRUE)
		if(!require(x,character.only = TRUE)) stop("Package not found")
	}
	return("OK")
}


if (get_os()=="linux") {
## Rstudio Package Manager
  options(repos = c(REPO_NAME = paste0("https://packagemanager.posit.co/cran/__linux__/jammy/",mran.date)))
} else {
## MRAN
  options(repos=paste0("https://packagemanager.posit.co/cran/",mran.date))
}

global.libraries <- c("dplyr","devtools","rprojroot","tictoc","ggplot2","tidycensus","readr","revealjs","rmarkdown")

# now install the rest
results <- sapply(as.list(global.libraries), pkgTest)
