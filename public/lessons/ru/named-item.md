## ![ico-25 icon] namedItem

С помощью метода **~namedItem~** можно получить ссылку на именованный элемент DOM

^^^[HTML Collections]
^^Ряд свойств объекта document предоставляют доступ к различным HTML-коллекциям:^^
__________________________

^^![ico-20 green-ok] document.forms^^
^^![ico-20 green-ok] document.images^^
^^![ico-20 green-ok] document.anchors^^
^^![ico-20 green-ok] document.all^^
^^![ico-20 green-ok] document.scripts^^
^^![ico-20 green-ok] document.links^^
^^![ico-20 green-ok] document.plugins^^

^^^

### ![ico-25 cap] Пример 1

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

Попробуем получить элемент ~link~ по значению его атрибута **~name~**:

~~~js
document.all.namedItem('Google')  // null
~~~

а теперь по значению атрибута **~id~**:

~~~js
document.all.namedItem('fonts')
~~~

**Результат**

~~~console
<link name="Google" id="fonts" href="https://fonts.googleapis.com/css?family=Roboto|&amp;display=swap" rel="stylesheet">
~~~

Как видим, для элементов ~link~ метод **_~namedItem~_** возвращает элемент по его **~id~**, но не по его **~name~**

_________________________________________

### ![ico-25 cap] Пример 2

Посмотрим на поведение метода **_~namedItem~_** с другими элементами:

~~~js
console.log(document.forms.namedItem('form'))
console.log(document.anchors.namedItem('ref'))
console.log(document.images.namedItem('picture'))
console.log(document.scripts.namedItem('script'))
console.log(document.all.namedItem('div'))
~~~

Все элементы были найдены по значению их атрибута **~name~**

________________________________________________

### ![ico-25 cap] Пример 3

Для получения инфо о том, как работает метод **_~namedItem~_** с различными элементами DOM, воспользуемся функцией:

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

^^Эта функция получает в качестве аргумента валидное имя тега html, создает и вставляет на страницу этот элемент, устанавливает ему атрибуты **~name~** и **~id~**, а затем проверяет работу метода **_~namedItem~_** с этими атрибутами^^

С помощью этой функции легко установить, что метод **_~namedItem~_** работает по-разному для различных элементов:

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

^^Самостоятельно проверьте остальные элементы^^

_____________________________________________________

^^^[HTMLCollections]

Если проверить работу метода на различных HTMLCollections, то можно обнаружить, что этот метод не работает с коллекцией элементов link:

| Element | id | name |
| documenmt.forms | + | + |
| document.anchors | + | + |
| document.images | + | + |
| document.scripts | + | + |
| document.links | &ndash; | &ndash; |

^^^
