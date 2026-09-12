# ![ico-30 study] {{s1.h1}}

_______________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}

{{s2.p4}}

{{s2.p5}}

{{s2.p6}}

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

{{s2.p7}}

{{s2.p8}}

{{s2.p9}}

{{s2.p10}}

{{s2.p11}}
{{s2.p12}}

{{s2.p13}}

~~~console
"APISID=159NndNJXgdvkeuR/AxzpbVBc2wIvRUKUY; SAPISID=IdbwT_IAY_sf2LU0/AW3V_D0PbOcE6M2Nw; __Secure-1PAPISID=IdbwT_IAY_sf2LU0/AW3V_D0PbOcE6M2Nw; __Secure-3PAPISID=IdbwT_IAY_sf2LU0/AW3V_D0PbOcE6M2Nw; SEARCH_SAMESITE=CgQIn5oB; _ga=GA1.1.1904075603.1709622825; SID=g.a000jwgMbBimGB5upYRX-Kfm5BTyAo30M9TafWQ9KJtyvQS8ZE6TraDNspBgaJxj5VeOfXQf_AACgYKAVASAQASFQHGX2MiqbKoB4jjXV_qJznlPC98jRoVAUF8yKo48nGZIgpwi8HEi7bCtzzH0076; _ga_XPW1QSKFW4=GS1.1.1716438502.20.1.1716438502.0.0.0; 1P_JAR=2024-05-23-09; SIDCC=AKEyXzU3YGRF1qmDi2w50N930i66W0XgsD5El6v-2fWjVqS2NaZoO65pijuA_pz80Hjq6IpLzIc"
~~~

{{s2.p14}}

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

{{s2.p15}}

{{s2.p16}}
{{s2.p17}}

{{s2.p18}}

{{s2.p19}}
{{s2.p20}}

{{s2.p21}}

____________________________

{{s2.p22}}

{{s2.p23}}

~~~js
console.info(location.href)

document.cookie = 'userName=Ирина'

var res = document.cookie
  .split('; ')
  .map(x => Object.assign({}, { [x.split('=')[0]] : x.split('=')[1] }))

console.log(res)
~~~

![](illustrations/cookie-02.png)

{{s2.p24}}

~~~js
document.cookie = "userName=Irina"
~~~

{{s2.p25}}

{{s2.p26}}

{{s2.p27}}

{{s2.p28}}

_____________________________

{{s2.p29}}

{{s2.p30}}

~~~js
var res = document.cookie
  .split('; ')
  .map(x => Object.assign({}, (arr => ({ [arr[0]] : arr[1] }))(x.split('='))))
~~~

{{s2.p31}}

~~~js
arr => ({ [arr[0]] : arr[1] })
~~~

{{s2.p32}}

~~~js
{ [arr[0]] : arr[1] }
~~~

{{s2.p33}}
{{s2.p34}}

{{s2.p35}}
{{s2.p36}}
{{s2.p37}}

~~~js
Object.assign({}, (arr => ({ [arr[0]] : arr[1] }))(x.split('=')))
~~~

{{s2.p38}}

_________________________________

{{s2.p39}}

{{s2.p40}}

{{s2.p41}}

~~~js
function getCookies () {
  return document.cookie
    .split('; ')
    .map(x => Object.assign({}, (arr => ({ [arr[0]] : arr[1] }))(x.split('='))))
    .reduce((res, item) => Object.assign(res, item), {})
}
~~~

{{s2.p42}}

![](illustrations/cookie-03.png)

___________________________________

### ![ico-20 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

{{s3.p3}}

{{s3.p4}}

{{s3.p5}}

{{s3.p6}}


{{s3.p7}}

{{s3.p8}}

~~~js
var d = new Date(new Date().getTime() + 10 * 1000).toUTCString()
~~~

{{s3.p9}}

{{s3.p10}}

~~~js
document.cookie = 'name=Ирина; expires='' + d
getCookies()
~~~

{{s3.p11}}

{{s3.p12}}

~~~js
getCookies()
~~~

{{s3.p13}}

______________________________

### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

{{s4.p3}}

{{s4.p4}}

_______________________

### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}

~~~js
document.cookie = 'name=; expires=' + new Date(0).toUTCString()
~~~

{{s5.p2}}

{{s5.p3}}
