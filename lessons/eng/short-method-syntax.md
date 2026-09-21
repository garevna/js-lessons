# ![ico-30 study] Shorthand syntax for declaring methods⟪Shorthand_syntax_for_declaring_methods⟫

**ES6**

______________________________________________________

![ico-25 icon] Shorthand syntax for declaring methods when initialising an object:

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

![ico-20 warning] Instead of

~~~js
sayHello: function () {
    console.log ( `Hello, ${ this.name }!` )
}
~~~

you can use the shorthand syntax:

~~~js
sayHello () {
    console.log ( `Hello, ${ this.name }!` )
}
~~~

![ico-20 warning] The shorthand syntax allows for evaluated property names

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