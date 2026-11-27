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
    ru: 'Демо в консоли',
    eng: 'Console demo',
    ua: 'Демо в консолі'
  },
  terminalDemo: {
    ru: 'Терминал',
    eng: 'Terminal',
    ua: 'Термінал'
  },
  outOf: {
    ru: 'из',
    eng: 'of',
    ua: 'з'
  },
  mistakes: {
    ru: 'Ошибок',
    eng: 'Mistakes',
    ua: 'Помилок'
  },
  allRight: {
    ru: 'Все ответы верные',
    eng: 'All answers correct',
    ua: 'Усі відповіді правильні'
  },
  runChecks: {
    ru: 'Проверить',
    eng: 'Check',
    ua: 'Перевірити'
  },
  printedOutput: {
    ru: 'Что напечатал код',
    eng: 'What the code printed',
    ua: 'Що надрукував код'
  },
  printedSync: {
    ru: 'в скрипте',
    eng: 'in the script',
    ua: 'у скрипті'
  },
  printedMicro: {
    ru: 'микротаском',
    eng: 'as a microtask',
    ua: 'мікротаском'
  },
  printedTask: {
    ru: 'после первой задачи',
    eng: 'after the first task',
    ua: 'після першого завдання'
  },
  stillRunning: {
    ru: 'Код не закончил за четыре секунды, и проверки пошли по недоделанной работе: счёт неполный.',
    eng: 'The code did not finish within four seconds, and the checks ran on unfinished work: the score is incomplete.',
    ua: 'Код не закінчив за чотири секунди, і перевірки пішли по недоробленій роботі: рахунок неповний.'
  },
  restoreCode: {
    ru: 'Исходный код',
    eng: 'Reset code',
    ua: 'Початковий код'
  },
  next: {
    ru: 'Далее',
    eng: 'Next',
    ua: 'Далі'
  },
  again: {
    ru: 'Пройти заново',
    eng: 'Start again',
    ua: 'Пройти заново'
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
