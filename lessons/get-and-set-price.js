let section = document.body
section.style = `
    height: 400px!important;
`

let courseContainer = section.appendChild (
    document.createElement ( "div" )
)

courseContainer.style.padding = "20px";

let label = courseContainer.appendChild (
    document.createElement ( "span" )
)

label.innerText = "Курс доллара: "

let course = courseContainer.appendChild (
    document.createElement ( "input" )
)

course.type = "number";
course.value = 28.5;
course.onchange = function ( event ) {
    Commodity.prototype.course = event.target.value
    commodities.forEach (
        item => item.setPriceUAH()
    )
}


function Commodity ( name, __priceUSD, picture ) {

    this.name = name;
    this.priceUSD = __priceUSD;
    this.setPriceUAH = () => priceUAH.value = this.priceUAH;
    this.setPriceUSD = () => priceUSDElement.innerText = this.priceUSD;
    
    Object.defineProperty ( this, "priceUAH", {
        get () {
            return this.priceUSD * this.course
        },
        set ( newPriceUAH ) {
            this.priceUSD = Math.round ( newPriceUAH * 100 / this.course ) / 100;
            this.setPriceUSD();
        }
    })
    
    const card = this.addElem ( "figure" );
    card.style = `
        font-family: Arial;
        width: 150px;
        border: solid 1px white;
        padding: 20px;
        float: left;
        margin: 5px;
        box-sizing: boreder-box;
    `;
    
    const commodityName = this.addElem ( "h4", card );
    commodityName.innerText = name;
    commodityName.style.marginTop = "0";
    
    const img = this.addElem ( "img", card );
    img.src = picture;
    img.height = 100;
    img.style.margin = "0 0 20px 25px";

    const prices = this.addElem ( "div", card )

    this.addElem ( "span", prices ).innerText = "Цена ( грн ): "
    
    const priceUAH = this.addElem ( "input", prices );
    priceUAH.style = `
        background: transparent;
        width: 70px;
        border: 0;
        color: #09b;
    `;
    
    priceUAH.onchange = function ( event ) {
        this.priceUAH = event.target.value;
        this.setPriceUSD();
    }.bind ( this )
    
    priceUAH.value = this.priceUAH;

    const usd = this.addElem ( "div", card );
    usd.style = `
        padding: 10px 0 0 0;
        font-size: 0.8rem;
        color: #888;
    `;

    this.addElem ( "small", usd ).innerText = "Цена ( USD ): "

    const priceUSDElement = this.addElem ( "small", usd );
    priceUSDElement.style.color = "#f50";
    
    this.setPriceUSD();
    
}

Commodity.prototype.course = course.value

Commodity.prototype.addElem = function ( tagName, container ) {
    return ( container ? container : section ).appendChild (
        document.createElement ( tagName )
    )
}

const commodities = [
    new Commodity (
        "Утюг",
        43,
        "https://i1.foxtrot.com.ua/product/MediumImages/6394018_0.jpg"
    ),
    new Commodity (
        "Сковорода",
        22,
        "https://i2.rozetka.ua/goods/7696055/tefal_b3010472_images_7696055628.jpg"
    ),
    new Commodity (
        "Кастрюля",
        25,
        "https://i1.foxtrot.com.ua/product/MediumImages/6180288_0.jpg"
    )
]