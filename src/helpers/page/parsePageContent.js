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

  let insertionPoints = this.pageContent.match(/!!!.[^!!!]+!!!/g)

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

  this.menu.setAttribute('options', JSON.stringify(this.pageContentList))
}
