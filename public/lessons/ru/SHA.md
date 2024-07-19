# ![ico-30 study] Secure Hash Algorithm

**криптографический алгоритм компьютерной безопасности**

Алгоритм генерирует криптографический хэш ( «дайджест» )

Этот хэш является своего рода «сигнатурой» для текста или файла данных

Алгоритм **SHA** не является «шифрованием»

![ico-20 warn] он не может быть расшифрован обратно к исходному тексту

это **_односторонняя_** криптографическая функция

она возвращает цифровую подпись фиксированного размера для любого размера исходного текста

^^^[SHA]

Создан Агентством национальной безопасности США

![ico-20 green-ok] SHA-0 - в 1993 году
![ico-20 green-ok]  SHA-1 - в 1995 году
![ico-20 green-ok]  SHA-2 - в 2002 году

_является частью стандарта цифровой подписи ( DSS )_

^^^

## ![ico-25 icon] SHA-1

SHA-1 генерирует почти уникальную 160-битную ( 20-байтную ) подпись для текста

![ico-25 cap] **SHA-1**

Например, для исходного текста:

~~~js
for (var x of arr) {
  console.log(x)
}
~~~

криптографический хэш SHA-1 будет:

••15E84BC669EC1F264F68CF0329A3DE12788EBC7D••

![ico-20 pin] ^^**git** широко использует хэши **SHA-1** в качестве идентификаторов и проверок согласованности^^

_________________________

### ![ico-25 icon] Онлайн-генераторы цифровой подписи SHA

[%%%SHA1%%%](https://passwordsgenerator.net/sha1-hash-generator/) 
[%%%SHA2%%%](https://passwordsgenerator.net/sha256-hash-generator/)

___________________

### ![ico-30 git] js-sha1

Можно установить пакет [**~js-sha1~**](https://github.com/emn178/js-sha1) из CDN

••![ico-30 bash] $ npm install js-sha1••

_________________

## ![ico-25 icon] SHA256

Вы можете подключить скрипт **~sha256~** к своей странице:

~~~html
<script src="https://cdn.rawgit.com/chrisveness/crypto/4e93a4d/sha256.js"></script>
~~~

и использовать функцию **~Sha256.hash()~** для динамической генерации дайджеста любого текста

~~~js
var hash = Sha256.hash(text)
~~~

[:::Пример:::](https://garevna.github.io/js-samples/#07)

Кроме того, в консоли ![ico-20 bash] вы можете использовать консольную команду ~sha256sum~

^^^[sha256sum]

![](https://lh4.googleusercontent.com/wM_pdlag2wymXBf0vtG0LDwLUPyKPmNI0Z8op0grW79K0LNzSzQMTdOx_1zQtT9Utj6VxtRtNEjJajYfCusV8LejAeXMvtOliRJG_T6btsIShVCe20WkxABN4P2K5zqwp6E9ORQpuRwKF4k)

^^^

_______________________

## ![ico-25 icon] SHA384

Откройте пустое окно (_blank_)

В этом окне откройте **_Chrome DevTools_**

Создайте  фрагмент кода (**snippet**), как показано на видео [![ico-70 youtube]](https://www.youtube.com/watch?v=xg9qsryE8Hk)

Вставьте следующий код сниппета:

~~~js
var script = document.createElement('script')
script.src = 'https://garevna.github.io/js-samples/js/testSHA384.js'
script.crossOrigin = 'anonymous'
script.integrity = 'sha384-yXrIdlO1CBJknfDtCtDe2tmWWNl5xK30aTz62nLkEpEIBRD3OGi7+To7hfKRaUZ/'
document.head.appendChild(script)
~~~

______________________________

## ![ico-25 icon] integrity

**_Subresource Integrity_** (**SRI**) - это функция безопасности, которая позволяет браузерам проверять файлы, загружаемые из внешних источников (например, из CDN)

Если файл был изменен, то значение атрибута  **~integrity~** (цифровой подписи файла) не будет соответствовать новому значению, вычисленному браузером, и загрузка поврежденного файла не произойдет

Для генерации дайджестов файлов используйте [![ico-20 link] сервис](https://www.srihash.org/)

![](https://lh3.googleusercontent.com/JUoOnSODv-YbGzZ_qsAWeSB4MRjYiAL62kmeb6eOSQZvMbVFKgUzC8XAdJq4GRtoWT-8N4AVAbWnXdZfHmLcGRgI-DOuvqANAPLjvLHfvAsC6m0Yas_mNZQ_Mb-w2dwnVh4Zth6ZOwxUYew)

![ico-20 green-ok] Вставьте ссылку на файл в сети
![ico-20 green-ok] Нажмите  кнопку   **~Hash!~**
![ico-20 green-ok] Полученный тег скрипта содержит атрибут **~integrity~**
![ico-20 green-ok] Скопируйте значение атрибута **~integrity~**
![ico-20 green-ok] Теперь вы сможете использовать его при динамической загрузке скриптов

___________________________________

## ![ico-25 hw] Самостоятельная работа

Посмотрите код [![ico-25 cap] **примера**](https://garevna.github.io/js-samples/#09) в отладчике

Установите **~breakpoints~**

С помощью **~Watch~** отслеживайте, как изменяются значения массива  **_users_** и переменной **_user_**

**Задание:**

![ico-20 green-ok] Создайте форму регистрации пользователя

^^При регистрации пользователя должен генерироваться дайджест, который будет ключом записи в базе данных^^

~~~~js
var users = [
  {
    key: 'a42caea01469a4687fb8713dc1748a0d14adec7f307371f82382812142ee2c58',
    name: 'Иван',
    email: 'ivan.petrenko@gmail.com',
    avatar: 'https://imgur.com/I80W1Q0.png'
  },
  {
    key: 'b7d20c2dc6cb3e4bcde90f80598e369ab3d1841d799039dfd06f86221af10fd8',
    name: 'Mary',
    email: 'mary789@gmail.com',
    avatar: 'https://raw.githubusercontent.com/fangpenlin/avataaars/HEAD/avataaars-example.png'
  },
    ...
]
~~~~

![ico-20 green-ok] Создайте форму для входа пользователя

^^^[Sign In]

^^После ввода _email_ нужно найти пользователя с таким _**email**_ и запросить пароль^^
^^После ввода пароля должен быть сгенерирован дайджест, который будет проверяться на совпадение со значением **_key_** найденного пользователя^^
^^Если значения не совпадут, нужно вывести предупреждение^^
^^Если значения совпали, то перейти на страницу для зарегистрированных пользователей^^
^^На странице для зарегистрированных пользователей должно быть выведено имя пользователя и его аватар^^

^^^

![ico-20 green-ok] Создайте страницу для зарегистрированных пользователей
