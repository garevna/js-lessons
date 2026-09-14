# ![ico-70 webpack] Webpack

**Webpack** створює граф залежностей додатка

Кожен модуль додатка може мати залежності — модулі, необхідні для його нормальної роботи

Модулі (ES6) — це файли з розширенням .js, що містять код

____________________________________________________________________

![ico-25 bash] **Встановлення**

Пакет **webpack** встановлюється за допомогою **~npm~**

Команда

••![ico-20 bash] npm install -g webpack webpack-cli••

встановить ~webpack~ та ~webpack-cli~ глобально

^^Скорочення для команди ~install ( i )~^^

••![ico-20 bash] npm i webpack webpack-cli --save-dev••

встановить  ~webpack~ та  ~webpack-cli~  у поточній папці

![ico-20 warn] webpack-cli раніше за замовчуванням встановлювався як частина самого **Webpack**
Тепер він винесений в окремий модуль, і його потрібно встановлювати
Потрібен для запуску збірки з командного рядка або через менеджер пакетів

_________________________________________________________________________

![ico-25 webpack] **webpack.config.js**

У стандартній конфігурації webpack не вимагатиме від вас використання файлу конфігурації

Однак при цьому передбачається, що точкою входу вашого проєкту є ~src/index.js~,
а результат буде виведений у ~dist/main.js~, мінімізований та оптимізований для виробництва

Зазвичай проєктам потрібна розширена функціональність

для цього потрібно створити в кореневій папці файл налаштувань ! [ico-20 file] **~webpack.config.js~**, який webpack використовуватиме за замовчуванням для конфігурації збірки

![ico-20 webpack] **--config**

Якщо ви хочете використовувати різні файли конфігурації залежно від ситуації, це можна налаштувати за допомогою прапора ~--config~

у командному рядку:

••![ico-20 bash] webpack --config prod.config.js••

◘◘![ico-20 memo] package.json◘◘

~~~js
"scripts": {
  "build": "webpack --config prod.config.js"
}
~~~

_____________________________________________________________

## ![ico-25 hw] Вправа 1

( zero-config )

Працюємо у створеній раніше папці  _test_  ^^(ви можете назвати свою папку інакше)^^

Створюємо файли та папки:

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

Створіть папку  **src**  і помістіть туди файл ![ico-20 file] **~index.js~**

◘◘![ico-25 file] **index.js**◘◘

~~~js
const promise = new Promise(function (resolve, reject) {
  document.write('Wait, pease...<br>')
  setTimeout(() => resolve('OK, you are here ?'), 2000)
})

promise.then(response => document.write(response))
~~~

а тепер виконайте в консолі команду:

••![ico-20 bash] webpack••

Ми запустили webpack без жодних параметрів та опцій

У консолі видно попередження, що опція  **~mode~** відсутня,
тому використано значення за замовчуванням — **_~production~_**

![](createPath("illustrations","webpack-1.png"))

Зверніть увагу, що в папці проєкту з’явилася нова папка  ![ico-20 folder] **dist**,

а в цій папці — мініфікований файл  ![ico-20 file] **_main.js_**

![](https://lh6.googleusercontent.com/0pagIMHm51JuHbTPqLkRnHIEBD3WxdGhsLjsbb7h0faFhCO7cSVQc2gPhsLvisAFmqwymX0xhX2N4qYMH61DP8L7Aq-VesPwpso5WkBWpmT9WyDw9MU1QG1O7Glri7wN-sGxODtftnmxsOs)

Як бачите, ми обійшлися без файлу конфігурації, оскільки  Webpack 4  дозволяє це _за умови використання імен файлів і папок за замовчуванням_:

![ico-20 warn] Вихідний файл має знаходитися в папці ![ico-20 folder] **src** і називатися ![ico-20 file] **_index.js_**

![ico-20 warn] Результат збірки буде розміщено в папці ![ico-20 folder] **dist** під назвою  ![ico-20 file] **_main.js_**

Тепер відкрийте файл  **_index.html_**  у браузері

___________________________________________________________________________


## ![ico-25 webpack] Опція --watch

webpack стежитиме за змінами у вихідних файлах і оперативно перекомпілюватиме додаток при кожному оновленні

••![ico-20 bash] webpack --watch --mode production••

![](http://icecream.me/uploads/cef7b80e645edabc44cfd1d609bad0b4.png)

Внесемо зміни до файлу **_index.js_**
У консолі видно, що webpack автоматично перекомпілював додаток

![](http://icecream.me/uploads/4af9d3df11f420d5565f8ee17138ad81.png)

______________________________________________________________