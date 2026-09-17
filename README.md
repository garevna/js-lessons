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
| `♦♦♦4♦♦♦` | the heading of an example block — see Components |
| `※※※tests quiz/var※※※` | a link button — see Components |
| `☼☼☼ text ☼☼☼` | a slogan |
| `→→→ question \| variant, variant \| answer →→→` | a quiz |
| `§§§§ header \| templateId §§§§` | a live console demo |

The answer of a quiz has to match one of its variants exactly. A variant may be
quoted — `'Google'` — and the quotes are consumed as attribute delimiters, so
the answer is written without them.

### Components

Some constructs are not markup at all: they name a component, and the renderer
draws the whole thing. The lesson writes only what changes.

| Syntax | Component | Draws |
|---|---|---|
| `♦♦♦4♦♦♦` | `createExampleHeader` | the heading of an example block: bordered panel, coffee cup, the word for the current language, the number |
| `※※※tests quiz/var※※※` | `createLinkButton` | a button to the tests or the exercises: briefcase icon, the word for the current language, the address you give it |
| `☼☼☼ text ☼☼☼` | `funny-slogan` | a slogan |
| `→→→ question \| variants \| answer →→→` | `test-component` | a quiz |
| `§§§§ header \| templateId §§§§` | `live-demo-spoiler` | a live console demo |

`♦♦♦4♦♦♦` replaces what the lessons used to spell out by hand:

```
◘◘![ico-25 cap] **Пример 4**◘◘
```

That line was written 45 times across four pages, and the only thing that ever
differed was the number. Worse, it was 45 separate things to translate, each
sent to DeepL without any context — which is how one course ended up with
"Example", "An example" and "Sample" on neighbouring pages. The word now lives
in `src/configs/pageLabels.js` and is chosen when the page renders, so it never
reaches a translator and never appears in a message file.

`※※※` takes a kind — `tests` or `exercises` — and an address, and the address
is any target a link accepts: `quiz/var`, `page/hw-01`, an http one. It replaces

```
[![ico-30 hw] **Тесты**](quiz/var)
```

which was written on thirty pages. Half of them had the word in bold and half
did not, which nobody meant as a distinction, and each one was a separate thing
to translate.

Adding a component of your own is three small pieces:

1. the words it needs, in `src/configs/pageLabels.js`, one entry per language
2. `src/helpers/page/create<Name>.js`, exporting a function of the same name
   that returns an element — the folder is collected automatically, there is
   nothing to register
3. a branch in `src/helpers/page/parseLine.js` that recognises the syntax and
   calls it

Pick a symbol nothing else uses, and repeat it three or four times the way the
existing ones do — the parser looks at the start of a line, so a stray `♦` in
prose is harmless but a line starting with one is not.

One thing to remember: icon styles are requested by scanning the page text for
`![ico-NN name]` markers. A component that draws an icon without writing such a
marker has to ask for it in `getIconList.js`, or it renders blank.

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


**A single character between markers now works.** `~.~`, `**i**`, `_2_`. It used
to need two, which left the markers in the text and paired one of them with the
next one along — 703 broken tags across 600 lines.

**Underscores inside a word are not italics.** `__proto__` and a URL with
`pikachu_2_by_name` in it are left alone; an italic marker has to sit outside a
word on both sides. Use `~code~` for identifiers regardless — it says what they
are.

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


### Checking the links

```
npm run links          every link, resolved the way the renderer resolves it
npm run links -- --net  also ask the addresses whether they answer
```

A target is not a URL but a small language: `page/var` is another lesson,
`external/mdn-string` is a name in `src/configs/externalLinks.js`,
`images/x.png` is a file in `public/`. Each kind fails differently and all of
them fail quietly — the page renders, the anchor is there, it goes nowhere. The
checker resolves all of them, and follows `page/lesson#heading` down to the
heading.

Two things it knows about the markup itself. A target cannot contain `)` —
the anchor expression stops at the first one — and it cannot contain a space.
A space at the end used to be a deliberate workaround, from when the renderer
cut one character off every external address; a space in the middle is usually
a Markdown link title, `[text](url "title")`, which this markup has no notion
of, so the title becomes part of the address.



### Links in another language

A lesson linking to `en.wikipedia.org/wiki/Idempotence` should send a Russian
reader to `ru.wikipedia.org/wiki/Идемпотентность`. The address cannot simply
have its language swapped — Wikipedia titles its articles differently in every
language, and MDN has a Russian translation of some pages and not others — so
each candidate is asked rather than guessed:

```
node tools/i18n-links.js           what it finds
node tools/i18n-links.js --write   write src/configs/localizedLinks.js
```

Wikipedia answers through its langlinks API, which gives the real title. MDN
answers 200 for `/ru/…` when the page is translated and redirects to `/en-US/…`
when it is not; there is no Ukrainian MDN at all, so Ukrainian readers get the
English page.

Write the **English** address in the lesson. The renderer looks it up when it
draws the link, so one address serves all three languages, and it covers both
the addresses written in lessons and the ones behind `external/`. A link
written straight to `/ru/…` would stay Russian on the English page.

Re-run the tool after adding links. It only ever writes what it could prove,
and it distinguishes three answers that look alike from a distance: no
translation, the site did not reply, and *there is no such article* — the last
one is a broken link, and it found one.


## Translation

The lessons live in three languages. Russian is the source; English and
Ukrainian are translated from it.

### How a page is stored

A page is a skeleton plus one message file holding all three languages:

```
content/lessons/Closure.md      structure: markup, code, {{keys}}
content/messages/Closure.json   the text, in every language
content/fragments/Closure.json  inline code and link targets
content/phrases.json             phrases that repeat across the course
```

The message file is one entry per paragraph:

```json
"p4": {
  "ru": "Замыкание — это функция вместе с её лексическим окружением.",
  "eng": "A closure is a function together with its lexical environment.",
  "ua": ""
}
```

An empty string means nobody has translated it yet. Keeping the three
languages side by side is what makes a translation filed under the wrong
paragraph visible: the Russian it claims to translate sits on the line above.

The skeleton holds everything that is the same in every language — headings,
icons, code samples, tables, links. Only prose gets a key, so a code sample
exists once rather than three times, and a change to the layout reaches every
language at once.

Inside a message, anything a translator must not touch — inline code, a link's
target — is replaced by a `⟦f0⟧` mark and kept in the fragments file. One table
serves all three languages: a translation imported from DeepL carries the
Russian numbering, so `⟦f5⟧` has to mean the same snippet in every language.

`public/lessons/{ru,eng,ua}/*.md` are built from these. Do not edit them.

A missing translation falls back to Russian, so a half-translated page works:
the translated paragraphs appear in the chosen language and the rest stays
Russian. There is no need to finish a page in one sitting.


### Keys

A key is an id — `p1`, `p2` — handed out once and never reused. It says nothing
about where the paragraph sits: the order of the page lives in the skeleton,
where you can see it.

```
content/lessons/Closure.md        content/messages/Closure.json
# ![ico-30 study] {{p1}}          "p1": { "ru": "Замыкание", "eng": …, "ua": … }
{{p2}}                            "p2": { … }
{{p3}}                            "p3": { … }
```

Inserting a paragraph renumbers nothing — it gets the next unused number.
Deleting one leaves a gap, which costs nothing. Moving one changes only the
skeleton.

Keys used to be positional: `s3.p2` was the second paragraph of the fourth
section. That is what let 365 translations end up filed under paragraphs they
did not translate — re-splitting a page into different sections moved every
address at once while the translations stayed on the old ones. On async-await
the English for one paragraph sits two sections away from it.

On re-extraction a paragraph is recognised by its Russian text, so it keeps its
id through any amount of moving. Edit the Russian and it becomes a new
paragraph, which is the honest answer: its translation was of the old words.

A quiz is three keys on one line, and the relationship is read from there
rather than from the names:

```
→→→ {{p41}} | {{p42}} | {{p43}} →→→
       question  variants  answer
```

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

### The phrase book

A page that says `или:` twelve times used to hold twelve keys, each with the
same two characters in it and each translated on its own. Now the skeleton
points at the book:

```
◘◘{{common.c17}}◘◘
```

and `content/phrases.json` holds the phrase once. 397 keys across 95 pages
point at it.

Two sections, because repeating often does not make a phrase the course's.

**`common`** — stock wording turning up in lessons that have nothing to do with
each other. `Результат в консоли:` is on twelve different pages and means the
same thing on all of them. Written as `{{common.c3}}`.

**`topic`** — wording that repeats inside one lesson. `строгий режим:` appears
twelve times, all of them on the page about strict mode. Worth writing once,
but it is that lesson's wording, so the entry records which lessons it belongs
to and the skeleton says `{{topic.t0}}`.

The first version of this table had one section and used repetition as the
whole test, which put `События элементов DOM` in a file called common. The
difference is not how often a phrase repeats but whether the pages it repeats
on have anything to do with each other.

What belongs in the book is **template wording** — a label, a heading, a stock
caption. Not a paragraph. A phrase in the book is edited for every page at
once, which is the point for `Результат:` and a trap for anything you might
want to reword in one place only. Hence the 60-character limit, and hence
`content/phrases-ignore.json`, a plain list of phrases never to share: add a
line there and `npm run phrases` will leave it in the pages.

```
npm run phrases              rebuild the book, and list what it chose
node tools/i18n-dedupe.js    what would move out of the pages (--write to do it)
```

Both sections are translated together:

```
node tools/i18n-export.js --phrases eng
node tools/i18n-import.js --phrases eng
```

Only the words move out of a page. The markup around them — emphasis, a border,
a trailing number — stays in the skeleton, so `Результат`, `**Результат**` and
`◘◘^^Результат^^◘◘` share one translation and keep their own appearance. A
reference is only made when putting the markup back reproduces the original
byte for byte, which is why rebuilding all 167 Russian pages after the change
produced no diff at all.

Ids are assigned once and never reused, because a skeleton points at them. A
phrase that stops repeating keeps its entry rather than leaving a page pointing
at nothing. A phrase carrying `⟦fN⟧` is never shared: that number indexes the
page's own fragment table, and the tables differ from page to page.

### Translating a page

Five steps. Exporting does **not** translate anything — it only writes the text
out for DeepL; importing only files the answer under `content/`. The page on
the site does not change until step 5 has run.

**1. Export.**

```
node tools/i18n-export.js Closure eng
```

Writes `translate/Closure.eng.01.txt` and so on — numbered segments, split into
chunks that fit DeepL's free limit. Already-translated keys are skipped, and so
are segments with nothing to translate in them and phrases the common table can
answer, so what is left is only what actually needs a translator.

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
`content/messages/Closure.json`, and says what it refused and why.

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
| the key still exists | a page edited after the export — the phrase moved into the book, or the page was re-extracted and renumbered |
| the Russian is unchanged | the export records a fingerprint of what it sent, so a paragraph rewritten since cannot take the old translation |
| the line count | a file that comes back with a different number of lines has been renumbered, and every segment past the change belongs to a different key than its number claims — nothing is imported |
| `⟦f0⟧` placeholders | hidden code and link targets — losing one breaks the page |
| `![ico-20 pin]` names | an icon name is a lookup, and an unknown one silently renders the default icon |
| `**` `_` `^^` counts | an unpaired marker prints literal asterisks; emphasis the Russian had must not go missing |
| `<br>` and other tags | a dropped break runs two lines together |
| URLs | a rewritten link is a dead link |
| quiz answers | the answer must still match one of the variants, and DeepL rewrites quotes |
| segment numbers | a merged pair of lines would shift every later translation onto the wrong key |

Emphasis that DeepL *adds* — a term the Russian left plain coming back bold —
is accepted and listed separately, because rejecting it would leave the
paragraph in Russian, which is worse than a word in bold nobody asked for.

Keep the numbering and one line per segment. The importer matches on the number
and refuses to guess from line order.

The same checks can be run over what is already on disk, which is where they
find things no import would accept today — translations written before a check
existed, and translations filed under the wrong key:

```
npm run i18n-check                      counts per file
node tools/i18n-check.js promise --list   the findings themselves
```


### After editing a message file

The pages the site serves are **built** from `content/`. Editing a message
changes nothing until the build runs — this is the single most common way to
lose an afternoon here.

```
npm run lessons
```

That is the whole answer for a text change: edit the `ru`, `eng` or `ua` value
in `content/messages/<page>.json`, run that, reload. It rewrites only the pages
that changed, so it is quick and quiet in git.

To be sure the two are in step:

```
npm run lessons-check
```

It rebuilds every page in memory and compares, without writing anything. A
page listed there is one where `public/lessons/` disagrees with `content/` —
which renders perfectly and shows the wrong text. The same check runs in CI, so
a stale page cannot be pushed.

The full chain, and when each step is needed:

| You changed | Run |
|---|---|
| a message, a phrase in the book, a skeleton | `npm run lessons` |
| a page's structure (added or moved a paragraph) | `node tools/i18n-extract.js <page> --write`, then `npm run lessons` |
| anything under `src/` | `npm run prod` |
| a new page, an icon, a sound, anything cached | `npm run full` |

`npm run full` does all of it and is never wrong; the shorter commands are for
when you know what you touched. Commit `content/` **and** `public/lessons/`
together — both are in the repository, and the check exists to keep them
honest.

### Editing the Russian

Edit the `ru` value in `content/messages/<page>.json` for text, or
`content/lessons/<page>.md` for structure, then rebuild with `npm run lessons`.

Changing a paragraph's Russian does not clear its translation — whether the
translation still says the right thing is a judgement only you can make.
Changing a page's **structure** is different, and needs a re-extract:

```
node tools/i18n-extract.js <page> --write
```

Keys are positional — `s5.p9` is the ninth paragraph of the sixth section — so
inserting one sentence renumbers everything below it. The extractor carries
translations across by matching the Russian text rather than the key, so each
one follows its paragraph to the new number; a paragraph whose Russian actually
changed loses its translation, and only that one. It reports how many of each.

The extractor splits a page and then rebuilds it, comparing the result with the
original byte for byte. A page that fails that check is not written.


### Working on the lessons locally

Two terminals:

```
npm run watch      rebuilds a page the moment its source changes
npm start          serves public/ at localhost:8181 and reloads the browser
```

Edit `content/lessons/<page>.md` or `content/messages/<page>.json`, save, and
the page is rebuilt — only that page, in a few milliseconds — and live-server
reloads the tab. Nothing to run by hand.

The watcher writes only when the output actually differs, so a save that
changes nothing leaves the browser alone.

**The service worker stays out of the way on localhost.** It caches lessons,
which is the point in production and a trap while writing one: a rebuilt page
would keep coming back from the cache. On localhost it is not registered, and
any registration left from an earlier visit is removed. To test it locally
anyway, in the console:

```
localStorage.setItem('service-worker', 'on')    // reload
localStorage.removeItem('service-worker')       // back to out of the way
```

Nothing about this changes the deployed site.

### Editing a page's markup

The markup lives in `content/lessons/<page>.md` — the skeleton, with `{{keys}}`
where the prose goes. Edit it, then:

```
npm run lessons
```

Same as for a message: nothing on the site changes until that runs.

A few pages have no keys, because they have nothing to gain from them. They
live in `content/static/` and the build copies them across unchanged:

| Here | Shown when |
|---|---|
| `eng/not-translated.md` `ua/not-translated.md` | the lesson exists but is not translated into the language being read |
| `offline.md` | the service worker has no cached copy and no network |

The 404 is not among them — it is an ordinary lesson with keys, built per
language like any other. It used to be two files that looked like one: a
trilingual `public/lessons/404.md` with no source anywhere, and a keyed
`<lang>/404.md` that was really the untranslated notice. Editing either had no
effect on the other.

### Adding a page

A new lesson starts as a draft — an ordinary page in Russian, in the markup
above:

```
1.  content/drafts/<name>.md             write it here
2.  node tools/i18n-extract.js <name> --write
3.  npm run content-worker
4.  npm run lessons
```

Step 2 takes it apart into `content/lessons/<name>.md` and
`content/messages/<name>.json`, then rebuilds it and compares byte for byte —
a page that fails that check is not written, so a mistake in the markup is
caught before anything is saved. It also points any repeated phrase at the
phrase book. The draft can be deleted afterwards; everything it held is in
`content/` by then.

Step 3 regenerates the page registry from the folders. Until it runs the site
does not know the page exists and answers with the 404.

After that the page answers at `?<name>` and can be translated like any other.
It will **not** be in the menu: `content-worker/src/assets/mainMenu.js` is
hand-maintained, and a page reaches the menu only by being added there.

`npm run full` does steps 3 and 4 along with everything else.

### Why there are three copies of every page

`public/lessons/{ru,eng,ua}/` holds a built file per language, and they are
generated — never edited. The translation lives in one place:

```
content/messages/<page>.json     one file, all three languages
        ↓  npm run lessons
public/lessons/ru/<page>.md      three files, which is what the browser asks for
public/lessons/eng/<page>.md
public/lessons/ua/<page>.md
```

Three copies exist because a lesson is fetched as a plain `.md` by the content
worker, at `lessons/<lang>/<page>.md`. There is no server to assemble one on
request — the site is a folder of files on GitHub Pages, so the assembling
happens at build time and the result is committed.

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

**`content/orphans/` is a holding pen, not part of the build.** When the
three-language message files were merged, 364 values turned out to be keyed to
paragraphs that no longer existed — a page's Russian had been edited, the keys
renumbered, and the translations left pointing at numbers. They are somebody's
work, so they were set aside rather than deleted. Nothing reads them. The
extractor now carries translations across by text, so the folder should not
grow.

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
