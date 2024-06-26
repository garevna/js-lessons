# ![ico-50 git-ver] Git

@@@@

**Распределенная система контроля версий**
![](illustrations/Linus-Torvalds.jpg)
(2005)
^^**Linus Torvalds** - разработчик git^^

@@@@

_______________________________________________________________________________

В процессе работы над проектом вы будете вносить изменения в файлы проекта,
и после их сохранения у вас будет последняя версия файлов.
Однако часто бывает нужно "откатить" последние правки, отменить внесенные изменения.
Кроме того, часто в процессе разработки возникает необходимость иметь несколько версий одного и того же кода.
И если над проектом работают несколько человек, нужно отслеживать вклад каждого участника.

![ico-20 green-ok] Система контроля версий позволяет фиксировать текущую версию проекта,
и в случае необходимости вернуться к любой из предыдущих зафиксированных версий проекта.

![ico-20 green-ok] Система контроля версий позволяет создавать отдельные ветки для различных версий и для каждого разработчика.
_______________________________________________________________________________

^^^[Краткое описание]

Для каждого проекта создается отдельная папка.
Однако обычная папка не является гит-репозиторием, т.е. в ней нет системы контроля версий.
Чтобы сделать папку гит-репозиторием, нужно выполнить простую консольную команду, которую мы рассмотрим далее.

С точки зрения разработчика есть два репозитория, в которых хранится код проекта:  
• локальный репозиторий (на компе разработчика).
• удаленный (**~remote~**) репозиторий (например, на ~github.com~).

Все изменения вносятся в локальном репозитории.
Когда очередной этап работы над проектом в локальном репозитории завершен,
внесенные изменения фиксируются (**~commit~**),
после чего отправляются в удаленный репозиторий (**~push~**).

Фиксация изменений - это создание очередной версии проекта в системе контроля версий.

Если над проектом работает несколько человек, то ваша локальная версия проекта может  не отражать последние изменения в удаленном репо, сделанные другими участниками.
Поэтому нужно синхронизировать локальную и удаленную версию.
Сначала получить последнюю версию проекта из удаленного репо (**~fetch~**)
и выполнить слияние (**~merge~**) со своими изменениями
(**~pull~** = **~fetch~** + **~merge~**)
Если при слиянии возникли конфликты (другой разработчик внес изменения в те же файлы, что и вы), то вам придется "вручную" разрешить эти конфликты.
Это веская причина для того, чтобы каждый участник имел свою ветку (**~branch~**) в удаленном репо.
Благополучно завершив слияние, можно отправлять новую версию в удаленный репо (**~push~**).

^^^

____________________________________________________

## ![ico-30 icon] Подготовка к работе

Для начала работы нам необходимо:
• зарегистрироваться на **github.com**, где мы будем размещать свои проекты.
• установить редактор, в котором мы будем редактировать файлы своего проекта.
• установить систему контроля версий, и получить в свое распоряжение интерпретатор командной строки.

Для начала установим редактор кода, если у вас еще нет такого, например:

@@@@

[![ico-40 atom] Atom](https://atom.io/)
[![ico-50 sublime] SublimeText](https://www.sublimetext.com/)

@@@@

Если у вас еще не установлена система контроля версий **git**, установите:
[%%%Installing git%%%](https://gitforwindows.org/)
После успешной установки в вашем распоряжении будет _интерпретатор командной строки_ ![ico-20 bash] Git BASH.

Теперь зарегистрируемся на **github.com**:

[%%%![ico-70 github]%%%](https://github.com/)
^^Нажимаем кнопку **Sign up** (регистрация)^^

Теперь мы готовы начинать ![ico-20 smile]

____________________________________________________

## ![ico-30 bash] Git BASH

Интерпретатор командной строки
(**CLI** - _command line interpreter_)

[%%%![ico-20 link] ^^Дополнительная инфо о некоторых командах Git BASH^^%%%](page/git-bash)

Для создания новой папки используем консольную команду

••![ico-20 bash] $ mkdir <folder name>••

Для перехода в нужную папку используем команду **~cd~**

![](illustrations/git-bash-cd.png)

Как видите, наше местоположение ( путь к текущей папке ) подсвечивается желтым
Зеленым подсвечен локальный пользователь

Для того, чтобы созданная нами папка **git-sample** стала git-репозиторием,
нужно выполнить команду:

••![ico-20 bash] $ git init••

![](illustrations/git-bash-init.png)

Если папка, в которую мы перешли, является git-репозиторием,
то после текущего пути в круглых скобках указывается ветка, на которой мы находимся
^^(она подсвечивается голубым цветом)^^

Обычно это ветка **~master~** - главная ветка,
которая создается автоматически при создании репозитория

______________________________________________________

### ![ico-20 bash] git config

Команда **~git config~** позволяет управлять настройками  ~git~

Установим имя пользователя и email, которые будут использоваться во всех операциях git по умолчанию

••![ico-20 bash] $ git config --global user.name "<имя>"••
••![ico-20 bash] $ git config --global user.email <email>••

^^Опция **~--global~** сообщает интерпретатору, что настройки должны быть глобальными, ^^
^^т.е. эти же настройки будут действовать в других репозиториях, которые мы будем создавать^^
![ico-20 warn] Указывая **_~<имя>~_** и **_~<email>~_**, будьте внимательны: они должны быть такими же, с какими вы зарегистрировались на ~github.com~
^^Операции с удаленным репозиторием требуют аутентификации пользователя^^
^^Это стандартная процедура для защиты репозиториев от несанкционированного доступа^^
^^Для того, чтобы перенести сделанные изменения в **remote**, вы должны иметь права доступа к этому репо^^

Команда **~git config --list~**  выводит все настройки  ~git~

![](illustrations/git-bash-config.png)

____________________________________________________

### ![ico-20 bash] git branch

Веток в проекте может быть несколько

![ico-20 green-ok] **Создать ветку  &lt;branch name>**:

••![ico-20 bash] $ git branch  &lt;branch name>••

![ico-20 green-ok] **Переключиться на ветку  &lt;branch name>**:

••![ico-20 bash] $ git checkout &lt;branch name>••

![ico-20 green-ok] **Создать ветку  &lt;branch name> и переключиться на нее**:

••![ico-20 bash] $ git  checkout  -b  &lt;branch name>••

![ico-20 cap] Например, создать ветку  ~develop~  и переключиться на нее:

••![ico-20 bash] $ git  checkout  -b  develop••

![ico-20 green-ok] **Удаление ветки  &lt;branch name>**:

••![ico-20 bash] $ git branch --delete  &lt;branch name>••

или:

••![ico-20 bash] $ git branch -d  &lt;branch name>••

![ico-20 warn] нельзя удалить ветку, на которой вы находитесь

![ico-20 green-ok] **Слияние веток**

••![ico-20 bash] $ git checkout develop••
••![ico-20 bash] $ git merge master••

![ico-20 warn] При слиянии веток могут возникать конфликты,
связанные с изменениями, внесенными в одной ветке, и отсутствующими в другой
Например, если после создания ветки ~develop~ в ветку ~master~ были внесены изменения
Конфликты слияния разрешаются вручную в редакторе

![ico-20 green-ok] **Вывод списка всех веток проекта**

••![ico-20 bash] $ git branch --list••

Переключение между ветками в удаленном репозитории:

![](illustrations/git-branch-list.png)

^^^[Разрешение конфликтов слияния]

Ниже показано, как будет отображаться конфликт слияния в файле ~index.html~, в котором он произошел:

~~~html
&lt;html>
   &lt;head>
&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
    <link type="text/css" rel="stylesheet" media="all" href="style.css" />
=======
    &lt;!-- no style -->
>>>>>>> master
   &lt;/head>
   &lt;body>
      &lt;h1>Hello, students!&lt;/h1>
   &lt;/body>
&lt;/html>
~~~

Все, что находится между

~~~html
&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD      и       =======
~~~

обнаружено в ветке, которую мы сливаем с ~master~.

Ниже, между ~=======~ и ~>>>>>>> master~
находится то, что было обнаружено в этом файле в ветке  ~master~.

Для разрешения конфликта нужно внести соответствующие изменения
(отредактировать файл ~index.html~).

~~~html
&lt;html>
   &lt;head>
      &lt;link type="text/css" rel="stylesheet" media="all" href="style.css" />
   &lt;/head>
   &lt;body>
      &lt;h1>Hello, students!&lt;/h1>
   &lt;/body>
&lt;/html>
~~~

после чего сделать коммит изменений

••![ico-20 bash] $ git add index.html••
••![ico-20 bash] $ git commit -m "Merge fixed conflict"••

^^^
______________________________________________________

# ![ico-50 git] github

• Сервис для совместной разработки проектов.
• Социальная сеть девелоперов.
• Основан на git.

______________________________________________________

Создание репозитория (**remote**)
![](illustrations/create-github-repo.png)

А можно клонировать существующий репозиторий,
в результате чего вы получите локальную копию этого репозитория на своем компьютере.

_________________________________________________________

## ![ico-25 hw]  Упражнение 1

![ico-20 green-ok] Создание репозитория на github.com
![ico-20 green-ok] Клонирование удаленного репозитория в локальный
![ico-20 green-ok] Отслеживаемые и неотслеживаемые файлы ( stage area )
![ico-20 green-ok] Команда git status
![ico-20 green-ok] Фиксация изменений
![ico-20 green-ok] Команда remote
![ico-20 green-ok] Команда git push
![ico-20 green-ok] Команда git log

![ico-20 bash] **git clone**

**Клонирование удаленного репозитория в локальный**

Создадим новый репозиторий на ~github.com~.
Предположим, новый репо будет иметь имя **~students_homeworks~**.
Он пустой.
Войдя в этот репозиторий, вы увидите такую картинку:

![](illustrations/github-new-repo.png)

Скопируем ссылку на репозиторий:

![](illustrations/github-copy-repo-link.png)

Переключимся в консоль ![ico-20 bash]
и перейдем в любую "свободную" папку с помощью команды ~cd~.
В данном примере я переключаюсь в папку ~z:/home/common~:

••![ico-20 bash]$ cd  z:/home/common••

Теперь наберем команду ~git clone <ссылка на репозиторий>~:

••![ico-20 bash]$ git clone https://github.com/garevna/students_homeworks.git••

^^(для вставки скопированной ссылки воспользуйтесь контекстным меню или Shift + Ins)^^.

![](illustrations/git-clone.png)

Теперь в папке _~common~_ появилась  новая папка _~students_homeworks~_, в которой нет ничего, кроме папки ~.git~.

![](illustrations/git-clone-result.png)

Откроем эту папку в редакторе.
Добавим файл **~README.md~**.
Введем любой текст и сохраним файл.

(создать новый файл - ~Ctrl + N~,  сохранить файл - ~Ctrl + S~).

Обратите внимание, что новый файл подсвечен зеленым.

![](illustrations/git-clone-readme.png)

__________________________________________________

![ico-20 bash] **git status**

Вернемся в консоль.
Перейдем в папку _~students_homeworks~_.
Как видно на картинке, у нас появилась ветка  ~master~.

Воспользуемся командой ~git status~  для просмотра изменений состояния нашего проекта.

![](illustrations/git-status-1.png)

_____________________________

![ico-20 bash] **git add**

Созданный нами файл  README.md  подсвечен красным.
Это означает, что он изменен, но не отслеживается.
Не отслеживаемые файлы не будут участвовать в дальнейших операциях.
Давайте перенесем его в область отслеживаемых файлов (~staging area~).
Для этого воспользуемся командой  ~git add~

••![ico-20 bash]$ git add README.md••

или:

••![ico-20 bash]$ git add * ••

^^** * ** означает включение всех измененных файлов.^^

![](illustrations/git-add-1.png)

_____________________________

![ico-20 bash] **git commit**

Теперь файл _README.md_  отображается в разделе ~"Changes to be commited"~ и подсвечен зеленым.

Используем команду ~git commit~ для фиксации изменений:

••![ico-20 bash]$ git commit -m "first commit:  README.md added"••

![](illustrations/git-commit-1.png)

Опция **~-m~**  позволяет написать комментарий к коммиту непосредственно в командной строке.

Без этой опции при выполнении команды ~git commit~ будет запущен текстовый редактор
^^(по умолчанию это ~vim~ или ~emacs~)^^,
и вы должны будете ввести текст комментария в этом редакторе.

Обратите внимание, что после коммита изменений команда ~git status~ возвращает

••"nothing to commit, working directory clean"••

Если посмотреть на файл в редакторе, он уже больше не подсвечен зеленым.

__________________________

![ico-20 bash] **git remote**

Теперь посмотрим, как работает команда ~git remote~
Локальный репозиторий всегда должен быть связан с удаленным, который имеет URL
URL удаленного репозитория слишком длинный,
для удаленного репозитория устанавливается алиас ( псевдоним )
по умолчанию это **~origin~**
В нашем примере мы клонировали удаленный репозиторий на свою машину,
поэтому наш локальный репозиторий автоматически был связан с удаленным с алиасом **~origin~**
Команда ~git remote~ без параметров вернет нам этот алиас

Если же мы хотим увидеть URL удаленного репозитория, то следует использовать опцию  **~-v~**

![](illustrations/git-remote-1.png)

___________________________

![ico-20 bash] **git push**

Теперь воспользуемся командой ~git push~  для отправки сделанных изменений в удаленный репозиторий.
Команда ~git push~ требует указания алиаса удаленного репозитория и ветки, откуда и куда происходит перенос.
Если имена веток локального и удаленного репозитория совпадают, то это будет одно значение  (~master~):

••![ico-20 bash]$ git push origin master••

Если же нужно, например, перенести изменения из локальной ветки ~master~ в ветку ~gh-pages~ удаленного репозитория,
то нужно указать имена обеих веток, разделенные двоеточем:

••![ico-20 bash]$ git push origin master:gh-pages••

![](illustrations/git-push-1.png)

![ico-20 warn] При записи в удаленный репозиторий по протоколу ~https~ приходится вводить e-mail и пароль для авторизации.

Можно настроить транспортный протокол SSH,
тогда не нужно будет каждый раз вводить свой e-mail и пароль
при использовании команды ~git push~.

Теперь вернемся на  github.com  и обновим страницу:

![](illustrations/git-push-2.png)

__________________________

![ico-20 bash] **git log**

Посмотрим на историю наших манипуляций с репозиторием с помощью команды ~git log~

Как видим, наш коммит получил длинный идентификатор:

![](illustrations/git-log.png)

__________________________________________________________________________

## ![ico-25 hw] Упражнение 2

![ico-20 green-ok] Инициализация репозитория git в существующей локальной папке
![ico-20 green-ok] Идексация изменений
![ico-20 green-ok] Удаление лишних файлов из  stage area
![ico-20 green-ok] Фиксация изменений
![ico-20 green-ok] Создание удаленного репозитория из локального репо

![ico-20 bash] **git init**

Если у нас есть локальная папка с проектом, которая не является гит-репозиторием, мы можем создать репозиторий в этой папке с помощью команды git init.

На картинке ниже:

С помощью команды ~ls~ мы выводим список файлов в текущей директории.
С помощью команды ~cd ..~  мы выходим из текущей папки на один уровень выше (в папку ~common~).
С помощью команды ~mkdir test~ создаем папку ~test~.
С помощью команды ~cd test~ входим в папку ~test~.
Это пустая папка, в ней нет git-репозитория.
Создаем его с помощью команды ~git init~.
Как видно на картинке, папка ~test~  теперь отображается с веткой ~master~

![](illustrations/git-init-2.png)

__________________________

Создадим папку ~assets~:

••![ico-20 bash]$ mkdir assets••

Скопируем в эту папку несколько файлов.
Используем  команду ~git status~ для получения инфо о текущем состоянии репо.
На картинке видно, что у нас в репо появилась не отслеживаемая папка ~assets~.
Скопируем в нашу папку ~test~ еще пару файлов
и опять используем команду ~git status~.

![](illustrations/git-status-2.png)

__________________________

Проиндексируем эти изменения с помощью команды ~git add .~
^^(точка указывает на файлы текущей папки)^^

Как видим, все файлы попали в ~stage area~ - они готовы к коммиту, и подсвечены зеленым.

![](illustrations/git-add-2.png)

![ico-20 bash] **git rm --cached**

Давайте уберем из **stage area**  файл  ~assets/style.css~:

••![ico-20 bash]$ git rm --cached  assets/style.css••

Теперь файл ~assets/style.css~ является не отслеживаемым (~untracked~), он подсвечен красным.

![](illustrations/git-rm.png)

__________________________

![ico-20 bash] **git commit**

Осталось сделать коммит.

••![ico-20 bash]$ git commit -m "Test creating remote repo from  local"••

Если использовать команду ~git commit~ с опцией  **~-а~**, то можно обойтись без предварительной индексации изменений
(без команды ~git add~).
Опция **~-а~**  означает, что перед коммитом нужно добавить все измененные файлы в ~stage area~.
Опция **~-m~**  означает, как мы уже знаем, что комментарий к коммиту будет в командной строке.

![](illustrations/git-commit-2.png)

Теперь создадим новый репозиторий на ~github.com~.
![ico-20 warn] При создании репозитория не нужно инициализировать его с файлами ~README~, ~license~ или ~gitignore~.

Скопируем ссылку на репозиторий, как и в предыдущем упражнении 1.

![ico-20 bash] **git remote add**

Теперь "привяжем" вновь созданный удаленный репозиторий с нашим локальным репо.
Для этого опять перейдем в git bush и введем команду:

••![ico-20 bash]$ git remote add origin test https://github.com/garevna/test.git••

Обратите внимание, что алиас для удаленного репо выбран не  "origin" (по умолчанию), а  "test".
Теперь если ввести команду ~git remote~, то мы получим ~test~.

![](illustrations/git-remote-2.png)

__________________________

![ico-20 bash] **git push**

Теперь можно отправлять содержимое локального репо на удаленный

••![ico-20 bash]$ git push test master••

__________________________________________________________________________

# ![ico-30 git] Генерация SSH-ключа

С помощью SSH-ключей вы можете пушить последние коммиты
без ввода имени пользователя или пароля при каждом ~push~.

Прежде, чем генерировать ~SSH~-ключ, проверьте его наличие с помощью команды

••![ico-20 bash]$ ls -al ~/.ssh••

Вы получите перечень всех SSH-ключей в папке **~.ssh~**.

Если у вас нет публичного ключа, создайте его командой:

••![ico-20 bash]$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"••

На запросы:

••Enter passphrase (empty for no passphrase):••
••Enter same passphrase again:••

можно просто давить ~Enter~.

Теперь нужно добавить SSH-ключ в SSH-агент.
Проверьте, что ~ssh-agent~ запущен, командой

••![ico-20 bash]$ eval $(ssh-agent -s)••

Она должна вернуть

••Agent pid ХХХХ••

где  ~ХХХХ~ - число

Добавьте секретный ключ SSH в ssh-agent

••![ico-20 bash]$ ssh-add ~/.ssh/id_rsa••

(если вы создали ключ с другим именем или добавляете существующий ключ с другим именем,
замените id_rsa на имя вашего файла закрытого ключа)

Ответ будет таким:

••Identity added: /c/Users/<__ваше имя__>/.ssh/id_rsa (/c/Users/<__ваше имя__>/.ssh/id_rsa)••

Осталось добавить SSH-ключ в вашу учетную запись на ~github~

Для этого скопируйте SSH-ключ в буфер обмена командой:

••![ico-20 bash]$ clip < ~/.ssh/id_rsa.pub••

^^(если команда clip не работает, можно найти скрытую папку **~.ssh~**, открыть файл в своем любимом текстовом редакторе и скопировать его содержимое в буфер обмена)^^

@@@@
Войдите в свою учетную запись на ~github~ и откройте настройки своей учетной записи:
![](illustrations/git-ssh-1.png)
@@@@

В панели слева выберите ~SSH and GPG keys~
^^^[Settings]
![](illustrations/git-ssh-2.png)
^^^

@@@@
Нажмите кнопку:
![](illustrations/git-ssh-3.png)
@@@@

В поле ~title~ введите любой текст, объясняющий, к каким компом / юзером связан этот ключ.

В поле ~key~ вставьте скопированный ключ.

Нажмите кнопку ~Add SSH key~.

![](illustrations/git-ssh-4.png)

__________________________________________________________________________

# ![ico-30 hw] Homework

^^^[Homework]
Создать локальный репозиторий в папке **~homeworks~** на своем компе.

В папке **~homeworks~** создать файл README.md,
в котором описать назначение репо и указать ФИО автора.

В папку локального репозитория добавить свою фотографию.

Проиндексировать все изменения в локальном репо и сделать коммит.

Создать удаленный репозиторий **~homeworks~** на ~github.com~.

Связать его с локальным репозиторием как ~homeworks~.

Запушить все изменения в удаленный репо.

^^^

_____________________________________________

[%%%GIT%%%](https://githowto.com/)
