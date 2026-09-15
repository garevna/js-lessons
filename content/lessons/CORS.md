# ![ico-30 study] AJAX

_______________________

## ![ico-25 icon] CORS

**Cross-origin resource sharing**

☼☼☼ {{s0.slogan1}} ☼☼☼

{{s0.p1}}

{{s0.p2}}

{{s0.p3}}
^^(**_same-origin policy_**)^^
{{s0.p4}}

____________________________________

### ![ico-20 icon] Preflight request

{{s0.p5}}

{{s0.p6}}

| ![ico-20 green-ok] ^^Access-Control-Request-Method^^<br>![ico-20 green-ok] ^^Access-Control-Request-Headers^^<br>![ico-20 green-ok] ^^Origin^^ |

 ^^^[Access-Control-Request-Method]

{{s0.p7}}
{{s0.p8}}

^^^

^^^[Access-Control-Request-Headers]

{{s0.p9}}
{{s0.p10}}

^^^

^^^[Origin]

{{s0.p11}}
{{s0.p12}}

{{s0.p13}}

{{s0.p14}}
{{s0.p15}}
{{s0.p16}}

^^^

_______________________________________________

### ![ico-20 icon] {{s1.h1}}

{{s1.p1}}

^^^[Access-Control-Allow-Origin]

{{s1.p2}}

__________________

{{s1.p3}}
{{s1.p4}}
{{s1.p5}}

^^^

^^^[Access-Control-Expose-Headers]

{{s1.p6}}
________________________

{{s1.p7}}
{{s1.p8}}
{{s1.p9}}

{{s1.p10}}
| ![ico-20 green-ok] Cache-Control |
| ![ico-20 green-ok] Content-Language |
| ![ico-20 green-ok] Content-Type |
| ![ico-20 green-ok] Expires |
| ![ico-20 green-ok] Last-Modified |
| ![ico-20 green-ok] Pragma |

{{s1.p11}}

^^^

^^^[Access-Control-Allow-Credentials]

{{s1.p12}}

________________________

{{s1.p13}}


![ico-20 pin] **XMLWttpRequest**

~~~js
var request = new XMLWttpRequest()
request.withCredentials = true
~~~

![ico-20 pin] **Fetch API**

~~~js
fetch(url, {
  ...,
  credentials: 'include'
})
~~~

{{s1.p14}}

{{s1.p15}}
{{s1.p16}}
{{s1.p17}}

^^^

^^^[Origin, Host, Referer]

{{s1.p18}}
{{s1.p19}}
{{s1.p20}}

^^^

__________________________________

## ![ico-25 icon] Proxy for CORS request

{{s1.p21}}

~~~js
fetch('http://humor.fm/uploads/posts/2016-03/17/umndflr0wjc.jpg')
  .then(response => response.text())
  .then(response => console.log(response))
~~~

{{s1.p22}}

~~~console
Access to fetch at 'http://humor.fm/uploads/posts/2016-03/17/umndflr0wjc.jpg' from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
~~~

{{s1.p23}}

~~~console
▼ Response Headers
    Accept-Ranges: bytes
    Cache-Control: max-age=604800
    Content-Length: 127387
    Content-Type: image/jpeg
    Date: Tue, 19 Mar 2019 08:30:36 GMT
    ETag: "56ea8363-1f19b"
    Expires: Tue, 26 Mar 2019 08:30:36 GMT
    Last-Modified: Thu, 17 Mar 2016 10:13:55 GMT
    Server: nginx/1.12.2
~~~

{{s1.p24}}

{{s1.p25}}

{{s1.p26}}

~~~js
fetch('https://cors-anywhere.herokuapp.com/http://humor.fm/uploads/posts/2016-03/17/umndflr0wjc.jpg')
  .then(response => response.blob())
  .then(blob => document.body.appendChild(document.createElement('img')).src = URL.createObjectURL(blob))
~~~

{{s1.p27}}

~~~~console
▼ Response Headers
    Accept-Ranges: bytes
    Access-Control-Allow-Origin: *
    Access-Control-Expose-Headers: server,date,content-type,content-length,last-modified,connection,etag,expires,cache-
    control,accept-ranges,x-final-url,access-control-allow-origin
    Cache-Control: max-age=604800
    Connection: keep-alive
    Content-Length: 127387
    Content-Type: image/jpeg
    Date: Tue, 19 Mar 2019 08:31:09 GMT
    Etag: "56ea8363-1f19b"
    Expires: Tue, 26 Mar 2019 08:31:09 GMT
    Last-Modified: Thu, 17 Mar 2016 10:13:55 GMT
    Server: nginx/1.12.2
    Via: 1.1 vegur
    X-Final-Url: http://humor.fm/uploads/posts/2016-03/17/umndflr0wjc.jpg
    X-Request-Url: http://humor.fm/uploads/posts/2016-03/17/umndflr0wjc.jpg
~~~~

{{s1.p28}}
