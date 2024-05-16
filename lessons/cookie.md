# ![ico-30 study] Данные на клиенте

_______________________________________

## ![ico-25 icon] Cookie

Файлы cookie позволяют идентифицировать уникальных пользователей в разных сеансах,

![ico-20 warn] но не при смене браузеров или устройств

Откройте в браузере любую веб-страницу, которая сохраняет куки на клиенте и которой разрешено это делать на вашем компе

( ![ico-20 warn] Chrome игнорирует файлы ~cookie~ с локальных страниц )

Запустите в консоли следующий ( "многословный" ) код:

![ico-25 cap] ** 1**

~~~js
console.info ( location.href )

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

![](https://lh4.googleusercontent.com/ff09mvDAMy80ahxWRzoq2QDhrQtACJ19czpFWBSwlEoWf_I3u1QUolgK4pO1A8SKKWp-BNAfjNFTn57WHLejg34Wp_koYlivWH2JjFzikxRMz_nr6fg8ZLBBWOm9Xkmyn0wv3fqSPA8jfSI)

Вы получите массив объектов, свойства которых являются записями в ~cookie~-файле данного сайта

Итак, свойство ~document.cookie~ возвращает  строку

В этой строке можно выделить отдельные "записи", отделяемые друг от друга точкой с запятой и пробелом  ( "; " )

Каждая "запись" представляет собой подстроку вида  xxx=yyy,   где:

~xxx - идентификатор~
~yyy - значение~

В нашем примере метод ~document.cookie~  вернул строку:

~~~console
"intercom-id-vuh4y50t=87110d5f-3671-4c46-bc3f-299e7e3702d8; _csrfToken=grvL1zeL-jpCdOS60hSAYv6EeNBy4hiICwb8"
~~~

в этой строке мы видим две подстроки, разделенных  "; "

~~~console
intercom-id-vuh4y50t=87110d5f-3671-4c46-bc3f-299e7e3702d8
_csrfToken=grvL1zeL-jpCdOS60hSAYv6EeNBy4hiICwb8
~~~

В первой подстроке

~ключ:      intercom-id-vuh4y50t~
~значение:  87110d5f-3671-4c46-bc3f-299e7e3702d8~

Во второй подстроке

~ключ:      _csrfToken~
~значение:  grvL1zeL-jpCdOS60hSAYv6EeNBy4hiICwb8~

____________________________

![ico-25 cap] ** 2**

Теперь изменим наш код ( и можно перейти на другую страницу ):

~~~js
console.info(location.href)

document.cookie = 'userName=Ирина'

var res = document.cookie
  .split('; ')
  .map(x => Object.assign({}, { [x.split('=')[0]] : x.split('=')[1] }))

console.log(res)
~~~

![](https://lh4.googleusercontent.com/0S48mrOhxzSppmjxS-1UwW7CZuL2edhilC0y46zhtf8q4elSbLky5uwBawHTLPq8n4dV8k_yDKY9uLd5tRsout8VYucYOWazePFBV-AomUxvwn4i13oZDQ42xZ2ocdm2qO6SR-LnuU-pTLY)

В результате выполнения кода

~~~js
document.cookie = "userName=Irina"
~~~

в текущий файл cookie была добавлена запись

Всего в  cookie-файле  может храниться до 300 записей

Размер каждой записи не должен превышать 4Кбайт

Для одного домена может быть записано не более 20 файлов cookie

_____________________________

![ico-25 cap] ** 3**

Можно и так:

~~~js
var res = document.cookie
  .split('; ')
  .map(x => Object.assign({}, (arr => ({ [arr[0]] : arr[1] }))(x.split('='))))
~~~

По пунктам:

~~~js
arr => ({ [arr[0]] : arr[1] })
~~~

это анонимная функция, которая на входе получает массив **arr** и возвращает объект с одним свойством

~~~js
{ [arr[0]] : arr[1] }
~~~

имя свойства находится в первом элементе массива (arr[0]),
а значение - во втором элементе массива (arr[1])

Эта анонимная функция используется в функциональном выражении, которое является вторым аргументом метода ~Object.assign~
(первый аргумент - пустой массив ),
причем функциональное выражение "запускается на месте" с аргументом  ~x.split('=')~

~~~js
Object.assign({}, (arr => ({ [arr[0]] : arr[1] }))(x.split('=')))
~~~

Вся эта конструкция вызывается в методе ~map~

_________________________________

![ico-25 cap] ** 4**

Откроем пустое окно с помощью команды ~window.open()~

В консоль нового окна вставим код:

~~~js
function getCookies () {
  return document.cookie
    .split('; ')
    .map(x => Object.assign({}, (arr => ({ [arr[0]] : arr[1] }))(x.split('='))))
    .reduce((res, item) => Object.assign(res, item), {})
}
~~~

Эта функция будет возвращать куки как объект

![](https://lh6.googleusercontent.com/MMmxDm8XRp-hNUNc8wZioR9S2BTgrc3c_v89g5o26BKLuQQgmkBuGQFsfFaFPYF5389YtrCoW7hDBeI5GMdgh-k956BJZnMwUNAQeEJWbfjzwJtrLcJ6BLIYwVbsGZD4ClrBC9fQ1-hJy5k)

___________________________________

### ![ico-20 icon] Опция expires

При добавлении записей в куки-файл можно указывать "срок годности" записи

Для этого существует опция **~expires~**

По истечении этого срока запись будет удалена из куки-файла

Указывать срок годности нужно в формате  **UTC**

Для преобразования даты в формат  **UTC**  нужно использовать метод  ~toUTCString()~

Если опция ~expires~ отсутствует или ее значение равно 0, то соответствующая запись в cookie-файле будет рассматриваться как сессионная и будет удалена при закрытии окна браузера


![ico-25 cap] ** 5**

Например, если мы хотим, чтобы запись в куки-файле была удалена через 10 секунд после вставки,

~~~js
var d = new Date(new Date().getTime() + 10 * 1000).toUTCString()
~~~

и после этого добавим запись в куки-файл c указанием срока годности

и выведем в консоль содержимое куки-файла с помощью функции getCookies ():

~~~js
document.cookie = 'name=Ирина; expires='' + d
getCookies()
~~~

в наш куки-файл была добавлена запись ~"name=Ирина"~

По истечении 10 секунд еще раз вызовем функцию **_getCookies()_**:

~~~js
getCookies()
~~~

Вставленной нами записи уже нет

______________________________

### ![ico-20 icon] UTC

**Coordinated Universal Time** - всемирный стандарт времени, не зависящий от временных зон

(«Скоординированное всеобщее время»)

Результат синхронизации временных шкал всемирными Центрами времени

Метод ~getTime()~  всегда возвращает время в формате **UTC**

_______________________

### ![ico-20 icon] Удаление куки

Для удаления куки нужно "сбросить" значение "срока годности":

~~~js
document.cookie = 'name=; expires=' + new Date(0).toUTCString()
~~~

![ico-20 warn] Важно указать идентификатор записи, значение роли не играет

Устанавливая  ~expires~  записи заведомо прошедшим значением, мы вызываем удаление записи с данным идентификатором
