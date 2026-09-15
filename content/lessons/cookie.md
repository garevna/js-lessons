# ![ico-30 study] {{s1.h1}}

_______________________________________

## ![ico-25 icon] Cookie

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

{{s1.p5}}

![ico-25 cap] ** 1**

~~~js
console.info(location.href)

var res = document.cookie
  .split('; ')
  .map(x => {
    var tmp = x.split('=')
    var elem = {}
    elem[tmp[0]] = tmp[1]
    return elem
})
console.log(res)
~~~

![](illustrations/cookie-01.png)

{{s1.p6}}

{{s1.p7}}

{{s1.p8}}

{{s1.p9}}

{{s1.p10}}
{{s1.p11}}

{{s1.p12}}

~~~console
"APISID=159NndNJXgdvkeuR/AxzpbVBc2wIvRUKUY; SAPISID=IdbwT_IAY_sf2LU0/AW3V_D0PbOcE6M2Nw; __Secure-1PAPISID=IdbwT_IAY_sf2LU0/AW3V_D0PbOcE6M2Nw; __Secure-3PAPISID=IdbwT_IAY_sf2LU0/AW3V_D0PbOcE6M2Nw; SEARCH_SAMESITE=CgQIn5oB; _ga=GA1.1.1904075603.1709622825; SID=g.a000jwgMbBimGB5upYRX-Kfm5BTyAo30M9TafWQ9KJtyvQS8ZE6TraDNspBgaJxj5VeOfXQf_AACgYKAVASAQASFQHGX2MiqbKoB4jjXV_qJznlPC98jRoVAUF8yKo48nGZIgpwi8HEi7bCtzzH0076; _ga_XPW1QSKFW4=GS1.1.1716438502.20.1.1716438502.0.0.0; 1P_JAR=2024-05-23-09; SIDCC=AKEyXzU3YGRF1qmDi2w50N930i66W0XgsD5El6v-2fWjVqS2NaZoO65pijuA_pz80Hjq6IpLzIc"
~~~

{{s1.p13}}

~~~console
APISID=159NndNJXgdvkeuR/AxzpbVBc2wIvRUKUY
SAPISID=IdbwT_IAY_sf2LU0/AW3V_D0PbOcE6M2Nw
__Secure-1PAPISID=IdbwT_IAY_sf2LU0/AW3V_D0PbOcE6M2Nw
__Secure-3PAPISID=IdbwT_IAY_sf2LU0/AW3V_D0PbOcE6M2Nw
SEARCH_SAMESITE=CgQIn5oB
_ga=GA1.1.1904075603.1709622825
SID=g.a000jwgMbBimGB5upYRX-Kfm5BTyAo30M9TafWQ9KJtyvQS8ZE6TraDNspBgaJxj5VeOfXQf_AACgYKAVASAQASFQHGX2MiqbKoB4jjXV_qJznlPC98jRoVAUF8yKo48nGZIgpwi8HEi7bCtzzH0076
_ga_XPW1QSKFW4=GS1.1.1716438502.20.1.1716438502.0.0.0
1P_JAR=2024-05-23-09
SIDCC=AKEyXzU3YGRF1qmDi2w50N930i66W0XgsD5El6v-2fWjVqS2NaZoO65pijuA_pz80Hjq6IpLzIc
~~~

{{s1.p14}}

{{s1.p15}}
{{s1.p16}}

{{s1.p17}}

{{s1.p18}}
{{s1.p19}}

{{s1.p20}}

____________________________

![ico-25 cap] ** 2**

{{s1.p21}}

~~~js
console.info(location.href)

document.cookie = 'userName=Ирина'

var res = document.cookie
  .split('; ')
  .map(x => Object.assign({}, { [x.split('=')[0]] : x.split('=')[1] }))

console.log(res)
~~~

![](illustrations/cookie-02.png)

{{s1.p22}}

~~~js
document.cookie = "userName=Irina"
~~~

{{s1.p23}}

{{s1.p24}}

{{s1.p25}}

{{s1.p26}}

_____________________________

![ico-25 cap] ** 3**

{{s1.p27}}

~~~js
var res = document.cookie
  .split('; ')
  .map(x => Object.assign({}, (arr => ({ [arr[0]] : arr[1] }))(x.split('='))))
~~~

{{s1.p28}}

~~~js
arr => ({ [arr[0]] : arr[1] })
~~~

{{s1.p29}}

~~~js
{ [arr[0]] : arr[1] }
~~~

{{s1.p30}}
{{s1.p31}}

{{s1.p32}}
{{s1.p33}}
{{s1.p34}}

~~~js
Object.assign({}, (arr => ({ [arr[0]] : arr[1] }))(x.split('=')))
~~~

{{s1.p35}}

_________________________________

![ico-25 cap] ** 4**

{{s1.p36}}

{{s1.p37}}

~~~js
function getCookies () {
  return document.cookie
    .split('; ')
    .map(x => Object.assign({}, (arr => ({ [arr[0]] : arr[1] }))(x.split('='))))
    .reduce((res, item) => Object.assign(res, item), {})
}
~~~

{{s1.p38}}

![](illustrations/cookie-03.png)

___________________________________

### ![ico-20 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}

{{s2.p4}}

{{s2.p5}}

{{s2.p6}}


![ico-25 cap] ** 5**

{{s2.p7}}

~~~js
var d = new Date(new Date().getTime() + 10 * 1000).toUTCString()
~~~

{{s2.p8}}

{{s2.p9}}

~~~js
document.cookie = 'name=Ирина; expires='' + d
getCookies()
~~~

{{s2.p10}}

{{s2.p11}}

~~~js
getCookies()
~~~

{{s2.p12}}

______________________________

### ![ico-20 icon] UTC

{{s2.p13}}

{{s2.p14}}

{{s2.p15}}

{{s2.p16}}

_______________________

### ![ico-20 icon] {{s3.h1}}

{{s3.p1}}

~~~js
document.cookie = 'name=; expires=' + new Date(0).toUTCString()
~~~

{{s3.p2}}

{{s3.p3}}
