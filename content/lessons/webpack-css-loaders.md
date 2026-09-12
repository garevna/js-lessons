# ![ico-70 node] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

_________________________________________

{{s2.p3}}

{{s2.p4}}

~~~js
module.exports = {
  hello: function () {
    console.log('Привет, будущие девелоперы!')
  },

  message: function (mess) { console.log(mess) }
}
~~~

{{s2.p5}}
{{s2.p6}}
{{s2.p7}}

_____________________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

{{s3.p3}}

{{s3.p4}}
{{s3.p5}}
{{s3.p6}}

{{s3.p7}}

~~~js
const lib = require('./script.js')

lib.hello()
lib.message('Вы еще не знакомы с Node.js ?')
~~~

{{s3.p8}}

{{s3.p9}}

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

{{s3.p10}}

{{s3.p11}}

{{s3.p12}}

{{s3.p13}}

{{s3.p14}}

{{s3.p15}}

_______________________________________________________________________________

{{s3.p16}}
{{s3.p17}}
{{s3.p18}}

{{s3.p19}}

_______________________________________________________________________________

# ![ico-30 webpack] {{s4.h1}}

{{s4.p1}}

_______________________________________________

{{s4.p2}}

{{s4.p3}}

{{s4.p4}}

{{s4.p5}}

{{s4.p6}}

{{s4.p7}}

~~~js
const path = require('path')
~~~

{{s4.p8}}

{{s4.p9}}

~~~js
path.resolve(__dirname, 'build')
~~~

{{s4.p10}}

_______________________

{{s4.p11}}


{{s4.p12}}

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

## ![ico-25 webpack] {{s5.h1}}

{{s5.p1}}
{{s5.p2}}
{{s5.p3}}
{{s5.p4}}
{{s5.p5}}
{{s5.p6}}
{{s5.p7}}

{{s5.p8}}


{{s5.p9}}

{{s5.p10}}
{{s5.p11}}
{{s5.p12}}
{{s5.p13}}
{{s5.p14}}
{{s5.p15}}
{{s5.p16}}


________________________________________________________________


### ![ico-20 webpack] {{s6.h1}}

{{s6.p1}}
{{s6.p2}}

{{s6.p3}}

{{s6.p4}}

{{s6.p5}}

{{s6.p6}}

{{s6.p7}}

{{s6.p8}}

~~~js
['style-loader', 'css-loader']
~~~

____________________________________________________________________

{{s6.p9}}

________________________________________________________________

## ![ico-25 webpack] {{s7.h1}}

{{s7.p1}}

{{s7.p2}}

{{s7.p3}}

~~~css
body {
  background-color: #000;
  font-family: monospace, Arial;
  font-size: 16px;
  color: #9ab;
}
~~~

![](https://lh5.googleusercontent.com/oSo7naNlVfS1BFfQ3ybg_bemnZmkDEZKTVrbvxsMjvbCye6wc4DQOO68r1PKQv-MfTtBsdgxep9v98fC6QHu6sGAGx_offjUo-FyNI-3-8RD1iQGMpTAchMMuKpHoZmY2bH5YyIse38gFvk)

{{s7.p4}}

{{s7.p5}}

~~~js
import css from '../css/main.css'
~~~

![](https://lh6.googleusercontent.com/E60i49827-g4mBJR28bIYMYU2D0NGi7FlnCkYNgkdNVSX4QYCmlAH4nLLJWltIqIns3ymwNfgvOKLJFeFC0ydtEkf6w3SDUgXzUZ5btCJXix4jJZqt4xbLrsRHTsVTDLB7NKtp4lUEktyBs)

__________________________________________________

{{s7.p6}}

{{s7.p7}}

{{s7.p8}}

{{s7.p9}}

![](https://lh6.googleusercontent.com/9iIWxB9HHuCzZ4ZFlhrUW_GrG3cCX-Y3560mRCPTICdKPAUGNmWgDpwKFuld9rV8dFnVgHIn7Yv0PophBSGy0AqRouju3FG2Jwc6M2ZVNiWRMvpS0sUX7h08HXTsFs_Pzvtjv73t1aqnex8)

{{s7.p10}}

{{s7.p11}}

_____________________

### ![ico-20 webpack] {{s8.h1}}

{{s8.p1}}

![](https://lh5.googleusercontent.com/ctLeetPIQ0Bsol7YcR3GC0Qixw4p7xoKnaCivTnevYg86sTwezG9f5vYHAXHGd8Af-M8dVzryfOpC682knlYug_aVafWxnpUxUnpcxmuX1hctX_A1Djj4hNguJYB_ktbmR2SSpTwMW08jAQ)

{{s8.p2}}

{{s8.p3}}

{{s8.p4}}

![](http://icecream.me/uploads/1ecae9d3709876ce3b8cfee212dc4059.png)

__________________________________

{{s8.p5}}

{{s8.p6}}

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


### ![ico-20 webpack] {{s9.h1}}

{{s9.p1}}

![](https://lh6.googleusercontent.com/LrTASIeOuHlf0WgAZ6hjzzePQ9ib4NLHzddAUco_ufKMrdtR6yhZ1LAAyAymQPUcYaESRPWU7gOovrdR2zKf1XCt6FR3mkUBXUL2XomNqYIUw7bct0o6BTHQUpY3TT92S6KKA9O5heABRLQ)

{{s9.p2}}

{{s9.p3}}

{{s9.p4}}

{{s9.p5}}

~~~css
img { margin: 40px; border: dotted 2px yellow; }
~~~

{{s9.p6}}