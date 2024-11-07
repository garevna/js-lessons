# ![ico-35 icon] Web Developer's Dashboard

If you use the keyboard shortcut **~Ctrl + Shift + I~** or the **~F12~** key, it will open up a development panel like this:

![](illustrations/developer-tools-console-tabs.png)

As you can see, there are several tabs in the development panel:

| **Elements** | **Console** | **Sources** | **Application** | **Network** | **Performance** | **Memory** | ... |

If you have studied layout, you are already familiar with the **Elements** tab. Here you can see the page layout and element styles.

However, now we will gradually learn the rest of the tabs, and we will start with the **Console** tab.
_______________________________________________________________

## ![ico-30 icon] Browser Console

In the console we see the prompt **~ > ~**, i.e. the console is waiting for you to enter any command, which will be executed as soon as you press **~Enter~**:

§§§§ Demo | developer_tools_01_template §§§§

Due to the fact that every browser has the JS engine (V8), we can execute any script directly in the console.

^^If you need to enter a multi-line code fragment, at the end of each line press **~Shift + Enter~** instead of **~Enter~**, because **~Enter~** executes the entered code immediately, and **~Shift + Enter~** allows you to jump to a new line of code without starting execution.^^

Generally speaking, the console is intended for displaying messages when our code is being executed.
For example, when we encounter errors in our code, the engine will generate an **exception** and throw an error message to the console.

All exceptions are grouped into three main clusters:

• **SyntaxError**
• **ReferenceError**
• **TypeError**

Exception means interrupting code execution on the line where there is an error.

Moreover, we can access the console "by name" (**~console~**) and use its commands to output some messages to the console:

§§§§ Demo | developer_tools_02_template §§§§

![ico-25 smile] We will stop studying the Developer Toolbar for now, but we will use its other tabs later on, and I hope you will appreciate the possibilities this panel provides you with.
