# ![ico-30 study] NaN / null / Infinity⟪NaN_/_null_/_Infinity⟫


## ![ico-25 icon] Значення NaN⟪The_value_NaN⟫

**Тип даних ~number~**

Скорочення від **Not a Number** (результат операції не є числом)

Може бути отримано в результаті приведення типів, наприклад:

~~~js
5 / "a"  --> NaN
"b" * 3  --> NaN
~~~

~NaN~ є властивістю глобального об’єкта (~window~)

~NaN~ також є властивістю вбудованого об’єкта ~Number~

![ico-20 warn] ~NaN~ не дорівнює нічому, навіть самому собі

~~~js
NaN === NaN            // false
NaN == NaN             // false
NaN >= NaN             // false
NaN <= NaN             // false
~~~

Щоб визначити, чи є ~NaN~ значенням виразу,
можна використовувати методи  ~isNaN()~  та  ~Number.isNaN()~

Їхня дія не є ідентичною

~~~js
isNaN('привет')               //  true
Number.isNaN('привет')        //  false
Number.isNaN('привет' / 10)   //  true
~~~

^^~isNaN()~  повертає ~true~, якщо після приведення типу аргументу до числа результат буде  ~NaN~^^

^^~Number.isNaN()~  повертає ~true~, якщо аргумент має значення  ~NaN~ (приведення типу не відбувається)^^

_____________________________________________________________

## ![ico-25 icon] Значення null⟪The_value_null⟫

**Тип даних ~object~**

Спеціальне значення ~null~ означає «нічого»

![ico-20 warn] ~null~ може дорівнювати лише ~null~ або (при нестрогому порівнянні) ~undefined~

~~~js      
null == null              // true
null === null             // true
null == undefined         // true
null === undefined        // false
null == 0                 // false
null == NaN               // false
null == false             // false
null == ''                // false
null == []                // false
~~~

_____________________________________________________________

## ![ico-25 icon] Значення Infinity⟪The_value_Infinity⟫

**Тип даних ~number~**

Значення, що перевищує максимально можливе число з плаваючою  комою

Максимально можливе число з плаваючою  комою:

~1.7976931348623157E+10308~

Може бути від’ємним (~-Infinity~)

~Infinity~ може бути результатом ділення на нуль числа, відмінного від нуля

~~~js
1 / 0            //  Infinity
~~~

Однак:

~~~js
0 / Infinity  // NaN

Infinity / Infinity  // NaN
Infinity - Infinity  // NaN

Infinity * Infinity  // Infinity
Infinity + Infinity  // Infinity
~~~

______________________________________________________________

[![ico-20 link] ^^w3schools^^](https://www.w3schools.com/jsref/jsref_infinity.asp)
