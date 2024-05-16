const innerText = 'Hello'
const addElem = tagName => document.body.appendChild(document.createElement(tagName))

const target = Object.assign(addElem('h2'), {
    innerText,
    style: 'color: #09b; font-family: Arial;'
})

const input = Object.assign(addElem('h3'), {
    innerText,
    contentEditable: true,
    style: `
      padding: 8px 16px;
      border: solid 1px #999;
      border-radius: 4px;
      font-family: Arial;
      color: #f50;
      outline: none;
      max-width: 360px;
    `
})
 
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    mutation.type === 'characterData'
      ? target.innerText = mutation.target.data
      : null
  })   
})
 
const config = {
  attributes: true,
  childList: true,
  characterData: true,
  attributeOldValue: true,
  characterDataOldValue: true,
  subtree: true
}

const comment = Object.assign(addElem('p'), {
    style: 'font-family: Arial; color: #999; font-size: 12px;',
    innerText: 'Введите любой текст в нижнее поле (оранжевый текст)\nи отслеживайте изменения в верхнем (синий текст)'
})

observer.observe(input, config)