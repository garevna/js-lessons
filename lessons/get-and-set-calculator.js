let section = document.body
section.style = `
    background-color: #000;
    color: #fff;
`

function Calculator ( container ) {
    this.container = container && container.nodeType === 1 ?
            container : document.body
    
    let label = this.addElem ( "p" )
    label.innerText = "Введите арифметическое выражение типа 4/2";

    this.expression = Object.assign (
        this.addElem ( "input" ),
        {
            style: `
                width: 120px;
                border: inset 1px;
                margin-bottom: 10px;
                padding: 4px 8px;
                display: block;
                outline: none;
            `,
            oninput: function ( event ) {
                let matches = event.target.value.match ( /(\d){1,}[%\*\+\-\/]{1}(\d){1,}/ );
                if ( !matches ) {
                    event.target.style.color = "red";
                    event.target.title = "Invalid input";
                }
                else {
                    event.target.style.color = "#09b";
                    event.target.title = "Valid input";
                }
            },
            onchange: function ( event ) {
                let test = event.target.value.match ( /(\d){1,}[%\*\+\-\/]{1}(\d){1,}/ );
                if ( !test ) return event.target.value = "";
                this.result = event.target.value;
            }.bind(this)
        }
    )

    this.createInput( "firstOperand", this.container );
    this.firstOperand.value = 0;
    this.createInputOperation ( this.container );
    this.operation.value = "+";
    this.createInput( "secondOperand", this.container );
    this.secondOperand.value = 0;
    this.demo = this.addElem ( "span" );

    this.operations = [ "+", "-", "*", "/", "%" ];
    
    Object.defineProperty ( this, "result", {
        get () {
            let secondOperand = this.secondOperand.value < 0 ? 
                    `(${this.secondOperand.value})` : 
                        this.secondOperand.value;
            this.expression.value = 
                `${this.firstOperand.value}${this.operation.value}${secondOperand}`;

            this.demo.innerText = ` = ${eval ( this.expression.value )}`;
        
            return this.expression.value
        },
    
        set ( newValue ) {
			let test = newValue.match ( /(\d){1,}[%\*\+\-\/]{1}(\d){1,}/ );
            if ( !test ) return
            
            for ( var operation of this.operations ) {
                let operands = newValue.split ( operation );
                if ( operands.length === 1 ) continue;
                this.operation.value = operation;
                this.firstOperand.value = parseInt ( operands[0] );
                this.secondOperand.value = parseInt ( operands[1] );
                break;
            }
            
            this.demo.innerText = ` = ${eval ( this.expression.value )}`; 
        }
    })
}

Calculator.prototype.addElem = function ( tagName ) {
    return this.container.appendChild (
        document.createElement ( tagName )
    )
}

Calculator.prototype.changeHandler = function ( event ) {
    let secondOperand = this.secondOperand.value < 0 ? 
                    `(${this.secondOperand.value})` : 
                        this.secondOperand.value;
    this.expression.value = `
        ${this.firstOperand.value}${this.operation.value}${secondOperand}
    `;
    this.result = this.expression.value;
}

Calculator.prototype.createInputOperation = function ( container ) {
    this.container = container && container.nodeType === 1 ? 
            container : section
    this.operation = Object.assign (
        this.container.appendChild (
            document.createElement ( "input" )
        ),
        {
            maxLength: "1",
            style: `
                width: 30px;
                color: #f50;
                font-size: 1rem;
                font-weight: bold;
                padding: 4px 8px;
                border: 0;
                outline: none;
            `,
            oninput: function ( event ) {
                if ( event.target.value.match ( /[^\+\-\*\/\%]/ ) )
                    event.target.value = ""
            },
            value: "+",
            onchange: this.changeHandler.bind( this )
        }
    )
}

Calculator.prototype.createInput = function ( prop, container ) {
    this.container = container && container.nodeType === 1 ? 
            container : section
    this[ prop ] = Object.assign (
        this.container.appendChild (
            document.createElement ( "input" )
        ),
        {
            type: "number",
            style: `
                width: 50px;
                font-size: 1rem;
                border: 0;
                color: #09b;
                padding: 4px 8px;
            `,
            onchange: this.changeHandler.bind( this )
        }
    )
}

var calculator = new Calculator ( section )