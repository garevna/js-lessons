# ![ico-35 study] {{p1}}

{{p2}}

{{p3}}

^^^[typescript]
{{p4}}
~~~js
var ten: number = 10
~~~
{{p5}}
{{p6}}

{{p7}}
^^^

{{p8}}
{{p9}}

{{p10}}

~~~js
var ten = 10
~~~

{{p11}}

{{p12}}

~~~js
var ten = 20 - 5 * 2
~~~

{{p13}}

~~~js
var human = {
  age: 25,
  employed: false,
  name: John
}
~~~

{{p14}}

{{p15}}

_________________________________________________________________

## ![ico-30 icon] {{p16}}

{{p17}}

~~~js
var number = 10
~~~

{{p18}}

~~~js
number = number + 8
~~~

{{common.c6}}

~~~js
number = number * 4
~~~

{{common.c6}}

~~~js
number = number / 2
~~~

{{common.c6}}

~~~js
number = number - 5
~~~

{{common.c6}}

~~~js
number = number % 4
~~~

{{p19}}
{{p20}}

{{p21}}

~~~js
number += 8
~~~

{{common.c6}}

~~~js
number *= 4
~~~

{{common.c6}}

~~~js
number /= 2
~~~

{{common.c6}}

~~~js
number -= 5
~~~

{{common.c6}}

~~~js
number %= 4
~~~

{{p22}}

~~~demo
> var number = 10
< undefined
> var sigma = 3
< undefined
> number += sigma
< 13
> number -= sigma * 2
< 7
> number *= sigma
< 21
> number %= (sigma + 5)
< 5
> number /= (sigma + 2)
< 1
~~~

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