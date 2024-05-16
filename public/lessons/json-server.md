## ![ico-30 icon] JSON server

### ![ico-25 bash] Установка пакета

~npm install -g json-server~

### ![ico-30 db] База данных

Создадим папку ( например, **_test_** ) и поместим в нее файл  **db.json**:

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

### ![ico-25 bash] Запуск сервера

Перейдем в ![ico-20 bash] Bush и запустим  **JSON Server**  с базой данных **_db.json_**

••$ json-server  &#45;&#45;watch  <путь к файлу>/db.json••

Можно использовать сокращение:

••$ json-server  <путь к файлу>/db.json  -w••

Поскольку мы установили  json-server  глобально, корневой папкой сайта будет папка для установки глобальных пакетов по умолчанию (** ~** )
Указывая  <путь к файлу>, нужно задавать его относительно этой папки

^^^[<путь к файлу>]

^^В данном случае файл **~users.json~**^^
^^находится в папке **~z:/home/test~**^^
^^поэтому нужно указать полный путь к файлу:^^
~json-server  z:/home/test/users.json –w~

^^^

_______________________________________

### ![ico-20 icon] endpoints

Сервер сгенерировал нам **_endpoints_**:

| ![ico-20 bash] | ~http://localhost:3000/users<br>http://localhost:3000/posts<br>http://localhost:3000/comments~ |

(ссылки на ресурсы **_users_**, **_posts_**, **_comments_**, описанные нами в базе данных **users.json**)

Теперь, пока сервер запущен ( т.е. пока вы не воспользуетесь ~Ctrl + C~ в консоли _Bush_ ), можно записывать и вытягивать данные из базы данных, пользуясь указанными **endpoints**
(при этом в консоли  Bush  логируются все запросы)

_____________________________________

### ![ico-20 icon] fetch

Теперь проверим, как работают наши запросы, из консоли браузера

##### ![ico-25 cap] GET (1)

~~~js
fetch('http://localhost:3000/comments')
  .then(response => response.json())
  .then(json => console.log(json))
~~~

___________________________________________

##### ![ico-25 cap] GET (2)

Теперь получим данные из базы данных в переменные  **_users_**,  **_posts_** и  **_comments_**, используя функцию  **getData**

Выполним следущий код в консоли браузера:

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

Добавим новый комментарий:

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

^^Обратите внимание, что поле **id** добавляемой записи вычисляется на стороне сервера^^
^^Вам не нужно устанавливать его значение^^
^^( но вы можете это делать, если будете отслеживать существующие значения, потому что в противном случае при попытке записи дублирующихся значений **id** будет сгенерировано исключение )^^<br>

Вытащим добавленный коммент в консоли:

~~~js
fetch ( 'http://localhost:3000/comments?postId=1&id=4' )
    .then ( response => response.json () )
        .then ( json => console.log ( json ) )
~~~

_________________________________________

##### ![ico-25 cap] PUT

Изменим содержание первого поста :

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

Внесем частичные изменения в содержание первого поста:

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

^^Теперь пост со значением ~id~ равным ** 1** будет частично изменен:^^
^^содержимое поля ~title~ станет "_Welcome to the hell!_",^^
^^все остальные поля останутся прежними^^

_______________________________________

##### ![ico-25 cap] DELETE

Удалим первый комментарий

В консоли браузера наберем код:

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


