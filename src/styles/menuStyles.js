const { minifier } = require('../helpers').default

const rawSource = `
*  {
  user-select: none;
  outline: none;
}

#page-navigation-menu  {
  position: sticky;
  z-index: 500;
  top: 0;
  margin-left: -16px;
  width: var(--menu-icon-size);
  height: var(--menu-icon-size);
  background-image: var(--menu-icon-image);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  line-height: 0;
  padding-left: 0;
}

#page-navigation-menu-container {
  position: fixed;
  top: 34px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  overflow-x: hidden;
  background: #000;
  box-shadow: 4px 4px 8px #0009;
  border: solid 12px #000;
  box-sizing: border-box;
}

#page-navigation-menu:hover {
  background-image: var(--menu-symbol);
}

li {
  transition: all .1s;
  list-style-type: none;
  background: #000;
  width: 100%;
  transform: translate(-100vw, 0);
  opacity: 0;
  transition: all .2s;
}

li > a {
  display: block;
  padding: 8px 24px 8px 0;
  border-radius: 4px;
  text-decoration: none;
  color: #09b;
}

li > a > span {
  color: #9ce;
  margin-right: 8px;
  font-size: 11px
}

li:hover > a {
  color: #fa0;
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

export const menuStyles = minifier(rawSource)
