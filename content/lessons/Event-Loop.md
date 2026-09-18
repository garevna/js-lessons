# ![ico-30 icon] Event Loop

## ![ico-25 icon] {{p1}}

{{p2}}

{{p3}}

{{p4}}

^^^[{{p5}}]
{{p6}}
{{p7}}
{{p8}}
{{p9}}

{{p10}}

{{p11}}

{{p12}}

^^^

{{p13}}

^^^[Stack]
{{p14}}
{{p15}}
{{p16}}
{{p17}}
{{p18}}
^^^

{{p19}}

^^^[Heap]
{{p20}}

{{p21}}

{{p22}}

{{p23}}
^^^

{{p24}}

____________________________________

## ![ico-25 icon] {{p25}}

☼☼☼ {{p26}} ☼☼☼

{{p27}}

{{p28}}

{{p29}}
{{p30}}

{{p31}}

@@@@
{{p32}}
![](illustrations/async-fynny-02.gif)
@@@@

{{p33}}

## ![ico-25 icon] Event-Driven Programming

{{p34}}
{{p35}}

{{p36}}
{{p37}}
{{p38}}

{{p39}}

{{p40}}

[%%%MDN%%%](external/mdn-event-loop)

________________________________________

## ![ico-25 icon] Callback

{{p41}}
{{p42}}
{{p43}}
{{p44}}

@@@@ 1
![](illustrations/event-loop-01.png)
@@@@

{{p45}}

{{p46}}

{{p47}}
{{p48}}
{{p49}}

{{p50}}

{{p51}}

@@@@ 1
![](illustrations/event-loop-script.png)
@@@@

{{p52}}
{{p53}}
{{p54}}
{{p55}}
----------------------------
@@@@ 1
![](illustrations/event-loop-02.png)
@@@@

{{p56}}
----------------------------
@@@@ 1
![](illustrations/event-loop-03.png)
@@@@

{{p57}}

{{p58}}
{{p59}}
{{p60}}
_________________________________________________

{{p61}}
{{p62}}
{{p63}}
{{p64}}
{{p65}}
{{p66}}
{{p67}}

@@@@ 1
![](illustrations/event-loop-04.png)
@@@@

{{p68}}
{{p69}}
{{p70}}

@@@@ 1
![](illustrations/event-loop-05.png)
@@@@

{{p71}}
{{p72}}
{{p73}}
{{p74}}

@@@@ 1
![](illustrations/event-loop-06.png)
@@@@

{{p75}}
{{p76}}
{{p77}}
{{p78}}

{{p79}}

{{p80}}
{{p81}}
{{p82}}

_____________________

@@@@
![](slogans/funcs-rule.svg)
{{p83}}
@@@@

☼☼☼ {{p84}} ☼☼☼

___________________________________________

## ![ico-25 icon] Event API

@@@@ 3
{{p85}}
![](illustrations/js-engine.png)
{{p86}}
@@@@

{{p87}}

@@@@
{{p88}}
![](illustrations/web-api.png)
@@@@

{{p89}}

{{p90}}
{{p91}}
{{p92}}
{{p93}}
{{p94}}
{{p95}}
{{p96}}

◘◘![ico-20 cap] ** 1**◘◘
~~~js
const start = Date.now()
const timer = (time = 0) => setTimeout(() => console.log(Date.now() - start), time)
let counter = 0
do {
  timer(500)
} while (counter++ < 10000)
~~~

{{{event-loop-01.js}}}

{{p97}}
{{p98}}

__________________________________________

## ![ico-25 icon] {{p99}}

{{p100}}
{{p101}}

@@@@
![](illustrations/event-loop-queue.png)
{{p102}}
{{p103}}
{{p104}}
@@@@

{{p105}}
{{p106}}

◘◘![ico-20 cap] ** 2**◘◘

~~~js
function message (text) {
  document.body.innerHTML += `<small>${text}</small><br>`
}

let start = new Date().getTime()

setTimeout(() => message(`Timer real time: ${new Date().getTime()-start} ms` ), 0)

for (var x = 0; x < 1000000000; x++) continue

message('Loop \'for\' finished')
~~~

{{p107}}
{{p108}}

{{{Event-Loop-1.js}}}

__________________________________________________________

{{p109}}

◘◘![ico-20 cap] **createFigure**◘◘
~~~js
function createFigure () {
  const figure = section
    .appendChild(document.createElement('div'))
  return Object.assign(figure, {
    style: `
      position: absolute;
      top: 108px;
      left: 48px;
      width: 100px;
      height: 100px;
      border-radius: 4px;
      background: #fa0;
    `,
    move () {
      const { left } = figure.style
      Object.assign(figure.style, {
        left: parseInt(left) + 2 + 'px'
      })
      Date.now() - start < 5000 && requestAnimationFrame(figure.move)
    }
  })
}
~~~

◘◘![ico-20 cap] **message**◘◘
~~~js
function message (text) {
  document.body
    .appendChild(document.createElement('p'))
    .innerHTML = `${Date.now() - start}: ${text}`
}
~~~

{{p110}}

◘◘![ico-20 cap] ** 3**◘◘

~~~js
const start = Date.now()

const figure = createFigure()

message('Well, you\'re screwed, kid, now wait for the cycle to complete....')

figure.move()

setTimeout(function () {
  message('<b>Loop started</b>')
  for (var counter = 0; counter < 10000000000; counter++) continue
  message('<b>Loop finished</b>')
}, 0)
~~~

{{{Event-Loop-3.js}}}

{{p111}}

{{p112}}
{{p113}}
{{p114}}

____________________________________

{{p115}}

◘◘![ico-20 cap] ** 4**◘◘
~~~js
const section = document.body

const start = Date.now()

const figure = createFigure()

figure.move()

const recurse = (counter => {
  message('<b>Loop started</b>')
  return function () {
    if (counter-- > 0) setTimeout(recurse)
    else message('<b>Loop finished</b>')
  }
})(1000)

recurse()
~~~

{{{Event-Loop-4.js}}}

{{p116}}
{{p117}}
{{p118}}

{{p119}}
______________________________

## ![ico-25 icon] Microtask

☼☼☼ {{p120}} ☼☼☼

{{p121}}

{{p122}}
{{p123}}
{{p124}}

◘◘![ico-20 cap] ** 5**◘◘
~~~js
const start = Date.now()

function message (text) {
  document.body.innerHTML += `<p>${Date.now() - start}: ${text}</p>`
}

const promise = text => new Promise(resolve => resolve(text))

message('Start')

setTimeout(message.bind(null, 'First macrotask'))
setTimeout(message.bind(null, 'Second macrotask'))
setTimeout(message.bind(null, 'Third macrotask'))

promise('First microtask').then(message)
promise('Second microtask').then(message)
promise('Third microtask').then(message)
~~~

{{{event-loop-microtask.js}}}

{{p125}}
{{p126}}

{{p127}}

{{p128}}
{{p129}}
{{p130}}

{{p131}}

![](illustrations/event-loop-micro-task.gif)

☼☼☼ {{p132}} ☼☼☼

________________________________________

{{p133}}

{{p134}}

{{p135}}

{{p136}}

{{p137}}

{{p138}}
{{p139}}
{{p140}}

◘◘![ico-20 cap] ** 6**◘◘

~~~js
const start = Date.now()

function message (text) {
  document.body.innerHTML += `<p>${Date.now() - start}: ${text}</p>`
}

const timer = ms => setTimeout(() => setTimeout(message.bind(null, `timeout ${ms}`), 0), ms)

function getUser () {
  const since = Math.round(Math.random() * 20000)
  const index = Math.round(Math.random() * 30)
  return fetch(`https://api.github.com/users?since=${since}`)
    .then(response => response.json())
    .then(users => message(`github user ${since + index}: ${users[index].login}`))
}

message('start')

timer(1000)
timer(500)
timer(400)
timer(200)

getUser()
getUser()
getUser()
~~~

{{{Event-Loop-6.js}}}

{{p141}}
{{p142}}
{{p143}}

{{p144}}

{{p145}}

________________________________________________
