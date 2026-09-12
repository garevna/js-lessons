# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

## ![ico-25 icon] input

{{s1.p3}}

{{s1.p4}}

{{s1.p5}}

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

{{s1.p6}}
{{s1.p7}}

{{s1.p8}}

{{s1.p9}}

{{s1.p10}}

____________________

## ![ico-25 icon] Event Handlers

{{s1.p11}}

{{s1.p12}}

{{s1.p13}}

~~~js
var demo = document.createElement('p')
demo.id = 'demo'
demo.style.fontSize = '16px'
demo.style.color = 'blue'
document.body.appendChild(demo)
~~~

____________________________

### ![ico-20 icon] Secondary functions

{{s1.p14}}

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

{{s1.p15}}

~~~js
var inp = document.createElement('input')
inp.type = 'text'
inp.id = 'input-text'
document.body.appendChild(inp)

inp.onchange = inputValueChangedHandler
~~~

### ![ico-20 icon] color

{{s1.p16}}

~~~js
var clr = document.createElement('input')
clr.type = 'color'
clr.id = 'color picker'
document.body.appendChild(clr)

clr.onchange = inputValueChangedHandler
~~~

_____________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}
{{s2.p3}}

{{s2.p4}}

{{s2.p5}}
{{s2.p6}}

{{s2.p7}}

### ![ico-20 icon] radio

{{s2.p8}}

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

{{s2.p9}}

__________________________________

### ![ico-20 icon] checkbox

{{s2.p10}}

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

{{s2.p11}}

_____________________________

## ![ico-25 icon] select

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

{{s2.p22}}
