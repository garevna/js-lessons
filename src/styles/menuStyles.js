const { minifier } = require('../helpers').default

const rawSource = `
*  {
  user-select: none;
  outline: none;
}

#navigation  {
  position:  sticky;
  z-index:  500;
  top:  0;
  margin-left:  -16px;
  width:  var(--menu-icon-size);
  height:  var(--menu-icon-size);
  background-image:  var(--menu-icon-image);
  background-size:  contain;
  background-repeat:  no-repeat;
  background-position:  center;
  line-height:  0;
  padding-left:  0;
}

#navigation:hover .dropdown {
  opacity: 1;
  max-height: 90vh;
  max-width: 90vw;
  width: max-content;
  height: max-content;
  overflow: visible;
}

#navigation > li  {
  position: absolute;
  font-size: 1rem;
  line-height: 0.7rem;
  padding: 0;
  list-style-type: none;
  border: solid 1px #f0f;
}

ul,  li,  a  {
  font-family:  var(--font-family);
}

ul  {
  position: absolute;
  list-style: none;
  margin-left: -48px;
  animation: hide-submenu 0s forwards;
}

li > a {
  text-decoration: none;
  color: var(--menu-color);
  display: block;
  padding: 8px 0 0 8px;
  margin: 0;
}

li:hover > a {
  background-color: var(--menu-highlight-background);
  color:  var(--menu-highlight-color);
  cursor:  pointer;
}

#top-level  {
  margin-left:  var(--margin-left);
}

ul > li  {
  position:  relative;
  list-style-type:  none;
  /* background: var(--menu-background); */
  background: #000;
  font-size:  0.8rem;
  height:  36px;
  width:  var(--item-width);
  white-space:  nowrap;
  border:  solid 0.5px white;
  animation:  hide-submenu-item 0s forwards;
}

#navigation:hover > ul > li {
  animation:  show-submenu-item 0.5s forwards;
}

li:hover > ul  {
  animation:  show-submenu 0.5s forwards;
}

li:hover > ul  {
  animation:  show-submenu 0.5s forwards;
}

nav:hover > ul  {
  animation:  show-submenu 0.5s forwards;
}

#top-level:hover > li,  li > ul > li,  li:hover > ul > li > ul > li,  li:hover > ul > li:hover > ul > li > ul > li  {
  animation:  hide-submenu-item .2s forwards;
  animation-delay:  0;
}

li:hover > ul > li,  li:hover > ul > li:hover > ul > li,  li:hover > ul > li:hover > ul > li:hover > ul > li  {
  animation:  show-submenu-item 0.5s ease forwards;
}

ul:hover > li:hover,  ul:hover > li:hover > ul:hover > li:hover,  ul:hover > li:hover > ul:hover > li:hover > ul:hover > li:hover  {
  background-color: var(--menu-highlight-background);
  cursor:  pointer;
}

#navigation:hover .dropdown > li {
  animation:  show-submenu-item 0.5s forwards;
}

.dropdown > li > a {
  display:  block;
  padding:  16px 8px;
  border-radius: 4px;
  text-decoration:  none;
  color:  var(--menu-color);
}
.dropdown > li:hover > a {
  background-color: var(--hover-back);
  color: var(--menu-color);
}

.dropdown > li.option1 > * {
  margin-left:  0;
}

.dropdown > li.option2 > * {
  margin-left: 16px;
}
.dropdown > li.option3 > * {
  margin-left: 24px;
}
.dropdown > li.option4 > * {
  margin-left: 32px;
}
.dropdown > li.option5 > * {
  margin-left: 40px;
}
.dropdown > li.option6 > * {
  margin-left: 48px;
}

@keyframes show-submenu-item  {
  0% { position: absolute; left: -1000%; opacity: 0; }
  100% { position: relative; left: 0; opacity: 1; }
}
@keyframes hide-submenu-item  {
  0% { position: relative; left: 0; opacity: 1; }
  100% { position: absolute; left: -1000%; opacity: 0; }
}

@keyframes show-submenu  {
  0% { position: absolute; left: 0; opacity: 0; }
  100% { position: relative; top: 0; left: 0; opacity: 1;  }
}

@keyframes hide-submenu  {
  0%  {  position:  absolute;  left:  0;  opacity: 1;  }
  100%  {  left:  -1000%;  opacity:  0;  }
}
`

export const menuStyles = minifier(rawSource)
