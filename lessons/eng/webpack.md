# ![ico-70 webpack] Webpack⟪Webpack⟫

**Webpack** creates a dependency graph for the application

Each module in the application may have dependencies – modules required for it to function correctly

Modules (ES6) are files with the .js extension that contain code

____________________________________________________________________

![ico-25 bash] **Installation**

The **webpack** package is installed using **~npm~**

The command

••![ico-20 bash] npm install -g webpack webpack-cli••

will install ~webpack~ and ~webpack-cli~ globally

^^Abbreviation for the command ~install ( i )~^^

••![ico-20 bash] npm i webpack webpack-cli --save-dev••

will install  ~webpack~ and  ~webpack-cli~  in the current directory

![ico-20 warn] webpack-cli used to be installed by default as part of **Webpack** itself
It has now been moved to a separate module and needs to be installed
It is required to run the build from the command line or via a package manager

_________________________________________________________________________

![ico-25 webpack] **webpack.config.js**

Out of the box, webpack does not require you to use a configuration file

However, it assumes that the entry point of your project is ~src/index.js~,
and that the output will be written to ~dist/main.js~, minimised and optimised for production

Projects usually require extended functionality

To achieve this, you need to create a configuration file in the root folder ! [ico-20 file] **~webpack.config.js~**, which webpack will use by default to configure the build

![ico-20 webpack] **--config**

If you wish to use different configuration files depending on the situation, this can be configured using the ~--config~ flag

in the command line:

••![ico-20 bash] webpack --config prod.config.js••

◘◘![ico-20 memo] package.json◘◘

~~~js
"scripts": {
  "build": "webpack --config prod.config.js"
}
~~~

_____________________________________________________________

## ![ico-25 hw] Exercise 1⟪Exercise_1⟫

( zero-config )

We’ll be working in the  _test_  folder created earlier  ^^(you can name your folder something else)^^

Let’s create some files and folders:

◘◘![ico-25 file] **index.html**◘◘

~~~html
&lt;!DOCTYPE html>
&lt;html lang="ru">
    &lt;head>
        &lt;meta charset="UTF-8">
        &lt;title>webpack-sample&lt;/title>
    &lt;/head>
    &lt;body>
        &lt;div class = "sampleClass">&lt;/div>
        &lt;script src = "./dist/main.js">&lt;/script>
    &lt;/body>
&lt;/html>
~~~

![ico-25 folder] **src**

Create a folder called **src** and place the file ![ico-20 file] **~index.js~** in it

◘◘![ico-25 file] **index.js**◘◘

~~~js
const promise = new Promise(function (resolve, reject) {
  document.write('Wait, pease...<br>')
  setTimeout(() => resolve('OK, you are here ?'), 2000)
})

promise.then(response => document.write(response))
~~~

Now run the following command in the console:

••![ico-20 bash] webpack••

We have called webpack without any parameters or options

A warning appears in the console stating that the option  **~mode~** is missing,
so the default value – **_~production~_** – is used

![](createPath("illustrations","webpack-1.png"))

Note that a new folder,  ![ico-20 folder] **dist**, has appeared in the project folder,

and within this folder is the minified file  ![ico-20 file] **_main.js_**

![](https://lh6.googleusercontent.com/0pagIMHm51JuHbTPqLkRnHIEBD3WxdGhsLjsbb7h0faFhCO7cSVQc2gPhsLvisAFmqwymX0xhX2N4qYMH61DP8L7Aq-VesPwpso5WkBWpmT9WyDw9MU1QG1O7Glri7wN-sGxODtftnmxsOs)

Как видите, мы обошлись без файла конфигурации, поскольку  Webpack 4  позволяет это _при условии использования дефолтных имен файлов и папок_:

![ico-20 warn] The source file must be located in the ![ico-20 folder] **src** folder and be named ![ico-20 file] **_index.js_**

![ico-20 warn] The build output will be placed in the ![ico-20 folder] **dist** folder under the name ![ico-20 file] **_main.js_**

Now open the **_index.html_** file in your browser

___________________________________________________________________________


## ![ico-25 webpack] The --watch option⟪The_--watch_option⟫

webpack will monitor changes to the source files and rebuild the application immediately whenever an update is made

••![ico-20 bash] webpack --watch --mode production••

![](http://icecream.me/uploads/cef7b80e645edabc44cfd1d609bad0b4.png)

Let’s make some changes to the **_index.js_** file
The console shows that webpack has automatically rebuilt the application

![](http://icecream.me/uploads/4af9d3df11f420d5565f8ee17138ad81.png)

______________________________________________________________