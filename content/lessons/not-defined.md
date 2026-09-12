# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

~~~html
<body>
  <hello-element></hello-element>
  <bye-element></bye-element>
</body>
~~~

{{s1.p2}}

~~~js
document.querySelectorAll(':not(:defined)')
~~~

{{s1.p3}}

~~~console
▶ NodeList(2) [hello-element, bye-element]
~~~

{{s1.p4}}

~~~js
document.querySelectorAll(':defined')
~~~

{{s1.p5}}

~~~console
▶ NodeList(3) [html, head, body]
~~~
