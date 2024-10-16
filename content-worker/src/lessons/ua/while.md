# ![ico-35 study] Цикли while | do...while

Дуже часто число ітерацій циклу заздалегідь невідоме, і воно залежить від виконання якоїсь умови.
Як в армійській приказці, «копати від паркану і до обіду».

Тому ми не можемо використовувати лічильник ітерацій, оскільки не можемо встановити обмеження на його значення.

У цьому випадку ми використовуємо один з операторів циклу **~while~** або **~do...while~**.

## ![ico-30 icon] while

Синтаксично оператор **~while~** містить три обов'язкові частини: саме слово **~while~**, потім (через пробіл) круглі дужки, у яких буде записано логічний вираз (умову циклу), а потім (через пробіл) - тіло циклу, укладене у фігурні дужки:

~~~js
while (умова) {
  ...тіло циклу
}
~~~

Що робитиме движок, зіткнувшись із таким виразом?

1. Спочатку він обчислить значення логічного виразу в круглих дужках і приведе його до логічного типу.
2. Якщо умова виконана (тобто обчислене значення буде ~true~), то виконується код всередині фігурних дужок (чергова ітерація циклу).
Після чого движок повернеться до пункту 1.

◘◘![ico-25 cap] ** 1**◘◘

~~~js
var n = 5

while (n < 5) {
  console.log(n)
}
~~~

^^Цей цикл не буде виконано жодного разу, оскільки умову ~n < 5~ не виконано від початку, тобто під час обчислення виразу в круглих дужках буде отримано значення ~false~.^^

◘◘![ico-25 cap] ** 2**◘◘

~~~js
var res = 0, n = 1

while (n) {
  n = prompt('Enter the number')
  res += (n - 0) || 0
}
~~~

^^Цикл підсумовуватиме введені юзером числа доти, доки в модальному вікні ~prompt~ не буде натиснута кнопка ~Cancel~.^^
^^Оскільки в модальному вікні введені значення будуть рядкового типу, ми приводимо їх до числа за допомогою віднімання ~(n - 0)~.^^
^^Якщо в результаті віднімання ~(n - 0)~ буде отримано значення ~NaN~, то до змінної ~res~ буде додано 0.^^.

У наступному прикладі ми скористаємося функцією **~random~** бібліотеки **~Math~**, яка генерує псевдовипадкове число від 0 до 1:

◘◘![ico-25 cap] ** 3**◘◘

~~~js
var res = 0, n = 0

while (n < 0.5) {
  n = Math.random()
  res += n
}
~~~

Очевидно, що цей цикл не буде нескінченним, оскільки рано чи пізно значення **~Math.random()~** виявиться більшим за 0.5.

______________________

## ![ico-30 icon] do...while

Цей цикл спочатку виконує код у фігурних дужках, а потім перевіряє виконання умови.

~~~js
do {
  ...
} while (умова)
~~~

^^Цикл буде виконано щонайменше 1 раз, оскільки перевірка істинності умови відбувається після чергової ітерації циклу.^^

Коли цей цикл кращий за попередній?
Наприклад, у такому випадку:

◘◘![ico-25 cap] ** 4**◘◘

~~~js
do {
  var rand = Math.random()
  console.log(rand)
} while (rand < .5)
~~~

______________________________________________________

## ![ico-30 icon] Tests

◘◘![ico-25 hw]** 1**◘◘
~~~js
do {
  var rand = Math.random()
  if (rand > .5) break
} while (true)
~~~

→→→ Чи буде цикл нескінченним? | 'yes', 'no' | no→→→

◘◘![ico-25 hw]** 2**◘◘
~~~js
var num = 1

while (Math.random() < .5) {
  num *= (num + 1)
}
~~~

→→→ Чи буде цикл нескінченним? | 'yes', 'no' | no→→→

◘◘![ico-25 hw]** 3**◘◘
~~~js
var num = prompt('Enter the integer') - 0
var res = 0

while (true) {
  num >= 2 && res++
  num /= 2
  if (num < 2) {
    console.log(`2 ** ${res} = ${2 ** res}`)
    break
  }
}
~~~

→→→ Що буде в консолі, якщо в модальному вікні ввести 8? | '', '2 ** 1 = 2', '2 ** 2 = 4', '2 ** 3 = 8', '2 ** 4 = 16' | 2 ** 3 = 8→→→

◘◘![ico-25 hw]** 4**◘◘
~~~js
var num = prompt('Enter the integer') - 0
var res = 1

while (true) {
  res *= num--
  if (num < 2) {
    console.log(`Factorial: ${res}`)
    break
  }
}
~~~

→→→ Що буде в консолі, якщо в модальному вікні ввести 5? | 24, 0, 120, 20 | 120→→→

________________

[![ico-30 hw] **Quiz**](quiz/while)
