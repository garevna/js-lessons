# ![ico-35 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

^^^[typescript]
{{s1.p3}}
~~~js
var ten: number = 10
~~~
{{s1.p4}}
{{s1.p5}}

{{s1.p6}}
^^^

{{s1.p7}}
{{s1.p8}}

{{s1.p9}}

~~~js
var ten = 10
~~~

{{s1.p10}}

{{s1.p11}}

~~~js
var ten = 20 - 5 * 2
~~~

{{s1.p12}}

~~~js
var human = {
  age: 25,
  employed: false,
  name: John
}
~~~

{{s1.p13}}

{{s1.p14}}

_________________________________________________________________

## ![ico-30 icon] {{s2.h1}}

{{s2.p1}}

~~~js
var number = 10
~~~

{{s2.p2}}

~~~js
number = number + 8
~~~

{{s2.p3}}

~~~js
number = number * 4
~~~

{{s2.p4}}

~~~js
number = number / 2
~~~

{{s2.p5}}

~~~js
number = number - 5
~~~

{{s2.p6}}

~~~js
number = number % 4
~~~

{{s2.p7}}
{{s2.p8}}

{{s2.p9}}

~~~js
number += 8
~~~

{{s2.p10}}

~~~js
number *= 4
~~~

{{s2.p11}}

~~~js
number /= 2
~~~

{{s2.p12}}

~~~js
number -= 5
~~~

{{s2.p13}}

~~~js
number %= 4
~~~

{{s2.p14}}

§§§§ Demo | assignments_01_template §§§§

_________________________________________________________________

## ![ico-30 hw] Tests

~~~js
var alpha = 11, betta = 7, sigma = 2, number = NaN
~~~

◘◘** 1**◘◘

→→→ alpha -= sigma  | 7, 11, 9, NaN, 0, 2 | 9 →→→

◘◘** 2**◘◘

→→→ number += betta  | 7, 11, 9, NaN, 0, 2 | NaN →→→

◘◘** 3**◘◘

→→→ betta += sigma  | 7, 11, 9, NaN, 0, 2 | 9 →→→

◘◘** 4**◘◘

→→→ betta /= alpha  | 7, 11, 9, NaN, 1, 2 | 1 →→→

◘◘** 5**◘◘

→→→ alpha %= (sigma + 5)  | 0, 1, 2, 3, NaN | 2 →→→