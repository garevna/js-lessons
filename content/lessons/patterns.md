# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

{{s1.p5}}

________________________________________

@@@@

![](https://img.artlebedev.ru/everything/izdal/yazyk-shablonov/yazyk-shablonov-cover.jpg)
{{s1.p6}}
{{s1.p7}}
{{s1.p8}}
![](https://i.pinimg.com/originals/0b/c7/f0/0bc7f0c5ab814da316948fd2c9dd39aa.jpg)
{{s1.p9}}
@@@@
_____________________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}
{{s2.p4}}
{{s2.p5}}

{{s2.p6}}

_____________________________________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

{{s3.p3}}

{{s3.p4}}

{{s3.p5}}

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

{{s3.p6}}

~~~js
media.showPicture()
~~~

{{s3.p7}}
{{s3.p8}}

{{s3.p9}}

{{s3.p10}}

{{s3.p11}}

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

{{s3.p12}}

_____________________________________________________
