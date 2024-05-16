const section = document.body

let stop = false
section.onclick = () => stop = !stop

function MovieElement ( title ) {
    this.elem = this.container.appendChild (
        document.createElement ( "div" )
    )
    this.elem.style = `
        position: absolute;
        width: ${this.size}px;
        height: ${this.size}px;
        background: ${this.randomColor()};
        top: ${this.randomY ()}px;
        left: ${this.randomX ()}px;
        font-size: 10px;
        font-family: Arial;
    `

    this.elem.title = title

    this.targetY = null
    this.targetX = null

    requestAnimationFrame( this.movieClip.bind ( this ) )
}

MovieElement.prototype.size = 40

MovieElement.prototype.container = section.appendChild (
    document.createElement ( "section" )
)

MovieElement.prototype.container.style = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 0;
    margin: 0;
    box-sizing: border-box;
`

MovieElement.prototype.randomNum = maxVal => Math.round ( Math.random() * maxVal )

MovieElement.prototype.randomX = function () {
    return this.randomNum ( this.container.offsetWidth - this.size )
}
MovieElement.prototype.randomY = function () {
    return this.randomNum ( this.container.offsetHeight - this.size )
}

MovieElement.prototype.randomColor = function () {
    return `rgb(${this.randomNum (255)},
                ${this.randomNum (255)},
                ${this.randomNum (255)}
    )`
}

MovieElement.prototype.getDistance = function ( axis ) {
    return this [ 'target' + axis.toUpperCase()] - 
        parseInt (
            this.elem.style[ axis.toLowerCase() === "y" ? "top" : "left" ]
        )
}

MovieElement.prototype.movieClip = function () {
    if ( !this.targetY && !this.targetX ) {
        this.targetY = this.randomY()
        this.targetX = this.randomX()
    } else {
        this.distanceY = this.getDistance ( "y" )
        this.distanceX = this.getDistance ( "x" )
        if ( this.distanceY === 0 && this.distanceX === 0 ) {
            this.targetY = null
            this.targetX = null
        } else {
            this.stepY = Math.sign( this.distanceY )
            this.stepX = Math.sign( this.distanceX )
            this.elem.style.top = parseInt ( this.elem.style.top ) + this.stepY + "px"
            this.elem.style.left = parseInt ( this.elem.style.left ) + this.stepX + "px"
        }
    }

    stop || requestAnimationFrame ( this.movieClip.bind ( this ) )
}

for ( let item of [ 1, 2, 3, 4 ] ) {
    let mc = new MovieElement ( item )
}