# ![ico-30 icon] Chrome DevTools⟪Chrome_DevTools⟫

[![ico-20 link] Chrome DevTools](external/dev-tools)
_____________________________________________________________

## ![ico-25 icon] Sources⟪Sources⟫

Open the [**page**](samples/02).

Go to the **Sources** tab of the developer panel:
![](illustrations/lesson-01-1.png)

On the left we see the navigation panel:
@@@@
![](illustrations/lesson-01-nav-panel.png)
<br><br>To view the code of the loaded page, use the button **~>>~** and open **_Pages_**.<br>Now you can see the project structure in the navigation panel and you can select a file to view.<br>Select the project file, the contents of which will be displayed in the center (**index02.js**).
@@@@

On the right side you see the panel of the debugger itself:
@@@@ 1
![](illustrations/lesson-01-debugger.png)
@@@@
_________________________________________________________

You can work not only with the code of an open page in the debugger.

You can create your own piece of code that you want to debug.

### ![ico-20 icon] Snippet⟪Snippet⟫

Using the same **~>>~** button in the navigation panel, select **_Snippets_**.

**Snippet** - is a piece of code that is stored in the browser for quite a long time under the name you give it.

To add a new code fragment, click on the button •• + New Snippet •• in the left navigation bar and give your snippet a title.

![](illustrations/lesson-01-2.png)

@@@@
Next, you can paste the snippet code in the center, save the changes (Ctrl+S) and run the snippet code for execution ► **Ctrl + Enter**.<br><br>^^If the changes have not been saved, then the modified snippet will be displayed in the navigation panel (on the left) marked with ~ * ~.^^
![](illustrations/lesson-01-snippet.png)
@@@@

________________________________________________________________________

## ![ico-25 icon] Debugger⟪Debugger⟫

The most important sections of the debugger that you will need to master first are:

| Watch | Call Stack | Scope | Breakpoints |

To track the values ​​of variables, we use the section **Watch**.
@@@@
In this section you can add the names of the variables whose values ​​you want to track.
![](illustrations/lesson-01-watch.png)
@@@@

But in order to see how these values ​​change during code execution, you need to set **~breakpoints~**.

@@@@
This is quite easy to do directly in the snippet code.<br>All lines of code are numbered, and just click on the line number to set a breakpoint.
![](illustrations/lesson-01-breakpoints.png)
@@@@

After running the snippet (► **Ctrl + Enter**) , the engine will execute line by line until it reaches the next **~breakpoint~**.
Here the engine will pause executing the code, and you will be able to see the current values ​​of the variables you are watching, and then resume executing the code from where you left off.
You can also make changes to the code, save your changes (**~Ctrl + S~**) and resume code execution.

@@@@
![](icons/debugger-panel.png)
To resume code execution, use the ![ico-40 debug-button] button.
@@@@

![ico-25 warn] After installing ~breakpoints~, you need to refresh the page ![reload].

![](illustrations/lesson-01-debugger.gif)

_______________________________________________________

![ico20] You can also track changes in variable values in the **~Scope~** section of the debugger:
• Local - local variables of the function being executed.
• Block - variables of the call context of the executable function.

![ico-20 warn] Keep track of which function is currently being executed in the **~Call Stack~** section.

_____________________________________________________________________________

### ![ico-25 icon] Event Listener Breakpoints⟪Event_Listener_Breakpoints⟫

In  **Chrome DevTools** , you can also pause code execution when DOM events occur

![](illustrations/Chrome-devtools-breakpoints.gif)

_____________________________________________________________________________

## ![ico-25 hw] Tests⟪Tests⟫

♣♣♣♣
? You have set a breakpoint on line **42**. What will the engine do when it gets there?

+ It will stop **before** executing line 42.
= That’s right! The line has not run yet — its result is not in the variables. That is exactly why what you see at this moment is the state **before** the step: to see the outcome, take one step further.

- It will execute line 42 and stop after it.
= Incorrect — and the confusion is expensive: looking at the values, it is easy to decide the line has already run. It has not. The state after it is one step away.

- It will skip line 42 and carry on with the next one.
= Incorrect. A breakpoint skips nothing — it only pauses. All the code runs as soon as you resume.

- It will print the value of line 42 to the console and carry on.
= Incorrect. That describes **~console.log~**, not a breakpoint. The difference is that a pause lets you look at everything at once — the variables, the call stack, the scope — rather than whatever you thought to print in advance.

? You set a breakpoint in code that runs as the page loads — and nothing happened. Why?

- The breakpoint is in the wrong file — it has to be a file from the **Snippets** tab.
= Incorrect. Breakpoints can be set in any file of the page, not only in snippets. A snippet is a convenience for your own code, not a condition for the debugger to work.

- The changes needed saving — **~Ctrl + S~**.
= Incorrect. **~Ctrl + S~** saves an edit to the code; a breakpoint is set by clicking the line number and needs no saving.

- Breakpoints do not work in code that runs during page load.
= Incorrect. They do work, and debugging page load is routine. The loading simply has to happen **after** the breakpoint is set.

+ That code has already run — before the breakpoint was set. The page needs reloading.
= That’s right! A breakpoint waits for the engine to reach that line, and the engine reached it before you opened the debugger. Reload, and it will work. This is the commonest reason for "I set it and it does not stop".

? How does the **Scope** section differ from the **Watch** section?

+ **Scope** shows by itself everything visible at the breakpoint; **Watch** shows only what you asked to keep an eye on.
= That’s right! **Scope** is a slice of the scope chain — Local, Block, Closure, Global — and the list changes by itself as the engine moves from function to function. **Watch** is your own list of expressions; it stays the same everywhere, and where an expression makes no sense you get a message instead of a value.

- **Watch** shows values before the line runs, **Scope** after.
= Incorrect. Both sections show the same state — the one the engine is standing in now. They do not differ in time.

- Only global variables appear in **Scope**.
= Incorrect. The globals are there too, but the rest is more interesting: **Local** is the running function’s variables, **Block** the block’s, **Closure** what the function carried away from where it was created.

- In no way: both show the values of variables.
= Incorrect. Both show values, but they answer different questions: "what is visible here" and "what did I ask to be shown".

? You wrote a snippet, went to another site and opened DevTools there. What has become of the snippet?

- It has been saved into a file of the project open on the **Sources** tab.
= Incorrect. A snippet does not land in the page’s files — not in the project, not on the server. It lives in the browser’s own storage, beside the DevTools settings.

+ It is there, and it can be run right here.
= That’s right! The browser keeps the snippet, not the page: it survives a reload, a move to another site and the browser being closed. That is the point of it — your own code, runnable on any page, in that page’s surroundings.

- It is gone: snippets live only while the page they were made on is open.
= Incorrect. That is how code typed into the console behaves — it vanishes on reload. A snippet exists precisely in order to stay.

- It is still there, but runs only on the site where it was created.
= Incorrect. A snippet is not tied to a site: it runs in the context of whatever page is open now — which is what makes it a handy tool on other people’s pages as well.

♣♣♣♣
