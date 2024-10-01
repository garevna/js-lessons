# ![ico-30 study] Date()


## ![ico-25 icon] Конструктор

Создать объект даты и времени можно с помощью конструктора **Date()**

~~~js
var myData = new Date(year,  month, day, hours, minutes, seconds, milliseconds)
~~~

Конструктор принимает аргументы: год, месяц, число, час, минуты, секунды (и миллисекунды)

^^![ico-20 warn] нумерация месяцев начинается с 0 (январь - 0, февраль - 1 и т.д.)^^

Но можно и проще:

~~~js
var newData = new Date(год, месяц, число)
~~~

• Если вызвать конструктор без аргументов, будет создан объект даты с текущими значениями даты и времени

• Если передать аргументы год, месяц и день месяца, то будет создан объект даты с указанным значением даты

^^Например, в результате выполнения кода:^^

~~~js
var newData = new Date(2017,  11,  10)
~~~

^^в переменной **newData**  будет:^^

~~~js
Sun Dec 10 2017 00:00:00 GMT+0200 (Финляндия (зима))
~~~

Переменная  **newData**  является объектом

~~~js
typeof  newData    // "object"
~~~

Это экземпляр класса **Date**

~~~js
newData instanceof Date    // true
~~~

^^т.е. создан конструктором Date()^^

## ![ico-25 icon] Методы

Все экземпляры класса **Date** имеют ряд свойств и методов

| Метод | Что возвращает |
| ![ico-20 green-ok] **getDay()** | ^^порядковый номер дня недели (начиная с  0 - воскресенье)^^ |
| ![ico-20 green-ok] **getFullYear()** | ^^год^^ |
| ![ico-20 green-ok] **getMonth()** | ^^порядковый номер месяца (начиная с  0)^^ |
| ![ico-20 green-ok] **getDate()** | ^^день месяца (начиная с  1)^^ |
| ![ico-20 green-ok] **setDate()** | ^^установит день месяца, указанный аргументом^^ |
| ![ico-20 green-ok] **setMonth()** | ^^установит месяц, указанный аргументом^^ |
| ![ico-20 green-ok] **setYear()** | ^^установит год, указанный аргументом^^ |
| ![ico-20 green-ok] **getHours()** | ^^часы^^ |
| ![ico-20 green-ok] **getMinutes()** | ^^минуты^^ |
| ![ico-20 green-ok] **getSeconds()** | ^^секунды^^ |

[![ico-20 link] W3School](https://www.w3schools.com/js/js_date_methods.asp)
[![ico-20 link] MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date)

______________________________________________

![ico-25 cap] ** 1 **

~~~js
var newData = new Date(2017,  11,  10)
console.log(newData)
// Sun Dec 10 2017 00:00:00 GMT+0200 (Восточная Европа, стандартное время)
~~~

### ![ico-25 icon] toLocaleString()

![ico-25 cap] ** 2 **

~~~js
newData.toLocaleString()    // "10.12.2017, 0:00:00"
newData.setHours(12)
newData.toLocaleString()    // "10.12.2017, 12:00:00"
newData.setMinutes(45)
newData.toLocaleString()    // "10.12.2017, 12:45:00"
newData.setSeconds(45)
newData.toLocaleString()    // "10.12.2017, 12:45:45"
newData.setDate(45)
newData.toLocaleString()    // "14.01.2018, 12:45:45"
~~~

![ico-25 cap] ** 3 **

~~~js
var data = new Date(2019, 4, 24, 7, 20, 30)

data.toLocaleString().split(', ')[0] // "24.05.2019"
data.toLocaleString().split(', ')[1] // "07:20:30"
~~~

Можно получить сразу строку с датой с помощью метода **~toLocaleDateString()~**:

~~~js
new new Date(2019, 4, 24, 7, 20, 30)
  .toLocaleDateString()  // "24.05.2019"
~~~

или сразу строку времени с помощью метода **~toLocaleTimeString()~**:

~~~js
new Date(2019, 4, 24, 7, 20, 30)
  .toLocaleTimeString() // "07:20:30"
~~~

### ![ico-25 icon] setFullYear()

Этот метод удобен для вычисления нужной даты, поскольку принимает не только год, но также ему можно передать и месяц, и день месяца

Если мы вызовем его с одним аргументом:

~~~js
var data = new Date ( 2000, 10, 5 )

data.setFullYear ( 2019 )
~~~

то в переменной data будет изменен только год

Однако можно использовать два дополнительных аргумента:

![ico-25 cap] ** 4 **

^^Вычислим дату, которая наступит через 50 дней после 24/05/2019:^^

~~~js
var data = new Date(2019, 4, 24)
console.log(`Current date: ${data.toLocaleString()}`)
data.setFullYear (data.getFullYear(), data.getMonth(), data.getDate() + 50)
console.log(`Next date: ${data.toLocaleString()}`)
~~~

^^В консоли будет:^^

~~~console
Current date: 24.05.2019, 00:00:00
Next date:    13.07.2019, 00:00:00
~~~

^^Завернем этот код в функцию:^^

~~~js
function calcDate (currentDate, days) {
  var nextDate = currentDate
  nextDate.setFullYear(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + days)
  return nextDate
}
~~~

Теперь мы можем вычислять дату, которая будет через **days** дней от указанной **currentDate**

^^Вызовем функцию:^^

~~~js
calcDate(new Date(), 50)
~~~

_____________________________________________________

### ![ico-25 icon] setDate()

~~~js
function getRelativeData (data, days) {
  return !(data instanceof Date)
    ? console.log('Invalid date') || new Date()
    : new Date(data.setDate(data.getDate() + days))
}

getRelativeData(new Date(), 15)
~~~

{{{Date-constructor.js}}}


_________________________________________________________

### ![ico-25 icon] Разность дат

Вычислим, сколько дней осталось до дня рождения:

~~~js
var birthday = new Date(1990, 11, 2)

var ms = birthday.setFullYear(new Date().getFullYear() ) - new Date()
console.log(`До дня рождения осталось ${ms} миллисекунд`)

var hours = Math.round(ms / 3600000)
console.log(`До дня рождения осталось ${hours} часов`)

var days = Math.round(hours / 24)
console.log(`До дня рождения осталось ${days} дней`)
~~~

{{{Date-constructor-1.js}}}

Как видите, для вычисления количества дней, оставшихся до указанной даты дня рождения мы сначала устанавливаем текущий год даты дня рождения

~~~js
birthday.setFullYear(new Date().getFullYear())
~~~

Это означает, что мы вычисляем оставшиеся до дня рождения дни в пределах текущего года

Мы вычисляем разность двух дат - даты дня рождения и текущей даты

~~~js
var ms = birthday.setFullYear(new Date().getFullYear()) - new Date()
~~~

Результат будет в миллисекундах
Разделив результат на 1000, мы получим число секунд
Разделив число секунд на 360, мы получим число часов

~~~js
var hours = Math.round(ms / 3600000)
~~~

Разделив число часов на 24, мы получим число дней

~~~js
var days = Math.round(hours / 24)
~~~

Если в этом году день рождения уже прошел, число дней будет отрицательным

_________________________________________

[![ico-30 hw] Упражнения](test/DateConstructor)
