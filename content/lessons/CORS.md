# ![ico-30 study] {{s1.h1}}

_______________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

☼☼☼ {{s2.slogan1}} ☼☼☼

{{s2.p2}}

{{s2.p3}}

{{s2.p4}}
{{s2.p5}}
{{s2.p6}}

____________________________________

### ![ico-20 icon] {{s3.h1}}

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

{{s3.p11}}

{{s3.p12}}

{{s3.p13}}
{{s3.p14}}

{{s3.p15}}

{{s3.p16}}
{{s3.p17}}
{{s3.p18}}

{{s3.p19}}

_______________________________________________

### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

{{s4.p3}}

__________________

{{s4.p4}}
{{s4.p5}}
{{s4.p6}}

{{s4.p7}}

{{s4.p8}}

{{s4.p9}}
________________________

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

{{s4.p20}}

{{s4.p21}}

{{s4.p22}}

{{s4.p23}}

________________________

{{s4.p24}}


{{s4.p25}}

~~~js
var request = new XMLWttpRequest()
request.withCredentials = true
~~~

{{s4.p26}}

~~~js
fetch(url, {
  ...,
  credentials: 'include'
})
~~~

{{s4.p27}}

{{s4.p28}}
{{s4.p29}}
{{s4.p30}}

{{s4.p31}}

{{s4.p32}}

{{s4.p33}}
{{s4.p34}}
{{s4.p35}}

{{s4.p36}}

__________________________________

## ![ico-25 icon] {{s5.h1}}

{{s5.p1}}

~~~js
fetch('http://humor.fm/uploads/posts/2016-03/17/umndflr0wjc.jpg')
  .then(response => response.text())
  .then(response => console.log(response))
~~~

{{s5.p2}}

~~~console
Access to fetch at 'http://humor.fm/uploads/posts/2016-03/17/umndflr0wjc.jpg' from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
~~~

{{s5.p3}}

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

{{s5.p4}}

{{s5.p5}}

{{s5.p6}}

~~~js
fetch('https://cors-anywhere.herokuapp.com/http://humor.fm/uploads/posts/2016-03/17/umndflr0wjc.jpg')
  .then(response => response.blob())
  .then(blob => document.body.appendChild(document.createElement('img')).src = URL.createObjectURL(blob))
~~~

{{s5.p7}}

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

{{s5.p8}}
