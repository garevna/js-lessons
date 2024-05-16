# ![ico-30 bash] # BASH 

**Bourne-Again SHell**

^^самый популярный интерпретатор командной строки ( **CLI** - _~command line interpreter~_ )^^
^^в юниксоподобных системах **GNU/Linux**^^
^^( **_GNU_** - операционная система, которая является _free software_ )^^

![ico-30 bash] [**Установка**](https://gitforwindows.org/)

____________________________________________________

## ![ico-25 bash] CR | LF

Проблема для разработчиков, работающих на разных платформах, - 
это разные _коды символов перевода строки_ в текстовых файлах

| Платформа         | символы перевода строки |
| Windows ( и DOS ) | CR и LF                 |
| UNIX ( Linux )    | LF                      |
| OS X              | LF                      |
| Mac               | CR                      |

Если открыть файл UNIX в Microsoft Notepad, он отобразит текст без разрывов строк

Если открыть файл Windows в редакторе UNIX, в конце каждой строки будет символ CR

____________________________________________________

## ![ico-25 bash] Commands

### ![ico-20 bash] echo

вывод аргументов, разделенных пробелами, на стандартное устройство вывода

••echo 'my name is Irina'••

выведет в консоль текст '_my name is Irina_'

••echo 'my name is Irina' > sample.txt••

в текщей папке создаст ( или перезапишет ) файл  **sample.txt**  с текстом '_my name is Irina_'

____________________________________________________

### ![ico-20 bash] cat

Вывод с указанного устройства ввода в файл
имя файла для вывода следует после ~ >~
если устройство ввода пропущено, то вывод будет из устройства по умолчанию ( консоль )

![ico-20 cap] ** 1**

••$ cat > sample.txt••

после нажатия ~Enter~ можно вводить мнострочный текст
завершить - ~Ctrl + D~
В текущей папке будет создан ( или перезаписан ) файл **sample.txt** с введенным текстом

![ico-20 cap] ** 2**

••$ cat file1.txt file2.txt file3.txt > sample.txt••

соединит содержимое файлов **file1.txt**, **file2.txt** и **file3.txt**
и результат сохранит в файл **sample.txt**

Результат в блокноте

![](https://lh5.googleusercontent.com/bjByuVJ8p_n11F6NpVdJVyseCMbrQojFdSC0eJFu8g1JIPFfaA9dbKtqtCyv9q30mw8V2epMx0uDKyuWt7BV7Bxnqifp8bFWRRU5USAObvwkk4RwfFeus1oHBZKS4S8IraA526j2bGQ-NQs)

Результат в Notepad++

![](https://lh6.googleusercontent.com/zdmUMX2t13Yrj68a5T4Q08t5cnFmAhpaGJ2nywqWQ_6Q1r77JS_l3HdNn0DuuIWxQ84pMybzZrkuSjAxv-WS5JNBVdpyQSAWAl11-6_kW3F9AymFdqsyJ3xP0Ekqn_nyLgvrR8AlAre5s6U)

____________________________________________________

### ![ico-20 bash] touch

Команда  **~touch~**  в основном используется для изменения временных меток файла,
но если файл, имя которого передано как аргумент, не существует,
то команда  **~touch~**  создает его
( пустым, если не указана опция  ~-c~  или  ~-h~ )

![ico-20 cap] ** 3**

••$ touch samle.txt••

Если файл  _samle.txt_  не существует, то  создаст пустой файл  _samle.txt_

Если файл  _samle.txt_  существует, то  обновит время доступа/модификации файла ( ~timestamp~ ) до текущего времени

![ico-20 warn] Чтобы команда touch не создавала никаких новых файлов,  можно использовать опцию ~-c~

![ico-20 cap] ** 4**

••$ touch samle.txt  -c••

____________________________________________________

### ![ico-20 bash] stat

С помощью команды  **~stat~**  выведем информацию о файле  _sample.txt_ до и после выполнения команды ~touch  sample.txt~ 

~~~console
$ stat  sample.txt
  touch  sample.txt
  stat  sample.txt
~~~

••$ touch  sample.txt••

![](https://lh5.googleusercontent.com/WMEU1eQfiWpMsuWhPSpxesS2ZekfL6-e42FZRER6pWdGHGL5eVyVNrzS1hn6IhW4m_1ifxg27Kij2KHa7DaCXaE9mhOUuxyY6hd668O0NZ5GvbDxDkxlTMv11ebpg0104mcNqunkYsgk1sQ)


^^Как видно на скрине,  значения ^^
^^• Access^^
^^• Modify^^
^^• Change^^
^^файла ~sample.txt~ были обновлены^^
^^содержимое файла не меняется^^

____________________________________________________

![ico-20 green-ok] Опция  -a


Для изменения только времени доступа нужно использовать опцию  ~-a~

~~~console
$ stat  sample.txt
  touch  sample.txt  -a
  stat  sample.txt
~~~

На скрине видно, что изменилось только время последнего доступа ( ~Access~ ) и время последнего изменения ( ~Change~ )

••$ touch  sample.txt  -a••

![](https://lh5.googleusercontent.com/LsLoSKkXwj3ZpKkEQL-ABv-RT4pAg7KRtEWlmpgL1ZowJ49EyEYLlyWEp6Xb8gOu51dLFiOR4Vx5HbjiECvBGLK5G9tdWzHsW0-7dgW0y2CPUeIW3xWi_XRYcqntrv2BSlCM1oFliErm5ZE)

![ico-20 green-ok] Опция  -m

Если нужно изменить только время модификации, используйте опцию **~-m~**

![ico-20 green-ok] Опция  -r

Заменим время доступа и модификации файла  **_sample.txt_**
соответствующими временными метками файла **file1.txt**:

••$ touch sample.txt -r file1.txt••

Обратите внимание ( см. скрин ), что:

время создания ( ~Birth~ ) файла **_sample.txt_**  не изменилось,
время изменения ( ~Change~ ) было изменено на текущее время,
а время доступа ( ~Access~ ) и время модификации ( ~Modify~ )
установлены такими же, как у файла **file1.txt**

![](https://lh6.googleusercontent.com/bFOcEKUA4pVF4Y31APx4A7TU8m8UNkgXZZUVP9ioLf2-e7yl_3hfUqquk0MRlxpKiSu9wZlx3WhDojetgS5S8HU7gdMgOpICFGao2Pr2RK2iN_vo7kAQwufREhoJVwxn0YHUopG5DfG6ljg)

____________________________________________________

