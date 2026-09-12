# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

______________________________________________________

{{s1.p2}}

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

{{s1.p3}}

~~~js
sayHello: function () {
    console.log ( `Hello, ${ this.name }!` )
}
~~~

{{s1.p4}}

~~~js
sayHello () {
    console.log ( `Hello, ${ this.name }!` )
}
~~~

{{s1.p5}}

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