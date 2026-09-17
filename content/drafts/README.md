# Drafts

A new lesson starts here: `content/drafts/<name>.md`, written in Russian as an
ordinary page, in the markup the README describes.

```
node tools/i18n-extract.js <name> --write
```

takes it apart into `content/lessons/<name>.md` and
`content/messages/<name>.json`, rebuilds it and compares byte for byte before
writing anything — so a mistake in the markup is caught here rather than on the
page. After that the draft has served its purpose and can be deleted; nothing
reads this folder except the extractor.

This exists because the alternative was worse. The extractor used to read only
from `public/lessons/<lang>/`, which is generated output, so writing a new page
meant putting a source file into the directory the build overwrites.
