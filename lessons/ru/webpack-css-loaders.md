# ![ico-70 node] module.exports & require()

В  **Node.js** собственная система модулей

Все скрипты в **Node.js** должны быть **модулями**

## ![ico-25 icon] Создание модулей

Чтобы сделать скрипт модулем, его, как мы уже знаем, нужно **экспортировать**

Для этого в **Node.js** есть объект **~module~**, у которого есть метод ![ico-20 require] **_~exports~_**

_________________________________________

![ico-20 cap] **Пример 1**

◘◘![ico-20 file] script.js◘◘

~~~js
module.exports = {
  hello: function () {
    console.log('Привет, будущие девелоперы!')
  },

  message: function (mess) { console.log(mess) }
}
~~~

^^В этом примере мы экспортировали две функции: **hello** и **message**^^
^^Они находятся в модуле **script.js**^^
^^Теперь мы можем использовать эти функции, если подключим модуль **script.js**^^

_____________________________________

## ![ico-25 icon] Подключение модулей

Модули можно подключать по мере необходимости

Для подключения модуля используется функция **~require()~**

^^То есть в результате вызова **~require( "script.js" )~** мы будем получать объект **~module.exports~** из файла ~script.js~^^

^^Создадим файл **start.js**^^
^^В файле **start.js** подключим модуль **script.js** как **~lib~**^^
^^и вызовем функции ~hello~ и ~message~:^^

◘◘![ico-20 file] start.js◘◘

~~~js
const lib = require('./script.js')

lib.hello()
lib.message('Вы еще не знакомы с Node.js ?')
~~~

^^Добавим в файл ~package.json~ алиас **start** для запуска серверного скрипта ~start.js~:^^

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

^^Запустим теперь команду:^^

••![ico-20 bash] npm run start••

^^Можно и сразу в консоли набрать команду:^^

••![ico-20 bash] node start.js••

**Результат:**

••npm-test@1.0.0 start Z:\home\npm-test<br>node start.js<br><br>Привет, будущие девелоперы!<br>Вы еще не знакомы с Node.js ?••

_______________________________________________________________________________

^^Если в  файле ![ico-20 file] ~sourse.js~ определено свойство **~module.exports~**, ^^
^^в любом другом файле  (например, ![ico-20 file] ~sample.js~) ^^
^^можно вызвать функцию  **_~require~_** и передать ей в качестве аргумента имя файла ("sourse.js")^^

^^Результатом работы функции  **_~require~_** будет объект, ссылку на который мы поместили в **~module.exports~** в файле ![ico-20 file] ~sample.js~^^

_______________________________________________________________________________

# ![ico-30 webpack] webpack.config.js

Скрипт с инструкциями и настройками для процесса сборки приложения

_______________________________________________

Создадим файл  **~webpack.config.js~**  в корневой папке нашего приложения

Это скрипт, который создаст объект **_~module~_** конфигурации ~webpack~

^^^[Модуль path]

Для разрешения конфликтов маршрутов (путей) к файлам 

первым делом в файле кофигурации webpack (~webpack.config.js~) 

подключаем встроенный Node.js модуль ~path~:

~~~js
const path = require('path')
~~~

Теперь можно использовать глобальную переменную  **~__dirname~** для получения абсолютного пути к файлу с помощью метода  **~path.resolve~**

Например, путь к папке  **~build~**, находящейся в корневой папке приложения:

~~~js
path.resolve(__dirname, 'build')
~~~

^^^

_______________________

![ico-20 cap] **Пример 1**


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

По умолчанию модулем для webpack является js-файл
Для включения в сборку файлов другого формата нужны специальные загрузчики
Функция загрузчиков заключается в том, чтобы превратить файл "инородного" происхождения в обычный ES-модуль
Когда webpack обнаруживает инструкцию импорта файла с расширением, отличным от js, 
он ищет в файле конфигурации ![ico-20 file] webpack.config.js
соответствующие правила ( rules ), 
в которых описано, какой загрузчик нужно вызвать для файлов с таким расширением

Если такого правила нет, то сборка завершится неудачей


**Основные свойства объекта конфигурации Webpack**

| ^^**module.exports**^^ |
|                | ^^**entry**^^   |               |              | ^^точка входа^^                     |
|                | ^^**output**^^  |               |              | ^^файл сборки^^                     |
|                | ^^**module**^^  |               |              | ^^описание&nbsp;модулей^^           |
|                |                 | ^^**rules**^^ |              | ^^правила^^                         |
|                |                 |               | ^^**test**^^ | ^^тип файла модулей (/\.css$/)^^    |
|                |                 |               | ^^**use**^^  | ^^загрузчик для файлов этого типа^^ |


________________________________________________________________


### ![ico-20 webpack] Подключение css-модулей

![ico-20 webpack] style-loader
![ico-20 webpack] css-loader

Для подключения css-файла нужно указать  в файле ![ico-20 file] ~webpack.config.js~

(в объекте конфигурации, в свойстве **~module~**)

правило, по которому будут обрабатываться файлы с расширением  **~css~**

Для этого в свойстве  **~module.rules~** мы определим значение свойства **_~test~_**

с помощью регулярного выражения:  **~/\.css$/~** ^^(любые файлы с расширением css)^^

а свойство **~module.rules.use~** сделаем массивом, в котором передадим ссылки на загрузчиков:

~~~js
['style-loader', 'css-loader']
~~~

____________________________________________________________________

[%%%**Regular Expressions**%%%](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Regular_Expressions)

________________________________________________________________

## ![ico-25 webpack] Упражнение 5

Создадим в папке нашего проекта папку ![ico-20 folder] css

Поместим в нее файл ![ico-20 file] main.css

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

Добавим в файл ![ico-20 file] ~script.js~  импорт созданного нами файла стилей:

◘◘![ico-20 file] script.js◘◘

~~~js
import css from '../css/main.css'
~~~

![](https://lh6.googleusercontent.com/E60i49827-g4mBJR28bIYMYU2D0NGi7FlnCkYNgkdNVSX4QYCmlAH4nLLJWltIqIns3ymwNfgvOKLJFeFC0ydtEkf6w3SDUgXzUZ5btCJXix4jJZqt4xbLrsRHTsVTDLB7NKtp4lUEktyBs)

__________________________________________________

**Сборка**

А теперь запустим сборку проекта

![ico-20 error] Вебпак выдаст нам ошибку: 

он умеет собирать модули js, а вот для загрузки файлов других форматов нужны специальные загрузчики

![](https://lh6.googleusercontent.com/9iIWxB9HHuCzZ4ZFlhrUW_GrG3cCX-Y3560mRCPTICdKPAUGNmWgDpwKFuld9rV8dFnVgHIn7Yv0PophBSGy0AqRouju3FG2Jwc6M2ZVNiWRMvpS0sUX7h08HXTsFs_Pzvtjv73t1aqnex8)

Очевидно, что нужно подключить загрузчики файлов стилей

Однако загрузчики - это пакеты, которые нужно предварительно установить с помощью пакетного менеджера npm

_____________________

### ![ico-20 webpack] Установка загрузчиков

••![ico-20 bash] npm install css-loader style-loader --save-dev••

![](https://lh5.googleusercontent.com/ctLeetPIQ0Bsol7YcR3GC0Qixw4p7xoKnaCivTnevYg86sTwezG9f5vYHAXHGd8Af-M8dVzryfOpC682knlYug_aVafWxnpUxUnpcxmuX1hctX_A1Djj4hNguJYB_ktbmR2SSpTwMW08jAQ)

После установки загрузчиков они окажутся в папке ![ico-20 folder] **~node_modules~** проекта

![ico-20 warn] Обратите внимание, что в файле **~package.json~** появилось свойство **_~devDependencies~_**, в котором перечислены установленные нами загрузчики с указанием версии пакета

**package.json**

![](http://icecream.me/uploads/1ecae9d3709876ce3b8cfee212dc4059.png)

__________________________________

Теперь нужно прописать правила, когда вызывать загрузчики

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


### ![ico-20 webpack] Сборка

Теперь можно запускать сборку проекта

![](https://lh6.googleusercontent.com/LrTASIeOuHlf0WgAZ6hjzzePQ9ib4NLHzddAUco_ufKMrdtR6yhZ1LAAyAymQPUcYaESRPWU7gOovrdR2zKf1XCt6FR3mkUBXUL2XomNqYIUw7bct0o6BTHQUpY3TT92S6KKA9O5heABRLQ)

![ico-20 sandwatch] Вебпак находится в режиме отслеживания наших файлов

Теперь перезагрузите страницу, в которой открыт файл **~index.html~**, и вы увидите, что созданный нами файл стилей подключен

Мы можем внести изменения в любой из наших файлов, и эти изменения будут автоматически отображены в файле сборки

Давайте, например, добавим в файл **~main.css~**:

~~~css
img { margin: 40px; border: dotted 2px yellow; }
~~~

перезагрузите страницу, и вы увидите изменения 