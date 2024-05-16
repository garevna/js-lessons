const { minifier } = require('../helpers').default

const rawSource = `
@charset 'UTF-8';
*  {
  -webkit-user-select:  none;
  -moz-user-select:  none;
  user-select:  none;
}
.box  {
    position:  absolute;
    top:  50%;
    left:  50%;
    transform:  translate(-50%, -50%);
    color:  #fff;
    width:  -webkit-fit-content;
    width:  -moz-fit-content;
    width:  fit-content;
    height:  -webkit-fit-content;
    height:  -moz-fit-content;
    height:  fit-content;
    transform-style:  preserve-3d;
    transition:  0.5s ease;
    perspective:  300px;
    box-sizing:  border-box;
    padding:  20px 0 20px 20px;
    font-family:  'Montserrat', 'Roboto', Arial;
    line-height:  1.5rem;
}
.box  >  .content  {
    position:  relative;
    background:  #000;
    background-image:  linear-gradient(to right, #000 70%, transparent 100%),
                      var(--stars), var(--icon);
  background-position: left, right, right bottom;
  background-repeat:  no-repeat, repeat, no-repeat;
  background-size:  cover, contain, 100px;
  top: 20px;
  bottom: 10px;
  box-sizing:  border-box;
  left:  -30px;
  width:  50vw;
  height:  fit-content;
  padding:  20px 40px 20px 20px;
  transition:  0.5s ease;
  border:  solid 5px #fff;
  box-shadow:  5px 5px 10px #00000070;
  text-align:  justify;
  text-indent:  24px;
  font-size:  0.8rem;
  display:  grid;
  grid-template-columns:  1fr 1fr;
  align-items:  flex-end;
}

.box:before,  .box:after  {
  content:  '';
  position:  absolute;
  width:  calc(100% - 80px);
  height:  100%;
}
.box:before  {
  border-top:  10px solid #f50;
  border-left:  10px solid #f50;
  box-shadow:  inset 3px 3px 6px #00000070;
}
.box:after  {
  top:  30px;
  border-bottom:  10px solid #f50;
  border-right:  10px solid #f50;
  box-shadow:  8px 8px 12px #00000070;
}

.box:hover  {
  transform:  translate(-50%, -50%) rotateY(-4deg) skew(-10deg);
}
.box:hover  >  .content  {
  transform:  rotateY(8deg) skew(20deg);
}

@media screen and (max-width: 800px)  {
  .box  >  .content  {  width:  60vw;  }
}

@media screen and (max-width: 600px)  {
  .box  >  .content  {  width:  70vw;  }
}

@media screen and (max-width: 480px)  {
  .box  >  .content  {  width: 80vw;  }
  .box  {  transform:  translate(-45%, -50%);  }
}

@media screen and (max-width: 360px)  {
  .box  >  .content  {  width: 90vw;  }
  .box  {  transform:  translate(-40%, -50%);  }
}

small  {
  color:  #0df;
}
.content p  {
  width:  max-content;
}`

export const popupWindowStyles = minifier(rawSource)
