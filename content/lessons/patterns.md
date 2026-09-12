# ![ico-30 study] Design Patterns

{{s0.p1}}

{{s0.p2}}

{{s0.p3}}

{{s0.p4}}

{{s0.p5}}

________________________________________

@@@@

![](https://img.artlebedev.ru/everything/izdal/yazyk-shablonov/yazyk-shablonov-cover.jpg)
{{s0.p6}}
{{s0.p7}}
[%%%Gang of Four%%%](http://www.sugardas.lt/~p2d/books/Priemioop.pdf)
![](https://i.pinimg.com/originals/0b/c7/f0/0bc7f0c5ab814da316948fd2c9dd39aa.jpg)
{{s0.p8}}
@@@@
_____________________________________________________

## ![ico-25 icon] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}
{{s1.p4}}
{{s1.p5}}

{{s1.p6}}

_____________________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}

{{s2.p4}}

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

{{s2.p5}}

~~~js
media.showPicture()
~~~

{{s2.p6}}
{{s2.p7}}

{{s2.p8}}

{{s2.p9}}

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

{{s2.p10}}

_____________________________________________________
