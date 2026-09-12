# ![ico-30 study] {{s1.h1}}

_____________________________________________________

## ![ico-25 icon] {{s2.h1}}

^^^[{{s2.spoiler1}}]

{{s2.p1}}
{{s2.p2}}
{{s2.p3}}
______________________
{{s2.p4}}

^^^
______________

# ![ico-30 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

{{s3.p3}}

{{s3.p4}}

~~~js
fetch('message.txt')
  .then(response => { ... })
~~~

{{s3.p5}}
{{s3.p6}}
{{s3.p7}}

{{s3.p8}}

_____________________________________________________________

## ![ico-25 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

^^^[{{s4.spoiler1}}]

{{s4.p3}}

{{s4.p4}}
{{s4.p5}}
{{s4.p6}}
{{s4.p7}}
{{s4.p8}}
{{s4.p9}}
{{s4.p10}}
{{s4.p11}}
{{s4.p12}}
{{s4.p13}}
{{s4.p14}}
{{s4.p15}}
{{s4.p16}}
{{s4.p17}}
{{s4.p18}}
{{s4.p19}}

^^^
________________________________________________

{{s4.p20}}

{{s4.p21}}

~~~js
const request = new Request('https://api.github.com/users')
~~~

{{s4.p22}}

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

{{s4.p23}}

{{s4.p24}}

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

{{s4.p25}}

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

{{s4.p26}}

~~~console
► headers: Headers {}
~~~

{{s4.p27}}

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

{{s4.p28}}

~~~js
request.headers.get('Content-Type') // "application/json"
~~~

{{s4.p29}}

~~~js
const request = new Request('https://api.github.com/users', {
  credentials: 'include',
  mode: 'same-origin',
  headers: {
    'Content-Type' : 'application/json'
  }
})
~~~

{{s4.p30}}

{{s4.p31}}
{{s4.p32}}
{{s4.p33}}
{{s4.p34}}
{{s4.p35}}
{{s4.p36}}

_______________________________________________

### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}

{{s5.p2}}
{{s5.p3}}
{{s5.p4}}

~~~js
const request = new Request('https://httpbin.org/post', {
  method: 'GET'
})
~~~

_______________________________________________

### ![ico-20 icon] {{s6.h1}}

{{s6.p1}}

^^^[{{s6.spoiler1}}]

{{s6.p2}}

{{s6.p3}}

{{s6.p4}}

~~~js
const request = new Request('https://avatars2.githubusercontent.com/u/46?v=4', {
  mode: 'same-origin'
})

fetch(request)
  .then(response => console.log(response))
~~~

{{s6.p5}}

~~~console
Fetch API cannot load https://avatars2.githubusercontent.com/u/46?v=4
Request mode is "same-origin"
but the URL's origin is not same as the request origin null
~~~

{{s6.p6}}
{{s6.p7}}

{{s6.p8}}

^^^

^^^[{{s6.spoiler2}}]

{{s6.p9}}

_________________________________________________________

{{s6.p10}}

~~~js
const request = new Request('https://avatars2.githubusercontent.com/u/46?v=4', {
  mode: 'no-cors'
})

fetch(request)
  .then(response => response.blob())
  .then(response => console.log(response))
~~~

{{s6.p11}}
{{s6.p12}}
{{s6.p13}}

^^^

^^^[{{s6.spoiler3}}]

{{s6.p14}}
{{s6.p15}}

________________________________________________

{{s6.p16}}

{{s6.p17}}

~~~js
const request = new Request('http://bm.img.com.ua/img/prikol/images/large/0/0/307600.jpg', {
  mode: 'cors'
})
fetch(request)
  .then(response => console.log(response))
~~~

{{s6.p18}}

~~~console
Failed to load http://bm.img.com.ua/img/prikol/images/large/0/0/307600.jpg:
No 'Access-Control-Allow-Origin' header is present on the requested resource
Origin 'null' is therefore not allowed access
If an opaque response serves your needs,
set the request's mode to 'no-cors' to fetch the resource with CORS disabled
~~~

{{s6.p19}}

~~~console
Uncaught (in promise) TypeError: Failed to fetch
~~~

{{s6.p20}}
{{s6.p21}}

{{s6.p22}}

^^^

{{s6.p23}}

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

{{s6.p24}}

~~~js
const request = new Request('http://bm.img.com.ua/img/prikol/images/large/0/0/307600.jpg')
console.log(request.mode) // cors
~~~

{{s6.p25}}
{{s6.p26}}
{{s6.p27}}

_____________________________________________________

## ![ico-25 icon] {{s7.h1}}

{{s7.p1}}
{{s7.p2}}
{{s7.p3}}
{{s7.p4}}
{{s7.p5}}
{{s7.p6}}
{{s7.p7}}

____________________________________________________

### ![ico-20 icon] {{s8.h1}}

{{s8.p1}}

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

{{s8.p2}}

___________________________________________

{{s8.p3}}

{{s8.p4}}

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

{{s8.p5}}
______________________________________________________________________

### ![ico-20 icon] {{s9.h1}}

{{s9.p1}}

{{s9.p2}}

{{s9.p3}}

{{s9.p4}}

{{s9.p5}}

{{s9.p6}}

_____________________________________

### ![ico-20 icon] {{s10.h1}}

{{s10.p1}}

{{s10.p2}}
{{s10.p3}}
{{s10.p4}}
{{s10.p5}}
{{s10.p6}}
{{s10.p7}}
{{s10.p8}}

________________________________________

#### ![ico-20icon] {{s11.h1}}

{{s11.p1}}
{{s11.p2}}

^^^[{{s11.spoiler1}}]

{{s11.p3}}

{{s11.p4}}

{{s11.p5}}
{{s11.p6}}

~~~js
fetch('https://api.2ip.ua/geo.json?ip=')
  .then(response => { ... })
~~~

{{s11.p7}}
{{s11.p8}}
{{s11.p9}}
{{s11.p10}}
{{s11.p11}}

~~~js
fetch('https://api.2ip.ua/geo.json?ip=')
  .then(response => response.json())
  .then(response => ...)
~~~

{{s11.p12}}
{{s11.p13}}

^^^

^^^[{{s11.spoiler2}}]

{{s11.p14}}

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

#### ![ico-20 icon] {{s12.h1}}

{{s12.p1}}

{{s12.p2}}

{{s12.p3}}

~~~js
const picture = document.body
  .appendChild(document.createElement('img'))
~~~

{{s12.p4}}

~~~js
fetch('https://avatars2.githubusercontent.com/u/46?v=4')
  .then(response => response.blob())
  .then(blob => Object.assign(picture, {
    src: URL.createObjectURL(blob),
    width: 120
  }))
~~~

{{s12.p5}}

~~~console
► Blob(35635) { size: 35635, type: "image/jpeg" }
~~~

{{s12.p6}}

{{s12.p7}}

{{s12.p8}}

______________________________________________________

#### ![ico-20 icon] {{s13.h1}}

{{s13.p1}}

{{s13.p2}}

{{s13.p3}}

{{s13.p4}}
{{s13.p5}}

{{s13.p6}}

{{s13.p7}}

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

#### ![ico-20 icon] {{s14.h1}}

{{s14.p1}}

{{s14.p2}}

{{s14.p3}}

~~~~js
console.log(new Blob([
  '01101000110000100000011101011010010001000100011101011'
]))

console.log(new Blob([
  '01101000110000100000011101011010010001000100011101011',
  '01101000110000100000011101011010010001000100011101011'
]))
~~~~

{{s14.p4}}

{{s14.p5}}

~~~~js
fetch('https://avatars2.githubusercontent.com/u/46?v=4')
  .then(response => response.arrayBuffer())
  .then(buffer => console.log(new Blob([buffer])))
~~~~

{{s14.p6}}

{{s14.p7}}

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

{{s14.p8}}

________________________________________________________________________


{{s14.p9}}

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

{{s14.p10}}

{{s14.p11}}

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

{{s14.p12}}

^^^[{{s14.spoiler1}}]

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

^^^[{{s14.spoiler2}}]

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

{{s14.p13}}
