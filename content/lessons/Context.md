# ![ico-30 study] Context

{{p1}}

{{p2}}

{{p3}}
{{p4}}

**{{common.c0}} 1**

~~~js
user.showContext = function () {
  console.log(this)
}
~~~

{{p5}}

{{p6}}

**{{common.c0}} 2**
~~~js
user.sayHello = () => console.log(this)
~~~
{{p7}}

-------------------

{{p8}}
~~~js
const boy = {
  name: 'Robert',
  showContext () {
    console.log(this)
  }
}
~~~
{{p9}}
{{p10}}

{{p11}}
~~~js
const boy = {
  name: 'Robert',
  showContext: () => console.log(this)
}
~~~
{{p12}}

-------------------

{{p13}}

**sample 1**

{{p14}}
{{p15}}
{{p16}}
{{p17}}
{{p18}}

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

{{p19}}
{{p20}}
{{p21}}
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

{{p22}}
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
{{p23}}
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

{{p24}}

{{p25}}
