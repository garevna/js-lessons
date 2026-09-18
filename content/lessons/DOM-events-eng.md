# ![ico-30 study] Document Object Model ( DOM )

## ![ico-25 icon] {{p1}}

{{p2}}

{{p3}}

{{p4}}

~~~js
console.dir(EventTarget)
~~~

{{p5}}

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

{{p6}}

• addEventListener
• removeEventListener
• dispatchEvent

{{p7}}
{{p8}}
{{p9}}

{{p10}}

{{p11}}

{{p12}}

{{p13}}

~~~js
for (var prop in HTMLElement.prototype) {
  if (prop.indexOf('on') !== 0) continue
  console.info(`Event: ${prop.slice(2)}`)
}
~~~

{{p14}}

{{p15}}

{{p16}}


<img src="https://github.com/garevna/js-course/blob/master/pictures/event-1.png?raw=true" width="300"/>

__________________________________________________________________

![ico-25 cap] **DOMNodeInserted**

~~~js
document.body.ondomnodeinserted = function (event) {
  console.log(event)
}

document.body.appendChild(document.createElement('div'))
~~~

**{{common.c4}}**

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

{{p17}}

{{p18}}

{{p19}}

^^^[event type]

![ico-20 green-ok] click
![ico-20 green-ok] mouseover
![ico-20 green-ok] mouseout
![ico-20 green-ok] mouseenter
![ico-20 green-ok] mouseleave
![ico-20 green-ok] mousedown
![ico-20 green-ok] mouseup
![ico-20 green-ok] keydown
![ico-20 green-ok] keyup
**...**

^^^

{{p20}}

{{p21}}

{{p22}}

{{p23}}

{{p24}}
{{p25}}
{{p26}}
{{p27}}
{{p28}}

{{p29}}
{{p30}}

◘◘![ico-25 cap] target & eventPhase◘◘

~~~js
var pictures = [
  'images/hong-kong-1990268__340.jpg',
  'images/dancing-cat.gif',
  'images/PAY-MATING-BUGS.avif',
  'images/prague-3010407__340.jpg'
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

{{p31}}

[%%%DOM event%%%](https://www.w3schools.com/jsref/dom_obj_event.asp)
[%%%JS event%%%](https://www.w3schools.com/js/js_events.asp)

_________________________________________

## ![ico-25 icon] {{p32}}

{{p33}}

{{p34}}

~~~js
var userEvent = new Event( 'user' )
~~~

___________________________________

## ![ico-25 icon] dispatchEvent

{{p35}}

◘◘![ico-25 cap] **dispatchEvent**◘◘

~~~js
document.body.onclick = function (event) {
  this.style.backgroundColor = '#fa0'
}
document.body.dispatchEvent(new Event('click'))
~~~

_________________________________

## ![ico-25 icon] CustomEvent

{{p36}}

◘◘![ico-25 cap] **CustomEvent**◘◘

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

## ![ico-25 icon] event handler

{{p37}}

{{p38}}

{{p39}}

{{p40}}

{{p41}}

{{p42}}

{{p43}}

~~~js
elem.onclick = function (event) { ... }
elem.onmouseover = function (ev) { ... }
~~~

{{p44}}

_________________________________________

### ![ico-20 icon] event.screenX &#124; event.screenY

{{p45}}

_________________________________________________

### ![ico-20 icon] event.clientX &#124; event.clientY

{{p46}}
( **_viewport_** )

{{p47}}

{{p48}}

_______________________________

### ![ico-20 icon] event.pageX &#124; event.pageY

{{p49}}

{{p50}}

_________________________

### ![ico-20 icon] eventPhase

[:::eventPhase:::](https://jsfiddle.net/garevna/1cL6nk8j/4/)

____________________________

## ![ico-25 icon] eventListener

<img src="https://github.com/garevna/js-course/blob/master/pictures/event-2.png?raw=true" width="400"/>

{{p51}}

![ico-20 green-ok] addEventListener
![ico-20 green-ok] removeEventListener

{{p52}}

{{p53}}

{{p54}}

{{p55}}

{{p56}}

_________________________________________________________________

## ![ico-25 icon] addEventListener

{{p57}}
^^• mouseover<br>• mouseout<br>• input<br>• change<br>**...**^^

{{p58}}

_______________________

◘◘![ico-25 cap] ** 1**◘◘

~~~js
document.getElementById('sample')
  .addEventListener('click', function (event) {
    console.log('sample click event:\n', event)
  })
~~~

______________________________

◘◘![ico-25 cap] ** 2**◘◘

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

{{p59}}

_____________________________

◘◘![ico-25 cap] ** 3**◘◘

~~~js
var btn = document.createElement('button')
btn.innerText = 'OK'
btn.style = `
  background-image: url(images/User_Yuppie_2.png);
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

### ![ico-20 icon] preventDefault()

{{p60}}

{{p61}}

{{p62}}

{{p63}}

_______________________

◘◘![ico-25 cap] ** 4**◘◘

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

### ![ico-20 icon] stopPropagation()

{{p64}}

{{p65}}

__________________

{{p66}}

◘◘![ico-25 cap] ** 5**◘◘

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

{{p67}}

~~~js
event.stopPropagation()
~~~

{{p68}}

____________________________________

### ![ico-20 icon] stopImmediatePropagation()

{{p69}}

{{p70}}

_______________________

{{p71}}

◘◘![ico-25 cap] ** 6**◘◘

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

{{p72}}

{{p73}}

~~~js
event.stopImmediatePropagation()
~~~

{{p74}}

____________________________________________

## ![ico-25 icon] removeEventListener

{{p75}}

{{p76}}
{{p77}}
{{p78}}

{{p79}}

{{p80}}
{{p81}}
{{p82}}

___________________

{{p83}}

◘◘![ico-25 cap] ** 7**◘◘

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

{{p84}}

◘◘![ico-25 cap] ** 8**◘◘

~~~js
function clickHandler (event) {
  this.innerHTML = '<small>My content was changed!</small>'
}
elem.addEventListener('click', clickHandler)
elem.removeEventListener('click', clickHandler)
~~~

_________________________

![ico-25 cap] ** 9**

^^^[{{common.c17}}]

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

^^^[{{p85}}]

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

{{p86}}
{{p87}}
{{p88}}
{{p89}}

◘◘![ico-25 cap] ** 9**◘◘

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

{{p90}}

[:::mouseover & mouseout:::](https://codepen.io/garevna/pen/jLrReP?editors=1010)

[:::mouseenter & mouseleave:::](https://codepen.io/garevna/pen/gxaOXq)

[:::onscroll &#124; onwheel:::](https://jsfiddle.net/garevna/ayoLy5eL/1/)

[:::keypress vs keydown:::](https://codepen.io/garevna/pen/PKPQVR)

[:::dispatchEvent:::](https://codepen.io/garevna/pen/gxpQvy)

_____________________________________________

※※※exercises ⟦f22⟧※※※

___________________________

[%%%W3S%%% ](https://www.w3schools.com/js/js_htmldom_eventlistener.asp)
