# ![ico-70 webpack] {{s1.h1}}

![ico-20 green-ok] file-loader
![ico-20 green-ok]  url-loader

## ![ico-20 icon] url-loader

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

{{s1.p5}}

{{s1.p6}}

{{s1.p7}}

{{s1.p8}}

{{s1.p9}}

{{s1.p10}}

__________________________________________

## ![ico-25 hw] {{common.c3}} 6


{{s2.p1}}

![](https://lh5.googleusercontent.com/dqODscqbar15EGD-mAhay0YwoS0VzKDKpmUKb3_oYfzyLD-I2JbMNGM_6gBhpWsrr5H9_hLWhIDpwsN_w1UMvE38-ccafSB_FiUrrZ_17b-BiM7cItjm2Ku1WFEix9oWFIXUQ8aiI7mmTDM)

{{s2.p2}}
{{s2.p3}}

{{s2.p4}}
{{s2.p5}}

◘◘![ico-20 file] script.js◘◘

~~~js
import promise from './promise.js'
import css from '../css/main.css'

promise.then(response => document.querySelector('.sampleClass').innerText += response)

;['git-bush','git'].forEach(item => document.body.appendChild(document.createElement('span')).className = item)
~~~


◘◘![ico-20 file] main.css◘◘

~~~css
body {
    position: fixed;
    top: 0;
    left:0;
    bottom:0;
    right:0;
    background-image: url(../images/columns.gif);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
    font-family: monospace, Arial;
    font-size: 16px;
    color: #abc;
}
.sampleClass {
    font-size: 25px;
    font-weight: bold;
}
.git-bush, .git {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
}

.git-bush {
    background-image: url(../images/git-bush.png);
}
.git {
    background-image: url(../images/git.png);
}
~~~

_________________________________

### ![ico-20 npm] file-loader

{{s2.p6}}

••![ico-20 bash] npm install --save-dev file-loader••

{{s2.p7}}

◘◘![ico-20 webpack] webpack.config.js◘◘

~~~js
const path = require ( 'path' )

module.exports = {
  entry: { main: './js/script.js' },
  output: {
    path: path.resolve ( __dirname, 'build' ),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(png&#124;svg&#124;jp?g&#124;gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ]
  }
}
~~~

___________________________________

![ico-20 webpack] **{{common.c31}}**

{{s2.p9}}
{{s2.p10}}
{{s2.p11}}
{{s2.p12}}

![](https://lh6.googleusercontent.com/FLcLBZEePLxKPVswXVtkXHofTK2I1wShlFTaWFenTxPXaZRzf1yPSyX8S8mF_sonwERGkos305ZJssSk6Yz04nwPhwK8BVz2jg87eOicg479pjgNiVesfU2x4UH8mOaWJshcN-pZLewfgLI)

_________________________________

{{s2.p13}}

~~~js
{
  test: /\.(jpg|png)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 25000
    }
  }
}
~~~

{{s2.p14}}

{{s2.p15}}

{{s2.p16}}

{{s2.p17}}

◘◘![ico-25 cap] webpack.config.js◘◘

~~~js
const path = require ( 'path' )

module.exports = {
  entry: { main: './js/script.js' },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(png&#124;svg&#124;jp?g&#124;gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
            name: 'images/[name].[ext]'
          },
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
~~~

{{s2.p18}}

{{s2.p19}}

![](https://lh6.googleusercontent.com/H1x8wj8f_gxr6uvn__fH1R2XII_xG7VXN7XzEaqeSAsTUxTpaUkcN2OeA4CuXJfBrl7GC0Z1JDBAfSJNfzVA5FMGXbqGKRvDOslSsBXMxE7tTXIOyd3zh0wFCOhFzLzUgV6hmNwQbqnE5Gc)

{{s2.p20}}

_______________________________________________________________

[%%%file-loader%%%](https://www.npmjs.com/package/file-loader)
[%%%url-loader%%%](http://docs.w3cub.com/webpack/loaders/url-loader/)
[%%%loaders%%%](https://webpack.js.org/loaders/)