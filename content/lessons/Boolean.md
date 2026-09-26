# ![ico-35 study] {{p1}}

{{p2}}

## ![ico-30 icon] {{p3}}

{{p4}}

![](illustrations/logical-expressions.svg)

•••• none
{{p5}}
{{p6}}
{{p7}}
{{p8}}
{{p9}}
{{p10}}
{{p11}}
{{p12}}
••••

{{p13}}

{{p14}}
{{p15}}

{{p16}}
{{p17}}

______________________________________

## ![ico-30 icon] {{p18}}

{{p19}}

![](illustrations/logical-expressions-1.svg)

{{p20}}

◘◘ ![ico-25 coffee] **1**◘◘

~~~js
var apple = {
  color: 'yellow',
  shape: 'square'
}
~~~

{{p21}}

{{p22}}

| apple.color | apple.shape | appleIsRed | appleIsRound | appleIsRedAndRound |
|   'red'     |   'round'   |   ~true~   | ~true~       |   ~true~           |
|   'yellow'  |   'round'   |   ~false~  | ~true~       |   ~false~          |
|   'red'     |   'square'  |   ~true~   | ~false~      |   ~false~          |
|   'green'   |   'square'  |   ~false~  | ~false~      |   ~false~          |

{{p23}}

{{p24}}

{{p25}}

{{p26}}

{{p27}}

_________________________________________________________________________

### ![ico-25 icon] {{p28}}

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

{{p43}}
{{p44}}
{{p45}}

~~~demo
> var alpha = 1
< undefined
> alpha === '1'
< false
> alpha == '1'
< true
> alpha == true
< true
> alpha > false
< true
> alpha != '1'
< false
> alpha !== '1'
< true
> typeof alpha === 'string'
< false
> typeof alpha === 'number'
< true
~~~

_________________________________________________________________________

### ![ico-30 hw] {{common.c11}}

◘◘![ico-25 hw] **1**◘◘

→→→ 5 > '4' | true, false | true→→→

◘◘![ico-25 hw] **2**◘◘

→→→ 5 !== '5' | true, false | true→→→

◘◘![ico-25 hw] **3**◘◘

→→→ 10 != '10' | true, false | false→→→

◘◘![ico-25 hw] **4**◘◘

→→→ true != 1 | true, false | false→→→

◘◘![ico-25 hw] **5**◘◘

→→→ {{p46}} | {{p47}} | {{p48}}→→→

◘◘![ico-25 hw] **6**◘◘

→→→ true <= 1 | true, false | true→→→

◘◘![ico-25 hw] **7**◘◘

→→→ 'abc' < 'cde' | true, false | true→→→

◘◘![ico-25 hw] **8**◘◘

→→→ 'Welcome!'.length < 'How are you?'.length | true, false | true→→→

__________________________________________________________________________

## ![ico-30 icon] {{p49}}

{{p50}}

{{p51}}
{{p52}}

{{p53}}
{{p54}}

{{p55}}
{{p56}}

{{p57}}

{{p58}}
{{p59}}
{{p60}}
{{p61}}

_____________________________________________

### ![ico-25 icon] {{p62}}

{{p63}}
{{p64}}
{{p65}}

~~~js
var apple = {
  color: 'yellow',
  shape: 'square'
}

var appleIsRed = apple.color === 'red'
var appleIsRound = apple.shape === 'round'
~~~

{{p66}}

{{p67}}

~~~js
var appleIsNotRed = !appleIsRed
~~~

{{p68}}
{{p69}}

◘◘![ico-25 coffee] **2**◘◘

~~~js
!(5 > 8)    // true

// explanation:

5 > 8      // false,
!false     // true
~~~

◘◘![ico-25 coffee] **3**◘◘

~~~js
!(5 > 4)   // false

// explanation:

5 > 4      // true,
!true      // false
~~~

~~~demo
> !true
< false
> !false
< true
> !''
< true
> !0
< true
> !' '
< false
> !!' '
< true
> !!0
< false
> !-1
< false
> !!-1
< true
~~~

____________________________________________________________

### ![ico-25 icon] {{p70}}

{{p71}}

{{p72}}

~~~js
var apple = {
  color: 'yellow',
  shape: 'square'
}

var appleIsRed = apple.color === 'red'
var appleIsRound = apple.shape === 'round'
~~~

{{p73}}

~~~js
var appleIsRedAndRound = appleIsRed && appleIsRound
~~~

~~~demo
> true && true
< true
> false && true
< false
> true && false
< false
> false && false
< false
~~~

{{p74}}
{{p75}}

◘◘![ico-25 coffee] ** 4**◘◘

~~~js
5 > 8 && 4 < 5   // false  
// explanation:
5 > 8            // false
4 < 5            // true
false && true    // false
~~~

◘◘![ico-25 coffee] ** 5**◘◘

~~~js
8 < 5 && 4 < 5   // false
// explanation:
8 > 5            // false
4 < 5            // true
false && true    // false
~~~

◘◘![ico-25 coffee] ** 6**◘◘

~~~js
var x = 4, y = 10, z = 8

x > y && z < y   // false
// explanation:
x > y            // false,
z < y            // true,
false && true    // false
~~~

◘◘![ico-25 coffee] ** 7**◘◘

~~~js
var x = 4, y = 10, z = 8

x < y && z < y   // true
// explanation:
x < y            // true,
z < y            // true,
true && true     // true
~~~

{{p76}}
{{p77}}

~~~demo
> 1 && 0
< 0
> 5 && 8
< 8
> 'hi' && false
< false
> 'cat' && 'dog'
< "dog"
~~~

{{p78}}

![](illustrations/logical-operators.svg)

{{p79}}
{{p80}}

~~~demo
> var alpha = '0'
< undefined
> var betta = 'false'
< undefined
> var sigma = 8
< undefined
> alpha && betta && sigma
< 8
> !!alpha
< true
> !!betta
< true
~~~

_________________________________________________

### ![ico-25 icon] {{p81}}

{{p82}}

~~~demo
> true || true
< true
> false || true
< true
> true || false
< true
> false || false
< false
~~~

◘◘![ico-25 coffee] ** 8**◘◘

~~~js
5 > 8 || 4 < 5   // true

// explanation:

5 > 8            // false,
4 < 5            // true,
false || true    // true
~~~

◘◘![ico-25 coffee] ** 9**◘◘

~~~js
5 > 8 || 4 > 5   // false

// explanation:

5 > 8            // false,
4 > 5            // false,
false || false   // false
~~~

◘◘![ico-25 coffee] **10**◘◘

~~~js
var x = 4, y = 10, z = 8

x > y || z < y   // true

// explanation:

x > y            // false,
z < y            // true,
false || true    // true
~~~

◘◘![ico-25 coffee] **11**◘◘

~~~js
x > y || z > y   // false

// explanation:

x > y            // false,
z > y            // false,
false || false   // false
~~~

{{p83}}

![](illustrations/logical-operators-1.svg)

◘◘![ico-25 coffee] **12**◘◘

~~~js
var object = {
  color: 'yellow',
  shape: 'square',
  size: 100
}

var test = object.color === 'red' || object.shape === 'circle' || object.size > 50
~~~

~~~console
true
~~~
_________________________________________________________________________

{{p84}}

~~~js
!test || !!test    // всегда  true

!test && !!test    // всегда  false
~~~

_________________________________________________________________________

### ![ico-25 icon] Tests

◘◘![ico-25 hw] ** 1**◘◘

~~~js
var x = undefined
~~~

→→→ x ◧ !x | undefined, null, true, false | true →→→

◘◘![ico-25 hw] ** 2**◘◘

~~~js
var x = undefined
~~~

→→→ x && !x | undefined, null, true, false | undefined →→→

◘◘![ico-25 hw] ** 3**◘◘

~~~js
var x = null
~~~

→→→ x ◧ !x | undefined, null, true, false | true →→→

◘◘![ico-25 hw] ** 4**◘◘

~~~js
var x = null
~~~

→→→ x && !x | undefined, null, true, false | null →→→

◘◘![ico-25 hw] ** 5**◘◘

~~~js
var x = NaN
~~~

→→→ x ◧ !x | NaN, null, true, false | true →→→

◘◘![ico-25 hw] ** 6**◘◘

~~~js
var x = NaN
~~~

→→→ x && !x | NaN, null, true, false | NaN →→→

◘◘![ico-25 hw] ** 7**◘◘

~~~js
var x = 5
~~~

→→→ x ◧ !x | NaN, null, 5, true, false | 5 →→→

◘◘![ico-25 hw] ** 8**◘◘

~~~js
var x = 5
~~~

→→→ x && !x | NaN, null, 5, true, false | false →→→


◘◘![ico-25 hw] ** 9**◘◘

~~~js
var x = 'Hi!'
~~~

→→→ x ◧ !x | undefined, 'Hi!', true, false | Hi! →→→


◘◘![ico-25 hw] **10**◘◘

~~~js
var x = 'Hi!'
~~~

→→→ x && !x | undefined, 'Hi!', true, false | false →→→

◘◘![ico-25 hw] **11**◘◘

~~~js
var x = ''
~~~

→→→ x ◧ !x | undefined, '""', true, false | true →→→


◘◘![ico-25 hw] **12**◘◘

~~~js
var x = ''
~~~

→→→ x && !x | undefined, '""', true, false | "" →→→


◘◘![ico-25 hw] **13**◘◘

~~~js
var x = 4, y = 10
~~~

→→→ (x > y) ◧ (x < 5) | 4, 10, true, false | true →→→


◘◘![ico-25 hw] **14**◘◘

~~~js
var x = 4, y = 10
~~~

→→→ (x > y) && (x < 5) | 4, 10, true, false | false →→→


◘◘![ico-25 hw] **15**◘◘

~~~js
var students = ['Piter', 'Anna', 'Demid', 'Josef']
~~~

→→→ students.length && students[1] | 4, 'Piter', 'Anna', 'Demid', 'Josef', true, false | Anna →→→


◘◘![ico-25 hw] **16**◘◘

~~~js
var students = ['Piter', 'Anna', 'Demid', 'Josef']
~~~

→→→ students.length ◧ students[2] | 4, 'Piter', 'Anna', 'Demid', 'Josef', true, false | 4 →→→


◘◘![ico-25 hw] **17**◘◘

~~~js
var students = ['Piter', 'Anna', 'Demid', 'Josef']
~~~

→→→ students.length > 4 ◧ students[2] | 4, 'Piter', 'Anna', 'Demid', 'Josef', true, false | Demid →→→


◘◘![ico-25 hw] **18**◘◘

~~~js
var array = [true, 'Google', NaN, undefined]
~~~

→→→ array.length > 4 ◧ typeof array[2] | 4, 'string', 'number', 'boolean', 'object', true, false | number →→→

◘◘![ico-25 hw] **19**◘◘

~~~js
var array = [true, 'Google', NaN, undefined]
~~~

→→→ array.length > 4 ◧ typeof array[2] | 4, 'string', 'number', 'boolean', 'object', true, false | number →→→


◘◘![ico-25 hw] **20**◘◘

~~~js
var alpha = NaN
var betta = typeof alpha
~~~

→→→ b === 'number' | NaN, 'number', 'boolean', true, false | true →→→


◘◘![ico-25 hw] **21**◘◘

~~~js
var alpha = NaN
var betta = typeof alpha === 'string'
~~~

→→→  !a && !b | NaN, true, false | true →→→
