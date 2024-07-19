const section = document.body

// section.style = `
//     background: #000;
//     margin: 0;
//     padding: 0;
//     overflow: hidden;
// `

let rect = null
let aside = section.appendChild (
    document.createElement ( "aside" )
)
aside.style = `
    position: absolute;
    left: 10px;
    bottom: 10px;
    height: max-content;
    width: max-content;
    font-family: Arial;
    font-size: 0.7rem;
    color: #abc;
`;

const figure = document.body.appendChild (
    document.createElement ( "figure" )
)
figure.style = `
    position: absolute;
    top: 50px;
    left: 50px;
    bottom: 50px;
    right: 50px;
    transition: all 0.5s ease;
    background: #ffffff50;
    border: solid 1px #fff;
    z-index: 1;
`;

const addRect = ( top, left, height, width ) => {
    rect = section.appendChild (
        document.createElement ( "div" )
    )
    rect.style = `
        position: absolute;
        top: ${top}px;
        left: ${left}px;
        width: ${width}px;
        height: ${height}px;
        border: dotted 1px #789;
        z-index: 0;
    `
    return rect
}

let metrics = [
    "offsetTop", "offsetLeft",
    "offsetHeight", "offsetWidth",
    "scrollHeight", "scrollWidth"
];

const randomVal = val => Math.max ( section.offsetHeight / 16, Math.round ( Math.random() * val ) )
const changeSize = () => {
    figure.style.top = figure.style.bottom = randomVal ( section.offsetHeight / 3 ) + "px"
    figure.style.left = randomVal ( section.offsetWidth / 3 ) + 100 + "px"
    figure.style.right = randomVal ( section.offsetWidth / 3 ) + "px"
  
}

const movie = () => requestAnimationFrame ( function () {
    changeSize ()
    aside.innerHTML = ""
    rect ? rect.remove() : null
    rect = addRect (
        figure.offsetTop,
        figure.offsetLeft,
        figure.offsetHeight,
        figure.offsetWidth
    )
    requestAnimationFrame (
        () => metrics.forEach ( item => aside.innerHTML += `<p>${item}: ${figure[item]}</p>` )
    )
})

section.onclick = movie