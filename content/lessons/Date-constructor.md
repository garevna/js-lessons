# ![ico-30 study] Date()


## ![ico-25 icon] {{common.c7}}

{{p1}}

~~~js
var myData = new Date(year,  month, day, hours, minutes, seconds, milliseconds)
~~~

{{p2}}

{{p3}}

{{p4}}

~~~js
var newData = new Date(год, месяц, число)
~~~

{{p5}}

{{p6}}

{{p7}}

~~~js
var newData = new Date(2017,  11,  10)
~~~

{{p8}}

~~~js
Sun Dec 10 2017 00:00:00 GMT+0200 (Финляндия (зима))
~~~

{{p9}}

~~~js
typeof  newData    // "object"
~~~

{{p10}}

~~~js
newData instanceof Date    // true
~~~

{{p11}}

## ![ico-25 icon] {{common.c13}}

{{p12}}

{{p13}}
{{p14}}
{{p15}}
{{p16}}
{{p17}}
{{p18}}
{{p19}}
{{p20}}
{{p21}}
{{p22}}
{{p23}}

[![ico-20 link] W3School](https://www.w3schools.com/js/js_date_methods.asp)
[![ico-20 link] MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

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

{{p24}}

~~~js
new new Date(2019, 4, 24, 7, 20, 30)
  .toLocaleDateString()  // "24.05.2019"
~~~

{{p25}}

~~~js
new Date(2019, 4, 24, 7, 20, 30)
  .toLocaleTimeString() // "07:20:30"
~~~

### ![ico-25 icon] setFullYear()

{{p26}}

{{p27}}

~~~js
var data = new Date ( 2000, 10, 5 )

data.setFullYear ( 2019 )
~~~

{{p28}}

{{p29}}

![ico-25 cap] ** 4 **

{{p30}}

~~~js
var data = new Date(2019, 4, 24)
console.log(`Current date: ${data.toLocaleString()}`)
data.setFullYear (data.getFullYear(), data.getMonth(), data.getDate() + 50)
console.log(`Next date: ${data.toLocaleString()}`)
~~~

{{p31}}

~~~console
Current date: 24.05.2019, 00:00:00
Next date:    13.07.2019, 00:00:00
~~~

{{p32}}

~~~js
function calcDate (currentDate, days) {
  var nextDate = currentDate
  nextDate.setFullYear(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + days)
  return nextDate
}
~~~

{{p33}}

{{p34}}

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

### ![ico-25 icon] {{p35}}

{{p36}}

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

{{p37}}

~~~js
birthday.setFullYear(new Date().getFullYear())
~~~

{{p38}}

{{p39}}

~~~js
var ms = birthday.setFullYear(new Date().getFullYear()) - new Date()
~~~

{{p40}}
{{p41}}
{{p42}}

~~~js
var hours = Math.round(ms / 3600000)
~~~

{{p43}}

~~~js
var days = Math.round(hours / 24)
~~~

{{p44}}

_________________________________________

※※※exercises ⟦f2⟧※※※
