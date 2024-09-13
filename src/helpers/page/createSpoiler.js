import { createTableForSpoiler } from './createTableForSpoiler'

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
          const lang = snippet.content.slice(3, snippet.content.search(String.fromCharCode(10)))
          const scriptSnippetContent = this.createCodeSnippet(snippet.content.slice(3 + lang.length, snippet.content.length - 3), lang)
          spoiler.content.push(scriptSnippetContent)
        } else {
          console.warn('?', snippet.type)
        }
      } else line.length && spoiler.content.push(this.parseLine(line))
    }
  })
  spoiler.setAttribute('ready', '1')
}
