const data = require('../configs').default

export function getLesson () {
  const [pages, list] = [data.pages, data[self.lang]]
  const lesson = !list.includes(self.currentLesson)
    ? !pages.includes(self.currentLesson)
      ? require('../lessons/404.md').default
      : require('../lessons/' + self.lang + '/404.md').default
    : require('../lessons/' + self.lang + '/' + self.currentLesson + '.md').default
  return lesson
}
