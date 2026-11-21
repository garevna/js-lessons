const { minifier } = require('../helpers').default

if (!window[Symbol.for('icons.worker')]) {
  window[Symbol.for('icons.worker')] = Object.assign(new Worker(`${location.origin}${location.pathname}icons.worker.js`), {
    onerror: error => console.error('! Icons worker Error\n', error)
  })
}

let rawSource = `
* {
  user-select: none;
  outline: none;
}

#page-navigation-menu  {
  position: sticky;
  z-index: 500;
  top: 0;
  margin-left: 0px;
  width: var(--menu-icon-size);
  height: var(--menu-icon-size);
  background-image: url(--menu-icon-image);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  line-height: 0;
  padding-left: 0;
}

#page-navigation-menu-container {
  position: fixed;
  top: 32px;
  left: 0px;
  height: 0;
  padding: 0;
  border: 0;
  width: 320px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #000;
  transition: all .5s;
  box-sizing: border-box;
}

#page-navigation-menu:hover {
  background-image: url(--menu-symbol);
}

#page-navigation-menu-container > li {
  transition: all .1s;
  list-style-type: none;
  background: #000;
  width: 100%;
  transform: translate(-100vw, 0);
  opacity: 0;
  transition: all .2s;
  font-size: 0.8rem;
}

#page-navigation-menu-container > li > a {
  display: block;
  padding: 8px 24px 8px 0;
  border-radius: 4px;
  text-decoration: none;
  color: #09b;
}

#page-navigation-menu-container > li > a > span {
  color: #9ce;
  margin-right: 8px;
  font-size: 11px
}

#page-navigation-menu-container > li:hover > a {
  color: #fa0;
}

/* The way into the lesson map, at the head of the contents.
   ----------------------------------------------------------------------
   The same errand as the list beneath it - finding your way around a
   lesson - so it opens from the same place instead of putting a second
   navigation button somewhere else on the screen. The rule under it says
   it is not one of the headings. */
#page-navigation-menu-container > li.lesson-map {
  border-bottom: 1px solid #333;
}

#page-navigation-menu-container > li.lesson-map > a {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 12px 24px 12px 12px;
  color: #fa0;
  font-weight: 600;
  cursor: pointer;
}

/* The heading rows set their own small blue text on the span; this row's
   label is the row. */
#page-navigation-menu-container > li.lesson-map > a > span {
  margin: 0;
  color: inherit;
  font-size: 0.8rem;
}

#page-navigation-menu-container > li.lesson-map:hover > a {
  color: #fc6;
}

#page-navigation-menu-container > li.lesson-map svg {
  flex: none;
  fill: currentColor;
}

@media screen and (max-width: 480px), screen and (max-height: 480px) {
  #page-navigation-menu  {
    background-size: 32px;
  }
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

export const menuStyles = new Promise(resolve => {
  window[Symbol.for('icons.worker')].addEventListener('message', function (event) {
    const { route, error, response } = event.data
    if (route !== 'menu') return
    if (error) console.error(error)
    if (!response) console.error('There is no response from icons worker!')
    Object.keys(response).forEach(key => {
      rawSource = rawSource.replaceAll(`--${key}`, response[key])
    })
    resolve(minifier(rawSource))
  })
  window[Symbol.for('icons.worker')].postMessage({ route: 'menu' })
})
