# ![ico-30 study] Document Object Model (DOM)

## ![ico-25 icon] {{p1}}

@@@@

{{p2}}
![](slogans/object-constructor.svg)

@@@@

~~~js
console.dir(EventTarget)
~~~

{{p3}}

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
        ► [[Prototype]]: Object
    ► [[Prototype]]: ƒ ()
~~~~

{{p4}}

• addEventListener
• removeEventListener
• dispatchEvent

{{p5}}
{{p6}}
{{p7}}

{{p8}}

{{p9}}

{{p10}}

{{p11}}

~~~js
for (var prop in HTMLElement.prototype) {
  if (prop.indexOf('on') !== 0) continue
  console.info(`Event: ${prop.slice(2)}`)
}
~~~

{{p12}}

{{p13}}

{{p14}}

__________________________________________________________________

![ico-25 cap] **DOMNodeInserted**

~~~js
document.body.ondomnodeinserted = function (event) {
  console.log(event)
}

document.body.appendChild(document.createElement('div'))
~~~

**{{common.c1}}**

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
  ► [[Prototype]]: MutationEvent
~~~~

______________________________________________________

{{p15}}

{{p16}}

{{p17}}

^^^[event type]

^^![ico-20 green-ok] click^^
^^![ico-20 green-ok] mouseover^^
^^![ico-20 green-ok] mouseout^^
^^![ico-20 green-ok] mouseenter^^
^^![ico-20 green-ok] mouseleave^^
^^![ico-20 green-ok] mousedown^^
^^![ico-20 green-ok] mouseup^^
^^![ico-20 green-ok] keydown^^
^^![ico-20 green-ok] keyup^^
^^![ico-20 green-ok] scroll^^
^^![ico-20 green-ok] scroll^^
**...**

^^^

{{p18}}

![](illustrations/event-1.png)
{{p19}}

{{p20}}

{{p21}}

________________________

{{p22}}
{{p23}}
{{p24}}
{{p25}}
{{p26}}

{{p27}}
{{p28}}

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

{{p29}}

[HTML DOM Events](external/mdn-dom-events)
[JavaScript Events](external/w3-dom-events)

_________________________________________

## ![ico-25 icon] {{p30}}

{{p31}}

{{p32}}

~~~js
var userEvent = new Event('user')
~~~

___________________________________

## ![ico-25 icon] dispatchEvent

{{p33}}

◘◘![ico-25 cap] **dispatchEvent**◘◘

~~~js
document.body.onclick = function (event) {
  this.style.backgroundColor = '#fa0'
}
document.body.dispatchEvent(new Event('click'))
~~~

_________________________________

## ![ico-25 icon] CustomEvent

{{p34}}

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

{{p35}}

{{p36}}

{{p37}}

{{p38}}

{{p39}}

{{p40}}

{{p41}}

~~~js
elem.onclick = function (event) { ... }
elem.onmouseover = function (ev) { ... }
~~~

{{p42}}

_________________________________________

### ![ico-20 icon] event.screenX &#124; event.screenY

{{p43}}

_________________________________________________

### ![ico-20 icon] event.clientX &#124; event.clientY

{{p44}}

[:::clientX | clientY:::](external/clientX-clientY)

{{p45}}

_______________________________

### ![ico-20 icon] event.pageX &#124; event.pageY

{{p46}}

{{p47}}

_________________________

### ![ico-20 icon] eventPhase

[:::eventPhase:::](external/event-phase)

____________________________

## ![ico-25 icon] eventListener

{{p48}}
{{p49}}
{{p50}}
{{p51}}

![](illustrations/event-2.png)

{{p52}}

![ico-20 green-ok] addEventListener
![ico-20 green-ok] removeEventListener

{{p53}}

{{p54}}

{{p55}}

{{p56}}

{{p57}}

_________________________________________________________________

## ![ico-25 icon] addEventListener

{{p58}}
^^• mouseover<br>• mouseout<br>• input<br>• change<br>**...**^^

{{p59}}

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
var circle = document.body
  .appendChild(document.createElement('div'))
circle.style = `
  position: absolute;
  top: 64px;
  left: 64px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #09b;
  transition: all .5s;
`
circle.addEventListener('click', function (event) {
  event.target
    .style
    .background = Math.random() < 0.5 ? '#09b' : '#fa0'
})

circle.addEventListener('click', function (event) {
  event.target.style.top = Math.max(Math.random() * window.innerWidth - 200, 0)
  event.target.style.left = Math.max(Math.random() * window.innerHeight - 200, 0)
})
~~~

{{p60}}

{{{DOM-events-2.js}}}

_______________________

{{p61}}

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

{{{DOM-events-3.js}}}

_________________________________________________

### ![ico-20 icon] preventDefault()

{{p62}}

{{p63}}

{{p64}}

{{p65}}

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

{{p66}}

{{p67}}

__________________

{{p68}}

◘◘![ico-25 cap] ** 5**◘◘
~~~js
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
~~~

{{p69}}

~~~js
event.stopPropagation()
~~~

{{p70}}


____________________________________

### ![ico-20 icon] stopImmediatePropagation()

{{p71}}

{{p72}}

_______________________

{{p73}}

◘◘![ico-25 cap] ** 6**◘◘

~~~js
var elem = document.body
  .appendChild(document.createElement('p'))

elem.innerHTML = 'Click me, please'

var text = [
  'I\'m the first here, don\'t pay attention for the rest!',
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
~~~

{{p74}}

{{p75}}

~~~js
event.stopImmediatePropagation()
~~~

{{p76}}

____________________________________________

## ![ico-25 icon] removeEventListener

{{p77}}

{{p78}}
{{p79}}
{{p80}}

{{p81}}

{{p82}}
{{p83}}
{{p84}}

___________________

{{p85}}

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

{{p86}}

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

^^^[{{p87}}]

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

{{p88}}
{{p89}}
{{p90}}
{{p91}}

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

{{p92}}

[:::mouseover & mouseout:::](external/mouseover-mouseout)

[:::mouseenter & mouseleave:::](external/mouseenter-mouseleave)

[:::onscroll &#124; onwheel:::](external/onscroll-onwheel)

[:::keypress vs keydown:::](external/keypress-keydown)

[:::dispatchEvent:::](external/dispatch-event)

_____________________________________________

※※※exercises ⟦f24⟧※※※

___________________________

[![ico-30 link] eventListener](external/w3-event-listener)
