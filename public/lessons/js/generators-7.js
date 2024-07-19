const section = document.body

let user = {
    login: "Сергей",
    avatar: "https://www.shareicon.net/data/2015/12/14/207817_face_300x300.png",
    email: "serg789@gmail.com",
    place ( tagName ) {
        return section.appendChild ( document.createElement ( tagName ) )
    },
    showAvatar () {
        let ava = this.place ( "img" )
        ava.src = this.avatar
        ava.width = "70"
        return ava
    },
    showLogin () {
        let x = this.place ( "h3" )
            .innerHTML = this.login
        return x
    },
    showEmail () {
        let x = this.place ( "p" )
            .innerHTML = this.email
        return x
    }
}

user.generator = function* () {
    yield this.showLogin ()
    yield this.showEmail ()
    yield this.showAvatar ()
}

user.iterator = user.generator ()

while ( !user.iterator.next().done ) {}