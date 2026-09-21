## ![ico-25 icon] async function vs Promise.all

{{p1}}

![ico-25 cap] **{{common.c0}} 1**

{{p2}}

~~~js
const getNames = () => new Promise(resolve => setTimeout(() => resolve('Names'), 1000))

const getPosts = () => new Promise(resolve => setTimeout(() => resolve('Posts'), 1000))
~~~

{{p3}}

{{p4}}

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

~~~console

Names | Posts

time: 2002.258056640625ms

~~~

{{p5}}

{{p6}}

{{p7}}

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

{{p8}}

{{p9}}

{{p10}}

{{p11}}

{{p12}}

{{p13}}

{{p14}}

{{p15}}

{{p16}}

{{p17}}

_______________________
※※※tests quiz/async※※※
