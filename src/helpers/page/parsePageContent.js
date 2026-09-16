import { createElem } from '../createElem'

const { pageRegExpr, pageSymbols, convertStringForAnchor } = require('../../configs').default

export function parsePageContent (pageContent) {
  Object.assign(this, {
    fragments: {},
    pageContent,
    regExprs: pageRegExpr,
    symbols: pageSymbols
  })

  this.regExprs.pageContent = this.pageContent

  for (const fragment of this.regExprs) Object.assign(this.fragments, fragment)

  this.pageContent = this.fragments.pageContent

  delete this.fragments.pageContent

  // Precisely a number between the markers. The old expression was
  // /!!!.[^!!!]+!!!/ — a dot then one or more, so it needed two digits and
  // would not have matched !!!0!!! at all.
  let insertionPoints = this.pageContent.match(/!!!\d+!!!/g)

  insertionPoints &&
    insertionPoints
      .forEach(insertionPoint => {
        const tmp = this.pageContent.split(insertionPoint)
        insertionPoint = insertionPoint.slice(3, -3)

        while (tmp.length > 1) {
          const fragment = tmp.shift()
          this.parseTextFragment(fragment)
          this[`create${this.fragments[insertionPoint].type}`](this.fragments[insertionPoint].content)
        }

        this.pageContent = tmp.join('')
      })

  this.pageContent.length && this.parseTextFragment(this.pageContent)
}
