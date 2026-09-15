# ![ico-30 study] Context

{{s0.p1}}

{{s0.p2}}

{{s0.p3}}
{{s0.p4}}

**{{common.c0}} 1**

~~~js
user.showContext = function () {
  console.log(this)
}
~~~

{{s0.p6}}

{{s0.p7}}

**{{common.c0}} 2**
~~~js
user.sayHello = () => console.log(this)
~~~
{{s0.p9}}

-------------------

{{s0.p10}}
~~~js
const boy = {
  name: 'Robert',
  showContext () {
    console.log(this)
  }
}
~~~
{{s0.p11}}
{{s0.p12}}

{{s0.p13}}
~~~js
const boy = {
  name: 'Robert',
  showContext: () => console.log(this)
}
~~~
{{s0.p14}}

-------------------

{{s0.p15}}

**sample 1**

{{s0.p16}}
{{s0.p17}}
{{s0.p18}}
{{s0.p19}}
{{s0.p20}}

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

**sample 2**

{{s0.p21}}
{{s0.p22}}
{{s0.p23}}
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

{{s0.p24}}
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
{{s0.p25}}
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

{{s0.p26}}

{{s0.p27}}
