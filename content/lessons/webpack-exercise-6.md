# ![ico-70 webpack] {{p1}}

![ico-20 green-ok] file-loader
![ico-20 green-ok]  url-loader

## ![ico-20 icon] url-loader

{{p2}}

{{p3}}

{{p4}}

{{p5}}

{{p6}}

{{p7}}

{{p8}}

{{p9}}

{{p10}}

{{p11}}

__________________________________________

## ![ico-25 hw] {{common.c3}} 6


{{p12}}

![](https://lh5.googleusercontent.com/dqODscqbar15EGD-mAhay0YwoS0VzKDKpmUKb3_oYfzyLD-I2JbMNGM_6gBhpWsrr5H9_hLWhIDpwsN_w1UMvE38-ccafSB_FiUrrZ_17b-BiM7cItjm2Ku1WFEix9oWFIXUQ8aiI7mmTDM)

{{p13}}
{{p14}}

{{p15}}
{{p16}}

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

{{p17}}

••![ico-20 bash] npm install --save-dev file-loader••

{{p18}}

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

![ico-20 webpack] **{{common.c21}}**

{{p19}}
{{p20}}
{{p21}}
{{p22}}

![](https://lh6.googleusercontent.com/FLcLBZEePLxKPVswXVtkXHofTK2I1wShlFTaWFenTxPXaZRzf1yPSyX8S8mF_sonwERGkos305ZJssSk6Yz04nwPhwK8BVz2jg87eOicg479pjgNiVesfU2x4UH8mOaWJshcN-pZLewfgLI)

_________________________________

{{p23}}

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

{{p24}}

{{p25}}

{{p26}}

{{p27}}

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

{{p28}}

{{p29}}

![](https://lh6.googleusercontent.com/H1x8wj8f_gxr6uvn__fH1R2XII_xG7VXN7XzEaqeSAsTUxTpaUkcN2OeA4CuXJfBrl7GC0Z1JDBAfSJNfzVA5FMGXbqGKRvDOslSsBXMxE7tTXIOyd3zh0wFCOhFzLzUgV6hmNwQbqnE5Gc)

{{p30}}

_______________________________________________________________

[%%%file-loader%%%](https://www.npmjs.com/package/file-loader)
[%%%url-loader%%%](http://docs.w3cub.com/webpack/loaders/url-loader/)
[%%%loaders%%%](https://webpack.js.org/loaders/)