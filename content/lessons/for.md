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

## ![ico-30 icon] {{s2.h1}}

{{s2.p1}}

~~~js
for (initialization; condition; update) {
  ...body od the loop
}
~~~

{{s2.p2}}
~~~js
// initialization:
var index = 0
// condition:
index < 10
// update:
index++
~~~

{{s2.p3}}

~~~js
for (var index = 0; index < 10; index++) {
  ...body of the loop
}
~~~

{{s2.p4}}

_____________________________________________________________________

## ![ico-30 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}
{{s3.p3}}

~~~js
for (; ;) {
  console.log('Iteration')
  if (Math.random() < 0.5) break
}
~~~

{{s3.p4}}

{{s3.p5}}
{{s3.p6}}
{{s3.p7}}
{{s3.p8}}

{{s3.p9}}

~~~js
for (var i = 1; ; i++) {
  if (i > 10) break
  console.log(i)
}
~~~

{{s3.p10}}

_____________________________________________________________________

## ![ico-25 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

~~~js
for (var i = 1; i < 10; i++) {
  if (i % 2 === 0) console.log(i)
}
~~~

{{s4.p3}}

~~~js
for (var i = 1; i < 10; i++) {
  if (i % 2 !== 0) continue
  console.log(i)
}
~~~

{{s4.p4}}

{{s4.p5}}

{{s4.p6}}

______________________________________________________

## ![ico-30 icon] {{s5.h1}}

{{s5.p1}}

~~~js
var res = 0

for (var i = 0; i < 10; i++) {
  res += i * 2
}
~~~

{{s5.p2}}

~~~js
(var i = 0; i < 10; i++)
~~~

{{s5.p3}}
{{s5.p4}}
{{s5.p5}}

{{s5.p6}}
{{s5.p7}}
{{s5.p8}}
{{s5.p9}}
{{s5.p10}}
{{s5.p11}}
{{s5.p12}}

{{s5.p13}}

_________________________________________________________________

{{s5.p14}}

~~~js
for (var i = 1; i < 10;) {
  console.log(i++)
}
~~~

{{s5.p15}}
{{s5.p16}}
{{s5.p17}}
{{s5.p18}}

_________________________________________________________________

{{s5.p19}}

~~~js
var res = 0

for (var i = 100; i > 0; i--) {
  res += i % 2
}

console.log(res)
~~~
_________________________________________________________________

{{s5.p20}}

~~~js
for (var i = 2; i < 100; i *= 2) {
  console.log(i)
}
~~~

{{s5.p21}}
____________________________________________________________________

{{s5.p22}}

~~~js
var res = 0, arr = [2, 1, 5, 3], i

for (i = 0; i < arr.length; i++) {
  res += arr[i]
}
~~~

{{s5.p23}}

{{s5.p24}}

{{s5.p25}}

~~~js
i < arr.length
~~~

{{s5.p26}}

{{s5.p27}}

{{s5.p28}}

{{s5.p29}}

~~~js
for (var i = 1; i < 20; i += 2) {
  console.log(i)
}
~~~

______________________________________________________

## ![ico-30 icon] {{s6.h1}}

{{s6.p1}}

~~~js
var number = 5

for (; number > 2; number -= 2) {
  ++number
}
~~~

→→→ {{s6.quiz1}} | {{s6.quizVariants1}} | {{s6.quizAnswer1}}→→→


{{s6.p2}}
~~~js
var x = 0, y = 0, numbers = [1, 2, 3, 4]

var res_x = 0, res_y = 0

for (var i = 0; i < arr.length-1; i++) {
  res_x += numbers[x++]
  res_y += numbers[++y]
}
~~~

→→→ {{s6.quiz2}} | {{s6.quizVariants2}} | {{s6.quizAnswer2}}→→→
→→→ {{s6.quiz3}} | {{s6.quizVariants3}} | {{s6.quizAnswer3}}→→→

{{s6.p3}}

~~~js
for (var number = 11; number > 2; number -= 2) {
  number++
}
~~~

→→→ {{s6.quiz4}} | {{s6.quizVariants4}} | {{s6.quizAnswer4}}→→→

{{s6.p4}}

~~~js
for (var number = 7; number > 2; --number) {
  number--
}
~~~

→→→ {{s6.quiz5}} | {{s6.quizVariants5}} | {{s6.quizAnswer5}}→→→

{{s6.p5}}

~~~js
for (var number = -1; number-- > -11; number *= 2) {}
~~~

→→→ {{s6.quiz6}} | {{s6.quizVariants6}} | {{s6.quizAnswer6}}→→→

{{s6.p6}}

~~~js
var messages = ['Hi! ', 'Welcome! ', 'Nice to see you. ', 'How are you?']

var message = ''

for (var index = -1; index < messages.length; index += 2) {
  message += messages[index] || ''
}
~~~

→→→ {{s6.quiz7}} | {{s6.quizVariants7}} | {{s6.quizAnswer7}}→→→
____________________________________________________________________

{{s6.p7}}
