const { minifier } = require('../helpers').default

const rawSource = `
* { outline: none; }

section {
  position: relative;
  height: 320px;
  padding: 16px;
  box-sizing: border-box;
  box-shadow: inset 2px 2px 4px #00000070;
  background: #000;
  color: #dde;
  overflow: auto;
  font-family: monospace;
  transition: all .5s;
}

.error {
  width: calc(100% - 56px);
  background: #a559;
  color: #ddd;
  padding: 4px 28px;
  border-radius: 4px;
  background-repeat: no-repeat;
  background-size: 12px;
  background-position: 8px center;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDUxMiA1MTIiPg0KICA8cGF0aCBkPSJNMjU2IDBDMTE0LjYyIDAgMCAxMTQuNjIgMCAyNTZzMTE0LjYyIDI1NiAyNTYgMjU2IDI1Ni0xMTQuNjIgMjU2LTI1NlMzOTcuMzggMCAyNTYgMHptMTE2LjQyIDM3Mi40YTI4LjggMjguOCAwIDAgMS00MC43IDBMMjU2IDI5Ni43M2wtNzUuNyA3NS42OWEyOC43NzkgMjguNzc5IDAgMSAxLTQwLjctNDAuN0wyMTUuMyAyNTZsLTc1LjctNzUuN2EyOC43NzkgMjguNzc5IDAgMSAxIDQwLjctNDAuN2w3NS43IDc1LjcgNzUuNy03NS43YTI4Ljc3OSAyOC43NzkgMCAwIDEgNDAuNyA0MC43TDI5Ni43MiAyNTZsNzUuNyA3NS43YzExLjU3NyAxMC45MDggMTIuNjk1IDI4LjUyMyAxLjc4OCA0MC4xYTEuNjE3IDEuNjE3IDAgMCAxLTEuNzg4LjZ6IiAgZmlsbD0iI2ZmODg4OCIgLz4NCjwvc3ZnPg0K);
}

.error:before {
  content: '► ';
  color: #bbb;
}

.live-demo-section

h1, h2, h3, h4, h5 {
  font-family: var(--main-font);
}

button {
  cursor:pointer;
  font-family: var(--main-font);
  font-size: 1.2rem;
  border: 0;
}

button.start {
  background: #09b;
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  box-shadow: -1px -1px 2px #00000070;
}

button.stop {
  background: transparent;
  padding: 0;
  color: #f50;
  box-shadow: none;
}

button.start:hover {
  animation: button-hover 0.5s ease infinite;
  box-shadow: 0px 0px 2px #00000050;
  text-shadow: 1px 1px 1px #005577de;
}

button.stop:hover {
  color: #d00;
}

@keyframes button-hover {
    0% { background: linear-gradient(to right top, #09b,#09b, #09b); }
   20% { background: linear-gradient(to right top, #09b, #5bd 10% 30%, #09b); }
   40% { background: linear-gradient(to right top, #09b, #5bd 30% 50%, #09b); }
   60% { background: linear-gradient(to right top, #09b, #5bd 50% 70%, #09b); }
   80% { background: linear-gradient(to right top, #09b, #5bd 70% 90%, #09b); }
  100% { background: linear-gradient(to right top, #09b, #09b, #09b); }

}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background: #079;
  box-shadow: inset 0 0 1px #00000070;
  border-radius: 1px;
}

::-webkit-scrollbar-thumb {
  background: #f50;
  border-radius: 1px;
}

::-webkit-scrollbar-thumb:hover {
  background: #fa0;
}
`

export const codeOutputStyles = minifier(rawSource)
