# ![ico-30 study] Данные на клиенте

_______________________________________

## ![ico-25 icon] localStorage

**Локальное хранилище данных на клиенте**
^^Свойство глобального объекта window^^
^^Объем 5Mb^^

___________________________________

![ico-25 google]

![](https://lh3.googleusercontent.com/PiqN6DSsKBOXC4M6ziRLdGzKX97HdnP071HwE5J-ooSgqOLK5MXqn118vTcPS-pSpeCqVvDtu-XNYyDrEhFwC5PDpaeBXuQi9o1t63CdNE4KJPTpmpTsuV5u_mbRUDBmsBDzRwYAQSKfTjY)

________________________________

![ico-25 mozilla]

![](https://lh4.googleusercontent.com/iugMdt41GkC9IgOugs_E9vAkMsTGwx_WDI1jm_SHqMmllPKRPOD59Jgvt5Viff0vo_eV8_kRNXDfoWMDQrgUqV0CSr-2Gh1w9RybES4oEh6VUz3TBNNx7n5iVmow7zZHjpgDOXi44O-fw0A)

____________________________

### ![ico-20 icon] Методы

^^^[setItem ( key, value )]

^^поместить данные в хранилище^^

~~~js
localStorage.setItem('figure', 'circle')
localStorage.setItem('circle', 100)
localStorage.setItem('color', 'red')
~~~

В ~localStorage~ можно хранить только строки
Поэтому для сохранения объекта нужно превратить его в строку:

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

^^получить данные из хранилища^^

~~~js
localStorage.getItem('figure')  // "circle"
localStorage.getItem('circle')  // "100"
localStorage.getItem('color')   // "red"
~~~

К данным в хранилище можно получить доступ и так:

~~~js
localStorage['figure']  // вернет "circle"
localStorage['circle']  // вернет "100"
localStorage['color']   // вернет "red"
~~~

Теперь, если прочитать данные их хранилища

~~~js
localStorage['user']
~~~

то мы получим строку

~~~js
'{ "name": "Иван", "lastVisit": "27.02.2018", "lastPage": "/home/page_07" }'
~~~

Чтобы получить объект user, нужно распарсить эту строку:

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

очищает хранилище

^^^


^^^[key (index)]

![](https://lh4.googleusercontent.com/HIMDL3cti50OFewe729t9aiJogCWrtQzMJklRwdtJqCgswUei2jrvEK0Q23qW3wzerPgfsKlIgHooc75MBUisfhn8OhlxAvQTDI_x3DPxJSJQMgkn-V_G6L7XW9cFrDwllsj7uhP99tFNRo)

^^^

___________________________

![ico-25 cap] ** 1**

Получим все имена ключей:

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

Если вывести в косоль свойства объекта localStorage:

~~~js
for (const key in localStorage) console.log(key)
~~~

то в консоли мы увидим не только имена помещенных нами в хранилище данных, но и имена прототипных свойств и методов объекта ~localStorage~:

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

Мы можем добавить новые методы объекту ~localStorage~, используя свойство ~prototype~ конструктора ~Storage~

~~~js
Storage.prototype.getItemList = function () {
  for (const key in this) {
    console.log(key, ': ', this[key])
  }
}
~~~

![](https://lh4.googleusercontent.com/7xyx1vvwXZw0F1hQx7dR3HUca227YXbz5ScaTplal2XqZxsVeGT_OIb-JQomW5Ao0ZVqQSeQvdeUBShrPB4_yRioGo_0MnYiu9GU7WiXvd-2-VyiO4Z-IcFhrogdPtz7JM10SQbKg_OU7gA)

^^Как видите, мы можем расширять функциональность объекта ~localStorage~^^

_____________________

### ![ico-20 icon]  Events

При изменении содержимого ~localStorage~ в браузере генерируется событие  **_~storage~_**

Это событие может быть перехвачено объектом ~window~, если "повесить" прослушивателя события **_~storage~_**:

~~~js
window.addEventListener('storage', function () {  
  console.log('localStorage was changed from outside')
})
~~~

Повесьте обработчика и измените содержимое ~localStorage~ в консоли

___________________________________

[![ico-30 hw] **Тесты**](https://garevna.github.io/js-quiz/#localStorage)
