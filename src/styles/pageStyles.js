const { minifier } = require('../helpers').default

const rawSource = `
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

@media screen and (max-width: 480px), screen and (max-height: 480px)  {
  h1  {  font-size:  1.2rem;  }
  h2  {  font-size:  1.0rem;  }
  h3  {  font-size:  0.9rem;  }
  div  {  font-size: 0.8rem;  }
  .slogan  {
    transform:  rotate(-15deg) translate(10%, 48px);
    width:  80%;
  }
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
  background-position:  right 8px center;
  background-repeat:  no-repeat;
  background-size:  24px;
}

a.visible-anchor:hover  {
  background-color:  #eee;
  color:  #09b;
  text-decoration:  #09b;
}
a.visible-anchor  >  span  {
  vertical-align:  middle;
}

h1,  h2  {
  color:  #079;
}
h3,  h4  {
  color:  #579;
}

a  >  span  {
  vertical-align:  middle;
}

glitch-logo  {
    position:  absolute;
    top:  70px;
    left:  calc(100% - 150px);
}

@media screen and (max-width: 480px),  screen and (max-height: 480px)  {
  .main-page  {  width:  100px;  height:  100px;  }
}

table  {
  margin-bottom:  20px;
  border-collapse:  collapse;
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

button.link,  button.link-ico,  button.cap,  button.page-next,  button.page-previous  {
  margin:  12px 0;
  font-family:  var(--font-family);
  font-size:  1rem;
  white-space:  nowrap;
  border-radius:  4px;
  background-repeat:  no-repeat;
  background-size:  32px, cover;
}

button.page-next,  button.page-previous  {
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

button.link,  button.link-ico,  button.cap  {
  background-position:  8px, center;
  padding:  8px 8px 8px 48px;
  background-color:  #079;
  color:  white;
  border:  0;
  box-shadow:  1px 1px 2px #0007;
}

button.link:hover,  button.link-ico:hover,  button.cap:hover  {
  box-shadow:  0px 0px 2px #0005;
  text-shadow:  1px 1px 1px #0008;
  animation:  button-link-hover 0.5s ease infinite;
}

@keyframes button-link-hover  {
  0%  {  background:  var(--button-gradient-0);  }
  20%  {  background:  var(--button-gradient-1);  }
  40%  {  background:  var(--button-gradient-2);  }
  60%  {  background:  var(--button-gradient-3);  }
  80%  {  background:  var(--button-gradient-4);  }
  100%  {  background:  var(--button-gradient-5);  }
}

@keyframes button-cap-hover  {
    0%  {  background-image:  var(--cap-image),  var(--button-gradient-0);  }
   20%  {  background-image:  var(--cap-image),  var(--button-gradient-1);  }
   40%  {  background-image:  var(--cap-image),  var(--button-gradient-2);  }
   60%  {  background-image:  var(--cap-image),  var(--button-gradient-3);  }
   80%  {  background-image:  var(--cap-image),  var(--button-gradient-4);  }
  100%  {  background-image:  var(--cap-image),  var(--button-gradient-5);  }
}

@media screen and (max-width: 900px)  {
  main  {
    padding:  20px 20px 50px 30px;
  }
  .overshadow  {
    width:  100px;
    height:  100px;
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
