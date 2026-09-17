# ![ico-35 study] {{p1}}

{{p2}}
{{p3}}
{{p4}}
{{p5}}

{{p6}}

{{p7}}
{{p8}}

{{p9}}
{{p10}}
{{p11}}

{{p12}}
{{p13}}

{{p14}}
{{p15}}
{{p16}}
{{p17}}

{{p18}}

{{p19}}
{{p20}}
{{p21}}
{{p22}}

{{p23}}

## ![ico-30 icon] Syntax

{{p24}}

~~~js
for (initialization; condition; update) {
  ...body od the loop
}
~~~

{{p25}}
~~~js
// initialization:
var index = 0
// condition:
index < 10
// update:
index++
~~~

{{p26}}

~~~js
for (var index = 0; index < 10; index++) {
  ...body of the loop
}
~~~

{{p27}}

_____________________________________________________________________

## ![ico-30 icon] {{p28}}

{{p29}}

{{p30}}
{{p31}}

~~~js
for (; ;) {
  console.log('Iteration')
  if (Math.random() < 0.5) break
}
~~~

{{p32}}

{{p33}}
{{p34}}
{{p35}}
{{p36}}

{{p37}}

~~~js
for (var i = 1; ; i++) {
  if (i > 10) break
  console.log(i)
}
~~~

{{p38}}

_____________________________________________________________________

## ![ico-25 icon] {{p39}}

{{p40}}

{{p41}}

~~~js
for (var i = 1; i < 10; i++) {
  if (i % 2 === 0) console.log(i)
}
~~~

{{p42}}

~~~js
for (var i = 1; i < 10; i++) {
  if (i % 2 !== 0) continue
  console.log(i)
}
~~~

{{p43}}

{{p44}}

{{p45}}

______________________________________________________

## ![ico-30 icon] Examples

◘◘![ico-25 cap]** 1**◘◘

~~~js
var res = 0

for (var i = 0; i < 10; i++) {
  res += i * 2
}
~~~

{{p46}}

~~~js
(var i = 0; i < 10; i++)
~~~

{{p47}}
{{p48}}
{{p49}}

{{p50}}
{{p51}}
{{p52}}
{{p53}}
{{p54}}
{{p55}}
{{p56}}

{{p57}}

_________________________________________________________________

◘◘![ico-25 cap]** 2**◘◘

~~~js
for (var i = 1; i < 10;) {
  console.log(i++)
}
~~~

{{p58}}
{{p59}}
{{p60}}
{{p61}}

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

{{p62}}
____________________________________________________________________

{{p63}}

~~~js
var res = 0, arr = [2, 1, 5, 3], i

for (i = 0; i < arr.length; i++) {
  res += arr[i]
}
~~~

{{p64}}

{{p65}}

{{p66}}

~~~js
i < arr.length
~~~

{{p67}}

{{p68}}

{{p69}}

{{p70}}

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

→→→ {{p71}} | {{p72}} | {{p73}}→→→


◘◘![ico-25 hw] **2-3**◘◘
~~~js
var x = 0, y = 0, numbers = [1, 2, 3, 4]

var res_x = 0, res_y = 0

for (var i = 0; i < arr.length-1; i++) {
  res_x += numbers[x++]
  res_y += numbers[++y]
}
~~~

→→→ {{p74}} | {{p75}} | {{p76}}→→→
→→→ {{p77}} | {{p78}} | {{p79}}→→→

◘◘![ico-25 hw]** 4**◘◘

~~~js
for (var number = 11; number > 2; number -= 2) {
  number++
}
~~~

→→→ {{p80}} | {{p81}} | {{p82}}→→→

◘◘![ico-25 hw]** 5**◘◘

~~~js
for (var number = 7; number > 2; --number) {
  number--
}
~~~

→→→ {{p83}} | {{p84}} | {{p85}}→→→

◘◘![ico-25 hw]** 6**◘◘

~~~js
for (var number = -1; number-- > -11; number *= 2) {}
~~~

→→→ {{p86}} | {{p87}} | {{p88}}→→→

◘◘![ico-25 hw]** 7**◘◘

~~~js
var messages = ['Hi! ', 'Welcome! ', 'Nice to see you. ', 'How are you?']

var message = ''

for (var index = -1; index < messages.length; index += 2) {
  message += messages[index] || ''
}
~~~

→→→ {{p89}} | {{p90}} | {{p91}}→→→
____________________________________________________________________

[![ico-20 link] MDN](external/mdn-for)
