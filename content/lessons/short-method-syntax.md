# ![ico-30 study] {{p1}}

**ES6**

______________________________________________________

{{p2}}

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

{{p3}}

~~~js
sayHello: function () {
    console.log ( `Hello, ${ this.name }!` )
}
~~~

{{p4}}

~~~js
sayHello () {
    console.log ( `Hello, ${ this.name }!` )
}
~~~

{{p5}}

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