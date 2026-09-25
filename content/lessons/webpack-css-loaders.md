# ![ico-70 node] module.exports & require()

{{p1}}

{{p2}}

## ![ico-25 icon] {{p3}}

{{p4}}

{{p5}}

_________________________________________

![ico-20 cap] **{{common.c0}} 1**

◘◘![ico-20 file] script.js◘◘

~~~js
module.exports = {
  hello: function () {
    console.log('Привет, будущие девелоперы!')
  },

  message: function (mess) { console.log(mess) }
}
~~~

{{p6}}
{{p7}}
{{p8}}

_____________________________________

## ![ico-25 icon] {{p9}}

{{p10}}

{{p11}}

{{p12}}

{{p13}}
{{p14}}
{{p15}}

◘◘![ico-20 file] start.js◘◘

~~~js
const lib = require('./script.js')

lib.hello()
lib.message('Вы еще не знакомы с Node.js ?')
~~~

{{p16}}

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

{{p17}}

••![ico-20 bash] npm run start••

{{p18}}

••![ico-20 bash] node start.js••

**{{common.c1}}**

•••• none
{{p73}}
{{p74}}

{{p75}}
{{p76}}
••••

_______________________________________________________________________________

{{p20}}
{{p21}}
{{p22}}

{{p23}}

_______________________________________________________________________________

# ![ico-30 webpack] webpack.config.js

{{p24}}

_______________________________________________

{{p25}}

{{p26}}

^^^[{{p27}}]

{{p28}}

{{p29}}

{{p30}}

~~~js
const path = require('path')
~~~

{{p31}}

{{p32}}

~~~js
path.resolve(__dirname, 'build')
~~~

^^^

_______________________

![ico-20 cap] **{{common.c0}} 1**


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

{{p33}}
{{p34}}
{{p35}}
{{p36}}
{{p37}}
{{p38}}
{{p39}}

{{p40}}


{{p41}}

| ^^**module.exports**^^ |
{{p42}}
{{p43}}
{{p44}}
{{p45}}
{{p46}}
{{p47}}


________________________________________________________________


### ![ico-20 webpack] {{p48}}

![ico-20 webpack] style-loader
![ico-20 webpack] css-loader

{{p49}}

{{p50}}

{{p51}}

{{p52}}

{{p53}}

{{p54}}

~~~js
['style-loader', 'css-loader']
~~~

____________________________________________________________________

[%%%**Regular Expressions**%%%](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

________________________________________________________________

## ![ico-25 webpack] {{common.c3}} 5

{{p55}}

{{p56}}

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

{{p57}}

◘◘![ico-20 file] script.js◘◘

~~~js
import css from '../css/main.css'
~~~

![](https://lh6.googleusercontent.com/E60i49827-g4mBJR28bIYMYU2D0NGi7FlnCkYNgkdNVSX4QYCmlAH4nLLJWltIqIns3ymwNfgvOKLJFeFC0ydtEkf6w3SDUgXzUZ5btCJXix4jJZqt4xbLrsRHTsVTDLB7NKtp4lUEktyBs)

__________________________________________________

**{{common.c21}}**

{{p58}}

{{p59}}

{{p60}}

![](https://lh6.googleusercontent.com/9iIWxB9HHuCzZ4ZFlhrUW_GrG3cCX-Y3560mRCPTICdKPAUGNmWgDpwKFuld9rV8dFnVgHIn7Yv0PophBSGy0AqRouju3FG2Jwc6M2ZVNiWRMvpS0sUX7h08HXTsFs_Pzvtjv73t1aqnex8)

{{p61}}

{{p62}}

_____________________

### ![ico-20 webpack] {{p63}}

••![ico-20 bash] npm install css-loader style-loader --save-dev••

![](https://lh5.googleusercontent.com/ctLeetPIQ0Bsol7YcR3GC0Qixw4p7xoKnaCivTnevYg86sTwezG9f5vYHAXHGd8Af-M8dVzryfOpC682knlYug_aVafWxnpUxUnpcxmuX1hctX_A1Djj4hNguJYB_ktbmR2SSpTwMW08jAQ)

{{p64}}

{{p65}}

**package.json**

![](http://icecream.me/uploads/1ecae9d3709876ce3b8cfee212dc4059.png)

__________________________________

{{p66}}

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


### ![ico-20 webpack] {{common.c21}}

{{p67}}

![](https://lh6.googleusercontent.com/LrTASIeOuHlf0WgAZ6hjzzePQ9ib4NLHzddAUco_ufKMrdtR6yhZ1LAAyAymQPUcYaESRPWU7gOovrdR2zKf1XCt6FR3mkUBXUL2XomNqYIUw7bct0o6BTHQUpY3TT92S6KKA9O5heABRLQ)

{{p68}}

{{p69}}

{{p70}}

{{p71}}

~~~css
img { margin: 40px; border: dotted 2px yellow; }
~~~

{{p72}}