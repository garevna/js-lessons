# ![ico-30 icon] Event Loop

## ![ico-25 icon] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

^^^[{{s1.spoiler1}}]
{{s1.p4}}
{{s1.p5}}
{{s1.p6}}
{{s1.p7}}

{{s1.p8}}

{{s1.p9}}

{{s1.p10}}

^^^

{{s1.p11}}

^^^[Stack]
{{s1.p12}}
{{s1.p13}}
{{s1.p14}}
{{s1.p15}}
{{s1.p16}}
^^^

{{s1.p17}}

^^^[Heap]
{{s1.p18}}

{{s1.p19}}

{{s1.p20}}

{{s1.p21}}
^^^

{{s1.p22}}

____________________________________

## ![ico-25 icon] {{s2.h1}}

☼☼☼ {{s2.slogan1}} ☼☼☼

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}
{{s2.p4}}

{{s2.p5}}

@@@@
{{s2.p6}}
![](illustrations/async-fynny-02.gif)
@@@@

{{s2.p7}}

## ![ico-25 icon] Event-Driven Programming

{{s2.p8}}
{{s2.p9}}

{{s2.p10}}
{{s2.p11}}
{{s2.p12}}

{{s2.p13}}

{{s2.p14}}

[%%%MDN%%%](external/mdn-event-loop)

________________________________________

## ![ico-25 icon] Callback

{{s2.p15}}
{{s2.p16}}
{{s2.p17}}
{{s2.p18}}

@@@@ 1
![](illustrations/event-loop-01.png)
@@@@

{{s2.p19}}

{{s2.p20}}

{{s2.p21}}
{{s2.p22}}
{{s2.p23}}

{{s2.p24}}

{{s2.p25}}

@@@@ 1
![](illustrations/event-loop-script.png)
@@@@

{{s2.p26}}
{{s2.p27}}
{{s2.p28}}
{{s2.p29}}
----------------------------
@@@@ 1
![](illustrations/event-loop-02.png)
@@@@

{{s2.p30}}
----------------------------
@@@@ 1
![](illustrations/event-loop-03.png)
@@@@

{{s2.p31}}

{{s2.p32}}
{{s2.p33}}
{{s2.p34}}
_________________________________________________

{{s2.p35}}
{{s2.p36}}
{{s2.p37}}
{{s2.p38}}
{{s2.p39}}
{{s2.p40}}
{{s2.p41}}

@@@@ 1
![](illustrations/event-loop-04.png)
@@@@

{{s2.p42}}
{{s2.p43}}
{{s2.p44}}

@@@@ 1
![](illustrations/event-loop-05.png)
@@@@

{{s2.p45}}
{{s2.p46}}
{{s2.p47}}
{{s2.p48}}

@@@@ 1
![](illustrations/event-loop-06.png)
@@@@

{{s2.p49}}
{{s2.p50}}
{{s2.p51}}
{{s2.p52}}

{{s2.p53}}

{{s2.p54}}
{{s2.p55}}
{{s2.p56}}

_____________________

@@@@
![](images/funcs-rule.svg)
{{s2.p57}}
@@@@

☼☼☼ {{s2.slogan2}} ☼☼☼

___________________________________________

## ![ico-25 icon] Event API

@@@@ 3
{{s2.p58}}
![](illustrations/js-engine.png)
{{s2.p59}}
@@@@

{{s2.p60}}

@@@@
{{s2.p61}}
![](illustrations/web-api.png)
@@@@

{{s2.p62}}

{{s2.p63}}
{{s2.p64}}
{{s2.p65}}
{{s2.p66}}
{{s2.p67}}
{{s2.p68}}
{{s2.p69}}

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

{{s2.p70}}
{{s2.p71}}

__________________________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}
{{s3.p2}}

@@@@
![](illustrations/event-loop-queue.png)
{{s3.p3}}
{{s3.p4}}
{{s3.p5}}
@@@@

{{s3.p6}}
{{s3.p7}}

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

{{s3.p8}}
{{s3.p9}}

{{{Event-Loop-1.js}}}

__________________________________________________________

{{s3.p10}}

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

{{s3.p11}}

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

{{s3.p12}}

{{s3.p13}}
{{s3.p14}}
{{s3.p15}}

____________________________________

{{s3.p16}}

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

{{s3.p17}}
{{s3.p18}}
{{s3.p19}}

{{s3.p20}}
______________________________

## ![ico-25 icon] Microtask

☼☼☼ {{s3.slogan1}} ☼☼☼

{{s3.p21}}

{{s3.p22}}
{{s3.p23}}
{{s3.p24}}

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

{{s3.p25}}
{{s3.p26}}

{{s3.p27}}

{{s3.p28}}
{{s3.p29}}
{{s3.p30}}

{{s3.p31}}

![](illustrations/event-loop-micro-task.gif)

☼☼☼ {{s3.slogan2}} ☼☼☼

________________________________________

{{s3.p32}}

{{s3.p33}}

{{s3.p34}}

{{s3.p35}}

{{s3.p36}}

{{s3.p37}}
{{s3.p38}}
{{s3.p39}}

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

{{s3.p40}}
{{s3.p41}}
{{s3.p42}}

{{s3.p43}}

{{s3.p44}}

________________________________________________
