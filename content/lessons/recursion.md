# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}
{{s1.p4}}

{{s1.p5}}

{{s1.p6}}

^^^[{{s1.spoiler1}}]

{{s1.p7}}

~~~js
function factorial (num, result) {
  result = (!result ? 1 : res) * num--
  return num < 2 ? result : factorial(num, result)
}
~~~

{{s1.p8}}

~~~js
function factorial (n, result = 1) {
  result *= n--
  return n < 2 ? result : factorial(n, result)
}
~~~

{{s1.p9}}

~~~js
function factorial (n, result) {
  while (n > 1)
    return factorial(n - 1, n * (!result ? 1 : result))
  return result
}
~~~

{{s1.p10}}

~~~js
function factorial (n, result = 1) {
  return n < 2 ? result : factorial(n - 1, n * result)
}
~~~

^^^

{{s1.p11}}

{{s1.p12}}

~~~js
function factor (num) {
  var res = 1
  return (function fact () {
    res *= num
    return num < 2 ? res : fact (--num)
  })()
}
~~~

{{s1.p13}}

{{s1.p14}}

{{s1.p15}}

{{s1.p16}}

[![ico-70 youtube]](https://www.youtube.com/watch?time_continue=2&v=nbqLBlanSMk)

{{s1.p17}}
{{s1.p18}}

## ![ico-25 hw] {{s2.h1}}

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
