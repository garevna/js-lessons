/**
 * The data the lessons show.
 *
 * Every value here is taken from a console output printed in a lesson, so a
 * student following the text sees what the text says they will see. Changing
 * one means changing the lesson that prints it.
 */

/** REST.md prints exactly this object for GET /users/all. */
export const users = {
  451789: { name: 'Feodor', age: 18, speciality: 'hobbit' },
  789451: { name: 'Teodor', age: 25, hobby: 'fly', speciality: 'teacher' },
  begemot: { name: 'Stephan', age: 36, speciality: 'doctor' }
}

/**
 * json-server served a list rather than a keyed object, and async-await.md
 * looks names up in it: fetch(`/users?name=Stephan`) then data[0].
 */
export const userList = [
  { id: 1, name: 'Stephan', age: 36, speciality: 'doctor' },
  { id: 2, name: 'Andry', age: 29, speciality: 'developer' },
  { id: 3, name: 'Feodor', age: 18, speciality: 'hobbit' },
  { id: 4, name: 'Teodor', age: 25, speciality: 'teacher' },
  { id: 5, name: 'Mary', age: 19, speciality: 'developer' }
]

/**
 * IndexedDB-index.md builds two stores out of this and indexes them by
 * "lesson" (unique) and by "topic", so the shape has to carry both.
 */
export const lessons = [
  { lesson: 'var', topic: 'basics', title: 'Переменные и типы данных' },
  { lesson: 'literals', topic: 'basics', title: 'Литералы' },
  { lesson: 'Boolean', topic: 'basics', title: 'Логический тип' },
  { lesson: 'for', topic: 'statements', title: 'Цикл for' },
  { lesson: 'while', topic: 'statements', title: 'Цикл while' },
  { lesson: 'Conditional-operators', topic: 'statements', title: 'Условные операторы' },
  { lesson: 'function', topic: 'functions', title: 'Функции' },
  { lesson: 'Closure', topic: 'functions', title: 'Замыкание' },
  { lesson: 'arrow-function', topic: 'functions', title: 'Стрелочные функции' },
  { lesson: 'promise', topic: 'async', title: 'Промисы' },
  { lesson: 'async-await', topic: 'async', title: 'async / await' },
  { lesson: 'Event-Loop', topic: 'async', title: 'Цикл событий' },
  { lesson: 'DOM', topic: 'browser', title: 'DOM' },
  { lesson: 'DOM-events', topic: 'browser', title: 'События DOM' },
  { lesson: 'BOM', topic: 'browser', title: 'BOM' }
]

/** FormData.md prints these logins for GET /forms/all. */
export const forms = {
  goblin: { name: 'Goblin', age: '41' },
  frodo: { name: 'Frodo', age: '18' },
  garevna: { name: 'Irina', age: '30' },
  begemot: { name: 'Cat', age: '15' },
  bomb: { name: 'Serafim', age: '27' }
}
