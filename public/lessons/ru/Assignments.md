# ![ico-35 study] Операторы присваивания

^^![ico-20 warn] не путайте оператор присваивания с оператором сравнения.^^

Типизация - это установка типа данных переменной.

^^^[typescript]
Когда вы будете изучать typescript, вы будете устанавливать тип данных явно при объявлении переменной, например:
~~~js
var ten: number = 10
~~~
В этом выражении после имени переменной через двоеточие указан тип данных number.
В результате такого объявления переменной **~ten~** уже невозможно присвоить значение другого типа, например, строку или логическое значение. Это приведет к ошибке на этапе компиляции. Компиляция - это перевод вашего кода с языка typescript в javascript.

В typescript есть специальные типы, такие как **~any~**, **~unknown~**, **~never~**, и много других интересных штук, с которыми вам предстоит познакомиться позднее.
^^^

В JS Мы имеем дело с **динамической типизацией**, когда тип данных переменной устанавливается в процессе присваивания значения.
Т.е. в правой части оператора присваивания находится **выражение**, значение которого движок должен вычислить и поместить в переменную, имя которой указано в правой части оператора присваивания.

Самый простой вид выражения - это константа, например, 10:

~~~js
var ten = 10
~~~

Константа 10 имеет тип данных **~number~**, и движок автоматически устанавливает тип данных **~number~** нашей переменной **~ten~**.

Но выражение может быть и более сложным:

~~~js
var ten = 20 - 5 * 2
~~~

Однако и в этом случае переменная **~ten~** почучит значение 10 и тип данных **~number~**.

~~~js
var human = {
  age: 25,
  employed: false,
  name: John
}
~~~

А в этом примере в правой части оператора присваивания находится выражение, в результате вычисления значения которого движок получит **ссылку** на объект. И эта ссылка станет значением переменной **~human~**. А вот тип данных переменной **~human~** при этом станет **~object~**.

Кроме обычного оператора присвания в нашем рапоряжении есть и еще и такие его формы, которые позволяют нам сократить выражение в правой части.

_________________________________________________________________

## ![ico-30 icon] Сокращенные формы присваивания

Пусть у нас есть переменная **~number~**:

~~~js
var number = 10
~~~

Мы можем использовать арифметические операторы (+, -, /, * и оператор взятия остатка от деления %) в таких выражениях:

~~~js
number = number + 8
~~~

или:

~~~js
number = number * 4
~~~

или:

~~~js
number = number / 2
~~~

или:

~~~js
number = number - 5
~~~

или:

~~~js
number = number % 4
~~~

Как мы видим, в каждом из таких выражений имя переменной появляется как в левой, так и в правой части оператора присваивания.
Такое дублирование несколько раздражает, не так ли?

Не лучше ли сократить такие формы присваивания следующим образом:

~~~js
number += 8
~~~

или:

~~~js
number *= 4
~~~

или:

~~~js
number /= 2
~~~

или:

~~~js
number -= 5
~~~

или:

~~~js
number %= 4
~~~

Согласитесь, что так намного удобнее?

§§§§ Demo | assignments_01_template §§§§

_________________________________________________________________

## ![ico-30 hw] Tests

~~~js
var alpha = 11, betta = 7, sigma = 2, number = NaN
~~~

◘◘** 1**◘◘

→→→ alpha -= sigma  | 7, 11, 9, NaN, 0, 2 | 9 →→→

◘◘** 2**◘◘

→→→ number += betta  | 7, 11, 9, NaN, 0, 2 | NaN →→→

◘◘** 3**◘◘

→→→ betta += sigma  | 7, 11, 9, NaN, 0, 2 | 9 →→→

◘◘** 4**◘◘

→→→ betta /= alpha  | 7, 11, 9, NaN, 1, 2 | 1 →→→

◘◘** 5**◘◘

→→→ alpha %= (sigma + 5)  | 0, 1, 2, 3, NaN | 2 →→→