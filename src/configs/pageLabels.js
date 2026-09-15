/**
 * Words the page renders itself, in every language it renders.
 *
 * An example heading is the same sentence 64 times over with a different
 * number on the end, and putting it in the lesson text meant translating
 * "Пример" once per occurrence — with a different answer each time, because a
 * one-word heading carries no context. Here it is written once and chosen at
 * render time, so it never reaches a translator at all.
 */

export const pageLabels = {
  example: {
    ru: 'Пример',
    eng: 'Example',
    ua: 'Приклад'
  }
}
