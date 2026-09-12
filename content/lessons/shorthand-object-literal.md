# ![ico-30 study] {{s1.h1}}

{{s1.p1}}
________________________________________________

{{s1.p2}}

~~~js
let name = "Ivan", age = 25
let user = { name, age }

console.log ( user )
~~~

{{s1.p3}}

~~~console

► { name: "Ivan", age: 25 }
~~~

{{s1.p4}}

{{s1.p5}}

~~~js
let name = "Ivan", age = 25
let hobby = [ "football", "fishing" ],
    family = {
        mother: { name: "Mary", age: 50 },
        father: { name: "Stephan", age: 52 }
    }

let user = { name, age, hobby, family }

hobby.push ( "maps" )
family.sister = { name: "Helen", age: 20 }

console.log ( user )
~~~

{{s1.p6}}

~~~console

▼ { name: "Ivan", age: 25, hobby: Array(3), family: {…} }
    age: 25
  ▼ family:
      ► father: {name: "Stephan", age: 52}
      ► mother: {name: "Mary", age: 50}
      ► sister: {name: "Helen", age: 20}
      ► __proto__: Object
  ► hobby: (3) ["football", "fishing", "maps"]
    name: "Ivan"
  ► __proto__: Object
~~~