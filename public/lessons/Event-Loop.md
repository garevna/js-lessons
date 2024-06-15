# ![ico-30 icon] Event Loop

Событийно-ориентированное программирование (_Event-Driven Programming_)  —  это когда выполнение кода детерминируется событиями

Основой Event-Driven Programming является **Event Loop**, регулирующий поток событий

[%%%MDN%%%](external/mdn-event-loop)

_____________________

☼☼☼ В JS функции реально рулят! ☼☼☼

Функции - это типа мышцы JS.

Всё здесь крутится только вокруг функций.

@@@@

![](images/funcs-rule.png)

Т.е. код может запуститься только если он "завернут" в функцию. Почему? Потому что для выполнения кода сначала нужно создать контекст выполнения, который попадёт в стек вызовов. Поэтому он и называется стек вызовов. Когда тебя вызовут - твой контекст выполнения будет создан, попадёт в стек и твой код отработает.

@@@@

Теперь самое интересное.
Есть два способа, как функция может быть "вызвана".
Первый - это "парадный вход", когда тебя вызывают напрямую из основного потока (который тоже функция).
Второй - это "черный ход", когда ты уже не просто функция, а коллбек.
Тогда ты проходишь через Event Loop.
Это значит, что ты привязан к событию.
Ты будешь вызван, только если это событие произойдет.
Это твой шанс попасть в стек вызовов.
Но тут придётся постоять в очереди, потому что событий много, и коллбеки, связанные с ними, образуют очередь задач. Эта очередь задач - место, где движок взаимодействует с браузерным API. Браузер не может вмешиваться в работу движка, он может только "кидать" коллбеки в очередь задач, а движок их вызовет, если стек вызовов будет свободен.

@@@@

![](illustrations/js-engine.png)

По понятным причинам движок JS не отслеживает события. Это делает браузер. Браузер - посредник между операционкой и движком, отслеживает события клавиатуры, мыши, системные часы и т.д. Браузер может отправлять запросы в сеть и получать ответы.

Как "посредник", браузер предлагает программный интерфейс (API), который обеспечивает JS-приложению доступ к мощным возможностям браузера.

![](illustrations/web-api.png)

![](illustrations/api.png)

В браузере есть API для работы с событиями, и его можно назвать **Event API**. Этот термин охватывает различные интерфейсы и методы, которые позволяют работать с событиями в веб-приложениях (более распространенные названия: **Event Handling API** или **Event Listener API**).

@@@@

Самый простой пример браузерного API - метод глобального объекта setTimeout. С его помощью мы передаем браузеру коллбек и указываем, через сколько миллисекунд этот коллбек должен попасть в очередь задач. Дальше движок "умывает руки", потому что коллбек уже у браузера. По истечении времени коллбек будет помещён браузером в очередь задач, и на этом его работа заканчивается. Из очереди задач движок вытянет этот коллбек в стек вызовов, если тот будет свободен.
Поэтому помните: пишите код так, чтобы стек вызовов не был занят надолго. Иначе ваша страница перестанет реагировать на события, потому что коллбеки не смогут попасть в стек вызовов.
______________________________

••![ico-25 warn] Ничто не исполнится, не попав в **_Call Stack_**<br>![ico-25 warn] Все, что исполняется, пришло из **_Task Queue_**<br>![ico-25 warn] Все, что находится в **_Task Queue_**, называется task••

При запуске нового скрипта движок JS:

^^1) принимает содержимое входного файла скрипта^^
^^2) оборачивает это в функцию^^
^^3) устанавливает эту функцию обработчиком события «запуск» программы^^
^^4) инициализирует другие переменные и функции^^
^^5) эмитирует событие запуска программы^^
^^6) добавляет это событие в очередь событий^^
^^7) извлекает это событие из очереди и выполняет зарегистрированный обработчик,^^
^^и, наконец! -^^
^^8) программа работает^^

^^_Asynchronous Programming in Javascript CSCI 5828:_^^
^^_Foundations of Software Engineering Lectures 18–10/20/2016_^^
^^_by Kenneth M. Anderson_^^

________________________________________

## ![ico-25 icon] Поток выполнения (thread)

![ico-20 pin] **Поток** — это последовательность команд (операторов языка, вызовов функций и т.д.), которые выполняются последовательно друг за другом<br><br>

Несколько потоков могут существовать в рамках одного и того же процесса и совместно использовать ресурсы (память)<br><br>

![ico-20 pin] **Процесс** — это экземпляр исполняемой программы, которому выделены системные ресурсы (время процессора и память)<br><br>

![ico-20 warn] Каждый процесс выполняется в _отдельном адресном пространстве_
![ico-20 warn] Один процесс не может получить доступ к данным другого процесса
![ico-20 warn] Каждая программа создает по меньшей мере один основной поток, который запускает функцию **~main()~**
![ico-20 warn] Программа, использующая только основной поток, является **_однопоточной_**<br><br>

Многопоточные языки используют несколько потоков<br><br>

^^В многопроцессорных (многоядерных) системах каждый процессор (ядро) обслуживает отдельный поток, поэтому потоки действительно выполняются параллельно (одновременно)^^

^^При наличии только одного процессора ему приходится довольно часто переключаться с одного потока на другой, чтобы создать иллюзию одновременного выполнения кода во всех потоках^^

_________________________________________________

## ![ico-25 icon] Стек и куча (heap)

**Стек** — это "быстрый" кусок оперативной памяти<br><br>

^^Стек создаётся _для каждого потока_ в многопоточных языках^^

^^JS однопоточный язык, поэтому у нас только один стек (**~Call Stack~**)^^

^^Стек организован по принципу LIFO (последним пришел - первым ушел)^^

^^Размер стека ограничен^^

^^Он задаётся при создании потока^^

^^Переменные, находящиеся в стеке, всегда являются _локальными (**приватными**)_^^<br><br>

**Heap** ("куча") — это оперативная память, где хранятся глобальные переменные<br><br>

^^"Куча" допускает динамическое выделение памяти^^

^^Доступ к данным, хранящимся в "куче", обеспечивается посредством ссылок - переменных, значения которых являются адресами других переменных^^

^^Поэтому "куча" работает медленнее, чем стек^^

^^Процессор не контролирует "кучу" (в отличие от стека), поэтому для освобождения памяти "кучи" от ненужных переменных требуются  "сборщики мусора"^^

_________________________________________________

## ![ico-25 icon] Асинхронщина

Для понимания того, что такое асинхронщина, пойдем от противного, и сформулируем, что означает синхронное выполнение кода.
Мы знаем, что код выполняется последовательно, сверху вниз, слева направо.
Каждая следующая строчка кода будет выполна тогда, когда завершится исполнение предыдущей.
Это синхронное выполнение.
Никаких неожиданностей.
Все детерминировано.
Когда последняя строчка будет выполнена, приложение завершит работу. Все.

Но как же быть в этом случае с тем, что вы не хотите, чтобы ваше приложение завершило работу? Ведь тогда оно не сможет реагировать на действия пользователя. Не сможет обрабатывать новые данные, которые будут поступать. Оно будет как кинутый камень. Упал - и все.

@@@@

Событийно-ориентированная модель программирования означает, что исполнение кода происходит асинхронно, стихийно и непредсказуемо, поскольку наступление событий предсказать и синхронизировать невозможно.

![](illustrations/async-fynny-01.gif)

@@@@


@@@@

Мы не знаем заранее, когда пользователь кликнет на кнопке, и клинет ли вообще. Посылая запрос на сервер, мы не можем быть уверены на 100%, что сервер выполнит наш запрос, и, тем более, не можем предсказать, через сколько миллисекунд мы получим ответ серевера.

![](illustrations/async-fynny-02.gif)

@@@@

☼☼☼ Асинхронщина - это господство событий ☼☼☼

______________________________

JS — однопоточный язык.
Однако браузер и движок — многопоточные.
^^Это означает, что движок и браузер могут выполнять различные задачи параллельно, в разных потоках.^^
Неблокирующее поведение JS обеспечивается механизмом **~Event Loop~**.

![](illustrations/event-loop.gif)

**_Event Loop_** - это бесконечный цикл выполнения задач.

^^• Есть задача (task) - она исполняется.^^
^^• Закончились задачи - переходим в режим ожидания новых задач...^^

![ico-20 question] _А что произойдет, если задач (тасков) сразу несколько?_

Они будут выстроены в очередь (**Task Queue**), ведь однопоточный JS не может выпонять несколько тасков параллельно.

![](illustrations/event-loop-1.gif)

![ico-20 question] _Откуда берутся таски?_
![ico-20 green-ok] Ну, во-первых, вы можете подключить внешний скрипт к странице, браузет загрузит его и начнет выполнять - появился таск.
![ico-20 green-ok] События, инициированные пользователем (click, mousemove, keypress, scroll, ...) также порождают таски, если есть соответствующие обработчики событий.
![ico-20 green-ok] Таймеры, установленные в коде, по истечении установленного времени также порождают задачу, которую движок должен выполнить

Эти таски будут выполнены **_асинхронно_**, т.е. мы не можем знать наверняка, когда это произойдет.

^^Мы не знаем, когда юзер кликнет или нажмет клавишу (Интерфейс Event)...^^
^^Мы не знаем, когда будут получен ответ сервера (AJAX)...^^
^^Мы не знаем, когда загрузится файл на клиентском компе (File API)...^^
^^Мы не можем знать наверняка, когда сработает колбэк таймера^^

__________________________________________

## ![ico-25 icon] Блокирующие операции

![ico-20 warn] **"Тяжелые" таски блокируют перерисовку страницы браузером и делают страницу не интерактивной, т.е. не реагирующей на действия пользователя.**
"Тяжелый" таск - это таск, который надолго займет колстек и может серьезно задержать выполнение других задач в очереди, которые имели несчастье попасть туда после него...

◘◘![ico-20 cap] ** 1**◘◘

~~~js
function message (text) {
  document.body.innerHTML += `<small>${text}</small><br>`
}

let start = new Date().getTime()

setTimeout(() => message(`Timer real time: ${new Date().getTime()-start} ms` ), 0)

for (var x = 0; x < 1000000000; x++) continue

message('Loop \'for\' finished')
~~~

В этом примере таймер был установлен на задержку 0 сек.
Посмотрите, что получилось

{{{Event-Loop-1.js}}}

__________________________________________________________

◘◘![ico-20 cap] ** 2**◘◘

~~~js
function message (text) {
  document.body.innerText += `${text}\n\n`
}

document.body.onclick = (() => {
  var counter = 0
  return event => message(`body clicked ${++counter} times`)
})()

setTimeout(function () {
  message('<b>Loop started</b>')
  for (var x = 0; x < 10000000000; x++) continue
  message('<b>Loop finished</b>')
}, 0)

setTimeout(function () {
  message('Start')
}, 0)
~~~

В этом примере таск, который запускается таймером, "подвешивает" работу браузера.
Обработчики события click ждут в очереди задач завершения работы таска, запущенного таймером.
Поскольку коллбек таймера, выводящий сообщение "Start" на страницу, будет помещен в очередь задач после коллбека таймера с блокирующим циклом, то мы увидим это сообщение на странице после того, как длинный цикл завершится...

{{{Event-Loop-2.js}}}

------------------------

## ![ico-25 icon] Callback

☼☼☼ Асинхронщина держится на коллбеках ☼☼☼

Итак, событийно-ориентированная модель означает, что именно события управляют порядком исполнения кода.
Приложение, по сути, представляет собой совокупность коллбеков, которые запускаются при наступлении определенного события.

Итак, **асинхронная модель базируется на колбэках - функциях обратного вызова**.

В браузере формируется таблица событий. В эту таблицу помещаются ссылки на функции, которые должны быть вызваны при наступлении определенного события.

Когда какое-либо событие происходит, в таблице событий включается соответствующий триггер.

Браузер периодически просматривает таблицу событий на предмет поиска тех эвентов, которые уже произошли.

Когда он находит такой эвент, он помещает соответствующий колбэк в очередь задач.

Т.е. если, например, в коде установлен таймер на 1000 мс, то по истечении установленного интервала времени будет включен соответствующий триггер в таблице событий.

При очередном просмотре таблицы событий браузер обнаружит включенный триггер и поместит соответствующий колбэк таймера в очередь задач (**~Task Queue~**).

Когда очередь дойдет до этого таска, он будет перемещен в Call Stack и выполнен.

И, как вы понимаете, это произойдет не обязательно через 1000 мс ![ico-20 wink]

![](illustrations/event-loop-2.gif)

Итак, в браузере есть таблица событий и очередь задач (**~Task Queue~**).

Если событий не происходит, эта очередь пуста.

В момент, когда происходит событие, включается триггер этого события в таблице событий.

При следующем просмотре таблицы событий браузер обнаружит "включенные" триггеры и поместит соответствующие колбэки в очередь задач.

Из очереди задач таски попадают в Call Stack по мере его освобождения, т.е. завершения предыдущего таска.

[![ico-70 youtube]](https://www.youtube.com/embed/P77ukSzbgS8 )

Так что вся асинхронщина в JS держится на колбэках ![ico-20 wink]

и все колбэки - это потенциальные таски.

______________________________

## ![ico-25 icon] Microtask

☼☼☼ Мікротаски - це нахабні хлопці, які лізуть позачергово ☼☼☼

Мы уже поняли, что установка таймеров и обработчиков событий UI - это создание тасков.

Однако не все задачи равны "по рангу".
Есть **макрозадачи** и **микрозадачи**.
У них разные очереди, т.е. они никогда не смешиваются.
На каждом "витке" Event Loop выполняется одна макрозадача из очереди.
После завершения очередной макрозадачи Event Loop "принимается" за очередь микрозадач.
Следующий таск из очереди макрозадач не начнет выполняться до тех пор, пока не будут выполнены все микротаски из очереди микрозадач.

Пока таски сидят в и ожидают своей очереди, чтобы попасть в Call Stack, шустрые микротаски проскакивают туда у них под носом ![ico-25 smile]

☼☼☼ Микротаски - это наглые ребята, которые лезут в Call Stack без очереди ☼☼☼

### ![ico-20 icon] Promise

Как только мы запускаем скрипт на исполнение, мы стартуем таск.

В следующем примере это вызов функции **message**, установка таймеров и обработчика события ~click~ на _document.body_.

Кроме того, мы запускаем три асинхронных операции, используя Fetch API браузера.

Но мы знаем, что метод ~fetch()~ возвращает промис...

Колбэк, передаваемый методу ~then()~ промиса, является **микро-таском**.

Отличие микро-таска от таска заключается в том, что браузер "впихнет" его _между тасками_ без очереди.

![](illustrations/event-loop-micro-task.gif)

Т.е. как только будет получен ответ сервера, колбэк, который мы передали методу ~then()~ промиса,
будет запущен сразу после завершения работы текущего таска,
"подвинув" следующий за ним таск, даже если тот встал в очередь намного раньше

◘◘![ico-20 cap] ** 3**◘◘

~~~js
document.body.onclick = (() => {
  let counter = 0
  return event => message(`body clicked ${++counter} times`)
})()

function message (text) {
  document.body.innerHTML += `<p style="user-select: none">${text}</p>`
}

function getUser(since, index = 1) {
  return fetch(`https://api.github.com/users?since=${since}`)
    .then(response => response.json())
    .then(users => message(`github user ${index}: ${users[0].login}`))
}

message('start')

setTimeout(() => message('timeout 0'), 3000)

getUser(10)

setTimeout(() => message('timeout 1'), 2000)

getUser(250, 2)

setTimeout(() => message('timeout 2'), 200)

getUser(300, 3)

setTimeout(() => message('timeout 3'), 50)
~~~

Каждый клик на черном будет порождать новый таск, который будет помещен в очередь задач.

Если ваш клик опередит завершение операции fetch, то соответствующее сообщение появится раньше, чем имена юзеров гитхаба.

Однако колбэки таймеров будут сдвинуты в очереди задач, как только завершится fetch-запрос к серверу.


{{{Event-Loop-3.js}}}
________________________________________________

[![ico-70 youtube]](https://youtu.be/hS7QvR2Ro8o )