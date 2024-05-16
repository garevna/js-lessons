const section = document.body

section.style = `height: 400px; overflow: auto; background-color: #000; color: #eef; font-family: Arial`

const inputs = [
    "author",
    "topic",
    "message"
]

const addElem = ( tag = "input", container ) =>
    ( container && container.nodeType === 1 ?
                container : section )
        .appendChild ( document.createElement ( tag ) )

const outputDevice = addElem ( "div", section )
outputDevice.style = `
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    overflow: auto;
    border: solid 1px #ddd;
    color: red;
    padding: 8px 20px;
`
outputDevice.write = function ( text ) {
    this.innerText += text + "\n"
}

const style = addElem ( "style", section )
style.textContent = `
    input {
        padding: 5px 10px;
        margin-left: 10px;
    }
    label {
        color: #aab;
    }
    figure {
        position: absolute;
        bottom: 100px;
        top: 120px;
        left: 40px;
        right: 40px;
        padding: 10px 20px;
        border: solid 1px #444;
    }
`

const observed = inputs.map (
    item => {
        let label = addElem ( "label" )
        let elem = addElem()
        elem.id = item
        label.for = item
        label.innerText = item
        addElem ( "br" )
        return elem
    }
)

const subscriber = section.appendChild (
    document.createElement ( "figure" )
)

subscriber.showInfo = function ( data ) {
    this.topic = data.topic ? data.topic : this.topic ? this.topic : "topic"
    this.author = data.author ? data.author: this.author ? this.author : "author"
    this.message = data.message ? data.message: this.message ? this.message : "message"
    this.innerHTML = `
       <h3>${this.topic}</h3>
       <small>${this.author}</small>
       <p>${this.message}</p>
    `
}.bind ( subscriber )


class Observer {
    constructor ( subjects ) {
        this.subscribers = []
        this.events = subjects.map (
            function ( elem ) {
                elem.oninput = function ( event ) {
                    this.broadcast ( { [elem.id]: event.target.value } )
                }.bind(this)
                return elem.oninput
            },
            this
        )
    }
    subscibe ( client ) {
        typeof client === "function" ? this.subscribers.push ( client ) :
            outputDevice.write ( "Invalide subscriber" )
    }
    unsubscibe ( client ) {
        this.subscribers = this.subscribers
            .filter ( subscriber !== client )
    }
    broadcast ( data ) {
        this.subscribers.forEach (
            client => client ( data )
        )
    }
}

const observer = new Observer ( observed )

observer.subscibe ( subscriber.showInfo )
// observer.subscibe ( console.log )
observer.subscibe ()