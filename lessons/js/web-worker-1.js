const messages = []

onmessage = async function( event ) {
    messages.push ( event.data )
    postMessage ( messages )
}