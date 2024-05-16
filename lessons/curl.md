# ![ico-50 study] curl

Утилита командной строки для передачи данных по URL

[![ico-50 curl]](https://curl.haxx.se/docs/manpage.html)
[%%%usage%%%](https://curl.haxx.se/docs/manual.html)

Синтаксис:

••![ico-25 bash] $ curl опции ссылка••

_______________________

## ![ico-25 icon] Получение данных по url

По умолчанию содержимое запрошенного ресурса будет отправлено на стандартный вывод

••![ico-25 bash] $ curl https://github.com••


^^^[Sample 1]
![](https://lh4.googleusercontent.com/NNBTdfB5sjJHwZonWN9Cas48xn-6Z9FpbQ6cWE8BuKT3viwiqeJARIVZtqXhh-3TYdpRF_E0ZoBCqqWijAUdYdJzTgwMbAGG2EWfLyZEF_3jIRxjKmeHjsHcWTlVjCHfc26Je71T-6LSge8)
^^^

••![ico-25 bash] $ curl curl https://garevna.github.io/js-samples/js/index08.js••

^^^[Sample 2]
![](https://lh6.googleusercontent.com/i5RSX6lSW65LpS8fr040nn2716uWNpBzmjYpI8gy0BFvs8Zm61AvKEd59ym2WbR5OdX7T89iR7Bm0wBUo6o-4unD4W8m3urkCVkAs-LbaaWnkupj6dwvBS4eZ-QUX25uCE83n5RzyZGX_yU)

^^^

## ![ico-25 icon] Опции

^^^[-O]

Сохранить загруженный файл в текущую папку под тем же именем, что и на сервере

••![ico-25 bash] $ curl  -O  https://garevna.github.io/js-samples/js/index08.js••

![](https://lh6.googleusercontent.com/lkSnp2j3kw-lr6y4-S1BCzNMBmdpp2UJ1Qy9LzrWzwyKARaMK1N5o7NbeaEVsrI0XEI1h1jRM7hHE1sh70LJeKA1fRXVgkGlInTBNVToyIE5KsmQWIR8iRQO6XrMBvwQ06FyMliqczbDeB4)

После выполнения этой операции в текущей папке появится новый файл  ~index08.js~

![](https://lh6.googleusercontent.com/jEWF7e21zrx4yQ9ktuK0vwdObUdi6oGTD8Qhzpdw_ngtMP_1A8gb8mpgjqX2qd4NrPO_HSpVubLIpMl_cXWtl9efg2GKOEC76R_81uqlX2fSke5XP0QUBAP1D69q9HlJfYL59TWRi8XHmHE)

^^^

^^^[-o]

Сохранить загруженный файл в текущую папку под указанным именем

••![ico-25 bash] $ curl  -o  index-1.html  https://garevna.github.io/js-samples/index.html••

![](https://lh3.googleusercontent.com/dqMLhIuIj6A4Itq2c5-16BhyBFwZtGjxK4BR4MpWFRKhnuwXzL3pKd8wKzupjmMH0u6QzvbpLaJw-sEDY6GlOILYD_TIz1GFJRy1bD-1ZdL0xhB6qXMTvFaELtnCQYEMjplDyzsjUPqwto0)

После выполнения этой операции в текущей папке появится новый файл ~index-1.html~

![](https://lh6.googleusercontent.com/I9qFh4ByAOmjgAqF7ctDCxeTDwpRBwh-3qzHO1qv97xq5jzADcgPmHQyt3a86LNz-lTiX50t8PaUN5YpoDNSfT6qR7e90O0xy3QpxGL1XgagNCQlu8kGzJCY41fk6HfnpZThmMa1XY3EPoM)

^^^

#### ![ico-30 toilet] ptsv2.com

Далее воспользуемся бесплатным [![ico-25 toilet] тестовым сервером](http://ptsv2.com)
для изучения работы ~curl~ с различными опциями
с HTTP-глаголами ~GET~ и ~POST~

^^Вам следует зарегистрироваться на этом ресурсе, чтобы получить собственный ![ico-20 toilet] для экспериментов ![ico-20 smile]^^

^^![ico-20 warn] В дальнейших упражнениях ~garevna~ нужно будет заменить на идентификатор вашего ![ico-20 toilet]^^

__________________

^^^[-d]

Эта опция нужна для отправки данных на сервер методом ~POST~

••![ico-25 bash] $ curl -d  "name=garevna&subject=testing"  http://ptsv2.com/t/garevna/post••

![](https://lh5.googleusercontent.com/386WFzu4tgvkFsvcDiIBvH_FiFSM5-Oyvcnd9DLGSBzNAnp5R9jV9nLT5x1u188mqU79bdtbvTOQlLWPMMBR3dnO7nliVXydcersaqpRa4_9AUuzxFcq41l3eHsxqkDhzWA5Wf5so2o0u7s)

Обратите внимание на заголовки ( Headers )


••Content-Type   application/x-www-form-urlencoded••

Мы отправили данные формы как пары  ключ=значение, соединенные знаком ** &**:

••"name=garevna&subject=testing"••

Сервер автоматически распознал тип контента и установил значение заголовка ~Content-Type~

^^^

^^^[-H]

Эта опция позволяет устанавливать заголовки запроса

Например, мы можем передать в [**POST**](https://developer.mozilla.org/ru/docs/Web/HTTP/Methods/POST)-запросе информацию о типе передаваемого контента

Заголовком по умолчанию для простого POST-запроса будет

••Content-Type: application / x-www-form-urlencoded••

Изменим это значение

Укажем, что мы передаем данные в ~json~-формате:

••![ico-25 bash] $ curl -d '{ name:Irina }'  -H  'Content-Type: application/json'  http://ptsv2.com/t/garevna/post••

мы передали простой объект ~{ name:Irina }~
в заголовке ~Content-Type: application/json~
мы указали, что данные передаются в формате ~json~-строки

![](https://lh6.googleusercontent.com/VOnTkxF50N7AaZO6IhnCN1SCoMiZCk8m1-SN5rUD2fImZ4ML2LX2RfGLSX_uL7TdcrTWdK4rulFDSM7VMWPmBcL58psevNOLtZvknrbJt6kd3_j6040x5AjZEnamePuulDeHC_OvjrcVQF4)

________________________

Отправим ранее сохраненный файл  **_index-1.html_** на сервер  **http://ptsv2.com**,

указав в заголовке ~Content-Type~, что мы отправляем обычный текстовый файл ( **_~text/plain~_** ):

••![ico-25 bash] curl  -d  @index-1.html   -H  'Content-Type: text/plain'   http://ptsv2.com/t/garevna/post••

![](https://lh5.googleusercontent.com/5vxbWn8QA-_jNTnd085QG4lDAK2XmLrqNDtH4bOmfZu4qA6f6HvM3_Bk2a7ebjIa250DS0y37WtHXW9wf-UiHudeouf36ALIyzdB7wkB4EpjrWMl4RET3UCfX6UXW4wFxH-iyVrkno3gmfc)

^^^

^^^[-u]

Для авторизации запроса на сервере нужно передать с запросом имя пользователя и пароль

~curl~ поддерживает login и пароль в URL-адресах:

••![ico-25 bash] $ curl http://name:passwd@machine.domain/full/path/to/file••

С помощью опции **~-u~** (_**~--user~**_) можно передать ~логин:пароль~ отдельно:

••![ico-25 bash] $ curl --user garevna:garevna -d  @index-1.html   -H  'Content-Type: text/plain'   http://ptsv2.com/t/garevna/post••

^^^
