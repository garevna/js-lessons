let stopAnimation = false

document.body.onclick = () => stopAnimation = true

let style = document.head.appendChild (
    document.createElement ( "style" )
)
style.textContent = `
    .animated {
        position: absolute;
        width: 150px;
        height: 50px;
        left: 10px;
        font-family: Arial;
        font-size: 12px;
        color: white;
        padding: 8px;
    }
    .setTimeout {
        background-color: #f50;
        top: 10px;
    }
    .requestAnimationFrame {
        background-color: #079;
        top: 80px;
    }
`

let figure1 = document.body.appendChild (
    document.createElement ( "div" )
)
figure1.classList.add ( "animated", "setTimeout" )
figure1.innerText = "setTimeout"
figure1.resolve = function () {
    this.style.left = this.offsetLeft + 3 + "px"
    return this.offsetLeft
}.bind ( figure1 )

figure1[Symbol.iterator] = function* () {
    while ( true ) {
        yield new Promise (
            resolve => setTimeout ( resolve, 49 )
        ).then ( this.resolve )
    }
}

figure1.showMustGoOn = async function () {
    let counter = 0
    for ( let item of this ) {
        let res = await item
        if ( stopAnimation || counter++ > 400 ) break
    }

}

figure1.showMustGoOn ()

let figure2 = document.body.appendChild (
    document.createElement ( "div" )
)

figure2.classList.add ( "animated", "requestAnimationFrame" )
figure2.innerText = "requestAnimationFrame"

figure2.showMustGoOn = function () {
    this.style.left = this.offsetLeft + 1 + "px"
    !stopAnimation && requestAnimationFrame ( this.showMustGoOn )
}.bind ( figure2 )

figure2.showMustGoOn ()
