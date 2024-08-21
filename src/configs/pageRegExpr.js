const generator = function * () {
  const keys = Object.keys(this)
  let fragments, key

  while (keys.length) {
    key = keys.shift()

    if (key === 'pageContent') continue

    do {
      fragments = this.pageContent.match(this[key])
      if (!fragments) break

      if (key === 'Table') {
        const indexes = fragments.map(fragment => this.pageContent.indexOf(fragment))
        for (const fragment of fragments) {
          const start = this.pageContent.indexOf(fragment)
          this.pageContent = this.pageContent.replace(fragment, `\n!!!${start}!!!\n`)
          yield {
            [start]: {
              type: key,
              content: fragment
            }
          }
        }
      } else {
        const start = fragments.index
        this.pageContent = this.pageContent.replace(fragments[0], `\n!!!${start}!!!\n`)
        yield {
          [start]: {
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

export const pageRegExpr = {
  CodeOutput: /\{{3}.[^}]*\}{3}/,
  ScriptSpoiler: /~~~~.[^~~~~]+~~~~/,
  ScriptSnippet: /~~~.[^~~~]+~~~/,
  Spoiler: /(\^{3})([\s\S]+?)\1/m,
  Slider: /!!\[.[^\]]+\]/,
  Grid: /\@\@\@\@\s+\S+[^\@\@\@\@]*]*\@\@\@\@/m,
  Table: /\n\n\|(.+|\n[^\n\n])+/gm,
  [Symbol.iterator]: generator
}
