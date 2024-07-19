# ![ico-50 study] curl

Утилита командной строки для передачи данных по URL

[![ico-50 curl]](https://curl.se/docs/tutorial.html)

Синтаксис:

••![ico-25 bash] $ curl опции ссылка••

_______________________

## ![ico-25 icon] Получение данных по url

По умолчанию содержимое запрошенного ресурса будет отправлено на стандартный вывод

••![ico-25 bash] $ curl https://github.com••

![](illustrations/curl-01.png)


••![ico-25 bash] $ curl https://garevna.github.io/js-samples/js/index08.js••

![](illustrations/curl-02.png)


## ![ico-25 icon] Опции

^^^[-O]

Сохранить загруженный файл в текущую папку под тем же именем, что и на сервере

••![ico-25 bash] $ curl  -O  https://garevna.github.io/js-samples/js/index08.js••

![](illustrations/curl-03.png)

После выполнения этой операции в текущей папке появится новый файл  ~index08.js~

![](illustrations/curl-04.png)

^^^

^^^[-o]

Сохранить загруженный файл в текущую папку под указанным именем

••![ico-25 bash] $ curl  -o  index-1.html  https://garevna.github.io/js-samples/index.html••

![](illustrations/curl-05.png)

После выполнения этой операции в текущей папке появится новый файл ~index-1.html~

![](illustrations/curl-06.png)

^^^

Далее воспользуемся тестовым сервером ~http://httpbin.org~
для изучения работы ~curl~ с различными опциями

__________________

^^^[-d]

Эта опция нужна для отправки данных на сервер методом ~POST~

••![ico-25 bash] $ curl -d  "name=garevna&subject=testing"  http://httpbin.org/post••

![](illustrations/curl-07.png)

Обратите внимание на заголовки (Headers)

••"Content-Type": "application/x-www-form-urlencoded"••

Мы отправили данные формы как пары  ключ=значение, соединенные знаком ** &**:

••"name=garevna&subject=testing"••

Сервер автоматически распознал тип контента и установил значение заголовка ~Content-Type~

^^^

^^^[-H]

Эта опция позволяет устанавливать заголовки запроса

Например, мы можем передать в [POST](external/mdn-post)-запросе информацию о типе передаваемого контента

Заголовком по умолчанию для простого POST-запроса будет

••Content-Type: application / x-www-form-urlencoded••

Изменим это значение

Укажем, что мы передаем данные в ~json~-формате:

••![ico-25 bash] $ curl -d '{ name:Irina }'  -H  'Content-Type: application/json'  http://httpbin.org/post••

мы передали простой объект ~{ name:Irina }~
в заголовке ~Content-Type: application/json~
мы указали, что данные передаются в формате ~json~-строки

![](illustrations/curl-08.png)

________________________

Отправим существующий файл **_index.html_** на сервер,

указав в заголовке ~Content-Type~, что мы отправляем обычный текстовый файл (~text/plain~):

••![ico-25 bash] curl -d @index.html -H 'Content-Type: text/plain' http://httpbin.org/post••

![](illustrations/curl-09.png)

^^^

^^^[-u]

Для авторизации запроса на сервере нужно передать с запросом имя пользователя и пароль.

~curl~ поддерживает login и пароль в URL-адресах:

••![ico-25 bash] $ curl http://name:passwd@machine.domain/full/path/to/file••

С помощью опции **~-u~** (**~--user~**) можно передать ~логин:пароль~ отдельно:

••![ico-25 bash] $ curl --user garevna:garevna -d @index.html -H 'Content-Type: text/plain' http://httpbin.org/post••

^^^
