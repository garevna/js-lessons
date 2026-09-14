# ![ico-30 study] Context

Let’s discuss the call context of ordinary and arrow functions

The default call context of an ordinary function is set at the time of its declaration, but can be changed at the time of the call using the methods ~call~ or ~apply~

However, to declare an ordinary function, we can use ~function declaration~ or ~function expression~
The second is an assignment, as a result of which the default call context is determined by the left-hand side:

**Example 1**

~~~js
user.showContext = function () {
  console.log(this)
}
~~~

Here, we have defined the context on the left-hand side of the assignment operator; that is, the call context is ~user~

The context of an arrow function is established at the moment of its declaration, and assignment does not change its context, as it is already clearly defined – it is the context in which it was created (the right-hand side of the assignment statement):

**Example 2**
~~~js
user.sayHello = () => console.log(this)
~~~
Here, ~user.sayHello~ already has a global context 😉

-------------------

When we declare a method using shorthand syntax, i.e. like this:
~~~js
const boy = {
  name: 'Robert',
  showContext () {
    console.log(this)
  }
}
~~~
then an assignment takes place when the right-hand side is a regular function and the left-hand side is ~boy.showContext~
thus, **Example 1** applies

If, on the other hand, we use an arrow function:
~~~js
const boy = {
  name: 'Robert',
  showContext: () => console.log(this)
}
~~~
then **Example 2** applies

-------------------

If you’ve got the hang of the previous bit, let’s dive deeper 😂

**sample 1**

In this example, the method ~create~ of the object ~user~ is created using the shorthand syntax for method declarations (**Example 1**)
As a result, the call context for this method is ~user~
The method ~create~ returns an object containing the method ~showContext~
The context of the method call ~user~ is from **Example 2**, i.e. ~create~, since it is precisely in this context that the method ~showContext~, which creates it, operates
Thus, the timer’s callback is an arrow function that is ‘born’ in the context ~user~

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

In this example, the method ~showContext~ is declared using the concise method declaration syntax (**Example 1**)
Thus, the call context is the context of the object returned by the method ~create~ (the object named _Jeck_)
The timer’s callback receives this context
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

Make a ‘small’ change to the code in the first example that alters the call context of the ~create~ method – and you’re now in the global object
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
However, in **sample 2**, the timer’s callback will still see the same context
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

Well, and so on

Have a play around – it’s useful for gaining a deeper understanding of the call context 😉
