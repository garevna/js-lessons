# ![ico-30 study] Дані на клієнті

_______________________________________

## ![ico-25 icon] localStorage

**Локальне сховище даних на клієнті**
^^Властивість глобального об’єкта window^^
^^Об’єм 5 Мб^^

___________________________________

![ico-25 google]

![](https://lh3.googleusercontent.com/PiqN6DSsKBOXC4M6ziRLdGzKX97HdnP071HwE5J-ooSgqOLK5MXqn118vTcPS-pSpeCqVvDtu-XNYyDrEhFwC5PDpaeBXuQi9o1t63CdNE4KJPTpmpTsuV5u_mbRUDBmsBDzRwYAQSKfTjY)

________________________________

![ico-25 mozilla]

![](https://lh4.googleusercontent.com/iugMdt41GkC9IgOugs_E9vAkMsTGwx_WDI1jm_SHqMmllPKRPOD59Jgvt5Viff0vo_eV8_kRNXDfoWMDQrgUqV0CSr-2Gh1w9RybES4oEh6VUz3TBNNx7n5iVmow7zZHjpgDOXi44O-fw0A)

____________________________

### ![ico-20 icon] Методи

^^^[setItem ( key, value )]

^^записати дані у сховище^^

~~~js
localStorage.setItem('figure', 'circle')
localStorage.setItem('circle', 100)
localStorage.setItem('color', 'red')
~~~

У ~localStorage~ можна зберігати лише рядки
Тому для збереження об’єкта потрібно перетворити його на рядок:

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

^^отримати дані зі сховища^^

~~~js
localStorage.getItem('figure')  // "circle"
localStorage.getItem('circle')  // "100"
localStorage.getItem('color')   // "red"
~~~

До даних у сховищі можна отримати доступ і так:

~~~js
localStorage['figure']  // вернет "circle"
localStorage['circle']  // вернет "100"
localStorage['color']   // вернет "red"
~~~

Тепер, якщо прочитати дані зі сховища

~~~js
localStorage['user']
~~~

то ми отримаємо рядок

~~~js
'{ "name": "Иван", "lastVisit": "27.02.2018", "lastPage": "/home/page_07" }'
~~~

Щоб отримати об’єкт user, потрібно розібрати цей рядок:

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

очищає сховище

^^^


^^^[key (index)]

![](https://lh4.googleusercontent.com/HIMDL3cti50OFewe729t9aiJogCWrtQzMJklRwdtJqCgswUei2jrvEK0Q23qW3wzerPgfsKlIgHooc75MBUisfhn8OhlxAvQTDI_x3DPxJSJQMgkn-V_G6L7XW9cFrDwllsj7uhP99tFNRo)

^^^

___________________________

![ico-25 cap] ** 1**

Отримаємо всі імена ключів:

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

Якщо вивести в консоль властивості об’єкта localStorage:

~~~js
for (const key in localStorage) console.log(key)
~~~

то в консолі ми побачимо не тільки імена даних, які ми помістили в сховище, а й імена прототипних властивостей та методів об’єкта ~localStorage~:

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

Ми можемо додати нові методи до об’єкта ~localStorage~, використовуючи властивість ~prototype~ конструктора ~Storage~

~~~js
Storage.prototype.getItemList = function () {
  for (const key in this) {
    console.log(key, ': ', this[key])
  }
}
~~~

![](https://lh4.googleusercontent.com/7xyx1vvwXZw0F1hQx7dR3HUca227YXbz5ScaTplal2XqZxsVeGT_OIb-JQomW5Ao0ZVqQSeQvdeUBShrPB4_yRioGo_0MnYiu9GU7WiXvd-2-VyiO4Z-IcFhrogdPtz7JM10SQbKg_OU7gA)

^^Як бачите, ми можемо розширювати функціональність об’єкта ~localStorage~^^

_____________________

### ![ico-20 icon]  Events

При зміні вмісту ~localStorage~ у браузері генерується подія  **_~storage~_**

Цю подію може перехопити об’єкт ~window~, якщо «підвісити» слухач події **_~storage~_**:

~~~js
window.addEventListener('storage', function () {  
  console.log('localStorage was changed from outside')
})
~~~

Прикріпіть обробник і змініть вміст ~localStorage~ у консолі

___________________________________

※※※tests https://garevna.github.io/js-quiz/#localStorage※※※
