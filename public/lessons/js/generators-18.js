const section = document.body

Object.assign(section.appendChild(document.createElement('button')), {
  innerText: 'new',
  onclick: function (event) {
    const { value, done } = getAvatar.next()
    if (!done) section.appendChild(value)
  }
})

function * avaGenerator () {
  let num = 9
  while (++num < 99) {
    yield Object.assign(document.createElement('img'), {
      src: `https://www.shareicon.net/data/2015/12/14/2078${num}_face_300x300.png`,
      width: 80
    })
  }
}

const getAvatar = avaGenerator ()

// let btn = section.appendChild (
//     document.createElement ( "button" )
// )

// btn.innerText = "new"
// btn.onclick = function ( event ) {
//     let ava = getAvatar.next()
//     if ( !ava.done ) section.appendChild ( ava.value )
// }

// function* avaGenerator () {
//     let num = 9
//     while ( ++num < 99 ) {
//         let ava = document.createElement ( "img" )
//         ava.src = `https://www.shareicon.net/data/2015/12/14/2078${num}_face_300x300.png`
//         ava.width = "80"
//         yield ava
//     }
// }

// let getAvatar = avaGenerator ()