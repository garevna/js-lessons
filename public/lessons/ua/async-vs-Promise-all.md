## ![ico-25 icon] async function vs Promise.all

![ico-20 warn] Синхронізація асинхронних процесів призводить до збільшення загального часу їх виконання

![ico-25 cap] **Приклад 1**

^^Припустимо, є дві функції, які повертають промис:^^

~~~js
const getNames = () => new Promise(resolve => setTimeout(() => resolve('Names'), 1000))

const getPosts = () => new Promise(resolve => setTimeout(() => resolve('Posts'), 1000))
~~~

^^Кожен виклик триває 1 секунду^^

^^Якщо ми будемо використовувати асинхронну функцію для послідовного виклику **getNames** та **getPosts**, то сумарна тривалість виконання цих двох асинхронних операцій становитиме не менше 2 секунд^^

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

^^Що в цьому поганого?^^

^^Те, що непов’язані між собою асинхронні процеси стають у чергу^^

^^Розглянемо альтернативний варіант^^

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

![ico-25 cap] **Приклад 2**

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

^^Функція  **getData()**  повертає проміс^^

^^Проміс буде вирішений через 1 секунду^^

^^Функція  **getAllData()** формує  масив промісів  **promises** і запускає одразу всі асинхронні процеси за допомогою методу  **_Promise.all ()_**^^

^^Що відбувається в цьому випадку:^^

^^Ми не формуємо чергу, а запускаємо відразу всі асинхронні процеси паралельно^^

^^Однак впорядкованість даних, що повертаються, контролює **_Promise.all ()_**^^

^^У масиві, що повертається, дані будуть впорядковані в тій послідовності, в якій впорядковані проміси в масиві промісів^^

^^У цьому випадку **_Promise.all ()_** є зручною альтернативою асинхронній функції^^

^^Загальна тривалість операції не буде сумою тривалості всіх асинхронних процесів^^

^^У цьому прикладі замість 3 секунд, які б знадобилися на виконання коду в разі послідовної обробки запитів, загальна тривалість склала 1 секунду^^

_______________________
※※※tests quiz/async※※※
