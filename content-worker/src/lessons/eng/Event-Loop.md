# ![ico-30 icon] Event Loop

## ![ico-25 icon] Basic concepts

![ico-20 pin] A **process** is an instance of an executable program that is allocated system resources (CPU time and memory).

![ico-20 pin] A **thread** is a sequence of commands (language statements, function calls, etc.) that are executed sequentially one after the other.

Multiple threads can exist within the same process and share resources (memory).

^^^[Process and thread]
^^![ico-20 warn] Each process runs in a separate address space.^^
^^![ico-20 warn] One process cannot access the data of another process.^^
^^![ico-20 warn] Each program creates at least one main thread that runs the function **~main()~**.^^
^^![ico-20 warn] A program that uses only the main thread is **_single-threaded_**.^^

^^Multithreaded languages use multiple threads.^^
^^In multiprocessor (multi-core) systems, each processor (core) serves a separate thread, so threads do run in parallel (concurrently).^^
^^If there is only one processor, it has to switch from one thread to another quite often to create an illusion of simultaneous code execution in all threads.^^
^^^

A **stack** is a "fast" chunk of RAM.

^^^[Stack]
^^A stack is created for each thread in multithreaded languages.^^
^^The stack is organised according to the LIFO principle (last in, first out).^^
^^The stack size is limited.^^
^^It is set when creating a thread.^^
^^Variables in the stack are always local (**private**).^^
^^^

**Heap** is RAM where **global variables** are stored.

^^^[Heap]
^^The **heap** allows dynamic memory allocation.^^

^^Access to data stored in the **heap** is provided by means of references - variables whose values are addresses of other variables.^^

^^That is why the heap is slower than the stack.^^

^^The processor does not control the **heap** (unlike the **stack**), so **~Garbage Collectors~** are required to free the heap memory from unnecessary variables.^^
^^^

![ico-25 warn] JS is a single-threaded language, so we only have one stack (**~Call Stack~**).

____________________________________

## ![ico-25 icon] Async stuff

☼☼☼ Asynchrony is event domination ☼☼☼

One of the main properties of events is that the time of their occurrence is unpredictable.
What cannot be predicted is impossible to synchronize.

We don't know in advance when the user will click on the button, or if he or she will click at all.
When sending a request to the server, we cannot predict how many milliseconds it will take for us to receive a response from the server.

The second property of most events is that the result of the occurrence of the event is not determined.

@@@@
We can't predict with certainty whether the server's response status will be successful, or if the server will return an http error code to us.
![](illustrations/async-fynny-02.gif)
@@@@

If we can't manage events, then we can let the events control our code.

## ![ico-25 icon] Event-Driven Programming

Asynchronous programming is all about binding functions to specific events.
This is the so-called **event-driven programming**.

Clearly, the environment (platform) where your application will run must have a mechanism that provides event reactivity.
That is, such a mechanism should provide your application with some kind of **Event API** (<b>A</b>pplication <b>P</b>rogramme <b>I</b>nterface), the services of which will allow you to bind your functions to certain events.
The same mechanism should ensure that your functions are launched for execution when the corresponding event occurs.

The browser has such a mechanism, and it is called **Event Loop**.

**_Event Loop_** is an endless loop of task execution.

[%%%MDN%%%](external/mdn-event-loop)

________________________________________

## ![ico-25 icon] Callback

![ico-20 warn] **Only functions are executed in JS.**.
To execute a script, you first need to create an execution context, which will be placed on the **Call Stack**.
That's why it's called **Call Stack**.
What can you call? - only **~function~**.

@@@@ 1
![](illustrations/event-loop-01.png)
@@@@

There are two ways to call a function: **direct call** and **callback**.

**Direct call** - when a function is called by name from the script that is currently being executed.

Executing means that some script is already “sitting” in **Call Stack**.
It can make a **direct call** to any other function.
But how did it get into **Call Stack**?

![ico-20 yes] The first thing in the **Call Stack** is always **callback** function.

**Callback** is an event-bound function that will be pushed onto the **Call Stack** through the **Event Loop** mechanism.

@@@@ 1
![](illustrations/event-loop-script.png)
@@@@

^^Here the snippet script was “wrapped” in a certain function **~anonimous~**, tied to the “run script ~anonimous~” event, after which this event was fired.^^
^^As a result, the script **~anonimous~** “occupied” the Call Stack and began to be executed.^^
^^The **~anonimous~** function became a callback and went through the **Event Loop**.^^
^^Now **~anonimous~** from the call stack can make **direct calls** to other functions.^^
----------------------------
@@@@ 1
![](illustrations/event-loop-02.png)
@@@@

^^The **~parent~** function was called from the **~anonymous~** script. This is a **direct call**.^^
----------------------------
@@@@ 1
![](illustrations/event-loop-03.png)
@@@@

^^The **~demo~** function was called from the **~parent~** script. This is a **direct call**.^^

^^As we can see, they all “sit” on the call stack at the same time.^^
^^At the top there is always the function that is currently being executed.^^
^^The **~parent~** function and the **~demo~** function hit the call stack by direct "invitation".^^
_________________________________________________

But we have one more (anonymous) function, which we assigned as a handler for the **~click~** event of the ~document.body~ element.
This function is by definition a **callback** function.
Note that the callback does not need a name. This is usually an anonymous function.
It is tied to the event.
It can only be started for execution by the **Event Loop** mechanism.
If the event happens, the callback will get a chance to go on the Call Stack.
However, it will have to queue up, because there may be many events, and the callbacks associated with them form a **task queue**.

@@@@ 1
![](illustrations/event-loop-04.png)
@@@@

So, we see that the **callback** always gets into Call Stack first.
And being in the Call Stack, it can call other functions.
And each function being started by **dicrect call** will be in the **Call Stack** at the same time with script that called it.

@@@@ 1
![](illustrations/event-loop-05.png)
@@@@

This function can call another function, whose execution context will also appear on the call stack.
So they will form a “layer cake” in Call Stack.
The function called last will be at the top of the Call Stack.
It will be the first to leave Call Stack.

@@@@ 1
![](illustrations/event-loop-06.png)
@@@@

The last one to leave the **Call Stack** is the **callback**, which gave birth to this entire "pyramid".
Please note that each callback will occupy our single **Call Stack** until all its code will be executed to the last line.
It can call any number of functions, which can also call functions.
Until this entire team leaves **Call Stack**, other callbacks will languish in the **task queue**.

So, the difference between the two ways for a function to get into the **Call Stack**:

| **Direct call** | **Callback** |
| The function will be executed immediately | The callback will be added to the task queue |
| Function will get in the Call Stack when the script that called this function is there | Callback will get in the Call Stack only when Call Stack will be free |

_____________________

@@@@
![](images/funcs-rule.png)
As we can see, not only the inheritance model, but also asynchrony in JS is based on functions.<br><br>In the prototypical inheritance model, **constructor** functions rule, and in asynchronous inheritance, **callback** functions rule.
@@@@

☼☼☼ functions actually rule in JS! ☼☼☼

___________________________________________

## ![ico-25 icon] Event API

@@@@ 3
For obvious reasons, the JS engine does not track events.<br><br>The browser does this.
![](illustrations/js-engine.png)
^^The browser is an intermediary between the operating system and the engine, it tracks keyboard events, mouse events, system clock, etc.^^
@@@@

The browser can send requests to the network and receive responses.

@@@@
As a "middleman", the browser offers an application programming interface (**API**) that allows the JS application to access the powerful capabilities of the browser.<br><br>The browser has an API for working with events, and it can be called **Event API**.
![](illustrations/web-api.png)
@@@@

This term covers various interfaces and methods that allow you to work with events in web applications (more common names:  **Event Handling API** or **Event Listener API**).

The simplest example of a browser API is the global object method **~setTimeout~**.
With its help, we pass a callback to the browser and indicate how many milliseconds later this callback should get into the **task queue**.
Next, the engine ‘washes its hands of it’ because the events are tracked by the browser. The timer is set, and the browser will promptly inform the engine that the time has expired.
When the timer expires, the timer callback will be placed to the end of the **task queue**.
It's not a fact that it will get onto the Call Stack quickly enough.
There may be many callbacks in the **task queue**, and the timer callback will have to wait for its turn.
The engine will pull this callback from the **task queue** when it is its turn and the **Call Stack** is free.

◘◘![ico-20 cap] ** 1**◘◘
~~~js
const start = Date.now()
const timer = (time = 0) => setTimeout(() => console.log(Date.now() - start), time)
let counter = 0
do {
  timer(500)
} while (counter++ < 10000)
~~~

{{{event-loop-01.js}}}

Note that all timers were set to 500 milliseconds.
However, the large number of timer callbacks in the task queue led to the fact that the delay in next callback execution increased as the task queue progressed, and ultimately the last callback entered the call stack not after 500 milliseconds, but much later.

__________________________________________

## ![ico-25 icon] Blocking operations

![ico-20 warn] **“Heavy” tasks block the browser from redrawing the page and make the page non-interactive, i.e. not responding to user actions.**
A "heavy" task is a task that will occupy the stack for a long time and can seriously delay the execution of other tasks in the queue that had the misfortune of getting there after it...

@@@@
![](illustrations/event-loop-queue.png)
^^It's like waiting in line at a doctor's office in a clunky Soviet system.<br>You have an appointment at 2:00 PM, it's already 3:25 PM, and there are still five people ahead of you.<br>^^
^^What does this tell you?<br>It tells you the code is extremely poorly written.^^
^^<br>Yes, the Soviet system was poorly written code.^^
@@@@

Write code so that no function takes up the Call Stack for long.
Otherwise, your page will stop responding to events because the callbacks won't be able to get into the call stack.

◘◘![ico-20 cap] ** 2**◘◘

~~~js
function message (text) {
  document.body.innerHTML += `<small>${text}</small><br>`
}

let start = new Date().getTime()

setTimeout(() => message(`Timer real time: ${new Date().getTime()-start} ms` ), 0)

for (var x = 0; x < 1000000000; x++) continue

message('Loop \'for\' finished')
~~~

In this example, the timer was set to a delay of 0 seconds.
Look what happened

{{{Event-Loop-1.js}}}

__________________________________________________________

Let's declare the auxiliary functions **~createFigure~** and **~message~**:

◘◘![ico-20 cap] **createFigure**◘◘
~~~js
function createFigure () {
  const figure = section
    .appendChild(document.createElement('div'))
  return Object.assign(figure, {
    style: `
      position: absolute;
      top: 108px;
      left: 48px;
      width: 100px;
      height: 100px;
      border-radius: 4px;
      background: #fa0;
    `,
    move () {
      const { left } = figure.style
      Object.assign(figure.style, {
        left: parseInt(left) + 2 + 'px'
      })
      Date.now() - start < 5000 && requestAnimationFrame(figure.move)
    }
  })
}
~~~

◘◘![ico-20 cap] **message**◘◘
~~~js
function message (text) {
  document.body
    .appendChild(document.createElement('p'))
    .innerHTML = `${Date.now() - start}: ${text}`
}
~~~

to use them in the following examples.

◘◘![ico-20 cap] ** 3**◘◘

~~~js
const start = Date.now()

const figure = createFigure()

message('Well, you\'re screwed, kid, now wait for the cycle to complete....')

figure.move()

setTimeout(function () {
  message('<b>Loop started</b>')
  for (var counter = 0; counter < 10000000000; counter++) continue
  message('<b>Loop finished</b>')
}, 0)
~~~

{{{Event-Loop-3.js}}}

A task launched by a timer occupies the call stack for a long and blocks page redrawing and message output to the console.

Take a lesson from this example and then you will understand why we cannot create modal windows.
The browser is multi-threaded and each thread has its own call stack, so modal windows are not a problem for it.
But we only have one call stack.

____________________________________

Let's fix the problem:

◘◘![ico-20 cap] ** 4**◘◘
~~~js
const section = document.body

const start = Date.now()

const figure = createFigure()

figure.move()

const recurse = (counter => {
  message('<b>Loop started</b>')
  return function () {
    if (counter-- > 0) setTimeout(recurse)
    else message('<b>Loop finished</b>')
  }
})(1000)

recurse()
~~~

{{{Event-Loop-4.js}}}

As you can see, the loop works as if “in the background”, without blocking screen redraw and other operations.
However, “background mode” is not possible for us, since JS is single-threaded, with one call stack.
Therefore, we simulate "multithreading" using **Event Loop**.

Later we'll look at asynchronous generators, which do something similar.
______________________________

## ![ico-25 icon] Microtask

☼☼☼ Microtasks are cheeky guys ignoring queue ☼☼☼

Timer callbacks and UI event handlers are **tasks**.

But we also have “magic boxes with two holes” - **promises**!
The method **~then~** of the **promise** is a higher-order function that takes two callbacks as the arguments.
And here in the Event Loop the following miracles happen:

◘◘![ico-20 cap] ** 5**◘◘
~~~js
const start = Date.now()

function message (text) {
  document.body.innerHTML += `<p>${Date.now() - start}: ${text}</p>`
}

const promise = text => new Promise(resolve => resolve(text))

message('Start')

setTimeout(message.bind(null, 'First macrotask'))
setTimeout(message.bind(null, 'Second macrotask'))
setTimeout(message.bind(null, 'Third macrotask'))

promise('First microtask').then(message)
promise('Second microtask').then(message)
promise('Third microtask').then(message)
~~~

{{{event-loop-microtask.js}}}

Timer callbacks get into the **task queue** earlier than promise callbacks (timers do not have a time set, i.e., by default it is 0).
So why do promise callbacks get into the **Call Stack** earlier than timer callbacks?

Because promise callbacks are **microtasks**, and they have their own separate queue.

When the call stack is freed, the engine first looks through the **microtask queue**.
If there are callbacks there they will be sent to the **Call Stack** one by one until the **microtask queue** becomes empty.
Only then the engine will move on to the task queue.

While the tasks are sitting in the task queue and waiting for their turn to get into the Call Stack, nimble micro-tasks slip there under their noses. ![ico-25 smile]

![](illustrations/event-loop-micro-task.gif)

☼☼☼ Microtasks are cheeky little guys who jump into the Call Stack without waiting in line ☼☼☼

________________________________________

As soon as we run a script for execution, we start a task.

The following example starts a task that declares the **message** function, sets timers and a ~click~ event handler on the _document.body_ element.

In addition, this task runs three asynchronous operations using the browser's **Fetch API**.

We are aware that the **~fetch()~** method returns a **promise**.

The callback passed to the method  **~then()~** of promise is a **micro-task**.

And **micro-tasks** have their own queue, which has a higher priority and is serviced earlier than the **task queue**.
Thus, as soon as the Call Stack is free, all the callbacks that are already in the **microtask queue** at that moment will be executed in turn.
And only then the callbacks from the **task queue** will be executed.

◘◘![ico-20 cap] ** 6**◘◘

~~~js
const start = Date.now()

function message (text) {
  document.body.innerHTML += `<p>${Date.now() - start}: ${text}</p>`
}

const timer = ms => setTimeout(() => setTimeout(message.bind(null, `timeout ${ms}`), 0), ms)

function getUser () {
  const since = Math.round(Math.random() * 20000)
  const index = Math.round(Math.random() * 30)
  return fetch(`https://api.github.com/users?since=${since}`)
    .then(response => response.json())
    .then(users => message(`github user ${since + index}: ${users[index].login}`))
}

message('start')

timer(1000)
timer(500)
timer(400)
timer(200)

getUser()
getUser()
getUser()
~~~

{{{Event-Loop-6.js}}}

In this example, by sending a **~fetch()~** request to the server, we receive a **promise** and pass the callback to the **~then()~** method of this promise.
This callback receives an instance of the **Response** constructor, which needs to be parsed using the **~json()~** method to get the contents of body.
The **~json()~** method again returns a **promise**, and we pass the second callback to it's **~then()~** method.
Last callback will already receive the contents of the server response.
Thus, the first callback will be sent to the **microtask queue** first, and only after it ‘works out’ will the second callback be sent to the **microtask queue**.

If we were to send only one callback to the **task queue** using the **~setTimeout()~** method, then all timer callbacks would get into the **Call Stack** before the last microtask got into the **microtask queue**.

To “even the odds,” the timer callback sets the timer again. Then the situation in the **task queue** will be similar to the **microtask queue**.

________________________________________________
