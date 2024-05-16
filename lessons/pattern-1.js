const section = document.body

const media = {
    image: true,
    method () {
        section.appendChild (
            document.createElement ( "img" )
        ).src = "https://garevna.github.io/js-samples/images/js-ico.png"
    }
}

const speaker = {
    text: true,
    method () {
        let elem = section.appendChild (
            document.createElement ( "h3" )
        )
        elem.innerText = "Hello"
        elem.style.color = "white"
        elem.style.fontFamily = "Arial"
    }
}

const dispetcher = {
    workers: [ speaker, media ],
    getSignal ( signal ) {
        let worker = this.workers.find ( worker => worker [ signal] )
        console.log ( worker, worker.method )
        worker ? worker.method() : null
    }
}

let button1 = section.appendChild (
    document.createElement ( "button" )
)

button1.innerText = "speaker"
button1.onclick = () => dispetcher.getSignal ( "text" )


let button2 = section.appendChild (
    document.createElement ( "button" )
)

button2.innerText = "media"
button2.onclick = () => dispetcher.getSignal ( "image" )

button1.style = button2.style = `
    padding: 5px 10px;
    background: transparent;
    color: #09b;
    font-family: Arial;
    font-size: 16px;
    border: solid 1px #09b;
`