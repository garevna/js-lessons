# ![ico-30 study] REST API

**Representational State Transfer**

__________________________________

{{s0.p1}}

{{s0.p2}}

{{s0.p3}}

![ico-25 cap] **POST**: ^^http://ptsv2.com/t/garevna/post^^
{{s0.p4}}
{{s0.p5}}

________________________________________

## ![ico-25 icon] {{s1.h1}}

@@@@

![](illustrations/filding.png)
**Roy Thomas Fielding**<br><br>^^DOCTOR OF PHILOSOPHY<br/>_in Information and Computer Science^^_<br/>[^^DISSERTATION^^](external/fielding)

@@@@

______________________________

## ![ico-25 icon] HATEOAS

{{s1.p1}}
{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

{{s1.p5}}
{{s1.p6}}

{{s1.p7}}

{{s1.p8}}

{{s1.p9}}

{{s1.p10}}

___________________________________

{{s1.p11}}

_____________________________________

## ![ico-25 icon] {{s2.h1}}

^^^[endpoint]

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

^^^

{{s2.p11}}
{{s2.p12}}

{{s2.p13}}

{{s2.p14}}
{{s2.p15}}

{{s2.p16}}

◘◘![ico-20 cap] ** 1**◘◘

~~~js
document.body.style.margin = 0

const img = document.body.appendChild(new Image())
img.src = 'https://picsum.photos/900/400?random'
~~~

{{s2.p17}}
{{s2.p18}}

{{s2.p19}}

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

{{s2.p20}}

{{s2.p21}}

{{s2.p22}}

{{s2.p23}}

~~~console
http://api.weatherstack.com/current?access_key=xxxxxxxx&query=Kharkiv
~~~

@@@@
{{s2.p24}}
![](illustrations/REST-01.webp)
@@@@
___________________________________

## ![ico-25 icon] {{s3.h1}}

### ![ico-20 icon] GET

{{s3.p1}}

••https://garevna-rest-api.glitch.me/users/all••

~~~js
fetch('https://garevna-rest-api.glitch.me/users/all')
  .then(response => response.json())
  .then(response => console.log(response))
~~~

{{s3.p2}}

~~~console
▼ {451789: {…}, 789451: {…}, begemot: {…}}
  ► 451789: {name: "Feodor", age: 18, speciality: "hobbit"}
  ► 789451: {name: "Teodor", age: 25, hobby: "fly", speciality: "teacher"}
  ► begemot: {name: "Stephan", age: 36, speciality: "doctor"}
  ► __proto__: Object
~~~

_______________________

{{s3.p3}}

••https://garevna-rest-api.glitch.me/user/begemot••

~~~js
fetch('https://garevna-rest-api.glitch.me/user/begemot')
  .then(response => response.json())
  .then(response => console.log(response))
~~~

{{s3.p4}}

~~~console
▼ {name: "Stephan", age: 36, speciality: "doctor"}
    age: 36
    name: "Stephan"
    speciality: "doctor"
  ► __proto__: Object
~~~

_______________________________

{{s3.p5}}

{{s3.p6}}

••https://garevna-rest-api.glitch.me/users/?name=Stephan••

~~~js
fetch('https://garevna-rest-api.glitch.me/users/?name=Stephan')
  .then(response => response.json())
  .then(response => console.log(response))
~~~

{{s3.p7}}

~~~console
▼ [{…}]
  ► 0: {name: "Stephan", age: 36, speciality: "doctor"}
    length: 1
  ► __proto__: Array(0)
~~~

{{s3.p8}}

••https://garevna-rest-api.glitch.me/users?age=&#94;18&#94;••

{{s3.p9}}

~~~js
fetch('https://garevna-rest-api.glitch.me/users?age=^18^')
  .then(response => response.json())
  .then(response => console.log(response))
~~~

{{s3.p10}}

~~~console
▼ [{…}]
  ► 0: {name: "Feodor", age: 18, speciality: "hobbit"}
    length: 1
  ► __proto__: Array(0)
~~~

___________________________________

### ![ico-20 icon] POST | PUT | PATCH | DELETE

••https://garevna-rest-api.glitch.me/user/_id_••

◘◘**POST**◘◘

~~~js
fetch('https://garevna-rest-api.glitch.me/user/987145', {
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

{{s3.p11}}

~~~console
► {name: "Mary", age: 19, speciality: "developer"}
~~~

{{s3.p12}}

~~~console
► {error: 475, message: "987145 allready exist"}
~~~

___________________________________

◘◘**PUT**◘◘

~~~js
fetch('https://garevna-rest-api.glitch.me/user/987145', {
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

{{s3.p13}}

~~~console
► {name: "Helen", age: 20, speciality: "florist"}
~~~

___________________________________

◘◘**PATCH**◘◘

~~~js
fetch('https://garevna-rest-api.glitch.me/user/987145', {
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

{{s3.p14}}

~~~console
► {name: "Helen", age: 20, speciality: "florist", hobby: "flowers"}
~~~

___________________________________

◘◘**DELETE**◘◘

~~~js
fetch('https://json-server-with-router.glitch.me/user/garevna', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  }
}).then(response => console.log(response.status))
~~~

{{s3.p15}}
