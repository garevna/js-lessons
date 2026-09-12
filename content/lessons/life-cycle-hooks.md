# ![ico-30 study] {{s1.h1}}

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}
{{s2.p3}}

### ![ico-20 icon] {{s3.h1}}

{{s3.p1}}

### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}
{{s4.p2}}

{{s4.p3}}

{{s4.p4}}

~~~js
window.onbeforeunload = function (event) {
  ...
  return '...'
}
~~~


### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}

~~~js
attributeChangedCallback (attrName, oldVal, newVal) {
  ...
}
~~~

{{s5.p2}}

{{s5.p3}}

{{s5.p4}}

{{s5.p5}}

~~~js
static get observedAttributes () {
  return ['size', 'color']
}
~~~

{{s5.p6}}

#### ![ico-25 icon] {{s6.h1}}

~~~~js
class CircleElement extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.appendChild(document.createElement('div'))
  }

  connectedCallback () {
    this.createStyle ()
  }

  static get observedAttributes () {
    return [ 'size', 'color']
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
    this.setStyle ()
  }

  createStyle () {
    this.shadowStyles = document.createElement('style')
    this.shadow.appendChild(this.shadowStyles)
    this.shadowStyles.appendChild(document.createTextNode(''))
  }

  setStyle () {
    this.shadowStyles.textContent = `
      div {
        width: ${this.getAttribute("size")}px;
        height: ${this.getAttribute("size")}px;
        border: inset 1px;
        border-radius: 50%;
        box-shadow: 3px 3px 5px #00000090;
        background-color: ${this.getAttribute("color")};
      }
      div:hover {
        box-shadow: inset 3px 3px 5px #00000090;
      }
    `
  }
}

customElements.define('circle-element', CircleElement)
~~~~

{{s6.p1}}

~~~js
for (const x of ['blue', 'red', 'green', 'yellow']) {
  const elem = document.body
    .appendChild(document.createElement('circle-element'))

    elem.setAttribute('color', x)
    elem.setAttribute('size', Math.round(Math.random() * 200))
}
~~~

{{s6.p2}}

{{s6.p3}}

{{s6.p4}}

~~~js
document
  .getElementsByTagName('circle-element')
  .setAttribute('color', 'magenta')
~~~

{{s6.p5}}

{{s6.p6}}

______________________________________________

{{s6.p7}}
