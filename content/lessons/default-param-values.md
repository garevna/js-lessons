# ![ico-30 study] {{s1.h1}}

**ES6**

{{s1.p1}}

![ico-25 cap] ** 1 **

~~~js
var display = function (name = 'user', text = 'welcome') {
  return  text + ', ' + name
}
~~~

{{s1.p2}}

~~~js
display()
~~~

{{s1.p3}}
{{s1.p4}}

~~~js
display('Иван')
~~~

{{s1.p5}}

{{s1.p6}}

~~~js
display('Иван', 'Добро пожаловать')
~~~

{{s1.p7}}

{{s1.p8}}

~~~js
display(null, 'Добро пожаловать')
~~~

{{s1.p9}}

{{s1.p10}}

{{s1.p11}}

![ico-25 cap] ** 2 **

~~~js
var calcs = function (x = 1, y = x + 1, z = x + y) {
  console.log (x, y, z)
}

calcs()              //  1 2 3
calcs(2)           //  2 3 5
calcs(4, 8)        //  4 8 12
calcs(3, 1, 7)     //  3 1 7
~~~
