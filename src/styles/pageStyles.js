import { errorAndWarning } from './errorAndWarning'
import { blackClass } from './blackClass'
import { buttons } from './buttons'

const { minifier } = require('../helpers').default

if (!window[Symbol.for('icons.worker')]) {
  window[Symbol.for('icons.worker')] = Object.assign(new Worker(`${location.origin}${location.pathname}icons.worker.js`), {
    onerror: error => console.error('! Icons worker Error\n', error)
  })
}

let rawSource = `
.tab-1 {
  margin-left: 16px;
}
.tab-2 {
  margin-left: 36px;
}
.tab-3 {
  margin-left: 48px;
}
.tab-4 {
  margin-left: 64px;
}

.tooltip-text {
  position: fixed;
  padding: 8px 12px;
  border-radius: 4px;
  border: solid 1px #ddd;
  background: #fafafa;
  z-index: 510;
  box-shadow: 4px 4px 8px #0008;
}

.logic-or-operator:before {
  content: '||'
}

*:active, *:hover, *:focus  {
  outline:  none;
}

hr {
  margin:  32px 0;
  height:  1px;
  border-top:  solid 1px #f50;
  border-bottom:  solid 1.2px #09b;
  background:  transparent;
}

.icon {
  min-width: 32px;
  min-height: 32px;
  border-radius: 50%;
  border: solid 2px #fff;
  box-shadow: 2px 2px 2px #00000090;
  background-color: #057;
  background-image: url(--icon);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 55%;
  background-blend-mode: luminosity;
}

::selection  {
  background-color:  #09b;
  color:  white;
}

.bordered  {
  border:  solid 1px #bbb;
  padding:  4px 16px 8px;
  margin:  8px 0 -24px 0;
  box-shadow:  1px -1px 3px #00000050;
  border-top-left-radius:  4px;
  width:  max-content;
}

.slogan  {
  display:  inline-block;
  transform:  rotate(-15deg) translate(50%, 48px);
  width:  60%;
  margin-bottom:  64px;
  color:  #f0f;
  font-family:  var(--funny-font);
  font-size:  18px;
  letter-spacing:  2px;
  font-weight:  bold;
}

main  {
  padding: 24px 32px 48px 48px;
  box-sizing:  border-box;
  max-width:  900px;
  width:  100%;
  margin-bottom:  24px;
  background:  var(--back-color);
}

div  {
  text-align:  justify;
  line-height:  1.8rem;
  max-width:  100%;
  margin:  16px 0;
}

div:empty  {
  margin:  0;
  padding:  0;
}

div  >  small  {
  line-height:  0;
}

img,  button,  input  {
  -webkit-user-select:  none;
  -moz-user-select:  none;
  user-select:  none;
}

img  {
  display: block;
  max-width:  90%;
  margin:  8px auto;
  vertical-align:  middle;
}

a.visible-anchor  {
  text-decoration:  none;
  color:  #079;
  font-weight:  bold;
  padding:  8px 36px 8px 8px;
  background-image:  url(--open-in-new);
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: 24px;
}

a.visible-anchor:hover  {
  background-color:  #eee;
  color:  #09b;
  text-decoration:  #09b;
}
a.visible-anchor  >  span  {
  vertical-align:  middle;
}

a.page-link {
  text-decoration:  none;
  color:  #079;
  font-weight:  bold;
}

a > span {
  vertical-align: middle;
}

h1, h2 {
  color: #079;
}
h3, h4 {
  color: #579;
}

table  {
  margin-bottom: 16px;
  border-collapse: collapse;
}

td {
  border: solid 1px #ddd;
  padding: 8px 12px;
  text-align: center;
}

td > * {
  margin: 0;
  font-size: 0.8rem;
  text-align: center;
}

menu-component {
  position: fixed;
  top: 8px;
  z-index: 500;
  cursor: pointer;
}

@media screen and (max-width: 900px)  {
  main  {
    padding: 48px 16px 48px 32px;
  }
}

@media screen and (max-width: 480px), screen and (max-height: 480px) {
  main  {
    padding: 48px 0px 48px 0px;
  }
  h1 { font-size: 1.2rem; }
  h2 { font-size: 1.0rem; }
  h3 { font-size: 0.9rem; }
  div { font-size: 0.8rem; }
  .slogan {
    transform: rotate(-15deg) translate(10%, 48px);
    width: 80%;
  }
}

::-webkit-scrollbar  {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-track  {
  background: #079;
  box-shadow: inset 0 0 1px #00000070;
  border-radius: 1px;
}

::-webkit-scrollbar-thumb  {
  background:  #f50;
  border-radius: 1px;
}

::-webkit-scrollbar-thumb:hover  {
  background:  #fa0;
}
` + errorAndWarning + blackClass + buttons

export const pageStyles = new Promise(resolve => {
  window[Symbol.for('icons.worker')].addEventListener('message', function (event) {
    const { route, error, response } = event.data
    if (route !== 'page') return
    if (error) console.error(error)
    if (!response) console.error('There is no response from icons worker!')
    Object.keys(response).forEach(key => {
      rawSource = rawSource.includes(`--${key}`) ? rawSource.replaceAll(`url(--${key})`, `url(${response[key]})`) : rawSource
    })
    resolve(minifier(rawSource))
  })
  window[Symbol.for('icons.worker')].postMessage({ route: 'page' })
})
