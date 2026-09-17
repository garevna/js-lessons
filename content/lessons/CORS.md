# ![ico-30 study] AJAX

_______________________

## ![ico-25 icon] CORS

**Cross-origin resource sharing**

☼☼☼ {{p1}} ☼☼☼

{{p2}}

{{p3}}

{{p4}}
^^(**_same-origin policy_**)^^
{{p5}}

____________________________________

### ![ico-20 icon] Preflight request

{{p6}}

{{p7}}

| ![ico-20 green-ok] ^^Access-Control-Request-Method^^<br>![ico-20 green-ok] ^^Access-Control-Request-Headers^^<br>![ico-20 green-ok] ^^Origin^^ |

 ^^^[Access-Control-Request-Method]

{{p8}}
{{p9}}

^^^

^^^[Access-Control-Request-Headers]

{{p10}}
{{p11}}

^^^

^^^[Origin]

{{p12}}
{{p13}}

{{p14}}

{{p15}}
{{p16}}
{{p17}}

^^^

_______________________________________________

### ![ico-20 icon] {{p18}}

{{p19}}

^^^[Access-Control-Allow-Origin]

{{p20}}

__________________

{{p21}}
{{p22}}
{{p23}}

^^^

^^^[Access-Control-Expose-Headers]

{{p24}}
________________________

{{p25}}
{{p26}}
{{p27}}

{{p28}}
| ![ico-20 green-ok] Cache-Control |
| ![ico-20 green-ok] Content-Language |
| ![ico-20 green-ok] Content-Type |
| ![ico-20 green-ok] Expires |
| ![ico-20 green-ok] Last-Modified |
| ![ico-20 green-ok] Pragma |

{{p29}}

^^^

^^^[Access-Control-Allow-Credentials]

{{p30}}

________________________

{{p31}}


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

{{p32}}

{{p33}}
{{p34}}
{{p35}}

^^^

^^^[Origin, Host, Referer]

{{p36}}
{{p37}}
{{p38}}

^^^

__________________________________

## ![ico-25 icon] Proxy for CORS request

{{p39}}

~~~js
fetch('http://humor.fm/uploads/posts/2016-03/17/umndflr0wjc.jpg')
  .then(response => response.text())
  .then(response => console.log(response))
~~~

{{p40}}

~~~console
Access to fetch at 'http://humor.fm/uploads/posts/2016-03/17/umndflr0wjc.jpg' from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
~~~

{{p41}}

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

{{p42}}

{{p43}}

{{p44}}

~~~js
fetch('https://cors-anywhere.herokuapp.com/http://humor.fm/uploads/posts/2016-03/17/umndflr0wjc.jpg')
  .then(response => response.blob())
  .then(blob => document.body.appendChild(document.createElement('img')).src = URL.createObjectURL(blob))
~~~

{{p45}}

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

{{p46}}
