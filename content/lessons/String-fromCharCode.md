# ![ico-30 study] String

{{p1}}
{{p2}}

## ![ico-25 icon] String.fromCharCode()

{{p3}}

{{p4}}

{{p5}}
{{p6}}

![ico-25 cap] ** 1 **

~~~js
String.fromCharCode(123, 105, 125)  // "{i}"
~~~

![ico-25 cap] ** 2 **

~~~js
String.fromCharCode(48, 49, 50, 51, 52, 53) // "012345"
~~~

![ico-25 cap] ** 3 **

~~~js
var str = ''

for (var x = 97; x < 105; x++) {
  str += String.fromCharCode(x)
}

console.log(str) // abcdefgh
~~~

{{p7}}
