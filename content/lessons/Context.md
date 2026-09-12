# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}
{{s1.p4}}

{{s1.p5}}

~~~js
user.showContext = function () {
  console.log(this)
}
~~~

{{s1.p6}}

{{s1.p7}}

{{s1.p8}}
~~~js
user.sayHello = () => console.log(this)
~~~
{{s1.p9}}

-------------------

{{s1.p10}}
~~~js
const boy = {
  name: 'Robert',
  showContext () {
    console.log(this)
  }
}
~~~
{{s1.p11}}
{{s1.p12}}

{{s1.p13}}
~~~js
const boy = {
  name: 'Robert',
  showContext: () => console.log(this)
}
~~~
{{s1.p14}}

-------------------

{{s1.p15}}

{{s1.p16}}

{{s1.p17}}
{{s1.p18}}
{{s1.p19}}
{{s1.p20}}
{{s1.p21}}

~~~js
const user = {
  name: 'Henry',
  create () {
    return {
      name: 'Jeck',
      showContext: () => setTimeout(() => console.log(this))
    }
  }
}

user.create().showContext()  // { name: 'Henry', create: ƒ }
~~~

{{s1.p22}}

{{s1.p23}}
{{s1.p24}}
{{s1.p25}}
~~~js
const user = {
  name: 'Henry',
  create () {
    return {
      name: 'Jeck',
      showContext () { setTimeout(() => console.log(this)) }
    }
  }
}

user.create().showContext()  // { name: 'Jeck', showContext: ƒ }
~~~

{{s1.p26}}
~~~js
const user = {
  name: 'Henry',
  create: () => {
    return {
      name: 'Jeck',
      showContext: () => setTimeout(() => console.log(this))
    }
  }
}
~~~
{{s1.p27}}
~~~js
const user = {
  name: 'Henry',
  create: () => {
    return {
      name: 'Jeck',
      showContext () { setTimeout(() => console.log(this)) }
    }
  }
}
~~~

{{s1.p28}}

{{s1.p29}}
