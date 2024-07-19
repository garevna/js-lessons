# ![ico-30 study] NaN / null / Infinity


## ![ico-25 icon] Значение NaN

**Тип данных ~number~**

Сокращение от **Not a Number** ( результат операции не является числом )

Можно получить в результате приведения типов, например:

~~~js
5 / "a"  --> NaN
"b" * 3  --> NaN
~~~

~NaN~ является свойством глобального объекта ( ~window~ )

~NaN~ также является свойством встроенного объекта ~Number~

![ico-20 warn] ~NaN~ не равен ничему, даже самому себе

~~~js
NaN === NaN            // false
NaN == NaN             // false
NaN >= NaN             // false
NaN <= NaN             // false
~~~

Для определения, является ли значением выражения ~NaN~,
можно использовать методы  ~isNaN()~  и  ~Number.isNaN()~

Их действие не идентично

~~~js
isNaN('привет')               //  true
Number.isNaN('привет')        //  false
Number.isNaN('привет' / 10)   //  true
~~~

^^~isNaN()~  возвращает ~true~, если после приведения типа аргумента к числу результат будет  ~NaN~^^

^^~Number.isNaN()~  возвращает ~true~, если аргумент имеет значение  ~NaN~ (приведения типа не происходит)^^

_____________________________________________________________

## ![ico-25 icon] Значение null

**Тип данных ~object~**

Специальное значение ~null~ означает "ничего"

![ico-20 warn] ~null~ может равняться только ~null~ или ( при нестрогом сравнении ) ~undefined~

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

## ![ico-25 icon] Значение Infinity

**Тип данных ~number~**

Значение, превышающее максимально возможное число с плавающей  запятой

Максимально возможное число с плавающей  запятой:

~1.7976931348623157E+10308~

Может быть отрицательным (~-Infinity~)

~Infinity~ может быть результатом деления на ноль отличного от нуля числа

~~~js
1 / 0            //  Infinity
~~~

Однако:

~~~js
0 / Infinity  // NaN

Infinity / Infinity  // NaN
Infinity - Infinity  // NaN

Infinity * Infinity  // Infinity
Infinity + Infinity  // Infinity
~~~

______________________________________________________________

[![ico-20 link] ^^w3schools^^](https://www.w3schools.com/jsref/jsref_infinity.asp)
