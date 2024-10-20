# ![ico-30 study] Элементы форм

Элементы форм имеют свойство   **~value~** и **~onchange~**

**~onchange~** может содержать ссылку на колбэк-функцию обработчика события изменения свойства **~value~**

## ![ico-25 icon] input

Элемент ~input~ имеет свойства  **~type~** и  **~value~**

Интерфейс элемента зависит от значения свойства  **~type~**

Возможные значения свойства  ~type~:

^^^[type]

• ^^button^^
• ^^checkbox^^
• ^^color^^
• ^^date^^
• ^^datetime-local^^
• ^^email^^
• ^^file^^
• ^^image^^
• ^^month^^
• ^^number^^
• ^^password^^
• ^^radio^^
• ^^range^^
• ^^reset^^
• ^^search^^
• ^^submit^^
• ^^tel^^
• ^^text^^
• ^^time^^
• ^^url^^
• ^^week^^

^^^

Элемент может быть полем ввода текста, чисел, даты, времени, пароля, e-mail,
а может быть кнопкой, палитрой выбора цвета, окном выбора файла

Это может быть  _checkbox_  или  переключатель _radio button_...

У элементов ~input~ типа  **_~checkbox~_** и  **_~radio~_** помимо свойства  ~value~  есть свойство  **~checked~**

Свойство  **~checked~**  принимает логическое значение  ~true~  или  ~false~

____________________

## ![ico-25 icon] Event Handlers

Обработка событий элементов форм

Вставьте на страницу элемент  **~ p ~**, установите его свойство  ~id = "_demo_"~

◘◘![ico-25 cap] **Пример 1**◘◘

~~~js
var demo = document.createElement('p')
demo.id = 'demo'
demo.style.fontSize = '16px'
demo.style.color = 'blue'
document.body.appendChild(demo)
~~~

____________________________

### ![ico-20 icon] Secondary functions

Две объявленные ниже функции будут обработчиками событий элементов форм в дальнейших примерах

**inputValueChangedHandler**

~~~js
function inputValueChangedHandler (event) {
  var p = event.target.id + ' value: ' + event.target.value
  demo ? demo.innerHTML += p + '<br>' : console.log(p)      
}
~~~

**inputClickHandler**

~~~js
function inputClickHandler (event) {
  var p = event.target.id + ' checked: ' + event.target.checked
  demo ? demo.innerHTML += p + '<br>' : console.log(p)
}
~~~

__________________________________

### ![ico-20 icon] text

◘◘![ico-25 cap] **Пример 2**◘◘

~~~js
var inp = document.createElement('input')
inp.type = 'text'
inp.id = 'input-text'
document.body.appendChild(inp)

inp.onchange = inputValueChangedHandler
~~~

### ![ico-20 icon] color

◘◘![ico-25 cap] **Пример 3**◘◘

~~~js
var clr = document.createElement('input')
clr.type = 'color'
clr.id = 'color picker'
document.body.appendChild(clr)

clr.onchange = inputValueChangedHandler
~~~

_____________________________

## ![ico-25 icon] Переключатели

Свойство  ~value~  этих элементов можно установить любым

Переключатели типа  ~radio~  можно объединить в одну группу с помощью свойства  ~name~
^^(оно должно иметь одно и то же значение для всех переключателей группы)^^

Элементы имеют свойство **~checked~** булевого типа

• если элемент выбран, то **~checked~** имеет значение ~true~
• в противном случае - ~false~

![ico-20 warn] свойство  ~value~  при этом не меняется

### ![ico-20 icon] radio

◘◘![ico-25 cap] **Пример 4**◘◘

~~~js
for (var i = 0; i < 3; i++) {
  var radio = document.createElement('input')
  radio.type = 'radio'
  radio.name = 'radio'
  radio.id = 'radio_' + (i + 1)
  radio.value = i + 1
  radio.onchange = inputValueChangedHandler
  radio.onclick = inputClickHandler
  document.body.appendChild(radio)
}
~~~

________________________

[:::Пример 5:::](https://jsfiddle.net/npso86uy/2/)

__________________________________

### ![ico-20 icon] checkbox

◘◘![ico-25 cap] **Пример 6**◘◘

~~~js
for (var i = 0; i < 3; i++) {
  var chk = document.createElement('input')
  chk.type = 'checkbox'
  chk.name = 'checkbox'
  chk.id = 'checkbox_' + (i + 1)
  chk.onchange = inputValueChangedHandler
  chk.onclick = inputClickHandler
  document.body.appendChild(chk)
}
~~~

_____________________________

[:::Пример 7:::](https://jsfiddle.net/npso86uy/3/)

_____________________________

## ![ico-25 icon] select

Элемент ~select~ - выпадающий список
Элемент ~option~ - элемент выпадающего списка
Элемент ~select~ является контейнером для элементов ~option~

Свойства элементов  ~option~

• **~value~** - значение, которое будет возвращено элементом ~select~ при выборе этого элемента списка
• **~innerText~** - текст, который будет виден пользователю в выпадающем списке

Свойства элемента  ~select~

• **~value~** - значение ~value~ выбранного ~option~
• **~selectedIndex~** - порядковый номер выбранного ~option~

◘◘![ico-25 cap] **Пример 8**◘◘

~~~js
var members = [
  '...',
  'Алексеенко Валерия',
  'Андриенко Екатерина',
  'Бусуйко Кристина',
  'Велигура Андрей',
  'Веретельник Егор',
  'Головахин Андрей',
  'Денисенко Степан',
  'Карабут Александр',
]

var groupMembers = document.body.appendChild(document.createElement('select'))

for (var member of members) {
  var option = document.createElement('option')
  groupMembers.appendChild(option)
  option.value = option.innerHTML = member
}

var text = document.body.appendChild(document.createElement('p'))

groupMembers.onchange = function (ev) {
  text.innerHTML = ev.target.selectedIndex + ': ' + ev.target.value
}
~~~

___________________________

[![ico-30 hw] **Тесты**](https://garevna.github.io/js-quiz/#forms)
