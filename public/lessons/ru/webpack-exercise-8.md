# ![ico-70 webpack] Подключение шрифтов

________________________________

## ![ico-25 hw] Упражнение 8

### ![ico-20 icon] Google Fonts

Для начала импортируем некоторые шрифты [%%%Google%%%](fonts.google.com), используя внешний URL

Для этого в наш файл ![ico-20 file] **~main.css~** мы добавим строчку

~~~css
@import url("https://fonts.googleapis.com/css?family=Hanalei+Fill|Roboto");
~~~

Теперь можно использовать эти шрифты ( '_Hanalei Fill_', _Roboto_ ) в своих стилях
Установим шрифт  '_Hanalei Fill_'   для элемента  ~body~
и шрифт  _Roboto_  для  ~.sampleClass~

______________________________________________________

◘◘![ico-20 file] main.css◘◘

~~~css
@import url("https://fonts.googleapis.com/css?family=Hanalei+Fill|Roboto:100,300,400");

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
  font-family: 'Hanalei Fill', cursive;
}
.sampleClass {
  font-family: Roboto;
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

![ico-20 speach] Если вебпак находится в режиме отслеживания, перезагрузите станицу и вы увидите результат

________________________________________________

### ![ico-20 icon] Font Awesome

[%%%Font Awesome%%%](fontawesome.com)

Самый простой способ подключения иконок Font Awesome - импорт в ![ico-20 file] **~main.css~**:

~~~css
@import url("https://use.fontawesome.com/releases/v5.2.0/css/all.css");
~~~

После этого можно вставить ![ico-20 file] **~index.html~**, например, такую строчку:

~~~html
&lt;i class="fas fa-ambulance">&lt;/i>
~~~

Обновите страницу и вы увидите добавленную иконку
