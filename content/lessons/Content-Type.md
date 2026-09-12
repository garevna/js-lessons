# ![ico-30 study] Content-Type

{{s0.p1}}

{{s0.p2}}

{{s0.p3}}

^^^[{{s0.spoiler1}}]

![ico-20 green-ok] application
![ico-20 green-ok] audio
![ico-20 green-ok] image
![ico-20 green-ok] message
![ico-20 green-ok] multipart
![ico-20 green-ok] text
![ico-20 green-ok] video

_______________________

{{s0.p4}}

^^^

{{s0.p5}}

^^^[{{s0.spoiler2}}]

^^• **application/msword**^^
^^• **application/pdf**^^
^^• **application/json**^^
^^• **image/gif**^^
^^• **image/jpeg**^^
^^• **image/png**^^
^^• **video/mpeg**^^
^^• **text/plain**^^
^^• **text/html**^^
^^• **text/html**; _charset=utf-8_^^
^^• **multipart/form-data**^^
^^• **multipart/mixed;** boundary="&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;"^^

___________________

{{s0.p6}}
{{s0.p7}}
{{s0.p8}}

^^^

________________________________________

## ![ico-25 icon] {{s1.h1}}

{{s1.p1}}

[![ico-25 link] https://httpbin.org](https://httpbin.org)

{{s1.p2}}

{{s1.p3}}

~~~js
function postData (data, contentType = 'application/json') {
  var request = new XMLHttpRequest()
  request.open('POST', 'https://httpbin.org/post', true)

  request.setRequestHeader('Content-Type', contentType)

  request.onreadystatechange = function () {
    this.readyState === 4
      ? this.status === 200
        ? console.log(this.responseText)
        : console.error('Request failed')
      : null
  }
  request.send(data)
}
~~~

{{s1.p4}}

___________________

### ![ico-25 cap] application/x-www-form-urlencoded

~~~js
postData('name=garevna&speciality=frontEnd', 'application/x-www-form-urlencoded')
~~~

{{s1.p5}}

~~~console
{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "name": "garevna",
    "speciality": "frontEnd"
  },
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en,uk;q=0.9,en-US;q=0.8,ru;q=0.7",
    "Content-Length": "32",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "httpbin.org",
    "Origin": "null",
    ...
  },
  "json": null,
  "origin": "109.86.227.94",
  "url": "https://httpbin.org/post"
}
~~~

___________________

### ![ico-25 cap] application/json

~~~js
postData(JSON.stringify({
  name: 'Gregory',
  age: 48,
  speciality: 'dev'
}))
~~~

{{s1.p6}}

~~~console
{
  "args": {},
  "data": "{\"name\":\"Gregory\",\"age\":48,\"speciality\":\"dev\"}",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en,uk;q=0.9,en-US;q=0.8,ru;q=0.7",
    "Content-Length": "46",
    "Content-Type": "application/json",
    "Host": "httpbin.org",
    "Origin": "null",
    ...
  },
  "json": {
    "age": 48,
    "name": "Gregory",
    "speciality": "dev"
  },
  "origin": "109.86.227.94",
  "url": "https://httpbin.org/post"
}
~~~
_______________________________


### ![ico-25 cap] text/plain

~~~js
var text = `The weird text generator enables you to convert your normal text into weird text by using different unusual Unicode symbols.
It generates weird text that resembles the normal characters or numbers of the alphabet in real time.`

postData(text, 'text/plain')
~~~

{{s1.p7}}

~~~console
{
  "args": {},
  "data": "The weird text generator enables you to convert your normal text into weird text by using different unusual Unicode symbols.\nIt generates weird text that resembles the normal characters or numbers of the alphabet in real time.",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en,uk;q=0.9,en-US;q=0.8,ru;q=0.7",
    "Content-Length": "226",
    "Content-Type": "text/plain",
    "Host": "httpbin.org",
    "Origin": "null",
    ...
  },
  "json": null,
  "origin": "109.86.227.94",
  "url": "https://httpbin.org/post"
}
~~~
