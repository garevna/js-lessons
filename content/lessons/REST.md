# ![ico-30 study] REST API

**Representational State Transfer**

__________________________________

{{p1}}

{{p2}}

{{p3}}

![ico-25 cap] **POST**: ^^http://ptsv2.com/t/garevna/post^^
{{p4}}
{{p5}}

________________________________________

## ![ico-25 icon] {{p6}}

@@@@

![](illustrations/filding.png)
**Roy Thomas Fielding**<br><br>^^DOCTOR OF PHILOSOPHY<br/>_in Information and Computer Science^^_<br/>[^^DISSERTATION^^](external/fielding)

@@@@

______________________________

## ![ico-25 icon] HATEOAS

{{p7}}
{{p8}}

{{p9}}

{{p10}}

{{p11}}
{{p12}}

{{p13}}

{{p14}}

{{p15}}

{{p16}}

___________________________________

{{p17}}

_____________________________________

## ![ico-25 icon] {{p18}}

^^^[endpoint]

{{p19}}

{{p20}}
{{p21}}
{{p22}}
{{p23}}
{{p24}}
{{p25}}

{{p26}}
{{p27}}
{{p28}}

^^^

{{p29}}
{{p30}}

{{p31}}

{{p32}}
{{p33}}

{{p34}}

◘◘![ico-20 cap] ** 1**◘◘

~~~js
document.body.style.margin = 0

const img = document.body.appendChild(new Image())
img.src = 'https://picsum.photos/900/400?random'
~~~

{{p35}}
{{p36}}

{{p37}}

◘◘![ico-20 cap] ** 2**◘◘

~~~js
const img = document.body.appendChild(new Image())
img.src = 'https://picsum.photos/id/356/900/500'
document.body.style.margin = 0

const showImage = function () {
  const w = window.innerWidth,
        h = window.innerHeight,
        num = Math.round(Math.random() * 900)

  arguments[0].src = `https://picsum.photos/id/${num}/${w}/${h}`

  setTimeout(() => requestAnimationFrame(showImage), 1000)
}.bind(null, img)

showImage()
~~~

{{{REST-endpoints.js}}}

___________________________________

{{p38}}

{{p39}}

{{p40}}

{{p41}}

~~~console
http://api.weatherstack.com/current?access_key=xxxxxxxx&query=Kharkiv
~~~

@@@@
{{p42}}
![](illustrations/REST-01.webp)
@@@@
___________________________________

## ![ico-25 icon] {{p43}}

### ![ico-20 icon] GET

{{p44}}

••https://js-lessons-sandbox.garevna.workers.dev/rest-api/users/all••

~~~js
fetch('https://js-lessons-sandbox.garevna.workers.dev/rest-api/users/all')
  .then(response => response.json())
  .then(response => console.log(response))
~~~

{{topic.t3}}

~~~console
▼ {451789: {…}, 789451: {…}, begemot: {…}}
  ► 451789: {name: "Feodor", age: 18, speciality: "hobbit"}
  ► 789451: {name: "Teodor", age: 25, hobby: "fly", speciality: "teacher"}
  ► begemot: {name: "Stephan", age: 36, speciality: "doctor"}
  ► __proto__: Object
~~~

_______________________

{{p45}}

••https://js-lessons-sandbox.garevna.workers.dev/rest-api/user/begemot••

~~~js
fetch('https://js-lessons-sandbox.garevna.workers.dev/rest-api/user/begemot')
  .then(response => response.json())
  .then(response => console.log(response))
~~~

{{topic.t3}}

~~~console
▼ {name: "Stephan", age: 36, speciality: "doctor"}
    age: 36
    name: "Stephan"
    speciality: "doctor"
  ► __proto__: Object
~~~

_______________________________

{{p46}}

{{p47}}

••https://js-lessons-sandbox.garevna.workers.dev/rest-api/users/?name=Stephan••

~~~js
fetch('https://js-lessons-sandbox.garevna.workers.dev/rest-api/users/?name=Stephan')
  .then(response => response.json())
  .then(response => console.log(response))
~~~

{{p48}}

~~~console
▼ [{…}]
  ► 0: {name: "Stephan", age: 36, speciality: "doctor"}
    length: 1
  ► __proto__: Array(0)
~~~

{{p49}}

••https://js-lessons-sandbox.garevna.workers.dev/rest-api/users?age=&#94;18&#94;••

{{p50}}

~~~js
fetch('https://js-lessons-sandbox.garevna.workers.dev/rest-api/users?age=^18^')
  .then(response => response.json())
  .then(response => console.log(response))
~~~

{{p51}}

~~~console
▼ [{…}]
  ► 0: {name: "Feodor", age: 18, speciality: "hobbit"}
    length: 1
  ► __proto__: Array(0)
~~~

___________________________________

### ![ico-20 icon] POST | PUT | PATCH | DELETE

••https://js-lessons-sandbox.garevna.workers.dev/rest-api/user/_id_••

◘◘**POST**◘◘

~~~js
fetch('https://js-lessons-sandbox.garevna.workers.dev/rest-api/user/987145', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Mary',
    age: 19,
    speciality: 'developer'
  })
})
  .then(response => response.json())
  .then(response => console.log(response))
~~~

{{topic.t3}}

~~~console
► {name: "Mary", age: 19, speciality: "developer"}
~~~

{{p52}}

~~~console
► {error: 475, message: "987145 allready exist"}
~~~

___________________________________

◘◘**PUT**◘◘

~~~js
fetch('https://js-lessons-sandbox.garevna.workers.dev/rest-api/user/987145', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify ({
    name: 'Helen',
    age: 20,
    speciality: 'florist'
  })
})
  .then(response => response.json())
  .then(response => console.log(response))
~~~

{{topic.t3}}

~~~console
► {name: "Helen", age: 20, speciality: "florist"}
~~~

___________________________________

◘◘**PATCH**◘◘

~~~js
fetch('https://js-lessons-sandbox.garevna.workers.dev/rest-api/user/987145', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    hobby: 'flowers'
  })
})
  .then(response => response.json())
  .then(response => console.log(response))
~~~

{{topic.t3}}

~~~console
► {name: "Helen", age: 20, speciality: "florist", hobby: "flowers"}
~~~

___________________________________

◘◘**DELETE**◘◘

~~~js
fetch('https://js-lessons-sandbox.garevna.workers.dev/rest-api/user/garevna', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  }
}).then(response => console.log(response.status))
~~~

{{p53}}
