/**
 * The chat the hw-16 demo talks to.
 *
 * Printed in full in the lesson as chat.json, which is where this comes from,
 * so the hosted copy and the one a student runs on json-server hold the same
 * conversation.
 *
 * The avatars are the one change. They pointed at cdn.glitch.global, which
 * stopped resolving when Glitch wound down, so eleven users had broken faces.
 * They are files in the course repository now, served from the same GitHub
 * Pages site as the lessons. Pointing at someone else's server is what caused
 * the problem in the first place.
 */

export const chat = {
  "lastUpdate": {
    "date": 1718015866392
  },
  "users": [
    {
      "id": "begemot",
      "avatar": "https://garevna.github.io/js-lessons/images/chat/begemot.svg",
      "active": 1718015876536
    },
    {
      "id": "brian",
      "avatar": "https://garevna.github.io/js-lessons/images/chat/brian.svg",
      "active": 1718015523790
    },
    {
      "id": "free-boy",
      "avatar": "https://garevna.github.io/js-lessons/images/chat/free-boy.svg",
      "active": 1718015866826
    },
    {
      "id": "hasbeen",
      "avatar": "https://garevna.github.io/js-lessons/images/chat/hasbeen.svg",
      "active": 1718009561257
    },
    {
      "id": "automat",
      "avatar": "https://garevna.github.io/js-lessons/images/chat/automat.svg",
      "active": 1718009660703
    },
    {
      "id": "frodo",
      "avatar": "https://garevna.github.io/js-lessons/images/chat/frodo.svg",
      "active": 1549354550000
    },
    {
      "id": "functional",
      "avatar": "https://garevna.github.io/js-lessons/images/chat/functional.svg",
      "active": 1549357800000
    },
    {
      "id": "question",
      "avatar": "https://garevna.github.io/js-lessons/images/chat/question.svg",
      "active": 1549556390000
    },
    {
      "id": "lancet",
      "avatar": "https://garevna.github.io/js-lessons/images/chat/lancet.svg",
      "active": 1549557400000
    },
    {
      "id": "luke",
      "avatar": "https://garevna.github.io/js-lessons/images/chat/luke.svg",
      "active": 1552468320000
    },
    {
      "id": "garevna",
      "avatar": "https://garevna.github.io/js-lessons/images/chat/garevna.svg",
      "active": 1552468320000
    }
  ],
  "messages": [
    {
      "id": 1,
      "date": 1549354680000,
      "user": "frodo",
      "body": "Hello everybody here! What do you prefer: static or dynamic import?"
    },
    {
      "id": 2,
      "date": 1549354780000,
      "user": "hasbeen",
      "body": "The static import syntax can only be used at the top-level of the file"
    },
    {
      "id": 3,
      "user": "brian",
      "date": 1549354950000,
      "body": "Dynamic import() introduces a new function-like form of import that caters to those use cases"
    },
    {
      "id": 4,
      "date": 1549357900000,
      "user": "functional",
      "body": "Since import() returns a promise, it's possible to use async/await instead of the then-based callback style"
    },
    {
      "id": 5,
      "date": 1549556400000,
      "user": "question",
      "body": "Although import() looks like a function call, it is specified as syntax that just happens to use parentheses"
    },
    {
      "id": 6,
      "date": 1549557480000,
      "user": "lancet",
      "body": "The lazy-loading capabilities enabled by dynamic import() can be quite powerful when applied correctly"
    },
    {
      "id": 7,
      "date": 1552468440000,
      "user": "luke",
      "body": "Static import and dynamic import() are both useful"
    },
    {
      "id": 8,
      "date": 1552468440000,
      "user": "garevna",
      "body": "ws-json-server adds a little abstraction to websocket"
    },
    {
      "user": "free-boy",
      "date": 1717833840000,
      "body": "Browser Support for ES6 (2015)?",
      "id": 9
    },
    {
      "user": "automat",
      "date": 1717834020000,
      "body": "ES6 is fully supported in all modern browsers since June 2017",
      "id": 10
    },
    {
      "user": "begemot",
      "date": 1717937859804,
      "body": "'Funcs are our jam!' (garevna)",
      "id": 11
    }
  ]
}
