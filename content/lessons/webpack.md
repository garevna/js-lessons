# ![ico-70 webpack] Webpack

{{p1}}

{{p2}}

{{p3}}

____________________________________________________________________

![ico-25 bash] **{{common.c24}}**

{{p4}}

{{p5}}

••![ico-20 bash] npm install -g webpack webpack-cli••

{{p6}}

{{p7}}

••![ico-20 bash] npm i webpack webpack-cli --save-dev••

{{p8}}

{{p9}}
{{p10}}
{{p11}}

_________________________________________________________________________

![ico-25 webpack] **webpack.config.js**

{{p12}}

{{p13}}
{{p14}}

{{p15}}

{{p16}}

![ico-20 webpack] **--config**

{{p17}}

{{p18}}

••![ico-20 bash] webpack --config prod.config.js••

◘◘![ico-20 memo] package.json◘◘

~~~js
"scripts": {
  "build": "webpack --config prod.config.js"
}
~~~

_____________________________________________________________

## ![ico-25 hw] {{common.c3}} 1

( zero-config )

{{p19}}

{{p20}}

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

{{p21}}

◘◘![ico-25 file] **index.js**◘◘

~~~js
const promise = new Promise(function (resolve, reject) {
  document.write('Wait, pease...<br>')
  setTimeout(() => resolve('OK, you are here ?'), 2000)
})

promise.then(response => document.write(response))
~~~

{{p22}}

••![ico-20 bash] webpack••

{{p23}}

{{p24}}
{{p25}}

![](createPath("illustrations","webpack-1.png"))

{{p26}}

{{p27}}

![](https://lh6.googleusercontent.com/0pagIMHm51JuHbTPqLkRnHIEBD3WxdGhsLjsbb7h0faFhCO7cSVQc2gPhsLvisAFmqwymX0xhX2N4qYMH61DP8L7Aq-VesPwpso5WkBWpmT9WyDw9MU1QG1O7Glri7wN-sGxODtftnmxsOs)

{{p28}}

{{p29}}

{{p30}}

{{p31}}

___________________________________________________________________________


## ![ico-25 webpack] {{p32}}

{{p33}}

••![ico-20 bash] webpack --watch --mode production••

![](http://icecream.me/uploads/cef7b80e645edabc44cfd1d609bad0b4.png)

{{p34}}
{{p35}}

![](http://icecream.me/uploads/4af9d3df11f420d5565f8ee17138ad81.png)

______________________________________________________________