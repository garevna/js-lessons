# ![ico-30 study] AJAX

_____________________________________________________

## ![ico-25 icon] CORS

^^^[Cross-Origin Resource Sharing]

{{s0.p1}}
{{s0.p2}}
{{s0.p3}}
______________________
{{s0.p4}}

^^^
______________

# ![ico-30 icon] Fetch API

{{s0.p5}}

{{s0.p6}}

{{s0.p7}}

{{s0.p8}}

~~~js
fetch('message.txt')
  .then(response => { ... })
~~~

{{s0.p9}}
{{s0.p10}}
{{s0.p11}}

{{s0.p12}}

_____________________________________________________________

## ![ico-25 icon] Request

**{{common.c7}}**

{{s0.p14}}

^^^[Request]

{{s0.p15}}

{{s0.p16}}
| ^^**bodyUsed**^^            | ^^**arrayBuffer()**^^ |
| ^^cache^^                   | ^^**blob()**^^        |
| ^^**credentials**^^         | ^^clone()^^           |
| ^^destination^^             | ^^**formData()**^^    |
| ^^**headers**^^             | ^^**json()**^^        |
| ^^**integrity**^^           | ^^**text()**^^        |
| ^^isHistoryNavigation^^     |                       |
| ^^keepalive^^               |                       |
| ^^**method**^^              |                       |
| ^^**mode**^^                |                       |
| ^^redirect^^                |                       |
| ^^referrer^^                |                       |
| ^^referrerPolicy^^          |                       |
| ^^signal^^                  |                       |
| ^^**url**^^                 |                       |

^^^
________________________________________________

![ico-25 cap] ** 1**

{{s0.p17}}

~~~js
const request = new Request('https://api.github.com/users')
~~~

{{s0.p18}}

~~~~Request
▼ Request {method: "GET", url: "https://api.github.com/users", headers: Headers, destination: "", referrer: "about:client", …}
    bodyUsed: false
    cache: "default"
    credentials: "same-origin"
    destination: ""
  ► headers: Headers {}
    integrity: ""
    isHistoryNavigation: false
    keepalive: false
    method: "GET"
    mode: "cors"
    redirect: "follow"
    referrer: "about:client"
    referrerPolicy: ""
  ► signal: AbortSignal {aborted: false, onabort: null}
    url: "https://api.github.com/users"
  ► __proto__: Request
~~~~

{{s0.p19}}

{{s0.p20}}

~~~js
const request = new Request('https://api.github.com/users', {
  credentials: 'include',
  mode: 'same-origin',
  headers: new Headers({
    'Content-Type' : 'application/json'
  })
})

request.headers.get('Content-Type')
~~~

{{s0.p21}}

~~~~Request
▼ Request {method: "GET", url: "https://api.github.com/users", headers: Headers, destination: "", referrer: "about:client", …}
    bodyUsed: false
    cache: "default"
    credentials: "include"
    destination: ""
  ► headers: Headers {}
    integrity: ""
    isHistoryNavigation: false
    keepalive: false
    method: "GET"
    mode: "same-origin"
    redirect: "follow"
    referrer: "about:client"
    referrerPolicy: ""
  ► signal: AbortSignal {aborted: false, onabort: null}
    url: "https://api.github.com/users"
  ► __proto__: Request
~~~~

{{s0.p22}}

~~~console
► headers: Headers {}
~~~

{{s0.p23}}

~~~~Headers
▼ Headers {}
  ▼ __proto__: Headers
      ► append: ƒ append()
      ► delete: ƒ delete()
      ► entries: ƒ entries()
      ► forEach: ƒ forEach()
      ► get: ƒ ()
      ► has: ƒ has()
      ► keys: ƒ keys()
      ► set: ƒ ()
      ► values: ƒ values()
      ► constructor: ƒ Headers()
      ► Symbol(Symbol.iterator): ƒ entries()
        Symbol(Symbol.toStringTag): "Headers"
      ► __proto__: Object
~~~~

{{s0.p24}}

~~~js
request.headers.get('Content-Type') // "application/json"
~~~

{{s0.p25}}

~~~js
const request = new Request('https://api.github.com/users', {
  credentials: 'include',
  mode: 'same-origin',
  headers: {
    'Content-Type' : 'application/json'
  }
})
~~~

{{s0.p26}}

{{s0.p27}}
{{s0.p28}}
| **~mode~** | ^^**cors**<br>**no-cors**<br>**same-origin**^^ |
{{s0.p29}}
{{s0.p30}}
{{s0.p31}}

_______________________________________________

### ![ico-20 icon] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}
^^**URI** (_Uniform Resource Identifier_)^^
{{s1.p3}}

~~~js
const request = new Request('https://httpbin.org/post', {
  method: 'GET'
})
~~~

_______________________________________________

### ![ico-20 icon] {{s2.h1}}

{{s2.p1}}

^^^[same-origin]

{{s2.p2}}

![ico-25 cap] ** 2**

{{s2.p3}}

~~~js
const request = new Request('https://avatars2.githubusercontent.com/u/46?v=4', {
  mode: 'same-origin'
})

fetch(request)
  .then(response => console.log(response))
~~~

{{s2.p4}}

~~~console
Fetch API cannot load https://avatars2.githubusercontent.com/u/46?v=4
Request mode is "same-origin"
but the URL's origin is not same as the request origin null
~~~

{{s2.p5}}
{{s2.p6}}

![ico-20 error] ~Promise {<rejected>: TypeError: Failed to fetch~

^^^

^^^[no-cors]

{{s2.p7}}

_________________________________________________________

![ico-25 cap] ** 3**

~~~js
const request = new Request('https://avatars2.githubusercontent.com/u/46?v=4', {
  mode: 'no-cors'
})

fetch(request)
  .then(response => response.blob())
  .then(response => console.log(response))
~~~

{{s2.p8}}
{{s2.p9}}
{{s2.p10}}

^^^

^^^[cors]

{{s2.p11}}
{{s2.p12}}

________________________________________________

![ico-25 cap] ** 4**

{{s2.p13}}

~~~js
const request = new Request('http://bm.img.com.ua/img/prikol/images/large/0/0/307600.jpg', {
  mode: 'cors'
})
fetch(request)
  .then(response => console.log(response))
~~~

{{s2.p14}}

~~~console
Failed to load http://bm.img.com.ua/img/prikol/images/large/0/0/307600.jpg:
No 'Access-Control-Allow-Origin' header is present on the requested resource
Origin 'null' is therefore not allowed access
If an opaque response serves your needs,
set the request's mode to 'no-cors' to fetch the resource with CORS disabled
~~~

{{s2.p15}}

~~~console
Uncaught (in promise) TypeError: Failed to fetch
~~~

{{s2.p16}}
{{s2.p17}}

{{s2.p18}}

^^^

![ico-25 cap] ** 5**

~~~js
var request = new Request('https://httpbin.org/get', {
  mode: 'cors'
})

fetch(request)
  .then(response => response.text())
  .then(response => console.log(response))
~~~

~~~~console
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9,ru;q=0.8",
    "Connection": "close",
    "Host": "httpbin.org",
    "Origin": "null",
    "Save-Data": "on",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
  },
  "origin": "185.38.217.69",
  "url": "https://httpbin.org/get"
}
~~~~

______________________________________

{{s2.p19}}

~~~js
const request = new Request('http://bm.img.com.ua/img/prikol/images/large/0/0/307600.jpg')
console.log(request.mode) // cors
~~~

{{s2.p20}}
{{s2.p21}}
{{s2.p22}}

_____________________________________________________

## ![ico-25 icon] Response

{{s2.p23}}
{{s2.p24}}
{{s2.p25}}
{{s2.p26}}
{{s2.p27}}
{{s2.p28}}
{{s2.p29}}

____________________________________________________

### ![ico-20 icon] {{s3.h1}}

{{s3.p1}}

~~~~Headers
▼ Headers
  ▼ __proto__: Headers
      ► append: ƒ append()
      ► delete: ƒ delete()
      ► entries: ƒ entries()
      ► forEach: ƒ forEach()
      ► get: ƒ ()
      ► has: ƒ has()
      ► keys: ƒ keys()
      ► set: ƒ ()
      ► values: ƒ values()
      ► constructor: ƒ Headers()
      ► Symbol(Symbol.iterator): ƒ entries()
        Symbol(Symbol.toStringTag): "Headers"
      ► __proto__: Object
~~~~

{{s3.p2}}

___________________________________________

![ico-25 cap] ** 6**

{{s3.p3}}

~~~js
fetch('https://api.github.com/users/5', { method: 'HEAD'})
  .then(response => response.headers.forEach(key => console.log(key)))
~~~

~~~~console
public, max-age=60, s-maxage=60
application/json; charset=utf-8
W/"7870416c9818dd4ba65ab505535c7b79"
Fri, 28 Dec 2018 06:04:01 GMT
github.v3; format=json
60
53
1560761075
~~~~

{{s3.p4}}
______________________________________________________________________

### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

{{s4.p3}}

{{s4.p4}}

{{s4.p5}}

{{s4.p6}}

_____________________________________

### ![ico-20 icon] body

{{s4.p7}}

{{s4.p8}}
{{s4.p9}}
{{s4.p10}}
{{s4.p11}}
{{s4.p12}}
{{s4.p13}}
{{s4.p14}}

________________________________________

#### ![ico-20icon] json()

{{s4.p15}}
{{s4.p16}}

^^^[{{common.c0}} 7]

{{s4.p17}}

~https://api.2ip.ua/geo.json?ip=~

{{s4.p18}}
{{s4.p19}}

~~~js
fetch('https://api.2ip.ua/geo.json?ip=')
  .then(response => { ... })
~~~

{{s4.p20}}
{{s4.p21}}
{{s4.p22}}
{{s4.p23}}
{{s4.p24}}

~~~js
fetch('https://api.2ip.ua/geo.json?ip=')
  .then(response => response.json())
  .then(response => ...)
~~~

{{s4.p25}}
{{s4.p26}}

^^^

^^^[{{common.c0}} 8]

{{s4.p27}}

~~~js
fetch('https://api.github.com/users?since=135')
  .then(response => response.json())
  .then(response => fetch('https://httpbin.org/post', {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(response[5])
  }))
  .then(response => response.json())
  .then(response => console.log(response))
~~~

^^^

_____________________________________

#### ![ico-20 icon] blob()

{{s4.p28}}

![ico-25 cap] ** 9**

{{s4.p29}}

~~~js
const picture = document.body
  .appendChild(document.createElement('img'))
~~~

{{s4.p30}}

~~~js
fetch('https://avatars2.githubusercontent.com/u/46?v=4')
  .then(response => response.blob())
  .then(blob => Object.assign(picture, {
    src: URL.createObjectURL(blob),
    width: 120
  }))
~~~

{{s4.p31}}

~~~console
► Blob(35635) { size: 35635, type: "image/jpeg" }
~~~

{{s4.p32}}

{{s4.p33}}

{{s4.p34}}

______________________________________________________

#### ![ico-20 icon] arrayBuffer()

{{s4.p35}}

{{s4.p36}}

{{s4.p37}}

{{s4.p38}}
{{s4.p39}}

{{s4.p40}}

![ico-25 cap] **10**

~~~js
fetch('https://avatars2.githubusercontent.com/u/46?v=4')
  .then(response => response.arrayBuffer())
  .then(buffer => {
    console.log(buffer)
    console.log(new Int8Array(buffer))
    console.log(new Uint8Array(buffer))
  })
~~~

_________________________________________________________

#### ![ico-20 icon] arrayBuffer → blob

{{s4.p41}}

![ico-25 cap] **11**

{{s4.p42}}

~~~~js
console.log(new Blob([
  '01101000110000100000011101011010010001000100011101011'
]))

console.log(new Blob([
  '01101000110000100000011101011010010001000100011101011',
  '01101000110000100000011101011010010001000100011101011'
]))
~~~~

![ico-25 cap] **12**

{{s4.p43}}

~~~~js
fetch('https://avatars2.githubusercontent.com/u/46?v=4')
  .then(response => response.arrayBuffer())
  .then(buffer => console.log(new Blob([buffer])))
~~~~

![ico-25 cap] **13**

{{s4.p44}}

~~~~js
fetch('https://api.github.com/users?since=135')
  .then(response => response.json())
  .then(users => users.map(user => fetch(user.avatar_url)))
  .then(promises => Promise.all(promises))
  .then(responses => responses.map(response => response.status === 200 && response.blob()))
  .then(promises => Promise.all(promises))
  .then(blobs => blobs.map(blob => URL.createObjectURL(blob)))
  .then(avatars => avatars.map(avatar => Object.assign(new Image(), { src: avatar })))
  .then(images => images.forEach(image => document.body.appendChild(image).width = 120))
~~~~

{{s4.p45}}

________________________________________________________________________


![ico-25 cap] **14**

~~~js
fetch('https://httpbin.org/get')
  .then(response => response.json())
  .then(response => console.log(response.headers))
~~~

~~~~headers
▼ {Accept: "*/*", Accept-Encoding: "gzip, deflate, br", Accept-Language: "en-US,en;q=0.9,ru;q=0.8", Connection: "close", Host: "httpbin.org", …}
   Accept: "*/*"
   Accept-Encoding: "gzip, deflate, br"
   Accept-Language: "en-US,en;q=0.9,ru;q=0.8"
   Connection: "close"
   Host: "httpbin.org"
   Origin: "null"
   Save-Data: "on"
   User-Agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
 ► __proto__: Object
~~~~

_________________________________________________________

![ico-25 cap] **15**

{{s4.p46}}

~~~~js
const request = new Request('https://httpbin.org/post', {
  method: 'POST',
  mode: 'cors',
  redirect: 'follow',
  headers: new Headers({
    'Content-Type': 'text/plain'
  }),
  body: 'Hello, students!'
})

fetch(request)
  .then(response => response.json())
  .then(response => console.log(response))
~~~~

**{{topic.t3}}**

^^^[{{s4.spoiler3}}]

~~~console
▼ Response {type: "cors", url: "https://httpbin.org/post", redirected: false, status: 200, ok: true, …}
    body: (...)
    bodyUsed: true
  ► headers: Headers {}
    ok: true
    redirected: false
    status: 200
    statusText: "OK"
    type: "cors"
    url: "https://httpbin.org/post"
  ► __proto__: Response
~~~

^^^

^^^[{{s4.spoiler4}}]

~~~console
▼ {args: {…}, data: "Hello, students!", files: {…}, form: {…}, headers: {…}, …}
  ► args: {}
    data: "Hello, students!"
  ► files: {}
  ► form: {}
  ► headers: {Accept: "*/*", Accept-Encoding: "gzip, deflate, br", Accept-Language: "en-US,en;q=0.9,ru;q=0.8", Connection: "close", Content-Length: "16", …}
    json: null
    origin: "185.38.217.69"
    url: "https://httpbin.org/post"
  ► __proto__: Object
~~~

^^^

_____________________________________________________________________________________

[![ico-30 hw] **Quiz**](quiz/fetch)
