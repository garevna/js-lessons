export function createCodeSnippet (fragment, lang) {
  const div = document.createElement('div')
  div.innerHTML = `<pre><code data-language=${lang}>${fragment.trim()}</code></pre>`
  Rainbow.color(div)
  Array.from(document.getElementsByClassName('preloader')).forEach(elem => elem.remove())
  return div
}
