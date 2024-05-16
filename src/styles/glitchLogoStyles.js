const { minifier } = require('../helpers').default

const rawSource = `
.logo-box {
  position: absolute;
  width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  padding: 20px 20px 0 20px;
  color: #fff;
  font-family: Poppins, Roboto, sans-serif;
  box-shadow: 3px 3px 5px #00000080;
  overflow: hidden;
}
.logo-box .over {
  position: absolute;
  top: 0;
  margin: 20px 0;
}
.logo-box .noise {
    position: absolute;
    top: 50px;
    left: 0px;
    width: 10px;
    height: 1px;
    z-index: 5;
    background-color: #00000080;
    animation: glitch-noise 1s linear 0s infinite alternate;
   overflow: hidden;
}
.logo-box .glitch {
  color: #fff;
  font-family: 'Luckiest Guy', Poppins, Roboto, sans-serif;
  font-size: 80px;
  letter-spacing: 4px;
  position: relative;
}
.logo-box .glitch:before, .logo-box .glitch:after {
  content: "JS";
  color: #fff;
  position: absolute;
  top: 0;
  overflow: hidden;
}
.logo-box .glitch:before {
  left: 2.5px;
  text-shadow: -2.5px 0 #f50;
  animation: glitch-before 2s ease 0s infinite alternate;
}
.logo-box .glitch:after {
  left: -2.5px;
  text-shadow: -2.5px 0 #09b;
  animation: glitch-after 2s ease 0s infinite alternate;
}

@keyframes glitch-before {
  0% {
    clip: rect(0px, 125px, 120px, 50px);
  }
  5% {
    clip: rect(0px, 125px, 59px, 0px);
  }
  10% {
    clip: rect(30px, 210px, 90px, 30px);
  }
  15% {
    clip: rect(15px, 40px, 48px, 0px);
  }
  20% {
    clip: rect(15px, 5px, 50px, 10px);
  }
  25% {
    clip: rect(17px, 125px, 45px, 50px);
  }
  30% {
    clip: rect(0px, 125px, 32px, 0px);
  }
  35% {
    clip: rect(20px, 100px, 47px, 50px);
  }
  40% {
    clip: rect(30px, 80px, 28px, 10px);
  }
  45% {
    clip: rect(16px, 50px, 34px, 0px);
  }
  50% {
    clip: rect(0px, 125px, 37px, 100px);
  }
  55% {
    clip: rect(12px, 100px, 21px, 30px);
  }
  60% {
    clip: rect(41px, 125px, 55px, 10px);
  }
  65% {
    clip: rect(5px, 50px, 39px, 0px);
  }
  70% {
    clip: rect(5px, 120px, 24px, 40px);
  }
  75% {
    clip: rect(30px, 125px, 50px, 10px);
  }
  80% {
    clip: rect(37px, 80px, 50px, 0px);
  }
  85% {
    clip: rect(37px, 80px, 48px, 10px);
  }
  90% {
    clip: rect(30px, 50px, 92px, 0px);
  }
  95% {
    clip: rect(17px, 125px, 92px, 90px);
  }
  100% {
    clip: rect(0px, 125px, 45px, 0px);
  }
}
@keyframes glitch-after {
  0% {
    clip: rect(10px, 50px, 34px, 0px);
  }
  5% {
    clip: rect(4px, 70px, 22px, 0px);
  }
  10% {
    clip: rect(0px, 50px, 17px, 0px);
  }
  15% {
    clip: rect(7px, 125px, 34px, 10px);
  }
  20% {
    clip: rect(11px, 115px, 45px, 30px);
  }
  25% {
    clip: rect(3px, 125px, 18px, 70px);
  }
  30% {
    clip: rect(38px, 50px, 100px, 10px);
  }
  35% {
    clip: rect(20px, 70px, 120px, 5px);
  }
  40% {
    clip: rect(5px, 125px, 48px, 90px);
  }
  45% {
    clip: rect(15px, 40px, 44px, 0px);
  }
  50% {
    clip: rect(21px, 80px, 37px, 10px);
  }
  55% {
    clip: rect(14px, 125px, 40px, 40px);
  }
  60% {
    clip: rect(16px, 50px, 30px, 8px);
  }
  65% {
    clip: rect(50px, 125px, 120px, 50px);
  }
  70% {
    clip: rect(10px, 70px, 44px, 40px);
  }
  75% {
    clip: rect(70px, 100px, 49px, 30px);
  }
  80% {
    clip: rect(13px, 120px, 120px, 90px);
  }
  85% {
    clip: rect(35px, 80px, 90px, 30px);
  }
  90% {
    clip: rect(5px, 80px, 35px, 20px);
  }
  95% {
    clip: rect(30px, 125px, 120px, 10px);
  }
  100% {
    clip: rect(50px, 50px, 110px, 0px);
  }
}
@keyframes glitch-noise {
  0% { top: 30px; left: 25px; width: 10px; }
  5% { top: 90px; left: 110px; width: 20px; }
  10% { top: 40px; left: 50px; width: 5px; }
  15% { top: 90px; left: 20px; width: 20px; }
  20% { top: 50px; left: 110px; width: 5px; }
  25% { top: 90px; left: 30px; width: 20px; }
  30% { top: 90px; left: 110px; width: 10px; }
  35% { top: 40px; left: 50px; width: 5px; }
  40% { top: 90px; left: 40px; width: 20px; }
  45% { top: 50px; left: 110px; width: 5px; }
  50% { top: 30px; left: 50px; width: 10px; }
  55% { top: 70px; left: 30px; width: 20px; }
  60% { top: 90px; left: 110px; width: 5px; }
  65% { top: 40px; left: 110px; width: 20px; }
  70% { top: 50px; left: 50px;  width: 10px; }
  75% { top: 90px; left: 50px; width: 20px; }
  80% { top: 30px; left: 70px; width: 5px; }
  85% { top: 90px; left: 80px; width: 10px; }
  90% { top: 50px; left: 40px; width: 5px; }
  95% { top: 40px; left: 70px; width: 20px; }
  100% { top: 30px; left: 50px; width: 5px; }
}
`

export const glitchLogoStyles = minifier(rawSource)
