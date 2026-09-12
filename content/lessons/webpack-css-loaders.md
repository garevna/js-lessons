# ![ico-70 node] module.exports & require()

{{s0.p1}}

{{s0.p2}}

## ![ico-25 icon] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

_________________________________________

{{s1.p3}}

◘◘![ico-20 file] script.js◘◘

~~~js
module.exports = {
  hello: function () {
    console.log('Привет, будущие девелоперы!')
  },

  message: function (mess) { console.log(mess) }
}
~~~

{{s1.p4}}
{{s1.p5}}
{{s1.p6}}

_____________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}

{{s2.p4}}
{{s2.p5}}
{{s2.p6}}

◘◘![ico-20 file] start.js◘◘

~~~js
const lib = require('./script.js')

lib.hello()
lib.message('Вы еще не знакомы с Node.js ?')
~~~

{{s2.p7}}

◘◘![ico-20 file] package.json◘◘

~~~json
{
  "name": "test",
  "version": "1.0.0",
  "description": "test",
  "main": "start.js",
  "scripts": {
      "start": "node start.js",
      "dev": "webpack --mode development  --watch",
      "build": "webpack --mode production  --watch"
  },
  "keywords": [ "npm", "Node.js", "node", "webpack" ],
  "author": "...",
  "license": "MIT"
}

~~~

{{s2.p8}}

••![ico-20 bash] npm run start••

{{s2.p9}}

••![ico-20 bash] node start.js••

{{s2.p10}}

{{s2.p11}}

_______________________________________________________________________________

{{s2.p12}}
{{s2.p13}}
{{s2.p14}}

{{s2.p15}}

_______________________________________________________________________________

# ![ico-30 webpack] webpack.config.js

{{s2.p16}}

_______________________________________________

{{s2.p17}}

{{s2.p18}}

^^^[{{s2.spoiler1}}]

{{s2.p19}}

{{s2.p20}}

{{s2.p21}}

~~~js
const path = require('path')
~~~

{{s2.p22}}

{{s2.p23}}

~~~js
path.resolve(__dirname, 'build')
~~~

^^^

_______________________

{{s2.p24}}


◘◘![ico-20 file] webpack.config.js◘◘

~~~js
const path = require('path')

module.exports = {
  entry: { main: './js/script.js' },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  }
}
~~~

______________________________________________________________

## ![ico-25 webpack] Loaders

{{s2.p25}}
{{s2.p26}}
{{s2.p27}}
{{s2.p28}}
{{s2.p29}}
{{s2.p30}}
{{s2.p31}}

{{s2.p32}}


{{s2.p33}}

| ^^**module.exports**^^ |
{{s2.p34}}
{{s2.p35}}
{{s2.p36}}
{{s2.p37}}
{{s2.p38}}
{{s2.p39}}


________________________________________________________________


### ![ico-20 webpack] {{s3.h1}}

![ico-20 webpack] style-loader
![ico-20 webpack] css-loader

{{s3.p1}}

{{s3.p2}}

{{s3.p3}}

{{s3.p4}}

{{s3.p5}}

{{s3.p6}}

~~~js
['style-loader', 'css-loader']
~~~

____________________________________________________________________

[%%%**Regular Expressions**%%%](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Regular_Expressions)

________________________________________________________________

## ![ico-25 webpack] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

◘◘![ico-20 file] main.css◘◘

~~~css
body {
  background-color: #000;
  font-family: monospace, Arial;
  font-size: 16px;
  color: #9ab;
}
~~~

![](https://lh5.googleusercontent.com/oSo7naNlVfS1BFfQ3ybg_bemnZmkDEZKTVrbvxsMjvbCye6wc4DQOO68r1PKQv-MfTtBsdgxep9v98fC6QHu6sGAGx_offjUo-FyNI-3-8RD1iQGMpTAchMMuKpHoZmY2bH5YyIse38gFvk)

{{s4.p3}}

◘◘![ico-20 file] script.js◘◘

~~~js
import css from '../css/main.css'
~~~

![](https://lh6.googleusercontent.com/E60i49827-g4mBJR28bIYMYU2D0NGi7FlnCkYNgkdNVSX4QYCmlAH4nLLJWltIqIns3ymwNfgvOKLJFeFC0ydtEkf6w3SDUgXzUZ5btCJXix4jJZqt4xbLrsRHTsVTDLB7NKtp4lUEktyBs)

__________________________________________________

{{s4.p4}}

{{s4.p5}}

{{s4.p6}}

{{s4.p7}}

![](https://lh6.googleusercontent.com/9iIWxB9HHuCzZ4ZFlhrUW_GrG3cCX-Y3560mRCPTICdKPAUGNmWgDpwKFuld9rV8dFnVgHIn7Yv0PophBSGy0AqRouju3FG2Jwc6M2ZVNiWRMvpS0sUX7h08HXTsFs_Pzvtjv73t1aqnex8)

{{s4.p8}}

{{s4.p9}}

_____________________

### ![ico-20 webpack] {{s5.h1}}

••![ico-20 bash] npm install css-loader style-loader --save-dev••

![](https://lh5.googleusercontent.com/ctLeetPIQ0Bsol7YcR3GC0Qixw4p7xoKnaCivTnevYg86sTwezG9f5vYHAXHGd8Af-M8dVzryfOpC682knlYug_aVafWxnpUxUnpcxmuX1hctX_A1Djj4hNguJYB_ktbmR2SSpTwMW08jAQ)

{{s5.p1}}

{{s5.p2}}

**package.json**

![](http://icecream.me/uploads/1ecae9d3709876ce3b8cfee212dc4059.png)

__________________________________

{{s5.p3}}

◘◘![ico-20 file] webpack.config.js◘◘

~~~js
const path = require('path')

module.exports = {
  entry: { main: './js/script.js' },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
         'style-loader',
         'css-loader'
        ]
      }
    ]
  }
}
~~~

_________________________________________________________________________


### ![ico-20 webpack] {{s6.h1}}

{{s6.p1}}

![](https://lh6.googleusercontent.com/LrTASIeOuHlf0WgAZ6hjzzePQ9ib4NLHzddAUco_ufKMrdtR6yhZ1LAAyAymQPUcYaESRPWU7gOovrdR2zKf1XCt6FR3mkUBXUL2XomNqYIUw7bct0o6BTHQUpY3TT92S6KKA9O5heABRLQ)

{{s6.p2}}

{{s6.p3}}

{{s6.p4}}

{{s6.p5}}

~~~css
img { margin: 40px; border: dotted 2px yellow; }
~~~

{{s6.p6}}