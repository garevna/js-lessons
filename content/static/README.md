# Pages written without the translation system

Everything else under `content/` is a skeleton plus a message file, and the
words come from keys. These do not, because they have nothing to gain from it —
no prose to reuse, no phrase to share, and the markup is the point.

Edit them here, with the markup in place. `npm run lessons` copies them into
`public/lessons/` unchanged, and `npm run lessons-check` notices if it has not.

| Here | Becomes | Shown when |
|---|---|---|
| `eng/not-translated.md` `ua/not-translated.md` | `public/lessons/<lang>/not-translated.md` | the lesson exists but has not been translated into the language being read |
| `offline.md` | `public/lessons/offline.md` | the service worker has no cached copy and no network |

Only English and Ukrainian need the untranslated notice. Russian is the language
the lessons are written in, so a page missing from it is a page that does not
exist — and that is the 404, which is an ordinary lesson with keys like any
other.

They live here rather than in `public/lessons/` for the same reason as
everything else: that folder is written by the build, and a file edited there is
a file whose edit disappears.
