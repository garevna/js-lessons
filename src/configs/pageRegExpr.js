const generator = function * () {
  const keys = Object.keys(this)
  let fragments, key

  // A block is replaced by a marker and put back later, and the marker used to
  // carry the offset the block was found at. Offsets move: replacing a block
  // with a much shorter marker shifts everything after it, so a later block
  // could land on a number an earlier one already had. The second overwrote
  // the first, and the page showed a raw !!!9380!!! where the code sample
  // should have been — three pages of 297 did that.
  //
  // A counter cannot collide.
  let id = 0

  while (keys.length) {
    key = keys.shift()

    if (key === 'pageContent') continue

    do {
      fragments = this.pageContent.match(this[key])
      if (!fragments) break

      if (key === 'Table') {
        for (const fragment of fragments) {
          const at = id++
          this.pageContent = this.pageContent.replace(fragment, `\n!!!${at}!!!\n`)
          yield {
            [at]: {
              type: key,
              content: fragment
            }
          }
        }
      } else {
        const at = id++
        this.pageContent = this.pageContent.replace(fragments[0], `\n!!!${at}!!!\n`)
        yield {
          [at]: {
            type: key,
            content: fragments[0]
          }
        }
      }
    } while (fragments)
  }

  yield {
    pageContent: this.pageContent
  }
}

const pageRegExpr = {
  CodeOutput: /\{{3}.[^}]*\}{3}/,
  ScriptSpoiler: /~~~~.[^~~~~]+~~~~/,
  ScriptSnippet: /~~~.[^~~~]+~~~/,
  Spoiler: /(\^{3})([\s\S]+?)\1/m,
  // !![illustrations/one.png, illustrations/two.png] — the picture slider.
  //
  // Kept to one line and forbidden a pipe, because the old pattern was
  // /!!\[.[^\]]+\]/ and that is not a slider, it is any !![ followed by
  // anything up to the next ] — anywhere on the page, across as many lines as
  // it took to find one.
  //
  // A lesson about type coercion writes !![] and !!{} in its questions, so on
  // Explicit-type-conversion it matched from the !![] on one line to the ]
  // of a [] six lines later, replaced all of it with a fragment marker, and
  // tore six test questions in half. One of the halves reached the test
  // renderer with no answer list behind it: "Cannot read properties of
  // undefined (reading 'split')", and the page stopped rendering there.
  //
  // There is exactly one slider in the course, and this still matches it.
  Slider: /!!\[[^\]\n|]+\]/,
  // ••••  …  ••••  — several lines on the black ground.
  //
  // ••one line•• has always been inline, so a paragraph on black had to be
  // written as one message with <br /> between its lines: unreadable in the
  // message file and impossible to translate a line at a time. Four bullets
  // on a line of their own open and close a block instead, and the lines
  // between are ordinary lines — one key each.
  //
  // The opening fence may name an icon, the way @@@@3 names a column count:
  // •••• bash, or •••• none for no icon at all.
  //
  // Anchored to whole lines so it cannot be confused with the inline form,
  // and lazy so two blocks on a page stay two blocks.
  BlackBlock: /^[ \t]*•{4}[ \t]*[a-z_-]*[ \t]*$[\s\S]*?^[ \t]*•{4}[ \t]*$/m,
  Grid: /\@\@\@\@\s+\S+[^\@\@\@\@]*]*\@\@\@\@/m,
  Table: /\n\n\|(.+|\n[^\n\n])+/gm,
  [Symbol.iterator]: generator
}

// CommonJS on purpose. A tool has to be able to ask this table what it
// swallows, and a tool is plain Node — see convertStringForAnchor.js, which is
// shared the same way. Webpack reads it either way.
module.exports = { pageRegExpr }
