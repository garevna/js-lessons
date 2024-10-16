const { minifier } = require('../helpers').default

const rawSource = `
p {
  word-spacing: -0.4rem;
  margin: 4px;
}
.output {
  margin-left: 16px;
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
  margin-left: 24px;
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
`

export const liveDemoSpoilerStyles = minifier(rawSource)
