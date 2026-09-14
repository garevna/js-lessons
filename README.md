# JS lessons

[**Open the course**](https://garevna.github.io/js-lessons)

A JavaScript course of 167 lessons in Russian, English and Ukrainian. The
lessons are written in a small markup language of its own and rendered in the
browser by hand-written custom elements — no framework, no runtime dependency.
Pages are fetched and cached by a web worker, so the course works offline once
visited.

## Getting started

```
yarn install:all      the root project and the three workers
yarn full             build everything
yarn start            serve public/ locally
```

`yarn full` runs the pieces in an order that matters:

```
sw-identity     version and date for the footer, from git
lessons         public/lessons/ from content/, in all three languages
icons-worker    icons.worker.js
content-worker  the page registry, then content.worker.js
prod            index.js, main-menu.js, donate.js
service-worker  the cache version map, then service-worker.js
```

The version map hashes the built bundles, so it has to run last; the footer
prints the version, so that has to be written first. `lessons` comes before
`content-worker`, which builds the page registry by reading the folders the
lessons were just written into.

Deployment is automatic: a push to `master` builds the site in GitHub Actions
and publishes `public/` to the `gh-pages` branch. `yarn deploy` still works for
a manual push from a workstation.

## Writing a lesson

A lesson is a `.md` file in `content/lessons/`, written in the markup below.
It is not Markdown — the syntax is the project's own, parsed by
`src/helpers/page`.

### Blocks

Each of these is recognised before anything else and rendered as a unit.

| Syntax | Renders as |
|---|---|
| <code>~~~js … ~~~</code> | a code sample (the language tag is optional) |
| <code>~~~~ … ~~~~</code> | a runnable script, collapsed |
| `{{{ … }}}` | console output |
| `^^^[Title]` … `^^^` | a spoiler; the title is shown, the body unfolds |
| `@@@@` … `@@@@` | a grid — images and captions laid out in columns |
| `!![a.svg, b.svg, c.svg]` | a slider |
| `\| a \| b \|` on consecutive lines | a table |
| `____________` | a horizontal rule |

### Lines

| Syntax | Renders as |
|---|---|
| `# … ###### …` | headings, six levels |
| `☼☼☼ text ☼☼☼` | a slogan |
| `→→→ question \| variant, variant \| answer →→→` | a quiz |
| `§§§§ header \| templateId §§§§` | a live console demo |

The answer of a quiz has to match one of its variants exactly. A variant may be
quoted — `'Google'` — and the quotes are consumed as attribute delimiters, so
the answer is written without them.

### Inline

| Syntax | Renders as |
|---|---|
| `**bold**` | bold |
| `_italic_` | italic |
| `~code~` | inline code |
| `^^small^^` | smaller text |
| `↑↑sup↑↑` `↓↓sub↓↓` | superscript, subscript |
| `••…••` | a dark panel |
| `◘◘…◘◘` | a bordered panel |
| `○○…○○` | a slogan block |
| `◧` `◨` | the `\|\|` operator, which cannot be written directly |

### Images

```
![](illustrations/dog.png)      images/lessons/dog.png
![](images/car.gif)             images/car.gif
```

Paths are resolved through `createPath`, which knows a handful of aliases:
`images`, `illustrations`, `icons`, `sounds`, `lessons`, `help`, `files`,
`page`, `external`.

### Icons

Icons are inlined by the icon worker, so they cost no request:

```
![ico-70 octocat]    ![ico-40 octocat]    ![ico-25 octocat]
![ico-50 octocat]    ![ico-35 octocat]    ![ico-20 octocat]
![ico-30 octocat]
```

Available keys:

['house', 'home', 'mag', 'search', 'err', 'error', 'warn', 'warning', 'close', 'negation', 'icon', 'cap', 'coffee', 'link', 'link-ico', 'dir', 'folder-open', 'opened', 'hw', 'mortar_board', 'study', 'pin', 'pushpin', 'exclamation', 'yes', 'question', 'open-in-new', 'page-next', 'page-previous', 'sand-watch', 'paper', 'file', 'smile', 'emotion', 'require', 'point_up', 'good', 'exelent', 'thumbsup', 'hourglass', 'wait', 'clock', 'white_check_mark',
'mail', 'speach_balloon', 'speach-balloon', 'git-ver', 'google-maps', 'slider-button', 'draw-io', 'main-menu-icon', 'expanded-main-menu-icon', 'active-main-menu-icon', 'active-expanded-main-menu-icon', 'menu-icon-image', 'menu-symbol']

### Links

```
[►►►Boolean►►►](page/Boolean)                     next page
[◄◄◄Variables and data types◄◄◄](page/var)        previous page
[%%%w3schools%%%](external/w3-comparison)         external reference
[:::Sandbox example:::](https://plnkr.co/edit/…)  sandbox
[![ico-30 hw] Tests](test/assignments)            an icon as the label
```

![](https://garevna.github.io/js-samples/images/links.png)

## Translation

The lessons live in three languages. Russian is the source; English and
Ukrainian are translated from it.

### How a page is stored

A page is not one file per language. It is a skeleton plus a message file per
language:

```
content/lessons/Closure.md         structure: markup, code, {{keys}}
content/messages/Closure.ru.json   the Russian text
content/messages/Closure.eng.json  the English text
content/messages/Closure.ua.json   the Ukrainian text
content/fragments/Closure.json     inline code and link targets
```

The skeleton holds everything that is the same in every language — headings,
icons, code samples, tables, links. Only prose gets a key, so a code sample
exists once rather than three times, and a change to the layout reaches every
language at once.

Inside a message, anything a translator must not touch — inline code, a link's
target — is replaced by a `⟦f0⟧` mark and kept in the fragments file. One table
serves all three languages: a translation imported from DeepL carries the
Russian numbering, so `⟦f5⟧` has to mean the same snippet in every file.

`public/lessons/{ru,eng,ua}/*.md` are built from these. Do not edit them.

A key missing from a message file falls back to Russian, so a half-translated
page works: the translated paragraphs appear in the chosen language and the
rest stays Russian. There is no need to finish a page in one sitting.

### What to do next

```
npm run i18n                 every page, with coverage per language
npm run i18n -- --next       unfinished pages, fewest segments first
npm run i18n -- --todo       unfinished pages
npm run i18n -- --done       finished pages
```

`--next` is the one to work from: it puts the pages needing the least work at
the top, so a session finishes several pages instead of half-filling a long
one.

### Translating a page

Five steps. Exporting does **not** translate anything — it only writes the text
out for DeepL; importing only files the answer under `content/`. The page on the
site does not change until step 5 has run.

**1. Export.**

```
node tools/i18n-export.js Closure eng
```

Writes `translate/Closure.eng.01.txt` and so on — numbered segments, split into
chunks that fit DeepL's free limit. Already-translated keys are skipped, so
running this again after a partial pass exports only what is left.

The folder is in `.gitignore`: these are working files. Open them from disk;
they will not appear on GitHub.

**2. Translate.** Open a `.txt`, copy all of it, paste into DeepL with the
right target language.

**3. Save.** Put DeepL's answer beside the original with `.out.txt` instead of
`.txt`: `Closure.eng.01.txt` → `Closure.eng.01.out.txt`.

**4. Import.**

```
node tools/i18n-import.js Closure eng
```

Checks each segment, writes the ones that came back intact into
`content/messages/Closure.eng.json`, and says what it refused and why.

**5. Build.**

```
npm run lessons              every page
node tools/i18n-build.js Closure
```

The message file is not what the site serves. This is the step that joins the
skeleton, the messages and the fragments into `public/lessons/eng/Closure.md`,
and until it runs the translation exists only in `content/`. `npm run full`
does it too, so a deploy never ships a stale page — but locally it is easy to
import, look at the site, and conclude that nothing happened.

### What the importer refuses

A machine translator damages some things quietly, so a segment that comes back
wrong is reported and left out rather than written. The page keeps showing
Russian for it, which is recoverable; a broken page is not.

| Checked | Why |
|---|---|
| `⟦f0⟧` placeholders | hidden code and link targets — losing one breaks the page |
| `**` `_` `^^` counts | an unpaired marker prints literal asterisks; emphasis the Russian had must not go missing |
| `<br>` and other tags | a dropped break runs two lines together |
| URLs | a rewritten link is a dead link |
| quiz answers | the answer must still match one of the variants, and DeepL rewrites quotes |
| segment numbers | a merged pair of lines would shift every later translation onto the wrong key |

Emphasis that DeepL *adds* — a term the Russian left plain coming back bold —
is accepted and listed separately, because rejecting it would leave the
paragraph in Russian, which is worse than a word in bold nobody asked for.

Keep the numbering when pasting. The importer matches on it and refuses to
guess from line order.

### Editing the Russian

Edit `content/messages/<page>.ru.json` for text, or `content/lessons/<page>.md`
for structure. After changing a page's structure, re-extract it:

```
node tools/i18n-extract.js <page> --write
```

The extractor splits a page and then rebuilds it, comparing the result with the
original byte for byte. A page that fails that check is not written.

### Adding a page

Put the Russian `.md` in `public/lessons/ru/`, then run the extractor on it.
The page registry and the language lists are generated from the folders during
the build — they are not maintained by hand.

## How it is built

Four independent npm projects share one repository:

| Project | Builds | Does |
|---|---|---|
| root | `index.js`, `main-menu.js`, `donate.js` | the custom elements that render a page |
| `content-worker/` | `content.worker.js` | fetches lessons, keeps the page registry |
| `icons-worker/` | `icons.worker.js` | serves inlined icons |
| `service-worker/` | `service-worker.js` | caching and offline |

`public/` is both source and output: the lessons, images and sounds live there
alongside the bundles the build writes into it. The whole folder is what gets
published.

Two files are generated during the build and should not be edited by hand:
the page registry in `content-worker/src/configs/`, built from the folders
under `public/lessons/`, and the cache version map in
`service-worker/src/configs/versions.js`.

### Caching

The service worker versions every cached resource by a hash of its contents.
Anything whose hash changed is refetched; everything else is served from cache.
Fonts and images are never revalidated — they are assumed immutable — so a bad
copy of an image survives until the site data is cleared.

If a page looks wrong after a deploy and a normal reload does not fix it:
DevTools → Application → Service Workers → Unregister, then Clear site data.

## Gotchas

**Do not edit `public/lessons/`.** Those files are built from
`content/lessons/` and `content/messages/` by `npm run lessons`. Edits there
are overwritten. The reverse is the easier mistake to make: editing `content/`
and expecting the site to change without building.

**A language file appears only once the page has a translation.** The build
writes `public/lessons/eng/<page>.md` when at least one key is translated, not
for all 167 pages — otherwise the menu would report the whole course as
translated and most of it would be Russian under an English name.

**Page names are case-sensitive.** `Classes` and `classes` are the same file on
Windows and two different ones on GitHub. The tools normalise a name to the
spelling on disk and say so; git does not.

**The root package is not ESM.** The source mixes `export` with `require()`,
which webpack accepts only in `javascript/auto` mode. Adding `"type": "module"`
to `package.json` makes every `.js` strict ESM, where `require` is undefined —
the build still succeeds and the bundle throws on load.

**Line endings vary between lesson files.** Tools that split on `
` alone
leave a `
` behind and stop recognising headings.
