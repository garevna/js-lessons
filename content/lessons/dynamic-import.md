# ![ico-25 study] Dynamic import

**ES 2019**

__________________________________________________

{{s0.p1}}

{{s0.p2}}

{{s0.p3}}

_________________________________

![ico-30 cap] ** 1**

{{common.c186}}

~~~js
document.body.onclick = async () => {
  const module = await import('https://garevna.github.io/js-samples/js/index21.js')
}
~~~

{{s0.p5}}
^^{{common.c187}}^^

{{{dynamic-import-1.js}}}

____________________________________

![ico-30 cap] ** 2**

{{s0.p7}}

◘◘![ico-20 paper]◘◘

~~~js
const scriptPath = 'https://garevna.github.io/js-samples/js/index'

import(`${scriptFile}12.js`)
  .then(module => setTimeout(() => import(`${scriptPath}21.js`)))
  .then(setTimeout(() => import(`${scriptPath}22.js`), 10000))
~~~

^^{{common.c188}}^^

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

{{s0.p9}}

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

{{s0.p10}}

~~~js
const mod = document.body
  .appendChild(document.createElement('script'))
mod.type = 'module'
~~~

{{s0.p11}}

{{s0.p12}}

~~~js
mod.textContent = `
  import { showMessage } from './js/testESModules.js'
  showMessage('Hi, students! Welcome to new age of ES Modules!')
`
~~~

{{common.c189}}

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

{{s0.p14}}

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

{{s0.p15}}

~~~js
import { showMessage } from 'https://example.com/js/testESModules.js'
~~~

{{s0.p16}}

~~~js
import { showMessage } from './js/testESModules.js'
~~~

{{common.c190}}

________________________________________________________________________


[![ico-25 cap] **Live demo**](samples/25)

______________________________________________________________________
