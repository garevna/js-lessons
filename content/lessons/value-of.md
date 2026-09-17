# ![ico-30 study] valueOf

{{p1}}

{{p2}}

{{p3}}

~~~js
var obj = {
  num: 5,
  val: 10,
  x: 11,
  valueOf: function () {
    return this.num + this.val - this.x
  }
}
~~~

{{p4}}

~~~js
obj == 4
~~~

{{p5}}

{{p6}}

{{p7}}

{{p8}}

{{p9}}

◘◘![ico-25 cap] ** 1 **◘◘

~~~js
var human = {
  name: 'Ivan',
  age: 25,
  valueOf: function () {
    return this.name + ': ' + this.age
  }
}

console.info(human + '!') // Ivan: 25!
~~~

___________________

{{p10}}

{{p11}}


◘◘![ico-25 cap] ** 2 **◘◘


~~~js
Object.prototype.valueOf = function () {
  return 'Это объект, блин, а не игрушка!'
}
~~~

{{p12}}

~~~js
console.info(Number + '')
~~~

~~~console
Это объект, блин, а не игрушка!
~~~

__________

◘◘![ico-25 cap] ** 3 **◘◘

~~~js
const test = {
  num: 0,
  valueOf: function () {
    return this.num += 1
  }
}
~~~

{{p13}}

~~~js
test == 1 && test == 2 && test == 3
~~~

____________________

※※※tests ⟦f4⟧※※※
