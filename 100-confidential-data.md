(confidential-data)=
# Confidential data

:::{admonition} {raw-html}`<i class="fas fa-chalkboard"></i>` Presentation slides
:class: seealso dropdown
See this topic in the [presentation](https://larsvilhuber.github.io/self-checking-reproducibility/presentation/#/last-but-not-least).
:::

## TL;DR

- be able to separate the confidential data from other (to be made public) components
- all code must be available
- do not publish what you are not allowed to!

## Permissions

These will be noted in the **data use agreement (DUA), license, or non-disclosure agreement (NDA)** that you **signed or clicked through** to obtain access to the data from the data provider.

:::{warning}
Careful: scraped or downloaded data that did not have an explicit license!
:::

### Keep in mind

Just because you (and the entire world) can **download the data** does **NOT** give you the (automatic) right to **re-publish** the data.

- Do NOT **transfer or publish** data that you have no rights to transfer. Always carefully read your data use agreement (DUA), license, or non-disclosure agreement (NDA) that you signed.
- Do NOT upload restricted-access data to the journal’s platform.
- DO structure the repository to take into the account the data that cannot be published.

## Communicating restrictions
Whatever **restrictions** are imposed on the data typically convey to other replicators as well. Document them in the **public** README, in the section about [“Data Availability and Provenance Statements.”](https://social-science-data-editors.github.io/template_README/template-README.html#data-availability-and-provenance-statements)


## Organize your project so you can exclude confidential data
Consider a project with confidential and public-use data. Clearly separate the restricted from the open-access data, both in terms of the raw data as well as the processed data:

```text
README.pdf
code/
├── main.do
├── 01_data_prep.do
├── 02_confidential_prep.do
├── 03_analysis.do
└── 04_figures.do
data/
├── raw/
│   └── cps0001.dat
├── confidential/
│   └── ssa.csv
└── conf_analysis/
    └── confidential_combined.dta
```    
    
## Strategy
When the replication package relies on confidential data that cannot be shared, or is shared under different conditions, you should

- Preserve (archive) the confidential replication package
  - If the data cannot be removed from a secure enclave, they should nevertheless be archived wherever the confidential data are kept
- Prepare a confidential (partial) replication package `project-confidential.zip`, contains the contents of `data/confidential` and possibly `data/conf_analysis`.
- Prepare a **non-confidential replication package** that contains all code, and **any data** that is not subject to publication controls.

**Important**: the package contains **all code**, including the code that is used to process the **confidential data**!

- Ensure that replicators have detailed instructions (**README**) on how to combine the two packages
- Specify which (if any) of the results in their paper can be reproduced without the confidential data.





