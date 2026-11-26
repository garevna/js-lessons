# Performance testing⟪Performance_testing⟫

## ![ico-30 study] RAIL⟪RAIL⟫

How much memory does the application use on the client side?
![ico-20 warn] If the amount of memory in use increases in proportion to the application’s runtime, there are memory leaks.
![ico-20 warn] If the application frequently ‘freezes’ for a second or two, the garbage collector is most likely running too often to clear unused variables out of memory.

**RAIL** is a user-centred performance model.
It breaks down user interaction into key actions:

|  **Response**  |  **Animation**  |  **Idle**  |  **Load**  |

Key performance characteristics from the user’s perspective:

![ico-20 green-ok] Page load speed
• Content rendering (visualisation) time
• the time it takes for the page to become interactive, i.e. to start responding to user actions
![ico-20 green-ok] Smoothness of animation (preferably 60fps)
![ico-20 green-ok] Page interactivity
The time from when the user performs an action on the page to when the application responds to that action should be within 100 ms
Any longer delay will be frustrating

**Chrome DevTools** provides a detailed analysis of everything that happens whilst the application is loading and launching

_____________________________________________________________

## ![ico-25 icon] Профиль CPU⟪profylʹ_CPU⟫

In a new browser tab, launch the application you wish to test
Open the **^^Performance^^** tab in Chrome DevTools

![ico-20 warn] There used to be a separate **^^JavaScript Profiler^^** tab for this. It was taken out of DevTools in Chrome 124 and cannot be brought back — a CPU profile is now recorded on the **^^Performance^^** tab. The old name still turns up in articles and videos.

![](illustrations/performance-panel.png)

Start recording (the **^^Record^^** button, the circle at the top left)
Perform a few actions on the application page
Stop recording (press the **^^Stop^^** button)
You can now view the recorded profile, assess the performance of the application’s various modules (functions) and identify problematic sections of code

![](illustrations/performance-main-track.png)

The table with the **^^Self Time^^** and **^^Total Time^^** columns is at the bottom, on the **^^Bottom-Up^^** (every function in a list, the most expensive first) and **^^Call Tree^^** (the same thing as a tree of calls) tabs:

~~~console
    Self Time                  Total Time                Function
_______________________________________________________________________
8092.0 ms                  8092.0 ms                     (idle)
1722.9 ms   93.74%         1722.9 ms      93.74%         (program)
   9.5 ms    0.52%            9.5 ms       0.52%         (garbage collector)
  10.6 ms    0.58%           10.6 ms       0.58%         fetch
   6.4 ms    0.35%           21.8 ms       1.18%         parseLine
   3.5 ms    0.19%           12.2 ms       0.66%         appendChild
   3.3 ms    0.18%           20.7 ms       1.12%         createCodeSnippet
   0.1 ms    0.01%            0.1 ms       0.01%         getElementsByClassName
   ...                      ...                          ...
~~~

_____________________________________________________________

## ![ico-25 icon] Lighthouse⟪Lighthouse⟫

Go to the URL of the application you wish to test
Open the **^^Lighthouse^^** tab in Chrome DevTools ^^( before Chrome 89 it was called **Audits** )^^

DevTools shows the list of categories to check
Leave every category selected
Click the **^^Analyze page load^^** button

![](illustrations/lighthouse-scores.png)

![ico-20 warn] If the browser has extensions installed, Lighthouse says so: they run on the same page and spoil the measurement. An honest result is taken in an incognito window, or in a Chrome profile with no extensions.

### ![ico-20 icon] Performance⟪Performance⟫

**^^First Contentful Paint^^** – the time taken until the first text or image appears on the page
**^^First Meaningful Paint^^** – the time taken to display the main content of the page to the user
**^^Speed Index^^** – a measure of page loading speed (how quickly the page’s content is displayed): the lower the value, the better
**^^First CPU Idle^^** (**^^First Interactive^^**) – the time of the first CPU idle period
minimum page interactivity 
i.e. when most, but perhaps not yet all, UI elements are interactive 
the page responds, on average, to most user input within a reasonable timeframe
**^^Time to Interactive^^** – time to interactivity (how long it takes for the page to become interactive)
This means that:
• useful content is displayed on the page (First Contentful Paint);
• event handlers have been registered for the most prominent UI elements;
• the page responds to user input within 50 milliseconds
**^^Max Potential First Input Delay^^** (first input delay) – the time from when the user first interacts with the page
(i.e. clicks a link, button, etc.) until the browser is able to respond to that action
^^the delay is caused by the browser’s main thread potentially being occupied by another task^^

![ico-20 warn] **^^First Meaningful Paint^^**, **^^First CPU Idle^^** and **^^Max Potential First Input Delay^^** are no longer measured by Lighthouse: they were dropped from the report as unreliable. Today’s report has **^^Largest Contentful Paint^^** (when the largest element on the screen is painted), **^^Total Blocking Time^^** (how long in total the page did not answer input) and **^^Cumulative Layout Shift^^** (how much the content jumped about while loading) instead. The old names remain in articles and in older reports, so they are worth knowing.

[%%%Accessibility%%%](https://web.dev/accessibility)

Here is the whole report — scroll it in the window below: the scores, the metrics, **^^Insights^^** and **^^Diagnostics^^**, and after them **^^Accessibility^^**, **^^Best Practices^^** and **^^SEO^^**. It was taken on this very page of the course; the grip in the bottom right corner drags, if the window wants to be taller.

![scroll](illustrations/lighthouse-report.png)

_____________________________________________________________

## ![ico-25 icon] Memory⟪Memory⟫

[%%%Record heap snapshots%%%](https://developer.chrome.com/docs/devtools/memory-problems/heap-snapshots)
[%%%Fix memory problems%%%](https://developer.chrome.com/docs/devtools/memory-problems/)

Memory usage is shown by the same **^^Performance^^** panel — tick **^^Memory^^** above the tracks and record the profile again. Five lines join the recording: **^^JS heap^^** — everything JavaScript holds: objects, strings, functions; **^^Documents^^** — documents and frames; **^^Nodes^^** — DOM nodes; **^^Listeners^^** — event handlers; **^^GPU memory^^** — what the graphics card has drawn. Beside each name is the range it travelled while the recording lasted.

These lines are read by their shape, not by their height. A step up means memory was taken: objects created, nodes inserted, handlers attached. A sawtooth means the garbage collector comes by and takes back whatever nothing refers to any more — that is how it should be. What deserves a second look is a line that climbs and never comes down while the page does the same thing over and over. Something still refers to what was allocated — a node taken off the page but held in a handler’s closure, say — and every repetition adds more.

Measure on the deployed site rather than on your own machine. The development server, the live rebuild and the browser extensions live in the same tab and spend memory that has nothing to do with the application: on localhost so much of it goes elsewhere that your own code is lost behind it. It is the same reason Lighthouse asks for an incognito window.

![](illustrations/memory-graphs.png)

The picture shows one page of the course loading, 6.75 seconds of it. **^^JS heap^^** grew from 827 kilobytes to 76.9 megabytes, the documents went from three to 21, the DOM nodes from twelve to 3,104, the handlers from ten to 2,074. This is the price of the page itself rather than of any computation: the markup, the highlighted code, the illustrations and every subscription to an event. The lines climb in steps, and each step is one more piece of the page built and shown.

• The JavaScript interpreter dynamically allocates the necessary memory when variables are declared
• Calls to certain functions also result in memory allocation
• Some methods allocate memory for new values or objects

How much memory is taken at this moment, and by what, is shown by a heap snapshot: the **^^Memory^^** tab, **^^Heap snapshot^^**, the **^^Take snapshot^^** button. The snapshot sorts what is taken by kind — code, strings, arrays, typed arrays, system objects:

• code:                   127 kilobytes
• strings:                100 kilobytes
• arrays:                   2 kilobytes
• typed arrays:             1 kilobyte

_____________________________________________________________

## ![ico-25 icon] Timing a piece of code⟪Timing_a_piece_of_code⟫

Let’s look at an example of code whose performance we wish to test:

~~~~js
const segments = [[1, 8], [2, 3], [4, 7], [5, 6], [2, 8], [3, 7], [4, 6], [1, 5], [1, 6]]

function countInnerIntervals (intervals) {
  const results = []

  intervals
    .forEach((segment, index, array) => results.push(array.reduce((childs, section) => array.filter(item => item[0] > segment[0] && item[1] < segment[1]).length)))
  return results
}
~~~~

What interests us is how long the **~countInnerIntervals~** function takes, and whether that changes from one run to the next

To do this, let’s add a button to the page:

~~~~js
const button = document.body
  .appendChild(document.createElement('button'))

button.innerText = 'Start'

button.onclick = function (event) {
  console.time('segments')
  const children = countInnerIntervals(segments)
  console.timeEnd('segments')
  console.log(children)
}
~~~~

Clicking the button calls the function **~countInnerIntervals~**

The call to **~countInnerIntervals~** is wrapped in ~console.time~/~console.timeEnd~, which will allow us to obtain a rough estimate of the function’s execution time

^^^[Result in the console:]

~~~console
segments: 0.536865234375ms
(9) [5, 0, 1, 0, 4, 2, 0, 1, 1]
segments: 0.462158203125ms
(9) [5, 0, 1, 0, 4, 2, 0, 1, 1]
segments: 0.386962890625ms
(9) [5, 0, 1, 0, 4, 2, 0, 1, 1]
segments: 0.55908203125ms
(9) [5, 0, 1, 0, 4, 2, 0, 1, 1]
segments: 0.345947265625ms
(9) [5, 0, 1, 0, 4, 2, 0, 1, 1]
segments: 0.459228515625ms
(9) [5, 0, 1, 0, 4, 2, 0, 1, 1]
~~~

^^^

So, the code’s performance hovers around half a millisecond

Half a millisecond on nine intervals says next to nothing: the interesting question is what happens when there are many of them. Let us build an array of four hundred and press the same button — the DevTools console lets a ~const~ be declared again under the same name:

~~~~js
const segments = Array.from({ length: 400 }, (_, index) => [index, 400 + index * 7 % 400])
~~~~

^^^[Result in the console:]

~~~console
segments: 233.31689453125 ms
segments: 159.1640625 ms
segments: 177.68994140625 ms
segments: 155.601806640625 ms
~~~

^^^

A hundred and fifty milliseconds is already noticeable: for that long the page answers neither a click nor a scroll. Before blaming the browser, read the function again. The ~reduce~ uses neither its accumulator ~childs~ nor the current element ~section~: the callback computes one and the same ~filter~ every time and returns its length. And it is called nearly as many times as there are elements in the array, walking the whole array on each call. The same work is repeated four hundred times where it is needed once.

Take the ~reduce~ away, and what is left is exactly what was being computed:

~~~~js
const countInnerIntervals = intervals => intervals
  .map(segment => intervals.filter(item => item[0] > segment[0] && item[1] < segment[1]).length)
~~~~

^^^[Result in the console:]

~~~console
segments: 1.683837890625 ms
segments: 1.385986328125 ms
segments: 1.35986328125 ms
segments: 1.39990234375 ms
~~~

^^^

The answer is the same — ~[5, 0, 1, 0, 4, 2, 0, 1, 1]~ on nine intervals — and it now takes a millisecond and a half instead of a hundred and fifty-five. The numbers on your own machine will differ; the ratio is what matters. This is what measuring is for: a pointless ~reduce~ is invisible to the eye, since the program does answer correctly, and only the stopwatch shows that nearly all of its work was wasted.
