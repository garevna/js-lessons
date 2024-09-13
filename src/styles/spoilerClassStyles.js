const { createPath, minifier } = require('../helpers').default

const rawSource = `
*  {  box-sizing:  border-box;  }
a  {  text-decoration:  none;  color:  #079;  }
a:hover  {  color: #f50;  }

img  {
  max-width:  98%;
  margin:  16px 1%;
  padding:  8px;
  border:  inset 1px white;
  box-shadow:  2px 2px 4px #00000080;
  box-sizing:  border-box;
}

img.spoiler-label {
  border: 0;
  margin: 0;
  padding: 0;
  box-shadow: none;
  vertical-align: middle;
  max-height: 48px;
}

div  {
  text-align:  justify;
  margin:  16px 0;
}

table  {
  margin:  32px 0;
  border-collapse: collapse;
}

td {
  border:  solid 1px #eef;
  padding:  8px 12px;
  text-align: center;
}

input[type='checkbox']  {
  display:  none;
}

.lbl-toggle  {
  margin-top:  32px;
  display:  block;
  font-weight:  bold;
  font-family:  var(--font-family);
  font-size:  1.0rem;
  text-align:  right;
  padding:  16px;
  color:  #079;
  box-shadow:  1px 1px 2px #00000070;
  border-radius:  4px;
  cursor:  pointer;
  transition:  all 0.25s ease-out;
  user-select:  none;
  background-image: var(--folder);
  background-repeat:  no-repeat;
  background-size:  32px;
  background-position:  left 8px center;
  border-left:  solid 10px transparent;
}

.lbl-toggle:hover  {
  color:  #579;
}

.lbl-toggle::before  {
  content:  ' ';
  display:  inline-block;
  border-top:  8px solid transparent;
  border-bottom:  8px solid transparent;
  border-left:  8px solid #ff7000;
  vertical-align:  middle;
  margin-right:  .7rem;
  transform:  translateY(-2px);
  transition:  transform .2s ease-out;
  user-select:  none;
}

.lbl-toggle::after  {
  width:  24px;
  height:  24px;
  display:  inline-block;
  background-repeat:  no-repeat;
  background-size:  contain;
  background-position:  center center;
}

.collapsible-content  .content-inner  {
  background-color:  white;
  color:  #444;
  box-shadow:  inset 2px -2px 3px #00000090;
  padding:  .5rem 1.2rem;
  font-size:  0.8rem;
  overflow:  auto;
}

.collapsible-content  {
  max-height:  0px;
  overflow:  auto;
  transition:  all .4s ease-in-out;
  margin-top:  0px;
  margin-bottom:  40px;
  border:  solid 0px transparent;
  box-shadow:  0px 0px 0px transparent;
}

.toggle:checked  +  .lbl-toggle  +  .collapsible-content  {
  max-height:  70vh;
  padding:  16px;
  border:  solid 1px #ddd;
}

.toggle:checked + .lbl-toggle  {
  box-shadow:  none;
  border:  solid 1px #eee;
  padding:  12px 16px 12px 32px;
  background-image:  var(--folder-open);
}

.toggle:checked + .lbl-toggle::before  {
  transform:  rotate(90deg) translateX(-3px);
}

.collapsible-content pre  {
  background:  #eee;
  padding:  16px 4px 4px 0;
  box-shadow:  none;
  overflow-y:  hidden;
}

.collapsible-content pre.black  {
  background: #000;
  color: #eee;
}

table {
  margin: 32px 0;
  border-collapse: collapse;
}

td {
  border: solid 1px #eef;
  padding: 8px 12px;
  text-align: center;
}

td > * {
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
  text-align: center;
}

hr {
  margin:  32px 0;
  border:  0;
}

hr:before  {
  content:  "▗";
  color:  #f50;
}

hr:after  {
  content:  "▘";
  color:  #09b;
}

::-webkit-scrollbar  {
  width:  4px;
  height:  4px;
}

.black  {
  background-color:  #000;
  color:  #dde;
  padding:  12px 16px;
  font-family:  monospace, Roboto, Arial;
  font-size:  13px;
}

@media screen and (max-width: 400px),  screen and (max-height: 400px)  {
  h1  {  font-size:  1.2rem;  }
  h2  {  font-size:  1.0rem;  }
  h3  {  font-size:  0.9rem;  }
  div  {  font-size:  0.8rem;  }
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

export const spoilerClassStyles = minifier(rawSource)
