# ![ico-35 study] Оператор for

Ну, ось ми і дісталися до третього основоположного принципу структурного програмування - до циклів.
Як ми вже, я сподіваюся, знаємо, цикл - це повторення одних і тих самих дій кілька разів.
Тобто є якийсь код, який має бути виконаний неодноразово.
Цей код поміщається у фігурні дужки **~{}~** і називається **тілом циклу**.

Кожне повторення циклу називається **ітерацією циклу**.

Таким чином, будь-який оператор циклу матиме тіло, і це тіло завжди поміщене у фігурні дужки.
Але в кожного циклу є одне важливе завдання: вчасно зупинитися.
Ми ж не можемо нескінченно повторювати виконання коду у фігурних дужках.
Нескінченний цикл - це підвисання вкладки браузера. Нам це точно ні до чого.

Отже, цикл потрібно вчасно зупинити.
Для цього визначити, коли цикл має бути зупинений.

Є варіанти:
- Прямо вказати, скільки разів має бути виконано цикл;
- Задати якусь умову, при виконанні якої цикл буде повторюватися. Така умова (якийсь вираз) завжди поміщається в круглі дужки.
Умова циклу може бути будь-яким обчислювальним виразом (тобто синтаксично коректним), але після обчислення значення цього виразу движок завжди приведе його до логічного типу (**~true~** або **~false~**).

Отже, у будь-якого оператора циклу є три обов'язкові частини: **назва оператора** (ключове слово), **умова** у круглих дужках і **тіло** у фігурних дужках.

Ми починаємо нашу подорож циклами з оператора циклу **~for~**.

## ![ico-30 icon] Syntax

Для оператора циклу **~for~** потрібна змінна-лічильник (змінна циклу), яка повинна:
1. мати стартове значення. Тобто її потрібно оголосити і присвоїти їй початкове значення;
2. змінна повинна змінювати своє значення після кожної ітерації циклу (інакше цикл буде нескінченним);
3. на кожній ітерації значення змінної циклу має перевірятися на предмет виконання обмеження (інакше цикл буде нескінченним).

Для оператора циклу **~for~** усе, що стосується змінної циклу (ініціалізація, зміна, перевірка) поміщається в круглі дужки:

~~~js
for (initialization; condition; update) {
  ...body od the loop
}
~~~

Наприклад:

~~~js
// initialization:
var index = 0
// condition:
index < 10
// update:
index++
~~~

Тоді отримуємо таку картину:

~~~js
for (var index = 0; index < 10; index++) {
  ...body of the loop
}
~~~

Залишилося наповнити тіло циклу кодом.

_____________________________________________________________________

## ![ico-30 icon] Директива break

Перериває виконання циклу.

Річ у тім, що жодна з фаз (initialization; condition; update) для змінної циклу не є обов'язковою.
Теоретично можна організувати цикл, у якому всі три фази будуть пропущені:

~~~js
for (; ;) {
  console.log('Iteration')
  if (Math.random() < 0.5) break
}
~~~

^^Тут ми використовували функцію **~random~** вбудованої бібліотеки <a href="#byblyoteka_Math">**Math**</a>.^^

У цьому випадку керування циклом переходить у тіло циклу.
Не дуже гарне рішення, чи не так?
Якщо вже ви не хочете возитися зі змінною циклу, то краще використовувати оператор циклу **~while~**, який буде розглянуто далі.
Але суто зі спортивного інтересу такий варіант розглянути варто.

Наприклад, якщо потрібно вивести в консоль усі числа від 1 до 10, то можна зробити так:

~~~js
for (var i = 1; ; i++) {
  if (i > 10) break
  console.log(i)
}
~~~

Тут умову на змінну циклу пропущено, що призвело б до нескінченного циклу, якби ми не поставили переривання циклу ~break~ всередині його тіла.

_____________________________________________________________________

## ![ico-25 icon] Директива continue

Перериває виконання поточної ітерації циклу.

Наприклад, якщо потрібно вивести в консоль тільки парні числа до 10, то можна зробити так:

~~~js
for (var i = 1; i < 10; i++) {
  if (i % 2 === 0) console.log(i)
}
~~~

А можна й так:

~~~js
for (var i = 1; i < 10; i++) {
  if (i % 2 !== 0) continue
  console.log(i)
}
~~~

^^Оскільки в тілі умовного оператора ~if~ лише одна операція, фігурні дужки ми опустили.^^

^^~ %~ - це операція взяття залишку від ділення (~4 % 2~ буде 0, ~5 % 2~ буде 1).^^

^^~x !== y~ значення або тип даних змінної ** x** не збігається зі значенням або типом даних змінної ** y**.^^

______________________________________________________

## ![ico-30 icon] Examples

◘◘![ico-25 cap]** 1**◘◘

~~~js
var res = 0

for (var i = 0; i < 10; i++) {
  res += i * 2
}
~~~

Розшифровка виразу в круглих дужках:

~~~js
(var i = 0; i < 10; i++)
~~~

| ~var i = 0~ | ^^ініціалізуємо змінну циклу, тобто оголошуємо її і присвоюємо їй початкове значення 0^^ |
| ~i++~ | ^^спосіб зміни змінної циклу на кожній ітерації<br>в даному випадку після кожної ітерації значення змінної циклу буде збільшуватися на одиницю^^ |
| ~i < 10~ | ^^встановлюємо обмеження на число ітерацій циклу<br>( значення змінної циклу буде збільшуватися доти, доки воно менше 10).^^ |

• ^^У цьому прикладі до значення змінної ~res~ 10 разів буде додано значення обчислюваного виразу ~i * 2~.^^
• ^^На першій ітерації циклу значенням змінної циклу ** i** буде 0, тому значення змінної ~res~ не зміниться.^^
• ^^Після першої ітерації значення змінної циклу ** i** буде збільшене на одиницю і дорівнюватиме 1.^^
• ^^На другій ітерації циклу значення виразу ~i * 2~ уже дорівнюватиме 2, це значення буде додано до значення змінної ~res~, що дорівнюватиме 2.^^
• ^^Після ітерації значення змінної циклу ** i** знову збільшиться на 1 і дорівнюватиме 2.^^
• ^^На третій ітерації вираз ~i * 2~ набуде значення 4.^^
• ^^Це значення буде додано до значення змінної ~res~, яке стане рівним ~2 + 4 = 6~.^^

^^І так далі...^^

_________________________________________________________________

◘◘![ico-25 cap]** 2**◘◘

~~~js
for (var i = 1; i < 10;) {
  console.log(i++)
}
~~~

У цьому прикладі збільшення змінної циклу здійснюється всередині тіла циклу.
Однак робити так я не рекомендую.
Це вимагає підвищеної уважності і може призводити до помилок.
Такі «фінти» гарні для операторів циклу **~while~** і **~do...while~**, а вже якщо ви використовуєте оператор **~for~**, то краще не випендрюватися і всі налаштування для змінної циклу робити в круглих дужках. Це наочніше і простіше у відладці.

_________________________________________________________________

◘◘![ico-25 cap]** 3**◘◘

~~~js
var res = 0

for (var i = 100; i > 0; i--) {
  res += i % 2
}

console.log(res)
~~~
_________________________________________________________________

◘◘![ico-25 cap]** 4**◘◘

~~~js
for (var i = 2; i < 100; i *= 2) {
  console.log(i)
}
~~~

Виведення в консоль ступенів двійки.
____________________________________________________________________

◘◘![ico-25 cap] Массив◘◘

~~~js
var res = 0, arr = [2, 1, 5, 3], i

for (i = 0; i < arr.length; i++) {
  res += arr[i]
}
~~~

^^У масивів, так само, як у текстових рядків, є властивість ~length~.^^

^^Ця властивість містить число елементів масиву (або число символів у рядку).^^.

^^Як обмеження на число ітерацій циклу ми використовуємо довжину масиву ~arr.length~:^^

~~~js
i < arr.length
~~~

^^т.е. доки змінна циклу менша за довжину масиву, цикл повторюватиметься.^^.

^^В результаті виконання циклу у змінній ~res~ буде сума елементів масиву ~arr~.^^

^^![ico-20 warn] Можна змінювати значення змінної циклу на кожній ітерації на число, відмінне від одиниці.^^

Наступний код виведе в консоль усі непарні числа від 1 до 20:

~~~js
for (var i = 1; i < 20; i += 2) {
  console.log(i)
}
~~~

______________________________________________________

## ![ico-30 icon] Tests

◘◘![ico-25 hw]** 1**◘◘

~~~js
var number = 5

for (; number > 2; number -= 2) {
  ++number
}
~~~

→→→ Яке значення матиме змінна number після завершення циклу? | 1, 2, 3, 4, 5, 6 | 2→→→


◘◘![ico-25 hw] **2-3**◘◘
~~~js
var x = 0, y = 0, numbers = [1, 2, 3, 4]

var res_x = 0, res_y = 0

for (var i = 0; i < arr.length-1; i++) {
  res_x += numbers[x++]
  res_y += numbers[++y]
}
~~~

→→→ Яке значення матиме змінна res_x після завершення циклу? | 1, 3, 5, 6, 9, 10 | 6→→→
→→→ Яке значення матиме змінна res_y після завершення циклу? | 1, 3, 5, 6, 9, 10 | 9→→→

◘◘![ico-25 hw]** 4**◘◘

~~~js
for (var number = 11; number > 2; number -= 2) {
  number++
}
~~~

→→→ Яке значення матиме змінна number після завершення циклу? | 1, 2, 3, 4, 5, 6, 7 | 2→→→

◘◘![ico-25 hw]** 5**◘◘

~~~js
for (var number = 7; number > 2; --number) {
  number--
}
~~~

→→→ Яке значення матиме змінна number після завершення циклу? | 1, 2, 3, 4, 5, 6, 7 | 1→→→

◘◘![ico-25 hw]** 6**◘◘

~~~js
for (var number = -1; number-- > -11; number *= 2) {}
~~~

→→→ Яке значення матиме змінна number після завершення циклу? | 0, -1, -9, -11, -12, -20, -21, -22, -23 | -23→→→

◘◘![ico-25 hw]** 7**◘◘

~~~js
var messages = ['Hi! ', 'Welcome! ', 'Nice to see you. ', 'How are you?']

var message = ''

for (var index = -1; index < messages.length; index += 2) {
  message += messages[index] || ''
}
~~~

→→→ Яке значення матиме змінна message після завершення циклу? | 'Hi! Welcome! Nice to see you. How are you?', 'Hi! How are you?', 'Hi! Welcome! ', 'Hi! Nice to see you.', 'Welcome! Nice to see you. How are you?', 'Welcome! How are you?', 'Nice to see you. How are you?', 'How are you?' | Welcome! How are you?→→→
____________________________________________________________________

[![ico-20 link] MDN](external/mdn-for)
