## ![ico-25 icon] namedItem

{{s0.p1}}

^^^[HTML Collections]
{{s0.p2}}
__________________________

^^![ico-20 green-ok] document.forms^^
^^![ico-20 green-ok] document.images^^
^^![ico-20 green-ok] document.anchors^^
^^![ico-20 green-ok] document.all^^
^^![ico-20 green-ok] document.scripts^^
^^![ico-20 green-ok] document.links^^
^^![ico-20 green-ok] document.plugins^^

^^^

### ![ico-25 cap] {{common.c0}} 1

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

{{s1.p1}}

~~~js
document.all.namedItem('Google')  // null
~~~

{{s1.p2}}

~~~js
document.all.namedItem('fonts')
~~~

**{{common.c1}}**

~~~console
<link name="Google" id="fonts" href="https://fonts.googleapis.com/css?family=Roboto|&amp;display=swap" rel="stylesheet">
~~~

{{s1.p4}}

_________________________________________

### ![ico-25 cap] {{common.c0}} 2

{{s2.p1}}

~~~js
console.log(document.forms.namedItem('form'))
console.log(document.anchors.namedItem('ref'))
console.log(document.images.namedItem('picture'))
console.log(document.scripts.namedItem('script'))
console.log(document.all.namedItem('div'))
~~~

{{s2.p2}}

________________________________________________

### ![ico-25 cap] {{common.c0}} 3

{{s3.p1}}

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

{{s3.p2}}

{{s3.p3}}

| **^^Element^^** | **^^id^^** | **^^name^^** |
| ^^form^^ | + | + |
| ^^ a^^ | + | + |
| ^^img^^ | + | + |
| ^^input^^ | + | + |
| ^^select^^ | + | + |
| ^^textarea^^ | + | + |
| ^^script^^ | + | &ndash; |
| ^^link^^ | + | &ndash; |
| ^^div^^ | + | &ndash; |
| ^^ul^^ | + | &ndash; |
| ^^li^^ | + | &ndash; |

{{s3.p4}}

_____________________________________________________

^^^[HTMLCollections]

{{s3.p5}}

| Element | id | name |
| documenmt.forms | + | + |
| document.anchors | + | + |
| document.images | + | + |
| document.scripts | + | + |
| document.links | &ndash; | &ndash; |

^^^
