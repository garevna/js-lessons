# ![ico-30 icon] Algorithm flowchart

______________________________________________________________________

## ![ico-25 icon] Algorithm

Structural programming is based on the triad:

- **Sequence** - execution of actions one after another.
- **Branching** - selection of an action depending on the fulfilment of a condition.
- **Cycle** - multiple repetition of the same sequence of actions.

Programming begins with _description of an algorithm_.

**Algorithm** is a step-by-step system of instructions defining the process of transition from the initial data (input) to the desired result (output).

| **~Input~** | ** ➔** | **~Process~** | ** ➔** | **~Output~** |

If the output result exists, the algorithm is executed in a finite number of steps.

If the desired result does not exist, the algorithm either never completes or reaches a dead end.

Sometimes the algorithm is simple enough that you keep it in mind when you write a script.

But sometimes it's so complex that you want to have a visualisation it so you don't forget or confuse anything.

One way to describe an algorithm is a **flowchart**.


________________________________________________________________________________

## ![ico-25 icon] Flowchart

Flowcharts are indispensable tools for visualising complex processes.

In order to depict a process schematically, we need certain graphical forms.

The simplest of such forms are:

@@@@ 1
![](illustrations/flowchart-symbols.svg)
@@@@

The algorithm must have the beginning and the end.

Transition from one action to another is represented by arrows.

The block of operations (a rectangle) allows you to use different level of detail. A whole sequence of simple actions can be written into one such block, or each such simple action can be placed in a separate block.

<div class="flowchart-endpoints">Begin<div>
<div class="flowchart-arrow">↓</div>
<div class="flowchart-process">Get your trousers<div>
<div class="flowchart-arrow">↓</div>
<div class="flowchart-process">Clean your trousers<div>
<div class="flowchart-arrow">↓</div>
<div class="flowchart-process">Sew on a button<div>
<div class="flowchart-arrow">↓</div>
<div class="flowchart-process">Iron the trousers<div>
<div class="flowchart-arrow">↓</div>
<div class="flowchart-process">Put the trousers on<div>
<div class="flowchart-arrow">↓</div>
<div class="flowchart-endpoints">End<div>

_______________________________________________________

Each of the ‘Clean trousers’ or ‘Sew on a button’ blocks can be expanded into a separate sequence of actions.

You can rearrange the ‘Clean trousers’ and ‘Sew on a button’ blocks, but you should definitely not rearrange the ‘Put on trousers’ block, as this will make all other operations much more complicated.

_______________________________________________________

^^To draw a flowchart, you can use^^ [^^**free service**^^ ![ico-25 draw-io]](https://www.draw.io/)

_______________________________________________________

### ![ico-20 icon] Sequence

You may not realise it, but your whole life is a process that consists of a certain sequence of actions.

You get up in the morning, then go to the bathroom, then (most likely) to the kitchen where you make your coffee, etc.

Before going to work, you get dressed.

It would probably be weird if you went outside straight from the shower. Although stuff happens ![ico-25 wink].

I.e. if you remove some link in your sequence of actions, or rearrange two separate operations, the result can be very unpleasant.

Suppose you make yourself tea, drink it, and only then put sugar in your cup. My guess is that you have been drinking unsweetened tea. Adding sugar after tea drinking is obviously not going to fix the situation.

So, consistency is very important.

When you write a programme, you give the computer a clear sequence of actions.

This sequence can be represented schematically in the form of a flowchart:


@@@@ 1
![](illustrations/flowchart-sequence.svg)
@@@@

As you can see, the direction from top to bottom is strictly observed.
Only after the previous action is completed does the next one begin.

_______________________________________________________

### ![ico-20 icon] Branching

Very often we are forced to make a decision about what to do.
If your salary is delayed, you cannot make a planned purchase.
Getting your salary is a condition, if it is fulfilled - you can buy what you planned.

Your code will operate on data that changes dynamically.
Depending on the value of some data, your code will perform different operations.
For example, a user opened your application.
He may have registered, logged in or logged in as an unregistered user.
If he is a registered user, he can log in to his personal account.
Otherwise, he can't.

@@@@ 1
![](illustrations/flowchart-branching.svg)
@@@@

_______________________________________________________

### ![ico-20 icon] Cycle

Repeating the same sequence of actions several times is a cycle.

Washing dishes by hand is a cycle (plate after plate, cup after cup - until all the dishes are washed).

Walking is a cycle: you lift your left leg, carry it forward, lower it, you shift your body weight to the left leg and lift the right leg, which is also carried forward and lowered, and so on until you reach the destination point or you get bored with these exercises.

In a flowchart of the algorithm, the cycle would look something like this:

@@@@ 1
![](illustrations/flowchart-circle.svg)
@@@@

As you can see, there is some condition whose fulfilment is checked at each **iteration** of the loop.
I.e. if we didn't use the **branching** above, the loop would loop infinitely, which is absolutely inadmissible.

_______________________________________________________


![ico-20 hw] **Exercise 1**

^^Draw a flowchart of the algorithm for summing all integers from 1 to N.^^

![ico-20 hw] **Exercise 2**

^^raw a flowchart of the algorithm for summing all odd integers from 1 to N.^^

__________________________________________________________________

### ![ico-25 cap] Fibonacci series

^^The Fibonacci series is a sequence of numbers, each of which is equal to the sum of the two preceding numbers.^^

^^The first and second terms of the Fibonacci series are equal to 1.^^

**Flowchart of the algorithm for calculating a Fibonacci series term by its number ~ N ~:**

@@@@ 1
![](illustrations/flowchart-fibonachi.svg)
@@@@

_______________________________________________________

![ico-20 hw] **Exercise 3**

^^Modify the flowchart of the algorithm for calculating the item of the Fibonacci series by it's number ** N** as follows:^^

^^• Change the starting values of the variables.^^
^^• Move the increment (increment) of the variable ** n** before the code branching block (where ** n** and ** N** are compared).^^

~~~js
  n = 1
  a = 1
  b = 1
  F = 1   
  n = n + 1
  ...
~~~

_______________________________________________________

![ico-20 hw] **Exercise 4**

^^Draw a flowchart of the algorithm for calculating the factorial of a number N.^^

^^**Factorial** of **N ** is the product of all numbers from 1 to ** N**.^^

~~~js
N! = 1 * 2 * 3 * 4 * .... * N
~~~
