# ![ico-30 study] Финальный проект

## ![ico-25 hw] Задание

### ![ico-20 sand-watch] Спринт 1

![ico-20 green-ok] Сверстать главную страницу по выбранному psd-макету
^^основной контент главной страницы должен быть веб-компонентом, который можно заменить другим веб-компонентом для имитации межстраничных переходов^^
![ico-20 green-ok] Сверстать панель навигации
![ico-20 green-ok] Сверстать веб-компоненты, отображаемые при переходах пользователя по "страницам" приложения
![ico-20 green-ok] Обеспечить отображение соответствующего компонента при выборе соответствующего пункта в панели навигации

### ![ico-20 sand-watch] Спринт 2

![ico-20 green-ok] Установить _json-server_
![ico-20 green-ok] Создать базу данных зарегистрированных пользователей
![ico-20 green-ok] Создать веб-компонент **register-user** регистрации пользователя
^^Форма регистрации должна содержать кнопку для загрузки аватара пользователя^^
^^• при загрузке изображения должен проверяться тип файла ( это должен быть только файл изображения ), а так же его размер^^
^^• в случае, если пользователь выбрал файл, не являющийся изображением, должно выводиться предупреждение^^
^^• в случае, если размер изображения превышает 300 Кбайт, должно выводиться предупреждение^^
^^• если тип файла и размер изображения отвечают требованиям, аватар загружается и отображается в форме регистрации^^

^^**При регистрации нового пользователя**^^
^^• аватар кодируется строкой Base64^^
^^• пароль хешируется^^
^^• данные сохраняются в базе данных^^
^^• данные для аутентификации пользователя сохраняются в куки^^

^^веб-компонент должен удаляться при клике на кнопке ✖ или кнопке "Зарегистрировать" ( стиль кнопок должен быть согласован с макетом страницы )^^
^^если в куки-файле уже есть данные пользователя, форма заполняется этими данными ( кроме пароля )^^

_________________________________________________________

### ![ico-20 sand-watch] Спринт 3

![ico-20 green-ok] Создать веб-компонент **user-sign-in** аутентификации зарегистрированного пользователя посредством ввода логина и пароля
![ico-20 green-ok] Вставить код, запускаемый сразу после загрузки главной страницы
^^• Код должен читать куки ( если они есть ), и проверять, что такой пользователь зарегистрирован в базе данных^^
^^• Если пользователь зарегистрирован, его аватар и никнейм добавляются на главную страницу^^
^^• Если пользователь не зарегистрирован ( куки отстутствуют или пользователь не обнаружен в базе данных ), то на главной странице должны отображаться кнопки "Регистрация" и "Вход"^^
^^• Обработчик события click кнопки "Регистрация" должен отображать веб-компонент **register-user**^^
^^• Обработчик события click кнопки "Вход" должен отображать веб-компонент **user-sign-in**^^

### ![ico-20 sand-watch] Спринт 4

Напилить код, логирующий действия пользователя
^^• лог должен сохраняться в localStorage^^
^^• в логе должна быть как минимум информация о последней посещенной пользователем "странице"^^
^^• после аутентификации пользователя должен происходить переход на последнюю посещенную им страницу^^

### ![ico-20 sand-watch] Спринт 5

( дополнительно для тех, кто круто успевает )

![ico-20 green-ok] Создать базу данных товаров / услуг / маршрутов ( путешествий ) / картинок (портфолио, галерея ) / рецептов / дел ( todo-list )...
![ico-20 green-ok] Создать веб-компонент, отображающий контент этой базы данных
![ico-20 green-ok] Создать веб-компонент **admin-panel**
^^В админке можно добавлять / удалять / редактировать контент базы данных ( список товаров / услуг / картинок...^^

_____________________________________________________________________

### ![art] Варианты psd-макетов

@@@@
    [![maket-01]](http://psd-html-css.ru/sites/default/files/public/old/rar_files/Olios_Template.zip)
    [![maket-02]](http://psd-html-css.ru/sites/default/files/public/upload/template-files/piroll.zip)
    [![maket-03]](http://psd-html-css.ru/sites/default/files/public/old/rar_files/StockPhotosWebsite.rar)
    [![maket-04]](http://psd-html-css.ru/sites/default/files/public/old/rar_files/Gallaria-FreeBlogTemplateDesign.rar)
    [![maket-05]](http://psd-html-css.ru/sites/default/files/public/old/rar_files/ProfessionalWebsiteTemplateleo.rar)
    [![maket-06]](http://psd-html-css.ru/sites/default/files/public/old/rar_files/FreeOnlineShopWebsiteTemplatePSD.zip)
    [![maket-07]](http://psd-html-css.ru/sites/default/files/public/old/rar_files/Portal_UI.psd.zip)
    [![maket-08]](http://psd-html-css.ru/sites/default/files/public/old/rar_files/BeautifulTravelandHotel.rar)
    [![maket-09]](http://psd-html-css.ru/sites/default/files/public/old/rar_files/Marcy-free-peronal-blog-psd-template.zip)
    [![maket-10]](http://psd-html-css.ru/sites/default/files/public/old/rar_files/freelancer232.zip)
    [![maket-11]](http://psd-html-css.ru/sites/default/files/public/old/rar_files/THEYALOW.rar)
    [![maket-12]](http://psd-html-css.ru/sites/default/files/public/old/rar_files/BWTemplate.zip)
    [![maket-13]](http://psd-html-css.ru/sites/default/files/public/old/rar_files/SinglePageWebsite.rar)
    [![maket-14]](http://psd-html-css.ru/sites/default/files/public/upload/template-files/alexis.zip)
    [![maket-15]](http://psd-html-css.ru/sites/default/files/public/old/rar_files/Boostfolia.zip)
    [![maket-16]](http://psd-html-css.ru/sites/default/files/public/old/rar_files/PinballResponsiveGridStyleBlogPSD.rar)
@@@@
