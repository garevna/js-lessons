# ![ico-30 study] Custom elements

## ![ico-25 icon] lifecycle hooks

{{s0.p1}}
{{s0.p2}}
{{s0.p3}}

### ![ico-20 icon] connectedCallback()

{{s0.p4}}

### ![ico-20 icon] disconnectedCallback()

{{s0.p5}}
{{s0.p6}}

{{s0.p7}}

{{s0.p8}}

~~~js
window.onbeforeunload = function (event) {
  ...
  return '...'
}
~~~


### ![ico-20 icon] attributeChangedCallback()

{{s0.p9}}

~~~js
attributeChangedCallback (attrName, oldVal, newVal) {
  ...
}
~~~

{{s0.p10}}

{{s0.p11}}

{{s0.p12}}

{{s0.p13}}

~~~js
static get observedAttributes () {
  return ['size', 'color']
}
~~~

{{s0.p14}}

#### ![ico-25 icon] {{common.c0}}

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

{{s1.p1}}

~~~js
for (const x of ['blue', 'red', 'green', 'yellow']) {
  const elem = document.body
    .appendChild(document.createElement('circle-element'))

    elem.setAttribute('color', x)
    elem.setAttribute('size', Math.round(Math.random() * 200))
}
~~~

{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

~~~js
document
  .getElementsByTagName('circle-element')
  .setAttribute('color', 'magenta')
~~~

{{s1.p5}}

{{s1.p6}}

______________________________________________

{{s1.p7}}
