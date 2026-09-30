# ![ico-30 study] {{common.type_coercion}}

{{p29}}
{{p30}}

~~~demo
> var x = 10, y = '***'
< undefined
> x * y
< NaN
~~~

{{p31}}
{{p32}}

~~~demo
> var x = 10, y = '***'
< undefined
> x && y
< '***'
> x || y
< 10
> typeof (x && y)
< 'string'
> typeof (x || y)
< 'number'
~~~

______________________________________

## ![ico-25 icon] {{p1}}

{{p5}}

{{p2}}

~~~demo
> Number('10')
< 10
> Number('***')
< NaN
> Number(undefined)
< NaN
> String(50)
< '50'
> String(false)
< 'false'
> String(undefined)
< 'undefined'
> Boolean('50')
< true
> Boolean(50)
< true
~~~

{{p3}}

___________________________________________________________________

### ![ico-20 icon] {{p7}}

{{p4}}

{{p6}}

{{p8}}

~~~demo
> Number(null)
< 0
> Number(false)
< 0
> Number('')
< 0
> Number(' ')
< 0
> Number([])
< 0
> Number([0])
< 0
> Number([''])
< 0
> Number([' '])
< 0
> Number('\n')
< 0
> Number('\t')
< 0
> Number('\r')
< 0
> Number('\v')
< 0
> Number('\f')
< 0
~~~

{{p9}}

^^^[{{p49}}]

{{p10}}

| Symbol    | Code | Description |
| **~\t~**  |   9  | {{p37}}     |
| **~\n~**  |  10  | {{p38}}     |
| **~\v~**  |  11  | {{p39}}     |
| **~\f~**  |  12  | {{p40}}     |
| **~\r~**  |  13  | {{p41}}     |

{{p34}}
{{p35}}
{{p36}}

^^^

{{p11}}

~~~demo
> Number(undefined)
< NaN
> Number({})
< NaN
> Number(NaN)
< NaN
> Number('5 + 3')
< NaN
> Number('40px')
< NaN
> Number([5, 7])
< NaN
~~~

{{p12}}
{{p42}}
{{p43}}
{{p44}}

~~~demo
> String({})
< '[object Object]'
> Number('[object Object]')
< NaN
> String([5, 4, 8])
< '5,4,8'
> Number('5,4,8')
< NaN
~~~

{{p45}}

| **~x~**     | **~Number(x)~**       |
| ~number~    | **~x~**               |
| ~string~    | {{p46}}               |
| ~boolean~   | ~true~ → 1<br />~false~ → 0    |
| ~array~     | {{p47}}               |
| ~object~    | {{p48}}               |

![ico-25 hw] {{common.tests}}

~~~tests
→→→ Number(57) | NaN, 57, undefined | 57 →→→
→→→ Number(4 * '8') | NaN, 32, 0 | 32 →→→
→→→ Number([8]) | NaN, 8, 0 | 8 →→→
→→→ Number([5] + [8]) | NaN, 13, 8, 5 | 13 →→→
→→→ Number(null - true) | NaN, null, true, 1, -1, 0 | -1 →→→
~~~

______________________________

{{p13}}

{{p14}}

#### ![ico-20 icon] parseInt & parseFloat

{{p15}}
{{p16}}

~~~demo
> var sample = '3.14abc'
< undefined
> Number(sample)
< NaN
> parseFloat(sample)
< 3.14
> parseInt(sample)
< 3
> Number('3.14 / 5')
< NaN
> parseFloat('3.14 / 5')
< 3.14
> Number('3.14 * 5')
< NaN
> parseFloat('3.14 * 5')
< 3.14
~~~

{{p17}}

____________________________________________________________________

### ![ico-20 icon] {{p18}}

{{p19}}

~~~demo
> Boolean('')
< false
> Boolean(0)
< false
> Boolean(-0)
< false
> Boolean(NaN)
< false
> Boolean(null)
< false
> Boolean(undefined)
< false
> Boolean(false)
< false
~~~

{{p20}}

{{p21}}

{{p22}}

____________________________________________________________________

### ![ico-20 icon] {{p23}}

~~~demo
> var str = String(5 + 8 + false)
< undefined
> str
< "13"
> var object = {}
< undefined
> String(object)
< "[object Object]"
> var array = [5, true, 'hello', 11]
< undefined
> String(array)
< "5,true,hello,11"
~~~

{{p24}}
{{p25}}
{{p26}}

~~~demo
> Number(2).toString(2)
< "10"
> Number(58).toString(2)
< "111010"
> Number(8).toString(8)
< "10"
> Number(58).toString(8)
< "72"
> Number(16).toString(16)
< "10"
> Number(58).toString(16)
< "3a"
~~~

____________________________________________________________________

### ![ico20 icon] {{p27}}

~~~js
Object(5 + 8 + false)
~~~

~~~console
▼ Number {13}
  ► [[Prototype]]: Number
    [[PrimitiveValue]]: 13
~~~

~~~js
var num = 10
Object(num)
~~~

~~~console
▼ Number {10}
  ► [[Prototype]]: Number
    [[PrimitiveValue]]: 10
~~~

~~~js
var array = [5, true, 'hello', 11]
Object(array)
~~~

{{p28}}

____________________________________________________________________

## ![ico-25 hw] {{common.tests}}

~~~tests
→→→ var x = '10'; var y = x + 5; y = ? | 15, '105', NaN | 105 →→→
→→→ var x = '10'; var y = x > 5; y = ? | 10, false, true | true →→→
→→→ var x = null; var y = x < 1; y = ? | null, false, true | true →→→
→→→ var x = '10'; var y = x - 5; y = ? | NaN, '10', false, 5 | 5 →→→
→→→ var x = '$$'; var y = x * 5; y = ? | '$$5', NaN, 5, undefined | NaN →→→
→→→ var x = '$$'; var y = x * false; y = ? | '$$false', NaN, '$$', false, undefined | NaN →→→
→→→ var x = '$$'; var y = x ? 5 : 0; y = ? | 0, 5, NaN, undefined | 5 →→→
→→→ var x = NaN; var y = x ? 5 : 0; y = ? | 0, 5, NaN, undefined | 0 →→→
→→→ var x = undefined; var y = x ? 5 : 0; y = ? | 0, 5, NaN, undefined | 0 →→→
→→→ var x = null; var y = x ? 5 : 0; y = ? | 0, 5, NaN, null, undefined | 0 →→→
→→→ var x = ''; var y = x ? 5 : 0; y = ? | 0, 5, NaN, null, undefined | 0 →→→
→→→ var x = {}; var y = x ? 5 : 0; y = ? | 0, 5, NaN, {}, undefined | 5 →→→
→→→ var x = []; var y = x ? 5 : 0; y = ? | 0, 5, NaN, [], undefined | 5 →→→
→→→ var x = []; var y = 5 + x; y = ? | 0, '5', NaN, [], undefined | 5 →→→
→→→ var x = []; var y = 5 + (+x); y = ? | 0, 5, NaN, [], undefined | 5 →→→
→→→ var x = 'hero'; var y = 5 && x; y = ? | 0, 5, NaN, 'hero' | hero →→→
→→→ var x = 'hero'; var y = 5 || x; y = ? | 0, 5, NaN, 'hero' | 5 →→→
→→→ +[] - 5 | 0, '5', -5, NaN | -5 →→→
→→→ !![] - 5 | 0, '5', -5, -4, NaN | -4 →→→
→→→ !!{} | null, undefined, false, true, NaN | true →→→
→→→ +!!{} | null, 1, undefined, false, true, NaN | 1 →→→
→→→ 1 + [] - true | 0, 1, false, true, NaN | 0 →→→
→→→ '1' + [] - true | 0, 1, false, true, NaN | 1 →→→
→→→ [] - false + null | 0, 1, false, true, null, NaN | 0 →→→
→→→ [] - true + null | 0, 1, -1, true, null | -1 →→→
→→→ [5] - true + null | 0, 5, 4, true, null | 4 →→→
→→→ [3, 5] - true + null | 0, 3, 4, 5, true, null, NaN | NaN →→→
→→→ 1 / null | 1, null, undefined, Infinity, NaN | Infinity →→→
→→→ 1 / [] | 1, null, undefined, Infinity, NaN | Infinity →→→
→→→ 1 / '' | 1, null, undefined, Infinity, NaN | Infinity →→→
→→→ !!5 && !![] | 5, [], undefined, Infinity, false, true | true →→→
~~~

____________________________________________________________________

[![ico-20 link] ^^Infinity^^](external/w3-infinity)

[![ico-20 link] ^^JavaScript Equality Table^^](external/equality-in-table)
