const section = document.body

section.innerHTML =  `<p>${[625, 5, 10].reduce(Math.sqrt)}</p>`
section.innerHTML +=  `<p>${[625, 8, 3].reduce(Math.sqrt)}</p>`
section.innerHTML +=  `<p>${[625, 4].reduce(Math.sqrt)}</p>`
section.innerHTML +=  `<p>${[81, 7, 5].reduce(Math.sqrt)}</p>`
section.innerHTML +=  `<p>${[81, 0, 0].reduce(Math.sqrt)}</p>`
