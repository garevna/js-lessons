# ![ico-30 study] Custom elements

## ![ico-25 icon] lifecycle hooks

{{p1}}
{{p2}}
{{p3}}

### ![ico-20 icon] connectedCallback()

{{p4}}

### ![ico-20 icon] disconnectedCallback()

{{p5}}
{{p6}}

{{p7}}

{{p8}}

~~~js
window.onbeforeunload = function (event) {
  ...
  return '...'
}
~~~


### ![ico-20 icon] attributeChangedCallback()

{{p9}}

~~~js
attributeChangedCallback (attrName, oldVal, newVal) {
  ...
}
~~~

{{p10}}

{{p11}}

{{p12}}

{{p13}}

~~~js
static get observedAttributes () {
  return ['size', 'color']
}
~~~

{{p14}}

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

{{p15}}

~~~js
for (const x of ['blue', 'red', 'green', 'yellow']) {
  const elem = document.body
    .appendChild(document.createElement('circle-element'))

    elem.setAttribute('color', x)
    elem.setAttribute('size', Math.round(Math.random() * 200))
}
~~~

{{p16}}

{{p17}}

{{p18}}

~~~js
document
  .getElementsByTagName('circle-element')
  .setAttribute('color', 'magenta')
~~~

{{p19}}

{{p20}}

______________________________________________

{{p21}}
