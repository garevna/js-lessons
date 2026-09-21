# ![ico-30 study] Скорочена форма оголошення методів⟪Shorthand_syntax_for_declaring_methods⟫

**ES6**

______________________________________________________

![ico-25 icon] Скорочений синтаксис оголошення методів під час ініціалізації об’єкта:

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

![ico-20 warning] Замість

~~~js
sayHello: function () {
    console.log ( `Hello, ${ this.name }!` )
}
~~~

можна використовувати скорочену форму:

~~~js
sayHello () {
    console.log ( `Hello, ${ this.name }!` )
}
~~~

![ico-20 warning] Скорочений синтаксис допускає обчислювані імена властивостей

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