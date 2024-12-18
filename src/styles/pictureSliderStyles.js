const { minifier } = require('../helpers').default

const rawSource = `
  figure  {
    position:  fixed;
    top:  48px;
    left:  16px;
    bottom:  48px;
    right:  16px;
    overflow:  hidden;
    margin:  0;
    z-index:  500;
    border:  2px solid #ddd;
    background:  #000000D0;
  }

  button  {
    position:  absolute;
    top:  50%;
    font-size:  50px;
    font-weight:  bold;
    z-index:  100;
    background:  transparent;
    border:  0;
    color:  white;
    text-shadow:  3px 3px 5px #00000090;
    outline:  none;
    font-family:  var(--font-family);
    transition:  all 0.5s;
  }

  button:hover  {
    transform:  scale(1.2);
    text-shadow:  2px 2px 4px #000000b0;
    cursor:  pointer;
  }

  #left { left: 4%; }
  #left:before { content: "❮"; }
  #right { right: 4%; }
  #right:before { content: "❯"; }

  #close:before  {
    content:  "✖";
    color: #ddd;
    padding:  8px;
    vertical-align:  middle;
  }

  .close-button  {
    position:  fixed;
    top:  52px;
    right:  16px;
    font-size: 24px;
  }
  div  {
    position:  absolute;
    top:  5%;
    bottom:  5%;
    left:  5%;
    width:  80%;
    box-sizing:  border-box;
    margin:  0;
    background-color:  #000c0d90;
    background-repeat:  no-repeat;
    background-size:  contain;
    background-position:  center center;
    transition:  all 0.8s;
    box-shadow:  inset 10px 10px 20px #00000090;
  }
  @media screen and (max-width:500px)  {
    button  {  font-size:  20px;  }
  }
  @media screen and (max-width:360px)  {
    button  {  font-size:  16px;  }
  }
`

export const pictureSliderStyles = minifier(rawSource)
