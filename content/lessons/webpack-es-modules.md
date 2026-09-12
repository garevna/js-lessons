# ![ico-30 study] {{s1.h1}}

{{s1.p1}}
{{s1.p2}}

_______________________________________

{{s1.p3}}

{{s1.p4}}

{{s1.p5}}

{{s1.p6}}

## ![ico-25 icon] {{s2.h1}}

_______________________________________________________________

### ![ico-20 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

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

### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}
{{s4.p2}}

{{s4.p3}}

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

## ![ico-25 icon] {{s5.h1}}

{{s5.p1}}

### ![ico-20 icon] {{s6.h1}}
 
{{s6.p1}}
{{s6.p2}}
{{s6.p3}}

{{s6.p4}}

~~~js
import { buildElement, elemExist } from 'lib'

// Теперь можно использовать функции **_buildElement_**  и  **_elemExist_**:

const picture = Object.assign(buildElement('img'), {
  src: 'http://cs5-2.4pda.to/8853638.gif'
})

console.log(elemExist(picture.tagName))
~~~

{{s6.p5}}

{{s6.p6}}

~~~js
import * as lib from 'lib'

// Тогда вызов функций **_buildElement_**  и  **_elemExist_** будет несколько иным:

var picture = Object.assign(lib.buildElement('img'), {
  src: 'http://cs5-2.4pda.to/8853638.gif'
})

console.log(lib.elemExist(picture.tagName))
~~~



### ![ico-20 icon] {{s7.h1}}

{{s7.p1}}

~~~js
import Sample from 'Sample'
const sample = new Sample()
~~~

__________________________________________________________________________


## ![ico-25 hw] {{s8.h1}}

{{s8.p1}}

{{s8.p2}}

~~~js
var promise = new Promise(function (resolve, reject) {
  document.write('Wait, pease...<br>')
  setTimeout(() => resolve('OK, you are here ?'), 2000)
})

export default promise
~~~

{{s8.p3}}

~~~js
import promise from './promise.js'

promise.then(response => document.querySelector('.sampleClass').innerText += response)
~~~

{{s8.p4}}

![](https://lh5.googleusercontent.com/zhM1TwRySgAAGrg8ts-n8mvlACifQXHzQudaUs37ce45AtHM9VjMa8CswyohFhG0y9p9sV15jw_rqV8hyOMGX62y5o829hATXLXNLPEN8h779mjS2yC140CdCuwFMvqYGhcu-b9lD1lvquQ)

{{s8.p5}}

_______________________________________________________

## ![ico-25 icon] {{s9.h1}} 

{{s9.p1}}

{{s9.p2}}

{{s9.p3}}

{{s9.p4}}

{{s9.p5}}

~~~js
document.body.onclick = async () => {
  const module = await import('https://garevna.github.io/js-samples/js/index14.js')
}
~~~

{{s9.p6}}

{{s9.p7}}

{{s9.p8}}

{{{webpack-es-modules-1.js}}}

__________________

{{s9.p9}}

{{s9.p10}}

~~~js
const scriptFile = 'https://garevna.github.io/js-samples/js/index'

import(`${scriptFile}12.js`)
  .then(() => setTimeout(() => import(`${scriptFile}21.js`), 10000))
  .then(() => setTimeout(() => import(`${scriptFile}22.js`), 10000))
~~~

{{s9.p11}}

{{s9.p12}}

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

{{s9.p13}}



{{s9.p14}}

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

{{s9.p15}}

~~~js
const mod = document.body
  .appendChild(document.createElement('script'))
mod.type = 'module'
~~~

{{s9.p16}}

{{s9.p17}}

~~~js
mod.textContent = `
  import {showMessage} from './js/testESModules.js';
  showMessage('Hi, students! Welcome to new age of ES Modules!')
`
~~~

{{s9.p18}}

{{s9.p19}}

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

{{s9.p20}}

~~~js
import { showMessage } from 'https://example.com/js/testESModules.js'
~~~

{{s9.p21}}

~~~js
import { showMessage } from './js/testESModules.js'
~~~

{{s9.p22}}


{{s9.p23}}
