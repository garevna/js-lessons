# ![ico-30 icon] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

~~~js
var reader = new FileReader()
~~~

{{s1.p3}}


^^^[{{s1.spoiler1}}]
{{s1.p4}}
{{s1.p5}}
{{s1.p6}}
{{s1.p7}}
^^^


^^^[{{s1.spoiler2}}]

{{s1.p8}}

{{s1.p9}}

______________________________________

{{s1.p10}}


{{s1.p11}}
{{s1.p12}}
{{s1.p13}}

______________________________________

{{s1.p14}}

{{s1.p15}}
{{s1.p16}}
{{s1.p17}}

^^^

^^^[{{s1.spoiler3}}]


{{s1.p18}}
{{s1.p19}}
{{s1.p20}}
{{s1.p21}}
{{s1.p22}}
{{s1.p23}}

^^^

{{s1.p24}}

{{s1.p25}}

~~~js
const selector = document.body.appendChild(document.createElement('input'))
selector.type = 'file'

selector.onchange = function handleFiles (event) {
  fileReader.readAsDataURL(event.target.files[0])
  fileReader.onload = function (event) {
    picture.src = event.target.result
  }
}

var picture = document.body.appendChild(document.createElement('img'))

var fileReader = new FileReader()
~~~

{{s1.p26}}

~~~js
picture.src = URL.createObjectURL(selected)
~~~

____________________________________________________________

{{s1.p27}}

{{s1.p28}}

~~~js
const selector = document.body
  .appendChild(document.createElement('input'))

const [picture, header, demo] = ['img', 'h3', 'pre']
  .map(tagName => document.body.appendChild(document.createElement(tagName)))

const defauls = {
  method: 'readAsArrayBuffer',
  element: console,
  prop: 'log'
}

selector.type = 'file'

const types = {
  image: {
    method: 'readAsDataURL',
    element: picture,
    prop: 'src'
  },
  text: {
    method: 'readAsText',
    element: demo,
    prop: 'innerText'
  },
  application: {
    method: 'readAsText',
    element: demo,
    prop: 'innerText'
  }
}

selector.onchange = function handleFiles (event) {
  const selected = event.target.files[0]
  header.innerText = selected.type
  const type = selected.type.split('/')[0]

  const { method, element, prop } = Object.keys(types).includes(type)
    ? types[type]
    : defauls

  fileReader[method](selected)
  fileReader.onload = function (event) {
    typeof element[prop] === 'function'
      ? element[prop](event.target.result)
      : Object.assign(element, { [prop]: event.target.result })
  }
}

const fileReader = new FileReader()
~~~

_____________________________________________________

{{s1.p29}}

{{s1.p30}}

~~~js
const selector = document.body
  .appendChild(document.createElement('input'))

Object.assign(selector, {
  type: 'file',
  multiple: true,
  id: 'selectImages',
  style: 'display: none'
})

const label = document.body
  .appendChild(document.createElement('label'))

Object.assign(label, {
  htmlFor: 'selectImages',
  innerText: 'Select images'
})

selector.onchange = function (event) {
  for (const file of event.target.files) {
    if (file.type.split('/')[0] !== 'image') continue

    const picture = document.body
      .appendChild(document.createElement('img'))

    const fileReader = new FileReader()
    fileReader.onload = (image => function (e) {
      image.src = e.target.result
    })(picture)

    fileReader.readAsDataURL(file)
  }
}
~~~
