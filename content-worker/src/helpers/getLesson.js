import data from '../configs'

export async function getLesson () {
  const [pages, list] = [data.pages, data[self.lang]]

  const pathname = location.pathname.replace('content.worker.js', '')

  const fileName = !list.includes(self.currentLesson)
    ? !pages.includes(self.currentLesson)
      ? '404'
      : `${self.lang}/404`
    : `${self.lang}/${self.currentLesson}`

  const url = `${location.origin}${pathname}lessons/${fileName}.md`

  const lesson = await (await fetch(url)).text()

  return lesson
}
