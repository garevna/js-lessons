const { createPath, minifier } = require('../helpers').default

const rawSource = `
* {
  box-sizing: border-box;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

.go-to-home {
    position:absolute;
    top: 0;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: left center;
    background-image: var(--home);
    vertical-align: text-bottom;
    width: auto;
    height: 32px;
    padding-left: 40px;
    padding-top: 8px;
    margin-left: 8px;
}
.home:hover {
  color: #fa0;
}

hr {
  margin: 16px 0;
  height: 2px;
  border: 0;
  background: linear-gradient(to bottom, #fff 0%, #09b 58%);
}

.search-wrapper {
  padding: 16px 0;
  margin: 16px 0;
  color: #eee;
}

.search-icon, .icon {
  display: inline-block;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  vertical-align: middle;
  margin: 8px;
}

.search-icon {
  background-image: var(--search);
  width: 24px;
  height: 24px;
}

.icon {
  background-image: var(--icon);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: solid 1px #09b;
}

#search-input {
  padding: 4px 8px;
  font-size: 1rem;
}

a {
  display: inline-block;
  width: 100%;
  margin: 0;
  text-decoration: none;
  color: #09b;
  transition: color 0.3s ease;
  padding: 4px 8px;
  cursor: pointer;
  box-sizing: border-box;
}

ul {
  list-style: none;
}

#menuToggle {
  display: block;
  position: absolute;
  top: 12px;
  right: 10px;
  z-index: 1;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  cursor: pointer;
}

#menuToggle [type="checkbox"] {
  display: block;
  width: 70px;
  height: 40px;
  position: absolute;
  top: -16px;
  right: 0px;
  cursor: pointer;
  opacity: 0;
  z-index: 55;
  -webkit-touch-callout: none;
}

#menuToggle span {
  display: inline-block;
  box-shadow: 1px 1px 2px #00000090;
  cursor: pointer;
  width: 16px;
  height: 16px;
  margin-right: 4px;
  position: relative;
  border-radius: 0px;
  z-index: 54;
  transform-origin: 0px 0px;
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              background-color 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              opacity 0.55s ease;
}

#menuToggle span:nth-last-child(odd) {
  background: #09b;
}

#menuToggle span:nth-last-child(even) {
  background: #f50;
}

#menuToggle span:first-child {
	transform-origin: 0% 0%;
}

#menuToggle span:nth-last-child(2) {
	transform-origin: 0% 100%;
}

#menuToggle [type="checkbox"]:checked ~ span {
  opacity: 1;
  width: 30px;
  height: 5px;
  transform: rotate(45deg) translate(50px, -68px);
}

#menuToggle [type="checkbox"]:checked ~ span:nth-last-child(3) {
  opacity: 0;
  transform: rotate(0deg) scale(0.2, 0.2);
}

#menuToggle [type="checkbox"]:checked ~ span:nth-last-child(2) {
  transform: rotate(-45deg) translate(0px, 10px);
  width: 30px;
  height: 5px;
}

#menu {
  position: absolute;
  right: -16px;
  top: 32px;
  min-width: 320px;
  width: max-content;
  height: 101vh;
  overflow-y: auto;
  margin-top: -45px;
  padding: 40px 24px;
  background: #000000;
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  transform-origin: 100% 100%;
  transform: translate(100%, 0);
  transition: all 0.5s ease-out;
  z-index: 51;
}

#menu > h3 {
  position: absolute;
  top: -4px;
  left: 16px;
  color: #09b;
}

#menu > li {
  padding: 4px 0;
  font-size: 0.8rem;
  font-weight: bold;
  color: #09b;
}
input[type="radio"]:checked ~ label {
  color: var(--selected-lesson-color);
}

#menuToggle [type="checkbox"]:checked ~ ul {
  transform: translate(0, 0);
  box-shadow: -4px -4px 8px #00000090;
}

ul {
  list-style: none;
}

input[type="radio"] {
  display: none;
}
input[type="radio"] + label {
  display: block;
  cursor: pointer;
}
input[type="radio"] + label:hover {
  background: var(--menu-back-color);
  color: var(--menu-color-hover);
}

input[type="radio"] ~ .sub-level > li {
  animation: hide-submenu-item 0s forwards 0s;
  cursor: pointer;
  position: absolute;
  right: -100%;
  opacity: 0;
  font-size: 0;
  width: 0;
  height: 0;
  padding: 0;
}

input[type="radio"]:checked ~ .sub-level > li { animation: show-submenu-item 0.1s forwards; }

input[type="radio"]:checked ~ .sub-level > li:hover {
  box-shadow: inset 1px 1px 3px #00000070;
  cursor: pointer;
}

input[type="radio"]:checked ~ .sub-level > li:hover > a {
  width: 100%;
  color: var(--submenu-color-hover);
  background-color: var(--submenu-back-color);
}

@media screen and (max-width: 480px), screen and (max-height: 480px) {
  graphic-header { display: none; }
}

@keyframes show-submenu-item {
  0%   {
    position: absolute;
    right: -100%;
    opacity: 0;
    font-size: 0;
    width: 0;
    height: 0;
    padding: 0;
  }
  100% {
    position: relative;
    right: 0;
    opacity: 1;
    font-size: 0.8rem;
    width: max-content;
    padding: 0px 4px;
    height: 1.5rem;
  }
}
@keyframes hide-submenu-item {
  0%   {
    position: relative;
    right: 0;
    opacity: 1;
    font-size: 0.8rem;
    width: max-content;
    padding: 0px 4px;
    height: 1.5rem;
  }
  100% {
    position: absolute;
    right: -100%;
    opacity: 0;
    font-size: 0;
    width: 0;
    height: 0;
    padding: 0;
  }
}

@keyframes hide-submenu {
  0%   { height: max-content;  }
  100% { height: 0; }
}
@keyframes show-submenu {
  0%   { height: 0;  }
  10%  { height: 70vh; }
  90%  { height: 70vh; }
  100% { height: max-content; }
}

.noise-container, #noise-back, #noise {
  width: var(--button-width);
  height: var(--button-height);
}
.noise-container {
  position: absolute;
  top: 0;
  left: 0;
}

#noise-back, #noise {
  position: absolute;
  top: 0;
  left: 0;
  clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%);
}

.noise-container:hover > #noise-back {
  animation: clip-animation 0.3s infinite;
}
.noise-container:hover > #noise {
  animation: clip-animation 0.4s infinite;
}

#noise {
  background-color: #f50;

}

#noise-back {
  background-color: #09b;
}

@keyframes clip-animation {
    0% { clip-path: polygon(0% 0%, 5% 0%, 5% 4%, 0% 4%); }
    2% { clip-path: polygon(0% 8%, 10% 8%, 10% 10%, 0% 10%); }
    5% { clip-path: polygon(0% 0%, 15% 0%, 15% 5%, 0% 5%); }
    7% { clip-path: polygon(0% 12%, 40% 12%, 40% 15%, 0% 15%); }
   10% { clip-path: polygon(0% 25%, 20% 25%, 20% 30%, 0% 30%); }
   15% { clip-path: polygon(0% 88%, 20% 88%, 20% 90%, 0% 90%); }
   20% { clip-path: polygon(0% 97%, 50% 97%, 50% 100%, 0% 100%); }
   27% { clip-path: polygon(0% 90%, 30% 90%, 30% 92%, 0% 92%); }
   30% { clip-path: polygon(0% 50%, 40% 50%, 40% 54%, 0% 54%); }
   34% { clip-path: polygon(0% 43%, 40% 43%, 40% 45%, 0% 45%); }
   40% { clip-path: polygon(0% 30%, 20% 30%, 20% 32%, 0% 32%); }
   47% { clip-path: polygon(0% 0%, 50% 0%, 50% 3%, 0% 3%); }
   50% { clip-path: polygon(0% 15%, 30% 15%, 30% 20%, 0% 20%); }
   55% { clip-path: polygon(0% 17%, 40% 17%, 40% 20%, 0% 20%); }
   60% { clip-path: polygon(0% 70%, 40% 70%, 40% 73%, 0% 73%); }
   64% { clip-path: polygon(0% 18%, 30% 18%, 30% 20%, 0% 20%); }
   70% { clip-path: polygon(0% 80%, 20% 80%, 20% 85%, 0% 85%); }
   72% { clip-path: polygon(0% 74%, 20% 74%, 20% 77%, 0% 77%); }
   78% { clip-path: polygon(0% 30%, 40% 30%, 40% 33%, 0% 33%); }
   80% { clip-path: polygon(0% 40%, 40% 40%, 40% 44%, 0% 44%); }
   90% { clip-path: polygon(0% 10%, 30% 10%, 30% 12%, 0% 12%); }
  100% { clip-path: polygon(0% 84%, 35% 84%, 35% 88%, 0% 88%); }
}

::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

::-webkit-scrollbar-track {
    background: #079;
    box-shadow: inset 0 0 1px #00000070;
    border-radius: 1px;
}

::-webkit-scrollbar-thumb {
    background: #f50;
    border-radius: 1px;
}

::-webkit-scrollbar-thumb:hover {
    background: #fa0;
}
`

export const mainMenuStyles = minifier(rawSource)
