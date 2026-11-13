/**
 * The "ask about this lesson" widget: where it sends, and what it says.
 *
 * The address is the feedback Worker (feedback-api/ in this repository). It
 * answers the three origins the course is served from - garevna.github.io,
 * js-lessons.pp.ua and a live-server on localhost - and nothing else.
 *
 * There is no account behind it and no sign-in. The first question gets a
 * thread id and a token; the browser keeps them under the key below, and
 * they are how the reader's own answers are found later. Clearing site data
 * ends that thread, which is the price of asking nothing of the reader.
 */
export const feedbackConfig = {
  endpoint: 'https://js-lessons-feedback.garevna.workers.dev',

  // Where the thread lives in this browser. One thread per reader, not per
  // lesson: the questions carry the lesson's name, and a reader who asks on
  // three pages should see all three answers in one place.
  storageKey: 'feedback-thread',

  // How long the widget waits before asking the server whether an answer has
  // arrived. Only while the panel is open, and only for a thread that has an
  // unanswered question in it.
  pollMs: 20000,

  labels: {
    ua: {
      open: 'Запитати',
      title: 'Запитання до уроку',
      intro: 'Напишіть, що незрозуміло — відповім, і відповідь з’явиться тут же, коли ви наступного разу відкриєте сайт.',
      name: 'Як до вас звертатися',
      namePlaceholder: 'необов’язково',
      text: 'Запитання',
      textPlaceholder: 'Про що саме?',
      send: 'Надіслати',
      sending: 'Надсилаю…',
      sent: 'Надіслано. Відповідь з’явиться тут.',
      failed: 'Не вийшло надіслати. Спробуйте ще раз трохи згодом.',
      tooMany: 'Забагато запитань поспіль — зачекайте годину.',
      empty: 'Спершу напишіть запитання.',
      answers: 'Відповіді',
      waiting: 'Чекає на відповідь',
      yours: 'Ваше запитання',
      close: 'Закрити',
      badge: 'є відповідь'
    },
    ru: {
      open: 'Спросить',
      title: 'Вопрос по уроку',
      intro: 'Напишите, что непонятно — отвечу, и ответ появится здесь же, когда вы в следующий раз откроете сайт.',
      name: 'Как к вам обращаться',
      namePlaceholder: 'необязательно',
      text: 'Вопрос',
      textPlaceholder: 'О чём именно?',
      send: 'Отправить',
      sending: 'Отправляю…',
      sent: 'Отправлено. Ответ появится здесь.',
      failed: 'Не получилось отправить. Попробуйте чуть позже.',
      tooMany: 'Слишком много вопросов подряд — подождите час.',
      empty: 'Сначала напишите вопрос.',
      answers: 'Ответы',
      waiting: 'Ждёт ответа',
      yours: 'Ваш вопрос',
      close: 'Закрыть',
      badge: 'есть ответ'
    },
    eng: {
      open: 'Ask',
      title: 'A question about this lesson',
      intro: 'Write what is unclear — I answer, and the answer appears right here next time you open the site.',
      name: 'What to call you',
      namePlaceholder: 'optional',
      text: 'Question',
      textPlaceholder: 'What exactly?',
      send: 'Send',
      sending: 'Sending…',
      sent: 'Sent. The answer will appear here.',
      failed: 'It did not go through. Try again in a moment.',
      tooMany: 'Too many questions in a row — give it an hour.',
      empty: 'Write the question first.',
      answers: 'Answers',
      waiting: 'Waiting for an answer',
      yours: 'Your question',
      close: 'Close',
      badge: 'answered'
    }
  }
}
