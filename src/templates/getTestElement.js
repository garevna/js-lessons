function testSelected (event) {
  ;['choice-1', 'choice-2', 'choice-3']
    .forEach(id => Object.assign(document.getElementById(id), {
      disabled: true,
      style: 'border-color: #999;'
    }))
  event.target.style.background = event.target.value === rightChoice
    ? '#090'
    : '#f00'
}

const getVariantTemplate = (choiceVariant, index) => `
  <input
    type="radio"
    id="choice-${index}"
    name="choice-variants"
    value=${choiceVariant}
  />
  <label for="choice-${index}">${choiceVariant}</label>
`

export const getTestElement = (quest, choiceVariants, rightChoice) => {
  console.log(choiceVariants)
  const container = document.createElement('fieldset')
  container.appendChild(document.createElement('legend')).textContent = quest

  const choices = choiceVariants.map((choiceVariant, index) => Object.assign(document.createElement('div'), {
    innerHTML: getVariantTemplate(choiceVariant, index)
  }))

  const radios = container.getElementsByTagName('input')
  console.log(radios)

  radios.forEach(radio => Object.assign(radio, {
    onclick: testSelected
  }))

  return container
}
