const section = document.body

section.style['letterSpacing'] = '2px'
const array = ['first', 'second', 'third', 'fourth']

document.body
  .innerHTML = JSON.stringify(array.reduce((res, item, index, arr) => {
    res[index] = arr[arr.length - index - 1]
    return res
  }, [])).toString()
