const generator = function * () {
  const keys = Object.keys(this)
  let fragments, start, end, key

  while (keys.length) {
    fragments = true
    key = keys.shift()

    if (key === 'pageContent') continue

    while (fragments) {
      fragments = this.pageContent.match(this[key])
      if (!fragments) break
      start = fragments.index
      end = start + fragments[0].length + 1
      this.pageContent = this.pageContent.replace(fragments[0], `\n!!!${start}!!!\n`)
      yield {
        [start]: {
          type: key,
          content: fragments[0]
        }
      }
    }
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
