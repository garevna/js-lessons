# ![ico-35 study] {{s1.h1}}

{{s1.p1}}
{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

## ![ico-30 icon] {{s2.h1}}

{{s2.p1}}

~~~javascript
while (условие) {
  ...тело цикла
}
~~~

{{s2.p2}}

{{s2.p3}}
{{s2.p4}}
{{s2.p5}}

{{s2.p6}}

~~~js
var n = 5

while (n < 5) {
  console.log(n)
}
~~~

{{s2.p7}}

{{s2.p8}}

~~~js
var res = 0, n = 1

while (n) {
  n = prompt('Enter the number')
  res += (n - 0) || 0
}
~~~

{{s2.p9}}
{{s2.p10}}
{{s2.p11}}

{{s2.p12}}

{{s2.p13}}

~~~js
var res = 0, n = 0

while (n < 0.5) {
  n = Math.random()
  res += n
}
~~~

{{s2.p14}}

______________________

## ![ico-30 icon] {{s3.h1}}

{{s3.p1}}

~~~js
do {
  ...
} while (условие)
~~~

{{s3.p2}}

{{s3.p3}}
{{s3.p4}}

{{s3.p5}}

~~~js
do {
  var rand = Math.random()
  console.log(rand)
} while (rand < .5)
~~~

______________________________________________________

## ![ico-30 icon] {{s4.h1}}

{{s4.p1}}
~~~js
do {
  var rand = Math.random()
  if (rand > .5) break
} while (true)
~~~

→→→ {{s4.quiz1}} | {{s4.quizVariants1}} | {{s4.quizAnswer1}}→→→

{{s4.p2}}
~~~js
var num = 1

while (Math.random() < .5) {
  num *= (num + 1)
}
~~~

→→→ {{s4.quiz2}} | {{s4.quizVariants2}} | {{s4.quizAnswer2}}→→→

{{s4.p3}}
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

→→→ {{s4.quiz3}} | {{s4.quizVariants3}} | {{s4.quizAnswer3}}→→→

{{s4.p4}}
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

→→→ {{s4.quiz4}} | {{s4.quizVariants4}} | {{s4.quizAnswer4}}→→→

________________

{{s4.p5}}
