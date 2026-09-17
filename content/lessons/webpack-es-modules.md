# ![ico-30 study] {{p1}}

[%%%**export**%%%](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
[%%%**import**%%%](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

_______________________________________

{{p2}}

{{p3}}

{{p4}}

{{p5}}

## ![ico-25 icon] export

_______________________________________________________________

### ![ico-20 icon] {{p6}}

{{p7}}

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

### ![ico-20 icon] {{p8}}

{{p9}}
{{p10}}

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

{{p11}}

### ![ico-20 icon] {{p12}}
 
{{p13}}
{{p14}}
{{p15}}

◘◘![ico-20 file] main.js:◘◘

~~~js
import { buildElement, elemExist } from 'lib'

// Теперь можно использовать функции **_buildElement_**  и  **_elemExist_**:

const picture = Object.assign(buildElement('img'), {
  src: 'http://cs5-2.4pda.to/8853638.gif'
})

console.log(elemExist(picture.tagName))
~~~

{{p16}}

◘◘![ico-20 file] main.js:◘◘

~~~js
import * as lib from 'lib'

// Тогда вызов функций **_buildElement_**  и  **_elemExist_** будет несколько иным:

var picture = Object.assign(lib.buildElement('img'), {
  src: 'http://cs5-2.4pda.to/8853638.gif'
})

console.log(lib.elemExist(picture.tagName))
~~~



### ![ico-20 icon] {{p17}}

{{p18}}

~~~js
import Sample from 'Sample'
const sample = new Sample()
~~~

__________________________________________________________________________


## ![ico-25 hw] {{common.c3}} 2

{{p19}}

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

{{p20}}

![](https://lh5.googleusercontent.com/zhM1TwRySgAAGrg8ts-n8mvlACifQXHzQudaUs37ce45AtHM9VjMa8CswyohFhG0y9p9sV15jw_rqV8hyOMGX62y5o829hATXLXNLPEN8h779mjS2yC140CdCuwFMvqYGhcu-b9lD1lvquQ)

{{p21}}

_______________________________________________________

## ![ico-25 icon] Dynamic import 

**ES10 ( 2019 )**

{{p22}}

{{p23}}

{{p24}}

◘◘![ico-20 cap] ** 1**◘◘

~~~js
document.body.onclick = async () => {
  const module = await import('https://garevna.github.io/js-samples/js/index14.js')
}
~~~

{{p25}}

{{p26}}

^^Next demo will show result only once^^

{{{webpack-es-modules-1.js}}}

__________________

{{p27}}

◘◘![ico-20 cap] ** 2**◘◘

~~~js
const scriptFile = 'https://garevna.github.io/js-samples/js/index'

import(`${scriptFile}12.js`)
  .then(() => setTimeout(() => import(`${scriptFile}21.js`), 10000))
  .then(() => setTimeout(() => import(`${scriptFile}22.js`), 10000))
~~~

{{p28}}

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

{{p29}}



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

{{p30}}

~~~js
const mod = document.body
  .appendChild(document.createElement('script'))
mod.type = 'module'
~~~

{{p31}}

{{p32}}

~~~js
mod.textContent = `
  import {showMessage} from './js/testESModules.js';
  showMessage('Hi, students! Welcome to new age of ES Modules!')
`
~~~

{{p33}}

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

{{p34}}

~~~js
import { showMessage } from 'https://example.com/js/testESModules.js'
~~~

{{p35}}

~~~js
import { showMessage } from './js/testESModules.js'
~~~

{{p36}}


[:::Live demo:::](https://garevna.github.io/js-samples/#25)
