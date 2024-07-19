const section = document.body

const tags = ['figure', 'div', 'h3', 'img']
const attrs = [
  { id: 'figure-blue', style: 'padding: 48px; background: #09b;' },
  { id: 'figure-yellow', style: 'padding: 16px; background: #fa0;' },
  { style: 'color: #fff; font-family: Arial; font-weight: bold', innerText: 'Welcome, students!' },
  { src: 'https://pictogrammers.com/images/libraries/mdi.svg', width: 64 }
]

const parents = [null, 'figure-blue', 'figure-yellow', 'figure-yellow']

tags.forEach((tag, index) => setTimeout(() => {
  const container = parents[index] ? section.parentNode.getElementById(parents[index]) : section
  const elem = container.appendChild(document.createElement(tag))
  Object.assign(elem, attrs[index])
}, index * 100))
