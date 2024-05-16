let section = document.body

let currentDate = section.appendChild (
    document.createElement ( "p" )
).innerHTML = "<small>Текущая дата: </small><span style='color:#09b'>" + new Date().toLocaleDateString() + "</span><small>&nbsp;(" + new Date().toLocaleTimeString() + ")</small>"

let label = section.appendChild (
    document.createElement ( "p" )
).innerText = "укажите сдвиг ( на сколько дней )"

const input = section.appendChild (
    document.createElement ( "input" )
)

input.type = "number"

let demo = section.appendChild (
    document.createElement ( "p" )
)

function getRelativeData ( data, days ) {
    if ( !( data instanceof Date ) ) return console.log ( "Invalid date" )
    return new Date ( data.setDate ( data.getDate() + days ) )
}

input.onchange = function ( event ) {
    let nextDate = getRelativeData ( new Date(), Number ( event.target.value ) )
    demo.innerHTML = "<p><span style='color: #f50'>" + new Date( nextDate ).toLocaleDateString() + "</span>&nbsp;<small>(" + new Date( nextDate ).toLocaleTimeString() + ")</small>"
    demo.innerHTML += "<br><small>" + new Date( nextDate ).toString() + "</small>"
}