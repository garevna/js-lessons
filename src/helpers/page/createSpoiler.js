import { createTableForSpoiler } from './createTableForSpoiler'
import { buildSnippet } from './createScriptSnippet'

const { createElem } = require('../').default

export function createSpoiler (fragment) {
  const spoiler = Object.assign(createElem('spoiler-component', this.main), {
    content: []
  })

  const head = fragment.split('\n')[0]
  spoiler.setAttribute('header', head.slice(4,-1))

  let spoilerContent = fragment.replace(head, '').replace('^^^', '')

  const tables = spoilerContent.match(this.regExprs['Table'])

  tables && tables.forEach((table, index) => {
    const html = createTableForSpoiler.call(this, table)
    spoilerContent = spoilerContent.replace(table, html)
  })

  const lines = spoilerContent.split('\n')

  lines.forEach((line, lineIndex, array) => {
    if (!line.indexOf('‼‼‼')) {
      const tableIndex = line.slice(-1)
      spoiler.content.push(this.createTable(tables[tableIndex]))
    } else {
      if (line.indexOf('!!!') >= 0) {
        const snippet = this.fragments[line.slice(3, -3)]
        if (snippet.type === 'ScriptSnippet') {
          // Every block was built as a code snippet here, whatever its
          // language said, so console output inside a spoiler came out as
          // highlighted source instead of a console — the same twenty-two
          // blocks the rest of this change is about. It goes through the same
          // builder as a block on the page now, heading and all.
          for (const element of buildSnippet.call(this, snippet.content)) {
            spoiler.content.push(element)
          }
        } else {
          console.warn('?', snippet.type)
        }
      } else line.length && spoiler.content.push(this.parseLine(line))
    }
  })
  spoiler.setAttribute('ready', '1')
}
