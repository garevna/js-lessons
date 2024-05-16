const section = document.body

section.style['letterSpacing'] = '2px'

document.body
  .innerHTML = JSON.stringify(['first', 'second', 'third', 'fourth']
    .reduce((res, item, index) => {
      res[item] = index + 1
      return res
    }, {}))
    .split('"').join(' ')
    .split(',').join(',<br>&nbsp;&nbsp;&nbsp;&nbsp;')
    .split('{').join('{<br>&nbsp;&nbsp;&nbsp;&nbsp;')
    .split(':').join(':&nbsp;')
    .split('}').join('<br>}')
