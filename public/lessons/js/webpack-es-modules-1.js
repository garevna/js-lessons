window [ Symbol.for ( "section" ) ] = document.body;

const moduleURL = "https://garevna.github.io/js-samples/js/index14.js";

const message = "It's impossible to import and execute the module twice";

const messagePlaceholder = window [ Symbol.for ( "section" ) ].appendChild (
    document.createElement ( "h4" )
);
messagePlaceholder.style.color = "red";

const importModule = async () => 
    window [ Symbol.for ( "section" ) ] [ Symbol.for("module") ] = 
            ( await import( moduleURL ) );
            
const showError = () => messagePlaceholder.innerText = message;

window [ Symbol.for ( "section" ) ].onclick = () => {
    if ( !(window [ Symbol.for ( "section" ) ] [ Symbol.for("module") ]) ) importModule()
    else showError ()
}


// document.body.onclick = async () => {
//     const module = await import(`https://garevna.github.io/js-samples/js/index14.js`);
//     console.log ( module );
// }



// let scriptFile = 'https://garevna.github.io/js-samples/js/index'

// import ( `${scriptFile}12.js` )
//     .then( module => {
//         setTimeout (
//             () => import ( `${scriptFile}21.js` )
//                 .then (
//                     setTimeout (
//                         () => import ( `${scriptFile}22.js` ),
//                         10000
//                     ),
//                     20000
//                 ),
//             10000
//         )
//     })
// ~~~


  
// const scriptImports = async moduleFile => {
//     const timeOut = timeInterval => new Promise (
//         resolve => setTimeout ( () => resolve(), timeInterval )
//     )
//     await import ( `${moduleFile}12.js` )
//     await timeOut ( 8000 )
//     await import ( `${moduleFile}21.js` )
//     await timeOut ( 12000 )
//     await import ( `${moduleFile}22.js` )
// }

// scriptImports ( 'https://garevna.github.io/js-samples/js/index' )

