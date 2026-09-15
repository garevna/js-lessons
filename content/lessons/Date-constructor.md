# ![ico-30 study] Date()


## ![ico-25 icon] {{common.c7}}

{{s1.p1}}

~~~js
var myData = new Date(year,  month, day, hours, minutes, seconds, milliseconds)
~~~

{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

~~~js
var newData = new Date(год, месяц, число)
~~~

{{s1.p5}}

{{s1.p6}}

{{s1.p7}}

~~~js
var newData = new Date(2017,  11,  10)
~~~

{{s1.p8}}

~~~js
Sun Dec 10 2017 00:00:00 GMT+0200 (Финляндия (зима))
~~~

{{s1.p9}}

~~~js
typeof  newData    // "object"
~~~

{{s1.p10}}

~~~js
newData instanceof Date    // true
~~~

{{s1.p11}}

## ![ico-25 icon] {{common.c13}}

{{s2.p1}}

{{s2.p2}}
{{s2.p3}}
{{s2.p4}}
{{s2.p5}}
{{s2.p6}}
{{s2.p7}}
{{s2.p8}}
{{s2.p9}}
{{s2.p10}}
{{s2.p11}}
{{s2.p12}}

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

{{s2.p13}}

~~~js
new new Date(2019, 4, 24, 7, 20, 30)
  .toLocaleDateString()  // "24.05.2019"
~~~

{{s2.p14}}

~~~js
new Date(2019, 4, 24, 7, 20, 30)
  .toLocaleTimeString() // "07:20:30"
~~~

### ![ico-25 icon] setFullYear()

{{s2.p15}}

{{s2.p16}}

~~~js
var data = new Date ( 2000, 10, 5 )

data.setFullYear ( 2019 )
~~~

{{s2.p17}}

{{s2.p18}}

![ico-25 cap] ** 4 **

{{s2.p19}}

~~~js
var data = new Date(2019, 4, 24)
console.log(`Current date: ${data.toLocaleString()}`)
data.setFullYear (data.getFullYear(), data.getMonth(), data.getDate() + 50)
console.log(`Next date: ${data.toLocaleString()}`)
~~~

{{s2.p20}}

~~~console
Current date: 24.05.2019, 00:00:00
Next date:    13.07.2019, 00:00:00
~~~

{{s2.p21}}

~~~js
function calcDate (currentDate, days) {
  var nextDate = currentDate
  nextDate.setFullYear(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + days)
  return nextDate
}
~~~

{{s2.p22}}

{{s2.p23}}

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

### ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

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

{{s3.p2}}

~~~js
birthday.setFullYear(new Date().getFullYear())
~~~

{{s3.p3}}

{{s3.p4}}

~~~js
var ms = birthday.setFullYear(new Date().getFullYear()) - new Date()
~~~

{{s3.p5}}
{{s3.p6}}
{{s3.p7}}

~~~js
var hours = Math.round(ms / 3600000)
~~~

{{s3.p8}}

~~~js
var days = Math.round(hours / 24)
~~~

{{s3.p9}}

_________________________________________

{{s3.p10}}
