## ![ico-25 icon] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

~~~js
const getNames = () => new Promise(resolve => setTimeout(() => resolve('Names'), 1000))

const getPosts = () => new Promise(resolve => setTimeout(() => resolve('Posts'), 1000))
~~~

{{s1.p4}}

{{s1.p5}}

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

{{s1.p6}}

~~~console

Names | Posts

time: 2002.258056640625ms

~~~

{{s1.p7}}

{{s1.p8}}

{{s1.p9}}

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

{{s1.p10}}

~~~console

Names | Posts

time: 1001.474365234375ms

~~~

_________________________________

{{s1.p11}}

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

{{s1.p12}}

{{s1.p13}}

{{s1.p14}}

{{s1.p15}}

{{s1.p16}}

{{s1.p17}}

{{s1.p18}}

{{s1.p19}}

{{s1.p20}}

{{s1.p21}}

_______________________
{{s1.p22}}
