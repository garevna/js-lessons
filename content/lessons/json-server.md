## ![ico-30 icon] {{s1.h1}}

### ![ico-25 bash] {{s2.h1}}

{{s2.p1}}

### ![ico-30 db] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

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

{{s3.p3}}

### ![ico-25 bash] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

{{s4.p3}}

{{s4.p4}}

{{s4.p5}}
{{s4.p6}}

{{s4.p7}}

{{s4.p8}}
{{s4.p9}}
{{s4.p10}}
{{s4.p11}}

{{s4.p12}}

_______________________________________

### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}

{{s5.p2}}

{{s5.p3}}

{{s5.p4}}
{{s5.p5}}

_____________________________________

### ![ico-20 icon] {{s6.h1}}

{{s6.p1}}

##### ![ico-25 cap] {{s7.h1}}

~~~js
fetch('http://localhost:3000/comments')
  .then(response => response.json())
  .then(json => console.log(json))
~~~

___________________________________________

##### ![ico-25 cap] {{s8.h1}}

{{s8.p1}}

{{s8.p2}}

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

##### ![ico-25 cap] {{s9.h1}}

{{s9.p1}}

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

{{s9.p2}}
{{s9.p3}}
{{s9.p4}}

{{s9.p5}}

~~~js
fetch ( 'http://localhost:3000/comments?postId=1&id=4' )
    .then ( response => response.json () )
        .then ( json => console.log ( json ) )
~~~

_________________________________________

##### ![ico-25 cap] {{s10.h1}}

{{s10.p1}}

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

##### ![ico-25 cap] {{s11.h1}}

{{s11.p1}}

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

{{s11.p2}}
{{s11.p3}}
{{s11.p4}}

_______________________________________

##### ![ico-25 cap] {{s12.h1}}

{{s12.p1}}

{{s12.p2}}

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

### ![ico-20 icon] {{s13.h1}}

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

##### ![ico-25 cap] {{s14.h1}}

~~~js
workWithData (
    'GET',
    'http://localhost:3000/posts'
)
~~~

##### ![ico-25 cap] {{s15.h1}}

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

##### ![ico-25 cap] {{s16.h1}}

~~~js
workWithData (
    'DELETE',
    'http://localhost:3000/posts/7'
)
~~~

##### ![ico-25 cap] {{s17.h1}}

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


