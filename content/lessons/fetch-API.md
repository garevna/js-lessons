# ![ico-30 study] AJAX

_____________________________________________________

## ![ico-25 icon] CORS

^^^[Cross-Origin Resource Sharing]

{{p1}}
{{p2}}
{{p3}}
______________________
{{p4}}

^^^
______________

# ![ico-30 icon] Fetch API

{{p5}}

{{p6}}

{{p7}}

{{p8}}

~~~js
fetch('message.txt')
  .then(response => { ... })
~~~

{{p9}}
{{p10}}
{{p11}}

{{p12}}

_____________________________________________________________

## ![ico-25 icon] Request

**{{common.c7}}**

{{p13}}

^^^[Request]

{{p14}}

{{p15}}
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

{{p16}}

~~~js
const request = new Request('https://api.github.com/users')
~~~

{{p17}}

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
  ► [[Prototype]]: Request
~~~~

{{p18}}

{{p19}}

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

{{p20}}

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
  ► [[Prototype]]: Request
~~~~

{{p21}}

~~~console
► headers: Headers {}
~~~

{{p22}}

~~~~Headers
▼ Headers {}
  ▼ [[Prototype]]: Headers
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
      ► [[Prototype]]: Object
~~~~

{{p23}}

~~~js
request.headers.get('Content-Type') // "application/json"
~~~

{{p24}}

~~~js
const request = new Request('https://api.github.com/users', {
  credentials: 'include',
  mode: 'same-origin',
  headers: {
    'Content-Type' : 'application/json'
  }
})
~~~

{{p25}}

{{p26}}
{{p27}}
| **~mode~** | ^^**cors**<br>**no-cors**<br>**same-origin**^^ |
{{p28}}
{{p29}}
{{p30}}

_______________________________________________

### ![ico-20 icon] {{p31}}

{{p32}}

{{p33}}
^^**URI** (_Uniform Resource Identifier_)^^
{{p34}}

~~~js
const request = new Request('https://httpbin.org/post', {
  method: 'GET'
})
~~~

_______________________________________________

### ![ico-20 icon] {{p35}}

{{p36}}

^^^[same-origin]

{{p37}}

![ico-25 cap] ** 2**

{{p38}}

~~~js
const request = new Request('https://avatars2.githubusercontent.com/u/46?v=4', {
  mode: 'same-origin'
})

fetch(request)
  .then(response => console.log(response))
~~~

{{p39}}

~~~console
Fetch API cannot load https://avatars2.githubusercontent.com/u/46?v=4
Request mode is "same-origin"
but the URL's origin is not same as the request origin null
~~~

{{p40}}
{{p41}}

![ico-20 error] ~Promise {<rejected>: TypeError: Failed to fetch~

^^^

^^^[no-cors]

{{p42}}

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

{{p43}}
{{p44}}
{{p45}}

^^^

^^^[cors]

{{p46}}
{{p47}}

________________________________________________

![ico-25 cap] ** 4**

{{p48}}

~~~js
const request = new Request('http://bm.img.com.ua/img/prikol/images/large/0/0/307600.jpg', {
  mode: 'cors'
})
fetch(request)
  .then(response => console.log(response))
~~~

{{p49}}

~~~console
Failed to load http://bm.img.com.ua/img/prikol/images/large/0/0/307600.jpg:
No 'Access-Control-Allow-Origin' header is present on the requested resource
Origin 'null' is therefore not allowed access
If an opaque response serves your needs,
set the request's mode to 'no-cors' to fetch the resource with CORS disabled
~~~

{{p50}}

~~~console
Uncaught (in promise) TypeError: Failed to fetch
~~~

{{p51}}
{{p52}}

{{p53}}

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

{{p54}}

~~~js
const request = new Request('http://bm.img.com.ua/img/prikol/images/large/0/0/307600.jpg')
console.log(request.mode) // cors
~~~

{{p55}}
{{p56}}
{{p57}}

_____________________________________________________

## ![ico-25 icon] Response

{{p58}}
{{p59}}
{{p60}}
{{p61}}
{{p62}}
{{p63}}
{{p64}}

____________________________________________________

### ![ico-20 icon] {{p65}}

{{p66}}

~~~~Headers
▼ Headers
  ▼ [[Prototype]]: Headers
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
      ► [[Prototype]]: Object
~~~~

{{p67}}

___________________________________________

![ico-25 cap] ** 6**

{{p68}}

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

{{p69}}
______________________________________________________________________

### ![ico-20 icon] {{p70}}

{{p71}}

{{p72}}

{{p73}}

{{p74}}

{{p75}}

{{p76}}

_____________________________________

### ![ico-20 icon] body

{{p77}}

{{p78}}
{{p79}}
{{p80}}
{{p81}}
{{p82}}
{{p83}}
{{p84}}

________________________________________

#### ![ico-20icon] json()

{{p85}}
{{p86}}

^^^[{{common.c0}} 7]

{{p87}}

~https://api.2ip.ua/geo.json?ip=~

{{p88}}
{{p89}}

~~~js
fetch('https://api.2ip.ua/geo.json?ip=')
  .then(response => { ... })
~~~

{{p90}}
{{p91}}
{{p92}}
{{p93}}
{{p94}}

~~~js
fetch('https://api.2ip.ua/geo.json?ip=')
  .then(response => response.json())
  .then(response => ...)
~~~

{{p95}}
{{p96}}

^^^

^^^[{{common.c0}} 8]

{{p97}}

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

{{p98}}

![ico-25 cap] ** 9**

{{p99}}

~~~js
const picture = document.body
  .appendChild(document.createElement('img'))
~~~

{{p100}}

~~~js
fetch('https://avatars2.githubusercontent.com/u/46?v=4')
  .then(response => response.blob())
  .then(blob => Object.assign(picture, {
    src: URL.createObjectURL(blob),
    width: 120
  }))
~~~

{{p101}}

~~~console
► Blob(35635) { size: 35635, type: "image/jpeg" }
~~~

{{p102}}

{{p103}}

{{p104}}

______________________________________________________

#### ![ico-20 icon] arrayBuffer()

{{p105}}

{{p106}}

{{p107}}

{{p108}}
{{p109}}

{{p110}}

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

{{p111}}

![ico-25 cap] **11**

{{p112}}

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

{{p113}}

~~~~js
fetch('https://avatars2.githubusercontent.com/u/46?v=4')
  .then(response => response.arrayBuffer())
  .then(buffer => console.log(new Blob([buffer])))
~~~~

![ico-25 cap] **13**

{{p114}}

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

{{p115}}

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
 ► [[Prototype]]: Object
~~~~

_________________________________________________________

![ico-25 cap] **15**

{{p116}}

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

^^^[{{p117}}]

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
  ► [[Prototype]]: Response
~~~

^^^

^^^[{{p118}}]

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
  ► [[Prototype]]: Object
~~~

^^^

_____________________________________________________________________________________

[![ico-30 hw] **Quiz**](quiz/fetch)
