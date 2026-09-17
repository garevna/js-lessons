# ![ico-35 study] {{p1}}

{{p2}}
{{p3}}

{{p4}}

{{p5}}

## ![ico-30 icon] while

{{p6}}

~~~javascript
while (условие) {
  ...тело цикла
}
~~~

{{p7}}

{{p8}}
{{p9}}
{{p10}}

◘◘![ico-25 cap] ** 1**◘◘

~~~js
var n = 5

while (n < 5) {
  console.log(n)
}
~~~

{{p11}}

◘◘![ico-25 cap] ** 2**◘◘

~~~js
var res = 0, n = 1

while (n) {
  n = prompt('Enter the number')
  res += (n - 0) || 0
}
~~~

{{p12}}
{{p13}}
{{p14}}

{{p15}}

◘◘![ico-25 cap] ** 3**◘◘

~~~js
var res = 0, n = 0

while (n < 0.5) {
  n = Math.random()
  res += n
}
~~~

{{p16}}

______________________

## ![ico-30 icon] do...while

{{p17}}

~~~js
do {
  ...
} while (условие)
~~~

{{p18}}

{{p19}}
{{p20}}

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

→→→ {{p21}} | {{p22}} | {{p23}}→→→

◘◘![ico-25 hw]** 2**◘◘
~~~js
var num = 1

while (Math.random() < .5) {
  num *= (num + 1)
}
~~~

→→→ {{p24}} | {{p25}} | {{p26}}→→→

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

→→→ {{p27}} | {{p28}} | {{p29}}→→→

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

→→→ {{p30}} | {{p31}} | {{p32}}→→→

________________

[![ico-30 hw] **Quiz**](quiz/while)
