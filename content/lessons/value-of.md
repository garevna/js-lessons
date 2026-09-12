# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

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

{{s1.p4}}

~~~js
obj == 4
~~~

{{s1.p5}}

{{s1.p6}}

{{s1.p7}}

{{s1.p8}}

{{s1.p9}}

{{s1.p10}}

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

{{s1.p11}}

{{s1.p12}}


{{s1.p13}}


~~~js
Object.prototype.valueOf = function () {
  return 'Это объект, блин, а не игрушка!'
}
~~~

{{s1.p14}}

~~~js
console.info(Number + '')
~~~

~~~console
Это объект, блин, а не игрушка!
~~~

__________

{{s1.p15}}

~~~js
const test = {
  num: 0,
  valueOf: function () {
    return this.num += 1
  }
}
~~~

{{s1.p16}}

~~~js
test == 1 && test == 2 && test == 3
~~~

____________________

{{s1.p17}}
