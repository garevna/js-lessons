# ![ico-30 study] {{p1}}

_______________________________________

## ![ico-25 icon] Cookie

{{p2}}

{{p3}}

{{p4}}

{{p5}}

{{p6}}

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

{{p7}}

{{p8}}

{{p9}}

{{p10}}

{{p11}}
{{p12}}

{{p13}}

~~~console
"APISID=159NndNJXgdvkeuR/AxzpbVBc2wIvRUKUY; SAPISID=IdbwT_IAY_sf2LU0/AW3V_D0PbOcE6M2Nw; __Secure-1PAPISID=IdbwT_IAY_sf2LU0/AW3V_D0PbOcE6M2Nw; __Secure-3PAPISID=IdbwT_IAY_sf2LU0/AW3V_D0PbOcE6M2Nw; SEARCH_SAMESITE=CgQIn5oB; _ga=GA1.1.1904075603.1709622825; SID=g.a000jwgMbBimGB5upYRX-Kfm5BTyAo30M9TafWQ9KJtyvQS8ZE6TraDNspBgaJxj5VeOfXQf_AACgYKAVASAQASFQHGX2MiqbKoB4jjXV_qJznlPC98jRoVAUF8yKo48nGZIgpwi8HEi7bCtzzH0076; _ga_XPW1QSKFW4=GS1.1.1716438502.20.1.1716438502.0.0.0; 1P_JAR=2024-05-23-09; SIDCC=AKEyXzU3YGRF1qmDi2w50N930i66W0XgsD5El6v-2fWjVqS2NaZoO65pijuA_pz80Hjq6IpLzIc"
~~~

{{p14}}

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

{{p15}}

{{p16}}
{{p17}}

{{p18}}

{{p19}}
{{p20}}

{{p21}}

____________________________

![ico-25 cap] ** 2**

{{p22}}

~~~js
console.info(location.href)

document.cookie = 'userName=Ирина'

var res = document.cookie
  .split('; ')
  .map(x => Object.assign({}, { [x.split('=')[0]] : x.split('=')[1] }))

console.log(res)
~~~

![](illustrations/cookie-02.png)

{{p23}}

~~~js
document.cookie = "userName=Irina"
~~~

{{p24}}

{{p25}}

{{p26}}

{{p27}}

_____________________________

![ico-25 cap] ** 3**

{{p28}}

~~~js
var res = document.cookie
  .split('; ')
  .map(x => Object.assign({}, (arr => ({ [arr[0]] : arr[1] }))(x.split('='))))
~~~

{{p29}}

~~~js
arr => ({ [arr[0]] : arr[1] })
~~~

{{p30}}

~~~js
{ [arr[0]] : arr[1] }
~~~

{{p31}}
{{p32}}

{{p33}}
{{p34}}
{{p35}}

~~~js
Object.assign({}, (arr => ({ [arr[0]] : arr[1] }))(x.split('=')))
~~~

{{p36}}

_________________________________

![ico-25 cap] ** 4**

{{p37}}

{{p38}}

~~~js
function getCookies () {
  return document.cookie
    .split('; ')
    .map(x => Object.assign({}, (arr => ({ [arr[0]] : arr[1] }))(x.split('='))))
    .reduce((res, item) => Object.assign(res, item), {})
}
~~~

{{p39}}

![](illustrations/cookie-03.png)

___________________________________

### ![ico-20 icon] {{p40}}

{{p41}}

{{p42}}

{{p43}}

{{p44}}

{{p45}}

{{p46}}


![ico-25 cap] ** 5**

{{p47}}

~~~js
var d = new Date(new Date().getTime() + 10 * 1000).toUTCString()
~~~

{{p48}}

{{p49}}

~~~js
document.cookie = 'name=Ирина; expires='' + d
getCookies()
~~~

{{p50}}

{{p51}}

~~~js
getCookies()
~~~

{{p52}}

______________________________

### ![ico-20 icon] UTC

{{p53}}

{{p54}}

{{p55}}

{{p56}}

_______________________

### ![ico-20 icon] {{p57}}

{{p58}}

~~~js
document.cookie = 'name=; expires=' + new Date(0).toUTCString()
~~~

{{p59}}

{{p60}}
