const { createElem, createPath } = require('../helpers').default

const { getTestElement } = require('../templates').default

const { testStyles } = require('../styles').default

const getVariantTemplate = (choiceVariant, index) => `
  <input
    type="radio"
    id="choice-${index}"
    name="choice-variants"
    value=${choiceVariant}
  />
  <label for="choice-${index}">${choiceVariant}</label>
`

class TestComponent extends HTMLElement {
  constructor () {
    super ()

    const shadow = this.attachShadow({ mode: 'open' })
    createElem('style', shadow).textContent = testStyles

    Object.assign(this, {
      container: createElem('fieldset', shadow)
    })

    const table = Object.assign(createElem('table', this.container), { width: '100%' })
    const tr = createElem('tr', table)
    const td1 = Object.assign(createElem('td', tr), { width: '100%'})
    const td2 = createElem('td', tr)

    this.question = createElem('h4', td1)
    this.result = Object.assign(createElem('div', td2), {
      id: 'result'
    })
  }

  connectedCallback () {
    const [quizQuestion, variants, rightChoice] = ['quiz-question', 'choice-variants', 'right-choice']
      .map(attrName => this.getAttribute(attrName))
    Object.assign(this, { quizQuestion, variants, rightChoice })

    this.radios = this.container.getElementsByTagName('input')
    for (const elem of this.radios) {
      elem.onclick = function (event) {
        for (const elem of this.radios) {
          Object.assign(elem, {
            disabled: true,
            style: 'border-color: #999;'
          })
        }

        const right = event.target.value === this.rightChoice

        Object.assign(event.target.style, {
          background: right ? '#090' : '#f00',
          borderColor: right ? '#fff' : '#ff0'
        })

        Object.assign(this.result, {
          className: right ? 'success-result' : 'failure-result'
        })
      }.bind(this)
    }
  }

  static get observedAttributes () {
    return ['quiz-question', 'choice-variants', 'right-choice']
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
    switch (attrName) {
      case 'quiz-question':
        this.question.textContent = newVal
        break
      case 'right-choice':
        Object.assign(this, { rightChoice: newVal })
        break
      case 'choice-variants':
        this.variants = newVal ? JSON.parse(newVal) : []
        this.choices = this.variants
          .map((choiceVariant, index) => Object.assign(createElem('div', this.container), {
            innerHTML: getVariantTemplate(choiceVariant, index)
          }))
         break
      default:
        break
    }
  }
}

customElements.define('test-component', TestComponent)
