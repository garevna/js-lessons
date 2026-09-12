## ![ico-25 icon] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}
{{s1.p3}}
__________________________

{{s1.p4}}
{{s1.p5}}
{{s1.p6}}
{{s1.p7}}
{{s1.p8}}
{{s1.p9}}
{{s1.p10}}

{{s1.p11}}

### ![ico-25 cap] {{s2.h1}}

~~~html
<html>
  <head>
    <link
      name="Google"
      id="fonts"
      href="https://fonts.googleapis.com/css?family=Roboto|&amp;display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <form name="form">
      <a name="ref">Home</a>
      <img name="picture">
    </form>
    <div id="div"></div>
    <script name="script"></script>
  </body>
</html>
~~~

{{s2.p1}}

~~~js
document.all.namedItem('Google')  // null
~~~

{{s2.p2}}

~~~js
document.all.namedItem('fonts')
~~~

{{s2.p3}}

~~~console
<link name="Google" id="fonts" href="https://fonts.googleapis.com/css?family=Roboto|&amp;display=swap" rel="stylesheet">
~~~

{{s2.p4}}

_________________________________________

### ![ico-25 cap] {{s3.h1}}

{{s3.p1}}

~~~js
console.log(document.forms.namedItem('form'))
console.log(document.anchors.namedItem('ref'))
console.log(document.images.namedItem('picture'))
console.log(document.scripts.namedItem('script'))
console.log(document.all.namedItem('div'))
~~~

{{s3.p2}}

________________________________________________

### ![ico-25 cap] {{s4.h1}}

{{s4.p1}}

~~~js
function testNamedItem (tagName) {
  var elem = document.body
    .appendChild(document.createElement(tagName))
  elem.id = 'testId'
  elem.name = 'testName'
  console.log('by id: ', document.all.namedItem('testId') ? '+' : '&ndash;')
  console.log('by name: ', document.all.namedItem('testName') ? '+' : '&ndash;')
  document.body.removeChild(elem)
}
~~~

{{s4.p2}}

{{s4.p3}}

{{s4.p4}}
{{s4.p5}}
{{s4.p6}}
{{s4.p7}}
{{s4.p8}}
{{s4.p9}}
{{s4.p10}}
{{s4.p11}}
{{s4.p12}}
{{s4.p13}}
{{s4.p14}}
{{s4.p15}}

{{s4.p16}}

_____________________________________________________

{{s4.p17}}

{{s4.p18}}

{{s4.p19}}
{{s4.p20}}
{{s4.p21}}
{{s4.p22}}
{{s4.p23}}
{{s4.p24}}

{{s4.p25}}
