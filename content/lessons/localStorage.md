# ![ico-30 study] {{s1.h1}}

_______________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}
{{s2.p3}}

___________________________________

{{s2.p4}}

![](https://lh3.googleusercontent.com/PiqN6DSsKBOXC4M6ziRLdGzKX97HdnP071HwE5J-ooSgqOLK5MXqn118vTcPS-pSpeCqVvDtu-XNYyDrEhFwC5PDpaeBXuQi9o1t63CdNE4KJPTpmpTsuV5u_mbRUDBmsBDzRwYAQSKfTjY)

________________________________

{{s2.p5}}

![](https://lh4.googleusercontent.com/iugMdt41GkC9IgOugs_E9vAkMsTGwx_WDI1jm_SHqMmllPKRPOD59Jgvt5Viff0vo_eV8_kRNXDfoWMDQrgUqV0CSr-2Gh1w9RybES4oEh6VUz3TBNNx7n5iVmow7zZHjpgDOXi44O-fw0A)

____________________________

### ![ico-20 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

~~~js
localStorage.setItem('figure', 'circle')
localStorage.setItem('circle', 100)
localStorage.setItem('color', 'red')
~~~

{{s3.p3}}
{{s3.p4}}

~~~js
var user = {
  name: 'Иван',
  lastVisit: '27.02.2018',
  lastPage: '/home/page_07'
}

localStorage.setItem('user', JSON.stringify(user))
~~~
![](https://lh6.googleusercontent.com/C5_6UMa6lCRV-0uIPrpFc2EnrRJbpl4GE3TJmu1F5IjBbKVqu7IFK_OhWBnvIzRPX5bCblGaIqRDKlNNG_2r_4J2yriXO0jPcS_MWUHcEQwj8AJ8bziGqU1Kowl4MhQsMnBd3T2jUkwXmhE)

{{s3.p5}}

{{s3.p6}}

{{s3.p7}}

~~~js
localStorage.getItem('figure')  // "circle"
localStorage.getItem('circle')  // "100"
localStorage.getItem('color')   // "red"
~~~

{{s3.p8}}

~~~js
localStorage['figure']  // вернет "circle"
localStorage['circle']  // вернет "100"
localStorage['color']   // вернет "red"
~~~

{{s3.p9}}

~~~js
localStorage['user']
~~~

{{s3.p10}}

~~~js
'{ "name": "Иван", "lastVisit": "27.02.2018", "lastPage": "/home/page_07" }'
~~~

{{s3.p11}}

~~~js
JSON.parse(localStorage['user'])
~~~

{{s3.p12}}

{{s3.p13}}

~~~js
localStorage.removeItem('circle')
~~~

{{s3.p14}}

{{s3.p15}}

{{s3.p16}}

{{s3.p17}}


{{s3.p18}}

![](https://lh4.googleusercontent.com/HIMDL3cti50OFewe729t9aiJogCWrtQzMJklRwdtJqCgswUei2jrvEK0Q23qW3wzerPgfsKlIgHooc75MBUisfhn8OhlxAvQTDI_x3DPxJSJQMgkn-V_G6L7XW9cFrDwllsj7uhP99tFNRo)

{{s3.p19}}

___________________________

{{s3.p20}}

{{s3.p21}}

~~~js
let k = 0
while (k < localStorage.length) {
  console.log(localStorage.key(k++))
}
~~~

_______________________

{{s3.p22}}

~~~js
localStorage.setItem('url', location.href)

const user = {
  name: prompt('Enter your name'),
  last_visit: new Date().toLocaleString().split(', ')[0]
}

localStorage.setItem('user', JSON.stringify(user))
~~~

{{s3.p23}}

~~~js
for (const key in localStorage) console.log(key)
~~~

{{s3.p24}}

~~~console
circle
color
figure
user
length
key
getItem
setItem
removeItem
clear
~~~

______________________

{{s3.p25}}

{{s3.p26}}

~~~js
Storage.prototype.getItemList = function () {
  for (const key in this) {
    console.log(key, ': ', this[key])
  }
}
~~~

![](https://lh4.googleusercontent.com/7xyx1vvwXZw0F1hQx7dR3HUca227YXbz5ScaTplal2XqZxsVeGT_OIb-JQomW5Ao0ZVqQSeQvdeUBShrPB4_yRioGo_0MnYiu9GU7WiXvd-2-VyiO4Z-IcFhrogdPtz7JM10SQbKg_OU7gA)

{{s3.p27}}

_____________________

### ![ico-20 icon]  {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

~~~js
window.addEventListener('storage', function () {  
  console.log('localStorage was changed from outside')
})
~~~

{{s4.p3}}

___________________________________

{{s4.p4}}
