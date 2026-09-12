# {{s1.h1}}

## {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

~~~js
const innerText = 'Hello'

function addElem (tagName, container = document.body) {
  return container.appendChild(document.createElement(tagName))
}

const target = Object.assign(addElem('h2'), {
  innerText,
  style: 'color: #09b; font-family: Arial'
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
    mutation.type === 'characterData' && Object.assign(target, {
      innerText: mutation.target.data
    })
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

observer.observe(input, config)
~~~

{{s2.p3}}

{{{DOM-MutationObserver-1.js}}}
