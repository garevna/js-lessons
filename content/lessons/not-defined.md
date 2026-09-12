# ![ico-30 study] {{s1.h1}}

![ico-25 cap] ** 1 **

~~~html
<body>
  <hello-element></hello-element>
  <bye-element></bye-element>
</body>
~~~

{{s1.p1}}

~~~js
document.querySelectorAll(':not(:defined)')
~~~

{{s1.p2}}

~~~console
▶ NodeList(2) [hello-element, bye-element]
~~~

{{s1.p3}}

~~~js
document.querySelectorAll(':defined')
~~~

{{s1.p4}}

~~~console
▶ NodeList(3) [html, head, body]
~~~
