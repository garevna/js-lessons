# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}
{{s1.p3}}
{{s1.p4}}
{{s1.p5}}
{{s1.p6}}
{{s1.p7}}

{{s1.p8}}

^^^[{{s1.spoiler1}}]

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

{{s1.p9}}
{{s1.p10}}

{{s1.p11}}
{{s1.p12}}

_____________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}
{{s2.p3}}
{{s2.p4}}
{{s2.p5}}

~~~js
const { domComplete, domInteractive, domLoading } = performance.timing

console.log(domComplete - domInteractive)
console.log(domInteractive - domLoading)
~~~

_____________________________________________________

## ![ico-25 icon] {{s3.h1}}

^^^[{{s3.spoiler1}}]

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

### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

~~~js
console.log(`Старт: ${performance.now()}`)
setTimeout(() => console.log(`Стоп: ${performance.now()}`), 2000)
~~~

{{s4.p3}}

~~~console
Старт: 207385.50000003306
Стоп: 209385.9999999986
~~~

{{s4.p4}}

~~~console
209385.9999999986 - 207385.50000003306 = 2000.499999965541 (ms)
~~~

_______________________________________________________________

### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}

{{s5.p2}}

~~~js
performance.mark('start')

for (let x = 0; x < 1000; x++) document.write(`${x}<br/>`)

performance.mark('end')

const items = window.performance.getEntriesByType('mark')

console.log(items)
~~~

{{s5.p3}}

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

### ![ico-20 icon] {{s6.h1}}

{{s6.p1}}

{{s6.p2}}

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

{{s6.p3}}

~~~console
1: duration: 0.20000000949949026ms
2: duration: 0.20000000949949026ms
~~~

{{s6.p4}}

{{s6.p5}}
{{s6.p6}}

_______________________________________________________________

### ![ico-20 icon] {{s7.h1}}

{{s7.p1}}
{{s7.p2}}
{{s7.p3}}

{{s7.p4}}

{{s7.p5}}

{{s7.p6}}

{{s7.p7}}
{{s7.p8}}
{{s7.p9}}
{{s7.p10}}
{{s7.p11}}
{{s7.p12}}

_______________________________________________________________

#### ![ico-20 icon] {{s8.h1}}

{{s8.p1}}

{{s8.p2}}
{{s8.p3}}
{{s8.p4}}
{{s8.p5}}

{{s8.p6}}
{{s8.p7}}
{{s8.p8}}

{{s8.p9}}
{{s8.p10}}
{{s8.p11}}

{{s8.p12}}

~~~js
performance.mark('start')

const elem = document.body
  .appendChild(document.createElement('img'))

elem.src = 'http://ogo.ua/images/articles/1567/big/1395958980.jpg'
elem.width = 200

performance.mark('end')

console.log(performance.getEntries())
~~~

{{s8.p13}}

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


{{s8.p14}}

~~~js
performance.mark('start')

fetch('https://httpbin.org')
  .then(() => {
    performance.mark('end')
    performance.measure('fetchDuration', 'start', 'end')
    console.log(performance.getEntries())
  })
~~~

^^^[{{s8.spoiler1}}]

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

#### ![ico-20 icon] {{s9.h1}}


{{s9.p1}}

~~~js
performance.mark('start')

fetch('https://httpbin.org')
  .then(() => {
    performance.mark('end')
    performance.measure('fetchDuration', 'start', 'end')
    console.log(performance.getEntriesByName('https://httpbin.org/'))
  })
~~~

^^^[{{s9.spoiler1}}]

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

{{s9.p2}}

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

{{s9.p3}}

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

#### ![ico-20 icon] {{s10.h1}}

{{s10.p1}}

~~~js
console.log(performance.getEntriesByType('resource'))
~~~

^^^[{{s10.spoiler1}}]

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

{{s10.p2}}

~~~js
fetch('https://httpbin.org/')
  .then(response => console.log(performance.getEntriesByType('resource')))
~~~

^^^[{{s10.spoiler2}}]

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

### ![ico-20 icon] {{s11.h1}}

{{s11.p1}}

#### ![ico-20 icon] {{s12.h1}}

{{s12.p1}}

{{s12.p2}}
{{s12.p3}}
{{s12.p4}}
{{s12.p5}}
{{s12.p6}}

#### ![ico-20 icon] {{s13.h1}}

{{s13.p1}}

{{s13.p2}}

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

{{s13.p3}}

________________________________

{{s13.p4}}

{{s13.p5}}
{{s13.p6}}
{{s13.p7}}
{{s13.p8}}
{{s13.p9}}
{{s13.p10}}
{{s13.p11}}
{{s13.p12}}
{{s13.p13}}
{{s13.p14}}
{{s13.p15}}
{{s13.p16}}
{{s13.p17}}
{{s13.p18}}
{{s13.p19}}
{{s13.p20}}

{{s13.p21}}

_______________________________________________________________

## ![ico-25 icon] {{s14.h1}}

[![ico-70 youtube]](https://www.youtube.com/watch?v=nDNEiu_xwf0&feature=youtu.be)