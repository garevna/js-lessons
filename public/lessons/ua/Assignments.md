# ![ico-35 study] Оператори присвоювання

^^![ico-20 warn] не плутайте оператор присвоювання з оператором порівняння.^^

Типізація - це встановлення типу даних змінної.

^^^[typescript]
Коли ви будете вивчати typescript, ви будете встановлювати тип даних явно під час оголошення змінної, наприклад:
~~~js
var ten: number = 10
~~~
У цьому виразі після імені змінної через двокрапку вказано тип даних **number**.
У результаті такого оголошення змінній **~ten~** уже неможливо присвоїти значення іншого типу, наприклад, рядок або логічне значення. Це призведе до помилки на етапі компіляції. Компіляція - це переклад вашого коду з мови typescript у javascript.

У typescript є спеціальні типи, такі як **~any~**, **~unknown~**, **~never~**, і багато інших цікавих штук, з якими вам доведеться познайомитися пізніше.
^^^

У JS ми маємо справу з **динамічною типізацією**, коли тип даних змінної встановлюється в процесі присвоювання значення.
Тобто в правій частині оператора присвоювання міститься **вираз**, значення якого движок має обчислити і помістити у змінну, ім'я якої вказано у лівій частині оператора присвоювання.

Найпростіший вид виразу - це константа, наприклад, 10:

~~~js
var ten = 10
~~~

Константа 10 має тип даних **~number~**, і движок автоматично встановлює тип даних **~number~** нашій змінній **~ten~**.

Але вираз може бути і більш складним:

~~~js
var ten = 20 - 5 * 2
~~~

Однак і в цьому випадку змінна **~ten~** отримає значення 10 і тип даних **~number~**.

~~~js
var human = {
  age: 25,
  employed: false,
  name: John
}
~~~

А в цьому прикладі в правій частині оператора присвоювання міститься вираз, у результаті обчислення значення якого движок отримає **посилання** на об'єкт. І це посилання стане значенням змінної **~human~**. А ось тип даних змінної **~human~** при цьому стане **~object~**.

Крім звичайного оператора присвоювання в нашому розпорядженні є ще й такі його форми, які дають нам змогу скоротити вираз у правій частині.

_________________________________________________________________

## ![ico-30 icon] Скорочені форми присвоювання

Нехай у нас є змінна **~number~**:

~~~js
var number = 10
~~~

Ми можемо використовувати арифметичні оператори (+, -, /, * та оператор взяття залишку від ділення %) у таких виразах:

~~~js
number = number + 8
~~~

або:

~~~js
number = number * 4
~~~

або:

~~~js
number = number / 2
~~~

або:

~~~js
number = number - 5
~~~

або:

~~~js
number = number % 4
~~~

Як ми бачимо, у кожному з таких виразів ім'я змінної з'являється як у лівій, так і в правій частині оператора присвоювання.
Таке дублювання дещо дратує, чи не так?

Чи не краще скоротити такі форми присвоювання таким чином:

~~~js
number += 8
~~~

або:

~~~js
number *= 4
~~~

або:

~~~js
number /= 2
~~~

або:

~~~js
number -= 5
~~~

або:

~~~js
number %= 4
~~~

Погодьтеся, що так набагато зручніше?

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