# ![ico-30 study] {{p1}}

**ES6**

{{p2}}

![ico-25 cap] ** 1 **

~~~js
var display = function (name = 'user', text = 'welcome') {
  return  text + ', ' + name
}
~~~

{{p3}}

~~~js
display()
~~~

{{p4}}
{{p5}}

~~~js
display('Иван')
~~~

{{p6}}

{{p7}}

~~~js
display('Иван', 'Добро пожаловать')
~~~

{{p8}}

{{p9}}

~~~js
display(null, 'Добро пожаловать')
~~~

{{p10}}

{{p11}}

{{p12}}

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
