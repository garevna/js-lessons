let section = document.body

function getInput ( users ) {

    let logins = Object.keys ( users );

    let userInput = section.appendChild (
        document.createElement ( "input" )
    );
    
    userInput.oninput = event => {
        let test = logins.filter (
            login => login.indexOf ( event.target.value ) !== -1
        ).length > 0;
        
        event.target.style.color = test ? "green" : "red";
        event.target.title = test ? "..." : "There are no such user in DB";
    };
    
    return new Promise (
        ( resolve, reject ) => {
            userInput.onchange = event => {
                let res = logins.find ( login => login === event.target.value );

                userInput.remove();

                !res ? reject ( "Not found" ) : resolve ( users[ res ] )
            };
        }
    )
}

async function getLogin () {
   
    let users = await (
        await fetch ( "https://garevna-rest-api.glitch.me/users/all" )
    ).json();

    return await getInput ( users )
}

const resolve = response => section.innerHTML = `<p>${JSON.stringify( response )}</p>`
const reject = error => section.innerHTML = `<p style="color: red">${error}</p>`


getLogin ().then ( resolve, reject )