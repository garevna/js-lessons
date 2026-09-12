# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}

^^^[{{s2.spoiler1}}]

{{s2.p4}}
{{s2.p5}}
{{s2.p6}}
{{s2.p7}}
{{s2.p8}}
{{s2.p9}}
{{s2.p10}}
{{s2.p11}}
{{s2.p12}}
{{s2.p13}}
{{s2.p14}}
{{s2.p15}}
{{s2.p16}}
{{s2.p17}}
{{s2.p18}}
{{s2.p19}}
{{s2.p20}}
{{s2.p21}}
{{s2.p22}}
{{s2.p23}}
{{s2.p24}}

^^^

{{s2.p25}}
{{s2.p26}}

{{s2.p27}}

{{s2.p28}}

{{s2.p29}}

____________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

{{s3.p3}}

~~~js
var demo = document.createElement('p')
demo.id = 'demo'
demo.style.fontSize = '16px'
demo.style.color = 'blue'
document.body.appendChild(demo)
~~~

____________________________

### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

~~~js
function inputValueChangedHandler (event) {
  var p = event.target.id + ' value: ' + event.target.value
  demo ? demo.innerHTML += p + '<br>' : console.log(p)      
}
~~~

{{s4.p3}}

~~~js
function inputClickHandler (event) {
  var p = event.target.id + ' checked: ' + event.target.checked
  demo ? demo.innerHTML += p + '<br>' : console.log(p)
}
~~~

__________________________________

### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}

~~~js
var inp = document.createElement('input')
inp.type = 'text'
inp.id = 'input-text'
document.body.appendChild(inp)

inp.onchange = inputValueChangedHandler
~~~

### ![ico-20 icon] {{s6.h1}}

{{s6.p1}}

~~~js
var clr = document.createElement('input')
clr.type = 'color'
clr.id = 'color picker'
document.body.appendChild(clr)

clr.onchange = inputValueChangedHandler
~~~

_____________________________

## ![ico-25 icon] {{s7.h1}}

{{s7.p1}}

{{s7.p2}}
{{s7.p3}}

{{s7.p4}}

{{s7.p5}}
{{s7.p6}}

{{s7.p7}}

### ![ico-20 icon] {{s8.h1}}

{{s8.p1}}

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

{{s8.p2}}

__________________________________

### ![ico-20 icon] {{s9.h1}}

{{s9.p1}}

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

{{s9.p2}}

_____________________________

## ![ico-25 icon] {{s10.h1}}

{{s10.p1}}
{{s10.p2}}
{{s10.p3}}

{{s10.p4}}

{{s10.p5}}
{{s10.p6}}

{{s10.p7}}

{{s10.p8}}
{{s10.p9}}

{{s10.p10}}

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

{{s10.p11}}
