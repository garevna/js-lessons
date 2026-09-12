# ![ico-30 icon] {{s1.h1}}

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}

{{s2.p4}}
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
{{s2.p16}}
{{s2.p17}}
{{s2.p18}}
{{s2.p19}}
{{s2.p20}}

{{s2.p21}}

{{s2.p22}}
{{s2.p23}}

{{s2.p24}}

{{s2.p25}}

{{s2.p26}}
{{s2.p27}}

{{s2.p28}}

____________________________________

## ![ico-25 icon] {{s3.h1}}

☼☼☼ {{s3.slogan1}} ☼☼☼

{{s3.p1}}

{{s3.p2}}

{{s3.p3}}
{{s3.p4}}

{{s3.p5}}

{{s3.p6}}
{{s3.p7}}
![](illustrations/async-fynny-02.gif)
{{s3.p8}}

{{s3.p9}}

## ![ico-25 icon] {{s4.h1}}

{{s4.p1}}
{{s4.p2}}

{{s4.p3}}
{{s4.p4}}
{{s4.p5}}

{{s4.p6}}

{{s4.p7}}

{{s4.p8}}

________________________________________

## ![ico-25 icon] {{s5.h1}}

{{s5.p1}}
{{s5.p2}}
{{s5.p3}}
{{s5.p4}}

{{s5.p5}}
![](illustrations/event-loop-01.png)
{{s5.p6}}

{{s5.p7}}

{{s5.p8}}

{{s5.p9}}
{{s5.p10}}
{{s5.p11}}

{{s5.p12}}

{{s5.p13}}

{{s5.p14}}
![](illustrations/event-loop-script.png)
{{s5.p15}}

{{s5.p16}}
{{s5.p17}}
{{s5.p18}}
{{s5.p19}}
----------------------------
{{s5.p20}}
![](illustrations/event-loop-02.png)
{{s5.p21}}

{{s5.p22}}
----------------------------
{{s5.p23}}
![](illustrations/event-loop-03.png)
{{s5.p24}}

{{s5.p25}}

{{s5.p26}}
{{s5.p27}}
{{s5.p28}}
_________________________________________________

{{s5.p29}}
{{s5.p30}}
{{s5.p31}}
{{s5.p32}}
{{s5.p33}}
{{s5.p34}}
{{s5.p35}}

{{s5.p36}}
![](illustrations/event-loop-04.png)
{{s5.p37}}

{{s5.p38}}
{{s5.p39}}
{{s5.p40}}

{{s5.p41}}
![](illustrations/event-loop-05.png)
{{s5.p42}}

{{s5.p43}}
{{s5.p44}}
{{s5.p45}}
{{s5.p46}}

{{s5.p47}}
![](illustrations/event-loop-06.png)
{{s5.p48}}

{{s5.p49}}
{{s5.p50}}
{{s5.p51}}
{{s5.p52}}

{{s5.p53}}

{{s5.p54}}
{{s5.p55}}
{{s5.p56}}

_____________________

{{s5.p57}}
![](images/funcs-rule.svg)
{{s5.p58}}
{{s5.p59}}

☼☼☼ {{s5.slogan1}} ☼☼☼

___________________________________________

## ![ico-25 icon] {{s6.h1}}

{{s6.p1}}
{{s6.p2}}
![](illustrations/js-engine.png)
{{s6.p3}}
{{s6.p4}}

{{s6.p5}}

{{s6.p6}}
{{s6.p7}}
![](illustrations/web-api.png)
{{s6.p8}}

{{s6.p9}}

{{s6.p10}}
{{s6.p11}}
{{s6.p12}}
{{s6.p13}}
{{s6.p14}}
{{s6.p15}}
{{s6.p16}}

{{s6.p17}}
~~~js
const start = Date.now()
const timer = (time = 0) => setTimeout(() => console.log(Date.now() - start), time)
let counter = 0
do {
  timer(500)
} while (counter++ < 10000)
~~~

{{{event-loop-01.js}}}

{{s6.p18}}
{{s6.p19}}

__________________________________________

## ![ico-25 icon] {{s7.h1}}

{{s7.p1}}
{{s7.p2}}

{{s7.p3}}
![](illustrations/event-loop-queue.png)
{{s7.p4}}
{{s7.p5}}
{{s7.p6}}
{{s7.p7}}

{{s7.p8}}
{{s7.p9}}

{{s7.p10}}

~~~js
function message (text) {
  document.body.innerHTML += `<small>${text}</small><br>`
}

let start = new Date().getTime()

setTimeout(() => message(`Timer real time: ${new Date().getTime()-start} ms` ), 0)

for (var x = 0; x < 1000000000; x++) continue

message('Loop \'for\' finished')
~~~

{{s7.p11}}
{{s7.p12}}

{{{Event-Loop-1.js}}}

__________________________________________________________

{{s7.p13}}

{{s7.p14}}
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

{{s7.p15}}
~~~js
function message (text) {
  document.body
    .appendChild(document.createElement('p'))
    .innerHTML = `${Date.now() - start}: ${text}`
}
~~~

{{s7.p16}}

{{s7.p17}}

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

{{s7.p18}}

{{s7.p19}}
{{s7.p20}}
{{s7.p21}}

____________________________________

{{s7.p22}}

{{s7.p23}}
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

{{s7.p24}}
{{s7.p25}}
{{s7.p26}}

{{s7.p27}}
______________________________

## ![ico-25 icon] {{s8.h1}}

☼☼☼ {{s8.slogan1}} ☼☼☼

{{s8.p1}}

{{s8.p2}}
{{s8.p3}}
{{s8.p4}}

{{s8.p5}}
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

{{s8.p6}}
{{s8.p7}}

{{s8.p8}}

{{s8.p9}}
{{s8.p10}}
{{s8.p11}}

{{s8.p12}}

![](illustrations/event-loop-micro-task.gif)

☼☼☼ {{s8.slogan2}} ☼☼☼

________________________________________

{{s8.p13}}

{{s8.p14}}

{{s8.p15}}

{{s8.p16}}

{{s8.p17}}

{{s8.p18}}
{{s8.p19}}
{{s8.p20}}

{{s8.p21}}

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

{{s8.p22}}
{{s8.p23}}
{{s8.p24}}

{{s8.p25}}

{{s8.p26}}

________________________________________________
