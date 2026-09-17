import data from '../configs'

export async function getLesson () {
  const [pages, list] = [data.pages, data[self.lang]]

  const pathname = location.pathname.replace('content.worker.js', '')

  // Two different apologies, and they used to be one file each in different
  // places: lessons/404.md, hand-written and trilingual, for a page that does
  // not exist, and lessons/<lang>/404.md for one that exists untranslated.
  // Editing either had no effect on the other, and the first had no source in
  // content/ at all.
  //
  // Both are ordinary pages now, built per language like everything else. The
  // untranslated notice only needs English and Ukrainian: Russian is the
  // language the lessons are written in, so a page missing from it is a page
  // that does not exist.
  const fileName = !pages.includes(self.currentLesson)
    ? `${self.lang}/404`
    : !list.includes(self.currentLesson)
        ? `${self.lang}/not-translated`
        : `${self.lang}/${self.currentLesson}`

  const url = `${location.origin}${pathname}lessons/${fileName}.md`

  const lesson = await (await fetch(url)).text()

  return lesson
}
