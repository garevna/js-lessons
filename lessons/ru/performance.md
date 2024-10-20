# ![ico-30 study] Performance

Для оценки производительности приложения можно использовать встроенный в браузеры интерфейс **performance**

Этот интерфейс обеспечивает доступ к следующим API:
^^• **Performance Timeline API**^^
^^• **High Resolution Time API**^^
^^• **Navigation Timing API**^^
^^• **User Timing API**^^
^^• **Resource Timing API**^^

^^Если в консоли любой веб-страницы вывести объект **performance**, то можно увидеть примерно следующее:^^

^^^[performance]

~~~console
▼ Performance {timeOrigin: 1546006432906.767, onresourcetimingbufferfull: null, memory: MemoryInfo, navigation: PerformanceNavigation, timing: PerformanceTiming}
  ▼ memory: MemoryInfo
        jsHeapSizeLimit: 2217857988
        totalJSHeapSize: 33243136
        usedJSHeapSize: 19358120
      ► __proto__: MemoryInfo
  ► navigation: PerformanceNavigation {type: 0, redirectCount: 0}
    onresourcetimingbufferfull: null
    timeOrigin: 1546006432906.767
  ▼ timing: PerformanceTiming
        connectEnd: 1546006433378
        connectStart: 1546006432960
        domComplete: 1546006435228
        domContentLoadedEventEnd: 1546006434216
        domContentLoadedEventStart: 1546006434216
        domInteractive: 1546006434216
        domLoading: 1546006433576
        domainLookupEnd: 1546006432960
        domainLookupStart: 1546006432915
        fetchStart: 1546006432910
        loadEventEnd: 1546006435231
        loadEventStart: 1546006435228
        navigationStart: 1546006432906
        redirectEnd: 0
        redirectStart: 0
        requestStart: 1546006433379
        responseEnd: 1546006433563
        responseStart: 1546006433534
        secureConnectionStart: 1546006433015
        unloadEventEnd: 0
        unloadEventStart: 0
      ► __proto__: PerformanceTiming
  ► __proto__: Performance
~~~

^^^

^^При запуске страницы браузер создает объект **~performance~**, содержащий все временные характеристики процессов загрузки ресурсов и отрисовки страницы с использованием _времени высокой точности_ ( **UTC** )^^
^^( измеренное в миллисекундах с полуночи 1 января 1970 года )^^

^^Скрипт может получать данные ( ~getEntries()~, ~getEntriesByName()~, ~getEntriesByType()~ ) из этого буфера,^^
^^а так же динамически создавать и удалять кастомные временные метки ( ~mark~ ) и измерения ( ~measure~ )^^

_____________________________________________

## ![ico-25 icon] performance.timing

**^^Загрузка документа^^**

| **document.readyState**                                                                                                     | **performance.timing** |
| **~loading~** ^^( документ в процессе загрузки )^^                                                                          | **~domLoading~**         |
| **~interactive~** ^^( документ загружен и распарсен, но подключаемые ресурсы - стили, картинки и т.д. - еще загружаются )^^ | **~domInteractive~**     |
| **~complete~** ^^( документ полностью готов - инициируется событие load )^^                                                 | **~domComplete~**        |

~~~js
const { domComplete, domInteractive, domLoading } = performance.timing

console.log(domComplete - domInteractive)
console.log(domInteractive - domLoading)
~~~

_____________________________________________________

## ![ico-25 icon] Унаследованные методы performance

^^^[Performance.prototype]

~~~console
▼ Performance {now: ƒ, getEntries: ƒ, getEntriesByType: ƒ, …}
  ► clearMarks: ƒ clearMarks()
  ► clearMeasures: ƒ clearMeasures()
  ► clearResourceTimings: ƒ clearResourceTimings()
  ► getEntries: ƒ getEntries()
  ► getEntriesByName: ƒ getEntriesByName()
  ► getEntriesByType: ƒ getEntriesByType()
  ► mark: ƒ mark()
  ► measure: ƒ measure()
    memory: (...)
    navigation: (...)
  ► now: ƒ now()
    onresourcetimingbufferfull: (...)
  ► setResourceTimingBufferSize: ƒ setResourceTimingBufferSize()
    timeOrigin: (...)
    timing: (...)
  ► toJSON: ƒ toJSON()
  ► constructor: ƒ Performance()
    Symbol(Symbol.toStringTag): "Performance"
  ► get memory: ƒ memory()
  ► get navigation: ƒ navigation()
  ► get onresourcetimingbufferfull: ƒ onresourcetimingbufferfull()
  ► set onresourcetimingbufferfull: ƒ onresourcetimingbufferfull()
  ► get timeOrigin: ƒ timeOrigin()
  ► get timing: ƒ timing()
  ► __proto__: EventTarget
~~~

^^^

_______________________________________________________________

### ![ico-20 icon] now

Метод ~performance.now()~ позволяет получить текущее время высокой точности с момента начала отсчета

◘◘![ico-20 cap] ** 1**◘◘

~~~js
console.log(`Старт: ${performance.now()}`)
setTimeout(() => console.log(`Стоп: ${performance.now()}`), 2000)
~~~

◘◘^^Результат^^◘◘

~~~console
Старт: 207385.50000003306
Стоп: 209385.9999999986
~~~

Таким образом, точное время, которое прошло с момента первого вызова ~performance.now()~ до второго вызова этого метода, составляет

~~~console
209385.9999999986 - 207385.50000003306 = 2000.499999965541 (ms)
~~~

_______________________________________________________________

### ![ico-20 icon] mark

Установка временных меток

◘◘![ico-20 cap] ** 2**◘◘

~~~js
performance.mark('start')

for (let x = 0; x < 1000; x++) document.write(`${x}<br/>`)

performance.mark('end')

const items = window.performance.getEntriesByType('mark')

console.log(items)
~~~

◘◘^^Результат^^◘◘

~~~console
▼ (2) [PerformanceMark, PerformanceMark]
  ▼ 0: PerformanceMark
        duration: 0
        entryType: "mark"
        name: "start"
        startTime: 2677.5999999954365
      ► __proto__: PerformanceMark
  ▼ 1: PerformanceMark
        duration: 0
        entryType: "mark"
        name: "end"
        startTime: 2725.9000000049127
      ► __proto__: PerformanceMark
    length: 2
  ► __proto__: Array(0)
~~~

_______________________________________________________________

### ![ico-20 icon] measure

Измерение производительности

◘◘![ico-20 cap] ** 3**◘◘ 

~~~js
performance.mark('start1')

const elem = document.body
  .appendChild(document.createElement('img'))

elem.src = 'http://ogo.ua/images/articles/1567/big/1395958980.jpg'
elem.width = 200

performance.mark('end1')

performance.measure('insertElement', 'start1', 'end1')

performance.mark('start2')

document.body.innerHTML += `
  <img src="http://ogo.ua/images/articles/1567/big/1395958980.jpg" width="200" />
`

performance.mark('end2')

performance.measure('insertElement', 'start2', 'end2')

const measures = performance.getEntriesByName('insertElement')

console.log(`1: duration: ${measures[0].duration}ms`)
console.log(`2: duration: ${measures[1].duration}ms`)

performance.clearMarks()
performance.clearMeasures()
~~~

◘◘^^Результат^^◘◘

~~~console
1: duration: 0.20000000949949026ms
2: duration: 0.20000000949949026ms
~~~

Обратите внимание на методы

• clearMarks()
• clearMeasures()

_______________________________________________________________

### ![ico-20 icon] Entries

• getEntries()
• getEntriesByName()
• getEntriesByType()

С помощью этих методов можно получить массив объектов

Каждый такой объект имеет свойства **~entryType~** и **~name~**

Возможные значения этих свойств:

| entryType | name |
| **resource** | URL запрошенного ресурса |
| **mark** | имя метки, созданной с помощью **performance.mark** |
| **measure** | имя, использованное при вызове **performance.measure()** |
| **paint** | либо **first-paint**, либо **first-contentful-paint** |
| **frame**, **navigation** | URL документа |

_______________________________________________________________

#### ![ico-20 icon] getEntries

Этот метод вернет все объекты

• PerformanceResourceTiming
• PerformancePaintTiming
• PerformanceMark
• PerformanceMeasure

хранящие данные о временных характеристиках процессов, связанных:
• с получением ресурсов: экземпляр **~PerformanceResourceTiming~**
• с отрисовкой страницы: экземпляр **~PerformancePaintTiming~**

а так же:
• с маркерами, установленными с помощью метода **~performance.mark()~**: экземпляр **~PerformanceMark~**
• измерениями, созданными с помощью метода **~performance.measure()~**: экземпляр **~PerformanceMeasure~**

◘◘![ico-20 cap] ** 4**◘◘

~~~js
performance.mark('start')

const elem = document.body
  .appendChild(document.createElement('img'))

elem.src = 'http://ogo.ua/images/articles/1567/big/1395958980.jpg'
elem.width = 200

performance.mark('end')

console.log(performance.getEntries())
~~~

◘◘^^Результат^^◘◘

~~~console
▼ (2) [PerformanceMark, PerformanceMark]
  ▼ 0: PerformanceMark
        duration: 0
        entryType: "mark"
        name: "start"
        startTime: 3348.8999999826774
      ► __proto__: PerformanceMark
  ▼ 1: PerformanceMark
        duration: 0
        entryType: "mark"
        name: "end"
        startTime: 3349.099999992177
      ► __proto__: PerformanceMark
    length: 2
  ► __proto__: Array(0)
~~~


◘◘![ico-20 cap] ** 5**◘◘

~~~js
performance.mark('start')

fetch('https://httpbin.org')
  .then(() => {
    performance.mark('end')
    performance.measure('fetchDuration', 'start', 'end')
    console.log(performance.getEntries())
  })
~~~

^^^[Результат]

~~~console
▼ (4) [PerformanceMark, PerformanceMeasure, PerformanceResourceTiming, PerformanceMark]
  ▼ 0: PerformanceMark
        duration: 0
        entryType: "mark"
        name: "start"
        startTime: 2684.400000027381
      ► __proto__: PerformanceMark
  ▼ 1: PerformanceMeasure
        duration: 453.5999999498017
        entryType: "measure"
        name: "fetchDuration"
        startTime: 2684.400000027381
      ► __proto__: PerformanceMeasure
  ▼ 2: PerformanceResourceTiming
        connectEnd: 0
        connectStart: 0
        decodedBodySize: 0
        domainLookupEnd: 0
        domainLookupStart: 0
        duration: 452.70000002346933
        encodedBodySize: 0
        entryType: "resource"
        fetchStart: 2684.5999999786727
        initiatorType: "fetch"
        name: "https://httpbin.org/"
        nextHopProtocol: "http/1.1"
        redirectEnd: 0
        redirectStart: 0
        requestStart: 0
        responseEnd: 3137.300000002142
        responseStart: 0
        secureConnectionStart: 0
      ► serverTiming: []
        startTime: 2684.5999999786727
        transferSize: 0
        workerStart: 0
      ► __proto__: PerformanceResourceTiming
  ▼ 3: PerformanceMark
        duration: 0
        entryType: "mark"
        name: "end"
        startTime: 3137.9999999771826
      ► __proto__: PerformanceMark
    length: 4
  ► __proto__: Array(0)
~~~

^^^

_______________________________________________________________

#### ![ico-20 icon] getEntriesByName


◘◘![ico-20 cap] ** 6**◘◘

~~~js
performance.mark('start')

fetch('https://httpbin.org')
  .then(() => {
    performance.mark('end')
    performance.measure('fetchDuration', 'start', 'end')
    console.log(performance.getEntriesByName('https://httpbin.org/'))
  })
~~~

^^^[Результат]

~~~console
▼ [ PerformanceResourceTiming ]
  ▼ 0: PerformanceResourceTiming
        connectEnd: 0
        connectStart: 0
        decodedBodySize: 0
        domainLookupEnd: 0
        domainLookupStart: 0
        duration: 146.99999999720603
        encodedBodySize: 0
        entryType: "resource"
        fetchStart: 6048.500000033528
        initiatorType: "fetch"
        name: "https://httpbin.org/"
        nextHopProtocol: "http/1.1"
        redirectEnd: 0
        redirectStart: 0
        requestStart: 0
        responseEnd: 6195.500000030734
        responseStart: 0
        secureConnectionStart: 0
      ► serverTiming: []
        startTime: 6048.500000033528
        transferSize: 0
        workerStart: 0
      ► __proto__: PerformanceMark
    length: 1
  ► __proto__: Array(0)
~~~

^^^

_______________________________________________________________

◘◘![ico-20 cap] ** 7**◘◘

~~~js
const pictures = [
  'http://ogo.ua/images/articles/1567/big/1395958980.jpg',
  'https://wxpcdn.gcdn.co/dcont/fb/image/crew3_1024.png',
  'https://mixpix.in/post_imgs/2015/04/10/141025/00009.jpg',
  'https://mixpix.in/post_imgs/2015/04/10/141025/00006.jpg'
]
pictures
  .forEach(item => {
    performance.mark('start')

    const elem = document.body
      .appendChild(document.createElement('img'))
    elem.src = item
    elem.width = 200

    performance.mark('end')
  })

console.log(performance.getEntriesByName('start'))
~~~

◘◘^^Результат^^◘◘

~~~console
▼ (4) [PerformanceMark, PerformanceMark, PerformanceMark, PerformanceMark]
  ► 0: PerformanceMark {name: "start", entryType: "mark", startTime: 2465.700000000652, duration: 0}
  ► 1: PerformanceMark {name: "start", entryType: "mark", startTime: 2467.000000004191, duration: 0}
  ► 2: PerformanceMark {name: "start", entryType: "mark", startTime: 2467.1000000089407, duration: 0}
  ► 3: PerformanceMark {name: "start", entryType: "mark", startTime: 2467.30000001844, duration: 0}
    length: 4
  ► __proto__: Array(0)
~~~

_______________________________________________________________

#### ![ico-20 icon] getEntriesByType

◘◘![ico-20 cap] ** 8**◘◘

~~~js
console.log(performance.getEntriesByType('resource'))
~~~

^^^[Результат]

~~~console
▼ [PerformanceResourceTiming]
  ▼ 0: PerformanceResourceTiming
        connectEnd: 0
        connectStart: 0
        decodedBodySize: 0
        domainLookupEnd: 0
        domainLookupStart: 0
        duration: 1.400000008288771
        encodedBodySize: 0
        entryType: "resource"
        fetchStart: 19113.49999997765
        initiatorType: "img"
        name: "http://ogo.ua/images/articles/1567/big/1395958980.jpg"
        nextHopProtocol: "h2"
        redirectEnd: 0
        redirectStart: 0
        requestStart: 0
        responseEnd: 19114.899999985937
        responseStart: 0
        secureConnectionStart: 0
      ► serverTiming: []
        startTime: 19113.49999997765
        transferSize: 0
        workerStart: 0
      ► __proto__: PerformanceResourceTiming
        length: 1
  ► __proto__: Array(0)
~~~

^^^

_______________________________________________________________

◘◘![ico-20 cap] ** 9**◘◘

~~~js
fetch('https://httpbin.org/')
  .then(response => console.log(performance.getEntriesByType('resource')))
~~~

^^^[Результат]

~~~console
▼ [PerformanceResourceTiming]
  ▼ 0: PerformanceResourceTiming
        connectEnd: 0
        connectStart: 0
        decodedBodySize: 0
        domainLookupEnd: 0
        domainLookupStart: 0
        duration: 144.70000000437722
        encodedBodySize: 0
        entryType: "resource"
        fetchStart: 24782.19999995781
        initiatorType: "fetch"
        name: "https://httpbin.org/"
        nextHopProtocol: "http/1.1"
        redirectEnd: 0
        redirectStart: 0
        requestStart: 0
        responseEnd: 24926.89999996219
        responseStart: 0
        secureConnectionStart: 0
      ► serverTiming: []
        startTime: 24782.19999995781
        transferSize: 0
        workerStart: 0
      ► __proto__: PerformanceResourceTiming
        length: 1
  ► __proto__: Array(0)
~~~

^^^

_______________________________________________________________

### ![ico-20 icon] PerformanceResourceTiming

Для каждого процесса загрузки ресурсов приложения создается свой экземпляр **~PerformanceResourceTiming~**

#### ![ico-20 icon] initiatorType

Свойство **_~initiatorType~_** этого экземпляра идентифицирует источник запроса

| **link**           | Запрос инициирован элементом &lt;link>   |
| **script**         | Запрос инициирован элементом &lt;script> |
| **img**            | Запрос инициирован элементом &lt;img>    |
| **css**            | Запрос инициирован элементом &lt;style><br>( например, при загрузке шрифтов ) |
| **xmlhttprequest** | Запрос инициирован объектом XMLHttpRequest |

#### ![ico-20 icon] name

Свойство **_~name~_** этого экземпляра идентифицирует **~url~** запрошенного ресурса

◘◘![ico-20 cap] **10**◘◘

~~~js
const pictures = [
  'http://ogo.ua/images/articles/1567/big/1395958980.jpg',
  'https://wxpcdn.gcdn.co/dcont/fb/image/crew3_1024.png',
  'https://mixpix.in/post_imgs/2015/04/10/141025/00009.jpg',
  'https://mixpix.in/post_imgs/2015/04/10/141025/00006.jpg'
]

const promises = []

pictures
  .forEach(item => promises.push(new Promise(function (resolve, reject) {
    const elem = document.createElement('img')

    elem.onload = function (event) {
      const res = performance.getEntriesByName(event.target.src)
      resolve({
        name: res[0].name,
        duration: res[0].duration
      })
    }

    elem.onerror = event => reject(event.target.src)

    elem.src = item
  })))

Promise.all(promises)
  .then(result => {
    result
      .forEach(item => document.body.innerHTML += `<img src="${item.name}" width="120"/><br/><small>${item.duration} (ms)</small><br/>`)
  })
  .catch(file => console.error(`Error loading file: ${file}`))
~~~

______________________________________________________________________

**Результат на странице:**

________________________________

@@@@

<img src="http://ogo.ua/images/articles/1567/big/1395958980.jpg" width="120"/>
&nbsp;
^^2.3999999975785613 (ms)^^
&nbsp;
<img src="https://wxpcdn.gcdn.co/dcont/fb/image/crew3_1024.png" width="120"/>
&nbsp;
^^7.400000002235174 (ms)^^
&nbsp;
<img src="https://mixpix.in/post_imgs/2015/04/10/141025/00009.jpg" width="120"/>
&nbsp;
^^2.5000000023283064 (ms)^^
&nbsp;
<img src="https://mixpix.in/post_imgs/2015/04/10/141025/00006.jpg" width="120"/>
&nbsp;
^^2.900000021327287 (ms)^^
&nbsp;

@@@@

_______________________________________________________________

## ![ico-25 icon] Memory allocation

[![ico-70 youtube]](https://www.youtube.com/watch?v=nDNEiu_xwf0&feature=youtu.be)