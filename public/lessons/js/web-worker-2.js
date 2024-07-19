const getHex = () => ( Math.max ( 120, Math.round( Math.random() * 255 ) ) ).toString (16)
const getColor = () => "#" + getHex() + getHex() + getHex()
const colorMessage = message => message.split("")
    .map ( letter => `<span style="color:${getColor()}">${letter}</span>` )
    .join("")

onmessage = function( event ) {
    postMessage( colorMessage ( event.data ) )
}