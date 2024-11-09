const { copyrightText, copyrightSign } = require('../configs').default
const { createPath, minifier } = require('../helpers').default

const rawSource = `
footer {
  display: grid;
	grid-template-rows: repeat(3, 80px);
	grid-template-columns: 100px 1fr var(--overshadow-size);
	gap: 0px 16px;
	justify-content: center;
	width: 100%;
	height: 100%;
}

.service-worker-version-number {
  position: fixed;
  bottom: 0;
  right: 24px;
  background: #fff9;
  border-radius: 4px;
  box-shadow: -2px -2px 4px #0005;
  padding: 4px 8px;
  color: #777;
  font-size: 10px;
  font-weight: bold;
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
  cursor: pointer;
}

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
  width: var(--overshadow-size);
  height: var(--overshadow-size);
  margin: 0;
  box-sizing: border-box;
  border-radius: 50%;
  transition: all 0.5s;
  background-image: url(${createPath('images', 'personage-on-stars.gif')}), radial-gradient(#ffffff00, #ffffff20 50%, #ffffff10 60%, #ffffff 70%);
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-position: center, center, center;
  background-size: cover, cover, 40%;
  background-blend-mode: overlay, hard-light, hard-light;
}

.overshadow__shadow {
  position: absolute;
  width: var(--overshadow-size);
  height: var(--overshadow-size);
  opacity: 0;
  transition: .5s ease;
  transform: translate(0,30%) scale(0.0);
  background-color: #fff;
  background-image: url(${createPath('images', 'garevna-theatre.jpg')});
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

@media screen and (max-width: 960px)  {
  .overshadow  {
    transform: scale(0.8);
  }
}

@media screen and (max-width: 600px) {
  #copyright-text {
    grid-area: 3 / 2 / 4 / 5;
  }

  #author-photo {
    grid-area: 2 / 4 / 3 / 3;
  }

  #slogan-donate {
  	grid-area: 2 / 2 / 2 / 4;
  }

  .overshadow, .overshadow__shadow {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  footer { gap: 0; }

  #donate-button {
    transform: scale(.7);
    grid-area: 2 / 1 / 3 / 1;
  }

  #copyright-text {
    grid-area: 3 / 1 / 4 / 5;
    margin: 0 16px;
  }

  #author-photo {
    grid-area: 2 / 4 / 3 / 4;
  }

  #slogan-donate {
  	display: none;
  }
}

@media screen and (max-width: 420px)  {
  .overshadow  {
    display:  none;
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
