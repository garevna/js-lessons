# {{p1}}

## ![ico-30 study] RAIL

{{p2}}
{{p3}}
{{p4}}

{{p5}}
{{p6}}

|  **Response**  |  **Animation**  |  **Idle**  |  **Load**  |

{{p7}}

{{p8}}
{{p9}}
{{p10}}
{{p11}}
{{p12}}
{{p13}}
{{p14}}

{{p15}}

_____________________________________________________________

## ![ico-25 icon] JavaScript Profiler

{{p16}}
{{p17}}

![](createPath('images', 'js-profiler.png'))

{{p18}}
{{p19}}
{{p20}}
{{p21}}

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

{{p22}}
{{p23}}

![](createPath('images', 'audits.png'))

{{p24}}
{{p25}}
{{p26}}

### ![ico-20 icon] Performance

{{p27}}
{{p28}}
{{p29}}
{{p30}}
{{p31}}
{{p32}}
{{p33}}
{{p34}}
{{p35}}
{{p36}}
{{p37}}
{{p38}}
{{p39}}
{{p40}}
{{p41}}

{{p42}}

![](createPath('images', 'performance.png'))

[%%%Accessibility%%%](https://developers.google.com/web/fundamentals/accessibility/?utm_source=lighthouse&utm_medium=devtools)

_____________________________________________________________

## ![ico-25 icon] Memory

[%%%How to Record Heap Snapshots%%%](https://developers.google.com/web/tools/chrome-devtools/memory-problems/heap-snapshots)
[%%%Fix Memory Problems%%%](https://developers.google.com/web/tools/chrome-devtools/memory-problems/)

{{p43}}

~~~~js
const segments = [[1, 8], [2, 3], [4, 7], [5, 6], [2, 8], [3, 7], [4, 6], [1, 5], [1, 6]]

function countInnerIntervals (intervals) {
  const results = []

  intervals
    .forEach((segment, index, array) => results.push(array.reduce((childs, section) => array.filter(item => item[0] > segment[0] && item[1] < segment[1]).length)))
  return results
}
~~~~

{{p44}}

{{p45}}

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

{{p46}}

{{p47}}

^^^[{{common.c2}}]

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

{{p48}}

{{p49}}

[![ico-70 youtube]](https://youtu.be/nDNEiu_xwf0)

{{p50}}
{{p51}}
{{p52}}

{{p53}}

{{p54}}
{{p55}}
{{p56}}
{{p57}}
