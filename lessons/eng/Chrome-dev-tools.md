# ![ico-30 icon] Chrome DevTools

[![ico-20 link] Chrome DevTools](external/dev-tools)
_____________________________________________________________

## ![ico-25 icon] Sources

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

### ![ico-20 icon] Snippet

Using the same **~>>~** button in the navigation panel, select **_Snippets_**.

**Snippet** - is a piece of code that is stored in the browser for quite a long time under the name you give it.

To add a new code fragment, click on the button •• + New Snippet •• in the left navigation bar and give your snippet a title.

![](illustrations/lesson-01-2.png)

@@@@
Next, you can paste the snippet code in the center, save the changes (Ctrl+S) and run the snippet code for execution ► **Ctrl + Enter**.<br><br>^^If the changes have not been saved, then the modified snippet will be displayed in the navigation panel (on the left) marked with ~ * ~.^^
![](illustrations/lesson-01-snippet.png)
@@@@

________________________________________________________________________

## ![ico-25 icon] Debugger

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
After resuming, the new version of the code will work.

@@@@
![](icons/debugger-panel.png)
To resume the execution of the code, use the button ![ico-40 debug-button].
@@@@

![ico-25 warn] After setting the ~breakpoints~, you need to reload the page ![reload].

![](illustrations/lesson-01-debugger.gif)

_______________________________________________________

![ico20] You can also track changes in variable values in the **~Scope~** section of the debugger:
• Local - local variables of the function being executed.
• Block - variables of the call context of the executable function.

![ico-20 warn] Keep track of what function is currently running in the **~Call Stack~**.

_____________________________________________________________________________

### ![ico-25 icon] Event Listener Breakpoints

In **Chrome DevTools**, you can also suspend code execution when DOM events occur.

![](illustrations/Chrome-devtools-breakpoints.gif)

_______________________________________________________

[![ico-70 youtube]](https://youtu.be/PQYG2aJf6uI/)
