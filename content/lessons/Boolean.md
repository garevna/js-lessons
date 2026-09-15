# ![ico-35 study] {{s1.h1}}

{{s1.p1}}

## ![ico-30 icon] {{s2.h1}}

{{s2.p1}}

![](illustrations/logical-expressions.svg)

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

______________________________________

## ![ico-30 icon] {{s3.h1}}

{{s3.p1}}

![](illustrations/logical-expressions-1.svg)

{{s3.p2}}

◘◘ ![ico-25 coffee] ** 1**◘◘
~~~js
var apple = {
  color: 'yellow',
  shape: 'square'
}
~~~

{{s3.p3}}

{{s3.p4}}

| apple.color | apple.shape | appleIsRed | appleIsRound | appleIsRedAndRound |
|   'red'     |   'round'   |   ~true~   | ~true~       |   ~true~           |
|   'yellow'  |   'round'   |   ~false~  | ~true~       |   ~false~          |
|   'red'     |   'square'  |   ~true~   | ~false~      |   ~false~          |
|   'green'   |   'square'  |   ~false~  | ~false~      |   ~false~          |

{{s3.p5}}

{{s3.p6}}

{{s3.p7}}

{{s3.p8}}

{{s3.p9}}

_________________________________________________________________________

### ![ico-25 icon] {{s4.h1}}

{{s4.p1}}
{{s4.p2}}
{{s4.p3}}
{{s4.p4}}
{{s4.p5}}

{{s4.p6}}
{{s4.p7}}
{{s4.p8}}
{{s4.p9}}
{{s4.p10}}
{{s4.p11}}
{{s4.p12}}
{{s4.p13}}
{{s4.p14}}

{{s4.p15}}
{{s4.p16}}
{{s4.p17}}

§§§§ Demo | boolean_01_template §§§§

_________________________________________________________________________

### ![ico-30 hw] {{common.c11}}

◘◘![ico-25 hw]** 1**◘◘

→→→ 5 > '4' | true, false | true→→→

◘◘![ico-25 hw]** 2**◘◘

→→→ 5 !== '5' | true, false | true→→→

◘◘![ico-25 hw]** 3**◘◘

→→→ 10 != '10' | true, false | false→→→

◘◘![ico-25 hw]** 4**◘◘

→→→ true != 1 | true, false | false→→→

◘◘![ico-25 hw]** 5**◘◘

→→→ {{s5.quiz1}} | {{s5.quizVariants1}} | {{s5.quizAnswer1}}→→→

◘◘![ico-25 hw]** 6**◘◘

→→→ true <= 1 | true, false | true→→→

◘◘![ico-25 hw]** 7**◘◘

→→→ 'abc' < 'cde' | true, false | true→→→

◘◘![ico-25 hw]** 8**◘◘

→→→ 'Welcome!'.length < 'How are you?'.length | true, false | true→→→

__________________________________________________________________________

## ![ico-30 icon] {{s6.h1}}

{{s6.p1}}

{{s6.p2}}
{{s6.p3}}

{{s6.p4}}
{{s6.p5}}

{{s6.p6}}
{{s6.p7}}

{{s6.p8}}

{{s6.p9}}
{{s6.p10}}
{{s6.p11}}
{{s6.p12}}

_____________________________________________

### ![ico-25 icon] {{s7.h1}}

{{s7.p1}}
{{s7.p2}}
{{s7.p3}}

~~~js
var apple = {
  color: 'yellow',
  shape: 'square'
}

var appleIsRed = apple.color === 'red'
var appleIsRound = apple.shape === 'round'
~~~

{{s7.p4}}

{{s7.p5}}

~~~js
var appleIsNotRed = !appleIsRed
~~~

{{s7.p6}}
{{s7.p7}}

◘◘![ico-25 coffee] ** 2**◘◘

~~~js
!(5 > 8)    // true

// explanation:

5 > 8      // false,
!false     // true
~~~

◘◘![ico-25 coffee] ** 3**◘◘

~~~js
!(5 > 4)   // false

// explanation:

5 > 4      // true,
!true      // false
~~~

§§§§ Demo | boolean_02_template §§§§

____________________________________________________________

### ![ico-25 icon] {{s8.h1}}

{{s8.p1}}

{{s8.p2}}

~~~js
var apple = {
  color: 'yellow',
  shape: 'square'
}

var appleIsRed = apple.color === 'red'
var appleIsRound = apple.shape === 'round'
~~~

{{s8.p3}}

~~~js
var appleIsRedAndRound = appleIsRed && appleIsRound
~~~

§§§§ Demo | boolean_03_template §§§§

{{s8.p4}}
{{s8.p5}}

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

{{s8.p6}}
{{s8.p7}}

§§§§ Demo | boolean_04_template §§§§

{{s8.p8}}

![](illustrations/logical-operators.svg)

{{s8.p9}}
{{s8.p10}}

§§§§ Demo | boolean_05_template §§§§

_________________________________________________

### ![ico-25 icon] {{s9.h1}}

{{s9.p1}}

§§§§ Demo | boolean_06_template §§§§

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

{{s9.p2}}

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

{{s9.p3}}

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
