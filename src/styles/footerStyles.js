const { copyrightText, copyrightSign } = require('../configs').default
const { createPath, minifier } = require('../helpers').default

const rawSource = `
footer {
  display: grid;
  grid-gap: 0;
	grid-template-columns: 50% 50%;
	grid-template-areas: "text picture";
}
.footer-text {
  grid-area: text;
  padding-left: 24px;
  display: flex;
  align-items: end;
}

.footer-text small {
  border-top: solid 1px #999;
  font-size: 11px;
  padding-top: 4px;
}

.footer-picture {
  grid-area: picture;
  display: flex;
  justify-content: end;
  padding: 0 24px 0 0;
  align-items: center;
}

.overshadow {
  width: 200px;
  height: 200px;
  box-sizing: border-box;
  bottom:0;
  right:50px;
  transition: all 0.5s;
  vertical-align: bottom;
  background-image: var(--stars), radial-gradient(#ffffff00, #ffffff20 50%, #ffffff10 60%, #ffffff 70%), var(--icon);
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-position: center, center, center;
  background-size: cover, cover, 40%;
  background-blend-mode: overlay, hard-light, hard-light;
}

.overshadow__shadow {
  position: absolute;
  width: 200px;
  height: 200px;
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
  .overshadow { width: 100px; height: 100px; }
}

@media screen and (max-width: 480px) {
  footer {
  	grid-template-columns: 100% 0;
  	grid-template-areas: "text  picture";
  }
  .overshadow { display: none }
}
`

export const footerStyles = minifier(rawSource)
