## ![ico-25 icon] async function vs Promise.all

![ico-20 warn] Синхронизация асинхронных процессов приводит к увеличению суммарного времени их выполнения

![ico-25 cap] **Пример 1**

^^Предположим, есть две функции, возвращающие промис:^^

~~~js
const getNames = () => new Promise(resolve => setTimeout(() => resolve('Names'), 1000))

const getPosts = () => new Promise(resolve => setTimeout(() => resolve('Posts'), 1000))
~~~

^^Каждый вызов длится 1 секунду^^

^^Если мы будем использовать асинхронную функцию для последовательного вызова **getNames** и **getPosts**, то суммарная продолжительность выполнения этих двух асинхронных операций составит не менее 2 сек^^

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

**Результат в консоли**

~~~console

Names | Posts

time: 2002.258056640625ms

~~~

^^Что плохо?^^

^^То, что несвязанные между собой асинхронные процессы выстраиваются в очередь^^

^^Посмотрим на альтернативный вариант^^

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

**Результат в консоли**

~~~console

Names | Posts

time: 1001.474365234375ms

~~~

_________________________________

![ico-25 cap] **Пример 2**

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

^^Функция  **getData()**  возвращает промис^^

^^Промис будет разрешен через 1 сек^^

^^Функция  **getAllData()** формирует  массив промисов  **promises** и запускает сразу все асинхронные процессы с помощью метода  **_Promise.all ()_**^^

^^Что происходит в этом случае:^^

^^Мы не выстраиваем очередь, а запускаем сразу все асинхронные процессы параллельно^^

^^Однако упорядоченность возвращаемых данных контролирует **_Promise.all ()_**^^

^^В возвращаемом массиве данные будут упорядочены в той последовательности, в которой упорядочены промисы в массиве промисов^^

^^В этом случае **_Promise.all ()_** является удобной альтернативой асинхронной функции^^

^^Общая продолжительность операции не будет суммой продолжительности всех асинхронных процессов^^

^^В этом примере вместо 3 секунд, которые выполнялся бы код в случае последовательной обработки запросов, общая продолжительность составила 1 сек^^

_______________________
[![ico-30 hw] Тесты](quiz/async )
