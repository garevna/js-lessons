# ![ico-30 study] Data on the client

_______________________________________

## ![ico-25 icon] localStorage

**Local data storage on the client**
^^A property of the global `window` object^^
^^5 Mb capacity^^

___________________________________

![ico-25 google]

![](https://lh3.googleusercontent.com/PiqN6DSsKBOXC4M6ziRLdGzKX97HdnP071HwE5J-ooSgqOLK5MXqn118vTcPS-pSpeCqVvDtu-XNYyDrEhFwC5PDpaeBXuQi9o1t63CdNE4KJPTpmpTsuV5u_mbRUDBmsBDzRwYAQSKfTjY)

________________________________

![ico-25 mozilla]

![](https://lh4.googleusercontent.com/iugMdt41GkC9IgOugs_E9vAkMsTGwx_WDI1jm_SHqMmllPKRPOD59Jgvt5Viff0vo_eV8_kRNXDfoWMDQrgUqV0CSr-2Gh1w9RybES4oEh6VUz3TBNNx7n5iVmow7zZHjpgDOXi44O-fw0A)

____________________________

### ![ico-20 icon] Methods

^^^[setItem ( key, value )]

^^Store data in the storage^^

~~~js
localStorage.setItem('figure', 'circle')
localStorage.setItem('circle', 100)
localStorage.setItem('color', 'red')
~~~

Only strings can be stored in ~localStorage~
Therefore, to save an object, you need to convert it to a string:

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

^^Retrieve data from storage^^

~~~js
localStorage.getItem('figure')  // "circle"
localStorage.getItem('circle')  // "100"
localStorage.getItem('color')   // "red"
~~~

Data in storage can also be accessed as follows:

~~~js
localStorage['figure']  // вернет "circle"
localStorage['circle']  // вернет "100"
localStorage['color']   // вернет "red"
~~~

Now, if we read the data from storage

~~~js
localStorage['user']
~~~

we will get a string

~~~js
'{ "name": "Иван", "lastVisit": "27.02.2018", "lastPage": "/home/page_07" }'
~~~

To retrieve the `user` object, we need to parse this string:

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

Clears storage

^^^


^^^[key (index)]

![](https://lh4.googleusercontent.com/HIMDL3cti50OFewe729t9aiJogCWrtQzMJklRwdtJqCgswUei2jrvEK0Q23qW3wzerPgfsKlIgHooc75MBUisfhn8OhlxAvQTDI_x3DPxJSJQMgkn-V_G6L7XW9cFrDwllsj7uhP99tFNRo)

^^^

___________________________

![ico-25 cap] ** 1**

Let’s retrieve all the key names:

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

If we log the properties of the `localStorage` object to the console:

~~~js
for (const key in localStorage) console.log(key)
~~~

then in the console we will see not only the names of the data we stored, but also the names of the prototype properties and methods of the `~localStorage~` object:

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

We can add new methods to the ~localStorage~ object using the ~prototype~ property of the ~Storage~ constructor

~~~js
Storage.prototype.getItemList = function () {
  for (const key in this) {
    console.log(key, ': ', this[key])
  }
}
~~~

![](https://lh4.googleusercontent.com/7xyx1vvwXZw0F1hQx7dR3HUca227YXbz5ScaTplal2XqZxsVeGT_OIb-JQomW5Ao0ZVqQSeQvdeUBShrPB4_yRioGo_0MnYiu9GU7WiXvd-2-VyiO4Z-IcFhrogdPtz7JM10SQbKg_OU7gA)

^^As you can see, we can extend the functionality of the ~localStorage~ object^^

_____________________

### ![ico-20 icon]  Events

When the contents of ~localStorage~ are changed in the browser, the event **_~storage~_** is generated

This event can be intercepted by the object ~window~ by ‘attaching’ an event listener to **_~storage~_**:

~~~js
window.addEventListener('storage', function () {  
  console.log('localStorage was changed from outside')
})
~~~

Attach the handler and change the contents of ~localStorage~ in the console

___________________________________

[![ico-30 hw] **Tests**](https://garevna.github.io/js-quiz/#localStorage)
