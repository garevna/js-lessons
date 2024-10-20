export const buttons = `
button, .close-button, .slider-button {
  background-color: transparent;
  border: 0;
  font-family: var(--font-family);
  font-size:  1rem;
  font-weight: bold;
  color:  #079;
  white-space:  nowrap;
  outline: none;
  cursor: pointer;
}

.slider-button  {
  background-size: contain;
  width: 48px;
  height: 48px;
  background-position: center center;
  background-repeat: no-repeat;
  transition: all 0.5s;
}

.slider-button:hover  {
  opacity: 0.5;
}

.close-button  {
  position: absolute;
  top: 0;
  right: 0;
}
.close-button:before  {
  content: "⛌";
  color: #eee;
  width: 32px;
  height: 32px;
}

button.cap, button.coffee, button.page-next, button.page-previous  {
  margin:  0;
  background-repeat: no-repeat;
  background-size: 28px;
}

button.link-ico {
  background-size: 32px;
  background-position-y: -4px;
  background-position-x: 0;
  background-repeat: no-repeat;
  margin: 0;
  padding: 4px 4px 4px 36px;
}

button.link-ico:hover { color: #f50; }

button.cap, button.coffee {
  background-position-y: top;
  padding:  8px 8px 8px 36px;
  background-size: 32px;
}

button.page-next {
  padding: 8px 48px 8px 8px;
  background-position: right 8px top 4px;
}

button.page-previous {
  padding:  8px 8px 8px 48px;
  background-position:  left 8px top 4px;
}
`
