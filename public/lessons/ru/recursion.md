# ![ico-30 study] Рекурсия

Рекурсия - это процесс, в котором функция вызывает сама себя, прямо или косвенно

Рекурсивная функция в функциональном программировании является более "чистой" альтернативой циклу

![ico-20 warn] Каждая рекурсивная функция должна иметь условие прерывания рекурсии
В противном случае вызов функции приведет к бесконечному циклу

**Хвостовая рекурсия** - это когда последним исполняемым оператором рекурсивной функции будет оператор  **_return_** с вызовом этой же функции

Простейший ( классический ) пример рекурсии - вычисление факториала

^^^[Вычисление факториала]

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

Для того, чтобы избавиться от опционального параметра, используем замыкание:

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

В JavaScript каждый вызов функции добавит кадр вызова в стек

Когда вызов завершается, кадр удаляется из стека

Однако рекурсивная функция не завершается сразу

Она вернет рекурсивный вызов самой себя

[![ico-70 youtube]](https://www.youtube.com/watch?time_continue=2&v=nbqLBlanSMk)

Если хвостовая рекурсия достаточно глубокая, это может привести к переполнению стека и генерации исключения ![ico-20 err] **~RangeError~**
^^Исключение **~RangeError~** возникает тогда, когда глубина рекурсии превышает 10000^^

## ![ico-25 hw] Упражнение

Разберите код функции **circle**

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
Вызовите функцию **circle**

____________________________

[![ico-30 hw] **Тесты**](https://garevna.github.io/js-quiz/#recursion)
