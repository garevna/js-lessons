# ![ico-35 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

• string
• number
• [%%%bigint%%%](page/BigInt)
• boolean
• undefined
• symbol
• [%%%null%%%](page/typeof#null)
______________________________________________________________

## ![ico-30 icon] String

{{s1.p4}}

| ^^ 0^^ | ^^ 1^^ | ^^ 2^^ | ^^ 3^^ | ^^ 4^^ | ^^ 5^^ | ^^ 6^^ | ^^ 7^^ | ^^ 8^^ | ^^ 9^^ | ^^10^^ | ^^11^^ | ^^12^^ | ^^13^^ | ^^14^^ | ^^15^^ |
| ** M** | ** y** |        | ** n** | ** a** | ** m** | ** e** |        | ** i** | ** s** |        | ** P** | ** i** | ** t** | ** e** | ** r** |


{{s1.p5}}

{{s1.p6}}

◘◘![ico-25 cap]◘◘

~~~js
var str = '"es2023" is a shorthand for "ECMAScript 2023 Language Specification".'
~~~
~~~js
var str = "'es2023, x' is a shorthand for 'ECMAScript 2023 Language Specification'."
~~~

{{s1.p7}}

~~~js
str = '\'es2023, x\' is a shorthand for \'ECMAScript 2023 Language Specification\'.'
~~~

{{s1.p8}}

{{s1.p9}}

{{s1.p10}}

{{s1.p11}}

_____________________________________

{{s1.p12}}
{{s1.p13}}

§§§§ Demo | var_string_length_template §§§§

{{s1.p14}}

~~~console
message + string
~~~

{{s1.p15}}
{{s1.p16}}
{{s1.p17}}
{{s1.p18}}

______________________________________________________________

## ![ico-30 icon] Number

{{s1.p19}}

{{s1.p20}}

{{s1.p21}}

~~~js
var x = 53.25
~~~

{{s1.p22}}

{{s1.p23}}

{{s1.p24}}

{{s1.p25}}
{{s1.p26}}
{{s1.p27}}
{{s1.p28}}
{{s1.p29}}

{{s1.p30}}

### ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{{vars-number-1.js}}}

{{s2.p2}}

### ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

••1.8 ✖ 10↑↑5 ↑↑••

{{s3.p3}}

••500 → 5e+2 (5 * 10↑↑2 ↑↑)••
••5000 → 5e+3 (5 * 10↑↑3 ↑↑)••
••50000 → 5e+4 (5 * 10↑↑4 ↑↑)••

••0.05 → 5e-2 (5 / 10↑↑2 ↑↑)••
••0.005 → 5e-3 (5 / 10↑↑3 ↑↑)••
••0.0005 → 5e-4 (5 / 10↑↑4 ↑↑)••

{{{vars-number-exponential-1.js}}}

{{s3.p4}}

{{{vars-number-exponential-2.js}}}

_____________________________________

### ![ico-25 icon] Infinity

{{s3.p5}}

~~~js
var x = 1, y = 0
var z = x / y
~~~

{{s3.p6}}

{{s3.p7}}

{{{vars-number-infinity.js}}}

_____________________________________

### ![ico-25 icon] NaN

{{s3.p8}}

{{s3.p9}}

{{s3.p10}}

{{s3.p11}}

{{s3.p12}}
{{s3.p13}}

{{s3.p14}}
{{s3.p15}}
{{s3.p16}}

§§§§ Demo | var_NaN_template §§§§

__________________________________________________

### ![ico-25 icon] {{s4.h1}}

{{s4.p1}}

{{{vars-number-4.js}}}

{{s4.p2}}

_____________________________________

### ![ico-25 icon] {{s5.h1}}

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

{{s5.p1}}

{{s5.p2}}

{{s5.p3}}

{{s5.p4}}

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

{{s5.p5}}
{{s5.p6}}
{{s5.p7}}

{{s5.p8}}

~~~js
var bool = 5 > 8
~~~

{{s5.p9}}

{{s5.p10}}

§§§§ Demo | var_boolean_template §§§§

______________________________________________________________

## ![ico-30 icon] undefined

{{s5.p11}}

{{s5.p12}}

{{s5.p13}}

{{s5.p14}}

§§§§ Demo | var_undefined_template §§§§