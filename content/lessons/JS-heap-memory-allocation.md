# {{s1.h1}}

## ![ico-30 study] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}
{{s2.p3}}

{{s2.p4}}
{{s2.p5}}

{{s2.p6}}

{{s2.p7}}

{{s2.p8}}
{{s2.p9}}
{{s2.p10}}
{{s2.p11}}
{{s2.p12}}
{{s2.p13}}
{{s2.p14}}

{{s2.p15}}

_____________________________________________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}
{{s3.p2}}

{{s3.p3}}

{{s3.p4}}
{{s3.p5}}
{{s3.p6}}
{{s3.p7}}

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

## ![ico-25 icon] {{s4.h1}}

{{s4.p1}}
{{s4.p2}}

{{s4.p3}}

{{s4.p4}}
{{s4.p5}}
{{s4.p6}}

### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}
{{s5.p2}}
{{s5.p3}}
{{s5.p4}}
{{s5.p5}}
{{s5.p6}}
{{s5.p7}}
{{s5.p8}}
{{s5.p9}}
{{s5.p10}}
{{s5.p11}}
{{s5.p12}}
{{s5.p13}}
{{s5.p14}}
{{s5.p15}}

{{s5.p16}}

{{s5.p17}}

{{s5.p18}}

_____________________________________________________________

## ![ico-25 icon] {{s6.h1}}

{{s6.p1}}
{{s6.p2}}

{{s6.p3}}

~~~~js
const segments = [[1, 8], [2, 3], [4, 7], [5, 6], [2, 8], [3, 7], [4, 6], [1, 5], [1, 6]]

function countInnerIntervals (intervals) {
  const results = []

  intervals
    .forEach((segment, index, array) => results.push(array.reduce((childs, section) => array.filter(item => item[0] > segment[0] && item[1] < segment[1]).length)))
  return results
}
~~~~

{{s6.p4}}

{{s6.p5}}

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

{{s6.p6}}

{{s6.p7}}

^^^[{{s6.spoiler1}}]

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

{{s6.p8}}

{{s6.p9}}

[![ico-70 youtube]](https://youtu.be/nDNEiu_xwf0)

{{s6.p10}}
{{s6.p11}}
{{s6.p12}}

{{s6.p13}}

{{s6.p14}}
{{s6.p15}}
{{s6.p16}}
{{s6.p17}}
