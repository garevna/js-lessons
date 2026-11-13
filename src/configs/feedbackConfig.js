/**
 * The message widget: where it sends, and what it says.
 *
 * A message to the author, not a question about a lesson - the same standing
 * as the donate button next to it in the top bar, and deliberately not a
 * free help desk. The lesson a reader happened to be on travels with the
 * message, because it is useful to the person answering, but it is never
 * named in the interface and nothing is promised about it.
 *
 * The address is the feedback Worker (feedback-api/ in this repository). It
 * answers the three origins the course is served from - garevna.github.io,
 * js-lessons.pp.ua and a live-server on localhost - and nothing else.
 *
 * There is no account and no sign-in. The first message gets a thread id and
 * a token; the browser keeps them under the key below, and they are how a
 * reader's own answers are found later. Clearing site data ends that thread,
 * which is the price of asking nothing of the reader.
 */
export const feedbackConfig = {
  endpoint: 'https://js-lessons-feedback.garevna.workers.dev',

  // Where the thread lives in this browser.
  storageKey: 'feedback-thread',

  // How long the widget waits before asking whether an answer has arrived.
  // Only while the panel is open.
  pollMs: 20000,

  labels: {
    ua: {
      open: 'Написати авторці',
      title: 'Повідомлення',
      name: 'Як вас звати',
      namePlaceholder: 'необов’язково',
      telegram: 'Нік у Telegram',
      telegramPlaceholder: 'щоб відповісти вам особисто',
      text: 'Що ви хочете сказати',
      textPlaceholder: '',
      send: 'Надіслати',
      sending: 'Надсилаю…',
      sent: 'Надіслано.',
      failed: 'Не вийшло надіслати. Спробуйте трохи згодом.',
      tooMany: 'Забагато повідомлень поспіль — зачекайте годину.',
      empty: 'Спершу напишіть повідомлення.',
      waiting: 'без відповіді',
      close: 'Закрити'
    },
    ru: {
      open: 'Написать автору',
      title: 'Сообщение',
      name: 'Как вас зовут',
      namePlaceholder: 'необязательно',
      telegram: 'Ник в Telegram',
      telegramPlaceholder: 'чтобы ответить вам лично',
      text: 'Что вы хотите сказать',
      textPlaceholder: '',
      send: 'Отправить',
      sending: 'Отправляю…',
      sent: 'Отправлено.',
      failed: 'Не получилось отправить. Попробуйте чуть позже.',
      tooMany: 'Слишком много сообщений подряд — подождите час.',
      empty: 'Сначала напишите сообщение.',
      waiting: 'без ответа',
      close: 'Закрыть'
    },
    eng: {
      open: 'Message the author',
      title: 'Message',
      name: 'Your name',
      namePlaceholder: 'optional',
      telegram: 'Telegram handle',
      telegramPlaceholder: 'so the answer can reach you there',
      text: 'What you want to say',
      textPlaceholder: '',
      send: 'Send',
      sending: 'Sending…',
      sent: 'Sent.',
      failed: 'It did not go through. Try again in a moment.',
      tooMany: 'Too many messages in a row — give it an hour.',
      empty: 'Write the message first.',
      waiting: 'no answer yet',
      close: 'Close'
    }
  }
}
