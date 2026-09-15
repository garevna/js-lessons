# ![ico-30 study] {{s1.h1}}

[%%%**export**%%%](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/export)
[%%%**import**%%%](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/import)

_______________________________________

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

## ![ico-25 icon] export

_______________________________________________________________

### ![ico-20 icon] {{s2.h1}}

{{s2.p1}}

◘◘![ico-20 file] lib.js◘◘

~~~js
export const sqrt = Math.sqrt

export function buildElement (tagName, container = document.body) {
  return container.appendChild(document.createElement(tagName)) 
}

export function elemExist (elemSelector) {
  return !!document.querySelector(elemSelector)
}
~~~

________________________________________________________________

### ![ico-20 icon] {{s3.h1}}

{{s3.p1}}
{{s3.p2}}

◘◘![ico-20 file] Sample.js◘◘

~~~js
const Sample = function (tagName) {
  this.elem = document.body
    .appendChild(document.createElement(tagName)) 
}

Object.assign(Sample.prototype, {
  getAttrs: function () {
    return Object.getOwnPropertyNames(this.elem)
  },
  
  setAttr: function (attr, val) {
    this.elem[attr] = val
  },
  
  setStyle = function (css_attr, val) {
    this.elem.style[css_attr] = val
  }
})

export default Sample
~~~

____________________________________________________________

## ![ico-25 icon] import

{{s3.p3}}

### ![ico-20 icon] {{s4.h1}}
 
{{s4.p1}}
{{s4.p2}}
{{s4.p3}}

◘◘![ico-20 file] main.js:◘◘

~~~js
import { buildElement, elemExist } from 'lib'

// Теперь можно использовать функции **_buildElement_**  и  **_elemExist_**:

const picture = Object.assign(buildElement('img'), {
  src: 'http://cs5-2.4pda.to/8853638.gif'
})

console.log(elemExist(picture.tagName))
~~~

{{s4.p4}}

◘◘![ico-20 file] main.js:◘◘

~~~js
import * as lib from 'lib'

// Тогда вызов функций **_buildElement_**  и  **_elemExist_** будет несколько иным:

var picture = Object.assign(lib.buildElement('img'), {
  src: 'http://cs5-2.4pda.to/8853638.gif'
})

console.log(lib.elemExist(picture.tagName))
~~~



### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}

~~~js
import Sample from 'Sample'
const sample = new Sample()
~~~

__________________________________________________________________________


## ![ico-25 hw] {{common.c3}} 2

{{s6.p1}}

◘◘![ico-20 file] promise.js◘◘

~~~js
var promise = new Promise(function (resolve, reject) {
  document.write('Wait, pease...<br>')
  setTimeout(() => resolve('OK, you are here ?'), 2000)
})

export default promise
~~~

◘◘![ico-20 file] index.js◘◘

~~~js
import promise from './promise.js'

promise.then(response => document.querySelector('.sampleClass').innerText += response)
~~~

{{s6.p2}}

![](https://lh5.googleusercontent.com/zhM1TwRySgAAGrg8ts-n8mvlACifQXHzQudaUs37ce45AtHM9VjMa8CswyohFhG0y9p9sV15jw_rqV8hyOMGX62y5o829hATXLXNLPEN8h779mjS2yC140CdCuwFMvqYGhcu-b9lD1lvquQ)

{{s6.p3}}

_______________________________________________________

## ![ico-25 icon] Dynamic import 

**ES10 ( 2019 )**

{{s6.p4}}

{{s6.p5}}

{{s6.p6}}

◘◘![ico-20 cap] ** 1**◘◘

~~~js
document.body.onclick = async () => {
  const module = await import('https://garevna.github.io/js-samples/js/index14.js')
}
~~~

{{s6.p7}}

{{s6.p8}}

^^Next demo will show result only once^^

{{{webpack-es-modules-1.js}}}

__________________

{{s6.p9}}

◘◘![ico-20 cap] ** 2**◘◘

~~~js
const scriptFile = 'https://garevna.github.io/js-samples/js/index'

import(`${scriptFile}12.js`)
  .then(() => setTimeout(() => import(`${scriptFile}21.js`), 10000))
  .then(() => setTimeout(() => import(`${scriptFile}22.js`), 10000))
~~~

{{s6.p10}}

◘◘![ico-20 cap] **2(1)**◘◘

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

____________________________________________

{{s6.p11}}



◘◘![ico-20 cap] ** 3** ( index.html )◘◘

~~~html
&lt;!DOCTYPE html>
&lt;html>
&lt;head>
    &lt;meta charset="utf-8">
    &lt;title>ES Modules&lt;/title>
&lt;/head>

&lt;body>
    &lt;script src = "js/index.js">&lt;/script>
&lt;/body>

&lt;/html>
~~~

{{s6.p12}}

~~~js
const mod = document.body
  .appendChild(document.createElement('script'))
mod.type = 'module'
~~~

{{s6.p13}}

{{s6.p14}}

~~~js
mod.textContent = `
  import {showMessage} from './js/testESModules.js';
  showMessage('Hi, students! Welcome to new age of ES Modules!')
`
~~~

{{s6.p15}}

◘◘![ico-20 cap] ** 3** (js/index.js)◘◘

~~~js
const mod = document.body
  .appendChild(document.createElement('script'))
mod.type = 'module'
mod.textContent = `
  import {showMessage} from './js/testESModules.js'
  showMessage('Hi, students! Welcome to new age of ES Modules!')
`
~~~js

Именованый экспорт в файле _~js/testESModules.js~_

◘◘![ico-20 cap] ** 3** ( js/testESModules.js )◘◘

~~~js
export function showMessage (message) {
  const demo = document.createElement('div')
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
  document.body.appendChild(demo)
  demo.innerHTML = `
    <h2 style='color: #789'>Module was successfully imported</h2>
    <p style='color: #fa0'>Now you can see how it works :)</p>
    <hr>
    <p style='color: #dde'>${message}</p>
  `
  setTimeout(() => document.body.removeChild(demo), 10000)
}
~~~

{{s6.p16}}

~~~js
import { showMessage } from 'https://example.com/js/testESModules.js'
~~~

{{s6.p17}}

~~~js
import { showMessage } from './js/testESModules.js'
~~~

{{s6.p18}}


[:::Live demo:::](https://garevna.github.io/js-samples/#25)
