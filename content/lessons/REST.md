# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

__________________________________

{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

{{s1.p5}}
{{s1.p6}}
{{s1.p7}}

________________________________________

## ![ico-25 icon] {{s2.h1}}

@@@@

![](illustrations/filding.png)
{{s2.p1}}

@@@@

______________________________

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

___________________________________

{{s3.p11}}

_____________________________________

## ![ico-25 icon] {{s4.h1}}

^^^[{{s4.spoiler1}}]

{{s4.p1}}

{{s4.p2}}
{{s4.p3}}
{{s4.p4}}
{{s4.p5}}
{{s4.p6}}
{{s4.p7}}

{{s4.p8}}
{{s4.p9}}
{{s4.p10}}

^^^

{{s4.p11}}
{{s4.p12}}

{{s4.p13}}

{{s4.p14}}
{{s4.p15}}

{{s4.p16}}

{{s4.p17}}

~~~js
document.body.style.margin = 0

const img = document.body.appendChild(new Image())
img.src = 'https://picsum.photos/900/400?random'
~~~

{{s4.p18}}
{{s4.p19}}

{{s4.p20}}

{{s4.p21}}

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

{{s4.p22}}

{{s4.p23}}

{{s4.p24}}

{{s4.p25}}

~~~console
http://api.weatherstack.com/current?access_key=xxxxxxxx&query=Kharkiv
~~~

@@@@
{{s4.p26}}
![](illustrations/REST-01.webp)
@@@@
___________________________________

## ![ico-25 icon] {{s5.h1}}

### ![ico-20 icon] {{s6.h1}}

{{s6.p1}}

{{s6.p2}}

~~~js
fetch('https://garevna-rest-api.glitch.me/users/all')
  .then(response => response.json())
  .then(response => console.log(response))
~~~

{{s6.p3}}

~~~console
▼ {451789: {…}, 789451: {…}, begemot: {…}}
  ► 451789: {name: "Feodor", age: 18, speciality: "hobbit"}
  ► 789451: {name: "Teodor", age: 25, hobby: "fly", speciality: "teacher"}
  ► begemot: {name: "Stephan", age: 36, speciality: "doctor"}
  ► __proto__: Object
~~~

_______________________

{{s6.p4}}

{{s6.p5}}

~~~js
fetch('https://garevna-rest-api.glitch.me/user/begemot')
  .then(response => response.json())
  .then(response => console.log(response))
~~~

{{s6.p6}}

~~~console
▼ {name: "Stephan", age: 36, speciality: "doctor"}
    age: 36
    name: "Stephan"
    speciality: "doctor"
  ► __proto__: Object
~~~

_______________________________

{{s6.p7}}

{{s6.p8}}

{{s6.p9}}

~~~js
fetch('https://garevna-rest-api.glitch.me/users/?name=Stephan')
  .then(response => response.json())
  .then(response => console.log(response))
~~~

{{s6.p10}}

~~~console
▼ [{…}]
  ► 0: {name: "Stephan", age: 36, speciality: "doctor"}
    length: 1
  ► __proto__: Array(0)
~~~

{{s6.p11}}

{{s6.p12}}

{{s6.p13}}

~~~js
fetch('https://garevna-rest-api.glitch.me/users?age=^18^')
  .then(response => response.json())
  .then(response => console.log(response))
~~~

{{s6.p14}}

~~~console
▼ [{…}]
  ► 0: {name: "Feodor", age: 18, speciality: "hobbit"}
    length: 1
  ► __proto__: Array(0)
~~~

___________________________________

### ![ico-20 icon] {{s7.h1}}

{{s7.p1}}

{{s7.p2}}

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

{{s7.p3}}

~~~console
► {name: "Mary", age: 19, speciality: "developer"}
~~~

{{s7.p4}}

~~~console
► {error: 475, message: "987145 allready exist"}
~~~

___________________________________

{{s7.p5}}

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

{{s7.p6}}

~~~console
► {name: "Helen", age: 20, speciality: "florist"}
~~~

___________________________________

{{s7.p7}}

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

{{s7.p8}}

~~~console
► {name: "Helen", age: 20, speciality: "florist", hobby: "flowers"}
~~~

___________________________________

{{s7.p9}}

~~~js
fetch('https://json-server-with-router.glitch.me/user/garevna', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  }
}).then(response => console.log(response.status))
~~~

{{s7.p10}}
