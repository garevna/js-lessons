/**
 * What the course talks about, each said once, in each language.
 *
 * An entry is a concept: its key, the English words for it, and the Russian
 * and Ukrainian ones. A lesson never repeats these words. It names the concept
 * — in its keywords (keywords.js, by hand) or in what it uses (uses.js, found
 * in its text by tools/uses.js) — and search gives it every word of the entry.
 *
 * The English list doubles as a list of names the concept goes by: a lesson
 * whose keywords say cycle gets everything loop has, one that says fabric
 * gets factory. So a word should sit in one entry only; tools/uses.js warns
 * when it finds the same word in two.
 *
 * Not every form of a word: search cuts the ending off before it compares, so
 * функция also finds функции and функцию. Where a reader may type any of
 * several words built on one root — асинхронщина, асинхронный, асинхронность —
 * the root itself is listed, and every query with that root in it is found.
 */
export const dictionary = {
  // ——— the rings of the course map (content/areas.json) ———
  //
  // Each ring is a concept, and every lesson in the ring has it: tools/uses.js
  // gives it to them. Three of the six are further down, where they belong by
  // subject — inheritance, functional programming, asynchrony.

  basics: { eng: ['basics', 'fundamentals', 'js basics'], ru: ['основы'], ua: ['основи'] },
  browser: { eng: ['browser', 'browser api', 'web api'], ru: ['браузер'], ua: ['браузер'] },
  tools: { eng: ['tools', 'tooling', 'developer tools'], ru: ['инструменты'], ua: ['інструменти'] },

  // ——— the language ———

  function: { eng: ['function', 'functions'], ru: ['функция'], ua: ['функція'] },
  object: { eng: ['object', 'objects'], ru: ['объект'], ua: ["об'єкт", 'об’єкт', 'обєкт'] },
  array: { eng: ['array', 'arrays'], ru: ['массив'], ua: ['масив'] },
  string: { eng: ['string', 'strings'], ru: ['строка'], ua: ['рядок'] },
  number: { eng: ['number'], ru: ['число'], ua: ['число'] },
  boolean: { eng: ['boolean'], ru: ['логический', 'булев'], ua: ['логічний', 'булевий'] },
  variable: { eng: ['variable', 'var'], ru: ['переменная'], ua: ['змінна'] },
  'data types': { eng: ['data types', 'data type', 'primitive', 'primitive value'], ru: ['типы данных', 'тип данных', 'примитив'], ua: ['типи даних', 'тип даних', 'примітив'] },
  typing: { eng: ['typing', 'dynamic typing'], ru: ['типизация', 'динамическая типизация'], ua: ['типізація', 'динамічна типізація'] },
  'type coercion': { eng: ['type coercion', 'type conversion', 'explicit', 'implicit'], ru: ['приведение типов', 'преобразование типов'], ua: ['приведення типів', 'перетворення типів'] },
  literal: { eng: ['literal', 'object literal'], ru: ['литерал'], ua: ['літерал'] },
  'template literal': { eng: ['template literal', 'template string', 'multiline text'], ru: ['шаблонная строка', 'темплейтный литерал', 'шаблонный литерал'], ua: ['шаблонний рядок', 'шаблонний літерал'] },
  operator: { eng: ['operator', 'operand'], ru: ['оператор', 'операнд'], ua: ['оператор', 'операнд'] },
  condition: { eng: ['condition', 'branching', 'conditional operator'], ru: ['условие', 'ветвление', 'условный оператор'], ua: ['умова', 'розгалуження', 'умовний оператор'] },
  'ternary operator': { eng: ['ternary operator', 'ternary'], ru: ['тернарный оператор', 'тернарник'], ua: ['тернарний оператор'] },
  comparison: { eng: ['comparison', 'comparison operator', 'strict equality'], ru: ['сравнение', 'строгое равенство'], ua: ['порівняння', 'сувора рівність'] },
  'logical operations': { eng: ['logical operations', 'logical expression'], ru: ['логические операции', 'логическое выражение'], ua: ['логічні операції', 'логічний вираз'] },
  assignment: { eng: ['assignment'], ru: ['присваивание'], ua: ['присвоювання'] },
  increment: { eng: ['increment', 'decrement'], ru: ['инкремент', 'декремент'], ua: ['інкремент', 'декремент'] },
  concatenation: { eng: ['concatenation'], ru: ['конкатенация', 'склеивание строк'], ua: ['конкатенація'] },
  loop: { eng: ['loop', 'cycle', 'loop operator'], ru: ['цикл'], ua: ['цикл'] },
  iteration: { eng: ['iteration', 'traversal'], ru: ['итерация', 'перебор', 'обход'], ua: ['ітерація', 'перебір', 'обхід'] },
  iterator: { eng: ['iterator', 'iterable', 'symbol.iterator', 'iteration protocol'], ru: ['итератор', 'итерируемый', 'итерабельный'], ua: ['ітератор', 'ітерований', 'ітерабельний'] },
  generator: { eng: ['generator', 'yield', 'asynchronous generators'], ru: ['генератор'], ua: ['генератор'] },
  destructuring: { eng: ['destructuring', 'destructuring assignment'], ru: ['деструктуризация'], ua: ['деструктуризація'] },
  spread: { eng: ['spread', 'rest', 'rest parameters'], ru: ['спред', 'оператор расширения', 'остаточные параметры'], ua: ['спред', 'оператор розширення', 'залишкові параметри'] },
  'optional chaining': { eng: ['optional chaining', '?.'], ru: ['опциональная цепочка'], ua: ['опціональний ланцюжок'] },
  'nullish coalescing': { eng: ['nullish coalescing', '??'], ru: ['оператор нулевого слияния'], ua: ['оператор нульового злиття'] },
  regexp: { eng: ['regexp', 'regular expression'], ru: ['регулярное выражение', 'регулярк'], ua: ['регулярний вираз', 'регулярк'] },
  symbol: { eng: ['symbol'], ru: ['символ'], ua: ['символ'] },
  proxy: { eng: ['proxy', 'reflect'], ru: ['прокси'], ua: ['проксі'] },
  collection: { eng: ['collection', 'weakmap', 'weakset'], ru: ['коллекция'], ua: ['колекція'] },
  date: { eng: ['date'], ru: ['дата'], ua: ['дата'] },
  'strict mode': { eng: ['strict mode', 'use strict', 'strict'], ru: ['строгий режим'], ua: ['суворий режим'] },
  module: { eng: ['module', 'modules', 'import', 'export', 'es modules'], ru: ['модуль'], ua: ['модуль'] },

  // ——— functions ———

  closure: { eng: ['closure'], ru: ['замыкание'], ua: ['замикання'] },
  recursion: { eng: ['recursion', 'tail recursion', 'recursion depth'], ru: ['рекурсия'], ua: ['рекурсія'] },
  iife: { eng: ['iife', 'immediately invoked function expression'], ru: ['самовызывающаяся функция'], ua: ['самовикличну функцію'] },
  'arrow function': { eng: ['arrow function', 'arrow'], ru: ['стрелочная функция'], ua: ['стрілкова функція'] },
  callback: { eng: ['callback'], ru: ['колбек', 'коллбэк', 'колбэк', 'функция обратного вызова'], ua: ['колбек', 'функція зворотного виклику'] },
  'higher-order function': { eng: ['higher-order function', 'function as argument', 'function as return value'], ru: ['функция высшего порядка'], ua: ['функція вищого порядку'] },
  'functional programming': {
    eng: ['functional programming', 'fp', 'func stuff', 'func staff', 'functional stuff', 'functional programming stuff'],
    ru: ['функциональное программирование', 'функциональщина', 'функциональ'],
    ua: ['функціональне програмування', 'функціональщина', 'функціональ']
  },
  'pure function': { eng: ['pure function', 'referential transparency', 'idempotence'], ru: ['чистая функция', 'ссылочная прозрачность', 'идемпотентность'], ua: ['чиста функція', 'посилальна прозорість', 'ідемпотентність'] },
  immutability: { eng: ['immutability', 'immutable', 'freeze'], ru: ['иммутабельность', 'неизменяемость'], ua: ['імутабельність', 'незмінність'] },
  currying: { eng: ['currying'], ru: ['каррирование', 'карринг'], ua: ['каррінг', 'карування'] },
  context: { eng: ['context', 'call context', 'execution context', 'this', 'changing the call context'], ru: ['контекст', 'контекст вызова', 'контекст выполнения'], ua: ['контекст', 'контекст виклику', 'контекст виконання'] },
  scope: { eng: ['scope', 'block scope', 'functional scope', 'scope chain'], ru: ['область видимости', 'скоуп'], ua: ['область видимості', 'скоуп'] },
  hoisting: { eng: ['hoisting'], ru: ['всплытие', 'хойстинг'], ua: ['підняття', 'хойстинг'] },
  'lexical environment': { eng: ['lexical environment', 'lexicalenvironment'], ru: ['лексическое окружение'], ua: ['лексичне оточення'] },
  'temporal dead zone': { eng: ['temporal dead zone'], ru: ['временная мёртвая зона', 'мертвая зона'], ua: ['тимчасова мертва зона', 'мертва зона'] },
  'global object': { eng: ['global object', 'window'], ru: ['глобальный объект'], ua: ["глобальний об'єкт", 'глобальний об’єкт'] },

  // ——— objects and classes ———

  property: { eng: ['property', 'own property', 'inherited property'], ru: ['свойство'], ua: ['властивість'] },
  method: { eng: ['method', 'methods'], ru: ['метод'], ua: ['метод'] },
  constructor: { eng: ['constructor'], ru: ['конструктор'], ua: ['конструктор'] },
  instance: { eng: ['instance', 'instanceof'], ru: ['экземпляр'], ua: ['екземпляр'] },
  prototype: { eng: ['prototype', 'prototype chain', 'proto', '__proto__', 'setprototypeof', 'object.create'], ru: ['прототип', 'цепочка прототипов'], ua: ['прототип', 'ланцюжок прототипів'] },
  inheritance: {
    eng: ['inheritance', 'extends', 'inherited', 'prototypal inheritance', 'prototype inheritance', 'prototypal inheritance model'],
    ru: ['наследование', 'прототипное наследование', 'прототипная модель наследования'],
    ua: ['успадкування', 'прототипне успадкування', 'прототипна модель успадкування']
  },
  class: { eng: ['class', 'classes'], ru: ['класс'], ua: ['клас'] },
  getter: { eng: ['getter', 'setter'], ru: ['геттер', 'сеттер'], ua: ['геттер', 'сеттер'] },
  private: { eng: ['private', 'private property'], ru: ['приватное свойство', 'приватный'], ua: ['приватна властивість', 'приватний'] },
  descriptor: { eng: ['descriptor', 'defineproperty', 'defineproperties', 'getownpropertydescriptor'], ru: ['дескриптор'], ua: ['дескриптор'] },
  encapsulation: { eng: ['encapsulation'], ru: ['инкапсуляция'], ua: ['інкапсуляція'] },
  polymorphism: { eng: ['polymorphism'], ru: ['полиморфизм'], ua: ['поліморфізм'] },
  factory: { eng: ['factory', 'factory function', 'factory method', 'fabric'], ru: ['фабрика', 'фабричн'], ua: ['фабрика', 'фабричн'] },
  'design pattern': { eng: ['design pattern', 'pattern', 'gang of four'], ru: ['паттерн', 'шаблон проектирования'], ua: ['патерн', 'шаблон проєктування'] },
  decorator: { eng: ['decorator'], ru: ['декоратор'], ua: ['декоратор'] },
  oop: { eng: ['oop', 'object-oriented programming'], ru: ['ооп', 'объектно-ориентированное программирование'], ua: ['ооп', "об'єктно-орієнтоване програмування"] },

  // ——— errors ———

  error: { eng: ['error', 'errors'], ru: ['ошибка'], ua: ['помилка'] },
  exception: { eng: ['exception', 'try', 'catch', 'throw', 'try...catch', 'error handling'], ru: ['исключение', 'обработка ошибок'], ua: ['виняток', 'обробка помилок'] },

  // ——— asynchrony ———

  asynchrony: {
    eng: ['asynchrony', 'asynchronous', 'async', 'async stuff', 'async staff', 'asynchronous programming'],
    ru: ['асинхрон', 'асинхронщина', 'асинхронность', 'асинхронное программирование'],
    ua: ['асинхрон', 'асинхронщина', 'асинхронність', 'асинхронне програмування']
  },
  'async function': { eng: ['async function', 'asynchronous function', 'await', 'async/await'], ru: ['асинхронная функция'], ua: ['асинхронна функція'] },
  promise: { eng: ['promise', 'promises', 'promise.all', 'promise.resolve', 'promise.any', 'then'], ru: ['промис', 'обещание'], ua: ['проміс', 'обіцянка'] },
  microtask: { eng: ['microtask', 'macrotask', 'queuemicrotask'], ru: ['микротаск', 'микрозадача', 'макротаск'], ua: ['мікротаск', 'мікрозадача', 'макротаск'] },
  'task queue': { eng: ['task queue', 'queue', 'event queue'], ru: ['очередь задач', 'очередь'], ua: ['черга завдань', 'черга'] },
  'event loop': { eng: ['event loop'], ru: ['цикл событий', 'эвент луп'], ua: ['цикл подій'] },
  'call stack': { eng: ['call stack', 'stack'], ru: ['стек вызовов', 'стек'], ua: ['стек викликів', 'стек'] },
  heap: { eng: ['heap'], ru: ['куча'], ua: ['купа'] },
  memory: { eng: ['memory', 'allocation'], ru: ['память'], ua: ["пам'ять", 'пам’ять'] },
  thread: { eng: ['thread', 'multithreading', 'single-threading', 'parallel thread'], ru: ['поток', 'многопоточность', 'однопоточность'], ua: ['потік', 'багатопотоковість', 'однопотоковість'] },
  timer: { eng: ['timer', 'settimeout', 'setinterval'], ru: ['таймер'], ua: ['таймер'] },
  worker: { eng: ['worker', 'web worker', 'web-worker'], ru: ['воркер'], ua: ['воркер'] },
  debounce: { eng: ['debounce', 'debouncing', 'throttle', 'throttling'], ru: ['дебаунс', 'троттлинг'], ua: ['дебаунс', 'тротлінг'] },

  // ——— the browser and the DOM ———

  event: { eng: ['event', 'events', 'custom event', 'customevent', 'dispatchevent'], ru: ['событие'], ua: ['подія'] },
  'event listener': { eng: ['event listener', 'event handler', 'addeventlistener'], ru: ['обработчик событий', 'обработчик'], ua: ['обробник подій', 'обробник'] },
  delegation: { eng: ['event delegation', 'delegation'], ru: ['делегирование'], ua: ['делегування'] },
  element: { eng: ['element'], ru: ['элемент'], ua: ['елемент'] },
  attribute: { eng: ['attribute'], ru: ['атрибут'], ua: ['атрибут'] },
  form: { eng: ['form', 'forms'], ru: ['форма'], ua: ['форма'] },
  'web component': { eng: ['web component', 'web-component', 'custom element', 'customelements', 'component'], ru: ['веб-компонент', 'кастомный элемент', 'пользовательский элемент'], ua: ['веб-компонент', 'кастомний елемент'] },
  'shadow dom': { eng: ['shadow dom', 'attachshadow', 'shadowroot'], ru: ['теневой dom'], ua: ['тіньовий dom'] },
  lifecycle: { eng: ['lifecycle', 'lifecycle hook'], ru: ['жизненный цикл'], ua: ['життєвий цикл'] },
  template: { eng: ['template'], ru: ['шаблон'], ua: ['шаблон'] },
  slot: { eng: ['slot'], ru: ['слот'], ua: ['слот'] },
  scrolling: { eng: ['scrolling', 'scroll'], ru: ['прокрутка', 'скроллинг', 'скролл'], ua: ['прокрутка', 'скролінг', 'скрол'] },
  storage: { eng: ['storage', 'localstorage', 'sessionstorage', 'store on the client side'], ru: ['хранилище', 'локальное хранилище'], ua: ['сховище', 'локальне сховище'] },
  cookie: { eng: ['cookie'], ru: ['куки'], ua: ['кукі'] },
  file: { eng: ['file', 'files'], ru: ['файл'], ua: ['файл'] },
  notification: { eng: ['notification'], ru: ['уведомление'], ua: ['сповіщення'] },
  geolocation: { eng: ['geolocation'], ru: ['геолокация'], ua: ['геолокація'] },
  'typed array': { eng: ['typed array', 'arraybuffer', 'dataview'], ru: ['типизированный массив'], ua: ['типізований масив'] },
  performance: { eng: ['performance', 'performance.now', 'profiler'], ru: ['производительность'], ua: ['продуктивність'] },
  security: { eng: ['security', 'xss', 'code injection'], ru: ['безопасность', 'межсайтовый скриптинг'], ua: ['безпека'] },
  devtools: { eng: ['devtools', 'chrome devtools'], ru: ['инструменты разработчика', 'девтулз'], ua: ['інструменти розробника'] },
  debugger: { eng: ['debugger', 'breakpoint', 'breakpoints'], ru: ['отладчик', 'отладка', 'точка останова'], ua: ['налагоджувач', 'налагодження', 'точка зупинки'] },

  // ——— the network and the data ———

  request: { eng: ['request'], ru: ['запрос'], ua: ['запит'] },
  response: { eng: ['response'], ru: ['ответ'], ua: ['відповідь'] },
  server: { eng: ['server'], ru: ['сервер'], ua: ['сервер'] },
  header: { eng: ['header', 'headers'], ru: ['заголовок'], ua: ['заголовок'] },
  status: { eng: ['status', 'statustext'], ru: ['статус', 'код ответа'], ua: ['статус', 'код відповіді'] },
  protocol: { eng: ['protocol'], ru: ['протокол'], ua: ['протокол'] },
  port: { eng: ['port'], ru: ['порт'], ua: ['порт'] },
  domain: { eng: ['domain', 'cross domain', 'host'], ru: ['домен'], ua: ['домен'] },
  websocket: { eng: ['websocket', 'ws', 'wss', 'socket'], ru: ['вебсокет', 'сокет'], ua: ['вебсокет', 'сокет'] },
  ajax: { eng: ['ajax', 'fetch', 'xmlhttprequest', 'xhr'], ru: ['аякс'], ua: ['аякс'] },
  database: { eng: ['database', 'db', 'indexeddb'], ru: ['база данных'], ua: ['база даних'] },
  transaction: { eng: ['transaction'], ru: ['транзакция'], ua: ['транзакція'] },
  index: { eng: ['index', 'indexing'], ru: ['индекс'], ua: ['індекс'] },
  'deep copy': { eng: ['deep copy', 'copy'], ru: ['глубокое копирование', 'копирование'], ua: ['глибоке копіювання', 'копіювання'] },
  hash: { eng: ['hash', 'digest'], ru: ['хеш', 'хэш'], ua: ['хеш'] },
  encoding: { eng: ['encoding', 'encoding table', 'character code'], ru: ['кодировка', 'код символа'], ua: ['кодування', 'код символу'] },

  // ——— tools and the trade ———

  package: { eng: ['package', 'package manager'], ru: ['пакет', 'менеджер пакетов'], ua: ['пакет', 'менеджер пакетів'] },
  dependency: { eng: ['dependency', 'dependencies', 'devdependencies'], ru: ['зависимость'], ua: ['залежність'] },
  build: { eng: ['build', 'builder', 'bundle', 'bundler'], ru: ['сборка', 'сборщик', 'бандл'], ua: ['збірка', 'збирач', 'бандл'] },
  loader: { eng: ['loader', 'loaders'], ru: ['загрузчик'], ua: ['завантажувач'] },
  algorithm: { eng: ['algorithm'], ru: ['алгоритм'], ua: ['алгоритм'] },
  flowchart: { eng: ['flowchart'], ru: ['блок-схема'], ua: ['блок-схема'] },
  interface: { eng: ['interface'], ru: ['интерфейс'], ua: ['інтерфейс'] },
  principle: { eng: ['principle'], ru: ['принцип'], ua: ['принцип'] },
  specification: { eng: ['specification', 'standard'], ru: ['спецификация', 'стандарт'], ua: ['специфікація', 'стандарт'] },
  sort: { eng: ['sort', 'sorting'], ru: ['сортировка'], ua: ['сортування'] },

  // ——— by name: what is looked for by its own name in any language, and
  // listed so tools/uses.js can say which lessons use it ———

  json: { eng: ['json', 'json.parse', 'json.stringify'] },
  bigint: { eng: ['bigint'] },
  bind: { eng: ['bind', 'call', 'apply'] },
  svg: { eng: ['svg', 'createelementns'] },
  canvas: { eng: ['canvas'], ru: ['канвас'], ua: ['канвас'] },
  postmessage: { eng: ['postmessage'] },
  mutationobserver: { eng: ['mutationobserver', 'mutation observer'] },
  intersectionobserver: { eng: ['intersectionobserver'] },
  filereader: { eng: ['filereader'] },
  formdata: { eng: ['formdata'] },
  blob: { eng: ['blob'] },
  readablestream: { eng: ['readablestream', 'stream'] },
  requestanimationframe: { eng: ['requestanimationframe'] }
}
