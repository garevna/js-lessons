# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}
{{s1.p4}}

{{s1.p5}}

{{s1.p6}}

^^^[{{s1.spoiler1}}]

![ico-25 cap] ** 1**

~~~js
function factorial (num, result) {
  result = (!result ? 1 : res) * num--
  return num < 2 ? result : factorial(num, result)
}
~~~

![ico-25 cap] ** 2**

~~~js
function factorial (n, result = 1) {
  result *= n--
  return n < 2 ? result : factorial(n, result)
}
~~~

![ico-25 cap] ** 3**

~~~js
function factorial (n, result) {
  while (n > 1)
    return factorial(n - 1, n * (!result ? 1 : result))
  return result
}
~~~

![ico-25 cap] ** 4**

~~~js
function factorial (n, result = 1) {
  return n < 2 ? result : factorial(n - 1, n * result)
}
~~~

^^^

{{s1.p7}}

◘◘![ico-25 cap] ** 5**◘◘

~~~js
function factor (num) {
  var res = 1
  return (function fact () {
    res *= num
    return num < 2 ? res : fact (--num)
  })()
}
~~~

{{s1.p8}}

{{s1.p9}}

{{s1.p10}}

{{s1.p11}}

[![ico-70 youtube]](https://www.youtube.com/watch?time_continue=2&v=nbqLBlanSMk)

{{s1.p12}}
{{s1.p13}}

## ![ico-25 hw] {{common.c3}}

{{s2.p1}}

~~~js
var circle = function (radius) {
  var elem = document.createElement('div')
        document.body.appendChild ( elem )
        elem.style = `
             position: absolute;
             width: ${radius}px;
             height: ${radius}px;
             border-radius: 50%;
             border: solid 1px green;
        `
        if ( radius < 300 ) circle ( radius += 20 )
}
~~~
{{s2.p2}}

____________________________

{{s2.p3}}
