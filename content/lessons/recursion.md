# ![ico-30 study] {{p1}}

{{p2}}

{{p3}}

{{p4}}
{{p5}}

{{p6}}

{{p7}}

^^^[{{p8}}]

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

{{p9}}

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

{{p10}}

{{p11}}

{{p12}}

{{p13}}

[![ico-70 youtube]](https://www.youtube.com/watch?time_continue=2&v=nbqLBlanSMk)

{{p14}}
{{p15}}

## ![ico-25 hw] {{common.c3}}

{{p16}}

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
{{p17}}

____________________________

※※※tests ⟦f1⟧※※※
