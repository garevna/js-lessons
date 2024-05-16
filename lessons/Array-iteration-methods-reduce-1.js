const section = document.body

[1, 2, 3, 4, 5].reduce((accumulator, item) => {
  section.innerHTML += `<p>${accumulator} : ${item}</p>`
  return accumulator += item
})
