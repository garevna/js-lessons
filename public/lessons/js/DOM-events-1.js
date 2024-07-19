let section = document.body

const pictures = [
    "https://www.insidescience.org/sites/default/files/5_heic1808a_crop.jpg",
    "https://gobelmont.ca/Portals/0/xBlog/uploads/2017/9/6/dancing-156041_960_720.png",
    "https://i2-prod.mirror.co.uk/incoming/article11840943.ece/ALTERNATES/s615/PAY-MATING-BUGS.jpg",
    "https://i.redd.it/otqqqga0ip211.jpg"
]

const divs = pictures.map (
    picture => {
        let div = section.appendChild (
            document.createElement ( "div" )
        )
        div.style = `
            width: 200px;
            height: 100px;
            border: solid 1px gray;
            float: left;
        `
        div.onclick = function ( event ) {
            if ( event.eventPhase === 3 ) this.firstChild.remove()
            else {
                let img = event.target.appendChild (
                    document.createElement ( "img" )
                )
                img.src = picture
                img.width = 200
            }
        }
        return div
})
