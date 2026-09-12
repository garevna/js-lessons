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

{{s3.p3}}
~~~js
var apple = {
  color: 'yellow',
  shape: 'square'
}
~~~

{{s3.p4}}

{{s3.p5}}

{{s3.p6}}
{{s3.p7}}
{{s3.p8}}
{{s3.p9}}
{{s3.p10}}

{{s3.p11}}

{{s3.p12}}

{{s3.p13}}

{{s3.p14}}

{{s3.p15}}

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

§§§§ {{s4.demo1}} | boolean_01_template §§§§

_________________________________________________________________________

### ![ico-30 hw] {{s5.h1}}

{{s5.p1}}

→→→ {{s5.quiz1}} | {{s5.quizVariants1}} | {{s5.quizAnswer1}}→→→

{{s5.p2}}

→→→ {{s5.quiz2}} | {{s5.quizVariants2}} | {{s5.quizAnswer2}}→→→

{{s5.p3}}

→→→ {{s5.quiz3}} | {{s5.quizVariants3}} | {{s5.quizAnswer3}}→→→

{{s5.p4}}

→→→ {{s5.quiz4}} | {{s5.quizVariants4}} | {{s5.quizAnswer4}}→→→

{{s5.p5}}

→→→ {{s5.quiz5}} | {{s5.quizVariants5}} | {{s5.quizAnswer5}}→→→

{{s5.p6}}

→→→ {{s5.quiz6}} | {{s5.quizVariants6}} | {{s5.quizAnswer6}}→→→

{{s5.p7}}

→→→ {{s5.quiz7}} | {{s5.quizVariants7}} | {{s5.quizAnswer7}}→→→

{{s5.p8}}

→→→ {{s5.quiz8}} | {{s5.quizVariants8}} | {{s5.quizAnswer8}}→→→

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

{{s7.p8}}

~~~js
!(5 > 8)    // true

// explanation:

5 > 8      // false,
!false     // true
~~~

{{s7.p9}}

~~~js
!(5 > 4)   // false

// explanation:

5 > 4      // true,
!true      // false
~~~

§§§§ {{s7.demo1}} | boolean_02_template §§§§

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

§§§§ {{s8.demo1}} | boolean_03_template §§§§

{{s8.p4}}
{{s8.p5}}

{{s8.p6}}

~~~js
5 > 8 && 4 < 5   // false  
// explanation:
5 > 8            // false
4 < 5            // true
false && true    // false
~~~

{{s8.p7}}

~~~js
8 < 5 && 4 < 5   // false
// explanation:
8 > 5            // false
4 < 5            // true
false && true    // false
~~~

{{s8.p8}}

~~~js
var x = 4, y = 10, z = 8

x > y && z < y   // false
// explanation:
x > y            // false,
z < y            // true,
false && true    // false
~~~

{{s8.p9}}

~~~js
var x = 4, y = 10, z = 8

x < y && z < y   // true
// explanation:
x < y            // true,
z < y            // true,
true && true     // true
~~~

{{s8.p10}}
{{s8.p11}}

§§§§ {{s8.demo2}} | boolean_04_template §§§§

{{s8.p12}}

![](illustrations/logical-operators.svg)

{{s8.p13}}
{{s8.p14}}

§§§§ {{s8.demo3}} | boolean_05_template §§§§

_________________________________________________

### ![ico-25 icon] {{s9.h1}}

{{s9.p1}}

§§§§ {{s9.demo1}} | boolean_06_template §§§§

{{s9.p2}}

~~~js
5 > 8 || 4 < 5   // true

// explanation:

5 > 8            // false,
4 < 5            // true,
false || true    // true
~~~

{{s9.p3}}

~~~js
5 > 8 || 4 > 5   // false

// explanation:

5 > 8            // false,
4 > 5            // false,
false || false   // false
~~~

{{s9.p4}}

~~~js
var x = 4, y = 10, z = 8

x > y || z < y   // true

// explanation:

x > y            // false,
z < y            // true,
false || true    // true
~~~

{{s9.p5}}

~~~js
x > y || z > y   // false

// explanation:

x > y            // false,
z > y            // false,
false || false   // false
~~~

{{s9.p6}}

![](illustrations/logical-operators-1.svg)

{{s9.p7}}

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

{{s9.p8}}

~~~js
!test || !!test    // всегда  true

!test && !!test    // всегда  false
~~~

_________________________________________________________________________

### ![ico-25 icon] {{s10.h1}}

{{s10.p1}}

~~~js
var x = undefined
~~~

→→→ {{s10.quiz1}} | {{s10.quizVariants1}} | {{s10.quizAnswer1}} →→→

{{s10.p2}}

~~~js
var x = undefined
~~~

→→→ {{s10.quiz2}} | {{s10.quizVariants2}} | {{s10.quizAnswer2}} →→→

{{s10.p3}}

~~~js
var x = null
~~~

→→→ {{s10.quiz3}} | {{s10.quizVariants3}} | {{s10.quizAnswer3}} →→→

{{s10.p4}}

~~~js
var x = null
~~~

→→→ {{s10.quiz4}} | {{s10.quizVariants4}} | {{s10.quizAnswer4}} →→→

{{s10.p5}}

~~~js
var x = NaN
~~~

→→→ {{s10.quiz5}} | {{s10.quizVariants5}} | {{s10.quizAnswer5}} →→→

{{s10.p6}}

~~~js
var x = NaN
~~~

→→→ {{s10.quiz6}} | {{s10.quizVariants6}} | {{s10.quizAnswer6}} →→→

{{s10.p7}}

~~~js
var x = 5
~~~

→→→ {{s10.quiz7}} | {{s10.quizVariants7}} | {{s10.quizAnswer7}} →→→

{{s10.p8}}

~~~js
var x = 5
~~~

→→→ {{s10.quiz8}} | {{s10.quizVariants8}} | {{s10.quizAnswer8}} →→→


{{s10.p9}}

~~~js
var x = 'Hi!'
~~~

→→→ {{s10.quiz9}} | {{s10.quizVariants9}} | {{s10.quizAnswer9}} →→→


{{s10.p10}}

~~~js
var x = 'Hi!'
~~~

→→→ {{s10.quiz10}} | {{s10.quizVariants10}} | {{s10.quizAnswer10}} →→→

{{s10.p11}}

~~~js
var x = ''
~~~

→→→ {{s10.quiz11}} | {{s10.quizVariants11}} | {{s10.quizAnswer11}} →→→


{{s10.p12}}

~~~js
var x = ''
~~~

→→→ {{s10.quiz12}} | {{s10.quizVariants12}} | {{s10.quizAnswer12}} →→→


{{s10.p13}}

~~~js
var x = 4, y = 10
~~~

→→→ {{s10.quiz13}} | {{s10.quizVariants13}} | {{s10.quizAnswer13}} →→→


{{s10.p14}}

~~~js
var x = 4, y = 10
~~~

→→→ {{s10.quiz14}} | {{s10.quizVariants14}} | {{s10.quizAnswer14}} →→→


{{s10.p15}}

~~~js
var students = ['Piter', 'Anna', 'Demid', 'Josef']
~~~

→→→ {{s10.quiz15}} | {{s10.quizVariants15}} | {{s10.quizAnswer15}} →→→


{{s10.p16}}

~~~js
var students = ['Piter', 'Anna', 'Demid', 'Josef']
~~~

→→→ {{s10.quiz16}} | {{s10.quizVariants16}} | {{s10.quizAnswer16}} →→→


{{s10.p17}}

~~~js
var students = ['Piter', 'Anna', 'Demid', 'Josef']
~~~

→→→ {{s10.quiz17}} | {{s10.quizVariants17}} | {{s10.quizAnswer17}} →→→


{{s10.p18}}

~~~js
var array = [true, 'Google', NaN, undefined]
~~~

→→→ {{s10.quiz18}} | {{s10.quizVariants18}} | {{s10.quizAnswer18}} →→→

{{s10.p19}}

~~~js
var array = [true, 'Google', NaN, undefined]
~~~

→→→ {{s10.quiz19}} | {{s10.quizVariants19}} | {{s10.quizAnswer19}} →→→


{{s10.p20}}

~~~js
var alpha = NaN
var betta = typeof alpha
~~~

→→→ {{s10.quiz20}} | {{s10.quizVariants20}} | {{s10.quizAnswer20}} →→→


{{s10.p21}}

~~~js
var alpha = NaN
var betta = typeof alpha === 'string'
~~~

→→→  {{s10.quiz21}} | {{s10.quizVariants21}} | {{s10.quizAnswer21}} →→→
