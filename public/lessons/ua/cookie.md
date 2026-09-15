# ![ico-30 study] Данные на клиенте

_______________________________________

## ![ico-25 icon] Cookie

Файлы cookie позволяют идентифицировать уникальных пользователей в разных сеансах,

![ico-20 warn] но не при смене браузеров или устройств

Откройте в браузере любую веб-страницу, которая сохраняет куки на клиенте и которой разрешено это делать на вашем компе

(![ico-20 warn] Chrome игнорирует файлы ~cookie~ с локальных страниц)

Запустите в консоли следующий ("многословный") код:

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

Вы получите массив объектов, свойства которых являются записями в ~cookie~-файле данного сайта

Итак, свойство ~document.cookie~ возвращает  строку

В этой строке можно выделить отдельные "записи", отделяемые друг от друга точкой с запятой и пробелом ("; ")

Каждая "запись" представляет собой подстроку вида  xxx=yyy,   где:

~xxx - идентификатор~
~yyy - значение~

В нашем примере метод ~document.cookie~  вернул строку:

~~~console
"APISID=159NndNJXgdvkeuR/AxzpbVBc2wIvRUKUY; SAPISID=IdbwT_IAY_sf2LU0/AW3V_D0PbOcE6M2Nw; __Secure-1PAPISID=IdbwT_IAY_sf2LU0/AW3V_D0PbOcE6M2Nw; __Secure-3PAPISID=IdbwT_IAY_sf2LU0/AW3V_D0PbOcE6M2Nw; SEARCH_SAMESITE=CgQIn5oB; _ga=GA1.1.1904075603.1709622825; SID=g.a000jwgMbBimGB5upYRX-Kfm5BTyAo30M9TafWQ9KJtyvQS8ZE6TraDNspBgaJxj5VeOfXQf_AACgYKAVASAQASFQHGX2MiqbKoB4jjXV_qJznlPC98jRoVAUF8yKo48nGZIgpwi8HEi7bCtzzH0076; _ga_XPW1QSKFW4=GS1.1.1716438502.20.1.1716438502.0.0.0; 1P_JAR=2024-05-23-09; SIDCC=AKEyXzU3YGRF1qmDi2w50N930i66W0XgsD5El6v-2fWjVqS2NaZoO65pijuA_pz80Hjq6IpLzIc"
~~~

в этой строке мы видим подстроки, разделенные "; "

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

В первой подстроке APISID=159NndNJXgdvkeuR/AxzpbVBc2wIvRUKUY

~ключ:      APISID~
~значение:  159NndNJXgdvkeuR/AxzpbVBc2wIvRUKUY~

Во второй подстроке SAPISID=IdbwT_IAY_sf2LU0/AW3V_D0PbOcE6M2Nw

~ключ:      SAPISID~
~значение:  IdbwT_IAY_sf2LU0/AW3V_D0PbOcE6M2Nw~

и т.д.

____________________________

![ico-25 cap] ** 2**

Теперь изменим наш код (и можно перейти на другую страницу):

~~~js
console.info(location.href)

document.cookie = 'userName=Ирина'

var res = document.cookie
  .split('; ')
  .map(x => Object.assign({}, { [x.split('=')[0]] : x.split('=')[1] }))

console.log(res)
~~~

![](illustrations/cookie-02.png)

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

![](illustrations/cookie-03.png)

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
