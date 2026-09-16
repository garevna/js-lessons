/**
 * The same page in another language, where the site has one.
 *
 * Written by tools/i18n-links.js, which asks each site rather than guessing:
 * Wikipedia titles an article differently in every language, and MDN has a
 * Russian translation of some pages and not others. Re-run it after adding
 * links; it only ever adds what it can prove.
 *
 * The lessons hold the English address. This is read when a link is drawn,
 * so it covers the addresses written in the pages and the ones in
 * externalLinks.js alike, and no page has to carry three versions of a link.
 */

export const localizedLinks = {
  "https://developer.mozilla.org/en-US/docs/Glossary/IIFE": {
    "ru": "https://developer.mozilla.org/ru/docs/Glossary/IIFE"
  },
  "https://developer.mozilla.org/en-US/docs/Web/API/Document": {
    "ru": "https://developer.mozilla.org/ru/docs/Web/API/Document"
  },
  "https://developer.mozilla.org/en-US/docs/Web/API/Element/classList": {
    "ru": "https://developer.mozilla.org/ru/docs/Web/API/Element/classList"
  },
  "https://developer.mozilla.org/en-US/docs/Web/API/History_API": {
    "ru": "https://developer.mozilla.org/ru/docs/Web/API/History_API"
  },
  "https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType": {
    "ru": "https://developer.mozilla.org/ru/docs/Web/API/Node/nodeType"
  },
  "https://developer.mozilla.org/en-US/docs/Web/API/Window/location?name=garevna,date=10.07.2018": {
    "ru": "https://developer.mozilla.org/ru/docs/Web/API/Window/location?name=garevna,date=10.07.2018"
  },
  "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration": {
    "ru": "https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Loops_and_iteration"
  },
  "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object": {
    "ru": "https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object"
  },
  "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String": {
    "ru": "https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String"
  },
  "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function": {
    "ru": "https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/function"
  },
  "https://en.wikipedia.org/wiki/Boyce%E2%80%93Codd_normal_form": {
    "ru": "https://ru.wikipedia.org/wiki/Нормальная_форма_Бойса_—_Кодда",
    "ua": "https://uk.wikipedia.org/wiki/Нормальна_форма_Бойса_—_Кодда"
  },
  "https://en.wikipedia.org/wiki/Fifth_normal_form": {
    "ru": "https://ru.wikipedia.org/wiki/Пятая_нормальная_форма",
    "ua": "https://uk.wikipedia.org/wiki/П'ята_нормальна_форма"
  },
  "https://en.wikipedia.org/wiki/First_normal_form": {
    "ru": "https://ru.wikipedia.org/wiki/Первая_нормальная_форма",
    "ua": "https://uk.wikipedia.org/wiki/Перша_нормальна_форма"
  },
  "https://en.wikipedia.org/wiki/Fourth_normal_form": {
    "ru": "https://ru.wikipedia.org/wiki/Четвёртая_нормальная_форма",
    "ua": "https://uk.wikipedia.org/wiki/Четверта_нормальна_форма"
  },
  "https://en.wikipedia.org/wiki/Idempotence": {
    "ru": "https://ru.wikipedia.org/wiki/Идемпотентность",
    "ua": "https://uk.wikipedia.org/wiki/Ідемпотентність"
  },
  "https://en.wikipedia.org/wiki/Second_normal_form": {
    "ru": "https://ru.wikipedia.org/wiki/Вторая_нормальная_форма",
    "ua": "https://uk.wikipedia.org/wiki/Друга_нормальна_форма"
  },
  "https://en.wikipedia.org/wiki/Sixth_normal_form": {
    "ru": "https://ru.wikipedia.org/wiki/Шестая_нормальная_форма",
    "ua": "https://uk.wikipedia.org/wiki/Шоста_нормальна_форма"
  },
  "https://en.wikipedia.org/wiki/Third_normal_form": {
    "ru": "https://ru.wikipedia.org/wiki/Третья_нормальная_форма",
    "ua": "https://uk.wikipedia.org/wiki/Третя_нормальна_форма"
  }
}
