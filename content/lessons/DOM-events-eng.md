# ![ico-30 study] {{s1.h1}}

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}

~~~js
console.dir(EventTarget)
~~~

{{s2.p4}}

~~~~console

▼ ƒ EventTarget()
    arguments: null
    caller: null
    length: 0
    name: "EventTarget"
    ▼ prototype: EventTarget
        ► addEventListener: ƒ addEventListener()
        ► dispatchEvent: ƒ dispatchEvent()
        ► removeEventListener: ƒ removeEventListener()
        ► constructor: ƒ EventTarget()
          Symbol(Symbol.toStringTag): "EventTarget"
        ► __proto__: Object
    ► __proto__: ƒ ()
~~~~

{{s2.p5}}

{{s2.p6}}
{{s2.p7}}
{{s2.p8}}

{{s2.p9}}
{{s2.p10}}
{{s2.p11}}

{{s2.p12}}

{{s2.p13}}

{{s2.p14}}

{{s2.p15}}

~~~js
for (var prop in HTMLElement.prototype) {
  if (prop.indexOf('on') !== 0) continue
  console.info(`Event: ${prop.slice(2)}`)
}
~~~

{{s2.p16}}

{{s2.p17}}

{{s2.p18}}


<img src="https://github.com/garevna/js-course/blob/master/pictures/event-1.png?raw=true" width="300"/>

__________________________________________________________________

{{s2.p19}}

~~~js
document.body.ondomnodeinserted = function (event) {
  console.log(event)
}

document.body.appendChild(document.createElement('div'))
~~~

{{s2.p20}}

~~~~console

▼ MutationEvent {isTrusted: true, relatedNode: body, prevValue: "", newValue: "", attrName: "", …}
    attrChange: 0
    attrName: ""
    bubbles: true
    cancelBubble: false
    cancelable: false
    composed: false
    currentTarget: null
    defaultPrevented: false
    eventPhase: 0
    isTrusted: true
    newValue: ""
  ► path: (5) [div, body, html, document, Window]
    prevValue: ""
  ► relatedNode: body
    returnValue: true
  ► srcElement: div
  ► target: div
    timeStamp: 12720.100000005914
    type: "DOMNodeInserted"
  ► __proto__: MutationEvent
~~~~

______________________________________________________

{{s2.p21}}

{{s2.p22}}

{{s2.p23}}

^^^[{{s2.spoiler1}}]

{{s2.p24}}
{{s2.p25}}
{{s2.p26}}
{{s2.p27}}
{{s2.p28}}
{{s2.p29}}
{{s2.p30}}
{{s2.p31}}
{{s2.p32}}
**...**

^^^

{{s2.p33}}

{{s2.p34}}

{{s2.p35}}

{{s2.p36}}

{{s2.p37}}
{{s2.p38}}
{{s2.p39}}
{{s2.p40}}
{{s2.p41}}

{{s2.p42}}
{{s2.p43}}

{{s2.p44}}

~~~js
var pictures = [
  'https://www.insidescience.org/sites/default/files/5_heic1808a_crop.jpg',
  'https://gobelmont.ca/Portals/0/xBlog/uploads/2017/9/6/dancing-156041_960_720.png',
  'https://i2-prod.mirror.co.uk/incoming/article11840943.ece/ALTERNATES/s615/PAY-MATING-BUGS.jpg',
  'https://i.redd.it/otqqqga0ip211.jpg'
]

var divs = pictures.map(picture => {
  var div = document.body
    .appendChild(document.createElement('div'))
    div.style = `
      width: 200px;
      height: 100px;
      border: solid 1px gray;
    `
    div.onclick = function (event) {
      if (event.eventPhase === 3) this.firstChild.remove()
      else {
        var img = event.target
          .appendChild(document.createElement('img'))
        img.src = picture
        img.width = 200
      }
    }
    return div
})

~~~

{{{DOM-events-1.js}}}

_________________________________

{{s2.p45}}

{{s2.p46}}
{{s2.p47}}

_________________________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

~~~js
var userEvent = new Event( 'user' )
~~~

___________________________________

## ![ico-25 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

~~~js
document.body.onclick = function (event) {
  this.style.backgroundColor = '#fa0'
}
document.body.dispatchEvent(new Event('click'))
~~~

_________________________________

## ![ico-25 icon] {{s5.h1}}

{{s5.p1}}

{{s5.p2}}

~~~js
function addElement (tagName, container) {
  var _container = container && container.nodeType === 1
    ? container
    : document.body
  return _container.appendChild(document.createElement(tagName))
}

var obj = addElement('h1')

obj.innerText = 'Hi'

obj.addEventListener('listen', listenHandler)

function listenHandler (event) {
  this.innerText = event.detail
}

var btn = addElement('button')
btn.innerText = 'Change'

btn.onclick = function (event) {
  var inp = addElement('input')
  inp.onchange = function (event) {
    obj.dispatchEvent(new CustomEvent('listen', {
      detail: this.value
    }))

    this.parentNode.removeChild(this)
  }
}
~~~

______________________________________

## ![ico-25 icon] {{s6.h1}}

{{s6.p1}}

{{s6.p2}}

{{s6.p3}}

{{s6.p4}}

{{s6.p5}}

{{s6.p6}}

{{s6.p7}}

~~~js
elem.onclick = function (event) { ... }
elem.onmouseover = function (ev) { ... }
~~~

{{s6.p8}}

_________________________________________

### ![ico-20 icon] {{s7.h1}}

{{s7.p1}}

_________________________________________________

### ![ico-20 icon] {{s8.h1}}

{{s8.p1}}
{{s8.p2}}

{{s8.p3}}

{{s8.p4}}

_______________________________

### ![ico-20 icon] {{s9.h1}}

{{s9.p1}}

{{s9.p2}}

_________________________

### ![ico-20 icon] {{s10.h1}}

{{s10.p1}}

____________________________

## ![ico-25 icon] {{s11.h1}}

<img src="https://github.com/garevna/js-course/blob/master/pictures/event-2.png?raw=true" width="400"/>

{{s11.p1}}

{{s11.p2}}
{{s11.p3}}

{{s11.p4}}

{{s11.p5}}

{{s11.p6}}

{{s11.p7}}

{{s11.p8}}

_________________________________________________________________

## ![ico-25 icon] {{s12.h1}}

{{s12.p1}}
{{s12.p2}}

{{s12.p3}}

_______________________

{{s12.p4}}

~~~js
document.getElementById('sample')
  .addEventListener('click', function (event) {
    console.log('sample click event:\n', event)
  })
~~~

______________________________

{{s12.p5}}

~~~js
var elem = document.body
  .appendChild(document.createElement('p'))

elem.innerText = 'Hello'

function clickdHandler (event) {
  this.innerHTML = `
    <small>
      My content was changed!
    </small>
  `
}
elem.addEventListener('click', clickdHandler)
~~~

{{s12.p6}}

_____________________________

{{s12.p7}}

~~~js
var btn = document.createElement('button')
btn.innerText = 'OK'
btn.style = `
  background-image: url(https://cdn2.iconfinder.com/data/icons/user-23/512/User_Yuppie_2.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left center;
  padding: 5px 10px 5px 30px;
`
document.body.appendChild(btn)

var callback = event => console.log(`target: ${event.currentTarget.tagName} eventPhase: ${event.eventPhase}`)

btn.addEventListener('click', callback, true)

document.body.addEventListener('click', callback, true)
~~~

{{{DOM-events-2.js}}}

_________________________________________________

### ![ico-20 icon] {{s13.h1}}

{{s13.p1}}

{{s13.p2}}

{{s13.p3}}

{{s13.p4}}

_______________________

{{s13.p5}}

~~~js
var elem = document.body
  .appendChild(document.createElement('a'))

elem.innerText = 'click me'

elem.href = 'https://www.w3schools.com/charsets/ref_utf_punctuation.asp'

elem.addEventListener('click', function (event) {
  event.preventDefault()
  alert(`href: ${this.href}`)
})
~~~

___________________________________

### ![ico-20 icon] {{s14.h1}}

{{s14.p1}}

{{s14.p2}}

__________________

{{s14.p3}}

{{s14.p4}}

~~~~js
var elemData = {
   name: 'div',
   attrs: {
     className: 'container',
     title: 'Контейнер',
     style: `
       position: absolute;
       top: 20px;
       left: 20px;
       border-radius: 50%;
       border: dotted 2px #789;
       background-color: #70ff9090;
     `
   }
}

function clickHandler (event) {
  // event.stopPropagation()
  console.info(this.num)
}

function insertElement (elemNum, parentElem = document.body) {
   var elem = parentElem
     .appendChild(document.createElement(elemData.name))
   elem.num = elemNum

   for (var attr in elemData.attrs) {
     elem[attr] = elemData.attrs[attr]
   }

   elem.style.width = `${400 - elemNum * 50}px`
   elem.style.height = `${400 - elemNum * 50}px`

   elem.addEventListener('click', clickHandler)

   return elem
}

var elems = []
elems [0] = insertElement(0)
for ( var x = 1; x < 5; x++ ) {
  elems [x] = insertElement(x, elems[x - 1])
}
~~~~

{{s14.p5}}

~~~js
event.stopPropagation()
~~~

{{s14.p6}}

____________________________________

### ![ico-20 icon] {{s15.h1}}

{{s15.p1}}

{{s15.p2}}

_______________________

{{s15.p3}}

{{s15.p4}}

~~~~js
var elem = document.body
  .appendChild(document.createElement('p'))

elem.innerHTML = 'Click me, please'

var text = [
  'Я тут первый, остальные на фиг!',
  'Hello',
  'are you happy?',
  'what is your favorite language?',
  'Bye'
]

for (var txt of text) {
  elem.addEventListener('click', (function (message) {
    return function () {
      // event.stopImmediatePropagation()
      elem.innerHTML += `<br />${message}`
    }
  })(txt))
}
~~~~

{{s15.p5}}

{{s15.p6}}

~~~js
event.stopImmediatePropagation()
~~~

{{s15.p7}}

____________________________________________

## ![ico-25 icon] {{s16.h1}}

{{s16.p1}}

{{s16.p2}}
{{s16.p3}}
{{s16.p4}}

{{s16.p5}}

{{s16.p6}}
{{s16.p7}}
{{s16.p8}}

___________________

{{s16.p9}}

{{s16.p10}}

~~~js
document.getElementById('sample')
  .addEventListener('click', function (event) {
    console.log('sample click event:\n', event)
  })

document.getElementById('sample')
  .removeEventListener('click', function (event) {
    console.log('sample click event: ', event)
  })
~~~

___________________________________

{{s16.p11}}

{{s16.p12}}

~~~js
function clickHandler (event) {
  this.innerHTML = '<small>My content was changed!</small>'
}
elem.addEventListener('click', clickHandler)
elem.removeEventListener('click', clickHandler)
~~~

_________________________

{{s16.p13}}

^^^[{{s16.spoiler1}}]

~~~html
<div id="main-frame" class="wrapper">
  <div id="main-content">
    <div id="main-message">
      <h1>Event Listener</h1>
      <p>Тестируем работу eventListener</p>
      <div id="list">
         <p>Что нужно помнить:</p>
         <ul class="single">
            <li>eventListener-ов нужно удалять</li>
            <li>Для этого есть метод removeEventListener</li>
         </ul>
      </div>
      <div class="error">Error was detected</div>
      <div id="diagnose">Печалька</div>
    </div>
  </div>
</div>

<div id="error">
  <p id="details">____________________</p>
</div>
~~~

^^^

^^^[{{s16.spoiler2}}]

~~~js
var collection = document.querySelectorAll('p &#126; *')

collection.forEach(x => {
  if (x.nodeType === 1) {
    x.addEventListener('mouseover', function (event) {
      var message = event.target.tagName + event.target.id
        ? '#' + event.target.id
        : event.target.className
          ? '.' + event.target.className
          : ' content: ' + event.target.innerHTML

      console.warn(message)
    })
  }
})

var elem = document.querySelector('#list')
elem.addEventListener('mouseover', function (event) {
  event.target.innerHTML = `event: ${new Date().toLocaleString()}`
})

function clickHandler (event) {
  this.innerHTML = '<small>My content was changed!</small>'
}

elem.addEventListener('click', clickHandler)
~~~

^^^

_______________________________________________________

{{s16.p14}}
{{s16.p15}}
{{s16.p16}}
{{s16.p17}}

{{s16.p18}}

~~~js
var elem = null

function bodyClickHandler (event) {
  if (elem) document.body.appendChild(elem)
  else {
    elem = document.body
      .appendChild(document.createElement('div'))

    elem.style = `
      padding: 20px;
      border: 2px solid #09b;
    `
    elem.onclick = function (event) {
      event.stopPropagation()
      elem = event.target.parentNode.removeChild(event.target)
      document.body.onclick = bodyClickHandler
    }

    elem.onmouseover = function (event) {
      event.target.style.borderColor = '#f50'
      event.target.innerText = 'Welcome!'
    }
    elem.onmouseout = function ( event ) {
      event.target.style.borderColor = '#09b'
      event.target.innerText = 'Bye!'
    }
  }
  document.body.onclick = null
}

document.body.onclick = bodyClickHandler
~~~

{{{DOM-events.js}}}

____________________________________________________________

{{s16.p19}}

{{s16.p20}}

{{s16.p21}}

{{s16.p22}}

{{s16.p23}}

{{s16.p24}}

_____________________________________________

{{s16.p25}}

___________________________

{{s16.p26}}
