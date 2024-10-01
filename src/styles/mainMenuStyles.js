const { minifier } = require('../helpers').default

const { stars_in_line } = require('../assets').default

if (!window[Symbol.for('icons.worker')]) {
  window[Symbol.for('icons.worker')] = Object.assign(new Worker(`${location.origin}${location.pathname}icons.worker.js`), {
    onerror: error => console.error('! Icons worker Error\n', error)
  })
}

let rawSource = `
* {
  box-sizing: border-box;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

#main-menu-shadow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #0008;
  box-sizing: border-box;
  display: none;
}

.main-menu-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 48px;
  box-shadow: 2px 2px 4px #00000090;
  z-index: 55;
  background: url(${stars_in_line}), var(--header-back-color);
  background-size: contain, 100%;
  background-repeat: repeat-x, no-repeat;
  background-blend-mode: overlay;
}

.main-menu-wrapper:before {
  content: "Client-side JS";
  font-family: var(--welcome-win-font);
  color: #def;
  display: block;
  padding: 8px 16px;
  font-size: 30px;
  mix-blend-mode: difference;
  letter-spacing: 2;
}

#top-donate {
  position: absolute;
  top: 0;
  right: 108px;
  cursor: pointer;
  z-index: 504;
  transition: all .5s;
}

.go-to-home {
  position:absolute;
  top: 24px;
  left: 12px;
  display: inline-block;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: left center;
  background-image: url(--home);
  vertical-align: text-bottom;
  width: auto;
  height: 32px;
  padding-left: 40px;
  padding-top: 8px;
  margin-left: 8px;
}

.home:hover {
  color: #fa0;
}

hr {
  margin: 16px 0;
  height: 2px;
  border: 0;
  background: linear-gradient(to bottom, #fff 0%, #09b 58%);
}

.search-wrapper {
  margin: 20px 0 0 28px;
  color: #eee;
}

.search-icon, .icon, .icon-active {
  display: inline-block;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  vertical-align: middle;
  margin: 8px;
}

.search-icon {
  background-image: url(--search);
  width: 24px;
  height: 24px;
}

#search-input {
  padding: 4px 8px;
  font-size: 1rem;
  border-radius: 4px;
  border: none;
  outline: solid 1px #fa0;
}

.lesson-menu-item, .lesson-menu-item--active, .lesson-menu-item--expanded, .lesson-menu-item--active--expanded {
  font-size: 0.8rem;
  font-weight: bold;
  color: #09b;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: left center;
  border-left: solid 4px transparent;
  box-sizing: border-box;
}

.lesson-menu-item {
  padding: 8px 24px;
  background-image: url(--main-menu-icon);
  background-size: 16px;
}

.lesson-menu-item--active {
  padding: 8px 28px;
  color: #fff;
  background-image: url(--active-main-menu-icon);
  background-size: 16px;
}

.lesson-menu-item--expanded {
  padding: 8px 28px;
  color: #fff;
  background-image: url(--expanded-main-menu-icon);
  background-size: 16px;
}

.lesson-menu-item--active--expanded {
  padding: 8px 28px;
  color: #fff;
  background-image: url(--active-expanded-main-menu-icon);
  background-size: 20px;
}

.lesson-menu-item:hover, .lesson-menu-item--active:hover {
  background: #09b;
  color: #000;
  border-left: solid 4px #09b;
  box-sizing: border-box;
}

.lesson-menu-item:hover {
  background-image: url(--main-menu-icon);
  background-size: 16px;
  background-repeat: no-repeat;
  background-position: left center;
}

.lesson-menu-item--active:hover {
  background-image: url(--active-main-menu-icon);
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: left center;
  color: #fff;
}

.sub-level-item:hover {
  background: #09b;
  color: #000;
}

.sub-level-item, .sub-level-item--active {
  display: block;
  font-size: 0.8rem;
  font-weight: bold;
  transition: color 0.3s ease;
  padding: 8px;
  cursor: pointer;
  box-sizing: border-box;
  animation: show-submenu-item 0.1s;
}

.sub-level-item {
  color: #09b;
}

.sub-level-item--active {
  color: #fff;
  font-weight: normal;
}

.translated {
  margin-left: -9px;
}

.translated:before {
  content: '•';
  color: #0f0;
  font-size: 18px;
  margin-right: 4px;
}

#menuToggle {
  display: block;
  position: absolute;
  top: 12px;
  right: 10px;
  z-index: 1;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  cursor: pointer;
}

#menuToggle [type="checkbox"] {
  display: block;
  width: 70px;
  height: 40px;
  position: absolute;
  top: -16px;
  right: 0px;
  cursor: pointer;
  opacity: 0;
  z-index: 55;
  -webkit-touch-callout: none;
}

#menuToggle span {
  display: inline-block;
  box-shadow: 1px 1px 2px #00000090;
  cursor: pointer;
  width: 16px;
  height: 16px;
  margin-right: 4px;
  position: relative;
  border-radius: 0px;
  z-index: 54;
  transform-origin: 0px 0px;
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              background-color 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              opacity 0.55s ease;
}

#menuToggle span:nth-last-child(odd) {
  background: #09b;
}

#menuToggle span:nth-last-child(even) {
  background: #fa0;
}

#menuToggle span:first-child {
	transform-origin: 0% 0%;
}

#menuToggle span:nth-last-child(2) {
	transform-origin: 0% 100%;
}

#menuToggle [type="checkbox"]:checked ~ span {
  opacity: 1;
  width: 30px;
  height: 5px;
  transform: rotate(45deg) translate(50px, -68px);
}

#menuToggle [type="checkbox"]:checked ~ span:nth-last-child(3) {
  opacity: 0;
  transform: rotate(0deg) scale(0.2, 0.2);
}

#menuToggle [type="checkbox"]:checked ~ span:nth-last-child(2) {
  transform: rotate(-45deg) translate(0px, 10px);
  width: 30px;
  height: 5px;
}

#menu {
  position: absolute;
  right: -10px;
  top: 32px;
  width: var(--main-menu-width);
  height: 101vh;
  overflow-y: auto;
  margin-top: -40px;
  padding: 40px 24px;
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  transform-origin: 100% 100%;
  transform: translate(100%, 0);
  transition: all 0.5s ease-out;
  z-index: 51;
}

#menuToggle [type="checkbox"]:checked ~ ul {
  transform: translate(0, 0);
}

@media screen and (min-width: 1350px) {
  .main-menu-wrapper:before { padding-left: 16px; }
}

@media screen and (max-width: 1320px) {
  .main-menu-wrapper:before { padding-left: 20vw; }
}
@media screen and (max-width: 900px) {
  .main-menu-wrapper:before { padding-left: 80px; }
}

@media screen and (max-width: 480px), screen and (max-height: 480px) {
  .main-menu-wrapper:before { display: none; }
  .main-menu-wrapper { background-size: cover, 100%; }
}

@keyframes show-submenu-item {
  0%   {
    position: absolute;
    right: -100%;
    opacity: 0;
    font-size: 0;
    width: 0;
    height: 0;
    padding: 0;
  }
  100% {
    position: relative;
    right: 0;
    opacity: 1;
    font-size: 0.8rem;
    width: max-content;
    padding: 0px 4px;
    height: 1.5rem;
  }
}
@keyframes hide-submenu-item {
  0%   {
    position: relative;
    right: 0;
    opacity: 1;
    font-size: 0.8rem;
    width: max-content;
    padding: 0px 4px;
    height: 1.5rem;
  }
  100% {
    position: absolute;
    right: -100%;
    opacity: 0;
    font-size: 0;
    width: 0;
    height: 0;
    padding: 0;
  }
}

@keyframes hide-submenu {
  0%   { height: max-content;  }
  100% { height: 0; }
}
@keyframes show-submenu {
  0%   { height: 0;  }
  10%  { height: 70vh; }
  90%  { height: 70vh; }
  100% { height: max-content; }
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

export const mainMenuStyles = new Promise(resolve => {
  window[Symbol.for('icons.worker')].addEventListener('message', function (event) {
    const { route, error, response } = event.data
    if (route !== 'main-menu') return
    if (error) console.error('Main menu icons error!\n', error)
    if (!response) console.error('There is no response from icons worker!')
    Object.keys(response).forEach(key => {
      rawSource = rawSource.replaceAll(`--${key}`, response[key])
    })

    resolve(minifier(rawSource))
  })

  console.log('Add event listener for route "main-menu"')
  window[Symbol.for('icons.worker')].postMessage({ route: 'main-menu' })
})
