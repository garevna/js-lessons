let section = document.body

const resolve = response => section.innerHTML += `<p>${response}</p>`

function setTimer ( message, callback ) {
    resolve ( new Date().getUTCMilliseconds() )
    setTimeout ( () => callback ( message ), 1000 )
}

const sayHello = async () => {
    let res = await new Promise ( callback => setTimer ( "Hello", callback ) )
    return await new Promise ( callback => setTimer ( `${res}, baby`, callback ) )
}

sayHello().then ( resolve )