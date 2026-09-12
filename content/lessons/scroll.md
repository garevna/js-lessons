## ![ico-25 icon] {{s1.h1}}

{{s1.p1}}
{{s1.p2}}
{{s1.p3}}
{{s1.p4}}
{{s1.p5}}
{{s1.p6}}
{{s1.p7}}
{{s1.p8}}
{{s1.p9}}

### ![ico-20 icon] {{s2.h1}}

{{s2.p1}}

### ![ico-20 icon] {{s3.h1}}

{{s3.p1}}

### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}

### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}


### ![ico-20 icon] {{s6.h1}}

{{{offset-height.js}}}


### ![ico-20 icon] {{s7.h1}}

{{s7.p1}}

{{{offset-left.js}}}

### ![ico-20 icon] {{s8.h1}}

{{s8.p1}}

### ![ico-20 icon] {{s9.h1}}

{{s9.p1}}

_____________________________________

{{s9.p2}}

_____________________________________

### ![ico-30 hw] {{s10.h1}}

{{s10.p1}}

~~~~js
const section = document.body

section.style = `
    background: #000;
    margin: 0;
    padding: 0;
    overflow: hidden;
`

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
~~~~

{{{scroll-1.js}}}

__________________________________________________

## ![ico-20 icon] {{s11.h1}}

{{s11.p1}}

{{s11.p2}}


{{s11.p3}}

{{s11.p4}}
{{s11.p5}}

~~~js
document.querySelector ( "p" )
    .getBoundingClientRect()
~~~

~~~console
▼ DOMRect {x: 166.5, y: -2905, width: 520, height: 100, top: -2905, …}
    bottom: -2805
    height: 100
    left: 166.5
    right: 686.5
    top: -2905
    width: 520
    x: 166.5
    y: -2905
  ► __proto__: DOMRect
~~~

{{s11.p6}}
