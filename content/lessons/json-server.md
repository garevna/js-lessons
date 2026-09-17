## ![ico-30 icon] JSON server

### ![ico-25 bash] {{p1}}

~npm install -g json-server~

### ![ico-30 db] {{p2}}

{{p3}}

^^^[db.json]

~~~js
{
  "users": [
    {
      "id": 1,
      "name": "Владимир",
      "lastName": "Кононенко",
      "email": "vladimir.kononenko@gmail.com",
      "photoURL": "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png"
    },
    {
      "id": 2,
      "name": "Никита",
      "lastName": "Терещенко",
      "email": "nikita.tereshenko@gmail.com",
      "photoURL": "https://i.pinimg.com/originals/3d/47/4f/3d474f82ff71595e8081f9a120892ae8.gif"
    },
    {
            "id": 3,
            "name": "Tim",
            "lastName": "Wagner",
            "email": "timVagner@gmail.com",
            "photoURL": "https://vignette.wikia.nocookie.net/yogscast/images/8/8a/Avatar_Turps_2015.jpg"
    },
    {
            "id": 4,
            "name": "James",
            "lastName": "Bond",
            "email": "jamesBond@gmail.com",
            "photoURL": "https://vignette2.wikia.nocookie.net/yogscast/images/5/59/Avatar_Lewis_2015.png"
    }
  ],  
  "posts": [
    {
            "userId": 2,
            "title": "My first post here",
            "body": "It's really wonder!",
            "id": 1
    },
    {
            "userId": 2,
            "id": 2,
            "title": "Автопробег",
            "body": "Завтра планируется автопробег. Участвовать могут все желающие"
    },
    {
            "userId": 1,
            "title": "*Бетономешалка",
            "body": "Это жесть. Собираюсь купить. Лучше, чем АК!",
            "id": 3
    },
    {
            "id": 4,
            "userId": 3,
            "title": "JS",
            "body": "Look here - there are some samples"
    },
    {
            "userId": 3,
            "title": "XMLHttpRequest",
            "body": "Method POST",
            "id": 5
    }
  ],
  "comments": [
    {
            "postId": 1,
            "id": 1,
            "userId": 1,
            "body": "wow!"
    },
    {
            "postId": 3,
            "id": 2,
            "userId": 2,
            "body": "Hi, I'm wonder!"
    },
    {
            "postId": 4,
            "id": 3,
            "userId": 3,
            "body": "It's really wonder!"
    },
    {
            "postId": 2,
            "id": 4,
            "userId": 2,
            "body": "Ударим автопробегом по бездорожью и разгильдяйству!"
    }
  ]
}
~~~

^^^

### ![ico-25 bash] {{p4}}

{{p5}}

{{p6}}

{{p7}}

{{p8}}

{{p9}}
{{p10}}

^^^[{{p11}}]

{{p12}}
{{p13}}
{{p14}}
~json-server  z:/home/test/users.json –w~

^^^

_______________________________________

### ![ico-20 icon] endpoints

{{p15}}

| ![ico-20 bash] | ~http://localhost:3000/users<br>http://localhost:3000/posts<br>http://localhost:3000/comments~ |

{{p16}}

{{p17}}
{{p18}}

_____________________________________

### ![ico-20 icon] fetch

{{p19}}

##### ![ico-25 cap] GET (1)

~~~js
fetch('http://localhost:3000/comments')
  .then(response => response.json())
  .then(json => console.log(json))
~~~

___________________________________________

##### ![ico-25 cap] GET (2)

{{p20}}

{{p21}}

~~~js
function getData (ref) {
  return fetch(`http://localhost:3000/${ref}`).then(response => response.json())
}

Promise.all([
  getData('users'),
  getData('posts'),
  getData('comments')
])
  .then(response => {
    const [users, posts, comments] = response
    console.log(users, posts, comments)
  })
~~~

___________________________________________

##### ![ico-25 cap] POST

{{p22}}

~~~js
fetch('http://localhost:3000/comments', {
  method: 'POST',
  body: JSON.stringify({
    postId: 1,
    userID: 1,
    body: 'Good for you!''
  }),
  headers: {
    'Content-type': 'application/json'
  }
})
    .then ( response => console.log ( 'response: ', response ) )
~~~

{{p23}}
{{p24}}
{{p25}}

{{p26}}

~~~js
fetch ( 'http://localhost:3000/comments?postId=1&id=4' )
    .then ( response => response.json () )
        .then ( json => console.log ( json ) )
~~~

_________________________________________

##### ![ico-25 cap] PUT

{{p27}}

~~~js
fetch ( 'http://localhost:3000/posts/1', {
    method: 'PUT',
    body: JSON.stringify ({
        userID: 2,
      	title: "My first post here",
      	body: "It's really wonder!"
    }),
    headers: {
        "Content-type": "application/json"
    }
})
   .then ( response => console.log ( 'response: ', response ) )
~~~

_________________________________________

##### ![ico-25 cap] PATCH

{{p28}}

~~~js
fetch ( 'http://localhost:3000/posts/1', {
    method: 'PATCH',
    body: JSON.stringify ({
      	title: "Welcome to the hell!",
    }),
    headers: {
        "Content-type": "application/json"
    }
})
   .then ( response => console.log ( 'response: ', response ) )
~~~

{{p29}}
{{p30}}
{{p31}}

_______________________________________

##### ![ico-25 cap] DELETE

{{p32}}

{{p33}}

~~~js
fetch ( 'http://localhost:3000/comments/1', {
    method: 'DELETE',
    headers: {
        "Content-type": "application/json"
    }
})
   .then ( response => console.log ( 'response: ', response ) )
~~~

______________________________________________

### ![ico-20 icon] XMLHttpRequest

~~~js
function workWithData ( method, url, data ) {
    let request = new XMLHttpRequest ()
    request.onload = function ( event ) {
        console.log ( this.responseText )
    }
    request.open ( method, url )
    request.setRequestHeader (
        'Content-type', 'application/json; charset=utf-8'
    )
    request.send ( data )
}
~~~

##### ![ico-25 cap] GET

~~~js
workWithData (
    'GET',
    'http://localhost:3000/posts'
)
~~~

##### ![ico-25 cap] POST

~~~js
workWithData (
    'POST',
    'http://localhost:3000/posts',
    JSON.stringify ( {
        userId: 2,
        title: 'XMLHttpRequest',
        body: 'Method POST'
    } )
)
~~~

##### ![ico-25 cap] DELETE

~~~js
workWithData (
    'DELETE',
    'http://localhost:3000/posts/7'
)
~~~

##### ![ico-25 cap] PUT

~~~js
workWithData (
    'PUT',
    'http://localhost:3000/posts/3',
    JSON.stringify ( {
        userId: 2,
        title: "*Бетономешалка",
        body: "Это жесть. Собираюсь купить. Лучше, чем АК!"
    } )
)
~~~


