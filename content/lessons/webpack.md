# ![ico-70 webpack] Webpack

{{s0.p1}}

{{s0.p2}}

{{s0.p3}}

____________________________________________________________________

{{s0.p4}}

{{s0.p5}}

{{s0.p6}}

••![ico-20 bash] npm install -g webpack webpack-cli••

{{s0.p7}}

{{s0.p8}}

••![ico-20 bash] npm i webpack webpack-cli --save-dev••

{{s0.p9}}

{{s0.p10}}
{{s0.p11}}
{{s0.p12}}

_________________________________________________________________________

![ico-25 webpack] **webpack.config.js**

{{s0.p13}}

{{s0.p14}}
{{s0.p15}}

{{s0.p16}}

{{s0.p17}}

![ico-20 webpack] **--config**

{{s0.p18}}

{{s0.p19}}

••![ico-20 bash] webpack --config prod.config.js••

◘◘![ico-20 memo] package.json◘◘

~~~js
"scripts": {
  "build": "webpack --config prod.config.js"
}
~~~

_____________________________________________________________

## ![ico-25 hw] {{s1.h1}}

( zero-config )

{{s1.p1}}

{{s1.p2}}

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

{{s1.p3}}

◘◘![ico-25 file] **index.js**◘◘

~~~js
const promise = new Promise(function (resolve, reject) {
  document.write('Wait, pease...<br>')
  setTimeout(() => resolve('OK, you are here ?'), 2000)
})

promise.then(response => document.write(response))
~~~

{{s1.p4}}

••![ico-20 bash] webpack••

{{s1.p5}}

{{s1.p6}}
{{s1.p7}}

![](createPath("illustrations","webpack-1.png"))

{{s1.p8}}

{{s1.p9}}

![](https://lh6.googleusercontent.com/0pagIMHm51JuHbTPqLkRnHIEBD3WxdGhsLjsbb7h0faFhCO7cSVQc2gPhsLvisAFmqwymX0xhX2N4qYMH61DP8L7Aq-VesPwpso5WkBWpmT9WyDw9MU1QG1O7Glri7wN-sGxODtftnmxsOs)

{{s1.p10}}

{{s1.p11}}

{{s1.p12}}

{{s1.p13}}

___________________________________________________________________________


## ![ico-25 webpack] {{s2.h1}}

{{s2.p1}}

••![ico-20 bash] webpack --watch --mode production••

![](http://icecream.me/uploads/cef7b80e645edabc44cfd1d609bad0b4.png)

{{s2.p2}}
{{s2.p3}}

![](http://icecream.me/uploads/4af9d3df11f420d5565f8ee17138ad81.png)

______________________________________________________________