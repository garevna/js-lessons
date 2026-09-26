/**
 * Words the page renders itself, in every language it renders.
 *
 * An example heading is the same sentence 64 times over with a different
 * number on the end, and a "Тесты" button is the same button on thirty pages
 * with a different address behind it. Putting those words in the lesson text
 * meant translating each occurrence separately — with a different answer each
 * time, because a one-word label carries no context. Here they are written
 * once and chosen at render time, so they never reach a translator at all.
 */

export const pageLabels = {
  example: {
    ru: 'Пример',
    eng: 'Example',
    ua: 'Приклад'
  },
  consoleOutput: {
    ru: 'Результат в консоли',
    eng: 'Result in the console',
    ua: 'Результат у консолі'
  },
  consoleDemo: {
    ru: 'Демонстрация в консоли',
    eng: 'Console demo',
    ua: 'Демонстрація в консолі'
  },
  tests: {
    ru: 'Тесты',
    eng: 'Tests',
    ua: 'Тести'
  },
  exercises: {
    ru: 'Упражнения',
    eng: 'Exercises',
    ua: 'Вправи'
  }
}
