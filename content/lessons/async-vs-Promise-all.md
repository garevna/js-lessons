## ![ico-25 icon] async function vs Promise.all

{{s0.p1}}

![ico-25 cap] **{{common.c0}} 1**

{{s0.p3}}

~~~js
const getNames = () => new Promise(resolve => setTimeout(() => resolve('Names'), 1000))

const getPosts = () => new Promise(resolve => setTimeout(() => resolve('Posts'), 1000))
~~~

{{s0.p4}}

{{s0.p5}}

~~~js
async function getData () {
  console.time('time')
  const posts = await getPosts()
  const names = await getNames()
  console.timeEnd('time')
  console.info(`\n${ names } | ${ posts }\n\n`)
}

getData ()
~~~

**{{common.c20}}**

~~~console

Names | Posts

time: 2002.258056640625ms

~~~

{{s0.p7}}

{{s0.p8}}

{{s0.p9}}

~~~js
function getData () {
  console.time('time')
  Promise.all([getNames(), getPosts()])
    .then(result => {
      console.info(`\n${ result[0] } | ${ result[1] }\n\n`)
      console.timeEnd('time')
    })
}
~~~

**{{common.c20}}**

~~~console

Names | Posts

time: 1001.474365234375ms

~~~

_________________________________

![ico-25 cap] **{{common.c0}} 2**

~~~~js
function getData (typ) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      console.log('Promise resolved: ', typ)
      resolve(typ)
    }, 1000)
  })
}

function getAllData () {
  console.time('Total')
  const promises = Array.from(arguments).map(x => getData(x))
  Promise.all(promises)
    .then(response => {
      console.timeEnd('Total')
      console.log('response: ', response)
    })
}

getAllData('figures', 'colors', 'diameters')
~~~~

{{s0.p12}}

{{s0.p13}}

{{s0.p14}}

{{s0.p15}}

{{s0.p16}}

{{s0.p17}}

{{s0.p18}}

{{s0.p19}}

{{s0.p20}}

{{s0.p21}}

_______________________
{{common.c41}}
