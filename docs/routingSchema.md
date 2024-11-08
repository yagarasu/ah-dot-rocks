# Routing schema

´´´
<domain>/ <- has root: all entries + special layout
  - [slug]/ <- single
  - [language:(es/en)]/ <- has root: all entries by language
    - /category/[category]/ <- has root: all entries by category, filtered by language
´´´