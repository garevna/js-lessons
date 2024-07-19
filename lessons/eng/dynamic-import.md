# ![ico-25 study] Dynamic import

**ES 2019**

__________________________________________________

Now we have a choice between static (**~import~**) and dynamic (**~import()~**) imports.

Dynamic import is represented by a new **~import()~** function that returns a promise.

![ico-25 warn] Strictly speaking, **~import()~** is not a function in the sense of inheriting from **~Function~**, it is not an object at all.

_________________________________

![ico-30 cap] ** 1**

Run the following code in the console:

~~~js
document.body.onclick = async () => {
  const module = await import('https://garevna.github.io/js-samples/js/index21.js')
}
~~~

^^![ico-20 speach] Notably, there is no **_~export~_** directive in the **_index21.js_**file.^^
^^However, the import worked, and the script ran.^^

{{{dynamic-import-1.js}}}

____________________________________

![ico-30 cap] ** 2**

^^In this example, the scripts are imported dynamically, sequentially, with a delay of a few seconds.^^

◘◘![ico-20 paper]◘◘

~~~js
const scriptPath = 'https://garevna.github.io/js-samples/js/index'

import(`${scriptFile}12.js`)
  .then(module => setTimeout(() => import(`${scriptPath}21.js`)))
  .then(setTimeout(() => import(`${scriptPath}22.js`), 10000))
~~~

^^Let's use an asynchronous function to simplify the code:^^

◘◘![ico-20 paper]◘◘

~~~js
const timeOut = timeInterval => new Promise(resolve => setTimeout(() => resolve(), timeInterval))

const scriptImports = async moduleFile => {
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

Suppose we include the script **~index.js~** in the markup:

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

The code in the file **~index.js~** creates an element ~&lt;script>~ with the attribute **~type="module"~** and inserts it into the page:

~~~js
const mod = document.body
  .appendChild(document.createElement('script'))
mod.type = 'module'
~~~

The ~&lt;script>~ element contains code that imports the **_~showMessage~_** function from the file **~js/testESModules.js~**

and calls it with the text "_Hi, students! Welcome to new age of ES Modules!_"

~~~js
mod.textContent = `
  import { showMessage } from './js/testESModules.js'
  showMessage('Hi, students! Welcome to new age of ES Modules!')
`
~~~

Full code:

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

Named export in file **~js/testESModules.js~**:

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

![ico-20 warn] When importing modules, you should specify either the full path:

~~~js
import { showMessage } from 'https://example.com/js/testESModules.js'
~~~

or a relative path starting with ~ /~, ~./~ or ~../~:

~~~js
import { showMessage } from './js/testESModules.js'
~~~

Otherwise the import will fail.

________________________________________________________________________


[![ico-25 cap] **Live demo**](samples/25)

______________________________________________________________________
