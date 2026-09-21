# ![ico-30 study] Design Patterns⟪Design_Patterns⟫

If you need a bicycle, there’s no need to reinvent the wheel

Design patterns are ready-made ‘bicycle’ designs for various situations

The same problems often arise in software development, and many of these problems already have a ready-made solution template, as many people have already had to deal with a similar problem before you

To create a pattern, you need to formalise the problem, i.e. describe the essence of the problem using a formal language

The next step is to describe the principle behind solving this problem

________________________________________

@@@@

![](https://img.artlebedev.ru/everything/izdal/yazyk-shablonov/yazyk-shablonov-cover.jpg)
Christopher Alexander was the first to describe the concept of patterns
In the context of software development, this concept was ‘adapted’ by Erich Gamma, Richard Helm, Ralph Johnson and John Vlissides
[%%%Gang of Four%%%](http://www.sugardas.lt/~p2d/books/Priemioop.pdf)
![](https://i.pinimg.com/originals/0b/c7/f0/0bc7f0c5ab814da316948fd2c9dd39aa.jpg)
Their book **Design Patterns: Elements of Reusable Object-Oriented Software** (1995) describes 23 patterns in OOP
@@@@
_____________________________________________________

## ![ico-25 icon] Behavioural patterns⟪Behavioural_patterns⟫

The **iterator**, with which we are already familiar, is one such behavioural pattern

What general problem does this pattern solve?

Firstly, it provides a mechanism for sequential access to the elements of a data structure
Secondly, the iterator operates as a ‘black box’ – from the outside, it is not apparent exactly what it is iterating over until all iterations have been completed
Thirdly, the iterator mediates access to the data structure, specifying a strict order of operations on its elements

Finally, the data structure need not be a data structure at all – it could be a sequence of operations, function calls, etc.

_____________________________________________________

## ![ico-25 icon] Delegation⟪Delegation⟫

In the prototype model of inheritance, the mechanism of inheritance itself is, in essence, absent, as it is replaced by the mechanism of **delegation**

Indeed, what is a prototype? It is an object that is distinct from the object of which it is the prototype

Let’s create two objects: **proto** and **media**

and make the **proto** object the prototype of the **media** object

◘◘![ico-25 cap] ** 1**◘◘

~~~js
const proto = {
  showPicture () {
    document.body
      .appendChild(document.createElement('img'))
      .src = 'https://cdn.pixabay.com/photo/2014/04/04/10/51/darling-harbour-313216_960_720.jpg'
  }
}

const media = {
  sayHello () {
    document.body
      .appendChild(document.createElement('h3'))
      .innerText = 'Hello!'
  }
}

Object.setPrototypeOf(media, proto)
~~~

If we now call the **_showPicture_** method of the **media** object:

~~~js
media.showPicture()
~~~

then, in essence, we are delegating to the **proto** object what the **media** object cannot do,
as it does not have such a method

Therefore, the entire prototype chain is, in essence, a chain of delegation rather than inheritance

If we consider delegation as a design pattern in OOP, we can cite other examples as well

◘◘![ico-25 cap] ** 2**◘◘

~~~js
const media = {
  image: true,
  method () {
    document.body
      .appendChild(document.createElement('img'))
      .src = 'https://garevna.github.io/js-samples/images/js-ico.png'
  }
}

const speaker = {
  text: true,
  method () {
    document.body
      .appendChild(document.createElement('h3'))
      .innerText = 'Hello'
  }
}

const dispetcher = {
  workers: [speaker, media],
  getSignal (signal) {
    const worker = this.workers.find(worker => worker[signal])
    worker && worker.method()
  }
}
~~~

{{{pattern-1.js}}}

^^The advantages of delegation (prototype inheritance) compared to the classical inheritance model are clearly demonstrated^^ [^^Henry Lieberman^^](http://web.media.mit.edu/~lieber/Lieberary/OOP/Delegation/Delegation.html)

_____________________________________________________
