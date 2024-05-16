const section = document.body

section.style["white-space"] = "pre-wrap"

let stop = false

const show = resp => section.innerText += resp

let promise = message => new Promise (
    resolve => {
        let time = Math.round ( Math.random() * 3000 )
        setTimeout (
            () => resolve ( `\n${message}: ${time}` ),
            time
        )
    }
)

async function test () {
    let res = await promise (
        await promise (
            await promise ( "start" )
        )
    )
    stop = true
    return res
}

test().then ( show )

function draw () {
    show ( "." )
    stop ? null : requestAnimationFrame ( draw )
}

draw()