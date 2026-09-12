# {{s1.h1}}

## ![ico-30 study] RAIL

{{s1.p1}}
{{s1.p2}}
{{s1.p3}}

{{s1.p4}}
{{s1.p5}}

|  **Response**  |  **Animation**  |  **Idle**  |  **Load**  |

{{s1.p6}}

{{s1.p7}}
{{s1.p8}}
{{s1.p9}}
{{s1.p10}}
{{s1.p11}}
{{s1.p12}}
{{s1.p13}}

{{s1.p14}}

_____________________________________________________________

## ![ico-25 icon] JavaScript Profiler

{{s1.p15}}
{{s1.p16}}

![](createPath('images', 'js-profiler.png'))

{{s1.p17}}
{{s1.p18}}
{{s1.p19}}
{{s1.p20}}

~~~console
    Self Time                  Total Time                Function
_______________________________________________________________________
8092.0 ms                  8092.0 ms                     (iddle)
1722.9 ms   93.74%         1722.9 ms      93.74%         (program)
   9.5 ms    0.52%            9.5 ms       0.52%         (garbage collector)
  10.6 ms    0.58%           10.6 ms       0.58%         fetch
   6.4 ms    0.35%           21.8 ms       1.18%         parseLine
   3.5 ms    0.19%           12.2 ms       0.66%         appendChild
   3.3 ms    0.18%           20.7 ms       1.12%         createCodeSnippet
   0.1 ms    0.01%            0.1 ms       0.01%         getElementsByClassName
   ...                      ...                          ...
~~~

_____________________________________________________________

## ![ico-25 icon] Audits

{{s1.p21}}
{{s1.p22}}

![](createPath('images', 'audits.png'))

{{s1.p23}}
{{s1.p24}}
{{s1.p25}}

### ![ico-20 icon] Performance

{{s1.p26}}
{{s1.p27}}
{{s1.p28}}
{{s1.p29}}
{{s1.p30}}
{{s1.p31}}
{{s1.p32}}
{{s1.p33}}
{{s1.p34}}
{{s1.p35}}
{{s1.p36}}
{{s1.p37}}
{{s1.p38}}
{{s1.p39}}
{{s1.p40}}

{{s1.p41}}

![](createPath('images', 'performance.png'))

[%%%Accessibility%%%](https://developers.google.com/web/fundamentals/accessibility/?utm_source=lighthouse&utm_medium=devtools)

_____________________________________________________________

## ![ico-25 icon] Memory

[%%%How to Record Heap Snapshots%%%](https://developers.google.com/web/tools/chrome-devtools/memory-problems/heap-snapshots)
[%%%Fix Memory Problems%%%](https://developers.google.com/web/tools/chrome-devtools/memory-problems/)

{{s1.p42}}

~~~~js
const segments = [[1, 8], [2, 3], [4, 7], [5, 6], [2, 8], [3, 7], [4, 6], [1, 5], [1, 6]]

function countInnerIntervals (intervals) {
  const results = []

  intervals
    .forEach((segment, index, array) => results.push(array.reduce((childs, section) => array.filter(item => item[0] > segment[0] && item[1] < segment[1]).length)))
  return results
}
~~~~

{{s1.p43}}

{{s1.p44}}

~~~~js
const button = document.body
  .appendChild(document.createElement('button'))

button.innerText = 'Start'

button.onclick = function (event) {
  console.time('segments')
  const children = countInnerIntervals(segments)
  console.timeEnd('segments')
  console.log(children)
}
~~~~

{{s1.p45}}

{{s1.p46}}

^^^[{{s1.spoiler1}}]

~~~console
segments: 0.536865234375ms
(9) [5, 0, 1, 0, 4, 2, 0, 1, 1]
segments: 0.462158203125ms
(9) [5, 0, 1, 0, 4, 2, 0, 1, 1]
segments: 0.386962890625ms
(9) [5, 0, 1, 0, 4, 2, 0, 1, 1]
segments: 0.55908203125ms
(9) [5, 0, 1, 0, 4, 2, 0, 1, 1]
segments: 0.345947265625ms
(9) [5, 0, 1, 0, 4, 2, 0, 1, 1]
segments: 0.459228515625ms
(9) [5, 0, 1, 0, 4, 2, 0, 1, 1]
~~~

^^^

{{s1.p47}}

{{s1.p48}}

[![ico-70 youtube]](https://youtu.be/nDNEiu_xwf0)

{{s1.p49}}
{{s1.p50}}
{{s1.p51}}

{{s1.p52}}

{{s1.p53}}
{{s1.p54}}
{{s1.p55}}
{{s1.p56}}
