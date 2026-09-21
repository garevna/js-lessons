# ![ico-30 study] Краткая форма объявления методов⟪Shorthand_syntax_for_declaring_methods⟫

**ES6**

______________________________________________________

![ico-25 icon] Краткий синтаксис объявления методов при инициализации объекта:

~~~js
var user = {
    name: "Ivan",
    sayHello () {
        console.log ( `Hello, ${ this.name }!` )
    },
    sayBye () {
        console.log ( `Bye, ${ this.name }!` )
    }
}
user.sayHello ()
user.sayBye ()
~~~

![ico-20 warning] Вместо 

~~~js
sayHello: function () {
    console.log ( `Hello, ${ this.name }!` )
}
~~~

можно использовать краткую форму: 

~~~js
sayHello () {
    console.log ( `Hello, ${ this.name }!` )
}
~~~

![ico-20 warning] Краткий синтаксис допускает вычисляемые имена свойств

~~~js
var bag = {
    [ "thing" + 0 ]: "👜",
    thing1: function () { return '🌹' },
    thing2 () { return "🌸" },
    [ "thing" + 3 ] () { return "🍄" },
}
console.log ( bag.thing0 )
console.log ( bag.thing1 () )
console.log ( bag.thing2 () )
console.log ( bag.thing3 () )
~~~