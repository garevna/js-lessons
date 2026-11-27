# ![ico-30 icon] Event Loop⟪Event_Loop⟫

## ![ico-25 icon] Basic concepts⟪Basic_concepts⟫

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

**Heap** is the memory where the engine puts objects: everything that has to outlive the call it was created in.

^^^[Heap]
^^The **heap** allows dynamic memory allocation.^^

^^Access to data stored in the **heap** is provided by means of references - variables whose values are addresses of other variables.^^

^^That is why the heap is slower than the stack.^^

^^The processor does not control the **heap** (unlike the **stack**), so **~Garbage Collectors~** are required to free the heap memory from unnecessary variables.^^
^^^

![ico-25 warn] JS is a single-threaded language, so we only have one stack (**~Call Stack~**).

___

## ![ico-25 icon] Async stuff⟪Async_stuff⟫

☼☼☼ Asynchrony is event domination ☼☼☼

One of the main properties of events is that the time of their occurrence is unpredictable.

What cannot be predicted is impossible to synchronize.

We don't know in advance when the user will click on the button, or if he or she will click at all.
When sending a request to the server, we cannot predict how many milliseconds it will take for us to receive a response from the server.

The second property of most events is that the result of the occurrence of the event is not determined.

@@@@
^^We can't predict with certainty whether the server's response status will be successful, or if the server will return an http error code to us.^^ ••If we can't manage events, then we can let the events control our code.••
![](illustrations/async-surfer.jpg)
@@@@

___

## ![ico-25 icon] Event-Driven Programming⟪Event-Driven_Programming⟫

Asynchronous programming is all about binding functions to specific events.
This is the so-called **event-driven programming**.

Clearly, the environment (platform) where your application will run must have a mechanism that provides event reactivity.
That is, such a mechanism should provide your application with some kind of **Event API** (<b>A</b>pplication <b>P</b>rogramming <b>I</b>nterface), the services of which will allow you to bind your functions to certain events.
The same mechanism should ensure that your functions are launched for execution when the corresponding event occurs.

The browser has such a mechanism, and it is called **Event Loop**.

**_Event Loop_** is an endless loop of task execution.

![](illustrations/event-driven.jpg)

An event may come from anywhere — a click of the mouse, a timer going off, a message from the network — but the road is the same for all of them: the callback bound to the event joins the task queue, and the **Event Loop** sends them into the call stack one by one.

[%%%MDN%%%](external/mdn-event-loop)

___

## ![ico-25 icon] Callback⟪Callback⟫

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

^^Here the snippet script was “wrapped” in a certain function **~anonymous~**, tied to the “run script ~anonymous~” event, after which this event was fired.^^
^^As a result, the script **~anonymous~** “occupied” the Call Stack and began to be executed.^^
^^The **~anonymous~** function became a callback and went through the **Event Loop**.^^
^^Now **~anonymous~** from the call stack can make **direct calls** to other functions.^^

___

@@@@ 1
![](illustrations/event-loop-02.png)
@@@@

^^The **~parent~** function was called from the **~anonymous~** script. This is a **direct call**.^^

___

@@@@ 1
![](illustrations/event-loop-03.png)
@@@@

^^The **~demo~** function was called from the **~parent~** script. This is a **direct call**.^^

^^As we can see, they all “sit” on the call stack at the same time.^^
^^At the top there is always the function that is currently being executed.^^
^^The **~parent~** function and the **~demo~** function hit the call stack by direct "invitation".^^
___

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

A callback has its other side as well. While there is one of them, all is simple: “do this when the answer comes”. But the answer is usually needed to send the next request, and its answer to show a picture — and callbacks start nesting inside one another. What grows is a staircase to the right, known as **callback hell**.

![](illustrations/callback-hell.jpg)

The trouble is not the beauty of the indentation. The steps are read from the inside out rather than from top to bottom; an error has to be caught in every callback separately, because it will not fall outwards — whoever ordered the callback left the call stack long ago; and the order of the steps is plain only to the reader who got as far as the innermost bracket.

It is out of that staircase that **promises** grew: they unfold the nesting into a chain where the steps follow one another, and one catch serves the whole chain. They have a lesson of their own:

[►►►Promise►►►](page/promise)

___

@@@@
![](slogans/funcs-rule.svg)
As we can see, not only the inheritance model, but also asynchrony in JS is based on functions.<br><br>In the prototypical inheritance model, **constructor** functions rule, and in asynchronous inheritance, **callback** functions rule.
@@@@

☼☼☼ functions actually rule in JS! ☼☼☼

___

## ![ico-25 icon] Event API⟪Event_API⟫

@@@@ 3
For obvious reasons, the JS engine does not track events.<br><br>The browser does this.
![](illustrations/js-engine.png)
^^The browser is an intermediary between the operating system and the engine, it tracks keyboard events, mouse events, system clock, etc.^^
@@@@

The browser can send requests to the network and receive responses.

@@@@
As a "middleman", the browser offers an application programming interface (**API**) that allows the JS application to access the powerful capabilities of the browser.<br><br>The browser has an API for working with events, and it can be called **Event API**.
![](illustrations/browser-event-api.jpg)
@@@@

This term covers various interfaces and methods that allow you to work with events in web applications (more common names:  **Event Handling API** or **Event Listener API**).

The simplest example of a browser API is the global object method **~setTimeout~**.
With its help, we pass a callback to the browser and indicate how many milliseconds later this callback should get into the **task queue**.
Next, the engine ‘washes its hands of it’ because the events are tracked by the browser. The timer is set, and the browser will promptly inform the engine that the time has expired.
When the timer expires, the timer callback will be placed to the end of the **task queue**.
It's not a fact that it will get onto the Call Stack quickly enough.
There may be many callbacks in the **task queue**, and the timer callback will have to wait for its turn.
The engine will pull this callback from the **task queue** when it is its turn and the **Call Stack** is free.

◘◘![ico-20 cap] **1**◘◘

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

___

## ![ico-25 icon] Blocking operations⟪Blocking_operations⟫

![ico-20 warn] **'Heavy' tasks block the browser from redrawing the page and make the page non-interactive, i.e. not responding to user actions.**
A 'heavy' task is a task that will occupy the stack for a long time and can seriously delay the execution of other tasks in the queue that had the misfortune of getting there after it...

@@@@
![](illustrations/blocking-queue.jpg)
^^It's like waiting in line at a doctor's office in a clunky Soviet system.<br>You have an appointment at 2:00 PM, it's already 3:25 PM, and there are still five people ahead of you.<br>^^^^What does this tell you?<br>It tells you the code is extremely poorly written.^^••<br>Yes, the Soviet system was poorly written code.••
@@@@

![ico-20 warn] The most direct way to arrange such a jam is a synchronous request: ~XMLHttpRequest~ with ~false~ as the third argument. Until the server answers, the call stack is busy waiting, and the page answers nothing at all. Browsers complain about it in the console and point to ~fetch~, which returns a promise and holds nothing up.

Write code so that no function takes up the Call Stack for long.
Otherwise, your page will stop responding to events because the callbacks won't be able to get into the call stack.

◘◘![ico-20 cap] **2**◘◘

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

![ico-20 warn] Zero here means “as soon as possible”, not “now”: the callback still joins the task queue and waits for the call stack to clear. And when a timer is set from a timer's callback, more than five such nestings in a row and the browser stops allowing less than four milliseconds.

Look what happened

{{{Event-Loop-1.js}}}

___

Let's declare the auxiliary functions **~createFigure~** and **~message~**:

◘◘![ico-20 cap] **createFigure**◘◘
~~~js
const section = document.body

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

◘◘![ico-20 cap] **3**◘◘

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

Take a lesson from this example, and you will see why we cannot write a window of our own that stops the code until the user answers.
••••
The browser is multi-threaded and each thread has its own call stack, so modal windows are not a problem for it.
But we only have one call stack.
••••

![ico-20 pin] A modal window as such can be made — that is what the ~dialog~ element and its ~showModal()~ method are for: the page behind it goes dim and takes neither clicks nor focus. But the code does not stop at the call: the user's answer arrives as a ~close~ event, not as a returned value. Only ~alert~, ~confirm~ and ~prompt~ stop execution — and it is the browser that stops it, not our code.

___

Let's fix the problem:

◘◘![ico-20 cap] **4**◘◘

~~~js
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
There is no real “background mode” here, though: the page's code still runs in one thread, with one call stack.
Therefore, we simulate "multithreading" using **^^Event Loop^^**.

••![ico-20 pin] A second thread can still be asked of the browser — a **^^Web Worker^^**: it has its own call stack, its own task queue and its own event loop, and it does run in parallel. The price is no access to the DOM: the worker and the page talk in messages. This course is built that way — separate workers serve the lesson content, the icons and the cache.••

Later we'll look at asynchronous generators, which do something similar.
___

## ![ico-25 icon] Microtask⟪Microtask⟫

☼☼☼ Microtasks are cheeky guys ignoring queue ☼☼☼

![](illustrations/task-stream.jpg)

Tasks, microtasks, timers, network requests and heavy computation — all of it drifts towards one single call stack. The order in which they get there is for the **Event Loop** to decide.

Timer callbacks and UI event handlers are **tasks**.

But we also have “magic boxes with two holes” - **promises**!
The **~then~** method of a promise takes a callback too.
And here in the Event Loop the following miracles happen:

◘◘![ico-20 cap] **5**◘◘

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

![](illustrations/microtasks-jump-the-queue.svg)

☼☼☼ Microtasks are cheeky little guys who jump into the Call Stack without waiting in line ☼☼☼

### ![ico-20 icon] queueMicrotask⟪queueMicrotask⟫

The global method **~queueMicrotask()~** puts the function you hand it into the microtask queue — the very one the engine empties in full before taking the next task.

~~~js
queueMicrotask(callback)
~~~

![ico-20 green-ok] takes one argument — a function with no parameters: whatever it needs, it takes from its closure.
![ico-20 green-ok] returns nothing, and a microtask once queued cannot be cancelled: it has no id, the way a timer has.

It will not run straight away: the current code runs to its end first, and once the call stack is free the engine takes it from the queue — in the order the microtasks arrived, and before it gets to the next task.

It differs from **~Promise.resolve().then(fn)~**, which used to do the same job, in two ways. The promise: ~then~ creates one for the sake of a single call, and nobody needs it afterwards. And errors: one thrown inside ~then~ becomes a rejected promise and waits for a ~catch~, while one thrown in a ~queueMicrotask~ callback goes to the window's error handler as an ordinary uncaught exception.

The method is in every current browser — since 2019 — as well as in web workers and in Node.js from version eleven on.

It shows plainly what the test at the end of the lesson asks about: a microtask can schedule the next microtask. The timer here is set on the very first line — and still waits:

◘◘![ico-20 cap] **6**◘◘

~~~js
setTimeout(() => console.log('task'))

let left = 5

const again = () => {
  console.log('microtask, left:', left)
  if (--left) queueMicrotask(again)
}

queueMicrotask(again)
~~~

^^^[Result in the console:]

~~~console
microtask, left: 5
microtask, left: 4
microtask, left: 3
microtask, left: 2
microtask, left: 1
task
~~~

^^^

Five microtasks were born one from another, and all five ran before the task, though the timer had been set before any of them. The microtask queue is emptied in full — and “in full” is checked again after each one: while things are still being added, it is not empty.

![ico-20 warn] Hence the trouble if the condition is removed: a microtask that schedules the next one unconditionally never lets the engine out of the microtask queue. No timer, no click and no repaint will reach the call stack — the tab hangs as surely as from an endless loop. It only looks more innocent: every single callback is short, and the profile shows no long task at all.

The same thing can be seen with the eye. Two bursts of thirty steps: the first chains itself with **~queueMicrotask~**, the second with **~setTimeout~**. A microtask prints a dot, a task a circle, and a repaint marks itself with an asterisk:

◘◘![ico-20 cap] **7**◘◘

~~~js
const out = document.body.appendChild(document.createElement('pre'))

const burst = (schedule, mark, left, after) => {
  const step = () => {
    out.textContent += mark
    --left ? schedule(step) : after()
  }
  schedule(step)
}

let drawing = true

const frame = () => {
  out.textContent += '*'
  if (drawing) requestAnimationFrame(frame)
}

requestAnimationFrame(frame)

burst(queueMicrotask, '.', 30, () => {
  out.textContent += '\n'
  burst(fn => setTimeout(fn), 'o', 30, () => { drawing = false })
})
~~~

{{{Event-Loop-frames.js}}}

Thirty dots go by in a single line with not one asterisk among them: until the microtask queue was empty the browser never got near the screen. Among the circles an asterisk stands every three to six of them — between tasks the browser manages to paint a frame. This is the difference behind the words “the page does not respond”: it is not the amount of work that matters, but whether it lets the browser get a word in.

___

As soon as we run a script for execution, we start a task.

In the next example that task declares the **~message~** function, prints the first message and sets four timers.

In addition, this task runs three asynchronous operations using the browser's **Fetch API**.

We are aware that the **~fetch()~** method returns a **promise**.

The callback passed to the method  **~then()~** of promise is a **micro-task**.

And **micro-tasks** have their own queue, which has a higher priority and is serviced earlier than the **task queue**.
Thus, as soon as the Call Stack is free, all the callbacks that are already in the **microtask queue** at that moment will be executed in turn.
And only then the callbacks from the **task queue** will be executed.

◘◘![ico-20 cap] **8**◘◘

~~~js
const start = Date.now()

function message (text) {
  document.body.innerHTML += `<p>${Date.now() - start}: ${text}</p>`
}

const timer = ms => setTimeout(() => setTimeout(message.bind(null, `timeout ${ms}`), 0), ms)

function getUser () {
  const since = Math.round(Math.random() * 20000)
  const index = Math.round(Math.random() * 25)
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

In this example, by sending a **~fetch()~** request to the server we get a promise, and to its **~then()~** method we pass a microtask, which receives an instance of the **Response** constructor — and that has to be parsed with the **~json()~** method to get at the contents of ~body~.
The **~json()~** method returns a promise again, and to its **~then()~** method we pass a second microtask, the one that will finally receive the contents of the server's answer.
So the first callback goes into the microtask queue, and only once it has done its work is the second one sent there.

Had we sent a single callback to the task queue with **~setTimeout()~**, every timer callback would have reached the call stack before the last microtask even joined the microtask queue.

To even the odds between tasks and microtasks, the timer's callback sets a timer of its own. The task queue then finds itself in much the same position as the microtask queue.

___

## ![ico-25 hw] Tests⟪Tests⟫

♣♣♣♣
? What will the console print?

~~~js
console.log(1)

setTimeout(() => console.log(2))

Promise.resolve().then(() => console.log(3))

console.log(4)
~~~

- **1, 2, 3, 4**
= That would be so if ~setTimeout~ called the callback at once. But a timer callback is a task: it only joins the queue, and runs when the call stack is free.

+ **1, 4, 3, 2**
= First the current script runs to its end — that is 1 and 4. Then the engine empties the microtask queue — that is 3. Only then does it take the first task from the task queue — that is 2.

- **1, 4, 2, 3**
= That would be so if the promise callback stood in the same queue as the timer callback. But microtasks have a queue of their own, and the engine goes through it first.

- The order is unpredictable
= It is predictable down to the last detail: the current script, then the whole microtask queue, then one task. What is unpredictable is when events happen — not the order of these four lines.

? What does the zero in **setTimeout(fn, 0)** mean?

- The callback runs immediately, before the next line of the script
= No callback can enter the call stack while it is busy. The next line of the script runs first, whatever the delay.

- Zero cancels the timer: the callback never runs
= Zero is a delay, not a cancellation. A timer is cancelled by ~clearTimeout~, which needs the id that ~setTimeout~ returned.

- The callback runs before promise callbacks, since its delay is zero
= The delay has nothing to do with it: a promise callback is a microtask, and the microtask queue is taken first however small the timer's delay.

+ The callback joins the task queue and waits until the call stack is free
= Zero means “as soon as possible”, not “now”. And when a timer is set from a timer's callback, after five such nestings the browser stops allowing less than four milliseconds.

? A timer's callback is running a ten-second loop. What happens to the page meanwhile?

+ The page freezes — no repainting, no reaction to clicks; but the clicks are not lost, their callbacks wait in the queue and run once the loop ends
= There is one call stack for everything. While the loop sits in it, neither a callback nor a frame can get in — and the task queue grows meanwhile.

- The browser interrupts a callback that takes too long and brings the page back to life
= The browser does not interrupt your code. It may offer to close the tab, but the loop itself will count to the end.

- The page keeps repainting as usual: another thread does the drawing
= The drawing is indeed the browser's work, but a frame can only be shown between tasks. Until the task ends there is no new frame.

- Clicks made during the loop are lost — there is no one to handle them
= Events are watched by the browser, and it is busy with its own work. Every click puts a callback into the task queue, and after the loop they run one after another — sometimes all at once, to the user's surprise.

? A microtask ends by scheduling another microtask, and so on without end. What becomes of the page?

- No harm done: microtasks are short, and the browser will manage a frame between them
= The browser does not paint between microtasks. A frame is only possible once the microtask queue is empty and the engine is back to tasks.

- The engine starts alternating: a microtask, a task, a microtask, a task
= No alternating is provided for. The microtask queue is gone through in full — and only then does the engine take a single task.

+ The page hangs: the engine keeps emptying the microtask queue and never gets to the tasks or to repainting
= That is the other side of the microtasks' priority: their queue is served in full, until it is empty. An endless chain of ~then~ hangs a tab as surely as an endless loop.

- A safeguard kicks in: after a hundred microtasks the engine moves to the task queue
= There is no such limit. The call stack has one — overflowing it raises an error — but the microtask queue may grow as long as it likes.

? What does a **Web Worker** give you?

- Nothing new: a worker runs in the same thread, only later
= A worker is exactly a second thread. Its code runs at the same time as the page's code, not after it.

+ A real second thread: its own call stack, its own task queue and its own event loop — but with no access to the DOM
= That is why heavy computation is moved into a worker: the main thread stays free and the page keeps answering. They talk in messages.

- A second thread from which the DOM can be changed directly
= The DOM belongs to the window, and the worker cannot see it. It can compute and send the result in a message; changing the page is the main thread's job.

- A second thread that has access to the page's variables
= There are no shared variables: everything passed between page and worker is copied. That is precisely why there are no races over shared data to worry about.

? How does calling a function directly differ from a callback?

- In no way: both are simply calling a function
= The difference is who calls, and when. A direct call is made by the running code; a callback is started by the Event Loop — and only when the stack is free.

- A callback runs faster, because it has a call stack of its own
= There is one call stack per thread, shared by all. A callback is not faster — it is later: first the queue, then a free stack.

- A direct call only works for named functions, a callback only for anonymous ones
= The name has nothing to do with it. A named function can be passed as a callback, and an anonymous one can be called straight away, as is done with a function expression in brackets.

+ A direct call puts the context on the stack at once, on top of the caller; a callback waits in the queue and enters the stack once it is free
= That is why a function called directly returns its value to where it was called from, while a callback has nowhere to return it: whoever ordered it left the stack long ago.

♣♣♣♣

___

## ![ico-25 hw] Quest⟪Quest⟫

♠♠♠♠ The code should print its lines in this order and no other: 1 → 2 → 3 → 4 → 5. It prints them differently, and its labels lie into the bargain: what it calls a microtask is nothing of the kind. Repair it so that step 2 runs synchronously, step 3 is a microtask that queues step 4 — a microtask too — at the end of its work, and step 5 stays a macrotask (**~setTimeout~**) that is guaranteed to fire after the third and the fourth.
console.log('1. script start')

setTimeout(() => {
  console.log('3. first microtask done')

  setTimeout(() => {
    console.log('4. second microtask, queued by the first')
  }, 0)
}, 0)

setTimeout(() => {
  console.log('5. macrotask, UI rendering')
}, 0)

Promise.resolve().then(() => {
  console.log('2. synchronous finish')
})
???
? 2 | all five lines are printed
OUTPUT.length === 5

? 4 | the lines come in the order 1 → 2 → 3 → 4 → 5
OUTPUT.map((line) => (line.match(/^\s*(\d)/) || ['', '?'])[1]).join('') === '12345'

? 2 | the first two lines are printed synchronously
OUTPUT.sync === 2

? 4 | the order is held by the microtask queue, not by nested timers
/queueMicrotask\s*\(|\.then\s*\(/.test(SOURCE) && (SOURCE.match(/setTimeout/g) || []).length === 1
♠♠♠♠

♠♠♠♠ The code adds a sum up — twenty thousand steps — while a timer beside it counts how many turns it got while the work was going on. It gets one, and only once everything is over: the work hangs on the microtask queue, and the engine empties that queue in full, letting nobody in between. Repair it so that the sum is still counted to the end and still correct, but the timer gets its turns while the work goes on rather than after it. Do not cut the amount of work down, and doing it all at once in one synchronous stretch is no way out either — that stops the page for good.
const TOTAL = 20000

let left = TOTAL
let sum = 0

const work = () => {
  sum += left

  if (--left) queueMicrotask(work)
  else console.log('sum:', sum)
}

let ticks = 0

const tick = () => {
  ticks++

  if (left) setTimeout(tick, 0)
  else console.log('the timer got its turn', ticks, 'time(s)')
}

queueMicrotask(work)
setTimeout(tick, 0)
???
? 3 | the sum is counted to the end and correct
sum === 200010000

? 5 | the timer got its turns while the work went on, not once after it
ticks >= 5

? 2 | the work is not done in one synchronous stretch
OUTPUT.sync === 0

? 2 | the long job no longer hangs on the microtask queue
!/queueMicrotask/.test(SOURCE)
♠♠♠♠

♠♠♠♠ A page is assembled out of three parts, and each takes its own time to arrive. The code asks for them in order — head, body, foot — and prints whatever has turned up by the twentieth millisecond, in the order it turned up. Repair it so that one line is printed and it reads **~head body foot~**: the order they were asked for, not the order they arrived in. And the moment everything has arrived may not be guessed by the clock: the repaired code is to have no timer of its own and must learn it from the answers themselves.
const load = (part, ms, done) => setTimeout(() => done(part), ms)

const parts = []

load('head', 60, (part) => parts.push(part))
load('body', 10, (part) => parts.push(part))
load('foot', 30, (part) => parts.push(part))

setTimeout(() => console.log(parts.join(' ')), 20)
???
? 3 | exactly one line is printed
OUTPUT.length === 1

? 6 | its parts stand in the order they were asked for: head body foot
OUTPUT[0] === 'head body foot'

? 3 | readiness is not guessed by the clock: the code has no timer of its own
(SOURCE.match(/setTimeout|setInterval/g) || []).length <= 1
♠♠♠♠
