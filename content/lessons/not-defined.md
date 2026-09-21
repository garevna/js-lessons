# ![ico-30 study] {{p1}}

![ico-25 cap] ** 1 **

~~~html
<body>
  <hello-element></hello-element>
  <bye-element></bye-element>
</body>
~~~

{{p2}}

~~~js
document.querySelectorAll(':not(:defined)')
~~~

~~~console
▶ NodeList(2) [hello-element, bye-element]
~~~

{{p3}}

~~~js
document.querySelectorAll(':defined')
~~~

~~~console
▶ NodeList(3) [html, head, body]
~~~
