const section = document.body

function structuralClone(obj) {
    return new Promise(resolve => {
        const { port1, port2 } = new MessageChannel()
        port2.onmessage = ev => resolve(ev.data)
        port1.postMessage(obj)
    })
}

const user = {
   name: "Ivan",
   family: {
      mother: {
         name: "Mary",
         age: 41,
         speciality: "developer"
      },
      father: {
         name: "Stephan",
         age: 43,
         speciality: "engineer"
      },
      brother: {
         name: "Jeck",
         age: 16,
         speciality: "student"
      }
   }
}
structuralClone( user ).then (
    response => section.innerText = JSON.stringify ( response )
)
