## ![ico-25 webpack] Опция --mode

Для того, чтобы настроить различные режимы запуска ~webpack~, нужно использовать опцию **~--mode~**

После опции **~--mode~** должно следовать одно из двух возможных значений:

![ico-20 pin] development
![ico-20 pin] production

Пока идет процесс отладки приложения, лучше использовать режим сборки **~development~**, поскольку в консоли можно отслеживать предупреждения о возможных ошибках

В **~production~** сборке такие предупреждения не будут  выводиться

••![ico-20 bash] webpack --mode development••

![](https://lh3.googleusercontent.com/9Kw0fdiVv9zrVzwLuN9mgI_kTysz4yCDr_pz4DixW9p4EHJnAtuiYC2zjZ_Zua4hZNB9J_7mwNOsVS8BnCpsJs7MmSkxSALp431a-mnwUIog458xNgcAxmUALDz9ddZsAEqqIWRyt9V37Vg)

^^На следующем скрине показаны сообщения о дублировании значений ключей в базе данных, которые позволяют разработчику внести соответствующие изменения перед окончательной сборкой, чтобы избежать проблем в дальнейшем^^

![](https://lh4.googleusercontent.com/jWl0b6D9RUO5Xmi51lrJE0l63pAHk-RYJFK9b5WFh0WRoKePjL5OlkWd40yzRnGzIORy7kN0wkJRiM_kxykFfRJE7yU1soHiOBvAhsTcfYdaETJfamHOacUtPMR5raxqMtMGOtPIRFqqkb0)

При этом результирующий бандл **main.js** не минимизирован, что облегчает отладку приложения ( переход к строке с ошибкой )

![](https://lh4.googleusercontent.com/ug6vfxniKfZP8CHRCCH6J3MrjMmmkInYejG-8ApUMOPQlHlKLpnEubIstwhRX0gLBx1HD797H-PjkRQMhkgcrVaiGFwOVHDFCWlywS8xoB5t1YLYReZZF7qkW4DrqRHuqKHpURWkrZsDQ4k)

••![ico-20 bash] webpack --mode production••

**Окончательная сборка**

Результирующий бандл будет минимизирован, сообщения об ошибках не будут выводиться в консоль

________________________________________________________________________________________________

## ![ico-30 hw] Упражнение 3

Откройте файл  **_package.json_**  и добавьте в свойство **~scripts~** в настройки запуска ~webpack~ :

◘◘![ico-20 file] package.json◘◘

~~~js
"scripts": {
  "dev": "webpack --mode development",
  "prod": "webpack --mode production"
}
~~~

![](http://icecream.me/uploads/d2f7543e47891188282c5f21075ea5bd.png)


Теперь запустите команду :

••![ico-20 bash] npm run dev••

![](https://lh3.googleusercontent.com/9Kw0fdiVv9zrVzwLuN9mgI_kTysz4yCDr_pz4DixW9p4EHJnAtuiYC2zjZ_Zua4hZNB9J_7mwNOsVS8BnCpsJs7MmSkxSALp431a-mnwUIog458xNgcAxmUALDz9ddZsAEqqIWRyt9V37Vg)

••![ico-20 bash] npm run prod••

Теперь соберите свое приложение для  production

Обратите внимание, насколько сократился размер результирующего файла  main.js 

![](https://lh3.googleusercontent.com/y8ZDRi431GzQ2QJjKd5u8rm9NehAdfgq48K6jtahgt1NPWZ6YY_pp_Ut_HBcJ5alQ0Zp6kHNCBqnxTM9iq2cUncPrNVvKwA9i5NsBce78yhOfFWmOxrF9KmBeahFEbSum1Q2g-B07GLC3qo)
