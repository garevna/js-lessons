# ![ico-30 study] File API

**обеспечивает доступ к файлам на стороне клиента**
^^(добавлен к DOM в HTML5)^^

Приложение может попросить пользователя выбрать локальные файлы, а затем прочитать содержимое этих файлов.

Посмотрим, как это можно сделать с помощью html-элемента ~&lt;input>~.

Вставим в разметку страницы тег:

~~~html
<input
  type="file"
  multiple
  onchange="handleFiles(event)"
/>
~~~

Созданный host-объект имеет свойство  **_~files~_**:

![](illustrations/file-api-01.png)

Свойство  **_~files~_**  является итерируемым объектом класса  **~FileList~**.

Свойства объекта **_~files~`_** являются экземплярами класса  **~File~**.

Доступ к этим свойствам реализуется по индексу:

~~~js
const input = document.querySelector('input[type="file"]')
console.log(input.files[0])
~~~

У свойств итерабельного объекта **~FileList~** есть ряд собственных свойств.

Свойство **_~type~_** (строка) характеризует тип файла:

• Для файлов изображений это будет "~image/jpg~" | "~image/png~" | "~image/gif~" | "~image/svg+xml~"
• Для ~json~-файлов это будет "~application/json~"
• Для ~js~-файлов это будет "~application/javascript~"
• Для ~css~-файлов это будет "~text/css~"
• Для ~html~-файлов это будет "~text/html~"
• Для файлов c расширением ~txt~ это будет "~text/plain~"
• Для исполняемых файлов (c расширением ~.exe~) это будет "~application/x-msdownload~"
...

!![illustrations/file-api-02.png, illustrations/file-api-03.png, illustrations/file-api-04.png]

Кроме того, у каждого объекта структуры **~FileList~** есть свойство **~size~**, значение которого характеризует размер файла в байтах.

Также можно узнать дату последней модификации файла (**~lastModified~**) и его имя (**~name~**).

___________________________________

[![ico-30 hw] Quiz](quiz/file-API)
