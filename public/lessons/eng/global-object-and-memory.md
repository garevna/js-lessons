# ![ico-35 study] Introduction. Basics

## ![ico-30 icon] Global object

A little ahead of time, let us introduce the concept of a **global object**.
A **global object** is the environment in which we "live" (operate) and beyond which we cannot go.

@@@@
<br>On the client side JS works in the browser, in the console of which, by the way, we perform all the operations below.<br><br>This is possible because the **V8** engine built into each browser interprets our code and executes it.
![](images/v8-logo.svg)
@@@@

Simplistically speaking, the **global object** for us is the browser (more precisely, its **object model**, but we will deal with that later).
The browser itself works in the operating system and has access to its capabilities.
But we cannot go outside the browser and interact with the operating system directly.
So, the operating system allocates system resources, in particular memory, for the work of applications, including the browser.
The browser manages the memory resource allocated to it, part of which it allocates to the **V8** engine.

Next we will talk about variables, i.e. the memory that will be used by our application.
For our code, access to the global object is provided by the **~window~** variable.

## ![ico-30 icon] Memory and data

Memory is a huge number of cells, each of which can contain 0 or 1.

@@@@
Such a cell is a **bit** of memory.<br>That is why the binary number system was the basis for the first computers.<br>The **8 bits** make **1 byte** of memory.
![](illustrations/vars-bit-and-byte.svg)
@@@@

A maximum of 8 units can be placed in **1 byte** of memory, i.e. the binary number 11111111.

In decimal notation this would be the number 255 without a sign.

If **byte** (8 bits) is interpreted as a signed number, one bit will contain the sign of the number (**+ **or** -**), so the maximum number with a sign that can ‘fit’ into one byte is 127 (seven units).

••-1111111↓↓2 ↓↓ → -127↓↓10↓↓••

^^Any number can be represented in binary by a set of zeros and ones:^^

{{{vars-01.js}}}

^^Any number can be decomposed by powers of two + remainder (0 or 1).^^
^^Since in binary, a two is a ten, we replace the powers of two with the powers of ten, add up, and add the remainder.^^
^^It's simple enough.^^

{{{vars-binary.js}}}

As you have already guessed, the computer can only work with binary numbers, i.e. sets of zeros and ones.
The reasonable question is how does the computer store text, pictures and videos, etc.

Any shade is represented as several numbers:

{{{vars-color.js}}}

Any character is represented by its code (number):

{{{vars-char.js}}}

Thus, any information is represented in computer memory by sets of zeros and ones, and managing memory allocation is a very complex process.
It is quite improbable to operate on physical memory addresses to access data.
The operating system does that.
You don't need to know the physical addresses where your data will be stored.
You need to come up with a name for each data item, and tell the engine what data item you will store under that name.
This is how a **variable** is created.
So, **variables** make it easier for you to manipulate your data and keep your operating system and running applications safe.

## ![ico-30 icon] Data types

As you have already realised, any data is stored in computer memory as a set of zeros and ones.
In order for the engine to correctly interpret this set of zeros and ones, it must know what was stored at the given address: a number, a string or something else.

Suppose a binary number is stored at the specified address:

••0100011001000111010010000100100101001011010011000100110101001110••

It can be interpreted as a decimal integer:

••5064095785634516000••

or as a string with each character occupying 1 byte:

••FGHIKLMN••

There are also many other interpretations.

^^Variables can store numbers, strings, logical values, specific **~null~** and **~undefined~** values, as well as **reference type** data, which we'll get to later.^^

So, it is important that the engine knows the type of the data that is stored in the variable.

Unlike languages with strict typing, we do not need to specify the type of data we intend to store in a variable when declaring it.

**The data type is determined during the process of assigning a value.**

This is called **dynamic typing**.
