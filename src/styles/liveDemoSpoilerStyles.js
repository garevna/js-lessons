import { errorAndWarning } from './errorAndWarning'

const { minifier, getIconsWorker } = require('../helpers').default

const worker = getIconsWorker()

let rawSource = `
p {
  word-spacing: -0.4rem;
  margin: 4px;
}
.output {
  margin-left: 16px;
}
.error-message, .warning-message {
  display: inline-block;
  width: 100%;
  vertical-align: super;
  padding-bottom: 4px;
}
.hr {
  display: block;
  width: 100%;
  border-bottom: solid 1px #777;
}
.live-demo-section {
  background: #222;
  border: solid 16px transparent;
  box-sizing: border-box;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.4;
  margin-top: -4px;
  opacity: 0;
  transition:  all .4s ease-in-out;
}

.live-demo-section > p.error {
  width: 100%;
  background: #f544;
  color: #ddd;
  padding: 4px 28px;
  border-radius: 4px;
  background-repeat: no-repeat;
  background-size: 12px;
  background-position: 8px center;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDUxMiA1MTIiPg0KICA8cGF0aCBkPSJNMjU2IDBDMTE0LjYyIDAgMCAxMTQuNjIgMCAyNTZzMTE0LjYyIDI1NiAyNTYgMjU2IDI1Ni0xMTQuNjIgMjU2LTI1NlMzOTcuMzggMCAyNTYgMHptMTE2LjQyIDM3Mi40YTI4LjggMjguOCAwIDAgMS00MC43IDBMMjU2IDI5Ni43M2wtNzUuNyA3NS42OWEyOC43NzkgMjguNzc5IDAgMSAxLTQwLjctNDAuN0wyMTUuMyAyNTZsLTc1LjctNzUuN2EyOC43NzkgMjguNzc5IDAgMSAxIDQwLjctNDAuN2w3NS43IDc1LjcgNzUuNy03NS43YTI4Ljc3OSAyOC43NzkgMCAwIDEgNDAuNyA0MC43TDI5Ni43MiAyNTZsNzUuNyA3NS43YzExLjU3NyAxMC45MDggMTIuNjk1IDI4LjUyMyAxLjc4OCA0MC4xYTEuNjE3IDEuNjE3IDAgMCAxLTEuNzg4LjZ6IiAgZmlsbD0iI2ZmODg4OCIgLz4NCjwvc3ZnPg0K);
}
.live-demo-section > p.error:before {
  content: '► ';
  color: #bbb;
}

#live-demo-header {
  cursor: pointer;
}
.live-demo-help {
  color: #09b;
  text-align: center;
  animation: flash-animation .5s infinite;
}
.prompt-input, .prompt-output {
  padding-right: 4px;
  color: #aaa;
}
.prompt-input:before {
  content: '❯';
  margin-right: 8px;
}
.prompt-output:before {
  content: '❮•';
  margin-right: 8px;
}

@keyframes flash-animation {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}

.tab {
  display: inline-block;
  margin-left: 20px;
}

.tab-2 {
  display: inline-block;
  margin-left: 36px;
}

.tab-3 {
  display: inline-block;
  margin-left: 48px;
}

.tab-4 {
  display: inline-block;
  margin-left: 60px;
}

.tab-5 {
  display: inline-block;
  margin-left: 72px;
}

.tab-6 {
  display: inline-block;
  margin-left: 84px;
}

.indent {
  display: inline-block;
  margin-left: 16px;
}

.default { color: #ddd; }

.var {
  margin-right: 8px;
  color: #a5f;
}

.math {
  margin: 0 8px;
  color: #ddd;
}

.name { color: #9bf; }

.string { color: #fa5; }
.string-out { color: #0ff; }

.number { color: #afa; }
.number-out { color: #97d; }

.boolean { color: #afa; }
.boolean-out { color: #b0d; }

.undefined { color: #777; }

.console {
  color: #fd0;
}

.operator-1 {
  margin-right: 12px;
  color: #a5f;
}
.operator-2 {
  margin: 0 12px;
  color: #a5f;
}
.operator-not {
  color: #a5f;
}

.function {
  margin-right: 8px;
  color: #a5f;
}

.function-brackets {
  margin-right: 8px;
  color: #eee;
}

.func-symbol {
  margin-right: 8px;
  color: #f84;
}

.func-console-out {
  font-style: italic;
  color: #eee;
}
` + errorAndWarning

// export const liveDemoSpoilerStyles = minifier(rawSource)

export const liveDemoSpoilerStyles = new Promise(resolve => {
  worker.addEventListener('message', function (event) {
    const { route, error, response } = event.data
    if (route !== 'console') return

    if (error || !response) {
      console.error(error || 'There is no response from icons worker!')
    }

    Object.keys(response).forEach(key => {
      rawSource = rawSource.includes(`--${key}`) ? rawSource.replaceAll(`url(--${key})`, `url(${response[key]})`) : rawSource
    })

    resolve(minifier(rawSource))
  })
  worker.postMessage({ route: 'console' })
})
