# ![ico-70 webpack] Загрузчики файлов

![ico-20 green-ok] file-loader
![ico-20 green-ok]  url-loader

## ![ico-20 icon] url-loader

webpack резолвит любые выражения ~url()~, которые встретит в css-файлах, а также ссылки на изображения из скрипта

webpack может встраивать ресурсы с помощью загрузчика **~url-loader~**

**~url-loader~** преобразует изображение в код ~base64 URI~

и встраивает в код JavaScript

Это позволяет сократить количество запросов к серверу, однако приводит к увеличению размеров результирующего файла сборки

**~url-loader~** имеет опцию ~limit~, которая позволяет управлять процессом встраивания файлов изображений в зависимости от их размеров

Свойство ~limit~ загрузчика **~url-loader~** - это максимально допустимый для встраивания размер файла ( в байтах )

Таким образом, небольшие по размеру файлы изображений можно встроить в файл сборки, а для больших создавать копии

![ico-20 warn] При использовании опции ~limit~ необходимо установить как **~url-loader~**, так и **~file-loader~**

В случае использования опции ~limit~ загрузчик **~url-loader~** передает возможные дополнительные параметры для **~file-loader~**

__________________________________________

## ![ico-25 hw] Упражнение 6


Создадим папку ![ico-20 folder] images в корневой папке нашего проекта и поместим туда несколько файлов изображений:

![](https://lh5.googleusercontent.com/dqODscqbar15EGD-mAhay0YwoS0VzKDKpmUKb3_oYfzyLD-I2JbMNGM_6gBhpWsrr5H9_hLWhIDpwsN_w1UMvE38-ccafSB_FiUrrZ_17b-BiM7cItjm2Ku1WFEix9oWFIXUQ8aiI7mmTDM)

Добавим  в файл ![ico-20 file] **~script.js~** код, который будет добавлять на страницу два элемента ~span~
с классами  **_git-bush_** и **_git_**

Далее внесем соответствующие изменения в файл ![ico-20 file] **~main.css~**  ( ![ico-20 folder] ~css~ )
^^( добавим соответствующие классы )^^

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

Установим загрузчик **file-loader**

••![ico-20 bash] npm install --save-dev file-loader••

и внесем необходимые изменения в файл конфигурации

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

![ico-20 webpack] **Сборка**

Обратите внимание, что после сборки приложения
все файлы изображений, ссылки на которые были в файле ![ico-20 file] **_~main.css~_**,
оказались в папке ![ico-20 folder] **~images~**,
которая была создана в папке ![ico-20 folder] **~build~**

![](https://lh6.googleusercontent.com/FLcLBZEePLxKPVswXVtkXHofTK2I1wShlFTaWFenTxPXaZRzf1yPSyX8S8mF_sonwERGkos305ZJssSk6Yz04nwPhwK8BVz2jg87eOicg479pjgNiVesfU2x4UH8mOaWJshcN-pZLewfgLI)

_________________________________

![ico-25 cap] встраивание файлов ~.jpg~ и ~.png~ размером менее 25 КБ

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

![ico-20 warn] При передаче параметров загрузчику его не добавляют в свойство ~use~ в виде строки

потому что теперь это будет объект с двумя свойствами: имя загрузчика и параметры

Если файл изображения большой, вместо **~url-loader~** будет использоваться **~file-loader~**, который просто создаст копию файла

Итак, установим **~url-loader~** в папке проекта и внесем изменения в файл конфигурации webpack:

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

Прежде, чем запускать сборку, очистим папку ~build/images~, чтобы убедиться, что теперь в нее попадут только большие файлы, а маленькие будут встроены в файл сборки

После сборки посмотрим в консоли, как подключены маленькие файлы изображений:

![](https://lh6.googleusercontent.com/H1x8wj8f_gxr6uvn__fH1R2XII_xG7VXN7XzEaqeSAsTUxTpaUkcN2OeA4CuXJfBrl7GC0Z1JDBAfSJNfzVA5FMGXbqGKRvDOslSsBXMxE7tTXIOyd3zh0wFCOhFzLzUgV6hmNwQbqnE5Gc)

Файлы были конвертированы в строку base64 и встроены в сборку

_______________________________________________________________

[%%%file-loader%%%](https://www.npmjs.com/package/file-loader)
[%%%url-loader%%%](http://docs.w3cub.com/webpack/loaders/url-loader/)
[%%%loaders%%%](https://webpack.js.org/loaders/)