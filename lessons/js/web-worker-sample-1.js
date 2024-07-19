const section = document.body
const p = section.appendChild (
  document.createElement ( "p" )
)

const worker = new Worker( "/src/lessons/web-worker-1.js" )
const workerData = []

worker.onmessage = function( event ) {
    workerData.push ( event.data )
    p.innerHTML = `<small>Main thread has received a message from worker</small><br>
        <em style="color: #09b">${event.data}</em>
    `
}

const button = section.appendChild (
    document.createElement ( "button" )
)

button.innerText = "Send message"
button.counter = ( function () {
    let count = "A".charCodeAt(0)-1
    return () => String.fromCharCode ( ++count )
})()

button.onclick = function ( event ) {
    worker.postMessage ( event.target.counter() )
}
