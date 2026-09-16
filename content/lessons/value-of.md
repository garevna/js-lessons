# ![ico-30 study] valueOf

{{s0.p1}}

{{s0.p2}}

{{s0.p3}}

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

{{s0.p4}}

~~~js
obj == 4
~~~

{{s0.p5}}

{{s0.p6}}

{{s0.p7}}

{{s0.p8}}

{{s0.p9}}

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

{{s0.p10}}

{{s0.p11}}


◘◘![ico-25 cap] ** 2 **◘◘


~~~js
Object.prototype.valueOf = function () {
  return 'Это объект, блин, а не игрушка!'
}
~~~

{{s0.p12}}

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

{{s0.p13}}

~~~js
test == 1 && test == 2 && test == 3
~~~

____________________

※※※tests ⟦f4⟧※※※
