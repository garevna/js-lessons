let section = document.body
section.style.padding = 0;
section.style.overflow = "hidden";

class Canvas extends HTMLElement {
    
    constructor ( pointsNum = 200 ) {
        super ();
        this.shadow = this.attachShadow ( { mode: "closed" } );
        this.pointsNum = pointsNum;
        this.points = [];
        this.loop = this.loop.bind ( this );
    }
    
    connectedCallback () {
        
        this.canvas = this.shadow.appendChild (
            document.createElement ( "canvas" )
        );
        this.resizeCanvas();
        
        this.ctx = this.canvas.getContext ( "2d" );
        
        while ( this.points.length < this.pointsNum ) {
            this.points.push ( new CanvasPoint ( this.canvas, this.ctx ) )
        }
        
        window.addEventListener ( "resize", this.resizeCanvas.bind( this ) );
        this.loop();
    }
    
    loop () {
        this.draw();
        requestAnimationFrame ( this.loop );
    }
    
    resizeCanvas () {
        this.w = section.offsetWidth;
        this.h = section.offsetHeight;
        this.canvas.width = this.w;
        this.canvas.height = this.h;
    }
    
    async movie () {
        this.draw();
        requestAnimationFrame ( this.movie )
    }
    
    drawPoint ( point ) {
        point.draw ();
        this.points.forEach ( target => point.drawLine ( target ) )
    }
    
    draw () {
        this.ctx.clearRect ( 0, 0, this.canvas.width, this.canvas.height );
        this.ctx.globalCompositeOperation = 'lighter';
        this.points.forEach ( point => this.drawPoint ( point ) )
    }
}


function CanvasPoint ( canvas, ctx ) {
    
    this.canvas = canvas;
    this.ctx = ctx;
    this.maxVelocity = { x: 5, y: 5 };
    
    this.random = num => Math.round ( Math.random() * num );
    
    this.setPosition = function () {
        this.x =  this.random ( this.canvas.width );
        this.y =  this.random ( this.canvas.height );
    }

    this.getDistance = function ( point ) {
        return Math.sqrt (
            Math.pow ( this.x - point.x, 2 ) +
            Math.pow ( this.y - point.y, 2 )
        )
    }
  
    this.setPosition();
        
    this.radius = this.random ( 1 );
    this.rgba = this.colors [ this.random ( this.colors.length - 1 ) ];
    this.vx = this.random ( this.maxVelocity.x );
    this.vy = this.random ( this.maxVelocity.y );
    
    this.changePosition = function () {
        this.x = this.x + this.vx > this.canvas.width ? 0 :
            this.x + this.vx < 0 ? this.canvas.width : this.x + this.vx;
        this.y = this.y + this.vy > this.canvas.height ? 0 :
            this.y + this.vy < 0 ? this.canvas.height : this.y + this.vy;
    }
        
    this.draw = function () {
        this.ctx.fillStyle = this.rgba;
        this.ctx.strokeStyle = this.rgba;
        this.ctx.beginPath();
        this.ctx.arc ( this.x, this.y, 1, 0, Math.PI * 2, true );
        this.ctx.fill ();
        this.ctx.closePath ();
        
        this.changePosition()
    }
        
    this.drawLine = function ( target ) {

        let dist = this.getDistance ( target );
      
        if ( this.rgba == target.rgba && dist < 200 ) {
            this.ctx.lineWidth = 0.2;
            this.ctx.strokeStyle = this.rgba;
            this.ctx.beginPath ();
            this.ctx.moveTo ( this.x, this.y );
            this.ctx.lineTo ( target.x, target.y );
            this.ctx.stroke ();
       }
    }
}

CanvasPoint.prototype.colors = [ '#f0f','#8f8','#f50','#09b','#ff9' ];

if ( !customElements.get("canvas-element") ) {
    customElements.define ( 'canvas-element', Canvas );
}

section.appendChild (
    document.createElement ( "canvas-element" )
)
