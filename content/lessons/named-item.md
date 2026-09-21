## ![ico-25 icon] namedItem

{{p1}}

^^^[HTML Collections]
{{p2}}
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

{{p3}}

~~~js
document.all.namedItem('Google')  // null
~~~

{{p4}}

~~~js
document.all.namedItem('fonts')
~~~

~~~console
<link name="Google" id="fonts" href="https://fonts.googleapis.com/css?family=Roboto|&amp;display=swap" rel="stylesheet">
~~~

{{p5}}

_________________________________________

### ![ico-25 cap] {{common.c0}} 2

{{p6}}

~~~js
console.log(document.forms.namedItem('form'))
console.log(document.anchors.namedItem('ref'))
console.log(document.images.namedItem('picture'))
console.log(document.scripts.namedItem('script'))
console.log(document.all.namedItem('div'))
~~~

{{p7}}

________________________________________________

### ![ico-25 cap] {{common.c0}} 3

{{p8}}

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

{{p9}}

{{p10}}

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

{{p11}}

_____________________________________________________

^^^[HTMLCollections]

{{p12}}

| Element | id | name |
| documenmt.forms | + | + |
| document.anchors | + | + |
| document.images | + | + |
| document.scripts | + | + |
| document.links | &ndash; | &ndash; |

^^^
