# ![ico-30 study] Рекурсія⟪Recursion⟫

Рекурсія — це процес, у якому функція викликає саму себе, прямо чи опосередковано

Рекурсивна функція у функціональному програмуванні є «чистішою» альтернативою циклу

![ico-20 warn] Кожна рекурсивна функція повинна мати умову припинення рекурсії
В іншому разі виклик функції призведе до нескінченного циклу

**Хвостова рекурсія** — це коли останнім оператором, що виконується в рекурсивній функції, є оператор **_return_** із викликом цієї ж функції

Найпростіший (класичний) приклад рекурсії — обчислення факторіалу

^^^[Обчислення факторіалу]

![ico-25 cap] ** 1**

~~~js
function factorial (num, result) {
  result = (!result ? 1 : res) * num--
  return num < 2 ? result : factorial(num, result)
}
~~~

![ico-25 cap] ** 2**

~~~js
function factorial (n, result = 1) {
  result *= n--
  return n < 2 ? result : factorial(n, result)
}
~~~

![ico-25 cap] ** 3**

~~~js
function factorial (n, result) {
  while (n > 1)
    return factorial(n - 1, n * (!result ? 1 : result))
  return result
}
~~~

![ico-25 cap] ** 4**

~~~js
function factorial (n, result = 1) {
  return n < 2 ? result : factorial(n - 1, n * result)
}
~~~

^^^

Щоб позбутися опціонального параметра, використовуємо замикання:

◘◘![ico-25 cap] ** 5**◘◘

~~~js
function factor (num) {
  var res = 1
  return (function fact () {
    res *= num
    return num < 2 ? res : fact (--num)
  })()
}
~~~

У JavaScript кожен виклик функції додає кадр виклику до стека

Коли виклик завершується, кадр видаляється зі стека

Однак рекурсивна функція не завершується одразу

Вона поверне рекурсивний виклик самої себе

[![ico-70 youtube]](https://www.youtube.com/watch?time_continue=2&v=nbqLBlanSMk)

Якщо хвостова рекурсія є достатньо глибокою, це може призвести до переповнення стека та генерації винятку ![ico-20 err] **~RangeError~**
^^Виняток **~RangeError~** виникає тоді, коли глибина рекурсії перевищує 10000^^

## ![ico-25 hw] Вправа⟪Exercise⟫

Проаналізуйте код функції **circle**

~~~js
var circle = function (radius) {
  var elem = document.createElement('div')
        document.body.appendChild ( elem )
        elem.style = `
             position: absolute;
             width: ${radius}px;
             height: ${radius}px;
             border-radius: 50%;
             border: solid 1px green;
        `
        if ( radius < 300 ) circle ( radius += 20 )
}
~~~
Викличте функцію **circle**

____________________________

※※※tests https://garevna.github.io/js-quiz/#recursion※※※
