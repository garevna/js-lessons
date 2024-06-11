# ![ico-30 icon] Event Loop

Event-Driven Programming is when code execution is determined by events.

The basis of Event-Driven Programming is **Event Loop**, which regulates the flow of events

[%%%MDN%%%](external/mdn-event-loop)

_____________________
☼☼☼ In JS, functions totally rule! ☼☼☼

Functions are like the muscles of JS. Everything here revolves around functions.

@@@@

![](images/funcs-rule.png)

So, code can only run if it's "wrapped" in a function. Why? Because to execute code, you first need to create an execution context, which will go into the **~Call Stack~**. That's why it's called the **~Call Stack~**. When you're called, your execution context is created, put into the stack, and your code runs.

@@@@

Now, here's the cool part.
There are two ways for a function to get "called".
The first is the "main entrance," where you're called directly from the main flow (which itself is a function).
The second is the "back door," where you're not just a function, but a callback.
Then you go through the **Event Loop**.
This means you're tied to an event.
You'll be called only if that specific event happens.
This is your shot to get into the call stack.
But you'll have to wait in line because many events can happen, and the callbacks for these events form a task queue. This task queue is where the engine interacts with the browser's API. The browser can't interfere with the engine's work; it can only "throw" callbacks into the task queue, and the engine will call them if the call stack is free.


For obvious reasons, the JS engine doesn't track events. The browser does. The browser is the middleman between the OS and the engine, tracking keyboard and mouse events, system clocks, and so on. The browser can send network requests and receive responses. As a "middleman," the browser offers a programming interface (API) that lets us use what the browser can do. The browser's API lets us tell the engine that a function is a callback and specify which event this callback is tied to.

The simplest example of a browser API is the global object's **~setTimeout~** method. With it, we pass the browser a ~callback~ and specify how many milliseconds before this ~callback~ should go into the ~task queue~. After that, the engine "washes its hands" because the ~callback~ is in the safe hands of the browser API. After the specified time, the browser puts the ~callback~ into the ~task queue~, and its job is done. From the ~task queue~, the engine pulls this ~callback~ into the **~Call Stack~** if it's free.

![ico-25 warn]So remember: write your code so that the call stack isn't busy for too long. Otherwise, your page will stop responding to events because the callbacks won't be able to get into the call stack.
______________________________

When running a new script, the JS engine:

^^1. accepts the contents of the input script file^^
^^2. wraps it in a function^^
^^3. sets this function as a handler for the 'start' event of the program^^
^^4. initializes other variables and functions^^
^^5. emits a program start event^^
^^6. adds this event to the event queue^^
^^7. retrieves this event from the queue and executes the registered handler,^^
^^and finally! -^^
^^8. the program works^^

^^_Asynchronous Programming in Javascript CSCI 5828:_^^
^^_Foundations of Software Engineering Lectures 18–10/20/2016_^^
^^_by Kenneth M. Anderson_^^

________________________________________

## ![ico-25 icon] Execution thread

![ico-20 pin] **Thread** is a sequence of commands (language statements, function calls, etc.) that are executed sequentially one after another.

Multiple threads can exist within the same process and share resources (memory).

![ico-20 pin] **Process** is an instance of an executable program that is allocated system resources (CPU time and memory).

![ico-20 warn] Each process runs in a separate address space.
![ico-20 warn] One process cannot access another process's data.
![ico-20 warn] Each program creates at least one main thread, which runs the **~main~** function.
![ico-20 warn] A program that uses only the main thread is **single threaded**.

Multithreaded languages ​​use multiple threads.

^^In multiprocessor (multi-core) systems, each processor (core) services a separate thread, so the threads actually execute in parallel (at the same time)^^

^^If there is only one processor, it has to switch from one thread to another quite often to create the illusion of simultaneous code execution in all threads^^

_________________________________________________

## ![ico-25 icon] Stack and Heap

**Stack**is a “fast” piece of RAM.

^^A stack is created _for each thread_ in multi-threaded languages.^^

^^JS is a single threaded language, so we only have one stack (**~Call Stack~**).^^

^^The stack is organized according to the LIFO principle (last in, first out).^^

^^Stack size is limited.^^

^^It is set when creating a thread.^^

^^Variables on the stack are always local (_private_).^^

______________

**Heap** is the RAM where global variables are stored.

^^The **heap** allows for dynamic memory allocation.^^

^^Access to data stored in the heap is provided through references - variables whose values are the addresses of other variables.^^

^^Therefore, the ~heap~ is slower than the ~stack~.^^

^^The processor does not control the ~heap~ (unlike the ~stack~), so **garbage collectors** are required to free ~heap~ memory from unnecessary variables.^^

_________________________________________________

## ![ico-25 icon] Asynchrony

JS is a single threaded language.

However, almost all engines are multi-threaded.

^^This means that the engine can perform tasks in parallel, in different threads.^^

Non-blocking behavior of JS is provided by the engine using the **~Event Loop~** mechanism.

![](illustrations/event-loop.gif)

••**_Event Loop_** is an endless loop of task execution••

^^• There is a task - it is executed^^
^^• The tasks have ended - we go into the waiting mode for new tasks...^^

![ico-20 question] _What happens if there are several tasks at once?_

They will be queued (**Task Queue**), because single-threaded JS cannot execute several tasks in parallel.

![](illustrations/event-loop-1.gif)

![ico-20 question] _Where do tasks come from?_
![ico-20 green-ok] Well, firstly, you can connect an external script to the page, the browser will download it and start executing it - a task has appeared.
![ico-20 green-ok] User-initiated events (click, mousemove, keypress, scroll, ...) also generate tasks for the engine if there are corresponding event handlers.
![ico-20 green-ok] Timers set in the code, after a set time has elapsed, also generate a task that the engine must complete.

These tasks will be executed **asynchronously**, i.e. we can't know for sure when this will happen.

^^We don't know when the user will click or press a key (Event Interface)...^^
^^We don't know when the server response (AJAX) will be received...^^
^^We don't know when the file will be downloaded on the client computer (File API)...^^
^^We cannot know for sure when the timer callback will fire^^

__________________________________________

![ico-20 warn] **Tasks block the browser from redrawing the page**

A "heavy" task can seriously delay the execution of other tasks in the queue that had the misfortune of getting there after it...

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

In this example the timer was set to a delay of 0 sec.
Look what happened.

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

message('Start')
~~~

In this example, a task that is triggered by a timer freezes the browser.
Click event handlers wait in the task queue for the task started by the timer to complete its work.
If the browser did not have time to redraw the page with the "Start" message before the timer task started, then we will see this message on the page after the long loop in the timer ends...

{{{Event-Loop-2.js}}}

------------------------

## ![ico-25 icon] Callback

So, ~Event Loop~ is an event-driven model.

It is based on callbacks functions.

When the engine parses the code (does not execute it, but views and analyzes it), browser generates an event table.

В эту таблицу попадают колбэк-функции, которые должны быть вызваны при наступлении определенного события.
Когда какое-либо событие происходит, в таблице событий включается соответствующий триггер.
Движок периодически просматривает таблицу событий на предмет поиска тех эвентов, которые уже произошли.
Когда он находит такой эвент, он помещает соответствующий колбэк в очередь задач.
Т.е. если, например, в коде установлен таймер на 1000 мс, то по истечении установленного интервала времени будет включен соответствующий триггер в таблице событий.
При очередном просмотре таблицы событий движок обнаружит включенный триггер и поместит соответствующий колбэк таймера в очередь задач (**~Task Queue~**).
Когда очередь дойдет до этого таска, он будет перемещен в Call Stack и выполнен.
И, как вы понимаете, это произойдет не обязательно через 1000 мс ![ico-20 wink]

![](illustrations/event-loop-2.gif)

Итак, в браузере есть таблица событий и очередь задач (**~Task Queue~**).
Если событий не происходит, эта очередь задач пуста.
В момент, когда происходит событие, включается триггер этого события в таблице событий.
При следующем просмотре таблицы событий браузер обнаружит "включенные" триггеры и поместит соответствующие колбэки в очередь задач.
Из очереди задач таски попадают в Call Stack по мере его освобождения, т.е. завершения предыдущей таски.

[![ico-70 youtube]](https://www.youtube.com/embed/P77ukSzbgS8 )

Так что вся асинхронщина в JS держится на колбэках ![ico-20 wink]
и все колбэки - это потенциальные таски.

______________________________

## ![ico-25 icon] Microtask

☼☼☼ Мікротаски - це нахабні хлопці, які лізуть позачергово. ☼☼☼

Мы уже поняли, что установка таймеров и обработчиков событий UI - это создание тасков.

Однако не все таски равны "по рангу".
Есть **макрозадачи** и **микрозадачи**.
У них разные очереди, т.е. они никогда не смешиваются.
На каждом "витке" Event Loop выполняется одна макрозадача из очереди.
После завершения очередной макрозадачи Event Loop "принимается" за очередь микрозадач.
Следующий таск из очереди макрозадач не начнет выполняться до тех пор, пока не будут выполнены все микротаски из очереди микрозадач.

### ![ico-20 icon] Promise

Как только мы запускаем скрипт на исполнение, мы стартуем таск

В следующем примере это вызов функции **message**, установка таймеров и обработчика события ~click~ на _document.body_

Кроме того, мы запускаем три асинхронных операции, используя Fetch API браузера

Но мы знаем, что метод ~fetch()~ возвращает промис...

Колбэк, передаваемый методу ~then()~ промиса, является **микро-таском**

Отличие микро-таска от таска заключается в том, что браузер "впихнет" его _между тасками_ без очереди

![](illustrations/event-loop-micro-task.gif)

Т.е. как только будет получен ответ сервера, колбэк, который мы передали методу ~then()~ промиса,
будет запущен сразу после завершения работы текущего таска,
"подвинув" следующий за ним таск, даже если тот встал в очередь намного раньше

◘◘![ico-20 cap] ** 3**◘◘

~~~js
function message(text) {
  document.body.innerText += `${text}\n\n`
}

document.body.onclick = (() => {
  var counter = 0
  return event => message(`body clicked ${++counter} times`)
})()

message('start')

setTimeout(() => message('timeout 0') , 3000)

fetch('https://api.github.com/users')
  .then(response => response.json())
  .then(users => message(`1: ${users[0].login}`))

setTimeout(() => message('timeout 1'), 2000)

fetch('https://api.github.com/users?since=250')
  .then(response => response.json())
  .then(users => message(`2: ${users[0].login}`))

setTimeout(() => message('timeout 2'), 100)

fetch('https://api.github.com/users?since=300')
  .then(response => response.json())
  .then(users => message(`3: ${users[0].login}`))

setTimeout(() => message('timeout 3'), 0)

section.dispatchEvent(new Event('click'))
~~~

Каждый клик на черном будет порождать новый таск, который будет помещен в очередь задач

Если ваш клик опередит завершение операции fetch, то соответствующее сообщение появится раньше, чем имена юзеров гитхаба

Однако колбэки таймеров будут сдвинуты в очереди задач, как только завершится fetch-запрос к серверу


{{{Event-Loop-3.js}}}
________________________________________________

[![ico-70 youtube]](https://youtu.be/hS7QvR2Ro8o )
