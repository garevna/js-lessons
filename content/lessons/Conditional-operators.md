# ![ico-30 icon] {{p1}}

{{p2}}

•••• none
{{p3}}
{{p4}}
{{p5}}
{{p6}}
••••

{{p7}}

{{p8}}

~~~js
var x = 5            // {{p12}}
var y = 11           // {{p49}}
var z = x * y + 5    // {{p50}}
~~~

{{p9}}

_______________________________________________________________________________

## ![ico-25 icon] {{p10}}

~~~js
{{p40}} ({{p41}}) {
  {{p42}}
} {{p43}} {
  {{p44}}
}
~~~

{{p11}}

~~~js
{{p40}} (!!{{common.expression}}) {
  {{p46}}
} {{p43}} {
  {{p47}}
}
~~~

{{p13}}

{{common.syntax}}:

~~~js
if (!!{{common.expression}}) {  
  {{p48}} 1
} else {
  {{p48}} 2
}
~~~

{{p15}} <span class="first-expression">{{p48}} 1</span> <span class="second-expression">{{p48}} 2</span>

{{p16}}

| {{p51}}       | {{p17}}   |
| **~true~**    | <span class="first-expression">{{p48}} 1</span> |
| **~false~**   | <span class="second-expression">{{p48}} 2</span> |

^^^[{{common.note}}]

{{p19}}

~~~js
if (i % 2 === 0) console.log(i)

if (i % 2 !== 0) continue
~~~

{{p20}}

^^^

_________________________________________________________________

◘◘![ico-25 cap] {{common.example}} 1◘◘

~~~js
if (typeof x === 'number') {
  var z = x * 5
  var y = x / 10 - 3
}
else {
  var z = 0
  var y = 0
}
~~~

{{p21}}

{{p22}}

{{p23}}

_________________________________________________________________

## ![ico-25 icon] {{p24}}

{{common.syntax}}:

<span class="condition-expression">{{common.condition}}</span><span class="ternary-sign">?</span><span class="first-expression">{{common.expression}} 1</span><span class="ternary-sign">:</span><span class="second-expression">{{common.expression}} 2</span>

{{p26}}

{{p27}}

{{p28}}

{{p29}}

| <span class="condition-expression">{{common.condition}}</span> |  {{p30}}                                                       |
| **~true~**                                                     | <span class="first-expression">{{common.expression}} 1</span>  |
| **~false~**                                                    | <span class="second-expression">{{common.expression}} 2</span> |

{{p31}}

_____________________________________________________________

◘◘![ico-25 cap] **1**◘◘

~~~js
var meet = source === 'fruit' ? 'apple' : 'mashroom'
~~~

{{p32}}

{{p33}}

{{p34}}

~~~demo
> var source = 'fruit'
< undefined
> var meet = source === 'fruit' ? 'apple' : 'mashroom'
< undefined
> meet
< 'apple'
> source = null
< null
> meet = source === 'fruit' ? 'apple' : 'mashroom'
< 'mashroom'
~~~

______________________________________________________________

◘◘![ico-25 cap] **2**◘◘

~~~js
var result = expresion ? '{{p26}}' : '{{p27}}'
~~~

{{p35}} **~"{{p26}}"~**.

{{p36}} **~"{{p27}}"~**.

{{p37}} **~"{{p26}}"~**:

~~~js
var expresion = 'Google'
var result = expresion ? '{{p26}}' : '{{p27}}'
~~~

{{p38}}  **~"{{p27}}"~**:

~~~js
var expresion = null
var result = expresion ? '{{p26}}' : '{{p27}}'
~~~

~~~demo
> var x = 8
< undefined
> var expresion = x > 5
< undefined
> var result = expresion ? '{{p26}}' : '{{p27}}'
< undefined
> meet
< '{{p26}}'
> expresion = x < 5
< false
> result = expresion ? '{{p26}}' : '{{p27}}'
< '{{p27}}'
~~~

___

◘◘![ico-25 cap] **3**◘◘

~~~js
var angle = Math.PI / 2

console.log(angle < Math.PI ? Math.sin(angle) : Math.cos(angle))
~~~

{{p39}}

___

[![ico-20 link] MDN](external/mdn-expressions-operators)
[![ico-20 link] w3schools](external/w3-if-else)

___

## ![ico-25 hw] {{common.tests}}

◘◘ ![ico-20 hw] **1** ◘◘

~~~js
if (a > b) {
  console.log(a - b)
}
else {
  console.log(a + b)
}
~~~

{{p52}}

~~~tests
→→→ a = 5, b = 7 | 5, 7, -2, 12 | 12 →→→
→→→ a = 5, b = -7 | 5, -7, -2, 12 | 12 →→→
→→→ a = 4, b = null | 4, null, undefined, 0, NaN | 4 →→→
→→→ a = null, b = -7 | null, undefined, -7, 7, NaN | 7 →→→
→→→ a = 8, b = undefined | null, undefined, 8, NaN | NaN →→→
→→→ a = true, b = false | true, false, 1, 0, NaN | 1 →→→
→→→ a = false, b = true | true, false, 1, -1, NaN | 1 →→→
→→→ a = null, b = false | true, false, 1, 0, NaN | 0 →→→
→→→ a = 4, b = true | true, 4, 5, 3, NaN | 3 →→→
~~~

◘◘ ![ico-20 hw] **2** ◘◘

~~~js
if (userName) {
  console.log('{{p53}}: ' + userName)
} else {
  console.log('{{p54}}')
}
~~~

{{p52}}

~~~tests
→→→ userName === undefined | '{{p53}}: undefined', '{{p53}}:', '{{p54}}', undefined | {{p54}} →→→
→→→ userName === null | '{{p53}}: null', '{{p53}}:', '{{p54}}', undefined | {{p54}} →→→
→→→ username === 'Robert' | '{{p53}}: Robert', '{{p54}}', undefined | {{p53}}: Robert →→→
~~~

◘◘ ![ico-20 hw] **3** ◘◘

~~~js
var c = a > b ? a - b : a + b
~~~

{{p52}}

~~~tests
→→→ var a = false, b = true | NaN, true, false, 2, 1, -1, 0 | 1 →→→
→→→ var a = true, b = false | NaN, true, false, 2, 1, -1, 0 | 1 →→→
→→→ var a = true, b = true  | NaN, true, false, 2, 1, -1, 0 | 2 →→→
→→→ var a = -true, b = null | NaN, true, false, 2, 1, -1, 0 | -1 →→→
→→→ var a = Infinity, b = Infinity | NaN, 0, 1, -1, Infinity | Infinity →→→
→→→ var a = '$', b = 5 | NaN, 0, 5, -5, '$5' | $5 →→→
→→→ var a = 'welcome ', b = typeof a | NaN, 'welcome', 'welcome string' | NaN →→→
→→→ var a = 'hello ', b = typeof a | NaN, 'hello', 'string', 'number', 'hello string' | hello string →→→
~~~
