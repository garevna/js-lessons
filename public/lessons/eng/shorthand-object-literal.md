# ![ico-30 study] Shorthand form of an object literal

**ES6**
________________________________________________

![ico-25 cap] **Example 1**

~~~js
let name = "Ivan", age = 25
let user = { name, age }

console.log ( user )
~~~

**console**

~~~console

► { name: "Ivan", age: 25 }
~~~

![ico-25 cap] **Example 2**

Remember that arrays and objects are passed by reference

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

**console**

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