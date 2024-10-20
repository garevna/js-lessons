# ![ico-30 study] switch

Оператор  **switch** предназначен для ветвления кода на несколько веток в зависимости от значения _выражения_, передаваемого ему в качестве операнда

~~~js
switch (выражение)
~~~

![ico-25 cap]

~~~js
var words

switch (season) {
  case 'Зима':
    words = ['снег', 'елка', 'каток', 'шуба']
    break
  case 'Весна':
    words = ['капель', 'ласточки', 'подснежники', 'цветение']
    break
  case 'Лето':
    words = ['жара', 'речка', 'отпуск', 'каникулы']
    break
  case 'Осень':
    words = ['школа', 'листопад', 'урожай', 'дождь']
    break
  default:
    break
}
~~~

______________

[![ico-25 cap] Пример в песочнице](https://jsfiddle.net/garevna/g4roemnL/27/ )
[![ico-30 hw] **Quiz**](quiz/switch)
[![ico-20 link] w3schools](https://www.w3schools.com/js/js_switch.asp )
