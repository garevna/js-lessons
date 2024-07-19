const section = document.body
const p = section.appendChild ( document.createElement ( "p" ) )

const worker = new Worker( "/src/lessons/web-worker-2.js" )

worker.onmessage = function( event ) {
    p.innerHTML = event.data
}

section.appendChild ( document.createElement ( "input" ) )
    .oninput = function ( event ) {
        worker.postMessage ( event.target.value )
    }
