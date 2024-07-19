const { minifier } = require('../helpers').default

const rawSource = `
donate-popup {
  position: fixed;
  left: 12px;
  bottom: -800px;
  border: solid 1px #999;
  min-width: 320px;
  max-width: 360px;
  background: #fbfbfb;
  padding: 32px;
  border-radius: 4px;
  box-shadow: 8px 8px 12px #0007;
  transition: all .5s;
  z-index: 505;
}

.tooltip-text {
  position: fixed;
  padding: 8px 12px;
  border-radius: 4px;
  border: solid 1px #ddd;
  background: #fafafa;
  z-index: 501;
  box-shadow: 4px 4px 8px #0008;
}

*:active,  *:hover,  *:focus  {
  outline:  none;
}

hr  {
  margin:  32px 0;
  height:  1px;
  border-top:  solid 1px #f50;
  border-bottom:  solid 1.2px #09b;
  background:  transparent;
}

.black  {
  background-color:  #000;
  color:  #dde;
  padding:  0 12px;
  margin:  12px 0;
  font-family:  Monaco, monospace, Roboto, Arial;
  font-size:  0.8rem;
  line-height:  1.8;
}

.error-message {
  background: #522;
  color: #fee;
}

.error-message:before {
  content: '✕';
  display: inline-block;
  border-radius: 50%;
  padding: 1.5px 4px 0;
  margin-right: 8px;
  background: #e44;
  font-size: 10px;
  font-weight: bold;
  color: #200;
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
  font-family:  var(--funy-font);
  font-size:  18px;
  letter-spacing:  2px;
  font-weight:  bold;
}

main  {
  padding:  24px 32px 48px 48px;
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
  max-width:  90%;
  margin:  8px;
  padding:  8px;
  border:  inset 1px white;
  box-shadow:  2px 2px 4px #00000080;
  box-sizing:  border-box;
  vertical-align:  middle;
}

button  {
  padding:  8px 16px;
  margin-bottom:  24px;
  cursor:  pointer;
  border-radius:  4px;
}

a.visible-anchor  {
  text-decoration:  none;
  color:  #079;
  font-weight:  bold;
  padding:  8px 36px 8px 8px;
  background-image:  var(--open-in-new);
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

h1, h2 {
  color: #079;
}
h3, h4 {
  color: #579;
}

a > span {
  vertical-align: middle;
}

glitch-logo {
  position: absolute;
  transform: scale(1);
  top: 64px;
  left: 16px;
}

table  {
  margin-bottom: 20px;
  border-collapse: collapse;
}
td  {
  border:  solid 1px #dde;
  padding:  5px 10px;
}
td  >  div  {
  margin:  0;
  font-size:  0.8rem;
}

.slider-button  {
  background-color:  transparent;
  border:  1px solid #09b8;
  background-image:  var(--slider-1);
  padding:  8px;
  background-size:  contain;
  width:  64px;
  height:  48px;
  border-radius:  4px;
  background-position:  center center;
  background-repeat:  no-repeat;
  outline:  none;
  transition:  all 0.5s;
}

.slider-button:hover  {
  background-image:  var(--slider-2);
}

menu-component  {
  position:  fixed;
  top:  8px;
  z-index:  500;
  cursor:  pointer;
}

.close-button  {
  position:  absolute;
  top:  0;
  right:  0;
  background:  transparent;
  border:  0;
  outline:  none;
  cursor:  pointer;
}
.close-button:before  {
  content:  "";
  background-size:  contain;
  background-image:  var(--no_entry);
  width:  30px;
  height:  30px;
}
.close-button:hover:before  {
  background-blend-mode:  difference;
}

button.link, button.cap, button.page-next, button.page-previous  {
  margin:  12px 0;
  font-family:  var(--font-family);
  font-size:  1rem;
  white-space:  nowrap;
  border-radius:  4px;
  background-repeat:  no-repeat;
  background-size:  32px, cover;
}

button.link-ico {
  background: transparent;
  border: none;
  font-family: var(--font-family);
  font-size: 20px;
  color: #079;
  font-weight: bold;
  margin: 4px -12px 0 -24px;
}

button.link-ico:hover {
  color: #09b;
}

button.link, button.cap  {
  background-position:  8px, center;
  padding:  8px 8px 8px 48px;
  background-color: transparent;
  color:  #079;
  font-weight: bold;
  border:  0;
}

button.link:hover, button.cap:hover  {
  animation:  button-link-hover 0.5s ease infinite;
}

button.page-next, button.page-previous  {
  border:  0;
  color:  #079;
  font-weight:  bold;
  background-color:  transparent;
}

button.page-next  {
  padding:  8px 48px 8px 8px;
  background-position:  right 8px top 4px;
}

button.page-previous  {
  padding:  8px 8px 8px 48px;
  background-position:  left 8px top 4px;
}

@keyframes button-link-hover  {
  0%  {  font-weight:  normal;  }
  20%  {  font-weight:  bold;  }
  40%  {  font-weight:  normal;  }
  60%  {  font-weight:  bold;  }
  70%  {  font-weight:  normal;  }
  80%  {  font-weight:  bold;  }
  100%  {  font-weight:  normal;  }
}

@media screen and (max-width: 1080px) {
  glitch-logo {
    transform: scale(0.8);
  }
}

@media screen and (max-width: 1000px) {
  glitch-logo {
    left: calc(100vw - 108px);
    top: 60px;
  }
}

@media screen and (max-width: 900px)  {
  main  {
    padding: 48px 16px 48px 32px;
  }
  .overshadow  {
    width:  100px;
    height:  100px;
  }
  glitch-logo {
    transform: scale(0.6);
    left: calc(100vw - 90px);
  }
}

@media screen and (max-width: 600px) {
  glitch-logo {
    display: none;
  }
}

@media screen and (max-width: 480px), screen and (max-height: 480px) {
  .main-page { width: 100px; height: 100px; }
  donate-popup { left: 0; }
  h1  {  font-size:  1.2rem;  }
  h2  {  font-size:  1.0rem;  }
  h3  {  font-size:  0.9rem;  }
  div  {  font-size: 0.8rem;  }
  .slogan  {
    transform:  rotate(-15deg) translate(10%, 48px);
    width:  80%;
  }
}

@media screen and (max-width: 400px)  {
  .overshadow  {
    display:  none;
  }
}

::-webkit-scrollbar  {
  width:  4px;
  height:  4px;
}

::-webkit-scrollbar-track  {
  background:  #079;
  box-shadow:  inset 0 0 1px #00000070;
  border-radius:  1px;
}

::-webkit-scrollbar-thumb  {
  background:  #f50;
  border-radius:  1px;
}

::-webkit-scrollbar-thumb:hover  {
  background:  #fa0;
}
`
export const pageStyles = minifier(rawSource)
