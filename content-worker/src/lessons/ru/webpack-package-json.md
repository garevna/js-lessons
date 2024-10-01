## ![ico-25 webpack] Упражнение 4

### ![ico-20 webpack] Настройки  webpack

Переименуем  папку ![ico-20 folder] ~src~

Пусть теперь она называется  ![ico-20 folder] **js**

Переименуем также файл ![ico-20 file] ~index.js~

Пусть теперь он называется ![ico-20 file] **script.js**

Теперь изменим настройки запуска webpack в файле  ~package.json~:

◘◘![ico-20 file] package.json◘◘

~~~js
"scripts": {
  "dev": "webpack --mode development ./js/script.js --output ./build/index.js --watch",
  "build": "webpack --mode production ./js/script.js --output ./build/index.js --watch"
}
~~~

![](https://lh4.googleusercontent.com/t3HMzsLvURk-jymxhIhITlzHUVfrkuS1UagnldLwLccys2iZH8rBOFWdLf16gh1UqinQ8gjibPgIlqkp5PvYtAaC0hBwA32nscUHScKfZGFdgiWJHwMOyP7NU70qhWGZF87lOjmc7TfY4L8)

Не забудьте внести соответствующие изменения в файл ![ico-20 file] **_index.html_**

Результирующий бандл будет теперь в папке ![ico-20 folder] **build**
и называться он будет ![ico-20 file] index.js

Изменим значение атрибута _src_ тега  ~script~ соответствующим образом:

![](https://lh4.googleusercontent.com/mzuMRK4yXEhLJ1AW0sBaSswsz35bNA9srOzeQQx0EjWI2xUK7zzeADS9SdFh7g2heeuuBAQLMQYNI4xvVuiVOak-GOMQ88SpmSYE4ERCcYvRtFxg8prqo1pOyl5vy-mDY__8weNvaQ-wXhw)

______________________________________________________________________

### ![ico-20 webpack] Сборка

Теперь запускайте сборку приложения одной из команд:

••![ico-20 bash] npm run dev••

или

••![ico-20 bash] npm run build••

(мы заменили _prod_ на **_build_** в  ~package.json~)

и открывайте ~index.html~  в браузере
_______________________________________________________________________

••![ico-20 bash] npm run dev --watch••

^^Сейчас   webpack   находится в режиме наблюдения за нашими исходными файлами,^^
^^потому что мы использовали опцию **~--watch~**^^

Давайте внесем изменения в файл ![ico-20 file] **_script.js_**

◘◘![ico-20 file] script.js◘◘

~~~js
import promise from './promise.js'

promise.then(response => document.querySelector('.sampleClass').innerText += response)

document.body
  .appendChild(document.createElement('img')
  .src = 'https://sites.google.com/site/eternalfallout/alienhead-detailed.jpg'
~~~

Перезагрузите страницу в браузере, и вы увидите, 
что  webpack автоматически собрал заново наше приложение, 
и внесенные нами изменения уже отображаются на странице ![ico-20 wink]

Теперь можно удалить папку ![ico-20 folder] **_dist_**