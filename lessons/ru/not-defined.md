# ![ico-30 study] Селектор :not(:defined)⟪selektor_:not(:defined)⟫

![ico-25 cap] ** 1 **

~~~html
<body>
  <hello-element></hello-element>
  <bye-element></bye-element>
</body>
~~~

Запрос

~~~js
document.querySelectorAll(':not(:defined)')
~~~

~~~console
▶ NodeList(2) [hello-element, bye-element]
~~~

Запрос

~~~js
document.querySelectorAll(':defined')
~~~

~~~console
▶ NodeList(3) [html, head, body]
~~~
