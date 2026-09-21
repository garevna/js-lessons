## ![ico-25 icon] async function vs Promise.all⟪async_function_vs_Promise.all⟫

![ico-20 warn] Synchronising asynchronous processes increases their total execution time

![ico-25 cap] **Example 1**

^^Let’s assume there are two functions that return a Promise:^^

~~~js
const getNames = () => new Promise(resolve => setTimeout(() => resolve('Names'), 1000))

const getPosts = () => new Promise(resolve => setTimeout(() => resolve('Posts'), 1000))
~~~

^^Each call takes 1 second^^

^^If we use an asynchronous function to call **getNames** and **getPosts** sequentially, the total execution time for these two asynchronous operations will be at least 2 seconds^^

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

^^What’s the problem?^^

^^The fact that unrelated asynchronous processes are queued up^^

^^Let’s look at an alternative^^

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

![ico-25 cap] **Example 2**

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

^^The **getData()** function returns a promise^^

^^The promise will resolve after 1 second^^

^^The **getAllData()** function creates an array of promises **promises** and runs all the asynchronous processes at once using the **_Promise.all()_** method^^

^^What happens in this case:^^

^^We do not queue the operations, but run all asynchronous processes in parallel immediately^^

^^However, the order of the returned data is controlled by **_Promise.all ()_**^^

^^In the returned array, the data will be ordered in the same sequence as the promises in the array of promises^^

^^In this case, **_Promise.all()_** is a convenient alternative to an asynchronous function^^

^^The total duration of the operation will not be the sum of the durations of all the asynchronous processes^^

^^In this example, instead of the 3 seconds it would have taken for the code to run if the requests had been processed sequentially, the total duration was 1 second^^

_______________________
※※※tests quiz/async※※※
