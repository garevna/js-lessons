const { copyrightText, copyrightSign } = require('../configs').default
const { createPath, minifier } = require('../helpers').default

const rawSource = `
footer {
  display: grid;
	grid-template-rows: repeat(3, 80px);
	grid-template-columns: 100px 1fr 200px;
	gap: 0px 16px;
	justify-content: center;
	width: 100%;
	height: 100%;
}

#donate-button {
	grid-area: 3 / 1 / 4 / 2;
}
#copyright-text {
	grid-area: 3 / 2 / 4 / 3;
}
#author-photo {
	grid-area: 2 / 3 / 4 / 4;
}
#slogan-donate {
	grid-area: 2 / 2 / 2 / 3;
}

.footer-text {
  grid-area: text;
  display: flex;
  align-items: end;
}

.donate-button {
  grid-area: donate;
  display: flex;
  align-items: end;
  align-self: end;
  /* padding: 8px 16px;
  background: #900;
  color: #fff;
  font-weight: bold;
  border-radius: 4px; */
  cursor: pointer;
}
/*
.donate-button > span {
  font-size: 28px;
  position: relative;
  top: -48px;
}

.donate-button > #blue-heart {
  animation: 1s linear 0s infinite alternate blue-heart-movie;
}

.donate-button > #yellow-heart {
  animation: 1s linear 0s infinite alternate yellow-heart-movie;
}

.donate-button > p {
  color: #fff;
  font-weight: bold;
  position: relative;
  top: 12px;
  left: -78px;
}
*/
.footer-text small {
  border-top: solid 1px #999;
  font-size: 11px;
  padding-top: 4px;
}

.footer-picture {
  grid-area: picture;
  align-items: end;
}

.overshadow {
  width: 180px;
  height: 180px;
  margin: 0;
  box-sizing: border-box;
  border-radius: 50%;
  transition: all 0.5s;
  background-image: var(--stars), radial-gradient(#ffffff00, #ffffff20 50%, #ffffff10 60%, #ffffff 70%), var(--icon);
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-position: center, center, center;
  background-size: cover, cover, 40%;
  background-blend-mode: overlay, hard-light, hard-light;
}

.overshadow__shadow {
  position: absolute;
  width: 180px;
  height: 180px;
  opacity: 0;
  transition: .5s ease;
  transform: translate(0,30%) scale(0.0);
  background-color: #fff;
  background-image: url(${createPath('images', 'garevna-wild.png')});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  overflow:hidden;
}

.overshadow:hover .overshadow__shadow {
  opacity: 1;
  transform: translate(0,-10%) scale(1);
  box-shadow: 4px 4px 8px #00000090;
}

.overshadow__text {
  position: absolute;
  font-family: var(--font-family);
  background-color: #0008;
  text-shadow: 1px 1px 2px #000, 0 0 0.2em #000;
  line-height: 0;
  color: #fff;
  font-size: 11px;
  bottom: 48%;
  right: -24%;
  transform: rotate(-90deg);
  text-align: center;
  width:max-content;
  z-index: 10;
}

@media screen and (max-width: 600px) {
  #copyright-text {
    grid-area: 3 / 2 / 4 / 5;
  }

  #author-photo {
    grid-area: 2 / 4 / 3 / 4;
  }

  #slogan-donate {
  	grid-area: 2 / 2 / 2 / 4;
  }

  .overshadow, .overshadow__shadow {
    width: 100px;
    height: 100px;
  }

  .overshadow__text {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  footer {
  	gap: 0;
  }

  #donate-button {
    grid-area: 2 / 1 / 3 / 1;
  }

  #copyright-text {
    grid-area: 3 / 1 / 4 / 5;
    margin: 0 16px;
  }

  #author-photo {
    grid-area: 2 / 4 / 3 / 4;
  }

  .overshadow, .overshadow__shadow {
    width: 80px;
    height: 80px;
  }

  #slogan-donate {
  	display: none;
  }
}

@keyframes blue-heart-movie {
  from {
    transform: rotate(90deg) translate(0px, 0px);
  }
  to {
    transform: rotate(-90deg) translate(0px, 32px);
  }
}
@keyframes yellow-heart-movie {
  from {
    transform: rotate(-60deg) translate(0px, 0px);
    text-shadow: 0;
  }
  to {
    transform: rotate(45deg) translate(0px, 32px);
    text-shadow: 0 0 8px #0009;
  }
}
`

export const footerStyles = minifier(rawSource)
