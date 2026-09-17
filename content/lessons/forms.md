# ![ico-30 study] {{p1}}

{{p2}}

{{p3}}

## ![ico-25 icon] input

{{p4}}

{{p5}}

{{p6}}

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

{{p7}}
{{p8}}

{{p9}}

{{p10}}

{{p11}}

____________________

## ![ico-25 icon] Event Handlers

{{p12}}

{{p13}}

♦♦♦1♦♦♦

~~~js
var demo = document.createElement('p')
demo.id = 'demo'
demo.style.fontSize = '16px'
demo.style.color = 'blue'
document.body.appendChild(demo)
~~~

____________________________

### ![ico-20 icon] Secondary functions

{{p14}}

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

♦♦♦2♦♦♦

~~~js
var inp = document.createElement('input')
inp.type = 'text'
inp.id = 'input-text'
document.body.appendChild(inp)

inp.onchange = inputValueChangedHandler
~~~

### ![ico-20 icon] color

♦♦♦3♦♦♦

~~~js
var clr = document.createElement('input')
clr.type = 'color'
clr.id = 'color picker'
document.body.appendChild(clr)

clr.onchange = inputValueChangedHandler
~~~

_____________________________

## ![ico-25 icon] {{p15}}

{{p16}}

{{p17}}
{{p18}}

{{p19}}

{{p20}}
{{p21}}

{{p22}}

### ![ico-20 icon] radio

♦♦♦4♦♦♦

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

{{p23}}

__________________________________

### ![ico-20 icon] checkbox

♦♦♦6♦♦♦

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

{{p24}}

_____________________________

## ![ico-25 icon] select

{{p25}}
{{p26}}
{{p27}}

{{p28}}

{{p29}}
{{p30}}

{{p31}}

{{p32}}
{{p33}}

♦♦♦8♦♦♦

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

※※※tests ⟦f18⟧※※※
