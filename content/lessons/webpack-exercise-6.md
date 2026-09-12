# ![ico-70 webpack] {{s1.h1}}

{{s1.p1}}
{{s1.p2}}

## ![ico-20 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}

{{s2.p4}}

{{s2.p5}}

{{s2.p6}}

{{s2.p7}}

{{s2.p8}}

{{s2.p9}}

{{s2.p10}}

__________________________________________

## ![ico-25 hw] {{s3.h1}}


{{s3.p1}}

![](https://lh5.googleusercontent.com/dqODscqbar15EGD-mAhay0YwoS0VzKDKpmUKb3_oYfzyLD-I2JbMNGM_6gBhpWsrr5H9_hLWhIDpwsN_w1UMvE38-ccafSB_FiUrrZ_17b-BiM7cItjm2Ku1WFEix9oWFIXUQ8aiI7mmTDM)

{{s3.p2}}
{{s3.p3}}

{{s3.p4}}
{{s3.p5}}

{{s3.p6}}

~~~js
import promise from './promise.js'
import css from '../css/main.css'

promise.then(response => document.querySelector('.sampleClass').innerText += response)

;['git-bush','git'].forEach(item => document.body.appendChild(document.createElement('span')).className = item)
~~~


{{s3.p7}}

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

### ![ico-20 npm] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

{{s4.p3}}

{{s4.p4}}

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

{{s4.p5}}

{{s4.p6}}
{{s4.p7}}
{{s4.p8}}
{{s4.p9}}

![](https://lh6.googleusercontent.com/FLcLBZEePLxKPVswXVtkXHofTK2I1wShlFTaWFenTxPXaZRzf1yPSyX8S8mF_sonwERGkos305ZJssSk6Yz04nwPhwK8BVz2jg87eOicg479pjgNiVesfU2x4UH8mOaWJshcN-pZLewfgLI)

_________________________________

{{s4.p10}}

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

{{s4.p11}}

{{s4.p12}}

{{s4.p13}}

{{s4.p14}}

{{s4.p15}}

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

{{s4.p16}}

{{s4.p17}}

![](https://lh6.googleusercontent.com/H1x8wj8f_gxr6uvn__fH1R2XII_xG7VXN7XzEaqeSAsTUxTpaUkcN2OeA4CuXJfBrl7GC0Z1JDBAfSJNfzVA5FMGXbqGKRvDOslSsBXMxE7tTXIOyd3zh0wFCOhFzLzUgV6hmNwQbqnE5Gc)

{{s4.p18}}

_______________________________________________________________

{{s4.p19}}
{{s4.p20}}
{{s4.p21}}