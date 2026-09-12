# ![ico-25 study] {{s1.h1}}

{{s1.p1}}

__________________________________________________

{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

_________________________________

{{s1.p5}}

{{s1.p6}}

~~~js
document.body.onclick = async () => {
  const module = await import('https://garevna.github.io/js-samples/js/index21.js')
}
~~~

{{s1.p7}}
{{s1.p8}}

{{{dynamic-import-1.js}}}

____________________________________

{{s1.p9}}

{{s1.p10}}

{{s1.p11}}

~~~js
const scriptPath = 'https://garevna.github.io/js-samples/js/index'

import(`${scriptFile}12.js`)
  .then(module => setTimeout(() => import(`${scriptPath}21.js`)))
  .then(setTimeout(() => import(`${scriptPath}22.js`), 10000))
~~~

{{s1.p12}}

{{s1.p13}}

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

{{s1.p14}}

{{s1.p15}}

{{s1.p16}}

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

{{s1.p17}}

~~~js
const mod = document.body
  .appendChild(document.createElement('script'))
mod.type = 'module'
~~~

{{s1.p18}}

{{s1.p19}}

~~~js
mod.textContent = `
  import { showMessage } from './js/testESModules.js'
  showMessage('Hi, students! Welcome to new age of ES Modules!')
`
~~~

{{s1.p20}}

{{s1.p21}}

~~~js
const mod = document.body
  .appendChild(document.createElement('script'))

mod.type = 'module'

mod.textContent = `
  import { showMessage } from './js/testESModules.js'
  showMessage('Hi, students! Welcome to new age of ES Modules!')
`
~~~

{{s1.p22}}

{{s1.p23}}

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

{{s1.p24}}

~~~js
import { showMessage } from 'https://example.com/js/testESModules.js'
~~~

{{s1.p25}}

~~~js
import { showMessage } from './js/testESModules.js'
~~~

{{s1.p26}}

________________________________________________________________________


{{s1.p27}}

______________________________________________________________________
