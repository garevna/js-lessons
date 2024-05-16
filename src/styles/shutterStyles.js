const { minifier } = require('../helpers').default

const rawSource = `
  main  {
    position:  absolute;
    width:  100vw;
    height:  100vh;
    margin:  0;
    padding:  0;
    overflow:  hidden;
    box-sizing:   border-box;
  }
  section  {
    position:  relative;
    width:  100%;
    overflow:  hidden;
    margin:  0;
    padding:  0;
  }
  figure  {
    position:  absolute;
    display:  inline-block;
    background-color:  #444;
    height:  100%;
    margin:  0;
    animation-fill-mode:  forwards;
    background:  #00000090;
    box-shadow:  2px 2px 4px #00000070;
  }
  .right-figure  {
    right:  -100%;
    box-shadow:  -2px 2px 4px #00000070;
  }
  .left-figure  {
    left:  -100%;
    box-shadow:  2px 2px 4px #00000070;
  }
  @keyframes movie-left  {
    0%  {  left: -100%;  }
    45%  {  left: 0%;  }
    55%  {  left: 0%;  }
    100%  {  left: -100%;  }
  }
  @keyframes movie-right  {
    0%   {  right:  -100%;  }
    45%  {  right:  0%;  }
    55%  {  right:  0%;  }
    100%  {  right:  -100%;  }
  }
`

export const shutterStyles = minifier(rawSource)
