# ![ico-35 study] {{s1.h1}}

{{s1.p1}}
{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

## ![ico-30 icon] while

{{s1.p5}}

~~~javascript
while (условие) {
  ...тело цикла
}
~~~

{{s1.p6}}

{{s1.p7}}
{{s1.p8}}
{{s1.p9}}

◘◘![ico-25 cap] ** 1**◘◘

~~~js
var n = 5

while (n < 5) {
  console.log(n)
}
~~~

{{s1.p10}}

◘◘![ico-25 cap] ** 2**◘◘

~~~js
var res = 0, n = 1

while (n) {
  n = prompt('Enter the number')
  res += (n - 0) || 0
}
~~~

{{s1.p11}}
{{s1.p12}}
{{s1.p13}}

{{s1.p14}}

◘◘![ico-25 cap] ** 3**◘◘

~~~js
var res = 0, n = 0

while (n < 0.5) {
  n = Math.random()
  res += n
}
~~~

{{s1.p15}}

______________________

## ![ico-30 icon] do...while

{{s1.p16}}

~~~js
do {
  ...
} while (условие)
~~~

{{s1.p17}}

{{s1.p18}}
{{s1.p19}}

◘◘![ico-25 cap] ** 4**◘◘

~~~js
do {
  var rand = Math.random()
  console.log(rand)
} while (rand < .5)
~~~

______________________________________________________

## ![ico-30 icon] Tests

◘◘![ico-25 hw]** 1**◘◘
~~~js
do {
  var rand = Math.random()
  if (rand > .5) break
} while (true)
~~~

→→→ {{common.c273}} | {{s1.quizVariants1}} | {{s1.quizAnswer1}}→→→

◘◘![ico-25 hw]** 2**◘◘
~~~js
var num = 1

while (Math.random() < .5) {
  num *= (num + 1)
}
~~~

→→→ {{common.c273}} | {{s1.quizVariants2}} | {{s1.quizAnswer2}}→→→

◘◘![ico-25 hw]** 3**◘◘
~~~js
var num = prompt('Enter the integer') - 0
var res = 0

while (true) {
  num >= 2 && res++
  num /= 2
  if (num < 2) {
    console.log(`2 ** ${res} = ${2 ** res}`)
    break
  }
}
~~~

→→→ {{s1.quiz3}} | {{s1.quizVariants3}} | {{s1.quizAnswer3}}→→→

◘◘![ico-25 hw]** 4**◘◘
~~~js
var num = prompt('Enter the integer') - 0
var res = 1

while (true) {
  res *= num--
  if (num < 2) {
    console.log(`Factorial: ${res}`)
    break
  }
}
~~~

→→→ {{s1.quiz4}} | {{s1.quizVariants4}} | {{s1.quizAnswer4}}→→→

________________

[![ico-30 hw] **Quiz**](quiz/while)
