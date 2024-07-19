# ![ico-70 webpack] Webpack

**Webpack **создает граф зависимостей приложения

Каждый модуль приложения может иметь зависимости - модули, необходимые для его нормальной работы

Модули ( ES6 ) - это файлы с расширением js, содержащие код

____________________________________________________________________

![ico-25 bash] **Установка**

Пакет  **webpack**  устанавливается с помощью **~npm~**

Команда

••![ico-20 bash] npm install -g webpack webpack-cli••

установит  ~webpack~ и  ~webpack-cli~  глобально 

^^Сокращение для команды ~install ( i )~^^

••![ico-20 bash] npm i webpack webpack-cli --save-dev••

установит  ~webpack~ и  ~webpack-cli~  в текущей папке

![ico-20 warn] webpack-cli раньше по умолчанию устанавливался как часть самого **Webpack**
Теперь вынесен в отдельный модуль, и его нужно устанавливать
Нужен, чтобы чтобы запускать сборку из командной строки или через менеджер пакетов

_________________________________________________________________________

![ico-25 webpack] **webpack.config.js**

Из коробки webpack не потребует от вас использования файла конфигурации

Однако при этом предполагается, что точкой входа вашего проекта является ~src/index.js~,
а результат будет выведен в ~dist/main.js~, минимизированный и оптимизированный для производства

Обычно проектам нужна расширенная функциональность

для этого нужно создать в корневой папке файл настроек ![ico-20 file] **~webpack.config.js~**, который будет по умолчанию использован webpack для конфигурирования сборки

![ico-20 webpack] **--config**

Если вы хотите использовать различные файлы конфигурации в зависимости от ситуации, это можно настроить с помощью флага ~--config~

в командной строке:

••![ico-20 bash] webpack --config prod.config.js••

◘◘![ico-20 memo] package.json◘◘

~~~js
"scripts": {
  "build": "webpack --config prod.config.js"
}
~~~

_____________________________________________________________

## ![ico-25 hw] Упражнение 1

( zero-config )

Работаем в созданной ранее папке  _test_  ^^( вы можете назвать свою папку иначе )^^

Создаем файлы и папки:

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

Cоздайте папку  **src**  и поместите туда файл ![ico-20 file] **~index.js~**

◘◘![ico-25 file] **index.js**◘◘

~~~js
const promise = new Promise(function (resolve, reject) {
  document.write('Wait, pease...<br>')
  setTimeout(() => resolve('OK, you are here ?'), 2000)
})

promise.then(response => document.write(response))
~~~

а теперь выполните в консоли команду:

••![ico-20 bash] webpack••

webpack был вызван нами без каких-либо параметров и опций

В консоли видно предупреждение, что опция  **~mode~** отсутствует,
поэтому использовано значение по умолчанию - **_~production~_**

![](createPath("illustrations","webpack-1.png"))

Обратите внимание, что в папке проекта появилась новая папка  ![ico-20 folder] **dist**,

а в этой папке - минифицированный файл  ![ico-20 file] **_main.js_**

![](https://lh6.googleusercontent.com/0pagIMHm51JuHbTPqLkRnHIEBD3WxdGhsLjsbb7h0faFhCO7cSVQc2gPhsLvisAFmqwymX0xhX2N4qYMH61DP8L7Aq-VesPwpso5WkBWpmT9WyDw9MU1QG1O7Glri7wN-sGxODtftnmxsOs)

Как видите, мы обошлись без файла конфигурации, поскольку  Webpack 4  позволяет это _при условии использования дефолтных имен файлов и папок_:

![ico-20 warn] Исходный файл должен находиться в папке ![ico-20 folder] **src** и называться ![ico-20 file] **_index.js_**

![ico-20 warn] Результат сборки будет помещен в папку ![ico-20 folder] **dist** под именем  ![ico-20 file] **_main.js_**

Теперь откройте файл  **_index.html_**  в браузере

___________________________________________________________________________


## ![ico-25 webpack] Опция --watch

webpack будет следить за изменениями в исходных файлах и оперативно пересобирать приложение при каждом обновлении

••![ico-20 bash] webpack --watch --mode production••

![](http://icecream.me/uploads/cef7b80e645edabc44cfd1d609bad0b4.png)

Внесем изменения в файл **_index.js_**
В консоли видно, что вебпак автоматически пересобрал приложение

![](http://icecream.me/uploads/4af9d3df11f420d5565f8ee17138ad81.png)

______________________________________________________________