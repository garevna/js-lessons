const section = document.body

const pictures = [
  'https://cdn.pixabay.com/photo/2023/10/06/07/14/plant-8297610_1280.jpg',
  'https://cdn.pixabay.com/photo/2023/10/12/14/41/town-8310950_1280.jpg',
  'https://cdn.pixabay.com/photo/2017/01/18/16/46/hong-kong-1990268__340.jpg',
  'https://cdn.pixabay.com/photo/2013/03/02/02/41/city-89197__340.jpg',
  'https://cdn.pixabay.com/photo/2017/12/10/17/40/prague-3010407__340.jpg',
  'https://cdn.pixabay.com/photo/2018/01/31/12/16/architecture-3121009__340.jpg',
  'https://cdn.pixabay.com/photo/2015/02/24/13/23/city-647400__340.jpg',
  'https://cdn.pixabay.com/photo/2018/11/29/21/19/hamburg-3846525__340.jpg'
]

pictures.createSlide = function () {
  const slide = section.appendChild(document.createElement('figure'))
  slide.style = `
    position: absolute;
    top: 5%;
    bottom: 5%;
    left: 5%;
    right: 5%;
    transition: all 0.5s;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  `
  slide.onclick = function () {
    this.iterator.next ()
  }.bind(this)

  return slide
}

pictures.iterator = (
    function* () {
        function moveSlide ( slide, active ) {
            slide.style.left = `${ active ? 10 : -100 }%`
            slide.style.right = `${ active ? 10 : 100 }%`
            slide.style.opacity = active ? 1 : 0
        }

        let getNextPictureNum = function () {
            return this.currentPicture < this.length - 1 ?
                this.currentPicture + 1 : 0
        }.bind ( this )

        const slides = [
            this.createSlide (),
            this.createSlide ()
        ]

        let currentSlide = 0
        this.currentPicture = 0

        while ( true ) {
            this.currentPicture = getNextPictureNum ()
            slides [ Math.abs ( currentSlide - 1 ) ]
                .style.backgroundImage = `
                    url(${ this [ this.currentPicture ] })
                `
            moveSlide ( slides [ currentSlide ], false )
            moveSlide ( slides [ Math.abs ( currentSlide - 1 ) ], true )
            currentSlide = Math.abs ( currentSlide - 1 )

            yield slides [ currentSlide ]

        }
    }
).call ( pictures )

pictures.iterator.next()