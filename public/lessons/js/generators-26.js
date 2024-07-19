const section = document.body;

let log = {}

const iterator = ( function* gen ( arg ) {
    let ind = 0, 
        ret = arg, 
        d = new Date().getTime(),
        key;

    while ( true ) {
        key = d === new Date().getTime() ? `${d}[${ind++}]` : new Date().getTime();
        d = new Date().getTime();
        ret = yield { [ key ]: ret };
    }
})( "Hello" )

let demo = section.appendChild (
    document.createElement ( "div" )
)

let input = section.appendChild (
    document.createElement ( "input" )
)
input.onchange = event => {

    Object.assign (
        log,
        iterator.next( event.target.value ).value
    );
    event.target.value = "";
    demo.innerHTML = JSON.stringify ( log )
        .split(",").join(",<br>&nbsp;&nbsp;&nbsp;&nbsp;")
        .split("{").join("{<br>&nbsp;&nbsp;&nbsp;&nbsp;")
        .split("}").join("<br>}")
}


input.onchange({ target: { value: "Hello" } } )