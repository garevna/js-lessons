# ![ico-30 study] {{s1.h1}}

_______________________________________

## ![ico-25 icon] localStorage

{{s1.p1}}
{{s1.p2}}
{{s1.p3}}

___________________________________

![ico-25 google]

![](https://lh3.googleusercontent.com/PiqN6DSsKBOXC4M6ziRLdGzKX97HdnP071HwE5J-ooSgqOLK5MXqn118vTcPS-pSpeCqVvDtu-XNYyDrEhFwC5PDpaeBXuQi9o1t63CdNE4KJPTpmpTsuV5u_mbRUDBmsBDzRwYAQSKfTjY)

________________________________

![ico-25 mozilla]

![](https://lh4.googleusercontent.com/iugMdt41GkC9IgOugs_E9vAkMsTGwx_WDI1jm_SHqMmllPKRPOD59Jgvt5Viff0vo_eV8_kRNXDfoWMDQrgUqV0CSr-2Gh1w9RybES4oEh6VUz3TBNNx7n5iVmow7zZHjpgDOXi44O-fw0A)

____________________________

### ![ico-20 icon] {{common.c13}}

^^^[setItem ( key, value )]

{{s2.p1}}

~~~js
localStorage.setItem('figure', 'circle')
localStorage.setItem('circle', 100)
localStorage.setItem('color', 'red')
~~~

{{s2.p2}}
{{s2.p3}}

~~~js
var user = {
  name: 'Иван',
  lastVisit: '27.02.2018',
  lastPage: '/home/page_07'
}

localStorage.setItem('user', JSON.stringify(user))
~~~
![](https://lh6.googleusercontent.com/C5_6UMa6lCRV-0uIPrpFc2EnrRJbpl4GE3TJmu1F5IjBbKVqu7IFK_OhWBnvIzRPX5bCblGaIqRDKlNNG_2r_4J2yriXO0jPcS_MWUHcEQwj8AJ8bziGqU1Kowl4MhQsMnBd3T2jUkwXmhE)

^^^

^^^[getItem (key)]

{{s2.p4}}

~~~js
localStorage.getItem('figure')  // "circle"
localStorage.getItem('circle')  // "100"
localStorage.getItem('color')   // "red"
~~~

{{s2.p5}}

~~~js
localStorage['figure']  // вернет "circle"
localStorage['circle']  // вернет "100"
localStorage['color']   // вернет "red"
~~~

{{s2.p6}}

~~~js
localStorage['user']
~~~

{{s2.p7}}

~~~js
'{ "name": "Иван", "lastVisit": "27.02.2018", "lastPage": "/home/page_07" }'
~~~

{{s2.p8}}

~~~js
JSON.parse(localStorage['user'])
~~~

^^^

^^^[removeItem (key)]

~~~js
localStorage.removeItem('circle')
~~~

^^^

^^^[clear()]

{{s2.p9}}

^^^


^^^[key (index)]

![](https://lh4.googleusercontent.com/HIMDL3cti50OFewe729t9aiJogCWrtQzMJklRwdtJqCgswUei2jrvEK0Q23qW3wzerPgfsKlIgHooc75MBUisfhn8OhlxAvQTDI_x3DPxJSJQMgkn-V_G6L7XW9cFrDwllsj7uhP99tFNRo)

^^^

___________________________

![ico-25 cap] ** 1**

{{s2.p10}}

~~~js
let k = 0
while (k < localStorage.length) {
  console.log(localStorage.key(k++))
}
~~~

_______________________

![ico-25 cap] ** 2**

~~~js
localStorage.setItem('url', location.href)

const user = {
  name: prompt('Enter your name'),
  last_visit: new Date().toLocaleString().split(', ')[0]
}

localStorage.setItem('user', JSON.stringify(user))
~~~

{{s2.p11}}

~~~js
for (const key in localStorage) console.log(key)
~~~

{{s2.p12}}

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

![ico-25 cap] ** 3**

{{s2.p13}}

~~~js
Storage.prototype.getItemList = function () {
  for (const key in this) {
    console.log(key, ': ', this[key])
  }
}
~~~

![](https://lh4.googleusercontent.com/7xyx1vvwXZw0F1hQx7dR3HUca227YXbz5ScaTplal2XqZxsVeGT_OIb-JQomW5Ao0ZVqQSeQvdeUBShrPB4_yRioGo_0MnYiu9GU7WiXvd-2-VyiO4Z-IcFhrogdPtz7JM10SQbKg_OU7gA)

{{s2.p14}}

_____________________

### ![ico-20 icon]  Events

{{s2.p15}}

{{s2.p16}}

~~~js
window.addEventListener('storage', function () {  
  console.log('localStorage was changed from outside')
})
~~~

{{s2.p17}}

___________________________________

{{s2.p18}}
