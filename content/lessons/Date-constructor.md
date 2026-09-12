# ![ico-30 study] {{s1.h1}}


## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

~~~js
var myData = new Date(year,  month, day, hours, minutes, seconds, milliseconds)
~~~

{{s2.p2}}

{{s2.p3}}

{{s2.p4}}

~~~js
var newData = new Date(год, месяц, число)
~~~

{{s2.p5}}

{{s2.p6}}

{{s2.p7}}

~~~js
var newData = new Date(2017,  11,  10)
~~~

{{s2.p8}}

~~~js
Sun Dec 10 2017 00:00:00 GMT+0200 (Финляндия (зима))
~~~

{{s2.p9}}

~~~js
typeof  newData    // "object"
~~~

{{s2.p10}}

~~~js
newData instanceof Date    // true
~~~

{{s2.p11}}

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}
{{s3.p3}}
{{s3.p4}}
{{s3.p5}}
{{s3.p6}}
{{s3.p7}}
{{s3.p8}}
{{s3.p9}}
{{s3.p10}}
{{s3.p11}}
{{s3.p12}}

{{s3.p13}}
{{s3.p14}}

______________________________________________

{{s3.p15}}

~~~js
var newData = new Date(2017,  11,  10)
console.log(newData)
// Sun Dec 10 2017 00:00:00 GMT+0200 (Восточная Европа, стандартное время)
~~~

### ![ico-25 icon] {{s4.h1}}

{{s4.p1}}

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

{{s4.p2}}

~~~js
var data = new Date(2019, 4, 24, 7, 20, 30)

data.toLocaleString().split(', ')[0] // "24.05.2019"
data.toLocaleString().split(', ')[1] // "07:20:30"
~~~

{{s4.p3}}

~~~js
new new Date(2019, 4, 24, 7, 20, 30)
  .toLocaleDateString()  // "24.05.2019"
~~~

{{s4.p4}}

~~~js
new Date(2019, 4, 24, 7, 20, 30)
  .toLocaleTimeString() // "07:20:30"
~~~

### ![ico-25 icon] {{s5.h1}}

{{s5.p1}}

{{s5.p2}}

~~~js
var data = new Date ( 2000, 10, 5 )

data.setFullYear ( 2019 )
~~~

{{s5.p3}}

{{s5.p4}}

{{s5.p5}}

{{s5.p6}}

~~~js
var data = new Date(2019, 4, 24)
console.log(`Current date: ${data.toLocaleString()}`)
data.setFullYear (data.getFullYear(), data.getMonth(), data.getDate() + 50)
console.log(`Next date: ${data.toLocaleString()}`)
~~~

{{s5.p7}}

~~~console
Current date: 24.05.2019, 00:00:00
Next date:    13.07.2019, 00:00:00
~~~

{{s5.p8}}

~~~js
function calcDate (currentDate, days) {
  var nextDate = currentDate
  nextDate.setFullYear(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + days)
  return nextDate
}
~~~

{{s5.p9}}

{{s5.p10}}

~~~js
calcDate(new Date(), 50)
~~~

_____________________________________________________

### ![ico-25 icon] {{s6.h1}}

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

### ![ico-25 icon] {{s7.h1}}

{{s7.p1}}

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

{{s7.p2}}

~~~js
birthday.setFullYear(new Date().getFullYear())
~~~

{{s7.p3}}

{{s7.p4}}

~~~js
var ms = birthday.setFullYear(new Date().getFullYear()) - new Date()
~~~

{{s7.p5}}
{{s7.p6}}
{{s7.p7}}

~~~js
var hours = Math.round(ms / 3600000)
~~~

{{s7.p8}}

~~~js
var days = Math.round(hours / 24)
~~~

{{s7.p9}}

_________________________________________

{{s7.p10}}
