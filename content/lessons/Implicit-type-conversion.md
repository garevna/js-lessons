# ![ico-30 study] {{common.type_coercion}}

{{intro_1}}
{{intro_2}}
{{intro_3}}
___

## ![ico-25 icon] {{implicit_type_coercion}}

{{expression_1}}

•••• none
{{expression_2}}
{{expression_3}}
{{expression_4}}
••••

### ![ico-25 hw] {{common.tests}} 1

~~~tests
→→→ 40 / 2 * 5 | 100, 4 | 100 →→→
→→→ 40 / (2 * 5) | 100, 4 | 4 →→→
→→→ 10 - 2 * 5 + 4 | 44, 4 | 4 →→→
→→→ (10 - 2) * 5 + 4 | 72, 44, 4 | 44 →→→
→→→ (10 - 2) * (5 + 4) | 72, 44, 4 | 72 →→→
~~~

{{expression_5}}

### ![ico-20 icon] {{to_string}}

{{to_string_1}}

~~~demo
> var user = { name: 'Piter', age: 25 }
< undefined
> user + ''
< '[object Object]'
> var numbers = [1, 2, 3, 4, 5]
< undefined
> numbers + ''
< '1,2,3,4,5'
~~~

{{to_string_2}}

~~~demo
> var user = { name: 'Piter', age: 25 }
< undefined
> user > 5
< false
> user < 5
< false
> user == 5
< false
> user == '[object Object]'
< true
> user === '[object Object]'
< false
> var numbers = [1, 2, 3, 4, 5]
< undefined
> numbers == '1,2,3,4,5'
< true
> numbers === '1,2,3,4,5'
< false
> var sample = [5]
< undefined
> sample == 5
< true
> sample == '5'
< true
~~~

{{to_string_3}}

~~~js
a - b
a * b
a / b
a % b
~~~

{{to_string_4}}

~~~demo
> 20 - '5'
< 15
> '100' - 5
< 95
> '100' / '20'
< 5
> '100' % '3'
< 1
~~~

{{to_string_5}}

~~~demo
> 20 + 5 + '5'
< 255
> '100' - 5 + 'px'
< '95px'
> 100 / '20' + 5 + ''
< '10'
~~~

◘◘![ico-25 cap] **1**◘◘

~~~js
var height = 72
var padding = 20
var illegal = 'height: ' + height + padding * 2 + 'px'
var legal = 'height: ' + (height + padding * 2) + 'px'
~~~

~~~demo
> illegal
< 'height: 7240px'
> legal
< 'height: 112px'
~~~

___

### ![ico-25 hw] {{common.tests}} 2

~~~tests
→→→ 2 - '10' + '8' | '0', 0, '-88' | -88 →→→
→→→ 2 + '10' - '200' | 2, 10, '210' | 10 →→→
→→→ '5' + '20' / '20' | 0, 20, '51' | 51 →→→
→→→ '5' - '20' / '20' | '5', '20', 0, 4 | 4 →→→
→→→ ('5' - '2') * '10' | 30, -15, 0 | 30 →→→
→→→ '5' - '2' * '10' | 30, -15, 10 | -15 →→→
~~~

___

### ![ico-20 icon] {{to_number}}

{{to_number_1}}

~~~demo
> '8' / 2
< 4
> '5' * '2'
< 10
> '5' - '3'
< 2
> '5' % '3'
< 2
> +'5' + +'3'
< 8
~~~

{{to_number_2}}

~~~demo
> var x = '', y = x / 5
< undefined
> x == 0
< true
> y
< 0
> var x = [], y = x / 5
< undefined
> x == 0
< true
> y
< 0
~~~

{{to_number_3}}

~~~demo
> +''
< 0
> +[]
< 0
> +[] + ''
< '0'
~~~

{{to_number_4}}

~~~demo
> 0 - undefined
< NaN
> 0 + null
< 0
> undefined == null
< true
> 1 == (undefined == null)
< true
~~~

{{to_number_5}}

~~~demo
> var a = false, b = true
< undefined
> a == 0
< true
> b == 1
< true
> a + b
< 1
~~~

{{to_number_6}}

~~~demo
> a = false, b = undefined
< undefined
> a > b
< false
> a < b
< false
> a == b
< false
> a = true, b = null
< null
> a > b
< true
> a < b
< false
> a == b
< false
~~~

___

### ![ico-20 icon] {{array_as_operand}}

{{array_as_operand_1}}

~~~demo
> 20 + 5 + []
< '25'
> 20 + 5 + [0]
< '250'
> 20 + 5 + [0, 5]
< '250,5'
> 20 + 5 + [0, 5, 4]
< '250,5,4'
~~~

{{array_as_operand_2}}

~~~demo
> 20 + '5' - []
< 205
> 20 + '5' - [3]
< 202
> 20 + '5' - ['5']
< 200
> 20 + '5' - [3, 0]
< NaN
~~~

___

### ![ico-25 hw] {{common.tests}} 3

~~~tests
→→→ 5 + [8] | 13, '58' | 58 →→→
→→→ 5 * [8] | 40, NaN, 0 | 40 →→→
→→→ '5' % ['8'] | 0, NaN, 5 | 5 →→→
→→→ 5 * [8, 0] | 40, NaN, 0 | NaN →→→
→→→ ['8'] - '5' | 3, NaN, 0 | 3 →→→
→→→ [] + false | 'false', NaN, 0 | false →→→
→→→ [4] + NaN | '4NaN', NaN, 0 | 4NaN →→→
→→→ ({} + []) | '', '[object Object]', NaN, 0 | [object Object] →→→
→→→ [1] + [2] + [3] | 6, '123', NaN, 0 | 123 →→→
→→→ [5] - [4] / [2] | 5, 3, '542', NaN, Infinity | 3 →→→
→→→ [5] * [4] / [2] | 5, 10, '542', NaN, undefined | 10 →→→
→→→ ([5] - [4]) / [2] | 5, 0.5, NaN, Infinity | 0.5 →→→
→→→ ([5] + [0] - [10]) / [2] | 5, 50, 20, NaN, 0 | 20 →→→
~~~

___

{{array_as_operand_3}}

~~~demo
> +['8'] + 5
< 13
> null + +[4]
< 4
> +[5] + null
< 5
~~~

___

### ![ico-20 icon] {{to_boolean}}

{{to_boolean_1}}

{{to_boolean_2}}

^^^[{{to_boolean_3}}]

{{to_boolean_4}}

~~~demo
> true && false && null
< false
> true && '5' && null
< null
> true && [] && null
< null
~~~

^^{{to_boolean_5}}^^

~~~demo
> true && ![] && null
< false
~~~

{{to_boolean_6}}

~~~demo
> true && true && true && true
< true
~~~

{{to_boolean_7}}

^^^

^^^[{{to_boolean_8}}]

{{to_boolean_9}}

{{to_boolean_10}}

~~~demo
> null || false || 5 || ''
< 5
> null || '' || 0 || 4 || 10
< 4
> null || false || undefined || ''
< ''
~~~

{{to_boolean_11}}

{{to_boolean_12}}
{{to_boolean_13}}
{{to_boolean_14}}
{{to_boolean_15}}

{{to_boolean_16}}

^^^

^^^[{{to_boolean_17}}]

{{to_boolean_18}}

~~~js
var x = null
var y = !!x        // false

var x = undefined
var y = !!x        // false

!![]              // true
!!+[]             // false
~~~

^^^

___

### ![ico-20 hw] {{common.tests}}

~~~tests
→→→ [5] - [3] | '5', '3', 2, NaN | 2 →→→
→→→ [true] + 8 | 'true8', 9, 8, NaN | true8 →→→
→→→ [true] - 8 | 'true8', -7, 8, NaN | NaN →→→
→→→ [9] - 8 | 1, 9, 8, '9-8', NaN | 1 →→→
→→→ !!{} + 2 | 0, 2, 3, true, NaN | 3 →→→
→→→ [5] - true | 5, 4, 0, true, NaN | 4 →→→
→→→ [!!{}] || true | [true], true, NaN | [true] →→→
→→→ [!!{} + 2] || true | [3], 4, true, '3true', NaN | [3] →→→
→→→ true && [!!{} + 4] | [5], 5, 4, true, NaN | [5] →→→
→→→ 5 && [[] + 4] | '54', 5, 4, ['4'], NaN | ['4'] →→→
→→→ !!{} > !![] | true, {}, [false], false, NaN | false →→→
→→→ !!{} === !![] | true, {}, [false], false, NaN | true →→→
→→→ !!{} && ![] === !![5] | true, false, NaN | false →→→
→→→ '80' - null + true | '80', null, true, false, 81, NaN | 81 →→→
→→→ '80' - null + true + [] | '80', null, true, false, '81', NaN | 81 →→→
→→→ '80' - !![] | '80', 79, NaN | 79 →→→
→→→ !{} * 50 + +[10] | 50, 10, NaN, false | 10 →→→
→→→ !!{}* 50 + +[20] | 0, 50, 20, 70, NaN | 70 →→→
→→→ !!{} * 50 && +[20] | 0, 50, 20, 70, NaN | 20 →→→
~~~

___

[![ico-20 link] ^^w3schools^^](https://www.w3schools.com/jsref/jsref_infinity.asp)
[![ico-20 link] ^^Equality in JavaScript^^](https://dorey.github.io/JavaScript-Equality-Table/unified/)
