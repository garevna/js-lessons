# ![ico-35 study] {{p1}}

{{p2}}

{{p3}}

{{p4}}

• string
• number
• [%%%bigint%%%](page/BigInt)
• boolean
• undefined
• symbol
• [%%%null%%%](page/typeof#null)
______________________________________________________________

## ![ico-30 icon] String

{{p5}}

| ^^ 0^^ | ^^ 1^^ | ^^ 2^^ | ^^ 3^^ | ^^ 4^^ | ^^ 5^^ | ^^ 6^^ | ^^ 7^^ | ^^ 8^^ | ^^ 9^^ | ^^10^^ | ^^11^^ | ^^12^^ | ^^13^^ | ^^14^^ | ^^15^^ |
| ** M** | ** y** |        | ** n** | ** a** | ** m** | ** e** |        | ** i** | ** s** |        | ** P** | ** i** | ** t** | ** e** | ** r** |


{{p6}}

{{p7}}

◘◘![ico-25 cap]◘◘

~~~js
var str = '"es2023" is a shorthand for "ECMAScript 2023 Language Specification".'
~~~
~~~js
var str = "'es2023, x' is a shorthand for 'ECMAScript 2023 Language Specification'."
~~~

{{p8}}

~~~js
str = '\'es2023, x\' is a shorthand for \'ECMAScript 2023 Language Specification\'.'
~~~

{{p9}}

{{p10}}

{{p11}}

{{p70}}

_____________________________________

{{p13}}
{{p71}}

~~~demo
> 'Welcome!'.length
< 8
> var message = 'Hi, students!'
< undefined
> message.length
< 13
> var string = 'Welcome!'
< undefined
> message + ' ' + string
< 'Hi, students! Welcome!'
> (message + ' ' + string).length
< 22
~~~

{{p15}}

~~~console
message + string
~~~

{{p72}}
{{p17}}
{{p73}}
{{p19}}

______________________________________________________________

## ![ico-30 icon] Number

{{p20}}

{{p21}}

{{p22}}

~~~js
var x = 53.25
~~~

{{p23}}

{{p24}}

{{p74}}

{{p75}}
{{p76}}
{{p77}}
{{p78}}
{{p79}}

{{p80}}

### ![ico-25 icon] {{p32}}

{{p33}}

{{{vars-number-1.js}}}

{{p34}}

### ![ico-25 icon] {{p35}}

{{p36}}

{{p81}}

••1.8 ✖ 10↑↑5 ↑↑••

{{p38}}

••500 → 5e+2 (5 * 10↑↑2 ↑↑)••
••5000 → 5e+3 (5 * 10↑↑3 ↑↑)••
••50000 → 5e+4 (5 * 10↑↑4 ↑↑)••

••0.05 → 5e-2 (5 / 10↑↑2 ↑↑)••
••0.005 → 5e-3 (5 / 10↑↑3 ↑↑)••
••0.0005 → 5e-4 (5 / 10↑↑4 ↑↑)••

{{{vars-number-exponential-1.js}}}

{{p39}}

{{{vars-number-exponential-2.js}}}

_____________________________________

### ![ico-25 icon] Infinity

{{p82}}

~~~js
var x = 1, y = 0
var z = x / y
~~~

{{p83}}

{{p84}}

{{{vars-number-infinity.js}}}

_____________________________________

### ![ico-25 icon] NaN

{{p85}}

{{p86}}

{{p87}}

{{p88}}

{{p89}}
{{p90}}

{{p49}}
{{p91}}
{{p92}}

~~~demo
> NaN === NaN
< false
< NaN == NaN
< false
< NaN == undefined
< false
< isNaN('5')
< false
< isNaN('abc')
< true
< Number.isNaN('abc')
< false
< Number.isNaN('abc' / 2)
< true
< Number.isNaN(undefined)
< false
< Number.isNaN(undefined - 0)
< true
~~~

__________________________________________________

### ![ico-25 icon] {{p52}}

{{p53}}

{{{vars-number-4.js}}}

{{p54}}

_____________________________________

### ![ico-25 icon] {{p55}}

◘◘** 1**◘◘

→→→ 8e-2 | 800, 0.8, 0.08, 8 | 0.08 →→→

◘◘** 2**◘◘

→→→ 1.7e+2 | 170, 1.7, 0.17, 17 | 170 →→→

◘◘** 3**◘◘

→→→ 0.3e+310 | 3e+309, Infinity | Infinity →→→

◘◘** 4**◘◘

→→→ 3e-300 ✖ 1e+30 | 3e-900, Infinity, 0, 3e-270 | 3e-270 →→→

◘◘** 5**◘◘

→→→ 1e-5 + 2e-5 | 3e-5, 0.00003, 0.000030000000000000004, NaN | 0.000030000000000000004 →→→

◘◘** 6**◘◘

→→→ 0.003 + 0.0015 | 0.0045000000000000005, 0.0045, 45e-4, NaN | 0.0045000000000000005 →→→

◘◘** 7**◘◘

→→→ 5e+310 - Infinity | 0, Infinity, NaN | NaN →→→

◘◘** 8**◘◘

→→→ 0.005 + Infinity + NaN | 0.005, 0, Infinity, NaN | NaN →→→

◘◘** 9**◘◘

→→→ 5e+300 - Infinity | 5e+300, 0, -Infinity, NaN | -Infinity →→→

______________________________________________________________

## ![ico-30 icon] Boolean

{{p56}}

{{p93}}

{{p58}}

{{p59}}

~~~js
5 > 8
~~~
~~~console
false
~~~

~~~js
'a' < 'b'
~~~
~~~console
true
~~~

{{p60}}
{{p61}}
{{p94}}

{{p95}}

~~~js
var bool = 5 > 8
~~~

{{p96}}

{{p97}}

~~~demo
> 5 < 7
< true
< 'n' > 'u'
< false
< 'ba' > bc
< false
< 'a' < 100
< false
< 'a' > 100
< false
< 'a' > false
< false
< 'a' < false
< false
< !!'a' > false
< true
< 5 > true
< true
~~~

______________________________________________________________

## ![ico-30 icon] undefined

{{p66}}

{{p67}}

{{p98}}

{{p69}}

~~~demo
> var sigma
< undefined
< sigma
< undefined
< undefined === undefined
< true
< undefined == false
< false
~~~