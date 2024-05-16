let section = document.body

async function getLogin ( resolve, reject ) {
    let users = await (
        await fetch ( "https://garevna-rest-api.glitch.me/users/all" )
    ).json();
    
    let logins = Object.keys ( users );
    
    let userInput = section.appendChild (
        document.createElement ( "input" )
    );
    
    userInput.oninput = function ( event ) {
        let test = logins.filter (
            login => login.indexOf ( event.target.value ) !== -1
        ).length > 0;
        
        event.target.style.color = test ? "green" : "red";
        event.target.title = test ? "OK" : "There are no such user in DB";
    };
    
    userInput.onchange = async event => {
        let res = logins.find ( login => login === event.target.value );
         
        userInput.remove();
        
        !res ? reject ( "Not found" ) : resolve ( users[ res ] )
    };
}

getLogin ( res => section.innerHTML = JSON.stringify ( res ), err => section.innerHTML = `<p style="color: red">${err}</p>` )