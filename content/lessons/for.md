# ![ico-35 study] {{s1.h1}}

{{s1.p1}}
{{s1.p2}}
{{s1.p3}}
{{s1.p4}}

{{s1.p5}}

{{s1.p6}}
{{s1.p7}}

{{s1.p8}}
{{s1.p9}}
{{s1.p10}}

{{s1.p11}}
{{s1.p12}}

{{s1.p13}}
{{s1.p14}}
{{s1.p15}}
{{s1.p16}}

{{s1.p17}}

{{s1.p18}}
{{s1.p19}}
{{s1.p20}}
{{s1.p21}}

{{s1.p22}}

## ![ico-30 icon] Syntax

{{s1.p23}}

~~~js
for (initialization; condition; update) {
  ...body od the loop
}
~~~

{{s1.p24}}
~~~js
// initialization:
var index = 0
// condition:
index < 10
// update:
index++
~~~

{{s1.p25}}

~~~js
for (var index = 0; index < 10; index++) {
  ...body of the loop
}
~~~

{{s1.p26}}

_____________________________________________________________________

## ![ico-30 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}
{{s2.p3}}

~~~js
for (; ;) {
  console.log('Iteration')
  if (Math.random() < 0.5) break
}
~~~

{{s2.p4}}

{{s2.p5}}
{{s2.p6}}
{{s2.p7}}
{{s2.p8}}

{{s2.p9}}

~~~js
for (var i = 1; ; i++) {
  if (i > 10) break
  console.log(i)
}
~~~

{{s2.p10}}

_____________________________________________________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

~~~js
for (var i = 1; i < 10; i++) {
  if (i % 2 === 0) console.log(i)
}
~~~

{{s3.p3}}

~~~js
for (var i = 1; i < 10; i++) {
  if (i % 2 !== 0) continue
  console.log(i)
}
~~~

{{s3.p4}}

{{s3.p5}}

{{s3.p6}}

______________________________________________________

## ![ico-30 icon] Examples

◘◘![ico-25 cap]** 1**◘◘

~~~js
var res = 0

for (var i = 0; i < 10; i++) {
  res += i * 2
}
~~~

{{s3.p7}}

~~~js
(var i = 0; i < 10; i++)
~~~

{{s3.p8}}
{{s3.p9}}
{{s3.p10}}

{{s3.p11}}
{{s3.p12}}
{{s3.p13}}
{{s3.p14}}
{{s3.p15}}
{{s3.p16}}
{{s3.p17}}

{{s3.p18}}

_________________________________________________________________

◘◘![ico-25 cap]** 2**◘◘

~~~js
for (var i = 1; i < 10;) {
  console.log(i++)
}
~~~

{{s3.p19}}
{{s3.p20}}
{{s3.p21}}
{{s3.p22}}

_________________________________________________________________

◘◘![ico-25 cap]** 3**◘◘

~~~js
var res = 0

for (var i = 100; i > 0; i--) {
  res += i % 2
}

console.log(res)
~~~
_________________________________________________________________

◘◘![ico-25 cap]** 4**◘◘

~~~js
for (var i = 2; i < 100; i *= 2) {
  console.log(i)
}
~~~

{{s3.p23}}
____________________________________________________________________

{{s3.p24}}

~~~js
var res = 0, arr = [2, 1, 5, 3], i

for (i = 0; i < arr.length; i++) {
  res += arr[i]
}
~~~

{{s3.p25}}

{{s3.p26}}

{{s3.p27}}

~~~js
i < arr.length
~~~

{{s3.p28}}

{{s3.p29}}

{{s3.p30}}

{{s3.p31}}

~~~js
for (var i = 1; i < 20; i += 2) {
  console.log(i)
}
~~~

______________________________________________________

## ![ico-30 icon] Tests

◘◘![ico-25 hw]** 1**◘◘

~~~js
var number = 5

for (; number > 2; number -= 2) {
  ++number
}
~~~

→→→ {{s3.quiz1}} | {{s3.quizVariants1}} | {{s3.quizAnswer1}}→→→


◘◘![ico-25 hw] **2-3**◘◘
~~~js
var x = 0, y = 0, numbers = [1, 2, 3, 4]

var res_x = 0, res_y = 0

for (var i = 0; i < arr.length-1; i++) {
  res_x += numbers[x++]
  res_y += numbers[++y]
}
~~~

→→→ {{s3.quiz2}} | {{s3.quizVariants2}} | {{s3.quizAnswer2}}→→→
→→→ {{s3.quiz3}} | {{s3.quizVariants3}} | {{s3.quizAnswer3}}→→→

◘◘![ico-25 hw]** 4**◘◘

~~~js
for (var number = 11; number > 2; number -= 2) {
  number++
}
~~~

→→→ {{s3.quiz4}} | {{s3.quizVariants4}} | {{s3.quizAnswer4}}→→→

◘◘![ico-25 hw]** 5**◘◘

~~~js
for (var number = 7; number > 2; --number) {
  number--
}
~~~

→→→ {{s3.quiz5}} | {{s3.quizVariants5}} | {{s3.quizAnswer5}}→→→

◘◘![ico-25 hw]** 6**◘◘

~~~js
for (var number = -1; number-- > -11; number *= 2) {}
~~~

→→→ {{s3.quiz6}} | {{s3.quizVariants6}} | {{s3.quizAnswer6}}→→→

◘◘![ico-25 hw]** 7**◘◘

~~~js
var messages = ['Hi! ', 'Welcome! ', 'Nice to see you. ', 'How are you?']

var message = ''

for (var index = -1; index < messages.length; index += 2) {
  message += messages[index] || ''
}
~~~

→→→ {{s3.quiz7}} | {{s3.quizVariants7}} | {{s3.quizAnswer7}}→→→
____________________________________________________________________

[![ico-20 link] MDN](external/mdn-for)
