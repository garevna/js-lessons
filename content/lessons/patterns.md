# ![ico-30 study] Design Patterns

{{p1}}

{{p2}}

{{p3}}

{{p4}}

{{p5}}

________________________________________

@@@@

![](https://img.artlebedev.ru/everything/izdal/yazyk-shablonov/yazyk-shablonov-cover.jpg)
{{p6}}
{{p7}}
[%%%Gang of Four%%%](http://www.sugardas.lt/~p2d/books/Priemioop.pdf)
![](https://i.pinimg.com/originals/0b/c7/f0/0bc7f0c5ab814da316948fd2c9dd39aa.jpg)
{{p8}}
@@@@
_____________________________________________________

## ![ico-25 icon] {{p9}}

{{p10}}

{{p11}}

{{p12}}
{{p13}}
{{p14}}

{{p15}}

_____________________________________________________

## ![ico-25 icon] {{p16}}

{{p17}}

{{p18}}

{{p19}}

{{p20}}

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

{{p21}}

~~~js
media.showPicture()
~~~

{{p22}}
{{p23}}

{{p24}}

{{p25}}

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

{{p26}}

_____________________________________________________
