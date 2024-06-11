# ![ico-25 study] Dynamic import 

**ES10 (2019)**

__________________________________________________

Теперь у нас есть выбор между статическим (**~import~**) и динамическим (**~import()~**) импортом

Динамический импорт представлен новой функцией **~import()~**, возвращающей промис

![ico-25 warn] Строго говоря, **~import()~** не является функцией в смысле наследования от **~Function~**, это вообще не объект

_________________________________

## ![ico-25 cap] Пример 1

Запустите в консоли **Chrome** следующий код:

~~~js
document.body.onclick = async () => {
  const module = await import('https://garevna.github.io/js-samples/js/index21.js')
}
~~~

^^![ico-20 speach] Примечательно то, что в файле **_index21.js_** нет директивы **_~export~_**^^
^^Однако импорт сработал, и скрипт запустился^^

{{{dynamic-import-1.js}}}

____________________________________

## ![ico-25 cap] Пример 2

^^В этом примере скрипты импортируются динамически, последовательно, с задержкой в несколько секунд^^

◘◘![ico-20 paper]◘◘

~~~js
const scriptFile = 'https://garevna.github.io/js-samples/js/index'

import(`${scriptFile}12.js`)
  .then(module => setTimeout(() => import(`${scriptFile}21.js`)))
  .then(setTimeout(() => import(`${scriptFile}22.js`), 10000))
~~~

^^Используем асинхронную функцию для упрощения кода:^^

◘◘![ico-20 paper]◘◘

~~~js
const scriptImports = async moduleFile => {
  const timeOut = timeInterval => new Promise(resolve => setTimeout(() => resolve(), timeInterval))

  await import(`${moduleFile}12.js`)
  await timeOut(8000)
  await import(`${moduleFile}21.js`)
  await timeOut(12000)
  await import(`${moduleFile}22.js`)
}

scriptImports('https://garevna.github.io/js-samples/js/index')
~~~

_____________________________________________________

## ![ico-25 cap] Пример 3

Предположим, в разметке мы подключили скрипт **~index.js~**

◘◘^^![ico-20 paper] index.html^^◘◘

~~~html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>ES Modules</title>
</head>

  <body>
    <script src="js/index.js"></script>
  </body>

</html>
~~~

Код файла **~index.js~** создает элемент ~&lt;script>~ с атрибутом **~type = "module"~** и вставляет его на страницу

~~~js
const mod = document.body
  .appendChild(document.createElement('script'))
mod.type = 'module'
~~~

В элемент ~&lt;script>~ помещается код, который импортирует функцию **_~showMessage~_** из файла **~js/testESModules.js~**

и вызывает ее с текстом "_Hi, students! Welcome to new age of ES Modules!_"

~~~js
mod.textContent = `
  import { showMessage } from './js/testESModules.js'
  showMessage('Hi, students! Welcome to new age of ES Modules!')
`
~~~

Полный код:

◘◘^^![ico-20 paper] js/index.js^^◘◘

~~~js
const mod = document.body
  .appendChild(document.createElement('script'))

mod.type = 'module'

mod.textContent = `
  import { showMessage } from './js/testESModules.js'
  showMessage('Hi, students! Welcome to new age of ES Modules!')
`
~~~

Именованый экспорт в файле **~js/testESModules.js~**

◘◘^^![ico-20 paper] js/testESModules.js^^◘◘

~~~js
export function showMessage (message) {
  const demo = document.body.appendChild(document.createElement('div'))
  demo.style = `
    position: fixed;
    top: 15%; left: 15%;
    bottom: 15%; right: 15%;
    box-shadow: 10px 10px 16px #00000090;
    border: solid 0.5px #bbb;
    padding: 30px;
    z-index: 300;
    background-color: #000;
  `
  demo.innerHTML = `
    <h2 style='color: #789'>Module was successfully imported</h2>
    <p style='color: #fa0'>Now you can see how it works :)</p>
    <hr>
    <p style='color: #dde'>${message}</p>
  `
  setTimeout(() => document.body.removeChild(demo), 10000)
}
~~~

{{{dynamic-import-3.js}}}

__________________________________________________________

![ico-20 warn] При импорте модулей следует указывать или полный путь:

~~~js
import { showMessage } from 'https://example.com/js/testESModules.js'
~~~

или относительный путь, начинающийся с ~ /~, ~./~ или ~../~:

~~~js
import { showMessage } from './js/testESModules.js'
~~~

В противном случае импорт завершится неудачей

________________________________________________________________________


[![ico-25 cap] **Live demo**](https://garevna.github.io/js-samples/#25)

______________________________________________________________________