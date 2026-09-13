# JS lessons

[**start**](https://garevna.github.io/js-lessons)

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
```

The skeleton holds everything that is the same in every language — headings,
icons, code samples, tables, links. Only prose gets a key, so a code sample
exists once rather than three times, and a change to the layout reaches every
language at once.

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

Four steps. Exporting does **not** translate anything — it only writes the text
out for DeepL, and the page stays untranslated until step 4 has run.

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

### What the importer refuses

A machine translator damages some things quietly, so a segment that comes back
wrong is reported and left out rather than written. The page keeps showing
Russian for it, which is recoverable; a broken page is not.

| Checked | Why |
|---|---|
| `⟦f0⟧` placeholders | hidden code and link targets — losing one breaks the page |
| `**` `_` `^^` counts | an unbalanced marker turns a paragraph into literal asterisks |
| `<br>` and other tags | a dropped break runs two lines together |
| URLs | a rewritten link is a dead link |
| quiz answers | the answer must still match one of the variants, and DeepL rewrites quotes |
| segment numbers | a merged pair of lines would shift every later translation onto the wrong key |

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

## Description

Symbols ◧ or ◨ will be substituted with logical operator **||**.

Content delivery system is controlled with content-worker.

### images

**`![](illustrations/dog.png)`** - the image file images/lessons/dog.png

**`![](images/car.gif)`** - the image file images/car.gif
____________________________________________________

### slider

!![illustrations/flowchart-sequence.svg, illustrations/flowchart-branching.svg, illustrations/flowchart-circle.svg]
____________________________________________________

### icons

We use icon-worker for icons.

**Request** to worker should be an object `{ route, iconList }`.

**route** is required and may be '**main-menu**', '**menu**', '**page**' or '**spoiler**'.

**iconList** is not required.

If you don't send **iconList** to worker then only default icons for this route will be in response/

**Response from worker will be the object `{ route, iconList, response }`.

**response** will be the array of objects

```js
{
  [key]: getIcon(key)
}
```

Available keys:

['house', 'home', 'mag', 'search', 'err', 'error', 'warn', 'warning', 'close', 'negation', 'icon', 'cap', 'coffee', 'link', 'link-ico', 'dir', 'folder-open', 'opened', 'hw', 'mortar_board', 'study', 'pin', 'pushpin', 'exclamation', 'yes', 'question', 'open-in-new', 'page-next', 'page-previous', 'sand-watch', 'paper', 'file', 'smile', 'emotion', 'require', 'point_up', 'good', 'exelent', 'thumbsup', 'hourglass', 'wait', 'clock', 'white_check_mark',
'mail', 'speach_balloon', 'speach-balloon', 'git-ver', 'google-maps', 'slider-button', 'draw-io', 'main-menu-icon', 'expanded-main-menu-icon', 'active-main-menu-icon', 'active-expanded-main-menu-icon', 'menu-icon-image', 'menu-symbol']

#### Using icons

**`![](icons/octocat.png)`** - the image file icons/octocat.png

**`![ico-70 octocat]`** - icon <img width="70" src="data:image/png;base64,..." />

**`![ico-50 octocat]`** - icon <img width="50" src="data:image/png;base64,..." />

**`![ico-40 octocat]`** - icon <img width="40" src="data:image/png;base64,..." />

**`![ico-35 octocat]`** - icon <img width="35" src="data:image/png;base64,..." />

**`![ico-30 octocat]`** - icon <img width="30" src="data:image/png;base64,..." />

**`![ico-25 octocat]`** - icon <img width="25" src="data:image/png;base64,..." />

**`![ico-20 octocat]`** - icon <img width="20" src="data:image/png;base64,..." />

_____________________________________

### Slogans

`☼☼☼ Don't make the console blush for you ☼☼☼.`

![](https://garevna.github.io/js-samples/pictures/slogan.png)

________________________

### Tests
```
◘◘** 1**◘◘

→→→ [].reduce(Math.pow) | TypeError, null, NaN, 0 | TypeError →→→
```

![](https://garevna.github.io/js-samples/pictures/tests.png)
_________________________

### Console demo with template

§§§§ Demo | boolean_01_template §§§§

___________________________________________________

### Links

**Internal**

`[►►►Принцип работы►►►](page/Array-iteration-methods-theory.md)`

**External**

`[![ico-30 hw] Tests](test/assignments)`

`[![ico-30 hw] Quiz](quiz/arrowFunctions)`

_____________________________________________

**You may use this templates for links:**

`[%%%w3schools%%%](external/w3-comparison)`

`[:::Sandbox example:::](https://plnkr.co/edit/jsH8XKmc0B6g4q8iPZBf?p=preview/)`

`[►►►Boolean►►►](page/Boolean)`

`[◄◄◄Variables and data types◄◄◄](page/var)`


![](https://garevna.github.io/js-samples/images/links.png)
