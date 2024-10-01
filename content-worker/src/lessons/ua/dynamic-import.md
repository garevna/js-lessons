# ![ico-25 study] Dynamic import

**ES 2019**

__________________________________________________

Тепер у нас є вибір між статичним (**~import~**) та динамічним (**~import()~**) імпортом.

Динамічний імпорт представлений новою функцією **~import()~**, яка повертає проміс.

![ico-25 warn] Строго кажучи, **~import()~** не є функцією в сенсі успадкування від **~Function~**, це взагалі не об'єкт.

_________________________________

![ico-30 cap] ** 1**

Запустіть у консолі наведений нижче код.

~~~js
document.body.onclick = async () => {
  const module = await import('https://garevna.github.io/js-samples/js/index21.js')
}
~~~

^^![ico-20 speach] Примітно, що у файлі **~index21.js~** немає директиви **_~export~_**.^^
^^Однак імпорт спрацював, і скрипт запустився.^^

{{{dynamic-import-1.js}}}

____________________________________

![ico-30 cap] ** 2**

^^У цьому прикладі скрипти імпортуються динамічно, послідовно, із затримкою в кілька секунд.^^

◘◘![ico-20 paper]◘◘

~~~js
const scriptPath = 'https://garevna.github.io/js-samples/js/index'

import(`${scriptFile}12.js`)
  .then(module => setTimeout(() => import(`${scriptPath}21.js`)))
  .then(setTimeout(() => import(`${scriptPath}22.js`), 10000))
~~~

^^Використовуємо асинхронну функцію для спрощення коду:^^

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

![ico-30 cap] ** 3**

Припустимо, що у розмітці ми підключили скрипт **~index.js~**

◘◘^^![ico-20 paper] index.html^^◘◘

~~~html
&lt;!DOCTYPE html>
&lt;html>
  &lt;head>
    &lt;meta charset="utf-8">
    &lt;title>ES Modules&lt;/title>
&lt;/head>

  &lt;body>
    &lt;script src="js/index.js">&lt;/script>
  &lt;/body>

&lt;/html>
~~~

Код файлу **~index.js~** створює елемент ~&lt;script>~ з атрибутом **~type="module"~** і вставляє його на сторінку:

~~~js
const mod = document.body
  .appendChild(document.createElement('script'))
mod.type = 'module'
~~~

В елемент ~&lt;script>~ міститься код, який імпортує функцію **_~showMessage~_** з файлу **~js/testESModules.js~**

і викликає її з текстом "_Hi, students! Welcome to new age of ES Modules!_".

~~~js
mod.textContent = `
  import { showMessage } from './js/testESModules.js'
  showMessage('Hi, students! Welcome to new age of ES Modules!')
`
~~~

Повний код:

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

Іменований експорт у файлі **~js/testESModules.js~**:

◘◘^^![ico-20 paper] js/testESModules.js^^◘◘

~~~js
export function showMessage (message) {
  const demo = document.body.appendChild(document.createElement('div'))
  demo.style = `
    position: fixed;
    top: 15%; left: 15%;
    bottom: 15%; right: 15%;
    box-shadow: 8px 8px 12px #00000090;
    border: solid 0.5px #bbb;
    padding: 32px;
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

![ico-20 warn] При імпорті модулів слід зазначати або повний шлях:

~~~js
import { showMessage } from 'https://example.com/js/testESModules.js'
~~~

або відносний шлях, що починається з ~ /~, ~./~ або ~../~:

~~~js
import { showMessage } from './js/testESModules.js'
~~~

Інакше імпорт завершиться невдачею.

________________________________________________________________________


[![ico-25 cap] **Live demo**](samples/25)

______________________________________________________________________
